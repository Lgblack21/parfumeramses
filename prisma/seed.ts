import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: "Noir Elixir",
        price: 2450000,
        image:
          "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
        description:
          "Amber woods, saffron, and vanilla in a deep evening composition for formal moments."
      },
      {
        name: "Velvet Iris",
        price: 2190000,
        image:
          "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80",
        description:
          "Iris, white musk, and cedar crafted to feel luminous and intimate all day."
      },
      {
        name: "Oud Imperial",
        price: 2890000,
        image:
          "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1200&q=80",
        description:
          "A regal trail of oud, rose absolute, and smoky leather for unmistakable presence."
      },
      {
        name: "Crème de Nuit",
        price: 2350000,
        image:
          "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80",
        description:
          "Soft tonka and cashmere notes wrapped in bergamot to balance warmth and clarity."
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
