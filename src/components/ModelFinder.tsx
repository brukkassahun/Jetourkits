"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { brandLines, kitStyles } from "@/lib/site";

/** Hero model finder: Brand → Model → Kit Style, then jumps to the catalog. */
export default function ModelFinder() {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [style, setStyle] = useState("");

  const models = brandLines.find((b) => b.id === brand)?.models ?? [];

  const go = () => {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (model) params.set("model", model);
    if (style) params.set("style", style);
    router.push(`/products${params.size ? `?${params}` : ""}`);
  };

  return (
    <div className="border border-line bg-panel p-6 shadow-[0_24px_60px_-24px_rgba(22,22,20,0.25)] sm:p-8">
      <p className="eyebrow mb-5">Find kits for your vehicle</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <select
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setModel("");
          }}
          className="input-lux"
          aria-label="Model line"
        >
          <option value="">1 · Select Model</option>
          {brandLines.map((b) => (
            <option key={b.id} value={b.id}>
              {b.label}
            </option>
          ))}
        </select>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="input-lux"
          aria-label="Model"
          disabled={!brand}
        >
          <option value="">{brand ? "2 · Select Model" : "2 · Select model"}</option>
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="input-lux"
          aria-label="Kit style"
        >
          <option value="">3 · Kit Style (any)</option>
          {kitStyles.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button onClick={go} className="btn-primary">
          Find My Kit
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
