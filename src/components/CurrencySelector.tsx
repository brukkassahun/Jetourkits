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
        className="appearance-none rounded-full border border-line bg-paper py-2 pl-4 pr-9 font-sans text-[11px] font-bold uppercase tracking-wider text-ink outline-none transition-colors focus:border-ink [&>option]:bg-paper"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} {c.symbol}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-faint" />
    </label>
  );
}
