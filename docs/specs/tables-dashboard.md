# Tables Dashboard — Spec

> **Status**: Draft (publish to issue tracker when GitHub remote is configured)
> **Labels**: `ready-for-agent`

## Problem Statement

Operators need a central view of all poker tables in their tenant. Currently there is no UI to see which tables are active, what game types are running, or whether any tables have flagged players — this information lives only in the database schema. Without a table list, operators can't monitor table activity or deactivate tables that shouldn't be running.

## Solution

A Tables Dashboard page inside the existing dashboard layout. It shows a paginated/filtered list of poker tables with key metrics (hands played, player count, flagged players) and allows operators to toggle a table's active status. Data comes from an in-memory mock repository initially, with a clean seam to swap in a real database connection.

## User Stories

1. As an operator, I want to see a list of all tables in my tenant, so that I can quickly understand what's running.
2. As an operator, I want to see each table's game type (Texas Hold'em, Omaha, Stud), stakes, and status, so that I can identify tables at a glance.
3. As an operator, I want to see how many hands each table has played and how many players are on it, so that I can gauge activity level.
4. As an operator, I want to see how many flagged players are on each table, so that I can identify potentially suspicious tables immediately.
5. As an operator, I want to filter tables by game type (Texas Hold'em, Omaha, Stud), so that I can focus on one game variant.
6. As an operator, I want to filter tables by stakes (e.g. "1/2", "2/5"), so that I can find tables in a specific stake range.
7. As an operator, I want to filter tables by status (active/inactive), so that I can see only running tables or review deactivated ones.
8. As an operator, I want to toggle a table's active status from the list, so that I can quickly deactivate a table that shouldn't be running.
9. As an operator, I want the table list to auto-refresh periodically, so that I always see current data without manual reloads.

## Implementation Decisions

- **New package**: `src/packages/tables-dashboard/` — a deep module containing the TablesDashboard component.
- **Mock data layer**: Tables are passed as a prop (initially a static mock array). This creates a clean seam for a real data hook powered by TanStack Query.
- **Filtering**: Client-side filtering via local state (game type, stakes, status). Filters are AND-combined.
- **No detail page**: For v1, all relevant info is visible inline. Drilling into a table's players/hands is deferred.
- **Auto-refresh**: Built with TanStack Query's `refetchInterval: 30000` once the real data hook is added. For the mock-data v1, the list is static.
- **Flagged player count**: Each table shows the count of players with `isFlagged: true`. This requires the tables-dashboard to receive aggregated player data alongside each table.
- **Types**: View-model types defined in `src/packages/tables-dashboard/lib/types.ts`, separate from the Drizzle schema — decouples the UI from the ORM.

## Testing Decisions

- **What makes a good test**: Test external behavior only — what the user sees and what happens when they interact. Don't test internal state, filtering implementation details, or class names.
- **Single seam**: The `TablesDashboard` component receives table data as props and renders the list. Tests focus on:
  - Renders all tables when no filters are active
  - Filters correctly by game type, stakes, and status
  - Shows hands played, player count, and flagged player count per table
  - Clicking "toggle active" calls the correct callback with the table ID
- **Prior art**: See `src/packages/dashboard/tests/dashboard-shell.test.tsx` and `src/packages/auth/tests/login-form.test.tsx` for the testing patterns used in this codebase (Testing Library, user-event, no implementation detail queries).

## Out of Scope

- Creating or editing tables (no create/edit form)
- Deleting tables
- Table detail/drill-down page
- Real database integration (mock data for v1)
- Server-side pagination (all tables rendered client-side for now)
- Role-based access controls on the dashboard itself (handled by the auth package)

## Further Notes

- The dashboard sidebar already links to `/tables` — the route just returns a 404 until this page exists.
- The existing `DashboardShell` component in the `dashboard` package provides the layout.
- The mock data should reflect real-looking table names, game types, and stakes to make the UI feel realistic during development.
