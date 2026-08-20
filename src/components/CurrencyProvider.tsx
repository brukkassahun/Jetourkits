"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { currencies, type CurrencyCode } from "@/lib/site";

interface CurrencyCtx {
  code: CurrencyCode;
  setCode: (c: CurrencyCode) => void;
  format: (usd: number) => string;
}

const Ctx = createContext<CurrencyCtx>({
  code: "USD",
  setCode: () => {},
  format: (usd) => `$${usd.toLocaleString()}`,
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [code, setCodeState] = useState<CurrencyCode>("USD");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mk-currency") as CurrencyCode | null;
      if (saved && currencies.some((c) => c.code === saved)) setCodeState(saved);
    } catch {}
  }, []);

  const setCode = (c: CurrencyCode) => {
    setCodeState(c);
    try {
      localStorage.setItem("mk-currency", c);
    } catch {}
  };

  const format = (usd: number) => {
    const cur = currencies.find((c) => c.code === code) ?? currencies[0];
    const converted = usd * cur.rate;
    const rounded = cur.rate > 100 ? Math.round(converted / 1000) * 1000 : Math.round(converted);
    return `${cur.symbol}${rounded.toLocaleString("en-US")}`;
  };

  return <Ctx.Provider value={{ code, setCode, format }}>{children}</Ctx.Provider>;
}

export const useCurrency = () => useContext(Ctx);
