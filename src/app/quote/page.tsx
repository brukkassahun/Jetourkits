"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Package, Truck, Check } from "lucide-react";
import { useState } from "react";

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    productInterest: "",
    quantity: "",
    targetPrice: "",
    deliveryLocation: "",
    timeline: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  const whatHappensNext = [
    "Our sales team reviews your request within 24 hours.",
    "We prepare a personalized quote based on your volume and requirements.",
    "You receive the quote via email with pricing breakdown and shipping estimate.",
    "Review and confirm. We proceed to process your order upon approval.",
  ];

  const whyRequestQuote = [
    { icon: FileText, text: "Volume discounts beyond listed prices" },
    { icon: Package, text: "Mixed product orders with combined shipping" },
    { icon: Truck, text: "Custom shipping arrangements for large orders" },
  ];

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-ink mb-3">Request a Quote</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Looking for bulk pricing or custom specifications? Tell us what you need and our sales team
            will prepare a personalized quote within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full h-10 rounded-md bg-muted border border-border px-3 text-sm text-foreground focus:border-accent focus:outline-none"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full h-10 rounded-md bg-muted border border-border px-3 text-sm text-foreground focus:border-accent focus:outline-none"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full h-10 rounded-md bg-muted border border-border px-3 text-sm text-foreground focus:border-accent focus:outline-none"
                    placeholder="+971 50 123 4567"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Company Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    className="w-full h-10 rounded-md bg-muted border border-border px-3 text-sm text-foreground focus:border-accent focus:outline-none"
                    placeholder="Your Company LLC"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Product Interest *</label>
                <select
                  required
                  value={formData.productInterest}
                  onChange={(e) => handleChange("productInterest", e.target.value)}
                  className="w-full h-10 rounded-md bg-muted border border-border px-3 text-sm text-foreground focus:border-accent focus:outline-none"
                >
                  <option value="">Select a product or category</option>
                  <option value="Body Kits">Body Kits</option>
                  <option value="Rims & Wheels">Rims & Wheels</option>
                  <option value="Tires">Tires</option>
                  <option value="Multiple Products">Multiple Products / Mixed Order</option>
                  <option value="Custom Request">Custom / Sourcing Request</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Quantity Needed</label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => handleChange("quantity", e.target.value)}
                    className="w-full h-10 rounded-md bg-muted border border-border px-3 text-sm text-foreground focus:border-accent focus:outline-none"
                    placeholder="e.g., 50 units"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Target Price (USD)</label>
                  <input
                    type="text"
                    value={formData.targetPrice}
                    onChange={(e) => handleChange("targetPrice", e.target.value)}
                    className="w-full h-10 rounded-md bg-muted border border-border px-3 text-sm text-foreground focus:border-accent focus:outline-none"
                    placeholder="e.g., $15,000"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Delivery Location</label>
                  <input
                    type="text"
                    value={formData.deliveryLocation}
                    onChange={(e) => handleChange("deliveryLocation", e.target.value)}
                    className="w-full h-10 rounded-md bg-muted border border-border px-3 text-sm text-foreground focus:border-accent focus:outline-none"
                    placeholder="e.g., Dubai, UAE"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Timeline</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => handleChange("timeline", e.target.value)}
                  className="w-full h-10 rounded-md bg-muted border border-border px-3 text-sm text-foreground focus:border-accent focus:outline-none"
                >
                  <option value="">When do you need delivery?</option>
                  <option value="ASAP">ASAP (Urgent)</option>
                  <option value="1-2 weeks">1-2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="2-3 months">2-3 months</option>
                  <option value="Flexible">Flexible / Planning ahead</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Additional Notes</label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  className="w-full rounded-md bg-muted border border-border px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none resize-none"
                  placeholder="Any specific requirements, customization needs, or questions..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Request Quote"}
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Check className="w-5 h-5 text-accent" />
                What Happens Next?
              </h3>
              <ol className="space-y-3 text-sm text-muted-foreground">
                {whatHappensNext.map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent font-bold">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-ink mb-3">Why Request a Quote?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {whyRequestQuote.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <item.icon className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-accent">Prefer to chat?</strong> Reach us on WhatsApp for immediate assistance.
              </p>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline text-sm mt-1 inline-block"
              >
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
