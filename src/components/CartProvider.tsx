"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

export interface CartLine {
  slug: string;
  qty: number;
}

interface CartCtx {
  lines: CartLine[];
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Ctx = createContext<CartCtx>({
  lines: [],
  add: () => {},
  remove: () => {},
  setQty: () => {},
  clear: () => {},
  count: 0,
  open: false,
  setOpen: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("mk-cart") ?? "[]") as CartLine[];
      if (Array.isArray(saved)) setLines(saved.filter((l) => l.slug && l.qty > 0));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("mk-cart", JSON.stringify(lines));
    } catch {}
  }, [lines]);

  const add = (slug: string, qty = 1) => {
    setLines((ls) => {
      const found = ls.find((l) => l.slug === slug);
      if (found) return ls.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
      return [...ls, { slug, qty }];
    });
    setOpen(true);
  };

  const remove = (slug: string) => setLines((ls) => ls.filter((l) => l.slug !== slug));
  const setQty = (slug: string, qty: number) =>
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.slug !== slug) : ls.map((l) => (l.slug === slug ? { ...l, qty } : l))));
  const clear = () => setLines([]);

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);

  return (
    <Ctx.Provider value={{ lines, add, remove, setQty, clear, count, open, setOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => useContext(Ctx);

/** Resolve cart lines to products + total for the drawer. */
export function useCartDetailed(all: Product[]) {
  const { lines } = useCart();
  const items = lines
    .map((l) => ({ product: all.find((p) => p.slug === l.slug), qty: l.qty }))
    .filter((x): x is { product: Product; qty: number } => Boolean(x.product));
  const total = items.reduce((n, x) => n + x.product.price * x.qty, 0);
  return { items, total };
}
