import type { Metadata } from "next";
import { ScheduleWizard } from "./schedule-wizard";

export const metadata: Metadata = {
  title: "Book a call with Jeff — CPG Founders Group",
  description: "Pick a time for your 60-minute coaching session with Jeff.",
  robots: { index: false, follow: false },
};

export default function ScheduleCallPage() {
  return <ScheduleWizard />;
}
