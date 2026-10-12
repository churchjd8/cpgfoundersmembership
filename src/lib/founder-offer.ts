import { createHmac, timingSafeEqual } from "node:crypto";

// The free training funnel: /free-training (register) -> /free-training/watch
// -> /mba-for-cpg/founder-offer. Registering starts a 72-hour window in which
// the MBA for CPG sells at the founder price. The window lives in a signed
// cookie so the deadline holds across visits; once it passes, the offer page
// and /api/mba-checkout both fall back to the regular price.

export const TRAINING_TITLE = "The First 24 Months of Your CPG Brand";
export const TRAINING_SUBTITLE =
  "5 things every new food and beverage founder has to get right, and what each one costs when you don't.";

/** Kajabi form "MBA Funnel - Free Training Registration". */
export const TRAINING_KAJABI_FORM_ID = "2149751577";

export const FOUNDER_PRICE_USD = 497;
export const FOUNDER_WINDOW_HOURS = 72;
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

/** A new offer window starting now, as a cookie value. */
export function createFounderOfferToken() {
  const expiresAt = Date.now() + FOUNDER_WINDOW_HOURS * 60 * 60 * 1000;
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
