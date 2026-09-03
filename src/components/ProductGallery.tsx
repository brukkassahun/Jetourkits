"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

export default function ProductGallery({ images, thumbnail, name }: { images: string[]; thumbnail?: string; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });
  const imgWrapRef = useRef<HTMLDivElement>(null);

  // Build gallery: thumbnail first (if exists and not already in images), then images
  const galleryImages = thumbnail && !images.includes(thumbnail) ? [thumbnail, ...images] : images;

  const safeImages =
    galleryImages.length > 0
      ? galleryImages
      : ["/images/placeholder-product.webp"];

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = imgWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }, []);

  const handleTouch = useCallback((e: React.TouchEvent) => {
    const el = imgWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    setLensPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }, []);

  return (
    <div>
      {/* Desktop: vertical thumbnails on left + main image on right */}
      <div className="hidden sm:flex gap-3">
        {/* Thumbnail column */}
        {safeImages.length > 1 && (
          <div className="flex flex-col gap-2.5 w-20 shrink-0">
            {safeImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative aspect-square overflow-hidden rounded-2xl border bg-paper transition-colors ${
                  i === active ? "border-ink" : "border-line hover:border-ink/50"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-contain" />
              </button>
            ))}
          </div>
        )}

        {/* Main image */}
        <div
          ref={imgWrapRef}
          className="relative flex-1 aspect-square overflow-hidden rounded-3xl border border-line bg-paper"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={handleMove}
          onTouchStart={(e) => { setZoom(true); handleTouch(e); }}
          onTouchMove={handleTouch}
          onTouchEnd={() => setZoom(false)}
        >
          {/* All images stacked — preload for instant switching */}
          {safeImages.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`${name} — view ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-contain transition-opacity duration-150 ${
                i === active && !zoom ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Zoomed image — uses background-image with transform-origin */}
          {zoom && (
            <div
              className="absolute inset-0 bg-paper"
              style={{
                backgroundImage: `url(${safeImages[active]})`,
                backgroundSize: "250%",
                backgroundPosition: `${lensPos.x}% ${lensPos.y}%`,
                backgroundRepeat: "no-repeat",
              }}
            />
          )}

          {/* Lens crosshair indicator */}
          {zoom && (
            <div
              className="pointer-events-none absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70 shadow-lg"
              style={{ left: `${lensPos.x}%`, top: `${lensPos.y}%` }}
            />
          )}

          {/* Magnify hint badge */}
          <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1 rounded-full bg-ink/70 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-cream backdrop-blur">
            <ZoomIn className="h-3 w-3" strokeWidth={2.5} />
            Hover to zoom
          </div>

          {/* Counter */}
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink/80 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-cream backdrop-blur">
            {active + 1} / {safeImages.length}
          </span>
        </div>
      </div>

      {/* Mobile: main image with horizontal thumbnails below */}
      <div className="sm:hidden">
        <div
          ref={imgWrapRef}
          className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-paper"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={handleMove}
          onTouchStart={(e) => { setZoom(true); handleTouch(e); }}
          onTouchMove={handleTouch}
          onTouchEnd={() => setZoom(false)}
        >
          {safeImages.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`${name} — view ${i + 1}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-contain transition-opacity duration-150 ${
                i === active && !zoom ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {zoom && (
            <div
              className="absolute inset-0 bg-paper"
              style={{
                backgroundImage: `url(${safeImages[active]})`,
                backgroundSize: "250%",
                backgroundPosition: `${lensPos.x}% ${lensPos.y}%`,
                backgroundRepeat: "no-repeat",
              }}
            />
          )}

          {zoom && (
            <div
              className="pointer-events-none absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70 shadow-lg"
              style={{ left: `${lensPos.x}%`, top: `${lensPos.y}%` }}
            />
          )}

          <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1 rounded-full bg-ink/70 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-cream backdrop-blur">
            <ZoomIn className="h-3 w-3" strokeWidth={2.5} />
            Tap to zoom
          </div>

          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink/80 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-cream backdrop-blur">
            {active + 1} / {safeImages.length}
          </span>
        </div>

        {/* Horizontal thumbnail strip */}
        {safeImages.length > 1 && (
          <div className="mt-3 grid grid-cols-4 gap-2.5">
            {safeImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative aspect-square overflow-hidden rounded-2xl border bg-paper transition-colors ${
                  i === active ? "border-ink" : "border-line hover:border-ink/50"
                }`}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-contain" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
