import { ProductCard } from "@/components/ui/product-card";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <section className="section-padding py-28">
      <div className="container-width">
        <h1 className="mb-10 font-serif text-5xl">Collection</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={{ ...product, createdAt: product.createdAt.toISOString() }} />
          ))}
        </div>
      </div>
    </section>
  );
}
