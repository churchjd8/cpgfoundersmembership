import { notFound } from "next/navigation";
import { vendors } from "../vendors";
import { VendorProfile } from "../preview-client";
export function generateStaticParams() {
  return vendors.map(({ slug }) => ({ slug }));
}
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tier?: string }>;
}) {
  const { slug } = await params;
  const vendor = vendors.find((v) => v.slug === slug);
  if (!vendor) notFound();
  const { tier } = await searchParams;
  return <VendorProfile vendor={vendor} preferred={tier === "preferred"} />;
}
