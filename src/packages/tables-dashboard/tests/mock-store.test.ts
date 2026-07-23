import { getTables, toggleTable, subscribe, resetStore } from "../lib/mock-store";

describe("mock-store", () => {
  beforeEach(() => {
    resetStore();
  });

  it("getTables returns an array", () => {
    const tables = getTables();
    expect(Array.isArray(tables)).toBe(true);
  });

  it("toggleTable flips active to inactive", () => {
    const table = getTables().find((t) => t.status === "active")!;
    toggleTable(table.id);
    const updated = getTables().find((t) => t.id === table.id)!;
    expect(updated.status).toBe("inactive");
  });

  it("toggleTable flips inactive to active", () => {
    const table = getTables().find((t) => t.status === "inactive")!;
    toggleTable(table.id);
    const updated = getTables().find((t) => t.id === table.id)!;
    expect(updated.status).toBe("active");
  });

  it("notifies subscribers on toggle", () => {
    let called = 0;
    const unsub = subscribe(() => { called++; });
    const table = getTables().find((t) => t.status === "active")!;
    toggleTable(table.id);
    expect(called).toBe(1);
    unsub();
  });

  it("unsubscribe stops notifications", () => {
    let called = 0;
    const unsub = subscribe(() => { called++; });
    unsub();
    const table = getTables().find((t) => t.status === "active")!;
    toggleTable(table.id);
    expect(called).toBe(0);
  });
});
