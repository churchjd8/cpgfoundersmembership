"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";

import { ReviewForm } from "./review-form";

type Path = "recommend" | "waitlist" | null;
type Status = "idle" | "loading" | "success" | "error";
const categories = ["Brand identity", "Packaging design", "Packaging Suppliers", "R&D / formulation", "Co-manufacturing", "3PL / logistics", "Brokers & sales", "Amazon / ecommerce", "Growth marketing", "PR & communications", "Finance / fractional CFO", "Operations & supply chain", "Legal & regulatory", "Data & analytics", "Recruiting & talent", "Other"];
const input = "mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";
const label = "block text-sm font-semibold";

export function CpgMatchIntake() {
  const [path, setPath] = useState<Path>(null);
  return <section id="participate" className="relative z-10 -mt-9 bg-transparent pb-14 md:-mt-12 md:pb-20"><div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
    <div className="rounded-2xl border border-border bg-background p-5 shadow-xl sm:p-8">
    <p className="text-sm font-semibold uppercase tracking-[.16em] text-muted">Choose how you want to participate</p>
    <div className="mx-auto mt-5 grid gap-4 sm:grid-cols-2">
      <button onClick={() => setPath("recommend")} className="group rounded-2xl bg-accent p-7 text-left text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-xl sm:p-9"><span className="text-xs font-bold uppercase tracking-[.18em] text-white/75">Share your experience</span><strong className="mt-3 block text-2xl sm:text-3xl">Review a Vendor</strong><span className="mt-3 block font-semibold text-white/85">Submit one or more reviews and get early access <span className="inline-block transition group-hover:translate-x-1">→</span></span></button>
      <button onClick={() => setPath("waitlist")} className="group rounded-2xl border-2 border-ridge/25 bg-white p-7 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-ridge hover:shadow-lg sm:p-9"><span className="text-xs font-bold uppercase tracking-[.18em] text-muted">Be first to know</span><strong className="mt-3 block text-2xl sm:text-3xl">Join the Database Waitlist</strong><span className="mt-3 block font-semibold text-ridge">Takes less than a minute <span className="inline-block transition group-hover:translate-x-1">→</span></span></button>
    </div><p className="mt-5 text-sm text-muted">Review as many vendors as you&rsquo;d like. Submit at least one to receive early access.</p>
    </div>
  </div>{path && <Modal title={path === "recommend" ? "Review a Vendor" : "Join the Database Waitlist"} close={() => setPath(null)}>{path === "recommend" ? <ReviewForm onDone={() => setPath(null)} /> : <Waitlist />}</Modal>}</section>;
}

function Modal({ title, close, children }: { title: string; close: () => void; children: ReactNode }) {
  useEffect(() => { const old = document.body.style.overflow; document.body.style.overflow = "hidden"; const key = (e: KeyboardEvent) => e.key === "Escape" && close(); window.addEventListener("keydown", key); return () => { document.body.style.overflow = old; window.removeEventListener("keydown", key); }; }, [close]);
  return <div className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/65 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={title} onMouseDown={e => e.target === e.currentTarget && close()}><div className="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"><div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white px-5 py-4 sm:px-7"><strong>{title}</strong><button onClick={close} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full text-2xl text-muted hover:bg-background">×</button></div><div className="p-5 sm:p-8">{children}</div></div></div>;
}

function Waitlist() {
  const [status, setStatus] = useState<Status>("idle"); const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setStatus("loading"); const data = new FormData(e.currentTarget); try { const res = await fetch("/api/cpg-match", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "waitlist", ...Object.fromEntries(data), needs: data.getAll("needs") }) }); if (!res.ok) throw new Error(); setStatus("success"); } catch { setStatus("error"); setError("We couldn’t save your information. Please try again."); } }
  if (status === "success") return <Success title="You’re on the list." copy="We’ll let you know when CPG Match opens." />;
  return <form onSubmit={submit}><h3 className="text-2xl font-bold">Get launch access.</h3><p className="mt-2 text-muted">Where should we reach you, and what kind of help do you need?</p><div className="mt-7 grid gap-5 sm:grid-cols-2"><Field name="firstName" text="First name" required /><Field name="lastName" text="Last name" required /><Field name="email" text="Work email" type="email" required /><Field name="brand" text="Company / brand" required /></div><fieldset className="mt-6"><legend className={label}>What kind of vendor(s) are you looking for?</legend><div className="mt-3 grid max-h-48 gap-2 overflow-y-auto rounded-lg border border-border p-3 sm:grid-cols-2">{categories.map(x => <label key={x} className="flex items-center gap-2 text-sm"><input type="checkbox" name="needs" value={x} className="h-4 w-4 accent-[var(--accent)]" />{x}</label>)}</div></fieldset><Submit status={status} text="Join the Database Waitlist" error={error} /></form>;
}

function Field({ name, text, type = "text", required, placeholder, defaultValue }: { name: string; text: string; type?: string; required?: boolean; placeholder?: string; defaultValue?: string }) { return <div><label className={label} htmlFor={name}>{text}{required && " *"}</label><input className={input} id={name} name={name} type={type} required={required} placeholder={placeholder} defaultValue={defaultValue} /></div>; }
function Submit({ status, text, error }: { status: Status; text: string; error: string }) { return <div className="mt-7"><button disabled={status === "loading"} className="w-full rounded-lg bg-accent px-6 py-3.5 font-bold text-white hover:bg-accent-dark">{status === "loading" ? "Submitting…" : text}</button>{error && <p role="alert" className="mt-3 text-center text-sm text-red-600">{error}</p>}<p className="mt-3 text-center text-xs text-muted">We never sell founder data.</p></div>; }
function Success({ title, copy }: { title: string; copy: string }) { return <div className="py-10 text-center"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-light text-2xl text-accent">✓</span><h3 className="mt-5 text-2xl font-bold">{title}</h3><p className="mt-3 text-muted">{copy}</p></div>; }
