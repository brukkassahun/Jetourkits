"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

export default function ProductGallery({ images, thumbnail, name }: { images: string[]; thumbnail?: string; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });

  // Build gallery: thumbnail first (if exists and not already in images), then images
  const galleryImages = thumbnail && !images.includes(thumbnail) ? [thumbnail, ...images] : images;

  const safeImages =
    galleryImages.length > 0
      ? galleryImages
      : ["/images/placeholder-product.webp"];

  // Use the event's currentTarget (the wrapper div the handler is attached to)
  // to compute relative mouse position. The zoom overlay has pointer-events-none
  // so events always reach the wrapper directly.
  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }, []);

  const handleTouch = useCallback((e: React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    setLensPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }, []);

  const zoomOverlay = (variant: "desktop" | "mobile") =>
    zoom && (
      <>
        {/* Zoomed image — background-image positioned by lensPos */}
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-paper"
          style={{
            backgroundImage: `url(${safeImages[active]})`,
            backgroundSize: "250%",
            backgroundPosition: `${lensPos.x}% ${lensPos.y}%`,
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Lens crosshair indicator */}
        <div
          className="pointer-events-none absolute z-20 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70 shadow-lg"
          style={{ left: `${lensPos.x}%`, top: `${lensPos.y}%` }}
        />
      </>
    );

  const hintBadge = (text: string) => (
    <div className="pointer-events-none absolute right-3 top-3 z-30 flex items-center gap-1 rounded-full bg-ink/70 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-cream backdrop-blur">
      <ZoomIn className="h-3 w-3" strokeWidth={2.5} />
      {text}
    </div>
  );

  const counter = (
    <span className="pointer-events-none absolute bottom-3 right-3 z-30 rounded-full bg-ink/80 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-cream backdrop-blur">
      {active + 1} / {safeImages.length}
    </span>
  );

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
          className="relative flex-1 aspect-square overflow-hidden rounded-3xl border border-line bg-paper cursor-zoom-in"
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

          {zoomOverlay("desktop")}
          {hintBadge("Hover to zoom")}
          {counter}
        </div>
      </div>

      {/* Mobile: main image with horizontal thumbnails below */}
      <div className="sm:hidden">
        <div
          className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-paper cursor-zoom-in"
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

          {zoomOverlay("mobile")}
          {hintBadge("Tap to zoom")}
          {counter}
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
