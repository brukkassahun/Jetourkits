import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { navLinks, site, whatsappLink, brandLines } from "@/lib/site";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="rounded-t-[2.5rem] border-t border-line bg-panel">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + newsletter */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-lg font-medium uppercase tracking-[0.28em] text-ink">
              Mecha<span className="text-accent">kit</span>
            </Link>
            <p className="mt-5 text-sm leading-[1.8] text-muted">{site.description}</p>
            <div className="mt-7">
              <p className="eyebrow mb-3">New kit release alerts</p>
              <NewsletterForm />
            </div>
          </div>

          {/* Shop by brand */}
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">
              Shop by Brand
            </h3>
            <ul className="mt-5 space-y-3">
              {brandLines.map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/products?brand=${encodeURIComponent(b.id)}`}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {b.label} Kits
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="text-sm font-medium text-ink hover:text-accent">
                  All kits →
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">
              Support
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={whatsappLink("Hello! Please verify fitment for my vehicle: ")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  Fitment Verification
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink("Hello! I'd like the shipping policy and rates for: ")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  Shipping Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-muted">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-faint" strokeWidth={1.5} />
                {site.address}
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-faint" strokeWidth={1.5} />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-faint" strokeWidth={1.5} />
                <a href={`mailto:${site.email}`} className="hover:text-accent">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line pt-8 text-xs text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} Jetour T2 Parts. All rights reserved.</p>
          <p>Wholesale Sourcing · ISO 9001:2015 · IATF 16949</p>
        </div>
      </div>
    </footer>
  );
}
