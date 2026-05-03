import { NextResponse } from "next/server";
import { d1CreateProduct, d1GetProducts } from "@/lib/d1-products";
import { Product } from "@/types";

export async function GET() {
  const products = await d1GetProducts();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const payload: Omit<Product, "createdAt"> = {
    id: crypto.randomUUID(),
    name: body.name,
    price: body.price,
    image: body.image,
    description: body.description,
    story: body.story,
    longevity: body.longevity,
    projection: body.projection,
    occasion: body.occasion,
    topNotes: body.topNotes,
    middleNotes: body.middleNotes,
    baseNotes: body.baseNotes,
    ingredients: body.ingredients,
    character: body.character,
    targetUser: body.targetUser,
    shopeeUrl: body.shopeeUrl || null,
    tiktokUrl: body.tiktokUrl || null,
    isFeatured: Boolean(body.isFeatured),
    isBestSeller: Boolean(body.isBestSeller),
    isLimitedEdition: Boolean(body.isLimitedEdition),
    isSignatureCollection: Boolean(body.isSignatureCollection)
  };
  await d1CreateProduct(payload);
  return NextResponse.json({ ok: true, id: payload.id }, { status: 201 });
}
