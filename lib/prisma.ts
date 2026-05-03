import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cache } from "react";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createNodePrisma() {
  return (
    globalForPrisma.prisma ??
    new PrismaClient({
      log: ["error"]
    })
  );
}

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = createNodePrisma();

export const getPrisma = cache(() => {
  try {
    const { env } = getCloudflareContext();
    const adapter = new PrismaD1((env as { DB: unknown }).DB as never);
    return new PrismaClient({ adapter, log: ["error"] });
  } catch {
    return createNodePrisma();
  }
});
