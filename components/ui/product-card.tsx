"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { formatIDR } from "@/lib/currency";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article whileHover={{ y: -4 }} whileTap={{ scale: 0.99 }} transition={{ duration: 0.4 }} className="group">
      <Link href={`/products/${product.id}`} className="block space-y-4">
        <div className="relative aspect-[4/5] overflow-hidden">
          <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.5 }}>
            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={1000}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
        <div className="space-y-1 pt-2">
          <h3 className="font-serif text-3xl">{product.name}</h3>
          <p className="text-sm uppercase tracking-[0.12em] text-black/70">{formatIDR(product.price)}</p>
        </div>
      </Link>
    </motion.article>
  );
}
