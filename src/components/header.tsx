"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "About", href: "/about-jeff" },
  { label: "BabuAI", href: "https://www.askbabu.ai", external: true },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
            <svg viewBox="0 0 32 32" className="h-8 w-8 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 10L27 27H5Z" fill="#b45309" />
              <path d="M16 10L19.5 16H12.5Z" fill="#d97706" />
              <line x1="16" y1="3" x2="16" y2="10" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M16.2 3L21.5 5.5L16.2 7.5" fill="#d97706" stroke="#b45309" strokeWidth="0.5" strokeLinejoin="round" />
            </svg>
            CPG Founders Group
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#programs"
              className="px-4 py-2 text-sm font-semibold bg-accent hover:bg-accent-dark text-white rounded-lg transition-colors"
            >
              Work with Jeff
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
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

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#programs"
                className="text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Work with Jeff
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
