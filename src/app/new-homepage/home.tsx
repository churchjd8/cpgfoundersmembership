import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { TestimonialCarousel } from "../workwithjeff-2/testimonial-carousel";
import { STRATEGY_SESSION_PRICE_USD, STRATEGY_SESSION_CREDIT_DAYS } from "@/lib/strategy-session-offer";
import { MBA_PRICE_USD } from "@/lib/mba-offer";
import { ADVISORY_MIN_MONTHS, PRIVATE_ADVISORY_PRICE_USD } from "@/lib/advisory-offer";
import styles from "./page.module.css";

const usd = (amount: number) => `$${amount.toLocaleString("en-US")}`;
const BOOK_URL = "https://thecoldpressedtruth.com";

// The offer ladder as three levels of cards, most hands-on first. Every card
// shows its price so a founder can place themselves before they apply. VIP is
// not listed: it is offered on the intro call to brands that need more of Jeff.
const icon = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
const Icons = {
  advisory: <svg {...icon}><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></svg>,
  session: <svg {...icon}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>,
  mba: <svg {...icon}><path d="m2.5 9 9.5-4.5L21.5 9 12 13.5 2.5 9Z"/><path d="M6.5 11.2V16c1.6 1.5 3.4 2.2 5.5 2.2s3.9-.7 5.5-2.2v-4.8"/><path d="M21.5 9v5"/></svg>,
  babu: <svg {...icon}><path d="M20 11.5a7.5 7.5 0 0 1-11.2 6.5L4 19.5l1.3-4.3A7.5 7.5 0 1 1 20 11.5Z"/><path d="M12.5 8.2l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z"/></svg>,
  community: <svg {...icon}><circle cx="9" cy="9" r="3"/><path d="M3.5 18.5c.6-2.7 2.7-4.3 5.5-4.3s4.9 1.6 5.5 4.3"/><circle cx="17" cy="8" r="2.3"/><path d="M16.5 13.2c2.1.2 3.5 1.5 4 3.6"/></svg>,
  kits: <svg {...icon}><rect x="3.5" y="8" width="17" height="11" rx="2"/><path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8"/><path d="M3.5 13h17M12 12v2.2"/></svg>,
  insights: <svg {...icon}><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4.5 7.5 7.5 5.5 7.5-5.5"/></svg>,
};
const Arrow = () => <span aria-hidden="true">↗</span>;

function Ladder({ bookLabel }: { bookLabel: string }) {
  return <section className={styles.ladder} id="offers" aria-labelledby="ladder-title"><span id="programs" className={styles.legacyAnchor} aria-hidden="true"/>
    <div className={styles.ladderHeading}><p className={styles.eyebrow}>Every way to work with Jeff</p><h2 id="ladder-title">Start where you are.</h2><p>Three levels of support. Pick the one that fits your brand today and move up when you’re ready.</p></div>

    <div className={styles.level}><div className={styles.levelLabel}><strong>With Jeff</strong><span>Direct, 1:1 support</span></div>
      <div className={`${styles.levelCards} ${styles.two}`}>
        <article className={`${styles.lcard} ${styles.lcardAdvisory}`}><div className={styles.lcardTop}><span className={styles.lcardIcon}>{Icons.advisory}</span></div><h3>1:1 Private Advisory</h3><p className={styles.lcardLine}>Jeff in your corner while you execute.</p><ul className={styles.lcardList}><li>Kickoff strategy session</li><li>Regular 1:1s with Jeff</li><li>Email support between calls</li><li>Babu AI Pro, MBA for CPG, and all of Jeff’s tools</li></ul><div className={styles.lcardBottom}><p className={styles.lcardPrice}><small>Starting at</small>{usd(PRIVATE_ADVISORY_PRICE_USD)}<span>/month · {ADVISORY_MIN_MONTHS}-month start</span></p><Link href="/apply" className={styles.lcardButton}>Apply &amp; book an intro call <Arrow/></Link><p className={styles.lcardFine}>By application. More time with Jeff is available for brands that need it.</p></div></article>
        <article className={`${styles.lcard} ${styles.lcardSession}`}><div className={styles.lcardTop}><span className={styles.lcardIcon}>{Icons.session}</span></div><h3>Strategy Session</h3><p className={styles.lcardLine}>A clear next move, no ongoing commitment.</p><ul className={styles.lcardList}><li>90 minutes 1:1 with Jeff</li><li>He reviews your materials first</li><li>MBA for CPG included</li></ul><div className={styles.lcardBottom}><p className={styles.lcardPrice}>{usd(STRATEGY_SESSION_PRICE_USD)}<span>one time</span></p><form action="/api/strategy-session-checkout" method="POST"><button type="submit" className={styles.lcardButton}>Book a Strategy Session <Arrow/></button></form><p className={styles.lcardFine}>Credited in full toward advisory if you start within {STRATEGY_SESSION_CREDIT_DAYS} days.</p></div></article>
      </div>
    </div>

    <div className={styles.level}><div className={styles.levelLabel}><strong>On your own</strong><span>Jeff’s playbook, at your pace</span></div>
      <div className={`${styles.levelCards} ${styles.three}`}>
        <article className={styles.lcard}><div className={styles.lcardTop}><span className={styles.lcardIcon}>{Icons.mba}</span></div><h3>MBA for CPG</h3><p className={styles.lcardLine}>The full playbook, financial models, and templates in a self-paced course.</p><div className={styles.lcardBottom}><p className={styles.lcardPrice}>{usd(MBA_PRICE_USD)}<span>lifetime access</span></p><Link href="/mba-for-cpg" className={styles.lcardLink}>Explore the course <Arrow/></Link></div></article>
        <article className={styles.lcard}><div className={styles.lcardTop}><span className={styles.lcardIcon}>{Icons.babu}</span></div><h3>Babu AI</h3><p className={styles.lcardLine}>An on-demand CPG advisor trained on Jeff’s playbook.</p><div className={styles.lcardBottom}><p className={styles.lcardPrice}>Free<span>for 10 days</span></p><a href="https://www.askbabu.ai" className={styles.lcardLink}>Start the free trial <Arrow/></a></div></article>
        <article className={`${styles.lcard} ${styles.lcardBook}`}><div className={styles.lcardTop}><a href={BOOK_URL} className={styles.lcardCover} aria-label="The Cold-Pressed Truth"><Image src="/images/book-covers/cold-pressed-truth-home.webp" alt="" width={640} height={993} sizes="60px"/></a></div><h3>The Cold-Pressed Truth</h3><p className={styles.lcardLine}>Jeff’s field guide to building, scaling, and selling a consumer brand.</p><div className={styles.lcardBottom}><p className={styles.lcardPrice}>The book<span>{bookLabel}</span></p><a href={BOOK_URL} className={styles.lcardLink}>Explore the book <Arrow/></a></div></article>
      </div>
    </div>

    <div className={styles.level}><div className={styles.levelLabel}><strong>Free</strong><span>Get to know Jeff</span></div>
      <div className={`${styles.levelCards} ${styles.three}`}>
        <Link href="/founders-only" className={`${styles.lcard} ${styles.lcardFree}`}><span className={styles.lcardIcon}>{Icons.community}</span><div><h3>Founders group</h3><p>400+ CPG founders on WhatsApp.</p></div><Arrow/></Link>
        <Link href="/resources" className={`${styles.lcard} ${styles.lcardFree}`}><span className={styles.lcardIcon}>{Icons.kits}</span><div><h3>Free resource kits</h3><p>The tools Jeff uses with founders.</p></div><Arrow/></Link>
        <Link href="/blog" className={`${styles.lcard} ${styles.lcardFree}`}><span className={styles.lcardIcon}>{Icons.insights}</span><div><h3>Weekly insights</h3><p>Fundraising, retail, and margins.</p></div><Arrow/></Link>
      </div>
    </div>

    <div className={styles.chooseHelp}><div className={styles.joshuaPhoto}><Image src="/images/joshua-call.webp" alt="Joshua Church" fill sizes="44px"/></div><p><strong>Not sure which level fits?</strong><span>Talk through your business with Jeff’s team.</span></p><Link href="/apply">Start with a 30-minute intro call <Arrow/></Link></div>
  </section>;
}

// Header preview: numbers are the ones on Jeff's own About page.
const HERO_STATS = [["$700M+", "Returned to investors"], ["$275M+", "Raised across 40+ rounds"], ["8x", "Founder & CEO"], ["35", "Years in CPG"]] as const;
// Recognition as listed on Jeff's About page and the site's "As seen in" banner.
const PRESS = [["Forbes", "#2 Most Promising Companies"], ["Inc. 500", "#13 Fastest-Growing Company"], ["BevNET", "Person of the Year"], ["EY", "Entrepreneur of the Year"], ["Whole Foods Market", "Supplier of the Year"], ["The New York Times", "Featured"], ["Prevention", "100 Cleanest Packaged Foods"]] as const;
const NAV_LINKS = [["About Jeff", "/about-jeff"], ["Work with Jeff", "/work-with-jeff"], ["Free Resources", "/resources"], ["The Book", BOOK_URL]] as const;

export function Home({ ladder = false, header = false }: { ladder?: boolean; header?: boolean }) {
  const released = Date.now() >= Date.parse("2026-11-17T00:00:00-08:00");
  const bookLabel = released ? "Available now" : "Out November 17";
  return <div className={`${styles.home} ${header ? styles.ownNav : ""}`}>
{header ? <>
    <header className={styles.nav}><div className={styles.navInner}>
      <Link href="/" className={styles.navBrand} aria-label="CPG Founders Group homepage"><svg viewBox="0 0 48 32" width="31" height="24" aria-hidden="true"><path d="M30 13L41 27H19Z" fill="#1b3a5f"/><path d="M20 7L33 27H7Z" fill="#0b1a2e"/><path d="M10 18L19 27H1Z" fill="#dfa13c"/></svg>CPG Founders Group</Link>
      <nav className={styles.navLinks} aria-label="Main">{NAV_LINKS.map(([label, href]) => href.startsWith("http") ? <a key={label} href={href}>{label}</a> : <Link key={label} href={href}>{label}</Link>)}</nav>
      <Link href="/apply" className={styles.navApply}>Apply <span aria-hidden="true">↗</span></Link>
      <details className={styles.navMenu}><summary aria-label="Menu"><span/><span/><span/></summary><div>{NAV_LINKS.map(([label, href]) => href.startsWith("http") ? <a key={label} href={href}>{label}</a> : <Link key={label} href={href}>{label}</Link>)}<Link href="/blog">Blog</Link><Link href="/contact">Contact</Link></div></details>
    </div></header>
</> : null}
    <a href={BOOK_URL} className={styles.announcement}><span>{bookLabel}</span><strong>The Cold-Pressed Truth</strong><span>Jeff Church’s new book</span><span aria-hidden="true">↗</span></a>
    {header ? <>
    <section className={`${styles.hero} ${styles.heroV2}`} aria-labelledby="home-title"><div className={styles.heroInner}>
      <div className={styles.heroCopy}><p className={styles.eyebrow}>Advisory, strategy, and tools for CPG founders</p><h1 id="home-title">The operator in your corner for your brand’s <em>next big move.</em></h1><div className={styles.heroCred}><strong>Jeff Church, former Suja Juice co-founder &amp; CEO</strong><span>Grew Suja to $100M in revenue in 5 years, with Coca-Cola as an investor.</span></div><div className={styles.heroActions}><a href="#offers" className={styles.button}>Find your level <span aria-hidden="true">↓</span></a><Link href="/apply" className={styles.heroSecondary}>Apply for advisory <span aria-hidden="true">↗</span></Link></div></div>
      <figure className={styles.heroFigure}><div className={styles.heroVisual}><Image src="/images/jeff-hero.webp" alt="Jeff Church with CPG founders and their JUNI products" fill priority sizes="(min-width:900px) 40vw, 100vw" className={styles.heroPhoto}/></div><figcaption>Jeff with the founders of JUNI</figcaption></figure>
    </div>
    <dl className={styles.heroStats}>{HERO_STATS.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}</dl></section>
    <section className={styles.press} aria-label="Recognition for Jeff Church and Suja"><div className={styles.pressTrack}>{[0, 1].map((copy) => <ul key={copy} aria-hidden={copy === 1}>{PRESS.map(([name, award]) => <li key={name}><strong>{name}</strong><span>{award}</span></li>)}</ul>)}</div></section>
    </> : <>
    <section className={styles.hero} aria-labelledby="home-title"><div className={styles.heroInner}>
      <div><p className={styles.eyebrow}>For CPG founders · From Jeff Church</p><h1 id="home-title">Big decisions.<br/>The right support.</h1><p className={styles.heroIntro}>Work directly with Suja co-founder Jeff Church, get focused help on one decision, or build at your own pace. There’s a way in for where you are.</p><div className={styles.heroActions}><Link href="/work-with-jeff" className={styles.button}>Work with Jeff <span aria-hidden="true">↗</span></Link><a href="#offers" className={styles.heroSecondary}>{ladder ? "See every way to work with Jeff" : "Compare the options"} <span aria-hidden="true">↓</span></a></div><p className={styles.heroCredentials}>Suja co-founder <span>·</span> 8x founder <span>·</span> 35+ years of experience</p></div>
      <div className={styles.heroVisual}><Image src="/images/jeff-hero.webp" alt="Jeff Church with CPG founders and their JUNI products" fill priority sizes="(min-width:900px) 40vw, 100vw" className={styles.heroPhoto}/></div>
    </div></section>
    </>}

    {ladder ? <Ladder bookLabel={bookLabel}/> : <>
    <section className={styles.offers} id="offers" aria-labelledby="offers-title"><span id="programs" className={styles.legacyAnchor} aria-hidden="true"/><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Choose the support you need</p><h2 id="offers-title">One decision or the next chapter.</h2></div><p>Direct support from Jeff, or the tools to move forward yourself.</p></div>
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
    </>}

    <section className={styles.book} aria-labelledby="book-title"><div className={styles.bookInner}><a href={BOOK_URL} className={styles.coverLink} aria-label="Explore The Cold-Pressed Truth"><Image src="/images/book-covers/cold-pressed-truth-home.webp" alt="The Cold-Pressed Truth by Jeff Church, foreword by Jay Shetty" width={640} height={993} sizes="(max-width:639px) 100px, 180px"/></a><div><p className={styles.eyebrow}>The new book · {bookLabel}</p><h2 id="book-title">The Cold-Pressed Truth</h2><p className={styles.bookSubtitle}>A founder’s field guide to building, scaling, and selling a consumer brand.</p><p className={styles.bookByline}>By Jeff Church. Foreword by Jay Shetty.</p><a href={BOOK_URL} className={styles.bookButton}>Explore the book <span aria-hidden="true">↗</span></a><p className={styles.bookDate}><time dateTime="2026-11-17">November 17, 2026</time></p></div></div></section>
    <section className={styles.proof} aria-labelledby="proof-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Founders on working with Jeff</p><h2 id="proof-title">Experience that makes a difference.</h2></div><Link href="/results" className={styles.textLink}>More founder stories <span aria-hidden="true">↗</span></Link></div><TestimonialCarousel/><p className={styles.proofNote}>Individual experiences from work with Jeff. Engagements and results vary.</p></section>
    {ladder ? null : <>
    <section className={styles.community} id="community" aria-labelledby="community-title"><div className={styles.communityInner}><div className={styles.communityCopy}><span className={styles.communityIcon} aria-hidden="true"><svg viewBox="0 0 32 32" width="30" height="30" fill="none"><path d="M27 15.3a11 11 0 0 1-16.4 9.6L5 27l1.8-5.8A11 11 0 1 1 27 15.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M11 11.5c1 4.4 3.8 7.2 8.5 8.3l1.5-2.2-3.1-1.4-1.3 1.3c-1.6-.8-2.8-2-3.6-3.5l1.3-1.3-1.3-3-2 1.8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg></span><div><p className={styles.eyebrow}>Free founder community</p><h2 id="community-title">Join 400+ CPG founders on WhatsApp.</h2><p>Connect with founders building alongside you. Ask questions, share what’s working, and find helpful resources and industry connections.</p></div></div><div className={styles.communityAction}><Link href="/founders-only">Request to join the group <span aria-hidden="true">↗</span></Link><span>Free to join. Founder to founder.</span></div></div></section>
    </>}
    <section className={styles.stayConnected} aria-labelledby="connected-title"><div className={styles.connectedInner}><div><p className={styles.eyebrow}>Start with something free</p><h2 id="connected-title">Stay close to what’s working.</h2><p>Get Jeff’s weekly insights on fundraising, retail, margins, and building a CPG business.</p><div className={styles.freeLinks}><Link href="/resources">Free tools &amp; resources <span aria-hidden="true">↗</span></Link><Link href="/founders-only">Join 400+ CPG founders <span aria-hidden="true">↗</span></Link></div></div><div className={styles.signup}><NewsletterForm/><p className={styles.signupNote}>Unsubscribe anytime. No spam, ever.</p></div></div></section>
    <footer className={styles.footer} role="contentinfo"><div><strong>CPG Founders Group</strong><p>Tools, training, and direct access to Jeff Church.</p></div><nav aria-label="Footer navigation"><Link href="/about-jeff">About Jeff</Link><Link href="/work-with-jeff">Work with Jeff</Link><a href={BOOK_URL}>The book</a><Link href="/resources">Resources</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link></nav><div className={styles.footerBottom}><span>© {new Date().getFullYear()} CPG Founders Group</span><a href="mailto:info@teamchurch.co">info@teamchurch.co</a></div></footer>
  </div>;
}
