import { createHmac, timingSafeEqual } from "node:crypto";

// The free training funnel: /free-training (register) -> /free-training/watch
// -> /mba-for-cpg/founder-offer. Registering starts a window in which the MBA
// for CPG sells at the founder price. It closes at midnight Pacific three days
// later, not 72 hours to the minute, because the Kajabi follow-up emails go
// out at fixed clock times and the last one says "ends tonight". The window
// lives in a signed cookie so the deadline holds across visits; once it
// passes, the offer page and /api/mba-checkout both fall back to the regular
// price.

export const TRAINING_TITLE = "How to Be the 7%: The 5 Fatal Mistakes That Kill New CPG Brands";
export const TRAINING_SUBTITLE =
  "What each mistake costs, how to spot it in your business, and what to do instead. From 8x founder Jeff Church, co-founder of Suja.";

/** Kajabi form "MBA Funnel - Free Training Registration". */
export const TRAINING_KAJABI_FORM_ID = "2149751577";

export const FOUNDER_PRICE_USD = 497;
export const FOUNDER_WINDOW_DAYS = 3;
export const FOUNDER_GUARANTEE_DAYS = 30;
export const FOUNDER_OFFER_COOKIE = "mba_founder_offer";
/** The cookie outlives the window so an expired offer stays expired. */
export const FOUNDER_COOKIE_MAX_AGE = 60 * 60 * 24 * 90;

function secret() {
  return (
    process.env.FOUNDER_OFFER_SECRET ||
    process.env.STRIPE_WEBHOOK_SECRET ||
    process.env.STRIPE_SECRET_KEY ||
    ""
  );
}

function sign(expiresAt: number) {
  return createHmac("sha256", secret()).update(String(expiresAt)).digest("hex");
}

/** The last second of the Pacific calendar day `days` after today. */
function endOfPacificDay(days: number) {
  const pacific = (date: Date) => {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        hourCycle: "h23",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
        .formatToParts(date)
        .map((part) => [part.type, Number(part.value)])
    );
    return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  };

  const today = new Date(pacific(new Date()));
  // 23:59:59 on the target day, read as if Pacific were UTC...
  const wallClock = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + days, 23, 59, 59);
  // ...then shifted by Pacific's offset from UTC at that moment.
  return wallClock - (pacific(new Date(wallClock)) - wallClock);
}

/** A new offer window starting now, as a cookie value. */
export function createFounderOfferToken() {
  const expiresAt = endOfPacificDay(FOUNDER_WINDOW_DAYS);
  return `${expiresAt}.${sign(expiresAt)}`;
}

/**
 * Reads an offer cookie. Returns null when it is missing or tampered with;
 * otherwise the deadline and whether the founder price still applies.
 */
export function readFounderOfferToken(token?: string | null) {
  if (!token || !secret()) return null;
  const [rawExpiry, signature] = token.split(".");
  const expiresAt = Number(rawExpiry);
  if (!Number.isFinite(expiresAt) || !signature) return null;

  const expected = Buffer.from(sign(expiresAt));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  return { expiresAt, active: Date.now() < expiresAt };
}
