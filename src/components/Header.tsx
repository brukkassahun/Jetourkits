"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { useCart } from "./CartProvider";
import CurrencySelector from "./CurrencySelector";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { count, setOpen: setCartOpen } = useCart();

  // Pages with a dark cinematic hero get a transparent header that morphs on scroll
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          transparent
            ? "border-transparent bg-white md:bg-white/55 md:backdrop-blur-md"
            : "border-line bg-white backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="font-display text-lg font-medium uppercase tracking-[0.28em] text-ink transition-colors"
            aria-label={site.name}
          >
            {site.name}
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-display text-xs font-semibold uppercase tracking-[0.22em] transition-colors hover:text-accent ${
                  pathname === l.href ? "text-accent" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-ink"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-display text-[10px] font-semibold text-white">
                  {count}
                </span>
              )}
            </button>
            <div className="hidden sm:block">
              <CurrencySelector />
            </div>
            <Link
              href="/products"
              className="hidden border border-ink/25 px-5 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-white sm:block"
            >
              Shop Kits
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — sibling of header so it paints independently */}
      <div
        className={`fixed inset-x-0 bottom-0 top-20 z-40 bg-white transition-all duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 p-6">
          {navLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`border-b border-line px-2 py-4 font-display text-sm font-medium uppercase tracking-[0.2em] transition-all ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              } ${pathname === l.href ? "text-accent" : "text-ink"}`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/products"
            className="btn-primary mt-6"
          >
            Shop All Kits
          </Link>
          <div className="mt-4 flex items-center justify-between border border-line px-4 py-3">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
              Currency
            </span>
            <CurrencySelector />
          </div>
        </nav>
      </div>
    </>
  );
}
