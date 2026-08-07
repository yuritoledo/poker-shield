# Mutation Hook Conventions

This document codifies the TanStack Query mutation pattern used across Poker Shield packages. Use this as the reference when adding new write paths (POST, PATCH, DELETE).

## Architecture

Every write path follows a three-layer structure:

```
src/packages/<feature>/
  lib/
    api.ts          ← raw fetch calls (server-bound only)
    use-<name>-query.ts     ← query hook + query key
    use-<name>-mutation.ts  ← mutation hook wrapping the API
  index.ts          ← public entry point
```

Presentational components receive callbacks — they never call hooks or fetch directly. The page component owns the mutation hook and passes the resulting `mutate` function down as a prop.

## Step by step

### 1. Define the API function (`api.ts`)

Server calls live in a dedicated module. No hook logic, no query keys — just fetch.

```ts
// src/packages/<feature>/lib/api.ts
import type { MyRow } from "./types";

export async function fetchItems(): Promise<MyRow[]> {
  const res = await fetch("/api/items");
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export async function apiCreateItem(data: CreatePayload) {
  const res = await fetch("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create item");
}

export async function apiUpdateItem(id: string, data: UpdatePayload) {
  const res = await fetch("/api/items", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, id }),
  });
  if (!res.ok) throw new Error("Failed to update item");
}

export async function apiDeleteItem(id: string) {
  const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete item");
}
```

### 2. Define the query key + query hook

```ts
// src/packages/<feature>/lib/use-items-query.ts
import { useQuery } from "@tanstack/react-query";
import { fetchItems } from "./api";

export const ITEMS_QUERY_KEY = ["items"] as const;

export function useItemsQuery() {
  return useQuery({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: fetchItems,
    refetchInterval: 30_000,
  });
}
```

### 3. Create the mutation hook

```ts
// src/packages/<feature>/lib/use-create-item-mutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCreateItem } from "./api";
import { ITEMS_QUERY_KEY } from "./use-items-query";

export function useCreateItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiCreateItem,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
}
```

For mutations with multiple arguments, wrap them in an object:

```ts
mutationFn: ({ playerId, delta }: { playerId: string; delta: number }) =>
  apiAdjustScore(playerId, delta),
```

### 4. Export through the entry point

```ts
// src/packages/<feature>/index.ts
export { fetchItems, apiCreateItem, apiUpdateItem, apiDeleteItem } from "./lib/api";
export { useItemsQuery, ITEMS_QUERY_KEY } from "./lib/use-items-query";
export { useCreateItemMutation } from "./lib/use-create-item-mutation";
```

### 5. Wire in the page

```tsx
// src/app/(dashboard)/items/page.tsx
"use client";

import { useItemsQuery, useCreateItemMutation } from "@/packages/items";

export default function ItemsPage() {
  const { data: items = [], isLoading, isError, refetch } = useItemsQuery();
  const createMutation = useCreateItemMutation();

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <button onClick={() => refetch()}>Retry</button>;

  return (
    <ItemList
      items={items}
      onCreate={(data) => createMutation.mutate(data)}
    />
  );
}
```

## Conventions checklist

- [ ] Server calls live in `api.ts` — no hooks, no query keys
- [ ] Query key is a `const` assertion (`as const`) exported alongside the query hook
- [ ] Mutation hooks are thin wrappers: `mutationFn` → API call, `onSuccess` → invalidate
- [ ] Hooks are exported through the package entry point, never imported from `lib/`
- [ ] Pages own mutation hooks; presentational components receive callbacks as props
- [ ] Error state lives in the mutation hook (`isError`, `error`) — no `try/catch` in pages
- [ ] Tests cover success invalidation and error handling for every mutation hook

## Real examples in this codebase

| Hook | Package | Write type |
|------|---------|------------|
| `useFlagPlayerMutation` | `@/packages/players` | PATCH |
| `useAdjustScoreMutation` | `@/packages/players` | PATCH |
| `useToggleTableMutation` | `@/packages/tables-dashboard` | PATCH |
| `useLoginMutation` | `@/packages/auth` | POST (placeholdered) |

Open each file to see the exact pattern applied.
