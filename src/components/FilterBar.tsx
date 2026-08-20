"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { brandLines, kitStyles } from "@/lib/site";
import { kitTypes } from "@/lib/products";

const selectCls =
  "w-full appearance-none border border-line bg-panel px-3.5 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground outline-none transition-colors focus:border-accent [&>option]:bg-panel";

export default function FilterBar({ resultCount }: { resultCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [moreOpen, setMoreOpen] = useState(false);
  const [q, setQ] = useState(searchParams.get("q") ?? "");

  const brand = searchParams.get("brand") ?? "";
  const model = searchParams.get("model") ?? "";
  const style = searchParams.get("style") ?? "";
  const kitType = searchParams.get("kitType") ?? "";
  const sort = searchParams.get("sort") ?? "featured";

  const models = brandLines.find((b) => b.id === brand)?.models ?? [];

  useEffect(() => setQ(searchParams.get("q") ?? ""), [searchParams]);

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : searchParams.toString(),
      );
      if (value) params.set(key, value);
      else params.delete(key);
      // Reset model when brand changes
      if (key === "brand") params.delete("model");
      startTransition(() => router.replace(`${pathname}?${params.toString()}`, { scroll: false }));
    },
    [router, pathname, searchParams],
  );

  // Debounced text search
  useEffect(() => {
    const current = searchParams.get("q") ?? "";
    if (q === current) return;
    const t = setTimeout(() => update("q", q), 350);
    return () => clearTimeout(t);
  }, [q, searchParams, update]);

  const advancedCount = [kitType].filter(Boolean).length;
  const hasAny = brand || model || style || kitType || q;

  return (
    <div className="border border-line bg-panel p-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-faint" strokeWidth={1.5} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search kits — bumper, snorkel, roof rack, carbon…"
          type="search"
          className="w-full border border-line bg-panel py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-accent"
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
        <select value={brand} onChange={(e) => update("brand", e.target.value)} className={selectCls} aria-label="Brand line">
          <option value="">All brands</option>
          {brandLines.map((b) => (
            <option key={b.id} value={b.id}>
              {b.label}
            </option>
          ))}
        </select>
        <select
          value={model}
          onChange={(e) => update("model", e.target.value)}
          className={selectCls}
          aria-label="Model"
          disabled={!brand}
        >
          <option value="">{brand ? "All models" : "Pick model"}</option>
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select value={style} onChange={(e) => update("style", e.target.value)} className={selectCls} aria-label="Kit style">
          <option value="">All styles</option>
          {kitStyles.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          onClick={() => setMoreOpen((v) => !v)}
          aria-expanded={moreOpen}
          className={`flex items-center justify-center gap-2 border px-3.5 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
            moreOpen || advancedCount > 0
              ? "border-accent bg-accent-dim text-accent"
              : "border-line bg-panel text-foreground hover:border-accent hover:text-accent"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Kit Type
          {advancedCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent font-display text-[11px] font-semibold text-white">
              {advancedCount}
            </span>
          )}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
        </button>
        <select value={sort} onChange={(e) => update("sort", e.target.value)} className={selectCls} aria-label="Sort by">
          <option value="featured">Featured first</option>
          <option value="price-asc">Price: low → high</option>
          <option value="price-desc">Price: high → low</option>
          <option value="rating">Top rated</option>
        </select>
        <div className="flex items-center justify-end">
          {hasAny && (
            <button
              onClick={() => {
                setQ("");
                startTransition(() => router.replace(pathname, { scroll: false }));
              }}
              className="font-display text-sm font-bold uppercase tracking-wider text-accent hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Kit type panel */}
      <div
        aria-hidden={!moreOpen}
        className={`grid overflow-hidden transition-all duration-300 ${
          moreOpen ? "mt-3 max-h-40 opacity-100" : "invisible max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-wrap gap-2 border border-line bg-elevated p-3">
          <button
            onClick={() => update("kitType", "")}
            className={`border px-3 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
              !kitType ? "border-accent bg-accent-dim text-accent" : "border-line bg-panel text-muted hover:border-accent hover:text-accent"
            }`}
          >
            All types
          </button>
          {kitTypes.map((t) => (
            <button
              key={t}
              onClick={() => update("kitType", t === kitType ? "" : t)}
              className={`border px-3 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                kitType === t
                  ? "border-accent bg-accent-dim text-accent"
                  : "border-line bg-panel text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm text-muted" aria-live="polite">
        {pending ? (
          "Filtering…"
        ) : (
          <>
            <span className="font-display font-bold text-foreground">{resultCount}</span>{" "}
            {resultCount === 1 ? "kit" : "kits"} found
          </>
        )}
      </p>
    </div>
  );
}
