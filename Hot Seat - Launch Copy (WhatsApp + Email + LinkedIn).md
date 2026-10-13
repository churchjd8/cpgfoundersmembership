# The Hot Seat — Launch Copy

**What it is:** One founder, one real business challenge, the whole WhatsApp group weighing in for 24 hours.
**First Hot Seat:** Thursday, October 22, 2026
**Apply by:** Monday, October 19
**Founder chosen and everyone notified:** Tuesday, October 20
**Apply link:** https://cpgfoundersgroup.com/hot-seat
**Join link (non-members):** https://cpgfoundersgroup.com/founders-only
**Status:** Drafts for Joshua and Jeff's review. Nothing sent, scheduled, or loaded into Kajabi.

Suggested order: WhatsApp message Wed Oct 14, email Thu Oct 15, LinkedIn Fri Oct 16, WhatsApp reminder Mon Oct 19.

---

## 1. WhatsApp message (Jeff copy-pastes into the group)

Hi everyone,

The best part of this group is how much all of you have to share. I see it every day. Somebody asks a question, and within a few hours three or four founders who have already been through it are weighing in.

So we're going to try something new and point all of that at one founder's problem at a time. We're calling it the *Hot Seat*.

Here's how it works:

1. You apply and tell us the biggest challenge in your business right now (takes about 3 minutes)
2. We pick one founder
3. On Hot Seat day we put that challenge in front of the group, and for 24 hours everybody blitzes them with questions, ideas, intros, and whatever worked for you when you were in the same spot

The first one is *Thursday, October 22*.

If there's a problem you keep going around in circles on, raise your hand:
https://cpgfoundersgroup.com/hot-seat

Apply by Monday, October 19. We'll let everybody who applies know whether you're up this round or a fit for a later one.

And even if you're not the one in the seat, show up on the 22nd. You'll learn as much from somebody else's problem as you will from your own, and that founder is going to need what you know!

Jeff

### Reminder (Mon Oct 19, short)

Last call for the first Hot Seat! Applications close tonight.

One founder, one real challenge, and this whole group working on it for 24 hours this Thursday.

https://cpgfoundersgroup.com/hot-seat

---

## 2. Email to the full Kajabi list

**Audience:** Whole list (members and non-members). The email handles both.
**Subject:** Put your biggest problem in front of 350 founders

**Alt subjects:**
- Who wants the Hot Seat?
- One founder, one problem, 24 hours

**Preview text:** We're trying something new in the WhatsApp group on Thursday, October 22.

---

Hi {{first_name}},

I spent a lot of years learning things the expensive way.

At Suja there were plenty of problems I chewed on for weeks, when a ten minute conversation with a founder who had already been through it would have gotten me there. I just didn't have a room full of those founders to ask.

Now there is one. There are 350 CPG founders in our WhatsApp group, every stage from pre-launch to exit, and the best part of it is how much everybody in there has to share.

So we're going to try something new and point all of that at one founder's problem at a time.

We're calling it the Hot Seat.

Here's how it works. You apply and tell us the biggest challenge in your business right now. We pick one founder. Then on Hot Seat day we put that challenge in front of the group, and for 24 hours everybody goes to work on it. Questions, ideas, introductions, and what worked for them when they were in the same spot.

The first one is Thursday, October 22.

If there's a problem you keep going around in circles on (margins, a retailer decision, a raise, a co-packer, whatever it is), raise your hand.

[Apply for the Hot Seat](https://cpgfoundersgroup.com/hot-seat)

It takes about three minutes. Apply by Monday, October 19, and we'll let you know whether you're up this round or a fit for a later one.

Not in the WhatsApp group yet? The Hot Seat happens in there, so [come join us first](https://cpgfoundersgroup.com/founders-only). It's free and it stays free, and nobody is selling anything (that's the one rule).

And even if you don't want the seat yourself, be in there on the 22nd. You'll learn as much from somebody else's problem as you will from your own!

Jeff

---

## 3. LinkedIn post

**Link in body, not comments.** Remove the link preview card before scheduling.

We're trying something new in our CPG founders WhatsApp group...

We're calling it the Hot Seat.

One founder. One real business challenge. And 350 CPG founders working on it for 24 hours.

Here's where it came from. The best part of that group has nothing to do with me. It's that somebody asks a question at 9 o'clock in the morning and by lunch three or four founders who have already lived it are weighing in. Nobody is getting paid and nobody is selling anything.

So we figured, what happens if we point all of that at one founder's problem at a time?

You apply and tell us the biggest challenge in your business right now. We pick one founder. On Hot Seat day the group blitzes them with questions, ideas, introductions, and what worked when they were in the same spot.

I spent a lot of years at Suja chewing on problems by myself that a room like this would have solved in an afternoon. I would have paid a lot of money for one day in that seat!

The first one is Thursday, October 22. Applications close Monday, October 19.

Apply here: cpgfoundersgroup.com/hot-seat

Not in the group yet? It's free and it stays free. There's a link to join right on that page.

What's the one problem in your business you keep going around in circles on?

---

## Notes

- Applications land in the `hot_seat_applications` table in Supabase and send a notification email to joshua@teamchurch.co. Each one has name, email, business, website, a few sentences on the business, the challenge, the one question for the group, and whether they're in the WhatsApp group.
- The form asks applicants to tick a box agreeing that their business and challenge can be shared with the group if they're chosen.
- To run the next round, change `HOT_SEAT_DAY` and `APPLY_BY` at the top of `src/app/hot-seat/page.tsx`.
- "350 founders" matches the site. Bump it everywhere if the group has grown.
- The Suja lines ("learning things the expensive way", "chewing on problems by myself") are in Jeff's voice but he should confirm they're true to him before anything goes out.
- Still to decide: how the chosen founder's challenge gets posted on the 22nd (Jeff posts a written brief, or the founder records a short voice note or video), and whether Jeff adds his own take at the start or the end of the 24 hours.
