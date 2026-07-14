import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET /api/stock            → { [slug]: { [size]: stock } } for all products
// GET /api/stock?slug=<slug> → { [size]: stock } for one product
export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("slug");

    let query = supabase.from("product_stock").select("product_slug, size, stock");
    if (slug) query = query.eq("product_slug", slug);

    const { data, error } = await query;

    if (error) {
      console.error("Failed to read product stock:", error);
      return NextResponse.json({ error: "Failed to read stock" }, { status: 500 });
    }

    if (slug) {
      const sizes: Record<string, number> = {};
      for (const row of data) sizes[row.size] = row.stock;
      return NextResponse.json({ slug, sizes });
    }

    const bySlug: Record<string, Record<string, number>> = {};
    for (const row of data) {
      (bySlug[row.product_slug] ??= {})[row.size] = row.stock;
    }
    return NextResponse.json({ stock: bySlug });
  } catch (error) {
    console.error("Error reading stock:", error);
    return NextResponse.json({ error: "Failed to read stock" }, { status: 500 });
  }
}
