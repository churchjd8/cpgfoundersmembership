import type { Metadata } from "next";
import Link from "next/link";
import { openMonths } from "@/lib/coaching-slots";

export const metadata: Metadata = {
  title: "Book your 1:1 session with Jeff — CPG Founders Group",
  description: "Pick a month to book your 60-minute 1:1 session with Jeff.",
  robots: { index: false, follow: false },
};

export default function ScheduleChooserPage() {
  const months = openMonths();

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          CPG Founders Group
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Book your 1:1 session with Jeff
        </h1>
        <p className="mt-4 text-muted leading-relaxed">
          {months.length > 1
            ? "Choose which month you'd like to schedule."
            : "Pick a time that works for you."}
        </p>
      </div>

      <div className="mt-10 space-y-3">
        {months.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-8 text-center text-muted">
            No sessions are open for booking right now. Please check back soon or{" "}
            <Link href="/contact" className="text-accent underline">
              reach out
            </Link>
            .
          </p>
        ) : (
          months.map((m) => (
            <Link
              key={m.key}
              href={`/clients/schedule-session/${m.key}`}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-accent"
            >
              <span>
                <span className="block font-serif text-xl font-bold">
                  Schedule your {m.label} session
                </span>
                <span className="mt-1 block text-sm text-muted">
                  {m.count} {m.count === 1 ? "time" : "times"} available · 60 minutes
                </span>
              </span>
              <span className="text-accent" aria-hidden>
                &rarr;
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
