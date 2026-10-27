import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  STRATEGY_SESSION_PRICE_USD,
  STRATEGY_SESSION_PRODUCT_KEY,
} from "@/lib/strategy-session-offer";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cpgfoundersgroup.com";

// Starts Stripe Checkout for the Jeff Strategy Session. The buy button on
// /work-with-jeff is a plain HTML form that POSTs here, so this answers with a
// redirect to Stripe rather than JSON. One $997 payment; the price is created
// inline so no dashboard setup is required. Fulfillment (MBA access + team
// email) happens in /api/stripe-webhook, keyed off metadata.product.
export async function POST() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const metadata = { product: STRATEGY_SESSION_PRODUCT_KEY };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_creation: "always",
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: STRATEGY_SESSION_PRICE_USD * 100,
            product_data: {
              name: "Jeff Strategy Session + MBA for CPG",
              description:
                "A 90-minute 1:1 strategy session with Jeff Church, plus lifetime access to the MBA for CPG. Credited toward Private or VIP Advisory.",
            },
          },
        },
      ],
      payment_intent_data: {
        description: "Jeff Strategy Session + MBA for CPG",
        metadata,
      },
      success_url: `${SITE_URL}/strategy-session/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/work-with-jeff#session`,
    });

    if (!session.url) throw new Error("Stripe returned no checkout URL");
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    // No second checkout to fall back on, so send them to apply instead.
    console.error("Strategy session checkout error:", err);
    return NextResponse.redirect(`${SITE_URL}/apply?interest=session`, 303);
  }
}
