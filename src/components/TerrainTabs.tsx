"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

const tabs = [
  {
    id: "Off-Road",
    title: "Off-Road",
    headline: "Built for the trail",
    desc: "Steel bumpers, rock sliders, roof racks, snorkels and expedition armor. Tested on real terrain before they reach your container.",
    image: "/images/terrain-offroad.webp",
    href: "/products?style=Off-Road",
  },
  {
    id: "Mecha",
    title: "Mecha",
    headline: "Exoskeleton attitude",
    desc: "Angular wide bodies, bolt-on fender flares and aggressive front ends that turn a Jetour into a statement.",
    image: "/images/terrain-mecha.webp",
    href: "/products?style=Mecha",
  },
  {
    id: "Urban Aero",
    title: "Urban Aero",
    headline: "Street presence",
    desc: "Front lips, side skirts, rear diffusers and spoilers. Low-key by day, unmistakable at night.",
    image: "/images/terrain-urban.webp",
    href: "/products?style=Urban%20Aero",
  },
];

export default function TerrainTabs() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section className="bg-void">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mb-10 text-center sm:mb-14">
          <p className="eyebrow inline-flex items-center gap-3">
            <span className="inline-block h-[1px] w-10 bg-accent" />
            Kits for every terrain
          </p>
          <h2 className="display-lg mt-5 text-4xl text-ink sm:text-6xl">
            Three ways to transform your Jetour
          </h2>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.2em] transition-all sm:px-8 ${
                i === active
                  ? "bg-ink text-white"
                  : "border border-line bg-panel text-ink hover:border-accent hover:text-accent"
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-10 overflow-hidden border border-line bg-panel">
          <div className="grid lg:grid-cols-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/3] lg:aspect-auto"
              >
                <Image
                  src={tab.image}
                  alt={tab.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-center p-8 sm:p-12 lg:p-16"
              >
                <p className="font-display text-6xl font-bold text-accent/20 sm:text-8xl">
                  0{active + 1}
                </p>
                <h3 className="display-lg mt-2 text-3xl text-ink sm:text-5xl">
                  {tab.headline}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-muted">
                  {tab.desc}
                </p>
                <div className="mt-8">
                  <Link
                    href={tab.href}
                    className="inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:text-accent"
                  >
                    Shop {tab.title}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
