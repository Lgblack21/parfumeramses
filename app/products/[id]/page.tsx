import { notFound } from "next/navigation";
import Image from "next/image";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import { formatIDR } from "@/lib/currency";
import { getProductById } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return notFound();

  return (
    <section className="section-padding py-28">
      <div className="container-width grid gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="space-y-6">
          <h1 className="font-serif text-5xl">{product.name}</h1>
          <p className="text-lg">{formatIDR(product.price)}</p>
          <p className="text-black/75">{product.description}</p>
          <div className="max-w-xs">
            <AddToCartButton product={{ ...product, createdAt: product.createdAt.toISOString() }} />
          </div>
        </div>
      </div>
    </section>
  );
}
