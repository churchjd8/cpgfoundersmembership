"use client";

import { useEffect, useState } from "react";

// The simplified Launch Vault. Four groups, five columns, saved in the
// browser. Deliberately dumb: Jeff types names, Joshua exports the CSV and
// loads it into the outreach queue. BIB's 22-column sheet is the reference,
// not the tool Jeff fills in.

type Group = "tier1" | "tier2" | "tier3" | "champions";

type Row = {
  id: string;
  name: string;
  how: string;
  channel: string;
  contact: string;
  notes: string;
};

const GROUPS: { key: Group; label: string; hint: string; target: string }[] = [
  { key: "tier1", label: "Tier 1", hint: "Buy the day you ask. Buy both, review, post.", target: "50-100" },
  { key: "tier2", label: "Tier 2", hint: "Friends of the work. Gentle ask, $0.99 link.", target: "As many as you have" },
  { key: "tier3", label: "Tier 3", hint: "Haven't talked in years. The AI handles these; only add people you specifically want included.", target: "Optional" },
  { key: "champions", label: "Champions", hint: "Held for after the Amazon week. One specific ask each.", target: "5-15" },
];

const CHANNELS = ["Text", "Call", "Email", "WhatsApp", "LinkedIn", "In person"];

const STORAGE_KEY = "cpt-launch-list-v1";

type Store = Record<Group, Row[]>;

const empty: Store = { tier1: [], tier2: [], tier3: [], champions: [] };

function newRow(): Row {
  return { id: Math.random().toString(36).slice(2), name: "", how: "", channel: "", contact: "", notes: "" };
}

function load(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Store>;
    return { ...empty, ...parsed };
  } catch {
    return empty;
  }
}

function csvCell(s: string) {
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function LaunchList() {
  // Rendered client-only (see launch-list-client.tsx), so reading storage in
  // the initializer is safe and there is no hydration mismatch to manage.
  const [store, setStore] = useState<Store>(load);
  const [group, setGroup] = useState<Group>("tier1");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      // Private window or blocked storage: the page still works, it just won't remember.
    }
  }, [store]);

  const rows = store[group];
  const meta = GROUPS.find((g) => g.key === group)!;

  function update(id: string, patch: Partial<Row>) {
    setStore((s) => ({ ...s, [group]: s[group].map((r) => (r.id === id ? { ...r, ...patch } : r)) }));
  }
  function add() {
    setStore((s) => ({ ...s, [group]: [...s[group], newRow()] }));
  }
  function remove(id: string) {
    setStore((s) => ({ ...s, [group]: s[group].filter((r) => r.id !== id) }));
  }
  function exportCsv() {
    const lines = ["group,name,how_i_know_them,best_channel,contact,notes"];
    for (const g of GROUPS) {
      for (const r of store[g.key]) {
        if (!r.name.trim()) continue;
        lines.push([g.label, r.name, r.how, r.channel, r.contact, r.notes].map(csvCell).join(","));
      }
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cpt-launch-list.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const counts = Object.fromEntries(
    GROUPS.map((g) => [g.key, store[g.key].filter((r) => r.name.trim()).length])
  ) as Record<Group, number>;

  return (
    <div className="mt-8 rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-background px-4 py-3">
        {GROUPS.map((g) => (
          <button
            key={g.key}
            type="button"
            onClick={() => setGroup(g.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              group === g.key ? "bg-foreground text-white" : "bg-card border border-border hover:border-accent"
            }`}
          >
            {g.label} <span className="opacity-60">({counts[g.key]})</span>
          </button>
        ))}
        <button
          type="button"
          onClick={exportCsv}
          className="ml-auto rounded-full border border-accent px-4 py-1.5 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition-colors"
        >
          Export CSV
        </button>
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
              <tr key={r.id} className="border-b border-border">
                <td className="px-4 py-1">
                  <input value={r.name} onChange={(e) => update(r.id, { name: e.target.value })} placeholder="Name" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent rounded" />
                </td>
                <td className="px-2 py-1">
                  <input value={r.how} onChange={(e) => update(r.id, { how: e.target.value })} placeholder="Suja board, Founders Club..." className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent rounded" />
                </td>
                <td className="px-2 py-1">
                  <select value={r.channel} onChange={(e) => update(r.id, { channel: e.target.value })} className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent rounded">
                    <option value="">Pick one</option>
                    {CHANNELS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </td>
                <td className="px-2 py-1">
                  <input value={r.contact} onChange={(e) => update(r.id, { contact: e.target.value })} placeholder="Optional" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent rounded" />
                </td>
                <td className="px-2 py-1">
                  <input value={r.notes} onChange={(e) => update(r.id, { notes: e.target.value })} placeholder={group === "champions" ? "Podcast / post / intro / bulk" : "Anything useful"} className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent rounded" />
                </td>
                <td className="px-2 py-1 text-center">
                  <button type="button" onClick={() => remove(r.id)} aria-label="Remove" className="text-muted hover:text-accent">&times;</button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  No names yet. Add the first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border bg-background px-4 py-3">
        <button
          type="button"
          onClick={add}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
        >
          + Add a name
        </button>
      </div>
    </div>
  );
}
