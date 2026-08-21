"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Plus } from "lucide-react";
import { compatTag, type Product } from "@/lib/products";
import { useCart } from "./CartProvider";
import { useCurrency } from "./CurrencyProvider";

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.round(rating);
          return (
            <Star
              key={i}
              className={`h-3 w-3 ${filled ? "fill-amber-400 text-amber-400" : "text-line"}`}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      <span className="text-[11px] text-muted">
        {rating.toFixed(1)} ({reviews})
      </span>
    </div>
  );
}

export default function ProductCard({ product: p }: { product: Product }) {
  const { add } = useCart();
  const { format } = useCurrency();

  const discount =
    p.originalPrice && p.originalPrice > p.price
      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      : 0;

  const installment = p.price / 4;

  return (
    <div className="group flex flex-col rounded-2xl border border-line bg-panel shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(14,122,61,0.18)]">
      {/* Image */}
      <Link href={`/products/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden rounded-t-2xl bg-elevated">
        <Image
          src={p.images[0]}
          alt={p.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-flare px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-white">
            -{discount}%
          </span>
        )}
        {p.hotDeal && !discount && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-white">
            Deal
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-faint">
            {p.brand} {p.model}
          </span>
          <span className="rounded-full border border-line bg-elevated px-2 py-0.5 font-sans text-[10px] font-semibold text-muted">
            {p.kitType}
          </span>
        </div>

        <Link href={`/products/${p.slug}`} className="mt-2 block">
          <h3 className="line-clamp-2 font-sans text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
            {p.name}
          </h3>
        </Link>

        <div className="mt-2">
          <StarRating rating={p.rating} reviews={p.reviews} />
        </div>

        <p className="mt-2 text-[11px] text-muted">{compatTag(p)}</p>

        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            <p className="font-display text-xl font-bold text-ink">{format(p.price)}</p>
            {p.originalPrice && (
              <p className="text-xs text-faint line-through">{format(p.originalPrice)}</p>
            )}
          </div>
          <p className="mt-1 text-[11px] text-muted">
            or 4 payments of <span className="font-semibold text-ink">{format(installment)}</span>
          </p>

          <button
            onClick={() => add(p.slug)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 bg-ink py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-accent hover:border-accent"
            aria-label={`Add ${p.name} to cart`}
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
