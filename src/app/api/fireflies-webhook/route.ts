import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { generateRecap, recapToHtml, type MeetingPayload } from "@/lib/meeting-recap";
import { buildRecapDocx, docxFilename } from "@/lib/recap-docx";
import { uploadDocxToDropbox } from "@/lib/dropbox";
import { fetchTranscript, flattenTranscript, summaryBlock } from "@/lib/fireflies";
import { saveRecapAsCallNote } from "@/lib/admin-call-notes";

// Webhook → GraphQL fetch → Claude → docx → Dropbox + email typically runs 8-16s.
export const maxDuration = 60;
export const dynamic = "force-dynamic";

// Fireflies signs the raw body with HMAC-SHA256 and sends `x-hub-signature`
// in the standard `sha256=<hex>` form. (Same convention as GitHub/Meta.)
function verifyFirefliesSignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const expected =
    "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  if (header.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(header), Buffer.from(expected));
}

type FirefliesWebhookBody = {
  meetingId?: string;
  eventType?: string;
  clientReferenceId?: string;
};

export async function POST(request: Request) {
  const rawBody = await request.text();

  const secret = process.env.FIREFLIES_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[fireflies-webhook] FIREFLIES_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  const sig = request.headers.get("x-hub-signature");
  if (!verifyFirefliesSignature(rawBody, sig, secret)) {
    console.warn("[fireflies-webhook] signature rejected");
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let body: FirefliesWebhookBody;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (body.eventType && body.eventType !== "Transcription completed") {
    // Acknowledge but skip other event types.
    return NextResponse.json({ ok: true, skipped: body.eventType });
  }

  const meetingId = body.meetingId;
  if (!meetingId) {
    return NextResponse.json({ error: "missing meetingId" }, { status: 400 });
  }

  try {
    const transcript = await fetchTranscript(meetingId);

    const meeting: MeetingPayload = {
      title: transcript.title || "Untitled meeting",
      url: transcript.transcript_url || "",
      recording_id: transcript.id,
      start_time: transcript.date
        ? new Date(transcript.date).toISOString()
        : transcript.dateString || new Date().toISOString(),
      end_time: "",
      attendees: (transcript.meeting_attendees ?? []).flatMap((a) => {
        const name = (a.displayName || a.name || a.email || "").trim();
        if (!name) return [];
        const entry: { name: string; email?: string } = { name };
        if (a.email) entry.email = a.email;
        return [entry];
      }),
      summary: summaryBlock(transcript.summary),
      transcript: flattenTranscript(transcript.sentences),
      action_items: transcript.summary?.action_items ?? undefined,
    };

    console.log(
      `[fireflies-webhook] processing "${meeting.title}" (${meetingId}) attendees=${meeting.attendees.length} transcriptLen=${meeting.transcript?.length ?? 0}`,
    );

    const recap = await generateRecap(meeting);
    const docxBuffer = await buildRecapDocx(recap, meeting);
    const filename = docxFilename(recap, meeting);

    const dropboxFolder = (process.env.DROPBOX_RECAP_FOLDER ?? "/Call Recaps").replace(/\/+$/, "");
    const destPath = `${dropboxFolder}/${filename}`;

    const [dropboxResult, emailResult, noteResult] = await Promise.allSettled([
      uploadDocxToDropbox(docxBuffer, destPath),
      sendRecapEmail({
        to: process.env.JEFF_RECAP_RECIPIENT ?? "jeff@cpgfoundersgroup.com",
        from: process.env.RECAP_FROM_EMAIL ?? "CPG Founders Group <onboarding@resend.dev>",
        subject: recap.subject,
        html: recapToHtml(recap, meeting),
        docx: docxBuffer,
        filename,
      }),
      // Best-effort: also surface this recap in the admin panel, routed to the
      // matching client by attendee email. Never blocks Dropbox/email.
      saveRecapAsCallNote({ meetingId, meeting, recap }),
    ]);

    if (dropboxResult.status === "rejected") {
      console.error("[fireflies-webhook] dropbox upload failed:", dropboxResult.reason);
    }
    if (emailResult.status === "rejected") {
      console.error("[fireflies-webhook] email send failed:", emailResult.reason);
    }
    if (noteResult.status === "rejected") {
      console.error("[fireflies-webhook] call-note save failed:", noteResult.reason);
    }

    const filedUnder = noteResult.status === "fulfilled" ? noteResult.value : null;

    return NextResponse.json({
      ok: true,
      meeting: { id: meetingId, title: meeting.title },
      dropbox:
        dropboxResult.status === "fulfilled"
          ? { uploaded: true, path: dropboxResult.value.path }
          : { uploaded: false, error: String(dropboxResult.reason) },
      email:
        emailResult.status === "fulfilled"
          ? { sent: true }
          : { sent: false, error: String(emailResult.reason) },
      callNote: filedUnder ? { saved: true, clientEmail: filedUnder } : { saved: false },
    });
  } catch (err) {
    console.error("[fireflies-webhook] processing failed:", err);
    const msg = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ error: "processing failed", detail: msg }, { status: 500 });
  }
}

async function sendRecapEmail(args: {
  to: string;
  from: string;
  subject: string;
  html: string;
  docx: Buffer;
  filename: string;
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: args.from,
      to: args.to,
      subject: args.subject,
      html: args.html,
      attachments: [
        {
          filename: args.filename,
          content: args.docx.toString("base64"),
        },
      ],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend send failed (${res.status}): ${err}`);
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, name: "fireflies-webhook" });
}
