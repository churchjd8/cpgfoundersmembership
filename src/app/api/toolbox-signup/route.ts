import { NextResponse } from "next/server";

// Book toolbox opt-in — one signup delivers the whole kit in a single email.
// Sender lives at /toolbox, which is the QR destination printed in
// "The Cold-Pressed Truth". Resend only for now; Kajabi gets wired in later
// so book-sourced contacts land tagged alongside the /resources signups.

const FROM = "Jeff Church <jeff@cpgfoundersgroup.com>";
const REPLY_TO = "jeff@cpgfoundersgroup.com";
const SITE = "https://cpgfoundersgroup.com";

const LINKS = {
  fundraisingMasterclass: `${SITE}/fundraising-masterclass`,
  burnWorkshop: `${SITE}/burn-rate-workshop-replay`,
  playbookTraining: `${SITE}/cpg-playbook-training`,
  whatsapp: `${SITE}/founders-only`,
  babu: "https://www.askbabu.ai",
  chartOfAccounts: "https://drive.google.com/uc?export=download&id=1tqSBrstaRNyrdK3jVNWPH8odWWGhO0JD",
  capitalRaise: "https://drive.google.com/uc?export=download&id=1ITv8j6I0le2Ge6jdIE26Ef-iom91BUHC",
  capitalRaiseVideo: "https://drive.google.com/uc?export=download&id=10vAkJYhL_na6kqXmE7EJjz6IjSgZ_2bM",
  unitPricing: "https://drive.google.com/uc?export=download&id=1BYW6fUvuS3p3b4F0-vLARE0j985aHg_D",
  unitPricingVideo: "https://drive.google.com/uc?export=download&id=1nL1tqta3miixB3aYK0vkl7FdyMxSghFl",
  pricingCalculator: "https://drive.google.com/uc?export=download&id=1BzsfbD05XuR6-XCust69_OGjfPqSPcih",
  tradePromo: "https://drive.google.com/uc?export=download&id=1TOA5xBS_4Iwl_ChKbr8O6DT0yVkgKtJv",
  skuRationalization: "https://drive.google.com/uc?export=download&id=1TsyjcooNakJi4ROVMEB0Ta8e-MO4rqGa",
  cashConversion: "https://drive.google.com/uc?export=download&id=1eejrhY2elYC-mO5lG4b2GWvmhzEpv3AF",
  cashRunway: "https://drive.google.com/uc?export=download&id=1scxRZdGvg1YSDGpY828dT7j_oBrH-0Ck",
  fatalFlaws:
    "https://docs.google.com/document/d/1MMAs1gP76y98A3JY9agd5GOsH4TAKh0H/edit?usp=sharing&ouid=102243953732961922783&rtpof=true&sd=true",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Resend ${res.status}: ${errText.slice(0, 300)}`);
  }
}

function deliveryHtml(firstName: string) {
  const link = (href: string, label: string) =>
    `<a href="${href}" style="color:#b45309;font-weight:600;text-decoration:underline;">${label}</a>`;

  const tool = (href: string, label: string, blurb: string, extra = "") =>
    `<li style="margin-bottom:10px;line-height:1.6;">${link(href, label)} &mdash; ${blurb}${extra}</li>`;

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#fafaf9;">
  <div style="max-width:640px;margin:0 auto;padding:32px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.7;color:#1c1917;">

    <h1 style="font-size:24px;font-weight:700;margin:0 0 24px;">Here's the toolbox, ${escapeHtml(firstName)}.</h1>

    <p style="margin:0 0 16px;">Thanks for picking up the book. Everything below is yours, free. No call, no pitch. These are the same models and trainings I use with the founders I advise.</p>

    <p style="margin:0 0 28px;">Bookmark this email. You'll come back to it.</p>

    <h2 style="font-size:18px;font-weight:700;margin:32px 0 12px;border-top:1px solid #e7e5e4;padding-top:24px;">Start with these two</h2>

    <p style="margin:0 0 8px;"><strong>1. ${link(LINKS.babu, "Babu AI &mdash; 10 days free")}</strong></p>
    <p style="margin:0 0 20px;">Every spreadsheet below answers one question. Babu answers whatever you bring it &mdash; pricing, promo math, retailer strategy, co-man contracts, fundraising prep &mdash; trained on 35+ years of operating experience and 4,000+ of my own resources. Underneath it sit 40+ purpose-built Gurus, each one built for a single job. Take the 10 days and push on it.</p>

    <p style="margin:0 0 8px;"><strong>2. ${link(LINKS.whatsapp, "The CPG Founders Club &mdash; always free")}</strong></p>
    <p style="margin:0 0 20px;">350+ CPG founders in one WhatsApp group, every stage from pre-launch to exit, answering each other in real time. Somebody in there has already solved the thing you're stuck on today. Nobody sells anything in there. That's the whole rule, and it's why it works.</p>

    <h2 style="font-size:18px;font-weight:700;margin:32px 0 12px;border-top:1px solid #e7e5e4;padding-top:24px;">Video Trainings</h2>
    <ul style="margin:0;padding-left:20px;">
      ${tool(LINKS.burnWorkshop, "Reducing the Burn Workshop", "90 minutes on getting to profitability faster. Pricing, trade spend, SKU rationalization, cash conversion, runway planning.")}
      ${tool(LINKS.fundraisingMasterclass, "Fundraising Masterclass", "3 hours on raising capital. Valuations, decks, investor targeting, dilution math, SAFEs vs. equity &mdash; the frameworks from 44 rounds and $275M+ raised.")}
      ${tool(LINKS.playbookTraining, "CPG Playbook Training", "All 23 plays for building and scaling a brand. KPIs, retail strategy, operations, team, exit planning.")}
    </ul>

    <h2 style="font-size:18px;font-weight:700;margin:32px 0 12px;border-top:1px solid #e7e5e4;padding-top:24px;">Profitability Kit</h2>
    <ul style="margin:0;padding-left:20px;">
      ${tool(LINKS.pricingCalculator, "Pricing Calculator", "Start from MSRP or COGS, compare both, find your optimal price.")}
      ${tool(LINKS.tradePromo, "Trade Promo Break-Even Calculator", "Know if a promo is worth running before you commit.")}
      ${tool(LINKS.skuRationalization, "SKU Rationalization Tool", "See which SKUs are carrying your brand and which ones to cut.")}
      ${tool(LINKS.cashConversion, "Cash Conversion Cycle Tool", "See how your payment terms trap or free cash.")}
      ${tool(LINKS.cashRunway, "Cash Runway Calculator", "Model your burn across 3 years and figure out how much to raise.")}
    </ul>

    <h2 style="font-size:18px;font-weight:700;margin:32px 0 12px;border-top:1px solid #e7e5e4;padding-top:24px;">Fundraising Kit</h2>
    <ul style="margin:0;padding-left:20px;">
      ${tool(LINKS.chartOfAccounts, "CPG Chart of Accounts", "Set up your financials correctly from day one.")}
      ${tool(LINKS.capitalRaise, "Capital Raise &amp; Runway Calculator", "Model your burn rate and plan your next raise.", ` (${link(LINKS.capitalRaiseVideo, "video walkthrough")})`)}
      ${tool(LINKS.unitPricing, "Unit Pricing &amp; Break-Even Model", "Find your break-even point and test pricing scenarios.", ` (${link(LINKS.unitPricingVideo, "video walkthrough")})`)}
    </ul>

    <h2 style="font-size:18px;font-weight:700;margin:32px 0 12px;border-top:1px solid #e7e5e4;padding-top:24px;">White Paper</h2>
    <ul style="margin:0;padding-left:20px;">
      ${tool(LINKS.fatalFlaws, "CPG Fatal Flaws", "18 mistakes that kill emerging brands, and how to avoid every one of them.")}
    </ul>

    <p style="margin:32px 0 16px;border-top:1px solid #e7e5e4;padding-top:24px;">Where to start? Pre-launch, take the Chart of Accounts and the Fatal Flaws paper &mdash; they'll save you from expensive early mistakes. Already selling? The Playbook and the Fundraising Masterclass will sharpen your game fast. Burning cash faster than you'd like? Start with Reducing the Burn and the Profitability Kit. And whatever stage you're at, get in the WhatsApp group. That one costs you nothing and pays the fastest.</p>

    <p style="margin:0 0 16px;">Use them. That's the whole point.</p>

    <p style="margin:0 0 4px;">Jeff</p>
    <p style="margin:0;color:#78716c;font-size:14px;">Co-founder, Suja Juice<br>Author, <em>The Cold-Pressed Truth</em></p>

    <p style="margin:32px 0 0;color:#78716c;font-size:13px;line-height:1.6;border-top:1px solid #e7e5e4;padding-top:20px;">P.S. If one of these tools changes something in your business, hit reply and tell me. I read them.</p>

  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const email = String(body.email || "").trim();

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required" },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    }

    // The toolbox itself — this one has to land, so a failure is a real failure.
    await sendEmail({
      from: FROM,
      to: email,
      reply_to: REPLY_TO,
      subject: "Your CPG toolbox (from the book)",
      html: deliveryHtml(firstName),
    });

    console.log(`Toolbox signup: ${firstName} ${lastName} <${email}>`);

    // Internal heads-up. Best effort — never block the reader on it.
    try {
      await sendEmail({
        from: "CPG Founders Group <scheduling@cpgfoundersgroup.com>",
        to: process.env.CONTACT_FORM_NOTIFY_EMAIL,
        reply_to: email,
        subject: `Book toolbox signup: ${firstName} ${lastName}`,
        html: `
          <h2>New /toolbox signup (from the book)</h2>
          <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <hr>
          <p style="color:#999;font-size:12px;">Source: cpgfoundersgroup.com/toolbox &mdash; The Cold-Pressed Truth QR code</p>
        `,
      });
    } catch (notifyErr) {
      console.error("Toolbox signup: notification email failed", notifyErr);
    }

    // TODO: mirror into Kajabi with a "Book Toolbox" tag once the form is built,
    // so book-sourced contacts segment away from the /resources signups.

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Toolbox signup error:", err);
    const msg = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: "Something went wrong", detail: msg }, { status: 500 });
  }
}
