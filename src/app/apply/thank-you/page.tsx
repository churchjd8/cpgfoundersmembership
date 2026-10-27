import type { Metadata } from "next";
import Link from "next/link";
import { BookingEmbed, BOOKING_URL } from "@/app/intensive/booking-embed";

export const metadata: Metadata = {
  title: "Application Received - Work with Jeff",
  description: "We've received your application. Book your intro call.",
  robots: { index: false, follow: false },
};

// Pricing now lives on /work-with-jeff, so an application goes straight to the
// intro call booking instead of waiting on an email with the /intensive link.
export default async function ApplyThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const { interest } = await searchParams;
  const wantsSession = interest === "session";

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Application received. Now pick a time.
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            Book a short intro call with Joshua from Jeff&rsquo;s team. Twenty minutes to talk
            through where you are, what you&rsquo;re trying to hit, and which option actually
            makes sense. If it isn&rsquo;t a fit, we&rsquo;ll tell you that too.
          </p>
        </div>

        {wantsSession && (
          <div className="mt-10 rounded-2xl border-2 border-accent bg-card-flagship p-6 text-center">
            <p className="font-semibold">Just want the Strategy Session? You don&rsquo;t need a call for that.</p>
            <form action="/api/strategy-session-checkout" method="POST" className="mt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
              >
                Book your Strategy Session now &rarr;
              </button>
            </form>
          </div>
        )}

        <div className="mt-10">
          <BookingEmbed />
        </div>

        <p className="mt-4 text-center text-sm text-muted">
          Prefer to open it in its own tab?{" "}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
            Book here instead
          </a>
          . Or go back to{" "}
          <Link href="/work-with-jeff" className="text-accent font-semibold hover:underline">
            all the ways to work with Jeff
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
