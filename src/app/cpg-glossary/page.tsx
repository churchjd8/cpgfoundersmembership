import type { Metadata } from "next";
import { GlossaryExplorer } from "./glossary-explorer";
import { GLOSSARY_ENTRIES, GLOSSARY_SOURCES } from "@/lib/cpg-glossary";

export const metadata: Metadata = {
  title: "The CPG Glossary — 218 Terms Every Founder Should Know",
  description: "A searchable, plain-English guide to 218 CPG retail, distribution, ecommerce, margin, velocity, operations, packaging, fundraising, and food-regulation terms.",
  alternates: { canonical: "https://cpgfoundersgroup.com/cpg-glossary" },
  openGraph: {
    title: "The CPG Glossary — Speak CPG without the decoder ring",
    description: "218 terms, acronyms, formulas, and field notes for first-time CPG founders.",
    url: "https://cpgfoundersgroup.com/cpg-glossary",
    siteName: "CPG Founders Group",
    type: "website",
  },
};

export default function CpgGlossaryPage() {
  const categoryCount = new Set(GLOSSARY_ENTRIES.map((item) => item.category)).size;
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "The CPG Glossary",
    description: "Plain-English CPG terminology for first-time founders.",
    url: "https://cpgfoundersgroup.com/cpg-glossary",
    hasDefinedTerm: GLOSSARY_ENTRIES.map((item) => ({
      "@type": "DefinedTerm",
      name: item.term,
      description: item.definition,
      url: `https://cpgfoundersgroup.com/cpg-glossary#${item.term.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="relative overflow-hidden bg-foreground text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_82%_18%,#dfa13c_0,transparent_26%),linear-gradient(135deg,transparent_0,transparent_58%,#1b3a5f_58%,#1b3a5f_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-gold">The founder’s field guide</p>
            <h1 className="max-w-3xl font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Speak CPG without the decoder ring.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72 sm:text-xl">
              Retail buyers, brokers, distributors, investors, and operators all speak in shorthand. This is the plain-English translation—plus the part that matters when you’re building the company.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2"><strong className="text-gold">{GLOSSARY_ENTRIES.length}</strong> terms</span>
              <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2"><strong className="text-gold">{categoryCount}</strong> operating areas</span>
              <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2"><strong className="text-gold">0</strong> assumed experience</span>
            </div>
          </div>
        </div>
      </section>

      <GlossaryExplorer entries={GLOSSARY_ENTRIES} />

      <section className="border-t border-border bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">How this was built</p>
              <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight">Operator-first. Researched second.</h2>
              <p className="mt-4 leading-relaxed text-muted">
                We started with Jeff Church’s 35 years of operating experience, founder calls, playbooks, and writing. Then we checked technical definitions against regulators, standards bodies, and the industry’s data providers.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Educational only—not legal, accounting, food-safety, regulatory, or investment advice. Customer contracts and data-provider definitions vary, so confirm the version that governs your business.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {GLOSSARY_SOURCES.map((source) => (
                <a key={source.href} href={source.href} target={source.href.startsWith("http") ? "_blank" : undefined} rel={source.href.startsWith("http") ? "noopener noreferrer" : undefined} className="group rounded-xl border border-border bg-background p-4 transition hover:border-accent/40 hover:bg-accent-light/40">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted">{source.kind}</span>
                  <span className="mt-1 flex items-start justify-between gap-3 text-sm font-semibold text-foreground group-hover:text-accent">
                    {source.label}<span aria-hidden="true">↗</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
