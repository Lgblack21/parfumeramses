import { getPrisma } from "@/lib/prisma";
import { mockProducts } from "@/lib/mock-products";

function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

export async function getProducts() {
  if (!hasDatabaseUrl()) return mockProducts;
  const prisma = getPrisma();
  return prisma.product.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getProductById(id: string) {
  if (!hasDatabaseUrl()) return mockProducts.find((item) => item.id === id) ?? null;
  const prisma = getPrisma();
  return prisma.product.findUnique({ where: { id } });
}
