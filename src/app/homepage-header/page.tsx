import type { Metadata } from "next";
import { Home } from "../new-homepage/home";

// Preview of the homepage with the stronger header: trimmed nav, new headline,
// proof in big numbers. Unlisted and unindexed until Joshua approves it.
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "CPG Founders Group | Header preview",
  robots: { index: false, follow: false },
};

export default function HomepageHeaderPreview() {
  return <Home ladder header />;
}
