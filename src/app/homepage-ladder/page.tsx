import type { Metadata } from "next";
import { Home } from "../new-homepage/home";

// Preview of the homepage with the one-page offer ladder in place of the four
// offer cards. Unlisted and unindexed until Joshua approves it.
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "CPG Founders Group | Every Way to Work with Jeff (preview)",
  robots: { index: false, follow: false },
};

export default function HomepageLadderPreview() {
  return <Home ladder />;
}
