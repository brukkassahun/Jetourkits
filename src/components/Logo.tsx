"use client";

import Link from "next/link";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  variant?: "dark" | "light";
}

export function LogoMark({ className = "h-8 w-8", variant = "dark" }: Omit<LogoProps, "showWordmark">) {
  const stroke = variant === "dark" ? "#171814" : "#FFFFFF";
  const accent = variant === "dark" ? "#0E7A3D" : "#FFFFFF";

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer hexagon / shield outline */}
      <path
        d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Inner chevron / road motif */}
      <path
        d="M14 20L24 14L34 20"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M18 28L24 24L30 28"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M22 36L24 34L26 36"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Center dot */}
      <circle cx="24" cy="24" r="2" fill={accent} />
    </svg>
  );
}

export default function Logo({ className = "", showWordmark = true, variant = "dark" }: LogoProps) {
  const textColor = variant === "dark" ? "text-ink" : "text-white";

  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Jetour Kits home">
      <LogoMark className="h-8 w-8 sm:h-9 sm:w-9" variant={variant} />
      {showWordmark && (
        <span className={`font-display text-lg font-semibold tracking-[0.14em] ${textColor}`}>
          JETOUR<span className="text-accent">KITS</span>
        </span>
      )}
    </Link>
  );
}
