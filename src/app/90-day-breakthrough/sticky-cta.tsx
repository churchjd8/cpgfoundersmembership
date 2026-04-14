"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyCTA({ href }: { href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <Link
        href={href}
        className="inline-flex items-center justify-center px-5 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-full shadow-lg transition-colors text-sm"
      >
        Apply now &rarr;
      </Link>
    </div>
  );
}
