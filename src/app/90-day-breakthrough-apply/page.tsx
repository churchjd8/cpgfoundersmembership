"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const revenueStages = [
  "Pre-revenue",
  "Under $100K",
  "$100K - $500K",
  "$500K - $1M",
  "$1M - $5M",
  "$5M - $10M",
  "$10M+",
];

export default function BreakthroughApplyPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/breakthrough-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/90-day-breakthrough-apply/thank-you");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
              Application
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Apply to the 90-Day Breakthrough
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Tell us about your business and what you&rsquo;re working through. We&rsquo;ll review
              your application and get back to you within 2 business days with next steps.
            </p>
            <p className="mt-3 text-sm text-white/40">
              Jeff works hands-on with every founder he accepts, so seats are limited.
            </p>
          </div>
        </div>
      </section>

      {/* ========== FORM ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="ba-name" className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="ba-name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="ba-email" className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="ba-email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="ba-business" className="block text-sm font-medium mb-1">
                  Business name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="ba-business"
                  name="business"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="ba-website" className="block text-sm font-medium mb-1">
                  Website
                </label>
                <input
                  type="url"
                  id="ba-website"
                  name="website"
                  placeholder="https://"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="ba-revenue" className="block text-sm font-medium mb-1">
                Current revenue <span className="text-red-500">*</span>
              </label>
              <select
                id="ba-revenue"
                name="revenue"
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="" disabled>
                  Select your revenue stage
                </option>
                {revenueStages.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="ba-challenge" className="block text-sm font-medium mb-1">
                What&rsquo;s the biggest challenge in your business right now?{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="ba-challenge"
                name="challenge"
                required
                rows={3}
                placeholder="Fundraising, retail expansion, margins, operations, team — what's keeping you up at night?"
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="ba-breakthrough" className="block text-sm font-medium mb-1">
                What would a breakthrough look like for you in the next 90 days?{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="ba-breakthrough"
                name="breakthrough"
                required
                rows={3}
                placeholder="What specific outcome would change the trajectory of your business?"
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="ba-referral" className="block text-sm font-medium mb-1">
                How did you hear about Jeff?
              </label>
              <input
                type="text"
                id="ba-referral"
                name="referral"
                placeholder="Referral, LinkedIn, podcast, event, etc."
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 text-lg"
              >
                {status === "loading" ? "Submitting..." : "Submit application"}
              </button>
              <p className="mt-3 text-xs text-muted text-center">
                We&rsquo;ll review your application and get back to you within 2 business days.
              </p>
            </div>

            {status === "error" && (
              <p className="text-sm text-red-500 text-center">
                Something went wrong. Please try again or email us directly at{" "}
                <a href="mailto:info@teamchurch.co" className="underline">
                  info@teamchurch.co
                </a>
                .
              </p>
            )}
          </form>

          <div className="mt-10 text-center">
            <Link
              href="/90-day-breakthrough"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              &larr; Back to program details
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
