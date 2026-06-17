import { NextResponse } from "next/server";
import Stripe from "stripe";
import { AGREEMENT_VERSION, ENGAGEMENT } from "@/lib/erin-agreement";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cpgfoundersgroup.com";

// Creates a Stripe Checkout Session for Erin's intensive. Two paths:
//   - "monthly": a $2,000/mo subscription across the 3-month commitment.
//   - "full":    a single $5,000 payment up front (saves $1,000).
// Prices are created inline so no dashboard setup is required. The 3-month
// commitment and the chosen plan are recorded as metadata for follow-up. The
// ongoing month-to-month rate ($1,500/mo) is set up before the term ends.
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
                  unit_amount: ENGAGEMENT.payInFullUsd * 100,
                  product_data: {
                    name: "Jeff Church Advisory — 3-Month Intensive (Paid in Full)",
                    description: `One payment of $${ENGAGEMENT.payInFullUsd} for the ${ENGAGEMENT.initialMonths}-month intensive (saves $${ENGAGEMENT.payInFullSavingsUsd} vs monthly). Then month-to-month at $${ENGAGEMENT.ongoingFeeUsd}/mo.`,
                  },
                },
              },
            ],
            payment_intent_data: {
              description: `${ENGAGEMENT.clientName} (${ENGAGEMENT.business}) — Advisory, paid in full`,
              metadata: {
                ...sharedMetadata,
                signer: fullName || ENGAGEMENT.clientName,
                plan: "pay_in_full",
                commitment_months: String(ENGAGEMENT.initialMonths),
                initial_total: `$${ENGAGEMENT.payInFullUsd}`,
                rate_after_commitment: `month-to-month at $${ENGAGEMENT.ongoingFeeUsd}/mo`,
              },
            },
            metadata: sharedMetadata,
            billing_address_collection: "auto",
            success_url: `${SITE_URL}/erin-onboarding/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${SITE_URL}/erin-onboarding`,
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
                    description: `$${ENGAGEMENT.initialFeeUsd}/mo for the ${ENGAGEMENT.initialMonths}-month intensive ($${ENGAGEMENT.totalInitialUsd} total), then month-to-month at $${ENGAGEMENT.ongoingFeeUsd}/mo.`,
                  },
                },
              },
            ],
            subscription_data: {
              description: `${ENGAGEMENT.clientName} (${ENGAGEMENT.business}) — Advisory`,
              metadata: {
                ...sharedMetadata,
                signer: fullName || ENGAGEMENT.clientName,
                plan: "monthly",
                commitment_months: String(ENGAGEMENT.initialMonths),
                initial_total: `$${ENGAGEMENT.totalInitialUsd}`,
                rate_after_commitment: `month-to-month at $${ENGAGEMENT.ongoingFeeUsd}/mo`,
              },
            },
            metadata: sharedMetadata,
            allow_promotion_codes: false,
            billing_address_collection: "auto",
            success_url: `${SITE_URL}/erin-onboarding/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${SITE_URL}/erin-onboarding`,
          },
    );

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Erin onboarding checkout error:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
