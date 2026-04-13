import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Welcome to CPG Founders Only - CPG Founders Group",
  description: "You're in! Check your email for the WhatsApp group invite link.",
};

export default function FoundersOnlyWelcomePage() {
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
        <p className="text-5xl mb-4">💬</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          You&rsquo;re in!
        </h1>
        <p className="mt-4 text-lg text-muted">
          Check your email for the WhatsApp group invite link. We&rsquo;ll get you added shortly.
        </p>
        <p className="mt-2 text-muted">
          Welcome to 150+ CPG founders who are building, sharing, and supporting each other every
          day.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#programs"
            className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
          >
            Explore programs
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 border border-border hover:border-foreground font-semibold rounded-lg transition-colors"
          >
            Read the blog
          </Link>
        </div>
      </div>
    </section>
  );
}
