import { NextResponse } from "next/server";
import Stripe from "stripe";
import { AGREEMENT_VERSION, ENGAGEMENT } from "@/lib/jade-agreement";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cpgfoundersgroup.com";

// Creates a Stripe Checkout Session for Jade's $2,000/mo subscription.
// The price is created inline so no dashboard setup is required. The
// 3-month commitment and the $1,500 step-down are recorded as metadata
// for operational follow-up (Stripe subscriptions run until changed).
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
              name: "Jeff Church Advisory — Founding Rate",
              description: `$${ENGAGEMENT.initialFeeUsd}/mo for the first ${ENGAGEMENT.initialMonths} months, then $${ENGAGEMENT.ongoingFeeUsd}/mo month-to-month.`,
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
          rate_after_commitment: `$${ENGAGEMENT.ongoingFeeUsd}/mo month-to-month`,
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
      success_url: `${SITE_URL}/jade-onboarding/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/jade-onboarding`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Jade onboarding checkout error:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
