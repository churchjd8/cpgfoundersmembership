import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  MBA_KAJABI_CHECKOUT_URL,
  MBA_PLAN,
  MBA_PRICE_USD,
  MBA_PRODUCT_KEY,
} from "@/lib/mba-offer";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cpgfoundersgroup.com";

// Starts Stripe Checkout for the MBA for CPG. The buy buttons on /mba-for-cpg
// are plain HTML forms that POST here, so this answers with a redirect to
// Stripe rather than JSON. Two paths:
//   - "full": one $997 payment. No payment_method_types, so Stripe shows
//             whatever the account has switched on (card, Apple Pay, Klarna...).
//   - "plan": 3 monthly payments of $349. Runs as a subscription that the
//             webhook caps at 3 payments once checkout completes.
// Prices are created inline so no dashboard setup is required. Access to the
// course is granted by /api/stripe-webhook, keyed off metadata.product.
export async function POST(request: Request) {
  try {
    const form = await request.formData().catch(() => null);
    const plan = form?.get("plan") === "plan" ? "plan" : "full";
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const metadata = { product: MBA_PRODUCT_KEY, plan };
    const shared = {
      metadata,
      billing_address_collection: "auto" as const,
      success_url: `${SITE_URL}/mba-for-cpg/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/mba-for-cpg`,
    };

    const session = await stripe.checkout.sessions.create(
      plan === "full"
        ? {
            ...shared,
            mode: "payment",
            customer_creation: "always",
            allow_promotion_codes: true,
            line_items: [
              {
                quantity: 1,
                price_data: {
                  currency: "usd",
                  unit_amount: MBA_PRICE_USD * 100,
                  product_data: {
                    name: "MBA for CPG",
                    description:
                      "8 self-paced modules, 450+ slides, financial models and templates. One-time payment, lifetime access.",
                  },
                },
              },
            ],
            payment_intent_data: {
              description: "MBA for CPG (paid in full)",
              metadata,
            },
          }
        : {
            ...shared,
            mode: "subscription",
            // Card only: later payments are charged off-session.
            payment_method_types: ["card", "link"],
            line_items: [
              {
                quantity: 1,
                price_data: {
                  currency: "usd",
                  unit_amount: MBA_PLAN.amountUsd * 100,
                  recurring: { interval: "month" },
                  product_data: {
                    name: `MBA for CPG (${MBA_PLAN.payments}-payment plan)`,
                    description: `${MBA_PLAN.payments} monthly payments of $${MBA_PLAN.amountUsd}. Lifetime access from the first payment.`,
                  },
                },
              },
            ],
            subscription_data: {
              description: `MBA for CPG (${MBA_PLAN.payments}-payment plan)`,
              metadata,
            },
            custom_text: {
              submit: {
                message: `${MBA_PLAN.payments} monthly payments of $${MBA_PLAN.amountUsd}. Billing stops on its own after the last payment.`,
              },
            },
          },
    );

    if (!session.url) throw new Error("Stripe returned no checkout URL");
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    // Never dead-end a buyer: Kajabi's checkout still sells the course.
    console.error("MBA checkout error:", err);
    return NextResponse.redirect(MBA_KAJABI_CHECKOUT_URL, 303);
  }
}
