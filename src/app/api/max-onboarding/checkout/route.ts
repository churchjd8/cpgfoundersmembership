import { NextResponse } from "next/server";
import Stripe from "stripe";
import { AGREEMENT_VERSION, ENGAGEMENT } from "@/lib/max-agreement";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cpgfoundersgroup.com";

// Creates a Stripe Checkout Session for Max's intensive. Two paths, same
// $15,000 friends-and-family total:
//   - "monthly": a $5,000/mo subscription across the 3-month commitment.
//   - "full":    a single $15,000 payment up front.
// Prices are created inline so no dashboard setup is required. The 3-month
// commitment and the chosen plan are recorded as metadata for follow-up. The
// ongoing month-to-month rate is set by mutual agreement before the Initial
// Term ends, so the subscription runs at $5,000/mo until changed.
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
      signer: fullName || ENGAGEMENT.clientName,
      commitment_months: String(ENGAGEMENT.initialMonths),
      initial_total: `$${ENGAGEMENT.totalInitialUsd}`,
      standard_total: `$${ENGAGEMENT.standardTotalUsd}`,
      rate_type: "friends & family",
      rate_after_commitment: "month-to-month, rate TBD by mutual agreement",
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
                    name: "Jeff Church Advisory — 3-Month Intensive (Paid in Full)",
                    description: `One payment of $${ENGAGEMENT.totalInitialUsd} for the ${ENGAGEMENT.initialMonths}-month intensive at the friends & family rate (standard $${ENGAGEMENT.standardTotalUsd}). Then month-to-month at a rate agreed before the term ends.`,
                  },
                },
              },
            ],
            payment_intent_data: {
              description: `${ENGAGEMENT.clientName} (${ENGAGEMENT.business}) — Advisory, paid in full`,
              metadata: { ...commitmentMetadata, plan: "pay_in_full" },
            },
            metadata: sharedMetadata,
            billing_address_collection: "auto",
            success_url: `${SITE_URL}/max-onboarding/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${SITE_URL}/max-onboarding`,
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
                    name: "Jeff Church Advisory — 3-Month Intensive",
                    description: `$${ENGAGEMENT.initialFeeUsd}/mo for the ${ENGAGEMENT.initialMonths}-month intensive ($${ENGAGEMENT.totalInitialUsd} total at the friends & family rate, standard $${ENGAGEMENT.standardTotalUsd}), then month-to-month at a rate agreed before the term ends.`,
                  },
                },
              },
            ],
            subscription_data: {
              description: `${ENGAGEMENT.clientName} (${ENGAGEMENT.business}) — Advisory`,
              metadata: { ...commitmentMetadata, plan: "monthly" },
            },
            metadata: sharedMetadata,
            allow_promotion_codes: false,
            billing_address_collection: "auto",
            success_url: `${SITE_URL}/max-onboarding/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${SITE_URL}/max-onboarding`,
          },
    );

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Max onboarding checkout error:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
