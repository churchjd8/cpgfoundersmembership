# Routine: LinkedIn DM prospect scan

Schedule: Tuesdays and Fridays, 9:00 AM Pacific (cron `0 9 * * 2,5`)

Setup: in the Claude desktop app sidebar, open Scheduled, then New task. Set Weekly on Tue + Fri at 9:00 AM, and paste everything below the line as the prompt. Each run opens as its own session with a notification, and the drafts doc is its final message.

---

Scan Jeff Church's LinkedIn DM inbox for CPG founders worth replying to. Draft replies in Jeff's voice, write them up as a drafts doc, and email that doc to Joshua. Do NOT send any LinkedIn messages.

## Context

Jeff Church runs CPG Founders Group (cpgfoundersgroup.com). These replies should turn CPG founders into clients. Joshua (Jeff's team) takes the calls with applicants, NOT Jeff. Never write as if Jeff will hop on a call or review something personally. Say "my team will grab some time with you" or similar.

Links (use exactly ONE per DM):
- cpgfoundersgroup.com/work-with-jeff lists every offer with prices: Free, Babu ($29/mo), MBA ($497), Strategy Session ($997, with fit guarantee and MBA included), Private Advisory ($1,997/mo), VIP Advisory ($4,997/mo). This is the DEFAULT link, because the Strategy Session is buy-now and has the guarantee. A good line for it: "most folks start with a strategy session".
- cpgfoundersgroup.com/apply is a 2-minute application that lands them on an intro call with Jeff's team. Use it only for someone who already got /work-with-jeff and went quiet, or who clearly wants a conversation more than a product.
- Someone who already applied gets a nudge to book with the team, not a link to apply again.

## Steps

1. Use Claude in Chrome, which is signed in to LinkedIn as Jeff. Open a new tab to https://www.linkedin.com/messaging/. Load conversations from the last 5 days by scrolling the conversation list until the dates are older than that.
2. Skip these:
   - vendor and agency pitches
   - recruiters and job seekers
   - podcast and book-promo pitches
   - people pitching or partnering with Jeff's other company PRODA
   - congrats-only or generic "let's connect" notes
   - any thread where Jeff already sent the most recent message
3. Put founders who are raising money and pitching Jeff to invest in a separate "Jeff's call" list. Do not draft for them.
4. Flag every thread from a CPG, food or beverage founder or operator who is building a brand, launching into retail, or asking Jeff for advice or time. Also flag anyone who says they applied, and any lead from an earlier sweep who answered Jeff's last DM. Open each flagged thread and read the whole conversation and the person's headline.
5. Draft a reply for each flagged thread in Jeff's real LinkedIn DM register: short (2-4 short paragraphs), casual, a little rough, like a typed voice note.
   - Reference one specific thing they said, and ask one real question.
   - One exclamation point at most. "btw", "prob" and "..." are fine. Always type "with", never "w".
   - Optionally one Jeff line, only if it fits: "Don't confuse distribution gains with velocity gains".
   - Sign off "Jeff".
   - No em-dashes, no "honestly", and no polished AI phrasing like "great proof point", "skip the background" or "that's how the best people find us".
   - Full style guide: /home/joshua/jeffchurch/Jeff Church Voice Profile.md, if you can open it.
6. Write the drafts doc using the template below. Post the full doc as your FINAL message in this session, because that's what Joshua opens and reads. If the jeffchurch project folder is accessible, also save it there as `Jeff LinkedIn DM Drafts - <Mon D>.md` (for example "Jeff LinkedIn DM Drafts - Nov 6.md").
7. If nobody qualifies, end with "No new leads" and a one-line list of who you skipped.
8. Close the tab you opened. Never click Send in LinkedIn, and never leave text in a LinkedIn message box.

## Doc template

```
# Jeff LinkedIn DM Drafts - <Mon D, YYYY>

Sweep covered <start date> to <today>. Nothing sent. Reply "send" (or "send 1 and 3") in Claude to have them sent.

## Reply to these (client leads)

### 1. <Name>, <Company> (<what they make>) - <HOT / WARM FOLLOW-UP / LIGHT TOUCH>

<1-2 lines: who they are, stage/traction, why they're a lead.>

**Their message (<date>):**
> <their latest message, verbatim>

**Draft:**
> <draft, paragraph by paragraph>
>
> Jeff

---

(repeat for each lead, hottest first)

## Jeff's call (raising money, not buying help)

- **<Name>, <Company>.** <one line>

## Skipped

<One short paragraph listing names grouped by reason: vendor pitches, job seekers, networking, etc.>
```
