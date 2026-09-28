import { parseReview, type PublicReview } from "@/lib/cpg-match-review";
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
  return text.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char]!,
  );
}

async function addToKajabi(data: Submission) {
  if (!process.env.KAJABI_API_KEY || !process.env.KAJABI_API_SECRET) return;
  try {
    const auth = await fetch("https://api.kajabi.com/v1/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.KAJABI_API_KEY,
        client_secret: process.env.KAJABI_API_SECRET,
        grant_type: "client_credentials",
      }),
    });
    if (!auth.ok) throw new Error(`Kajabi auth failed (${auth.status})`);
    const { access_token } = await auth.json();
    const result = await fetch(
      "https://api.kajabi.com/v1/forms/2149606810/submit",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/vnd.api+json",
        },
        body: JSON.stringify({
          data: {
            type: "form_submissions",
            attributes: {
              name: `${data.firstName} ${data.lastName}`,
              email: data.email,
              custom_3:
                data.type === "recommendation"
                  ? "CPG Match – Contributor"
                  : "CPG Match – Waitlist",
            },
          },
        }),
      },
    );
    if (!result.ok)
      throw new Error(`Kajabi submission failed (${result.status})`);
  } catch (error) {
    console.error("CPG Match Kajabi error:", error);
  }
}

function confirmationHtml(data: Submission) {
  const review = data.type === "recommendation";
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#0b1a2e;line-height:1.6">
    <p style="color:#a56a16;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">CPG Match</p>
    <h1 style="font-size:26px">${review ? "Thanks for sharing your experience." : "You’re on the database waitlist."}</h1>
    <p>Hi ${escapeHtml(data.firstName)},</p>
    <p>${review ? `We received your review of <strong>${escapeHtml(data.vendorName)}</strong>. You’ll receive early access when the CPG Match database opens.` : "We’ll let you know when the CPG Match database opens. Founders who review a vendor will receive early access."}</p>
    <p>CPG Match is being built to make honest, founder-to-founder vendor insight easier to find. Thanks for being part of it.</p>
    <p style="margin-top:28px">— Jeff Church + the CPG Match team</p>
    ${review ? "" : '<p><a href="https://cpgmatch.com" style="color:#a56a16;font-weight:700">Review a vendor and get early access →</a></p>'}
  </div>`;
}

export async function POST(request: Request) {
  try {
    const incoming = await request.json().catch(() => null);
    if (!incoming || typeof incoming !== "object" || Array.isArray(incoming))
      return Response.json({ error: "Invalid submission." }, { status: 400 });
    let data: Submission;
    let approvedReview: PublicReview | null = null;
    const receivedAt = new Date().toISOString();
    if (incoming.type === "recommendation") {
      try {
        const parsed = parseReview(incoming);
        approvedReview = parsed.publicReview;
        data = {
          ...parsed.answers,
          type: "recommendation",
          schemaVersion: 2,
          category: parsed.category,
          reviewApproved: true,
          approvedAt: receivedAt,
          vendorPermissionRecordedAt: receivedAt,
          vendorPermissionScope:
            "Share reviewer name and company with vendor for a positive review only",
          sourcingPermissionScope:
            "Nina may follow up privately; specific introductions require separate approval",
        };
      } catch (error) {
        return Response.json(
          { error: error instanceof Error ? error.message : "Invalid review." },
          { status: 400 },
        );
      }
    } else if (incoming.type === "waitlist") {
      data = { type: "waitlist" };
      for (const key of ["firstName", "lastName", "email", "brand"]) {
        if (typeof incoming[key] !== "string" || !incoming[key].trim())
          return Response.json(
            { error: "Missing required fields" },
            { status: 400 },
          );
        data[key] = clean(incoming[key], 200);
      }
      if (!/^\S+@\S+\.\S+$/.test(String(data.email)))
        return Response.json({ error: "Invalid email" }, { status: 400 });
      data.needs = Array.isArray(incoming.needs)
        ? incoming.needs
            .filter((v: unknown) => typeof v === "string")
            .map((v: string) => v.slice(0, 200))
            .slice(0, 30)
        : [];
    } else
      return Response.json(
        { error: "Invalid submission type." },
        { status: 400 },
      );

    const supabase = getSupabaseAdmin();
    if (!supabase)
      return Response.json(
        { error: "Submissions are temporarily unavailable. Please try again." },
        { status: 503 },
      );
    const { error: saveError } = await supabase
      .from("cpg_match_submissions")
      .insert({
        submission_type: data.type,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        brand: data.brand,
        vendor_name: data.vendorName || null,
        vendor_category:
          data.type === "recommendation"
            ? (data.category as string[]).join(", ")
            : null,
        payload: data,
        review_schema_version: approvedReview ? 2 : null,
        public_review: approvedReview,
        approved_at: approvedReview ? receivedAt : null,
        publication_status: "pending",
      });
    if (saveError) {
      console.error("CPG Match Supabase insert error:", saveError);
      return Response.json(
        { error: "We couldn’t save your submission. Please try again." },
        { status: 500 },
      );
    }

    const isReview = data.type === "recommendation";
    const emailHeaders = {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    };
    // Internal notification intentionally removed: submissions are saved to Supabase
    // and visible at /cpg-match-admin, so no email goes to the notify inbox.
    const [confirmationResult] = await Promise.allSettled([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: emailHeaders,
        body: JSON.stringify({
          from: "CPG Match <scheduling@cpgfoundersgroup.com>",
          to: data.email,
          subject: isReview
            ? "Your CPG Match review was received"
            : "You’re on the CPG Match database waitlist",
          html: confirmationHtml(data),
        }),
      }),
      addToKajabi(data),
    ]);
    if (confirmationResult.status === "rejected")
      console.error("CPG Match confirmation error:", confirmationResult.reason);
    else if (!confirmationResult.value.ok)
      console.error(
        "CPG Match Resend error:",
        await confirmationResult.value.text(),
      );
    return Response.json({ success: true });
  } catch (error) {
    console.error("CPG Match submission error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
