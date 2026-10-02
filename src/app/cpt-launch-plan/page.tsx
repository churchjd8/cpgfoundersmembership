import type { Metadata } from "next";
import Link from "next/link";
import { LaunchList } from "./launch-list-client";

// Internal gameplan for The Cold-Pressed Truth launch (Nov 17, 2026). Built
// from the Sep 30 strategy call with Jake Kelfer (Big Idea To Bestseller),
// Emma's launch-asset email (Sep 29), and the BIB docs in the shared Drive
// folder. Unlisted and noindexed: the link is the invitation. Jeff and Joshua
// are the audience, so the page can be frank about tactics and numbers.
//
// Dates are anchored to a Tuesday Nov 17 launch. If the date moves, every
// week block below moves with it.

export const metadata: Metadata = {
  title: "CPT Launch Plan - Internal",
  description: "Internal launch gameplan for The Cold-Pressed Truth. Not public.",
  robots: { index: false, follow: false },
};

const LAUNCH = new Date("2026-11-17T00:00:00-08:00");

const goals = [
  { n: "250-500", label: "copies sold Nov 17-26", sub: "The bestseller window. One format is enough; ebook at $0.99 is the shortest path." },
  { n: "500", label: "copies in the first 30 days", sub: "Jake's target for the initial push. Beat it if we can, but this is the line." },
  { n: "50", label: "Amazon reviews in month 1", sub: "50 reads as more than friends and family. 100 is the stretch, and reviews are the long-term metric." },
  { n: "#1", label: "in at least one category", sub: "Two stores (Kindle + print), three categories each. Six shots. Emma sets them ~7 days out." },
];

const rules = [
  {
    title: "No pre-orders. Nobody gets the Amazon link before Nov 17.",
    body: "A pre-order counts toward rankings the day it's placed, not launch day. Every sale has to land in the same window. Insider list, launch team, LinkedIn: all of it teases, none of it links.",
  },
  {
    title: "Ebook first, $0.99 for launch week.",
    body: "Tier 1 buys both. Everyone else gets pointed at the $0.99 ebook. All formats go live together (ebook, paperback, hardcover; no audiobook yet). Price goes back to normal the moment bestseller is confirmed.",
  },
  {
    title: "Heavy hitters are not for Amazon.",
    body: "Kim, Jay, Mark, Seth, John: we don't spend them on a $0.99 sale. They get activated after bestseller, pointed at the free + shipping funnel and the kits, where we own the data.",
  },
  {
    title: "The Amazon campaign is 30 days. The book is a revenue engine for years.",
    body: "Bestseller is a box we check in week one. Then we shift every link, post, and ask toward cpgfoundersgroup.com. The framing for anyone who asks about the 'big launch': friends-and-family launch on Amazon, then the book goes to work.",
  },
];

// Week blocks anchored to the launch date. Dates are Mon-Sun ranges.
const weeks = [
  {
    tag: "7 weeks out",
    dates: "Sep 29 - Oct 5",
    theme: "Lock the machine",
    flag: "This week",
    items: [
      { who: "Joshua", text: "Approve the KDP listing the moment Emma's email lands, then order author copies the same day. Delivery is the long pole; if the ETA slips past Oct 16, take Jake's third-party printer for a limited run." },
      { who: "Joshua", text: "Fill out the two Airtable forms from Emma: Featured Article and Times Square Billboard. Pick Nov 17 as the billboard date so it lands as launch-day content." },
      { who: "Jeff", text: "Start the Tier 1 list. 50-100 names of people who buy the day you ask. Use the list below or the sheet; name and best channel is enough for now." },
      { who: "Joshua", text: "Upgrade /book into the insider page: 'Out November 17', optional phone field, thank-you page that hands them the three kits at /toolbox as the 'treat'. Waitlist is at 9 real signups today; target 200+ by launch." },
      { who: "Jeff + Joshua", text: "First book post on LinkedIn: 'I wrote a book. It comes out November 17.' Why the book exists (Babu, Kilimanjaro, the book he wishes someone had handed him). CTA: get insider access at the link." },
      { who: "Joshua", text: "Build the reviews one-pager (/cpt-reviews): review link, 3-5 sample reviews people can make their own. Draft the launch-team offer copy." },
      { who: "Joshua", text: "Cover is with BIB (Plan B and C in motion). Hands off unless Jake asks." },
    ],
  },
  {
    tag: "6 weeks out",
    dates: "Oct 6 - 12",
    theme: "Cover reveal",
    items: [
      { who: "Jeff", text: "LinkedIn milestone post: the cover. Ask what people think. Tag every like and comment into the Tier 2 list (the AI tracks it; Jeff just posts)." },
      { who: "Jeff", text: "Add one line to the existing Tue/Thu educational posts: 'I go deeper on this in Chapter 12 of The Cold-Pressed Truth, out Nov 17. Insider access at the link.'" },
      { who: "Jeff", text: "Tier 1 list finished. Tier 2 started: Founders Club WhatsApp, coaching clients, membership, people who engage on LinkedIn." },
      { who: "Joshua", text: "Draft the Tier 1 text message and the Tier 2 message so Jeff can send from his phone on launch day without thinking." },
      { who: "Both", text: "Jake goes off grid ~Oct 8 for the baby. Emma is the contact until he's back. Anything that needs Jake gets asked before Thursday." },
    ],
  },
  {
    tag: "5 weeks out",
    dates: "Oct 13 - 19",
    theme: "Pre-load Europe",
    flag: "Leave Oct 16",
    items: [
      { who: "Jeff", text: "If author copies arrive: film the unboxing. Jeff opening the box, holding it, Linda's reaction. Don't post it yet; it's the 3-weeks-out milestone post." },
      { who: "Joshua", text: "Pre-schedule two weeks of LinkedIn posts and the 4-weeks-out email before wheels up. Nothing about the launch should depend on being at a desk in Europe." },
      { who: "Joshua", text: "Pre-launch email #1 loaded in Kajabi for Oct 20: 'I wrote a book. Nov 17. Want to be on the launch team?' Reply-to-join." },
      { who: "Both", text: "BIB office hours Tue Oct 13, 10am PT. Bring the Tier 1/2 counts and any question the plan doesn't answer." },
    ],
  },
  {
    tag: "4 weeks out",
    dates: "Oct 20 - 26",
    theme: "Launch team opens",
    flag: "In Europe",
    items: [
      { who: "Scheduled", text: "Email #1 goes to the full list (~1,850 contacts, 50-60% open rate). Join the launch team: buy the $0.99 ebook on Nov 17, leave a review, share the graphic. In return: early PDF two weeks before launch plus the three kits." },
      { who: "Scheduled", text: "LinkedIn: 'One month until my book comes out' + the launch team ask as a comment-to-join post ('Comment BOOK and I'll send the details'). The AI DMs everyone who comments." },
      { who: "Scheduled", text: "Educational post: the three problems the book solves. Ties straight into the Fatal Flaws queue already running Tue/Thu." },
      { who: "AI", text: "Launch team replies captured into the sheet. Target: 50-100 committed names by Nov 3." },
    ],
  },
  {
    tag: "3 weeks out",
    dates: "Oct 27 - Nov 2",
    theme: "Book in hand",
    flag: "Back Oct 29",
    items: [
      { who: "Jeff", text: "Milestone post: the unboxing video. First time holding the book. This is the highest-engagement post of the whole run; make it human, not polished." },
      { who: "Jeff", text: "Send the early PDF to everyone on the launch team. This is the 'read it before everyone else' bonus." },
      { who: "Jeff", text: "Educational post: one core framework from the book (M.A.P., Stage-Gate, or the Life Stages of a Brand). 'Chapter 6 of the book walks through all four stages.'" },
      { who: "Both", text: "BIB office hours Tue Oct 27, 10am PT. Jake should be back. Confirm categories plan, pricing, and launch-day sequence." },
      { who: "Jeff", text: "Decide the launch party: date, venue, and whether it's launch week (Emma's recommendation: the evening before or day of; a room of 25-150 buyers helps rankings) or a December celebration once the push is over." },
    ],
  },
  {
    tag: "2 weeks out",
    dates: "Nov 3 - 9",
    theme: "Last call for the team",
    items: [
      { who: "Scheduled", text: "Email #2: 'Last chance to join the launch team. Two weeks.' Plus the podcast ask: 'Have a show or know someone who does? Reply.'" },
      { who: "Jeff", text: "LinkedIn: 'Mark your calendars: Nov 17.' Jay Shetty foreword pull-quote as a graphic ('essential reading for entrepreneurs in consumer'). Quote card from the book." },
      { who: "Joshua", text: "Launch-day graphics ready: square for LinkedIn, story size for IG, one with the Jay quote, one with the Kim quote. Launch team gets the pack on Nov 16." },
      { who: "Joshua", text: "Build the free + shipping funnel and the free digital page on the site (modeled on Jake's). Not live yet; it takes over after bestseller." },
      { who: "Joshua", text: "AI outreach queue built: Jeff's first-degree LinkedIn connections not already in Tier 1 or 2. 15-20 DMs a day starting Nov 17, running until the list is done." },
    ],
  },
  {
    tag: "1 week out",
    dates: "Nov 10 - 16",
    theme: "Countdown",
    items: [
      { who: "Emma", text: "Categories get set ~Nov 10 using BIB's software. Nobody touches categories after that." },
      { who: "Scheduled", text: "Email #3 (Nov 10): 'One week. If you've been struggling with X, this book is for you.' Three struggles, three chapters." },
      { who: "Jeff", text: "LinkedIn daily-ish: countdown graphic, the journey recap (eight ventures, the July 3rd call, the ice closet), one story from the book, launch party mention." },
      { who: "Jeff", text: "Nov 14-15: hand-picked 3-5 friends buy the ebook. This starts Amazon's category processing so the categories show on launch day (Kindle can lag 48 hours). 2-3 of them leave a review Nov 15-16." },
      { who: "Scheduled", text: "Email #4 (Nov 16): 'Tomorrow is the day.' Launch team gets the reminder version: hold off buying until the link hits your inbox in the morning." },
      { who: "Jeff", text: "Nov 16 evening: Tier 1 texts queued. Personal, from Jeff's phone. 'Book's live tomorrow morning. Here's what I need from you.'" },
    ],
  },
];

const launchWeek = [
  { day: "Tue Nov 17", title: "Launch day", items: ["6am PT: Email #5 to the full list. 'It's live. $0.99.' Ebook link first, paperback second.", "Launch team email with the link, the review link, and the graphics pack.", "Jeff sends every Tier 1 text personally through the morning. Buy both, review, post.", "Tier 2 message goes out: WhatsApp group, LinkedIn engagers, clients. Gentle: 'It's $0.99 this week if you'd like to support.'", "LinkedIn: 'The book is live.' Photo of Jeff with it, not a screenshot.", "AI starts the Tier 3 DM queue, 15-20 a day.", "Featured article goes live (BIB PR). Billboard airs if we picked today."] },
  { day: "Wed Nov 18", title: "Day two", items: ["Email #6: 'Gift it for $0.99.' Buy one for a founder you know.", "LinkedIn: reshare everyone posting about the book. Reply to every comment.", "Review nudge to launch team: 'If you bought yesterday, the review takes 60 seconds. Samples at the link.'", "Watch rankings. Emma is screenshotting."] },
  { day: "Thu Nov 19 - Fri Nov 20", title: "The push", items: ["Bestseller update post the moment we hit #1 anywhere. Screenshot, gratitude, and 'if you haven't grabbed it yet, it's still $0.99.'", "Email #7: 'We did it' (or 'We're #3 and so close, can you grab it and leave a review?' if we haven't).", "Tier 1 review follow-up, one by one. People say yes and don't do it; the follow-up is the whole game on reviews."] },
  { day: "Sat Nov 21 - Thu Nov 26", title: "Close the window", items: ["Daily LinkedIn touch through Thanksgiving: rankings, reader posts, a gratitude video.", "Email #8 (Nov 23 or 24): 'Last chance at $0.99' + thank you.", "Once bestseller is confirmed and screenshotted: price back to normal, bio updated, and every link switches from Amazon to the free + shipping page.", "Review count check Nov 26. If under 25, the AI runs a second follow-up pass on everyone who bought."] },
];

const contentTypes = [
  {
    name: "Milestone",
    what: "The journey. Gets people invested in the book's progress.",
    examples: ["I wrote a book, here's the date", "Cover reveal", "Unboxing the author copies", "One month out / one week out", "It's live", "We hit #1"],
  },
  {
    name: "Educational",
    what: "Teaching from the book. Mostly the posts Jeff already does, with one added line.",
    examples: ["Why I wrote it", "3 things you'll learn", "3 problems it solves", "A framework (M.A.P., Stage-Gate, Life Stages)", "A story from the book (July 3rd call, the $1M spoilage bill, the beet juice forklift)", "'I go deeper on this in Chapter 14'"],
  },
  {
    name: "Promo",
    what: "Direct asks. Sparse before launch, daily during it.",
    examples: ["Get insider access (opt-in)", "Comment BOOK to join the launch team", "Mark your calendars", "Buy the book, $0.99 this week", "Leave a review", "Post-launch: get the book free + the three kits"],
  },
];

const tiers = [
  {
    key: "tier1",
    name: "Tier 1",
    who: "Ride or dies",
    size: "50-100 people",
    desc: "Family, close friends, people who buy the day Jeff asks. Former partners, co-founders, board members, the Suja crew, longtime clients.",
    ask: "Buy the ebook and the paperback on Nov 17. Leave a review that week. Post about it. Told directly, no softening.",
    channel: "Personal text or call from Jeff",
    owner: "Jeff builds the list, sends the texts. Joshua drafts the message and runs follow-up.",
  },
  {
    key: "tier2",
    name: "Tier 2",
    who: "Friends of the work",
    size: "Hundreds",
    desc: "Founders Club WhatsApp (350+), coaching and membership clients, LinkedIn people who like and comment between now and launch, workshop attendees, the email list.",
    ask: "'My new book just came out. I know you were excited about it. It's $0.99 this week if you'd like to support.' Ebook link only; they'll buy the paperback on their own if they want it.",
    channel: "WhatsApp, LinkedIn DM, email",
    owner: "AI builds the list from LinkedIn engagement. Jeff posts in the WhatsApp group. Joshua sends the rest.",
  },
  {
    key: "tier3",
    name: "Tier 3",
    who: "The long tail",
    size: "Everyone else",
    desc: "First-degree LinkedIn connections Jeff doesn't talk to, old contacts, people who follow him but never engage.",
    ask: "'My new book came out. Here's what it's about. Here's the link.' No relationship pretense, no follow-up if they don't respond.",
    channel: "LinkedIn DM, 15-20 a day (the flag threshold)",
    owner: "AI runs it from Nov 17 until the list is exhausted. Link switches to free + shipping once bestseller is confirmed.",
  },
];

const champions = [
  {
    name: "Jay Shetty",
    why: "Wrote the foreword. One of the largest podcasts in the world.",
    asks: ["Podcast episode (post-launch; every listener goes to free + shipping, not Amazon)", "Story share on launch of the free book + kits, with an asset we make: his foreword quote, his photo, the cover", "Nothing on the Amazon $0.99 week"],
  },
  {
    name: "Kim Perell",
    why: "Back-cover blurb ('the Yoda of CPG'). 200K+ LinkedIn, founder audience.",
    asks: ["A LinkedIn post with a photo of her and Jeff, her blurb, and a link to the kits page", "Podcast or LinkedIn Live with Jeff", "She'll do it if the ask is specific; we write the draft and hand her the graphic"],
  },
  {
    name: "Mark Rampolla",
    why: "Cover epigraph. ZICO founder, author, runs his own founder community.",
    asks: ["LinkedIn post + share to his community, pointed at free + shipping", "Podcast swap", "Intro to event hosts where he speaks"],
  },
  {
    name: "Seth Goldman",
    why: "Back-cover blurb. Honest Tea founder, deeply respected in the category.",
    asks: ["LinkedIn post with his blurb (asset provided)", "Intro to events and organizations where he speaks; bulk order for swag bags at a bulk rate"],
  },
  {
    name: "John Foraker",
    why: "Back-cover blurb. Once Upon a Farm CEO, former Annie's CEO.",
    asks: ["LinkedIn post with his blurb (asset provided)", "Events and industry groups: introduce Jeff to the host, or buy books for the room"],
  },
];

const championPlays = [
  { play: "Create the asset, don't ask them to", body: "For each champion: a graphic with their quote, their face, the cover, and the link. They can post it or write their own. We control the narrative either way." },
  { play: "Podcast over post", body: "One podcast appearance with a real audience beats ten shares. Every listener lands on the free book page and we own the data." },
  { play: "Events and bulk", body: "These people speak to Jeff's exact audience all year. Ask for the intro to the event host: Jeff speaks, or the organizer buys books for every swag bag at a bulk rate." },
  { play: "The bulk buy on their behalf", body: "A champion buys 100-250 copies; we give them to the community 'on behalf of' them. They get the goodwill, we get the reach." },
  { play: "The framing when they ask about the big campaign", body: "'We did a friends-and-family launch on Amazon to get it rolling. The book is really a revenue engine for the business; we're focused on the free book funnel and the kits.' Otherwise they'll ask for pre-order links and it gets overwhelming fast." },
];

const reviews = [
  { title: "The one-pager", body: "A page at /cpt-reviews with the direct Amazon review link and 3-5 sample reviews written the way we'd want them. 'Make one of these your own or write your own; here's what's worked.' Tier 1 and the launch team get it on launch day." },
  { title: "Pre-launch seed", body: "2-3 friends review Nov 15-16 so the page isn't empty on launch morning. They need to have bought (the hand-picked ebook buyers)." },
  { title: "Follow-up is the whole game", body: "People say yes and don't do it. The AI follows up with every launch team member and Tier 1 buyer at day 3, day 7, and day 14. Friction, not intent, is why review counts stall." },
  { title: "What a review can say", body: "Launch team members won't have read it. A 1-2 sentence review about what they expect from the book or from Jeff as an operator is legitimate and what BIB recommends." },
];

const phase3 = [
  { title: "Free + shipping funnel", body: "cpgfoundersgroup.com/free-book, rebuilt natively from Jake's ClickFunnels version. Book is free, they pay shipping. Order bump at $17-47. Upsell 1 at $97. Upsell 2 at $197-297 (MBA for CPG, normally $997, offered at a launch discount). Then book a call. This becomes the top of funnel for everything." },
  { title: "Free digital funnel", body: "cpgfoundersgroup.com/free-digital-book. Opt in, get the PDF. For people who won't pay shipping or give an address yet. Both funnels run at once." },
  { title: "Champions go live", body: "The week after Thanksgiving. Assets in hand, one specific ask each, all pointed at the free book." },
  { title: "Podcast tour", body: "25 shows minimum, 50 is the stretch (Launch Vault has the tracker). Warm paths through champions first. Every episode: free book link, not Amazon." },
  { title: "Speaking and events", body: "25 targets. Bulk orders for swag bags at a bulk rate. Launch Vault has a BIB-researched list of 60+ speaker bureaus; that's a 2027 play." },
  { title: "Awards", body: "Axiom Business Book Awards (deadline Jan 28, 2027, $89 if entered by Sep 16 has passed; $99 final). Stevie Awards early bird Nov 18 and Dec 17. 'Award-winning' is useful cover copy for the second printing." },
  { title: "Weekly book content forever", body: "One post a week about the book after launch: a review, a reader photo, a story, a result. The book keeps selling the business." },
];

const decisions = [
  { q: "Launch party: launch week or December?", note: "Emma recommends launch week (room full of buyers helps rankings). Jeff's call on venue and whether Linda's birthday timing matters." },
  { q: "Billboard date", note: "Recommend Nov 17 so it's launch-day content. Form asks us to choose." },
  { q: "Paperback and hardcover pricing", note: "Paperback likely $15.99-19.99. Hardcover premium. Ebook $0.99 launch week, then normal. Confirm with Emma at setup." },
  { q: "The bestseller credential in the bio", note: "Per Jake: once we hit it, the bio says 'bestselling author', not 'Amazon bestselling author', and never stacks it with the earlier NYT line. Confirm with Jeff how he wants the earlier credential handled." },
  { q: "Giveaway", note: "Jake floated '100 free copies' as a promo post. Cheap with author-copy pricing, strong for engagement. Decide by 3 weeks out." },
];

const assets = [
  { label: "BIB launch folder (all assets)", href: "https://drive.google.com/drive/folders/1ee0SEomLUItbOUn356_tgZELjTRRJnse" },
  { label: "Launch Vault (BIB master sheet: contacts, podcasts, events, bureaus, awards)", href: "https://docs.google.com/spreadsheets/d/15zde17sJVAbEXbJkHmZHSuIsqzq8E3vy9n0Ljf8OOXg/edit" },
  { label: "Email templates for launch week", href: "https://docs.google.com/document/d/1plLpUq9bW85FqYqtTiTkAxPdBkZbUv80XIurnGsqtCs/edit" },
  { label: "8-week social media countdown", href: "https://docs.google.com/spreadsheets/d/1cEooKEfuHww8KejpGN3Df0M6IdsRU0x4wI6NFCpDZQc/edit" },
  { label: "Social media gameplan ideas", href: "https://docs.google.com/document/d/1cdNOCAzQk9AqAz3HrLYi8dxWzpK5tJMlJodgjAtKDag/edit" },
  { label: "Launch team strategy overview", href: "https://docs.google.com/document/d/1OZM24hNjtANLIY-OPQc5lBRHCIrMWk9_lAMI1E9Aqiw/edit" },
  { label: "Featured article form (Airtable)", href: "https://airtable.com/appaKM1oF2hMMBpbo/pag4eCnU8spLoA7go/form" },
  { label: "Billboard form (Airtable)", href: "https://airtable.com/appaKM1oF2hMMBpbo/pagysOdGm7GAlzJjO/form" },
  { label: "Jake's free + shipping funnel (the model)", href: "https://go.bigideatobestseller.com/free-book" },
  { label: "Jake's free digital funnel (the model)", href: "https://www.bigideatobestseller.com/free-digital-book" },
  { label: "Book page / insider opt-in", href: "/book" },
  { label: "The three kits (book door)", href: "/toolbox" },
];

function daysToLaunch() {
  const now = new Date();
  return Math.max(0, Math.ceil((LAUNCH.getTime() - now.getTime()) / 86_400_000));
}

function Who({ who }: { who: string }) {
  return (
    <span className="inline-block flex-shrink-0 rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-accent-dark">
      {who}
    </span>
  );
}

export default function LaunchPlanPage() {
  const days = daysToLaunch();

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
            Internal &mdash; Jeff + Joshua only
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            The Cold-Pressed Truth launch plan
          </h1>
          <p className="mt-4 text-xl text-gold font-semibold">
            Tuesday, November 17, 2026 &middot; {days} days out
          </p>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-3xl">
            Three phases. Build the lists now. Run the Amazon bestseller push Nov 17 through
            Thanksgiving. Then flip every link to the free-book funnel and let the champions,
            podcasts, and events turn the book into the front door of the business.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {goals.map((g) => (
              <div key={g.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-3xl font-bold text-gold">{g.n}</div>
                <div className="mt-1 text-sm font-semibold text-white">{g.label}</div>
                <div className="mt-2 text-xs text-white/60 leading-relaxed">{g.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== THE RULES ========== */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">The four rules</h2>
        <p className="mt-3 text-muted max-w-3xl">
          This is an unorthodox launch on purpose. It is built for the goals we actually have
          (a bestseller badge in week one, then a lead engine), not for moving 20,000 copies.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {rules.map((r) => (
            <div key={r.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold text-lg leading-snug">{r.title}</h3>
              <p className="mt-3 text-muted leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== TIMELINE ========== */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Phase 1 &middot; Now to Nov 16</h2>
          <p className="mt-3 text-muted max-w-3xl">
            Week by week, anchored to the Tuesday launch. Europe is Oct 16-29, so weeks 5 and 4
            get pre-loaded before you leave. Jake is off grid from about Oct 8 for a week and a
            half; Emma covers.
          </p>
          <div className="mt-10 space-y-8">
            {weeks.map((w) => (
              <div key={w.tag} className="grid gap-4 md:grid-cols-[180px_1fr]">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-accent">{w.tag}</div>
                  <div className="mt-1 font-bold">{w.dates}</div>
                  <div className="text-sm text-muted">{w.theme}</div>
                  {w.flag && (
                    <span className="mt-2 inline-block rounded-full bg-foreground px-2.5 py-0.5 text-xs font-bold text-gold">
                      {w.flag}
                    </span>
                  )}
                </div>
                <ul className="space-y-3 rounded-xl border border-border bg-background p-5">
                  {w.items.map((it) => (
                    <li key={it.text} className="flex gap-3 items-start">
                      <Who who={it.who} />
                      <span className="text-sm leading-relaxed">{it.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LAUNCH WEEK ========== */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Phase 2 &middot; Launch week to Thanksgiving</h2>
        <p className="mt-3 text-muted max-w-3xl">
          Nov 17-26. This is the game: concentrate every sale into the window, hit #1 in a
          category, screenshot it, then get out. Typically it happens in the first 7-14 days.
          If it happens on day two, we switch gears on day two.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {launchWeek.map((d) => (
            <div key={d.day} className="rounded-xl border border-border bg-card p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-accent">{d.day}</div>
              <h3 className="mt-1 font-bold text-lg">{d.title}</h3>
              <ul className="mt-4 space-y-2">
                {d.items.map((it) => (
                  <li key={it} className="flex gap-2 text-sm leading-relaxed">
                    <span className="text-accent mt-1">&#9656;</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ========== THE LISTS ========== */}
      <section className="bg-foreground text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">The lists</h2>
          <p className="mt-3 text-white/70 max-w-3xl">
            This is the simplified Launch Vault. Three tiers of buyers for the Amazon week, and a
            fourth group, the champions, who we deliberately hold back until after. Jeff&rsquo;s
            job between now and Oct 12 is names. Everything else is on Joshua and the AI.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {tiers.map((t) => (
              <div key={t.name} className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col">
                <div className="text-xs font-bold uppercase tracking-wider text-gold">{t.name}</div>
                <h3 className="mt-1 text-xl font-bold">{t.who}</h3>
                <div className="text-sm text-white/60">{t.size}</div>
                <p className="mt-4 text-sm text-white/80 leading-relaxed">{t.desc}</p>
                <div className="mt-4 text-xs font-bold uppercase tracking-wider text-white/50">The ask</div>
                <p className="mt-1 text-sm text-white/80 leading-relaxed">{t.ask}</p>
                <div className="mt-4 text-xs font-bold uppercase tracking-wider text-white/50">Channel</div>
                <p className="mt-1 text-sm text-white/80">{t.channel}</p>
                <div className="mt-4 text-xs font-bold uppercase tracking-wider text-white/50">Owner</div>
                <p className="mt-1 text-sm text-white/80 leading-relaxed">{t.owner}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold">Champions &middot; after the Amazon week</h3>
            <p className="mt-2 text-white/70 max-w-3xl">
              The back cover and the foreword. They are the most valuable relationships Jeff has
              for this book, so we don&rsquo;t spend them on a $0.99 sale. Each one gets one
              specific ask, an asset we made for them, and a link to the free book.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {champions.map((c) => (
                <div key={c.name} className="rounded-xl border border-gold/30 bg-white/5 p-5">
                  <h4 className="font-bold text-lg text-gold">{c.name}</h4>
                  <p className="mt-1 text-sm text-white/60">{c.why}</p>
                  <ul className="mt-3 space-y-1.5">
                    {c.asks.map((a) => (
                      <li key={a} className="flex gap-2 text-sm text-white/85 leading-relaxed">
                        <span className="text-gold">&#9656;</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {championPlays.map((p) => (
                <div key={p.play} className="rounded-xl border border-white/10 p-5">
                  <div className="font-bold">{p.play}</div>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== JEFF'S LIST (interactive) ========== */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Jeff&rsquo;s list</h2>
        <p className="mt-3 text-muted max-w-3xl">
          Type names straight in here. It saves in this browser as you go, and the export button
          gives Joshua a CSV to load into the outreach queue. Name and how to reach them is
          enough; the AI fills in the rest.
        </p>
        <LaunchList />
      </section>

      {/* ========== CONTENT ========== */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Content on LinkedIn</h2>
          <p className="mt-3 text-muted max-w-3xl">
            Jeff&rsquo;s cadence is already four posts a week (Mon framework, Tue/Thu Fatal Flaws,
            Fri community). The book takes one slot a week through Oct 19, two a week from Oct
            20, and every day during launch week. The educational posts don&rsquo;t change; they
            get one added sentence pointing at the chapter.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {contentTypes.map((c) => (
              <div key={c.name} className="rounded-xl border border-border bg-background p-6">
                <h3 className="font-bold text-lg">{c.name}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{c.what}</p>
                <ul className="mt-4 space-y-1.5">
                  {c.examples.map((e) => (
                    <li key={e} className="flex gap-2 text-sm">
                      <span className="text-accent">&#9656;</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-accent/30 bg-accent-light p-6">
            <div className="font-bold">Every book post before Nov 17 ends the same way</div>
            <p className="mt-2 text-sm leading-relaxed">
              &ldquo;Want insider access before it comes out? Put your name at the link and
              you&rsquo;ll be first to know, plus the founder resources from the book.&rdquo;
              That link is <Link href="/book" className="font-semibold underline">/book</Link>.
              Everyone who likes or comments gets added to Tier 2 by the AI. No Amazon link,
              anywhere, until launch morning.
            </p>
          </div>
        </div>
      </section>

      {/* ========== REVIEWS ========== */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Reviews</h2>
        <p className="mt-3 text-muted max-w-3xl">
          Jake&rsquo;s honest take: for Jeff, reviews matter more than the bestseller badge. The
          badge is a week-one moment. Review count is what a stranger sees on the page for years.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <div key={r.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold text-lg">{r.title}</h3>
              <p className="mt-2 text-muted leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== PHASE 3 ========== */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Phase 3 &middot; After bestseller</h2>
          <p className="mt-3 text-muted max-w-3xl">
            The moment the screenshot exists, the Amazon campaign is over and the book becomes
            the top of the funnel. Jake&rsquo;s framing: we&rsquo;re not running a New York Times
            campaign, we&rsquo;re running a million-dollar book campaign. Pick the revenue number
            and use the network for that.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {phase3.map((p) => (
              <div key={p.title} className="rounded-xl border border-border bg-background p-6">
                <h3 className="font-bold text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DECISIONS + ASSETS ========== */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Open decisions for Jeff</h2>
            <ul className="mt-6 space-y-4">
              {decisions.map((d) => (
                <li key={d.q} className="rounded-xl border border-border bg-card p-5">
                  <div className="font-bold">{d.q}</div>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{d.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Assets and links</h2>
            <ul className="mt-6 space-y-2">
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
            <div className="mt-8 rounded-xl border border-border bg-card p-5 text-sm text-muted leading-relaxed">
              <div className="font-bold text-foreground">Publishing status</div>
              Manuscript locked and approved Sep 25. Cover with BIB. KDP and IngramSpark accounts
              set up and verified; Emma uploading. ISBNs: paperback 978-1-968164-59-1, ebook
              978-1-968164-60-7, hardcover 978-1-968164-62-1. Next: approval email, then author
              copies.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
