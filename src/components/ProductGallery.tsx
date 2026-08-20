"use client";

import { useState } from "react";
import Image from "next/image";

/** PDP gallery: main image + thumbnail strip. */
export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden border border-line bg-elevated">
        <Image
          src={images[active]}
          alt={`${name} — view ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <span className="absolute bottom-3 right-3 rounded-sm bg-ink/80 px-2.5 py-1 font-display text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
          {active + 1} / {images.length}
        </span>
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2.5">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-[4/3] overflow-hidden border bg-elevated transition-colors ${
                i === active ? "border-accent" : "border-line hover:border-accent/50"
              }`}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
