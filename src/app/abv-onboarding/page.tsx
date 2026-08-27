import type { Metadata } from "next";
import { OnboardingWizard } from "./onboarding-wizard";

export const metadata: Metadata = {
  title: "Welcome aboard — CPG Founders Group",
  description: "Advisory onboarding for ABV Corp.",
  robots: { index: false, follow: false },
};

export default function AbvOnboardingPage() {
  return <OnboardingWizard />;
}
