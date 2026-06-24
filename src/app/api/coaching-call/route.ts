import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { upcomingSlots } from "@/lib/coaching-slots";

const PACIFIC_TZ = "America/Los_Angeles";

async function getTakenSlotIds(): Promise<Set<string>> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return new Set();
  const { data, error } = await supabase
    .from("coaching_bookings")
    .select("slot_id");
  if (error) {
    console.error("Supabase read error (coaching_bookings):", error.message);
    return new Set();
  }
  return new Set((data || []).map((r: { slot_id: string }) => r.slot_id));
}

/** GET — list upcoming, not-yet-booked slots. */
export async function GET() {
  try {
    const taken = await getTakenSlotIds();
    const slots = upcomingSlots().filter((s) => !taken.has(s.id));
    return NextResponse.json({ slots });
  } catch (err) {
    console.error("Coaching slots GET error:", err);
    return NextResponse.json({ slots: [] }, { status: 500 });
  }
}

function fmt(iso: string, timeZone: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(new Date(iso));
  } catch {
    return new Date(iso).toISOString();
  }
}

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  slotId?: string;
  timezone?: string;
};

/** POST — book a slot: record it, notify Joshua. */
export async function POST(request: Request) {
  try {
    const { name, email, phone, slotId, timezone } = (await request.json()) as Payload;

    if (!name || !email || !phone || !slotId) {
      return NextResponse.json(
        { error: "Please fill in your name, email, phone, and pick a time." },
        { status: 400 },
      );
    }

    // Slot must be a real, still-upcoming slot.
    const slot = upcomingSlots().find((s) => s.id === slotId);
    if (!slot) {
      return NextResponse.json(
        { error: "That time is no longer available. Please pick another." },
        { status: 409 },
      );
    }

    const clientTz = timezone && timezone.trim() ? timezone.trim() : PACIFIC_TZ;
    const supabase = getSupabaseAdmin();

    // Prevent double-booking: insert, relying on a UNIQUE constraint on slot_id.
    if (supabase) {
      const taken = await getTakenSlotIds();
      if (taken.has(slotId)) {
        return NextResponse.json(
          { error: "Someone just grabbed that time. Please pick another." },
          { status: 409 },
        );
      }
      const { error } = await supabase.from("coaching_bookings").insert({
        slot_id: slotId,
        slot_start: slot.startIso,
        name,
        email,
        phone,
        client_timezone: clientTz,
      });
      if (error) {
        // 23505 = unique_violation -> someone booked between the read and write.
        if (error.code === "23505") {
          return NextResponse.json(
            { error: "Someone just grabbed that time. Please pick another." },
            { status: 409 },
          );
        }
        console.error("Supabase insert error (coaching_bookings):", error.message);
      }
    }

    const theirTime = fmt(slot.startIso, clientTz);
    const pacificTime = fmt(slot.startIso, PACIFIC_TZ);

    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1c1917;">
        <h2 style="margin:0 0 16px;">📅 New coaching call booking</h2>
        <table style="border-collapse:collapse;width:100%;font-size:14px;">
          <tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;">Name</td><td style="padding:6px 0;"><strong>${name}</strong></td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;">Email</td><td style="padding:6px 0;">${email}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;">Phone</td><td style="padding:6px 0;">${phone}</td></tr>
        </table>
        <h3 style="margin:24px 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;color:#b45309;">Requested time</h3>
        <table style="border-collapse:collapse;width:100%;font-size:14px;">
          <tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;">Pacific (yours)</td><td style="padding:6px 0;"><strong>${pacificTime}</strong></td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;">Their timezone</td><td style="padding:6px 0;">${theirTime} <span style="color:#999;">(${clientTz})</span></td></tr>
        </table>
        <p style="margin:24px 0 0;padding:12px 16px;background:#fffbeb;border-radius:8px;font-size:13px;color:#92400e;">
          Add this to Jeff's calendar manually, then reply to confirm with ${name.split(" ")[0]}.
        </p>
        <hr style="margin:28px 0 12px;border:none;border-top:1px solid #e7e5e4;">
        <p style="color:#999;font-size:12px;margin:0;">Booked via cpgfoundersgroup.com/schedule-call</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CPG Founders Group <onboarding@resend.dev>",
        to: process.env.CONTACT_FORM_NOTIFY_EMAIL!,
        reply_to: email,
        subject: `📅 Coaching call request: ${name} — ${pacificTime} PT`,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", errText);
      return NextResponse.json({ error: "Could not send the request. Try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Coaching booking error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
