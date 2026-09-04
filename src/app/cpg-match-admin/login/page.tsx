"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter(); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) { event.preventDefault(); setLoading(true); setError(""); const response = await fetch("/api/cpg-match-admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) }); if (response.ok) { router.replace("/"); router.refresh(); } else { setError("Incorrect password."); setLoading(false); } }
  return <div className="cpg-match-page flex min-h-screen items-center justify-center bg-background px-4"><form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-border bg-white p-8 shadow-sm"><p className="text-xs font-bold uppercase tracking-[.18em] text-accent">CPG Match</p><h1 className="mt-2 text-2xl font-bold">Admin portal</h1><p className="mt-2 text-sm text-muted">Enter the team password to continue.</p><input type="password" value={password} onChange={e => setPassword(e.target.value)} autoFocus className="mt-6 w-full rounded-lg border border-border px-4 py-3 outline-none focus:border-accent" placeholder="Password" />{error && <p className="mt-3 text-sm text-red-600">{error}</p>}<button disabled={!password || loading} className="mt-5 w-full rounded-lg bg-accent px-5 py-3 font-bold text-white disabled:opacity-50">{loading ? "Checking…" : "Log in"}</button></form></div>;
}
