"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "About", href: "/about-jeff" },
  { label: "Free Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "BabuAI", href: "https://www.askbabu.ai", external: true },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

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
          <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
            <svg viewBox="0 0 48 32" className="h-8 w-11 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 13L41 27H19Z" fill="#d97706" />
              <path d="M20 7L33 27H7Z" fill="#b45309" />
              <path d="M10 18L19 27H1Z" fill="#fbbf24" />
              <line x1="20" y1="1" x2="20" y2="7" stroke="#92400e" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M20.2 1L25.5 3.5L20.2 5.5" fill="#d97706" stroke="#92400e" strokeWidth="0.5" strokeLinejoin="round" />
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
