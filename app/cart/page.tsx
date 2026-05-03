"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/providers/cart-provider";
import { formatIDR } from "@/lib/currency";

export default function CartPage() {
  const { items, updateQty, removeItem, total } = useCart();

  return (
    <section className="section-padding py-28">
      <div className="container-width">
        <h1 className="mb-10 font-serif text-5xl">Cart</h1>
        {items.length === 0 ? (
          <p className="text-black/70">Your cart is empty.</p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.productId} className="grid gap-4 border-b border-black/10 pb-6 md:grid-cols-[120px_1fr_auto]">
                  <Image src={item.image} alt={item.name} width={120} height={150} className="h-[150px] w-[120px] object-cover" />
                  <div>
                    <p className="font-serif text-2xl">{item.name}</p>
                    <p className="text-sm text-black/70">{formatIDR(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQty(item.productId, Number(e.target.value))}
                      className="w-16 border border-black/20 bg-transparent px-2 py-1"
                    />
                    <button onClick={() => removeItem(item.productId)} className="text-xs uppercase tracking-widest text-black/60">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <aside className="h-fit space-y-3 border border-black/10 p-6">
              <p className="text-sm uppercase tracking-widest text-black/60">Total</p>
              <p className="font-serif text-3xl">{formatIDR(total)}</p>
              <Link href="/checkout" className="block bg-black px-5 py-3 text-center text-sm uppercase tracking-widest text-luxury-cream">
                Checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
