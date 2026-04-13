"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function BabuEarlyAccessPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/babu-early", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/babu-early/welcome");
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
                Free Beta Access
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Get Early Access to Babu AI
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
                Your on-demand CPG advisor. Trained on what actually works. Ask anything, anytime -
                from fundraising strategy to retail negotiation to formulation questions.
              </p>
              <p className="mt-4 text-base text-white/50">
                Join a small group of founders testing Babu before launch. Free beta access,
                including Deep Research + Gurus.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex flex-col items-center gap-4 bg-white/5 rounded-2xl p-8 sm:p-12">
                <p className="text-6xl">🤖</p>
                <p className="text-2xl font-bold text-accent">Babu AI</p>
                <p className="text-lg text-white/70">Your CPG Co-Founder in Your Pocket</p>
                <p className="text-sm text-white/40 max-w-xs">
                  Built on 35+ years of CPG knowledge and 4,000+ expert resources from Jeff Church.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT BABU DOES ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What you can do with Babu
            </h2>
            <p className="mt-4 text-lg text-muted">
              Purpose-built for CPG founders. Not a generic AI - a specialized advisor trained on
              real CPG playbooks, financial models, and decades of operator experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card rounded-xl border border-border p-6">
              <p className="text-2xl mb-3">💰</p>
              <h3 className="font-bold mb-2">Fundraising Strategy</h3>
              <p className="text-sm text-muted">
                Get advice on valuations, pitch deck structure, investor targeting, dilution math,
                and SAFE vs equity decisions.
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <p className="text-2xl mb-3">🏪</p>
              <h3 className="font-bold mb-2">Retail Strategy</h3>
              <p className="text-sm text-muted">
                Plan your retail expansion, prep buyer presentations, analyze trade spend, and
                optimize your shelf strategy.
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <p className="text-2xl mb-3">📊</p>
              <h3 className="font-bold mb-2">Financial Review</h3>
              <p className="text-sm text-muted">
                Pressure-test your financial model, analyze gross margins, review your P&L, and
                model different growth scenarios.
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <p className="text-2xl mb-3">📈</p>
              <h3 className="font-bold mb-2">Pricing & Margins</h3>
              <p className="text-sm text-muted">
                Analyze your pricing strategy, COGS structure, and margin targets. Get benchmarks
                for your category and stage.
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <p className="text-2xl mb-3">🔍</p>
              <h3 className="font-bold mb-2">Deep Research</h3>
              <p className="text-sm text-muted">
                Market research, competitor analysis, category trends, and consumer insights -
                powered by CPG-specific data.
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <p className="text-2xl mb-3">🧠</p>
              <h3 className="font-bold mb-2">Gurus</h3>
              <p className="text-sm text-muted">
                Access specialized AI advisors for specific domains - fundraising, retail, marketing,
                operations, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FORM ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
              Limited Beta
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Get Free Early Access
            </h2>
            <p className="mt-4 text-muted">
              Join a small group of founders testing Babu before launch. You&rsquo;ll get free beta
              access and help shape the product with your feedback.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="babu-name" className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="babu-name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="babu-email" className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="babu-email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="babu-business" className="block text-sm font-medium mb-1">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="babu-business"
                  name="business"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Submitting..." : "Get Access"}
              </button>

              {status === "error" && (
                <p className="text-sm text-red-500 text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ========== BUILT BY JEFF ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Built by Jeff Church. Trained on 35 years of CPG.
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Babu isn&rsquo;t a generic AI chatbot. It&rsquo;s trained on Jeff&rsquo;s 35+ years of
            CPG experience, 4,000+ expert resources, financial models, and the same playbook
            he&rsquo;s used to build and advise brands like Suja Juice, Health-Ade, Once Upon a
            Farm, Juni, and dozens more.
          </p>
          <p className="mt-4 text-white/50">
            Think of it as a CPG co-founder in your pocket. Available 24/7.
          </p>
        </div>
      </section>
    </>
  );
}
