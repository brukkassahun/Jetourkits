import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Factory, Microscope, Package, Star } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

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
    desc: "ISO 9001 & IATF 16949 certified partners across China.",
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
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="overflow-hidden border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <p className="eyebrow">About Us</p>
              <h1 className="display-lg mt-5">
                Built for the Jetour generation.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                We source OEM-fit aftermarket parts directly from certified manufacturing partners
                in China — engineered for the T2, T1 and G700, and shipped to wholesale buyers worldwide.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/products" className="btn-primary group">
                  Shop Kits
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={whatsappLink("Hi Jetour Kits, I'd like to discuss a wholesale order: ")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Contact Sales
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-square">
                <Image
                  src="/images/about-hero.webp"
                  alt="Jetour T2 in desert dunes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are collage */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Who We Are</p>
            <h2 className="display-lg mt-5">
              Built by people obsessed with upgrade culture.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              We are not a generic parts trader. We live the platform, visit the factories, and validate every bracket before it reaches your warehouse.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {collage.map((item, i) => (
              <div
                key={item.title}
                className={`group relative overflow-hidden rounded-3xl ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-square"}`}
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
                  <p className="font-display text-lg font-black uppercase tracking-tight text-white sm:text-xl">{item.title}</p>
                  <p className="mt-1 max-w-[14rem] text-xs leading-relaxed text-white/80 sm:text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <p className="eyebrow">The Highlights</p>
          <h2 className="display-lg mt-5 max-w-2xl">
            The future of Jetour upgrades needs builders.
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="card-coda p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-cream">
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="title mt-5">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-6 rounded-3xl border border-line bg-paper p-6 sm:grid-cols-4 sm:p-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-black uppercase tracking-tight text-ink sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-charcoal">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <p className="eyebrow-dark">Backed by Buyers</p>
          <h2 className="display-lg mt-5 max-w-2xl text-white">
            Trusted by wholesale buyers worldwide.
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name + t.role}
                className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-base leading-relaxed text-white/80">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-sans text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-accent px-6 py-14 text-center sm:px-12 sm:py-20">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Get Started</p>
          <h2 className="display-lg mx-auto mt-4 max-w-2xl text-white">
            Ready to upgrade your Jetour?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Browse the catalog, request a quote, or talk to sales about wholesale pricing and container orders.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/products" className="btn-on-accent group">
              Browse Catalog
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="btn-ghost-light">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications strip */}
      <section className="border-t border-line bg-cream">
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
