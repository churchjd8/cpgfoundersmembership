import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TestimonialCarousel } from "../workwithjeff-2/testimonial-carousel";
import { MBA_PRICE_USD } from "@/lib/mba-offer";
import { Newsletter } from "./newsletter";
import styles from "./page.module.css";

// Evaluate the launch message on each request, using the announced Pacific date.
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "CPG Founders Group | Build Your Next Stage with Jeff Church",
  description: "Direct advisory, practical training, and tools for CPG founders. Explore working with Suja co-founder Jeff Church and his new book, The Cold-Pressed Truth, out November 17, 2026.",
  robots: { index: false, follow: false },
  openGraph: { title: "CPG Founders Group | Build Your Next Stage with Jeff Church", description: "Experienced guidance for the decisions shaping your CPG brand.", url: "https://cpgfoundersgroup.com/new-homepage", images: [{ url: "https://cpgfoundersgroup.com/images/jeff-hero.webp" }] },
  twitter: { card: "summary_large_image", title: "CPG Founders Group | Build Your Next Stage with Jeff Church", description: "Experienced guidance for the decisions shaping your CPG brand.", images: ["https://cpgfoundersgroup.com/images/jeff-hero.webp"] },
};

const BOOK_URL = "https://thecoldpressedtruth.com";

function Mountain() {
  return <svg width="32" height="25" viewBox="0 0 48 32" aria-hidden="true"><path d="M30 13L41 27H19Z" fill="#1b3a5f"/><path d="M20 7L33 27H7Z" fill="#0b1a2e"/><path d="M10 18L19 27H1Z" fill="#dfa13c"/></svg>;
}

export default function NewHomepage() {
  const launched = Date.now() >= Date.parse("2026-11-17T00:00:00-08:00");
  const launchLabel = launched ? "Available now" : "Out November 17";
  return <div className={styles.home}>
    <a href={BOOK_URL} className={styles.announcement}><span className={styles.announcementBadge}>{launchLabel}</span><span>Jeff’s new book: <strong>The Cold-Pressed Truth</strong></span><span aria-hidden="true">↗</span></a>

    <header className={styles.header} role="banner">
      <Link href="/new-homepage" className={styles.brand} aria-label="CPG Founders Group home"><Mountain/><span>CPG <span>Founders Group</span></span></Link>
      <nav aria-label="Main navigation"><Link href="/about-jeff">About Jeff</Link><Link href="/resources">Free resources</Link><a href="#the-book">The book</a><Link href="/blog">Field notes</Link></nav>
      <Link className={styles.headerButton} href="/work-with-jeff">Work with Jeff <span aria-hidden="true">↗</span></Link>
    </header>

    <section className={styles.hero} aria-labelledby="home-title"><div className={styles.heroInner}>
      <div className={styles.heroCopy}><p className={styles.eyebrow}><span/> Founder to founder</p><h1 id="home-title">Build your CPG brand’s next stage <em>with Jeff Church.</em></h1><p className={styles.intro}>Direct advisory, practical training, and tools for the fundraising, retail, and operating decisions ahead.</p><div className={styles.heroActions}><Link className={styles.button} href="/work-with-jeff">Explore working with Jeff <span aria-hidden="true">↗</span></Link><Link className={styles.heroTextLink} href="/resources">Start with something free <span aria-hidden="true">→</span></Link></div><p className={styles.heroNote}>An experienced operator in your corner. A practical next step for your business.</p></div>
      <div className={styles.heroVisual}><div className={styles.heroImage}><Image src="/images/jeff-hero.webp" alt="Jeff Church with CPG founders and their JUNI products" fill priority sizes="(min-width: 900px) 45vw, 100vw" className={styles.photo}/></div><p className={styles.photoCaption}><span>Built with people. Built from experience.</span><Link href="/about-jeff">Meet Jeff <span aria-hidden="true">↗</span></Link></p></div>
    </div></section>

    <div className={styles.credentials} aria-label="Jeff’s experience"><div><strong>35+ years</strong><span>Building and operating businesses</span></div><div><strong>8x founder</strong><span>Experience across the full journey</span></div><div><strong>Suja Juice</strong><span>Co-founder &amp; former CEO</span></div></div>

    <section className={styles.proof} aria-labelledby="proof-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>The work, through their eyes</p><h2 id="proof-title">Founders who’ve built <em>with Jeff.</em></h2></div><Link href="/results" className={styles.textLink}>More founder stories <span aria-hidden="true">↗</span></Link></div><TestimonialCarousel/><p className={styles.finePrint}>Individual experiences from work with Jeff. Engagements and results vary.</p></section>

    <section className={styles.book} id="the-book" aria-labelledby="book-title"><div className={styles.bookInner}>
      <a href={BOOK_URL} className={styles.coverLink} aria-label="Explore The Cold-Pressed Truth"><div className={styles.bookCover}><Image src="/images/book-covers/cold-pressed-truth-home.webp" alt="The Cold-Pressed Truth by Jeff Church, with a foreword by Jay Shetty" width={640} height={993} sizes="(max-width: 719px) 155px, 260px"/></div></a>
      <div className={styles.bookCopy}><p className={styles.eyebrow}>The new book <span aria-hidden="true">·</span> {launchLabel}</p><h2 id="book-title">The Cold-Pressed <em>Truth.</em></h2><p className={styles.bookSubtitle}>A founder’s field guide to building, scaling, and selling a consumer brand.</p><p className={styles.bookDescription}>The decisions, setbacks, and hard-earned lessons behind the business. Jeff’s experience on the page, for founders finding their own way forward.</p><p className={styles.bookByline}>By Jeff Church <span aria-hidden="true">·</span> Foreword by Jay Shetty</p><a href={BOOK_URL} className={styles.bookButton}>Explore the book <span aria-hidden="true">↗</span></a><p className={styles.bookDate}>{launched ? <>Released <time dateTime="2026-11-17">November 17, 2026</time></> : <>Releasing <time dateTime="2026-11-17">November 17, 2026</time></>}</p></div>
    </div></section>

    <section className={styles.support} id="your-next-step" aria-labelledby="support-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Choose your next step</p><h2 id="support-title">The right support.<br/>{" "}<em>For where you are.</em></h2></div><p>Work through the decisions together, learn the fundamentals yourself, or get answers as you go.</p></div>
      <article className={styles.advisory}><div className={styles.advisoryCopy}><p className={styles.eyebrow}>Work directly with Jeff</p><h3>A roadmap. A sounding board.<br/>{" "}Someone who stays close.</h3><p>Private advisory built around your business. Work directly with Jeff on fundraising, retail expansion, margins, and the decisions shaping your next stage.</p><Link href="/work-with-jeff" className={styles.button}>Explore private advisory <span aria-hidden="true">↗</span></Link><p className={styles.advisoryNote}>Start with a short application and a 30-minute call with Jeff’s team.</p></div><div className={styles.advisoryPhoto}><Image src="/images/jeff-teaching.webp" alt="Jeff at the whiteboard, working through a CPG business strategy" fill sizes="(min-width: 720px) 40vw, 100vw" className={styles.photo}/></div></article>
      <div className={styles.selfServe}><article><div className={styles.optionTop}><span className={styles.optionNumber}>01</span><span className={styles.optionType}>Learn independently</span></div><h3>MBA for CPG</h3><p>Jeff’s CPG playbook, financial models, and templates in one self-paced course. Learn the fundamentals and put them to work in your business.</p><div className={styles.optionBottom}><Link href="/mba-for-cpg" className={styles.textLink}>Explore the course <span aria-hidden="true">↗</span></Link><span>${MBA_PRICE_USD.toLocaleString("en-US")} · Lifetime access</span></div></article><article><div className={styles.optionTop}><span className={styles.optionNumber}>02</span><span className={styles.optionType}>Get answers as you go</span></div><h3>Babu AI</h3><p>An on-demand CPG advisor trained on Jeff’s playbook. Work through questions on fundraising, retail, margins, and more, whenever they come up.</p><div className={styles.optionBottom}><a href="https://www.askbabu.ai" className={styles.textLink}>Meet Babu <span aria-hidden="true">↗</span></a><span>Your CPG AI advisor</span></div></article></div>
    </section>

    <section className={styles.free} aria-labelledby="free-title"><div><p className={styles.eyebrow}>Start here, free</p><h2 id="free-title">You don’t have to <em>figure it out alone.</em></h2></div><div className={styles.freeLinks}><Link href="/resources"><div><strong>Tools you can use today</strong><p>Practical calculators, templates, and guides for your next decision.</p></div><span aria-hidden="true">↗</span></Link><Link href="/founders-only"><div><strong>Find your founder community</strong><p>Join 400+ CPG founders in the free WhatsApp group.</p></div><span aria-hidden="true">↗</span></Link></div></section>

    <section className={styles.newsletter} aria-labelledby="newsletter-title"><div className={styles.newsletterInner}><div><p className={styles.eyebrow}>Field notes from Jeff</p><h2 id="newsletter-title">What’s actually<br/>{" "}<em>working in CPG.</em></h2><p>Weekly insights on fundraising, retail, margins, and building a business. Direct to your inbox.</p></div><Newsletter/></div></section>

    <footer className={styles.footer} role="contentinfo"><div className={styles.footerTop}><div><Link href="/new-homepage" className={styles.brand}><Mountain/><span>CPG <span>Founders Group</span></span></Link><p>Experience for your next stage.</p></div><nav aria-label="Footer navigation"><Link href="/work-with-jeff">Work with Jeff</Link><a href={BOOK_URL}>The Cold-Pressed Truth</a><Link href="/about-jeff">About Jeff</Link><Link href="/resources">Free resources</Link><Link href="/mba-for-cpg">MBA for CPG</Link><a href="https://www.askbabu.ai">Babu AI</a><Link href="/blog">Field notes</Link><Link href="/contact">Contact</Link></nav></div><div className={styles.footerBottom}><span>© {new Date().getFullYear()} CPG Founders Group</span><a href="mailto:info@teamchurch.co">info@teamchurch.co</a><Link href="/privacy">Privacy</Link></div></footer>
  </div>;
}
