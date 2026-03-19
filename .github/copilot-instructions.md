# Project Guidelines

## Code Style
- Use TypeScript across frontend and backend; preserve existing formatting and naming in touched files.
- Keep frontend data access in `frontend/src/actions/` and shared fetch helpers in `frontend/src/lib/`.
- Keep Strapi backend resources in `backend/src/api/<content-type>/` using Strapi factory patterns where applicable.
- Prefer small, focused changes. Avoid broad refactors unless explicitly requested.

## Architecture
- Monorepo with two deployable apps:
- `frontend/`: Next.js App Router site (Next.js 16, React 18, Tailwind, Clerk auth, Meilisearch client).
- `backend/`: Strapi v5 CMS (TypeScript, PostgreSQL in production, SQLite possible in dev, Meilisearch + AWS S3 plugins).
- Frontend is deployed through Vercel.
- Backend Strapi is hosted on an AWS EC2 instance.
- PostgreSQL is hosted on AWS RDS.
- Images and PDF assets are hosted in an AWS S3 bucket.
- Clerk authentication gates access before users can view real content.
- Supporting docs are in `docs/` and contain operational details (`docs/apis.md`, `docs/issues.md`, `docs/server.md`, `docs/stack.md`), although might be outdated. Also check with package.json scripts and code comments for up-to-date info.
- Frontend content should be fetched from Strapi via server-side action helpers (see `frontend/src/actions/`).

## About
- This is a student-run newspaper website.

## Build And Test
- Frontend (`cd frontend`):
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`
- Backend (`cd backend`):
- Install: `npm install`
- Dev: `npm run dev`
- Build admin: `npm run build`
- Start: `npm run start`
- Data import utilities are in backend scripts, e.g. `npm run import:dry-run`, `npm run import:articles:enhanced`, `npm run import:api`.
- There is no standard root-level test command; run lint/build checks for the app you changed.

## Conventions
- Frontend:
- Use `fetchCached` from `frontend/src/lib/fetchRequests.ts` for Strapi requests when following existing patterns.
- Build Strapi query params with `qs.stringify` in action files.
- Respect existing client/server component boundaries (`"use client"` only where required).
- Keep shared constants in `frontend/src/components/Constants.tsx` unless a better existing config location is already used nearby.
- Backend:
- Preserve Strapi route/controller/service structure and naming conventions.
- Keep CORS and security config aligned with `backend/config/middlewares.ts` when adding new origins or media domains.
- Validate environment-variable-backed integrations (Listmonk, S3, Meilisearch) before assuming local defaults.

## Key Example Files
- Frontend patterns:
- `frontend/src/actions/getArticleById.ts`
- `frontend/src/components/ArticlePreview.tsx`
- `frontend/src/app/layout.tsx`
- `frontend/src/lib/fetchRequests.ts`
- Backend patterns:
- `backend/src/api/article/content-types/article/schema.json`
- `backend/src/api/newsletter/controllers/newsletter.ts`
- `backend/config/middlewares.ts`
- `backend/config/plugins.ts`
