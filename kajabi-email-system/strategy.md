# Jeff's email system: the rebuild

**Goal:** turn a ~1,500-person list of CPG founders into 2 to 5 sales conversations a week (Strategy Session buys, applications, or "yes, let's talk" replies) without becoming the guy who emails too much.

**One-line version:** shorter welcome that asks sooner, one weekly letter for everyone, and a blunt every-other-week note for the people who are actually leaning in.

---

## 1. The offer ladder email is selling

Pulled from `/work-with-jeff`, `/apply` and `src/lib/*-offer.ts` on 2026-10-28.

| Rung | Price | Email's job |
|---|---|---|
| Free resources (kits, masterclass, white papers) | Free | Entry. Already handled by the kit automations. |
| WhatsApp founders group | Free | Community + trust. Mention, don't lead with it. |
| Babu | 10-day trial, then from $39/mo | PS line. Has its own onboarding sequence. |
| MBA for CPG | $997 list, $497 founder price in the free-training window | Self-serve founders. Its own 3-day funnel. |
| **Strategy Session** | **$997**: 90-min 1:1 + MBA for life, credited toward advisory if they start within 30 days | **The main ask.** Buy-now, no application gate, low regret. |
| Private Advisory | $1,997/mo, 3-month minimum | Via application at /apply |
| VIP Advisory | $4,997/mo, 3-month minimum | Via application at /apply |

The Strategy Session is the "we should talk" offer Taki Moore talks about, with a price on it. Every email that ends in "we should talk" should point to it (or to a reply), not to "apply, 2 or 3 spots."

## 2. What the research says (and how it applies to Jeff)

Short version of what I'd bet on, from Taki Moore's framework, Dean Jackson's reactivation work, and what Jeff's own data shows:

1. **Email sells conversations, not courses.** For a $2K-$15K offer, a reply is worth more than a click. Write to get replies: plain text, from Jeff, one question at the end.
2. **One piece of content, five emails.** Taki Moore's five types (Problem, Proof, Philosophy, Plan, Ask) turn one idea into a week of mail without repeating yourself, and every one ends "we should talk." Jeff already has the raw material: the Fatal Flaws white paper, Suja lessons, the dilution ladder, the client stories.
3. **Segment by behavior, not by list.** Jeff's warm segments click 5 to 10 times more than full-list sends (see `engagement-analysis.md`). The people who clicked a "work with Jeff" link or replied in the last 30 days deserve a different email than someone who downloaded a kit in April and hasn't opened since.
4. **Short, direct questions reactivate.** Dean Jackson's "9-word email" ("Are you still looking to …?") is a plain one-line question that gets replies from people who went quiet. His reported 25-40% response rates are self-reported, so treat them as a ceiling. Jeff's own Accelerator emails "Should you apply or not?" and "Quick check-in (then I'll disappear)" got 88% and 92% opens on hand-raisers, so the pattern already works on this audience.
5. **Ignore open rates.** Apple Mail Privacy Protection inflates them. Track clicks on offer links, replies, applications, and Strategy Session purchases.
6. **Consistency beats volume.** A weekly letter that shows up every Tuesday builds more trust than bursts. For busy founders, one a week plus one targeted note every two weeks is plenty.

## 3. The system

```
Opt-in (kit, WhatsApp, newsletter, masterclass)
   │  kit delivery email (unchanged, working)
   ▼
WELCOME v3: 10 emails over 21 days, built on the 5 types
   │  the Strategy Session ask shows up on Day 5, not Day 25
   │  stops on purchase / application / "Paying Customer"
   ▼  tag: Nurture Complete
WEEKLY LETTER (everyone, every Tuesday)
   │  one idea from Jeff's best LinkedIn post or blog of the week
   │  + one reader question answered ("Founder Mailbag")
   │  + rotating PS (Strategy Session / MBA / Babu / event)
   ▼  clicks an offer link or replies → tag: Hot Lead (30 days)
HOT LIST NOTE (every other Thursday, Hot Lead tag only)
   │  one blunt Taki Moore-type email, plain text, ends "we should talk"
   ▼
Strategy Session ($997) or reply → Joshua's team books the call
```

Events (Hot Seat, webinars, Fatal Flaws) stay as their own short campaigns, 3 to 4 a year.

**Max frequency for anyone:** 1 a week (everyone) + 1 every other week (hot) + event bursts. A Hot Lead gets about 6 emails a month. That's well inside "not overkill."

### 3a. Welcome v3 (replaces v2 and the 30-day)

Draft: `drafts/welcome-sequence-v3.md`. Changes vs v2:
- 21 days, not 31. The important stuff lands before the Day 15 attention drop.
- First Strategy Session mention on Day 5 (Krystal proof story). Direct ask on Day 18. Close-the-loop reply email on Day 21.
- Every email has one job and one link. Babu, the book, LinkedIn and WhatsApp move to PS lines.
- Day 1 asks one segmentation question by reply ("which stage are you: 1, 2, 3 or 4?"). Jeff's team tags replies by stage.
- Keeps Jeff's three strongest stories (end zone, Krystal, Kilimanjaro/rehab) and the gross-margin teaching.
- Adds the dilution ladder (from the old masterclass sequence) as the Philosophy email.

### 3b. Weekly letter

Template: `drafts/weekly-letter-template.md`. Answers your "weekly roundup" question: yes, but **not a roundup of links.** Link roundups train people to skim. One idea, told well, with one reply-bait question. Source it from whatever LinkedIn post or blog did best that week, so it's 20 minutes of work, not a new piece of content.

The mailbag is how we "milk the amazing emails we're getting": every good reply, application answer, or WhatsApp question (anonymized, with permission) becomes next week's lead. It also tells the list that Jeff actually reads replies, which drives more replies.

### 3c. Hot List

Draft cycle: `drafts/hot-list-campaign.md`. Answers your "every 2 weeks, hit the most engaged with a Taki Moore email" question: yes, this is the highest-leverage piece.

**Who's on it** (tag `Hot Lead`, auto-removed after 30 days by a Wait step in the automation):
- Clicked a link to /work-with-jeff, /apply, /mba-for-cpg, or a Strategy Session link in any email (Kajabi link-click trigger → add tag)
- Replied to any email with something real (Jeff's team adds the tag by hand when they triage replies)
- Registered for a live event in the last 30 days
- Started a Babu trial

**Who's never on it:** Paying Customer, advisory clients, Strategy Session buyers, anyone who applied in the last 30 days.

**What they get:** every other Thursday, one short plain-text email from Jeff, cycling through Problem → Proof → Philosophy → Plan → Ask. One idea per cycle (e.g. gross margin, then fundraising, then retail). Every one ends with "we should talk" pointing at the Strategy Session, or "just reply with X."

## 4. Kajabi to-do list (in order)

Quick fixes first, they're live problems today:

1. **Connect the MBA free-training sequence.** Subscribe trigger: form `MBA Funnel - Free Training Registration`. (Only when traffic starts going to /free-training.)
2. **Add unsubscribe triggers to v2 now:** tag `Paying Customer`, offer granted `MBA for CPG`, and the `Applied …` tags. Stops pitching people who already bought.
3. **Publish the "Sequence completed → Nurture Complete" automations** for v2 and the 30-day. Delete the other four Aug 11 drafts.
4. **Pause legacy sequences:** Accelerator info request, Fundraising Masterclass, Existing Contact Nurture, Babu AI BETA, 30 Day Babu, Babu upgrade last chance, BABU Holding pattern.

Then the rebuild:

5. Build Welcome v3 as a new sequence. Move all 16 form triggers from v2 and the 30-day onto it. Let current subscribers finish v2; new people go to v3.
6. Create tags `Hot Lead`, `Stage 1 Pre-launch` … `Stage 4 $10M+`, `Strategy Session Buyer`, `MBA Buyer`.
7. Link-click automations: in every v3 email and weekly letter, a click on the Strategy Session / apply link adds `Hot Lead`.
8. Code change in `src/app/api/stripe-webhook/route.ts`: after granting the MBA offer, tag the contact `Strategy Session Buyer` or `MBA Buyer` so Kajabi can exclude and segment them.
9. Weekly letter: a Kajabi broadcast every Tuesday to everyone with `Nurture Complete` (and the old list), excluding active v3 subscribers.
10. Hot List: a Kajabi broadcast every other Thursday to `Hot Lead`, excluding customers.

## 5. Measurement (the blind spot to close)

- **UTM every offer link**: `?utm_source=kajabi&utm_medium=email&utm_campaign=welcome-v3-e5` and have /apply and the Strategy Session checkout store `utm_campaign`. Then we know which email sold.
- **Reply log**: Jeff's replies forward to a shared inbox (or a Superhuman split) the team triages twice a week. Count replies per email in a simple sheet. Tag hot ones.
- **Weekly scoreboard** (5 numbers): new subscribers, replies, Hot Lead count, Strategy Sessions sold, applications.

## 6. What I'd test first

1. Welcome v3 Day 5 (Krystal + Strategy Session) vs v2's Day 25 placement: Strategy Session clicks per 100 new subscribers.
2. Hot List subject lines: lowercase plain question ("still raising this year?") vs statement.
3. Weekly letter send day: Tuesday 7 AM PT vs Thursday 7 AM PT.
