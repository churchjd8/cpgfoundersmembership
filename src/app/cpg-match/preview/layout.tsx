import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Feedback from "./feedback";
import "./preview.css";
export const metadata: Metadata = {
  title: "CPG Match | Directory preview",
  description:
    "Explore the first four founder-submitted vendors and compare organic and preferred vendor profiles.",
  robots: { index: false, follow: false },
};
export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="cpg-match-page match-preview">
      <div className="mp-notice">
        <span>EARLY LOOK</span> Four real submissions. Preferred placements are
        examples; reviews await verification.
      </div>
      <header className="mp-header">
        <Link className="mp-logo" href="/cpg-match/preview">
          <span className="mp-mark">
            m<span>✦</span>
          </span>
          CPG<span className="mp-logo-light">match</span>
          <span className="mp-beta">BETA</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/cpg-match/preview">Find a vendor</Link>
          <Link className="mp-button small" href="/cpg-match#participate">
            Write a review <span>↗</span>
          </Link>
        </nav>
      </header>
      {children}
      <Suspense fallback={null}><Feedback /></Suspense>
      <footer className="mp-footer">
        <Link className="mp-logo" href="/cpg-match/preview">
          CPG<span className="mp-logo-light">match</span>
        </Link>
        <p>Better partners. Stronger brands.</p>
        <a href="https://www.cpgfoundersgroup.com">
          By Jeff Church + CPG Founders Group ↗
        </a>
      </footer>
    </div>
  );
}
