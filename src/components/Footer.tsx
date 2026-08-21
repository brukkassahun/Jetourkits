import Link from "next/link";
import { navLinks, site, whatsappLink, brandLines } from "@/lib/site";
import NewsletterForm from "./NewsletterForm";
import Logo from "./Logo";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/quote", label: "Request Quote" },
];

const legalLinks = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms of Service" },
  { href: "/legal/shipping", label: "Shipping Policy" },
  { href: "/legal/returns", label: "Returns Policy" },
  { href: "/legal/cookies", label: "Cookie Policy" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + newsletter */}
          <div className="lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-5 text-sm leading-relaxed text-white/60">{site.description}</p>
            <div className="mt-7">
              <p className="mb-3 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">New kit alerts</p>
              <NewsletterForm variant="dark" />
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-white/50">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/80 transition-colors hover:text-cream">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-white/50">
              Legal
            </h3>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/80 transition-colors hover:text-cream">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop by brand */}
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-white/50">
              Shop by Brand
            </h3>
            <ul className="mt-5 space-y-3">
              {brandLines.map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/products?brand=${encodeURIComponent(b.id)}`}
                    className="text-sm text-white/80 transition-colors hover:text-cream"
                  >
                    {b.label} Kits
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="text-sm font-medium text-cream hover:text-white">
                  All kits →
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-white/50">
              Support
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/80 transition-colors hover:text-cream">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={whatsappLink("Hello! Please verify fitment for my vehicle: ")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 transition-colors hover:text-cream"
                >
                  Fitment Verification
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Jetour Kits. All rights reserved.</p>
          <p>Wholesale Sourcing · ISO 9001:2015 · IATF 16949</p>
        </div>
      </div>
    </footer>
  );
}
