"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Shield, Cpu, Award, Package, ArrowRight, ShoppingCart, FileText } from "lucide-react";
import { site } from "@/lib/site";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Sales Email",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+XXX-XXX-XXXX",
      href: null,
    },
    {
      icon: MapPin,
      label: "Office",
      value: "Global operations with regional logistics hubs",
      href: null,
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon–Sat: 9:00 AM–6:00 PM (Multiple time zones)",
      href: null,
    },
  ];

  const certifications = [
    { icon: Shield, label: "ISO 9001:2015", sub: "Quality Mgmt" },
    { icon: Cpu, label: "IATF 16949", sub: "Automotive" },
    { icon: Award, label: "OEM Certified", sub: "Verified" },
  ];

  const quickActions = [
    { icon: Package, label: "Track an existing order", href: "/track" },
    { icon: ShoppingCart, label: "Browse our catalog", href: "/products" },
    { icon: FileText, label: "Request a bulk quote", href: "/quote" },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="display-lg mt-3">Contact Sales</h1>
            <p className="mb-8 mt-4 leading-relaxed text-muted">
              We are a specialized Jetour parts sourcing company working with a network of ISO 9001 & IATF 16949 certified
              manufacturing partners. Get in touch for wholesale pricing, product inquiries, or custom orders.
            </p>

            <div className="mb-8 space-y-6">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-paper">
                    <info.icon className="h-5 w-5 text-ink" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm text-muted">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="font-medium text-ink transition-colors hover:text-accent">
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium text-ink">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="card-coda mb-6 p-6">
              <h3 className="title mb-4">Partner Certifications</h3>
              <div className="grid grid-cols-3 gap-4">
                {certifications.map((cert) => (
                  <div key={cert.label} className="text-center">
                    <cert.icon className="mx-auto mb-1 h-6 w-6 text-accent" strokeWidth={1.5} />
                    <p className="text-xs font-bold uppercase tracking-wider text-ink">{cert.label}</p>
                    <p className="text-[10px] text-muted">{cert.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-coda p-6">
              <h3 className="title mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center justify-between rounded-2xl border border-line bg-paper p-3 transition-colors hover:border-ink"
                  >
                    <div className="flex items-center gap-3">
                      <action.icon className="h-5 w-5 text-ink" strokeWidth={1.5} />
                      <span className="text-sm text-ink">{action.label}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted" strokeWidth={1.5} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="card-coda p-6 lg:p-8">
            <h2 className="title mb-2">Send a Message</h2>
            <p className="mb-6 text-sm text-muted">
              Typical response time: within 24 hours. For urgent inquiries, reach us via email.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-muted">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 w-full rounded-full border border-line bg-cream px-4 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-ink"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-muted">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 w-full rounded-full border border-line bg-cream px-4 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-ink"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-muted">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="h-12 w-full rounded-full border border-line bg-cream px-4 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-ink"
                  placeholder="Bulk order inquiry"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-muted">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-3xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-ink resize-none"
                  placeholder="Tell us about your requirements, quantities needed, target pricing, etc."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-ink py-3.5 px-6 font-sans text-xs font-bold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-accent disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
