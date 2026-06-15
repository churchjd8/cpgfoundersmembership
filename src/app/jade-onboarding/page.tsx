import type { Metadata } from "next";
import { OnboardingWizard } from "./onboarding-wizard";

export const metadata: Metadata = {
  title: "Welcome aboard — CPG Founders Group",
  description: "Founding member onboarding for Fermenteria.",
  robots: { index: false, follow: false },
};

export default function JadeOnboardingPage() {
  return <OnboardingWizard />;
}
