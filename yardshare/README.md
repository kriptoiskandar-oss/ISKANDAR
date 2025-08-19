# YardShare MVP

A Next.js + Prisma + NextAuth + Stripe starter for renting and listing yards.

## Prerequisites
- Node 18+
- PostgreSQL database (e.g., Supabase/Neon)

## Setup
1. Copy env:
```bash
cp .env.example .env
```
2. Edit `DATABASE_URL`, `NEXTAUTH_SECRET`, and Stripe keys in `.env`.
3. Install deps:
```bash
npm install
```
4. Generate Prisma client and push schema:
```bash
npx prisma generate
npx prisma db push
```
5. Dev server:
```bash
npm run dev
```

## Stripe Webhook
Run locally with the Stripe CLI and set the secret in `.env`:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## MVP Pages
- `/` Landing
- `/browse` Listings
- `/yard/[id]` Details + booking form
- `/auth/signin`, `/auth/signup`
- `/host/dashboard`, `/host/listings/new`
- `/checkout` flow (placeholder), `/checkout/success`, `/checkout/cancel`

## Notes
- Auth uses Credentials; add OAuth providers later if needed.
- Booking + Stripe: server routes are stubbed for end-to-end flow.