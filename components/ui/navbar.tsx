"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
      <div className="container-width section-padding flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="font-serif text-xl tracking-wide md:text-2xl" onClick={() => setOpen(false)}>
          RAMSES
        </Link>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.18em] md:flex md:text-sm">
          <Link href="/about">About</Link>
          <Link href="/products">Collection</Link>
          <Link href="/testimonials">Testimonials</Link>
        </nav>
        <button
          aria-label="Open Menu"
          className="flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-[2px] w-5 bg-current before:absolute before:-top-1.5 before:block before:h-[2px] before:w-5 before:bg-current after:absolute after:top-1.5 after:block after:h-[2px] after:w-5 after:bg-current" />
        </button>
      </div>
      {open && (
        <div className="border-t border-black/10 bg-luxury-cream/95 px-4 pb-6 pt-4 text-black md:hidden">
          <nav className="container-width flex flex-col gap-4 text-sm uppercase tracking-[0.16em]">
            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/products" onClick={() => setOpen(false)}>
              Collection
            </Link>
            <Link href="/testimonials" onClick={() => setOpen(false)}>
              Testimonials
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
