"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { brandLines } from "@/lib/site";
import { kitTypes } from "@/lib/products";

const pillCls =
  "rounded-full border px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";

export default function FilterBar({ resultCount }: { resultCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [moreOpen, setMoreOpen] = useState(false);
  const [q, setQ] = useState(searchParams.get("q") ?? "");

  const model = searchParams.get("model") ?? "";
  const kitType = searchParams.get("kitType") ?? "";
  const sort = searchParams.get("sort") ?? "featured";

  const models = brandLines.flatMap((b) => b.models);

  useEffect(() => setQ(searchParams.get("q") ?? ""), [searchParams]);

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : searchParams.toString(),
      );
      if (value) params.set(key, value);
      else params.delete(key);
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

  const hasFilters = model || kitType || q || sort !== "featured";

  return (
    <div className="space-y-4">
      {/* Big search */}
      <div className="relative mx-auto max-w-2xl">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
          <Search className="h-5 w-5 text-faint" strokeWidth={1.5} />
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search kits — bumper, snorkel, roof rack, carbon…"
          type="search"
          className="h-14 w-full rounded-full border border-line bg-panel pl-12 pr-12 text-base text-ink shadow-sm outline-none transition-all placeholder:text-faint focus:border-accent focus:ring-4 focus:ring-accent-dim"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="absolute inset-y-0 right-4 flex items-center text-faint hover:text-ink"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter row */}
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <select
            value={model}
            onChange={(e) => update("model", e.target.value)}
            className="h-10 cursor-pointer appearance-none rounded-full border border-line bg-panel pl-4 pr-10 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-ink outline-none transition-colors focus:border-accent"
            style={{ backgroundPosition: "right 12px center", backgroundRepeat: "no-repeat" }}
            aria-label="Model"
          >
            <option value="">All models</option>
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <button
            onClick={() => setMoreOpen((v) => !v)}
            aria-expanded={moreOpen}
            className={`flex h-10 items-center gap-2 rounded-full border px-4 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
              moreOpen || kitType
                ? "border-accent bg-accent-dim text-accent"
                : "border-line bg-panel text-ink hover:border-accent hover:text-accent"
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Kit type
          </button>

          <select
            value={sort}
            onChange={(e) => update("sort", e.target.value)}
            className="h-10 cursor-pointer appearance-none rounded-full border border-line bg-panel pl-4 pr-10 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-ink outline-none transition-colors focus:border-accent"
            aria-label="Sort by"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low → high</option>
            <option value="price-desc">Price: high → low</option>
          </select>
        </div>

        {hasFilters && (
          <button
            onClick={() => {
              setQ("");
              startTransition(() => router.replace(pathname, { scroll: false }));
            }}
            className="font-sans text-xs font-bold uppercase tracking-wider text-accent hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Kit type panel */}
      <div
        aria-hidden={!moreOpen}
        className={`grid overflow-hidden transition-all duration-300 ${
          moreOpen ? "max-h-40 opacity-100" : "invisible max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-wrap justify-center gap-2 pt-1">
          <button
            onClick={() => update("kitType", "")}
            className={`${pillCls} ${
              !kitType
                ? "border-accent bg-accent-dim text-accent"
                : "border-line bg-panel text-muted hover:border-accent hover:text-accent"
            }`}
          >
            All types
          </button>
          {kitTypes.map((t) => (
            <button
              key={t}
              onClick={() => update("kitType", t === kitType ? "" : t)}
              className={`${pillCls} ${
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

      <p className="text-center text-sm text-muted" aria-live="polite">
        {pending ? "Filtering…" : (
          <>
            <span className="font-semibold text-ink">{resultCount}</span>{" "}
            {resultCount === 1 ? "kit" : "kits"} found
          </>
        )}
      </p>
    </div>
  );
}
