import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/d1-settings";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  const body = await req.json();
  await updateSiteSettings({
    whatsappNumber: String(body.whatsappNumber || "").trim(),
    defaultShopeeUrl: String(body.defaultShopeeUrl || "").trim(),
    defaultTiktokUrl: String(body.defaultTiktokUrl || "").trim()
  });
  return NextResponse.json({ ok: true });
}
