"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function NewsletterForm() {
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
      <p className="flex items-center gap-2 border border-success/40 bg-success/5 px-4 py-3 text-sm text-success">
        <Check className="h-4 w-4" strokeWidth={1.5} /> You&apos;re on the list — new kit drops land in your inbox first.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex items-end gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full border-0 border-b border-line bg-transparent px-0 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-accent"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink/25 text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
      >
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </form>
  );
}
