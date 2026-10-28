# Routine: Stripe failed-payment notice drafts

Schedule: every hour, 7 AM to 7 PM Pacific (cron `0 7-19 * * *`)

Paste everything below the line into a new Routine in the Claude desktop app.

How it works: the site's Stripe webhook (`src/app/api/stripe-webhook/route.ts`) emails info@teamchurch.co a "Failed Payment - Name ($X) [in_...]" alert with the client's email and a Stripe payment link, and a "Payment Recovered - ... [in_...]" alert when a failed invoice later gets paid. This routine turns those alerts into Superhuman drafts from joshua@teamchurch.co with Jeff on CC. It never sends anything.

---

Turn Stripe failed-payment alerts into friendly payment-notice drafts from Joshua, with Jeff on CC. Draft only. NEVER send an email.

Use the Superhuman connector for everything. Pass the acting_email named in each step on every call.

Steps:

1. Search the info@teamchurch.co inbox (acting_email info@teamchurch.co) for emails from notifications@cpgfoundersgroup.com received in the last 14 days with a subject starting "Failed Payment -" or "Payment Recovered -". Only use alerts whose subject ends in a Stripe invoice tag like "[in_1Abc...]". Ignore alerts without that tag.

2. Group the alerts by invoice id (the in_... tag). Open each one and read the table: Customer, Email, Amount, For, Payment link, Draft client notice.

3. Skip an invoice when ANY of these is true:
   - It has a "Payment Recovered" alert (it's paid, go to step 6 for it instead).
   - "Draft client notice" says "no" (AskBabu plan or no payment link).
   - The customer email is unknown, or is a teamchurch.co or cpgfoundersgroup.com address.
   - joshua@teamchurch.co (acting_email joshua@teamchurch.co) already has a draft or a sent email to that customer email in the last 30 days with a subject containing "heads up on your payment". One notice per invoice, never a second one.

4. For each invoice left, create ONE new draft with create_or_update_draft:
   - acting_email: joshua@teamchurch.co
   - from: joshua@teamchurch.co
   - to: the customer email
   - cc: jeff@teamchurch.co
   - type: new
   - subject: Quick heads up on your payment
   - Use the `body` field with the exact text below as simple HTML paragraphs (never the `instructions` field). Fill in {first name} from the Customer field (first word of a person's name; if it's a company name use "there"), {amount}, {what it's for} (the "For" field, cleaned up to plain words, e.g. "1 × CPG Founders Membership (at $1,500.00 / month)" becomes "CPG Founders Membership"), and {payment link} (make it a clickable link).

   Body:

   Hi {first name},

   Hope you're doing well! Quick heads up that your {amount} payment for {what it's for} didn't go through. Usually it's just an expired card or a bank flag, nothing to stress about.

   Here's a secure Stripe link to update your card and finish the payment whenever you get a sec:
   {payment link}

   If anything's changed on your end or you'd like to talk it through, just reply here and we'll sort it out together. I've cc'd Jeff so he's in the loop too.

   Thanks so much!

   Joshua
   Team Church

   Keep the wording. No em-dashes.

5. Do not send. Leave every draft in joshua@teamchurch.co Drafts for Joshua to review.

6. For each invoice with a "Payment Recovered" alert: look in joshua@teamchurch.co drafts (acting_email joshua@teamchurch.co) for an unsent draft to that customer email with subject "Quick heads up on your payment". If there is one, discard it with discard_draft. Never touch anything already sent.

7. Finish with a short summary of what you drafted and discarded (name, amount, invoice id). If nothing changed, say "No new failed payments." and stop. Do not email the summary.
