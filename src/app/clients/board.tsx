"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BillingState, BoardClient, Prospect } from "@/lib/client-board";

type Tab = "status" | "schedule" | "prospects";

const TABS: { key: Tab; label: string }[] = [
  { key: "status", label: "Billing status" },
  { key: "schedule", label: "Billing schedule" },
  { key: "prospects", label: "Prospects" },
];

function money(n: number | null): string {
  return n === null ? "—" : `$${n.toLocaleString()}`;
}

function fmtDate(date: string | null): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}

const BADGE: Record<BillingState, { label: string; tone: string }> = {
  current: { label: "Current", tone: "bg-green-100 text-green-800" },
  past_due: { label: "Past due", tone: "bg-red-100 text-red-700" },
  paused: { label: "Paused", tone: "bg-amber-100 text-amber-800" },
  not_in_stripe: { label: "Not in Stripe", tone: "bg-sky-100 text-sky-800" },
  ended: { label: "Ended", tone: "bg-stone-200 text-stone-600" },
};

function Badge({ state }: { state: BillingState }) {
  const b = BADGE[state];
  return <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${b.tone}`}>{b.label}</span>;
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-xl border border-border bg-white px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-0.5 text-xl font-bold ${tone || ""}`}>{value}</p>
    </div>
  );
}

async function save(table: "clients" | "prospects", method: "POST" | "PATCH" | "DELETE", body: object) {
  const res = await fetch(`/api/clients-board/${table}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Save failed");
}

function NotesCell({ client }: { client: BoardClient }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(client.notes || "");
  const [busy, setBusy] = useState(false);

  if (!editing) {
    return (
      <button onClick={() => setEditing(true)} className="block w-full text-left text-sm text-muted hover:text-foreground">
        {client.notes || <span className="italic">Add a note</span>}
      </button>
    );
  }
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        autoFocus
        className="w-full rounded-lg border border-border p-2 text-sm outline-none focus:border-accent"
      />
      <div className="mt-1 flex gap-3 text-xs">
        <button
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              await save("clients", "PATCH", { id: client.id, notes: value });
              setEditing(false);
              router.refresh();
            } catch (e) {
              alert((e as Error).message);
            }
            setBusy(false);
          }}
          className="font-semibold text-accent"
        >
          {busy ? "Saving…" : "Save"}
        </button>
        <button onClick={() => { setValue(client.notes || ""); setEditing(false); }} className="text-muted">
          Cancel
        </button>
      </div>
    </div>
  );
}

function StripeLink({ url }: { url: string | null }) {
  if (!url) return <span className="text-xs text-muted">—</span>;
  return (
    <a href={url} target="_blank" rel="noreferrer" className="whitespace-nowrap text-xs font-semibold text-accent hover:underline">
      Stripe ↗
    </a>
  );
}

function StatusTable({ title, rows, hint }: { title: string; rows: BoardClient[]; hint?: string }) {
  if (!rows.length) return null;
  return (
    <section className="mt-8">
      <h2 className="font-serif text-lg font-bold">
        {title} <span className="text-sm font-normal text-muted">({rows.length})</span>
      </h2>
      {hint && <p className="text-sm text-muted">{hint}</p>}
      <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">Monthly</th>
              <th className="px-4 py-3 font-medium">Billing</th>
              <th className="w-[38%] px-4 py-3 font-medium">Notes</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-b border-border align-top last:border-0">
                <td className="px-4 py-3">
                  <p className="font-semibold">{c.business}</p>
                  <p className="text-xs text-muted">{c.name}</p>
                </td>
                <td className="px-4 py-3">
                  <p>{c.plan}</p>
                  {c.term !== "—" && <p className="text-xs text-muted">{c.term}</p>}
                </td>
                <td className="px-4 py-3 font-medium">{money(c.monthlyAmount)}</td>
                <td className="px-4 py-3">
                  <Badge state={c.state} />
                  <p className="mt-1 text-xs text-muted">{c.statusDetail}</p>
                </td>
                <td className="px-4 py-3">
                  <NotesCell client={c} />
                </td>
                <td className="px-4 py-3 text-right">
                  <StripeLink url={c.stripeUrl} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatusTab({ clients }: { clients: BoardClient[] }) {
  const by = (s: BillingState) => clients.filter((c) => c.state === s);
  const current = by("current");
  const attention = [...by("past_due"), ...by("not_in_stripe")];
  const paused = by("paused");
  const ended = by("ended");
  const active = current.length + attention.length;
  const mrr = current.reduce((sum, c) => sum + c.monthlyAmount, 0);
  const owed = by("past_due").reduce((sum, c) => sum + c.amountOwed, 0);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <Stat label="Active clients" value={String(active)} />
        <Stat label="Billing on schedule" value={String(current.length)} />
        <Stat label="Collecting now" value={`${money(mrr)}/mo`} />
        <Stat label="Past due" value={money(owed)} tone={owed ? "text-red-700" : undefined} />
        <Stat label="Paused" value={String(paused.length)} tone={paused.length ? "text-amber-700" : undefined} />
      </div>
      <p className="mt-3 text-xs text-muted">
        Active = billing on schedule + past due + billed outside Stripe. &ldquo;Collecting now&rdquo; is what the
        on-schedule clients pay per month. Billing columns are live from Stripe on every page load.
      </p>

      <StatusTable title="Needs attention" rows={attention} hint="Money owed in Stripe, or a client we can't see in Stripe." />
      <StatusTable title="Billing on schedule" rows={current} />
      <StatusTable title="Paused" rows={paused} hint="Not being charged right now." />
      <StatusTable title="Ended" rows={ended} hint="Former clients, kept for the record." />
    </div>
  );
}

function ScheduleTab({ clients }: { clients: BoardClient[] }) {
  const rows = clients
    .filter((c) => c.state !== "ended")
    .map((c) => ({ ...c, date: c.nextCharge || c.pausedUntil }))
    .sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"));

  return (
    <div>
      <p className="text-sm text-muted">
        Everyone who isn&rsquo;t ended, by next billing date. Paused clients show the date billing resumes.
      </p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Next billing</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">That charge is</th>
              <th className="px-4 py-3 font-medium">Billing</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0">
                <td className="whitespace-nowrap px-4 py-3 font-medium">
                  {c.date ? fmtDate(c.date) : <span className="text-muted">{c.state === "past_due" ? "Manual invoice" : "—"}</span>}
                  {c.state === "paused" && c.date && <p className="text-xs font-normal text-muted">resumes</p>}
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold">{c.business}</p>
                  <p className="text-xs text-muted">{c.name}</p>
                </td>
                <td className="px-4 py-3">{money(c.monthlyAmount)}</td>
                <td className="px-4 py-3">{c.plan}</td>
                <td className="px-4 py-3">
                  {c.nextTerm || c.term}
                  {c.finalMonth && <span className="ml-2 rounded bg-violet-100 px-1.5 py-0.5 text-xs font-medium text-violet-800">final month</span>}
                </td>
                <td className="px-4 py-3">
                  <Badge state={c.state} />
                </td>
                <td className="px-4 py-3 text-right">
                  <StripeLink url={c.stripeUrl} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const EMPTY = { name: "", business: "", amount: "", stage: "Proposal", notes: "" };
type Draft = typeof EMPTY;

function toDraft(p: Prospect): Draft {
  return { name: p.name, business: p.business || "", amount: p.amount === null ? "" : String(p.amount), stage: p.stage, notes: p.notes || "" };
}

function ProspectForm({ initial, onSave, onCancel, busy }: { initial: Draft; onSave: (d: Draft) => void; onCancel: () => void; busy: boolean }) {
  const [d, setD] = useState(initial);
  const input = "w-full rounded-lg border border-border px-2 py-1.5 text-sm outline-none focus:border-accent";
  return (
    <tr className="border-b border-border bg-stone-50 align-top">
      <td className="px-3 py-2"><input className={input} placeholder="Name" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} autoFocus /></td>
      <td className="px-3 py-2"><input className={input} placeholder="Brand" value={d.business} onChange={(e) => setD({ ...d, business: e.target.value })} /></td>
      <td className="px-3 py-2"><input className={input} placeholder="5000" inputMode="numeric" value={d.amount} onChange={(e) => setD({ ...d, amount: e.target.value.replace(/[^0-9.]/g, "") })} /></td>
      <td className="px-3 py-2"><input className={input} placeholder="Proposal" value={d.stage} onChange={(e) => setD({ ...d, stage: e.target.value })} /></td>
      <td className="px-3 py-2"><textarea className={input} rows={2} placeholder="Notes" value={d.notes} onChange={(e) => setD({ ...d, notes: e.target.value })} /></td>
      <td className="whitespace-nowrap px-3 py-2 text-xs">
        <button disabled={busy || !d.name.trim()} onClick={() => onSave(d)} className="font-semibold text-accent disabled:opacity-50">{busy ? "Saving…" : "Save"}</button>
        <button onClick={onCancel} className="ml-3 text-muted">Cancel</button>
      </td>
    </tr>
  );
}

function ProspectsTab({ prospects }: { prospects: Prospect[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [busy, setBusy] = useState(false);
  const pipeline = prospects.reduce((sum, p) => sum + (p.amount || 0), 0);

  async function run(method: "POST" | "PATCH" | "DELETE", body: object) {
    setBusy(true);
    try {
      await save("prospects", method, body);
      setEditing(null);
      router.refresh();
    } catch (e) {
      alert((e as Error).message);
    }
    setBusy(false);
  }

  const payload = (d: Draft) => ({ ...d, amount: d.amount ? Number(d.amount) : null });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex gap-3">
          <Stat label="Prospects" value={String(prospects.length)} />
          <Stat label="Pipeline" value={`${money(pipeline)}/mo`} />
        </div>
        <button onClick={() => setEditing("new")} className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-white">
          + Add prospect
        </button>
      </div>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Brand</th>
              <th className="px-4 py-3 font-medium">$/mo</th>
              <th className="px-4 py-3 font-medium">Stage</th>
              <th className="w-[34%] px-4 py-3 font-medium">Notes</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {editing === "new" && (
              <ProspectForm initial={EMPTY} busy={busy} onCancel={() => setEditing(null)} onSave={(d) => run("POST", payload(d))} />
            )}
            {prospects.map((p) =>
              editing === p.id ? (
                <ProspectForm key={p.id} initial={toDraft(p)} busy={busy} onCancel={() => setEditing(null)} onSave={(d) => run("PATCH", { id: p.id, ...payload(d) })} />
              ) : (
                <tr key={p.id} className="border-b border-border align-top last:border-0">
                  <td className="px-4 py-3 font-semibold">{p.name}</td>
                  <td className="px-4 py-3">{p.business || "—"}</td>
                  <td className="px-4 py-3">{money(p.amount)}</td>
                  <td className="px-4 py-3">{p.stage}</td>
                  <td className="px-4 py-3 text-muted">{p.notes || "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-xs">
                    <button onClick={() => setEditing(p.id)} className="font-semibold text-accent">Edit</button>
                    <button
                      onClick={() => confirm(`Remove ${p.name}?`) && run("DELETE", { id: p.id })}
                      className="ml-3 text-muted hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ),
            )}
            {!prospects.length && editing !== "new" && (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-muted">No prospects yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Board({ clients, prospects, stripeError }: { clients: BoardClient[]; prospects: Prospect[]; stripeError: string | null }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("status");

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-bold">CPG Founders Group</span>
            <span className="hidden text-xs text-muted sm:inline">Clients &amp; billing</span>
          </div>
          <button
            onClick={async () => {
              await fetch("/api/clients-board/login", { method: "DELETE" });
              router.refresh();
            }}
            className="text-sm font-medium text-muted hover:text-foreground"
          >
            Log out
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {stripeError && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            Couldn&rsquo;t reach Stripe ({stripeError}). Billing columns are missing until it loads.
          </p>
        )}
        <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-border">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`whitespace-nowrap border-b-2 px-4 py-2 text-sm font-semibold ${
                tab === t.key ? "border-accent text-foreground" : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
        {tab === "status" && <StatusTab clients={clients} />}
        {tab === "schedule" && <ScheduleTab clients={clients} />}
        {tab === "prospects" && <ProspectsTab prospects={prospects} />}
      </main>
    </div>
  );
}
