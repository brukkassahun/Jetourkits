"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { animate, stagger } from "animejs";
import { ArrowRight, Globe, ShieldCheck, Factory } from "lucide-react";
import { trustBadges } from "@/lib/site";

const badgeIcons = { globe: Globe, shield: ShieldCheck, factory: Factory } as const;

const TICKER = [
  "Mars Explorer",
  "Ironclad",
  "Stargazer",
  "Off-Road Armor",
  "Mecha Wide Bodies",
  "Urban Aero",
  "OEM-Fit Guaranteed",
  "Ships Worldwide",
  "Jetour T2",
  "Jetour G700",
  "Jetour T1",
  "T2 Body Kits",
  "G700 Armor",
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const { scrollY } = useScroll();
  // Parallax: sky drifts up slower than scroll, text lifts + fades away
  const skyY = useTransform(scrollY, [0, 600], [0, 100]);
  const textY = useTransform(scrollY, [0, 600], [0, -60]);
  const fade = useTransform(scrollY, [0, 420], [1, 0]);

  useEffect(() => {
    // Kick the entrance animation only on the client, after mount.
    const raf = requestAnimationFrame(() => setAnimateIn(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!animateIn) return;
    const scope = root.current;
    if (!scope) return;

    animate(scope.querySelectorAll(".hero-letter"), {
      translateY: ["110%", "0%"],
      opacity: [0, 1],
      delay: stagger(38, { start: 120 }),
      duration: 820,
      ease: "outExpo",
    });
    animate(scope.querySelectorAll(".hero-underline"), {
      scaleX: [0, 1],
      delay: 1000,
      duration: 760,
      ease: "outExpo",
    });
    animate(scope.querySelectorAll(".hero-fade"), {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(90, { start: 680 }),
      duration: 700,
      ease: "outExpo",
    });
    // Living sky — clouds drift horizontally on slow sine loops
    animate(scope.querySelectorAll(".hero-cloud"), {
      translateX: [-28, 28],
      direction: "alternate",
      loop: true,
      duration: 9000,
      ease: "inOutSine",
      delay: stagger(1400),
    });
  }, [animateIn]);

  return (
    <section ref={root} className="relative">
      {/* Sky hero — bright, airy, welcoming */}
      <div className="relative flex min-h-svh flex-col overflow-hidden">
        {/* Sky gradient + drifting clouds */}
        <motion.div
          style={{ y: skyY }}
          className="absolute inset-0 will-change-transform"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #D6E7F5 0%, #E8F2FA 38%, #F5FAFD 68%, #F6F4EE 100%)",
            }}
          />
          <div className="hero-cloud absolute -left-24 top-[10%] h-40 w-[26rem] rounded-full bg-white/80 blur-2xl" />
          <div className="hero-cloud absolute right-[6%] top-[16%] h-32 w-72 rounded-full bg-white/70 blur-2xl" />
          <div className="hero-cloud absolute left-[28%] top-[6%] h-24 w-64 rounded-full bg-white/50 blur-2xl" />
          <div className="hero-cloud absolute left-[12%] top-[46%] h-36 w-80 rounded-full bg-white/60 blur-3xl" />
          <div className="hero-cloud absolute -right-20 top-[52%] h-44 w-[28rem] rounded-full bg-white/70 blur-3xl" />
          <div className="hero-cloud absolute right-[30%] top-[70%] h-28 w-72 rounded-full bg-white/60 blur-2xl" />
        </motion.div>

        <motion.div
          style={{ y: textY, opacity: fade }}
          className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 pb-16 pt-32 text-center sm:px-6 sm:pt-36"
        >
          <p className="eyebrow hero-fade">
            Jetour T1 · Jetour T2 · Jetour G700
          </p>
          <h1 className="display-xl mt-8 text-[13vw] text-ink sm:text-8xl lg:text-[7.5rem]">
            <span className="block">
              <Word letters="STOCK" />
              <span className="inline-block w-[0.22em]" />
              <Word letters="IN." />
            </span>
            <span className="relative mt-1 inline-block italic text-accent">
              <Word letters="BEAST" />
              <span className="inline-block w-[0.22em]" />
              <Word letters="OUT." />
              <span className="hero-underline absolute -bottom-1 left-0 block h-[0.05em] w-full origin-left bg-accent" />
            </span>
          </h1>
          <p className="hero-fade mx-auto mt-8 max-w-xl text-base leading-[1.8] text-ink/70 sm:text-lg">
            Factory-direct armor, mecha and aero kits for Jetour T1, T2 and G700. Engineered to OEM fit.
            From full expedition builds to plug-and-play aero — shipped worldwide from China.
          </p>

          <div className="hero-fade mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/products" className="btn-primary shine animate-glow">
              Explore Styling Kits
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link href="/wholesale" className="btn-ghost">
              Wholesale / B2B
            </Link>
          </div>
        </motion.div>

        {/* Ticker */}
        <div className="marquee-hover relative overflow-hidden border-y border-line bg-white/80 py-3.5 backdrop-blur">
          <div className="animate-marquee flex w-max items-center gap-8 pr-8">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-8 font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-ink/50"
              >
                {t}
                <span className="text-accent">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Trust row — hairline separated, editorial */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid gap-8 border-y border-line py-10 sm:grid-cols-3 sm:gap-0"
        >
          {trustBadges.map((b, i) => {
            const Icon = badgeIcons[b.icon as keyof typeof badgeIcons];
            return (
              <div
                key={b.title}
                className={`flex items-start gap-4 ${i > 0 ? "sm:border-l sm:border-line sm:pl-8" : ""}`}
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink">
                    {b.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.sub}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/** Split a word into masked letters for the staggered anime reveal. */
function Word({ letters }: { letters: string }) {
  return (
    <span className="inline-block whitespace-nowrap">
      {letters.split("").map((c, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <span className="hero-letter inline-block will-change-transform">{c}</span>
        </span>
      ))}
    </span>
  );
}
