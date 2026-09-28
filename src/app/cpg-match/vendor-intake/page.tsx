import Link from "next/link";
import { VendorIntakeForm } from "./vendor-intake-form";
export const metadata = { title: "Vendor information | CPG Match" };
export default function Page() {
  return (
    <main className="cpg-match-page min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white p-6 sm:p-8">
        <Link href="/" className="font-bold text-accent">
          CPG Match
        </Link>
        <h1 className="mt-5 text-3xl font-bold">Vendor information</h1>
        <p className="mt-3 text-muted">
          Tell us about your current services and terms. This is vendor-provided
          information, separate from customer reviews. CPG Match will review it
          before any publication; submitting it does not create a founder
          endorsement.
        </p>
        <VendorIntakeForm />
      </div>
    </main>
  );
}
