"use client";

import { useState, type FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const next = params.get("next") || "/admin";
        router.replace(next.startsWith("/admin") ? next : "/admin");
        router.refresh();
      } else {
        setError("Incorrect password.");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-border bg-white p-8 shadow-sm"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          CPG Founders Group
        </p>
        <h1 className="mt-1 font-serif text-2xl font-bold tracking-tight">Admin</h1>
        <p className="mt-2 text-sm text-muted">Enter the password to continue.</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          placeholder="Password"
          className="mt-5 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-5 w-full rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-40"
        >
          {loading ? "Checking..." : "Log in"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}
