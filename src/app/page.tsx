import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  FlaskConical,
  Boxes,
  Truck,
  Building2,
  Quote,
  Star,
  ClipboardList,
  PackageSearch,
  Headphones,
  MoveRight,
} from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import BeforeAfter from "@/components/BeforeAfter";
import TerrainTabs from "@/components/TerrainTabs";
import { listProducts } from "@/lib/products-db";

export const revalidate = 60;

export default async function HomePage() {
  const products = await listProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  const models = [
    {
      id: "T2",
      name: "Jetour T2",
      tagline: "The off-road flagship.",
      desc: "Mars Explorer full armor, Stargazer aero, LED wings and Ironclad bumpers — our widest platform.",
      from: "$420",
      image: "/images/model-t2.webp",
      href: "/products?model=T2",
      count: products.filter((p) => p.model === "T2").length,
    },
    {
      id: "T1",
      name: "Jetour T1",
      tagline: "The original Traveller.",
      desc: "Trail fender flares, roof racks, snorkels and front bumpers for the model that started the adventure line.",
      from: "$380",
      image: "/images/model-t1.webp",
      href: "/products?model=T1%20%2F%20Traveller",
      count: products.filter((p) => p.model === "T1 / Traveller").length,
    },
    {
      id: "G700",
      name: "Jetour G700",
      tagline: "Heavy-duty expedition.",
      desc: "Military-grade chassis armor, larger bull bars and reinforced side steps built for the G700's scale.",
      from: "$560",
      image: "/images/model-g700.webp",
      href: "/products?model=G700",
      count: products.filter((p) => p.model === "G700").length,
    },
  ];

  const advantages = [
    {
      icon: Award,
      title: "Certified Manufacturer",
      desc: "ISO 9001 & IATF 16949 certified. Same standards as OEM suppliers to major Chinese automakers.",
    },
    {
      icon: FlaskConical,
      title: "In-House Testing",
      desc: "Salt spray, hardness, flame retardant and odor testing. Full APQP quality management.",
    },
    {
      icon: Boxes,
      title: "Full Capabilities",
      desc: "Laser cutting, CNC bending, robotic welding and injection molding under one roof.",
    },
    {
      icon: Truck,
      title: "Global Shipping",
      desc: "Experienced international logistics to 30+ countries. Air and sea freight options.",
    },
  ];

  const testimonials = [
    {
      quote:
        "We source all our Jetour T2 body kits through these guys. The IATF 16949 certification their partners hold gives us confidence in the quality.",
      author: "Ahmed Al-Rashid",
      company: "Desert Off-Road Garage - Riyadh",
      stars: 4,
    },
    {
      quote:
        "Working with a team that has direct access to OEM-certified manufacturers makes all the difference. The laser cutting, CNC bending, and welding operations are world-class.",
      author: "Mohammed Al-Farsi",
      company: "Gulf Auto Trading LLC - Dubai",
      stars: 5,
    },
    {
      quote:
        "We have been importing Tank 300 and Jetour T2 accessories through them for over a year. The quality consistency is remarkable.",
      author: "Karim Benali",
      company: "Maghreb Parts Import - Casablanca",
      stars: 4,
    },
    {
      quote:
        "The fact that their partners supply to major OEMs tells you everything about the quality. We order container loads quarterly.",
      author: "James Chen",
      company: "Pacific Auto Distributors - Manila",
      stars: 5,
    },
  ];

  const exploreCards = [
    {
      title: "Wholesale",
      desc: "Bulk pricing from 5 kits, sea freight consolidation and custom branding.",
      href: "/wholesale",
      color: "bg-navy",
      icon: Building2,
    },
    {
      title: "Get a Quote",
      desc: "Send your vehicle details and target kit list. We reply with fitment and landed cost.",
      href: "/quote",
      color: "bg-sky",
      icon: ClipboardList,
    },
    {
      title: "Track an Order",
      desc: "Already ordered? Get shipping updates, customs docs and delivery windows.",
      href: "/contact",
      color: "bg-sage",
      icon: PackageSearch,
    },
    {
      title: "Support",
      desc: "Installation guidance, missing parts or fitment questions — we're one message away.",
      href: "/contact",
      color: "bg-accent",
      icon: Headphones,
    },
  ];

  return (
    <>
      {/* 01 — Hero */}
      <HeroCarousel />

      {/* 02 — Model lineup cards */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mb-14 text-center">
          <p className="eyebrow">Pick Your Platform</p>
          <h2 className="display-lg mx-auto mt-5 max-w-3xl">
            Three JETOUR platforms. One upgrade standard.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">
            Every kit is CAD-matched to factory mounting points — no cutting, no welding, no guesswork.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((m) => (
            <Link
              key={m.id}
              href={m.href}
              className="group card-coda flex h-full flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="title">{m.name}</p>
                    <p className="mt-1 text-xs text-faint">{m.tagline}</p>
                  </div>
                  <span className="rounded-full bg-accent/10 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-accent">
                    {m.count} kits
                  </span>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{m.desc}</p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
                    From {m.from}
                  </span>
                  <span className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors group-hover:text-accent">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 03 — Stats strip */}
      <section className="border-y border-line bg-paper">
        <div className="mx-auto grid max-w-7xl divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {[
            { value: "50+", label: "Product Lines" },
            { value: "30+", label: "Countries Served" },
            { value: "ISO 9001", label: "& IATF 16949" },
            { value: "OEM", label: "Certified Partners" },
          ].map((stat) => (
            <div key={stat.label} className="px-6 py-10 text-center sm:px-8">
              <p className="font-display text-4xl font-black uppercase tracking-tight text-ink sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 04 — Terrain tabs */}
      <TerrainTabs />

      {/* 05 — OEM-fit full-bleed */}
      <section className="relative h-[70dvh] min-h-[500px] overflow-hidden bg-charcoal">
        <Image
          src="/images/oem-fit.webp"
          alt="Jetour kit installation"
          fill
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/40" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6">
          <p className="eyebrow-dark">OEM-Fit Guarantee</p>
          <h2 className="display-lg mx-auto mt-5 max-w-4xl text-white">
            Bolt-on precision. Or your money back.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70">
            Every bracket, hole and clip is validated against factory 3D scans. Our install network across Africa,
            the Gulf and Southeast Asia can handle fitment end-to-end.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/products" className="btn-accent">
              Browse Kits
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link href="/contact" className="btn-ghost-light">
              Book Fitment Check
            </Link>
          </div>
        </div>
      </section>

      {/* 06 — Our advantage */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Why Buy Wholesale From Us</p>
          <h2 className="display-lg mt-5">
            We are the manufacturer. Not the middleman.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
            ISO 9001 & IATF 16949 certified, supplying OEM-grade parts to Chery, Geely, Hongqi, and Great Wall.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((f) => (
            <div
              key={f.title}
              className="card-coda h-full p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-cream">
                <f.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="title mt-5">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 07 — Explore cards */}
      <section className="bg-charcoal">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mb-14 text-center">
            <p className="eyebrow-dark">More Ways to Work With Us</p>
            <h2 className="display-lg mx-auto mt-5 max-w-3xl text-white">
              Four doors into the Jetour ecosystem.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {exploreCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl ${card.color} p-6 text-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <card.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-black uppercase tracking-tight">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/85">{card.desc}</p>
                <div className="mt-6 flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                  Open
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Most Popular Kits</p>
            <h2 className="display-lg mt-5">Hand-picked conversions.</h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
              The kits our wholesale customers build most.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden shrink-0 items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:text-accent sm:flex"
          >
            View all <MoveRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center sm:hidden">
          <Link href="/products" className="btn-ghost">
            View all kits
          </Link>
        </div>
      </section>

      {/* 09 — Testimonials */}
      <section className="bg-charcoal">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow-dark">Trusted by Wholesale Buyers Worldwide</p>
            <h2 className="display-lg mt-5 text-white">What Our Partners Say</h2>
            <p className="mt-5 text-sm leading-relaxed text-white/60 sm:text-base">
              Verified wholesale buyers who have worked with us long-term.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-8"
              >
                <Quote className="h-8 w-8 text-white/20" strokeWidth={1.5} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/80">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <div>
                    <p className="font-sans text-sm font-bold text-white">{t.author}</p>
                    <p className="mt-0.5 text-xs text-white/50">{t.company}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className={`h-4 w-4 ${
                          si < t.stars ? "fill-accent text-accent" : "text-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Before / After */}
      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Transformation</p>
            <h2 className="display-lg mt-5">
              Stock vs. <span className="text-accent">Full Build</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
              Same Jetour. Different presence. Drag the divider — or just watch.
            </p>
          </div>
          <div className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl border border-line">
            <BeforeAfter
              beforeSrc="/images/before-stock.webp"
              afterSrc="/images/after-build.webp"
              beforeClassName="grayscale-[0.85] brightness-[0.6] contrast-[0.9]"
              afterClassName="saturate-[1.15] contrast-[1.05]"
              beforeLabel="Stock"
              afterLabel="Full Build"
              alt="Jetour T2 stock vs. full body kit build"
            />
          </div>
        </div>
      </section>

      {/* 11 — Wholesale CTA */}
      <section className="bg-charcoal px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow-dark">Wholesale</p>
          <h2 className="display-lg mx-auto mt-5 max-w-3xl text-white">
            Reseller? Workshop? Fleet builder?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-white/70">
            Bulk pricing from 5 kits, factory custom branding, and consolidated sea freight to
            your port. We supply shops across Africa, the Gulf and Southeast Asia.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/wholesale" className="btn-accent">
              Get Wholesale Pricing
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link href="/contact" className="btn-ghost-light">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
