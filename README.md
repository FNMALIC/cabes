# CABES

Public marketing site (this folder) plus two companion projects:

- `server/` — Fastify + Prisma + MongoDB API (contact form submissions, testimonials). See `server/README.md`.
- `admin/` — separate React dashboard for managing testimonials and reviewing contact submissions. See `admin/README.md`.

## Running everything locally

```bash
cp .env.example .env                 # add VITE_API_URL (defaults to http://localhost:4000)
cp server/.env.example server/.env   # fill in DATABASE_URL, JWT_SECRET, ADMIN_EMAIL/ADMIN_PASSWORD
cp admin/.env.example admin/.env
npm install
npm --prefix server install
npm --prefix admin install
npm --prefix server run db:push
npm --prefix server run db:seed
npm run dev:all   # runs the public site (:5173), API (:4000), and admin app (:5174) together
```

`DATABASE_URL` needs a MongoDB **replica set** (a free MongoDB Atlas M0 cluster already is one).

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
