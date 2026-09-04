import { getSupabaseAdmin } from "@/lib/supabase";

type Submission = Record<string, unknown> & {
  type?: "waitlist" | "recommendation";
  firstName?: string;
  lastName?: string;
  email?: string;
  brand?: string;
};

function clean(value: unknown, max = 4000) {
  return typeof value === "string" ? value.trim().slice(0, max) : value;
}

function escapeHtml(value: unknown) {
  const text = Array.isArray(value) ? value.join(", ") : String(value ?? "");
  return text.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]!);
}

function rows(data: Submission) {
  const labels: Record<string, string> = {
    firstName: "First name", lastName: "Last name", email: "Email", brand: "Brand",
    needs: "Vendor needs", timing: "Hiring timing", details: "Need details",
    attribution: "Attribution", vendorName: "Vendor", vendorWebsite: "Website",
    category: "Category", workPeriod: "Worked together", scope: "Scope",
    companyStage: "Company stage", investment: "Investment", quality: "Quality",
    communication: "Communication", delivery: "On-time delivery", value: "Value",
    expectations: "Sales promise vs. delivery", stageFit: "Stage fit",
    disappointed: "If unavailable", bestFor: "Best fit", knowBeforeHiring: "Know before hiring",
    privateNotes: "Private notes", certification: "First-hand certification",
  };
  return Object.entries(labels).map(([key, label]) => {
    const value = data[key];
    if (value === undefined || value === null || value === "" || (Array.isArray(value) && !value.length)) return "";
    return `<tr><td style="padding:7px 14px 7px 0;color:#68717d;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:7px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`;
  }).join("");
}

export async function POST(request: Request) {
  try {
    const incoming = (await request.json()) as Submission;
    const data = Object.fromEntries(Object.entries(incoming).map(([key, value]) => [key, Array.isArray(value) ? value.map(item => clean(item, 200)) : clean(value)])) as Submission;
    if (!data.type || !["waitlist", "recommendation"].includes(data.type) || !data.firstName || !data.lastName || !data.email || !data.brand) return Response.json({ error: "Missing required fields" }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(data.email)) return Response.json({ error: "Invalid email" }, { status: 400 });
    if (data.type === "recommendation" && (!data.vendorName || !data.category || !data.scope || !data.certification)) return Response.json({ error: "Missing recommendation fields" }, { status: 400 });

    const supabase = getSupabaseAdmin();
    const databaseSave = supabase ? supabase.from("cpg_match_submissions").insert({ submission_type: data.type, first_name: data.firstName, last_name: data.lastName, email: data.email, brand: data.brand, vendor_name: data.vendorName || null, vendor_category: data.category || null, payload: data }).then(({ error }) => { if (error) console.error("CPG Match Supabase insert error:", error); }) : Promise.resolve();

    const isReview = data.type === "recommendation";
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "CPG Founders Group <onboarding@resend.dev>",
        to: process.env.CONTACT_FORM_NOTIFY_EMAIL!,
        reply_to: data.email,
        subject: isReview ? `CPG Match recommendation: ${data.vendorName} — ${data.firstName} ${data.lastName}` : `CPG Match waitlist: ${data.firstName} ${data.lastName} — ${data.brand}`,
        html: `<div style="font-family:system-ui,sans-serif;max-width:720px;color:#0b1a2e"><p style="color:#a56a16;font-weight:700;text-transform:uppercase;letter-spacing:.1em">CPG Match ${isReview ? "recommendation" : "waitlist"}</p><h2>${isReview ? escapeHtml(data.vendorName) : `${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}`}</h2><table style="border-collapse:collapse;width:100%">${rows(data)}</table><hr style="margin:28px 0;border:0;border-top:1px solid #e4e0d9"><p style="color:#68717d;font-size:12px">Submitted from cpgfoundersgroup.com/cpg-match</p></div>`,
      }),
    });
    await databaseSave;
    if (!emailResponse.ok) { console.error("CPG Match Resend error:", await emailResponse.text()); return Response.json({ error: "Submission failed" }, { status: 500 }); }
    return Response.json({ success: true });
  } catch (error) {
    console.error("CPG Match submission error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
