import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { ProductCard } from "@/components/ui/product-card";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.find((item) => item.isFeatured) ?? products[0];
  const bestSeller = products.filter((item) => item.isBestSeller);
  const limited = products.filter((item) => item.isLimitedEdition);
  const signature = products.filter((item) => item.isSignatureCollection);

  return (
    <div>
      <section
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center text-luxury-cream"
        style={{ backgroundImage: `url(${featured?.image ?? ""})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl px-4 text-center sm:px-6">
          <p className="mb-6 text-xs uppercase tracking-[0.24em] text-luxury-gold">Maison Ramses</p>
          <h1 className="font-serif text-4xl leading-tight md:text-7xl">{featured?.name ?? "Essence of Prestige"}</h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-luxury-cream/90 md:mt-8 md:max-w-2xl md:text-lg">
            {featured?.story}
          </p>
          <Link
            href="/products"
            className="mt-10 inline-block border border-luxury-gold px-8 py-4 text-xs uppercase tracking-[0.2em] transition duration-300 hover:bg-luxury-gold hover:text-black md:mt-12 md:px-10"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      <section className="section-padding py-16 md:py-40">
        <div className="container-width grid gap-6 md:gap-10 md:grid-cols-2">
          <FadeIn>
            <h2 className="font-serif text-4xl leading-tight md:text-6xl">Crafted to Be Remembered</h2>
          </FadeIn>
          <FadeIn>
            <p className="max-w-xl text-sm leading-7 text-black/70 md:text-lg md:leading-8">
              Setiap parfum RAMSES dibangun dengan struktur aroma berlapis untuk menciptakan identitas yang
              elegan, tenang, dan mahal. Dirancang untuk menghadirkan impresi kuat tanpa terasa berlebihan.
            </p>
          </FadeIn>
        </div>
      </section>

      <CollectionSection title="Best Seller" products={bestSeller} />
      <CollectionSection title="Limited Edition" products={limited} />
      <CollectionSection title="Signature Collection" products={signature} />
    </div>
  );
}

function CollectionSection({ title, products }: { title: string; products: Awaited<ReturnType<typeof getProducts>> }) {
  if (!products.length) return null;
  return (
    <section className="section-padding pb-16 md:pb-36">
      <div className="container-width">
        <FadeIn className="mb-8 md:mb-14">
          <h2 className="font-serif text-3xl md:text-5xl">{title}</h2>
        </FadeIn>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={{ ...product, createdAt: product.createdAt.toISOString() }} />
          ))}
        </div>
      </div>
    </section>
  );
}
