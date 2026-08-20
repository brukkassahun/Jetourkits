"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";
import { useCurrency } from "./CurrencyProvider";

export default function AddToCartPanel({ slug, price, originalPrice }: { slug: string; price: number; originalPrice?: number }) {
  const { add } = useCart();
  const { format } = useCurrency();
  const [qty, setQtyLocal] = useState(1);

  return (
    <div className="border border-line bg-panel p-5">
      <div className="flex items-end gap-3">
        <p className="font-display text-3xl font-bold text-accent">{format(price)}</p>
        {originalPrice && (
          <p className="pb-1 text-sm text-faint line-through">{format(originalPrice)}</p>
        )}
      </div>
      <p className="mt-1 text-xs text-faint">EXW Guangzhou · freight quoted per destination</p>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex items-center border border-line">
          <button
            onClick={() => setQtyLocal((q) => Math.max(1, q - 1))}
            className="flex h-11 w-10 items-center justify-center text-muted hover:text-accent"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-display text-base font-bold">{qty}</span>
          <button
            onClick={() => setQtyLocal((q) => q + 1)}
            className="flex h-11 w-10 items-center justify-center text-muted hover:text-accent"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={() => add(slug, qty)}
          className="flex flex-1 items-center justify-center gap-2 bg-ink px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-white transition-transform hover:scale-[1.02] active:scale-95"
        >
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
