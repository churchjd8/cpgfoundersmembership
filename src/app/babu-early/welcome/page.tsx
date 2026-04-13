import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Welcome to Babu AI Beta - CPG Founders Group",
  description: "You're in! Check your email for your Babu AI beta access link.",
};

export default function BabuWelcomePage() {
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
        <p className="text-5xl mb-4">🤖</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          You&rsquo;re in the beta!
        </h1>
        <p className="mt-4 text-lg text-muted">
          Check your email for your Babu AI access link and instructions to get started.
        </p>
        <p className="mt-2 text-muted">
          Start asking Babu anything - fundraising, retail strategy, margins, pricing, and more.
        </p>

        <div className="mt-8">
          <a
            href="https://www.askbabu.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
          >
            Go to Babu AI &rarr;
          </a>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#programs"
            className="px-6 py-3 border border-border hover:border-foreground font-semibold rounded-lg transition-colors"
          >
            Explore programs
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
