"use client";

import { useState, type FormEvent } from "react";

const revenueStages = [
  "Pre-revenue",
  "Under $100K",
  "$100K - $500K",
  "$500K - $1M",
  "$1M - $5M",
  "$5M - $10M",
  "$10M+",
];

const focusAreas = [
  "Fundraising",
  "Retail and distribution",
  "Pricing and margins",
  "Manufacturing and supply chain",
  "Brand and marketing",
  "Team and hiring",
  "Something else",
];

const input =
  "w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent";

export function IntakeForm({ defaultName, defaultEmail }: { defaultName: string; defaultEmail: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/strategy-session-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border-2 border-accent bg-card-flagship p-8 text-center">
        <h3 className="text-xl font-bold">Got it. Jeff will have this before your call.</h3>
        <p className="mt-3 text-muted leading-relaxed">
          Watch your inbox. Within one business day we&rsquo;ll send Jeff&rsquo;s calendar so you
          can lock in your 90 minutes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Your name" required>
          <input name="name" required defaultValue={defaultName} className={input} />
        </Field>
        <Field label="Email" required>
          <input name="email" type="email" required defaultValue={defaultEmail} className={input} />
        </Field>
        <Field label="Business name" required>
          <input name="business" required className={input} />
        </Field>
        <Field label="Website">
          <input name="website" type="url" placeholder="https://" className={input} />
        </Field>
      </div>

      <Field label="Revenue (trailing twelve months or expected this year)" required>
        <select name="revenue" required defaultValue="" className={input}>
          <option value="" disabled>
            Select one
          </option>
          {revenueStages.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </Field>

      <fieldset>
        <legend className="block text-sm font-medium mb-2">
          What do you want Jeff focused on? <span className="text-red-500">*</span>
        </legend>
        <div className="grid sm:grid-cols-2 gap-2">
          {focusAreas.map((a) => (
            <label key={a} className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="focus" value={a} required className="h-4 w-4 text-accent" />
              <span className="text-sm">{a}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="The decision or question you want Jeff's take on" required>
        <textarea
          name="question"
          required
          rows={4}
          placeholder="e.g. We're about to raise a $1.5M seed. Is our deck and valuation ready, and who should we be talking to?"
          className={`${input} resize-y`}
        />
      </Field>

      <Field label="Link to your deck, retail roadmap, P&L, or anything you want Jeff to review">
        <input
          name="materials"
          placeholder="Google Drive, DocSend, Dropbox link (make sure it's viewable)"
          className={input}
        />
      </Field>

      <Field label="What have you already tried?">
        <textarea name="tried" rows={3} className={`${input} resize-y`} />
      </Field>

      <Field label="What would make these 90 minutes a win?" required>
        <textarea name="win" required rows={3} className={`${input} resize-y`} />
      </Field>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 text-lg"
      >
        {status === "loading" ? "Sending..." : "Send my intake to Jeff"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-500 text-center">
          Something went wrong. Please try again or email{" "}
          <a href="mailto:info@teamchurch.co" className="underline">
            info@teamchurch.co
          </a>
          .
        </p>
      )}
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}
