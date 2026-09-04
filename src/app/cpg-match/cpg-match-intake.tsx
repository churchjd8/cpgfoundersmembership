"use client";

import { useState, type FormEvent } from "react";

type Path = "recommend" | "waitlist" | null;
type Status = "idle" | "loading" | "success" | "error";

const vendorCategories = [
  "Branding & design", "Packaging", "R&D / formulation", "Co-manufacturing",
  "Brokers & sales", "Amazon / ecommerce", "Growth & performance marketing",
  "PR & communications", "Finance / fractional CFO", "Operations & supply chain",
  "Legal & regulatory", "Data & analytics", "Recruiting & talent", "Other",
];

const fieldClass = "mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";
const labelClass = "block text-sm font-semibold text-foreground";

export function CpgMatchIntake() {
  const [path, setPath] = useState<Path>(null);

  function choosePath(next: Exclude<Path, null>) {
    setPath(next);
    window.setTimeout(() => document.getElementById("cpg-match-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  }

  return (
    <section className="bg-background py-16 md:py-20" id="get-involved">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Help build the first edition</p>
          <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight sm:text-4xl">
            Give a recommendation. Or be first to get the list.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            If you&rsquo;ve worked with a CPG vendor, your experience can save another founder months of time and a lot of money.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <button type="button" onClick={() => choosePath("recommend")} className={`group rounded-2xl border p-7 text-left transition ${path === "recommend" ? "border-accent bg-card-flagship ring-2 ring-accent/15" : "border-border bg-white hover:border-accent/50"}`}>
            <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">Priority access</span>
            <h3 className="mt-5 text-2xl font-bold">Recommend a vendor</h3>
            <p className="mt-3 leading-relaxed text-muted">Share one honest review in about 5 minutes. You&rsquo;ll be invited into the first wave of CPG Match.</p>
            <span className="mt-5 inline-block text-sm font-bold text-accent group-hover:text-accent-dark">Start a recommendation →</span>
          </button>
          <button type="button" onClick={() => choosePath("waitlist")} className={`group rounded-2xl border p-7 text-left transition ${path === "waitlist" ? "border-ridge bg-white ring-2 ring-ridge/10" : "border-border bg-white hover:border-ridge/50"}`}>
            <span className="inline-flex rounded-full bg-ridge px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">Launch list</span>
            <h3 className="mt-5 text-2xl font-bold">Get access when we launch</h3>
            <p className="mt-3 leading-relaxed text-muted">Tell us what kind of help you need so we can build the most useful categories first.</p>
            <span className="mt-5 inline-block text-sm font-bold text-ridge">Join the launch list →</span>
          </button>
        </div>

        {path && (
          <div id="cpg-match-form" className="scroll-mt-24 mt-8 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-9">
            <button type="button" onClick={() => setPath(null)} className="mb-6 text-sm font-semibold text-muted hover:text-foreground">← Choose a different option</button>
            {path === "recommend" ? <RecommendationForm /> : <WaitlistForm />}
          </div>
        )}
      </div>
    </section>
  );
}

function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading"); setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = { type: "waitlist", ...Object.fromEntries(formData), needs: formData.getAll("needs") };
    try {
      const response = await fetch("/api/cpg-match", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("We couldn't save your information.");
      setStatus("success");
    } catch (err) { setStatus("error"); setError(err instanceof Error ? err.message : "Something went wrong."); }
  }

  if (status === "success") return <Success title="You’re on the launch list." copy="We’ll keep you posted as CPG Match opens. Founders who contribute a vendor review will receive first-wave access." />;

  return (
    <form onSubmit={submit}>
      <FormHeading eyebrow="Launch access" title="What kind of vendor are you looking for?" copy="This helps us prioritize the first categories and make better matches as the database grows." />
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <TextField name="firstName" label="First name" required />
        <TextField name="lastName" label="Last name" required />
        <TextField name="email" label="Work email" type="email" required />
        <TextField name="brand" label="Company / brand" required />
      </div>
      <fieldset className="mt-7"><legend className={labelClass}>What help are you looking for? <span className="font-normal text-muted">(select all that apply)</span></legend><CheckboxGrid name="needs" options={vendorCategories} /></fieldset>
      <div className="mt-6"><label className={labelClass} htmlFor="timing">How soon do you expect to hire?</label><select id="timing" name="timing" className={fieldClass} defaultValue=""><option value="" disabled>Select one</option><option>Right now</option><option>Within 3 months</option><option>Within 6 months</option><option>Just exploring</option></select></div>
      <TextArea name="details" label="Anything specific you need help with?" hint="Optional" />
      <Submit status={status} label="Join the CPG Match launch list" error={error} />
    </form>
  );
}

function RecommendationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading"); setError("");
    const formData = new FormData(event.currentTarget);
    const payload = { type: "recommendation", ...Object.fromEntries(formData) };
    try {
      const response = await fetch("/api/cpg-match", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("We couldn't save your recommendation.");
      setStatus("success");
    } catch (err) { setStatus("error"); setError(err instanceof Error ? err.message : "Something went wrong."); }
  }

  if (status === "success") return <Success title="Recommendation received." copy="Thank you for helping another founder make a better decision. You’re now on the priority list for first-wave access to CPG Match." />;

  return (
    <form onSubmit={submit}>
      <FormHeading eyebrow="Founder recommendation" title="Tell us who you hired—and how it went." copy="Your contact information is used to verify the review. You can choose whether your identity is shown when the directory launches." />
      <div className="mt-9 border-b border-border pb-9">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">About you</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2"><TextField name="firstName" label="First name" required /><TextField name="lastName" label="Last name" required /><TextField name="email" label="Work email" type="email" required /><TextField name="brand" label="Company / brand" required /></div>
        <div className="mt-6"><label className={labelClass} htmlFor="attribution">How should we attribute your review?</label><select id="attribution" name="attribution" required className={fieldClass} defaultValue=""><option value="" disabled>Select one</option><option value="named">Show my name and company</option><option value="anonymous">Keep me anonymous and show “Verified CPG Founder”</option></select></div>
      </div>
      <div className="border-b border-border py-9">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">About the vendor</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2"><TextField name="vendorName" label="Vendor / company name" required /><TextField name="vendorWebsite" label="Vendor website" type="url" /><div><label className={labelClass} htmlFor="category">Category <span className="text-red-600">*</span></label><select id="category" name="category" required className={fieldClass} defaultValue=""><option value="" disabled>Select one</option>{vendorCategories.map(category => <option key={category}>{category}</option>)}</select></div><TextField name="workPeriod" label="When did you work together?" placeholder="e.g. 2025–2026" required /></div>
        <TextArea name="scope" label="What did you hire them to do?" placeholder="Briefly describe the project, engagement, or deliverables." required />
        <div className="mt-6 grid gap-5 sm:grid-cols-2"><div><label className={labelClass} htmlFor="companyStage">Your company stage at the time</label><select id="companyStage" name="companyStage" className={fieldClass} defaultValue=""><option value="" disabled>Select one</option><option>Pre-revenue</option><option>Under $1M revenue</option><option>$1M–$5M revenue</option><option>$5M–$20M revenue</option><option>$20M+ revenue</option><option>Prefer not to say</option></select></div><div><label className={labelClass} htmlFor="investment">Approximate project cost</label><select id="investment" name="investment" className={fieldClass} defaultValue=""><option value="" disabled>Select one</option><option>Under $5K</option><option>$5K–$15K</option><option>$15K–$50K</option><option>$50K–$100K</option><option>$100K+</option><option>Monthly retainer</option><option>Prefer not to say</option></select></div></div>
      </div>
      <div className="pt-9">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Your experience</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2"><RatingSelect name="quality" label="Quality of work" /><RatingSelect name="communication" label="Communication & responsiveness" /><RatingSelect name="delivery" label="On-time delivery" /><RatingSelect name="value" label="Value for the investment" /><RatingSelect name="expectations" label="Sales promise vs. delivery" /><RatingSelect name="stageFit" label="Fit for your stage and needs" /></div>
        <div className="mt-6"><label className={labelClass} htmlFor="disappointed">If you needed similar work again, how would you feel if you couldn’t hire them?</label><select id="disappointed" name="disappointed" required className={fieldClass} defaultValue=""><option value="" disabled>Select one</option><option>Very disappointed</option><option>Somewhat disappointed</option><option>Not disappointed</option><option>I would not hire them again</option></select></div>
        <TextArea name="bestFor" label="Who are they a great fit for?" placeholder="Consider company stage, budget, scope, or founder working style." required />
        <TextArea name="knowBeforeHiring" label="What should another founder know before hiring them?" placeholder="Share strengths, tradeoffs, pricing context, or contractual gotchas." required />
        <TextArea name="privateNotes" label="Anything you want Team Church to know privately?" hint="Optional — this will never be published" />
      </div>
      <label className="mt-7 flex items-start gap-3 text-sm leading-relaxed text-muted"><input type="checkbox" name="certification" value="confirmed" required className="mt-1 h-4 w-4 accent-[var(--accent)]" />I confirm that this reflects my genuine first-hand experience and may be contacted to verify it.</label>
      <Submit status={status} label="Submit recommendation & get priority access" error={error} />
    </form>
  );
}

function FormHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) { return <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{eyebrow}</p><h3 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h3><p className="mt-3 leading-relaxed text-muted">{copy}</p></div>; }
function TextField({ name, label, type = "text", required = false, placeholder }: { name: string; label: string; type?: string; required?: boolean; placeholder?: string }) { return <div><label className={labelClass} htmlFor={name}>{label}{required && <span className="text-red-600"> *</span>}</label><input id={name} name={name} type={type} required={required} placeholder={placeholder} className={fieldClass} /></div>; }
function TextArea({ name, label, hint, placeholder, required = false }: { name: string; label: string; hint?: string; placeholder?: string; required?: boolean }) { return <div className="mt-6"><label className={labelClass} htmlFor={name}>{label}{required && <span className="text-red-600"> *</span>} {hint && <span className="font-normal text-muted">({hint})</span>}</label><textarea id={name} name={name} required={required} placeholder={placeholder} rows={4} className={fieldClass} /></div>; }
function RatingSelect({ name, label }: { name: string; label: string }) { return <div><label className={labelClass} htmlFor={name}>{label} <span className="text-red-600">*</span></label><select id={name} name={name} required className={fieldClass} defaultValue=""><option value="" disabled>Select a rating</option><option value="5">5 — Excellent</option><option value="4">4 — Very good</option><option value="3">3 — Okay</option><option value="2">2 — Disappointing</option><option value="1">1 — Poor</option></select></div>; }
function CheckboxGrid({ name, options }: { name: string; options: string[] }) { return <div className="mt-3 grid gap-2 sm:grid-cols-2">{options.map(option => <label key={option} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm hover:border-accent/50"><input type="checkbox" name={name} value={option} className="h-4 w-4 accent-[var(--accent)]" />{option}</label>)}</div>; }
function Submit({ status, label, error }: { status: Status; label: string; error: string }) { return <div className="mt-8"><button type="submit" disabled={status === "loading"} className="w-full rounded-lg bg-accent px-6 py-4 font-bold text-white transition hover:bg-accent-dark disabled:opacity-60">{status === "loading" ? "Submitting…" : label}</button>{status === "error" && <p role="alert" className="mt-3 text-center text-sm text-red-600">{error} Please try again or email info@teamchurch.co.</p>}<p className="mt-3 text-center text-xs leading-relaxed text-muted">We&rsquo;ll use your information only to operate CPG Match and keep you updated. We never sell founder data.</p></div>; }
function Success({ title, copy }: { title: string; copy: string }) { return <div className="py-8 text-center"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-light text-2xl text-accent">✓</span><h3 className="mt-5 text-2xl font-bold">{title}</h3><p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">{copy}</p></div>; }
