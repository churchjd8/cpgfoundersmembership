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

export default function VipDayApplyPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/vip-day-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/vip-day-apply/thank-you");
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
              Apply for a VIP Day with Jeff
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              A half-day intensive at your business&rsquo;s highest-leverage moment. Tell us
              where you are and what you&rsquo;re facing &mdash; we&rsquo;ll get back to you
              within 2 business days with next steps.
            </p>
            <p className="mt-3 text-sm text-white/40">
              Every VIP Day is custom-built around your business. Spots are limited.
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
                <label htmlFor="vip-firstName" className="block text-sm font-medium mb-1">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="vip-firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="vip-lastName" className="block text-sm font-medium mb-1">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="vip-lastName"
                  name="lastName"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="vip-email" className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="vip-email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="vip-business" className="block text-sm font-medium mb-1">
                  Business name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="vip-business"
                  name="business"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="vip-website" className="block text-sm font-medium mb-1">
                  Business website (if applicable)
                </label>
                <input
                  type="url"
                  id="vip-website"
                  name="website"
                  placeholder="https://"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <fieldset>
                <legend className="block text-sm font-medium mb-2">
                  What is your revenue (Trailing Twelve Months or expected this year)?{" "}
                  <span className="text-red-500">*</span>
                </legend>
                <div className="space-y-2">
                  {revenueStages.map((s) => (
                    <label key={s} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="revenue"
                        value={s}
                        required
                        className="h-4 w-4 text-accent border-border focus:ring-accent"
                      />
                      <span className="text-sm">{s}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div>
              <label htmlFor="vip-challenge" className="block text-sm font-medium mb-1">
                What&rsquo;s the biggest challenge in your business right now?{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="vip-challenge"
                name="challenge"
                required
                rows={3}
                placeholder="Fundraising, retail expansion, margins, operations, team — what's keeping you up at night?"
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="vip-breakthrough" className="block text-sm font-medium mb-1">
                What would a breakthrough look like for you in the next 90 days?{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="vip-breakthrough"
                name="breakthrough"
                required
                rows={3}
                placeholder="What specific outcome would change the trajectory of your business?"
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="vip-referral" className="block text-sm font-medium mb-1">
                How did you hear about Jeff?
              </label>
              <input
                type="text"
                id="vip-referral"
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
              href="/"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              &larr; Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
