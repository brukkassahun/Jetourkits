"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { products as localProducts, type Product } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import { useCart, useCartDetailed } from "./CartProvider";
import { useCurrency } from "./CurrencyProvider";

export default function CartDrawer() {
  const { open, setOpen, setQty, remove, clear } = useCart();
  const [catalog, setCatalog] = useState<Product[]>(localProducts);
  useEffect(() => {
    fetch("/api/catalog")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) setCatalog(d);
      })
      .catch(() => {});
  }, []);
  const { items, total } = useCartDetailed(catalog);
  const { format } = useCurrency();

  const orderMessage =
    `Hello ${site.name}! I'd like to order:\n` +
    items.map((x) => `• ${x.qty}× ${x.product.brand} ${x.product.model} ${x.product.name} — $${x.product.price * x.qty}`).join("\n") +
    `\nTotal: $${total.toLocaleString()}`;

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-line bg-cream transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-sans text-sm font-black uppercase tracking-[0.18em] text-ink">
            Your Cart ({items.length})
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="font-sans text-xs font-black uppercase tracking-[0.18em] text-muted">Cart is empty</p>
              <p className="text-sm text-faint">Add a kit and it shows up here.</p>
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-ink px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-[0.14em] text-cream"
              >
                Browse Kits
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map(({ product: p, qty }) => (
                <li key={p.slug} className="card-coda flex gap-3 p-3">
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl bg-paper">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="truncate font-sans text-sm font-bold text-ink hover:text-accent"
                    >
                      {p.brand} {p.model} — {p.name}
                    </Link>
                    <p className="mt-0.5 font-sans text-sm font-black text-ink">{format(p.price)}</p>
                    <div className="mt-auto flex items-center justify-between pt-1.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setQty(p.slug, qty - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center font-sans text-sm font-bold">{qty}</span>
                        <button
                          onClick={() => setQty(p.slug, qty + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(p.slug)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-faint transition-colors hover:text-flare"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-sans text-xs font-black uppercase tracking-[0.18em] text-muted">Total</span>
              <span className="font-display text-2xl font-black text-ink">{format(total)}</span>
            </div>
            <a
              href={whatsappLink(orderMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-full bg-ink px-5 py-3.5 text-center font-sans text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:scale-[1.02] active:scale-95"
            >
              Checkout via WhatsApp
            </a>
            <button
              onClick={clear}
              className="mt-2 w-full rounded-full border border-line px-5 py-2.5 font-sans text-xs font-black uppercase tracking-[0.18em] text-faint transition-colors hover:border-flare hover:text-flare"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
