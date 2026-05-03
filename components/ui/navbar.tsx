"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all ${
        isHome && !scrolled ? "bg-transparent text-luxury-cream" : "bg-luxury-cream/95 text-black"
      } backdrop-blur-md`}
    >
      <div className="container-width section-padding flex h-16 items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-wide md:text-2xl">
          RAMSES
        </Link>
        <nav className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] md:text-sm">
          <Link href="/about">About</Link>
          <Link href="/products">Collection</Link>
          <Link href="/testimonials">Testimonials</Link>
        </nav>
      </div>
    </header>
  );
}
