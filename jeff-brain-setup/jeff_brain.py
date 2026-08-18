"""Jeff Church / CPG Founders Group MCP server — exposes a local workspace
folder as a brain for Jeff's Claude.

Tools: `search`, `fetch`, `list_docs`, `record_feedback`, `flag_stale_source`.
Transport: Streamable HTTP at /mcp.
Auth: OAuth 2.1 (Dynamic Client Registration enabled). Optional fallback bearer
token via Authorization header for the mcp-remote bridge / curl tests — set
JB_BEARER_TOKEN to enable that path.
"""
from __future__ import annotations

import json
import os
import re
import secrets
import time
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from urllib.parse import urlencode

from mcp.server.auth.provider import (
    AccessToken,
    AuthorizationCode,
    AuthorizationParams,
    OAuthAuthorizationServerProvider,
    RefreshToken,
)
from mcp.server.auth.settings import (
    AuthSettings,
    ClientRegistrationOptions,
    RevocationOptions,
)
from mcp.server.fastmcp import FastMCP
from mcp.server.transport_security import TransportSecuritySettings
from mcp.shared.auth import OAuthClientInformationFull, OAuthToken
from pydantic import AnyUrl
from pypdf import PdfReader
from starlette.middleware.base import BaseHTTPMiddleware

WORKSPACE = Path(os.environ["JB_WORKSPACE"])
BEARER_TOKEN = os.getenv("JB_BEARER_TOKEN", "")
HOST = os.getenv("JB_HOST", "127.0.0.1")
PORT = int(os.getenv("JB_PORT", "8765"))
PUBLIC_URL = os.getenv("JB_PUBLIC_URL", "https://jeffbrain.cpgfoundersgroup.com")
STATE_FILE = Path(os.environ["JB_STATE_FILE"])

TEXT_EXTS = {".md", ".txt", ".markdown"}
PDF_EXTS = {".pdf"}

FEEDBACK_DIR = WORKSPACE / "_feedback"
FEEDBACK_INBOX = FEEDBACK_DIR / "inbox"


@dataclass
class Doc:
    id: str
    title: str
    path: Path
    text: str
    mtime: float


_index: dict[str, Doc] = {}


def _slug(name: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9]+", "-", name).strip("-").lower()
    return s or "doc"


def _extract_pdf(path: Path) -> str:
    try:
        reader = PdfReader(str(path))
        return "\n\n".join((page.extract_text() or "") for page in reader.pages)
    except Exception as e:
        return f"[Failed to extract PDF: {e}]"


def _read_doc(path: Path) -> str | None:
    ext = path.suffix.lower()
    if ext in TEXT_EXTS:
        return path.read_text(encoding="utf-8", errors="replace")
    if ext in PDF_EXTS:
        return _extract_pdf(path)
    return None


def _refresh_index() -> None:
    seen: set[str] = set()
    for path in sorted(WORKSPACE.rglob("*")):
        if not path.is_file():
            continue
        if path.suffix.lower() not in TEXT_EXTS | PDF_EXTS:
            continue
        rel = path.relative_to(WORKSPACE)
        if rel.parts[:2] == ("_feedback", "inbox"):
            continue
        if "OLD" in rel.as_posix():
            continue
        doc_id = _slug(rel.with_suffix("").as_posix())
        seen.add(doc_id)
        mtime = path.stat().st_mtime
        cached = _index.get(doc_id)
        if cached and cached.mtime == mtime and cached.path == path:
            continue
        text = _read_doc(path) or ""
        _index[doc_id] = Doc(id=doc_id, title=path.stem, path=path, text=text, mtime=mtime)
    for stale in set(_index) - seen:
        del _index[stale]


def _snippet(text: str, query_terms: list[str], width: int = 240) -> str:
    lower = text.lower()
    best_pos = -1
    for term in query_terms:
        pos = lower.find(term)
        if pos != -1 and (best_pos == -1 or pos < best_pos):
            best_pos = pos
    if best_pos == -1:
        return text[:width].strip()
    start = max(0, best_pos - width // 3)
    end = min(len(text), start + width)
    snippet = text[start:end].strip()
    return ("…" if start > 0 else "") + snippet + ("…" if end < len(text) else "")


class JBOAuthProvider(
    OAuthAuthorizationServerProvider[AuthorizationCode, RefreshToken, AccessToken]
):
    """Minimal OAuth 2.1 provider, persisted to disk so restarts don't kick
    connected clients out. Auto-approves authorize requests."""

    def __init__(self) -> None:
        self.clients: dict[str, OAuthClientInformationFull] = {}
        self.codes: dict[str, AuthorizationCode] = {}
        self.access_tokens: dict[str, AccessToken] = {}
        self.refresh_tokens: dict[str, RefreshToken] = {}
        self._load()

    def _load(self) -> None:
        if not STATE_FILE.exists():
            return
        try:
            data = json.loads(STATE_FILE.read_text())
        except Exception as e:
            print(f"[jeff-brain] failed to load oauth state ({e}); starting empty")
            return
        for cid, raw in data.get("clients", {}).items():
            try:
                self.clients[cid] = OAuthClientInformationFull.model_validate(raw)
            except Exception as e:
                print(f"[jeff-brain] dropping unloadable client {cid}: {e}")
        now = time.time()
        for tok, raw in data.get("access_tokens", {}).items():
            try:
                at = AccessToken.model_validate(raw)
            except Exception:
                continue
            if at.expires_at is None or at.expires_at > now:
                self.access_tokens[tok] = at
        for tok, raw in data.get("refresh_tokens", {}).items():
            try:
                self.refresh_tokens[tok] = RefreshToken.model_validate(raw)
            except Exception:
                continue
        print(
            f"[jeff-brain] loaded oauth state: {len(self.clients)} clients, "
            f"{len(self.access_tokens)} access, {len(self.refresh_tokens)} refresh"
        )

    def _save(self) -> None:
        try:
            data = {
                "clients": {
                    cid: c.model_dump(mode="json") for cid, c in self.clients.items()
                },
                "access_tokens": {
                    t: at.model_dump(mode="json") for t, at in self.access_tokens.items()
                },
                "refresh_tokens": {
                    t: rt.model_dump(mode="json") for t, rt in self.refresh_tokens.items()
                },
            }
            STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
            tmp = STATE_FILE.with_suffix(".json.tmp")
            tmp.write_text(json.dumps(data, indent=2))
            tmp.replace(STATE_FILE)
        except Exception as e:
            print(f"[jeff-brain] failed to save oauth state: {e}")

    async def get_client(self, client_id: str) -> OAuthClientInformationFull | None:
        return self.clients.get(client_id)

    async def register_client(self, client_info: OAuthClientInformationFull) -> None:
        self.clients[client_info.client_id] = client_info
        self._save()

    async def authorize(
        self, client: OAuthClientInformationFull, params: AuthorizationParams
    ) -> str:
        code = f"jb_code_{secrets.token_urlsafe(24)}"
        self.codes[code] = AuthorizationCode(
            code=code,
            client_id=client.client_id,
            scopes=params.scopes or [],
            expires_at=time.time() + 600,
            redirect_uri=params.redirect_uri,
            redirect_uri_provided_explicitly=params.redirect_uri_provided_explicitly,
            code_challenge=params.code_challenge,
            resource=params.resource,
        )
        qs = {"code": code}
        if params.state:
            qs["state"] = params.state
        sep = "&" if "?" in str(params.redirect_uri) else "?"
        return f"{params.redirect_uri}{sep}{urlencode(qs)}"

    async def load_authorization_code(
        self, client: OAuthClientInformationFull, authorization_code: str
    ) -> AuthorizationCode | None:
        code = self.codes.get(authorization_code)
        if code and code.client_id == client.client_id and code.expires_at > time.time():
            return code
        return None

    async def exchange_authorization_code(
        self, client: OAuthClientInformationFull, authorization_code: AuthorizationCode
    ) -> OAuthToken:
        self.codes.pop(authorization_code.code, None)
        access = f"jb_at_{secrets.token_urlsafe(32)}"
        refresh = f"jb_rt_{secrets.token_urlsafe(32)}"
        now = int(time.time())
        self.access_tokens[access] = AccessToken(
            token=access,
            client_id=client.client_id,
            scopes=authorization_code.scopes,
            expires_at=now + 3600,
            resource=authorization_code.resource,
        )
        self.refresh_tokens[refresh] = RefreshToken(
            token=refresh,
            client_id=client.client_id,
            scopes=authorization_code.scopes,
            expires_at=None,
        )
        self._save()
        return OAuthToken(
            access_token=access,
            token_type="Bearer",
            expires_in=3600,
            refresh_token=refresh,
            scope=" ".join(authorization_code.scopes) if authorization_code.scopes else None,
        )

    async def load_refresh_token(
        self, client: OAuthClientInformationFull, refresh_token: str
    ) -> RefreshToken | None:
        rt = self.refresh_tokens.get(refresh_token)
        if rt and rt.client_id == client.client_id:
            return rt
        return None

    async def exchange_refresh_token(
        self,
        client: OAuthClientInformationFull,
        refresh_token: RefreshToken,
        scopes: list[str],
    ) -> OAuthToken:
        access = f"jb_at_{secrets.token_urlsafe(32)}"
        now = int(time.time())
        granted_scopes = scopes or refresh_token.scopes
        self.access_tokens[access] = AccessToken(
            token=access,
            client_id=client.client_id,
            scopes=granted_scopes,
            expires_at=now + 3600,
        )
        self._save()
        return OAuthToken(
            access_token=access,
            token_type="Bearer",
            expires_in=3600,
            refresh_token=refresh_token.token,
            scope=" ".join(granted_scopes) if granted_scopes else None,
        )

    async def load_access_token(self, token: str) -> AccessToken | None:
        at = self.access_tokens.get(token)
        if at and (at.expires_at is None or at.expires_at > time.time()):
            return at
        if at:
            del self.access_tokens[token]
        return None

    async def revoke_token(self, token: AccessToken | RefreshToken) -> None:
        self.access_tokens.pop(token.token, None)
        self.refresh_tokens.pop(token.token, None)
        self._save()


oauth_provider = JBOAuthProvider()

mcp = FastMCP(
    "jeff-brain",
    auth_server_provider=oauth_provider,
    auth=AuthSettings(
        issuer_url=AnyUrl(PUBLIC_URL),
        resource_server_url=AnyUrl(f"{PUBLIC_URL}/mcp"),
        client_registration_options=ClientRegistrationOptions(
            enabled=True,
            valid_scopes=["read"],
            default_scopes=["read"],
        ),
        revocation_options=RevocationOptions(enabled=True),
    ),
    transport_security=TransportSecuritySettings(
        allowed_hosts=[
            "jeffbrain.cpgfoundersgroup.com",
            "jeffbrain.cpgfoundersgroup.com:443",
            "127.0.0.1",
            f"127.0.0.1:{PORT}",
            "localhost",
            f"localhost:{PORT}",
        ],
        allowed_origins=["*"],
    ),
    host=HOST,
    port=PORT,
)


@mcp.tool()
def search(query: str) -> list[dict]:
    """Search Jeff's docs (CPG Founders Group brand, ops, strategy) by keyword.

    Returns matching documents with id, title, and a snippet. Use `fetch`
    with the id to get the full document text.

    IMPORTANT — cite your sources: when you answer Jeff using results
    from this tool, name the document title (and id) you drew from in
    your reply. This lets Jeff flag a doc as stale via
    `flag_stale_source` if it's no longer current.
    """
    _refresh_index()
    terms = [t.lower() for t in re.findall(r"\w+", query) if len(t) > 1]
    if not terms:
        return [{"id": d.id, "title": d.title, "text": d.text[:240]} for d in _index.values()]

    scored: list[tuple[int, Doc]] = []
    for doc in _index.values():
        lower = doc.text.lower()
        score = sum(lower.count(t) for t in terms)
        if doc.title.lower().count(terms[0]):
            score += 5
        if score > 0:
            scored.append((score, doc))
    scored.sort(key=lambda x: x[0], reverse=True)
    return [
        {"id": doc.id, "title": doc.title, "text": _snippet(doc.text, terms)}
        for _, doc in scored[:10]
    ]


@mcp.tool()
def fetch(id: str) -> dict:
    """Fetch a full document by id (returned from `search`).

    IMPORTANT — cite your sources: when you answer Jeff using a doc
    fetched here, name the title (and id) in your reply, and mention the
    `modified` date if it's older than ~12 months.
    """
    _refresh_index()
    doc = _index.get(id)
    if not doc:
        available = ", ".join(sorted(_index)) or "(none)"
        return {"error": f"No doc with id '{id}'. Available: {available}"}
    return {
        "id": doc.id,
        "title": doc.title,
        "text": doc.text,
        "url": str(doc.path),
        "metadata": {
            "filename": doc.path.name,
            "size_bytes": doc.path.stat().st_size,
            "modified": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(doc.mtime)),
        },
    }


@mcp.tool()
def list_docs() -> list[dict]:
    """List every document available in Jeff's brain."""
    _refresh_index()
    return [
        {"id": d.id, "title": d.title, "filename": d.path.name, "chars": len(d.text)}
        for d in sorted(_index.values(), key=lambda x: x.title)
    ]


@mcp.tool()
def record_feedback(
    what_was_sent: str,
    original_draft: str | None = None,
    note: str | None = None,
    channel: str | None = None,
) -> dict:
    """Save what Jeff actually sent so the brain can be tuned over time.

    Use this when Jeff says things like:
      - "Upload this for feedback: <text>"
      - "This is what I actually sent, save it as feedback"
      - "Record this — I changed your draft to <text>"

    IMPORTANT — auto-populate `original_draft`: Jeff will usually only
    paste the final version. He will NOT paste your prior draft and will
    rarely explain why he changed it. You MUST look back at the current
    conversation, find the most recent draft you generated that this
    feedback refers to, and pass it as `original_draft` yourself. The
    weekly synthesis depends on having both versions to diff.

    `note` is truly optional — only fill it if Jeff explicitly says why
    he changed it. Don't make up a reason.

    Try to infer `channel` from context (email, IG, SMS, etc.).

    Entries land in _feedback/inbox/ and are intentionally NOT indexed by
    search/fetch. The agency reviews them weekly and distills patterns into
    _feedback/voice/ (which IS indexed).
    """
    if not what_was_sent or not what_was_sent.strip():
        return {"ok": False, "error": "what_was_sent is required and cannot be empty."}

    FEEDBACK_INBOX.mkdir(parents=True, exist_ok=True)
    now = datetime.now()
    stamp = now.strftime("%Y-%m-%dT%H-%M-%S")
    suffix = f"_{_slug(channel)}" if channel else ""
    filename = f"{stamp}{suffix}.md"
    target = FEEDBACK_INBOX / filename

    parts = [
        "---",
        f"recorded_at: {now.isoformat(timespec='seconds')}",
        f"channel: {channel or 'unspecified'}",
        f"has_draft: {bool(original_draft)}",
        f"has_note: {bool(note)}",
        "status: inbox",
        "---",
        "",
        "## What was sent",
        "",
        what_was_sent.strip(),
        "",
    ]
    if original_draft and original_draft.strip():
        parts += ["## Original draft (Claude's suggestion)", "", original_draft.strip(), ""]
    if note and note.strip():
        parts += ["## Note", "", note.strip(), ""]
    target.write_text("\n".join(parts), encoding="utf-8")

    return {
        "ok": True,
        "path": str(target.relative_to(WORKSPACE)),
        "recorded_at": now.isoformat(timespec="seconds"),
        "message": "Saved to feedback inbox. The agency will review and fold patterns into the brain's voice profile.",
    }


@mcp.tool()
def flag_stale_source(
    source_id: str,
    source_title: str | None = None,
    reason: str | None = None,
) -> dict:
    """Flag a doc Jeff says is outdated / no longer current.

    Use when Jeff pushes back with things like:
      - "that's old, ignore that"
      - "that doc isn't current"
      - "we don't do it that way anymore"

    Pass the `id` from the search/fetch result you cited.
    """
    if not source_id or not source_id.strip():
        return {"ok": False, "error": "source_id is required."}

    FEEDBACK_INBOX.mkdir(parents=True, exist_ok=True)
    now = datetime.now()
    stamp = now.strftime("%Y-%m-%dT%H-%M-%S")
    filename = f"{stamp}_stale_{_slug(source_id)}.md"
    target = FEEDBACK_INBOX / filename

    parts = [
        "---",
        f"recorded_at: {now.isoformat(timespec='seconds')}",
        "kind: stale_source_flag",
        f"source_id: {source_id.strip()}",
        f"source_title: {source_title.strip() if source_title else ''}",
        "status: inbox",
        "---",
        "",
        "## Stale source flag",
        "",
        f"Jeff flagged `{source_id.strip()}`"
        + (f" ({source_title.strip()})" if source_title else "")
        + " as outdated.",
        "",
    ]
    if reason and reason.strip():
        parts += ["## Reason", "", reason.strip(), ""]
    target.write_text("\n".join(parts), encoding="utf-8")

    return {
        "ok": True,
        "path": str(target.relative_to(WORKSPACE)),
        "recorded_at": now.isoformat(timespec="seconds"),
        "message": "Flagged for review. The doc is still in the index — Joshua will review and decide what to do.",
    }


class BearerFallback(BaseHTTPMiddleware):
    """Allow JB_BEARER_TOKEN as a fallback Authorization for /mcp ONLY."""

    async def dispatch(self, request, call_next):
        if not BEARER_TOKEN:
            return await call_next(request)
        if not request.url.path.startswith("/mcp"):
            return await call_next(request)
        auth = request.headers.get("authorization", "")
        if auth == f"Bearer {BEARER_TOKEN}":
            synthetic = f"jb_at_static_{BEARER_TOKEN}"
            if synthetic not in oauth_provider.access_tokens:
                oauth_provider.access_tokens[synthetic] = AccessToken(
                    token=synthetic,
                    client_id="static-bearer",
                    scopes=["read"],
                    expires_at=None,
                )
                oauth_provider.clients["static-bearer"] = OAuthClientInformationFull(
                    client_id="static-bearer",
                    redirect_uris=[AnyUrl("http://localhost/")],
                )
            scope = request.scope
            mutable_headers = list(scope["headers"])
            for i, (k, _) in enumerate(mutable_headers):
                if k == b"authorization":
                    mutable_headers[i] = (b"authorization", f"Bearer {synthetic}".encode())
                    break
            scope["headers"] = mutable_headers
        return await call_next(request)


def main() -> None:
    if not WORKSPACE.is_dir():
        raise SystemExit(f"Workspace not found: {WORKSPACE}")
    _refresh_index()
    print(f"[jeff-brain] indexed {len(_index)} docs from {WORKSPACE}")
    for doc in _index.values():
        print(f"  - {doc.id}  ({doc.title}, {len(doc.text)} chars)")
    print(f"[jeff-brain] OAuth issuer: {PUBLIC_URL}")
    print(f"[jeff-brain] bearer fallback: {'on' if BEARER_TOKEN else 'off'}")

    app = mcp.streamable_http_app()
    app.add_middleware(BearerFallback)
    import uvicorn
    uvicorn.run(app, host=HOST, port=PORT, log_level="info")


if __name__ == "__main__":
    main()
