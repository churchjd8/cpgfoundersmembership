// MBA for CPG is sold through Stripe Checkout on this site (card, Apple Pay,
// Klarna, or a 3-payment plan) instead of Kajabi's own checkout, which only
// takes cards. Kajabi still hosts the course: once Stripe confirms payment,
// /api/stripe-webhook grants MBA_KAJABI_OFFER_ID to the buyer's email.

/** Marks a Checkout Session as an MBA sale so the webhook knows to fulfill it. */
export const MBA_PRODUCT_KEY = "mba-for-cpg";

/** Kajabi offer "MBA for CPG" (unlocks the CPG Bootcamp product). */
export const MBA_KAJABI_OFFER_ID = "2151100632";

export const MBA_PRICE_USD = 997;

/** Payment plan: billed monthly, stops on its own after the last payment. */
export const MBA_PLAN = { payments: 3, amountUsd: 349 };

export const MBA_LOGIN_URL = "https://learn.cpgfoundersgroup.com/login";

/** Kajabi's own card-only checkout. Fallback if Stripe Checkout can't start. */
export const MBA_KAJABI_CHECKOUT_URL = "https://learn.cpgfoundersgroup.com/offers/MGU8pLuV";

// Stripe publishable key, used in the browser for the Klarna messaging on
// /mba-for-cpg. Publishable keys are public by design, so it lives here
// rather than in an env var.
export const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51Qn0r8G6eE6wSi3m5BukLJEbAlqpW05nA8eH9HLiykEi6YgX8oPU10DUY9sURCDhwffPWuQRfCbQM48qiWVXNv1s00ZRogx9xt";
