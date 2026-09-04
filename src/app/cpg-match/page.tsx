import type { Metadata } from "next";
import { CpgMatchIntake } from "./cpg-match-intake";

export const metadata: Metadata = {
  title: "CPG Match by Jeff Church | Founder-Recommended CPG Vendors",
  description:
    "Help build a trusted, founder-powered guide to CPG service providers. Recommend a vendor or join the list for launch access.",
  alternates: { canonical: "https://cpgmatch.com" },
  openGraph: {
    title: "CPG Match by Jeff Church",
    description:
      "Founder-to-founder recommendations for the vendors behind growing CPG brands.",
    url: "https://cpgmatch.com",
    siteName: "CPG Founders Group",
    type: "website",
  },
};

export default function CpgMatchPage() {
  return (
    <div className="cpg-match-page min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="https://cpgmatch.com" className="flex items-center gap-3 text-foreground">
            <svg viewBox="0 0 48 32" className="h-8 w-11 flex-shrink-0" fill="none" aria-hidden="true">
              <path d="M30 13L41 27H19Z" fill="#1b3a5f" />
              <path d="M20 7L33 27H7Z" fill="#0b1a2e" />
              <path d="M10 18L19 27H1Z" fill="#dfa13c" />
              <line x1="20" y1="1" x2="20" y2="7" stroke="#0b1a2e" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M20.2 1L25.5 3.5L20.2 5.5" fill="#2b4cf0" stroke="#0b1a2e" strokeWidth="0.5" />
            </svg>
            <span className="text-xl font-bold tracking-tight">CPG Match</span>
          </a>
          <a href="https://www.cpgfoundersgroup.com" className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:border-accent hover:text-accent sm:px-4 sm:text-sm">
            Visit CPG Founders Group <span className="hidden sm:inline">→</span>
          </a>
        </div>
      </header>
      <section className="relative overflow-hidden bg-foreground text-white">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_84%_12%,#dfa13c_0,transparent_25%),linear-gradient(135deg,transparent_0,transparent_58%,#1b3a5f_58%,#1b3a5f_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-7 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]"><span className="rounded-md border border-gold/40 px-3 py-2 text-gold">CPG Match</span><span className="text-white/55">by Jeff Church + CPG Founders Group</span></div>
            <h1 className="max-w-4xl font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              Find CPG vendors founders actually recommend.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75 sm:text-xl">
              Real feedback on quality, cost, fit, and what it&rsquo;s like to work together.
            </p>
            <p className="mt-7 text-sm font-semibold text-gold">Verified founder reviews. No vendor self-nominations. Free for founders.</p>
          </div>
        </div>
      </section>

      <CpgMatchIntake />

      <section className="border-t border-border bg-white py-10">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm leading-relaxed text-muted">Every review comes from a verified CPG founder with first-hand experience. Choose whether your name is shown or kept private.</p>
        </div>
      </section>
      <footer className="border-t border-border bg-foreground py-7 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center text-sm text-white/55 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} CPG Match</p>
          <p>Built for CPG founders by <a href="https://www.cpgfoundersgroup.com" className="font-semibold text-white/80 hover:text-gold">Jeff Church + CPG Founders Group</a></p>
        </div>
      </footer>
    </div>
  );
}
