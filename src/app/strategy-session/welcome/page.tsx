import type { Metadata } from "next";
import Stripe from "stripe";
import { MBA_LOGIN_URL } from "@/lib/mba-offer";
import { STRATEGY_SESSION_CREDIT_DAYS } from "@/lib/strategy-session-offer";
import { IntakeForm } from "./intake-form";

export const metadata: Metadata = {
  title: "Your Strategy Session with Jeff - CPG Founders Group",
  robots: { index: false, follow: false },
};

async function getBuyer(sessionId?: string) {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return { paid: false, name: "", email: "" };
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const s = await stripe.checkout.sessions.retrieve(sessionId);
    return {
      paid: s.payment_status === "paid" || s.status === "complete",
      name: s.customer_details?.name || "",
      email: s.customer_details?.email || "",
    };
  } catch {
    return { paid: false, name: "", email: "" };
  }
}

export default async function StrategySessionWelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const buyer = await getBuyer(session_id);

  return (
    <>
      <section className="bg-foreground text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-3xl text-white">
            &#10003;
          </div>
          <h1 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight">
            {buyer.paid ? "You're in. Let's get Jeff ready for you." : "Almost there."}
          </h1>
          <p className="mt-5 text-lg text-white/70 leading-relaxed">
            {buyer.paid
              ? "Your payment is in and a receipt is on its way. One more step: tell Jeff what you want to work on, so he walks into your 90 minutes already up to speed."
              : "If your payment went through, a receipt is on its way. Either way, fill out the intake below and we'll take it from there."}
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold">What happens next</h2>
            <ol className="mt-3 space-y-2 text-sm text-muted list-decimal pl-5">
              <li>Fill out the intake below and share your deck, roadmap, or whatever you want Jeff to look at.</li>
              <li>Within one business day we email you Jeff&rsquo;s calendar to book your 90 minutes.</li>
              <li>
                Your MBA for CPG access lands in your inbox from Kajabi. Already have it?{" "}
                <a href={MBA_LOGIN_URL} className="text-accent font-semibold hover:underline">
                  Log in here
                </a>
                .
              </li>
              <li>
                If you decide to keep going with Jeff, your $997 is credited toward Private or VIP
                Advisory within {STRATEGY_SESSION_CREDIT_DAYS} days.
              </li>
            </ol>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight">Your intake</h2>
            <p className="mt-2 text-muted">
              The more specific you are, the more of the 90 minutes goes to solving instead of
              catching Jeff up.
            </p>
            <div className="mt-8">
              <IntakeForm defaultName={buyer.name} defaultEmail={buyer.email} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
