import { getPrisma } from "@/lib/prisma";
import { mockProducts } from "@/lib/mock-products";

export async function getProducts() {
  try {
    const prisma = getPrisma();
    return prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return mockProducts;
  }
}

export async function getProductById(id: string) {
  try {
    const prisma = getPrisma();
    return prisma.product.findUnique({ where: { id } });
  } catch {
    return mockProducts.find((item) => item.id === id) ?? null;
  }
}
