// Vercel cron that pulls new Granola notes and files each into the admin
// panel's `call_notes` table, routed to the right client.
//
// Per tick:
//   1. List Granola notes created in the last GRANOLA_LOOKBACK_DAYS.
//   2. Drop any already stored (external_id `granola:<id>`) — cheap, no detail fetch.
//   3. For each new note: fetch detail, route to a client, upsert into call_notes.
//      Routing is email-first (attendees ∩ roster); ambiguous notes fall back to
//      a Claude inference that SKIPS on doubt rather than misfiling.
//
// Auth: protected by CRON_SECRET (Vercel sends `Authorization: Bearer <CRON_SECRET>`
// on scheduled invocations). A manual GET without the header returns a health
// probe. Append `?dry=1` (when authorized) to preview routing without writing.
import { NextResponse } from "next/server";
import { listNotesSince, getNote } from "@/lib/granola";
import { routeNoteToClient } from "@/lib/client-routing";
import { saveGranolaNoteAsCallNote } from "@/lib/admin-call-notes";
import { getSupabaseAdmin } from "@/lib/supabase";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

const DEFAULT_LOOKBACK_DAYS = 60;
// Cap per run guards against timeout on a huge backlog. We process NEWEST first
// (most recent meetings matter most), so new client notes are never starved by
// older unstored ones; any leftover backlog is old and can wait for next tick.
const MAX_PER_RUN = 60;

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // No secret set → allow (dev mode).
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: true, name: "granola-sync" });
  }
  return runPoll(request);
}

// Allow POST too, so a manual webhook-style trigger works alongside Vercel Cron.
export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return runPoll(request);
}

function lookbackSince(): string {
  const days = Number(process.env.GRANOLA_LOOKBACK_DAYS) || DEFAULT_LOOKBACK_DAYS;
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

/** external_ids already in call_notes for source=granola, as a fast lookup set. */
async function existingGranolaIds(): Promise<Set<string>> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return new Set();
  const { data, error } = await supabase
    .from("call_notes")
    .select("external_id")
    .eq("source", "granola");
  if (error) {
    console.error("[granola-sync] existing ids read failed:", error.message);
    return new Set();
  }
  return new Set((data || []).map((r) => r.external_id as string).filter(Boolean));
}

async function runPoll(request: Request) {
  const url = new URL(request.url);
  const dryRun = url.searchParams.get("dry") === "1";
  const since = url.searchParams.get("since") || lookbackSince();
  const startedAt = new Date().toISOString();

  let summaries;
  try {
    summaries = await listNotesSince(since);
  } catch (err) {
    console.error("[granola-sync] listNotesSince failed:", err);
    return NextResponse.json(
      { error: "granola list failed", detail: errMsg(err) },
      { status: 502 },
    );
  }

  const existing = await existingGranolaIds();
  const fresh = summaries.filter((n) => !existing.has(`granola:${n.id}`));
  // Newest → oldest: most recent meetings file first; only old backlog defers.
  fresh.sort((a, b) => b.created_at.localeCompare(a.created_at));
  const batch = fresh.slice(0, MAX_PER_RUN);

  const filed: { id: string; title: string | null; client: string; method: string }[] = [];
  const skipped: { id: string; title: string | null; reason: string }[] = [];
  const failed: { id: string; reason: string }[] = [];

  for (const summary of batch) {
    try {
      const detail = await getNote(summary.id);
      const decision = await routeNoteToClient(detail);
      if (!decision.email) {
        skipped.push({ id: summary.id, title: detail.title, reason: decision.reason });
        continue;
      }
      if (!dryRun) {
        const ok = await saveGranolaNoteAsCallNote({ detail, clientEmail: decision.email });
        if (!ok) {
          failed.push({ id: summary.id, reason: "upsert failed" });
          continue;
        }
      }
      filed.push({
        id: summary.id,
        title: detail.title,
        client: decision.email,
        method: decision.method,
      });
    } catch (err) {
      console.error(`[granola-sync] note ${summary.id} failed:`, err);
      failed.push({ id: summary.id, reason: errMsg(err) });
    }
  }

  return NextResponse.json({
    ok: true,
    dryRun,
    since,
    startedAt,
    counts: {
      listed: summaries.length,
      alreadyStored: summaries.length - fresh.length,
      newThisRun: batch.length,
      remainingBacklog: Math.max(0, fresh.length - batch.length),
      filed: filed.length,
      skipped: skipped.length,
      failed: failed.length,
    },
    filed,
    skipped,
    failed,
  });
}

function errMsg(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}
