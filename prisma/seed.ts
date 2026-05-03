import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: "Velvet Rose",
        price: 2490000,
        image:
          "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1400&q=80",
        description:
          "Velvet Rose adalah parfum dengan sentuhan floral elegan yang memberikan kesan mewah dan romantis.",
        story:
          "Dirancang untuk malam yang berkelas, Velvet Rose memadukan nuansa bunga halus dengan jejak musk hangat yang anggun.",
        longevity: "8-12 jam",
        projection: "Soft namun berkelas",
        occasion: "Acara formal, dinner, dan evening event",
        topNotes: "Rose, Citrus",
        middleNotes: "Jasmine, Peony",
        baseNotes: "Musk, Amber",
        ingredients: "Essential oil premium dari Perancis",
        character: "Floral, sweet, oriental",
        targetUser: "Wanita",
        shopeeUrl: "https://shopee.co.id/",
        tiktokUrl: "https://www.tiktok.com/",
        isFeatured: true,
        isBestSeller: true,
        isSignatureCollection: true
      },
      {
        name: "Noir Éclat",
        price: 2790000,
        image:
          "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1400&q=80",
        description:
          "Noir Éclat menghadirkan karakter woody oriental untuk persona percaya diri dan modern.",
        story:
          "Komposisi intens yang dibuka segar lalu berkembang menjadi kayu hangat berlapis amber, meninggalkan kesan eksklusif.",
        longevity: "10-14 jam",
        projection: "Kuat di awal, lembut di dry-down",
        occasion: "Meeting penting, event malam, special occasion",
        topNotes: "Bergamot, Black Pepper",
        middleNotes: "Iris, Saffron",
        baseNotes: "Oud, Sandalwood, Amber",
        ingredients: "Natural oil blend dan imported fragrance concentrate",
        character: "Woody, spicy, oriental",
        targetUser: "Pria",
        shopeeUrl: "https://shopee.co.id/",
        tiktokUrl: "https://www.tiktok.com/",
        isBestSeller: true,
        isLimitedEdition: true
      },
      {
        name: "Citrine Blanc",
        price: 2290000,
        image:
          "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1400&q=80",
        description:
          "Citrine Blanc memancarkan kesegaran bersih dengan sentuhan creamy musk yang refined.",
        story:
          "Wangi yang ringan namun berkarakter untuk gaya hidup aktif, menghadirkan aura polished dari pagi hingga malam.",
        longevity: "7-10 jam",
        projection: "Moderate",
        occasion: "Daily premium wear, brunch, business casual",
        topNotes: "Lemon, Neroli",
        middleNotes: "White Tea, Orange Blossom",
        baseNotes: "White Musk, Cedar",
        ingredients: "Essential oil citrus Mediterranean dan white musk accord",
        character: "Fresh, clean, musky",
        targetUser: "Unisex",
        shopeeUrl: "https://shopee.co.id/",
        tiktokUrl: "https://www.tiktok.com/",
        isSignatureCollection: true
      }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
