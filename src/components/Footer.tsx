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
    <footer className="rounded-t-[2.5rem] border-t border-line bg-panel">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + newsletter */}
          <div className="lg:col-span-1">
            <Logo variant="dark" />
            <p className="mt-5 text-sm leading-[1.8] text-muted">{site.description}</p>
            <div className="mt-7">
              <p className="eyebrow mb-3">New kit release alerts</p>
              <NewsletterForm />
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">
              Legal
            </h3>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
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
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line pt-8 text-xs text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} Jetour Kits. All rights reserved.</p>
          <p>Wholesale Sourcing · ISO 9001:2015 · IATF 16949</p>
        </div>
      </div>
    </footer>
  );
}
