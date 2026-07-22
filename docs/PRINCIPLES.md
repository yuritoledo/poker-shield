# Coding Principles (three rules)

Every component in this project must follow these three rules, in order of
priority.

## 1. Small-as-possible

Do **one thing only**. If a component has more than one responsibility,
split it.

**Signs you're violating it:**
- A component manages form state + global state + side effects
- A function does validation + formatting + API calls
- A file has more than ~80 lines of logic

**Test:** Can you name the component's single job in 5 words? If not, split.

## 2. Self-contained

Own your dependencies. Don't leak abstractions.

**What this means:**
- A presentational component should not import Zustand, Redux, or any global
  state store directly. That coupling lives in a controller hook one layer
  above.
- A package entry point is the *only* thing outsiders import. Everything in
  `lib/` is private and can be refactored freely.
- If swapping a library (e.g., Zustand → Jotai), only the thin controller
  layer changes — presentational components stay untouched.

**Test:** Can you move this component to another project and it still works
with the same props? If not, it's not self-contained.

## 3. Not a cosmic horror

Don't make components so generic they become unmaintainable.

A **cosmic horror component** has:
- 15+ props handling every edge case
- Conditional rendering for 5+ variants
- A file so long nobody dares touch it

**Prevention:**
- 3-5 props is the sweet spot. 7+ is a warning sign.
- If a feature doesn't fit, build a new component instead of adding another
  prop to the existing one.
- Hardcode what you can. Configuration arrays > boolean props > string props.

**Test:** If someone asks for one more feature, would you add a prop or
build a new component? The answer should be "new component" at least half
the time.

## Origin

Adapted from Matt Pocock's engineering principles and the deep-module
philosophy from *A Philosophy of Software Design* (John Ousterhout).
