# CABES Admin

Small, separate React app for managing testimonials and reviewing contact form submissions. Not part of the public site's bundle — deployed and hosted independently, and marked `noindex`.

## Setup

```bash
cp .env.example .env   # VITE_ADMIN_API_URL, defaults to http://localhost:4000
npm install
npm run dev             # http://localhost:5174
```

Requires the API (`../server`) running and reachable, and an admin account seeded there (`npm run db:seed` in `server/`).

## Pages

- `/login` — email + password, sets the session cookie via the API
- `/testimonials` — create/edit/delete testimonials, toggle published/hidden
- `/submissions` — list contact form submissions, filter by status, mark read/archived

Auth state is a `GET /auth/me` check on load (`src/context/SessionContext.tsx`); unauthenticated visitors are redirected to `/login` via `ProtectedRoute`.
