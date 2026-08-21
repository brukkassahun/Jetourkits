import Link from "next/link";
import { ArrowLeft, Globe, Shield, Factory, Microscope, Package, Award, Cpu } from "lucide-react";
import { site } from "@/lib/site";

export const metadata = {
  title: "About Us",
  description: `About ${site.name} — Premium wholesale aftermarket parts for the Jetour T2`,
};

export default function AboutPage() {
  const stats = [
    { value: "10+", label: "Years Experience" },
    { value: "50+", label: "Product Lines" },
    { value: "30+", label: "Countries Served" },
    { value: "100%", label: "QC Verified" },
  ];

  const certifications = [
    { name: "ISO 9001:2015", desc: "Quality Management System", icon: Shield },
    { name: "IATF 16949", desc: "Automotive Quality System", icon: Cpu },
    { name: "OEM Certified", desc: "Verified Supplier Network", icon: Award },
  ];

  const capabilities = [
    { title: "Precision Engineering", desc: "CAD/CAM design, 3D scanning, and reverse engineering for perfect fitment", icon: Cpu },
    { title: "Quality Control", desc: "Salt spray, hardness, flame retardant, and odor testing on every batch", icon: Microscope },
    { title: "Full-Service Sourcing", desc: "End-to-end procurement from design validation to global logistics", icon: Package },
    { title: "Fitment Guarantee", desc: "Full vehicle 3D scanning ensures every part fits the Jetour T2 perfectly", icon: Shield },
    { title: "Lab Testing", desc: "Independent third-party verification for all products before export", icon: Microscope },
    { title: "Global Export", desc: "Experienced international logistics to 30+ countries worldwide", icon: Globe },
  ];

  const designEngineering = [
    "CATIA, SolidWorks, UG design validation",
    "Full vehicle 3D scanning & reverse engineering",
    "CAE force simulation & stress analysis",
    "Prototype validation before mass production",
    "APQP 5-phase project management",
  ];

  const qualityManagement = [
    "PFMEA & DFMEA risk analysis",
    "Independent salt spray, hardness, flame testing",
    "100% supplier issue closure rate",
    "98% on-time delivery rate",
    "Full batch traceability & documentation",
  ];

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-ink mb-4">About Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We are a specialized sourcing company dedicated exclusively to the Jetour T2 aftermarket.
            Through our network of select, certified manufacturing partners, we deliver premium body kits,
            rims, and tires to wholesale buyers worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-2xl font-display font-bold text-ink mb-4">Our Network</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We work exclusively with a <strong className="text-ink">select network of certified manufacturing partners</strong>{" "}
                who hold the highest automotive quality standards. Every partner in our network is{" "}
                <strong className="text-ink">ISO 9001:2015</strong> and{" "}
                <strong className="text-ink">IATF 16949</strong> certified — the same standards required by major global automakers.
              </p>
              <p>
                Our partners supply OEM-grade components to some of China&apos;s largest automotive brands. Through our exclusive
                sourcing relationships, we bring those same quality parts to the aftermarket — directly to you, with no intermediaries.
              </p>
              <p>
                Every product in our catalog undergoes rigorous independent quality verification before export, including salt spray
                testing, hardness analysis, flame retardant testing, and odor assessment. We don&apos;t just source parts — we validate them.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 mt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-accent">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden aspect-square bg-muted">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Factory className="w-16 h-16" />
              </div>
            </div>
            <div className="rounded-xl overflow-hidden aspect-square bg-muted">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Shield className="w-16 h-16" />
              </div>
            </div>
            <div className="rounded-xl overflow-hidden aspect-square bg-muted">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Microscope className="w-16 h-16" />
              </div>
            </div>
            <div className="rounded-xl overflow-hidden aspect-square bg-muted">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Globe className="w-16 h-16" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {certifications.map((cert) => (
            <div key={cert.name} className="bg-card rounded-xl border border-border p-5">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                <cert.icon className="w-5 h-5 text-accent" />
              </div>
              <p className="font-semibold text-ink">{cert.name}</p>
              <p className="text-xs text-muted-foreground">{cert.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-display font-bold text-ink text-center mb-2">Our Capabilities</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            Full-service sourcing from design validation to your doorstep.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="bg-card rounded-xl border border-border p-5 hover:border-accent/30 transition-all"
              >
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                  <cap.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-ink mb-1">{cap.title}</h3>
                <p className="text-muted-foreground text-sm">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-accent" />
              Design & Engineering
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {designEngineering.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
              <Microscope className="w-5 h-5 text-accent" />
              Quality Management
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {qualityManagement.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
              <Award className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-ink mb-1">Award-Winning Network</h3>
              <p className="text-muted-foreground">
                Our manufacturing partners have earned industry recognition including the{" "}
                <strong className="text-accent">6-Star Gold Award</strong> at the 2025 RA Auto Customization Competition and{" "}
                <strong className="text-accent">Best New Product Award</strong> at the 2025 Shanghai Auto Customization Expo.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-ink mb-4">Ready to Source?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Partner with a team that knows the Jetour T2 inside and out. Premium parts, competitive pricing, reliable delivery.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold text-sm rounded-full transition-colors"
            >
              Contact Sales
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-card hover:bg-muted border border-border text-ink font-medium text-sm rounded-full transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
