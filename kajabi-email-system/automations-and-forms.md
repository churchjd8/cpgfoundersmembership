# Kajabi wiring map: forms → automations → sequences

Pulled from Kajabi on 2026-10-28. Site: CPG Founders Group (site ID 2148589556). 59 automations, 32 forms, 11 "Active" sequences.

## Changes made in Kajabi (2026-10-28)

- **New automation "Buyers exit welcome sequences (Paying Customer / MBA)"** (workflow 1305585, Published). Triggers: tag `Paying Customer` added, OR offer `MBA for CPG` granted, OR offer `MBA for CPG` purchased. Actions: unsubscribe from v2, unsubscribe from the 30-day. Since the Stripe webhook grants the MBA offer for both MBA and Strategy Session sales, this covers Strategy Session buyers too.
- **Published both "Sequence completed → add tag Nurture Complete" automations** (901478 for v2, 902024 for the 30-day). This only applies to people who finish from today on; the ~550 who already finished v2 don't have the tag. Use `Contact Nurtured` or the v2 Email 10 send list to catch them.
- **Not done: pausing legacy sequences.** Kajabi has no pause or deactivate for sequences, only Delete. They're effectively idle already: Accelerator, Existing Contact and the Babu beta flows have no subscribe trigger, and Fundraising Masterclass is triggered by a form nothing posts to anymore. A handful of Existing Contact subscribers may still be mid-sequence. Delete them by hand if you want them gone from the list.
- **Not done (on purpose): MBA free-training trigger.** Waiting until traffic goes to /free-training.

## How a contact gets in today

| Entry point (site page) | Kajabi form | What fires | Lands in |
|---|---|---|---|
| /resources, single kit (Profitability / Fundraising / Starting Line) | `Profitability Kit`, `Fundraising Kit`, `Starting Line Kit` | Automation: add tag `Kit - …` → **send kit delivery email** → subscribe to v2 | **New Contact Nurture v2** |
| /resources "all three" | `All three kits (site)` (2149705468) | tag `Kit - All Three (Site)` → delivery email → v2 | v2 |
| /toolbox (book readers) | `All three kits (book)` (2149705470) | tag `Kit - All Three (Book)` → delivery email → v2 | v2 |
| /founders-only (WhatsApp) | `WhatsApp Group Form` | "WhatsApp submission flow" (published): tag `WhatsApp Group`. Two older drafts that also send an email are unpublished. | v2 (form is a v2 subscribe trigger) |
| Older April resource forms (chart of accounts, runway, unit pricing, white papers, playbook replay, masterclass replay, all-resources bundle) | `Free Resource - …` (8 forms) | add a tag only | **New Contact Nurture (30 days)** via sequence triggers |
| Newsletter signup | `General Newsletter Sub` | tag `General Newsletter Sub` + subscribe to 30-day | 30-day |
| /free-training (MBA funnel) | `MBA Funnel - Free Training Registration` (2149751577) | **nothing** | **nowhere** (see below) |
| /book waitlist | `CPT Book Waitlist` | tag `CPT Book Waitlist` | no sequence |
| Fatal Flaws webinar | `9.15 Fatal Flaws Webinar Registration` | register to event | event emails only |
| /apply | site API → Kajabi contact + note (not a Kajabi form) | — | — |
| Stripe: MBA or Strategy Session purchase | site webhook grants Kajabi offer `MBA for CPG` (2151100632) | Kajabi's own offer welcome email | — (no tag, no sequence change) |
| Babu trial | tag `Babu 10 Day Trial` | subscribe to Babu 10 Day | Babu 10 Day |

## Free-resource delivery: status

**Working.** The current kit forms each run a three-step automation (checked on "Kit - Profitability"): add tag → send the kit email ("The Fastest Path to Profitability Kit") → subscribe to v2. Every link in the repo copy of the kit emails (`kajabi-emails/*--paste-into-kajabi.html`) returns 200 as of today, including all the Google Drive downloads.

Run counts since Aug 27: Profitability 29, Fundraising 19, Starting Line 15, All three (site) 38, All three (book) 1.

Caveats:
- I verified the repo copy of the kit emails, not the HTML pasted inside each Kajabi automation. If someone edited the Kajabi version directly, the two may differ. Quick check: send yourself a test from each automation.
- The April single-resource forms (chart of accounts etc.) only add a tag. Delivery for those happens on the site (download/redirect after submit), not by email. They still feed the 30-day nurture.
- The "All Resource Bundle Delivery" automation (69 runs) is also tag-only.

## Gaps and bugs

1. **MBA free-training sequence isn't connected.** 0 subscribe triggers, 0 automations. Registrants get no training link email and no founder-price follow-up. Add trigger: form `MBA Funnel - Free Training Registration`.
2. **Nobody graduates from the welcome sequence.** Both "Sequence completed → add tag Nurture Complete" automations are Draft. `Nurture Complete` has never been applied. After Day 31 people only hear from Jeff when a broadcast goes out.
3. **v2 has no unsubscribe triggers.** Paying customers, MBA buyers, Strategy Session buyers and advisory clients all keep getting "apply" and "buy the MBA" emails. The "(skip if …)" in the v2 email titles is a note, not a rule: Kajabi sequence emails have no conditions set.
4. **Two welcome sequences with the same copy.** v2 (kits + WhatsApp) and the 30-day (April forms + newsletter). Edits to one don't reach the other.
5. **Strategy Session buyers are invisible in Kajabi.** The Stripe webhook grants the MBA offer for both MBA and Strategy Session sales, with no tag to tell them apart. Fix in code: after `grantKajabiOffer`, also apply a tag (`Strategy Session Buyer` / `MBA Buyer`) through the Kajabi API, so sequences can exclude and segment on it.
6. **WhatsApp joiners get the WhatsApp pitch.** The WhatsApp form feeds v2, and v2 Email 5 asks them to join WhatsApp.
7. **Six automations from Aug 11 are sitting in Draft** (subscribe/unsubscribe/complete for v2). They were the intended wiring for items 2 and 3. Finish and publish them, or delete them.
8. **Legacy still live:** Accelerator info sequence (dead apply link), Fundraising Masterclass sequence, Existing Contact Nurture, and four finished Babu sequences all show "Active".

## Tags that matter for segmentation

`Kit - Profitability`, `Kit - Fundraising`, `Kit - Starting Line`, `Kit - All Three (Site)`, `Kit - All Three (Book)`, `WhatsApp Group`, `CPT Book Waitlist`, `General Newsletter Sub`, `Babu 10 Day Trial`, `Babu Beta Access`, `Paying Customer`, `Contact Nurtured`, `New Contact Nurture Sequence`, `Existing Contact To Nurture`, `Applied for 90-day Breakthrough`, `Applied for VIP Day`, `Burn Rate Workshop Replay Access`, `Fundraising Masterclass Replay (3 Hours)`.

The kit tags are the best signal we have of what a person cares about: Fundraising kit = raising; Profitability kit = margin/burn; Starting Line = pre-launch. The new welcome sequence should branch on them.
