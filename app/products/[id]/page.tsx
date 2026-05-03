import { notFound } from "next/navigation";
import Image from "next/image";
import { formatIDR } from "@/lib/currency";
import { getProductById } from "@/lib/products";
import { OrderButtons } from "@/components/ui/order-buttons";
import { ProductMobileAccordion } from "@/components/ui/product-mobile-accordion";
import { getSiteSettings } from "@/lib/d1-settings";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, siteSettings] = await Promise.all([getProductById(id), getSiteSettings()]);
  if (!product) return notFound();
  const detailSections = [
    {
      title: "Deskripsi",
      items: [product.description, product.story]
    },
    {
      title: "Keunggulan",
      items: [
        `Tahan lama: ${product.longevity}`,
        `Projection: ${product.projection}`,
        `Cocok untuk: ${product.occasion}`
      ]
    },
    {
      title: "Notes",
      items: [`Top: ${product.topNotes}`, `Middle: ${product.middleNotes}`, `Base: ${product.baseNotes}`]
    },
    {
      title: "Bahan",
      items: [product.ingredients]
    },
    {
      title: "Karakter Aroma",
      items: [product.character]
    },
    {
      title: "Target Pengguna",
      items: [product.targetUser]
    }
  ];

  return (
    <section className="section-padding py-16 pb-36 md:py-28 md:pb-28 lg:py-36">
      <div className="container-width space-y-10 md:space-y-16">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>
          <div className="space-y-5 md:space-y-8">
            <h1 className="font-serif text-4xl leading-tight md:text-6xl lg:text-7xl">{product.name}</h1>
            <p className="text-sm uppercase tracking-[0.18em] text-black/70">{formatIDR(product.price)}</p>
            <p className="hidden text-base leading-8 text-black/80 sm:block md:text-lg">{product.description}</p>
            <p className="hidden text-base leading-8 text-black/70 sm:block md:text-lg">{product.story}</p>
            <OrderButtons
              productName={product.name}
              shopeeUrl={product.shopeeUrl}
              tiktokUrl={product.tiktokUrl}
              whatsappNumber={siteSettings.whatsappNumber}
              defaultShopeeUrl={siteSettings.defaultShopeeUrl}
              defaultTiktokUrl={siteSettings.defaultTiktokUrl}
            />
          </div>
        </div>

        <ProductMobileAccordion sections={detailSections} />

        <div className="hidden gap-8 sm:grid lg:grid-cols-2">
          <InfoBlock
            title="Keunggulan"
            items={[
              `Tahan lama: ${product.longevity}`,
              `Projection: ${product.projection}`,
              `Cocok untuk: ${product.occasion}`
            ]}
          />
          <InfoBlock
            title="Notes"
            items={[
              `Top: ${product.topNotes}`,
              `Middle: ${product.middleNotes}`,
              `Base: ${product.baseNotes}`
            ]}
          />
          <InfoBlock title="Bahan" items={[product.ingredients]} />
          <InfoBlock title="Karakter Aroma" items={[product.character]} />
          <InfoBlock title="Target Pengguna" items={[product.targetUser]} />
        </div>
      </div>
    </section>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-black/15 pt-5">
      <h2 className="font-serif text-3xl md:text-4xl">{title}</h2>
      <ul className="mt-4 space-y-2 text-black/75">
        {items.map((item) => (
          <li key={item} className="leading-8">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
