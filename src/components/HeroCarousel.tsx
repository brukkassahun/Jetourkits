"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: "T2",
    name: "Jetour T2",
    tagline: "The off-road icon. Built for every terrain.",
    price: "From $420",
    image: "/images/hero-t2.webp",
    href: "/products?model=T2",
    cta: { primary: "Shop T2 Kits", secondary: "Explore" },
  },
  {
    id: "T1",
    name: "Jetour T1",
    tagline: "The original Traveller. Rugged, refined, ready.",
    price: "From $380",
    image: "/images/hero-t1.webp",
    href: "/products?model=T1%20%2F%20Traveller",
    cta: { primary: "Shop T1 Kits", secondary: "Explore" },
  },
  {
    id: "G700",
    name: "Jetour G700",
    tagline: "Heavy-duty expedition armor. No limits.",
    price: "From $560",
    image: "/images/hero-g700.webp",
    href: "/products?model=G700",
    cta: { primary: "Shop G700 Kits", secondary: "Explore" },
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[active];

  return (
    <section className="relative h-[calc(100dvh-5rem)] min-h-[600px] overflow-hidden bg-void">
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.name}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="eyebrow text-white/80">{slide.price}</p>
            <h1 className="display-xl mt-4 text-5xl text-white sm:text-7xl lg:text-8xl">
              {slide.name}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/80 sm:text-xl">
              {slide.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={slide.href} className="btn-primary">
                {slide.cta.primary}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
              <Link href={slide.href} className="btn-ghost-light">
                {slide.cta.secondary}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide tabs */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3 sm:bottom-10">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            className={`group flex items-center gap-3 px-4 py-2 transition-all ${
              i === active ? "bg-ink text-white" : "bg-white/80 text-ink backdrop-blur hover:bg-white"
            }`}
            aria-label={`Show ${s.name}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                i === active ? "bg-accent" : "bg-line group-hover:bg-accent"
              }`}
            />
            <span className="hidden font-sans text-[11px] font-bold uppercase tracking-[0.2em] sm:inline">
              {s.id}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
