/// <reference types="vitest" />
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockPlayers, PlayersDirectory } from "../index";

describe("mockPlayers", () => {
  it("is an array", () => {
    expect(Array.isArray(mockPlayers)).toBe(true);
  });

  it("has at least one entry", () => {
    expect(mockPlayers.length).toBeGreaterThan(0);
  });

  it("each mock player has the correct shape", () => {
    for (const p of mockPlayers) {
      expect(p).toMatchObject({
        id: expect.any(String),
        alias: expect.any(String),
        tableId: expect.any(String),
        tableName: expect.any(String),
        handsPlayed: expect.any(Number),
        suspiciousScore: expect.any(Number),
        isFlagged: expect.any(Boolean),
        lastActive: expect.any(String),
      });
    }
  });

  it("includes both flagged and unflagged players", () => {
    const hasFlagged = mockPlayers.some((p) => p.isFlagged);
    const hasClear = mockPlayers.some((p) => !p.isFlagged);
    expect(hasFlagged).toBe(true);
    expect(hasClear).toBe(true);
  });
});

describe("PlayersDirectory component", () => {
  it("renders all players from mock data", () => {
    render(
      <PlayersDirectory
        players={mockPlayers}
        onFlagToggle={() => {}}
        onScoreAdjust={() => {}}
      />,
    );
    expect(screen.getByText("RiverKing")).toBeInTheDocument();
    expect(screen.getByText("BluffMaster")).toBeInTheDocument();
    expect(screen.getByText("LuckyDog")).toBeInTheDocument();
  });

  it("renders column headers", () => {
    render(
      <PlayersDirectory
        players={mockPlayers}
        onFlagToggle={() => {}}
        onScoreAdjust={() => {}}
      />,
    );
    expect(screen.getByText("Alias")).toBeInTheDocument();
    expect(screen.getByText("Table")).toBeInTheDocument();
    expect(screen.getByText("Hands")).toBeInTheDocument();
    expect(screen.getByText("Score")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Last Active")).toBeInTheDocument();
  });

  it("shows flagged badge for flagged players", () => {
    render(
      <PlayersDirectory
        players={mockPlayers}
        onFlagToggle={() => {}}
        onScoreAdjust={() => {}}
      />,
    );
    const flaggedBadges = screen.getAllByText("Flagged");
    // RiverKing (p1), OmahaShark (p5), Chatterbox (p7), QuickClick (p9)
    expect(flaggedBadges.length).toBe(4);
  });

  it("shows 'Clear' for unflagged players", () => {
    render(
      <PlayersDirectory
        players={mockPlayers}
        onFlagToggle={() => {}}
        onScoreAdjust={() => {}}
      />,
    );
    const clearLabels = screen.getAllByText("Clear");
    expect(clearLabels.length).toBeGreaterThan(0);
  });

  it("shows empty state when no players", () => {
    render(
      <PlayersDirectory
        players={[]}
        onFlagToggle={() => {}}
        onScoreAdjust={() => {}}
      />,
    );
    expect(screen.getByText("No players match your filters.")).toBeInTheDocument();
  });
});

describe("PlayersDirectory expanded row", () => {
  it("expands row on click revealing actions", async () => {
    const user = userEvent.setup();
    render(
      <PlayersDirectory
        players={mockPlayers}
        onFlagToggle={() => {}}
        onScoreAdjust={() => {}}
      />,
    );
    // BluffMaster is not flagged, so shows "Flag as Suspicious"
    await user.click(screen.getByText("BluffMaster"));
    expect(screen.getByText("Flag as Suspicious")).toBeInTheDocument();
  });

  it("shows Clear Flag button for already flagged player", async () => {
    const user = userEvent.setup();
    render(
      <PlayersDirectory
        players={mockPlayers}
        onFlagToggle={() => {}}
        onScoreAdjust={() => {}}
      />,
    );
    await user.click(screen.getByText("RiverKing"));
    expect(screen.getByText("Clear Flag")).toBeInTheDocument();
  });

  it("shows alerts section for players with alerts", async () => {
    const user = userEvent.setup();
    render(
      <PlayersDirectory
        players={mockPlayers}
        onFlagToggle={() => {}}
        onScoreAdjust={() => {}}
      />,
    );
    await user.click(screen.getByText("RiverKing"));
    expect(screen.getByText("Recent Alerts")).toBeInTheDocument();
    expect(screen.getByText("Bot Detected")).toBeInTheDocument();
  });

  it("calls onFlagToggle when flag button clicked", async () => {
    const onFlagToggle = vi.fn();
    const user = userEvent.setup();
    render(
      <PlayersDirectory
        players={mockPlayers}
        onFlagToggle={onFlagToggle}
        onScoreAdjust={() => {}}
      />,
    );
    await user.click(screen.getByText("RiverKing"));
    await user.click(screen.getByText("Clear Flag"));
    expect(onFlagToggle).toHaveBeenCalledWith("p1");
  });

  it("calls onScoreAdjust when score buttons clicked", async () => {
    const onScoreAdjust = vi.fn();
    const user = userEvent.setup();
    render(
      <PlayersDirectory
        players={mockPlayers}
        onFlagToggle={() => {}}
        onScoreAdjust={onScoreAdjust}
      />,
    );
    await user.click(screen.getByText("RiverKing"));

    const minusButtons = screen.getAllByRole("button");
    const minusBtn = minusButtons.find(
      (b) => b.innerHTML.includes("Minus") || b.querySelector('[class*="lucide-minus"]'),
    );
    // Click the first +/- button (they're grouped by Score label)
    const scoreButtons = screen.getAllByRole("button").filter(
      (b) =>
        b.innerHTML.includes("lucide-minus") || b.innerHTML.includes("lucide-plus"),
    );
    await user.click(scoreButtons[0]);
    await user.click(scoreButtons[1]);
    expect(onScoreAdjust).toHaveBeenCalledTimes(2);
  });
});
