# Kajabi Build Spec — New Contact Nurture Sequence
## Agent instructions + full email copy · 10 emails / 31 days

**You are building this in the Kajabi admin UI, not via the API.** This is not optional — see the constraint note below.

**Site:** CPG Founders Group · Kajabi site ID `2148589556`
**Admin:** app.kajabi.com · **Learn subdomain:** learn.cpgfoundersgroup.com
**Replaces:** the existing sequence driven by the `New Contact Nurture Sequence` tag. Do not delete the old one until this is live and verified — pause it instead.

---

## ⚠️ Hard constraint: the API cannot do this

The Kajabi public API (`api.kajabi.com/v1`) exposes only `sites`, `contacts`, `contact_tags`, `forms`, `offers`, `products`, `customers`, and `purchases`. There are **no endpoints for automations, sequences, or emails** — `/v1/automations`, `/v1/sequences` and `/v1/emails` all return 404. Verified 2026-08-11.

So: build the sequence and all automation rules **by hand in the Kajabi admin UI**. The API is useful only for verifying tag state afterwards (see QA section).

Two other API behaviors worth knowing if you script any verification:
- `filter[email]` on `/v1/contacts` is **silently ignored** — it returns the unfiltered first page. To find a contact by email you must page through all contacts (~1,700) and match client-side.
- The contacts index **lags roughly 60 seconds** behind form submissions. A contact that looks missing immediately after a test submit usually isn't.

---

## Reference — tag IDs

| Tag | ID | Role in this build |
|---|---|---|
| `New Contact Nurture Sequence` | `2150132224` | Applied on entry. Drives the sequence. |
| `Nurture Complete` | `2150129907` | Applied after email 10. **Currently broken — see below.** |
| `Existing Contact To Nurture` | `2150132230` | Blocks entry |
| `Contact Nurtured` | `2150132223` | Legacy, do not use in this build |
| `WhatsApp Group` | `2150002031` | Entry trigger AND skip rule for email 5 |
| `CPT Book Waitlist` | `2150300987` | Entry trigger AND skip rule for email 7 |
| `General Newsletter Sub` | `2150129865` | Entry trigger |
| `Babu 10 Day Trial` | `2150242896` | Skip rule for email 4 |
| `Babu paid user` | `2150254403` | Skip rule for email 4 |
| `Paying Customer` | `2150129965` | **Hard exit** |
| `CPG Founders Membership` | `2150046509` | **Hard exit** |

### Resource-download tags (all are entry triggers)

| Tag | ID |
|---|---|
| `All Free Resources Bundle` | `2150128581` |
| `Fundraising Masterclass Replay (3 Hours)` | `2150128582` |
| `CPG Chart of Accounts` | `2150128583` |
| `Capital Raise & Runway Calculator` | `2150128584` |
| `Unit Pricing & Break-Even Model` | `2150128587` |
| `Suja Lessons Learned (white paper)` | `2150128588` |
| `CPG Fatal Flaws (white paper)` | `2150128589` |
| `CPG Playbook Video Replay` | `2150128590` |
| `Burn Rate Workshop Replay Access` | `2150144318` |

### Form IDs (for reference — these already apply their own tags)

| Form | ID |
|---|---|
| WhatsApp Group Form | `2149419862` |
| General Newsletter Sub | `2149549985` |
| CPT Book Waitlist | `2149690454` |
| Free Resources Form | `2149549966` |

---

## 🔴 Fix this before building anything else

**`Nurture Complete` has never fired.** 125 contacts sit on `New Contact Nurture Sequence` and **zero** contacts carry `Nurture Complete`. Verified against the live account.

That means on the old sequence: nobody graduated to the newsletter segment, and the "don't re-enter if complete" suppression has never actually suppressed anyone.

**Diagnose and fix the completion step in the existing automation first.** If you build this new sequence on top of the same broken pattern, it inherits the same dead end. Do not skip this. Report what you find.

---

## Automation architecture

### Entry

Enter the sequence and apply `New Contact Nurture Sequence` when **any** of these tags is applied:

- Any of the nine resource-download tags above
- `General Newsletter Sub`
- `WhatsApp Group`
- `CPT Book Waitlist`

### Entry blocks (do not enter if the contact has either)

- `Existing Contact To Nurture` — they belong in the 8-week re-engagement sequence
- `Nurture Complete` — they've already been through this

### Exit

| Trigger | Action |
|---|---|
| `Paying Customer` applied | **Exit immediately.** Only hard exit. |
| `CPG Founders Membership` applied | **Exit immediately.** |
| Submits `/apply` | **Do NOT exit.** Stay in the flow, notify Jeff. Applying is not converting. |
| Completes email 10 | Apply `Nurture Complete`, move to weekly newsletter segment |

### Conditional skips

Evaluate at send time, not at entry — someone may acquire these tags mid-sequence.

| Email | Skip if contact has |
|---|---|
| 4 (Babu) | `Babu 10 Day Trial` **or** `Babu paid user` |
| 5 (WhatsApp) | `WhatsApp Group` |
| 6 (MBA) | MBA for CPG purchase (check the offer, there's no dedicated tag) |
| 7 (Book) | `CPT Book Waitlist` |

A skipped email does **not** shift the schedule. Later emails still send on their original day.

---

## Send schedule

| Email | Day | Delay from previous |
|---|---|---|
| 1 | 1 | immediate on entry |
| 2 | 4 | 3 days |
| 3 | 7 | 3 days |
| 4 | 11 | 4 days |
| 5 | 15 | 4 days |
| 6 | 19 | 4 days |
| 7 | 22 | 3 days |
| 8 | 25 | 3 days |
| 9 | 28 | 3 days |
| 10 | 31 | 3 days |

---

## Global email settings

- **From name:** Jeff Church
- **From/reply-to:** Jeff's real monitored inbox. **Email 3 and email 9 explicitly ask for replies** — a no-reply address breaks both.
- **Merge field:** `{{first_name}}` — this exact syntax, confirmed against the existing Kajabi-ready sequence file.
- **Unsubscribe link:** required in all ten. Email 1 refers to it directly in the body.
- **Formatting:** plain-text-feeling. No heavy template chrome, no hero images, no button graphics — inline text links only. These are meant to read like a person wrote them.
- **Subject lines:** lowercase as written. Do not title-case them.
- **PS lines:** italic, as marked.

---

# EMAIL COPY

Everything below is final and approved. Do not rewrite, "improve," or re-tone any of it. Reproduce exactly, including ellipses, exclamation points, and the `:)` in email 1.

---

## EMAIL 1 · Day 1 · Orientation
**Subject:** `what you just signed up for`

Hey {{first_name}},

Quick note so you know what you've gotten yourself into.

Over the next month I'm going to send you ten emails, and they're mostly stories from thirty years of building consumer brands, including a decent number of the ones that went sideways on me (which are honestly the useful ones). A few of them come with tools attached. A couple will mention things I sell, and I promise I'll be obvious about it when I do rather than pretending otherwise.

If that's not what you're looking for, unsubscribe. There's a link down at the bottom and it genuinely won't hurt my feelings...I'm sixty-four and building my ninth company, so I've made peace with not being everybody's cup of tea :)

But if you're building something right now, I'd start here:

[The free resource library](https://cpgfoundersgroup.com/resources)

There's a runway calculator in there, along with the unit pricing and break-even model, a trade promo break-even tool, a CPG-specific chart of accounts, SKU rationalization, both white papers (Suja Lessons Learned and Fatal Flaws), plus the burn rate workshop and the three-hour fundraising masterclass replay.

You may have already grabbed one of those on your way in. There are nine more sitting right next to it, and none of them are the kind of lead magnet where I pulled out the good part and saved it for the paid version. It's the actual stuff...the models I ran and the mistakes I wrote down so I'd stop repeating them.

Take whatever's useful and ignore the rest.

Talk soon,
Jeff

*PS There are 275+ CPG founders in our WhatsApp group answering each other's questions in real time, and nobody is allowed to sell anything in there. If you're not in it yet: [cpgfoundersgroup.com/founders-only](https://cpgfoundersgroup.com/founders-only)*

---

## EMAIL 2 · Day 4 · Three Seconds in the End Zone
**Subject:** `three seconds I replayed for twenty years`

Hey {{first_name}},

I want to tell you about three seconds of my life that I thought about almost every week for the next twenty years.

Senior year of high school, my team hadn't won a game in two full seasons, and we're down to the last seconds of the game when I get wide open in the end zone. Nobody within ten yards of me.

And I didn't raise my hand.

I was afraid of dropping it, afraid of being the guy who blew it for everybody, so I just stood there wide open and said nothing at all. Our quarterback got sacked and we lost, and I carried that one around for two decades.

Then I'm thirty-eight years old with our third kid just born, and I'm up at two in the morning flipping channels the way you do when you can't sleep, and I land on this show interviewing retired CEOs. They're asking every one of them what they'd do differently, and they all say some version of the exact same thing...I'd have been bolder, I'd have taken more chances, I'd have chosen fulfillment over safety.

I remember sitting there thinking that at thirty-eight I had somehow become far more afraid of mediocrity than I was of failure.

I left the safe track that year.

Here's something I tell every founder I work with, usually the ones sitting on a decision they already know the answer to. Courage doesn't get rid of the fear! I've been scared before every single thing that ever worked out for me. The fear was never really the problem...the not raising my hand was the problem.

Most of what you read about founders online is the highlight reel, and I'm not particularly interested in adding to it. The lessons that actually protect you tend to come from the parts nobody posts about.

I write more of these on LinkedIn, the real ones rather than the polished ones. [Follow me over there](http://linkedin.com/in/jeffreydeanchurch) if you want them showing up in your feed.

Talk soon,
Jeff

*PS I spent fifteen months building an AI advisor trained on everything I know about this industry. It's called Babu and the first ten days are free if you want to poke at it: [askbabu.ai](https://www.askbabu.ai)*

---

## EMAIL 3 · Day 7 · The Topic Poll
**Subject:** `can I ask you for fifteen seconds?`

> **Reply-critical email.** Must send from a monitored inbox. Replies here are what protect deliverability for emails 4-10.
> The 19-item list below was split out from an original 17 and confirmed 2026-08-11. Build it exactly as written.

Hey {{first_name}},

I need your help with something and it should take you about fifteen seconds.

I'm mapping out what to teach over the next few months...workshops, deep dives, the things I actually sit down and build out properly...and I'd much rather make the thing you need than sit here guessing at it.

So here's the list. **Just hit reply with your top three numbers** and that's it. No form to fill out, no survey link, nothing to click. Three numbers.

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
19. My 23 most significant CPG plays

I read every one of these myself, and if you want to throw in a sentence about what's actually got you stuck right now, even better...but three numbers is plenty and I'll take it.

Thank you in advance!

Talk soon,
Jeff

*PS If you haven't been through the free tools yet, the runway calculator and the break-even model are the two people email me about most: [cpgfoundersgroup.com/resources](https://cpgfoundersgroup.com/resources)*

---

## EMAIL 4 · Day 11 · Babu
**Subject:** `this isn't ChatGPT for food companies`
**Skip if:** `Babu 10 Day Trial` or `Babu paid user`

Hey {{first_name}},

Okay, let me tell you about the thing I've spent the last fifteen months building, because it's the first time in this sequence I'm mentioning something I actually sell.

It's called [Babu](https://www.askbabu.ai), and it is not a chatbot with an industry skin painted on it.

Most AI tools are generic, so you ask a CPG question and you get back a generic answer dressed up in industry buzzwords, which is worse than useless because it sounds right. I trained Babu on 6,000+ CPG-specific documents instead...financial models, playbooks, case studies, the entire MBA for CPG curriculum, basically everything I've built or collected across thirty-five years and eight companies.

Then I built 40+ specialized tools that sit on top of it. I call them Gurus, and each one does exactly one job:

1. **Brand Positioning Guru** — you answer 28 questions and it hands you back a 30 to 40 page positioning report with a competitor matrix, white space analysis, audience segmentation, and messaging hierarchy. Agencies charge somewhere between $10,000 and $50,000 for this exact deliverable.
2. **Investor Pitch Prep Coach** — upload your deck and it comes back with ten brutal investor questions, scored, with coaching on each one. I built it to feel like a buyer who does not care about your feelings, and you want to meet that person before the room rather than in it.
3. **Fatal Flaw Assessment** — thirty yes/no questions across legal, financial, operational and strategic, and it flags the risks that kill companies well before the founder knows anything is wrong.
4. **Product Line P&L** — put in your costs, pricing and channel mix and it models your unit economics at launch and at scale, broken out across Amazon, DTC and brick-and-mortar. One founder told me this one alone would have saved a deal he lost, because an investor asked him about unit economics and he couldn't answer.
5. Plus co-man contract review, broker evaluation, multi-channel break-even, quarterly audit tracking...and about thirty more.

There's also a Deep Research mode, and this is the part I'm probably too proud of. Most models research for about sixteen minutes and Babu runs for twenty-three. Those extra seven minutes aren't about finding more, they're about triangulating what it already found and checking its own sources, which is how you cut down the hallucinations. I wanted output you could act on rather than output you had to fact-check line by line before you dared use it.

And nothing you put into it gets shared, scraped, or used for training. That one was non-negotiable for me.

I call it a co-founder in your pocket...it never sleeps, it never complains, and it's trained on what I actually know instead of what the internet thinks it knows about this industry.

**The first ten days are free.** [Take it for a spin](https://www.askbabu.ai) and tell me what you think.

Talk soon,
Jeff "Babu" Church

*PS In case you're wondering about the name...I was climbing Kilimanjaro with my kids a few years back, and around day three, with the oxygen getting thin and my legs burning, the guides started calling me Babu. It's Swahili for grandpa. Partly it was my pace, and partly it was because I would not stop offering unsolicited advice on the trail (some things don't change). My grandkids call me that now, so I figured if I'm going to be the old guy handing out advice, I may as well name the AI after it!*

---

## EMAIL 5 · Day 15 · The WhatsApp Group
**Subject:** `nobody warns you about this part`
**Skip if:** `WhatsApp Group`

Hey {{first_name}},

Nobody really warns you about how lonely this gets.

You're making decisions every day that affect people's livelihoods and their mortgages, and your spouse carries the risk right alongside you but only ever sees about a third of what's actually happening, and your friends are supportive but don't really understand what you do all day. Meanwhile most of the advice floating around online comes from people who've never shipped a single case of anything.

I remember the confusion and the isolation of it, and the very specific dread of not knowing which play to run next and having nobody to ask.

I'll never forget July 3rd of 2018. Five in the afternoon, my house full of family getting ready for the Fourth, and I take the call telling me that Coca-Cola isn't buying the rest of Suja. I hung up the phone, walked downstairs, and wept in front of my sons. And I wasn't thinking about growth rates or awards or any of it...I was thinking, how on earth did I let us get here?

The next morning there were fireworks and a parade and eighty-two degrees of perfect blue San Diego sky, and I was sick to my stomach through all of it.

What I would have given that week for a room full of people who'd already been through their own version of it.

That's really why the group exists. It's 275+ CPG founders with real brands and real problems answering each other in real time, so somebody posts a co-man dispute at eleven at night and has three useful answers waiting by morning. Nobody sells anything in there and I'd throw them out if they tried!

[Request to join here](https://cpgfoundersgroup.com/founders-only)

It's free and it's going to stay that way.

Talk soon,
Jeff

*PS If you'd rather have the whole system in one place instead of asking questions piecemeal, that's what the [MBA for CPG](https://cpgfoundersgroup.com/mba-for-cpg) is...450+ slides and every model I use, $997 and it's yours for life.*

---

## EMAIL 6 · Day 19 · Gross Margin → MBA
**Subject:** `the first number I'd look at`
**Skip if:** contact has purchased MBA for CPG

Hey {{first_name}},

If you handed me your business today and gave me one number to look at before I said anything, I wouldn't ask about revenue. I'd ask about gross margin.

Here's why that is.

At Suja we went from zero to $100 million in six years, which was faster than KIND and faster than Honest Tea and faster than ZICO, and from the outside it looked like a rocket ship. On the inside our gross margins were sitting under 32%, we were burning $10 million a year, and there were weeks where we had less than $100,000 in the bank against $40 million of secured debt coming due.

Growth and survival are not the same thing, and I learned that one the expensive way.

So the rule I run now is build to 50%. Not because fifty is a magic number but because of what it buys you...below about 45% every dollar of growth actually costs you money and you become structurally dependent on the next raise, whereas above 50% you can fund trade spend, absorb a co-man mistake, eat a slotting hit, and still be standing at the end of it.

Three levers, in the order I'd pull them:

1. **Formulation and pack.** The cheapest margin you will ever find is the margin you design in before you launch, because changing a formula once you've got distribution is genuinely brutal, while changing it beforehand is just a spreadsheet.
2. **Co-man terms and MOQs.** Most early founders sign the first agreement they're handed because they're so relieved that somebody said yes, and that relief ends up costing them points of margin for years afterward.
3. **Trade spend discipline.** This is where the margin quietly disappears, in MCBs and slotting and promos that nobody modeled properly, and most founders can't tell me their real net price per unit by channel. If you can't tell me that number, you're not managing margin...you're hoping.

Here's the part I think about most. About eighteen months before Coke walked away, we launched two-ounce wellness shots at roughly 60% gross margin, against something like 12% on the outsourced kombucha we were doing at the time. It felt like a side experiment when we did it. It turned out to be the thing that saved the company.

The decision that saves you is almost never the one you made on the day you needed saving. It's usually one you made eighteen months earlier, on a Tuesday, when nobody was watching.

That's one framework and there are dozens more inside the [MBA for CPG](https://cpgfoundersgroup.com/mba-for-cpg)...450+ slides, about fifteen hours, and the full template library I've used across eight companies. $997 and you have it for life. It's more or less the operating system I wish somebody had handed me when I was thirty-eight and about to find all this out the hard way.

Talk soon,
Jeff

*PS The book is coming this year. It's called The Cold-Pressed Truth and it's the whole story, including a few parts I'd rather not have put in writing. [Get on the list here](https://cpgfoundersgroup.com/book).*

---

## EMAIL 7 · Day 22 · The Book
**Subject:** `the part I almost didn't write`
**Skip if:** `CPT Book Waitlist`

Hey {{first_name}},

True story that most people don't know, and at this point in my career I've got nothing to lose by telling it, so here you go.

In May of this year Suja Life went public on the Nasdaq under the ticker SUJA, at a valuation north of $700 million.

Ringing that bell had been a dream of mine for about as long as I can remember having dreams about business. So I asked whether I could attend. The current owners cited policy and said no.

I watched it from a screen in San Diego while the team I used to lead stood in Times Square with their hands raised over their heads.

I've turned that morning over in my head a lot since, and I could absolutely write it up as a grievance...but I've decided to write it as gratitude instead, partly because both versions are true and only one of them is any use to you. Build the company but don't be the company. Love the work but don't be the work. The bell is a moment and the work is the point.

That's roughly where the book ends.

It's called **The Cold-Pressed Truth: A Founder's Field Guide to Building, Scaling, and Selling a Consumer Brand**, and Jay Shetty was generous enough to write the foreword for it. It's the honest version of all of it...Suja from an ice closet to $100 million in six years, the July 3rd phone call, and the month I spent in rehab after I left, because eighty-hour weeks for eight straight years had taken more out of me than I understood at the time. Seth Goldman, Mark Rampolla, Kim Perell and John Foraker all read it early and had kind things to say, which still surprises me a little.

It's part memoir and part operating manual, and it keeps interrupting the story to hand you a tool.

I'm not selling you anything today because it isn't out yet! But if you want to know the day it lands:

[Get on the waitlist here](https://cpgfoundersgroup.com/book)

Talk soon,
Jeff

*PS Still not in the founders group? There are 275+ of them in there, it's free, and pitching is not allowed: [cpgfoundersgroup.com/founders-only](https://cpgfoundersgroup.com/founders-only)*

---

## EMAIL 8 · Day 25 · Client Results
**Subject:** `she raised $250K in her first month`

> Krystal has signed off on being named with the $250K figure (confirmed 2026-08-11). Do not alter the numbers or the quote.

Hey {{first_name}},

I've told you a lot of my own stories over the last few weeks, so let me tell you somebody else's for a change.

A founder named Krystal came to me with investors sitting squarely on the fence. She'd been grinding away at the raise for months and the interest was genuinely there, but the conviction wasn't, and anyone who's ever run a process knows exactly what that limbo feels like...nobody actually says no to you, and nobody wires anything either.

In our very first session I suggested a completely different approach to the debt and equity split in her financing.

It wasn't an obvious move and she wouldn't have landed on it herself, which I don't mean as any kind of knock on her, because the only reason I saw it is that I've watched that specific situation play out dozens of times across thirty years and forty-four rounds. That's really the whole value of having done something this long...it's pattern recognition you cannot shortcut.

From there we retooled the deck and built out her full five-year bottom-up model, and the investors who had been sitting on that fence came over. She closed **$250,000 in a bridge round in her first month.**

Her words, not mine: *"I would never have thought to do that without Jeff's push."*

Now, I'm not telling you this because every founder I work with gets that result. They don't! And anybody promising you they do is selling you something. Plenty of the work I do is slower and a lot less dramatic than Krystal's...margin architecture that quietly pays off eighteen months later, a co-man agreement renegotiated before it does real damage, a hire talked out of being made.

I'm telling you because of what the work actually is. It isn't motivation and it isn't cheerleading. It's somebody who has already made your mistake looking at your specific situation and saying don't do that, do this instead.

That's the whole offer, honestly. If you want that pointed at your business:

**[Apply here](https://cpgfoundersgroup.com/apply)**

Talk soon,
Jeff

*PS If 1:1 isn't where you're at right now, [Babu](https://www.askbabu.ai) is the cheap version of the same idea...the pattern recognition without me in the room. Ten days free.*

---

## EMAIL 9 · Day 28 · Why He's Still Doing This
**Subject:** `why I'm still doing this at 64`

> **No links in this email.** That is deliberate — do not add a CTA button, a footer link block, or a "recommended for you" module. The only thing in it is a reply invitation.

Hey {{first_name}},

Somewhere around day three on Kilimanjaro, with the oxygen thin and my legs burning, the guides started calling me Babu.

Swahili for grandpa. Partly it was my pace, but mostly it was because I would not stop pointing things out on the trail. Old habits die hard.

The name stuck, and my grandkids call me Babu now. Somewhere between that mountain and a boardroom I realized it's basically the role I've always played anyway...the guy walking a little bit ahead of you, pointing out the cliffs and the switchbacks and the handful of places where the view turns out to be worth the climb.

So here's the honest ledger, all of it. Eight ventures, $212 million raised, nearly $700 million returned to investors at a median of 3.3x, five home runs and three strikeouts. Fifty-five marathons and ultramarathons. Six of the Seven Summits attempted and five of them summited.

And also this. I ran a better-for-you beverage company while completely neglecting my own health, worked eighty-hour weeks for the better part of eight years, drank far too much, and checked into rehab for a month after I left Suja. My family has told me since that they believe if I hadn't stepped away when I did, I might not still be here at all.

Had I managed the balance better I might still be the CEO of that company, and I'd have been the one preparing to take it public. That one still sits somewhere in the back of my mind and probably always will.

I'm sixty-four now and I'm building my ninth company, a protein soda called Proda, and I'm still out here looking for the once-in-a-lifetime thing to build...something my grandchildren might one day say their grandfather made a real difference with.

But in the meantime, the part that genuinely fires me up is helping founders like you skip the landmines I stepped on. That's why the group exists and why I wrote the book and why Babu exists and why I write these emails to you.

If I can shorten your learning curve, or stop one catastrophic mistake, or help you keep going through a week that feels the way July 3rd felt to me, then this has all been worth doing.

I'm in your corner.

Jeff

*PS No link in this one. If something in these emails has landed with you, just hit reply and tell me what you're building. I read every one.*

---

## EMAIL 10 · Day 31 · The Close
**Subject:** `2 or 3 spots`
**On send:** apply `Nurture Complete` (`2150129907`) and move to the weekly newsletter segment

Hey {{first_name}},

Over the last month I've sent you the end zone, the July 3rd phone call, the margin math, the bell I didn't get to ring, and Krystal's raise, and I hope a decent amount of it was useful to you.

(And if you've already applied...thank you, I've got it, and you can happily ignore the rest of this one.)

Here's the one direct ask in the whole sequence.

I take on a small number of founders privately. It isn't a course and it isn't a group program, it's me in your business on the handful of things that actually decide whether you make it or not...growth strategy, fundraising, margin architecture, retail, exit planning, whatever the real bottleneck turns out to be once we look at it properly.

**Right now I have room for two or three more.**

I keep it small because every engagement gets built around the specific business in front of me and I can't do that well at volume, so when those spots fill up applications close until one opens back up. That's not a marketing tactic, it's just arithmetic!

If you want my eyes on your business:

**[Apply here](https://cpgfoundersgroup.com/apply)**

It takes about five minutes and you just tell me where you are, what's in the way, and what a breakthrough would actually look like for you in ninety days. I read every application that comes in, and if it isn't a fit I'll tell you so directly, and usually I'll point you toward something that suits you better.

And if now genuinely isn't the time, that's completely fine. Stay on the list, the resources aren't going anywhere and neither am I.

But if you've been sitting on something...raise your hand. I lost twenty years to three seconds of not doing that.

Talk soon,
Jeff

*PS Not ready for that? The three things I'd do in your shoes, all of them cheaper. Start the [Babu trial](https://www.askbabu.ai) free for ten days, pick up the [MBA for CPG](https://cpgfoundersgroup.com/mba-for-cpg) for $997, or just come sit in the [founders group](https://cpgfoundersgroup.com/founders-only) and ask your question in there. All three of those beat trying to figure it out alone.*

---

# QA checklist before going live

**Links** — every URL below must return 200 or a working redirect. Several of these are new as of 2026-08-11:

- `cpgfoundersgroup.com/resources`
- `cpgfoundersgroup.com/book` ← new
- `cpgfoundersgroup.com/apply` ← new, replaced `/work-with-jeff`
- `cpgfoundersgroup.com/founders-only`
- `cpgfoundersgroup.com/mba-for-cpg`
- `askbabu.ai`
- `linkedin.com/in/jeffreydeanchurch`

**Send tests** — run a full test enrollment with a real deliverable address (not `@example.com`) and confirm:

1. All ten emails render with `{{first_name}}` correctly substituted
2. Email 9 contains **zero** links, including in the footer template
3. Replies to emails 3 and 9 land in Jeff's actual inbox
4. Unsubscribe works from email 1
5. Subject lines are still lowercase after saving

**Skip logic** — enroll a test contact carrying `WhatsApp Group` + `CPT Book Waitlist` and confirm emails 5 and 7 are skipped while 6 and 8 still send on days 19 and 22 (schedule must not shift).

**Exit logic** — apply `Paying Customer` to a mid-sequence test contact and confirm they stop receiving emails.

**Completion** — confirm `Nurture Complete` is actually applied after email 10. Verify via API:

```
GET https://api.kajabi.com/v1/contacts?page[size]=100&page[number]=N
```

Page through and check the test contact's `relationships.tags`. Remember the index lags ~60s. **If zero contacts ever acquire this tag, the build is not finished.**

**Cleanup** — delete all test contacts when done: `DELETE https://api.kajabi.com/v1/contacts/{id}` (returns 200).

---

# Report back

When the build is complete, report:

1. What was wrong with the `Nurture Complete` step on the old sequence and how you fixed it
2. Confirmation that all ten emails are loaded with correct delays
3. Results of the skip-logic and exit-logic tests
4. Any Kajabi limitation that prevented a rule from being implemented as specified — **do not silently substitute a different behavior**
5. Whether the old sequence is paused (it should be paused, not deleted)
