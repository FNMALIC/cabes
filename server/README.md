# CABES API

Fastify + Prisma + MongoDB backend for the CABES site: public contact form submissions and testimonials, plus an admin API used by the `admin/` dashboard.

## Setup

```bash
cp .env.example .env   # fill in DATABASE_URL, JWT_SECRET, ADMIN_EMAIL/ADMIN_PASSWORD
npm install
npm run db:push        # syncs Mongo collections/indexes to prisma/schema.prisma
npm run db:seed        # creates/updates the single admin account from ADMIN_EMAIL/ADMIN_PASSWORD
npm run dev             # starts the API on http://localhost:4000
```

`DATABASE_URL` needs a MongoDB **replica set** — a free [MongoDB Atlas](https://www.mongodb.com/atlas) M0 cluster already is one. Local standalone `mongod` will not work for `db:push`/`db:seed` unless started with `--replSet`.

## Scripts

- `npm run dev` — API with hot reload (tsx watch)
- `npm run build` / `npm run start` — production build/run
- `npm run db:push` — sync `prisma/schema.prisma` to MongoDB (Mongo has no migration history; there is no `db:migrate`)
- `npm run db:seed` — idempotent upsert of the admin account from `ADMIN_EMAIL`/`ADMIN_PASSWORD`
- `npm run db:studio` — Prisma Studio, useful for eyeballing/editing data directly

## API surface

Public:
- `POST /contact` — creates a `ContactSubmission` (rate-limited)
- `GET /testimonials` — published testimonials, sorted
- `GET /healthz`

Auth:
- `POST /auth/login`, `POST /auth/logout`, `GET /auth/me` — JWT set as an httpOnly cookie

Admin (require the session cookie from `/auth/login`):
- `GET/POST /admin/testimonials`, `PATCH/DELETE /admin/testimonials/:id`
- `GET /admin/contact-submissions` (`?status=NEW|READ|ARCHIVED&page=&pageSize=`), `PATCH /admin/contact-submissions/:id`

## Deployment notes

- Never run `prisma db push` as part of an automatic deploy — run it manually when `schema.prisma` changes.
- The auth cookie is `SameSite=Lax`; deploy the API and the `admin/` app on subdomains of the same root domain as the public site (e.g. `api.cabes.cm` / `admin.cabes.cm` / `www.cabes.cm`) to keep it same-site. `CORS_ORIGINS` must list every origin allowed to send credentialed requests.
- Free hosting tiers (Render, etc.) sleep after inactivity; since `GET /testimonials` is on the public homepage, pair the deploy with an uptime pinger on `/healthz`.
