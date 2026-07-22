# Ponytail

Installed from `github.com/DietrichGebert/ponytail`.

## When to use

On every coding task: writing, refactoring, fixing, designing, or reviewing code. Ponytail is always-on via the `ponytail` skill loaded from the pi agent skills.

## Levels

| Level | When |
|---|---|
| `lite` | User is unsure, wants a lighter touch |
| `full` | (default) Full ladder — YAGNI, stdlib, native, one-liner |
| `ultra` | Maximum compression, may cut comments and blank lines |

## Intensity hints

- `/ponytail ultra` — max compression
- `/ponytail lite` — relaxed
- `/ponytail` — toggle/report

## Project notes

- The three AGENTS.md rules (small-as-possible, self-contained, not a cosmic horror) already align with ponytail's philosophy — they're complementary, not conflicting.
- Ponytail's ladder runs *after* reading the code the change touches. The project's deep-module boundaries (`depcruise`) are a hard constraint — don't simplify across a package boundary.
- Prefer reusing shadcn/ui components (`@/components/ui/`) over writing custom UI.
- Prefer `clsx` + `twMerge` (via `cn()`) over inline `className` logic.
- Don't trim tests or type safety — they're explicitly requested by the project's standards.
