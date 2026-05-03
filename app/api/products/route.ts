import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  const prisma = getPrisma();
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const prisma = getPrisma();
  const body = await req.json();
  const product = await prisma.product.create({
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
  return NextResponse.json(product, { status: 201 });
}
