import type { Metadata } from "next";
import Link from "next/link";
import { BOOKING_URL } from "@/components/booking-embed";

export const metadata: Metadata = {
  title: "Application Received - Work with Jeff",
  description: "We've received your application. Book your intro call.",
  robots: { index: false, follow: false },
};

// An application goes straight to the intro call booking, no waiting on an
// email. The price is already on /apply and /work-with-jeff, so Joshua's reply
// (routines/application-reply-drafts.md) just points back to /work-with-jeff.
//
// The booking is a link rather than the inline Cal.com embed: as of Nov 2026
// cal.arkpartners.ai's frame-ancestors policy doesn't list this domain, so the
// embed renders a dead box for six seconds and falls back anyway. Swap
// BookingEmbed back in once that header includes cpgfoundersgroup.com.
export default function ApplyThankYouPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Application received. Now pick a time.
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            Book your intro call with Joshua from Jeff&rsquo;s team. Thirty minutes to talk
            through where you are, what you&rsquo;re trying to hit, and what working with Jeff
            would look like. If it isn&rsquo;t a fit, we&rsquo;ll tell you that too.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8 md:p-10 text-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-accent hover:bg-accent-dark text-white font-semibold text-lg transition-colors"
          >
            Book your intro call &rarr;
          </a>
          <p className="mt-4 text-sm text-muted">30 minutes. The scheduler opens in a new tab.</p>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Want the details again before your call? Everything is on{" "}
          <Link href="/work-with-jeff" className="text-accent font-semibold hover:underline">
            Work with Jeff
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
