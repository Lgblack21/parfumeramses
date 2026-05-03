import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const prisma = getPrisma();
  const { id } = await params;
  const body = await req.json();
  const product = await prisma.product.update({
    where: { id },
    data: {
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
      isFeatured: body.isFeatured,
      isBestSeller: body.isBestSeller,
      isLimitedEdition: body.isLimitedEdition,
      isSignatureCollection: body.isSignatureCollection
    }
  });
  return NextResponse.json(product);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const prisma = getPrisma();
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
