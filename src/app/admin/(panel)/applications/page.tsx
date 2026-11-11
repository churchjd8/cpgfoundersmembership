import { listApplications, type ApplicationRow } from "@/lib/applications";
import { READINESS_OPTIONS } from "@/lib/advisory-offer";

export const dynamic = "force-dynamic";

function fmtDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

const readinessLabel = (value: string | null) =>
  READINESS_OPTIONS.find((o) => o.value === value)?.label ?? value ?? "";

function ScreenBadge({ row }: { row: ApplicationRow }) {
  const tone =
    row.screen === "ok"
      ? "bg-green-100 text-green-700"
      : row.screen === "likely-spam"
        ? "bg-amber-100 text-amber-800"
        : "bg-red-100 text-red-700";
  const label = row.screen === "ok" ? "Passed" : row.screen === "likely-spam" ? "Likely spam" : "Dropped as bot";
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${tone}`}>
      {label}
    </span>
  );
}

function Delivery({ row }: { row: ApplicationRow }) {
  if (row.screen === "bot") return <span className="text-xs text-muted">Not emailed, not in Kajabi</span>;
  const part = (name: string, ok: boolean | null) =>
    ok === null ? `${name} skipped` : ok ? `${name} ✓` : `${name} FAILED`;
  const failed = row.email_ok === false || row.kajabi_ok === false;
  return (
    <span className={`text-xs ${failed ? "font-medium text-red-600" : "text-muted"}`}>
      {part("Email", row.email_ok)} · {part("Kajabi", row.kajabi_ok)}
    </span>
  );
}

export default async function ApplicationsPage() {
  const { rows, error } = await listApplications();
  const passed = rows.filter((r) => r.screen === "ok").length;
  const flagged = rows.filter((r) => r.screen !== "ok").length;
  const failed = rows.filter((r) => r.screen !== "bot" && (r.email_ok === false || r.kajabi_ok === false)).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold tracking-tight">Applications</h1>
        <p className="mt-1 text-sm text-muted">
          Every submission of the Apply form, saved before anything else happens. {passed} passed, {flagged}{" "}
          flagged by the bot screen{failed ? `, ${failed} with a delivery failure` : ""}. Flagged ones never
          reach Kajabi, and the ones dropped as bots never reach the inbox, so scan them here for real founders.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Could not load applications: {error}
          <span className="block text-red-600/80">
            If the table is missing, run <code>npx tsx --env-file=.env scripts/setup-applications-table.ts</code>.
          </span>
        </div>
      )}

      <div className="space-y-3">
        {rows.length === 0 && !error && (
          <div className="rounded-xl border border-border bg-white px-4 py-10 text-center text-sm text-muted">
            No applications saved yet.
          </div>
        )}
        {rows.map((r) => (
          <details
            key={r.id}
            className={`rounded-xl border bg-white ${r.screen === "ok" ? "border-border" : "border-amber-200"}`}
          >
            <summary className="flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 text-sm">
              <span className="w-32 shrink-0 text-xs text-muted">{fmtDate(r.created_at)}</span>
              <span className="min-w-0 flex-1">
                <span className="font-medium text-foreground">
                  {r.first_name} {r.last_name}
                </span>
                <span className="block truncate text-xs text-muted">
                  {r.business} · {r.email}
                </span>
              </span>
              <span className="text-xs text-muted">{r.revenue}</span>
              <ScreenBadge row={r} />
            </summary>
            <div className="space-y-3 border-t border-border px-4 py-4 text-sm">
              {r.screen !== "ok" && (
                <p className="text-amber-800">
                  <span className="font-medium">Why it was flagged:</span> {r.screen_reason}
                </p>
              )}
              {r.error && (
                <p className="text-red-600">
                  <span className="font-medium">Error:</span> {r.error}
                </p>
              )}
              {r.readiness && (
                <p>
                  <span className="font-medium">On the price:</span> {readinessLabel(r.readiness)}
                </p>
              )}
              {r.website && (
                <p>
                  <span className="font-medium">Website:</span> {r.website}
                </p>
              )}
              <p className="whitespace-pre-wrap">
                <span className="font-medium">Biggest challenge:</span> {r.challenge}
              </p>
              <p className="whitespace-pre-wrap">
                <span className="font-medium">Breakthrough in 90 days:</span> {r.breakthrough}
              </p>
              {r.referral && (
                <p>
                  <span className="font-medium">Heard about Jeff:</span> {r.referral}
                </p>
              )}
              <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <Delivery row={r} />
                {r.fill_ms !== null && (
                  <span className="text-xs text-muted">Form filled in {Math.round(r.fill_ms / 1000)}s</span>
                )}
                {r.email && (
                  <a href={`mailto:${r.email}`} className="text-xs text-accent underline underline-offset-2">
                    Email them
                  </a>
                )}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
