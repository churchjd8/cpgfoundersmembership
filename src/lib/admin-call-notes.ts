// Persists meeting recaps into the admin panel's `call_notes` table, routed to
// the right client by attendee email. Used by the Fireflies webhook so the
// per-client "Call notes" section populates automatically from real meetings —
// no Granola/Deloris dependency. Mirrors the row shape that
// POST /api/admin/call-notes writes (source-agnostic).
import { getSupabaseAdmin } from "@/lib/supabase";
import type { Recap, MeetingPayload } from "@/lib/meeting-recap";
import { isInternalEmail } from "@/lib/client-routing";
import {
  noteMeetingDate,
  noteAttendeeLabels,
  type GranolaNoteDetail,
} from "@/lib/granola";

// "Jeff's side of the table" detection lives in client-routing (and reads
// JEFF_EMAILS) so the Granola and Fireflies paths agree on who's internal.
function isInternal(email: string): boolean {
  return isInternalEmail(email);
}

/**
 * Decide which client a meeting belongs to from its attendees.
 *  - Prefer an attendee email that is a KNOWN client (admin_clients row).
 *  - Otherwise, if exactly one external attendee remains, use that (a client
 *    not yet curated in admin_clients — the detail page still works by email).
 *  - Ambiguous (0 or >1 candidates) → null, and the note is skipped.
 */
export async function resolveClientEmail(
  attendees: { name: string; email?: string }[],
): Promise<string | null> {
  const external = Array.from(
    new Set(
      attendees
        .map((a) => (a.email || "").trim().toLowerCase())
        .filter((e) => e && e.includes("@") && !isInternal(e)),
    ),
  );
  if (external.length === 0) return null;

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase
      .from("admin_clients")
      .select("email")
      .in("email", external);
    if (error) {
      console.error("[admin-call-notes] client lookup error:", error.message);
    } else if (data && data.length > 0) {
      const known = data.map((r) => (r.email as string).toLowerCase());
      // Only confident when a single known client is on the call.
      if (known.length === 1) return known[0];
      // Multiple known clients on one call is unexpected — don't guess.
      return null;
    }
  }

  // No curated match: fall back only when there's a single external attendee.
  return external.length === 1 ? external[0] : null;
}

/** Flatten a structured Recap into the plain-text summary the panel displays. */
export function recapToPlainSummary(recap: Recap): string {
  const parts: string[] = [];
  if (recap.one_liner) parts.push(recap.one_liner);
  if (recap.tldr?.length) {
    parts.push(["TL;DR:", ...recap.tldr.map((t) => `• ${t}`)].join("\n"));
  }
  if (recap.decisions?.length) {
    parts.push(["Decisions:", ...recap.decisions.map((d) => `• ${d}`)].join("\n"));
  }
  if (recap.action_items?.length) {
    parts.push(
      [
        "Action items:",
        ...recap.action_items.map(
          (a) => `• ${a.task}${a.owner ? ` (${a.owner})` : ""}${a.due ? ` — ${a.due}` : ""}`,
        ),
      ].join("\n"),
    );
  }
  if (recap.next_steps) parts.push(`Next steps: ${recap.next_steps}`);
  return parts.join("\n\n").trim();
}

/**
 * Best-effort: route a recap to a client and upsert it into call_notes.
 * Returns the client email it filed under, or null if it couldn't route /
 * storage was unavailable. Never throws — callers run it alongside other I/O.
 */
export async function saveRecapAsCallNote(args: {
  meetingId: string;
  meeting: MeetingPayload;
  recap: Recap;
}): Promise<string | null> {
  const { meetingId, meeting, recap } = args;
  try {
    const clientEmail = await resolveClientEmail(meeting.attendees);
    if (!clientEmail) {
      console.log(`[admin-call-notes] no single client match for "${meeting.title}" — skipping note`);
      return null;
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) return null;

    const row = {
      external_id: `fireflies:${meetingId}`,
      client_email: clientEmail,
      title: recap.meeting_title || meeting.title || null,
      meeting_date: meeting.start_time || null,
      summary: recapToPlainSummary(recap) || meeting.summary || null,
      attendees: meeting.attendees.map((a) => (a.email ? `${a.name} <${a.email}>` : a.name)),
      source: "fireflies",
    };

    const { error } = await supabase
      .from("call_notes")
      .upsert(row, { onConflict: "external_id" });
    if (error) {
      console.error("[admin-call-notes] upsert error:", error.message);
      return null;
    }
    console.log(`[admin-call-notes] filed "${row.title}" under ${clientEmail}`);
    return clientEmail;
  } catch (err) {
    console.error("[admin-call-notes] saveRecapAsCallNote failed:", err);
    return null;
  }
}

/**
 * Upsert a Granola note (already routed to a client) into call_notes. Stores
 * Granola's own AI summary verbatim — no second LLM pass. Idempotent on the
 * note id, so re-running the sync refreshes rather than duplicates. Never throws.
 */
export async function saveGranolaNoteAsCallNote(args: {
  detail: GranolaNoteDetail;
  clientEmail: string;
}): Promise<boolean> {
  const { detail, clientEmail } = args;
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return false;

    const row = {
      external_id: `granola:${detail.id}`,
      client_email: clientEmail.trim().toLowerCase(),
      title: detail.title || null,
      meeting_date: noteMeetingDate(detail),
      summary: detail.summary_text || detail.summary_markdown || null,
      attendees: noteAttendeeLabels(detail),
      source: "granola",
    };

    const { error } = await supabase
      .from("call_notes")
      .upsert(row, { onConflict: "external_id" });
    if (error) {
      console.error("[admin-call-notes] granola upsert error:", error.message);
      return false;
    }
    console.log(`[admin-call-notes] filed granola "${row.title}" under ${row.client_email}`);
    return true;
  } catch (err) {
    console.error("[admin-call-notes] saveGranolaNoteAsCallNote failed:", err);
    return false;
  }
}
