"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does the application process work?",
    a: "You fill out a short application telling us about your business and what you're working through. We review it and get back to you within 2 business days. If it's a fit, we'll send you full program details and you can schedule your 1:1 diagnostic with Jeff to kick things off.",
  },
  {
    q: "What's the diagnostic?",
    a: "It's a 1:1 session where Jeff digs into your business, asks the right questions, and identifies the real bottleneck blocking your next stage. You walk out with a clear picture of what needs to happen and how the 90 days will attack it. If you go through the diagnostic and don't feel like this is the right fit, you get a full refund. No questions asked.",
  },
  {
    q: "I'm pre-revenue. Is this for me?",
    a: "It can be, if you're serious and bring the right foundation. We've worked with pre-revenue founders who have prior operating experience, strong networks, or deep category knowledge. If you've got real skin in the game and you're committed to bringing your product to market, there's a ton here for you. If you're still kicking the tires or just exploring the idea, this probably isn't the right fit yet. Not sure? Apply and we'll tell you straight.",
  },
  {
    q: "How much time do I need to commit?",
    a: "That's up to you. The group sessions with Jeff are 90 minutes, 3x/mo. The Monday accountability calls are 30 minutes (optional). Beyond that, you engage as much or as little as you need. Some founders go deep into the templates and MBA for CPG course right away. Others lean on Babu and email access. This is built to flex around your schedule.",
  },
  {
    q: "What happens after the first 90 days?",
    a: "You can continue month-to-month with the same access to Jeff, group sessions, community, and all the tools. No annual contracts, no lock-in. Stay as long as it's valuable. Full details are shared after your application is reviewed.",
  },
  {
    q: "What if I've already done the CPG Accelerator or another program?",
    a: "Great, you'll get even more out of this. Many members come in with prior program experience and want ongoing direct access to Jeff and the community. The 90-Day Breakthrough picks up where other programs leave off and keeps you plugged in as you grow.",
  },
  {
    q: "What's Babu?",
    a: "Babu is a custom AI advisor trained on Jeff's 35+ years of CPG experience and loaded with 4,000+ expert resources. Use it for market research, financial review, pricing strategy, competitor tracking, or to pressure-test your investor and retail decks. Think of it as a CPG co-founder in your pocket, available 24/7. Included in the 90-Day Breakthrough.",
  },
  {
    q: "Who are the guest speakers?",
    a: "Founders and operators from some of the most successful CPG brands in the industry. Past and upcoming speakers include Justin Prochnow (FDA Attorney), Mike Burgmaier (CPG Investment Banker), Wayne Wu (VMG Private Equity), Mark Rampolla (ZICO Rising), John Foraker (Annie's & Once Upon a Farm), Seth Goldman (Honest), Stephen & Allison Ellsworth (Poppi), and Kim Perell (Juni). These aren't theoretical talks. They're real stories from people who've built what you're building.",
  },
  {
    q: "How do I know if I'm a good fit?",
    a: "Apply. We'll review your application and be straight with you. If it's a fit, we'll walk you through how it works and get you started. If it's not, we'll point you toward the right next step — whether that's the MBA for CPG, Babu, or something else entirely.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border">
      {faqs.map((faq, i) => (
        <div key={faq.q} className="py-4">
          <button
            className="flex w-full items-center justify-between text-left"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="text-base font-semibold pr-4">{faq.q}</span>
            <svg
              className={`h-5 w-5 flex-shrink-0 text-muted transition-transform ${
                openIndex === i ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openIndex === i && (
            <p className="mt-3 text-muted leading-relaxed pr-8">{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
