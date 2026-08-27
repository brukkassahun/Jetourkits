"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, thumbnail, name }: { images: string[]; thumbnail?: string; name: string }) {
  const [active, setActive] = useState(0);

  // Build gallery: thumbnail first (if exists and not already in images), then images
  const galleryImages = thumbnail && !images.includes(thumbnail) ? [thumbnail, ...images] : images;

  const safeImages =
    galleryImages.length > 0
      ? galleryImages
      : ["/images/placeholder-product.webp"];

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-paper">
        <Image
          src={safeImages[active]}
          alt={`${name} — view ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-4"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-cream backdrop-blur">
          {active + 1} / {safeImages.length}
        </span>
      </div>
      {safeImages.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2.5">
          {safeImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl border bg-paper transition-colors ${
                i === active ? "border-ink" : "border-line hover:border-ink/50"
              }`}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
