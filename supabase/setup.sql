-- ═══════════════════════════════════════════════════════════════════════
-- JetourKits — Final Supabase database structure
-- Run this ONCE in your Supabase project: SQL Editor → New query → paste → Run
-- Safe to re-run: uses IF NOT EXISTS / DROP IF EXISTS / ON CONFLICT throughout.
-- ═══════════════════════════════════════════════════════════════════════

begin;

-- ── Products (live catalog) ────────────────────────────────────────────
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
  featured boolean not null default false,
  hot_deal boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_slug_idx on public.products (slug);
create index if not exists products_brand_idx on public.products (brand);
create index if not exists products_model_idx on public.products (model);
create index if not exists products_style_idx on public.products (style);
create index if not exists products_kit_type_idx on public.products (kit_type);
create index if not exists products_featured_idx on public.products (featured) where featured = true;
create index if not exists products_hot_deal_idx on public.products (hot_deal) where hot_deal = true;

alter table public.products enable row level security;
drop policy if exists "Public read products" on public.products;
create policy "Public read products" on public.products
  for select using (true);
-- No public insert/update/delete: only manage via dashboard or service role.

-- ── Inquiries (wholesale / contact / quote forms) ──────────────────────
create table if not exists public.inquiries (
  id bigint generated always as identity primary key,
  kind text not null default 'wholesale',
  name text,
  email text,
  phone text,
  country text,
  company text,
  message text not null default '',
  metadata jsonb not null default '{}',
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists inquiries_status_idx on public.inquiries (status);
create index if not exists inquiries_kind_idx on public.inquiries (kind);

alter table public.inquiries enable row level security;
drop policy if exists "Anyone can submit inquiry" on public.inquiries;
create policy "Anyone can submit inquiry" on public.inquiries
  for insert with check (true);
-- No public SELECT: submissions are only visible in your dashboard.

-- ── Orders (checkout cart → quote/invoice pipeline) ────────────────────
create table if not exists public.orders (
  id bigint generated always as identity primary key,
  channel text not null default 'whatsapp',
  customer jsonb not null default '{}',
  items jsonb not null default '[]',
  total_usd numeric(10,2),
  currency text not null default 'USD',
  status text not null default 'new',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

alter table public.orders enable row level security;
drop policy if exists "Anyone can create order" on public.orders;
create policy "Anyone can create order" on public.orders
  for insert with check (true);

-- ── FX rates (currency selector) ───────────────────────────────────────
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

-- ── Auto-update updated_at timestamps ──────────────────────────────────
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists inquiries_updated_at on public.inquiries;
create trigger inquiries_updated_at
  before update on public.inquiries
  for each row execute function public.set_updated_at();

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- ── Seed: Jetour T1 catalog from Excel (50 products) ─────────────────────
insert into public.products
  (id, slug, name, brand, model, year_from, year_to, style, kit_type, price, original_price, images, materials, install, components, description, stock, featured, hot_deal)
values
  ('t1-001', 'jetour-t1-fixed-ladder-type-a', 'Jetour T1 Fixed Ladder — Type A', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Side Steps', 715.0, NULL, ARRAY[]::text[], ARRAY['Aluminum alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Fixed Ladder — Type A for Jetour T1 / Traveller. Material: Aluminum alloy.', 10, false, false),
  ('t1-002', 'jetour-t1-fixed-ladder-type-b', 'Jetour T1 Fixed Ladder — Type B', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Side Steps', 650.0, NULL, ARRAY[]::text[], ARRAY['Aluminum alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Fixed Ladder — Type B for Jetour T1 / Traveller. Material: Aluminum alloy.', 10, false, false),
  ('t1-003', 'jetour-t1-roof-rack-platform-panoramic-roof', 'Jetour T1 Roof Rack Platform (Panoramic Roof)', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Roof Rack', 715.0, NULL, ARRAY[]::text[], ARRAY['Aluminum alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Roof Rack Platform (Panoramic Roof) for Jetour T1 / Traveller. Material: Aluminum alloy.', 10, false, false),
  ('t1-004', 'jetour-t1-defender-style-roof-cargo-basket', 'Jetour T1 Defender-Style Roof Cargo Basket', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Mecha', 'Roof Rack', 1430.0, NULL, ARRAY[]::text[], ARRAY['Aluminum alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Defender-Style Roof Cargo Basket for Jetour T1 / Traveller. Material: Aluminum alloy.', 10, false, false),
  ('t1-005', 'jetour-t1-freedom-black-panther-platform-type-a', 'Jetour T1 / Freedom Black Panther Platform — Type A', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Roof Rack', 1170.0, NULL, ARRAY[]::text[], ARRAY['Manganese steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 / Freedom Black Panther Platform — Type A for Jetour T1 / Traveller. Material: Manganese steel.', 10, false, false),
  ('t1-006', 'jetour-t1-freedom-black-panther-ladder-type-a', 'Jetour T1 / Freedom Black Panther Ladder — Type A', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Side Steps', 650.0, NULL, ARRAY[]::text[], ARRAY['Manganese steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 / Freedom Black Panther Ladder — Type A for Jetour T1 / Traveller. Material: Manganese steel.', 10, false, false),
  ('t1-007', 'jetour-t1-freedom-black-panther-mecha-panel-type-a', 'Jetour T1 / Freedom Black Panther Mecha Panel — Type A', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Mecha', 'Full Body Kit', 455.0, NULL, ARRAY[]::text[], ARRAY['Manganese steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 / Freedom Black Panther Mecha Panel — Type A for Jetour T1 / Traveller. Material: Manganese steel.', 10, false, false),
  ('t1-008', 'jetour-t1-roof-tool-box', 'Jetour T1 Roof Tool Box', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Cargo Box', 650.0, NULL, ARRAY[]::text[], ARRAY['PP (injection-molded)']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Roof Tool Box for Jetour T1 / Traveller. Material: PP (injection-molded).', 10, false, false),
  ('t1-009', 'jetour-t1-cargo-box-95l', 'Jetour T1 Cargo Box — 95L', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Cargo Box', 910.0, NULL, ARRAY[]::text[], ARRAY['PP (injection-molded)']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Cargo Box — 95L for Jetour T1 / Traveller. Material: PP (injection-molded).', 10, false, false),
  ('t1-010', 'jetour-t1-cargo-box-115l', 'Jetour T1 Cargo Box — 115L', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Cargo Box', 1040.0, NULL, ARRAY[]::text[], ARRAY['PP (injection-molded)']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Cargo Box — 115L for Jetour T1 / Traveller. Material: PP (injection-molded).', 10, false, false),
  ('t1-011', 'jetour-t1-hard-shell-side-awning', 'Jetour T1 Hard-Shell Side Awning', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 780.0, NULL, ARRAY[]::text[], ARRAY['Aluminum alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Hard-Shell Side Awning for Jetour T1 / Traveller. Material: Aluminum alloy.', 10, false, false),
  ('t1-012', 'jetour-t1-side-step-panels', 'Jetour T1 Side Step Panels', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Full Body Kit', 169.0, NULL, ARRAY[]::text[], ARRAY['Stainless steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Side Step Panels for Jetour T1 / Traveller. Material: Stainless steel.', 10, false, false),
  ('t1-013', 'jetour-t1-roof-spoiler', 'Jetour T1 Roof Spoiler', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Spoiler Wing', 130.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Roof Spoiler for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-014', 'jetour-t1-rear-door-trim-panel', 'Jetour T1 Rear Door Trim Panel', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Full Body Kit', 195.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Rear Door Trim Panel for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-015', 'jetour-t1-trunk-storage-basket', 'Jetour T1 Trunk Storage Basket', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Roof Rack', 195.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Trunk Storage Basket for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-016', 'jetour-t1-nudge-bar-small-bull-bar', 'Jetour T1 Nudge Bar (Small Bull Bar)', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 156.0, NULL, ARRAY[]::text[], ARRAY['Manganese steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Nudge Bar (Small Bull Bar) for Jetour T1 / Traveller. Material: Manganese steel.', 10, false, false),
  ('t1-017', 'jetour-t1-key-case', 'Jetour T1 Key Case', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 58.5, NULL, ARRAY[]::text[], ARRAY['Aluminum alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Key Case for Jetour T1 / Traveller. Material: OEM-grade.', 10, false, false),
  ('t1-018', 'jetour-t1-rear-spoiler', 'Jetour T1 Rear Spoiler', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Spoiler Wing', 286.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Rear Spoiler for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-019', 'jetour-t1-mid-spoiler', 'Jetour T1 Mid Spoiler', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Spoiler Wing', 156.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Mid Spoiler for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-020', 'jetour-t1-bull-bar-type-a', 'Jetour T1 Bull Bar — Type A', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 416.0, NULL, ARRAY[]::text[], ARRAY['Manganese steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Bull Bar — Type A for Jetour T1 / Traveller. Material: Manganese steel.', 10, false, false),
  ('t1-021', 'jetour-t1-bull-bar-type-b', 'Jetour T1 Bull Bar — Type B', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 390.0, NULL, ARRAY[]::text[], ARRAY['Manganese steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Bull Bar — Type B for Jetour T1 / Traveller. Material: Manganese steel.', 10, false, false),
  ('t1-022', 'jetour-t1-side-window-armor-mesh', 'Jetour T1 Side Window Armor Mesh', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Grille', 312.0, NULL, ARRAY[]::text[], ARRAY['Manganese steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Side Window Armor Mesh for Jetour T1 / Traveller. Material: Manganese steel.', 10, false, false),
  ('t1-023', 'jetour-t1-side-storage-bag', 'Jetour T1 Side Storage Bag', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 455.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Side Storage Bag for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-024', 'jetour-t1-4-lens-roof-light-type-b', 'Jetour T1 4-Lens Roof Light — Type B', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 650.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 4-Lens Roof Light — Type B for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-025', 'jetour-t1-4-lens-roof-light-type-a', 'Jetour T1 4-Lens Roof Light — Type A', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 780.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 4-Lens Roof Light — Type A for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-026', 'jetour-t1-fender-arch-lights', 'Jetour T1 Fender Arch Lights', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Fender Flares', 234.0, NULL, ARRAY[]::text[], ARRAY['Aluminum alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Fender Arch Lights for Jetour T1 / Traveller. Material: OEM-grade.', 10, false, false),
  ('t1-027', 'jetour-t1-front-rear-bumper-lights', 'Jetour T1 Front & Rear Bumper Lights', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Front Bumper', 585.0, NULL, ARRAY[]::text[], ARRAY['Aluminum alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Front & Rear Bumper Lights for Jetour T1 / Traveller. Material: OEM-grade.', 10, false, false),
  ('t1-028', 'jetour-t1-storage-box', 'Jetour T1 Storage Box', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 39.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Storage Box for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-029', 'jetour-t1-front-rear-bumper-trim-frames', 'Jetour T1 Front & Rear Bumper Trim Frames', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Front Bumper', 156.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Front & Rear Bumper Trim Frames for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-030', 'jetour-t1-fender-flares', 'Jetour T1 Fender Flares', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Fender Flares', 65.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Fender Flares for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-031', 'jetour-t1-4-door-storage-boxes', 'Jetour T1 4-Door Storage Boxes', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 130.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 4-Door Storage Boxes for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-032', 'jetour-t1-engine-hood-cover', 'Jetour T1 Engine Hood Cover', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Hood', 455.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Engine Hood Cover for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-033', 'jetour-t1-floor-mats', 'Jetour T1 Floor Mats', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 208.0, NULL, ARRAY[]::text[], ARRAY['TPE']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Floor Mats for Jetour T1 / Traveller. Material: TPE.', 10, false, false),
  ('t1-034', 'jetour-t1-trunk-mat', 'Jetour T1 Trunk Mat', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 234.0, NULL, ARRAY[]::text[], ARRAY['TPE']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Trunk Mat for Jetour T1 / Traveller. Material: TPE.', 10, false, false),
  ('t1-035', 'jetour-t1-seat-storage-box-driver-passenger-specific', 'Jetour T1 Seat Storage Box (Driver / Passenger specific)', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 195.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Seat Storage Box (Driver / Passenger specific) for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-036', 'jetour-t1-anti-insect-grille-mesh', 'Jetour T1 Anti-Insect Grille Mesh', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Grille', 195.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Anti-Insect Grille Mesh for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-037', 'jetour-t1-tow-bar', 'Jetour T1 Tow Bar', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 585.0, NULL, ARRAY[]::text[], ARRAY['Manganese steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Tow Bar for Jetour T1 / Traveller. Material: Manganese steel.', 10, false, false),
  ('t1-038', 'jetour-t1-anti-kick-plates-driver-passenger', 'Jetour T1 Anti-Kick Plates (Driver & Passenger)', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 117.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Anti-Kick Plates (Driver & Passenger) for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-039', 'jetour-t1-fender-decorative-covers-with-logo', 'Jetour T1 Fender Decorative Covers (with Logo)', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Fender Flares', 78.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Fender Decorative Covers (with Logo) for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-040', 'jetour-t1-phone-holder', 'Jetour T1 Phone Holder', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 58.5, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Phone Holder for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-041', 'jetour-t1-side-steps', 'Jetour T1 Side Steps', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 559.0, NULL, ARRAY[]::text[], ARRAY['PP (injection-molded)']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Side Steps for Jetour T1 / Traveller. Material: PP (injection-molded).', 10, false, false),
  ('t1-042', 'jetour-t1-jetour-freedom-front-grille', 'Jetour Freedom Front Grille', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Grille', 910.0, NULL, ARRAY[]::text[], ARRAY['PP (injection-molded)']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour Freedom Front Grille for Jetour T1 / Traveller. Material: PP (injection-molded).', 10, false, false),
  ('t1-043', 'jetour-t1-front-grille', 'Jetour T1 Front Grille', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Grille', 910.0, NULL, ARRAY[]::text[], ARRAY['PP (injection-molded)']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Front Grille for Jetour T1 / Traveller. Material: PP (injection-molded).', 10, false, false),
  ('t1-044', 'jetour-t1-rear-taillight-covers', 'Jetour T1 Rear Taillight Covers', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 104.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Rear Taillight Covers for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-045', 'jetour-t1-headlight-covers', 'Jetour T1 Headlight Covers', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 104.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Headlight Covers for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-046', 'jetour-t1-front-rear-fog-light-covers', 'Jetour T1 Front & Rear Fog Light Covers', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 104.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Front & Rear Fog Light Covers for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-047', 'jetour-t1-fuel-cap-cover', 'Jetour T1 Fuel Cap Cover', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 39.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Fuel Cap Cover for Jetour T1 / Traveller. Material: ABS.', 10, false, false),
  ('t1-048', 'jetour-t1-mud-flaps-set-of-4', 'Jetour T1 Mud Flaps (Set of 4)', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 32.5, NULL, ARRAY[]::text[], ARRAY['PP (injection-molded)']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Mud Flaps (Set of 4) for Jetour T1 / Traveller. Material: PP (injection-molded).', 10, false, false),
  ('t1-049', 'jetour-t1-side-storage-bag-2', 'Jetour T1 Side Storage Bag', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 910.0, NULL, ARRAY[]::text[], ARRAY['Aluminum alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Side Storage Bag for Jetour T1 / Traveller. Material: Aluminum alloy.', 10, false, false),
  ('t1-050', 'jetour-t1-tailgate-storage-box', 'Jetour T1 Tailgate Storage Box', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Accessory', 624.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T1 Tailgate Storage Box for Jetour T1 / Traveller. Material: ABS.', 10, false, false)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  brand = excluded.brand,
  model = excluded.model,
  year_from = excluded.year_from,
  year_to = excluded.year_to,
  style = excluded.style,
  kit_type = excluded.kit_type,
  price = excluded.price,
  original_price = excluded.original_price,
  images = excluded.images,
  materials = excluded.materials,
  install = excluded.install,
  components = excluded.components,
  description = excluded.description,
  stock = excluded.stock,
  featured = excluded.featured,
  hot_deal = excluded.hot_deal,
  updated_at = now();

commit;

-- ── Seed: Jetour T2 catalog from Excel (158 products) ──────────────────────────────────────
insert into public.products
  (id, slug, name, brand, model, year_from, year_to, style, kit_type, price, original_price, images, materials, install, components, description, stock, featured, hot_deal)
values
  ('t2-new-001', 'jetour-t2-side-tool-box', 'Jetour T2 Side Tool Box', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Cargo Box', 455.0, NULL, ARRAY[]::text[], ARRAY['ABS + Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Side Tool Box for Jetour T2. Material: ABS + Steel.', 10, false, false),
  ('t2-new-002', 'jetour-t2-side-tool-box-b', 'Jetour T2 Side Tool Box B', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Cargo Box', 455.0, NULL, ARRAY[]::text[], ARRAY['ABS + Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Side Tool Box B for Jetour T2. Material: ABS + Steel.', 10, false, false),
  ('t2-new-003', 'jetour-t2-side-tool-box-right-side', 'Jetour T2 Side Tool Box (Right side)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Cargo Box', 546.0, NULL, ARRAY[]::text[], ARRAY['ABS + Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Side Tool Box (Right side) for Jetour T2. Material: ABS + Steel.', 10, false, false),
  ('t2-new-004', 'jetour-t2-foldable-ladder-a', 'Jetour T2 Foldable Ladder A', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Side Steps', 624.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Foldable Ladder A for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-005', 'jetour-t2-foldable-ladder-b', 'Jetour T2 Foldable Ladder B', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Side Steps', 455.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Foldable Ladder B for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-006', 'jetour-t2-foldable-ladderb', 'Jetour T2 Foldable LadderB', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Side Steps', 520.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Foldable LadderB for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-007', 'jetour-t2-jetour-traveler-color-changing-ladder-better-fitment-or-jetour-t2-chameleon-ladder-improved-fit', 'Jetour Traveler Color-Changing Ladder / Better Fitment (or Jetour T2 Chameleon Ladder / Improved Fit)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Side Steps', 650.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour Traveler Color-Changing Ladder / Better Fitment (or Jetour T2 Chameleon Ladder / Improved Fit) for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-008', 'jetour-t2-fixed-ladder', 'Jetour T2 Fixed Ladder', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Side Steps', 455.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Fixed Ladder for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-009', 'jetour-t2-fixed-roof-rack-platform', 'Jetour T2 Fixed Roof Rack Platform', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Roof Rack', 1300.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Fixed Roof Rack Platform for Jetour T2. Material: Manganese Steel.', 10, false, false),
  ('t2-new-010', 'jetour-t2-traveler-black-panther-edition-platform-or-jetour-t2-black-panther-roof-platform', 'Traveler Black Panther Edition Platform (or Jetour T2 Black Panther Roof Platform)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Roof Rack', 1300.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Black Panther Edition Platform (or Jetour T2 Black Panther Roof Platform) for Jetour T2. Material: Manganese Steel.', 10, false, false),
  ('t2-new-011', 'jetour-t2-traveler-black-panther-edition-ladder-or-jetour-t2-black-panther-ladder', 'Traveler Black Panther Edition Ladder (or Jetour T2 Black Panther Ladder)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Side Steps', 780.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Black Panther Edition Ladder (or Jetour T2 Black Panther Ladder) for Jetour T2. Material: Manganese Steel.', 10, false, false),
  ('t2-new-012', 'jetour-t2-traveler-black-panther-edition-mecha-grid-or-jetour-t2-black-panther-mecha-mesh', 'Traveler Black Panther Edition Mecha Grid (or Jetour T2 Black Panther Mecha Mesh)', 'Jetour', 'T2', 2024, 2026, 'Mecha', 'Grille', 650.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Black Panther Edition Mecha Grid (or Jetour T2 Black Panther Mecha Mesh) for Jetour T2. Material: Manganese Steel.', 10, false, false),
  ('t2-new-013', 'jetour-t2-defender-roof-rack-platform', 'Jetour T2 Defender Roof Rack Platform', 'Jetour', 'T2', 2024, 2026, 'Mecha', 'Roof Rack', 689.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Defender Roof Rack Platform for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-014', 'jetour-t2-aw-roof-rack-platform', 'Jetour T2 AW Roof Rack Platform', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Roof Rack', 1430.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 AW Roof Rack Platform for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-015', 'jetour-t2-bull-bar-au-ver', 'Jetour T2 Bull BAR AU VER.', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 455.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Bull BAR AU VER. for Jetour T2. Material: Manganese Steel.', 10, false, false),
  ('t2-new-016', 'jetour-t2-bull-bar-s', 'Jetour T2 Bull Bar S', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 234.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Bull Bar S for Jetour T2. Material: Manganese Steel.', 10, false, false),
  ('t2-new-017', 'jetour-t2-bull-bar-mech-design', 'Jetour T2 Bull bar mech design', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 234.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Bull bar mech design for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-018', 'jetour-t2-traveler-off-road-side-steps-or-jetour-t2-competitive-running-boards', 'Traveler Off-Road Side Steps (or Jetour T2 Competitive Running Boards)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 494.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Off-Road Side Steps (or Jetour T2 Competitive Running Boards) for Jetour T2. Material: Manganese Steel.', 10, false, false),
  ('t2-new-019', 'jetour-t2-mud-flap', 'Jetour T2 Mud Flap', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 32.5, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Mud Flap for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-020', 'jetour-t2-mud-guard-inner-lining', 'Jetour T2 Mud Guard inner lining', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Full Armor Kit', 45.5, NULL, ARRAY[]::text[], ARRAY['PP']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Mud Guard inner lining for Jetour T2. Material: PP.', 10, false, false),
  ('t2-new-021', 'jetour-t2-mud-flap-with-logo', 'Jetour T2 Mud Flap with Logo', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 45.5, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Mud Flap with Logo for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-022', 'jetour-t2-roof-light', 'Jetour T2 Roof Light', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 520.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Roof Light for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-023', 'jetour-t2-defender-roof-light', 'Jetour T2 Defender Roof Light', 'Jetour', 'T2', 2024, 2026, 'Mecha', 'Fender Flares', 754.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Defender Roof Light for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-024', 'jetour-t2-roof-light-two-lens', 'Jetour T2 Roof light two lens', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 1235.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Roof light two lens for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-025', 'jetour-t2-roof-light-2', 'Jetour T2 Roof Light', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 624.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Roof Light for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-026', 'jetour-t2-defender-grille', 'Jetour T2 Defender Grille', 'Jetour', 'T2', 2024, 2026, 'Mecha', 'Fender Flares', 780.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Defender Grille for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-027', 'jetour-t2-defender-grille-2', 'Jetour T2 Defender Grille', 'Jetour', 'T2', 2024, 2026, 'Mecha', 'Fender Flares', 845.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Defender Grille for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-028', 'jetour-t2-black-warrior-grille', 'Jetour T2 Black Warrior Grille', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Grille', 520.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Black Warrior Grille for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-029', 'jetour-t2-mountain-grille', 'JETOUR T2 MOUNTAIN GRILLE', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Grille', 1950.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'JETOUR T2 MOUNTAIN GRILLE for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-030', 'jetour-t2-jmk-grille-with-led', 'JETOUR T2 JMK GRILLE WITH LED', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Grille', 845.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'JETOUR T2 JMK GRILLE WITH LED for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-031', 'jetour-t2-grille-cover', 'Jetour T2 Grille cover', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Grille', 715.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Grille cover for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-032', 'jetour-t2-side-window', 'Jetour T2 Side Window', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 338.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Side Window for Jetour T2. Material: Manganese Steel.', 10, false, false),
  ('t2-new-033', 'jetour-t2-traveler-mini-surfboard-or-jetour-t2-compact-surfboard', 'Traveler Mini Surfboard (or Jetour T2 Compact Surfboard)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 312.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Mini Surfboard (or Jetour T2 Compact Surfboard) for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-034', 'jetour-t2-mech-mask', 'Jetour T2 Mech mask', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 58.5, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Mech mask for Jetour T2. Material: Manganese Steel.', 10, false, false),
  ('t2-new-035', 'jetour-t2-shovel', 'Jetour T2 Shovel', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 58.5, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Shovel for Jetour T2. Material: Manganese Steel.', 10, false, false),
  ('t2-new-036', 'jetour-t2-rear-door-tool-kit', 'Jetour T2 Rear Door Tool kit', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 1105.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Rear Door Tool kit for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-037', 'jetour-t2-rear-door-shelf', 'Jetour T2 Rear Door Shelf', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 364.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Rear Door Shelf for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-038', 'jetour-t2-trunk-storage', 'Jetour T2 Trunk Storage', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 1170.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Trunk Storage for Jetour T2. Material: Manganese Steel.', 10, false, false),
  ('t2-new-039', 'jetour-t2-bonnet-hood-cover-c', 'Jetour T2 Bonnet Hood Cover c', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Hood', 286.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Bonnet Hood Cover c for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-040', 'jetour-t2-bonnet-hood-cover-b', 'Jetour T2 Bonnet Hood Cover B', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Hood', 286.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Bonnet Hood Cover B for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-041', 'jetour-t2-traveler-mecha-edition-engine-hood-cover-or-jetour-t2-mecha-style-bonnet-cover', 'Traveler Mecha Edition Engine Hood Cover (or Jetour T2 Mecha Style Bonnet Cover)', 'Jetour', 'T2', 2024, 2026, 'Mecha', 'Hood', 286.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Mecha Edition Engine Hood Cover (or Jetour T2 Mecha Style Bonnet Cover) for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-042', 'jetour-t2-bonnet-hood-cover-d', 'Jetour T2 Bonnet Hood Cover d', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Hood', 390.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Bonnet Hood Cover d for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-043', 'jetour-t2-dark-vender-bonnet-hood-cover', 'JETOUR T2 DARK VENDER BONNET HOOD COVER', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Hood', 455.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'JETOUR T2 DARK VENDER BONNET HOOD COVER for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-044', 'jetour-t2-jetour-traveler-engine-hood-cover-or-jetour-t2-bonnet-cover', 'Jetour Traveler Engine Hood Cover (or Jetour T2 Bonnet Cover)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Hood', 338.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour Traveler Engine Hood Cover (or Jetour T2 Bonnet Cover) for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-045', 'jetour-t2-bonnet-hood', 'Jetour T2 Bonnet Hood', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Hood', 2080.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Bonnet Hood for Jetour T2. Material: Manganese Steel.', 10, false, false),
  ('t2-new-046', 'jetour-t2-bonnet-hood-2', 'Jetour T2 Bonnet Hood', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Hood', 2080.0, NULL, ARRAY[]::text[], ARRAY['FRP']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Bonnet Hood for Jetour T2. Material: FRP.', 10, false, false),
  ('t2-new-047', 'jetour-t2-bonnet-hood-3', 'Jetour T2 bonnet Hood', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Hood', 2080.0, NULL, ARRAY[]::text[], ARRAY['FRP']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 bonnet Hood for Jetour T2. Material: FRP.', 10, false, false),
  ('t2-new-048', 'jetour-t2-spare-tire-cover', 'Jetour T2 Spare Tire Cover', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 364.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Spare Tire Cover for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-049', 'jetour-t2-spare-tire-cover-2', 'Jetour T2 Spare Tire Cover', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 364.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Spare Tire Cover for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-050', 'jetour-t2-jetour-traveler-rear-storage-box-or-jetour-t2-rear-backpack-box-tailgate-box', 'Jetour Traveler Rear Storage Box (or Jetour T2 Rear Backpack Box / Tailgate Box)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 390.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour Traveler Rear Storage Box (or Jetour T2 Rear Backpack Box / Tailgate Box) for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-051', 'jetour-t2-捷途旅行者后书包总成', '捷途旅行者后书包总成', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 546.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], '捷途旅行者后书包总成 for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-052', 'jetour-t2-side-tent', 'Jetour T2 Side Tent', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 715.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Side Tent for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-053', 'jetour-t2-roof-tent', 'Jetour T2 roof tent', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 3250.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 roof tent for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-054', 'jetour-t2-270-side-tent', 'Jetour T2 270 side tent', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 2080.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 270 side tent for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-055', 'jetour-t2-yellow-led', 'Jetour T2 Yellow Led', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 117.0, NULL, ARRAY[]::text[], ARRAY['LED']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Yellow Led for Jetour T2. Material: LED.', 10, false, false),
  ('t2-new-056', 'jetour-t2-d-pillar-lights-a', 'Jetour T2 D-Pillar Lights A', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 455.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 D-Pillar Lights A for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-057', 'jetour-t2-d-pillar-lights-b', 'Jetour T2 D-Pillar Lights B', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 390.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 D-Pillar Lights B for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-058', 'jetour-t2-d-pillar-lights', 'Jetour T2 D-Pillar Lights', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 455.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 D-Pillar Lights for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-059', 'jetour-t2-golden-eye-fog-lights', 'Jetour T2 Golden eye Fog Lights', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 585.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Golden eye Fog Lights for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-060', 'jetour-t2-front-bumper-lights', 'Jetour T2 Front Bumper Lights', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Front Bumper', 650.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Front Bumper Lights for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-061', 'jetour-t2-front-bumper-lights-2', 'Jetour T2 Front Bumper Lights', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Front Bumper', 260.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Front Bumper Lights for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-062', 'jetour-t2-rear-bumper-fog-lights', 'Jetour T2 rear bumper fog lights', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Front Bumper', 260.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 rear bumper fog lights for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-063', 'jetour-t2-traveler-front-bumper-light-or-jetour-t2-front-bumper-lamp', 'Traveler Front Bumper Light (or Jetour T2 Front Bumper Lamp)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Front Bumper', 338.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Front Bumper Light (or Jetour T2 Front Bumper Lamp) for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-064', 'jetour-t2-traveler-rear-bumper-light-or-jetour-t2-rear-bumper-lamp', 'Traveler Rear Bumper Light (or Jetour T2 Rear Bumper Lamp)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Front Bumper', 338.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Rear Bumper Light (or Jetour T2 Rear Bumper Lamp) for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-065', 'jetour-t2-traveler-reverse-light-a-or-jetour-t2-reversing-lamp-type-a', 'Traveler Reverse Light A (or Jetour T2 Reversing Lamp Type A)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 299.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Reverse Light A (or Jetour T2 Reversing Lamp Type A) for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-066', 'jetour-t2-traveler-reverse-light-b-or-jetour-t2-reversing-lamp-type-b', 'Traveler Reverse Light B (or Jetour T2 Reversing Lamp Type B)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 338.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Reverse Light B (or Jetour T2 Reversing Lamp Type B) for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-067', 'jetour-t2-traveler-multifunctional-hood-handle-or-jetour-t2-multi-purpose-bonnet-grab-handle', 'Traveler Multifunctional Hood Handle (or Jetour T2 Multi-Purpose Bonnet Grab Handle)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Hood', 975.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Multifunctional Hood Handle (or Jetour T2 Multi-Purpose Bonnet Grab Handle) for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-068', 'jetour-t2-rear-lights-defender-design', 'Jetour T2 REAR LIGHTS DEFENDER DESIGN', 'Jetour', 'T2', 2024, 2026, 'Mecha', 'Fender Flares', 1105.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 REAR LIGHTS DEFENDER DESIGN for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-069', 'jetour-t2-modification-head-light', 'Jetour T2 modification head light', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 2210.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 modification head light for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-070', 'jetour-t2-spoiler-sg-ver', 'Jetour T2 Spoiler SG ver', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Spoiler Wing', 156.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Spoiler SG ver for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-071', 'jetour-t2-spoiler-it-ver', 'Jetour T2 Spoiler IT ver', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Spoiler Wing', 156.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Spoiler IT ver for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-072', 'jetour-t2-sports-spoiler', 'Jetour T2 Sports Spoiler', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Spoiler Wing', 169.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Sports Spoiler for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-073', 'jetour-t2-traveler-demon-eye-rear-spoiler-or-jetour-t2-devil-eye-tail-spoiler', 'Traveler Demon Eye Rear Spoiler (or Jetour T2 Devil Eye Tail Spoiler)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Spoiler Wing', 195.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Demon Eye Rear Spoiler (or Jetour T2 Devil Eye Tail Spoiler) for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-074', 'jetour-t2-traveler-rear-spoiler-with-light-or-jetour-t2-illuminated-roof-spoiler', 'Traveler Rear Spoiler with Light (or Jetour T2 Illuminated Roof Spoiler)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Spoiler Wing', 585.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Rear Spoiler with Light (or Jetour T2 Illuminated Roof Spoiler) for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-075', 'jetour-t2-sports-spoiler-2', 'Jetour T2 Sports spoiler', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Spoiler Wing', 260.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Sports spoiler for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-076', 'jetour-t2-side-steps-panel', 'Jetour T2 Side Steps Panel', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Full Body Kit', 156.0, NULL, ARRAY[]::text[], ARRAY['Stainless Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Side Steps Panel for Jetour T2. Material: Stainless Steel.', 10, false, false),
  ('t2-new-077', 'jetour-t2-electric-side-step-a', 'Jetour T2 electric side step A', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 1950.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 electric side step A for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-078', 'jetour-t2-electric-side-step-b', 'Jetour T2 electric side step B', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 1950.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 electric side step B for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-079', 'jetour-t2-electric-side-step-c', 'Jetour T2 electric side step C', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 1950.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 electric side step C for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-080', 'jetour-t2-black-warrior-side-skirt', 'Jetour T2 Black warrior side skirt', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 234.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Black warrior side skirt for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-081', 'jetour-t2-babos-door-trim', 'Jetour T2 babos door trim', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 338.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 babos door trim for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-082', 'jetour-t2-318-door-trim', 'Jetour T2 318 door trim', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 338.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 318 door trim for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-083', 'jetour-t2-decoration-trim', 'Jetour T2 Decoration Trim', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 78.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Decoration Trim for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-084', 'jetour-t2-decoration-trim-with-led', 'Jetour T2 decoration trim with led', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 390.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 decoration trim with led for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-085', 'jetour-t2-rear-lights-cover', 'Jetour T2 Rear Lights Cover', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 71.5, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Rear Lights Cover for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-086', 'jetour-t2-headlight-cover', 'Jetour T2 headlight cover', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 65.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 headlight cover for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-087', 'jetour-t2-front-and-rear-bumper-light-cover', 'Jetour T2 front and rear bumper light cover', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Front Bumper', 65.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 front and rear bumper light cover for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-088', 'jetour-t2-front-fender', 'Jetour T2 Front Fender', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Fender Flares', 65.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Front Fender for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-089', 'jetour-t2-jmk-front-fender', 'Jetour T2 JMK Front Fender', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Fender Flares', 65.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 JMK Front Fender for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-090', 'jetour-t2-front-fender-with-led', 'Jetour T2 front fender with led', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Fender Flares', 390.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 front fender with led for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-091', 'jetour-t2-front-fender-with-led-2', 'Jetour T2 front fender with led', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Fender Flares', 650.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 front fender with led for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-092', 'jetour-t2-driver-seat-lower-protect-board', 'Jetour T2 driver seat lower protect board', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 117.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 driver seat lower protect board for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-093', 'jetour-t2-trunk-cover', 'Jetour T2 trunk cover', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 234.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 trunk cover for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-094', 'jetour-t2-rear-door-hinge-cover', 'Jetour T2 Rear Door hinge cover', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 45.5, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Rear Door hinge cover for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-095', 'jetour-t2-avoid-bumping-trim', 'Jetour T2 avoid bumping trim', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 45.5, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 avoid bumping trim for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-096', 'jetour-t2-door-handle-cover', 'Jetour T2 door handle cover', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 71.5, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 door handle cover for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-097', 'jetour-t2-docking-station', 'Jetour T2 Docking station', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 494.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Docking station for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-098', 'jetour-t2-30mm-jetour-t2-flange', '30mm Jetour T2 flange', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 650.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], '30mm Jetour T2 flange for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-099', 'jetour-t2-2inch-jetour-t2-heightening-pads', '2Inch Jetour T2 heightening pads', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 650.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], '2Inch Jetour T2 heightening pads for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-100', 'jetour-t2-front-skid-board', 'Jetour T2 front skid board', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 390.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 front skid board for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-101', 'jetour-t2-screen-protector', 'Jetour T2 screen protector', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 32.5, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 screen protector for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-102', 'jetour-t2-jeoutr-t2-door-handle-and-bowl-full-set', 'Jeoutr T2 Door handle and bowl full set', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 156.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jeoutr T2 Door handle and bowl full set for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-103', 'jetour-t2-fuel-tank-cover', 'Jetour T2 fuel tank cover', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 58.5, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 fuel tank cover for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-104', 'jetour-t2-rear-mirror-with-camera', 'JETOUR T2 REAR MIRROR WITH CAMERA', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 494.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'JETOUR T2 REAR MIRROR WITH CAMERA for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-105', 'jetour-t2-rear-mirror-with-camera-2', 'JETOUR T2 REAR MIRROR WITH CAMERA', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 1950.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'JETOUR T2 REAR MIRROR WITH CAMERA for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-106', 'jetour-t2-ambient-light-panel', 'Jetour T2 ambient light panel', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Full Body Kit', 455.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 ambient light panel for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-107', 'jetour-t2-ambient-light-panel-second-generation', 'Jetour T2 ambient light panel second generation', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Full Body Kit', 520.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 ambient light panel second generation for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-108', 'jetour-t2-crystal-gear-lever', 'Jetour T2 Crystal Gear Lever', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 117.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Crystal Gear Lever for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-109', 'jetour-t2-door-step-trim-black', 'Jetour T2 Door Step Trim Black', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 104.0, NULL, ARRAY[]::text[], ARRAY['Stainless Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Door Step Trim Black for Jetour T2. Material: Stainless Steel.', 10, false, false),
  ('t2-new-110', 'jetour-t2-door-step-trim-silver', 'Jetour T2 Door step Trim Silver', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 91.0, NULL, ARRAY[]::text[], ARRAY['Stainless Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Door step Trim Silver for Jetour T2. Material: Stainless Steel.', 10, false, false),
  ('t2-new-111', 'jetour-t2-rear-door-sill', 'Jetour T2 Rear Door Sill', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 78.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Rear Door Sill for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-112', 'jetour-t2-rear-door-sill-2', 'Jetour T2 Rear Door sill', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 78.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Rear Door sill for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-113', 'jetour-t2-hybrid-skid-board', 'Jetour T2 hybrid Skid Board', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 455.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 hybrid Skid Board for Jetour T2. Material: Manganese Steel.', 10, false, false),
  ('t2-new-114', 'jetour-t2-skid-board', 'Jetour T2 Skid Board', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 585.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Skid Board for Jetour T2. Material: Manganese Steel.', 10, false, false),
  ('t2-new-115', 'jetour-t2-bonnet-logo', 'Jetour T2 BONNET LOGO', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 52.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 BONNET LOGO for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-116', 'jetour-t2-grille-logo-sticker', 'Jetour T2 grille logo sticker', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Grille', 71.5, NULL, ARRAY[]::text[], ARRAY['Stainless Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 grille logo sticker for Jetour T2. Material: Stainless Steel.', 10, false, false),
  ('t2-new-117', 'jetour-t2-75-liter-jetour-t2-roof-tool-box', '75-Liter Jetour T2 Roof Tool Box', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Cargo Box', 624.0, NULL, ARRAY[]::text[], ARRAY['PP']::text[], 'Bolt-On', ARRAY[]::text[], '75-Liter Jetour T2 Roof Tool Box for Jetour T2. Material: PP.', 10, false, false),
  ('t2-new-118', 'jetour-t2-95-liter-jetour-t2-roof-tool-box', '95-Liter Jetour T2 Roof Tool Box', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Cargo Box', 845.0, NULL, ARRAY[]::text[], ARRAY['PP']::text[], 'Bolt-On', ARRAY[]::text[], '95-Liter Jetour T2 Roof Tool Box for Jetour T2. Material: PP.', 10, false, false),
  ('t2-new-119', 'jetour-t2-115-liter-jetour-t2-roof-tool-box', '115 - Liter Jetour T2 Roof Tool Box', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Cargo Box', 975.0, NULL, ARRAY[]::text[], ARRAY['PP']::text[], 'Bolt-On', ARRAY[]::text[], '115 - Liter Jetour T2 Roof Tool Box for Jetour T2. Material: PP.', 10, false, false),
  ('t2-new-120', 'jetour-t2-phone-holder', 'Jetour T2 Phone Holder', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 45.5, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Phone Holder for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-121', 'jetour-t2-phone-holder-2', 'Jetour T2 Phone Holder', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 58.5, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Phone Holder for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-122', 'jetour-t2-brake-caliper-cover', 'Jetour T2 Brake Caliper Cover', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 650.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Brake Caliper Cover for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-123', 'jetour-t2-jetour-t3-brake-caliper-cover', 'Jetour T3 Brake Caliper Cover', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 520.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T3 Brake Caliper Cover for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-124', 'jetour-t2-window-visor-a', 'Jetour T2 Window Visor A', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 182.0, NULL, ARRAY[]::text[], ARRAY['PC3D']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Window Visor A for Jetour T2. Material: PC3D.', 10, false, false),
  ('t2-new-125', 'jetour-t2-window-visor-b', 'Jetour T2 Window VIsor B', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 156.0, NULL, ARRAY[]::text[], ARRAY['PS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Window VIsor B for Jetour T2. Material: PS.', 10, false, false),
  ('t2-new-126', 'jetour-t2-passanger-seat-screen', 'Jetour T2 passanger seat screen', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 1625.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 passanger seat screen for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-127', 'jetour-t2-right-hand-drive-rhd-entertainment-screen', 'Right-Hand Drive (RHD) Entertainment Screen', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 1950.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Right-Hand Drive (RHD) Entertainment Screen for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-128', 'jetour-t2-key-bag', 'Jetour T2 Key Bag', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 45.5, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Key Bag for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-129', 'jetour-t2-a-jetour-t2-bonnet-sticker', 'A Jetour T2 Bonnet sticker', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 65.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'A Jetour T2 Bonnet sticker for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-130', 'jetour-t2-b-jetour-t2-bonnet-sticker', 'B Jetour T2 bonnet sticker', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 65.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'B Jetour T2 bonnet sticker for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-131', 'jetour-t2-rim-cover', 'Jetour T2 rim cover', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 39.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 rim cover for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-132', 'jetour-t2-rim-screw-covers', 'Jetour T2 rim screw covers', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 26.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 rim screw covers for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-133', 'jetour-t2-rim-black-cover', 'Jetour T2 rim black cover', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 52.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 rim black cover for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-134', 'jetour-t2-rim-black-cover-2', 'Jetour T2 rim black cover', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 52.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 rim black cover for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-135', 'jetour-t2-rim-black-cover-pads', 'Jetour T2 rim black cover pads', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 39.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 rim black cover pads for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-136', 'jetour-t2-cross-bar', 'Jetour T2 cross bar', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 312.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 cross bar for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-137', 'jetour-t2-b-jetour-t2-cross-bar-b', 'B Jetour T2 cross bar B', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 390.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'B Jetour T2 cross bar B for Jetour T2. Material: Aluminum Alloy.', 10, false, false),
  ('t2-new-138', 'jetour-t2-armrest-storage-box', 'Jetour T2 Armrest Storage Box', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 26.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Armrest Storage Box for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-139', 'jetour-t2-central-control-storage-box', 'Jetour T2 central Control Storage Box', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 26.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 central Control Storage Box for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-140', 'jetour-t2-door-storage-box', 'Jetour T2 Door Storage Box', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 39.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Door Storage Box for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-141', 'jetour-t2-15t-jetour-t2-trunk-storage-box-15t', '1.5T
Jetour T2 Trunk Storage Box 1.5T', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 234.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], '1.5T
Jetour T2 Trunk Storage Box 1.5T for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-142', 'jetour-t2-20t-jetour-t2-trunk-storage-box-20t', '2.0T
Jetour T2 Trunk Storage Box 2.0T', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 234.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], '2.0T
Jetour T2 Trunk Storage Box 2.0T for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-143', 'jetour-t2-insect-screen', 'Jetour T2 Insect Screen', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 195.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Insect Screen for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-144', 'jetour-t2-insect-screen-small', 'Jetour T2 insect screen small', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 65.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 insect screen small for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-145', 'jetour-t2-tow-bar-and-hook', 'Jetour T2 Tow bar and Hook', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 455.0, NULL, ARRAY[]::text[], ARRAY['Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Tow bar and Hook for Jetour T2. Material: Steel.', 10, false, false),
  ('t2-new-146', 'jetour-t2-tpe-mat', 'Jetour T2 TPE Mat', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 104.0, NULL, ARRAY[]::text[], ARRAY['TPE']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 TPE Mat for Jetour T2. Material: TPE.', 10, false, false),
  ('t2-new-147', 'jetour-t2-tpe-mat-2', 'Jetour T2 TPE Mat', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 286.0, NULL, ARRAY[]::text[], ARRAY['TPE']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 TPE Mat for Jetour T2. Material: TPE.', 10, false, false),
  ('t2-new-148', 'jetour-t2-trunk-tpe-mat', 'Jetour T2 trunk TPE mat', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 195.0, NULL, ARRAY[]::text[], ARRAY['TPE']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 trunk TPE mat for Jetour T2. Material: TPE.', 10, false, false),
  ('t2-new-149', 'jetour-t2-floor-mat', 'Jetour T2 Floor Mat', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Accessory', 104.0, NULL, ARRAY[]::text[], ARRAY['TPE']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Floor Mat for Jetour T2. Material: TPE.', 10, false, false),
  ('t2-new-150', 'jetour-t2-snorkel', 'Jetour T2 Snorkel', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Snorkel', 1105.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 Snorkel for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-151', 'jetour-t2-city-hunter-body-kit', 'Jetour T2 City Hunter Body Kit', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Full Body Kit', 5200.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour T2 City Hunter Body Kit for Jetour T2. Material: ABS.', 10, false, false),
  ('t2-new-152', 'jetour-t2-traveler-interstellar-armor-or-traveller-interstellar-mecha', 'Traveler Interstellar Armor (or Traveller Interstellar Mecha)', 'Jetour', 'T2', 2024, 2026, 'Mecha', 'Full Armor Kit', 7150.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Interstellar Armor (or Traveller Interstellar Mecha) for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-153', 'jetour-t2-jetour-traveler-starry-trail-kit-or-jetour-t2-xingtu-body-kit', 'Jetour Traveler Starry Trail Kit (or Jetour T2 Xingtu Body Kit)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Full Body Kit', 11050.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour Traveler Starry Trail Kit (or Jetour T2 Xingtu Body Kit) for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-154', 'jetour-t2-jetour-traveler-007-kit-or-jetour-t2-007-body-kit', 'Jetour Traveler 007 Kit (or Jetour T2 007 Body Kit)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Full Body Kit', 4550.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour Traveler 007 Kit (or Jetour T2 007 Body Kit) for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-155', 'jetour-t2-jetour-traveler-desert-eagle-kit-or-jetour-t2-desert-eagle-body-kit', 'Jetour Traveler Desert Eagle Kit (or Jetour T2 Desert Eagle Body Kit)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Full Body Kit', 7800.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Jetour Traveler Desert Eagle Kit (or Jetour T2 Desert Eagle Body Kit) for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-156', 'jetour-t2-traveler-starry-sky-kit-or-jetour-t2-starry-sky-body-kit', 'Traveler Starry Sky Kit (or Jetour T2 Starry Sky Body Kit)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Full Body Kit', 16250.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Starry Sky Kit (or Jetour T2 Starry Sky Body Kit) for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-157', 'jetour-t2-traveler-mars-explorer-kit-or-jetour-t2-mars-explorer-body-kit', 'Traveler Mars Explorer Kit (or Jetour T2 Mars Explorer Body Kit)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Full Body Kit', 7150.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Mars Explorer Kit (or Jetour T2 Mars Explorer Body Kit) for Jetour T2. Material: OEM-grade.', 10, false, false),
  ('t2-new-158', 'jetour-t2-traveler-dark-knight-kit-or-jetour-t2-black-knight-body-kit', 'Traveler Dark Knight Kit (or Jetour T2 Black Knight Body Kit)', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Full Body Kit', 33020.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'Traveler Dark Knight Kit (or Jetour T2 Black Knight Body Kit) for Jetour T2.

Package breakdown:
Body Kit: 4,810
Rear Spoiler: 1,300
Wheel Rims: 2,080 × 4 (Total: 8,320)
Tires: 2,145
Shock Absorbers / Suspension: 5,980
Roof Light: 2,730
Ladder: 1,950
Roof Cargo Basket / Rack: 4,160
Side Mecha Armor: 1,625

Material: OEM-grade.', 10, false, false)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  brand = excluded.brand,
  model = excluded.model,
  year_from = excluded.year_from,
  year_to = excluded.year_to,
  style = excluded.style,
  kit_type = excluded.kit_type,
  price = excluded.price,
  original_price = excluded.original_price,
  images = excluded.images,
  materials = excluded.materials,
  install = excluded.install,
  components = excluded.components,
  description = excluded.description,
  stock = excluded.stock,
  featured = excluded.featured,
  hot_deal = excluded.hot_deal,
  updated_at = now();

-- ── Seed: Jetour G700 catalog from Excel (78 products) ──────────────────────────────────────
insert into public.products
  (id, slug, name, brand, model, year_from, year_to, style, kit_type, price, original_price, images, materials, install, components, description, stock, featured, hot_deal)
values
  ('g7-new-001', 'jetour-g700-black-panther-platform', 'G700 Black Panther Platform', 'Jetour', 'G700', 2023, 2026, 'Mecha', 'Roof Rack', 1300.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Black Panther Platform for Jetour G700. Material: Manganese Steel.', 10, false, false),
  ('g7-new-002', 'jetour-g700-black-panther-ladder', 'G700 Black Panther Ladder', 'Jetour', 'G700', 2023, 2026, 'Mecha', 'Side Steps', 780.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Black Panther Ladder for Jetour G700. Material: Manganese Steel.', 10, false, false),
  ('g7-new-003', 'jetour-g700-black-panther-side-armor', 'G700 Black Panther Side Armor', 'Jetour', 'G700', 2023, 2026, 'Mecha', 'Full Armor Kit', 650.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Black Panther Side Armor for Jetour G700. Material: Manganese Steel.', 10, false, false),
  ('g7-new-004', 'jetour-g700-platform-sunroof-aluminum-bracket', 'G700 Platform Sunroof (Aluminum Bracket)', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Roof Rack', 780.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Platform Sunroof (Aluminum Bracket) for Jetour G700. Material: Aluminum Alloy.', 10, false, false),
  ('g7-new-005', 'jetour-g700-platform-defender-style', 'G700 Platform Defender Style', 'Jetour', 'G700', 2023, 2026, 'Mecha', 'Roof Rack', 1430.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Platform Defender Style for Jetour G700. Material: Aluminum Alloy.', 10, false, false),
  ('g7-new-006', 'jetour-g700-folding-ladder', 'G700 Folding Ladder', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Side Steps', 650.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Folding Ladder for Jetour G700. Material: Aluminum Alloy.', 10, false, false),
  ('g7-new-007', 'jetour-g700-side-storage-box', 'G700 Side Storage Box', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 455.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Side Storage Box for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-008', 'jetour-g700-roof-light-bar-b', 'G700 Roof Light Bar B', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Light Bar', 975.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Roof Light Bar B for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-009', 'jetour-g700-roof-light-bar-a', 'G700 Roof Light Bar A', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Light Bar', 650.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Roof Light Bar A for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-010', 'jetour-g700-roof-dual-light-bar', 'G700 Roof Dual-Light Bar', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Light Bar', 1105.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Roof Dual-Light Bar for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-011', 'jetour-g700-front-sport-bumper', 'G700 Front Sport Bumper', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Front Bumper', 2340.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Front Sport Bumper for Jetour G700. Material: Manganese Steel.', 10, false, false),
  ('g7-new-012', 'jetour-g700-rear-sport-bumper', 'G700 Rear Sport Bumper', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Front Bumper', 2340.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Rear Sport Bumper for Jetour G700. Material: Manganese Steel.', 10, false, false),
  ('g7-new-013', 'jetour-g700-large-bull-bar', 'G700 Large Bull Bar', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 780.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Large Bull Bar for Jetour G700. Material: Manganese Steel.', 10, false, false),
  ('g7-new-014', 'jetour-g700-small-bull-bar', 'G700 Small Bull Bar', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 455.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Small Bull Bar for Jetour G700. Material: Manganese Steel.', 10, false, false),
  ('g7-new-015', 'jetour-g700-small-bull-bar-2', 'G700 Small Bull Bar', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 455.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Small Bull Bar for Jetour G700. Material: Manganese Steel.', 10, false, false),
  ('g7-new-016', 'jetour-g700-tow-arm-hook', 'G700 Tow Arm + Hook', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 364.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Tow Arm + Hook for Jetour G700. Material: Manganese Steel.', 10, false, false),
  ('g7-new-017', 'jetour-g700-d-pillar-light', 'G700 D-Pillar Light', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 845.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 D-Pillar Light for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-018', 'jetour-g700-lighted-front-grille', 'G700 Lighted Front Grille', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Grille', 1040.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Lighted Front Grille for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-019', 'jetour-g700-bug-screen-domestic', 'G700 Bug Screen (Domestic)', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 338.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Bug Screen (Domestic) for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-020', 'jetour-g700-bug-screen-export', 'G700 Bug Screen (Export)', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 364.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Bug Screen (Export) for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-021', 'jetour-g700-electric-side-step', 'G700 Electric Side Step', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 1885.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Electric Side Step for Jetour G700.', 10, false, false),
  ('g7-new-022', 'jetour-g700-fender-flare-side-skirt', 'G700 Fender Flare + Side Skirt', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Fender Flares', 1144.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Fender Flare + Side Skirt for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-023', 'jetour-g700-fender-flare', 'G700 Fender Flare', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Fender Flares', 1105.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Fender Flare for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-024', 'jetour-g700-skid-plate', 'G700 Skid Plate', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 832.0, NULL, ARRAY[]::text[], ARRAY['铝镁合金']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Skid Plate for Jetour G700. Material: 铝镁合金.', 10, false, false),
  ('g7-new-025', 'jetour-g700-tailgate-small-table', 'G700 Tailgate Small Table', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 585.0, NULL, ARRAY[]::text[], ARRAY['铝镁合金']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Tailgate Small Table for Jetour G700. Material: 铝镁合金.', 10, false, false),
  ('g7-new-026', 'jetour-g700-trunk-storage-rack', 'G700 Trunk Storage Rack', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 1105.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Trunk Storage Rack for Jetour G700.', 10, false, false),
  ('g7-new-027', 'jetour-g700-seat-small-table', 'G700 Seat Small Table', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 715.0, NULL, ARRAY[]::text[], ARRAY['1-piece']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Seat Small Table for Jetour G700. Material: 1-piece.', 10, false, false),
  ('g7-new-028', 'jetour-g700-spoiler-a', 'G700 Spoiler A', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Spoiler Wing', 260.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Spoiler A for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-029', 'jetour-g700-spoiler-b', 'G700 Spoiler B', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Spoiler Wing', 312.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Spoiler B for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-030', 'jetour-g700-spoiler-c', 'G700 Spoiler C', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Spoiler Wing', 312.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Spoiler C for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-031', 'jetour-g700-tomahawk-spoiler', 'G700 Tomahawk Spoiler', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Spoiler Wing', 208.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Tomahawk Spoiler for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-032', 'jetour-g700-hood-cover', 'G700 Hood Cover', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Hood', 364.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Hood Cover for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-033', 'jetour-g700-hood-decal', 'G700 Hood Decal', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Hood', 84.5, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Hood Decal for Jetour G700.', 10, false, false),
  ('g7-new-034', 'jetour-g700-hood-decorative-cover', 'G700 Hood Decorative Cover', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Hood', 195.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Hood Decorative Cover for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-035', 'jetour-g700-spare-tire-cover-20', 'G700 Spare Tire Cover (20")', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 455.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Spare Tire Cover (20") for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-036', 'jetour-g700-taillight-cover', 'G700 Taillight Cover', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 78.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Taillight Cover for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-037', 'jetour-g700-tailgate-storage-box', 'G700 Tailgate Storage Box', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 845.0, NULL, ARRAY[]::text[], ARRAY['ABS']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Tailgate Storage Box for Jetour G700. Material: ABS.', 10, false, false),
  ('g7-new-038', 'jetour-g700-sand-bumper', 'G700 Sand Bumper', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Front Bumper', 1040.0, NULL, ARRAY[]::text[], ARRAY['Manganese Steel']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Sand Bumper for Jetour G700. Material: Manganese Steel.', 10, false, false),
  ('g7-new-039', 'jetour-g700-cross-bar', 'G700 Cross Bar', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 468.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Cross Bar for Jetour G700. Material: Aluminum Alloy.', 10, false, false),
  ('g7-new-040', 'jetour-g700-a-pillar-light-mount-a', 'G700 A-Pillar Light Mount A', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 312.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 A-Pillar Light Mount A for Jetour G700. Material: Aluminum Alloy.', 10, false, false),
  ('g7-new-041', 'jetour-g700-a-pillar-light-mount-b', 'G700 A-Pillar Light Mount B', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 1965.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 A-Pillar Light Mount B for Jetour G700.', 10, false, false),
  ('g7-new-042', 'jetour-g700-magic-box-bed', 'G700 Magic Box Bed', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 1274.0, NULL, ARRAY[]::text[], ARRAY['进口生态板
沙发皮
内置海绵']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Magic Box Bed for Jetour G700. Material: 进口生态板
沙发皮
内置海绵.', 10, false, false),
  ('g7-new-043', 'jetour-g700-frigate-water-tank', 'G700 Frigate Water Tank', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 1820.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Frigate Water Tank for Jetour G700. Material: Aluminum Alloy.', 10, false, false),
  ('g7-new-044', 'jetour-g700-skid-plate-2', 'G700 Skid Plate', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 2730.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Skid Plate for Jetour G700.', 10, false, false),
  ('g7-new-045', 'jetour-g700-winch', 'G700 Winch', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 2470.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Winch for Jetour G700.', 10, false, false),
  ('g7-new-046', 'jetour-g700-inner-liner-mudguard', 'G700 Inner Liner Mudguard', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Full Armor Kit', 45.5, NULL, ARRAY[]::text[], ARRAY['PP']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Inner Liner Mudguard for Jetour G700. Material: PP.', 10, false, false),
  ('g7-new-047', 'jetour-g700-mudguard', 'G700 Mudguard', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Full Armor Kit', 36.4, NULL, ARRAY[]::text[], ARRAY['PP']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Mudguard for Jetour G700. Material: PP.', 10, false, false),
  ('g7-new-048', 'jetour-g700-trunk-mat-25-6-seat-cutout', 'G700 Trunk Mat (25-) 6-Seat Cutout', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 84.5, NULL, ARRAY[]::text[], ARRAY['TPE']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Trunk Mat (25-) 6-Seat Cutout for Jetour G700. Material: TPE.', 10, false, false),
  ('g7-new-049', 'jetour-g700-backrest-2-piece-25-6-seat', 'G700 Backrest 2-Piece (25-) 6-Seat', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 97.5, NULL, ARRAY[]::text[], ARRAY['TPE']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Backrest 2-Piece (25-) 6-Seat for Jetour G700. Material: TPE.', 10, false, false),
  ('g7-new-050', 'jetour-g700-floor-mat-4-piece-25-6-seat', 'G700 Floor Mat 4-Piece (25-) 6-Seat', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 312.0, NULL, ARRAY[]::text[], ARRAY['TPE']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Floor Mat 4-Piece (25-) 6-Seat for Jetour G700. Material: TPE.', 10, false, false),
  ('g7-new-051', 'jetour-g700-floor-mat-3-piece-25-5-seat', 'G700 Floor Mat 3-Piece (25-) 5-Seat', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 234.0, NULL, ARRAY[]::text[], ARRAY['TPE']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Floor Mat 3-Piece (25-) 5-Seat for Jetour G700. Material: TPE.', 10, false, false),
  ('g7-new-052', 'jetour-g700-floor-mat-3-piece-25-carpet-5-seat', 'G700 Floor Mat 3-Piece (25-) + Carpet 5-Seat', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 312.0, NULL, ARRAY[]::text[], ARRAY['TPE']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Floor Mat 3-Piece (25-) + Carpet 5-Seat for Jetour G700. Material: TPE.', 10, false, false),
  ('g7-new-053', 'jetour-g700-trunk-mat-25-5-seat', 'G700 Trunk Mat (25-) 5-Seat', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 104.0, NULL, ARRAY[]::text[], ARRAY['TPE']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Trunk Mat (25-) 5-Seat for Jetour G700. Material: TPE.', 10, false, false),
  ('g7-new-054', 'jetour-g700-backrest-2-piece-25-5-seat', 'G700 Backrest 2-Piece (25-) 5-Seat', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 104.0, NULL, ARRAY[]::text[], ARRAY['TPE']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Backrest 2-Piece (25-) 5-Seat for Jetour G700. Material: TPE.', 10, false, false),
  ('g7-new-055', 'jetour-g700-kick-plate', 'G700 Kick Plate', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 84.5, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Kick Plate for Jetour G700.', 10, false, false),
  ('g7-new-056', 'jetour-g700-innerouter-sill-guard-silver-brushed-8-piece', 'G700 Inner/Outer Sill Guard (Silver Brushed) 8-Piece', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Full Armor Kit', 169.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Inner/Outer Sill Guard (Silver Brushed) 8-Piece for Jetour G700.', 10, false, false),
  ('g7-new-057', 'jetour-g700-innerouter-sill-guard-black-titanium-brushed-8-piece', 'G700 Inner/Outer Sill Guard (Black Titanium Brushed) 8-Piece', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Full Armor Kit', 195.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Inner/Outer Sill Guard (Black Titanium Brushed) 8-Piece for Jetour G700.', 10, false, false),
  ('g7-new-058', 'jetour-g700-innerouter-rear-guard-silver-brushed-2-piece', 'G700 Inner/Outer Rear Guard (Silver Brushed) 2-Piece', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Full Armor Kit', 117.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Inner/Outer Rear Guard (Silver Brushed) 2-Piece for Jetour G700.', 10, false, false),
  ('g7-new-059', 'jetour-g700-innerouter-rear-guard-black-titanium-brushed-2-piece', 'G700 Inner/Outer Rear Guard (Black Titanium Brushed) 2-Piece', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Full Armor Kit', 130.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Inner/Outer Rear Guard (Black Titanium Brushed) 2-Piece for Jetour G700.', 10, false, false),
  ('g7-new-060', 'jetour-g700-fuel-tank-cover', 'G700 Fuel Tank Cover', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 222.0, NULL, ARRAY[]::text[], ARRAY['OEM-grade']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Fuel Tank Cover for Jetour G700.', 10, false, false),
  ('g7-new-061', 'jetour-g700-door-bowl-protector', 'G700 Door Bowl Protector', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 104.0, NULL, ARRAY[]::text[], ARRAY['Matte Black, Gloss Black, Carbon Fiber']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Door Bowl Protector for Jetour G700. Material: Matte Black, Gloss Black, Carbon Fiber.', 10, false, false),
  ('g7-new-062', 'jetour-g700-silicone-gear-shift-cover', 'G700 Silicone Gear Shift Cover', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 117.0, NULL, ARRAY[]::text[], ARRAY['Orange / Black / Grey']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Silicone Gear Shift Cover for Jetour G700. Material: Orange / Black / Grey.', 10, false, false),
  ('g7-new-063', 'jetour-g700-silicone-storage-box', 'G700 Silicone Storage Box', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 91.0, NULL, ARRAY[]::text[], ARRAY['Orange / Black / Grey']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Silicone Storage Box for Jetour G700. Material: Orange / Black / Grey.', 10, false, false),
  ('g7-new-064', 'jetour-g700-passenger-storage-box', 'G700 Passenger Storage Box', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 84.5, NULL, ARRAY[]::text[], ARRAY['Orange / Black / Grey']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Passenger Storage Box for Jetour G700. Material: Orange / Black / Grey.', 10, false, false),
  ('g7-new-065', 'jetour-g700-behind-screen-storage-box', 'G700 Behind-Screen Storage Box', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 71.5, NULL, ARRAY[]::text[], ARRAY['Orange / Black / Grey']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Behind-Screen Storage Box for Jetour G700. Material: Orange / Black / Grey.', 10, false, false),
  ('g7-new-066', 'jetour-g700-behind-screen-pad', 'G700 Behind-Screen Pad', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 28.6, NULL, ARRAY[]::text[], ARRAY['Orange / Black / Grey']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Behind-Screen Pad for Jetour G700. Material: Orange / Black / Grey.', 10, false, false),
  ('g7-new-067', 'jetour-g700-rear-seat-small-storage-box', 'G700 Rear Seat Small Storage Box', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 39.0, NULL, ARRAY[]::text[], ARRAY['Orange / Black / Grey']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Rear Seat Small Storage Box for Jetour G700. Material: Orange / Black / Grey.', 10, false, false),
  ('g7-new-068', 'jetour-g700-cup-holder', 'G700 Cup Holder', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 58.5, NULL, ARRAY[]::text[], ARRAY['2-Piece Set
Orange / Black / Grey']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Cup Holder for Jetour G700. Material: 2-Piece Set
Orange / Black / Grey.', 10, false, false),
  ('g7-new-069', 'jetour-g700-door-storage-box', 'G700 Door Storage Box', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 110.5, NULL, ARRAY[]::text[], ARRAY['4-Piece Set
Orange / Black / Grey']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Door Storage Box for Jetour G700. Material: 4-Piece Set
Orange / Black / Grey.', 10, false, false),
  ('g7-new-070', 'jetour-g700-handle-storage-box', 'G700 Handle Storage Box', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 71.5, NULL, ARRAY[]::text[], ARRAY['4-Piece Set
Orange / Black / Grey']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Handle Storage Box for Jetour G700. Material: 4-Piece Set
Orange / Black / Grey.', 10, false, false),
  ('g7-new-071', 'jetour-g700-leftright-air-vent-cover', 'G700 Left/Right Air Vent Cover', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 26.0, NULL, ARRAY[]::text[], ARRAY['2 pieces 
Black / Silver']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Left/Right Air Vent Cover for Jetour G700. Material: 2 pieces 
Black / Silver.', 10, false, false),
  ('g7-new-072', 'jetour-g700-a-pillar-air-vent-cover', 'G700 A-Pillar Air Vent Cover', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 26.0, NULL, ARRAY[]::text[], ARRAY['2 pieces 
Black / Silver']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 A-Pillar Air Vent Cover for Jetour G700. Material: 2 pieces 
Black / Silver.', 10, false, false),
  ('g7-new-073', 'jetour-g700-front-dashboard-long-cover', 'G700 Front Dashboard Long Cover', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 52.0, NULL, ARRAY[]::text[], ARRAY['1 pieces 
Black / Silver']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Front Dashboard Long Cover for Jetour G700. Material: 1 pieces 
Black / Silver.', 10, false, false),
  ('g7-new-074', 'jetour-g700-tactical-box-75l', 'G700 Tactical Box 75L', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 624.0, NULL, ARRAY[]::text[], ARRAY['PP']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Tactical Box 75L for Jetour G700. Material: PP.', 10, false, false),
  ('g7-new-075', 'jetour-g700-tactical-box-95l', 'G700 Tactical Box 95L', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 845.0, NULL, ARRAY[]::text[], ARRAY['PP']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Tactical Box 95L for Jetour G700. Material: PP.', 10, false, false),
  ('g7-new-076', 'jetour-g700-tactical-box-115l', 'G700 Tactical Box 115L', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 975.0, NULL, ARRAY[]::text[], ARRAY['PP']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Tactical Box 115L for Jetour G700. Material: PP.', 10, false, false),
  ('g7-new-077', 'jetour-g700-side-awning', 'G700 Side Awning', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 715.0, NULL, ARRAY[]::text[], ARRAY['Aluminum Alloy']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Side Awning for Jetour G700. Material: Aluminum Alloy.', 10, false, false),
  ('g7-new-078', 'jetour-g700-recovery-track-board', 'G700 Recovery Track Board', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Accessory', 195.0, NULL, ARRAY[]::text[], ARRAY['1-piece
PA66（尼龙）']::text[], 'Bolt-On', ARRAY[]::text[], 'G700 Recovery Track Board for Jetour G700. Material: 1-piece
PA66（尼龙）.', 10, false, false)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  brand = excluded.brand,
  model = excluded.model,
  year_from = excluded.year_from,
  year_to = excluded.year_to,
  style = excluded.style,
  kit_type = excluded.kit_type,
  price = excluded.price,
  original_price = excluded.original_price,
  images = excluded.images,
  materials = excluded.materials,
  install = excluded.install,
  components = excluded.components,
  description = excluded.description,
  stock = excluded.stock,
  featured = excluded.featured,
  hot_deal = excluded.hot_deal,
  updated_at = now();

-- NOTE: Run this file once in Supabase SQL Editor to create/reset schema + seed all 65 products.
