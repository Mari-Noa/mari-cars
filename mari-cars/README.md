# Mari Cars

Premium car sales and rental platform (Hebrew first, English second).
Architecture and roadmap: see the Phase 1 document and `docs/ROADMAP.md`.

## Stack
Next.js (App Router) + Tailwind, NestJS (Fastify), MongoDB (replica set), shared Zod contracts. pnpm workspaces.

## Getting started
```bash
cp .env.example .env
pnpm install
pnpm db:up        # MongoDB replica set + Mailpit via Docker
pnpm dev          # web on :3000, api on :4000
```
Health checks: `GET http://localhost:4000/health/live` and `/health/ready`.

## Layout
`apps/web`, `apps/api`, `packages/contracts`, `infra/docker`, `docs/`.

## Editing business details
Phone, WhatsApp, address and hours live in `apps/web/src/lib/site.ts` (placeholders for now).
Sample vehicles and testimonials live in `apps/web/src/lib/sample-data.ts`.
