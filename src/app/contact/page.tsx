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
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Sales Email",
      value: "contact@jetourt2parts.com",
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
    {
      icon: Package,
      label: "Track an existing order",
      href: "/track",
    },
    {
      icon: ShoppingCart,
      label: "Browse our catalog",
      href: "/products",
    },
    {
      icon: FileText,
      label: "Request a bulk quote",
      href: "/quote",
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-ink mb-4">Contact Sales</h1>
            <p className="text-muted mb-8 leading-relaxed">
              We are a specialized Jetour T2 parts sourcing company working with a network of ISO 9001 & IATF 16949 certified
              manufacturing partners. Get in touch with our team for wholesale pricing, product inquiries, or custom orders.
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-dim rounded-lg flex items-center justify-center shrink-0">
                    <info.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="font-medium text-ink hover:text-accent transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium text-ink">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-panel rounded-xl border border-line p-6 mb-8">
              <h3 className="font-semibold text-ink mb-4">Partner Certifications</h3>
              <div className="grid grid-cols-3 gap-4">
                {certifications.map((cert) => (
                  <div key={cert.label} className="text-center">
                    <cert.icon className="w-6 h-6 text-accent mx-auto mb-1" />
                    <p className="text-xs font-medium text-ink">{cert.label}</p>
                    <p className="text-[10px] text-muted">{cert.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-panel rounded-xl border border-line p-6">
              <h3 className="font-semibold text-ink mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center justify-between p-3 rounded-lg bg-elevated/50 hover:bg-elevated transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <action.icon className="w-5 h-5 text-accent" />
                      <span className="text-sm text-ink">{action.label}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-panel rounded-xl border border-line p-6 lg:p-8">
            <h2 className="text-xl font-display font-bold text-ink mb-2">Send a Message</h2>
            <p className="text-muted text-sm mb-6">
              Typical response time: within 24 hours. For urgent inquiries, reach us via email.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted mb-1 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-10 rounded-md bg-elevated border border-line px-3 text-sm text-foreground focus:border-accent focus:outline-none"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-10 rounded-md bg-elevated border border-line px-3 text-sm text-foreground focus:border-accent focus:outline-none"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted mb-1 block">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full h-10 rounded-md bg-elevated border border-line px-3 text-sm text-foreground focus:border-accent focus:outline-none"
                  placeholder="Bulk order inquiry"
                />
              </div>

              <div>
                <label className="text-sm text-muted mb-1 block">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-md bg-elevated border border-line px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none resize-none"
                  placeholder="Tell us about your requirements, quantities needed, target pricing, etc."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
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
