import Link from "next/link";
import { getRoster, type RosterRow } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

function money(n: number): string {
  return `$${n.toLocaleString()}`;
}

function monthly(r: RosterRow): number {
  if (!r.amount) return 0;
  return r.interval === "year" ? Math.round(r.amount / 12) : r.amount;
}

function StatusBadge({ status }: { status: string | null }) {
  if (!status) return <span className="text-xs text-muted">no sub</span>;
  const tone =
    status === "active" || status === "trialing"
      ? "bg-green-100 text-green-700"
      : status === "past_due" || status === "unpaid"
        ? "bg-red-100 text-red-700"
        : "bg-stone-200 text-stone-600";
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${tone}`}>
      {status.replace("_", " ")}
    </span>
  );
}

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(iso));
}

function fmtCall(iso: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export default async function RosterPage() {
  const roster = await getRoster();
  const activeRows = roster.filter((r) => r.stripeStatus === "active" || r.stripeStatus === "trialing");
  const mrr = activeRows.reduce((sum, r) => sum + monthly(r), 0);
  const pastDue = roster.filter((r) => r.stripeStatus === "past_due" || r.stripeStatus === "unpaid").length;
  const upcomingCalls = roster.filter((r) => r.nextCall).length;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight">Clients</h1>
          <p className="mt-1 text-sm text-muted">
            Live from Stripe and the scheduler. {roster.length} total.
          </p>
        </div>
        <div className="flex gap-3">
          <Stat label="Active" value={String(activeRows.length)} />
          <Stat label="MRR" value={money(mrr)} />
          <Stat label="Past due" value={String(pastDue)} tone={pastDue ? "red" : undefined} />
          <Stat label="Calls booked" value={String(upcomingCalls)} />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Next charge</th>
              <th className="px-4 py-3 font-medium">Next call</th>
            </tr>
          </thead>
          <tbody>
            {roster.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted">
                  No clients found. Check the Stripe connection.
                </td>
              </tr>
            )}
            {roster.map((r) => (
              <tr key={r.email} className="border-b border-border last:border-0 hover:bg-stone-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/clients/${encodeURIComponent(r.email)}`} className="block">
                    <span className="font-medium text-foreground">{r.name}</span>
                    <span className="block text-xs text-muted">
                      {r.business ? `${r.business} · ` : ""}
                      {r.email}
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {r.amount ? (
                    <>
                      {money(r.amount)}
                      <span className="text-muted">/{r.interval === "year" ? "yr" : "mo"}</span>
                    </>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={r.stripeStatus} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted">{fmtDate(r.nextCharge)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {r.nextCall ? (
                    <span className="font-medium text-foreground">{fmtCall(r.nextCall)}</span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "red" }) {
  return (
    <div className="rounded-lg border border-border bg-white px-4 py-2 text-center">
      <div className={`font-serif text-xl font-bold ${tone === "red" ? "text-red-600" : ""}`}>{value}</div>
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}
