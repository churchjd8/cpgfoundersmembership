// The delivery email for every free-resource opt-in, on both doors.
//
// This lives in the repo rather than in Kajabi on purpose: the copy is the
// product here, and we want to be able to rewrite a line and ship it in a
// minute instead of hunting through a Kajabi automation. Kajabi still gets the
// contact and the tag — it just no longer owns the words.

import { ALWAYS_ON, LINKS, type Kit, type KitItem } from "./kits";

const SITE = "https://cpgfoundersgroup.com";

export type KitEmailSource = "resources" | "toolbox";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Kit data stores site paths as paths; email needs them absolute. */
function absolute(href: string) {
  return href.startsWith("/") ? `${SITE}${href}` : href;
}

function link(href: string, label: string) {
  return `<a href="${absolute(href)}" style="color:#a56a16;font-weight:600;text-decoration:underline;">${label}</a>`;
}

function rule(marginTop = 32) {
  return `margin:${marginTop}px 0 12px;border-top:1px solid #e7e5e4;padding-top:24px;`;
}

function itemHtml(item: KitItem) {
  const walkthrough = item.videoHref ? ` (${link(item.videoHref, "video walkthrough")})` : "";

  // Assets Kajabi still delivers can't be linked here, so we set the
  // expectation rather than handing over a link that goes nowhere useful.
  const label = item.deliveredVia === "kajabi"
    ? `<strong>${item.title}</strong>`
    : link(item.href, item.title);

  const note = item.deliveredVia === "kajabi"
    ? ` <em style="color:#78716c;">(arriving in a separate email)</em>`
    : "";

  return `<li style="margin-bottom:12px;line-height:1.6;">${label} &mdash; ${item.body}${walkthrough}${note}</li>`;
}

function kitHtml(kit: Kit) {
  return `
    <h2 style="font-size:18px;font-weight:700;${rule()}">${kit.name}</h2>
    <p style="margin:0 0 14px;color:#57534e;">${kit.promise}</p>
    <ul style="margin:0;padding-left:20px;">
      ${kit.items.map(itemHtml).join("\n      ")}
    </ul>`;
}

function opening(source: KitEmailSource, firstName: string, kits: Kit[]) {
  const name = escapeHtml(firstName);
  const single = kits.length === 1 ? kits[0] : null;

  if (source === "toolbox") {
    return `
    <h1 style="font-size:24px;font-weight:700;margin:0 0 24px;">Here's the toolbox, ${name}.</h1>
    <p style="margin:0 0 16px;">Thanks for picking up the book. I didn't write it to give you ideas, I wrote it to give you tools. Everything below is what I use with the founders I advise, and it's all yours. No cost, no call, no catch.</p>
    <p style="margin:0 0 28px;">Bookmark this email. You'll come back to it.</p>`;
  }

  if (single) {
    return `
    <h1 style="font-size:24px;font-weight:700;margin:0 0 24px;">${escapeHtml(single.name)} is yours, ${name}.</h1>
    <p style="margin:0 0 16px;">${single.promise} Everything in the kit is below, and it's free. These are the same models I use with the founders I advise.</p>
    <p style="margin:0 0 28px;">Bookmark this email. You'll come back to it.</p>`;
  }

  return `
    <h1 style="font-size:24px;font-weight:700;margin:0 0 24px;">All three kits, ${name}.</h1>
    <p style="margin:0 0 16px;">Every calculator, model, workshop, and white paper I've built across 35 years and eight companies. Most of them exist because I got something wrong first and had to build the thing that would have saved me.</p>
    <p style="margin:0 0 28px;">Bookmark this email. You'll come back to it.</p>`;
}

/** The closing nudge only earns its place when someone took everything at once. */
function whereToStart(kits: Kit[]) {
  if (kits.length < 3) return "";
  return `<p style="margin:32px 0 16px;border-top:1px solid #e7e5e4;padding-top:24px;">Where to start? Pre-launch, take the Chart of Accounts and the Fatal Flaws paper. They'll save you from the expensive early mistakes. Already selling? The Playbook and the Fundraising Masterclass will sharpen your game fast. Burning cash faster than you'd like? Start with Reducing the Burn and work through the Profitability Kit. And whatever stage you're at, get in the WhatsApp group. That one costs you nothing and pays the fastest.</p>`;
}

export function kitEmailSubject(kits: Kit[], source: KitEmailSource) {
  if (source === "toolbox") return "Your CPG toolbox (from the book)";
  if (kits.length === 1) return `${kits[0].name} is inside`;
  return "All three CPG kits, as promised";
}

export function kitEmailHtml({
  firstName,
  kits,
  source,
}: {
  firstName: string;
  kits: Kit[];
  source: KitEmailSource;
}) {
  const alwaysOn = ALWAYS_ON.map(
    (a, i) => `
    <p style="margin:0 0 8px;"><strong>${i + 1}. ${link(a.href, `${a.title} &mdash; ${a.badge.toLowerCase()}`)}</strong></p>
    <p style="margin:0 0 20px;">${a.body}</p>`,
  ).join("");

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#fafaf9;">
  <div style="max-width:640px;margin:0 auto;padding:32px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.7;color:#1c1917;">
${opening(source, firstName, kits)}

    <h2 style="font-size:18px;font-weight:700;${rule()}">Start with these two</h2>
${alwaysOn}
${kits.map(kitHtml).join("\n")}
${whereToStart(kits)}

    <p style="margin:0 0 16px;">Use them. That's the whole point.</p>

    <p style="margin:0 0 4px;">Jeff</p>
    <p style="margin:0;color:#78716c;font-size:14px;">Co-founder, Suja Juice<br>Author, <em>The Cold-Pressed Truth</em></p>

    <p style="margin:32px 0 0;color:#78716c;font-size:13px;line-height:1.6;border-top:1px solid #e7e5e4;padding-top:20px;">P.S. If one of these changes something in your business, hit reply and tell me. I read them.</p>

  </div>
</body>
</html>`;
}

export { escapeHtml, LINKS };
