import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

type Application = {
  name: string;
  email: string;
  business: string;
  website: string;
  about: string;
  challenge: string;
  question: string;
  inGroup: string;
};

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}

async function sendNotificationEmail(a: Application) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "CPG Founders Group <onboarding@resend.dev>",
      to: process.env.CONTACT_FORM_NOTIFY_EMAIL!,
      reply_to: a.email,
      subject: `🔥 Hot Seat Application: ${a.name} (${a.business})`,
      html: `
        <h2>New Hot Seat Application</h2>
        <p><strong>Name:</strong> ${esc(a.name)}</p>
        <p><strong>Email:</strong> ${esc(a.email)}</p>
        <p><strong>Business:</strong> ${esc(a.business)}</p>
        ${a.website ? `<p><strong>Website:</strong> ${esc(a.website)}</p>` : ""}
        <p><strong>In the WhatsApp group:</strong> ${esc(a.inGroup || "Not answered")}</p>
        <hr>
        <p><strong>About the business:</strong></p>
        <p>${esc(a.about)}</p>
        <hr>
        <p><strong>Biggest challenge right now:</strong></p>
        <p>${esc(a.challenge)}</p>
        <hr>
        <p><strong>The question for the group:</strong></p>
        <p>${esc(a.question)}</p>
        <hr>
        <p style="color:#999;font-size:12px;">Submitted from cpgfoundersgroup.com/hot-seat</p>
      `,
    }),
  });

  if (!res.ok) {
    console.error("Resend error:", await res.text());
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const a: Application = {
      name: String(body.name ?? "").trim(),
      email: String(body.email ?? "").trim(),
      business: String(body.business ?? "").trim(),
      website: String(body.website ?? "").trim(),
      about: String(body.about ?? "").trim(),
      challenge: String(body.challenge ?? "").trim(),
      question: String(body.question ?? "").trim(),
      inGroup: String(body.inGroup ?? "").trim(),
    };

    if (!a.name || !a.email || !a.business || !a.about || !a.challenge || !a.question) {
      return NextResponse.json(
        { error: "All required fields must be filled out" },
        { status: 400 },
      );
    }

    // Supabase is the record, the email is the nudge. The application only
    // fails if both miss, so one outage can't lose a founder's submission.
    const supabase = getSupabaseAdmin();
    const [saved, notified] = await Promise.all([
      supabase
        ? supabase
            .from("hot_seat_applications")
            .insert({
              name: a.name,
              email: a.email,
              business: a.business,
              website: a.website || null,
              about: a.about,
              challenge: a.challenge,
              question: a.question,
              in_group: a.inGroup || null,
            })
            .then(({ error }) => {
              if (error) console.error("hot_seat_applications insert error:", error);
              return !error;
            })
        : Promise.resolve(false),
      sendNotificationEmail(a).catch((err) => {
        console.error("Hot Seat notification error:", err);
        return false;
      }),
    ]);

    if (!saved && !notified) {
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Hot Seat application error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
