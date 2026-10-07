import type { Metadata } from "next";
import Image from "next/image";
import { LaunchList } from "./launch-list-client";
import { Tabs } from "./tabs";
import { Countdown, Section, CopyButton, WeekList, Who, type WeekBlock } from "./ui";
import { posts, chapterLines } from "./posts";

// Internal working page for The Cold-Pressed Truth launch (Tue Nov 17, 2026).
// Jeff + Joshua only. Unlisted, noindexed, and rendered without the site
// header/footer (see src/lib/internal-routes.ts). Five tabs:
// Plan / Timeline / LinkedIn / Jeff's list / Vault.
//
// Sources: Sep 30 strategy call with Jake Kelfer (BIB), Emma's launch-asset
// email, the BIB Drive folder, and the Oct 7 status (hardcover author copies
// ordered for Oct 30; paperback approval pending).

export const metadata: Metadata = {
  title: "CPT Launch - Internal",
  description: "Internal launch workspace for The Cold-Pressed Truth. Not public.",
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const phases = [
  { n: "1", name: "Build the lists", when: "Now to Nov 16", what: "Tier 1 names, insider list, LinkedIn warm-up. Nobody gets an Amazon link." },
  { n: "2", name: "Amazon week", when: "Nov 17 to 26", what: "$0.99 ebook, everyone buys in the same window, hit #1 in a category, screenshot it, get out." },
  { n: "3", name: "Revenue engine", when: "Dec onward", what: "Every link flips to the free + shipping funnel. Champions, podcasts, events, bulk orders." },
];

const goals = [
  { n: "250-500", label: "copies Nov 17-26" },
  { n: "500", label: "copies in month 1" },
  { n: "50", label: "reviews in month 1 (100 stretch)" },
  { n: "#1", label: "in at least one category" },
];

const rules = [
  { title: "No pre-orders. No Amazon link before Nov 17.", body: "A pre-order counts the day it's placed, not launch day. Every sale lands in the same window. Everything before Nov 17 teases; nothing links." },
  { title: "Ebook first, $0.99 for launch week.", body: "Tier 1 buys both formats. Everyone else gets the $0.99 ebook. Price goes back to normal the moment bestseller is confirmed." },
  { title: "Champions are not for Amazon.", body: "Jay, Kim, Mark, Seth, John get activated after bestseller, pointed at the free-book funnel where we own the data." },
  { title: "Amazon is 30 days. The book is forever.", body: "Bestseller is a box we check in week one. Then every post, link and ask points at cpgfoundersgroup.com." },
];

const keyDates = [
  { d: "Oct 12", t: "First public post: the book is done and going to print" },
  { d: "Oct 20", t: "Email #1 to the full list: the book is coming Nov 17" },
  { d: "Oct 30", t: "10 hardcover author copies arrive" },
  { d: "~Nov 10", t: "Emma sets Amazon categories. Nobody touches them after." },
  { d: "Nov 14-15", t: "3-5 friends buy the ebook to start category processing" },
  { d: "Nov 17", t: "Launch. 6am email, Tier 1 texts, 'It's live' post" },
  { d: "Nov 26", t: "Bestseller window closes (Thanksgiving)" },
  { d: "Dec 17", t: "30-day mark: 500 copies, 50 reviews" },
];

const publishing = [
  { label: "Manuscript", status: "Approved Sep 25. Locked.", done: true },
  { label: "KDP + IngramSpark", status: "Set up, verified, Emma uploading.", done: true },
  { label: "Hardcover", status: "Approved on KDP. 10 author copies ordered, arriving Oct 30. IngramSpark version (with dust jacket) is ready for review as of Oct 7.", done: true },
  { label: "Paperback", status: "Waiting on approval (any day). Order author copies the same day it lands.", done: false },
  { label: "Cover", status: "In hand (top of this page). Confirm with BIB that it's the final file before the Oct 19 reveal post.", done: true },
  { label: "Ebook", status: "Uploads with the paperback. $0.99 launch-week price set at listing.", done: false },
];

const thisWeek = [
  { who: "Joshua", text: "Paperback approval: the moment Emma's email lands, approve and order author copies the same day." },
  { who: "Jeff + Joshua", text: "Reply to Emma and Meredith on the PR thread and fill out the two Airtable forms (featured article + billboard). Meredith's Oct 1 email with examples is still unanswered. Details in the BIB asks box below." },
  { who: "Joshua", text: "Review the IngramSpark hardcover (the one with the dust jacket). Emma said it would be ready Wed Oct 7." },
  { who: "Jeff", text: "Tier 1 list: 50-100 names in the Jeff's list tab. Name and best channel is enough." },
  { who: "Joshua", text: "/book becomes the insider page: 'Out November 17', thank-you page hands them /toolbox. Target 200+ signups by launch (9 today)." },
  { who: "Jeff", text: "Approve the Oct 12 'My book is finally done' post (LinkedIn tab). It's the first public mention." },
  { who: "Both", text: "Anything that needs Jake gets asked before Thursday Oct 8. He's off grid until ~Oct 19; Emma covers." },
];

// Open email threads with BIB. Pulled from the inbox Oct 7.
const bibAsks = [
  {
    who: "Jeff + Joshua",
    title: "Featured article + Times Square billboard",
    thread: "'Exciting Update: PR For Your Book', Emma Sep 29, Meredith Oct 1. Unanswered since Oct 1.",
    items: [
      "Two Airtable forms to fill out (links in the Vault tab). That is the whole ask; nothing else is blocked on us.",
      "Featured article form: the topic or angle we want the piece built around. Emma: 'the more specific you are, the stronger the final piece.' It goes live during launch week on one of their outlets (examples Meredith sent: CEO Weekly, The Wall Street Times, US Business News). Suggest: the Babu angle plus the Suja ice-closet-to-$100M story, with the book as the hook.",
      "Billboard form: pick the date it airs. Recommend Nov 17 so it's launch-day content. Their design team then sends a few graphic options to choose from. Meredith attached five example billboards from past clients.",
      "Jeff asked whether PR feeds the bestseller push. Emma's answer: no, it's authority and content, not rankings. Treat it as a photo and a post, not a sales lever.",
      "Reply on the thread once the forms are in so Meredith knows to start.",
    ],
  },
  {
    who: "Joshua",
    title: "IngramSpark hardcover review",
    thread: "'Ordering Author Copies', Emma Oct 5.",
    items: [
      "KDP has the hardcover (no dust jacket preview there). The IngramSpark version with the dust jacket was set to be ready for review Wed Oct 7. Check it and reply.",
      "Jeff asked for ~5 copies for himself. The 10 hardcovers arriving Oct 30 cover that.",
      "Jake confirmed author copies are the final version of the book.",
    ],
  },
];

const decisions = [
  { q: "Launch party: launch week or December?", note: "Emma recommends launch week (a room of buyers helps rankings). Jeff's call on venue and date." },
  { q: "Billboard date", note: "Recommend Nov 17 so it's launch-day content." },
  { q: "Paperback and hardcover pricing", note: "Paperback likely $15.99-19.99, hardcover premium. Confirm with Emma at listing." },
  { q: "'Bestselling author' in the bio", note: "Per Jake: 'bestselling author', not 'Amazon bestselling author', never stacked with the earlier NYT line." },
  { q: "Which stories go public before the book is out", note: "Two brothers (Nov 2 post) and rehab (Nov 13 post) are both in drafts. Jeff decides." },
];

const weeks: WeekBlock[] = [
  {
    start: "2026-10-06", end: "2026-10-12", tag: "6 weeks out", dates: "Oct 6 - 12", theme: "Announce",
    items: thisWeek,
  },
  {
    start: "2026-10-13", end: "2026-10-19", tag: "5 weeks out", dates: "Oct 13 - 19", theme: "Cover reveal",
    items: [
      { who: "Jeff", text: "Mon Oct 19: cover reveal post (drafted). Needs the final cover from BIB by Oct 15." },
      { who: "Joshua", text: "Email #1 loaded in Kajabi for Oct 20: the book is coming Nov 17, what it is, why Jeff wrote it, first access + the kits. No ask yet." },
      { who: "Joshua", text: "Draft the Tier 1 text and Tier 2 message so Jeff can send from his phone on launch day without thinking." },
      { who: "Jeff", text: "Tier 1 list finished. Tier 2 started: Founders Club WhatsApp, coaching clients, people engaging on LinkedIn." },
      { who: "AI", text: "Everyone who likes or comments on a book post gets added to Tier 2." },
    ],
  },
  {
    start: "2026-10-20", end: "2026-10-26", tag: "4 weeks out", dates: "Oct 20 - 26", theme: "One month out",
    items: [
      { who: "Scheduled", text: "Tue Oct 20: email #1 to the full list (~1,850 contacts). The book is coming Nov 17. Get first access at /book." },
      { who: "Jeff", text: "Fri Oct 23: podcast tour post. 'Whose show should I be on?' Every reply goes into the Launch Vault podcast tracker." },
      { who: "Jeff", text: "Mon Oct 26: 'Three problems the book solves' post." },
      { who: "Joshua", text: "Insider list check: target 200+ on the /book waitlist by Nov 10. Every LinkedIn post and email points there." },
    ],
  },
  {
    start: "2026-10-27", end: "2026-11-02", tag: "3 weeks out", dates: "Oct 27 - Nov 2", theme: "Book in hand",
    items: [
      { who: "Joshua", text: "Confirm with Emma: categories plan, pricing for all three formats, launch-day sequence." },
      { who: "Jeff", text: "Fri Oct 30: hardcover author copies arrive. Film the unboxing on a phone in the kitchen. Linda's reaction. One take." },
      { who: "Jeff", text: "Mon Nov 2: unboxing post (drafted)." },
      { who: "Jeff", text: "Decide the launch party: launch week (Emma's pick) or a December celebration." },
      { who: "Joshua", text: "Reviews one-pager at /cpt-reviews: review link plus 3-5 sample reviews people can make their own." },
    ],
  },
  {
    start: "2026-11-03", end: "2026-11-09", tag: "2 weeks out", dates: "Nov 3 - 9", theme: "Last call",
    items: [
      { who: "Scheduled", text: "Email #2: 'Two weeks.' Three things you'll learn from the book, plus the podcast ask: 'Have a show or know someone who does? Reply.'" },
      { who: "Jeff", text: "Fri Nov 6: Jay Shetty foreword post. Mon Nov 9: 'Mark your calendars' with the Kim quote card." },
      { who: "Joshua", text: "Launch-day graphics: square for LinkedIn, story size for IG, Jay quote, Kim quote. Tier 1 gets the pack with the Nov 16 text." },
      { who: "Joshua", text: "Free + shipping funnel and free digital page built (not live). Takes over after bestseller." },
      { who: "Joshua", text: "AI outreach queue built: Jeff's first-degree LinkedIn connections not in Tier 1 or 2. 15-20 DMs a day from Nov 17." },
    ],
  },
  {
    start: "2026-11-10", end: "2026-11-16", tag: "1 week out", dates: "Nov 10 - 16", theme: "Countdown",
    items: [
      { who: "Emma", text: "Categories set ~Nov 10 with BIB's software. Nobody touches them after." },
      { who: "Scheduled", text: "Email #3 (Nov 10): 'One week. If you've been struggling with X, this book is for you.' Three struggles, three chapters." },
      { who: "Jeff", text: "Fri Nov 13: journey recap post. Mon Nov 16: 'Tomorrow' post." },
      { who: "Jeff", text: "Nov 14-15: 3-5 hand-picked friends buy the ebook so Amazon's category processing starts. 2-3 of them review Nov 15-16." },
      { who: "Scheduled", text: "Email #4 (Nov 16): 'Tomorrow is the day. The link lands in your inbox at 6am.'" },
      { who: "Jeff", text: "Nov 16 evening: Tier 1 texts queued on Jeff's phone. 'Book's live tomorrow morning. Here's what I need from you.'" },
    ],
  },
];

const launchWeek = [
  { day: "Tue Nov 17", title: "Launch day", items: ["6am PT: email #5 to the full list. 'It's live. $0.99.' Ebook link first.", "Tier 1 gets the link, the review link and the graphics pack by text.", "Jeff sends every Tier 1 text personally through the morning. Buy both, review, post.", "Tier 2 message: WhatsApp group, LinkedIn engagers, clients. 'It's $0.99 this week if you'd like to support.'", "LinkedIn 'It's live' post with a photo of Jeff holding it.", "AI starts the Tier 3 DM queue, 15-20 a day.", "Featured article goes live (BIB PR). Billboard airs if we picked today."] },
  { day: "Wed Nov 18", title: "Day two", items: ["Email #6: 'Gift it for $0.99.'", "LinkedIn day-two post. Reshare everyone posting about the book. Reply to every comment.", "Review nudge to Tier 1 and insiders: 'The review takes 60 seconds. Samples at the link.'", "Watch rankings. Emma is screenshotting."] },
  { day: "Thu Nov 19 - Fri Nov 20", title: "The push", items: ["'We hit #1' post the moment it happens. Screenshot, gratitude, still $0.99.", "Email #7: 'We did it' (or 'We're #3, can you grab it and leave a review?').", "Tier 1 review follow-up, one by one. People say yes and don't do it. The follow-up is the whole game."] },
  { day: "Sat Nov 21 - Thu Nov 26", title: "Close the window", items: ["Daily LinkedIn touch through Thanksgiving: rankings, reader posts, a gratitude video.", "Email #8 (Nov 23 or 24): 'Last chance at $0.99' + thank you.", "Bestseller confirmed and screenshotted: price back to normal, bio updated, every link flips to free + shipping.", "Review count check Nov 26. Under 25: AI runs a second follow-up pass on everyone who bought."] },
];

const reviews = [
  { title: "The one-pager", body: "/cpt-reviews with the direct Amazon review link and 3-5 sample reviews. 'Make one of these your own or write your own.' Tier 1 and the insider list get it on launch day." },
  { title: "Pre-launch seed", body: "2-3 friends review Nov 15-16 so the page isn't empty on launch morning. They must have bought (the hand-picked ebook buyers)." },
  { title: "Follow-up is the whole game", body: "AI follows up with every Tier 1 buyer and every insider who replied at day 3, 7 and 14. Friction, not intent, is why review counts stall." },
  { title: "What a review can say", body: "Most launch-day buyers won't have read it yet. A 1-2 sentence review about what they expect from the book or from Jeff as an operator is legitimate and what BIB recommends." },
];

const phase3 = [
  { title: "Free + shipping funnel", body: "cpgfoundersgroup.com/free-book, rebuilt natively from Jake's. Book free, pay shipping. Order bump $17-47, upsell $97, upsell 2 $197-297 (MBA for CPG at a launch discount). Then book a call." },
  { title: "Free digital funnel", body: "cpgfoundersgroup.com/free-digital-book. Opt in, get the PDF. For people who won't give an address yet. Both run at once." },
  { title: "Champions go live", body: "Week after Thanksgiving. Assets in hand, one specific ask each, all pointed at the free book." },
  { title: "Podcast tour", body: "25 shows minimum, 50 stretch (Launch Vault has the tracker). Warm paths through champions first. Every episode: free book link, not Amazon." },
  { title: "Speaking and events", body: "25 targets. Bulk orders for swag bags. Launch Vault has 60+ speaker bureaus; that's a 2027 play." },
  { title: "Awards", body: "Axiom Business Book Awards (deadline Jan 28, 2027). Stevie Awards early bird Nov 18 and Dec 17. 'Award-winning' is useful cover copy for the second printing." },
  { title: "Weekly book content forever", body: "One post a week after launch: a review, a reader photo, a story, a result." },
];

const tiers = [
  { name: "Tier 1", who: "Ride or dies", size: "50-100", desc: "Family, close friends, people who buy the day Jeff asks. Former partners, co-founders, board members, the Suja crew, longtime clients.", ask: "Buy the ebook AND the paperback on Nov 17. Review that week. Post about it. Told directly.", channel: "Personal text or call from Jeff", owner: "Jeff builds the list and sends the texts. Joshua drafts the message and runs follow-up." },
  { name: "Tier 2", who: "Friends of the work", size: "Hundreds", desc: "Founders Club WhatsApp (350+), coaching and membership clients, LinkedIn likers and commenters between now and launch, workshop attendees, the email list.", ask: "'My new book just came out. It's $0.99 this week if you'd like to support.' Ebook link only.", channel: "WhatsApp, LinkedIn DM, email", owner: "AI builds the list from LinkedIn engagement. Jeff posts in WhatsApp. Joshua sends the rest." },
  { name: "Tier 3", who: "The long tail", size: "Everyone else", desc: "First-degree LinkedIn connections Jeff doesn't talk to, old contacts, followers who never engage.", ask: "'My new book came out. Here's what it's about. Here's the link.' No follow-up if they don't respond.", channel: "LinkedIn DM, 15-20 a day", owner: "AI runs it from Nov 17 until the list is done. Link flips to free + shipping after bestseller." },
];

const champions = [
  { name: "Jay Shetty", why: "Wrote the foreword. One of the largest podcasts in the world.", asks: ["Podcast episode, post-launch, every listener to free + shipping", "Story share of the free book + kits, with an asset we make (his quote, his photo, the cover)", "Nothing on the $0.99 week"] },
  { name: "Kim Perell", why: "Back-cover blurb ('the Yoda of CPG'). 200K+ LinkedIn, founder audience.", asks: ["LinkedIn post: photo of her and Jeff, her blurb, link to the kits page", "Podcast or LinkedIn Live with Jeff", "We write the draft and hand her the graphic"] },
  { name: "Mark Rampolla", why: "Cover epigraph. ZICO founder, author, runs his own founder community.", asks: ["LinkedIn post + share to his community, pointed at free + shipping", "Podcast swap", "Intros to event hosts where he speaks"] },
  { name: "Seth Goldman", why: "Back-cover blurb. Honest Tea founder.", asks: ["LinkedIn post with his blurb (asset provided)", "Intros to events; bulk order for swag bags"] },
  { name: "John Foraker", why: "Back-cover blurb. Once Upon a Farm CEO, former Annie's CEO.", asks: ["LinkedIn post with his blurb (asset provided)", "Events and industry groups: intro to the host, or books for the room"] },
];

const championPlays = [
  { play: "Create the asset, don't ask them to", body: "A graphic with their quote, their face, the cover, the link. They post it or write their own. We control the narrative either way." },
  { play: "Podcast over post", body: "One podcast appearance beats ten shares. Every listener lands on the free book page and we own the data." },
  { play: "Events and bulk", body: "Ask for the intro to the event host: Jeff speaks, or the organizer buys books for every swag bag." },
  { play: "The framing when they ask about the big campaign", body: "'Friends-and-family launch on Amazon to get it rolling. The book is really a revenue engine for the business.' Otherwise they ask for pre-order links and it gets overwhelming fast." },
];

const assets = [
  { label: "BIB launch folder (everything)", href: "https://drive.google.com/drive/folders/1ee0SEomLUItbOUn356_tgZELjTRRJnse" },
  { label: "Launch Vault (BIB master sheet: contacts, podcasts, events, bureaus, awards)", href: "https://docs.google.com/spreadsheets/d/15zde17sJVAbEXbJkHmZHSuIsqzq8E3vy9n0Ljf8OOXg/edit" },
  { label: "Email templates for launch week", href: "https://docs.google.com/document/d/1plLpUq9bW85FqYqtTiTkAxPdBkZbUv80XIurnGsqtCs/edit" },
  { label: "8-week social media countdown (BIB)", href: "https://docs.google.com/spreadsheets/d/1cEooKEfuHww8KejpGN3Df0M6IdsRU0x4wI6NFCpDZQc/edit" },
  { label: "Social media gameplan ideas (BIB)", href: "https://docs.google.com/document/d/1cdNOCAzQk9AqAz3HrLYi8dxWzpK5tJMlJodgjAtKDag/edit" },
  { label: "Launch team overview (BIB, reference only; we are not running one)", href: "https://docs.google.com/document/d/1OZM24hNjtANLIY-OPQc5lBRHCIrMWk9_lAMI1E9Aqiw/edit" },
  { label: "Featured article form (Airtable)", href: "https://airtable.com/appaKM1oF2hMMBpbo/pag4eCnU8spLoA7go/form" },
  { label: "Billboard form (Airtable)", href: "https://airtable.com/appaKM1oF2hMMBpbo/pagysOdGm7GAlzJjO/form" },
  { label: "Jake's free + shipping funnel (the model)", href: "https://go.bigideatobestseller.com/free-book" },
  { label: "Jake's free digital funnel (the model)", href: "https://www.bigideatobestseller.com/free-digital-book" },
  { label: "Book page / insider opt-in (ours)", href: "/book" },
  { label: "The three kits (ours)", href: "/toolbox" },
];

const emails = [
  { n: "1", when: "Tue Oct 20", what: "The book is coming Nov 17. What it is, why Jeff wrote it, first access + the kits. No ask." },
  { n: "2", when: "Tue Nov 3", what: "Two weeks. Three things you'll learn, plus the podcast ask." },
  { n: "3", when: "Tue Nov 10", what: "One week. Three struggles, three chapters." },
  { n: "4", when: "Mon Nov 16", what: "Tomorrow is the day. The link lands at 6am." },
  { n: "5", when: "Tue Nov 17, 6am", what: "It's live. $0.99. Ebook link first." },
  { n: "6", when: "Wed Nov 18", what: "Gift it for $0.99." },
  { n: "7", when: "Thu/Fri Nov 19-20", what: "We did it (or: we're close, grab it and review)." },
  { n: "8", when: "Mon/Tue Nov 23-24", what: "Last chance at $0.99 + thank you." },
];

const ISBNS = [
  { f: "Paperback", n: "978-1-968164-59-1" },
  { f: "Ebook", n: "978-1-968164-60-7" },
  { f: "Hardcover", n: "978-1-968164-62-1" },
];

/* ------------------------------------------------------------------ */
/* Small presentational helpers (server)                               */
/* ------------------------------------------------------------------ */

function H2({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-bold tracking-tight">{children}</h2>
      {sub && <p className="mt-1 text-muted max-w-3xl">{sub}</p>}
    </div>
  );
}

function Bullets({ items, gold = false }: { items: string[]; gold?: boolean }) {
  return (
    <ul className="space-y-1.5">
      {items.map((it) => (
        <li key={it} className="flex gap-2 text-sm leading-relaxed">
          <span className={gold ? "text-gold" : "text-accent"}>&#9656;</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Tabs                                                                */
/* ------------------------------------------------------------------ */

function PlanTab() {
  return (
    <div className="space-y-10">
      {/* The plan in one screen */}
      <div>
        <H2 sub="Three phases. The whole thing on one screen.">The plan</H2>
        <div className="grid gap-4 md:grid-cols-3">
          {phases.map((p) => (
            <div key={p.n} className="rounded-xl border border-border bg-card p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-accent">Phase {p.n} &middot; {p.when}</div>
              <div className="mt-1 text-lg font-bold">{p.name}</div>
              <p className="mt-2 text-sm text-muted leading-relaxed">{p.what}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {goals.map((g) => (
            <div key={g.label} className="rounded-xl bg-foreground p-4 text-white">
              <div className="text-2xl font-bold text-gold">{g.n}</div>
              <div className="mt-1 text-xs font-semibold text-white/80">{g.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* This week */}
      <div>
        <H2 sub="What's on the desk right now. The full week-by-week is in Timeline.">This week</H2>
        <ul className="space-y-3 rounded-xl border border-accent bg-card p-5">
          {thisWeek.map((it) => (
            <li key={it.text} className="flex gap-3 items-start">
              <Who who={it.who} />
              <span className="text-sm leading-relaxed">{it.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* What BIB is waiting on */}
      <div>
        <H2 sub="Open threads with Emma and Meredith, and exactly what they need back.">BIB asks</H2>
        <div className="space-y-3">
          {bibAsks.map((a) => (
            <div key={a.title} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Who who={a.who} />
                <span className="font-bold">{a.title}</span>
                <span className="text-xs text-muted">{a.thread}</span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {a.items.map((it) => (
                  <li key={it} className="flex gap-2 text-sm leading-relaxed">
                    <span className="text-accent">&#9656;</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Status + dates side by side */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <H2>Where the book is</H2>
          <ul className="divide-y divide-border rounded-xl border border-border bg-card">
            {publishing.map((p) => (
              <li key={p.label} className="flex gap-3 px-4 py-3">
                <span className={`mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${p.done ? "bg-foreground text-gold" : "border border-accent text-accent"}`}>
                  {p.done ? "✓" : "…"}
                </span>
                <span className="text-sm">
                  <span className="font-bold">{p.label}.</span> <span className="text-muted">{p.status}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted">
            ISBNs: {ISBNS.map((i) => `${i.f} ${i.n}`).join(" · ")}
          </p>
        </div>
        <div>
          <H2>Key dates</H2>
          <ul className="divide-y divide-border rounded-xl border border-border bg-card">
            {keyDates.map((k) => (
              <li key={k.d + k.t} className="grid grid-cols-[90px_1fr] gap-3 px-4 py-2.5 text-sm">
                <span className="font-bold text-accent">{k.d}</span>
                <span>{k.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Section title="The four rules" kicker="Don't break these">
        <div className="grid gap-4 md:grid-cols-2">
          {rules.map((r) => (
            <div key={r.title} className="rounded-lg bg-background p-4">
              <div className="font-bold leading-snug">{r.title}</div>
              <p className="mt-1.5 text-sm text-muted leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Open decisions for Jeff" kicker={`${decisions.length} open`}>
        <ul className="space-y-3">
          {decisions.map((d) => (
            <li key={d.q} className="rounded-lg bg-background p-4">
              <div className="font-bold">{d.q}</div>
              <p className="mt-1 text-sm text-muted leading-relaxed">{d.note}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Who's who at BIB">
        <ul className="space-y-2 text-sm">
          <li><span className="font-bold">Jake Kelfer</span> &middot; strategy. Off grid ~Oct 8-19 for the baby.</li>
          <li><span className="font-bold">Emma Vertolli</span> &middot; Author Success Coordinator, day-to-day. The contact while Jake is out. Sets categories, screenshots rankings.</li>
          <li><span className="font-bold">Meredith Edmondson</span> &middot; PR. Featured article + Times Square billboard, via the Airtable forms.</li>
        </ul>
      </Section>
    </div>
  );
}

function TimelineTab() {
  return (
    <div className="space-y-10">
      <div>
        <H2 sub="Anchored to the Tuesday launch. The current week opens by itself; past weeks fade.">
          Phase 1 &middot; Now to Nov 16
        </H2>
        <WeekList weeks={weeks} />
      </div>

      <div>
        <H2 sub="Nov 17-26. Concentrate every sale into the window, hit #1 in a category, screenshot it, get out.">
          Phase 2 &middot; Launch week to Thanksgiving
        </H2>
        <div className="space-y-3">
          {launchWeek.map((d, i) => (
            <Section key={d.day} title={d.title} kicker={d.day} defaultOpen={i === 0}>
              <Bullets items={d.items} />
            </Section>
          ))}
        </div>
      </div>

      <Section title="Emails (Kajabi, full list)" kicker="8 sends">
        <ul className="divide-y divide-border">
          {emails.map((e) => (
            <li key={e.n} className="grid grid-cols-[32px_130px_1fr] gap-3 py-2.5 text-sm">
              <span className="font-bold text-accent">#{e.n}</span>
              <span className="font-semibold">{e.when}</span>
              <span className="text-muted">{e.what}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">BIB&rsquo;s templates are in the Vault tab. We rewrite them in Jeff&rsquo;s voice before they load.</p>
      </Section>

      <Section title="Reviews" kicker="The metric that lasts">
        <p className="mb-4 text-sm text-muted">Jake&rsquo;s take: for Jeff, reviews matter more than the badge. The badge is a week-one moment. Review count is what a stranger sees for years.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((r) => (
            <div key={r.title} className="rounded-lg bg-background p-4">
              <div className="font-bold">{r.title}</div>
              <p className="mt-1.5 text-sm text-muted leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Phase 3 &middot; After bestseller" kicker="December onward">
        <p className="mb-4 text-sm text-muted">The moment the screenshot exists, the Amazon campaign is over and the book becomes the top of the funnel. Jake&rsquo;s framing: not a New York Times campaign, a million-dollar book campaign.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {phase3.map((p) => (
            <div key={p.title} className="rounded-lg bg-background p-4">
              <div className="font-bold">{p.title}</div>
              <p className="mt-1.5 text-sm text-muted leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function LinkedInTab() {
  return (
    <div className="space-y-10">
      <div>
        <H2 sub="The Tue/Thu Fatal Flaws queue keeps running as scheduled. Book posts take Monday, then Monday + Friday from Oct 23, then daily during launch week. All 10am PT. Every pre-launch post points at cpgfoundersgroup.com/book (the insider list). No launch team, no Amazon link anywhere until Nov 17.">
          LinkedIn
        </H2>
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-bold uppercase tracking-wider text-muted border-b border-border bg-background">
                <th className="px-4 py-2">Date</th>
                <th className="px-2 py-2">Post</th>
                <th className="px-2 py-2">Type</th>
                <th className="px-2 py-2">Needs</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.iso + p.title} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-semibold whitespace-nowrap">{p.date}</td>
                  <td className="px-2 py-2">{p.title}</td>
                  <td className="px-2 py-2 text-muted">{p.type}</td>
                  <td className="px-2 py-2 text-muted text-xs">{p.needs ? p.needs.split(".")[0] + "." : "Nothing"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted">
          Two changes to the existing queue: the Timestamp WhatsApp promo moves from Fri Oct 23 to Fri Oct 30, and FF #1 moves from Tue Nov 17 to Tue Nov 24 so launch day gets the &lsquo;It&rsquo;s live&rsquo; post.
        </p>
      </div>

      <div>
        <H2 sub="Drafted in Jeff's voice. Expand one, read it, copy it. Each has a note on what it needs and what to double-check.">
          The drafts
        </H2>
        <div className="space-y-3">
          {posts.map((p, i) => (
            <Section key={p.iso + p.title} title={p.title} kicker={`${p.date} · ${p.type}`} defaultOpen={i === 0}>
              <div className="grid gap-5 md:grid-cols-[1fr_260px]">
                <div>
                  <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed rounded-lg bg-background p-4">{p.body}</pre>
                  <div className="mt-3">
                    <CopyButton text={p.body} />
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted">Slot</div>
                    <p className="mt-1 leading-relaxed">{p.slot}</p>
                  </div>
                  {p.needs && (
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-accent">Needs</div>
                      <p className="mt-1 leading-relaxed">{p.needs}</p>
                    </div>
                  )}
                  {p.check && (
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-muted">Jeff, check</div>
                      <p className="mt-1 leading-relaxed text-muted">{p.check}</p>
                    </div>
                  )}
                </div>
              </div>
            </Section>
          ))}
        </div>
      </div>

      <Section title="One added line on the Tue/Thu posts" kicker="The posts don't change">
        <p className="mb-4 text-sm text-muted">
          Each Fatal Flaws post that&rsquo;s already scheduled gets one sentence tacked on the end, pointing at the chapter. Chapter numbers are a best read of where each story lives in the book. Jeff confirms.
        </p>
        <ul className="divide-y divide-border">
          {chapterLines.map((c) => (
            <li key={c.date} className="py-3 text-sm">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-bold whitespace-nowrap">{c.date}</span>
                <span className="text-muted">{c.post}</span>
                <span className="text-xs text-accent">{c.chapter}</span>
              </div>
              <p className="mt-1 rounded bg-background px-3 py-2 italic">&ldquo;{c.line}&rdquo;</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Voice notes for anything new" kicker="How Jeff sounds">
        <Bullets
          items={[
            "Open with a narrative invitation: 'I want to tell you about...', 'True story...', 'Here's something I tell every founder I work with.'",
            "Flowing sentences joined with 'but', 'and', 'so'. Not staccato fragments.",
            "One to three capitalized words per post, max. Single exclamation marks. Parentheticals for emphasis.",
            "No wrap-up lesson. The story is the lesson.",
            "'I' for personal decisions, 'we' for company actions.",
            "Link goes in the body, not 'first comment'.",
            "Small, specific, self-aware admissions (what the kids thought, what Linda said).",
          ]}
        />
      </Section>
    </div>
  );
}

function ListTab() {
  return (
    <div className="space-y-10">
      <div>
        <H2 sub="One shared list for both of us. Type names straight in, or hit Download Excel, add names in the spreadsheet (tier dropdown included), and Import it back. Name and how to reach them is enough.">
          Jeff&rsquo;s list
        </H2>
        <LaunchList />
      </div>

      <Section title="Who goes in which tier" kicker="The three tiers" defaultOpen>
        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.name} className="rounded-lg bg-background p-4 text-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-accent">{t.name} &middot; {t.size}</div>
              <div className="mt-0.5 font-bold text-base">{t.who}</div>
              <p className="mt-2 text-muted leading-relaxed">{t.desc}</p>
              <div className="mt-3 text-xs font-bold uppercase tracking-wider text-muted">The ask</div>
              <p className="mt-0.5 leading-relaxed">{t.ask}</p>
              <div className="mt-3 text-xs font-bold uppercase tracking-wider text-muted">Channel</div>
              <p className="mt-0.5">{t.channel}</p>
              <div className="mt-3 text-xs font-bold uppercase tracking-wider text-muted">Owner</div>
              <p className="mt-0.5 leading-relaxed">{t.owner}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Champions &middot; held for after the Amazon week" kicker="The back cover and the foreword" tone="dark">
        <p className="mb-4 text-sm text-white/70">The most valuable relationships Jeff has for this book, so we don&rsquo;t spend them on a $0.99 sale. Each gets one specific ask, an asset we made for them, and a link to the free book.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {champions.map((c) => (
            <div key={c.name} className="rounded-lg border border-gold/30 bg-white/5 p-4">
              <div className="font-bold text-gold">{c.name}</div>
              <p className="mt-0.5 text-xs text-white/60">{c.why}</p>
              <div className="mt-2">
                <Bullets items={c.asks} gold />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {championPlays.map((p) => (
            <div key={p.play} className="rounded-lg border border-white/10 p-4">
              <div className="font-bold text-sm">{p.play}</div>
              <p className="mt-1 text-sm text-white/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function VaultTab() {
  return (
    <div className="space-y-6">
      <H2 sub="Everything BIB gave us, plus our own pages. The Launch Vault sheet is the reference; Jeff's list tab is what Jeff actually fills in.">
        Vault
      </H2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {assets.map((a) => (
          <li key={a.href}>
            <a
              href={a.href}
              target={a.href.startsWith("/") ? undefined : "_blank"}
              rel="noreferrer"
              className="block rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
            >
              {a.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted">
        <div className="font-bold text-foreground">Still to build (ours)</div>
        <ul className="mt-2 space-y-1">
          <li>/cpt-reviews &middot; review link + sample reviews (by Oct 30)</li>
          <li>/free-book &middot; free + shipping funnel (built by Nov 9, live after bestseller)</li>
          <li>/free-digital-book &middot; PDF opt-in (same)</li>
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function LaunchPlanPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-foreground text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/cpt-cover.jpg"
              alt="The Cold-Pressed Truth cover"
              width={56}
              height={90}
              priority
              className="h-[90px] w-auto rounded-sm shadow-lg shadow-black/40 ring-1 ring-white/10"
            />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold">Internal &middot; Jeff + Joshua</div>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">The Cold-Pressed Truth &middot; Launch</h1>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg sm:text-xl font-bold text-gold">
              <Countdown />
            </div>
            <div className="text-xs text-white/60">Tuesday, November 17, 2026</div>
          </div>
        </div>
      </header>

      <Tabs
        tabs={[
          { id: "plan", label: "Plan", content: <PlanTab /> },
          { id: "timeline", label: "Timeline", content: <TimelineTab /> },
          { id: "linkedin", label: "LinkedIn", content: <LinkedInTab /> },
          { id: "list", label: "Jeff's list", content: <ListTab /> },
          { id: "vault", label: "Vault", content: <VaultTab /> },
        ]}
      />
    </div>
  );
}
