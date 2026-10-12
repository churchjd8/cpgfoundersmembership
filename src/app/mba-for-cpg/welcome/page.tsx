import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { MBA_LOGIN_URL } from "@/lib/mba-offer";
import { PurchasePixel } from "./purchase-pixel";

export const metadata: Metadata = {
  title: "Welcome to the MBA for CPG - CPG Founders Group",
  robots: { index: false, follow: false },
};

async function getSale(sessionId?: string): Promise<{ paid: boolean; amountUsd: number }> {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return { paid: false, amountUsd: 0 };
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return {
      paid: session.payment_status === "paid" || session.status === "complete",
      amountUsd: (session.amount_total ?? 0) / 100,
    };
  } catch {
    return { paid: false, amountUsd: 0 };
  }
}

export default async function MbaWelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const { paid, amountUsd } = await getSale(session_id);

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 text-center">
      {paid && session_id && <PurchasePixel sessionId={session_id} valueUsd={amountUsd} />}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-light text-3xl text-accent-dark">
        &#10003;
      </div>
      <h1 className="mt-6 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
        {paid ? "You're in. Welcome to the MBA for CPG." : "Almost there."}
      </h1>

      {paid ? (
        <p className="mt-4 text-muted leading-relaxed">
          Your payment is in and a receipt is on its way to your inbox. Your course
          access is being set up right now under the email you used at checkout.
        </p>
      ) : (
        <p className="mt-4 text-muted leading-relaxed">
          If your payment went through, you&apos;ll have a receipt in your inbox
          shortly and your course access will follow. If you closed checkout before
          finishing, you can pick back up below.
        </p>
      )}

      <div className="mt-8 rounded-xl border border-border bg-card p-6 text-left">
        <h2 className="font-semibold">What happens next</h2>
        <ol className="mt-3 space-y-2 text-sm text-muted">
          <li>
            1. Watch for a welcome email with your login details. It usually lands
            within a few minutes, so check spam if you don&apos;t see it.
          </li>
          <li>
            2. Log in at{" "}
            <a href={MBA_LOGIN_URL} className="underline hover:text-foreground transition-colors">
              learn.cpgfoundersgroup.com
            </a>{" "}
            and start with Module 1. All 8 modules are open from day one.
          </li>
          <li>
            3. Nothing after 15 minutes? Email{" "}
            <a
              href="mailto:info@teamchurch.co?subject=MBA for CPG access"
              className="underline hover:text-foreground transition-colors"
            >
              info@teamchurch.co
            </a>{" "}
            and we&apos;ll get you in.
          </li>
        </ol>
      </div>

      {paid ? (
        <a
          href={MBA_LOGIN_URL}
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Go to the course
        </a>
      ) : (
        <Link
          href="/mba-for-cpg"
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Back to the MBA for CPG
        </Link>
      )}

      {paid && (
        <div className="mt-12 grid gap-4 text-left sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold">Join the Founders Club</h2>
            <p className="mt-2 text-sm text-muted">
              300+ CPG founders on WhatsApp, trading answers every day.
            </p>
            <a
              href="https://chat.whatsapp.com/EclqcEFTX2yAeBmwsq88tq"
              className="mt-4 inline-block text-sm font-semibold text-accent underline hover:text-accent-dark"
            >
              Join the group
            </a>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold">Try Babu free for 10 days</h2>
            <p className="mt-2 text-sm text-muted">
              Jeff&apos;s CPG AI. Ask it questions as you work through the modules.
            </p>
            <a
              href="https://www.askbabu.ai/signup"
              className="mt-4 inline-block text-sm font-semibold text-accent underline hover:text-accent-dark"
            >
              Start your trial
            </a>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 sm:col-span-2">
            <h2 className="font-semibold">Already selling and want Jeff in your business?</h2>
            <p className="mt-2 text-sm text-muted">
              The 3-Month Advisory Intensive includes everything in the MBA for CPG plus
              direct time with Jeff.
            </p>
            <Link
              href="/advisory"
              className="mt-4 inline-block text-sm font-semibold text-accent underline hover:text-accent-dark"
            >
              See how it works
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
