# Kajabi email system: index

Everything Jeff's Kajabi (CPG Founders Group) sends automatically, mirrored here so we can edit in Markdown and push changes back. Snapshot taken from Kajabi on **2026-10-28**.

## Start here

| File | What it is |
|---|---|
| [engagement-analysis.md](engagement-analysis.md) | Open/click stats for every sequence and broadcast, and what they mean |
| [automations-and-forms.md](automations-and-forms.md) | Which form feeds which automation feeds which sequence, free-resource delivery check, bugs |
| [strategy.md](strategy.md) | The rebuild: welcome v3 + weekly letter + Hot List, Kajabi to-do list, measurement |
| [drafts/welcome-sequence-v3.md](drafts/welcome-sequence-v3.md) | New 10-email welcome built on Taki Moore's 5 types, Strategy Session as the main ask |
| [Welcome v3 review doc](https://claude.ai/artifact/LENmRRuLhfGGQpgFRrz1Yt) | Editable copy of welcome v3 for Joshua's edits and comments. **This is the source of truth while v3 is in review**; sync it back into the .md before pushing to Kajabi |
| [drafts/hot-list-campaign.md](drafts/hot-list-campaign.md) | Every-other-week blunt emails to engaged contacts (cycle 1: gross margin) |
| [drafts/weekly-letter-template.md](drafts/weekly-letter-template.md) | Weekly letter format + a sample issue |

## Live sequences (mirrors)

| Sequence | Kajabi ID | In it | Status | File |
|---|---|---|---|---|
| New Contact Nurture Sequence (v2 2026) | 2148872408 | 748 | **Main welcome.** Full copy mirrored | [sequences/new-contact-nurture-v2.md](sequences/new-contact-nurture-v2.md) |
| New Contact Nurture (30 days) | 2148811726 | 157 | Duplicate of v2 Emails 2-10 | [sequences/new-contact-nurture-30-day.md](sequences/new-contact-nurture-30-day.md) |
| Existing Contact Nurture (8 Weeks) | 2148812666 | 734 | Stale, recommend pause. Full copy mirrored | [sequences/existing-contact-nurture.md](sequences/existing-contact-nurture.md) |
| MBA Funnel - Free Training | 2148903072 | 0 | Not connected to its form | [sequences/mba-free-training.md](sequences/mba-free-training.md) (copy in `../MBA for CPG Funnel - Email Sequence.md`) |
| Accelerator info request | 2148768820 | 26 | Legacy, dead apply link | [sequences/legacy-accelerator-and-fundraising.md](sequences/legacy-accelerator-and-fundraising.md) |
| Fundraising Masterclass | 2148783461 | 3 | Legacy | same file |
| Babu 10 Day Free Trial | 2148847676 | 92 | Active, product onboarding | [sequences/babu-sequences.md](sequences/babu-sequences.md) |
| 30 Day Babu / Babu last chance / Babu Limbo / Babu BETA | various | — | Finished or unused | same file |

Kit delivery emails (one per free kit) live in `../kajabi-emails/` and are sent by the kit automations, not by a sequence.

## The five biggest problems right now

1. The **$997 Strategy Session never appears** in the welcome sequence. The first apply link shows up on Day 25.
2. **Nobody graduates.** The "Nurture Complete" automations are drafts, so after Day 31 people only get occasional broadcasts.
3. **Buyers keep getting pitched.** v2 has no unsubscribe triggers, and Stripe purchases don't tag anyone in Kajabi.
4. **The MBA free-training follow-up isn't wired** to its registration form.
5. **Replies and applications aren't attributed to emails**, so we're flying blind on what actually works.

## How to edit and push

1. Edit the Markdown here (subject, preview, body). Keep the `Kajabi email ID` line intact, it's how we find the email.
2. Ask Claude to "push welcome email 3 to Kajabi" (or similar). It opens `https://app.kajabi.com/admin/email_sequence_emails/<ID>/edit` in Chrome, updates the subject/preview/body, saves, and sends a test to you.
3. Commit the Markdown change so the repo stays the source of truth.

For new sequences (welcome v3), Claude creates the sequence and emails in Kajabi from the draft file, then writes the new IDs back into the file.

## Refreshing the stats

Stats are a snapshot. To refresh, ask Claude to re-pull from Kajabi (it reads each sequence page in Chrome). Kajabi doesn't record replies, so reply counts have to come from Jeff's inbox.
