import Link from "next/link";
import { getClientDetail, type Booking } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

function money(n: number): string {
  return `$${n.toLocaleString()}`;
}

function fmtCall(b: Booking): string {
  const inTheirZone = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(b.slotStart));
  return `${inTheirZone} PT`;
}

function fmtDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(iso),
  );
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ email: string }>;
}) {
  const { email } = await params;
  const decoded = decodeURIComponent(email);
  const c = await getClientDetail(decoded);

  const name = c.meta?.name || c.stripe?.name || decoded;
  const status = c.stripe?.status ?? null;

  return (
    <div>
      <Link href="/admin" className="text-sm font-medium text-muted hover:text-foreground">
        &larr; All clients
      </Link>

      <div className="mt-3 mb-6">
        <h1 className="font-serif text-2xl font-bold tracking-tight">{name}</h1>
        <p className="mt-1 text-sm text-muted">
          {c.meta?.business ? `${c.meta.business} · ` : ""}
          {decoded}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment / subscription */}
        <Section title="Payment & subscription">
          {c.stripe ? (
            <dl className="space-y-2 text-sm">
              <Row label="Status" value={status ? status.replace("_", " ") : "—"} />
              <Row
                label="Plan"
                value={c.stripe.amount ? `${money(c.stripe.amount)}/${c.stripe.interval === "year" ? "yr" : "mo"}` : "—"}
              />
              <Row label="Next charge" value={c.stripe.nextCharge ? fmtDate(c.stripe.nextCharge) : "—"} />
              <Row label="Card on file" value={c.stripe.card ?? "—"} />
              <Row
                label="Stripe"
                value={
                  <a
                    href={`https://dashboard.stripe.com/customers/${c.stripe.customerId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent underline"
                  >
                    Open in Stripe &rarr;
                  </a>
                }
              />
            </dl>
          ) : (
            <p className="text-sm text-muted">No Stripe subscription found for this email.</p>
          )}
        </Section>

        {/* Payment history */}
        <Section title="Payment history">
          {c.stripe?.invoices.length ? (
            <table className="w-full text-sm">
              <tbody>
                {c.stripe.invoices.map((inv, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-1.5 text-muted">{fmtDate(inv.date)}</td>
                    <td className="py-1.5">{money(inv.amount)}</td>
                    <td className="py-1.5 text-right">
                      <span className={inv.status === "paid" ? "text-green-700" : "text-muted"}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-muted">No invoices yet.</p>
          )}
        </Section>

        {/* Upcoming calls */}
        <Section title="Upcoming sessions">
          {c.upcoming.length ? (
            <ul className="space-y-2 text-sm">
              {c.upcoming.map((b, i) => (
                <li key={i} className="rounded-lg bg-accent-light/50 px-3 py-2 font-medium text-accent-dark">
                  {fmtCall(b)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">No upcoming sessions booked.</p>
          )}
          {c.past.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Past</p>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {c.past.slice(0, 5).map((b, i) => (
                  <li key={i}>{fmtCall(b)}</li>
                ))}
              </ul>
            </div>
          )}
        </Section>

        {/* Phase 2/3 placeholders */}
        <Section title="Call notes & briefing">
          <p className="text-sm text-muted">
            Granola call recaps and the pre-call email brief land here next. Wired once Deloris is
            pointed at the shared store.
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}
