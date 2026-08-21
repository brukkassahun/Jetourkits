import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { queryProducts } from "@/lib/products-db";
import type { ProductFilters } from "@/lib/products";
import { whatsappLink } from "@/lib/site";
import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/FilterBar";

export const metadata: Metadata = {
  title: "All Body Kits",
  description:
    "Browse every body kit, bumper, rack and aero upgrade for Jetour T1, T2 and G700 — OEM-fit guaranteed, shipped worldwide.",
};

export const revalidate = 60;

const categoryPills = [
  { label: "T2", href: "/products?model=T2" },
  { label: "T1 / Traveller", href: "/products?model=T1%20%2F%20Traveller" },
  { label: "G700", href: "/products?model=G700" },
  { label: "Full Armor", href: "/products?kitType=Full%20Armor%20Kit" },
  { label: "Full Body", href: "/products?kitType=Full%20Body%20Kit" },
  { label: "Bumpers", href: "/products?kitType=Front%20Bumper" },
  { label: "Roof Racks", href: "/products?kitType=Roof%20Rack" },
  { label: "Lighting", href: "/products?kitType=Light%20Bar" },
  { label: "Off-Road", href: "/products?style=Off-Road" },
  { label: "Mecha", href: "/products?style=Mecha" },
  { label: "Urban Aero", href: "/products?style=Urban%20Aero" },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const filters: ProductFilters = {
    q: str(searchParams.q) || undefined,
    brand: str(searchParams.brand) || undefined,
    model: str(searchParams.model) || undefined,
    style: str(searchParams.style) || undefined,
    kitType: str(searchParams.kitType) || undefined,
    sort: (str(searchParams.sort) as ProductFilters["sort"]) || "featured",
  };
  const results = await queryProducts(filters);

  const isFiltering = filters.q || filters.model || filters.style || filters.kitType || filters.sort !== "featured";
  const hotDeals = results.filter((p) => p.hotDeal).slice(0, 6);

  return (
    <div className="min-h-screen bg-cream">
      {/* Search hero */}
      <section className="border-b border-line bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
          <div className="text-center">
            <p className="eyebrow">All Kits</p>
            <h1 className="display-lg mx-auto mt-5 max-w-3xl">
              Find your perfect Jetour upgrade.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted sm:text-base">
              Search, compare and upgrade. Every part is CAD-matched to factory mounting points.
            </p>
          </div>

          <div className="mt-10">
            <Suspense>
              <FilterBar />
            </Suspense>
          </div>

          {/* Category pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categoryPills.map((pill) => (
              <Link
                key={pill.label}
                href={pill.href}
                className="rounded-full border border-line bg-paper px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-ink hover:text-accent"
              >
                {pill.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot deals */}
      {!isFiltering && hotDeals.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="eyebrow">Limited Stock</p>
              <h2 className="title mt-2">Top deals of the day</h2>
              <p className="mt-1 text-sm text-muted">Best-selling kits at special pricing.</p>
            </div>
            <Link
              href="/products?sort=price-desc"
              className="hidden font-sans text-xs font-bold uppercase tracking-wider text-accent hover:underline sm:block"
            >
              See all deals →
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
            {hotDeals.map((p) => (
              <div key={p.id} className="w-[260px] flex-shrink-0 sm:w-[280px]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main results */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex items-end justify-between border-b border-line pb-4">
          <h2 className="title">
            {isFiltering ? "Results" : "All kits"}
          </h2>
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "kit" : "kits"}
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-line bg-paper px-6 py-16 text-center">
            <h2 className="title">No kits match</h2>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">
              Try clearing a filter — or tell us your vehicle and we&apos;ll source the kit from the
              factory network.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/products" className="btn-ghost">
                Clear filters
              </Link>
              <a
                href={whatsappLink("Hello! Please source this kit for me: ")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Request this kit
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
