"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Jeff's launch list, backed by Supabase so Jeff and Joshua see the same
// rows. Three ways in: type here, or download the Excel, add names, upload
// it back. Every add/edit/download/import is logged with who did it.

type Tier = "Tier 1" | "Tier 2" | "Tier 3" | "Champion";
const TIERS: { key: Tier; hint: string; target: string }[] = [
  { key: "Tier 1", hint: "Buy the day you ask. Buy both, review, post. Personal text from Jeff.", target: "50-100" },
  { key: "Tier 2", hint: "Friends of the work. Gentle ask, $0.99 ebook link.", target: "As many as you have" },
  { key: "Tier 3", hint: "Haven't talked in years. The AI covers these; only add people you specifically want included.", target: "Optional" },
  { key: "Champion", hint: "Held for after the Amazon week. One specific ask each.", target: "5-15" },
];
const CHANNELS = ["Text", "Call", "Email", "WhatsApp", "LinkedIn", "In person"];
const LEGACY_KEY = "cpt-launch-list-v1";

type Contact = {
  id: string;
  tier: Tier;
  name: string;
  how_i_know_them: string;
  channel: string;
  contact: string;
  notes: string;
  added_by: string;
  created_at: string;
  updated_at: string;
};
type Activity = { id: string; who: string; action: string; detail: string; created_at: string };

type Draft = Omit<Contact, "id" | "added_by" | "created_at" | "updated_at">;

// Names typed into the old browser-only version of this list, if any.
function readLegacy(): Draft[] {
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Record<string, { name: string; how: string; channel: string; contact: string; notes: string }[]>;
    const map: Record<string, Tier> = { tier1: "Tier 1", tier2: "Tier 2", tier3: "Tier 3", champions: "Champion" };
    const out: Draft[] = [];
    for (const [g, rows] of Object.entries(parsed)) {
      const tier = map[g];
      if (!tier) continue;
      for (const r of rows ?? []) {
        if (!r.name?.trim()) continue;
        out.push({ tier, name: r.name, how_i_know_them: r.how ?? "", channel: r.channel ?? "", contact: r.contact ?? "", notes: r.notes ?? "" });
      }
    }
    return out;
  } catch {
    return [];
  }
}

function ago(iso: string): string {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

const inputCls = "w-full bg-transparent px-1 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent rounded";

export function LaunchList() {
  const who = "";
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [tier, setTier] = useState<Tier>("Tier 1");
  const [status, setStatus] = useState<string>("Loading the list…");
  const [error, setError] = useState<string>("");
  const [legacy, setLegacy] = useState<Draft[]>([]);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/cpt-launch-list", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { contacts: Contact[]; activity: Activity[] };
      setContacts(data.contacts);
      setActivity(data.activity);
      setStatus("");
      setError("");
    } catch {
      setStatus("");
      setError("Couldn't load the list. Refresh the page; if it keeps happening, tell Joshua.");
    }
  }, []);

  useEffect(() => {
    void load();
    setLegacy(readLegacy());
  }, [load]);

  async function add() {
    setBusy(true);
    const row: Draft = { tier, name: "", how_i_know_them: "", channel: "", contact: "", notes: "" };
    // Name is required server-side, so new rows start as a local draft and
    // save on the first blur with a name.
    const temp: Contact = { ...row, id: `draft-${Math.random().toString(36).slice(2)}`, added_by: who, created_at: "", updated_at: "" };
    setContacts((c) => [...c, temp]);
    setBusy(false);
  }

  async function save(c: Contact, patch: Partial<Draft>) {
    const merged = { ...c, ...patch };
    setContacts((all) => all.map((x) => (x.id === c.id ? merged : x)));
    if (c.id.startsWith("draft-")) {
      if (!merged.name.trim()) return;
      const res = await fetch("/api/cpt-launch-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ row: merged, who }),
      });
      if (!res.ok) return setError("Couldn't save that row.");
      const { contact } = (await res.json()) as { contact: Contact };
      setContacts((all) => all.map((x) => (x.id === c.id ? contact : x)));
      void refreshActivity();
      return;
    }
    const changed = Object.fromEntries(Object.entries(patch).filter(([k, v]) => (c as unknown as Record<string, string>)[k] !== v));
    if (Object.keys(changed).length === 0) return;
    const res = await fetch("/api/cpt-launch-list", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id, patch: changed, who }),
    });
    if (!res.ok) setError("Couldn't save that change.");
    else void refreshActivity();
  }

  async function remove(c: Contact) {
    setContacts((all) => all.filter((x) => x.id !== c.id));
    if (c.id.startsWith("draft-")) return;
    const res = await fetch("/api/cpt-launch-list", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id, who }),
    });
    if (!res.ok) {
      setError("Couldn't remove that row.");
      void load();
    } else void refreshActivity();
  }

  async function refreshActivity() {
    try {
      const res = await fetch("/api/cpt-launch-list", { cache: "no-store" });
      if (res.ok) setActivity(((await res.json()) as { activity: Activity[] }).activity);
    } catch {
      // not worth surfacing
    }
  }

  async function importFile(file: File) {
    setBusy(true);
    setStatus("Reading the file…");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("who", who);
    try {
      const res = await fetch("/api/cpt-launch-list/import", { method: "POST", body: fd });
      const data = (await res.json()) as { added?: number; updated?: number; skipped?: number; error?: string };
      if (!res.ok) setError(data.error || "Import failed.");
      else {
        setError("");
        setStatus(`Imported: ${data.added} added, ${data.updated} updated${data.skipped ? `, ${data.skipped} skipped (missing tier or name)` : ""}.`);
        await load();
        setStatus(`Imported: ${data.added} added, ${data.updated} updated${data.skipped ? `, ${data.skipped} skipped (missing tier or name)` : ""}.`);
      }
    } catch {
      setError("Import failed.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function importLegacy() {
    setBusy(true);
    for (const row of legacy) {
      await fetch("/api/cpt-launch-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ row, who }),
      });
    }
    try {
      localStorage.removeItem(LEGACY_KEY);
    } catch {
      // fine
    }
    setLegacy([]);
    setBusy(false);
    await load();
  }

  const rows = contacts.filter((c) => c.tier === tier);
  const meta = TIERS.find((t) => t.key === tier)!;
  const counts = Object.fromEntries(TIERS.map((t) => [t.key, contacts.filter((c) => c.tier === t.key && c.name.trim()).length])) as Record<Tier, number>;
  const exportHref = `/api/cpt-launch-list/export?who=${encodeURIComponent(who)}`;

  return (
    <div className="mt-6 space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
        <a
          href={exportHref}
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-gold hover:bg-ridge transition-colors"
        >
          Download Excel
        </a>
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="rounded-lg border border-accent px-4 py-2 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition-colors disabled:opacity-50"
        >
          Import Excel
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void importFile(f);
          }}
        />
        <span className="text-xs text-muted">
          The Excel has every name already here plus the tier dropdown. Add rows, save, upload it back.
        </span>
      </div>

      {(status || error) && (
        <div className={`rounded-lg px-4 py-2 text-sm ${error ? "bg-red-50 text-red-800 border border-red-200" : "bg-accent-light text-accent-dark"}`}>
          {error || status}
        </div>
      )}

      {legacy.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-accent bg-accent-light px-4 py-3 text-sm">
          <span>
            This browser has {legacy.length} name{legacy.length === 1 ? "" : "s"} from the old version of the list that aren&rsquo;t in the shared list yet.
          </span>
          <button type="button" disabled={busy} onClick={() => void importLegacy()} className="rounded-lg bg-accent px-3 py-1.5 font-semibold text-white disabled:opacity-50">
            Move them in
          </button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-background px-4 py-3">
          {TIERS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTier(t.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                tier === t.key ? "bg-foreground text-white" : "bg-card border border-border hover:border-accent"
              }`}
            >
              {t.key} <span className="opacity-60">({counts[t.key]})</span>
            </button>
          ))}
        </div>
        <div className="px-4 py-3 text-sm text-muted flex flex-wrap gap-x-6 gap-y-1">
          <span>{meta.hint}</span>
          <span className="font-semibold text-foreground">Target: {meta.target}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-bold uppercase tracking-wider text-muted border-y border-border bg-background">
                <th className="px-4 py-2 min-w-[160px]">Name</th>
                <th className="px-2 py-2 min-w-[180px]">How I know them</th>
                <th className="px-2 py-2 min-w-[130px]">Best channel</th>
                <th className="px-2 py-2 min-w-[170px]">Phone or email</th>
                <th className="px-2 py-2 min-w-[200px]">Notes / the ask</th>
                <th className="px-2 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <Row key={r.id} c={r} onSave={save} onRemove={remove} />
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted">
                    {status ? status : "No names yet. Add the first one, or download the Excel and fill it in."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border bg-background px-4 py-3">
          <button
            type="button"
            onClick={() => void add()}
            disabled={busy}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark transition-colors disabled:opacity-50"
          >
            + Add a name to {tier}
          </button>
        </div>
      </div>

      {/* Activity */}
      <details className="rounded-xl border border-border bg-card">
        <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold">
          Recent activity
        </summary>
        <ul className="divide-y divide-border px-4 pb-3 text-sm">
          {activity.length === 0 && <li className="py-2 text-muted">Nothing yet.</li>}
          {activity.map((a) => (
            <li key={a.id} className="flex flex-wrap gap-x-3 py-2">
              <span className="font-semibold">{a.action}</span>
              <span className="text-muted">{a.detail}</span>
              <span className="ml-auto text-xs text-muted">{ago(a.created_at)}</span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

function Row({ c, onSave, onRemove }: { c: Contact; onSave: (c: Contact, patch: Partial<Draft>) => void; onRemove: (c: Contact) => void }) {
  // Local text state so typing doesn't round-trip; saves on blur.
  const [d, setD] = useState<Draft>({ tier: c.tier, name: c.name, how_i_know_them: c.how_i_know_them, channel: c.channel, contact: c.contact, notes: c.notes });
  const field = (k: keyof Draft, placeholder: string, extra = "") => (
    <input
      value={d[k]}
      placeholder={placeholder}
      onChange={(e) => setD((x) => ({ ...x, [k]: e.target.value }))}
      onBlur={() => onSave(c, { [k]: d[k] })}
      className={`${inputCls} ${extra}`}
    />
  );
  return (
    <tr className="border-b border-border">
      <td className="px-4 py-1">{field("name", "Name", "font-medium")}</td>
      <td className="px-2 py-1">{field("how_i_know_them", "Suja board, Founders Club...")}</td>
      <td className="px-2 py-1">
        <select
          value={d.channel}
          onChange={(e) => {
            const v = e.target.value;
            setD((x) => ({ ...x, channel: v }));
            onSave(c, { channel: v });
          }}
          className={inputCls}
        >
          <option value="">Pick one</option>
          {CHANNELS.map((ch) => (
            <option key={ch} value={ch}>
              {ch}
            </option>
          ))}
        </select>
      </td>
      <td className="px-2 py-1">{field("contact", "Optional")}</td>
      <td className="px-2 py-1">{field("notes", c.tier === "Champion" ? "Podcast / post / intro / bulk" : "Anything useful")}</td>
      <td className="px-2 py-1 text-center">
        <button type="button" onClick={() => onRemove(c)} aria-label="Remove" className="text-muted hover:text-accent">
          &times;
        </button>
      </td>
    </tr>
  );
}
