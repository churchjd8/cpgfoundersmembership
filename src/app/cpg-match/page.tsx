import type { Metadata } from "next";
import { CpgMatchIntake } from "./cpg-match-intake";

export const metadata: Metadata = {
  title: "CPG Match by Jeff Church | Founder-Recommended CPG Vendors",
  description:
    "Help build a trusted, founder-powered guide to CPG service providers. Recommend a vendor or join the list for launch access.",
  alternates: { canonical: "https://cpgfoundersgroup.com/cpg-match" },
  openGraph: {
    title: "CPG Match by Jeff Church",
    description:
      "Founder-to-founder recommendations for the vendors behind growing CPG brands.",
    url: "https://cpgfoundersgroup.com/cpg-match",
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
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-gold">
              CPG Match <span className="text-white/50">by Jeff Church</span>
            </p>
            <h1 className="max-w-4xl font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              Find the right CPG vendor—before the wrong one costs you.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75 sm:text-xl">
              We&rsquo;re building a free, founder-powered guide to the agencies, operators, and specialists behind growing CPG brands—with real context on fit, cost, quality, and what it&rsquo;s actually like to work together.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
              <span className="flex items-center gap-2"><span className="text-gold">✓</span> Reviews from verified CPG founders</span>
              <span className="flex items-center gap-2"><span className="text-gold">✓</span> No vendor self-nominations</span>
              <span className="flex items-center gap-2"><span className="text-gold">✓</span> Free for founders</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-10">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="font-[family-name:var(--font-playfair)] text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">
            &ldquo;The best vendor recommendations have always come from another founder who has already done the work. CPG Match is our way of making those introductions easier—and more useful.&rdquo;
          </p>
          <p className="mt-3 text-sm font-semibold text-accent">— Jeff Church, 8x CPG founder</p>
        </div>
      </section>

      <CpgMatchIntake />

      <section className="border-t border-border bg-white py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            ["Founder-powered", "Every review starts with a founder who has actually hired or worked with the vendor."],
            ["Context, not just stars", "Stage, scope, pricing, communication, delivery, and fit matter more than a single score."],
            ["Trust comes first", "Submissions are verified and reviewed before anything is shared. Founder identities can remain private."],
          ].map(([title, copy], index) => (
            <div key={title} className="rounded-xl border border-border bg-background p-6">
              <span className="text-xs font-bold tracking-[0.2em] text-accent">0{index + 1}</span>
              <h2 className="mt-3 text-xl font-bold">{title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
