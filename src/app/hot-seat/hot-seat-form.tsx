"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent";

export default function HotSeatForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/hot-seat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/hot-seat/thank-you");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="hs-name" className="block text-sm font-medium mb-1">
            Your name <span className="text-red-500">*</span>
          </label>
          <input type="text" id="hs-name" name="name" required className={inputClass} />
        </div>

        <div>
          <label htmlFor="hs-email" className="block text-sm font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input type="email" id="hs-email" name="email" required className={inputClass} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="hs-business" className="block text-sm font-medium mb-1">
            Business name <span className="text-red-500">*</span>
          </label>
          <input type="text" id="hs-business" name="business" required className={inputClass} />
        </div>

        <div>
          <label htmlFor="hs-website" className="block text-sm font-medium mb-1">
            Website (if you have one)
          </label>
          <input
            type="text"
            id="hs-website"
            name="website"
            placeholder="yourbrand.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="hs-about" className="block text-sm font-medium mb-1">
          Tell us about your business in a few sentences{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          id="hs-about"
          name="about"
          required
          rows={3}
          placeholder="What you sell, where you sell it, and roughly where you are (pre-launch, $250K, $2M...)."
          className={`${inputClass} resize-y`}
        />
      </div>

      <div>
        <label htmlFor="hs-challenge" className="block text-sm font-medium mb-1">
          What&rsquo;s the biggest challenge in your business right now?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          id="hs-challenge"
          name="challenge"
          required
          rows={4}
          placeholder="Give us the context. What's going on, what have you tried, and what's at stake?"
          className={`${inputClass} resize-y`}
        />
      </div>

      <div>
        <label htmlFor="hs-question" className="block text-sm font-medium mb-1">
          If the group could answer one question for you, what would it be?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          id="hs-question"
          name="question"
          required
          rows={2}
          placeholder="The more specific the question, the better the answers."
          className={`${inputClass} resize-y`}
        />
      </div>

      <fieldset>
        <legend className="block text-sm font-medium mb-2">
          Are you in the CPG Founders WhatsApp group?
        </legend>
        <div className="flex gap-6">
          {["Yes", "Not yet"].map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="inGroup"
                value={option}
                className="h-4 w-4 text-accent border-border focus:ring-accent"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted">
          Not in the WhatsApp group yet?{" "}
          <Link href="/founders-only" className="font-semibold text-accent hover:underline">
            Click here to join.
          </Link>{" "}
          It&rsquo;s free.
        </p>
      </fieldset>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          className="mt-1 h-4 w-4 text-accent border-border focus:ring-accent"
        />
        <span className="text-sm text-muted">
          If I&rsquo;m chosen, I&rsquo;m good with my business and this challenge being shared
          with the founders in the group. <span className="text-red-500">*</span>
        </span>
      </label>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 text-lg"
        >
          {status === "loading" ? "Submitting..." : "Apply for the Hot Seat"}
        </button>
        <p className="mt-3 text-xs text-muted text-center">
          We&rsquo;ll let you know within a week whether you&rsquo;re up this round or a fit for
          a later one.
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
  );
}
