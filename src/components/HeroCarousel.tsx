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
  },
  {
    id: "T1",
    name: "Jetour T1",
    tagline: "The original Traveller. Rugged, refined, ready.",
    price: "From $380",
    image: "/images/hero-t1.webp",
    href: "/products?model=T1%20%2F%20Traveller",
  },
  {
    id: "G700",
    name: "Jetour G700",
    tagline: "Heavy-duty expedition armor. No limits.",
    price: "From $560",
    image: "/images/hero-g700.webp",
    href: "/products?model=G700",
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
    <section className="relative min-h-[calc(100dvh-4rem)] overflow-hidden bg-charcoal pt-16">
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.06 }}
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
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-4rem)] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6">
        <div className="max-w-3xl">
          <p className="eyebrow-dark">{slide.price}</p>
          <AnimatePresence mode="wait">
            <motion.h1
              key={slide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-5xl font-black uppercase leading-[0.92] tracking-[-0.02em] text-white sm:text-7xl lg:text-8xl"
            >
              {slide.name}
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={slide.id + "tag"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl"
            >
              {slide.tagline}
            </motion.p>
          </AnimatePresence>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href={slide.href} className="btn-accent group">
              Shop {slide.id} Kits
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </Link>
            <Link href="/products" className="btn-ghost-light">
              View All Kits
            </Link>
          </div>
        </div>

        {/* Slide tabs */}
        <div className="absolute bottom-10 left-4 flex gap-3 sm:left-6 lg:left-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`group flex items-center gap-3 rounded-full px-4 py-2.5 transition-all ${
                i === active
                  ? "bg-white text-ink"
                  : "border border-white/20 bg-white/5 text-white backdrop-blur hover:border-white/40"
              }`}
              aria-label={`Show ${s.name}`}
            >
              <span className={`h-2 w-2 rounded-full ${i === active ? "bg-accent" : "bg-white/40 group-hover:bg-white"}`} />
              <span className="hidden font-sans text-[11px] font-bold uppercase tracking-[0.2em] sm:inline">
                {s.id}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
