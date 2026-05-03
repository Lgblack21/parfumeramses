# Ramses Parfum - Luxury Ecommerce

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Cloudflare D1 + Prisma
- Midtrans Snap

## Setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Copy env
   ```bash
   cp .env.example .env
   ```
3. Prisma generate + migrate + seed (local SQLite)
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```
4. Run dev
   ```bash
   npm run dev
   ```

## Cloudflare Deploy
1. Install dependencies
   ```bash
   npm install
   ```
2. Login Wrangler
   ```bash
   npx wrangler login
   ```
3. Buat D1 database
   ```bash
   npx wrangler d1 create parfumeramses-db
   ```
   Lalu isi `database_id` di `wrangler.jsonc`.
4. Set Cloudflare env/secrets
   ```bash
   npx wrangler secret put MIDTRANS_SERVER_KEY
   npx wrangler secret put MIDTRANS_CLIENT_KEY
   npx wrangler secret put NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
   npx wrangler secret put MIDTRANS_IS_PRODUCTION
   ```
5. Build and deploy
   ```bash
   npm run cf:deploy
   ```

## Routes
- `/` landing
- `/about`
- `/products`
- `/products/[id]`
- `/cart`
- `/checkout`
- `/testimonials`
- `/admin`

## API
- `GET/POST /api/products`
- `DELETE /api/products/:id`
- `GET /api/orders`
- `POST /api/checkout`
- `POST /api/midtrans/notification`
