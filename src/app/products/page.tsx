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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6">
        <h1 className="display-lg text-3xl text-ink sm:text-4xl">
          All <span className="text-accent">Kits</span>
        </h1>
        <p className="mt-1.5 text-sm text-muted sm:text-base">
          Every kit is CAD-matched to factory mounting points. Can&apos;t find yours?{" "}
          <a
            href={whatsappLink("Hello! I'm looking for a kit for my vehicle: ")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:underline"
          >
            We source to order →
          </a>
        </p>
      </header>

      <Suspense>
        <FilterBar resultCount={results.length} />
      </Suspense>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-dashed border-line bg-panel px-6 py-16 text-center">
          <h2 className="display-lg text-xl text-ink">No kits match</h2>
          <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">
            Try clearing a filter — or tell us your vehicle and we&apos;ll source the kit from the
            factory network.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/products"
              className="border border-line px-5 py-3 font-sans text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Clear filters
            </Link>
            <a
              href={whatsappLink("Hello! Please source this kit for me: ")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white"
            >
              Request this kit
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
