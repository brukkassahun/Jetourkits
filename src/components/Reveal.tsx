"use client";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Kept for API compatibility; no longer used */
  delay?: number;
  /** Kept for API compatibility; no longer used */
  y?: number;
}

export default function Reveal({ children, className = "" }: RevealProps) {
  return <div className={className}>{children}</div>;
}
