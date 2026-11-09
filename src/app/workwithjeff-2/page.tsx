import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ADVISORY_MIN_MONTHS, PRIVATE_ADVISORY_PRICE_USD } from "@/lib/advisory-offer";
import { STRATEGY_SESSION_PRICE_USD, STRATEGY_SESSION_CREDIT_DAYS } from "@/lib/strategy-session-offer";
import styles from "./page.module.css";

const usd = (value: number) => `$${value.toLocaleString("en-US")}`;
export const metadata: Metadata = {
  title: "Work with Jeff Church | Private CPG Advisory",
  description: "Experienced guidance for the fundraising, retail and operating decisions ahead of your CPG brand. Start with a short application and an intro call with Joshua.",
  robots: { index: false, follow: false },
  openGraph: { title: "Work with Jeff Church | Private CPG Advisory", description: "An experienced operator in your corner for your brand’s next stage.", url: "https://cpgfoundersgroup.com/workwithjeff-2", images: [{ url: "https://cpgfoundersgroup.com/images/jeff-teaching.webp" }] },
  twitter: { card: "summary_large_image", title: "Work with Jeff Church | Private CPG Advisory", description: "An experienced operator in your corner for your brand’s next stage.", images: ["https://cpgfoundersgroup.com/images/jeff-teaching.webp"] },
};

function Apply({ light = false }: { light?: boolean }) {
  return <Link href="/apply" className={`${styles.button} ${light ? styles.lightButton : ""}`}>Apply &amp; book an intro call <span aria-hidden="true">↗</span></Link>;
}

const situations = [
  ["01", "You’re preparing to raise.", "Get a second set of experienced eyes on your fundraising approach, model, and story before the investor conversations that matter."],
  ["02", "Retail is opening up. Now what?", "Work through which doors to pursue, how to approach brokers and distributors, and what it takes to support the shelf space you win."],
  ["03", "Growth isn’t translating into cash.", "Look closely at pricing, margins, trade spend, and operating decisions so you can see where the business needs to change."],
  ["04", "Too many decisions depend on you.", "Get an outside perspective on the priorities, people, and tradeoffs competing for your attention. Decide what deserves your focus next."],
];
const phases = [
  ["Understand the business", "Start with the real picture.", "Share your materials and complete the pre-work. Jeff prepares before your kickoff, then works through your business with you to identify the priorities that matter most."],
  ["Build the roadmap", "Turn priorities into a plan.", "Work with Jeff on the strategy and sequence of decisions in front of you. The work follows your business: a raise, a retail push, margin improvement, or another critical priority."],
  ["Work the plan", "Stay supported as you execute.", "Use standing 1:1s and email support to review progress, pressure-test decisions, and adjust. You and your team execute; Jeff stays close as an advisor."],
];
const faqs = [
  ["Am I speaking with Jeff on the intro call?", "Your first call is with Joshua from Jeff’s team. It’s a 20-minute conversation about your business, what you need, and whether working with Jeff makes sense. Your advisory kickoff and ongoing 1:1 sessions are with Jeff."],
  ["How much does advisory cost?", `Private Advisory starts at ${usd(PRIVATE_ADVISORY_PRICE_USD)} per month with an initial ${ADVISORY_MIN_MONTHS}-month commitment. More frequent support is available through VIP Advisory. After you apply, Joshua shares the full breakdown, including pricing, before your call.`],
  ["How often would I meet with Jeff?", "Private Advisory includes a 90-minute kickoff and monthly 60-minute 1:1s, with email support between calls. VIP Advisory begins with a half-day deep dive and includes 60-minute 1:1s every other week, plus priority email support."],
  ["Is Jeff doing the work for my team?", "This is direct strategic advisory. Jeff helps you build the roadmap, work through decisions, and address challenges as they come up. You and your team own execution. If you need someone to run a function or deliver a separate consulting project, discuss that with Joshua so expectations are clear."],
  ["Does working with Jeff include investment or guaranteed introductions?", "Advisory is a paid service, separate from any investment discussion. Joining does not promise an investment, a fundraising outcome, or a retail placement. Jeff makes relevant industry introductions where appropriate to the relationship and your business."],
  ["What if I only need help with one decision?", `The ${usd(STRATEGY_SESSION_PRICE_USD)} Strategy Session gives you 90 minutes with Jeff, with preparation beforehand and MBA for CPG access included. It can stand on its own. The fee is credited toward advisory if you start within ${STRATEGY_SESSION_CREDIT_DAYS} days of purchase.`],
  ["Is there a guarantee?", "The current advisory offer includes a conditional ROI guarantee: if you participate fully, complete the pre-work, work the strategy, and don’t see a tangible return after three months, Jeff continues at no cost or refunds the initial engagement. Joshua will walk you through the applicable written terms before you commit."],
];

export default function WorkWithJeffSample() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> Private advisory for CPG founders</p>
          <h1 id="hero-title">Make the next big decision with <em>Jeff in your corner.</em></h1>
          <p className={styles.intro}>You’ve built something worth growing. Work directly with Suja co-founder Jeff Church on the fundraising, retail, and operating decisions shaping what comes next.</p>
          <Apply />
          <p className={styles.micro}>Short application. Then 20 minutes with Joshua from Jeff’s team.</p>
          <a className={styles.heroAnchor} href="#the-work">See what working together looks like <span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroImage}><Image src="/images/jeff-teaching.webp" alt="Jeff Church working through business strategy at a whiteboard" fill priority sizes="(min-width: 960px) 48vw, 100vw" className={styles.image} /></div>
          <div className={styles.photoCaption}><span>Jeff Church</span><span>Co-founder, Suja Juice · Founder &amp; advisor</span></div>
        </div>
      </div>
    </section>

    <div className={styles.credibility} aria-label="Jeff’s background">
      <div><strong>35+ years</strong><span>Operating experience</span></div>
      <div><strong>Suja Juice</strong><span>Co-founder &amp; former CEO</span></div>
      <div><strong>Founder to founder</strong><span>Direct work on your business</span></div>
    </div>

    <section className={styles.section} aria-labelledby="fit-title">
      <div className={styles.sectionIntro}><p className={styles.eyebrow}>The moment you’re in</p><h2 id="fit-title">A real business.<br />An important next move.</h2><p>Founders come to Jeff at different stages. What they have in common is a decision with consequences, and a desire to work through it with someone who understands the business from the inside.</p></div>
      <div className={styles.situations}>{situations.map(([number, title, body]) => <article className={styles.situation} key={number}><span className={styles.number}>{number}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
    </section>

    <section className={styles.workSection} id="the-work" aria-labelledby="work-title">
      <div className={styles.wrap}>
        <div className={styles.workHeading}><div><p className={styles.eyebrow}>What you’re saying yes to</p><h2 id="work-title">A roadmap.<br />A sounding board.<br /><em>Someone who stays close.</em></h2></div><div><p>Private advisory starts with an initial three-month engagement. Jeff gets to know your business, helps you work out the approach, and stays involved while you put it into practice.</p><p className={styles.workBoundary}>The work is personal to your business. The relationship has a clear structure.</p></div></div>
        <div className={styles.phases}>{phases.map(([label, title, body], i) => <article key={label}><span className={styles.phaseNumber}>0{i + 1}</span><p className={styles.phaseLabel}>{label}</p><h3>{title}</h3><p>{body}</p></article>)}</div>
        <div className={styles.included}><span>Also in your corner</span><p>Relevant industry introductions · Babu AI Pro · MBA for CPG and its template library</p></div>
      </div>
    </section>

    <section className={styles.section} aria-labelledby="proof-title">
      <div className={styles.proofHeading}><div><p className={styles.eyebrow}>From founders who’ve worked with Jeff</p><h2 id="proof-title">Experience that shows up<br />in someone else’s business.</h2></div><Link className={styles.textLink} href="/results">More founder stories <span aria-hidden="true">↗</span></Link></div>
      <div className={styles.proofGrid}>
        <figure><p className={styles.result}>Fundraising</p><blockquote>“Jeff led us all the way through a successful $1.5M Angel fundraising.”</blockquote><figcaption><strong>Tiffany Tatom</strong><span>CEO, Live Pure</span></figcaption></figure>
        <figure><p className={styles.result}>Retail &amp; distribution</p><blockquote>“Jeff was the primary reason that we got JUNI into Moscoe and helped us secure Presence Marketing as our Natural Foods broker.”</blockquote><figcaption><strong>Kim Perell</strong><span>Co-Founder &amp; CEO, JUNI</span></figcaption></figure>
      </div>
      <p className={styles.proofNote}>Individual experiences from work with Jeff. Engagements and results vary.</p>
    </section>

    <section className={styles.callSection} id="next-step" aria-labelledby="call-title"><div className={styles.callGrid}>
      <div><p className={styles.eyebrow}>Your first step</p><h2 id="call-title">Let’s talk about<br /><em>what your business needs.</em></h2><p>You don’t have to choose an advisory package before we talk. Start with a short application, then pick a time with Joshua.</p><Apply light /><p className={styles.micro}>Advisory from {usd(PRIVATE_ADVISORY_PRICE_USD)}/month · {ADVISORY_MIN_MONTHS}-month initial commitment</p></div>
      <aside className={styles.callCard}><div className={styles.callCardTop}><span className={styles.avatar}><Image src="/images/joshua-call.webp" alt="Joshua Church, your host for the introductory call" fill sizes="84px" className={styles.joshuaPhoto} /></span><div><strong>Your call is with Joshua</strong><p>Jeff’s team · 20 minutes</p></div></div><ol><li><span>01</span> Tell us where your business is today.</li><li><span>02</span> Talk through the challenge and the support you need.</li><li><span>03</span> Decide whether there’s a fit and what comes next.</li></ol><p className={styles.callCardNote}>After applying, you can book immediately. Joshua will share the full advisory breakdown, including pricing, before your call.</p></aside>
    </div></section>

    <section className={styles.faqSection} aria-labelledby="faq-title"><div><p className={styles.eyebrow}>A few things to know</p><h2 id="faq-title">Before you apply.</h2><p>Clear expectations make for a better working relationship.</p></div><div className={styles.questions}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

    <section className={styles.sessionSection} aria-labelledby="session-title"><div><p className={styles.eyebrow}>One decision to work through?</p><h2 id="session-title">Start with a Strategy Session.</h2><p>Ninety minutes with Jeff, prepared around the challenge in front of you. MBA for CPG included. {usd(STRATEGY_SESSION_PRICE_USD)} once, credited toward advisory if you start within {STRATEGY_SESSION_CREDIT_DAYS} days of purchase.</p><p className={styles.sessionNote}>After purchase, complete your intake. The team emails Jeff’s booking calendar within one business day.</p></div><form action="/api/strategy-session-checkout" method="POST"><button className={styles.outlineButton} type="submit">Get a Strategy Session <span aria-hidden="true">↗</span></button><span>No ongoing commitment.</span></form></section>
    <div className={styles.selfServe}>Prefer to work independently? Explore the <Link href="/mba-for-cpg">MBA for CPG</Link>, <a href="https://www.askbabu.ai" target="_blank" rel="noopener noreferrer">Babu AI</a>, or Jeff’s <Link href="/resources">free resources</Link>.</div>
  </div>;
}
