import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";
import { site } from "@/lib/site";

export const metadata = {
  title: "Cookie Policy",
  description: `Cookie Policy for ${site.name}`,
};

export default function CookiePolicyPage() {
  const essentialCookies = [
    { name: "jetour_t2_cart_v2", purpose: "Stores cart items", duration: "Persistent" },
    { name: "jetour_t2_orders_v2", purpose: "Stores order history", duration: "Persistent" },
    { name: "jetour_t2_admin", purpose: "Admin authentication state", duration: "Session" },
    { name: "jetour_t2_messages", purpose: "Contact form submissions", duration: "Persistent" },
  ];

  const analyticsCookies = [
    { name: "_ga (Google Analytics)", purpose: "Distinguishes users", duration: "2 years" },
    { name: "_gid (Google Analytics)", purpose: "Distinguishes users (24h)", duration: "24 hours" },
    { name: "_gat (Google Analytics)", purpose: "Throttles request rate", duration: "1 minute" },
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
              <Cookie className="w-5 h-5 text-accent" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-ink">Cookie Policy</h1>
          </div>
          <p className="text-muted mb-8">Last updated: January 1, 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-muted leading-relaxed">
              This Cookie Policy explains how {site.name} uses cookies and similar tracking technologies on our website.
              By using our website, you consent to the use of cookies in accordance with this policy. You can manage your
              cookie preferences at any time by clicking the &ldquo;Cookie Settings&rdquo; link in the footer.
            </p>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">What Are Cookies?</h2>
              <p className="text-muted leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                They are widely used to make websites work more efficiently and provide information to the website owners.
                Cookies can be &ldquo;persistent&rdquo; (remain on your device until they expire or are deleted) or
                &ldquo;session&rdquo; cookies (deleted when you close your browser).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">How We Use Cookies</h2>
              <p className="text-muted leading-relaxed">
                We use cookies for the following purposes:
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 text-accent">✓</span>
                Essential Cookies (Required)
              </h2>
              <p className="text-muted leading-relaxed">
                These cookies are necessary for the website to function properly. They cannot be disabled. They enable core
                functionality such as shopping cart, user authentication, and security features.
              </p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm">
                  <thead className="bg-elevated">
                    <tr>
                      <th className="text-left p-3 text-ink">Cookie Name</th>
                      <th className="text-left p-3 text-ink">Purpose</th>
                      <th className="text-left p-3 text-ink">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted">
                    {essentialCookies.map((cookie) => (
                      <tr key={cookie.name} className="border-b border-line">
                        <td className="p-3 font-mono text-xs">{cookie.name}</td>
                        <td className="p-3">{cookie.purpose}</td>
                        <td className="p-3">{cookie.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 text-blue-500">ℹ</span>
                Analytics Cookies (Optional)
              </h2>
              <p className="text-muted leading-relaxed">
                These cookies help us understand how visitors interact with our website by collecting and reporting information
                anonymously. They help us improve our website experience. These cookies are only placed with your explicit consent.
              </p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm">
                  <thead className="bg-elevated">
                    <tr>
                      <th className="text-left p-3 text-ink">Cookie/Source</th>
                      <th className="text-left p-3 text-ink">Purpose</th>
                      <th className="text-left p-3 text-ink">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted">
                    {analyticsCookies.map((cookie) => (
                      <tr key={cookie.name} className="border-b border-line">
                        <td className="p-3 font-mono text-xs">{cookie.name}</td>
                        <td className="p-3">{cookie.purpose}</td>
                        <td className="p-3">{cookie.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-muted leading-relaxed">
                When you first visit our website, you will see a cookie consent banner. You can:
              </p>
              <ul className="space-y-2 text-muted list-disc pl-5 mt-3">
                <li><strong className="text-ink">Accept All:</strong> Allow all cookies including analytics</li>
                <li><strong className="text-ink">Reject All:</strong> Only essential cookies will be used</li>
                <li><strong className="text-ink">Customize:</strong> Choose which cookie categories to allow</li>
                <li><strong className="text-ink">Change Later:</strong> Click &ldquo;Cookie Settings&rdquo; in the footer to update preferences anytime</li>
              </ul>
              <p className="text-muted mt-3">
                You can also manage cookies through your browser settings. Most browsers allow you to refuse or delete cookies.
                Please note that disabling cookies may affect the functionality of this website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Third-Party Cookies</h2>
              <p className="text-muted leading-relaxed">
                We use Google Analytics to analyze website traffic. Google may set cookies on your device to help us understand
                how visitors use our site. The information collected is anonymous and aggregated. You can opt out of Google
                Analytics tracking by using the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Updates to This Policy</h2>
              <p className="text-muted leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our
                business operations. Please check this page periodically for updates.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-ink mt-8 mb-4">Contact</h2>
              <p className="text-muted leading-relaxed">
                If you have any questions about our use of cookies, please contact us at{" "}
                <a href="mailto:privacy@jetourt2parts.com" className="text-accent hover:underline">
                  privacy@jetourt2parts.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
