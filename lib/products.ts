import { d1GetProductById, d1GetProducts } from "@/lib/d1-products";
import { mockProducts } from "@/lib/mock-products";

export async function getProducts() {
  try {
    return await d1GetProducts();
  } catch {
    return mockProducts;
  }
}

export async function getProductById(id: string) {
  try {
    return await d1GetProductById(id);
  } catch {
    return mockProducts.find((item) => item.id === id) ?? null;
  }
}
