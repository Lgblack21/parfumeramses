import { getCloudflareContext } from "@opennextjs/cloudflare";

type D1Env = { DB: any };

export type SiteSettings = {
  whatsappNumber: string;
  defaultShopeeUrl: string;
  defaultTiktokUrl: string;
};

const DEFAULTS: SiteSettings = {
  whatsappNumber: "6281200000000",
  defaultShopeeUrl: "https://shopee.co.id/",
  defaultTiktokUrl: "https://www.tiktok.com/"
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const { DB } = env as unknown as D1Env;
    const result = await DB.prepare('SELECT "key","value" FROM "SiteSetting"').all();
    const map = new Map<string, string>();
    for (const row of result.results ?? []) {
      const item = row as { key?: string; value?: string };
      if (item.key && item.value) map.set(item.key, item.value);
    }
    return {
      whatsappNumber: map.get("whatsappNumber") ?? DEFAULTS.whatsappNumber,
      defaultShopeeUrl: map.get("defaultShopeeUrl") ?? DEFAULTS.defaultShopeeUrl,
      defaultTiktokUrl: map.get("defaultTiktokUrl") ?? DEFAULTS.defaultTiktokUrl
    };
  } catch {
    return DEFAULTS;
  }
}

export async function updateSiteSettings(settings: SiteSettings) {
  const { env } = await getCloudflareContext({ async: true });
  const { DB } = env as unknown as D1Env;
  const stmt = DB.prepare('INSERT OR REPLACE INTO "SiteSetting" ("key","value") VALUES (?, ?)');
  await DB.batch([
    stmt.bind("whatsappNumber", settings.whatsappNumber),
    stmt.bind("defaultShopeeUrl", settings.defaultShopeeUrl),
    stmt.bind("defaultTiktokUrl", settings.defaultTiktokUrl)
  ]);
}
