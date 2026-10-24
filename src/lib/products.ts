import type { KitStyle } from "./site";

export type KitType =
  | "Full Armor Kit"
  | "Full Body Kit"
  | "Front Bumper"
  | "Rear Bumper"
  | "Roof Rack"
  | "Fender Flares"
  | "Side Steps"
  | "Spoiler Wing"
  | "Grille"
  | "Snorkel"
  | "Light Bar"
  | "Hood"
  | "Cargo Box"
  | "Accessory";

export type InstallRating = "Plug & Play" | "Bolt-On" | "Professional Install";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string; // Jetour
  model: string; // T2
  yearFrom: number;
  yearTo: number;
  style: KitStyle;
  kitType: KitType;
  price: number; // USD
  originalPrice?: number;
  thumbnail?: string;
  images: string[];
  materials: string[];
  install: InstallRating;
  components: string[];
  description: string;
  stock: number;
  featured?: boolean;
  hotDeal?: boolean;
}

// Local fallback catalog is intentionally empty — live data is loaded from Supabase.
// The seeded T2 catalog is the source of truth.
export const products: Product[] = [];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export interface ProductFilters {
  brand?: string;
  model?: string;
  style?: string;
  kitType?: string;
  q?: string;
  sort?: "featured" | "price-asc" | "price-desc";
}

export function filterProducts(f: ProductFilters, list: Product[] = products): Product[] {
  let out = [...list];
  if (f.q) {
    const tokens = f.q.toLowerCase().split(/\s+/).filter(Boolean);
    out = out.filter((p) => {
      const hay =
        `${p.name} ${p.brand} ${p.model} ${p.style} ${p.kitType} ${p.materials.join(" ")}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }
  if (f.model) out = out.filter((p) => p.model === f.model);
  if (f.style) out = out.filter((p) => p.style === f.style);
  if (f.kitType) out = out.filter((p) => p.kitType === f.kitType);

  switch (f.sort) {
    case "price-asc":
      out.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      out.sort((a, b) => b.price - a.price);
      break;
    default:
      out.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
  }
  return out;
}

// Hardcoded kit types for the filter bar. Keep in sync with KitType union above.
export const kitTypes: KitType[] = [
  "Accessory",
  "Cargo Box",
  "Fender Flares",
  "Front Bumper",
  "Full Armor Kit",
  "Full Body Kit",
  "Grille",
  "Hood",
  "Light Bar",
  "Rear Bumper",
  "Roof Rack",
  "Side Steps",
  "Snorkel",
  "Spoiler Wing",
];

export function compatTag(p: Product) {
  return `Fits ${p.yearFrom}–${p.yearTo} Jetour ${p.model}`;
}
