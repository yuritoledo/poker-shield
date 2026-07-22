// Tests import through the ENTRY POINT (../index), not into lib/ directly.
// This is the deep-module way: test public behavior, not internals.
import { greet } from "../index";
import { describe, it, expect } from "vitest";

describe("greet", () => {
  it("returns a greeting with the given name", () => {
    expect(greet("World")).toBe("Hello, World!");
  });
});
