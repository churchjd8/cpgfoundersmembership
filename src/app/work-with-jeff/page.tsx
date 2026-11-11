import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ADVISORY_MIN_MONTHS, PRIVATE_ADVISORY_PRICE_USD } from "@/lib/advisory-offer";
import { STRATEGY_SESSION_CREDIT_DAYS, STRATEGY_SESSION_PRICE_USD } from "@/lib/strategy-session-offer";
import { MBA_PRICE_USD } from "@/lib/mba-offer";
import { TestimonialCarousel } from "../workwithjeff-2/testimonial-carousel";
import { Arrow, DirectCards, HomeFooter } from "../new-homepage/home";
import home from "../new-homepage/page.module.css";
import styles from "./page.module.css";

// The "With Jeff" level of the homepage ladder, in full: both ways to work
// with Jeff directly, with price and guarantee visible. VIP is offered on the
// intro call, not listed here.
export const metadata: Metadata = {
  title: "Work with Jeff Church | Private CPG Advisory",
  description: "Two ways to work 1:1 with Suja co-founder Jeff Church: ongoing private advisory or a focused 90-minute Strategy Session. See what's included and how to start.",
  alternates: { canonical: "https://cpgfoundersgroup.com/work-with-jeff" },
  openGraph: { title: "Work with Jeff Church | Private CPG Advisory", description: "Ongoing private advisory or one focused Strategy Session, 1:1 with Jeff Church.", url: "https://cpgfoundersgroup.com/work-with-jeff", images: [{ url: "https://cpgfoundersgroup.com/images/jeff-teaching.webp" }] },
  twitter: { card: "summary_large_image", title: "Work with Jeff Church | Private CPG Advisory", description: "Ongoing private advisory or one focused Strategy Session, 1:1 with Jeff Church.", images: ["https://cpgfoundersgroup.com/images/jeff-teaching.webp"] },
};

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const BOOK_URL = "https://thecoldpressedtruth.com";

const situations = [
  ["You’re preparing to raise.", "Get experienced eyes on your approach, model, and story before the investor conversations that matter."],
  ["Retail is opening up.", "Work through which doors to pursue, how to handle brokers and distributors, and what it takes to hold the shelf."],
  ["Growth isn’t turning into cash.", "Look hard at pricing, margins, and trade spend so you can see what needs to change."],
  ["Too much runs through you.", "Get an outside view on priorities, people, and tradeoffs, and decide what deserves your focus."],
];
const included = [
  ["Kickoff strategy session", "Jeff prepares from your materials, then works through the business with you."],
  ["Regular 1:1s with Jeff", "Standing sessions to review progress and pressure-test decisions."],
  ["Email support between calls", "Send a deck, a term sheet, or a question when it comes up."],
  ["Babu AI Pro", "Jeff’s playbook on demand, for you and your team."],
  ["MBA for CPG and every tool", "The full course, financial models, and templates."],
  ["Speaker series and introductions", "Monthly founder sessions, plus industry introductions where they fit."],
];
const phases = [
  ["Month 1", "Understand the business", "Share your materials and complete the pre-work. Jeff finds the priorities that matter most."],
  ["Months 2 and 3", "Build and work the plan", "Turn priorities into a roadmap, then use your 1:1s and email support to execute it."],
  [`After month ${ADVISORY_MIN_MONTHS}`, "Keep going, month to month", "Continue at the cadence that fits. No long contract after the first three months."],
];
const sessionSteps = [
  ["Before", "Send your materials", "Complete a short intake so Jeff arrives knowing your business and your question."],
  ["During", "90 minutes, 1:1", "Work through the decision with Jeff and leave with a clear next move."],
  ["After", "Keep building", `MBA for CPG is included. Start advisory within ${STRATEGY_SESSION_CREDIT_DAYS} days and the full ${usd(STRATEGY_SESSION_PRICE_USD)} is credited.`],
];
const faqs = [
  ["Am I speaking with Jeff on the intro call?", "Your first call is with Joshua from Jeff’s team. It’s 30 minutes on your business, what you need, and whether working with Jeff makes sense. Your kickoff and ongoing 1:1s are with Jeff."],
  ["How often would I meet with Jeff?", "It depends on what your business needs right now. Joshua will walk you through the options on your intro call."],
  ["Is Jeff doing the work for my team?", "This is direct strategic advisory. Jeff helps you build the roadmap and work through decisions. You and your team own execution."],
  ["Does Jeff invest in the brands he advises?", "Advisory is a paid service, separate from any investment. Joining does not promise an investment, a fundraising outcome, or a retail placement. Jeff makes industry introductions where they fit your business."],
  ["What happens after the first three months?", "You continue month to month at the cadence that fits, or you stop. There is no long contract after the initial commitment."],
  ["What if I only need help with one decision?", `Book a Strategy Session. It’s ${usd(STRATEGY_SESSION_PRICE_USD)} for 90 minutes with Jeff, and it’s credited toward advisory if you start within ${STRATEGY_SESSION_CREDIT_DAYS} days.`],
];

export default function WorkWithJeff() {
  return <div className={`${home.home} ${styles.page}`}>
    <section className={styles.hero} aria-labelledby="wwj-title"><div className={styles.inner}>
      <p className={home.eyebrow}>Work with Jeff</p>
      <h1 id="wwj-title">Two ways to get Jeff <em>in your corner.</em></h1>
      <p className={styles.heroIntro}>Ongoing private advisory, or one focused strategy session. Both are 1:1 with Suja co-founder Jeff Church.</p>
      <div className={styles.heroLinks}><a href="#advisory">Private Advisory <span aria-hidden="true">↓</span></a><a href="#session">Strategy Session <span aria-hidden="true">↓</span></a></div>
    </div></section>

    <section className={`${styles.band} ${styles.cardsBand}`} aria-label="Ways to work with Jeff"><div className={styles.inner}><DirectCards/></div></section>

    <section className={styles.band} id="advisory" aria-labelledby="advisory-title"><div className={styles.inner}>
      <div className={styles.heading}><p className={home.eyebrow}>1:1 Private Advisory</p><h2 id="advisory-title">An experienced operator beside you while you execute.</h2></div>

      <h3 className={styles.sub}>Founders usually come to Jeff when</h3>
      <div className={styles.grid4}>{situations.map(([title, body]) => <article key={title} className={styles.tile}><h4>{title}</h4><p>{body}</p></article>)}</div>

      <h3 className={styles.sub}>What’s included</h3>
      <div className={styles.grid3}>{included.map(([title, body]) => <article key={title} className={styles.item}><span className={styles.check} aria-hidden="true"/><div><h4>{title}</h4><p>{body}</p></div></article>)}</div>

      <h3 className={styles.sub}>How it works</h3>
      <ol className={styles.steps}>{phases.map(([when, title, body]) => <li key={title}><span>{when}</span><h4>{title}</h4><p>{body}</p></li>)}</ol>

      <div className={styles.offer}>
        <div><p className={styles.offerPrice}><small>Starting at</small>{usd(PRIVATE_ADVISORY_PRICE_USD)}<span>/month · {ADVISORY_MIN_MONTHS}-month start</span></p><p className={styles.offerNote}>By application. More time with Jeff is available for brands that need it.</p></div>
        <div className={styles.guarantee}><h4>The guarantee</h4><p>Participate fully, complete the pre-work, and work the strategy. If you don’t see a tangible return after three months, Jeff continues at no cost or refunds the initial engagement. Joshua walks you through the written terms before you commit.</p></div>
        <Link href="/apply" className={styles.offerButton}>Apply &amp; book an intro call <Arrow/></Link>
      </div>
    </div></section>

    <section className={`${styles.band} ${styles.proof}`} aria-labelledby="proof-title"><div className={styles.inner}>
      <div className={styles.headingRow}><div><p className={home.eyebrow}>Founders on working with Jeff</p><h2 id="proof-title">Experience that makes a difference.</h2></div><Link href="/results" className={home.textLink}>More founder stories <Arrow/></Link></div>
      <TestimonialCarousel/>
      <p className={home.proofNote}>Individual experiences from work with Jeff. Engagements and results vary.</p>
    </div></section>

    <section className={`${styles.band} ${styles.sessionBand}`} id="session" aria-labelledby="session-title"><div className={styles.inner}>
      <div className={styles.heading}><p className={home.eyebrow}>Strategy Session</p><h2 id="session-title">One decision, 90 minutes, a clear next move.</h2><p>For the founder with a specific question in front of them and no need for an ongoing engagement yet.</p></div>
      <ol className={styles.steps}>{sessionSteps.map(([when, title, body]) => <li key={title}><span>{when}</span><h4>{title}</h4><p>{body}</p></li>)}</ol>
      <div className={`${styles.offer} ${styles.offerLight}`}>
        <div><p className={styles.offerPrice}>{usd(STRATEGY_SESSION_PRICE_USD)}<span>one time</span></p><p className={styles.offerNote}>After purchase, complete your intake. The team emails Jeff’s calendar within one business day.</p></div>
        <form action="/api/strategy-session-checkout" method="POST"><button type="submit" className={styles.offerButton}>Book a Strategy Session <Arrow/></button></form>
      </div>
    </div></section>

    <section className={styles.band} aria-labelledby="call-title"><div className={`${styles.inner} ${styles.call}`}>
      <div className={styles.callPhoto}><Image src="/images/joshua-call.webp" alt="Joshua Church" fill sizes="(max-width:639px) 100vw, 320px"/></div>
      <div><p className={home.eyebrow}>Your intro call</p><h2 id="call-title">Start with 30 minutes with Joshua.</h2><p className={styles.callIntro}>Joshua works with Jeff and talks with every founder first. You’ll cover where your business is, what you’re trying to solve, and whether advisory or a single session is the better fit. If neither is, he’ll tell you.</p>
        <ol className={styles.callSteps}><li><strong>Apply</strong><span>A short application about your business.</span></li><li><strong>Talk with Joshua</strong><span>30 minutes, no pressure.</span></li><li><strong>Kick off with Jeff</strong><span>Your first working session.</span></li></ol>
        <Link href="/apply" className={styles.callButton}>Apply &amp; book an intro call <Arrow/></Link></div>
    </div></section>

    <section className={`${styles.band} ${styles.faqBand}`} aria-labelledby="faq-title"><div className={`${styles.inner} ${styles.faq}`}>
      <div><p className={home.eyebrow}>Questions</p><h2 id="faq-title">Before you apply.</h2></div>
      <dl>{faqs.map(([q, a]) => <div key={q}><dt>{q}</dt><dd>{a}</dd></div>)}</dl>
    </div></section>

    <section className={`${styles.band} ${styles.notReady}`} aria-labelledby="notready-title"><div className={styles.inner}>
      <h2 id="notready-title">Not ready to work with Jeff directly?</h2>
      <div className={styles.grid4}>
        <Link href="/mba-for-cpg" className={styles.alt}><strong>MBA for CPG</strong><span>{usd(MBA_PRICE_USD)} · self-paced course</span></Link>
        <a href="https://www.askbabu.ai" className={styles.alt}><strong>Babu AI</strong><span>Free for 10 days</span></a>
        <a href={BOOK_URL} className={styles.alt}><strong>The Cold-Pressed Truth</strong><span>Jeff’s new book</span></a>
        <Link href="/resources" className={styles.alt}><strong>Free resource kits</strong><span>The tools Jeff uses with founders</span></Link>
      </div>
    </div></section>
    <HomeFooter/>
  </div>;
}
