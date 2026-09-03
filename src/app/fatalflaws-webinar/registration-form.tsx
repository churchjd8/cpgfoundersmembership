"use client";

import { useState, type FormEvent } from "react";

const stages = [
  "Idea / pre-launch",
  "Launched, under $500K",
  "$500K–$1M",
  "$1M–$5M",
  "$5M–$10M",
  "$10M+",
];

export function RegistrationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/fatal-flaws-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
      });

      if (!response.ok) throw new Error("Registration failed");

      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      if (typeof fbq === "function") {
        fbq("track", "Lead", {
          content_name: "CPG Fatal Flaws Webinar",
          content_category: "webinar",
          currency: "USD",
          value: 0,
        });
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center" role="status">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-4 text-2xl font-bold text-foreground">You&rsquo;re on the list.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Check your inbox for your confirmation and live-session details. We&rsquo;ll send the replay after the webinar, too.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Webinar registration">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fatal-flaws-name" className="mb-1.5 block text-sm font-semibold text-foreground">
            First name
          </label>
          <input
            id="fatal-flaws-name"
            name="name"
            type="text"
            autoComplete="given-name"
            required
            placeholder="Your first name"
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div>
          <label htmlFor="fatal-flaws-email" className="mb-1.5 block text-sm font-semibold text-foreground">
            Work email
          </label>
          <input
            id="fatal-flaws-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@yourbrand.com"
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fatal-flaws-business" className="mb-1.5 block text-sm font-semibold text-foreground">
            Brand name
          </label>
          <input
            id="fatal-flaws-business"
            name="business"
            type="text"
            autoComplete="organization"
            required
            placeholder="Your brand"
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div>
          <label htmlFor="fatal-flaws-stage" className="mb-1.5 block text-sm font-semibold text-foreground">
            Current stage
          </label>
          <select
            id="fatal-flaws-stage"
            name="stage"
            required
            defaultValue=""
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            <option value="" disabled>Select one</option>
            {stages.map((stage) => <option key={stage}>{stage}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="fatal-flaws-question" className="mb-1.5 block text-sm font-semibold text-foreground">
          What business question would you ask Jeff? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id="fatal-flaws-question"
          name="question"
          rows={3}
          placeholder="Share the decision, risk, or roadblock you want Jeff to address..."
          className="w-full resize-none rounded-lg border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center rounded-lg bg-accent px-6 py-4 text-base font-bold text-white shadow-lg shadow-accent/15 transition hover:bg-accent-dark disabled:cursor-wait disabled:opacity-70"
      >
        {status === "loading" ? "Saving your seat..." : "Save My Free Seat"}
        {status !== "loading" && <span className="ml-2" aria-hidden="true">&rarr;</span>}
      </button>

      {status === "error" && (
        <p className="text-center text-sm text-red-700" role="alert">
          We couldn&rsquo;t complete your registration. Please try again or email info@teamchurch.co.
        </p>
      )}

      <p className="text-center text-xs leading-relaxed text-muted">
        Free to attend. No spam. By registering, you&rsquo;ll receive webinar reminders and practical CPG resources from Jeff.
      </p>
    </form>
  );
}
