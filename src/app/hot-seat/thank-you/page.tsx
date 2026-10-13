import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Application Received - The Hot Seat",
  description:
    "We've received your Hot Seat application. We'll let you know within a week whether you're up this round.",
};

export default function HotSeatThankYouPage() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Application received.
        </h1>
        <p className="mt-4 text-lg text-muted">
          Thanks for raising your hand. We&rsquo;ll let you know within a week whether
          you&rsquo;re in the Hot Seat this round or a fit for a later one.
        </p>
        <p className="mt-2 text-muted">
          The Hot Seat happens inside the CPG Founders WhatsApp group, so make sure you&rsquo;re
          in there.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/founders-only"
            className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
          >
            Join the WhatsApp group
          </Link>
          <Link
            href="/resources"
            className="px-6 py-3 border border-border hover:border-foreground font-semibold rounded-lg transition-colors"
          >
            Free resources
          </Link>
        </div>
      </div>
    </section>
  );
}
