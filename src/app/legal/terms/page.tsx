import Link from "next/link";
import { ArrowLeft, FileText, CreditCard, Truck, AlertTriangle } from "lucide-react";
import { site } from "@/lib/site";

export const metadata = {
  title: "Terms & Conditions",
  description: `Terms & Conditions for ${site.name}`,
};

export default function TermsPage() {
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

        <div className="bg-card rounded-xl border border-border p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-ink">Terms & Conditions</h1>
          </div>
          <p className="text-muted-foreground mb-8">Last updated: January 1, 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the {site.name} website and
              wholesale services. By accessing or using our website, you agree to be bound by these Terms. If you disagree
              with any part of the terms, you may not access the website.
            </p>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                General Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {site.name} operates as a wholesale distributor of automotive aftermarket parts. Our products are sold
                exclusively for wholesale and commercial purposes. We reserve the right to refuse service to anyone for any
                reason at any time.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service, use of
                the Service, or access to the Service without our express written permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Wholesale Nature of Business</h2>
              <p className="text-muted-foreground leading-relaxed">
                All products listed on this website are intended for wholesale buyers, distributors, retailers, and commercial
                installers. Pricing displayed represents wholesale pricing tiers. Minimum Order Quantities (MOQ) apply to
                individual products as indicated on each product page. We reserve the right to verify the business status
                of buyers.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-accent" />
                Orders and Acceptance
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                <li>All orders placed through our website constitute a binding offer to purchase.</li>
                <li>Order acceptance occurs when we send an order confirmation email or update order status to &ldquo;Processing.&rdquo;</li>
                <li>We reserve the right to refuse or cancel any order for reasons including: product unavailability, pricing errors, or suspected fraudulent activity.</li>
                <li>Prices are subject to change without notice. Confirmed orders are locked at the price at time of confirmation.</li>
                <li>Product images are for illustrative purposes. Minor variations in appearance may occur.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-accent" />
                Payment Terms
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                <li>Payment is due in full at time of order unless otherwise agreed in writing.</li>
                <li>Accepted payment methods: Bank transfer (TT), Letter of Credit (L/C) for large orders, and approved credit terms for established customers.</li>
                <li>All prices are quoted in USD unless otherwise specified.</li>
                <li>Buyer is responsible for all applicable taxes, duties, and customs fees.</li>
                <li>For bank transfers, a 30% deposit may be required for orders over $10,000.</li>
                <li>Goods remain our property until full payment is received.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-accent" />
                Shipping and Delivery
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                <li>Shipping costs are calculated based on destination, total weight, and dimensions.</li>
                <li>Rates are displayed at checkout before order confirmation.</li>
                <li>Delivery times are estimates and not guaranteed. Factors beyond our control may cause delays.</li>
                <li>Risk of loss and title pass to the buyer upon delivery to the carrier.</li>
                <li>Buyer is responsible for providing accurate shipping information.</li>
                <li>Additional charges for re-delivery due to incorrect address are the buyer&apos;s responsibility.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Returns and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                Please refer to our{" "}
                <Link href="/legal/returns" className="text-accent hover:underline">
                  Return & Refund Policy
                </Link>{" "}
                for detailed information. In summary:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5 mt-3">
                <li>Returns accepted within 14 days of delivery for defective or incorrect items.</li>
                <li>Items must be in original packaging and unused condition.</li>
                <li>Custom or special-order items may not be returnable.</li>
                <li>Return shipping costs may be the buyer&apos;s responsibility unless the item is defective.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Product Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                Products are covered by manufacturer warranties where applicable. Body kits and metal accessories carry a 1-year
                warranty against manufacturing defects. Wheels carry a structural warranty for 2 years. Tires are covered by
                manufacturer treadwear warranties. Warranty claims require proof of purchase and may require return of the
                defective item.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-accent" />
                Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, {site.name} shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages resulting from your use of our products or services. Our
                total liability shall not exceed the amount paid for the specific product giving rise to the claim.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Products are sold for off-road and decorative use where stated. Professional installation is recommended.
                We are not responsible for installation errors, misuse, or failure to follow manufacturer guidelines.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including text, graphics, logos, images, and software, is the property of
                {site.name} and protected by copyright and trademark laws. Unauthorized use of any content is strictly prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates.
                Any disputes shall be resolved through the courts of Dubai, UAE. Both parties agree to attempt good-faith
                negotiation before pursuing legal action.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting.
                Your continued use of the website after changes constitutes acceptance of the updated Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Contact</h2>
              <div className="bg-muted rounded-lg p-4 text-muted-foreground">
                <p>
                  <strong className="text-ink">Email:</strong>{" "}
                  <a href="mailto:legal@jetourt2parts.com" className="text-accent hover:underline">
                    legal@jetourt2parts.com
                  </a>
                </p>
                <p>
                  <strong className="text-ink">Address:</strong> Dubai Industrial City, Dubai, UAE
                </p>
                <p>
                  <strong className="text-ink">Phone:</strong>{" "}
                  <a href="tel:+8613380262534" className="text-accent hover:underline">
                    +86 133 8026 2534
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
