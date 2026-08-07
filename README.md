# Poker Shield

A full-stack Next.js dashboard for tracking poker-room players, tables,
alerts, and suspicious activity. Built as a solo project with a deep-module
architecture and TanStack Query for all async state.

**Tech stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui,
TanStack Query v5, Zustand v5, Drizzle ORM, better-auth, Better SQLite3,
Recharts, Vitest.

## Architecture

The codebase follows the **deep-module** pattern — every package under
`src/packages/` exposes a small public entry point (`index.ts`) and keeps its
implementation private in `lib/`. Outside code never imports from a package's
subfolders. Dependency-cruiser enforces this at build time.

| Package | Responsibility |
|---------|---------------|
| `auth` | Login form, auth store, access control |
| `dashboard` | Sidebar shell, header, logout |
| `alerts` | Alert badges, alert list components |
| `players` | Player directory, player detail, filtering, mutations |
| `tables` | Drizzle schema and DB queries (ORM layer) |
| `tables-dashboard` | Tables list, filtering, toggle mutations |
| `reports` | Charts and stats (Recharts) |
| `sessions` | Session history table, stats bar |
| `example` | Greet function + mutation conventions walkthrough |

See [src/packages/README.md](src/packages/README.md) for the full deep-module
rules.

## Getting started

```sh
git clone <repo-url>
cd poker-shield
npm install
npm run dev          # starts on http://localhost:3000
```

Login is placeholdered — any email/password combination creates a session.

## Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build (type-check + lint) |
| `npm run test` | Run Vitest test suite |
| `npm run test:watch` | Watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | ESLint across the project |
| `npm run lint:boundaries` | Check deep-module import rules |

## Adding new write paths

See [Mutation Hook Conventions](src/packages/example/lib/mutation-conventions.md)
for the TanStack Query mutation pattern used across all packages. Covers POST,
PATCH, and DELETE write paths with code examples and a checklist.

## Known limitations

- **Auth** is a placeholder — any credentials create a session. Replace with
  better-auth or Auth.js when integrating a real backend.
- **API routes** fall back to in-memory mock stores when the DB is unavailable.
- **No E2E tests** yet — Vitest covers unit + integration; Playwright is on the
  roadmap.

## Contributing

1. Run `npm run lint:boundaries` before pushing — import-boundary violations
   block the build.
2. Tests use Vitest. Write tests through package entry points only (same rule
   as application code).
3. Prefer TanStack Query hooks over raw fetch calls for all async state.
   See the [mutation conventions](src/packages/example/lib/mutation-conventions.md)
   for the established pattern.
