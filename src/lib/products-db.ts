import { getSupabase } from "./supabase";
import {
  products as localProducts,
  filterProducts as localFilter,
  getProduct as localGet,
  type Product,
  type ProductFilters,
} from "./products";

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Map a snake_case DB row to our Product shape. */
function rowToProduct(r: any): Product {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    brand: r.brand,
    model: r.model,
    yearFrom: r.year_from,
    yearTo: r.year_to,
    style: r.style,
    kitType: r.kit_type,
    price: Number(r.price),
    originalPrice: r.original_price != null ? Number(r.original_price) : undefined,
    images: r.images ?? [],
    materials: r.materials ?? [],
    install: r.install,
    components: r.components ?? [],
    description: r.description ?? "",
    stock: r.stock ?? 0,
    rating: Number(r.rating ?? 5),
    reviews: r.reviews ?? 0,
    featured: r.featured ?? false,
    hotDeal: r.hot_deal ?? false,
  };
}

/** Fetch all rows from Supabase, or null when unavailable. */
async function fetchRows(): Promise<Product[] | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.from("products").select("*");
    if (error || !data || data.length === 0) return null;
    return data.map(rowToProduct);
  } catch {
    return null;
  }
}

/**
 * Full catalog. Supabase is the source of truth when configured;
 * falls back to the bundled local data on any failure.
 */
export async function listProducts(): Promise<Product[]> {
  return (await fetchRows()) ?? localProducts;
}

/** Single product by slug. */
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const sb = getSupabase();
  if (!sb) return localGet(slug);
  try {
    const { data, error } = await sb
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) return localGet(slug); // DB unreachable → local rescue
    return data ? rowToProduct(data) : undefined; // DB is source of truth
  } catch {
    return localGet(slug);
  }
}

/** Filtered catalog query (same semantics as local filterProducts). */
export async function queryProducts(f: ProductFilters): Promise<Product[]> {
  const all = await listProducts();
  return localFilter(f, all);
}
