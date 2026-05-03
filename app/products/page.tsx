import { ProductCard } from "@/components/ui/product-card";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <section className="section-padding py-32 md:py-40">
      <div className="container-width">
        <h1 className="mb-12 font-serif text-5xl md:text-7xl">Collection</h1>
        <p className="mb-16 max-w-3xl text-base leading-8 text-black/70 md:text-lg">
          Komposisi parfum premium dengan struktur aroma yang refined, dibuat untuk karakter modern yang
          menghargai detail.
        </p>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={{ ...product, createdAt: product.createdAt.toISOString() }} />
          ))}
        </div>
      </div>
    </section>
  );
}
