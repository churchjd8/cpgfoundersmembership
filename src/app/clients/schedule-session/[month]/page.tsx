import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMonth, SESSION_MONTHS, upcomingSlots } from "@/lib/coaching-slots";
import { ScheduleWizard } from "../schedule-wizard";

// Rendered per-request so a month that has run out of times is retired the
// moment its last slot passes, with no rebuild and no code change.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return SESSION_MONTHS.map((m) => ({ month: m.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ month: string }>;
}): Promise<Metadata> {
  const { month } = await params;
  const m = getMonth(month);
  const label = m?.label ?? "monthly";
  return {
    title: `Schedule Your ${label} Session — CPG Founders Group`,
    description: `Pick a time for your 60-minute ${label} 1:1 session with Jeff.`,
    robots: { index: false, follow: false },
  };
}

export default async function ScheduleMonthPage({
  params,
}: {
  params: Promise<{ month: string }>;
}) {
  const { month } = await params;
  const m = getMonth(month);
  // Unknown month, or a past month whose slots have all gone by (e.g. someone
  // clicking last month's link from an old email): send them to the chooser,
  // which lists whichever months are actually open. Better than a 404.
  if (!m || upcomingSlots(m.key).length === 0) {
    redirect("/clients/schedule-session");
  }
  return <ScheduleWizard monthKey={m.key} monthLabel={m.label} />;
}
