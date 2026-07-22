# TDD Workflow

Based on Matt Pocock's engineering skills (`tdd` skill).

## The loop

```
RED   → Write a failing test first
         (proves the feature doesn't exist yet)

GREEN → Write minimal code to make it pass
         (no extra features, just enough to satisfy the test)

REPEAT → Next slice of behavior
         (refactoring comes at code-review time, not during the loop)
```

## Rules

| Rule | Why |
|---|---|
| **Red before green** | Never write code without a test proving it's needed |
| **One slice at a time** | One test → one implementation → repeat. Don't anticipate |
| **Test through public interfaces** | Test what the user does, not internal implementation |
| **No `as` in tests** | Use `fromPartial` from `@total-typescript/shoehorn` |
| **Refactoring is separate** | Clean up during code review, not in the red-green loop |

## Seams

A **seam** is the public boundary you test at. Before writing any test,
agree the seams with the team:

- **Without a real DB** → test at the UI/component level and data-layer
  abstraction (mock the API)
- **With a real DB** → also test at the database level (integration tests)

The implementation can change (mock → real DB → serverless) and the tests
don't break — because they test through the public interface, not internals.

## Tools

| Tool | When |
|---|---|
| `vitest` | Unit + integration tests |
| `@testing-library/react` | Component tests (render, user events) |
| `@total-typescript/shoehorn` | Type-safe partial test data (no `as`) |
| `Playwright` | E2E tests (browser-level) |
