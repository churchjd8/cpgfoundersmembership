import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apply to the 90-Day Breakthrough - Dream Makers HQ",
  description:
    "Apply to join the 90-Day Breakthrough with Jeff Church. We'll review your application and get back to you within a few business days.",
};

export default function ApplyPage() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
          Application
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Apply to the 90-Day Breakthrough
        </h1>
        <p className="mt-4 text-lg text-muted">
          The application form is being set up. In the meantime, email us directly to get started.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:info@teamchurch.co?subject=90-Day Breakthrough Application"
            className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
          >
            Email to Apply
          </a>
          <Link
            href="/90-day-breakthrough"
            className="px-6 py-3 border border-border hover:border-foreground font-semibold rounded-lg transition-colors"
          >
            Back to Program Details
          </Link>
        </div>
      </div>
    </section>
  );
}
