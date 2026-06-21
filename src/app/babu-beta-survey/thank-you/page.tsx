import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thanks for your feedback — Babu Beta Survey",
  description: "Thanks for sharing your feedback on Babu.",
};

export default function BabuSurveyThankYouPage() {
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
        <p className="text-5xl mb-4">🙏</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Thank you for your feedback
        </h1>
        <p className="mt-4 text-lg text-muted">
          Your responses have been sent to Jeff and the Babu team. If you shared your email,
          we&rsquo;ll be in touch shortly about your token credit.
        </p>
        <p className="mt-2 text-muted">
          Every answer helps us shape what Babu becomes next.
        </p>

        <div className="mt-8">
          <a
            href="https://www.askbabu.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
          >
            Back to Babu &rarr;
          </a>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 border border-border hover:border-foreground font-semibold rounded-lg transition-colors"
          >
            CPG Founders Group home
          </Link>
          <Link
            href="/founders-only"
            className="px-6 py-3 border border-border hover:border-foreground font-semibold rounded-lg transition-colors"
          >
            Join the WhatsApp group
          </Link>
        </div>
      </div>
    </section>
  );
}
