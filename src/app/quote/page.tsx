"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Package, Truck, Check } from "lucide-react";
import { useState } from "react";
import { whatsappLink, site } from "@/lib/site";

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
    setTimeout(() => setIsSubmitting(false), 1500);
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

  const input = "h-12 w-full rounded-full border border-line bg-cream px-4 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-ink";
  const label = "mb-1 block text-[11px] font-bold uppercase tracking-[0.18em] text-muted";

  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <Link href="/products" className="mb-6 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent">
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        <div className="text-center mb-8">
          <p className="eyebrow">Quote</p>
          <h1 className="display-lg mt-3">Request a Quote</h1>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Looking for bulk pricing or custom specifications? Tell us what you need and our sales team
            will prepare a personalized quote within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card-coda p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={label}>Full Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className={input} placeholder="John Smith" />
                </div>
                <div>
                  <label className={label}>Email *</label>
                  <input type="email" required value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className={input} placeholder="john@company.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={label}>Phone *</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} className={input} placeholder="+971 50 123 4567" />
                </div>
                <div>
                  <label className={label}>Company Name</label>
                  <input type="text" value={formData.company} onChange={(e) => handleChange("company", e.target.value)} className={input} placeholder="Your Company LLC" />
                </div>
              </div>

              <div>
                <label className={label}>Product Interest *</label>
                <select required value={formData.productInterest} onChange={(e) => handleChange("productInterest", e.target.value)} className={`${input} appearance-none`}>
                  <option value="">Select a product or category</option>
                  <option value="Body Kits">Body Kits</option>
                  <option value="Rims & Wheels">Rims & Wheels</option>
                  <option value="Tires">Tires</option>
                  <option value="Multiple Products">Multiple Products / Mixed Order</option>
                  <option value="Custom Request">Custom / Sourcing Request</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className={label}>Quantity Needed</label>
                  <input type="text" value={formData.quantity} onChange={(e) => handleChange("quantity", e.target.value)} className={input} placeholder="e.g., 50 units" />
                </div>
                <div>
                  <label className={label}>Target Price (USD)</label>
                  <input type="text" value={formData.targetPrice} onChange={(e) => handleChange("targetPrice", e.target.value)} className={input} placeholder="e.g., $15,000" />
                </div>
                <div>
                  <label className={label}>Delivery Location</label>
                  <input type="text" value={formData.deliveryLocation} onChange={(e) => handleChange("deliveryLocation", e.target.value)} className={input} placeholder="e.g., Dubai, UAE" />
                </div>
              </div>

              <div>
                <label className={label}>Timeline</label>
                <select value={formData.timeline} onChange={(e) => handleChange("timeline", e.target.value)} className={`${input} appearance-none`}>
                  <option value="">When do you need delivery?</option>
                  <option value="ASAP">ASAP (Urgent)</option>
                  <option value="1-2 weeks">1–2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="2-3 months">2–3 months</option>
                  <option value="Flexible">Flexible / Planning ahead</option>
                </select>
              </div>

              <div>
                <label className={label}>Additional Notes</label>
                <textarea rows={4} value={formData.notes} onChange={(e) => handleChange("notes", e.target.value)} className="w-full rounded-3xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-ink resize-none" placeholder="Any specific requirements, customization needs, or questions..." />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-ink py-3.5 px-6 font-sans text-xs font-bold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-accent disabled:opacity-50">
                {isSubmitting ? "Submitting..." : "Request Quote"}
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="card-coda p-5">
              <h3 className="title mb-3 flex items-center gap-2">
                <Check className="h-5 w-5 text-accent" />
                What Happens Next?
              </h3>
              <ol className="space-y-3 text-sm text-muted">
                {whatHappensNext.map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-bold text-accent">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="card-coda p-5">
              <h3 className="title mb-3">Why Request a Quote?</h3>
              <ul className="space-y-2 text-sm text-muted">
                {whyRequestQuote.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-success/30 bg-success/5 p-4">
              <p className="text-sm text-muted">
                <strong className="text-success">Prefer to chat?</strong> Reach us on WhatsApp for immediate assistance.
              </p>
              <a href={whatsappLink(`Hello ${site.name}! I'd like a quote: `)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-bold text-success hover:underline">
                Message us on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
