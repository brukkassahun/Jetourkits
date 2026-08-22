import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, FileText, Globe, User } from "lucide-react";
import { site } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${site.name}`,
};

export default function PrivacyPolicyPage() {
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
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-ink">Privacy Policy</h1>
          </div>
          <p className="text-muted mb-8">Last updated: January 1, 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-muted leading-relaxed">
              {site.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
              website and use our wholesale e-commerce services.
            </p>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-accent" />
                Information We Collect
              </h2>
              <div className="space-y-3 text-muted">
                <p>
                  <strong className="text-ink">Personal Information:</strong> Name, email address, phone number, company
                  name, shipping address, and billing information that you provide when placing orders or contacting us.
                </p>
                <p>
                  <strong className="text-ink">Order Information:</strong> Products purchased, quantities, order
                  history, and transaction details.
                </p>
                <p>
                  <strong className="text-ink">Technical Information:</strong> IP address, browser type, device
                  information, operating system, and pages visited through cookies and analytics tools.
                </p>
                <p>
                  <strong className="text-ink">Communication Records:</strong> Emails, messages, and notes from
                  interactions with our sales and support teams.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                How We Use Your Information
              </h2>
              <ul className="space-y-2 text-muted list-disc pl-5">
                <li>Process and fulfill your wholesale orders</li>
                <li>Communicate order status, shipping updates, and delivery confirmations</li>
                <li>Respond to inquiries and provide customer support</li>
                <li>Send promotional offers and product updates (with your consent)</li>
                <li>Improve our website, products, and services</li>
                <li>Comply with legal obligations and prevent fraud</li>
                <li>Analyze website usage patterns for optimization</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-accent" />
                How We Protect Your Data
              </h2>
              <p className="text-muted leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. This includes SSL
                encryption for all data transmission, secure server storage, and access controls. However, no method
                of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-muted leading-relaxed">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site
                traffic, and understand where our visitors come from. You can manage your cookie preferences through
                our{" "}
                <Link href="/legal/cookies" className="text-accent hover:underline">
                  Cookie Policy
                </Link>{" "}
                and consent banner. We use both session cookies (deleted when you close your browser) and persistent
                cookies (remain on your device).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Third-Party Disclosure</h2>
              <p className="text-muted leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share information with:
              </p>
              <ul className="space-y-2 text-muted list-disc pl-5 mt-3">
                <li>
                  <strong className="text-ink">Shipping Partners:</strong> To deliver your orders (name, address, phone, weight)
                </li>
                <li>
                  <strong className="text-ink">Payment Processors:</strong> To process transactions (handled by secure third-party providers)
                </li>
                <li>
                  <strong className="text-ink">Analytics Providers:</strong> Google Analytics (anonymized data only)
                </li>
                <li>
                  <strong className="text-ink">Legal Authorities:</strong> When required by law or to protect our rights
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-accent" />
                Your Data Rights
              </h2>
              <p className="text-muted leading-relaxed">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="space-y-2 text-muted list-disc pl-5 mt-3">
                <li><strong className="text-ink">Access:</strong> Request a copy of your personal data</li>
                <li><strong className="text-ink">Correction:</strong> Update inaccurate or incomplete information</li>
                <li><strong className="text-ink">Deletion:</strong> Request deletion of your personal data (&ldquo;Right to be Forgotten&rdquo;)</li>
                <li><strong className="text-ink">Restriction:</strong> Limit how we process your data</li>
                <li><strong className="text-ink">Portability:</strong> Receive your data in a structured format</li>
                <li><strong className="text-ink">Objection:</strong> Object to processing for marketing purposes</li>
                <li><strong className="text-ink">Withdraw Consent:</strong> Withdraw cookie consent at any time</li>
              </ul>
              <p className="text-muted mt-3">
                To exercise these rights, contact us at{" "}
                <a href="mailto:privacy@jetourt2parts.com" className="text-accent hover:underline">
                  privacy@jetourt2parts.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Data Retention</h2>
              <p className="text-muted leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this
                policy, unless a longer retention period is required by law. Order records are typically retained for
                7 years for accounting and tax purposes. You may request deletion of your data at any time, subject
                to legal obligations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-accent" />
                International Data Transfers
              </h2>
              <p className="text-muted leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence,
                including the United Arab Emirates. We ensure appropriate safeguards are in place to protect your data
                in accordance with this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Changes to This Policy</h2>
              <p className="text-muted leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new policy on this page and updating the &ldquo;Last updated&rdquo; date. We encourage you to review this
                policy periodically.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Contact Us</h2>
              <p className="text-muted leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-elevated rounded-lg p-4 mt-3 text-muted">
                <p>
                  <strong className="text-ink">Email:</strong>{" "}
                  <a href="mailto:privacy@jetourt2parts.com" className="text-accent hover:underline">
                    privacy@jetourt2parts.com
                  </a>
                </p>
                <p>
                  <strong className="text-ink">Address:</strong> China,China
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
