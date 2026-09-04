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
    <>
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
            <a href="https://www.cpgfoundersgroup.com" className="mt-7 inline-flex text-sm font-semibold text-white/70 underline decoration-white/25 underline-offset-4 hover:text-white">Visit CPG Founders Group →</a>
          </div>
        </div>
      </section>

      <CpgMatchIntake />

      <section className="border-t border-border bg-white py-10">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm leading-relaxed text-muted">Every review comes from a verified CPG founder with first-hand experience. Choose whether your name is shown or kept private.</p>
        </div>
      </section>
    </>
  );
}
