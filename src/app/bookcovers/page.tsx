import type { Metadata } from "next";
import { CoverPoll } from "@/components/cover-poll";

const OG_IMAGE = "https://cpgfoundersgroup.com/images/book-covers/og.jpg";
const TITLE = "Pick the cover — The Cold-Pressed Truth";
const DESCRIPTION =
  "Three final cover options for Jeff Church's book, The Cold-Pressed Truth. Take ten seconds and vote for the one you like best.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // A short-lived poll — no reason for it to show up in search.
  robots: { index: false, follow: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://cpgfoundersgroup.com/bookcovers",
    siteName: "CPG Founders Group",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function BookCoversPage() {
  return (
    <section className="py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <CoverPoll />
      </div>
    </section>
  );
}
