---
kajabi_sequence_id: 2148903072
name: MBA Funnel - Free Training Sequence
status: Active (but nothing feeds it)
subscribers: 0
emails: 7 over 3 days (7 AM and 5 PM PT)
subscribe_triggers: none
unsubscribe_triggers: none
source_copy: "../../MBA for CPG Funnel - Email Sequence.md"
mirrored_from_kajabi: 2026-10-28
---

# MBA Funnel - Free Training Sequence

The follow-up for /free-training ("How to Be the 7%"). Registration posts to the Kajabi form `MBA Funnel - Free Training Registration` (ID 2149751577, see `src/lib/founder-offer.ts`), and the site starts a 3-day $497 founder-price window in a cookie.

## The break

**The sequence has zero subscribe triggers and no automation subscribes anyone to it.** So a registrant gets the cookie window on the site but none of these seven emails, including Email 1 with the training link and the "ends tonight" close. 0 sends to date.

Fix (two minutes in Kajabi): add a subscribe trigger "Form is submitted: MBA Funnel - Free Training Registration". Then add an unsubscribe trigger on the MBA purchase tag so buyers don't get the "ends tonight" emails. Hold this until ads or posts actually start sending people to /free-training, because the founder-price clock starts at registration.

Edit link: https://app.kajabi.com/admin/email_sequences/2148903072

## Emails

The live copy matches `MBA for CPG Funnel - Email Sequence.md` in the repo root (spot-checked subjects and body lines on 2026-10-28). Edit there, then push.

| # | When | Subject | Preview |
|---|------|---------|---------|
| 1 | Immediately | Your training is ready | 93% don't make it. Here's how to be the 7%. |
| 2 | Day 1, 7 AM | "What's a HACCP plan?" | I asked a Whole Foods buyer that. Out loud. |
| 3 | Day 1, 5 PM | The $1 million handshake | Ninety days later, the deductions showed up. |
| 4 | Day 2, 7 AM | What's inside the MBA for CPG | The 8 modules, the tools, and who it's for. |
| 5 | Day 2, 5 PM | "Zero beverage or CPG experience" | What founders who went through it said. |
| 6 | Day 3, 7 AM | Questions I'm getting | Too early? Not a numbers person? How long does it take? |
| 7 | Day 3, 5 PM | The founder price ends tonight | A few hours left at $497. |

Note: Email 1 says "Immediately" but is set to `min 660` in Kajabi. Kajabi ignores the time for Day 0 "immediately" emails, so this is fine, but worth confirming with a test signup.

## What's missing for the high-ticket path

Every email sells the $497 MBA. Nothing routes the founders who reply "we're past $1M" (Email 1's PS asks for that) into the $997 Strategy Session. Add one line to Email 6's "Do I get time with you?" answer pointing to the Strategy Session at /work-with-jeff, and a post-window email on Day 5 for non-buyers: "the course isn't for you, maybe 90 minutes with me is."
