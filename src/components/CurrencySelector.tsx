"use client";

import { useCurrency } from "./CurrencyProvider";
import { currencies, type CurrencyCode } from "@/lib/site";
import { ChevronDown } from "lucide-react";

export default function CurrencySelector() {
  const { code, setCode } = useCurrency();
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Display currency</span>
      <select
        value={code}
        onChange={(e) => setCode(e.target.value as CurrencyCode)}
        className="appearance-none border border-line bg-elevated py-2 pl-3 pr-8 font-display text-xs font-bold uppercase tracking-wider text-foreground outline-none transition-colors focus:border-accent [&>option]:bg-panel"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} {c.symbol}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-faint" />
    </label>
  );
}
