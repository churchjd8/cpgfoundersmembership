// Client for Granola's official public API (https://docs.granola.ai).
//   Base:  https://public-api.granola.ai/v1
//   Auth:  Authorization: Bearer <GRANOLA_API_KEY>   (key looks like grn_...)
//
// The list endpoint returns a *minimal* note (id/title/owner/timestamps); the
// detail endpoint is where attendees, the calendar event, and the AI summary
// live — so callers list to discover ids, then fetch detail per note.

const BASE = "https://public-api.granola.ai/v1";

// Rate limits (per docs): burst 25 / 5s, sustained 5/s. We poll a small window
// sequentially, so we stay well under without extra throttling.

export type GranolaOwner = { name: string | null; email: string | null };

// Shape returned by GET /notes (list).
export type GranolaNoteSummary = {
  id: string;
  object: "note";
  title: string | null;
  owner: GranolaOwner;
  created_at: string;
  updated_at: string;
};

export type GranolaAttendee = { name: string | null; email: string | null };

export type GranolaCalendarEvent = {
  event_title?: string | null;
  invitees?: string[]; // list of email strings
  organiser?: { name?: string | null; email?: string | null } | null;
  calendar_event_id?: string | null;
  scheduled_start_time?: string | null;
  scheduled_end_time?: string | null;
};

// Shape returned by GET /notes/{id} (detail).
export type GranolaNoteDetail = GranolaNoteSummary & {
  web_url: string | null;
  attendees: GranolaAttendee[];
  calendar_event: GranolaCalendarEvent | null;
  summary_text: string | null;
  summary_markdown: string | null;
};

type ListResponse = {
  notes: GranolaNoteSummary[];
  hasMore: boolean;
  cursor: string | null;
};

function apiKey(): string {
  const key = process.env.GRANOLA_API_KEY;
  if (!key) throw new Error("GRANOLA_API_KEY is not set");
  return key;
}

async function granolaGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      Accept: "application/json",
    },
    // Route handlers aren't cached by default, but be explicit: we always want
    // fresh notes, never a build-time or data-cache snapshot.
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Granola ${path} -> HTTP ${res.status}: ${body.slice(0, 200)}`);
  }
  return (await res.json()) as T;
}

/**
 * List every note created after `createdAfter` (ISO 8601), following the
 * cursor through all pages. Pass undefined to list from the start.
 */
export async function listNotesSince(createdAfter?: string): Promise<GranolaNoteSummary[]> {
  const all: GranolaNoteSummary[] = [];
  let cursor: string | null = null;
  // Hard page cap so a bad cursor can never loop forever.
  for (let page = 0; page < 50; page++) {
    const params = new URLSearchParams();
    if (createdAfter) params.set("created_after", createdAfter);
    if (cursor) params.set("cursor", cursor);
    const qs = params.toString();
    const data: ListResponse = await granolaGet<ListResponse>(`/notes${qs ? `?${qs}` : ""}`);
    all.push(...(data.notes || []));
    if (!data.hasMore || !data.cursor) break;
    cursor = data.cursor;
  }
  return all;
}

/** Fetch a single note's full detail (attendees, calendar event, summary). */
export async function getNote(id: string): Promise<GranolaNoteDetail> {
  return granolaGet<GranolaNoteDetail>(`/notes/${encodeURIComponent(id)}`);
}

/**
 * All email addresses associated with a note's meeting: explicit attendees plus
 * calendar invitees and the organiser. Lower-cased and de-duped. This is the
 * routing signal — which client a note belongs to.
 */
export function noteEmails(detail: GranolaNoteDetail): string[] {
  const emails = new Set<string>();
  for (const a of detail.attendees || []) {
    if (a.email) emails.add(a.email.trim().toLowerCase());
  }
  const ce = detail.calendar_event;
  if (ce) {
    for (const inv of ce.invitees || []) {
      if (typeof inv === "string" && inv.includes("@")) emails.add(inv.trim().toLowerCase());
    }
    if (ce.organiser?.email) emails.add(ce.organiser.email.trim().toLowerCase());
  }
  return [...emails];
}

/** Best meeting timestamp: scheduled start if known, else note creation time. */
export function noteMeetingDate(detail: GranolaNoteDetail): string {
  return detail.calendar_event?.scheduled_start_time || detail.created_at;
}

/** "Name <email>" attendee strings for storage/display. */
export function noteAttendeeLabels(detail: GranolaNoteDetail): string[] {
  return (detail.attendees || []).map((a) =>
    a.email ? `${a.name || a.email} <${a.email}>` : a.name || "",
  ).filter(Boolean);
}
