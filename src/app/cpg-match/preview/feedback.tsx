"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useSearchParams } from "next/navigation";
import "./feedback.css";

type Anchor = { el: string; xp: number; yp: number; label?: string };
type Comment = { id: string; author: string; text: string; createdAt: string; resolved: boolean; anchor: Anchor; replies: { author: string; text: string }[] };
type Position = { x: number; y: number };

function elementFor(anchor: Anchor): Element | null {
  if (!/^cpg-(?:pin|id:[\w-]+)(?:\/\d+)*$/.test(anchor.el)) return null;
  const [base, ...parts] = anchor.el.split("/");
  let el: Element | null = base === "cpg-pin" ? document.querySelector(".match-preview") : document.getElementById(base.slice(7));
  for (const part of parts) el = el?.children[Number(part)] || null;
  return el;
}

function anchorLabel(anchor: Anchor) {
  const el = elementFor(anchor);
  const section = el?.closest("article,section,header,footer") || el;
  return anchor.label || (section?.querySelector("h1,h2,h3")?.textContent || el?.textContent || "Page").trim().slice(0,90);
}

function position(anchor: Anchor): Position | null {
  try {
    const el = elementFor(anchor);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    return { x: r.left + window.scrollX + r.width * anchor.xp, y: r.top + window.scrollY + r.height * anchor.yp };
  } catch { return null; }
}

function capture(el: Element, x: number, y: number): Anchor {
  // A DOM path within the preview anchors to the actual element as the layout reflows.
  const root = el.closest("[id]") || document.querySelector(".match-preview")!;
  const parts: string[] = [];
  let node: Element | null = el;
  while (node && node !== root) {
    parts.unshift(String(Array.from(node.parentElement!.children).indexOf(node)));
    node = node.parentElement;
  }
  const r = el.getBoundingClientRect();
  const section = el.closest("article,section,header,footer") || el;
  const label = (section.querySelector("h1,h2,h3")?.textContent || el.textContent || "Page").trim().slice(0,90);
  const base = root.id ? `cpg-id:${root.id}` : "cpg-pin";
  return { el: base + (parts.length ? "/" + parts.join("/") : ""), xp: (x-r.left)/r.width, yp: (y-r.top)/r.height, label };
}

export default function Feedback() {
  const pathname = usePathname();
  const params = useSearchParams();
  const page = pathname.split("/")[3] || "directory";
  const tier = page !== "directory" && params.get("tier") === "preferred" ? "preferred" : "organic";
  return <Review key={`${page}:${tier}`} scope={`${page}:${tier}`} label={page === "directory" ? "Vendor directory" : `${page.replaceAll("-", " ")} · ${tier}`} />;
}

function Review({ scope, label }: { scope: string; label: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [mode, setMode] = useState(false);
  const [panel, setPanel] = useState(false);
  const [filter, setFilter] = useState("open");
  const [draft, setDraft] = useState<Anchor | null>(null);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [reply, setReply] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [positions, setPositions] = useState<Record<string, Position>>({});
  const [mounted, setMounted] = useState(false);
  const alive = useRef(true);
  const inFlight = useRef(false);
  const url = `/api/cpg-match/preview-feedback?scope=${encodeURIComponent(scope)}`;

  const load = useCallback(async () => {
    try {
      const response = await fetch(url, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Could not load feedback.");
      if (alive.current) { setComments(data.comments); setError(""); }
    } catch (e) { if (alive.current) setError(e instanceof Error ? e.message : "Could not load feedback."); }
    finally { if (alive.current) setLoading(false); }
  }, [url]);

  useEffect(() => {
    alive.current = true;
    setMounted(true);
    try { setAuthor(localStorage.getItem("cpg-review-name") || ""); } catch { /* Name still works without storage. */ }
    void load();
    const timer = setInterval(load, 15000);
    return () => { alive.current = false; clearInterval(timer); };
  }, [load]);

  useEffect(() => {
    function update() {
      const next: Record<string, Position> = {};
      for (const c of comments) { const p = c.anchor && position(c.anchor); if (p) next[c.id] = p; }
      if (draft) { const p = position(draft); if (p) next.draft = p; }
      setPositions(next);
    }
    update();
    const observer = new ResizeObserver(update);
    const root = document.querySelector(".match-preview");
    if (root) observer.observe(root);
    window.addEventListener("resize", update);
    // Also follows accordion/filter changes that don't resize the outer container.
    const timer = setInterval(update, 1000);
    return () => { observer.disconnect(); window.removeEventListener("resize", update); clearInterval(timer); };
  }, [comments, draft]);

  useEffect(() => {
    document.body.classList.toggle("cpg-review-pinning", mode);
    function click(event: MouseEvent) {
      const el = event.target instanceof Element ? event.target : null;
      if (!mode || !el || el.closest("[data-feedback]") || !el.closest(".match-preview")) return;
      event.preventDefault(); event.stopPropagation();
      setDraft(capture(el, event.clientX, event.clientY)); setText(""); setMode(false); setPanel(false);
    }
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") { setMode(false); setDraft(null); setPanel(false); }
    }
    document.addEventListener("click", click, true);
    document.addEventListener("keydown", key);
    return () => { document.body.classList.remove("cpg-review-pinning"); document.removeEventListener("click", click, true); document.removeEventListener("keydown", key); };
  }, [mode]);

  async function mutate(body: Record<string, unknown>) {
    if (inFlight.current) return false;
    inFlight.current = true; setBusy(true); setError("");
    try {
      const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Could not save feedback. Please try again.");
      try { localStorage.setItem("cpg-review-name", author.trim()); } catch { /* Optional convenience only. */ }
      await load();
      return true;
    } catch (e) { if (alive.current) setError(e instanceof Error ? e.message : "Could not save feedback."); return false; }
    finally { inFlight.current = false; if (alive.current) setBusy(false); }
  }

  function focus(c: Comment) {
    setActive(c.id); setReply(""); setPanel(true); setMode(false); setFilter(c.resolved ? "all" : "open");
    const p = positions[c.id];
    if (p) window.scrollTo({ top: Math.max(0, p.y - 180), behavior: "smooth" });
    setTimeout(() => document.getElementById(`feedback-${c.id}`)?.scrollIntoView({ block: "nearest" }), 100);
  }

  if (!mounted) return null;
  const visible = comments.filter(c => filter === "all" || (filter === "mine" ? c.author === author.trim() : !c.resolved));
  const draftPosition = positions.draft;
  return createPortal(<div data-feedback className="cpg-feedback">
    <div className="cr-pins">{comments.map((c, i) => positions[c.id] && (filter === "all" || !c.resolved) && <button key={c.id} className={`cr-pin ${c.resolved ? "resolved" : ""}`} style={{ left: positions[c.id].x, top: positions[c.id].y }} onClick={() => focus(c)} aria-label={`Comment ${i+1} by ${c.author}: ${c.text}`} title={`${c.author}: ${c.text}`}>{i+1}</button>)}</div>
    <div className={`cr-toolbar ${panel ? "panel-open" : ""}`}>
      <button className={mode ? "selected" : ""} onClick={() => { setMode(!mode); setPanel(false); setDraft(null); }} aria-pressed={mode}>{mode ? "Cancel pin" : "＋ Drop a pin"}</button>
      <button onClick={() => { setPanel(!panel); setMode(false); }} aria-expanded={panel}>Comments{comments.some(c => !c.resolved) ? ` · ${comments.filter(c => !c.resolved).length}` : ""}</button>
    </div>
    {mode && <div className="cr-hint" role="status">Click on the page to leave feedback · Esc to cancel</div>}
    {error && <div className="cr-error" role="alert">{error} <button onClick={() => void load()}>Retry loading</button></div>}
    {draft && draftPosition && <form className="cr-composer" aria-label="New pinned comment" style={{ left: Math.max(12, Math.min(draftPosition.x + 12, window.innerWidth - 352)), top: draftPosition.y + 12 }} onSubmit={async e => {
      e.preventDefault();
      if (!text.trim() || !author.trim()) return;
      if (await mutate({ action: "create", anchor: draft, author: author.trim(), text: text.trim() })) { setDraft(null); setText(""); setPanel(true); }
    }}>
      <strong>Leave feedback</strong><small>{draft.label}</small>
      <label>Your name<input required maxLength={60} value={author} onChange={e => setAuthor(e.target.value)} autoComplete="name" /></label>
      <label htmlFor="cr-comment">Comment<textarea id="cr-comment" autoFocus required maxLength={4000} value={text} onChange={e => setText(e.target.value)} placeholder="What should change?" /></label>
      <div className="cr-actions"><button type="button" disabled={busy} onClick={() => setDraft(null)}>Cancel</button><button disabled={busy}>{busy ? "Saving…" : "Post comment"}</button></div>
    </form>}
    {panel && <aside className="cr-panel" aria-label="Page feedback">
      <header><div><strong>Comments</strong><small>{label}</small></div><button aria-label="Close comments" onClick={() => setPanel(false)}>×</button></header>
      <div className="cr-filters">{["open", "all", "mine"].map(f => <button key={f} aria-pressed={filter === f} className={filter === f ? "selected" : ""} onClick={() => setFilter(f)}>{f}</button>)}<button onClick={() => { setPanel(false); setMode(true); }}>＋ Pin</button></div>
      <div className="cr-threads">{loading ? <p className="cr-empty">Loading comments…</p> : !visible.length ? <p className="cr-empty">No {filter === "open" ? "open " : ""}comments yet. Drop a pin on the page to leave feedback.</p> : visible.map(c => <article id={`feedback-${c.id}`} key={c.id} className={`cr-thread ${active === c.id ? "active" : ""} ${c.resolved ? "resolved" : ""}`}>
        <button className="cr-context" onClick={() => focus(c)}>#{comments.indexOf(c)+1} · {c.anchor ? anchorLabel(c.anchor) : "Page"}</button>
        <strong>{c.author}</strong><p>{c.text}</p>{c.resolved && <small>Resolved</small>}
        {c.replies.map((r,i) => <div className="cr-reply" key={i}><strong>{r.author}</strong><p>{r.text}</p></div>)}
        <div className="cr-actions"><button onClick={() => { setActive(c.id); setReply(""); }}>Reply</button><button disabled={busy} onClick={() => void mutate({ action: "resolve", id: c.id, resolved: !c.resolved })}>{c.resolved ? "Reopen" : "Resolve ✓"}</button></div>
        {active === c.id && <form className="cr-reply-form" onSubmit={async e => { e.preventDefault(); if (author.trim() && reply.trim() && await mutate({ action: "replies", id: c.id, author: author.trim(), text: reply.trim() })) setReply(""); }}>
          <label>Your name<input required maxLength={60} value={author} onChange={e => setAuthor(e.target.value)} /></label><label htmlFor="cr-reply">Reply<textarea id="cr-reply" required maxLength={4000} value={reply} onChange={e => setReply(e.target.value)} /></label><button disabled={busy}>{busy ? "Saving…" : "Send reply"}</button>
        </form>}
      </article>)}</div>
    </aside>}
  </div>, document.body);
}
