import { describe, it, expect } from "vitest";
import { fromPartial } from "@total-typescript/shoehorn";
import { requireAccess } from "../index";
import type { Session } from "../index";

describe("requireAccess", () => {
  it("blocks unauthenticated users", () => {
    const result = requireAccess(undefined, ["admin", "operator", "viewer"]);

    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("unauthenticated");
  });

  it("allows users with required role", () => {
    const session = fromPartial<Session>({
      user: {
        role: "admin",
      },
    });

    const result = requireAccess(session, ["admin"]);

    expect(result.allowed).toBe(true);
  });

  it("blocks users without required role", () => {
    const session = fromPartial<Session>({
      user: {
        role: "viewer",
      },
    });

    const result = requireAccess(session, ["admin", "operator"]);

    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("insufficient-role");
  });
});
