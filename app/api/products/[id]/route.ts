import { NextResponse } from "next/server";
import { d1DeleteProduct, d1UpdateProduct } from "@/lib/d1-products";
import { Product } from "@/types";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const payload: Omit<Product, "id" | "createdAt"> = {
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
  await d1UpdateProduct(id, payload);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await d1DeleteProduct(id);
  return NextResponse.json({ ok: true });
}
