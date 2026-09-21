# Pitstop Solutions Backend

Node.js API for the Pitstop Solutions storefront. Supabase provides PostgreSQL, authentication, storage, and row-level security.

## Setup

1. Create a Supabase project.
2. Open the Supabase SQL editor and run [`supabase/schema.sql`](supabase/schema.sql).
3. Copy `.env.example` to `.env` and set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `FRONTEND_URL`.
4. Install and start the API:

```powershell
npm install
npm run dev
```

The API runs on `http://localhost:3000` by default.

## Routes

- `GET /api/health`
- `POST /api/auth/signup` with `{ "fullName", "email", "password" }`
- `POST /api/auth/login` with `{ "email", "password" }`
- `GET /api/categories`
- `GET /api/products?category=braking-system&search=caliper`
- `GET /api/products/:slug`

The service-role key is server-only. Never expose it in the frontend or commit `.env`.
