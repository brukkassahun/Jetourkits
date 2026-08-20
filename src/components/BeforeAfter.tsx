"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
  /** Extra classes on the before image — e.g. desaturate a "stock" look */
  beforeClassName?: string;
  afterClassName?: string;
}

/** Draggable before/after slider with an auto-sweep intro when it scrolls into view. */
export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel = "STOCK",
  afterLabel = "MODIFIED",
  alt,
  beforeClassName = "",
  afterClassName = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const played = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  // Auto-sweep once when scrolled into view — shows the transformation
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        obs.disconnect();
        const start = performance.now();
        const DURATION = 2400;
        // ease in-out cubic path: 50 → 16 → 84 → 50
        const path = (t: number) => {
          const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
          if (t < 0.33) return 50 + (16 - 50) * ease(t / 0.33);
          if (t < 0.66) return 16 + (84 - 16) * ease((t - 0.33) / 0.33);
          return 84 + (50 - 84) * ease((t - 0.66) / 0.34);
        };
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          if (!dragging.current) setPos(path(t));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.45 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const stop = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] w-full cursor-ew-resize select-none overflow-hidden border border-line bg-elevated sm:aspect-[16/9]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerLeave={stop}
      role="slider"
      aria-label="Before after comparison"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
      }}
    >
      {/* After (base layer) */}
      <Image src={afterSrc} alt={`${alt} — after`} fill className={`object-cover ${afterClassName}`} draggable={false} />
      {/* Before (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={beforeSrc} alt={`${alt} — before`} fill className={`object-cover ${beforeClassName}`} draggable={false} />
      </div>

      {/* Divider handle */}
      <div className="absolute inset-y-0 z-10" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-accent shadow-[0_0_16px_rgba(14,122,61,0.7)]" />
        <div className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent bg-panel text-accent shadow-lg shadow-accent/40">
          <ChevronsLeftRight className="h-5 w-5" />
        </div>
      </div>

      {/* Labels */}
      <span className="absolute left-3 top-3 bg-black/60 px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-white/80 backdrop-blur">
        {beforeLabel}
      </span>
      <span className="absolute right-3 top-3 bg-accent px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-void">
        {afterLabel}
      </span>
    </div>
  );
}
