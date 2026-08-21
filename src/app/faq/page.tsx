"use client";

import Link from "next/link";
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    category: "Ordering",
    questions: [
      {
        q: "What is the minimum order quantity (MOQ)?",
        a: "MOQ varies by product. Body kits typically require 3-10 units, wheels require sets of 4, and tires require 20 units. Each product page displays its specific MOQ. Some accessories have no minimum order.",
      },
      {
        q: "How do I place a wholesale order?",
        a: "Browse our catalog, add products to your cart with your desired quantities, and proceed to checkout. You will need to provide your shipping details. We will calculate shipping costs based on your destination and total weight. For large volume orders, you can also use our Request a Quote feature for custom pricing.",
      },
      {
        q: "Can I order below the MOQ?",
        a: "Our listed MOQs are set at the factory level. However, for certain products, we may accommodate smaller orders at a slightly higher per-unit price. Contact our sales team to discuss your requirements.",
      },
      {
        q: "Do you offer samples?",
        a: "Yes, sample orders are available for serious buyers considering large-volume purchases. Sample pricing is at retail price plus shipping. The difference can be credited toward your first bulk order.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        q: "Are the prices on the website wholesale prices?",
        a: "Yes, all prices displayed are wholesale prices. We also show the recommended retail price (MSRP) with strikethrough so you can see your margin. The savings percentage is calculated from MSRP to wholesale price.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept bank transfers (TT/Telegraphic Transfer), Letters of Credit (L/C) for orders over $10,000, and approved credit terms for established customers with a trading history. All major currencies are accepted.",
      },
      {
        q: "Do prices include tax?",
        a: "Prices shown are exclusive of VAT and other taxes. Import duties, VAT, and customs fees are the responsibility of the buyer and vary by destination country. We can provide guidance on expected duty rates.",
      },
      {
        q: "Do you offer volume discounts?",
        a: "Yes! Our pricing is tiered based on quantity. Higher volumes receive better rates. For orders over $25,000, contact our sales team for a custom quote with additional discounts.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "Do you offer free shipping?",
        a: "No, we do not offer free shipping. Shipping costs are calculated based on your destination country and the total weight of your order. Rates are clearly displayed at checkout before you confirm your order.",
      },
      {
        q: "How is shipping cost calculated?",
        a: "Shipping cost = Base Rate + (Per-Kg Rate × Total Weight). Each destination country has its own base rate and per-kg rate, which are shown at checkout. You can also view all rates on our Shipping Policy page.",
      },
      {
        q: "How long does delivery take?",
        a: "Delivery times vary by destination and shipping method. UAE: 3-5 days, GCC: 5-7 days, Middle East: 7-10 days, Europe: 10-14 days, Africa: 12-18 days, Asia: 7-12 days, North America: 12-18 days. Express air freight is available for urgent orders.",
      },
      {
        q: "Which shipping carriers do you use?",
        a: "We work with DHL, FedEx, Aramex for express shipments, and established freight forwarders for sea and air cargo. Carrier selection is optimized based on your destination, order size, and delivery urgency.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order ships, you will receive a tracking number via email. You can also track your order on our Track Order page using your order ID. Status updates include: Placed, Processing, Shipped, and Delivered.",
      },
    ],
  },
  {
    category: "Products & Quality",
    questions: [
      {
        q: "Are your parts compatible with all Jetour T2 models?",
        a: "Our parts are designed to fit Jetour T2 models from 2023-2025. Each product page includes specific fitment information. We recommend verifying compatibility before ordering. Contact us if you are unsure about fitment for your specific model year.",
      },
      {
        q: "Where are your products manufactured?",
        a: "Our products are manufactured at certified facilities in China, with whom we have direct factory partnerships. All products undergo quality inspection at the factory before shipping to our Dubai warehouse for final verification.",
      },
      {
        q: "Do the products come with installation instructions?",
        a: "Yes, all body kits and complex accessories include installation guides. We also recommend professional installation for body kits, snorkel kits, and wheel/tire packages. Installation videos are available upon request for select products.",
      },
      {
        q: "What materials are used in your body kits?",
        a: "Our body kits are made from high-grade ABS plastic or cold-rolled steel depending on the product. Rims are cast or flow-forged aluminum alloy. All materials are specified on individual product pages with full specifications.",
      },
    ],
  },
  {
    category: "No Returns Policy",
    questions: [
      {
        q: "Do you accept returns or refunds?",
        a: "No. All sales are final. We operate on a strict no-returns, no-refunds policy. This is standard for wholesale businesses working directly with factories. Please review your order carefully before completing payment. We encourage ordering samples before placing large bulk orders.",
      },
      {
        q: "What if my order arrives damaged?",
        a: "If your order arrives visibly damaged due to shipping, you must report it with photos within 48 hours of delivery. We will file a claim with the carrier on your behalf. This is a shipping damage claim, not a return or refund. Please do not discard the original packaging until the claim is resolved.",
      },
      {
        q: "What warranty do you offer?",
        a: "Body kits and metal accessories carry a warranty against manufacturing defects. Wheels carry a structural warranty. Tires are covered by manufacturer treadwear warranty. Warranty claims are reviewed on a case-by-case basis and may result in a credit toward a future order, not a refund or return.",
      },
      {
        q: "Can I cancel my order?",
        a: "Orders may only be cancelled within 24 hours of placement and only if the order status has not yet moved to \"Processing.\" Once an order is being processed or has shipped, cancellation is not possible. A 10% administrative fee applies to all cancelled orders.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-ink mb-3">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">
            Find answers to common questions about our wholesale services.
          </p>
        </div>

        <div className="space-y-8">
          {faqData.map((section) => (
            <div key={section.category}>
              <h2 className="text-lg font-display font-bold text-ink mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-accent" />
                {section.category}
              </h2>
              <div className="space-y-2">
                {section.questions.map((item, index) => {
                  const key = `${section.category}-${index}`;
                  const isOpen = openItems[key];
                  return (
                    <div
                      key={key}
                      className="bg-card rounded-lg border border-border overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium text-sm text-ink pr-4">{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-accent shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-border pt-3">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-8 text-center">
          <MessageCircle className="w-10 h-10 text-accent mx-auto mb-3" />
          <h2 className="text-xl font-display font-bold text-ink mb-2">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Our sales team is ready to help. Reach out via WhatsApp, email, or phone.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold text-sm rounded-full transition-colors"
            >
              Contact Sales
            </Link>
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-card hover:bg-muted border border-border text-ink font-medium text-sm rounded-full transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
