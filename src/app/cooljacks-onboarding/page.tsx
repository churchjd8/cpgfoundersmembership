import type { Metadata } from "next";
import { OnboardingWizard } from "./onboarding-wizard";

export const metadata: Metadata = {
  title: "Welcome aboard — CPG Founders Group",
  description: "Advisory onboarding for Cool Jacks.",
  robots: { index: false, follow: false },
};

export default function CoolJacksOnboardingPage() {
  return <OnboardingWizard />;
}
