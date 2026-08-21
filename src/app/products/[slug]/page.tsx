import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Wrench, Package, Layers } from "lucide-react";
import { compatTag, products } from "@/lib/products";
import { getProductBySlug, queryProducts } from "@/lib/products-db";
import { whatsappLink, site } from "@/lib/site";
import ProductGallery from "@/components/ProductGallery";
import AddToCartPanel from "@/components/AddToCartPanel";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = true;
export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProductBySlug(params.slug);
  if (!p) return {};
  return {
    title: `${p.brand} ${p.model} ${p.name}`,
    description: `${p.name} for ${p.yearFrom}–${p.yearTo} ${p.brand} ${p.model}. ${p.kitType} · ${p.style}. OEM-fit, ships worldwide.`,
  };
}

const installStyle: Record<string, string> = {
  "Plug & Play": "border-success/40 bg-success/10 text-success",
  "Bolt-On": "border-accent/40 bg-accent/10 text-accent",
  "Professional Install": "border-flare/40 bg-flare/10 text-flare",
};

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const p = await getProductBySlug(params.slug);
  if (!p) notFound();

  const related = (await queryProducts({ brand: p.brand })).filter((x) => x.slug !== p.slug).slice(0, 3);
  const enquiry = `Hello ${site.name}! I'm interested in the ${p.brand} ${p.model} ${p.name} ($${p.price}). My vehicle is a ${p.yearFrom}–${p.yearTo} ${p.brand} ${p.model}. Please confirm fitment and shipping to: `;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-faint">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-accent">Kits</Link>
        <span>/</span>
        <Link href={`/products?brand=${encodeURIComponent(p.brand)}`} className="hover:text-accent">{p.brand}</Link>
        <span>/</span>
        <span className="text-muted">{p.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <ProductGallery images={p.images} name={p.name} />

        {/* Info */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm border border-line bg-elevated px-2.5 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-muted">
              {compatTag(p)}
            </span>
            <span className="rounded-sm border border-accent/40 bg-accent/10 px-2.5 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-accent">
              {p.style}
            </span>
            <span className="rounded-sm border border-line bg-elevated px-2.5 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-muted">
              {p.kitType}
            </span>
          </div>

          <h1 className="display-lg mt-3 text-3xl text-ink sm:text-4xl">
            {p.brand} {p.model} <span className="italic text-accent">{p.name}</span>
          </h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted">
            <span className={p.stock <= 5 ? "font-semibold text-flare" : "text-success"}>
              {p.stock <= 5 ? `Only ${p.stock} left` : "In stock"}
            </span>
          </div>

          <p className="mt-4 leading-relaxed text-muted">{p.description}</p>

          <div className="mt-5">
            <AddToCartPanel slug={p.slug} price={p.price} originalPrice={p.originalPrice} />
          </div>

          <a
            href={whatsappLink(enquiry)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block border border-success/40 bg-success/10 px-5 py-3 text-center font-sans text-sm font-bold uppercase tracking-wider text-success transition-colors hover:bg-success/20"
          >
            Confirm Fitment on WhatsApp
          </a>
        </div>
      </div>

      {/* Specs / install / components */}
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {/* Materials */}
        <section className="border border-line bg-panel p-5">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
            <Layers className="h-5 w-5 text-accent" /> Materials
          </h2>
          <ul className="mt-3 space-y-2">
            {p.materials.map((m) => (
              <li key={m} className="flex items-center gap-2.5 text-sm text-muted">
                <Check className="h-4 w-4 shrink-0 text-accent" /> {m}
              </li>
            ))}
          </ul>
        </section>

        {/* Install */}
        <section className="border border-line bg-panel p-5">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
            <Wrench className="h-5 w-5 text-accent" /> Installation
          </h2>
          <span
            className={`mt-3 inline-block rounded-sm border px-3 py-1.5 font-sans text-sm font-bold uppercase tracking-wider ${installStyle[p.install]}`}
          >
            {p.install}
          </span>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {p.install === "Plug & Play" &&
              "No tools or wiring knowledge needed — attaches in minutes with pre-applied hardware."}
            {p.install === "Bolt-On" &&
              "Installs with basic hand tools using factory mounting points. No cutting or drilling. ~1–2 hours."}
            {p.install === "Professional Install" &&
              "Body-shop recommended. May involve trimming, panel alignment or wiring. We supply templates and video guidance."}
          </p>
        </section>

        {/* Components */}
        <section className="border border-line bg-panel p-5">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
            <Package className="h-5 w-5 text-accent" /> In the Box
          </h2>
          <ul className="mt-3 space-y-2">
            {p.components.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {c}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="display-lg text-3xl text-ink sm:text-4xl">
            More for your <span className="italic text-accent">{p.brand}</span>
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
