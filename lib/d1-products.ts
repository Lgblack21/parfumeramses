import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Product } from "@/types";

type D1ProductRow = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  story: string;
  longevity: string;
  projection: string;
  occasion: string;
  topNotes: string;
  middleNotes: string;
  baseNotes: string;
  ingredients: string;
  character: string;
  targetUser: string;
  shopeeUrl?: string | null;
  tiktokUrl?: string | null;
  isFeatured: number;
  isBestSeller: number;
  isLimitedEdition: number;
  isSignatureCollection: number;
  createdAt: string;
};

function mapRow(row: D1ProductRow): Product {
  return {
    ...row,
    isFeatured: Boolean(row.isFeatured),
    isBestSeller: Boolean(row.isBestSeller),
    isLimitedEdition: Boolean(row.isLimitedEdition),
    isSignatureCollection: Boolean(row.isSignatureCollection)
  };
}

type D1Env = {
  DB: any;
};

export async function d1GetProducts(): Promise<Product[]> {
  const { env } = await getCloudflareContext({ async: true });
  const { DB } = env as unknown as D1Env;
  const result = await DB.prepare('SELECT * FROM "Product" ORDER BY "createdAt" DESC').all();
  return ((result.results ?? []) as D1ProductRow[]).map(mapRow);
}

export async function d1GetProductById(id: string): Promise<Product | null> {
  const { env } = await getCloudflareContext({ async: true });
  const { DB } = env as unknown as D1Env;
  const result = (await DB.prepare('SELECT * FROM "Product" WHERE "id" = ? LIMIT 1').bind(id).first()) as
    | D1ProductRow
    | null;
  return result ? mapRow(result) : null;
}

export async function d1CreateProduct(payload: Omit<Product, "createdAt">) {
  const { env } = await getCloudflareContext({ async: true });
  const { DB } = env as unknown as D1Env;
  await DB.prepare(
    `INSERT INTO "Product" (
      "id","name","price","image","description","story","longevity","projection","occasion",
      "topNotes","middleNotes","baseNotes","ingredients","character","targetUser",
      "shopeeUrl","tiktokUrl","isFeatured","isBestSeller","isLimitedEdition","isSignatureCollection"
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      payload.id,
      payload.name,
      payload.price,
      payload.image,
      payload.description,
      payload.story,
      payload.longevity,
      payload.projection,
      payload.occasion,
      payload.topNotes,
      payload.middleNotes,
      payload.baseNotes,
      payload.ingredients,
      payload.character,
      payload.targetUser,
      payload.shopeeUrl ?? null,
      payload.tiktokUrl ?? null,
      payload.isFeatured ? 1 : 0,
      payload.isBestSeller ? 1 : 0,
      payload.isLimitedEdition ? 1 : 0,
      payload.isSignatureCollection ? 1 : 0
    )
    .run();
}

export async function d1UpdateProduct(id: string, payload: Omit<Product, "id" | "createdAt">) {
  const { env } = await getCloudflareContext({ async: true });
  const { DB } = env as unknown as D1Env;
  await DB.prepare(
    `UPDATE "Product" SET
      "name" = ?, "price" = ?, "image" = ?, "description" = ?, "story" = ?, "longevity" = ?, "projection" = ?, "occasion" = ?,
      "topNotes" = ?, "middleNotes" = ?, "baseNotes" = ?, "ingredients" = ?, "character" = ?, "targetUser" = ?,
      "shopeeUrl" = ?, "tiktokUrl" = ?, "isFeatured" = ?, "isBestSeller" = ?, "isLimitedEdition" = ?, "isSignatureCollection" = ?
    WHERE "id" = ?`
  )
    .bind(
      payload.name,
      payload.price,
      payload.image,
      payload.description,
      payload.story,
      payload.longevity,
      payload.projection,
      payload.occasion,
      payload.topNotes,
      payload.middleNotes,
      payload.baseNotes,
      payload.ingredients,
      payload.character,
      payload.targetUser,
      payload.shopeeUrl ?? null,
      payload.tiktokUrl ?? null,
      payload.isFeatured ? 1 : 0,
      payload.isBestSeller ? 1 : 0,
      payload.isLimitedEdition ? 1 : 0,
      payload.isSignatureCollection ? 1 : 0,
      id
    )
    .run();
}

export async function d1DeleteProduct(id: string) {
  const { env } = await getCloudflareContext({ async: true });
  const { DB } = env as unknown as D1Env;
  await DB.prepare('DELETE FROM "Product" WHERE "id" = ?').bind(id).run();
}
