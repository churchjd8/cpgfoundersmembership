"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const brandStages = [
  "🧪 Idea / Pre-launch (not selling yet)",
  "🚀 Launched (early sales, building consistency)",
  "🛒 Growing / Scaling (repeatable growth + traction)",
  "📈 Established (strong sales + team + systems)",
];

const revenueRanges = [
  "Pre-revenue",
  "Under $100K",
  "$100K-$500K",
  "$500K-$1M",
  "$1M-$5M",
  "$5M-$10M",
  "$10M+",
];

const teamSizes = [
  "Just me (solo founder)",
  "2-3 people",
  "4-10 people",
  "11-25 people",
  "26+ people",
];

export default function FoundersOnlyPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/founders-only", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/founders-only/welcome");
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
                Free Community
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Join CPG Founders Only WhatsApp Group
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
                Founder-to-founder support, quick answers, and helpful CPG resources - all in one
                place. No spam.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex gap-2 text-white/70">
                  <span className="text-accent font-bold">&#10003;</span>
                  150+ active CPG founders across every stage
                </li>
                <li className="flex gap-2 text-white/70">
                  <span className="text-accent font-bold">&#10003;</span>
                  Introductions to vetted partners and service providers
                </li>
                <li className="flex gap-2 text-white/70">
                  <span className="text-accent font-bold">&#10003;</span>
                  Quick answers to real questions from people who get it
                </li>
                <li className="flex gap-2 text-white/70">
                  <span className="text-accent font-bold">&#10003;</span>
                  Curated resources, vendor recs, and founder support
                </li>
                <li className="flex gap-2 text-white/70">
                  <span className="text-accent font-bold">&#10003;</span>
                  Free, forever. No pitch, no upsell.
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="inline-flex flex-col items-center gap-4 bg-white/5 rounded-2xl p-8 sm:p-12">
                <p className="text-6xl">💬</p>
                <p className="text-4xl sm:text-5xl font-bold text-accent">150+</p>
                <p className="text-lg text-white/70">CPG founders and counting</p>
                <p className="text-sm text-white/40 max-w-xs">
                  From pre-launch to $10M+. Every stage, every category, one community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FORM ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Request to Join
            </h2>
            <p className="mt-4 text-muted">
              Tell us a bit about you and your brand. We&rsquo;ll send you the WhatsApp invite link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fo-name" className="block text-sm font-medium mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fo-name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="fo-email" className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="fo-email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="fo-business" className="block text-sm font-medium mb-1">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fo-business"
                name="business"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="fo-stage" className="block text-sm font-medium mb-1">
                Brand Stage <span className="text-red-500">*</span>
              </label>
              <select
                id="fo-stage"
                name="stage"
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="" disabled>
                  Select your stage
                </option>
                {brandStages.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="fo-revenue" className="block text-sm font-medium mb-1">
                Revenue (TTM or Expected) <span className="text-red-500">*</span>
              </label>
              <select
                id="fo-revenue"
                name="revenue"
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="" disabled>
                  Select your revenue
                </option>
                {revenueRanges.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="fo-team" className="block text-sm font-medium mb-1">
                Team Size <span className="text-red-500">*</span>
              </label>
              <select
                id="fo-team"
                name="team"
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="" disabled>
                  Select your team size
                </option>
                {teamSizes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Submitting..." : "Join Group"}
            </button>

            {status === "error" && (
              <p className="text-sm text-red-500 text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
