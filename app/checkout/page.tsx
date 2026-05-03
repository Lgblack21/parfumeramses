"use client";

import { FormEvent, useEffect, useState } from "react";
import { useCart } from "@/components/providers/cart-provider";
import { formatIDR } from "@/lib/currency";

declare global {
  interface Window {
    snap: {
      pay: (token: string) => void;
    };
  }
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? "");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const onCheckout = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, items })
      });
      const data = await response.json();
      if (data?.token) {
        window.snap.pay(data.token);
        clearCart();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding py-28">
      <div className="container-width grid gap-8 lg:grid-cols-[1fr_320px]">
        <form onSubmit={onCheckout} className="space-y-6">
          <h1 className="font-serif text-5xl">Checkout</h1>
          <div>
            <label className="mb-2 block text-sm uppercase tracking-widest text-black/60">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-black/20 bg-transparent px-4 py-3"
            />
          </div>
          <button
            disabled={loading || items.length === 0}
            className="bg-black px-8 py-3 text-sm uppercase tracking-widest text-luxury-cream disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay with Midtrans"}
          </button>
        </form>
        <aside className="h-fit space-y-3 border border-black/10 p-6">
          <p className="text-sm uppercase tracking-widest text-black/60">Order Total</p>
          <p className="font-serif text-3xl">{formatIDR(total)}</p>
        </aside>
      </div>
    </section>
  );
}
