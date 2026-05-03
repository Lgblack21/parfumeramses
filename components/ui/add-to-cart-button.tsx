"use client";

import { useCart } from "@/components/providers/cart-provider";
import { Product } from "@/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full bg-black px-6 py-3 text-sm uppercase tracking-widest text-luxury-cream transition hover:bg-luxury-gold hover:text-black"
    >
      Add to Cart
    </button>
  );
}
