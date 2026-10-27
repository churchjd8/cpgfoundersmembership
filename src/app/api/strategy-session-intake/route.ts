import { NextResponse } from "next/server";

// Intake for a paid Jeff Strategy Session, submitted from
// /strategy-session/welcome. It goes to the team as an email so Jeff can do
// his homework before the 90 minutes; there's no Kajabi form behind it.

const escape = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

export async function POST(request: Request) {
  try {
    const f = await request.json();
    const required = ["name", "email", "business", "revenue", "focus", "question", "win"];
    if (required.some((k) => !String(f[k] ?? "").trim())) {
      return NextResponse.json({ error: "All required fields must be filled out" }, { status: 400 });
    }

    const rows: [string, unknown][] = [
      ["Name", f.name],
      ["Email", f.email],
      ["Business", f.business],
      ["Website", f.website],
      ["Revenue", f.revenue],
      ["Focus area", f.focus],
      ["The decision or question for Jeff", f.question],
      ["Deck / roadmap / materials", f.materials],
      ["What they've already tried", f.tried],
      ["What makes the 90 minutes a win", f.win],
    ];

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CPG Founders Group <notifications@cpgfoundersgroup.com>",
        to: process.env.CONTACT_FORM_NOTIFY_EMAIL!,
        reply_to: f.email,
        subject: `Strategy Session intake: ${f.name} (${f.business})`,
        html: `
          <h2>Strategy Session intake</h2>
          <p>Book their 90 minutes with Jeff and send him this before the call.</p>
          ${rows
            .filter(([, v]) => String(v ?? "").trim())
            .map(([k, v]) => `<p><strong>${k}:</strong><br>${escape(v)}</p>`)
            .join("<hr>")}
          <p style="color:#999;font-size:12px;">Submitted from cpgfoundersgroup.com/strategy-session/welcome</p>
        `,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return NextResponse.json({ error: "Could not send" }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Strategy session intake error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
