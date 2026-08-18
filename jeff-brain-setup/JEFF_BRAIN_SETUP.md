# Jeff Brain — Mac Setup Playbook

This is a portable playbook for standing up Jeff Church's MCP brain on Joshua's local Mac, modeled on the live CrossCourt brain (cc-brain) but adapted for macOS + the CPG Founders Group domain.

**Target architecture:**
- Brain runs locally on Joshua's Mac as a launchd agent (`com.cpgfoundersgroup.jeffbrain`)
- Cloudflare Tunnel exposes it at `https://jeffbrain.cpgfoundersgroup.com/mcp`
- Auth gating identical to CrossCourt: OAuth 2.1 (DCR) + static bearer fallback
- Workspace folder on the Mac holds Jeff's docs; brain re-indexes per request
- Feedback inbox at `_feedback/inbox/` (NOT indexed); voice profile at `_feedback/voice/` (indexed)

**Files included in this folder:**
- `jeff_brain.py` — the FastMCP server, customized for Jeff
- `pyproject.toml` — uv dependency manifest
- `JEFF_BRAIN_SETUP.md` — this playbook

---

## Instructions for the Claude Code session running on Joshua's Mac

You are running on Joshua's MacBook (macOS). Your job is to execute this playbook end-to-end. Joshua is a terminal beginner — keep him informed in plain language at each step. Don't dump command output on him; summarize what just happened.

Pause and wait for Joshua at the steps explicitly marked **MANUAL STEP** — those require him to click in a browser or paste something into a chat. Everything else, run yourself.

---

### Step 0 — Probe the environment

Run these and confirm before continuing:

```bash
whoami                    # capture USERNAME for paths
uname -srm                # confirm macOS / arch
which brew || echo "no-brew"
which uv || echo "no-uv"
which cloudflared || echo "no-cloudflared"
lsof -iTCP:8765 -sTCP:LISTEN || echo "port-8765-free"
```

Set these mental variables for the rest of the playbook:
- `USER` = output of `whoami` (e.g. `joshua`)
- `HOME_DIR` = `/Users/$USER`
- `BRAIN_DIR` = `$HOME_DIR/jeff-brain`
- `WORKSPACE_DIR` = `$HOME_DIR/jeff-workspace`  *(note: Joshua said Jeff's docs are already on his Mac — confirm with him where exactly. If they're already in a different folder, use that path instead and skip creating a new workspace.)*

If `brew` is missing, ask Joshua to install Homebrew first from brew.sh — don't try to install it yourself.

If `uv` or `cloudflared` is missing, install them: `brew install uv cloudflared`.

If port `8765` is taken (CrossCourt isn't here, but something else might be), pick the next free port (8766, 8767…) and substitute it everywhere below as `JB_PORT`.

---

### Step 1 — Confirm where Jeff's docs already live

Joshua said: *"I just got Jeff's docs in there from building them out there and drag and dropping."*

**Ask Joshua:** what folder is that? Whatever he says, use that path as `WORKSPACE_DIR` going forward. Do **not** move his docs into a new folder unless he asks. Just point the brain at the existing folder.

Inside that workspace, create the feedback subfolders if they don't already exist:

```bash
mkdir -p "$WORKSPACE_DIR/_feedback/inbox"
mkdir -p "$WORKSPACE_DIR/_feedback/voice"
```

The `_feedback/inbox/` folder will collect raw feedback entries; the brain explicitly skips indexing this folder. `_feedback/voice/` is where the agency distills voice patterns weekly — those DO get indexed.

---

### Step 2 — Lay down the brain code

Create `$BRAIN_DIR` and copy in the two files Joshua brought from CrossCourt:

```bash
mkdir -p "$BRAIN_DIR"
# copy jeff_brain.py and pyproject.toml from wherever Joshua dropped this folder
```

Then bootstrap the Python env with uv:

```bash
cd "$BRAIN_DIR"
uv sync
```

This pins Python ≥3.12 and installs `mcp[cli]`, `pypdf`, `uvicorn`, etc. into a local `.venv`.

---

### Step 3 — Generate `.env`

Create `$BRAIN_DIR/.env` with mode 600. Generate a strong random bearer token using `openssl rand -hex 32`.

```
JB_WORKSPACE=/Users/<USER>/path/to/jeff/docs
JB_PORT=8765
JB_PUBLIC_URL=https://jeffbrain.cpgfoundersgroup.com
JB_STATE_FILE=/Users/<USER>/jeff-brain/oauth_state.json
JB_BEARER_TOKEN=<openssl-rand-hex-32-output>
```

```bash
chmod 600 "$BRAIN_DIR/.env"
```

Save the bearer token somewhere safe (1Password / notes) — Joshua will paste it into the connector if OAuth ever flakes out.

---

### Step 4 — Smoke test the brain locally

Before wiring up the tunnel, prove the brain runs:

```bash
cd "$BRAIN_DIR"
set -a && source .env && set +a
uv run python jeff_brain.py
```

You should see:
```
[jeff-brain] indexed N docs from /Users/.../jeff-workspace
[jeff-brain] OAuth issuer: https://jeffbrain.cpgfoundersgroup.com
[jeff-brain] bearer fallback: on
INFO: Uvicorn running on http://127.0.0.1:8765
```

In a second terminal, hit it:

```bash
curl -s http://127.0.0.1:8765/.well-known/oauth-authorization-server | head -c 200
```

You should see a JSON blob with `issuer`, `authorization_endpoint`, etc. If yes, kill the foreground server (Ctrl-C) and move on. If not, debug before continuing — the tunnel won't help if the local server is broken.

---

### Step 5 — Cloudflare Tunnel

**5a — Authenticate cloudflared (first time only):**

```bash
cloudflared tunnel login
```

This opens a browser. **MANUAL STEP:** Joshua picks `cpgfoundersgroup.com` from the list and authorizes. cloudflared writes a cert to `~/.cloudflared/cert.pem`.

**5b — Create the tunnel:**

```bash
cloudflared tunnel create jeff-brain
```

This prints a tunnel UUID — capture it, you'll need it twice. Credentials get written to `~/.cloudflared/<UUID>.json`.

**5c — Write the tunnel config** at `~/.cloudflared/config.yml` (or `$BRAIN_DIR/cloudflared-config.yml` and reference it explicitly):

```yaml
tunnel: <UUID>
credentials-file: /Users/<USER>/.cloudflared/<UUID>.json

ingress:
  - hostname: jeffbrain.cpgfoundersgroup.com
    service: http://127.0.0.1:8765
  - service: http_status:404
```

**5d — Add the DNS record.** Try this first:

```bash
cloudflared tunnel route dns jeff-brain jeffbrain.cpgfoundersgroup.com
```

If that fails (CrossCourt hit a token-permission wall doing it via API — see memory `project_cc_brain.md`), fall back to **MANUAL STEP**:
- Joshua opens dash.cloudflare.com → `cpgfoundersgroup.com` → DNS
- Adds a CNAME: name `jeffbrain`, target `<UUID>.cfargotunnel.com`, **proxy on (orange cloud)**
- Save

**5e — Test the tunnel manually:**

In one terminal, start the brain again (`set -a && source .env && set +a && uv run python jeff_brain.py`).

In another, run cloudflared in foreground:
```bash
cloudflared tunnel run jeff-brain
```

From your phone or another network, hit `https://jeffbrain.cpgfoundersgroup.com/.well-known/oauth-authorization-server`. Should return JSON. If yes, both pieces work — kill both processes, move to Step 6 to make them permanent.

---

### Step 6 — Make it survive reboots (launchd)

macOS doesn't have systemd. Use launchd. Two LaunchAgents: one for the brain, one for cloudflared.

**6a — Brain agent.** Write `~/Library/LaunchAgents/com.cpgfoundersgroup.jeffbrain.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.cpgfoundersgroup.jeffbrain</string>
  <key>WorkingDirectory</key>
  <string>/Users/<USER>/jeff-brain</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>-lc</string>
    <string>set -a; source .env; set +a; exec uv run python jeff_brain.py</string>
  </array>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key>
  <string>/Users/<USER>/jeff-brain/jeff-brain.log</string>
  <key>StandardErrorPath</key>
  <string>/Users/<USER>/jeff-brain/jeff-brain.err</string>
</dict>
</plist>
```

Load it:
```bash
launchctl load ~/Library/LaunchAgents/com.cpgfoundersgroup.jeffbrain.plist
launchctl list | grep jeffbrain
tail -n 30 ~/jeff-brain/jeff-brain.log
```

**6b — cloudflared agent.** Easiest:
```bash
sudo cloudflared service install
```
That installs cloudflared as a system-level launch daemon using `~/.cloudflared/config.yml`. **MANUAL STEP:** Joshua types his Mac password.

Verify:
```bash
sudo launchctl list | grep cloudflared
```

**6c — Stop sleep from killing this.**
- System Settings → Battery → Options → "Prevent automatic sleeping when display is off" = ON (when plugged in).
- Or run `caffeinate -dimsu &` in a terminal and leave it. Less robust.
- Tell Joshua: if his Mac is closed/asleep, Jeff can't reach the brain. This is the trade-off of running on a laptop instead of a server.

---

### Step 7 — End-to-end live check

From a different network (phone hotspot is fine):

```bash
curl -s https://jeffbrain.cpgfoundersgroup.com/.well-known/oauth-authorization-server | python3 -m json.tool | head -20
```

Should print JSON with the issuer set to `https://jeffbrain.cpgfoundersgroup.com`.

Also try the bearer-gated path:
```bash
curl -s -H "Authorization: Bearer $JB_BEARER_TOKEN" https://jeffbrain.cpgfoundersgroup.com/mcp
```

A 200 (or MCP protocol response) means the full chain works: tunnel → local server → auth.

---

### Step 8 — Hand the URL to Jeff

Send Jeff (or walk him through) these instructions:

> 1. Go to claude.ai → Settings → **Connectors** → Add custom connector.
> 2. Paste: `https://jeffbrain.cpgfoundersgroup.com/mcp`
> 3. Click through the OAuth approval — it'll auto-approve.
> 4. **Important:** open the connector's **Configure** panel and explicitly turn on each tool (`search`, `fetch`, `list_docs`, `record_feedback`, `flag_stale_source`). If you skip this, Claude says "connected" but the tools won't actually fire in chat.
> 5. Test by asking Claude something like "use the brain to look up [topic]" — Claude should call `search` and return matching docs with citations.

---

## Maintenance ritual (weekly)

Same cadence as CrossCourt:

1. Read everything in `$WORKSPACE_DIR/_feedback/inbox/`
2. Diff `original_draft` vs `what_was_sent` across entries — look for patterns (tone shifts, vocabulary swaps, structural prefs, channel-specific compression)
3. Distill into `$WORKSPACE_DIR/_feedback/voice/voice_email.md`, `voice_sms.md`, `corrections.md`, etc.
4. Move processed entries to `_feedback/inbox/.archive/`
5. Factual corrections ("we don't offer X anymore") overwrite the source doc directly — not just voice tuning

If inbox passes ~30 unprocessed entries, flag it.

---

## Things that are different from CrossCourt — call them out for Joshua

- **Sleep risk:** Mac going to sleep kills the connector. CrossCourt runs on a 24/7 Linux server; Jeff's runs on a laptop. Mitigation in Step 6c.
- **No Mountain Duck needed:** the workspace is local, so docs are dropped directly into the folder via Finder — no SFTP mount.
- **Env var prefix is `JB_`** (not `CC_`), so don't blindly copy commands from cc-brain memos.
- **OAuth state file lives in `$BRAIN_DIR`** — don't share or commit it. If you ever clone Jeff's setup for another client, delete `oauth_state.json` first.
- **OLD-skip rule is implemented in the index function** for Jeff's brain (CrossCourt enforces this at ingest time, not in code). Any file or folder with `OLD` in the path is excluded from search. This is a Joshua-flagged rule.
