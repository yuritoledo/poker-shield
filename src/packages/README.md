# Packages — Deep Modules

Each package under `src/packages/` is a **deep module**: a lot of behaviour
behind a small interface.

## Layout

```
packages/<name>/
  index.ts         ← entry point (public). Import this from outside.
  client.ts        ← another entry point (optional). Packages may expose several.
  lib/             ← implementation (private). Free to import each other internally.
  tests/           ← tests (private). Import only through entry points.
```

## Rules

1. **Entry-point boundary** — app code and other packages may import only a
   package's root files (its entry points), never anything in its subfolders.
2. **Intra-package freedom** — a package's own files import each other freely.
3. **Tests through entry points** — tests import through entry points like
   everyone else. They may import their own `tests/` fixtures internally,
   but never any package's subfolder internals.
4. **No dependency cycles** — enforced by dependency-cruiser.

## Barrel files

**Don't use barrel files** (an `index.ts` that re-exports everything from
a subtree). Prefer exposing several small entry points at the package root
(e.g., `index.ts`, `client.ts`, `server.ts`) so consumers import only what
they need.

## Verification

```sh
npm run lint:boundaries
```

This runs dependency-cruiser across `src/` and fails on any violation of
the rules above.
