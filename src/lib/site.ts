export const site = {
  name: "Jetour Kits",
  tagline: "Premium Aftermarket Parts for Jetour T2",
  description:
    "Premium wholesale aftermarket parts for the Jetour T2. Sourced through our network of ISO 9001 & IATF 16949 certified manufacturing partners.",
  phone: "+86 138 0000 0000",
  whatsapp: "8613800000000",
  wechat: "JETOURKITS",
  email: "contact@jetourt2parts.com",
  address: "Guangzhou Auto Parts District, China",
};

export const navLinks = [
  { href: "/products", label: "All Kits" },
  { href: "/products?style=Off-Road", label: "Off-Road" },
  { href: "/products?style=Mecha", label: "Mecha" },
  { href: "/products?style=Urban%20Aero", label: "Urban Aero" },
  { href: "/wholesale", label: "Wholesale" },
];

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const trustBadges = [
  { icon: "globe", title: "Global Express Shipping", sub: "DHL / sea freight to 40+ countries" },
  { icon: "shield", title: "OEM-Fit Guarantee", sub: "Bolt-on fitment or full refund" },
  { icon: "factory", title: "Direct Factory Sourcing", sub: "No middlemen — Guangzhou plant" },
];

export const brandLines = [
  { id: "Jetour T2", label: "Jetour T2", models: ["T2"] },
  { id: "Jetour T1", label: "Jetour T1", models: ["T1 / Traveller"] },
  { id: "Jetour G700", label: "Jetour G700", models: ["G700"] },
] as const;

export const kitStyles = ["Off-Road", "Mecha", "Urban Aero"] as const;
export type KitStyle = (typeof kitStyles)[number];

export const currencies = [
  { code: "USD", symbol: "$", rate: 1, label: "US Dollar" },
  { code: "CNY", symbol: "¥", rate: 7.2, label: "Chinese Yuan" },
  { code: "GHS", symbol: "₵", rate: 15.4, label: "Ghanaian Cedi" },
  { code: "NGN", symbol: "₦", rate: 1530, label: "Nigerian Naira" },
  { code: "AED", symbol: "د.إ", rate: 3.67, label: "UAE Dirham" },
  { code: "EUR", symbol: "€", rate: 0.92, label: "Euro" },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];

export const materials = [
  "ABS Plastic",
  "PP Polypropylene",
  "Carbon Fiber",
  "FRP Fiberglass",
  "Stainless Steel",
  "Aluminum Alloy",
  "LLDPE Polyethylene",
] as const;
