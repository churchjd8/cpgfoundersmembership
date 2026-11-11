import type { Metadata } from "next";
import { Home } from "./home";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "CPG Founders Group | The Right Support for Your Next Move",
  description: "Private advisory, focused Strategy Sessions, MBA for CPG, and Babu AI from Suja co-founder Jeff Church. Discover The Cold-Pressed Truth, out November 17.",
  robots: { index: false, follow: false },
  openGraph: { title: "CPG Founders Group | The Right Support for Your Next Move", description: "Choose the CPG support that fits your business.", url: "https://cpgfoundersgroup.com/new-homepage", images: [{url:"https://cpgfoundersgroup.com/images/jeff-hero.webp"}] },
};

export default function NewHomepage() {
  return <Home ladder header />;
}
