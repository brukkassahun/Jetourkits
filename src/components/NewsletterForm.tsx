"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

interface NewsletterFormProps {
  variant?: "light" | "dark";
}

export default function NewsletterForm({ variant = "light" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    try {
      const list = JSON.parse(localStorage.getItem("mk-newsletter") ?? "[]");
      localStorage.setItem("mk-newsletter", JSON.stringify([...list, { email, at: Date.now() }]));
    } catch {}
    setDone(true);
  };

  if (done) {
    return (
      <p className={`flex items-center gap-2 rounded-full px-4 py-3 text-sm ${
        variant === "dark" ? "bg-white/10 text-cream" : "bg-accent/10 text-accent"
      }`}>
        <Check className="h-4 w-4" strokeWidth={1.5} /> You&apos;re on the list.
      </p>
    );
  }

  const inputBase = "w-full rounded-full border bg-transparent px-4 py-2.5 text-sm outline-none transition-colors";
  const inputTheme = variant === "dark"
    ? "border-white/20 text-cream placeholder:text-white/40 focus:border-cream"
    : "border-line text-ink placeholder:text-faint focus:border-ink";
  const btnTheme = variant === "dark"
    ? "border-white/20 text-cream hover:bg-cream hover:text-charcoal"
    : "border-ink/20 text-ink hover:bg-ink hover:text-cream";

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className={`${inputBase} ${inputTheme}`}
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${btnTheme}`}
      >
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </form>
  );
}
