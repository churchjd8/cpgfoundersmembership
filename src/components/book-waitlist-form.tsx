"use client";

import { useState, type FormEvent } from "react";

export function BookWaitlistForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);
    const first_name = data.get("first_name") as string;
    const email = data.get("email") as string;

    try {
      const res = await fetch("/api/book-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, first_name }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="mt-8 text-lg font-semibold text-white">
        You&rsquo;re on the list. You&rsquo;ll hear from Jeff the day it&rsquo;s out.
      </p>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="text"
          name="first_name"
          required
          placeholder="First name"
          className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="you@yourbrand.com"
          className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Adding..." : "Notify me"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-400">Something went wrong. Please try again.</p>
      )}
    </>
  );
}
