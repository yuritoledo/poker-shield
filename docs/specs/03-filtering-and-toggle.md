# 03 — Filtering and Toggle Active

**Status:** Draft  
**Blocked by:** #2 (table list with mock data)  
**Issues:** #3  

---

## 1. Architecture snapshot (as of #2)

Current data flow (props-based, decided in #2):

```
/tables (page)
  └─ TablesDashboard  tables={filteredTables}
       └─ <Table> renders rows
```

- `TablesDashboard` is **purely presentational** — receives `tables: TableRow[]`, renders HTML.
- The page owns where data comes from: currently `mockTables`, later a query hook.
- No global state, no query client inside the component.

This design was chosen per AGENTS.md Rule #2 ("Self-contained"): data-fetching coupling lives one layer above the presentational component.

---

## 2. Proposed component tree with filters

```
/tables (page)
  ├─ TablesFilterBar  filters={filters}  onChange={setFilters}
  └─ TablesDashboard  tables={filteredTables}  onToggle={handleToggle}
```

- **`TablesFilterBar`** — presentational filter controls: game type dropdown, stakes dropdown, status dropdown, optional text search input. Emits filter changes upward.
- **Page** — owns filter state via `useState<TableFilters>` + `useMemo` for filtered list. Owns toggle handler.
- **`TablesDashboard`** — unchanged interface (`tables: TableRow[]`, `onToggle: TableToggleAction`). Receives *already-filtered* data.

### Why filter downstream of the page?

The page is the natural owner of filter state because:

1. **URL-syncing** (future): filters can push to URL search params without touching the table component.
2. **Persistence** (future): saved filter presets live at the page level.
3. **Single source of truth**: the filter bar and the table read from the same state, no prop-drilling through intermediaries.
4. **Testability**: `TablesDashboard` tests don't need to set up filter state — they pass exactly the rows they want to see.

---

## 3. Data flow

```
                    filters
  TablesFilterBar ────────► Page (useState)
                    onChange

  Page (useMemo) ──────────────────► TablesDashboard
  filtered = applyFilters(tables, filters)    tables={filtered}

  TablesDashboard ───────────────────────────► Page
  (user clicks toggle)                            onToggle
```

### Filter logic (`applyFilters`)

```ts
function applyFilters(tables: TableRow[], filters: TableFilters): TableRow[] {
  return tables.filter((t) => {
    if (filters.gameType !== "all" && t.gameType !== filters.gameType) return false;
    if (filters.status !== "all" && t.status !== filters.status) return false;
    if (filters.stakes !== "all" && t.stakes !== filters.stakes) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!t.name.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}
```

All dimensions are **AND-combined** (as specified in issue #3). Pure function, easily tested in isolation.

### Toggle callback

```ts
type TableToggleAction = (tableId: string) => void;
```

The page receives the callback, updates the mock/stateful data source, and React re-renders the filtered list. This keeps `TablesDashboard` from needing to know anything about mutations, only rendering.

---

## 4. Stakes dropdown: dynamic values

Unlike game type (fixed enum) and status (fixed enum), stakes values come from the data — extract available values from the current table list:

```ts
const availableStakes = useMemo(
  () => [...new Set(tables.map((t) => t.stakes))].sort(),
  [tables]
);
```

Passed to `TablesFilterBar` as `availableStakes: string[]`.

---

## 5. Stateful mock data

Current `mockTables` is a `const` array — toggling changes the array in place (immutable update). Need a small stateful wrapper:

```ts
// src/packages/tables-dashboard/lib/mock-store.ts
import { mockTables as initialTables } from "./mock-data";
import type { TableRow } from "./types";

let tables = [...initialTables];
const listeners = new Set<() => void>();

export function getTables(): TableRow[] {
  return tables;
}

export function toggleTable(id: string): void {
  tables = tables.map((t) =>
    t.id === id
      ? { ...t, status: t.status === "active" ? "inactive" : "active" }
      : t
  );
  listeners.forEach((l) => l());
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
```

For the initial implementation, a simple store with manual subscriptions works. If React Query lands later, the toggle becomes a `useMutation` and this store goes away.

---

## 6. Evaluation checkpoint

This props-based design works well if:

- [x] Filters are **owned by the page** (URL params, presets → page-level concern).
- [x] Filter logic is **pure and testable** without rendering.
- [x] `TablesDashboard` stays **focused on rendering** (one prop changes: fewer rows).
- [x] Toggle mutation is **owned by the parent** (replaces the entire data set, no stale state).
- [ ] **No sibling components** need the same filtered data (if a table stats summary appears beside the filter bar, they'd both read from the page — still works).
- [ ] **No deeply nested filter consumers** (if a grandchild of `TablesDashboard` needed raw unfiltered data, props drilling would hurt — but no such case exists).

### When to reconsider self-fetching

Revisit if any of these happen:

1. **Multiple pages** need the same filtered table view but with different data sources → self-fetching reduces boilerplate per page.
2. **The page becomes a pass-through** — if every page just does `<TablesDashboard />` without adding page-specific logic, the indirection is noise.
3. **Server-side filtering** is needed (large dataset) → the hook would accept filters as query params and `TablesDashboard` would pass them to `useTablesQuery({ filters })` internally.

---

## 7. Key interfaces

```ts
// TablesFilterBar props
interface TablesFilterBarProps {
  filters: TableFilters;
  availableStakes: string[];
  onChange: (filters: TableFilters) => void;
}

// TablesDashboard props (unchanged from #2)
interface TablesDashboardProps {
  tables: TableRow[];
  onToggle?: TableToggleAction;
}

// Filter types (already exist)
interface TableFilters {
  gameType: GameType | "all";
  stakes: string | "all";
  status: TableStatus | "all";
  search?: string; // text search — new addition for v2
}
```
