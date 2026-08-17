import type { Metadata } from "next";
import { OnboardingWizard } from "./onboarding-wizard";

export const metadata: Metadata = {
  title: "Welcome aboard — CPG Founders Group",
  description: "Advisory onboarding for Max Ryan.",
  robots: { index: false, follow: false },
};

export default function MaxOnboardingPage() {
  return <OnboardingWizard />;
}
