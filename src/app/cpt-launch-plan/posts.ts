// LinkedIn drafts for the book run, in Jeff's voice (calibrated: story
// openers, flowing sentences, parentheticals, single exclamation marks, no
// wrap-up lesson, link in the body). Facts checked against
// src/content/knowledge/storybank.md and cpt-00-book-facts.md.
//
// The Tue/Thu Fatal Flaws queue keeps running untouched. These take Mon and
// Fri, then daily during launch week. All at 10:00 AM PT.

export type Post = {
  date: string; // "Mon Oct 12"
  iso: string; // for ordering / status
  type: "Milestone" | "Promo" | "Educational";
  title: string;
  slot: string; // what it replaces or where it sits
  needs?: string; // asset or decision required before it can go out
  check?: string; // facts for Jeff to confirm
  body: string;
};

export const posts: Post[] = [
  {
    date: "Mon Oct 12",
    iso: "2026-10-12",
    type: "Milestone",
    title: "I wrote a book",
    slot: "Takes the Monday slot. Tue/Thu Fatal Flaws run as scheduled.",
    needs: "/book insider page updated to 'Out November 17' before this goes live.",
    body: `I wrote a book.

It's called The Cold-Pressed Truth, and it comes out on November 17.

I want to tell you why, because for a long time I didn't think I had any business writing one. I'm an operator, not an author. But a few years ago I was climbing Kilimanjaro with my kids, and somewhere around day three the local guides started calling me Babu. It's Swahili for grandpa. Partly for my pace (slow), and partly because I couldn't stop handing out advice on the trail.

Somewhere between that mountain and the boardroom it hit me that this is the role I've been playing for 30 years. The guy walking alongside you, pointing out what's ahead while being honest about what's behind.

So that's what the book is. Eight ventures, five home runs, three strikeouts. Building Suja from an ice closet to $100 million in six years, and the July 3rd phone call when Coca-Cola decided not to buy the rest of it. The frameworks I actually used, and the mistakes I'd pay a lot of money to take back.

It's the book I wish someone had handed me before my first startup.

If you want to be the first to know when it's out (plus the founder tools that come with it), put your name here: cpgfoundersgroup.com/book

More soon!`,
  },
  {
    date: "Mon Oct 19",
    iso: "2026-10-19",
    type: "Milestone",
    title: "Cover reveal, one month out",
    slot: "Monday slot. Pre-schedule before Europe (wheels up Oct 16).",
    needs: "Final cover from BIB. If it isn't locked by Oct 15, run the 'One month from tomorrow' version without the image and reveal the cover Mon Oct 26.",
    check: "Confirm Jeff is comfortable naming all five blurb writers publicly before the book is out.",
    body: `Here it is.

One month from tomorrow, The Cold-Pressed Truth is out in the world, and today I get to show you the cover for the first time.

I'll be honest, I stared at this thing for a long time. Linda stared at it longer. (She had opinions, and most of them were right.)

The title comes from the juice, obviously, but it's really about the kind of truth I try to give founders. No hype, no sugar, nothing added. Just what actually happened and what I'd do differently.

Jay Shetty wrote the foreword. Kim Perell, Mark Rampolla, Seth Goldman and John Foraker were kind enough to read it early and put their names on the back. I'm still a little in disbelief about that list.

So, what do you think? I read every comment, and I'd love to know which part of the cover grabbed you first.

Insider access (and the founder tools from the book) is here: cpgfoundersgroup.com/book`,
  },
  {
    date: "Fri Oct 23",
    iso: "2026-10-23",
    type: "Promo",
    title: "Launch team: comment BOOK",
    slot: "Friday slot. The Timestamp WhatsApp promo (still waiting on its image) moves to Fri Oct 30.",
    needs: "The AI DM reply ready: PDF arrives ~Nov 2, kits link, launch-day instructions. Launch team email #1 goes to the full list Tue Oct 20, so this is the LinkedIn version of the same ask.",
    body: `Okay folks, I need some help.

The Cold-Pressed Truth comes out in less than four weeks, and I'm putting together a launch team. It's a small group of people who get the book before anyone else and help me get it off the ground that first week.

Here's the deal. You get the full book as a PDF two weeks before it comes out, plus the three founder kits I built to go with it (the Fundraising Kit, the Profitability Kit and the Starting Line Kit). In return, I'm asking for three things on launch day: grab the ebook (it'll be 99 cents that week), leave an honest review, and share it with one founder who needs it.

That's it. No pitch, no upsell. Just a favor from a guy who has asked a lot of favors in his life and is grateful for every one of them.

If you're in, comment BOOK below and I'll send you the details.

Thank you. I mean that.`,
  },
  {
    date: "Mon Oct 26",
    iso: "2026-10-26",
    type: "Educational",
    title: "The three problems the book solves",
    slot: "Monday slot. Pre-scheduled; Jeff is in Europe.",
    check: "'Faster than KIND, Honest Tea, and ZICO' is from the jacket copy. 'What's a cat man' is Ch. 12. 'Never financed from weakness' is in the quote bank.",
    body: `Here's something I tell every founder I work with. Most brands don't die from one big mistake. They die from three small ones that compound.

I wrote The Cold-Pressed Truth around the three I see most often.

The first is confusing growth with strength. Suja went from zero to $100 million in six years, faster than KIND, Honest Tea or ZICO, and we still had weeks with less than $100,000 in the bank. Growth doesn't create strength. It reveals whether you ever had it.

The second is getting on the shelf and thinking the job is done. Shelf space is rented every week, and velocity is your rent payment. Chapter 12 is the whole fight for the shelf, including the day I asked my head of sales "what's a cat man?" in front of the entire team.

The third is raising money from a position of weakness. I have never successfully sold or financed a company from that spot. Not once. Chapter 7 is how to make sure you never have to.

If you've been living inside one of these, the book is for you. It's out November 17, and you can get first access (plus the founder tools from it) here: cpgfoundersgroup.com/book`,
  },
  {
    date: "Mon Nov 2",
    iso: "2026-11-02",
    type: "Milestone",
    title: "Holding it for the first time (unboxing)",
    slot: "Monday slot. Hardcover author copies land Fri Oct 30; Jeff is back Oct 29.",
    needs: "The unboxing video. Phone, kitchen, Linda filming. One take, do not polish it. Highest-engagement post of the run.",
    check: "The two brothers story is Ch. 19. Confirm Jeff wants it in public before the book is out.",
    body: `I held my book for the first time on Friday.

Thirty years of building companies, and I was not ready for how that felt. Linda filmed it (of course she did), and I'm sharing it because I want you to see the part of this that isn't a strategy or a framework. It's just a guy opening a box in his kitchen.

I keep thinking about two brothers who have both invested in my companies over the years. One of them has only ever invested in the winners. The other has only ever invested in the losers. Same deals on the table, different timing. A lot of this book exists because of the second brother, and the traps I wish I'd seen coming for him.

Anyway. It's real now. November 17.

If you want to be on the launch team and get it early, there's still room: comment BOOK and I'll send you the details.`,
  },
  {
    date: "Fri Nov 6",
    iso: "2026-11-06",
    type: "Promo",
    title: "The foreword, and last call for the launch team",
    slot: "Friday slot. Pairs with launch team email #2 (last chance) that week.",
    needs: "Quote card graphic: Jay's line, his photo, the cover.",
    check: "Foreword quote is verbatim from cpt-00-book-facts. 'During a period of growth and change' is how Jay describes meeting Jeff in the foreword.",
    body: `True story. A few years ago Jay Shetty's team brought me in during a period of real growth and change for them, and we ended up spending a lot of time together.

When I finished the manuscript, I sent it to him with no expectations. He wrote the foreword.

One line from it has stuck with me: "In a world that often glorifies hype, noise, and overnight success, Jeff Church has chosen a different path."

I'm not sure I chose it so much as got dragged down it (the ice closet, the beet juice all over the loading dock, the July 3rd phone call). But I'll take it.

The Cold-Pressed Truth comes out a week from Tuesday. Last call for the launch team: comment BOOK and I'll get you the early copy and the kits this weekend.`,
  },
  {
    date: "Mon Nov 9",
    iso: "2026-11-09",
    type: "Promo",
    title: "Mark your calendars",
    slot: "Monday slot. Email #3 ('One week') goes Nov 10.",
    needs: "Countdown graphic (square). Kim's 'Yoda of CPG' quote card can run as the image.",
    body: `Mark your calendars. Tuesday, November 17.

That's the day The Cold-Pressed Truth goes live, and I'm going to ask for one thing that day. Just one. Grab the ebook. It'll be 99 cents for launch week, which is less than the kale in a bottle of Green Supreme.

Why 99 cents? Because the thing I actually want is for this book to get into the hands of as many founders as possible in the first week, and the way Amazon works, that first week decides whether anyone finds it afterwards.

Here's what's in it, in case you're new here. Eight ventures. Building Suja from an ice closet to $100 million in six years, selling to Coca-Cola, and the day they decided not to buy the rest. The frameworks I used (M.A.P., Stage-Gate, the Life Stages of a Brand) and the mistakes that cost real money. Kim Perell called me the Yoda of CPG on the back cover, which my kids find hilarious.

November 17. I'll see you there.`,
  },
  {
    date: "Fri Nov 13",
    iso: "2026-11-13",
    type: "Milestone",
    title: "The journey recap",
    slot: "Friday slot. The 'recap the journey' post from BIB's calendar.",
    check: "This one mentions rehab (Ch. 19). The storybank rule is never as a hook, only with the substance around it. It's in the middle here with context, but it is Jeff's call whether it stays. Easy to cut the sentence without losing the post.",
    body: `I want to tell you how this book actually started, because it wasn't at a desk.

It was at 2 a.m. when I was 38, flipping channels after our third child was born. I landed on a show where retired CEOs were being asked what they'd change. Every single one of them said the same thing. Bolder. More chances. Fulfillment over safety.

I'd been replaying a moment from senior year football for twenty years at that point. Wide open in the end zone, seconds left, and I didn't raise my hand because I was afraid of dropping it. We lost. At 38 I realized I was far more afraid of mediocrity than of failure, and I left the safe track.

What followed was eight companies, $212 million raised, nearly $700 million returned to investors, five home runs and three strikeouts. Suja. Coca-Cola. A month in rehab after I left, because I'd spent eight years running a better-for-you brand while running myself into the ground.

I put all of it in The Cold-Pressed Truth. The wins and the wipeouts get equal time, because that's the only version that would have helped me.

It's out Tuesday. 99 cents for launch week. I'll post the link the morning of.`,
  },
  {
    date: "Mon Nov 16",
    iso: "2026-11-16",
    type: "Milestone",
    title: "Tomorrow",
    slot: "Monday slot. Tier 1 texts go out from Jeff's phone this evening.",
    check: "Beet juice forklift was Suja's first Whole Foods DC delivery (Ch. 8), so '14 years ago' assumes 2012. Confirm the year.",
    body: `Tomorrow.

Fourteen years ago I was standing on a loading dock with beet juice running down my pants because I'd sliced open a pallet with a forklift I had no business driving. Tomorrow morning I'm an author. I'm not sure which one I'm prouder of.

The Cold-Pressed Truth goes live on Amazon tomorrow. 99 cents for the ebook all week. I'll post the link right here the moment it's up.

If you're on the launch team, check your inbox in the morning. If you're not, no problem, the link is coming to everyone.

Thank you for following along with this. Let's go!`,
  },
  {
    date: "Tue Nov 17",
    iso: "2026-11-17",
    type: "Milestone",
    title: "It's live",
    slot: "Replaces FF #1 ($100M exit that paid $5M) on Nov 17. FF #1 slides to Tue Nov 24 and the Aug-Oct batch resumes Dec 1.",
    needs: "Photo of Jeff holding the book (not a screenshot). The Amazon ebook link, pasted in the body the moment it's live.",
    body: `It's live.

The Cold-Pressed Truth is out today, and I'm sitting here holding it (Linda took the photo, I'm aware of the face I'm making).

Here's the ask. The ebook is 99 cents today through the end of the week. If you've ever gotten anything useful from one of my posts, grab it, and if you can, leave an honest review once you've read a chapter or two. That's the whole thing. Reviews are what let a stranger find this book two years from now.

[AMAZON LINK]

Thirty years of lessons, eight companies, every mistake I could remember and a few I'd rather not. It's the book I wish someone had handed me before my first startup. I hope it saves you a few of the detours I took.

Thank you for being here for this!`,
  },
  {
    date: "Wed Nov 18",
    iso: "2026-11-18",
    type: "Promo",
    title: "Day two: gift it",
    slot: "Extra slot, launch week only. Email #6 ('Gift it') goes the same morning.",
    check: "Swap the second paragraph for a real message Jeff got on launch day. Don't invent one.",
    body: `Day two, and I want to say thank you.

Yesterday was one of the better days I've had in a while. Not because of the rankings (although my publishing team keeps sending me screenshots), but because of the messages. Founders I haven't talked to in years. People from the Suja days. [Swap in one real one here.]

One idea if you've already grabbed it. For 99 cents, this is the easiest gift you'll give all year to the founder in your life who is in the middle of it right now. The one who's raising, or fighting for shelf space, or staring at a cash gap. Send it to them.

Still 99 cents all week: [AMAZON LINK]

And if you've read a chapter or two, a quick honest review helps more than you'd think.`,
  },
  {
    date: "The day we hit #1",
    iso: "2026-11-19",
    type: "Milestone",
    title: "We hit #1",
    slot: "Goes out the moment Emma's screenshot lands, whatever day that is. If it's a Thursday, Park City slides a week.",
    needs: "The ranking screenshot. Fill in the category and the end date of the $0.99 window.",
    body: `We did it.

As of this morning, The Cold-Pressed Truth is the #1 [CATEGORY] book on Amazon. I've started eight companies and I've never once been number one on a list, so forgive me for the screenshot.

This happened because a few hundred people bought a 99 cent book on the same day because I asked them to. That is the whole strategy. There's no trick to it. Friends, Founders Club members, old colleagues, clients, and a surprising number of people I've never met.

Thank you. I'm going to be saying that a lot this week.

If you haven't grabbed it yet, it's still 99 cents through [DATE]: [AMAZON LINK]

And if you have, the thing that matters most now is a review. Thirty seconds, honest, whatever you actually thought.`,
  },
];

// One sentence added to the end of the Tue/Thu Fatal Flaws posts that are
// already in the queue. The posts themselves don't change. Chapter numbers
// are from the printed table of contents; the mapping is a best read of
// which chapter each story lives in and Jeff should confirm.
export const chapterLines: { date: string; post: string; chapter: string; line: string }[] = [
  { date: "Tue Oct 13", post: "FF #8: I kept missing my numbers at the board meeting", chapter: "Ch. 7 Fundraising + Appendix A", line: "I go deeper on this in Chapter 7 of The Cold-Pressed Truth, out Nov 17. First access at cpgfoundersgroup.com/book" },
  { date: "Thu Oct 15", post: "FF #6: The dinner test", chapter: "Ch. 8 Culture and People", line: "There's a whole chapter on this (Chapter 8) in my book, out November 17." },
  { date: "Tue Oct 20", post: "FF #12: Do you own your formula?", chapter: "Ch. 2 or 3 Pre-Launch", line: "This is one of the pre-launch checks in Chapter 3 of The Cold-Pressed Truth. Out Nov 17, first access at cpgfoundersgroup.com/book" },
  { date: "Thu Oct 22", post: "FF #9: In a year everybody's will taste just as good", chapter: "Ch. 12 Battle of the Shelf / Ch. 13 Innovation", line: "Chapter 13 of the book is about exactly this. November 17." },
  { date: "Tue Oct 27", post: "FF #11: The cash gap, 5 days at a time", chapter: "Ch. 7 Fundraising", line: "Chapter 7 of The Cold-Pressed Truth walks through the cash gap in detail. Out Nov 17, first access at cpgfoundersgroup.com/book" },
  { date: "Thu Oct 29", post: "FF #4: They kind of had amnesia", chapter: "Ch. 21 Fatal Flaws and Recoverable Mistakes", line: "It made the list in Chapter 21 of my book. Three weeks until it's out." },
  { date: "Tue Nov 3", post: "FF #2: The phone call to Coke", chapter: "Ch. 14 / 16 Coca-Cola", line: "The whole Coca-Cola story is Chapters 14 through 16 of The Cold-Pressed Truth. Two weeks. Launch team is still open at cpgfoundersgroup.com/book" },
  { date: "Thu Nov 5", post: "FF #10: The $10 green juice", chapter: "Ch. 6 Life Stages of a Brand", line: "Chapter 6 of the book is the full Suja pricing story. Twelve days." },
  { date: "Tue Nov 10", post: "FF #7: Months 10 to 18", chapter: "Ch. 7 Fundraising", line: "One week until The Cold-Pressed Truth is out. Chapter 7 is this post, times ten." },
  { date: "Thu Nov 12", post: "FF #13: Peel the onion", chapter: "Ch. 20 Babu's Field Guide", line: "Five days. Chapter 20 is the full field guide." },
];
