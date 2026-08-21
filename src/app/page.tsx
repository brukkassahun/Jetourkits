import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import BeforeAfter from "@/components/BeforeAfter";
import Reveal from "@/components/Reveal";
import { listProducts } from "@/lib/products-db";
import { kitStyles } from "@/lib/site";

function SectionHead({
  index,
  eyebrow,
  title,
  sub,
  link,
}: {
  index: string;
  eyebrow: string;
  title: string;
  sub?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="eyebrow flex items-center gap-3">
          <span className="inline-block h-[1px] w-10 bg-accent" />
          {index} — {eyebrow}
        </p>
        <h2 className="display-lg mt-5 text-4xl text-ink sm:text-6xl">{title}</h2>
        {sub && <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">{sub}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className="hidden shrink-0 items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:text-accent sm:flex"
        >
          {link.label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
        </Link>
      )}
    </div>
  );
}

export const revalidate = 60;

export default async function HomePage() {
  const products = await listProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  const models = [
    {
      id: "T2",
      label: "Jetour T2",
      sub: "2024–2026",
      desc: "The flagship off-road Tourer. Mars Explorer, Stargazer, Ironclad and more.",
      href: "/products?model=T2",
      count: products.filter((p) => p.model === "T2").length,
    },
    {
      id: "T1 / Traveller",
      label: "Jetour T1",
      sub: "Traveller · 2023–2026",
      desc: "Original Traveller platform. Trail fender flares, roof racks, front bumpers.",
      href: "/products?model=T1%20%2F%20Traveller",
      count: products.filter((p) => p.model === "T1 / Traveller").length,
    },
    {
      id: "G700",
      label: "Jetour G700",
      sub: "Military variant · 2023–2026",
      desc: "Heavy-duty expedition armor. Built for the G700's larger chassis and capability.",
      href: "/products?model=G700",
      count: products.filter((p) => p.model === "G700").length,
    },
  ];

  return (
    <>
      <Hero />

      {/* 01 — Shop by model */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <SectionHead
            index="01"
            eyebrow="Model Lines"
            title="Pick your Jetour"
            sub="Every kit is engineered per platform — CAD-matched to factory mounting points."
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
          {models.map((m, i) => (
            <Reveal key={m.id} delay={i * 90} className="h-full">
              <Link
                href={m.href}
                className="shine group flex h-full flex-col bg-panel p-7 transition-colors hover:bg-elevated"
              >
                <p className="font-display text-3xl font-bold text-ink transition-colors group-hover:text-accent">
                  {m.label}
                </p>
                <p className="mt-1 text-xs text-faint">{m.sub}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{m.desc}</p>
                <p className="mt-auto pt-6 flex items-center justify-between">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-muted">
                    {m.count} kits available
                  </span>
                  <span className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-muted transition-colors group-hover:text-accent">
                    Browse
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                  </span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 02 — Kit styles */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHead index="02" eyebrow="Disciplines" title="Three kit styles" />
          </Reveal>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-3">
            {kitStyles.map((s, i) => (
              <Reveal key={s} delay={i * 110} className="h-full">
                <Link
                  href={`/products?style=${encodeURIComponent(s)}`}
                  className="shine group relative block h-full overflow-hidden bg-card p-8 transition-colors hover:bg-elevated"
                >
                  <p className="font-display text-7xl font-bold leading-none text-accent/20 transition-colors duration-500 group-hover:text-accent/50">
                    0{i + 1}
                  </p>
                  <p className="mt-5 font-display text-3xl font-bold text-ink transition-colors group-hover:text-accent">
                    {s}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {i === 0 && "Armor, racks, snorkels and sliders built for the trail."}
                    {i === 1 && "Exoskeleton styling — angular bumpers and wide bodies."}
                    {i === 2 && "Street aero: lips, diffusers, skirts and wings."}
                  </p>
                  <p className="mt-6 flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-accent">
                    Shop {s}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={2} />
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <SectionHead
            index="03"
            eyebrow="Featured"
            title="Most popular kits"
            sub="Hand-picked conversions our customers build most."
            link={{ href: "/products", label: "View all" }}
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 04 — Before / After showcase */}
      <section className="border-y border-line bg-panel bg-blueprint">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow inline-flex items-center gap-3">04 — Transformation</p>
              <h2 className="display-lg mt-5 text-4xl text-ink sm:text-6xl">
                Stock vs. <span className="text-accent">Full Build</span>
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
                Same Jetour. Different presence. Drag the divider — or just watch.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative mx-auto mt-12 max-w-5xl">
              <div className="absolute -inset-px border border-accent/30" />
              <BeforeAfter
                beforeSrc="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1600&q=80"
                afterSrc="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1600&q=80"
                beforeClassName="grayscale-[0.85] brightness-[0.6] contrast-[0.9]"
                afterClassName="saturate-[1.15] contrast-[1.05]"
                beforeLabel="Stock"
                afterLabel="Full Build"
                alt="Jetour T2 stock vs. full body kit build"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 05 — B2B / wholesale */}
      <section className="px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="shine relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-accent px-6 py-16 text-center sm:p-20">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.34em] text-white/80">
              06 — Wholesale
            </p>
            <h2 className="display-lg mx-auto mt-5 max-w-3xl text-4xl text-white sm:text-6xl">
              Reseller? Workshop? Fleet builder?
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-[1.8] text-white/85">
              Bulk pricing from 5 kits, factory custom branding, and consolidated sea freight to
              your port. We supply shops across Africa, the Gulf and Southeast Asia.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/wholesale"
                className="inline-flex items-center justify-center gap-2 bg-ink px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:shadow-[0_12px_40px_rgba(23,24,20,0.4)]"
              >
                Get Wholesale Pricing
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
