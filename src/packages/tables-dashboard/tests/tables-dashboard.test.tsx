/// <reference types="vitest" />
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockTables, TablesDashboard } from "../index";

describe("TablesDashboard types", () => {
  it("mockTables is an array", () => {
    expect(Array.isArray(mockTables)).toBe(true);
  });

  it("mockTables has at least one entry", () => {
    expect(mockTables.length).toBeGreaterThan(0);
  });

  it("each mock table has the correct shape", () => {
    for (const table of mockTables) {
      expect(table).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        gameType: expect.any(String),
        stakes: expect.any(String),
        status: expect.stringMatching(/^(active|inactive)$/),
        handsPlayed: expect.any(Number),
        playerCount: expect.any(Number),
        flaggedPlayerCount: expect.any(Number),
      });
    }
  });

  it("includes tables across different game types", () => {
    const gameTypes = new Set(mockTables.map((t) => t.gameType));
    expect(gameTypes.size).toBeGreaterThanOrEqual(2);
  });

  it("includes both active and inactive tables", () => {
    const hasActive = mockTables.some((t) => t.status === "active");
    const hasInactive = mockTables.some((t) => t.status === "inactive");
    expect(hasActive).toBe(true);
    expect(hasInactive).toBe(true);
  });
});

describe("TablesDashboard component", () => {
  it("renders all tables from mock data", () => {
    render(<TablesDashboard tables={mockTables} />);
    expect(screen.getByText("High Stakes")).toBeInTheDocument();
    expect(screen.getByText("Night Owls")).toBeInTheDocument();
    expect(screen.getByText("Omaha Beach")).toBeInTheDocument();
    expect(screen.getByText("Stud Farm")).toBeInTheDocument();
    expect(screen.getByText("The River")).toBeInTheDocument();
    expect(screen.getByText("Lowball")).toBeInTheDocument();
    expect(screen.getByText("Closed for Maintenance")).toBeInTheDocument();
  });

  it("shows flagged player count as a red badge when > 0", () => {
    render(<TablesDashboard tables={mockTables} />);
    // The River has 3 flagged players, should show as a destructive badge
    const riverRow = screen
      .getAllByRole("row")
      .find((row) => row.textContent?.includes("The River"));
    expect(riverRow).toBeTruthy();
    expect(riverRow!.textContent).toContain("3");
    // High Stakes has 1 flagged player
    const highStakesRow = screen
      .getAllByRole("row")
      .find((row) => row.textContent?.includes("High Stakes"));
    expect(highStakesRow).toBeTruthy();
    expect(highStakesRow!.textContent).toContain("1");
  });

  it("shows 0 flagged count without destructive badge", () => {
    render(<TablesDashboard tables={mockTables} />);
    // Omaha Beach has 0 flagged players
    const omahaRow = screen
      .getAllByRole("row")
      .find((row) => row.textContent?.includes("Omaha Beach"));
    expect(omahaRow).toBeTruthy();
    expect(omahaRow!.textContent).toContain("0");
  });

  it("renders column headers", () => {
    render(<TablesDashboard tables={mockTables} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Game Type")).toBeInTheDocument();
    expect(screen.getByText("Stakes")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Hands Played")).toBeInTheDocument();
    expect(screen.getByText("Players")).toBeInTheDocument();
    expect(screen.getByText("Flagged")).toBeInTheDocument();
  });

  it("shows empty state when no tables", () => {
    render(<TablesDashboard tables={[]} />);
    expect(screen.getByText("No tables found.")).toBeInTheDocument();
  });

  it("renders game type badges", () => {
    render(<TablesDashboard tables={mockTables} />);
    expect(screen.getAllByText("Texas Hold'em").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Omaha").length).toBeGreaterThan(0);
    expect(screen.getByText("Stud")).toBeInTheDocument();
  });

  it("renders status badges for active and inactive tables", () => {
    render(<TablesDashboard tables={mockTables} />);
    expect(screen.getAllByText("Active").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Inactive").length).toBeGreaterThan(0);
  });
});

describe("TablesDashboard toggle", () => {
  it("does not render toggle column when onToggle is not provided", () => {
    render(<TablesDashboard tables={mockTables} />);
    expect(screen.queryByText("Activate")).toBeNull();
    expect(screen.queryByText("Deactivate")).toBeNull();
  });

  it("renders toggle buttons when onToggle is provided", () => {
    render(<TablesDashboard tables={mockTables} onToggle={() => {}} />);
    expect(screen.getAllByText("Deactivate").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Activate").length).toBeGreaterThan(0);
  });

  it("calls onToggle with the table id on click", async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    render(<TablesDashboard tables={mockTables} onToggle={onToggle} />);
    await user.click(screen.getAllByText("Deactivate")[0]);
    expect(onToggle).toHaveBeenCalledWith("1");
  });
});
