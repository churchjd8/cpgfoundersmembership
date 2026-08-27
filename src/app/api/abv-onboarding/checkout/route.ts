import { NextResponse } from "next/server";
import Stripe from "stripe";
import { AGREEMENT_VERSION, ENGAGEMENT } from "@/lib/abv-agreement";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cpgfoundersgroup.com";

// Creates a Stripe Checkout Session for ABV's VIP intensive. Two paths, same
// $15,000 total at the standard rate:
//   - "monthly": a $5,000/mo subscription across the 3-month commitment.
//   - "full":    a single $15,000 payment up front.
// Prices are created inline so no dashboard setup is required. The 3-month
// commitment and the chosen plan are recorded as metadata for follow-up. The
// ongoing month-to-month rate after the Initial Term is $1,500–$4,000/mo, set
// by mutual agreement before the term ends, so the subscription runs at
// $5,000/mo until changed.
export async function POST(request: Request) {
  try {
    const { email, fullName, plan } = await request.json().catch(() => ({}));
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const payInFull = plan === "full";

    const sharedMetadata = {
      client: ENGAGEMENT.clientName,
      business: ENGAGEMENT.business,
      agreement_version: AGREEMENT_VERSION,
    };

    const commitmentMetadata = {
      ...sharedMetadata,
      signer: fullName || ENGAGEMENT.contacts,
      commitment_months: String(ENGAGEMENT.initialMonths),
      initial_total: `$${ENGAGEMENT.totalInitialUsd}`,
      rate_type: "standard (3-Month VIP Intensive)",
      rate_after_commitment: `month-to-month, $${ENGAGEMENT.ongoingLowUsd}-$${ENGAGEMENT.ongoingHighUsd}/mo by mutual agreement`,
      roi_guarantee: "yes",
    };

    const session = await stripe.checkout.sessions.create(
      payInFull
        ? {
            mode: "payment",
            ...(email ? { customer_email: email } : {}),
            line_items: [
              {
                quantity: 1,
                price_data: {
                  currency: "usd",
                  unit_amount: ENGAGEMENT.totalInitialUsd * 100,
                  product_data: {
                    name: "Jeff Church Advisory — 3-Month VIP Intensive (Paid in Full)",
                    description: `One payment of $${ENGAGEMENT.totalInitialUsd} for the ${ENGAGEMENT.initialMonths}-month VIP intensive. Then month-to-month at $${ENGAGEMENT.ongoingLowUsd}-$${ENGAGEMENT.ongoingHighUsd}/mo, agreed before the term ends.`,
                  },
                },
              },
            ],
            payment_intent_data: {
              description: `${ENGAGEMENT.business} — Advisory, paid in full`,
              metadata: { ...commitmentMetadata, plan: "pay_in_full" },
            },
            metadata: sharedMetadata,
            billing_address_collection: "auto",
            success_url: `${SITE_URL}/abv-onboarding/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${SITE_URL}/abv-onboarding`,
          }
        : {
            mode: "subscription",
            ...(email ? { customer_email: email } : {}),
            line_items: [
              {
                quantity: 1,
                price_data: {
                  currency: "usd",
                  unit_amount: ENGAGEMENT.initialFeeUsd * 100,
                  recurring: { interval: "month" },
                  product_data: {
                    name: "Jeff Church Advisory — 3-Month VIP Intensive",
                    description: `$${ENGAGEMENT.initialFeeUsd}/mo for the ${ENGAGEMENT.initialMonths}-month VIP intensive ($${ENGAGEMENT.totalInitialUsd} total), then month-to-month at $${ENGAGEMENT.ongoingLowUsd}-$${ENGAGEMENT.ongoingHighUsd}/mo, agreed before the term ends.`,
                  },
                },
              },
            ],
            subscription_data: {
              description: `${ENGAGEMENT.business} — Advisory`,
              metadata: { ...commitmentMetadata, plan: "monthly" },
            },
            metadata: sharedMetadata,
            allow_promotion_codes: false,
            billing_address_collection: "auto",
            success_url: `${SITE_URL}/abv-onboarding/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${SITE_URL}/abv-onboarding`,
          },
    );

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("ABV onboarding checkout error:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
