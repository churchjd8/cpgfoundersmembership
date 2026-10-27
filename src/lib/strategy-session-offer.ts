// The Jeff Strategy Session is the buy-now entry point to working with Jeff:
// a 90-minute 1:1 plus the MBA for CPG, sold through Stripe Checkout from
// /work-with-jeff. Once Stripe confirms payment, /api/stripe-webhook grants the
// MBA in Kajabi and emails the team; the buyer lands on
// /strategy-session/welcome to fill out the intake before Jeff's call.

/** Marks a Checkout Session as a Strategy Session sale for the webhook. */
export const STRATEGY_SESSION_PRODUCT_KEY = "strategy-session";

export const STRATEGY_SESSION_PRICE_USD = 997;

/** Days after purchase that the $997 still counts toward an advisory package. */
export const STRATEGY_SESSION_CREDIT_DAYS = 30;
