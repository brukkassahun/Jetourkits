-- ═══════════════════════════════════════════════════════════════
-- MECHAKIT — Phase 1 database setup
-- Run this ONCE in your Supabase project: SQL Editor → New query → paste → Run
-- Safe to re-run: uses IF NOT EXISTS / ON CONFLICT throughout.
-- ═══════════════════════════════════════════════════════════════

begin;

-- ── Products (the live catalog) ─────────────────────────────────
create table if not exists public.products (
  id text primary key,
  slug text unique not null,
  name text not null,
  brand text not null,
  model text not null,
  year_from int not null,
  year_to int not null,
  style text not null,
  kit_type text not null,
  price numeric(10,2) not null,
  original_price numeric(10,2),
  images text[] not null default '{}',
  materials text[] not null default '{}',
  install text not null default 'Bolt-On',
  components text[] not null default '{}',
  description text not null default '',
  stock int not null default 0,
  rating numeric(2,1) not null default 5.0,
  reviews int not null default 0,
  featured boolean not null default false,
  hot_deal boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists products_brand_idx on public.products (brand);
create index if not exists products_style_idx on public.products (style);
create index if not exists products_kit_type_idx on public.products (kit_type);

alter table public.products enable row level security;
drop policy if exists "Public read products" on public.products;
create policy "Public read products" on public.products
  for select using (true);
-- No public insert/update/delete: only you via the dashboard (service role).

-- ── Inquiries (wholesale / contact forms — Phase 2) ─────────────
create table if not exists public.inquiries (
  id bigint generated always as identity primary key,
  kind text not null default 'wholesale',
  name text,
  email text,
  phone text,
  country text,
  message text not null default '',
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;
drop policy if exists "Anyone can submit inquiry" on public.inquiries;
create policy "Anyone can submit inquiry" on public.inquiries
  for insert with check (true);
-- No public SELECT: submissions are only visible in your dashboard.

-- ── Orders (checkout — Phase 3) ─────────────────────────────────
create table if not exists public.orders (
  id bigint generated always as identity primary key,
  channel text not null default 'whatsapp',
  customer jsonb not null default '{}',
  items jsonb not null default '[]',
  total_usd numeric(10,2),
  currency text not null default 'USD',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;
drop policy if exists "Anyone can create order" on public.orders;
create policy "Anyone can create order" on public.orders
  for insert with check (true);

-- ── FX rates (currency selector) ────────────────────────────────
create table if not exists public.fx_rates (
  currency text primary key,
  rate numeric(14,6) not null,  -- units per 1 USD
  updated_at timestamptz not null default now()
);

alter table public.fx_rates enable row level security;
drop policy if exists "Public read fx" on public.fx_rates;
create policy "Public read fx" on public.fx_rates
  for select using (true);

insert into public.fx_rates (currency, rate) values
  ('USD', 1), ('NGN', 1550), ('GHS', 15.4),
  ('KES', 129), ('EUR', 0.92), ('CNY', 7.25)
on conflict (currency) do nothing;

-- ── Seed: current catalog (12 products) ─────────────────────────
insert into public.products
  (id, slug, name, brand, model, year_from, year_to, style, kit_type, price, original_price, images, materials, install, components, description, stock, rating, reviews, featured, hot_deal)
values
  ('p1', 'jetour-t2-mars-explorer-full-armor-kit', 'Mars Explorer Full Armor Kit', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Full Armor Kit', 2890, 3350,
   array['https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80'],
   array['ABS Plastic','Stainless Steel','Aluminum Alloy'], 'Professional Install',
   array['Front steel bull-bar bumper with winch plate','Rear armored bumper with tow points','Wide fender flare set (6 pcs)','Rock slider side steps (pair)','Roof platform rack with 40" LED light bar','Raised air intake snorkel','All mounting hardware & brackets'],
   'The flagship Mars Explorer conversion turns the Jetour T2 into a true expedition rig. Every panel is CAD-matched to factory mounting points — no cutting or welding required. Powder-coated in matte black with optional color-match service for bulk orders.',
   8, 4.9, 47, true, true),

  ('p2', 'jetour-t2-stargazer-urban-aero-kit', 'Stargazer Urban Aero Body Kit', 'Jetour', 'T2', 2024, 2026, 'Urban Aero', 'Full Body Kit', 1450, null,
   array['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1400&q=80'],
   array['PP Polypropylene','ABS Plastic'], 'Bolt-On',
   array['Front aero bumper lip with DRL housings','Side skirt extensions (pair)','Rear diffuser with exhaust trim','Tailgate spoiler with LED brake light','Installation clips & 3M automotive adhesive kit'],
   'The Stargazer kit sharpens the T2''s street presence without sacrificing daily drivability. Flexible PP construction survives speed bumps and curb taps that crack fiberglass kits. Ships primered, ready for paint.',
   15, 4.8, 89, true, false),

  ('p3', 'jetour-t1-ironclad-mecha-front-bumper', 'Ironclad Mecha Front Bumper', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Mecha', 'Front Bumper', 980, 1150,
   array['https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=80'],
   array['Stainless Steel','ABS Plastic'], 'Bolt-On',
   array['Angular mecha-design front bumper shell','Integrated LED fog light pods (pair)','Skid plate underguard','Factory sensor & camera relocation brackets','Mounting hardware kit'],
   'Aggressive geometric styling inspired by exoskeleton armor. The Ironclad keeps full compatibility with the Traveller''s parking sensors and front camera, and its steel skid plate protects the sump on rough tracks.',
   12, 4.7, 34, true, true),

  ('p4', 'jaecoo-j7-nightblade-mecha-wide-body-kit', 'Nightblade Mecha Wide Body Kit', 'Jaecoo', 'J7', 2024, 2026, 'Mecha', 'Full Body Kit', 3200, null,
   array['https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1535732820275-9ffd998cac22?auto=format&fit=crop&w=1400&q=80'],
   array['Carbon Fiber','FRP Fiberglass','ABS Plastic'], 'Professional Install',
   array['Wide front fenders (+45mm per side)','Wide rear quarter panels (+50mm per side)','Carbon fiber front splitter','Mecha-design front & rear bumper overlays','Side blade extensions with accent trim','Carbon rear roof spoiler','Full fastener & template kit'],
   'Our most extreme conversion. The Nightblade adds genuine width — clearing 20x10 wheels — with dry-carbon accent pieces on a hand-laid FRP structure. Includes paint-ready gel coat finish. Recommended install by a body shop.',
   4, 4.9, 12, true, false),

  ('p5', 'jaecoo-j7-expedition-roof-platform', 'Expedition Roof Platform + LED Bar', 'Jaecoo', 'J7', 2024, 2026, 'Off-Road', 'Roof Rack', 540, null,
   array['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1400&q=80'],
   array['Aluminum Alloy','Stainless Steel'], 'Bolt-On',
   array['Full-length aluminum roof platform (140kg rated)','32" curved LED light bar (180W, combo beam)','Wiring harness with switch & relay','Wind deflector fairing','Gutter-mount feet — no drilling'],
   'Flat-pack expedition platform sized for rooftop tents and jerry can mounts. T-slot channels accept standard accessories. Light bar is IP68 rated with a 2-year warranty.',
   22, 4.8, 61, false, false),

  ('p6', 'tiggo-8-pro-urban-aero-lip-diffuser', 'Urban Aero Front Lip + Rear Diffuser', 'Chery Tiggo', 'Tiggo 8 Pro', 2022, 2026, 'Urban Aero', 'Front Bumper', 720, null,
   array['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1400&q=80'],
   array['PP Polypropylene'], 'Bolt-On',
   array['Front bumper lip splitter','Rear diffuser with quad-exit trim','Side skirt caps (pair)','Automotive adhesive & self-tapper kit'],
   'Subtle OEM+ aero for the Tiggo 8 Pro — lowers the visual stance without touching ride height. Color-match paint service available on 10+ units.',
   18, 4.6, 53, false, false),

  ('p7', 'tiggo-8-pro-trail-fender-flares', 'Trail Series Fender Flares', 'Chery Tiggo', 'Tiggo 8 Pro', 2022, 2026, 'Off-Road', 'Fender Flares', 380, null,
   array['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1400&q=80'],
   array['ABS Plastic'], 'Bolt-On',
   array['Front flare pair (+30mm)','Rear flare pair (+30mm)','Rubber edge trim seal','Stainless fasteners — uses factory holes'],
   'Textured matte-black pocket flares that cover wider all-terrain rubber and protect paint from stone chips. Flexible ABS won''t crack in cold climates.',
   30, 4.7, 78, false, false),

  ('p8', 'omoda-5-vortex-full-aero-kit', 'Vortex Full Aero Kit', 'Omoda', 'Omoda 5', 2023, 2026, 'Urban Aero', 'Full Body Kit', 1650, 1890,
   array['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1400&q=80'],
   array['PP Polypropylene','Carbon Fiber'], 'Professional Install',
   array['Front bumper with enlarged intake styling','Carbon front splitter','Side skirt set','Rear bumper valance with diffuser fins','Ducktail trunk spoiler','Grille surround trim'],
   'Full-face transformation for the Omoda 5 with genuine carbon splitter and ducktail. Designed in CFD — the diffuser fins are functional, not just cosmetic. Ships as a complete crated set.',
   9, 4.9, 27, true, true),

  ('p9', 'omoda-c5-rs-roof-spoiler', 'RS Roof Spoiler Wing', 'Omoda', 'Omoda C5', 2024, 2026, 'Urban Aero', 'Spoiler Wing', 260, null,
   array['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=80'],
   array['ABS Plastic'], 'Plug & Play',
   array['Roof spoiler (gloss black)','Pre-applied 3M VHB tape','Adhesion promoter wipes'],
   'Ten-minute install, instant attitude. The RS spoiler follows the C5''s roofline exactly — no drilling, fully reversible.',
   40, 4.5, 112, false, false),

  ('p10', 'jetour-t2-led-tail-spoiler-wing', 'LED Tail Spoiler Wing', 'Jetour', 'T2', 2024, 2026, 'Mecha', 'Spoiler Wing', 420, null,
   array['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=1400&q=80'],
   array['ABS Plastic'], 'Plug & Play',
   array['Tailgate spoiler with integrated LED strip','Plug-and-play wiring adapter (no splicing)','Mounting hardware & template'],
   'The traveller-style LED tail wing — sequential turn signal and brake light built into an aggressive mecha-profile spoiler. Connects to the factory harness with our adapter: truly plug & play.',
   26, 4.8, 65, false, false),

  ('p11', 'jetour-t2-safari-snorkel-intake', 'Safari Snorkel Raised Intake', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Snorkel', 310, null,
   array['https://images.unsplash.com/photo-1535732820275-9ffd998cac22?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=1400&q=80'],
   array['LLDPE Polyethylene','Stainless Steel'], 'Professional Install',
   array['Snorkel body (UV-stable LLDPE)','Air ram head with water separator','A-pillar mounting bracket set','Fender cutting template','Intake adapter ducting'],
   'Raises the T2''s intake to roofline for water crossings and dusty trails. Ram head rotates 180° for heavy rain. Includes a precision cutting template — one careful cut, everything else bolts on.',
   14, 4.7, 29, false, false),

  ('p12', 'jaecoo-j7-rock-slider-steps', 'Rock Slider Side Steps', 'Jaecoo', 'J7', 2024, 2026, 'Off-Road', 'Side Steps', 460, null,
   array['https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80'],
   array['Stainless Steel','Aluminum Alloy'], 'Bolt-On',
   array['Rock slider pair (3mm wall steel tube)','Chassis-mount brackets — no drilling','Anti-slip step plates','Hardware kit'],
   'Real sliders, not decorative side bars — chassis-mounted to take the J7''s full weight on a jack or a rock. Stepped top surface doubles as a door sill step for roof access.',
   19, 4.8, 41, false, false)

on conflict (id) do nothing;

commit;
