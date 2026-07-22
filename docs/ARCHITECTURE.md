# Poker Shield — Architecture

## Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Recommended React meta-framework, Vercel deploy |
| Language | TypeScript | Type safety across the board |
| Styling | Tailwind CSS v4 | Utility-first, colocated with components |
| UI Kit | shadcn/ui | Accessible, composable, themeable |
| State (global) | Zustand | Lightweight, no boilerplate, works outside React |
| State (server) | TanStack Query | Loading/error/caching/refetching for API data |
| Database | PostgreSQL (Neon) + Drizzle ORM | Type-safe SQL, no magic |
| Auth | Better Auth | Multi-tenant support, email + social |
| Charts | Recharts | Declarative, React-native |
| Testing | Vitest + Testing Library + Playwright | Fast, modern, browser-level E2E |
| Test data | @total-typescript/shoehorn | Type-safe partials without `as` |
| Module boundaries | dependency-cruiser | Enforces deep-module rules |

## Package structure (Deep Modules)

```
src/packages/
  <name>/
    index.ts        ← entry point (public). Import from here.
    lib/            ← implementation (private). Subfolder = hidden.
    tests/          ← tests (private). Import only through entry points.
```

Each package is a **deep module**: a lot of behaviour behind a small interface.
See [src/packages/README.md](../src/packages/README.md) for the full rules.

### Current packages

| Package | Purpose | Status |
|---|---|---|
| `auth` | Login form, auth store, access control | Built |
| `dashboard` | Layout shell (sidebar, header, content) | Built |
| `tables` | Drizzle schema, DB connection | Scaffolded |
| `example` | Deep-module reference (delete later) | Template |

## Coding Principles (three rules)

See [PRINCIPLES.md](./PRINCIPLES.md).

## Current state

- Project scaffolded and deployable
- 15 tests passing across 4 test files
- All dependencies installed
- Ready for: Tables Dashboard, Players domain, Alerts domain

## Vercel deploy

```sh
npm run build   # Verify it builds
```

Then connect the GitHub repo to Vercel. Set `DATABASE_URL` env var in
Vercel dashboard when the DB is ready.
