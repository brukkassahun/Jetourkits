import type { Metadata } from "next";
import { Boxes, Globe2, Palette, Ship, CheckCircle2, MessageCircle, QrCode } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wholesale & Custom Orders",
  description:
    "Bulk body-kit pricing, factory custom branding and consolidated international freight for resellers, workshops and fleet builders.",
};

const tiers = [
  {
    name: "Starter",
    moq: "5+ kits",
    discount: "10% off list",
    perks: ["Mixed models allowed", "Standard export packing", "DHL/air freight quotes"],
  },
  {
    name: "Dealer",
    moq: "20+ kits",
    discount: "18% off list",
    perks: ["Priority production slots", "Custom color-match paint", "Sea freight consolidation", "Marketing photo pack"],
    featured: true,
  },
  {
    name: "Distributor",
    moq: "Container (40HQ)",
    discount: "Custom pricing",
    perks: ["Factory OEM/ODM branding", "Your logo on packaging", "Exclusive territory options", "Dedicated account manager"],
  },
];

const steps = [
  { icon: MessageCircle, title: "Tell us your list", text: "Models, kit types, quantities and destination port." },
  { icon: Palette, title: "Confirm spec & branding", text: "Colors, paint service, and your logo if OEM/ODM." },
  { icon: Boxes, title: "Production & QC", text: "Photos and video of your batch before it ships." },
  { icon: Ship, title: "Freight & docs", text: "FOB, CIF or DAP — full export documents supplied." },
];

export default function WholesalePage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="max-w-3xl">
          <p className="eyebrow">B2B · Bulk · OEM/ODM</p>
          <h1 className="display-lg mt-5 text-3xl text-ink sm:text-5xl">
            Wholesale & Custom Orders
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            We manufacture in Guangzhou and supply resellers, workshops and fleet builders across
            Africa, the Gulf and Southeast Asia. Mix brands and models freely — pricing follows total
            volume.
          </p>
        </header>

        {/* Tiers */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`card-coda p-6 ${t.featured ? "border-ink bg-ink text-cream" : ""}`}
            >
              {t.featured && (
                <span className="mb-4 inline-block rounded-full bg-cream px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-ink">
                  Most popular
                </span>
              )}
              <h2 className={`title ${t.featured ? "text-cream" : ""}`}>{t.name}</h2>
              <p className={`mt-1 font-sans text-sm font-bold uppercase tracking-wider ${t.featured ? "text-cream/70" : "text-accent"}`}>{t.moq}</p>
              <p className={`mt-2 font-display text-3xl font-black ${t.featured ? "text-cream" : "text-ink"}`}>{t.discount}</p>
              <ul className="mt-4 space-y-2">
                {t.perks.map((perk) => (
                  <li key={perk} className={`flex items-start gap-2.5 text-sm ${t.featured ? "text-cream/80" : "text-muted"}`}>
                    <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${t.featured ? "text-cream" : "text-success"}`} />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Process */}
        <section className="mt-16">
          <p className="eyebrow">The Process</p>
          <h2 className="title mt-2">How a bulk order works</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="card-coda p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-cream">
                  <s.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <p className="mt-4 font-sans text-sm font-bold uppercase tracking-wider text-ink">
                  <span className="mr-1.5 text-faint">0{i + 1}</span> {s.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Freight note */}
        <section className="mt-10 card-coda p-6 sm:p-8">
          <h2 className="title flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-accent" /> Freight options
          </h2>
          <div className="mt-4 grid gap-4 text-sm text-muted sm:grid-cols-3">
            <p>
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-ink">Air / Express</span>
              <br />3–10 days via DHL/FedEx. Best for samples and urgent small kits.
            </p>
            <p>
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-ink">Sea LCL</span>
              <br />25–40 days. Consolidated crates for 5–50 kits to any major port.
            </p>
            <p>
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-ink">Full Container</span>
              <br />Best unit economics for distributors. We load and brace at the factory.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-3xl bg-charcoal px-6 py-14 text-center sm:py-20">
          <p className="eyebrow-dark">Get Started</p>
          <h2 className="display-lg mx-auto mt-5 max-w-2xl text-white">
            Get your quote in 24 hours
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/70">
            Send your list on WhatsApp — include models, quantities and destination port. We reply
            with per-unit pricing, packing dimensions and freight options.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink(`Hello ${site.name}! Wholesale inquiry:%0A- Models/kit types:%0A- Quantities:%0A- Destination port:`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Sales
            </a>
            <span className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-cream">
              <QrCode className="h-5 w-5 text-accent" /> WeChat: {site.wechat}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
