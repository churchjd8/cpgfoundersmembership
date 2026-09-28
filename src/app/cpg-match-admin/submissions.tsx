"use client";

import { useState } from "react";
import type { Entry } from "@/lib/cpg-match-submissions";

const control = "rounded-lg border border-border bg-white px-3 py-2 text-sm";
function permission(entry: Entry) {
  return entry.payload.vendorNotificationPermission === "yes" ? "Yes — positive reviews only" : entry.payload.vendorNotificationPermission === "no" ? "No — do not identify reviewer" : "Not recorded — do not identify reviewer";
}

export function Submissions({ entries }: { entries: Entry[] }) {
  const [type, setType] = useState("recommendation");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [consent, setConsent] = useState("");
  const [sort, setSort] = useState("newest");
  const categoriesFor = (entry: Entry): string[] => Array.isArray(entry.payload.category) ? entry.payload.category.map(String) : [String(entry.payload.category || entry.vendor_category || "")];
  const categories = [...new Set(entries.filter(e => e.submission_type === "recommendation").flatMap(categoriesFor))].filter(Boolean).sort();
  const visible = entries.filter(e => e.submission_type === type &&
    (!search || [e.vendor_name, e.vendor_category, e.first_name, e.last_name, e.email, e.brand, e.payload.vendorContactName, e.payload.vendorContactEmail].join(" ").toLowerCase().includes(search.toLowerCase())) &&
    (type !== "recommendation" || ((!category || categoriesFor(e).includes(category)) && (!consent || (e.payload.vendorNotificationPermission || "unrecorded") === consent)))
  ).sort((a, b) => sort === "oldest" ? a.created_at.localeCompare(b.created_at) : sort === "name" ? (a.vendor_name || `${a.first_name} ${a.last_name}`).localeCompare(b.vendor_name || `${b.first_name} ${b.last_name}`) : sort === "category" ? (a.vendor_category || "").localeCompare(b.vendor_category || "") : sort === "brand" ? a.brand.localeCompare(b.brand) : b.created_at.localeCompare(a.created_at));
  return <section className="mt-7">
    <div className="flex flex-wrap gap-3" aria-label="Submission type">{[["recommendation", "Vendor nominations"], ["waitlist", "Waitlist"]].map(([value, text]) => <button key={value} onClick={() => { setType(value); setSearch(""); }} aria-pressed={type === value} className={`${control} font-bold ${type === value ? "border-accent bg-accent-light text-accent" : ""}`}>{text} ({entries.filter(e => e.submission_type === value).length})</button>)}</div>
    <div className="mt-5 flex flex-wrap items-end gap-3">
      <label className="flex flex-col gap-1 text-sm">Search<input className={control} type="search" placeholder="Vendor, founder, email, or brand" value={search} onChange={e => setSearch(e.target.value)} /></label>
      {type === "recommendation" && <><label className="flex flex-col gap-1 text-sm">Category<select className={control} value={category} onChange={e => setCategory(e.target.value)}><option value="">All categories</option>{categories.map(c => <option key={c}>{c}</option>)}</select></label><label className="flex flex-col gap-1 text-sm">Permission to identify reviewer<select className={control} value={consent} onChange={e => setConsent(e.target.value)}><option value="">All permissions</option><option value="yes">Yes — positive reviews only</option><option value="no">No</option><option value="unrecorded">Not recorded</option></select></label></>}
      <label className="flex flex-col gap-1 text-sm">Sort by<select className={control} value={sort} onChange={e => setSort(e.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="name">Name A–Z</option><option value="category">Category A–Z</option><option value="brand">Founder’s brand A–Z</option></select></label>
      <a className={`${control} font-bold text-accent`} href={`/api/cpg-match-admin/export?type=${type}`}>Export all {type === "recommendation" ? "nominations" : "waitlist signups"} CSV</a>
    </div>
    <p className="my-4 text-sm text-muted">{visible.length} {type === "recommendation" ? "nominations" : "waitlist signups"} shown. CSV exports include the full selected list for sorting in Excel or Google Sheets.</p>
    <div className="space-y-3">{visible.map(entry => <details key={entry.id} className="rounded-xl border border-border bg-white"><summary className="grid cursor-pointer gap-3 p-5 sm:grid-cols-[1fr_1fr_180px]"><span><strong>{entry.vendor_name || `${entry.first_name} ${entry.last_name}`}</strong><small className="block text-muted">{entry.vendor_category || entry.brand}</small></span><span className="text-sm">{entry.first_name} {entry.last_name}<small className="block text-muted">{entry.brand}</small>{type === "recommendation" && <small className="mt-1 block">Permission: {permission(entry)}</small>}</span><time className="text-sm text-muted" dateTime={entry.created_at}>{new Date(entry.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}</time></summary><div className="border-t border-border p-5"><div className="mb-5 flex flex-wrap gap-6 text-sm"><a className="text-accent underline" href={`mailto:${entry.email}`}>Email founder: {entry.email}</a>{typeof entry.payload.vendorContactEmail === "string" && entry.payload.vendorContactEmail && <a className="text-accent underline" href={`mailto:${entry.payload.vendorContactEmail}`}>Email vendor contact: {entry.payload.vendorContactEmail}</a>}</div><dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">{Object.entries(entry.payload || {}).filter(([key, value]) => key !== "type" && value !== "" && value != null).map(([key, value]) => <div key={key}><dt className="text-xs font-bold uppercase tracking-wide text-muted">{key.replace(/([A-Z])/g, " $1")}</dt><dd className="mt-1 whitespace-pre-wrap text-sm">{Array.isArray(value) ? value.join(", ") : String(value)}</dd></div>)}</dl></div></details>)}{!visible.length && <p className="rounded-xl border border-border bg-white p-10 text-center text-muted">No matching submissions.</p>}</div>
  </section>;
}
