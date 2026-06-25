// Ingest endpoint for call notes / recaps (Granola via Deloris, or any source).
// Deloris POSTs one recap per meeting here, authenticated with the same
// DROPBOX_UPLOAD_TOKEN she already uses for /api/dropbox/upload. The admin panel
// reads these rows (joined to clients by email) and shows them per client.
//
//   POST /api/admin/call-notes
//   Authorization: Bearer <DROPBOX_UPLOAD_TOKEN>
//   { externalId, clientEmail, title, meetingDate, summary, attendees?, source? }
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function authorized(request: Request): boolean {
  const token = process.env.DROPBOX_UPLOAD_TOKEN;
  if (!token) {
    console.error("[call-notes] DROPBOX_UPLOAD_TOKEN not set");
    return false;
  }
  return request.headers.get("authorization") === `Bearer ${token}`;
}

type Payload = {
  externalId?: string;
  clientEmail?: string;
  title?: string;
  meetingDate?: string;
  summary?: string;
  attendees?: string[];
  source?: string;
};

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as Payload;
  const clientEmail = (body.clientEmail || "").trim().toLowerCase();
  if (!clientEmail) {
    return NextResponse.json({ error: "clientEmail is required" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "storage unavailable" }, { status: 500 });
  }

  const row = {
    external_id: body.externalId || null,
    client_email: clientEmail,
    title: body.title || null,
    meeting_date: body.meetingDate || null,
    summary: body.summary || null,
    attendees: Array.isArray(body.attendees) ? body.attendees : [],
    source: body.source || "granola",
  };

  // Idempotent: upsert on external_id when present, else plain insert.
  const query = body.externalId
    ? supabase.from("call_notes").upsert(row, { onConflict: "external_id" })
    : supabase.from("call_notes").insert(row);
  const { error } = await query;
  if (error) {
    console.error("[call-notes] insert error:", error.message);
    return NextResponse.json({ error: "could not save note" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
