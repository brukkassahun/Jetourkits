"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Plus } from "lucide-react";
import { compatTag, type Product } from "@/lib/products";
import { useCart } from "./CartProvider";
import { useCurrency } from "./CurrencyProvider";

export default function ProductCard({ product: p }: { product: Product }) {
  const { add } = useCart();
  const { format } = useCurrency();
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = cardRef.current;
    if (!el || e.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.classList.add("is-tilting");
    el.style.transform = `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.classList.remove("is-tilting");
    el.style.transform = "";
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="tilt group relative flex flex-col border border-line bg-card hover:border-accent/60 hover:shadow-[0_24px_50px_-20px_rgba(14,122,61,0.28)]"
    >
      {/* Image */}
      <Link href={`/products/${p.slug}`} className="shine relative block aspect-[4/3] overflow-hidden bg-elevated">
        <Image
          src={p.images[0]}
          alt={p.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
        {p.hotDeal && (
          <span className="absolute left-3 top-3 border border-flare/60 bg-black/60 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-flare-strong backdrop-blur">
            Offer
          </span>
        )}
        <span className="absolute right-3 top-3 flex translate-y-1 items-center gap-1.5 bg-black/60 px-2.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Eye className="h-3.5 w-3.5" strokeWidth={1.5} /> Quick View
        </span>
        <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
          {p.style} · {p.kitType}
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">
            {p.brand} {p.model}
          </span>
        </div>

        <div>
          <Link href={`/products/${p.slug}`} className="block">
            <h3 className="font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-accent">
              {p.name}
            </h3>
          </Link>
          <p className="mt-1.5 text-xs text-faint">{compatTag(p)}</p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
          <div>
            {p.originalPrice && (
              <p className="text-xs text-faint line-through">{format(p.originalPrice)}</p>
            )}
            <p className="font-display text-2xl font-bold text-accent">{format(p.price)}</p>
          </div>
          <button
            onClick={() => add(p.slug)}
            className="flex items-center gap-2 border border-ink/25 px-4 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:border-accent hover:bg-accent hover:text-void"
            aria-label={`Add ${p.name} to cart`}
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
