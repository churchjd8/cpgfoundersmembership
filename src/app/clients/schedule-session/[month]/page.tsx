import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMonth, SESSION_MONTHS } from "@/lib/coaching-slots";
import { ScheduleWizard } from "../schedule-wizard";

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
  if (!m) notFound();
  return <ScheduleWizard monthKey={m.key} monthLabel={m.label} />;
}
