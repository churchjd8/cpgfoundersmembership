# Routine: Work with Jeff application reply drafts

Schedule: every hour, 7 AM to 9 PM Pacific (cron `0 7-21 * * *`)

Paste everything below the line into a new Routine in the Claude desktop app.

How it works: every /apply submission hits `src/app/api/work-with-jeff/route.ts`, which emails joshua@teamchurch.co a "🔥 Work with Jeff Application: Name (Business) - Interest" notification from notifications@cpgfoundersgroup.com. Bots are dropped before that email goes out, and gibberish submissions arrive as "🚫 Likely spam application: ..." instead (see `src/lib/application-spam.ts`). This routine turns each real notification into a personal reply draft from Joshua that points to /work-with-jeff and the intro call link. It never sends anything.

---

Turn new Work with Jeff applications into personal reply drafts from Joshua. Draft only. NEVER send an email.

Use the Superhuman connector for everything. Pass acting_email joshua@teamchurch.co on every call.

Steps:

1. Search joshua@teamchurch.co for emails from notifications@cpgfoundersgroup.com received in the last 3 days whose subject starts with "🔥 Work with Jeff Application". Ignore anything whose subject starts with "🚫 Likely spam".

2. Open each one and read: Name, Email, Business, Website, Interested in, Revenue, Biggest challenge, What a breakthrough looks like in 90 days, How they heard about Jeff.

3. Skip an application when ANY of these is true:
   - It looks fake: random letter strings for the name, business or answers, a made-up website, or answers that say nothing. List it in the summary as "skipped, looks like spam" instead of drafting.
   - joshua@teamchurch.co already has a draft or a sent email to the applicant's email address in the last 30 days (any subject). They already heard from us or are mid-conversation.
   - The applicant's email is a teamchurch.co, cpgfoundersgroup.com or arkpartners.ai address (internal test).

4. For each application left, create ONE new draft with create_or_update_draft:
   - acting_email: joshua@teamchurch.co
   - from: joshua@teamchurch.co
   - to: the applicant's email
   - type: new
   - subject: 🔥 Your application to work with Jeff Church ({Business})
   - Use the `body` field with simple HTML paragraphs (never the `instructions` field). Follow the template below.

   Body template:

   Hi {first name},

   Thanks for submitting your application. I'm Joshua, I work with Jeff Church over at CPG Founders Group.

   {Personal paragraph: 2 to 4 sentences. Reflect their specific challenge and 90-day breakthrough back in plain words, show you actually read it, and say why it's right in Jeff's wheelhouse. Use ONE relevant Jeff credential that matches their challenge: fundraising → "He's raised $275M+ across 40+ rounds"; scaling, retail or distribution → "He co-founded Suja Juice and scaled it past $100M in five years before a $300M exit"; general or exits → "He's been founder/CEO eight times with five exits". Never invent facts about their business.}

   I put together a page that lays out every way to work with Jeff, what's included, and the pricing for each, all in one place:

   {Work with Jeff link}

   {If "Interested in" is "Not sure, help me choose": "Since you weren't sure which option fits, have a read, and then grab a time with me here:" Otherwise: "Have a read, and if it feels like the right kind of support, grab a time with me here:"}

   https://cal.arkpartners.ai/joshua/intro

   It's about twenty minutes. We'll talk through {their main challenge in a few words} and which option makes the most sense for where you are. If none of them are a fit, I'll tell you that.

   Talk soon,

   Joshua

   Work with Jeff link (make it clickable, use the full URL as the link text):
   - Interested in Strategy Session → https://cpgfoundersgroup.com/work-with-jeff#session
   - Interested in Private Advisory or VIP Advisory → https://cpgfoundersgroup.com/work-with-jeff#advisory
   - Not sure, or anything else → https://cpgfoundersgroup.com/work-with-jeff

   Voice rules: casual but clear, short paragraphs, no em-dashes, no "honestly", sign off just "Joshua". Never call Joshua "Josh".

5. Do not send. Leave every draft in joshua@teamchurch.co Drafts for Joshua to review.

6. Finish with a short summary: who you drafted for (name, business, interest), and who you skipped and why. If there were no new applications, say "No new applications." and stop. Do not email the summary.
