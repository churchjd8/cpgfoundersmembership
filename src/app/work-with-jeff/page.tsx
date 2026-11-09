import type { Metadata } from "next";
import { metadata as sampleMetadata } from "../workwithjeff-2/page";

export { default } from "../workwithjeff-2/page";

// The approved design is now the public offer page; the sample stays unindexed.
export const metadata: Metadata = {
  ...sampleMetadata,
  robots: { index: true, follow: true },
  alternates: { canonical: "https://cpgfoundersgroup.com/work-with-jeff" },
  openGraph: {
    ...sampleMetadata.openGraph,
    url: "https://cpgfoundersgroup.com/work-with-jeff",
  },
};
