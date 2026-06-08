"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

type Status = "idle" | "loading" | "success" | "error";

const categories = [
  "Brokers",
  "Co-Manufacturers",
  "Fractional CFO / Finance",
  "Branding & Design",
  "Legal (CPG-specific)",
  "PR & Marketing Agencies",
  "AI Agency",
  "Trade Promo Management",
  "Cold Storage & Logistics",
  "E-commerce / Amazon",
  "Insurance",
  "Trademark / IP",
];

export default function VettedServicesPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
              Coming Soon
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Jeff&rsquo;s Vetted Service Providers
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              A short list of agencies, partners, and service providers Jeff and the CPG Founders
              Group community have personally worked with and actually recommend. No pay-to-play.
              No sponsor slots. Just providers who&rsquo;ve earned the introduction.
            </p>
          </div>
        </div>
      </section>

      {/* ========== CATEGORIES ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Lists being finalized
            </h2>
            <p className="mt-4 text-lg text-muted">
              Jeff is actively curating providers across these categories. Get on the waitlist
              below and we&rsquo;ll send each list as it&rsquo;s finalized.
            </p>
          </div>
          <div className="bg-card-flagship rounded-xl border border-accent/30 ring-2 ring-accent/20 p-6 sm:p-8 md:p-10">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <li key={cat} className="flex items-start gap-2 text-foreground">
                  <span className="text-accent mt-0.5">&#10003;</span>
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ========== WAITLIST FORM ========== */}
      <section className="py-16 md:py-24 bg-background" id="waitlist">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Waitlist
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Get the lists in your inbox
            </h2>
            <p className="mt-4 text-lg text-muted">
              Drop your email and we&rsquo;ll send each vetted list as it&rsquo;s finalized.
            </p>
          </div>
          <WaitlistForm />
        </div>
      </section>

      {/* ========== PROVIDER APPLICATION ========== */}
      <section className="py-16 md:py-24 bg-white" id="apply">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              For Service Providers
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Want to be on the list?
            </h2>
            <p className="mt-4 text-lg text-muted">
              Drop your name and email. We&rsquo;ll send you a short application and review every
              one personally.
            </p>
          </div>
          <ProviderApplicationForm />
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Looking for free CPG tools while you wait?
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Jeff&rsquo;s free resource library has calculators, white papers, and workshop replays
            built from 35+ years of operating CPG brands.
          </p>
          <div className="mt-10">
            <Link
              href="/resources"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Browse free resources &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/vetted-services-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center bg-card border border-border rounded-xl p-8">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-green-100 text-green-600 mb-4">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold">You&rsquo;re on the list.</h3>
        <p className="mt-3 text-muted">We&rsquo;ll email you the moment a list goes live.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="wl-firstName" className="block text-sm font-medium mb-1">
          First name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="wl-firstName"
          name="firstName"
          required
          className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <div>
        <label htmlFor="wl-email" className="block text-sm font-medium mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="wl-email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Adding you..." : "Get on the waitlist"}
      </button>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-500 text-center">
          Something went wrong. Try again or email us at info@teamchurch.co.
        </p>
      )}
    </form>
  );
}

function ProviderApplicationForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/vetted-services-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center bg-card border border-border rounded-xl p-8">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-green-100 text-green-600 mb-4">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold">Got it.</h3>
        <p className="mt-3 text-muted">We&rsquo;ll be in touch within 5 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="ap-firstName" className="block text-sm font-medium mb-1">
          First name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="ap-firstName"
          name="firstName"
          required
          className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <div>
        <label htmlFor="ap-email" className="block text-sm font-medium mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="ap-email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Apply to be on the list"}
      </button>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-500 text-center">
          Something went wrong. Try again or email us at info@teamchurch.co.
        </p>
      )}
    </form>
  );
}
