# New Contact Nurture Sequence — REBUILD
## CPG Founders Group | 9 emails over 30 days

Replaces `Nurture Email Sequence - Part 2.md`. Drafted 2026-08-11.

**From:** Jeff Church · **Reply-to:** Jeff's real inbox (email 3 depends on it)

---

## Wiring

| | |
|---|---|
| **Entry** | Any resource-download tag · `General Newsletter Sub` · `WhatsApp Group` · `CPT Book Waitlist` |
| **Blocked from entry** | `Existing Contact To Nurture` (they get the 8-week re-engagement instead) · `Nurture Complete` |
| **On completion** | Apply `Nurture Complete` → weekly newsletter segment |

### Suppression rules (none of these exist today — all need building)

| Trigger | Action |
|---|---|
| Submits `/apply` | **Exit sequence immediately.** Route to hot-lead flow. Nobody who raised their hand keeps getting nurtured. |
| Buys MBA for CPG | Skip email 6 |
| Starts Babu trial or pays | Skip email 4 |
| Has `WhatsApp Group` tag | Skip email 5 |
| Has `CPT Book Waitlist` tag | Skip email 7 |

### Open dependencies

1. **`Nurture Complete` never fires.** 125 contacts on the old sequence, zero graduates. Fix before launch or this rebuild inherits the same dead end.
2. **Email 7 needs a `/book` page.** The waitlist form currently only lives on `/welcome`, which is written for people who just joined WhatsApp — wrong context for a nurture recipient who isn't in the group. Needs a standalone book page with the same `BookWaitlistForm`.
3. **Someone must flip the `/apply` greenlight off when Jeff fills his 2-3 spots.** Email 9 leans on it.

### Fact guardrails used in this draft

Verified against `cpt-00-book-facts.md`: eight ventures · **$212M raised** · **~$700M returned** · median 3.3x · five home runs, three strikeouts · Suja zero to **$100M in six years** · Harvard Business School · Kilimanjaro/Babu · rehab after Suja · ninth company Proda · Suja Life IPO'd May 2026 on Nasdaq at **north of $700M** and Jeff was declined a seat at the bell.

**Do not use:** "$300 million brand" or "$275M+ across 40+ rounds" — both appear in the old sequence and both conflict with the manuscript.

### The P.S. convention

Every email carries a P.S. teasing something the body did *not* pitch. Never repeat the body's ask in the P.S.

---

# EMAIL 1 — Orientation (Day 1)
**Purpose:** Set expectations, give permission to leave, point at everything free.
**CTA:** `/resources`
**P.S.:** WhatsApp group

**Subject:** `what to expect from me`

Hey {{first_name}},

Quick note so you know what you signed up for.

Over the next month I'm going to send you nine emails. Some are stories from thirty years of building consumer brands — including the ones that went badly, which are usually the useful ones. Some are tools. A couple will mention things I sell, and I'll be obvious about it when I do.

If that's not what you want, unsubscribe. There's a link at the bottom and it won't hurt my feelings. I'm sixty-four and building my ninth company. I've made peace with not being for everyone.

But if you're building something right now, start here:

[The free resource library](https://cpgfoundersgroup.com/resources)

Runway calculator. Unit pricing and break-even model. Trade promo break-even. CPG chart of accounts. SKU rationalization tool. The Suja Lessons Learned and Fatal Flaws white papers. The burn rate workshop and the three-hour fundraising masterclass.

You may have already grabbed one of those. There are nine more sitting next to it.

None of it is a lead magnet with the good part removed. It's the actual stuff — the models I ran, the mistakes I catalogued. Take what's useful.

Talk soon,
Jeff

*P.S. There are 275+ CPG founders in our WhatsApp group answering each other's questions in real time. Nobody sells anything in there. If you want in: [cpgfoundersgroup.com/founders-only](https://cpgfoundersgroup.com/founders-only)*

---

# EMAIL 2 — Three Seconds in the End Zone (Day 4)
**Purpose:** Pure value. No offer. Earn the right to sell later.
**CTA:** Follow on LinkedIn
**P.S.:** Babu

**Subject:** `three seconds that cost me twenty years`

Hey {{first_name}},

Senior year of high school. My team hadn't won a game in two seasons. Seconds left. I'm wide open in the end zone.

And I don't raise my hand.

I was afraid of dropping it. Afraid of being the guy who let everyone down. So I stood there, open, and said nothing. Our quarterback got sacked. We lost.

I replayed those three seconds for twenty years.

Then I'm thirty-eight, third kid just born, flipping channels at two in the morning. I land on a show interviewing retired CEOs. They're asking each one what they'd do differently. Every single one says a version of the same thing: I'd have been bolder. Taken more chances. Chosen fulfillment over safety.

At thirty-eight years old, I was now far more afraid of mediocrity than of failure.

I left the safe track that year.

Here's what I've learned since: courage doesn't eliminate fear. Sometimes it just refuses to let fear make the final decision. I've been scared before every single thing that ever worked. The fear was never the problem. The not raising my hand was the problem.

Most of what you read about founders online is the highlight reel. I'm not interested in that. The lessons that actually protect you come from the parts nobody posts about.

I write more of these on LinkedIn — the real ones, not the polished ones. [Follow me here](http://linkedin.com/in/jeffreydeanchurch) if you want them in your feed.

Talk soon,
Jeff

*P.S. I spent fifteen months building an AI advisor trained on everything I know about CPG. It's called Babu and the first ten days are free: [askbabu.ai](https://www.askbabu.ai)*

---

# EMAIL 3 — I Need Your Help (Day 7)
**Purpose:** Generate replies. Replies protect inbox placement for everything after this. Also tells us what to build.
**CTA:** Reply with three numbers
**P.S.:** Free resources

> **Note:** #11 and #12 below look like two topics each that got merged when the poll was pasted. Split them before sending or the list reads broken.

**Subject:** `one question, three numbers`

Hey {{first_name}},

I need your help with something and it'll take you about fifteen seconds.

I'm planning what to teach over the next few months — workshops, deep dives, the things I actually sit down and build. I'd rather make what you need than guess.

Here's the list. **Hit reply with your top three numbers.** That's it. No form, no survey link, just three numbers.

1. The fatal flaws that kill early CPG brands
2. Getting investor-ready — the raise from first meeting to close
3. Building a CPG-specific P&L that runs your business
4. Killing your burn and buying yourself more runway
5. Your pitch deck, torn apart and rebuilt live
6. Integrating AI systems into your CPG business
7. Walking into a buyer meeting and walking out with a PO
8. Slotting fees, MCBs, and the hidden cost of retail
9. Gross margin architecture — building to 50%
10. Trade spend — what's working vs. what's just burning cash
11. Understanding how buyers actually evaluate your brand
12. Velocity before volume
13. What your competitors are really doing on price
14. Scaling without breaking
15. Building a repeat purchase engine
16. Understanding your consumer
17. Finding the innovation white space nobody has filled yet
18. Building your first sales team without blowing your budget
19. My 25 most significant CPG plays

I read every reply myself. If you want to add a sentence about what you're stuck on, even better — but three numbers is plenty.

Talk soon,
Jeff

*P.S. If you haven't been through the free tools yet, the runway calculator and the break-even model are the two people email me about most: [cpgfoundersgroup.com/resources](https://cpgfoundersgroup.com/resources)*

---

# EMAIL 4 — Babu (Day 11)
**Purpose:** First real offer. Lowest friction thing he sells.
**CTA:** 10-day free trial
**P.S.:** `/apply`

**Subject:** `this isn't ChatGPT for food companies`

Hey {{first_name}},

I spent fifteen months building something I've never seen anyone else build for CPG.

It's called [Babu](https://www.askbabu.ai). It is not a chatbot with an industry skin on it.

Most AI tools are generic. You ask a CPG question, you get a generic answer dressed up in industry buzzwords. I trained Babu on 6,000+ CPG-specific documents — financial models, playbooks, case studies, the MBA for CPG curriculum, everything I've built and collected across thirty-five years and eight companies.

Then I built 40+ specialized tools on top of it. I call them Gurus. Each one does a single job:

- **Brand Positioning Guru** — answer 28 questions, get back a 30-40 page positioning report. Competitor matrix, white space analysis, audience segmentation, messaging hierarchy. Agencies charge $10,000 to $50,000 for this.
- **Investor Pitch Prep Coach** — upload your deck, get ten brutal investor questions back with scoring and coaching. I built it to feel like a buyer who doesn't care about your feelings. You want that before the room, not during it.
- **Fatal Flaw Assessment** — thirty yes/no questions across legal, financial, operational, strategic. It flags the risks that kill companies before the founder knows they're dying.
- **Product Line P&L** — your costs, pricing, channel mix in; unit economics at launch and at scale out, broken out by Amazon, DTC, and brick-and-mortar. One founder told me this alone would have saved a deal he lost because an investor asked about unit economics and he couldn't answer.
- Plus co-man contract review, broker evaluation, multi-channel break-even, quarterly audit tracking, and about thirty more.

There's also a Deep Research mode. Most models research for about sixteen minutes. Mine runs twenty-three. The extra seven aren't about finding more — they're about triangulating what it already found, checking sources, cutting hallucinations. I wanted output you could act on, not output you had to fact-check line by line.

Nothing you put in is shared, scraped, or used for training. That was non-negotiable.

I call it a co-founder in your pocket. It never sleeps, never complains, and it's trained on what I actually know instead of what the internet thinks it knows about CPG.

**First ten days are free.** [Take it for a spin](https://www.askbabu.ai).

Talk soon,
Jeff "Babu" Church

*P.S. Babu is named after me, sort of. My kids' guides started calling me Babu — Swahili for grandpa — on day three of Kilimanjaro, partly for my pace and partly because I wouldn't stop giving unsolicited advice on the trail. My grandkids call me that now. Figured if I'm going to be the old guy handing out advice, I may as well name the AI after it.*

---

# EMAIL 5 — The WhatsApp Group (Day 15)
**Purpose:** Free, high-value, resets goodwill after the first ask.
**CTA:** `/founders-only`
**P.S.:** MBA for CPG

**Subject:** `nobody tells you how lonely it gets`

Hey {{first_name}},

Nobody warns you about this part.

You're making decisions every day that affect people's livelihoods. Your spouse carries the risk with you but sees maybe a third of it. Your friends don't really understand what you do. And most of the advice online comes from people who've never shipped a case of anything.

I remember the confusion. The isolation. The specific dread of not knowing which play to run next and having nobody to ask.

On July 3rd, 2018, at five in the afternoon, I got the call that Coca-Cola wasn't buying the rest of Suja. My house was full of family prepping for the Fourth. I hung up, walked downstairs, and wept in front of my sons. I wasn't thinking about growth rates or awards. I was thinking: how did I let us get here?

The next morning there were fireworks and a parade and eighty-two degrees of blue sky and I was sick to my stomach.

What I'd have given that week for a room full of people who'd been there.

That's why the group exists. 275+ CPG founders, real brands, real problems, answering each other in real time. Somebody asks about a co-man dispute at 11pm and gets three answers by morning. Nobody sells anything in there — I'd throw them out.

[Request to join here](https://cpgfoundersgroup.com/founders-only)

It's free and it always will be.

Talk soon,
Jeff

*P.S. If you'd rather have the whole system in one place instead of asking questions piecemeal, that's what the [MBA for CPG](https://cpgfoundersgroup.com/mba-for-cpg) is — 450+ slides and every model I use, $997 for life.*

---

# EMAIL 6 — Gross Margin Architecture → MBA (Day 19)
**Purpose:** Teach something genuinely useful standalone, then point at the full system.
**CTA:** MBA for CPG, $997
**P.S.:** The book

**Subject:** `gross margin determines destiny`

Hey {{first_name}},

I want to give you the single number I'd look at first if you handed me your business today.

Not revenue. Gross margin.

Here's why. At Suja we grew from zero to $100 million in six years, faster than KIND, faster than Honest Tea, faster than ZICO. From the outside it looked like a rocket ship. Inside, our gross margins were under 32%, we were burning $10 million a year, and there were weeks we had less than $100,000 in the bank against $40 million of secured debt.

Growth and survival are not the same thing. Revenue without margin is ego.

The rule I run now: **build to 50%.** Not because 50% is magic, but because of what it buys you. Below 45%, every dollar of growth costs you money and you're structurally dependent on the next raise. Above 50%, you can fund trade spend, absorb a co-man mistake, take a slotting hit, and still be standing.

Three levers, in the order I'd pull them:

**1. Formulation and pack.** The cheapest margin you will ever find is the margin you design in before you launch. Changing a formula after you've got distribution is brutal. Before, it's a spreadsheet.

**2. Co-man terms and MOQs.** Most early founders sign the first agreement they're offered because they're grateful someone said yes. That gratitude costs points of margin for years.

**3. Trade spend discipline.** This is where the margin actually disappears — quietly, in MCBs and slotting and promos nobody modeled. Most founders can't tell me what their real net price per unit is by channel. If you can't, you're not managing margin, you're hoping.

Here's the part that matters most. Eighteen months before Coke walked away, we launched two-ounce wellness shots. Roughly 60% gross margin against about 12% on outsourced kombucha. At the time it felt like a side experiment. It turned out to be the thing that saved the company.

The decision that saves you is almost never the one you made on the day you needed saving. It's usually one you made eighteen months earlier, on a Tuesday, when nobody was watching.

Margin architecture is a Tuesday decision.

That's one framework. There are dozens more inside the [MBA for CPG](https://cpgfoundersgroup.com/mba-for-cpg) — 450+ slides, fifteen hours, and the full template library I've used across eight companies. $997, lifetime access. It's the operating system I wish someone had handed me at thirty-eight.

Talk soon,
Jeff

*P.S. The book comes out this year. It's called The Cold-Pressed Truth and it's the whole story, including the parts I'd rather not have written down. [Get on the list](https://cpgfoundersgroup.com/book).*

---

# EMAIL 7 — The Book (Day 23)
**Purpose:** Free ask, keeps momentum, feeds the launch list.
**CTA:** Book waitlist
**P.S.:** WhatsApp group
**⚠️ Needs `/book` page built first.**

**Subject:** `the part I almost didn't write`

Hey {{first_name}},

In May of this year, Suja Life went public on the Nasdaq under the ticker SUJA, at a valuation north of $700 million.

Ringing that bell had been a dream of mine for as long as I can remember. I asked to attend. The current owners cited policy and declined.

So I watched from a screen in San Diego while the team I once led stood in Times Square with their hands raised over their heads.

I've thought about that morning a lot. I could write it as a grievance. I've decided to write it as gratitude, because both things are true and only one of them is useful to you.

Build the company, but don't be the company. Love the work, but don't be the work. The bell is a moment. The work is the point.

That's roughly where my book ends.

It's called **The Cold-Pressed Truth**, and it's the honest version — Suja from an ice closet to $100 million in six years, the July 3rd phone call, the month I spent in rehab after I left because eighty-hour weeks for eight years had taken more than I understood at the time. Jay Shetty wrote the foreword. Seth Goldman, Mark Rampolla, Kim Perell, and John Foraker were kind enough to read it early.

It is part memoir and part operating manual, and it keeps interrupting itself to hand you a tool.

I'm not selling anything today. It isn't out yet. But if you want to know the day it lands:

[Get on the waitlist](https://cpgfoundersgroup.com/book)

Talk soon,
Jeff

*P.S. Still not in the founders group? 275+ of them in there, free, no pitching allowed: [cpgfoundersgroup.com/founders-only](https://cpgfoundersgroup.com/founders-only)*

---

# EMAIL 8 — Why He's Still Doing This (Day 27)
**Purpose:** Emotional peak. **No ask.** The email before the close should cost the reader nothing.
**CTA:** None
**P.S.:** Reply invitation only

**Subject:** `why I'm still doing this at 64`

Hey {{first_name}},

Somewhere on day three of Kilimanjaro, oxygen thin and legs burning, the guides started calling me Babu.

Swahili for grandpa. Partly my pace. Mostly because I wouldn't stop pointing things out on the trail.

Old habits.

The name stuck. My grandkids call me Babu now. Somewhere between that mountain and a boardroom I realized it's the role I've always played — the guy walking a little ahead, pointing out the cliffs and the switchbacks and the places where the view is worth the climb.

Here's the ledger, honestly. Eight ventures. $212 million raised. Nearly $700 million returned to investors, median 3.3x. Five home runs and three strikeouts. Fifty-five marathons and ultras. Six of the Seven Summits attempted, five summited.

And: I ran a better-for-you beverage company while neglecting my own health, worked eighty-hour weeks for almost eight years, drank far too much, and checked into rehab for a month after I left Suja. My family has told me they believe that if I hadn't stepped away when I did, I might not still be here.

Had I managed the balance better, I might still be the CEO, and I'd be the one preparing to take that company public. That one still sits in the back of my mind.

I'm sixty-four. I'm building my ninth company, a protein soda called Proda. And I'm still looking for the once-in-a-lifetime thing to build — something my grandchildren might one day say their grandfather made a difference with.

But between here and there, the part that actually fires me up is helping founders like you skip the landmines I stepped on. That's why the group exists, why I wrote the book, why Babu exists, why I write these emails.

If I can shorten your learning curve, stop one catastrophic mistake, or help you keep going through a week that feels like July 3rd felt to me — this has been worth it.

I'm in your corner.

Jeff

*P.S. No link in this one. If something in these emails landed, just hit reply and tell me what you're building. I read them all.*

---

# EMAIL 9 — The Close (Day 30)
**Purpose:** Direct, specific, no manufactured urgency. Lands right after the emotional peak.
**CTA:** `/apply`
**P.S.:** Everything else, for the people who aren't ready

**Subject:** `2 or 3 spots`

Hey {{first_name}},

Over the last month I've sent you the end zone, the July 3rd phone call, the margin math, the bell I didn't get to ring. I hope some of it was useful.

Here's the one direct ask of the whole sequence.

I take on a small number of founders privately. Not a course, not a group program — me, in your business, on the things that actually decide whether you make it. Growth strategy, fundraising, margin architecture, retail, exit planning. Whatever the real bottleneck is.

**Right now I have room for two or three more.**

I keep it small because each engagement gets built around the specific business, and I can't do that well at volume. When those spots fill, applications close until one opens back up. That's not a marketing tactic, it's just arithmetic.

If you want my eyes on your business:

**[Apply here](https://cpgfoundersgroup.com/apply)**

It takes about five minutes. Tell me where you are, what's in the way, and what a breakthrough would look like in ninety days. I read every application. If it's not a fit I'll tell you, and usually I'll point you somewhere better.

And if now isn't the time, genuinely, no problem. Stay on the list. The resources aren't going anywhere and neither am I.

But if you've been sitting on something — raise your hand. I lost twenty years to three seconds of not doing that.

Talk soon,
Jeff

*P.S. Not ready for that? The three things I'd do in your position, all cheaper: start the [Babu trial](https://www.askbabu.ai) free for ten days, get the [MBA for CPG](https://cpgfoundersgroup.com/mba-for-cpg) for $997, or just come sit in the [founders group](https://cpgfoundersgroup.com/founders-only) and ask your question there. All three beat doing it alone.*
