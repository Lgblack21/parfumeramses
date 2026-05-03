import crypto from "crypto";
import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const prisma = getPrisma();
  const payload = await req.json();
  const signatureKey = payload.signature_key as string;
  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? "";
  const expected = crypto
    .createHash("sha512")
    .update(`${payload.order_id}${payload.status_code}${payload.gross_amount}${serverKey}`)
    .digest("hex");

  if (signatureKey !== expected) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const transactionStatus = payload.transaction_status as string;
  const status =
    transactionStatus === "settlement" || transactionStatus === "capture"
      ? "PAID"
      : transactionStatus === "pending"
        ? "PENDING"
        : "FAILED";

  await prisma.order.update({
    where: { id: payload.order_id },
    data: { status }
  });

  return NextResponse.json({ ok: true });
}
