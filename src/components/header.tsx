"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { isChromeless } from "@/lib/internal-routes";

const BOOK_URL = "https://thecoldpressedtruth.com";

// One nav for the whole site: two plain links, a Resources dropdown, and a
// single button. Work with Jeff is the only call to action.
const resourceLinks = [
  { label: "Free Resource Kits", note: "The tools Jeff uses with founders", href: "/resources" },
  { label: "Blog", note: "Weekly insights on building a CPG brand", href: "/blog" },
  { label: "CPG Dictionary", note: "Every industry term, explained", href: "/cpg-dictionary" },
  { label: "CPG Match", note: "Vetted vendors and service providers", href: "/cpg-match" },
  { label: "Babu AI", note: "Your on-demand CPG advisor", href: "https://www.askbabu.ai", external: true },
];
const ext = { target: "_blank", rel: "noopener noreferrer" };

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Internal working pages (see src/lib/internal-routes.ts) render without site chrome.
  if (isChromeless(pathname)) return null;

  function handleLogoClick(e: React.MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" onClick={handleLogoClick} className="flex items-center gap-1.5 sm:gap-2 text-[15px] sm:text-xl font-bold tracking-tight text-foreground whitespace-nowrap">
            <svg viewBox="0 0 48 32" className="h-6 w-8 sm:h-8 sm:w-11 flex-shrink-0 max-[379px]:hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 13L41 27H19Z" fill="#1b3a5f" />
              <path d="M20 7L33 27H7Z" fill="#0b1a2e" />
              <path d="M10 18L19 27H1Z" fill="#dfa13c" />
              <line x1="20" y1="1" x2="20" y2="7" stroke="#0b1a2e" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M20.2 1L25.5 3.5L20.2 5.5" fill="#2b4cf0" stroke="#0b1a2e" strokeWidth="0.5" strokeLinejoin="round" />
            </svg>
            CPG Founders Group
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link href="/about-jeff" className="text-sm font-medium text-muted hover:text-foreground transition-colors">About Jeff</Link>
            <div className="relative group">
              <button type="button" aria-haspopup="true" className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground group-focus-within:text-foreground transition-colors py-5">
                Resources
                <svg className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 top-full w-72 rounded-xl border border-border bg-white p-2 shadow-xl">
                {resourceLinks.map((link) => (
                  <Link key={link.href} href={link.href} {...(link.external ? ext : {})} className="block rounded-lg px-3 py-2.5 hover:bg-gray-50">
                    <span className="block text-sm font-semibold text-foreground">{link.label}</span>
                    <span className="block text-xs text-muted mt-0.5">{link.note}</span>
                  </Link>
                ))}
              </div>
            </div>
            <a href={BOOK_URL} className="text-sm font-medium text-muted hover:text-foreground transition-colors">The Book</a>
            <Link
              href="/work-with-jeff"
              className="px-4 py-2 text-sm font-semibold bg-accent hover:bg-accent-dark text-white rounded-lg transition-colors"
            >
              Work with Jeff
            </Link>
          </nav>

          {/* Mobile: the button stays in the bar, next to the menu */}
          <div className="lg:hidden flex items-center gap-1">
            <Link href="/work-with-jeff" className="px-3 py-2 text-[13px] sm:text-sm font-semibold bg-accent hover:bg-accent-dark text-white rounded-lg transition-colors whitespace-nowrap">
              Work with Jeff
            </Link>
          <button
            className="p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-5 border-t border-border pt-4">
            <div className="flex flex-col">
              <Link href="/about-jeff" className="py-2.5 text-base font-medium text-foreground" onClick={() => setMobileOpen(false)}>About Jeff</Link>
              <Link href="/work-with-jeff" className="py-2.5 text-base font-medium text-foreground" onClick={() => setMobileOpen(false)}>Work with Jeff</Link>
              <a href={BOOK_URL} className="py-2.5 text-base font-medium text-foreground">The Book</a>
              <p className="mt-3 pt-4 border-t border-border text-[11px] font-bold uppercase tracking-widest text-muted">Resources</p>
              {resourceLinks.map((link) => (
                <Link key={link.href} href={link.href} {...(link.external ? ext : {})} className="py-2.5 text-base font-medium text-foreground" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="mt-3 pt-4 border-t border-border text-sm text-muted" onClick={() => setMobileOpen(false)}>Contact</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
