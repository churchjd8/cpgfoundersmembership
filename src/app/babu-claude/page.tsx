import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Connect Babu to Claude - CPG Founders Group",
  description:
    "Step-by-step setup guide for connecting AskBabu to your Claude account so Jeff's models, playbooks, and CPG data live inside your own Claude conversations.",
  robots: { index: false, follow: false },
};

const MCP_URL = "https://www.askbabu.ai/mcp";

const steps = [
  {
    title: "Open Claude",
    body: "Use the Claude desktop app or claude.ai in your browser. You need a paid Claude plan (Pro, Max, Team, or Enterprise) to add custom connectors. Once connected, Babu also works in the Claude mobile app on the same account.",
  },
  {
    title: "Open the Connectors menu",
    body: "In the chat box, click the + icon, then choose Connectors. Hover Add connector and you'll see Add custom connector, which is what you want in the next step. You can also get there from Settings, then Connectors.",
    image: {
      src: "/images/babu-claude/step-connectors-menu.png",
      alt: "Claude's + menu open with Connectors selected, then Add connector, then Add custom connector",
      width: 1200,
      height: 752,
    },
  },
  {
    title: "Add a custom connector",
    body: "Click + Add connector, then select Add custom connector.",
  },
  {
    title: "Enter the Babu details",
    body: "Name it Babu. In the URL field, paste the address below exactly. Then click Continue.",
    code: MCP_URL,
    image: {
      src: "/images/babu-claude/step-add-connector.png",
      alt: "Claude's Add custom connector dialog filled in with the name Babu and the Babu connector URL",
      width: 1000,
      height: 842,
    },
  },
  {
    title: "Sign in to Babu",
    body: "A Babu sign-in page opens. Enter the same email and password you use at askbabu.ai. Claude never sees your Babu password, and Babu never sees your Claude password.",
    image: {
      src: "/images/babu-claude/step-sign-in.png",
      alt: "Babu's Sign in to connect Claude page with email and password fields",
      width: 445,
      height: 355,
    },
  },
  {
    title: "Approve the connection",
    body: "Claude asks permission to see your Babu plan and use Babu tools and gurus on your behalf. Click Approve.",
    image: {
      src: "/images/babu-claude/step-approve.png",
      alt: "Connect Claude to Babu approval screen listing the two permissions with Deny and Approve buttons",
      width: 728,
      height: 556,
    },
  },
  {
    title: "You're connected",
    body: "AskBabu now shows in your connectors list with its tools underneath. Start a new chat and ask a CPG question. Claude picks the right Babu guru or data tool and runs it for you.",
    image: {
      src: "/images/babu-claude/step-connected.png",
      alt: "Claude's Connectors settings showing AskBabu connected with its list of tools",
      width: 1158,
      height: 858,
    },
  },
];

const prompts = [
  "Run a pricing breakeven analysis for my brand",
  "What Babu gurus and templates are available to me?",
  "Pull Amazon sales estimates and reviews for this competitor",
  "Help me build a promo calendar for Q4",
  "Score my brand on the CPG readiness exam",
  "Prep me for a retail buyer meeting, including margin math",
];

const receives = [
  "The specific inputs for the one analysis you asked for (a category, a brand name, your numbers)",
  "Your Babu account identity, used only to run the tool and count your credits",
];

const neverReceives = [
  "Your Claude chat history or the conversation around your request",
  "Any message that doesn't call a Babu tool, including personal chats",
  "Data from your other Claude connectors (Gmail, Google Drive, and so on)",
  "Your Claude password, account settings, or the ability to act inside Claude",
];

const faqs = [
  {
    q: "Does this cost extra?",
    a: "No new subscription. You need a paid Claude plan and your existing Babu account. Credits are only used when Babu fetches real data (pricing, market research, Amazon data). Chatting with Claude, loading a guru, and follow-up questions are free.",
  },
  {
    q: "Does Babu store my questions or results?",
    a: "No. Babu keeps a simple usage record (that a tool ran and how many credits it used) and nothing else. Your inputs and results are used in the moment and then discarded. Nothing is used to train AI models.",
  },
  {
    q: "Can I use the same Claude account for personal stuff?",
    a: "Yes. Babu only activates when you ask for a Babu analysis, and even then it only gets the inputs for that one task. Everything else stays inside Claude.",
  },
  {
    q: "Is the connection secure?",
    a: "Yes. Sign-in uses OAuth, the same standard banks and major apps use, and all traffic runs over HTTPS. Claude only holds a limited access token, never your password.",
  },
  {
    q: "Can I disconnect later?",
    a: "Anytime. Go to Settings, then Connectors, find AskBabu, and click Disconnect. The connection ends immediately.",
  },
  {
    q: "What happens if my Babu access ends?",
    a: "The connector simply stops running analyses until it's renewed. Nothing else in your Claude account changes.",
  },
];

export default function BabuClaudePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
              For Jeff&rsquo;s Clients
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Connect Babu to Your Claude
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
              Bring Jeff&rsquo;s models, playbooks, and CPG data straight into your own Claude
              conversations. One login, works on desktop, web, and mobile, and Claude keeps the
              context of everything you&rsquo;ve already been working on.
            </p>
            <p className="mt-4 text-base text-white/50">
              Setup takes about two minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-12 md:py-16 bg-white border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "One place, one login",
                body: "No separate browser tab or separate sign-in. Babu lives inside Claude, next to everything else you use it for.",
              },
              {
                title: "Works on mobile",
                body: "Connect once and Babu is available in the Claude app on your phone, in the desktop app, and on the web.",
              },
              {
                title: "Keeps your context",
                body: "Claude already knows your brand, your numbers, and your past conversations. Now Babu's analyses plug into that memory.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="mt-2 text-muted text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
              Setup Guide
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Step by step</h2>
            <p className="mt-4 text-muted">
              You&rsquo;ll need your Babu login (the email and password you use at askbabu.ai) and
              a paid Claude plan.
            </p>
          </div>

          <ol className="space-y-6">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <div className="flex-1 bg-card rounded-xl border border-border p-5 sm:p-6">
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="mt-2 text-muted leading-relaxed">{step.body}</p>
                  {"code" in step && step.code && (
                    <div className="mt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">
                        Connector URL
                      </p>
                      <code className="block w-full overflow-x-auto rounded-lg bg-foreground text-white px-4 py-3 text-sm font-mono select-all">
                        {step.code}
                      </code>
                    </div>
                  )}
                  {"image" in step && step.image && (
                    <div className="mt-5 overflow-hidden rounded-lg border border-border bg-[#1a1a1a]">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        width={step.image.width}
                        height={step.image.height}
                        sizes="(max-width: 768px) 100vw, 640px"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Try it */}
      <section className="py-16 md:py-20 bg-white border-y border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Try asking Claude</h2>
          <p className="mt-3 text-muted">
            Once connected, just ask in plain English. Claude picks the right Babu guru or data
            tool. A few to get you started:
          </p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {prompts.map((p) => (
              <li
                key={p}
                className="rounded-lg border border-border bg-card px-4 py-3 text-sm leading-relaxed"
              >
                &ldquo;{p}&rdquo;
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            Tip: loading a guru or template is free. Credits are only used when Babu pulls real
            market data.
          </p>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
              Privacy
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What Babu can and can&rsquo;t see
            </h2>
            <p className="mt-4 text-muted">
              Babu only ever sees the specific thing you ask it to analyze. Never the conversation
              around it. Here&rsquo;s exactly how it works.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-lg text-green-700">Babu receives</h3>
              <ul className="mt-4 space-y-3">
                {receives.map((r) => (
                  <li key={r} className="flex gap-3 text-sm leading-relaxed">
                    <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted">
                That&rsquo;s it. Used in the moment, then discarded.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-lg text-red-700">Babu never receives</h3>
              <ul className="mt-4 space-y-3">
                {neverReceives.map((r) => (
                  <li key={r} className="flex gap-3 text-sm leading-relaxed">
                    <span className="text-red-700 font-bold flex-shrink-0">✕</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-lg">{f.q}</h3>
                <p className="mt-2 text-muted leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help */}
      <section className="py-16 bg-foreground text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Stuck on a step?</h2>
          <p className="mt-4 text-white/70">
            Reply to the email that sent you here or reach out to Joshua directly at{" "}
            <a href="mailto:joshua@teamchurch.co" className="text-accent hover:underline">
              joshua@teamchurch.co
            </a>{" "}
            and we&rsquo;ll get you connected.
          </p>
          <div className="mt-8">
            <Link
              href="/clients/schedule-session"
              className="inline-block px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
            >
              Book your 1:1 with Jeff
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
