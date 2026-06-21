import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

type Payload = {
  name?: string;
  email?: string;
  role?: string;
  cpgCategory?: string;
  cpgCategoryOther?: string;
  businessStage?: string;
  businessStageOther?: string;
  usageFrequency?: string;
  workflow?: string;
  biggestValue?: string;
  ratingOverall?: number | null;
  ratingEase?: number | null;
  ratingUI?: number | null;
  ratingJobHelp?: number | null;
  gurusUsed?: string;
  discoveryHelp?: string;
  discoveryHelpOther?: string;
  competingTools?: string[];
  competingToolsOther?: string;
  wouldUpgrade?: string;
  pricePoint?: string;
  pricePointOther?: string;
  whatWouldChange?: string;
  nps?: number | null;
  openFeedback?: string;
};

const USAGE_LABELS: Record<string, string> = {
  "daily-weekly": "Daily or weekly",
  "few-times": "A few times this month",
  "once-twice": "Once or twice since signup",
  "not-at-all": "Not at all since signup",
};

const GURU_LABELS: Record<string, string> = {
  "yes-multiple": "Yes — I use multiple Gurus regularly",
  "yes-few": "Yes — I have tried a few",
  "no-didnt-know": "No — I did not know they existed",
  "no-couldnt-find": "No — I tried to find them but could not",
};

const UPGRADE_LABELS: Record<string, string> = {
  yes: "Yes — definitely interested",
  maybe: "Maybe — depends on price and features",
  no: "No — not interested",
};

function row(label: string, value: string | number | null | undefined) {
  if (value === undefined || value === null || value === "") return "";
  const safe = String(value).replace(/\n/g, "<br>");
  return `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;font-size:13px;white-space:nowrap;">${label}</td><td style="padding:6px 0;font-size:13px;">${safe}</td></tr>`;
}

function section(title: string, body: string) {
  if (!body.trim()) return "";
  return `
    <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:0.05em;color:#b45309;">${title}</h3>
    <table style="border-collapse:collapse;width:100%;">${body}</table>
  `;
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Payload;

    if (!data.role || !data.cpgCategory || !data.businessStage) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!data.usageFrequency || !data.biggestValue) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const category =
      data.cpgCategory === "Other"
        ? `Other — ${data.cpgCategoryOther || ""}`
        : data.cpgCategory;
    const stage =
      data.businessStage === "Other"
        ? `Other — ${data.businessStageOther || ""}`
        : data.businessStage;
    const tools = (data.competingTools || [])
      .map((t) => (t === "Other" ? `Other — ${data.competingToolsOther || ""}` : t))
      .join(", ");
    const price =
      data.pricePoint === "Other"
        ? `Other — ${data.pricePointOther || ""}`
        : data.pricePoint;
    const discovery =
      data.discoveryHelp === "Other"
        ? `Other — ${data.discoveryHelpOther || ""}`
        : data.discoveryHelp;

    const npsBucket =
      data.nps === null || data.nps === undefined
        ? null
        : data.nps >= 9
          ? "Promoter"
          : data.nps >= 7
            ? "Passive"
            : "Detractor";

    const identityHtml =
      row("Name", data.name) +
      row("Email", data.email) +
      row("Role", data.role) +
      row("CPG category", category) +
      row("Business stage", stage);

    const usageHtml =
      row("Usage frequency", USAGE_LABELS[data.usageFrequency || ""] || data.usageFrequency) +
      row("Workflow", data.workflow) +
      row("Biggest value", data.biggestValue);

    const ratingsHtml =
      row("Overall (1-7)", data.ratingOverall) +
      row("Ease of use (1-7)", data.ratingEase) +
      row("UI / Visual (1-7)", data.ratingUI) +
      row("Helps with job (1-7)", data.ratingJobHelp);

    const gurusHtml =
      row("Gurus used", GURU_LABELS[data.gurusUsed || ""] || data.gurusUsed) +
      row("Discovery help", discovery);

    const toolsHtml = row("Competing tools", tools);

    const pricingHtml =
      row("Upgrade interest", UPGRADE_LABELS[data.wouldUpgrade || ""] || data.wouldUpgrade) +
      row("Price point", price);

    const improvementHtml = row("What would change", data.whatWouldChange);

    const npsHtml =
      row("NPS", data.nps !== null && data.nps !== undefined ? `${data.nps} (${npsBucket})` : null) +
      row("Open feedback", data.openFeedback);

    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:680px;margin:0 auto;color:#1c1917;">
        <h2 style="margin:0 0 4px;">New Babu Beta Survey response</h2>
        <p style="margin:0;color:#666;font-size:13px;">
          From ${data.name || "(anonymous)"}${data.email ? ` — ${data.email}` : ""}
        </p>
        ${section("Identity", identityHtml)}
        ${section("Usage & value", usageHtml)}
        ${section("Satisfaction ratings", ratingsHtml)}
        ${section("Gurus", gurusHtml)}
        ${section("Competing tools", toolsHtml)}
        ${section("Pricing", pricingHtml)}
        ${section("What would change", improvementHtml)}
        ${section("NPS & open feedback", npsHtml)}
        <hr style="margin:32px 0 12px;border:none;border-top:1px solid #e7e5e4;">
        <p style="color:#999;font-size:12px;margin:0;">
          Submitted from cpgfoundersgroup.com/babu-beta-survey
        </p>
      </div>
    `;

    const npsTag = npsBucket ? ` ${npsBucket}` : "";
    const subject = `📋 Babu Survey: ${data.name || data.email || "anonymous"}${npsTag}`;

    const supabase = getSupabaseAdmin();
    const supabasePromise = supabase
      ? supabase
          .from("babu_survey_responses")
          .insert({
            name: data.name || null,
            email: data.email || null,
            role: data.role,
            cpg_category: category,
            business_stage: stage,
            usage_frequency: data.usageFrequency,
            workflow: data.workflow || null,
            biggest_value: data.biggestValue,
            rating_overall: data.ratingOverall ?? null,
            rating_ease: data.ratingEase ?? null,
            rating_ui: data.ratingUI ?? null,
            rating_job_help: data.ratingJobHelp ?? null,
            gurus_used: data.gurusUsed || null,
            discovery_help: discovery || null,
            competing_tools: data.competingTools || [],
            would_upgrade: data.wouldUpgrade || null,
            price_point: price || null,
            what_would_change: data.whatWouldChange,
            nps: data.nps ?? null,
            nps_bucket: npsBucket,
            open_feedback: data.openFeedback || null,
            raw: data,
          })
          .then(({ error }) => {
            if (error) console.error("Supabase insert error:", error);
          })
      : Promise.resolve();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CPG Founders Group <onboarding@resend.dev>",
        to: process.env.CONTACT_FORM_NOTIFY_EMAIL!,
        ...(data.email ? { reply_to: data.email } : {}),
        subject,
        html,
      }),
    });

    await supabasePromise;

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", errText);
      return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Babu survey submission error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
