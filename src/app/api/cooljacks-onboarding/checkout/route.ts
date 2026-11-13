import { NextResponse } from "next/server";
import Stripe from "stripe";
import { AGREEMENT_VERSION, ENGAGEMENT } from "@/lib/cooljacks-agreement";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cpgfoundersgroup.com";

// Creates a Stripe Checkout Session for Cool Jacks' 3-month advisory. Two
// paths, same $7,500 total:
//   - "monthly": a $2,500/mo subscription across the 3-month commitment.
//   - "full":    a single $7,500 payment up front.
// Prices are created inline so no dashboard setup is required. The 3-month
// commitment and the chosen plan are recorded as metadata for follow-up. After
// the Initial Term the engagement continues at $2,500/mo for the same
// deliverables unless Josh and Jeff agree to adjust it, so the subscription
// simply keeps running at $2,500/mo until changed.
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
      rate_type: "3-Month Private Advisory ($2,500/mo tier)",
      rate_after_commitment: `continues at $${ENGAGEMENT.ongoingFeeUsd}/mo for same deliverables, or adjusted up/down by mutual agreement`,
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
                    name: "Jeff Church Advisory — 3-Month Private Advisory (Paid in Full)",
                    description: `One payment of $${ENGAGEMENT.totalInitialUsd} for the ${ENGAGEMENT.initialMonths}-month advisory engagement. Then continues at $${ENGAGEMENT.ongoingFeeUsd}/mo for the same deliverables, or adjusted by mutual agreement.`,
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
            success_url: `${SITE_URL}/cooljacks-onboarding/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${SITE_URL}/cooljacks-onboarding`,
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
                    name: "Jeff Church Advisory — 3-Month Private Advisory",
                    description: `$${ENGAGEMENT.initialFeeUsd}/mo for the ${ENGAGEMENT.initialMonths}-month advisory engagement ($${ENGAGEMENT.totalInitialUsd} total), then continues at $${ENGAGEMENT.ongoingFeeUsd}/mo for the same deliverables, or adjusted by mutual agreement.`,
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
            success_url: `${SITE_URL}/cooljacks-onboarding/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${SITE_URL}/cooljacks-onboarding`,
          },
    );

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Cool Jacks onboarding checkout error:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
