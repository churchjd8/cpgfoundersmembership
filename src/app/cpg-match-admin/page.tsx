import { loadSubmissions, type Entry } from "@/lib/cpg-match-submissions";
import { Submissions } from "./submissions";
import { LogoutButton } from "./logout-button";

export const dynamic = "force-dynamic";
export default async function CpgMatchAdminPage() {
  let entries: Entry[] = [];
  let error: Error | null = null;
  try { entries = await loadSubmissions(); } catch (cause) { error = cause instanceof Error ? cause : new Error("Could not load submissions"); }
  const reviews = entries.filter(x => x.submission_type === "recommendation"); const waitlist = entries.filter(x => x.submission_type === "waitlist");
  return <div className="cpg-match-page min-h-screen bg-background"><header className="border-b border-border bg-white"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"><div><strong className="text-lg">CPG Match</strong><span className="ml-2 text-sm text-muted">Admin</span></div><div className="flex items-center gap-5"><a href="https://cpgmatch.com" className="text-sm font-semibold text-accent">View site ↗</a><LogoutButton /></div></div></header><main className="mx-auto max-w-7xl px-4 py-8 sm:px-6"><div className="flex flex-wrap items-end justify-between gap-5"><div><h1 className="text-3xl font-bold">Submissions</h1><p className="mt-1 text-muted">Founder reviews and database waitlist signups.</p></div><a href="/api/cpg-match-admin/export" className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-bold hover:border-accent">Export all CSV</a></div><div className="mt-7 grid gap-3 sm:grid-cols-3"><Stat label="Total" value={entries.length} /><Stat label="Vendor reviews" value={reviews.length} /><Stat label="Waitlist" value={waitlist.length} /></div>{error && <p className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">Could not load submissions: {error.message}</p>}{!error && <Submissions entries={entries} />}</main></div>;
}
function Stat({ label, value }: { label: string; value: number }) { return <div className="rounded-xl border border-border bg-white p-5"><div className="text-3xl font-bold">{value}</div><div className="mt-1 text-sm text-muted">{label}</div></div>; }
