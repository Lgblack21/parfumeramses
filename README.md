# Ramses Parfum - Luxury Ecommerce

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS + Framer Motion
- Prisma + Cloudflare D1

## Fitur Utama
- UI luxury high-end (black/cream/gold, whitespace besar, typography elegan)
- Hero fokus 1 produk utama
- Section: Best Seller, Limited Edition, Signature Collection
- Product detail storytelling lengkap (keunggulan, notes, bahan, karakter, target pengguna)
- Order manual tanpa payment gateway:
  - WhatsApp auto message
  - Link Shopee
  - Link TikTok Shop
- Admin panel tersembunyi:
  - Path: `/hidden-admin-luxora-9281`
  - Login hardcoded
  - CRUD produk + upload gambar

## Local Run
1. `npm install`
2. `cp .env.example .env`
3. `npm run prisma:generate`
4. `npm run prisma:migrate`
5. `npm run prisma:seed`
6. `npm run dev`

## Cloudflare D1 Deploy
1. `npx wrangler login`
2. `npm run cf:deploy`

> Pastikan `wrangler.jsonc` binding D1 sudah valid.
