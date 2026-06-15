import { NextResponse } from "next/server";
import Stripe from "stripe";
import { AGREEMENT_VERSION, ENGAGEMENT } from "@/lib/zeyad-agreement";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cpgfoundersgroup.com";

// Creates a Stripe Checkout Session for Zeyad's $5,000/mo subscription.
// The price is created inline so no dashboard setup is required. The
// 3-month commitment is recorded as metadata for operational follow-up.
// The ongoing month-to-month rate is set by mutual agreement before the
// Initial Term ends, so the subscription runs at $5,000/mo until changed.
export async function POST(request: Request) {
  try {
    const { email, fullName } = await request.json().catch(() => ({}));
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const session = await stripe.checkout.sessions.create({
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
              description: `$${ENGAGEMENT.initialFeeUsd}/mo for the ${ENGAGEMENT.initialMonths}-month intensive ($${ENGAGEMENT.totalInitialUsd} total), then month-to-month at a rate agreed before the term ends.`,
            },
          },
        },
      ],
      subscription_data: {
        description: `${ENGAGEMENT.clientName} (${ENGAGEMENT.business}) — Advisory`,
        metadata: {
          client: ENGAGEMENT.clientName,
          business: ENGAGEMENT.business,
          signer: fullName || ENGAGEMENT.clientName,
          commitment_months: String(ENGAGEMENT.initialMonths),
          initial_total: `$${ENGAGEMENT.totalInitialUsd}`,
          rate_after_commitment: "month-to-month, rate TBD by mutual agreement",
          agreement_version: AGREEMENT_VERSION,
        },
      },
      metadata: {
        client: ENGAGEMENT.clientName,
        business: ENGAGEMENT.business,
        agreement_version: AGREEMENT_VERSION,
      },
      allow_promotion_codes: false,
      billing_address_collection: "auto",
      success_url: `${SITE_URL}/zeyad-onboarding/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/zeyad-onboarding`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Zeyad onboarding checkout error:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
