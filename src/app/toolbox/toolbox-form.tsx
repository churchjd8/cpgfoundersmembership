"use client";

import { useState, type FormEvent } from "react";

// One opt-in for the whole toolbox — first name, last name, email, done.
// Rendered twice on /toolbox: once on the dark hero, once at the foot of the page.
export function ToolboxForm({
  variant = "light",
  idPrefix,
}: {
  variant?: "light" | "dark";
  idPrefix: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState("");

  const dark = variant === "dark";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorDetail("");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/toolbox-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const err = await res.json().catch(() => ({}));
        setErrorDetail(err.error || `Error ${res.status}`);
        setStatus("error");
      }
    } catch {
      setErrorDetail("Network error");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-2xl p-6 sm:p-8 text-center ${
          dark ? "bg-white/10 border border-white/20" : "bg-card border border-border"
        }`}
      >
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-green-100 text-green-600 mb-4">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`text-xl font-bold ${dark ? "text-white" : ""}`}>Check your inbox.</h3>
        <p className={`mt-2 leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>
          The whole toolbox is on its way in one email from Jeff. If it&rsquo;s not there in a
          couple of minutes, check promotions or spam and drag it over.
        </p>
      </div>
    );
  }

  const labelClass = `block text-sm font-medium mb-1 ${dark ? "text-white/80" : ""}`;
  const inputClass = `w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-accent ${
    dark
      ? "bg-white/10 border-white/20 text-white placeholder-white/40"
      : "bg-white border-border"
  }`;

  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 ${
        dark ? "bg-white/10 border border-white/20" : "bg-card border border-border"
      }`}
    >
      <h3 className={`text-xl font-bold ${dark ? "text-white" : ""}`}>
        Send me the whole toolbox
      </h3>
      <p className={`mt-1 text-sm ${dark ? "text-white/60" : "text-muted"}`}>
        One email. Everything in it. No cost, no call, no pitch.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor={`${idPrefix}-first`} className={labelClass}>
              First name
            </label>
            <input
              type="text"
              id={`${idPrefix}-first`}
              name="firstName"
              autoComplete="given-name"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-last`} className={labelClass}>
              Last name
            </label>
            <input
              type="text"
              id={`${idPrefix}-last`}
              name="lastName"
              autoComplete="family-name"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-email`} className={labelClass}>
            Email
          </label>
          <input
            type="email"
            id={`${idPrefix}-email`}
            name="email"
            autoComplete="email"
            required
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-6 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 text-lg"
        >
          {status === "loading" ? "Sending..." : "Send me the toolbox →"}
        </button>

        {status === "error" && (
          <p className="text-sm text-red-400 text-center">
            Something went wrong. Please try again.{errorDetail && ` (${errorDetail})`}
          </p>
        )}
      </form>
    </div>
  );
}
