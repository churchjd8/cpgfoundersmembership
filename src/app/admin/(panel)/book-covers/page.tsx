import Image from "next/image";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Choice = "A" | "B" | "C";

type VoteRow = {
  created_at: string;
  choice: Choice;
  name: string | null;
  email: string | null;
  comment: string | null;
  ip_hash: string | null;
};

const COVERS: { id: Choice; note: string; src: string }[] = [
  { id: "A", note: "Green", src: "/images/book-covers/cover-a.jpg" },
  { id: "B", note: "Cream", src: "/images/book-covers/cover-b.jpg" },
  { id: "C", note: "Citrus", src: "/images/book-covers/cover-c.jpg" },
];

function fmtDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

async function getVotes(): Promise<{ rows: VoteRow[]; error: string | null }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { rows: [], error: "Supabase is not configured on this environment." };

  const { data, error } = await supabase
    .from("book_cover_votes")
    .select("created_at, choice, name, email, comment, ip_hash")
    .order("created_at", { ascending: false });

  if (error) {
    // Most likely cause: the table hasn't been created yet.
    return { rows: [], error: error.message };
  }
  return { rows: (data || []) as VoteRow[], error: null };
}

export default async function BookCoverVotesPage() {
  const { rows, error } = await getVotes();

  const counts: Record<Choice, number> = { A: 0, B: 0, C: 0 };
  for (const row of rows) if (counts[row.choice] !== undefined) counts[row.choice] += 1;

  const total = rows.length;
  const emails = rows.filter((r) => r.email);
  const comments = rows.filter((r) => r.comment);
  const leader = COVERS.reduce((best, c) => (counts[c.id] > counts[best.id] ? c : best), COVERS[0]);

  // Repeat voting is blocked per device, not per person — someone determined
  // can vote from a second browser. Rather than cap by IP (phones on cellular
  // share addresses, so a cap would reject real votes), surface the overlap
  // and let a human judge it.
  const perNetwork = new Map<string, number>();
  for (const row of rows) {
    if (row.ip_hash) perNetwork.set(row.ip_hash, (perNetwork.get(row.ip_hash) || 0) + 1);
  }
  const sharedNetworks = [...perNetwork.entries()].filter(([, n]) => n > 1);
  const votesFromSharedNetworks = sharedNetworks.reduce((sum, [, n]) => sum + n, 0);

  // The tally with each shared network collapsed to a single vote — a floor to
  // sanity-check the headline numbers against.
  const seenNetwork = new Set<string>();
  const uniqueCounts: Record<Choice, number> = { A: 0, B: 0, C: 0 };
  let uniqueTotal = 0;
  for (const row of [...rows].reverse()) {
    if (row.ip_hash) {
      if (seenNetwork.has(row.ip_hash)) continue;
      seenNetwork.add(row.ip_hash);
    }
    if (uniqueCounts[row.choice] !== undefined) uniqueCounts[row.choice] += 1;
    uniqueTotal += 1;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold tracking-tight">Book cover poll</h1>
        <p className="mt-1 text-sm text-muted">
          Live results from{" "}
          <a href="/bookcovers" className="text-accent underline underline-offset-2">
            cpgfoundersgroup.com/bookcovers
          </a>
          . {total} {total === 1 ? "vote" : "votes"}, {emails.length} on the waitlist.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Could not load votes: {error}
          <span className="block text-red-600/80">
            If the table is missing, run{" "}
            <code>src/app/api/book-cover-vote/schema.sql</code> in the Supabase SQL editor.
          </span>
        </div>
      )}

      {sharedNetworks.length > 0 && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-medium">
            {votesFromSharedNetworks} {votesFromSharedNetworks === 1 ? "vote" : "votes"} came from{" "}
            {sharedNetworks.length} shared {sharedNetworks.length === 1 ? "network" : "networks"}.
          </p>
          <p className="mt-1 text-amber-800/90">
            Usually innocent — a couple on the same wifi, or phones behind one carrier address.
            Counting each of those networks once would give{" "}
            <span className="font-medium">
              A {uniqueCounts.A} &middot; B {uniqueCounts.B} &middot; C {uniqueCounts.C}
            </span>{" "}
            across {uniqueTotal} {uniqueTotal === 1 ? "vote" : "votes"}. If that flips the winner,
            trust the narrower number.
          </p>
        </div>
      )}

      {/* ===== TALLY ===== */}
      <div className="grid gap-4 sm:grid-cols-3">
        {COVERS.map((cover) => {
          const count = counts[cover.id];
          const percent = total ? Math.round((count / total) * 100) : 0;
          const isLeader = total > 0 && cover.id === leader.id;
          return (
            <div
              key={cover.id}
              className={`rounded-xl border bg-white p-4 ${
                isLeader ? "border-accent ring-1 ring-accent" : "border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={cover.src}
                  alt={`Cover ${cover.id}`}
                  width={825}
                  height={1280}
                  className="h-20 w-auto rounded border border-black/10 shadow-sm"
                />
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-muted">{cover.note}</p>
                  <p className="font-serif text-lg font-bold">Cover {cover.id}</p>
                  <p className="text-2xl font-bold tabular-nums">
                    {percent}%{" "}
                    <span className="text-sm font-normal text-muted">
                      ({count} {count === 1 ? "vote" : "votes"})
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-3 h-2 rounded-full bg-stone-200 overflow-hidden">
                <div
                  className={`h-full rounded-full ${isLeader ? "bg-accent" : "bg-stone-400"}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== COMMENTS ===== */}
      {comments.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 font-serif text-lg font-bold">What people said ({comments.length})</h2>
          <div className="space-y-2">
            {comments.map((row, i) => (
              <div key={i} className="rounded-lg border border-border bg-white px-4 py-3 text-sm">
                <span className="mr-2 inline-block rounded bg-accent-light px-1.5 py-0.5 text-xs font-bold text-accent-dark">
                  {row.choice}
                </span>
                &ldquo;{row.comment}&rdquo;
                <span className="ml-2 text-xs text-muted">
                  — {row.name || row.email || "anonymous"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== EVERY VOTE ===== */}
      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">When</th>
              <th className="px-4 py-3 font-medium">Vote</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  No votes yet.
                </td>
              </tr>
            )}
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-4 py-3 whitespace-nowrap text-muted">
                  {fmtDate(row.created_at)}
                  {row.ip_hash && (perNetwork.get(row.ip_hash) || 0) > 1 && (
                    <span
                      title="Another vote came from this same network"
                      className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800"
                    >
                      shared network
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 font-semibold">Cover {row.choice}</td>
                <td className="px-4 py-3">{row.name || "—"}</td>
                <td className="px-4 py-3">
                  {row.email ? (
                    <a href={`mailto:${row.email}`} className="text-accent hover:underline">
                      {row.email}
                    </a>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {emails.length > 0 && (
        <div className="mt-6 rounded-xl border border-border bg-white p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
            Emails collected (also pushed to the Kajabi book waitlist)
          </p>
          <p className="break-words text-sm text-muted">
            {emails.map((r) => r.email).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
