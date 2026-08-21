import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Factory, Microscope, Package, Star } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "About Us",
  description: `About ${site.name} — Premium wholesale aftermarket parts for the Jetour T2, T1 and G700`,
};

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Product Lines" },
  { value: "30+", label: "Countries Served" },
  { value: "100%", label: "QC Verified" },
];

const collage = [
  {
    title: "The Network",
    desc: "ISO 9001 & IATF 16949 certified partners across Guangzhou.",
    image: "/images/oem-fit.webp",
  },
  {
    title: "The Lab",
    desc: "Salt spray, hardness, flame and fitment validation on every batch.",
    image: "/images/about-lab.webp",
  },
  {
    title: "The Road",
    desc: "Real-world testing from desert dunes to city streets.",
    image: "/images/about-road.webp",
  },
  {
    title: "The Lifestyle",
    desc: "Built for owners who turn every drive into an adventure.",
    image: "/images/about-hero.webp",
  },
];

const highlights = [
  {
    title: "Built in the open.",
    body: "Every kit starts with a factory visit. We share material specs, test reports and mounting templates before you order.",
    icon: Factory,
  },
  {
    title: "Quality first.",
    body: "Independent third-party verification for salt spray, hardness, flame retardancy and odor. If it doesn't pass, it doesn't ship.",
    icon: Microscope,
  },
  {
    title: "Always shipping.",
    body: "98% on-time delivery rate to 30+ countries. DHL express or consolidated sea freight — you choose the speed and cost.",
    icon: Package,
  },
];

const testimonials = [
  {
    quote: "The T2 Mars Explorer kit arrived perfectly crated. Fitment was bolt-on and our Ghana customers love the look.",
    name: "Ellis Danso",
    role: "CEO, KEYTOUR AUTO",
    rating: 5,
  },
  {
    quote: "Finally a supplier that understands the Traveller platform. CAD-matched brackets saved us weeks of rework.",
    name: "Wholesale Buyer",
    role: "Nigeria",
    rating: 5,
  },
  {
    quote: "We order full containers monthly. The QC reports and batch traceability make customs clearance much easier.",
    name: "Fleet Operator",
    role: "UAE",
    rating: 5,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-void">
      {/* Hero */}
      <section className="overflow-hidden border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <Reveal>
                <p className="eyebrow text-accent">About Us</p>
                <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  Built for the <span className="italic">Jetour</span> generation.
                </h1>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                  We source OEM-fit aftermarket parts directly from certified manufacturing partners
                  in China — engineered for the T2, T1 and G700, and shipped to wholesale buyers worldwide.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/products"
                    className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-sans text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-strong"
                  >
                    Shop Kits
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a
                    href={whatsappLink("Hi Jetour Kits, I'd like to discuss a wholesale order: ")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-void px-6 py-3 font-sans text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    Contact Sales
                  </a>
                </div>
              </Reveal>
            </div>
            <div className="order-1 lg:order-2">
              <Reveal delay={150}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-square">
                  <Image
                    src="/images/about-hero.webp"
                    alt="Jetour T2 in desert dunes"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are collage */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow text-accent">Who We Are</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Built by people obsessed with upgrade culture.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                We are not a generic parts trader. We live the platform, visit the factories, and validate every bracket before it reaches your warehouse.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {collage.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 100}
                className={`group relative overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(14,122,61,0.18)] ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-square"}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 sm:p-5">
                  <p className="font-display text-lg italic text-white sm:text-xl">{item.title}</p>
                  <p className="mt-1 max-w-[14rem] text-xs leading-relaxed text-white/80 sm:text-sm">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <Reveal>
            <p className="eyebrow text-accent">The Highlights</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              The future of Jetour upgrades needs builders.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div
                  className="rounded-2xl border border-line bg-void p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <Reveal>
          <div className="grid grid-cols-2 gap-6 rounded-2xl border border-line bg-panel p-6 sm:grid-cols-4 sm:p-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-bold text-accent sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">{stat.label}</p>
            </div>
          ))}
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <Reveal>
            <p className="eyebrow text-accent">Backed by Buyers</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Trusted by wholesale buyers worldwide.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name + t.role} delay={i * 100}>
                <div className="flex flex-col rounded-2xl border border-line bg-void p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(14,122,61,0.12)]">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 border-t border-line pt-4">
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-accent px-6 py-14 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <div className="relative z-10 max-w-2xl">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-white/80">Get Started</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
                Ready to upgrade your Jetour?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
                Browse the catalog, request a quote, or talk to sales about wholesale pricing and container orders.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-sans text-xs font-bold uppercase tracking-[0.14em] text-accent transition-colors hover:bg-white/90"
                >
                  Browse Catalog
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-sans text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl sm:h-80 sm:w-80 lg:h-96 lg:w-96" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl sm:h-80 sm:w-80" />
          </div>
        </Reveal>
      </section>

      {/* Certifications strip */}
      <section className="border-t border-line bg-void">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {["ISO 9001:2015", "IATF 16949", "OEM Certified", "100% QC Verified"].map((cert) => (
              <div key={cert} className="flex items-center gap-2 text-muted">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-xs font-bold uppercase tracking-wider">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
