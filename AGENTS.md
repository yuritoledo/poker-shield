<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Poker Shield

Project conventions and agent instructions.

## Coding Principles (three rules)

Every component must follow these three rules, in order:

### 1. Small-as-possible
Do one thing only. If a component has more than one responsibility
(form state + store + side effects), split it.

### 2. Self-contained
Own your dependencies. Don't leak abstractions — a presentational
component should not know about Zustand, Redux, or any global state.
That coupling lives in a controller hook one layer above.

### 3. Not a cosmic horror
Don't make components so generic they take 25 props and handle 10
variants. If a feature doesn't fit, build a new component instead of
adding another prop to the existing one. 3-5 props is a sweet spot;
7+ is a warning sign.

## Code Style

- Arrow functions (` =>`) for `map`, `reduce`, `filter` callbacks only. Use regular `function`
  everywhere else.
- Destructure props in the function signature for 1-2 props. For 3+, use
  `const {} = props` in the component body instead.

## Deep Modules

## Commands

| Script | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run test` | Run Vitest tests |
| `npm run test:watch` | Watch mode |
| `npm run lint:boundaries` | Check deep-module boundaries |

## TDD

Build features test-first: write a failing test first (red), then minimal
code to pass (green), then repeat. Use `@total-typescript/shoehorn` for
partial test data instead of `as` assertions.

## Agent skills

### Issue tracker

Issues are tracked on GitHub (when a remote is configured). See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles use the default label names. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — one `CONTEXT.md` at repo root. See `docs/agents/domain.md`.

### Ponytail

Lazy senior dev mode. Before writing code, climbs a ladder: YAGNI →
reuse → stdlib → native platform → installed deps → one line → minimum
code. Run `npm run build` first when making large changes to ensure the
type-checking and linting pass with the minimal approach. Default: `full`.
See `docs/agents/ponytail.md`.
