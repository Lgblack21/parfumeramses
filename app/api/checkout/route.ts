import { NextResponse } from "next/server";
import { createSnap } from "@/lib/midtrans";
import { getPrisma } from "@/lib/prisma";

type CheckoutItem = {
  productId: string;
  quantity: number;
};

export async function POST(req: Request) {
  const prisma = getPrisma();
  const body = await req.json();
  const email = body.email as string;
  const items = body.items as CheckoutItem[];

  if (!email || !items?.length) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const productIds = items.map((item) => item.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  const normalizedItems = items.map((item) => {
    const product = products.find((productItem) => productItem.id === item.productId);
    if (!product) throw new Error("Product not found");
    return { product, quantity: item.quantity };
  });

  const total = normalizedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      email,
      total,
      status: "PENDING",
      items: {
        create: normalizedItems.map((item) => ({
          quantity: item.quantity,
          price: item.product.price,
          productId: item.product.id
        }))
      }
    }
  });

  const snap = createSnap();
  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id: order.id,
      gross_amount: total
    },
    customer_details: {
      email
    },
    item_details: normalizedItems.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price
    }))
  });

  return NextResponse.json({ token: transaction.token, redirectUrl: transaction.redirect_url });
}
