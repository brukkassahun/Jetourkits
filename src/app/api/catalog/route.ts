import { NextResponse } from "next/server";
import { listProducts } from "@/lib/products-db";

export const revalidate = 60;

/** Public read-only catalog feed (used by the client-side cart). */
export async function GET() {
  const products = await listProducts();
  return NextResponse.json(products);
}
