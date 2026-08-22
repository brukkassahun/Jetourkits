"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { navLinks } from "@/lib/site";
import { useCart } from "./CartProvider";
import CurrencySelector from "./CurrencySelector";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-line bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="shrink-0">
            <Logo variant="dark" />
          </div>

          {/* Desktop nav — show on lg+; fold/big-tablet gets hamburger */}
          <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-sans text-[10px] font-bold uppercase tracking-[0.18em] transition-colors hover:text-accent xl:text-[11px] xl:tracking-[0.22em] ${
                  pathname === l.href ? "text-accent" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-sans text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
            <div className="hidden sm:block">
              <CurrencySelector />
            </div>
            <Link href="/products" className="btn-primary hidden sm:flex">
              Shop Kits
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / fold menu */}
      <div
        className={`fixed inset-x-0 bottom-0 top-16 z-[90] bg-cream transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 p-6">
          {navLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`border-b border-line px-2 py-4 font-sans text-sm font-black uppercase tracking-[0.2em] transition-all ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              } ${pathname === l.href ? "text-accent" : "text-ink"}`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/products" className="btn-primary mt-6 justify-center">
            Shop All Kits
          </Link>
          <div className="mt-4 flex items-center justify-between rounded-full border border-line px-4 py-3">
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
