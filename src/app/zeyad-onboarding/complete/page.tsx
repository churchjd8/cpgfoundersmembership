import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { ENGAGEMENT } from "@/lib/zeyad-agreement";

export const metadata: Metadata = {
  title: "You're all set — CPG Founders Group",
  robots: { index: false, follow: false },
};

async function getPaid(sessionId?: string): Promise<boolean> {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return false;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid" || session.status === "complete";
  } catch {
    return false;
  }
}

export default async function CompletePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const paid = await getPaid(session_id);

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-light text-3xl text-accent-dark">
        &#10003;
      </div>
      <h1 className="mt-6 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
        {paid ? "You're all set, Zeyad." : "Almost there."}
      </h1>

      {paid ? (
        <p className="mt-4 text-muted leading-relaxed">
          Your agreement is signed and your subscription is active. A receipt is on
          its way to your inbox. Jeff will be in touch to schedule your half-day
          strategy deep dive. Welcome aboard.
        </p>
      ) : (
        <p className="mt-4 text-muted leading-relaxed">
          Thanks, Zeyad. If your payment went through, you&apos;ll have a receipt in
          your inbox shortly and Jeff will reach out to schedule your strategy deep
          dive. If you closed checkout before finishing, you can pick back up below.
        </p>
      )}

      <div className="mt-8 rounded-xl border border-border bg-card p-6 text-left">
        <h2 className="font-semibold">What happens next</h2>
        <ol className="mt-3 space-y-2 text-sm text-muted">
          <li>1. Jeff reaches out to book your half-day in-person strategy deep dive.</li>
          <li>2. You get access to Babu Pro and the MBA for CPG modules.</li>
          <li>
            3. Your bi-weekly 1:1s get scheduled. Billing is $
            {ENGAGEMENT.initialFeeUsd.toLocaleString()}/mo for {ENGAGEMENT.initialMonths}{" "}
            months (${ENGAGEMENT.totalInitialUsd.toLocaleString()} total), then
            month-to-month.
          </li>
        </ol>
      </div>

      {!paid && (
        <Link
          href="/zeyad-onboarding"
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Return to onboarding
        </Link>
      )}
    </div>
  );
}
