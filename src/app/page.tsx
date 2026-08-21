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
  MessageCircle,
  ClipboardList,
  PackageSearch,
  Headphones,
} from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import BeforeAfter from "@/components/BeforeAfter";
import Reveal from "@/components/Reveal";
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
        "We source all our Jetour T2 body kits through these guys. The IATF 16949 certification their partners hold gives us confidence in the quality. Their side steps and roof racks are bestsellers in our market.",
      author: "Ahmed Al-Rashid",
      company: "Desert Off-Road Garage - Riyadh, Saudi Arabia",
      stars: 4,
    },
    {
      quote:
        "Working with a team that has direct access to OEM-certified manufacturers makes all the difference. We have visited their partner facilities — the laser cutting, CNC bending, and welding operations are world-class.",
      author: "Mohammed Al-Farsi",
      company: "Gulf Auto Trading LLC - Dubai, UAE",
      stars: 5,
    },
    {
      quote:
        "We have been importing Tank 300 and Jetour T2 accessories through them for over a year. The quality consistency is remarkable thanks to their rigorous APQP process management.",
      author: "Karim Benali",
      company: "Maghreb Parts Import - Casablanca, Morocco",
      stars: 4,
    },
    {
      quote:
        "The fact that their partners supply to major OEMs tells you everything about the quality. We order container loads quarterly. The fitment precision is perfect every time.",
      author: "James Chen",
      company: "Pacific Auto Distributors - Manila, Philippines",
      stars: 5,
    },
  ];

  const exploreCards = [
    {
      title: "Wholesale",
      desc: "Bulk pricing from 5 kits, sea freight consolidation and custom branding.",
      href: "/wholesale",
      color: "bg-accent",
      icon: Building2,
    },
    {
      title: "Get a Quote",
      desc: "Send your vehicle details and target kit list. We reply with fitment and landed cost.",
      href: "/quote",
      color: "bg-[#C9A227]",
      icon: ClipboardList,
    },
    {
      title: "Track an Order",
      desc: "Already ordered? Get shipping updates, customs docs and delivery windows.",
      href: "/contact",
      color: "bg-[#2E6B5E]",
      icon: PackageSearch,
    },
    {
      title: "Support",
      desc: "Installation guidance, missing parts or fitment questions — we're one message away.",
      href: "/contact",
      color: "bg-[#8B5A2B]",
      icon: Headphones,
    },
  ];

  return (
    <>
      {/* 01 — Hero carousel */}
      <HeroCarousel />

      {/* 02 — Model lineup cards */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="eyebrow inline-flex items-center gap-3">
              <span className="inline-block h-[1px] w-10 bg-accent" />
              Model Lineup
            </p>
            <h2 className="display-lg mt-5 text-4xl text-ink sm:text-6xl">
              Pick your platform
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Every kit is CAD-matched to factory mounting points — no cutting, no welding, no guesswork.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((m, i) => (
            <Reveal key={m.id} delay={i * 100} className="h-full">
              <Link href={m.href} className="group shine flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(14,122,61,0.18)]">
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
                      <p className="font-display text-2xl font-bold text-ink transition-colors group-hover:text-accent">
                        {m.name}
                      </p>
                      <p className="mt-1 text-xs text-faint">{m.tagline}</p>
                    </div>
                    <span className="rounded-sm bg-accent-dim px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-accent">
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
            </Reveal>
          ))}
        </div>
      </section>

      {/* 03 — Terrain tabs */}
      <TerrainTabs />

      {/* 04 — OEM-fit full-bleed */}
      <section className="relative h-[70dvh] min-h-[500px] overflow-hidden">
        <Image
          src="/images/oem-fit.webp"
          alt="Jetour kit installation"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6">
          <Reveal>
            <p className="eyebrow text-accent">OEM-Fit Guarantee</p>
            <h2 className="display-lg mx-auto mt-5 max-w-3xl text-4xl text-white sm:text-6xl">
              Bolt-on precision. Or your money back.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80">
              Every bracket, hole and clip is validated against factory 3D scans. Our install network across Africa,
              the Gulf and Southeast Asia can handle fitment end-to-end.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/products" className="btn-primary">
                Browse Kits
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
              <Link href="/contact" className="btn-ghost-light">
                Book Fitment Check
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 05 — Stats strip */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto grid max-w-7xl divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {[
            { value: "50+", label: "Product Lines" },
            { value: "30+", label: "Countries Served" },
            { value: "ISO 9001", label: "& IATF 16949" },
            { value: "OEM", label: "Certified Partners" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="px-6 py-8 text-center sm:px-8">
              <p className="font-display text-4xl font-bold text-accent sm:text-5xl">{stat.value}</p>
              <p className="mt-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 06 — Our advantage */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow inline-flex items-center gap-3">
              <span className="inline-block h-[1px] w-10 bg-accent" />
              Our Advantage
            </p>
            <h2 className="display-lg mt-5 text-4xl text-ink sm:text-6xl">
              Why Buy Wholesale From Us
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
              We are the manufacturer — not a middleman. ISO 9001 & IATF 16949 certified, supplying
              OEM-grade parts to Chery, Geely, Hongqi, and Great Wall.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((f, i) => (
            <Reveal key={f.title} delay={i * 90} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-panel p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-elevated hover:shadow-[0_16px_40px_-16px_rgba(14,122,61,0.14)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <f.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 07 — Explore cards */}
      <section className="border-y border-line bg-void">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="eyebrow inline-flex items-center gap-3">
                <span className="inline-block h-[1px] w-10 bg-accent" />
                Keep Exploring
              </p>
              <h2 className="display-lg mt-5 text-4xl text-ink sm:text-6xl">
                More ways to work with us
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {exploreCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 80} className="h-full">
                <Link
                  href={card.href}
                  className={`group relative flex h-full flex-col overflow-hidden ${card.color} p-6 text-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8`}
                >
                  <card.icon className="h-8 w-8" strokeWidth={1.5} />
                  <h3 className="mt-6 font-display text-2xl font-bold">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/85">{card.desc}</p>
                  <div className="mt-6 flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                    Open
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow inline-flex items-center gap-3">
                <span className="inline-block h-[1px] w-10 bg-accent" />
                Featured
              </p>
              <h2 className="display-lg mt-5 text-4xl text-ink sm:text-6xl">Most popular kits</h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
                Hand-picked conversions our customers build most.
              </p>
            </div>
            <Link
              href="/products"
              className="hidden shrink-0 items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:text-accent sm:flex"
            >
              View all <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 09 — Testimonials */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow inline-flex items-center gap-3">
                <MessageCircle className="h-4 w-4" />
                Trusted by Wholesale Buyers Worldwide
              </p>
              <h2 className="display-lg mt-5 text-4xl text-ink sm:text-6xl">
                What Our Partners Say
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
                Verified wholesale buyers who have worked with us long-term.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 100} className="h-full">
                <div className="relative h-full rounded-2xl border border-line bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(14,122,61,0.12)] sm:p-8">
                  <Quote className="h-10 w-10 text-accent/20" strokeWidth={1.5} />
                  <p className="mt-4 text-sm leading-relaxed text-ink/80">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="font-display text-sm font-bold text-ink">{t.author}</p>
                      <p className="mt-0.5 text-xs text-muted">{t.company}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star
                          key={si}
                          className={`h-4 w-4 ${
                            si < t.stars ? "fill-accent text-accent" : "text-line"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Before / After */}
      <section className="border-y border-line bg-panel bg-blueprint">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow inline-flex items-center gap-3">
                <span className="inline-block h-[1px] w-10 bg-accent" />
                Transformation
              </p>
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
                beforeSrc="/images/before-stock.webp"
                afterSrc="/images/after-build.webp"
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

      {/* 11 — Wholesale */}
      <section className="px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="shine relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-accent px-6 py-16 text-center sm:p-20">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.34em] text-white/80">
              Wholesale
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
