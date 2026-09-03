"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { GLOSSARY_CATEGORIES, type GlossaryEntry } from "@/lib/cpg-glossary";

const categoryMeta: Record<string, { short: string; color: string }> = {
  "Retail & Channels": { short: "Retail", color: "bg-violet-50 text-violet-800 border-violet-200" },
  "Sales & Distribution": { short: "Sales", color: "bg-blue-50 text-blue-800 border-blue-200" },
  "Data & Velocity": { short: "Data", color: "bg-cyan-50 text-cyan-900 border-cyan-200" },
  "Finance & Unit Economics": { short: "Finance", color: "bg-emerald-50 text-emerald-900 border-emerald-200" },
  "Supply Chain & Operations": { short: "Operations", color: "bg-orange-50 text-orange-900 border-orange-200" },
  "Product & Packaging": { short: "Product", color: "bg-rose-50 text-rose-900 border-rose-200" },
  "Marketing & Ecommerce": { short: "Marketing", color: "bg-fuchsia-50 text-fuchsia-900 border-fuchsia-200" },
  "Fundraising & Legal": { short: "Capital", color: "bg-slate-100 text-slate-800 border-slate-300" },
  "Food Safety & Regulatory": { short: "Regulatory", color: "bg-lime-50 text-lime-900 border-lime-200" },
};

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
}

export function GlossaryExplorer({ entries }: { entries: GlossaryEntry[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [letter, setLetter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>("natural-channel-broker");
  const [copied, setCopied] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q");
    const hasHash = hash && entries.some((item) => slugify(item.term) === hash);
    const frame = requestAnimationFrame(() => {
      if (initialQuery) setQuery(initialQuery);
      if (hasHash) {
        setExpanded(hash);
        requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" }));
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [entries]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === searchRef.current) {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const availableLetters = useMemo(() => new Set(entries.map((item) => item.term[0].toUpperCase())), [entries]);
  const filtered = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return entries.filter((item) => {
      if (category !== "All" && item.category !== category) return false;
      if (letter !== "All" && item.term[0].toUpperCase() !== letter) return false;
      const haystack = [item.term, item.abbreviation, item.definition, item.founderNote, ...(item.aliases || [])].filter(Boolean).join(" ").toLowerCase();
      return words.every((word) => haystack.includes(word));
    }).sort((a, b) => a.term.localeCompare(b.term, undefined, { numeric: true }));
  }, [category, entries, letter, query]);

  const clearFilters = () => { setQuery(""); setCategory("All"); setLetter("All"); };

  async function copyLink(item: GlossaryEntry) {
    const slug = slugify(item.term);
    await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${slug}`);
    window.history.replaceState(null, "", `#${slug}`);
    setCopied(slug);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <section className="bg-background py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sticky top-16 z-30 -mx-4 border-y border-border bg-background/95 px-4 py-4 shadow-sm backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"><SearchIcon /></span>
            <input ref={searchRef} type="search" value={query} onChange={(event) => { setQuery(event.target.value); setLetter("All"); }} placeholder="Search a term, acronym, or question…" aria-label="Search the CPG glossary" className="h-14 w-full rounded-xl border border-border bg-white pl-12 pr-16 text-base text-foreground shadow-sm outline-none placeholder:text-muted/75 focus:border-accent focus:ring-4 focus:ring-accent/10" />
            <kbd className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-background px-2 py-1 text-xs text-muted sm:block">/</kbd>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            <button onClick={() => setCategory("All")} className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${category === "All" ? "border-foreground bg-foreground text-white" : "border-border bg-white text-muted hover:text-foreground"}`}>All areas</button>
            {GLOSSARY_CATEGORIES.map((item) => <button key={item} onClick={() => setCategory(category === item ? "All" : item)} className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${category === item ? "border-foreground bg-foreground text-white" : "border-border bg-white text-muted hover:text-foreground"}`}>{categoryMeta[item].short}</button>)}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-1" aria-label="Filter by first letter">
          <button onClick={() => setLetter("All")} className={`mr-2 rounded-md px-2.5 py-1 text-xs font-bold ${letter === "All" ? "bg-accent text-white" : "text-muted hover:bg-white"}`}>A–Z</button>
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((item) => <button key={item} disabled={!availableLetters.has(item)} onClick={() => setLetter(letter === item ? "All" : item)} className={`h-8 w-8 rounded-md text-xs font-bold transition ${letter === item ? "bg-accent text-white" : availableLetters.has(item) ? "text-muted hover:bg-white hover:text-foreground" : "cursor-not-allowed text-border"}`}>{item}</button>)}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div>
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <p className="text-sm text-muted"><strong className="text-foreground">{filtered.length}</strong> {filtered.length === 1 ? "term" : "terms"}{query ? <> matching <span className="font-medium text-foreground">“{query}”</span></> : ""}</p>
              {(query || category !== "All" || letter !== "All") && <button onClick={clearFilters} className="text-sm font-semibold text-accent hover:text-accent-dark">Clear filters</button>}
            </div>

            {filtered.length ? <div className="grid gap-3 md:grid-cols-2">
              {filtered.map((item) => {
                const slug = slugify(item.term);
                const isOpen = expanded === slug;
                const meta = categoryMeta[item.category];
                return <article id={slug} key={slug} className={`scroll-mt-56 rounded-2xl border bg-white transition ${isOpen ? "border-accent/45 shadow-md ring-1 ring-accent/10 md:col-span-2" : "border-border hover:border-accent/30 hover:shadow-sm"}`}>
                  <button aria-expanded={isOpen} onClick={() => setExpanded(isOpen ? null : slug)} className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6">
                    <span className="min-w-0">
                      <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${meta.color}`}>{meta.short}</span>
                      <span className="mt-3 block text-xl font-bold tracking-tight text-foreground">
                        {item.term}{item.abbreviation && <span className="ml-2 text-sm font-medium text-muted">{item.abbreviation}</span>}
                      </span>
                      <span className={`mt-2 block text-sm leading-relaxed text-muted ${isOpen ? "" : "line-clamp-2"}`}>{item.definition}</span>
                    </span>
                    <span className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition ${isOpen ? "rotate-45 bg-foreground text-white" : "bg-background"}`} aria-hidden="true">+</span>
                  </button>
                  {isOpen && <div className="border-t border-border px-5 pb-6 pt-5 sm:px-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      {item.founderNote && <div className="rounded-xl bg-accent-light p-4"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-dark">Why founders care</p><p className="mt-2 text-sm leading-relaxed text-foreground">{item.founderNote}</p></div>}
                      {item.formula && <div className="rounded-xl bg-foreground p-4 text-white"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold">Useful formula</p><p className="mt-2 font-mono text-sm leading-relaxed">{item.formula}</p></div>}
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      {item.learnMore && <Link href={item.learnMore.href} className="text-sm font-semibold text-accent hover:text-accent-dark">{item.learnMore.label} →</Link>}
                      <button onClick={() => copyLink(item)} className="text-sm font-medium text-muted hover:text-foreground">{copied === slug ? "Link copied ✓" : "Copy direct link"}</button>
                    </div>
                  </div>}
                </article>;
              })}
            </div> : <div className="rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center"><p className="text-4xl">⌕</p><h2 className="mt-3 text-xl font-bold">No exact match yet</h2><p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">Try an acronym, a broader phrase, or clear the filters. If this is CPG language you heard in the wild, tell us—we’ll add it.</p><button onClick={clearFilters} className="mt-5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark">Show all terms</button></div>}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-48 lg:self-start">
            <div className="rounded-2xl bg-foreground p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Start here</p>
              <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-2xl font-bold">What’s a natural channel broker?</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">The question that started this glossary—and one every first-time founder deserves a straight answer to.</p>
              <button onClick={() => { setQuery("natural channel broker"); setCategory("All"); setLetter("All"); setExpanded("natural-channel-broker"); setTimeout(() => document.getElementById("natural-channel-broker")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50); }} className="mt-5 text-sm font-semibold text-gold hover:text-white">Read the answer →</button>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">A Jeff rule worth keeping</p>
              <blockquote className="mt-3 font-[family-name:var(--font-playfair)] text-xl font-bold leading-snug">“Don’t confuse distribution gains with velocity gains.”</blockquote>
              <p className="mt-3 text-sm leading-relaxed text-muted">Getting into more doors is only progress if product moves once it gets there.</p>
            </div>
            <a href="mailto:info@teamchurch.co?subject=CPG%20Glossary%20term%20request" className="block rounded-2xl border border-border p-5 text-sm text-muted transition hover:border-accent/40 hover:bg-white"><strong className="block text-foreground">Missing something?</strong><span className="mt-1 block">Send us the jargon you just heard →</span></a>
          </aside>
        </div>
      </div>
    </section>
  );
}
