"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const stages = ["Planning to launch", "Launched, under $500K", "$500K–$1M", "$1M+"];

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

export function RegistrationForm({ trainingTitle }: { trainingTitle: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/free-training-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
      });

      if (!response.ok) throw new Error("Registration failed");

      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      if (typeof fbq === "function") {
        fbq("track", "Lead", {
          content_name: trainingTitle,
          content_category: "free-training",
          currency: "USD",
          value: 0,
        });
      }

      router.push("/free-training/watch");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Free training registration">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="training-name" className="mb-1.5 block text-sm font-semibold text-foreground">
            First name
          </label>
          <input id="training-name" name="name" type="text" autoComplete="given-name" required placeholder="Your first name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="training-email" className="mb-1.5 block text-sm font-semibold text-foreground">
            Email
          </label>
          <input id="training-email" name="email" type="email" autoComplete="email" required placeholder="you@yourbrand.com" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="training-business" className="mb-1.5 block text-sm font-semibold text-foreground">
            Brand name <span className="font-normal text-muted">(if you have one)</span>
          </label>
          <input id="training-business" name="business" type="text" autoComplete="organization" placeholder="Your brand" className={inputClass} />
        </div>
        <div>
          <label htmlFor="training-stage" className="mb-1.5 block text-sm font-semibold text-foreground">
            Where are you today?
          </label>
          <select id="training-stage" name="stage" required defaultValue="" className={inputClass}>
            <option value="" disabled>Select one</option>
            {stages.map((stage) => <option key={stage}>{stage}</option>)}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center rounded-lg bg-accent px-6 py-4 text-base font-bold text-white shadow-lg shadow-accent/15 transition hover:bg-accent-dark disabled:cursor-wait disabled:opacity-70"
      >
        {status === "loading" ? "Opening your training..." : "Watch the Free Training"}
        {status !== "loading" && <span className="ml-2" aria-hidden="true">&rarr;</span>}
      </button>

      {status === "error" && (
        <p className="text-center text-sm text-red-700" role="alert">
          We couldn&rsquo;t complete your registration. Please try again or email info@teamchurch.co.
        </p>
      )}

      <p className="text-center text-xs leading-relaxed text-muted">
        Free. Starts right away. You&rsquo;ll also get practical CPG resources from Jeff by email, and you can unsubscribe anytime.
      </p>
    </form>
  );
}
