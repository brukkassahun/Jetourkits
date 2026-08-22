import Link from "next/link";
import { ArrowLeft, Truck, Clock, Package, Scale, FileText } from "lucide-react";
import { site } from "@/lib/site";

export const metadata = {
  title: "Shipping Policy",
  description: `Shipping Policy for ${site.name}`,
};

export default function ShippingPolicyPage() {
  const shippingRates = [
    { country: "United Arab Emirates", code: "AE", baseRate: 50, perKgRate: 6, estimatedDays: "3–5 business days" },
    { country: "Saudi Arabia", code: "SA", baseRate: 120, perKgRate: 12, estimatedDays: "5–7 business days" },
    { country: "Qatar", code: "QA", baseRate: 140, perKgRate: 14, estimatedDays: "5–7 business days" },
    { country: "Kuwait", code: "KW", baseRate: 130, perKgRate: 13, estimatedDays: "5–7 business days" },
    { country: "Oman", code: "OM", baseRate: 140, perKgRate: 14, estimatedDays: "5–7 business days" },
    { country: "Bahrain", code: "BH", baseRate: 130, perKgRate: 13, estimatedDays: "5–7 business days" },
    { country: "United Kingdom", code: "GB", baseRate: 380, perKgRate: 18, estimatedDays: "10–14 business days" },
    { country: "Germany", code: "DE", baseRate: 400, perKgRate: 19, estimatedDays: "10–14 business days" },
    { country: "France", code: "FR", baseRate: 400, perKgRate: 19, estimatedDays: "10–14 business days" },
    { country: "United States", code: "US", baseRate: 480, perKgRate: 22, estimatedDays: "12–18 business days" },
    { country: "Canada", code: "CA", baseRate: 480, perKgRate: 22, estimatedDays: "12–18 business days" },
    { country: "Australia", code: "AU", baseRate: 420, perKgRate: 19, estimatedDays: "12–17 business days" },
  ];

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="bg-panel rounded-xl border border-line p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent-dim rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-accent" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-ink">Shipping Policy</h1>
          </div>
          <p className="text-muted mb-8">Last updated: January 1, 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="bg-accent-dim border border-accent/20 rounded-lg p-4 mb-6">
              <p className="text-accent font-semibold flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Important Notice
              </p>
              <p className="text-muted mt-1">
                <strong className="text-ink">We do not offer free shipping.</strong> All shipping costs are calculated based on your
                destination and the total weight of your order. Rates are displayed at checkout before you confirm your order.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Shipping Rates</h2>
              <p className="text-muted leading-relaxed mb-4">
                Shipping costs are calculated using the following formula:
              </p>
              <div className="bg-elevated rounded-lg p-4 flex items-center gap-3">
                <Truck className="w-5 h-5 text-accent shrink-0" />
                <p className="text-muted font-medium">
                  Shipping Cost = Base Rate + (Per-Kg Rate × Total Order Weight)
                </p>
              </div>
              <p className="text-muted leading-relaxed mt-4">
                The exact shipping cost for your order will be calculated and displayed at checkout once you enter your shipping
                destination. Below are our standard rates by region:
              </p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm">
                  <thead className="bg-elevated">
                    <tr>
                      <th className="text-left p-3 text-ink">Destination</th>
                      <th className="text-left p-3 text-ink">Base Rate (USD)</th>
                      <th className="text-left p-3 text-ink">Per Kg (USD)</th>
                      <th className="text-left p-3 text-ink">Est. Delivery</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted">
                    {shippingRates.map((rate) => (
                      <tr key={rate.code} className="border-b border-line last:border-0">
                        <td className="p-3">{rate.country}</td>
                        <td className="p-3">${rate.baseRate}</td>
                        <td className="p-3">${rate.perKgRate}</td>
                        <td className="p-3">{rate.estimatedDays}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Processing Time
              </h2>
              <ul className="space-y-2 text-muted list-disc pl-5">
                <li>
                  <strong className="text-ink">Order Processing:</strong> 1–2 business days after order confirmation and payment receipt.
                </li>
                <li>
                  <strong className="text-ink">Custom Orders:</strong> 5–10 business days depending on specifications.
                </li>
                <li>
                  <strong className="text-ink">Large Orders:</strong> Orders over $25,000 may require additional processing time. We will notify you.
                </li>
                <li>
                  <strong className="text-ink">Weekends & Holidays:</strong> Orders placed on weekends or UAE public holidays will be processed the next business day.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-accent" />
                Shipping Methods & Carriers
              </h2>
              <p className="text-muted leading-relaxed">
                We partner with established international freight forwarders and courier services to ensure reliable delivery.
                Available shipping methods include:
              </p>
              <ul className="space-y-2 text-muted list-disc pl-5 mt-2">
                <li>
                  <strong className="text-ink">Air Freight:</strong> Fastest option, recommended for urgent orders (3–7 days to most destinations)
                </li>
                <li>
                  <strong className="text-ink">Sea Freight:</strong> Most economical for large orders, ideal for non-urgent deliveries (15–30 days)
                </li>
                <li>
                  <strong className="text-ink">Express Courier:</strong> DHL, FedEx, or Aramex for smaller packages (3–5 days)
                </li>
                <li>
                  <strong className="text-ink">Local Delivery (UAE):</strong> Same-day or next-day delivery available within Dubai and Sharjah
                </li>
              </ul>
              <p className="text-muted mt-3">
                Specific carrier and method selection is available at checkout based on your destination and order size.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-accent" />
                Weight Calculation
              </h2>
              <p className="text-muted leading-relaxed">
                Shipping weight is calculated using the greater of actual weight or dimensional weight (length × width × height / 5000).
                The total shipping weight displayed at checkout includes product weight plus estimated packaging materials (typically 5–10% addition).
              </p>
              <p className="text-muted leading-relaxed mt-3">
                Individual product weights are listed on each product page. You can estimate your total shipping cost by adding the
                weights of all items in your cart.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Customs, Duties & Taxes
              </h2>
              <div className="bg-accent-dim border border-accent/20 rounded-lg p-4">
                <p className="text-muted leading-relaxed">
                  <strong className="text-ink">All customs duties, import taxes, VAT, and brokerage fees are the responsibility of the buyer.</strong>
                  These charges are not included in the product price or shipping cost and will be collected by your local customs
                  authority or carrier upon delivery.
                </p>
              </div>
              <p className="text-muted leading-relaxed mt-3">
                We provide all necessary commercial invoices and customs documentation. Please contact your local customs office
                for information about specific duties and taxes in your country.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-accent" />
                Packaging
              </h2>
              <p className="text-muted leading-relaxed">
                All items are professionally packaged to ensure safe transit. Body kits are wrapped in protective foam and boxed.
                Wheels are individually wrapped and palletized. Tires are stacked and strapped. Fragile items are marked accordingly.
                We use recyclable materials where possible.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Order Tracking</h2>
              <p className="text-muted leading-relaxed">
                Once your order ships, you will receive a shipping confirmation email with tracking information. You can also track
                your order status on our{" "}
                <Link href="/track" className="text-accent hover:underline">
                  Track Order
                </Link>{" "}
                page using your order ID. Tracking updates include: order placed, processing, shipped, in transit, and delivered.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Delivery Issues</h2>
              <p className="text-muted leading-relaxed">
                If your order has not arrived within the estimated delivery window, please contact us immediately. We will investigate
                with the carrier and provide updates. For damaged shipments, please note the damage on the delivery receipt and
                photograph the packaging before opening. Report damage within 48 hours of delivery.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Contact</h2>
              <div className="bg-elevated rounded-lg p-4 text-muted">
                <p>
                  <strong className="text-ink">Email:</strong>{" "}
                  <a href="mailto:shipping@jetourt2parts.com" className="text-accent hover:underline">
                    shipping@jetourt2parts.com
                  </a>
                </p>
                <p>
                  <strong className="text-ink">Phone:</strong>{" "}
                  <a href="tel:+8613380262534" className="text-accent hover:underline">
                    +86 133 8026 2534
                  </a>
                </p>
                <p>
                  <strong className="text-ink">Address:</strong> China,China
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
