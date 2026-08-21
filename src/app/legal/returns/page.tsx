import Link from "next/link";
import { ArrowLeft, AlertTriangle, Shield, AlertCircle, XCircle, CheckCircle } from "lucide-react";
import { site } from "@/lib/site";

export const metadata = {
  title: "No Returns & No Refunds Policy",
  description: `Returns & Refund Policy for ${site.name}`,
};

export default function ReturnsPolicyPage() {
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
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-ink">No Returns & No Refunds Policy</h1>
          </div>
          <p className="text-muted-foreground mb-8">Last updated: January 1, 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-display font-bold text-red-400 flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5" />
                All Sales Are Final
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                {site.name} operates on a <strong className="text-ink">strict no-returns, no-refunds</strong> basis.
                As a wholesale business working directly with factories, we do not accept returns, exchanges, or issue
                refunds once an order has been placed and paid for.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By placing an order on our website, you acknowledge and agree that all purchases are final and non-refundable.
                Please review your order carefully before completing payment.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-400" />
                Why No Returns?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                As a wholesale distributor working directly with manufacturers, we operate on very thin margins and volume-based
                pricing. The cost of processing returns, inspecting items, and restocking inventory at a wholesale level would
                make our business model unsustainable. Each order is processed and shipped directly from our factory partners
                or Dubai warehouse, and reverse logistics for wholesale parts are prohibitively expensive.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Quality Assurance
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                While we do not accept returns, we are committed to delivering quality products:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5 mt-3">
                <li>
                  <strong className="text-ink">Pre-Shipment Inspection:</strong> Every item is visually inspected for defects before leaving our facility.
                </li>
                <li>
                  <strong className="text-ink">Factory Direct:</strong> We source directly from certified manufacturers with established quality standards.
                </li>
                <li>
                  <strong className="text-ink">Secure Packaging:</strong> All items are professionally packaged to prevent damage during transit.
                </li>
                <li>
                  <strong className="text-ink">Damage Claims:</strong> If your order arrives visibly damaged due to shipping, you must report it with photos
                  within 48 hours of delivery. We will file a claim with the carrier on your behalf. This is not a return or refund,
                  but a shipping damage claim.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-accent" />
                Order Carefully
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Please take the following steps before placing your order to ensure you receive exactly what you need:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5 mt-3">
                <li>Verify product specifications, dimensions, and materials on the product page.</li>
                <li>Confirm the product is compatible with your specific Jetour T2 model year.</li>
                <li>Double-check quantities and ensure they meet or exceed the stated MOQ.</li>
                <li>Review product images carefully. Contact us if you need additional photos or information.</li>
                <li>For large orders over $5,000, we strongly recommend ordering a sample first.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Samples Available</h2>
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <p className="text-muted-foreground leading-relaxed">
                  For first-time buyers or large orders, we offer <strong className="text-accent">sample purchases</strong> at
                  retail price. This allows you to inspect product quality before committing to a bulk order. Sample costs can be
                  credited toward your first wholesale order of $5,000 or more. Contact our sales team to arrange a sample.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Defective Items on Arrival</h2>
              <p className="text-muted-foreground leading-relaxed">
                In the rare event that an item arrives with a clear manufacturing defect (not caused by shipping damage), you must
                report it within <strong className="text-ink">48 hours</strong> of delivery with clear photos and video evidence
                of the defect. We will review the claim and, at our sole discretion, may offer a partial credit toward a future
                order. This is not a refund and does not constitute a return. No item shall be shipped back to us under any circumstances.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Cancellations</h2>
              <p className="text-muted-foreground leading-relaxed">
                Orders may only be cancelled within <strong className="text-ink">24 hours</strong> of placement and only if the
                order status has not yet moved to &ldquo;Processing.&rdquo; Once an order is being processed or has shipped,
                cancellation is not possible under any circumstances. A 10% administrative fee applies to all cancelled orders.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                Agreement
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By completing a purchase on this website, you acknowledge that you have read, understood, and agree to this No
                Returns & No Refunds Policy. This policy is part of our Terms & Conditions and is legally binding.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Questions?</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about a product before ordering, please contact us. We are happy to provide additional
                photos, specifications, or guidance to help you make an informed purchase decision.
              </p>
              <div className="bg-muted rounded-lg p-4 text-muted-foreground mt-3">
                <p>
                  <strong className="text-ink">Email:</strong>{" "}
                  <a href="mailto:sales@jetourt2parts.com" className="text-accent hover:underline">
                    sales@jetourt2parts.com
                  </a>
                </p>
                <p>
                  <strong className="text-ink">Phone:</strong>{" "}
                  <a href="tel:+8613380262534" className="text-accent hover:underline">
                    +86 133 8026 2534
                  </a>
                </p>
                <p>
                  <strong className="text-ink">WhatsApp:</strong>{" "}
                  <a href="https://wa.me/8613380262534" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
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
