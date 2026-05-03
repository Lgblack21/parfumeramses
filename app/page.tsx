import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { ProductCard } from "@/components/ui/product-card";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products[0];

  return (
    <div>
      <section
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center text-luxury-cream"
        style={{ backgroundImage: `url(${featured?.image ?? ""})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-3xl px-6 text-center">
          <h1 className="font-serif text-5xl md:text-7xl">Essence of Prestige</h1>
          <p className="mt-5 text-base md:text-lg">Crafted for those who lead with quiet confidence.</p>
          <Link
            href="/products"
            className="mt-10 inline-block border border-luxury-gold px-8 py-3 text-sm uppercase tracking-[0.2em] transition hover:bg-luxury-gold hover:text-black"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      <section className="section-padding py-24">
        <div className="container-width grid gap-12 md:grid-cols-2">
          <FadeIn>
            <h2 className="font-serif text-4xl">A Signature Beyond Fragrance</h2>
          </FadeIn>
          <FadeIn>
            <p className="max-w-xl text-black/75">
              RAMSES curates modern parfum with heritage methods, balancing rare materials and refined
              structure. Each bottle is composed to become part of your identity.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding pb-24">
        <div className="container-width">
          <FadeIn className="mb-10">
            <h2 className="font-serif text-4xl">Collection</h2>
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={{ ...product, createdAt: product.createdAt.toISOString() }} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
