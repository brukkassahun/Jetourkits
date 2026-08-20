# JETOURKITS

> Body kit website for **Jetour T1**, **Jetour T2**, and **Jetour G700**.

Built on Next.js 14 + Tailwind CSS + Framer Motion + Supabase.

---

## Models Covered

| Model | Years |
|---|---|
| Jetour T2 | 2024–2026 |
| Jetour T1 / Traveller | 2023–2026 |
| Jetour G700 | 2023–2026 |

## Kit Styles

- **Off-Road** — Armor kits, fender flares, roof racks, snorkels, rock sliders
- **Mecha** — Angular front/rear bumpers, wide bodies, mecha-style upgrades
- **Urban Aero** — Street lips, diffusers, side skirts, wings

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Products

Product data lives in `src/lib/products.ts`. The site falls back to local data if Supabase is not configured.

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials if using the live database.

## Deploy

```bash
npm run build
npm start
```

Works on Vercel, Netlify, or any Node.js host.
