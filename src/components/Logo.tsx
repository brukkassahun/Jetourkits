"use client";

import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export function LogoMark({ className = "h-7 w-7", variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  const badgeFill = variant === "dark" ? "#0A0A0A" : "#FAF9F6";
  const jStroke = variant === "dark" ? "#FAF9F6" : "#0A0A0A";
  const green = "#0E7A3D";

  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Hexagonal bolt-head badge */}
      <path d="M24 2.5L41.5 12.75V33.25L24 43.5L6.5 33.25V12.75L24 2.5Z" fill={badgeFill} />
      {/* Inner accent ring */}
      <path d="M24 7L37 14.5V29.5L24 37L11 29.5V14.5L24 7Z" fill="none" stroke={green} strokeWidth="1.2" />
      {/* J letterform */}
      <path
        d="M29 14V26C29 29.866 25.866 33 22 33C18.134 33 15 29.866 15 26V24.5"
        stroke={jStroke}
        strokeWidth="6.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Green precision dot */}
      <circle cx="29" cy="13" r="2.2" fill={green} />
    </svg>
  );
}

export default function Logo({ className = "", variant = "dark" }: LogoProps) {
  const text = variant === "dark" ? "text-ink" : "text-cream";
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Jetour Kits home">
      <LogoMark variant={variant} />
      <span className={`font-display text-base font-black uppercase tracking-[0.18em] ${text}`}>
        JETOUR<span className="font-medium text-sage">KITS</span>
      </span>
    </Link>
  );
}
