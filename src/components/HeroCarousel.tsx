"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
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
];

export default function HeroCarousel() {
  const slide = slides[0];

  return (
    <section className="relative min-h-[calc(100dvh-4rem)] overflow-hidden bg-charcoal pt-16">
      {/* Background image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={slide.image}
          alt={slide.name}
          fill
          priority
          className="object-cover object-center brightness-150 contrast-110"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/50 to-charcoal/10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[1440px] flex-col justify-center px-4 py-20 sm:px-6">
        <div className="max-w-3xl">
          <p className="eyebrow-dark">{slide.price}</p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-5xl font-black uppercase leading-[0.92] tracking-[-0.02em] text-white sm:text-7xl lg:text-8xl"
          >
            {slide.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl"
          >
            {slide.tagline}
          </motion.p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href={slide.href} className="btn-accent group">
              Shop {slide.id} Kits
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </Link>
            <Link href="/products?model=T2" className="btn-ghost-light">
              View All Kits
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
