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

-- ── Seed: current JetourKits catalog (15 products) ─────────────────────
insert into public.products
  (id, slug, name, brand, model, year_from, year_to, style, kit_type, price, original_price, images, materials, install, components, description, stock, featured, hot_deal)
values
  ('j2-01', 'jetour-t2-mars-explorer-full-armor-kit', 'Mars Explorer Full Armor Kit', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Full Armor Kit', 2890, 3350, ARRAY['https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80']::text[], ARRAY['ABS Plastic', 'Stainless Steel', 'Aluminum Alloy']::text[], 'Professional Install', ARRAY['Front steel bull-bar bumper with winch plate', 'Rear armored bumper with tow points', 'Wide fender flare set (6 pcs)', 'Rock slider side steps (pair)', 'Roof platform rack with 40" LED light bar', 'Raised air intake snorkel', 'All mounting hardware & brackets']::text[], 'The flagship Mars Explorer conversion turns the Jetour T2 into a true expedition rig. Every panel is CAD-matched to factory mounting points — no cutting or welding required. Powder-coated in matte black with optional color-match service for bulk orders.', 8, true, true),
  ('j2-02', 'jetour-t2-stargazer-urban-aero-kit', 'Stargazer Urban Aero Body Kit', 'Jetour', 'T2', 2024, 2026, 'Urban Aero', 'Full Body Kit', 1450, NULL, ARRAY['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1400&q=80']::text[], ARRAY['PP Polypropylene', 'ABS Plastic']::text[], 'Bolt-On', ARRAY['Front aero bumper lip with DRL housings', 'Side skirt extensions (pair)', 'Rear diffuser with exhaust trim', 'Tailgate spoiler with LED brake light', 'Installation clips & 3M automotive adhesive kit']::text[], 'The Stargazer kit sharpens the T2''s street presence without sacrificing daily drivability. Flexible PP construction survives speed bumps and curb taps that crack fiberglass kits. Ships primered, ready for paint.', 15, true, false),
  ('j2-03', 'jetour-t2-led-tail-spoiler-wing', 'LED Tail Spoiler Wing', 'Jetour', 'T2', 2024, 2026, 'Mecha', 'Spoiler Wing', 420, NULL, ARRAY['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=1400&q=80']::text[], ARRAY['ABS Plastic']::text[], 'Plug & Play', ARRAY['Tailgate spoiler with integrated LED strip', 'Plug-and-play wiring adapter (no splicing)', 'Mounting hardware & template']::text[], 'The traveller-style LED tail wing — sequential turn signal and brake light built into an aggressive mecha-profile spoiler. Connects to the factory harness with our adapter: truly plug & play.', 26, true, false),
  ('j2-04', 'jetour-t2-safari-snorkel-intake', 'Safari Snorkel Raised Intake', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Snorkel', 310, NULL, ARRAY['https://images.unsplash.com/photo-1535732820275-9ffd998cac22?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=1400&q=80']::text[], ARRAY['LLDPE Polyethylene', 'Stainless Steel']::text[], 'Professional Install', ARRAY['Snorkel body (UV-stable LLDPE)', 'Air ram head with water separator', 'A-pillar mounting bracket set', 'Fender cutting template', 'Intake adapter ducting']::text[], 'Raises the T2''s intake to roofline for water crossings and dusty trails. Ram head rotates 180° for heavy rain. Includes a precision cutting template — one careful cut, everything else bolts on.', 14, false, false),
  ('j2-05', 'jetour-t2-ironclad-front-bumper', 'Ironclad Mecha Front Bumper', 'Jetour', 'T2', 2024, 2026, 'Mecha', 'Front Bumper', 980, 1150, ARRAY['https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=80']::text[], ARRAY['Stainless Steel', 'ABS Plastic']::text[], 'Bolt-On', ARRAY['Angular mecha-design front bumper shell', 'Integrated LED fog light pods (pair)', 'Skid plate underguard', 'Factory sensor & camera relocation brackets', 'Mounting hardware kit']::text[], 'Aggressive geometric styling inspired by exoskeleton armor. The Ironclad keeps full compatibility with the T2''s parking sensors and front camera, and its steel skid plate protects the sump on rough tracks.', 12, true, true),
  ('j2-06', 'jetour-t2-rock-slider-side-steps', 'Rock Slider Side Steps', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Side Steps', 460, NULL, ARRAY['https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80']::text[], ARRAY['Stainless Steel', 'Aluminum Alloy']::text[], 'Bolt-On', ARRAY['Rock slider pair (3mm wall steel tube)', 'Chassis-mount brackets — no drilling', 'Anti-slip step plates', 'Hardware kit']::text[], 'Real sliders, not decorative side bars — chassis-mounted to take the T2''s full weight on a jack or a rock. Stepped top surface doubles as a door sill step for roof access.', 19, false, false),
  ('j2-07', 'jetour-t2-expedition-roof-rack', 'Expedition Roof Platform + LED Bar', 'Jetour', 'T2', 2024, 2026, 'Off-Road', 'Roof Rack', 540, NULL, ARRAY['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1400&q=80']::text[], ARRAY['Aluminum Alloy', 'Stainless Steel']::text[], 'Bolt-On', ARRAY['Full-length aluminum roof platform (140kg rated)', '32" curved LED light bar (180W, combo beam)', 'Wiring harness with switch & relay', 'Wind deflector fairing', 'Gutter-mount feet — no drilling']::text[], 'Flat-pack expedition platform sized for rooftop tents and jerry can mounts. T-slot channels accept standard accessories. Light bar is IP68 rated with a 2-year warranty.', 22, false, false),
  ('j1-01', 'jetour-t1-ironclad-mecha-front-bumper', 'Ironclad Mecha Front Bumper', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Mecha', 'Front Bumper', 980, 1150, ARRAY['https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=80']::text[], ARRAY['Stainless Steel', 'ABS Plastic']::text[], 'Bolt-On', ARRAY['Angular mecha-design front bumper shell', 'Integrated LED fog light pods (pair)', 'Skid plate underguard', 'Factory sensor & camera relocation brackets', 'Mounting hardware kit']::text[], 'Aggressive geometric styling inspired by exoskeleton armor. The Ironclad keeps full compatibility with the Traveller''s parking sensors and front camera, and its steel skid plate protects the sump on rough tracks.', 12, true, true),
  ('j1-02', 'jetour-t1-trail-fender-flares', 'Trail Series Fender Flares', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Fender Flares', 380, NULL, ARRAY['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1400&q=80']::text[], ARRAY['ABS Plastic']::text[], 'Bolt-On', ARRAY['Front flare pair (+30mm)', 'Rear flare pair (+30mm)', 'Rubber edge trim seal', 'Stainless fasteners — uses factory holes']::text[], 'Textured matte-black pocket flares that cover wider all-terrain rubber and protect paint from stone chips. Flexible ABS won''t crack in cold climates.', 30, false, false),
  ('j1-03', 'jetour-t1-expedition-roof-rack', 'Expedition Roof Platform + LED Bar', 'Jetour', 'T1 / Traveller', 2023, 2026, 'Off-Road', 'Roof Rack', 520, NULL, ARRAY['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1400&q=80']::text[], ARRAY['Aluminum Alloy', 'Stainless Steel']::text[], 'Bolt-On', ARRAY['Full-length aluminum roof platform (120kg rated)', '32" curved LED light bar (180W, combo beam)', 'Wiring harness with switch & relay', 'Wind deflector fairing', 'Gutter-mount feet — no drilling']::text[], 'Flat-pack expedition platform sized for rooftop tents and jerry can mounts. T-slot channels accept standard accessories. Light bar is IP68 rated with a 2-year warranty.', 18, false, false),
  ('g7-01', 'jetour-g700-mars-explorer-full-armor-kit', 'Mars Explorer Full Armor Kit', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Full Armor Kit', 2990, 3450, ARRAY['https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80']::text[], ARRAY['ABS Plastic', 'Stainless Steel', 'Aluminum Alloy']::text[], 'Professional Install', ARRAY['Front steel bull-bar bumper with winch plate', 'Rear armored bumper with tow points', 'Wide fender flare set (6 pcs)', 'Rock slider side steps (pair)', 'Roof platform rack with 40" LED light bar', 'Raised air intake snorkel', 'All mounting hardware & brackets']::text[], 'The flagship Mars Explorer conversion for the G700 — engineered for serious expedition duty. Every panel is CAD-matched to factory mounting points on the G700 chassis. Powder-coated in matte black with optional color-match service.', 6, true, true),
  ('g7-02', 'jetour-g700-ironclad-mecha-front-bumper', 'Ironclad Mecha Front Bumper', 'Jetour', 'G700', 2023, 2026, 'Mecha', 'Front Bumper', 1020, 1190, ARRAY['https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=80']::text[], ARRAY['Stainless Steel', 'ABS Plastic']::text[], 'Bolt-On', ARRAY['Angular mecha-design front bumper shell', 'Integrated LED fog light pods (pair)', 'Skid plate underguard', 'Factory sensor & camera relocation brackets', 'Mounting hardware kit']::text[], 'Aggressive geometric styling for the G700 — exoskeleton-inspired armor. Keeps full compatibility with G700 parking sensors and front camera. Steel skid plate protects the sump on rough terrain.', 10, true, false),
  ('g7-03', 'jetour-g700-rock-slider-side-steps', 'Rock Slider Side Steps', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Side Steps', 480, NULL, ARRAY['https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80']::text[], ARRAY['Stainless Steel', 'Aluminum Alloy']::text[], 'Bolt-On', ARRAY['Rock slider pair (4mm wall steel tube — heavy duty)', 'Chassis-mount brackets — no drilling', 'Anti-slip step plates', 'Hardware kit']::text[], 'Heavy-duty sliders designed for the G700''s higher weight and capability. Chassis-mounted to take full G700 weight on a jack or a rock. Stepped top surface doubles as a door sill step for roof access.', 14, false, false),
  ('g7-04', 'jetour-g700-expedition-roof-rack', 'Expedition Roof Platform + LED Bar', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Roof Rack', 560, NULL, ARRAY['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1400&q=80']::text[], ARRAY['Aluminum Alloy', 'Stainless Steel']::text[], 'Bolt-On', ARRAY['Full-length aluminum roof platform (160kg rated — heavier duty)', '40" curved LED light bar (220W, combo beam)', 'Wiring harness with switch & relay', 'Wind deflector fairing', 'Gutter-mount feet — no drilling']::text[], 'The G700''s larger roof and higher load rating demanded a heavier-duty platform. 160kg rated with T-slot channels for all standard accessories. Light bar is IP68 rated, 2-year warranty.', 12, false, false),
  ('g7-05', 'jetour-g700-safari-snorkel-intake', 'Safari Snorkel Raised Intake', 'Jetour', 'G700', 2023, 2026, 'Off-Road', 'Snorkel', 330, NULL, ARRAY['https://images.unsplash.com/photo-1535732820275-9ffd998cac22?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=1400&q=80']::text[], ARRAY['LLDPE Polyethylene', 'Stainless Steel']::text[], 'Professional Install', ARRAY['Snorkel body (UV-stable LLDPE)', 'Air ram head with water separator', 'A-pillar mounting bracket set', 'Fender cutting template', 'Intake adapter ducting']::text[], 'Raises the G700''s intake to roofline for deep water crossings and dusty trails. Ram head rotates 180° for heavy rain conditions. Precision cutting template included — one careful cut, everything else bolts on.', 8, false, false)
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
