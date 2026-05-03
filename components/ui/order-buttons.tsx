"use client";

import Link from "next/link";

const WHATSAPP_NUMBER = "6281200000000";

export function OrderButtons({
  productName,
  shopeeUrl,
  tiktokUrl
}: {
  productName: string;
  shopeeUrl?: string | null;
  tiktokUrl?: string | null;
}) {
  const message = encodeURIComponent(`Halo, saya ingin membeli ${productName}`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <>
      <div className="hidden gap-3 sm:grid sm:grid-cols-3">
        <Link
          href={whatsappUrl}
          target="_blank"
          className="bg-black px-6 py-3 text-center text-xs uppercase tracking-[0.18em] text-luxury-cream transition duration-300 hover:bg-luxury-gold hover:text-black"
        >
          Order via WhatsApp
        </Link>
        <Link
          href={shopeeUrl || "https://shopee.co.id/"}
          target="_blank"
          className="border border-black/20 px-6 py-3 text-center text-xs uppercase tracking-[0.18em] transition duration-300 hover:border-luxury-gold hover:text-black"
        >
          Beli di Shopee
        </Link>
        <Link
          href={tiktokUrl || "https://www.tiktok.com/"}
          target="_blank"
          className="border border-black/20 px-6 py-3 text-center text-xs uppercase tracking-[0.18em] transition duration-300 hover:border-luxury-gold hover:text-black"
        >
          Beli di TikTok Shop
        </Link>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/10 bg-luxury-cream/95 p-4 backdrop-blur-md sm:hidden">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2">
          <Link
            href={whatsappUrl}
            target="_blank"
            className="bg-black px-5 py-3 text-center text-xs uppercase tracking-[0.16em] text-luxury-cream"
          >
            Order via WhatsApp
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={shopeeUrl || "https://shopee.co.id/"}
              target="_blank"
              className="border border-black/20 px-4 py-2.5 text-center text-xs uppercase tracking-[0.14em]"
            >
              Shopee
            </Link>
            <Link
              href={tiktokUrl || "https://www.tiktok.com/"}
              target="_blank"
              className="border border-black/20 px-4 py-2.5 text-center text-xs uppercase tracking-[0.14em]"
            >
              TikTok
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
