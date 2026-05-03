import { ProductCard } from "@/components/ui/product-card";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <section className="section-padding py-16 md:py-40">
      <div className="container-width">
        <h1 className="mb-8 font-serif text-4xl md:mb-12 md:text-7xl">Collection</h1>
        <p className="mb-10 max-w-3xl text-sm leading-7 text-black/70 md:mb-16 md:text-lg md:leading-8">
          Komposisi parfum premium dengan struktur aroma yang refined, dibuat untuk karakter modern yang
          menghargai detail.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
