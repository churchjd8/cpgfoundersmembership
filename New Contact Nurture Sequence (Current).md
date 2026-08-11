# New Contact Nurture Sequence — Current State
## CPG Founders Group | 9 emails over 30 days

**Source of truth:** `Nurture Email Sequence - Part 2.md` (+ the Kajabi-ready HTML version).
This doc is the working reference for editing it. Pulled 2026-08-11.

---

## How it's wired

| | |
|---|---|
| **Kajabi tag** | `New Contact Nurture Sequence` (ID `2150132224`) |
| **Contacts currently on it** | 125 |
| **Entry trigger** | Any resource-download tag applied **OR** newsletter signup |
| **Suppression** | Does NOT fire if `Nurture Complete` is present |
| **Exclusion** | `Existing Contact to Nurture` tag blocks entry (those people get the 8-week re-engagement sequence instead) |
| **Length** | 9 emails, Day 1 → Day 29 |
| **From / Reply-to** | Jeff Church, replies go to Jeff |
| **On completion** | Apply `Nurture Complete` → move to weekly newsletter segment |

**Sibling sequences:**
- `Resource Delivery Emails - Part 1.md` — 8 one-off tag-triggered delivery emails (chart of accounts, runway calculator, etc.). These fire the download link; this sequence is what runs after.
- `Existing Contact Nurture Sequence.md` — 8 emails / 8 weeks, triggered by `Existing Contact to Nurture` (871 contacts).

---

## ⚠️ Audit — fix these before wiring anyone new in

1. **`Nurture Complete` has 0 contacts on it.** 125 people are tagged into this sequence and nobody has ever come out the other side. Either the completion tag isn't firing or the sequence isn't finishing. This also means the suppression rule ("don't enter if Nurture Complete") has never actually suppressed anything, and nobody is graduating to the newsletter segment. **Check this first — it's the load-bearing bug.**

2. **Email 5 sells the 90-Day Breakthrough, which is paused.** The entire email is a Krystal case study driving to `/90-day-breakthrough`. Anyone in the sequence right now is being pitched an offer that isn't taking clients. Needs to be swapped for the advisory offer or pulled.

3. **Email 9 lists the full old offer ladder** — 90-Day Breakthrough and a $15,000 VIP Day. Both are off the current ladder. Current live offers are Babu, MBA for CPG ($997), and private advisory. Email 9 needs a rewrite.

4. **Email 3 says "limited free beta"** for Babu. Babu is past beta — it's a 10-day free trial now (`Babu 10 Day Trial` tag exists and is in use). Copy is stale.

5. **Email 3 and Email 8 have inconsistent build cost** for Babu — Email 3 says "$200K", the Existing Contact version of the same email says "over $1M". Pick one.

6. **Email 7 sends people to the WhatsApp group.** If we start routing WhatsApp signups into this sequence (which is the whole point — 92 of 205 WhatsApp-tagged contacts are currently in no flow at all), Email 7 is redundant for them. Either branch it or swap it for a "here's what else we've got" email pointing at `/welcome`.

7. **Email 7 says "Two hundred founders."** Group is 275+ now.

---

## The sequence

### EMAIL 1 — Pure Value (Day 1)
**Purpose:** Build trust. Prove this isn't a sales funnel. Get them following Jeff on LinkedIn.
**Subject:** `the lesson that cost me everything`
**CTA:** Follow Jeff on LinkedIn

> Hey {{first_name}},
>
> I want to tell you about the worst thing that ever happened to me in business. Not because it's a fun story. Because it might save you.
>
> Early in my career, I was building a company called Universal Building Products. We'd just closed a $150 million acquisition. It was a strong market with a good thesis and experienced partners. On paper, everything checked out.
>
> Within weeks of closing, a tragic workplace accident claimed a life. Federal investigations shut us down. Litigation mounted. We were carrying heavy debt just as the market collapsed. I was still learning my way around the building as CEO and now had to navigate this tragedy.
>
> The company went bankrupt.
>
> That experience rebuilt how I operate entirely. It taught me three things I carry to this day: due diligence is non-negotiable, capital buffers aren't optional, and real leadership is measured by how you carry people through crisis. Not by the wins.
>
> Most "founder content" online is highlight reels. I'm not interested in that. The lessons that actually protect you come from the painful stuff. The stuff most people won't talk about.
>
> I am starting to share more lessons like this regularly on LinkedIn — the real ones, not the polished ones. If that sounds useful, [follow me here](http://linkedin.com/in/jeffreydeanchurch).
>
> Talk soon,
> Jeff

---

### EMAIL 2 — The Playbook Blog (Day 4)
**Purpose:** Drive to the featured blog post. Establish authority. Build the habit of opening his emails.
**Subject:** `23 plays that took me 30 years to learn`
**CTA:** Read the CPG Founder's Playbook

> Hey {{first_name}},
>
> When I was building Suja, there was no playbook. No operating system. No one handing me the plays and saying "run these."
>
> I had to figure it out the hard way — across eight companies, 44 fundraising rounds, five home runs, and three blazing strikeouts. Every lesson cost something. Some cost millions.
>
> I finally wrote it all down. Twenty-three plays covering every stage: KPIs that actually matter, fundraising strategy, gross margin management, trade spend, retail expansion, team building, exit planning. The whole system.
>
> This isn't theory from a business school class. It's what I actually ran. The plays that built a $300 million brand and the ones that saved me from losing the company along the way.
>
> [Read the full CPG Founder's Playbook](https://cpgfoundersgroup.com/blog/cpg-founders-playbook)
>
> Start wherever makes sense for your stage. Bookmark it. Come back to it. These plays compound over time.
>
> Talk soon,
> Jeff
>
> P.S. You can also check out some great CPG related articles I've been writing on my [blog](https://cpgfoundersgroup.com/blog) and I'm publishing multiple new ones each week.

---

### EMAIL 3 — Introduce Babu AI (Day 7)
**Purpose:** Show what Babu actually does. Lowest-friction paid offer.
**Subject:** `this isn't ChatGPT for food companies`
**CTA:** Sign up for Babu
**⚠️ Stale:** "limited free beta" language; "$200K" build cost conflicts with the $1M figure used elsewhere.

> Hey {{first_name}},
>
> I spent 15 months and over $200K building something I've never seen anyone else build for CPG.
>
> It's called [Babu AI](https://www.askbabu.ai), and I want to show you what it actually does — because it's not what you think.
>
> Most AI tools are generic. You ask a CPG question, you get a generic answer dressed up with industry buzzwords. Babu is different. I trained it on 6,000+ CPG-specific documents — articles, financial models, playbooks, [MBA for CPG](https://cpgfoundersgroup.com/mba-for-cpg) content, case studies — everything I've built and collected across 35 years and eight companies. Then I built 40+ specialized tools on top of it that I call "Gurus."
>
> Here's what I mean by Gurus:
>
> - **Brand Positioning Guru** — answer 28 questions about your brand and get back a 30-40 page positioning report. Competitor matrix, white space analysis, audience segmentation, messaging hierarchy. Agencies charge $10,000-$50,000 for this.
> - **Investor Pitch Prep Coach** — upload your pitch deck and get 10 brutal investor questions back with scoring and coaching. I built it to feel like a New York buyer who doesn't care about your feelings. You want that before you walk into the room.
> - **Fatal Flaw Assessment** — 30 yes/no questions across legal, financial, operational, and strategic categories. It flags the risks that kill companies before they know they're dying.
> - **Product Line P&L** — input your costs, pricing, and channel mix. It models your unit economics at launch AND at scale, broken out by Amazon, DTC, and brick-and-mortar. One founder told me this single tool would have closed a deal he lost because the investor asked about unit economics and he couldn't answer.
> - **Co-Man Contract Review, Broker Evaluation Scorecard, Multi-Channel Break-Even, Quarterly Audit Tracker** — and about 30 more.
>
> And then there's the Deep Research mode. Most AI models run research for about 16 minutes. Mine runs for 23. Those extra 7 minutes aren't about getting more data — they're about triangulating what it already found. Checking sources. Reducing hallucinations. I wanted the output to be something you could actually trust, not something you had to fact-check line by line.
>
> Babu also pulls real-time data from retail APIs — including Target — so you're not working off stale information when you're prepping for a buyer meeting or analyzing your competitive set.
>
> Nothing you put into Babu is shared, scraped, or used for training. Your data stays yours. That was non-negotiable for me.
>
> I call it a co-founder in your pocket. It never sleeps, it never complains, and it's trained on what I actually know — not what the internet thinks it knows about CPG.
>
> Right now, we're running a limited free beta — full access, including Deep Research and all 40+ Gurus. [Sign up here and take it for a spin](https://www.askbabu.ai).
>
> P.S. "Babu" is Swahili for grandpa. I got the name climbing Kilimanjaro with my kids a few years ago — my kids (and our guide) kept yelling "Come on, Babu!" because I was moving too slow. The name stuck...my grandkids call me Babu now. Figured if I'm going to be the old guy giving unsolicited advice, I might as well name the AI after it.
>
> Talk soon,
> Jeff "Babu" Church

---

### EMAIL 4 — Reply Trigger (Day 10)
**Purpose:** Generate replies. Turn subscribers into conversations.
**Subject:** `one question`
**CTA:** Hit reply

> Hey {{first_name}},
>
> I want to ask you something real...no pitch attached.
>
> What's the one thing keeping you stuck right now?
>
> Fundraising? Retail distribution? Finding the right team? Margins? Something else entirely?
>
> I read every reply. I'm not going to try to sell you anything. I just want to know what founders like you are actually dealing with so I can keep building resources that help.
>
> One sentence is enough. Hit reply.
>
> Talk soon,
> Jeff

---

### EMAIL 5 — Transformation Story + 90-Day Breakthrough (Day 13)
**Purpose:** Social proof through Krystal's results. Introduce the flagship offer.
**Subject:** `she raised $250K in her first month`
**CTA:** Apply for the 90-Day Breakthrough
**🚨 Broken:** the 90-Day Breakthrough is paused. This email needs to be repointed at private advisory or pulled from the sequence.

> Hey {{first_name}},
>
> I want to tell you about a founder named Krystal.
>
> When we started working together, she had investors sitting on the fence. She'd been grinding on her raise for months. The interest was there. The conviction wasn't.
>
> In our first session, I suggested a completely different approach to her debt and equity split financing. It wasn't something she would have considered on her own — it wasn't obvious. But I'd seen this exact situation play out dozens of times across 44 fundraising rounds.
>
> From there, we retooled her pitch deck and built out her full 5-year bottom-up financial model. The investors who had been sitting on the fence came over.
>
> She raised $250K in a bridge round in her very first month.
>
> Her words: "I would never have thought to do that without Jeff's push."
>
> That's what the [90-Day Breakthrough](https://cpgfoundersgroup.com/90-day-breakthrough) is built for. It starts with a diagnostic — I identify your biggest bottleneck and we map the 90 days together. Then it's three months of direct work: 1:1 support, group sessions, weekly accountability, and everything you need to move.
>
> It's not for everyone. It's for founders who are serious about breaking through whatever's between them and their next stage.
>
> If that's you, [apply here](https://cpgfoundersgroup.com/90-day-breakthrough).
>
> P.S. I only take a handful of founders at a time because I go deep with each one — this isn't a course, it's real work together. If applications are closed when you get there, you can join the waitlist and I'll reach out when a spot opens.
>
> Talk soon,
> Jeff

---

### EMAIL 6 — Framework + MBA for CPG (Day 17)
**Purpose:** Teach the MAP framework. Position the MBA as the full system.
**Subject:** `the framework I run before I invest a dollar`
**CTA:** Get lifetime access to MBA for CPG ($997)

> Hey {{first_name}},
>
> Before I invest in any opportunity — mine or someone else's — I run it through a simple framework I call MAP.
>
> **M — Market**
> What game are you playing? Not "food and beverage." Get specific. Industry, category, segment, niche. At Suja, once we stopped calling ourselves "a juice company" and defined ourselves as an organic, cold-pressed wellness brand in the functional beverage segment, everything changed. Pricing. Positioning. Which retailers we targeted. Which competitors we measured against.
>
> **A — Audience**
> Who are you really serving? "Health-conscious consumers" is a placeholder, not an audience. At Suja, our core customer was a health-conscious millennial woman, 25-40, who shops at Whole Foods, does yoga, and wants genuine nutrition without being punished by bad taste. That specificity shaped every decision we made.
>
> **P — Positioning**
> What makes you impossible to copy? Products are copyable. Brands are not. Your positioning is what makes your brand the only logical choice for your specific audience.
>
> If you can't clearly articulate all three, you're building on a shaky foundation.
>
> This is one of dozens of frameworks I teach inside the [MBA for CPG](https://cpgfoundersgroup.com/mba-for-cpg). $997, lifetime access. Fifteen hours of training, 450+ slides, and the full template library I used across eight companies and $700M in exits. The operating system I wish I'd had from day one.
>
> Talk soon,
> Jeff

---

### EMAIL 7 — WhatsApp Community (Day 21)
**Purpose:** Get them into the community. Community = stickiness and retention.
**Subject:** `you don't have to build alone`
**CTA:** Join the WhatsApp group
**⚠️ Stale:** says "Two hundred founders" (now 275+). Redundant for anyone who entered via the WhatsApp form — branch or swap for `/welcome`.

> Hey {{first_name}},
>
> Nobody tells you how lonely it gets.
>
> You're making decisions every day that affect people's livelihoods. Your spouse shares the risk but has far less visibility. Your friends don't fully understand what you're going through. And most of the "advice" online comes from people who've never actually built anything.
>
> I remember the confusion, the isolation, and the paralyzing dread that came from not knowing which play to run next.
>
> That's why we have the [CPG Founders WhatsApp Group](https://cpgfoundersgroup.com/founders-only).
>
> Two hundred founders. Real people, building real brands. Sharing questions, wins, and the kind of advice you can only get from people who are in the trenches with you. Nobody's selling anything in there. Founders helping founders.
>
> If you haven't joined yet, I'd like to have you.
>
> [Join the CPG Founders Group](https://cpgfoundersgroup.com/founders-only)
>
> You don't have to figure this out alone.
>
> Talk soon,
> Jeff

---

### EMAIL 8 — Jeff's Personal "Why" (Day 25)
**Purpose:** Emotional peak. People buy from people they believe in.
**Subject:** `why I'm still doing this at 64`
**CTA:** None (relationship email)

> Hey {{first_name}},
>
> A few years ago, I was climbing Kilimanjaro with my kids. Around day three — oxygen thin, legs burning — they started calling me "Babu." Swahili for grandpa. Partly because of my pace. Partly because I kept offering unsolicited advice on the trail.
>
> Old habits.
>
> The name stuck. My grandkids call me Babu now. (and I even named my AI tool [Babu](askbabu.ai))
>
> Somewhere between the mountain and the boardroom, I realized that's exactly the role I've always played. The experienced guy walking alongside you, pointing out what lies ahead while honestly assessing what's behind.
>
> I've built eight companies. Raised $212 million. Returned nearly $700 million. Five home runs and three blazing strikeouts. I burned out and went through rehab after Suja because I forgot to put my own oxygen mask on first.
>
> I've felt the 2 AM dread. I've woken up with deep remorse about capital I lost for people who trusted me. I've also stood on summits — literal and figurative — that I never imagined I'd reach.
>
> I'm 64, and I'm still searching for that once-in-a-lifetime opportunity to build something so meaningful that one day my grandchildren might say their grandfather made a difference.
>
> But in the meantime, the thing that fires me up most is helping founders like you avoid the land mines I stepped on. That's why I built CPG Founders Group. That's why I write these emails. That's why Babu exists.
>
> If I can shave time off your learning curve, prevent one catastrophic mistake, or help you cowboy up when the road gets rough — this whole journey has been worth it.
>
> I'm in your corner.
>
> Talk soon,
> Jeff

---

### EMAIL 9 — The Direct Ask (Day 29)
**Purpose:** Clear, no-pressure CTA. Lay out all offers.
**Subject:** `here's how we work together`
**CTA:** Pick an offer / hit reply
**🚨 Broken:** lists the 90-Day Breakthrough (paused) and a $15,000 VIP Day. Needs a rewrite against the current ladder — Babu, MBA for CPG, private advisory.

> Hey {{first_name}},
>
> Over the past month, I've shared some of the most important lessons from 30 years of building companies (and there's MUCH more on my [Blog](https://cpgfoundersgroup.com/blog)). I hope they've been useful.
>
> If you're ready to go deeper, here's every way we can work together. Pick whatever fits your stage and your budget:
>
> **Babu — Your CPG AI Advisor** | Starting at $39/mo
> On-demand answers to your toughest CPG questions. Fundraising, retail, pricing, operations — trained on what actually works.
> [Try Babu for Free Now](https://www.askbabu.ai)
>
> **MBA for CPG** | $997, lifetime access
> 15+ hours of training, 450+ slides, and the full template library I used across eight companies. The complete operating system for CPG founders.
> [Get lifetime access](https://cpgfoundersgroup.com/mba-for-cpg)
>
> **The 90-Day Breakthrough** | By Application
> Direct work with me. Diagnostic, biggest bottleneck, 90 days of breaking through it together. 1:1 support, group sessions, weekly accountability. This includes the premium tier of Babu subscription ($499/mo) as well as the full MBA for CPG ($997).
> [Apply here](https://cpgfoundersgroup.com/90-day-breakthrough)
>
> **VIP Day with Jeff** | Starting at $15,000
> A half-day intensive at your highest-leverage moment, plus 3 months of support to execute. For founders facing a major decision — next raise, retail expansion, exit prep, or team build.
> [Apply here](https://cpgfoundersgroup.com/vip-day-apply)
>
> If none of these are the right fit right now, that's fine. Stay on this list. Keep reading the blog. Stay in the WhatsApp group. The resources aren't going anywhere, and neither am I.
>
> But if you've been on the fence about something — raise your hand. That's how every good thing in my career started.
>
> Hit reply if you're not sure which option fits. I'll point you in the right direction.
>
> Talk soon,
> Jeff
