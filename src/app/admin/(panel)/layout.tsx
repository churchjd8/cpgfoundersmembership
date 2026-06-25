import type { Metadata } from "next";
import Link from "next/link";
import { LogoutButton } from "../logout-button";

export const metadata: Metadata = {
  title: "Admin — CPG Founders Group",
  robots: { index: false, follow: false },
};

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/admin" className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-bold">CPG Admin</span>
            <span className="text-xs text-muted">Client Command Center</span>
          </Link>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
