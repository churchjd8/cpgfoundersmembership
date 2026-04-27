import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Member Portal - CPG Founders Group",
  description:
    "Your central hub for community resources, events, tools, and training from CPG Founders Group.",
};

const cards = [
  {
    emoji: "🤖",
    title: "Babu AI",
    description:
      "Your AI-powered CPG advisor for strategic guidance, deep research, financial review, and pricing analysis.",
    href: "https://www.askbabu.ai",
    linkLabel: "Open Babu AI",
    external: true,
  },
  {
    emoji: "📅",
    title: "Events Calendar",
    description:
      "View upcoming group calls, workshops, masterclasses, and community events.",
    href: "https://calendar.google.com/calendar/u/0?cid=Y18yYTMyMDc0YmRjM2IzYjVkZDJiNTA5OTZiM2Y4MWRkYTQ5YzQ3MzU3ZjgwZGE1ZGI0NWRmMzk1NWI2ZGI2NjRmQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
    linkLabel: "View calendar",
    external: true,
  },
  {
    emoji: "🎓",
    title: "MBA for CPG",
    description:
      "Access your self-paced course materials and training modules. 23 plays from Jeff's CPG Playbook.",
    href: "/mba-for-cpg",
    linkLabel: "Go to course",
    external: false,
  },
  {
    emoji: "💬",
    title: "WhatsApp Community",
    description:
      "Join 150+ CPG founders for peer-to-peer support, quick answers, and vetted partner introductions.",
    href: "https://chat.whatsapp.com/EclqcEFTX2yAeBmwsq88tq?mode=gi_t",
    linkLabel: "Join the group",
    external: true,
  },
  {
    emoji: "🎥",
    title: "Call Replays",
    description:
      "Watch recordings of previous sessions, workshops, and masterclasses with Jeff.",
    href: "https://www.dropbox.com/scl/fi/rhld0wnh9ovkedwkwtusa/Office-Hours-and-Speakers.docx?rlkey=ijb38ugkggg4shqy6cshp89na&dl=0",
    linkLabel: "Watch replays",
    external: true,
  },
  {
    emoji: "📚",
    title: "Resource Library",
    description:
      "Templates, calculators, white papers, and tools to help you scale your CPG brand.",
    href: "/resources",
    linkLabel: "Browse resources",
    external: false,
  },
];

export default function MembersPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
            Member Portal
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            Welcome to CPG Founders Group
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Your central hub for community resources, events, and tools to help
            you scale, raise, and exit.
          </p>
        </div>
      </section>

      {/* ========== RESOURCE CARDS ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                {...(card.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group bg-card rounded-xl border border-border p-6 sm:p-8 flex flex-col hover:shadow-lg hover:border-accent/30 transition-all"
              >
                <p className="text-4xl mb-4">{card.emoji}</p>
                <h2 className="text-xl font-bold tracking-tight group-hover:text-accent transition-colors">
                  {card.title}
                </h2>
                <p className="mt-3 text-muted leading-relaxed flex-1">
                  {card.description}
                </p>
                <div className="mt-6 pt-4 border-t border-border">
                  <span className="inline-flex items-center text-sm font-semibold text-accent group-hover:text-accent-dark transition-colors">
                    {card.linkLabel} &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CALENDAR EMBED ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Upcoming Events
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Community Calendar
            </h2>
            <p className="mt-4 text-lg text-muted">
              Group calls, workshops, masterclasses, and community events — all
              in one place.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=c_2a32074bdc3b3b5dd2b50996b3f81dda49c47357f80da5db45df3955b6db664f%40group.calendar.google.com&ctz=America%2FLos_Angeles&showTitle=0&showNav=1&showPrint=0&showTabs=1&showCalendars=0"
              className="w-full border-0"
              height="600"
              title="CPG Founders Group Events Calendar"
            />
          </div>
        </div>
      </section>

      {/* ========== SUPPORT FOOTER ========== */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted">
            Need help? Reach out to{" "}
            <a
              href="mailto:info@teamchurch.co"
              className="text-accent hover:text-accent-dark font-semibold transition-colors"
            >
              info@teamchurch.co
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
