import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { TestimonialCarousel } from "../workwithjeff-2/testimonial-carousel";
import { STRATEGY_SESSION_PRICE_USD, STRATEGY_SESSION_CREDIT_DAYS } from "@/lib/strategy-session-offer";
import { MBA_PRICE_USD } from "@/lib/mba-offer";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "CPG Founders Group | The Right Support for Your Next Move",
  description: "Private advisory, focused Strategy Sessions, MBA for CPG, and Babu AI from Suja co-founder Jeff Church. Discover The Cold-Pressed Truth, out November 17.",
  robots: { index: false, follow: false },
  openGraph: { title: "CPG Founders Group | The Right Support for Your Next Move", description: "Choose the CPG support that fits your business.", url: "https://cpgfoundersgroup.com/new-homepage", images: [{url:"https://cpgfoundersgroup.com/images/jeff-hero.webp"}] },
};
const usd = (amount: number) => `$${amount.toLocaleString("en-US")}`;
const BOOK_URL = "https://thecoldpressedtruth.com";

export default function NewHomepage() {
  const released = Date.now() >= Date.parse("2026-11-17T00:00:00-08:00");
  const bookLabel = released ? "Available now" : "Out November 17";
  return <div className={styles.home}>
    <a href={BOOK_URL} className={styles.announcement}><span>{bookLabel}</span><strong>The Cold-Pressed Truth</strong><span>Jeff Church’s new book</span><span aria-hidden="true">↗</span></a>
    <section className={styles.hero} aria-labelledby="home-title"><div className={styles.heroInner}>
      <div><p className={styles.eyebrow}>For CPG founders · From Jeff Church</p><h1 id="home-title">Big decisions.<br/>The right support.</h1><p className={styles.heroIntro}>Work directly with Suja co-founder Jeff Church, get focused help on one decision, or build at your own pace. There’s a way in for where you are.</p><div className={styles.heroActions}><Link href="/work-with-jeff" className={styles.button}>Work with Jeff <span aria-hidden="true">↗</span></Link><a href="#offers" className={styles.heroSecondary}>Compare the options <span aria-hidden="true">↓</span></a></div><p className={styles.heroCredentials}>Suja co-founder <span>·</span> 8x founder <span>·</span> 35+ years of experience</p></div>
      <div className={styles.heroVisual}><Image src="/images/jeff-hero.webp" alt="Jeff Church with CPG founders and their JUNI products" fill priority sizes="(min-width:900px) 40vw, 100vw" className={styles.heroPhoto}/></div>
    </div></section>

    <section className={styles.offers} id="offers" aria-labelledby="offers-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Choose the support you need</p><h2 id="offers-title">One decision or the next chapter.</h2></div><p>Direct support from Jeff, or the tools to move forward yourself.</p></div>
      <div className={styles.directOffers}>
        <article className={`${styles.offerCard} ${styles.advisory}`}><div className={styles.cardHeading}><p className={styles.cardLabel}>Ongoing 1:1 support</p><span className={styles.cardTag}>Private &amp; VIP tracks</span></div><h3>Private Advisory</h3><p className={styles.cardIntro}>Jeff in your corner while you execute.</p><p className={styles.cardDescription}>A strategy built around your business, regular 1:1s, and email support as you work through fundraising, retail, margins, and your next big decisions.</p><div className={styles.cardBottom}><p className={styles.price}>Let’s find your fit.</p><p className={styles.priceNote}>Explore the engagement and what it includes before your call.</p><Link href="/work-with-jeff" className={styles.cardButton}>Explore private advisory <span aria-hidden="true">↗</span></Link><p className={styles.cardFootnote}>Find the right track on a 30-minute call with Jeff’s team.</p></div></article>
        <article className={`${styles.offerCard} ${styles.strategy}`}><div className={styles.cardHeading}><p className={styles.cardLabel}>One focused decision</p><span className={styles.cardTag}>90 minutes with Jeff</span></div><h3>Strategy Session</h3><p className={styles.cardIntro}>A clear next move, without an ongoing commitment.</p><p className={styles.cardDescription}>Bring the challenge that matters most. Jeff reviews your materials beforehand, then works through it with you 1:1. MBA for CPG included.</p><div className={styles.cardBottom}><p className={styles.price}>{usd(STRATEGY_SESSION_PRICE_USD)}<span>one time</span></p><p className={styles.priceNote}>Credited toward advisory if you start within {STRATEGY_SESSION_CREDIT_DAYS} days of purchase.</p><form action="/api/strategy-session-checkout" method="POST"><button type="submit" className={styles.cardButton}>Get a Strategy Session <span aria-hidden="true">↗</span></button></form><p className={styles.cardFootnote}>After purchase, complete your intake. The team emails Jeff’s calendar within one business day.</p></div></article>
      </div>
      <div className={styles.independentOffers}>
        <article><div><p className={styles.cardLabel}>Learn independently</p><h3>MBA for CPG</h3><p>Jeff’s playbook, financial models, and templates in a self-paced course. Learn the fundamentals and put them to work.</p></div><div className={styles.independentBottom}><Link href="/mba-for-cpg">Explore the course <span aria-hidden="true">↗</span></Link><span>{usd(MBA_PRICE_USD)} · Lifetime access</span></div></article>
        <article><div><p className={styles.cardLabel}>Get answers anytime</p><h3>Babu AI</h3><p>An on-demand CPG advisor trained on Jeff’s playbook. Help with fundraising, retail, margins, and more, whenever questions come up.</p></div><div className={styles.independentBottom}><a href="https://www.askbabu.ai">Explore Babu <span aria-hidden="true">↗</span></a><span>Your CPG AI advisor</span></div></article>
      </div>
      <div className={styles.chooseHelp}><div className={styles.joshuaPhoto}><Image src="/images/joshua-call.webp" alt="Joshua Church" fill sizes="44px"/></div><p><strong>Not sure which option fits?</strong><span>Talk through your business with Jeff’s team.</span></p><Link href="/apply">Start with a 30-minute intro call <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section className={styles.book} aria-labelledby="book-title"><div className={styles.bookInner}><a href={BOOK_URL} className={styles.coverLink} aria-label="Explore The Cold-Pressed Truth"><Image src="/images/book-covers/cold-pressed-truth-home.webp" alt="The Cold-Pressed Truth by Jeff Church, foreword by Jay Shetty" width={640} height={993} sizes="(max-width:639px) 100px, 180px"/></a><div><p className={styles.eyebrow}>The new book · {bookLabel}</p><h2 id="book-title">The Cold-Pressed Truth</h2><p className={styles.bookSubtitle}>A founder’s field guide to building, scaling, and selling a consumer brand.</p><p className={styles.bookByline}>By Jeff Church. Foreword by Jay Shetty.</p><a href={BOOK_URL} className={styles.bookButton}>Explore the book <span aria-hidden="true">↗</span></a><p className={styles.bookDate}><time dateTime="2026-11-17">November 17, 2026</time></p></div></div></section>
    <section className={styles.proof} aria-labelledby="proof-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Founders on working with Jeff</p><h2 id="proof-title">Experience that makes a difference.</h2></div><Link href="/results" className={styles.textLink}>More founder stories <span aria-hidden="true">↗</span></Link></div><TestimonialCarousel/><p className={styles.proofNote}>Individual experiences from work with Jeff. Engagements and results vary.</p></section>
    <section className={styles.stayConnected} aria-labelledby="connected-title"><div className={styles.connectedInner}><div><p className={styles.eyebrow}>Start with something free</p><h2 id="connected-title">Stay close to what’s working.</h2><p>Get Jeff’s weekly insights on fundraising, retail, margins, and building a CPG business.</p><div className={styles.freeLinks}><Link href="/resources">Free tools &amp; resources <span aria-hidden="true">↗</span></Link><Link href="/founders-only">Join 400+ CPG founders <span aria-hidden="true">↗</span></Link></div></div><div className={styles.signup}><NewsletterForm/><p className={styles.signupNote}>Unsubscribe anytime. No spam, ever.</p></div></div></section>
    <footer className={styles.footer} role="contentinfo"><div><strong>CPG Founders Group</strong><p>Tools, training, and direct access to Jeff Church.</p></div><nav aria-label="Footer navigation"><Link href="/about-jeff">About Jeff</Link><Link href="/work-with-jeff">Work with Jeff</Link><a href={BOOK_URL}>The book</a><Link href="/resources">Resources</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link></nav><div className={styles.footerBottom}><span>© {new Date().getFullYear()} CPG Founders Group</span><a href="mailto:info@teamchurch.co">info@teamchurch.co</a></div></footer>
  </div>;
}
