import type { Metadata } from "next";
import { metadata as previewMetadata } from "./new-homepage/page";

export { default } from "./new-homepage/page";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...previewMetadata,
  robots: { index: true, follow: true },
  alternates: { canonical: "https://cpgfoundersgroup.com/" },
  openGraph: {
    ...previewMetadata.openGraph,
    url: "https://cpgfoundersgroup.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "CPG Founders Group | The Right Support for Your Next Move",
    description: "Private advisory, Strategy Sessions, MBA for CPG, and Babu AI from Jeff Church.",
    images: ["https://cpgfoundersgroup.com/images/jeff-hero.webp"],
  },
};
