"use client";

import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export function LogoMark({ className = "h-7 w-7", variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  const stroke = variant === "dark" ? "#0A0A0A" : "#FAF9F6";
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18.5" stroke={stroke} strokeWidth="3" />
      <path d="M12 20C12 15.5817 15.5817 12 20 12V28C15.5817 28 12 24.4183 12 20Z" fill={variant === "dark" ? "#0E7A3D" : "#FAF9F6"} />
      <circle cx="24" cy="20" r="4" fill={variant === "dark" ? "#0A0A0A" : "#FAF9F6"} />
    </svg>
  );
}

export default function Logo({ className = "", variant = "dark" }: LogoProps) {
  const text = variant === "dark" ? "text-ink" : "text-cream";
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Jetour Kits home">
      <LogoMark variant={variant} />
      <span className={`font-display text-base font-black uppercase tracking-[0.18em] ${text}`}>
        JETOUR<span className="font-medium">KITS</span>
      </span>
    </Link>
  );
}
