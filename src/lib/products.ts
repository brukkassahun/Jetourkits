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
  | "Hood";

export type InstallRating = "Plug & Play" | "Bolt-On" | "Professional Install";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string; // Jetour
  model: string; // T1 / T2 / G700
  yearFrom: number;
  yearTo: number;
  style: KitStyle;
  kitType: KitType;
  price: number; // USD
  originalPrice?: number;
  images: string[];
  materials: string[];
  install: InstallRating;
  components: string[];
  description: string;
  stock: number;
  rating: number;
  reviews: number;
  featured?: boolean;
  hotDeal?: boolean;
}

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

export const products: Product[] = [
  // ─── T2 Products ───────────────────────────────────────────────────────────
  {
    id: "j2-01",
    slug: "jetour-t2-mars-explorer-full-armor-kit",
    name: "Mars Explorer Full Armor Kit",
    brand: "Jetour",
    model: "T2",
    yearFrom: 2024,
    yearTo: 2026,
    style: "Off-Road",
    kitType: "Full Armor Kit",
    price: 2890,
    originalPrice: 3350,
    images: [
      img("1559416523-140ddc3d238c"),
      img("1519641471654-76ce0107ad1b"),
      img("1533106418989-88406c7cc8ca"),
      img("1533473359331-0135ef1b58bf"),
    ],
    materials: ["ABS Plastic", "Stainless Steel", "Aluminum Alloy"],
    install: "Professional Install",
    components: [
      "Front steel bull-bar bumper with winch plate",
      "Rear armored bumper with tow points",
      "Wide fender flare set (6 pcs)",
      "Rock slider side steps (pair)",
      "Roof platform rack with 40\" LED light bar",
      "Raised air intake snorkel",
      "All mounting hardware & brackets",
    ],
    description:
      "The flagship Mars Explorer conversion turns the Jetour T2 into a true expedition rig. Every panel is CAD-matched to factory mounting points — no cutting or welding required. Powder-coated in matte black with optional color-match service for bulk orders.",
    stock: 8,
    rating: 4.9,
    reviews: 47,
    featured: true,
    hotDeal: true,
  },
  {
    id: "j2-02",
    slug: "jetour-t2-stargazer-urban-aero-kit",
    name: "Stargazer Urban Aero Body Kit",
    brand: "Jetour",
    model: "T2",
    yearFrom: 2024,
    yearTo: 2026,
    style: "Urban Aero",
    kitType: "Full Body Kit",
    price: 1450,
    images: [
      img("1568605117036-5fe5e7bab0b7"),
      img("1552519507-da3b142c6e3d"),
      img("1617531653332-bd46c24f2068"),
    ],
    materials: ["PP Polypropylene", "ABS Plastic"],
    install: "Bolt-On",
    components: [
      "Front aero bumper lip with DRL housings",
      "Side skirt extensions (pair)",
      "Rear diffuser with exhaust trim",
      "Tailgate spoiler with LED brake light",
      "Installation clips & 3M automotive adhesive kit",
    ],
    description:
      "The Stargazer kit sharpens the T2's street presence without sacrificing daily drivability. Flexible PP construction survives speed bumps and curb taps that crack fiberglass kits. Ships primered, ready for paint.",
    stock: 15,
    rating: 4.8,
    reviews: 89,
    featured: true,
  },
  {
    id: "j2-03",
    slug: "jetour-t2-led-tail-spoiler-wing",
    name: "LED Tail Spoiler Wing",
    brand: "Jetour",
    model: "T2",
    yearFrom: 2024,
    yearTo: 2026,
    style: "Mecha",
    kitType: "Spoiler Wing",
    price: 420,
    images: [
      img("1617531653332-bd46c24f2068"),
      img("1553440569-bcc63803a83d"),
      img("1568844293986-8d0400bd4745"),
    ],
    materials: ["ABS Plastic"],
    install: "Plug & Play",
    components: [
      "Tailgate spoiler with integrated LED strip",
      "Plug-and-play wiring adapter (no splicing)",
      "Mounting hardware & template",
    ],
    description:
      "The traveller-style LED tail wing — sequential turn signal and brake light built into an aggressive mecha-profile spoiler. Connects to the factory harness with our adapter: truly plug & play.",
    stock: 26,
    rating: 4.8,
    reviews: 65,
    featured: true,
  },
  {
    id: "j2-04",
    slug: "jetour-t2-safari-snorkel-intake",
    name: "Safari Snorkel Raised Intake",
    brand: "Jetour",
    model: "T2",
    yearFrom: 2024,
    yearTo: 2026,
    style: "Off-Road",
    kitType: "Snorkel",
    price: 310,
    images: [
      img("1535732820275-9ffd998cac22"),
      img("1615906655593-ad0386982a0f"),
      img("1606577924006-27d39b132ae2"),
    ],
    materials: ["LLDPE Polyethylene", "Stainless Steel"],
    install: "Professional Install",
    components: [
      "Snorkel body (UV-stable LLDPE)",
      "Air ram head with water separator",
      "A-pillar mounting bracket set",
      "Fender cutting template",
      "Intake adapter ducting",
    ],
    description:
      "Raises the T2's intake to roofline for water crossings and dusty trails. Ram head rotates 180° for heavy rain. Includes a precision cutting template — one careful cut, everything else bolts on.",
    stock: 14,
    rating: 4.7,
    reviews: 29,
  },
  {
    id: "j2-05",
    slug: "jetour-t2-ironclad-front-bumper",
    name: "Ironclad Mecha Front Bumper",
    brand: "Jetour",
    model: "T2",
    yearFrom: 2024,
    yearTo: 2026,
    style: "Mecha",
    kitType: "Front Bumper",
    price: 980,
    originalPrice: 1150,
    images: [
      img("1568844293986-8d0400bd4745"),
      img("1605559424843-9e4c228bf1c2"),
      img("1580273916550-e323be2ae537"),
    ],
    materials: ["Stainless Steel", "ABS Plastic"],
    install: "Bolt-On",
    components: [
      "Angular mecha-design front bumper shell",
      "Integrated LED fog light pods (pair)",
      "Skid plate underguard",
      "Factory sensor & camera relocation brackets",
      "Mounting hardware kit",
    ],
    description:
      "Aggressive geometric styling inspired by exoskeleton armor. The Ironclad keeps full compatibility with the T2's parking sensors and front camera, and its steel skid plate protects the sump on rough tracks.",
    stock: 12,
    rating: 4.7,
    reviews: 34,
    featured: true,
    hotDeal: true,
  },
  {
    id: "j2-06",
    slug: "jetour-t2-rock-slider-side-steps",
    name: "Rock Slider Side Steps",
    brand: "Jetour",
    model: "T2",
    yearFrom: 2024,
    yearTo: 2026,
    style: "Off-Road",
    kitType: "Side Steps",
    price: 460,
    images: [
      img("1533106418989-88406c7cc8ca"),
      img("1559416523-140ddc3d238c"),
      img("1519641471654-76ce0107ad1b"),
    ],
    materials: ["Stainless Steel", "Aluminum Alloy"],
    install: "Bolt-On",
    components: [
      "Rock slider pair (3mm wall steel tube)",
      "Chassis-mount brackets — no drilling",
      "Anti-slip step plates",
      "Hardware kit",
    ],
    description:
      "Real sliders, not decorative side bars — chassis-mounted to take the T2's full weight on a jack or a rock. Stepped top surface doubles as a door sill step for roof access.",
    stock: 19,
    rating: 4.8,
    reviews: 41,
  },
  {
    id: "j2-07",
    slug: "jetour-t2-expedition-roof-rack",
    name: "Expedition Roof Platform + LED Bar",
    brand: "Jetour",
    model: "T2",
    yearFrom: 2024,
    yearTo: 2026,
    style: "Off-Road",
    kitType: "Roof Rack",
    price: 540,
    images: [
      img("1533473359331-0135ef1b58bf"),
      img("1519641471654-76ce0107ad1b"),
      img("1559416523-140ddc3d238c"),
    ],
    materials: ["Aluminum Alloy", "Stainless Steel"],
    install: "Bolt-On",
    components: [
      "Full-length aluminum roof platform (140kg rated)",
      "32\" curved LED light bar (180W, combo beam)",
      "Wiring harness with switch & relay",
      "Wind deflector fairing",
      "Gutter-mount feet — no drilling",
    ],
    description:
      "Flat-pack expedition platform sized for rooftop tents and jerry can mounts. T-slot channels accept standard accessories. Light bar is IP68 rated with a 2-year warranty.",
    stock: 22,
    rating: 4.8,
    reviews: 61,
  },

  // ─── T1 / Traveller Products ──────────────────────────────────────────────
  {
    id: "j1-01",
    slug: "jetour-t1-ironclad-mecha-front-bumper",
    name: "Ironclad Mecha Front Bumper",
    brand: "Jetour",
    model: "T1 / Traveller",
    yearFrom: 2023,
    yearTo: 2026,
    style: "Mecha",
    kitType: "Front Bumper",
    price: 980,
    originalPrice: 1150,
    images: [
      img("1568844293986-8d0400bd4745"),
      img("1605559424843-9e4c228bf1c2"),
      img("1580273916550-e323be2ae537"),
    ],
    materials: ["Stainless Steel", "ABS Plastic"],
    install: "Bolt-On",
    components: [
      "Angular mecha-design front bumper shell",
      "Integrated LED fog light pods (pair)",
      "Skid plate underguard",
      "Factory sensor & camera relocation brackets",
      "Mounting hardware kit",
    ],
    description:
      "Aggressive geometric styling inspired by exoskeleton armor. The Ironclad keeps full compatibility with the Traveller's parking sensors and front camera, and its steel skid plate protects the sump on rough tracks.",
    stock: 12,
    rating: 4.7,
    reviews: 34,
    featured: true,
    hotDeal: true,
  },
  {
    id: "j1-02",
    slug: "jetour-t1-trail-fender-flares",
    name: "Trail Series Fender Flares",
    brand: "Jetour",
    model: "T1 / Traveller",
    yearFrom: 2023,
    yearTo: 2026,
    style: "Off-Road",
    kitType: "Fender Flares",
    price: 380,
    images: [
      img("1519641471654-76ce0107ad1b"),
      img("1533473359331-0135ef1b58bf"),
      img("1559416523-140ddc3d238c"),
    ],
    materials: ["ABS Plastic"],
    install: "Bolt-On",
    components: [
      "Front flare pair (+30mm)",
      "Rear flare pair (+30mm)",
      "Rubber edge trim seal",
      "Stainless fasteners — uses factory holes",
    ],
    description:
      "Textured matte-black pocket flares that cover wider all-terrain rubber and protect paint from stone chips. Flexible ABS won't crack in cold climates.",
    stock: 30,
    rating: 4.7,
    reviews: 78,
  },
  {
    id: "j1-03",
    slug: "jetour-t1-expedition-roof-rack",
    name: "Expedition Roof Platform + LED Bar",
    brand: "Jetour",
    model: "T1 / Traveller",
    yearFrom: 2023,
    yearTo: 2026,
    style: "Off-Road",
    kitType: "Roof Rack",
    price: 520,
    images: [
      img("1533473359331-0135ef1b58bf"),
      img("1519641471654-76ce0107ad1b"),
      img("1559416523-140ddc3d238c"),
    ],
    materials: ["Aluminum Alloy", "Stainless Steel"],
    install: "Bolt-On",
    components: [
      "Full-length aluminum roof platform (120kg rated)",
      "32\" curved LED light bar (180W, combo beam)",
      "Wiring harness with switch & relay",
      "Wind deflector fairing",
      "Gutter-mount feet — no drilling",
    ],
    description:
      "Flat-pack expedition platform sized for rooftop tents and jerry can mounts. T-slot channels accept standard accessories. Light bar is IP68 rated with a 2-year warranty.",
    stock: 18,
    rating: 4.8,
    reviews: 55,
  },

  // ─── G700 Products ────────────────────────────────────────────────────────
  {
    id: "g7-01",
    slug: "jetour-g700-mars-explorer-full-armor-kit",
    name: "Mars Explorer Full Armor Kit",
    brand: "Jetour",
    model: "G700",
    yearFrom: 2023,
    yearTo: 2026,
    style: "Off-Road",
    kitType: "Full Armor Kit",
    price: 2990,
    originalPrice: 3450,
    images: [
      img("1559416523-140ddc3d238c"),
      img("1519641471654-76ce0107ad1b"),
      img("1533106418989-88406c7cc8ca"),
      img("1533473359331-0135ef1b58bf"),
    ],
    materials: ["ABS Plastic", "Stainless Steel", "Aluminum Alloy"],
    install: "Professional Install",
    components: [
      "Front steel bull-bar bumper with winch plate",
      "Rear armored bumper with tow points",
      "Wide fender flare set (6 pcs)",
      "Rock slider side steps (pair)",
      "Roof platform rack with 40\" LED light bar",
      "Raised air intake snorkel",
      "All mounting hardware & brackets",
    ],
    description:
      "The flagship Mars Explorer conversion for the G700 — engineered for serious expedition duty. Every panel is CAD-matched to factory mounting points on the G700 chassis. Powder-coated in matte black with optional color-match service.",
    stock: 6,
    rating: 4.9,
    reviews: 18,
    featured: true,
    hotDeal: true,
  },
  {
    id: "g7-02",
    slug: "jetour-g700-ironclad-mecha-front-bumper",
    name: "Ironclad Mecha Front Bumper",
    brand: "Jetour",
    model: "G700",
    yearFrom: 2023,
    yearTo: 2026,
    style: "Mecha",
    kitType: "Front Bumper",
    price: 1020,
    originalPrice: 1190,
    images: [
      img("1568844293986-8d0400bd4745"),
      img("1605559424843-9e4c228bf1c2"),
      img("1580273916550-e323be2ae537"),
    ],
    materials: ["Stainless Steel", "ABS Plastic"],
    install: "Bolt-On",
    components: [
      "Angular mecha-design front bumper shell",
      "Integrated LED fog light pods (pair)",
      "Skid plate underguard",
      "Factory sensor & camera relocation brackets",
      "Mounting hardware kit",
    ],
    description:
      "Aggressive geometric styling for the G700 — exoskeleton-inspired armor. Keeps full compatibility with G700 parking sensors and front camera. Steel skid plate protects the sump on rough terrain.",
    stock: 10,
    rating: 4.8,
    reviews: 22,
    featured: true,
  },
  {
    id: "g7-03",
    slug: "jetour-g700-rock-slider-side-steps",
    name: "Rock Slider Side Steps",
    brand: "Jetour",
    model: "G700",
    yearFrom: 2023,
    yearTo: 2026,
    style: "Off-Road",
    kitType: "Side Steps",
    price: 480,
    images: [
      img("1533106418989-88406c7cc8ca"),
      img("1559416523-140ddc3d238c"),
      img("1519641471654-76ce0107ad1b"),
    ],
    materials: ["Stainless Steel", "Aluminum Alloy"],
    install: "Bolt-On",
    components: [
      "Rock slider pair (4mm wall steel tube — heavy duty)",
      "Chassis-mount brackets — no drilling",
      "Anti-slip step plates",
      "Hardware kit",
    ],
    description:
      "Heavy-duty sliders designed for the G700's higher weight and capability. Chassis-mounted to take full G700 weight on a jack or a rock. Stepped top surface doubles as a door sill step for roof access.",
    stock: 14,
    rating: 4.9,
    reviews: 28,
  },
  {
    id: "g7-04",
    slug: "jetour-g700-expedition-roof-rack",
    name: "Expedition Roof Platform + LED Bar",
    brand: "Jetour",
    model: "G700",
    yearFrom: 2023,
    yearTo: 2026,
    style: "Off-Road",
    kitType: "Roof Rack",
    price: 560,
    images: [
      img("1533473359331-0135ef1b58bf"),
      img("1519641471654-76ce0107ad1b"),
      img("1559416523-140ddc3d238c"),
    ],
    materials: ["Aluminum Alloy", "Stainless Steel"],
    install: "Bolt-On",
    components: [
      "Full-length aluminum roof platform (160kg rated — heavier duty)",
      "40\" curved LED light bar (220W, combo beam)",
      "Wiring harness with switch & relay",
      "Wind deflector fairing",
      "Gutter-mount feet — no drilling",
    ],
    description:
      "The G700's larger roof and higher load rating demanded a heavier-duty platform. 160kg rated with T-slot channels for all standard accessories. Light bar is IP68 rated, 2-year warranty.",
    stock: 12,
    rating: 4.9,
    reviews: 35,
  },
  {
    id: "g7-05",
    slug: "jetour-g700-safari-snorkel-intake",
    name: "Safari Snorkel Raised Intake",
    brand: "Jetour",
    model: "G700",
    yearFrom: 2023,
    yearTo: 2026,
    style: "Off-Road",
    kitType: "Snorkel",
    price: 330,
    images: [
      img("1535732820275-9ffd998cac22"),
      img("1615906655593-ad0386982a0f"),
      img("1606577924006-27d39b132ae2"),
    ],
    materials: ["LLDPE Polyethylene", "Stainless Steel"],
    install: "Professional Install",
    components: [
      "Snorkel body (UV-stable LLDPE)",
      "Air ram head with water separator",
      "A-pillar mounting bracket set",
      "Fender cutting template",
      "Intake adapter ducting",
    ],
    description:
      "Raises the G700's intake to roofline for deep water crossings and dusty trails. Ram head rotates 180° for heavy rain conditions. Precision cutting template included — one careful cut, everything else bolts on.",
    stock: 8,
    rating: 4.7,
    reviews: 19,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export interface ProductFilters {
  brand?: string;
  model?: string;
  style?: string;
  kitType?: string;
  q?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "rating";
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
    case "rating":
      out.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      break;
    default:
      out.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false) || b.rating - a.rating);
  }
  return out;
}

export const kitTypes: KitType[] = Array.from(new Set(products.map((p) => p.kitType))).sort() as KitType[];

export function compatTag(p: Product) {
  return `Fits ${p.yearFrom}–${p.yearTo} Jetour ${p.model}`;
}
