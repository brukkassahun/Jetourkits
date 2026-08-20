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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="max-w-3xl">
        <p className="eyebrow">B2B · Bulk · OEM/ODM</p>
        <h1 className="display-lg mt-3 text-3xl text-ink sm:text-5xl">
          Wholesale &amp; <span className="italic text-accent">Custom Orders</span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          We manufacture in Guangzhou and supply resellers, workshops and fleet builders across
          Africa, the Gulf and Southeast Asia. Mix brands and models freely — pricing follows total
          volume.
        </p>
      </header>

      {/* Tiers */}
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`relative border p-6 ${
              t.featured ? "border-accent bg-accent/5" : "border-line bg-panel"
            }`}
          >
            {t.featured && (
              <span className="absolute -top-3 left-5 rounded-sm bg-accent px-2.5 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wider text-white">
                Most popular
              </span>
            )}
            <h2 className="font-display text-2xl font-bold text-ink">{t.name}</h2>
            <p className="mt-1 font-sans text-sm font-bold uppercase tracking-wider text-accent">{t.moq}</p>
            <p className="mt-2 font-display text-3xl font-bold text-ink">{t.discount}</p>
            <ul className="mt-4 space-y-2">
              {t.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5 text-sm text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Process */}
      <section className="mt-14">
        <h2 className="display-lg text-3xl text-ink sm:text-4xl">
          How a bulk order <span className="italic text-accent">works</span>
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-none border border-line bg-panel p-5">
              <span className="flex h-10 w-10 items-center justify-center bg-accent/10 text-accent">
                <s.icon className="h-5 w-5" />
              </span>
              <p className="mt-3 font-sans text-sm font-bold uppercase tracking-wider text-ink">
                <span className="mr-1.5 text-faint">0{i + 1}</span> {s.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Freight note */}
      <section className="mt-10 border border-line bg-panel p-6">
        <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-ink">
          <Globe2 className="h-5 w-5 text-accent" /> Freight options
        </h2>
        <div className="mt-4 grid gap-4 text-sm text-muted sm:grid-cols-3">
          <p>
            <span className="font-sans font-bold uppercase tracking-wider text-foreground">Air / Express</span>
            <br />3–10 days via DHL/FedEx. Best for samples and urgent small kits.
          </p>
          <p>
            <span className="font-sans font-bold uppercase tracking-wider text-foreground">Sea LCL</span>
            <br />25–40 days. Consolidated crates for 5–50 kits to any major port.
          </p>
          <p>
            <span className="font-sans font-bold uppercase tracking-wider text-foreground">Full Container</span>
            <br />Best unit economics for distributors. We load and brace at the factory.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 text-center">
        <h2 className="display-lg text-3xl text-ink sm:text-4xl">
          Get your quote in <span className="italic text-accent">24 hours</span>
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-muted">
          Send your list on WhatsApp — include models, quantities and destination port. We reply
          with per-unit pricing, packing dimensions and freight options.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink("Hello MECHAKIT! Wholesale inquiry:%0A- Models/kit types:%0A- Quantities:%0A- Destination port:")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 bg-success px-7 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-white transition-transform hover:scale-[1.03] sm:w-auto"
          >
            <MessageCircle className="h-5 w-5" /> WhatsApp Sales
          </a>
          <span className="flex items-center gap-2 border border-line px-5 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-muted">
            <QrCode className="h-5 w-5 text-accent" /> WeChat: {site.wechat}
          </span>
        </div>
      </section>
    </div>
  );
}
