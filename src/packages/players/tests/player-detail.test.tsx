/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { PlayerDetail } from "../lib/player-detail";
import { mockPlayers } from "../lib/mock-data";
import type { PlayerSession, ScoreChange } from "../lib/types";

function createWrapper() {
  const queryClient = new QueryClient();
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

const defaultPlayer = mockPlayers[0]; // RiverKing — flagged

const defaultSessions: PlayerSession[] = [
  {
    tableId: "1",
    tableName: "High Stakes",
    gameType: "Texas Hold'em",
    handsPlayed: 100,
    buyIn: 1000,
    netResult: 500,
    startedAt: "2026-07-22T14:00:00Z",
    endedAt: "2026-07-22T18:00:00Z",
  },
];

const defaultScoreChanges: ScoreChange[] = [
  {
    timestamp: "2026-07-22T14:00:00Z",
    previousScore: 80,
    newScore: 85,
    reason: "Alert triggered",
  },
];

describe("PlayerDetail", () => {
  it("renders player alias, score, and status", () => {
    render(
      <PlayerDetail
        player={defaultPlayer}
        sessions={[]}
        scoreChanges={[]}
        onFlagToggle={() => {}}
        onScoreAdjust={() => {}}
      />,
      { wrapper: createWrapper() },
    );

    expect(screen.getByText("RiverKing")).toBeInTheDocument();
    expect(screen.getByText("Flagged")).toBeInTheDocument();
  });

  it("shows alert section with alert count", () => {
    render(
      <PlayerDetail
        player={defaultPlayer}
        sessions={[]}
        scoreChanges={[]}
        onFlagToggle={() => {}}
        onScoreAdjust={() => {}}
      />,
      { wrapper: createWrapper() },
    );

    // RiverKing (p1) has 3 alerts in seed data — "(3)" is in a span
    expect(screen.getByText("(3)")).toBeInTheDocument();
  });

  it("shows session history with table name", () => {
    render(
      <PlayerDetail
        player={defaultPlayer}
        sessions={defaultSessions}
        scoreChanges={[]}
        onFlagToggle={() => {}}
        onScoreAdjust={() => {}}
      />,
      { wrapper: createWrapper() },
    );

    expect(screen.getByText("High Stakes")).toBeInTheDocument();
    expect(screen.getByText("+$500")).toBeInTheDocument();
  });

  it("shows score timeline entries", () => {
    render(
      <PlayerDetail
        player={defaultPlayer}
        sessions={[]}
        scoreChanges={defaultScoreChanges}
        onFlagToggle={() => {}}
        onScoreAdjust={() => {}}
      />,
      { wrapper: createWrapper() },
    );

    expect(screen.getByText("Alert triggered")).toBeInTheDocument();
  });

  it("shows 'Clear' badge for unflagged player", () => {
    const unflaggedPlayer = { ...defaultPlayer, isFlagged: false };
    render(
      <PlayerDetail
        player={unflaggedPlayer}
        sessions={[]}
        scoreChanges={[]}
        onFlagToggle={() => {}}
        onScoreAdjust={() => {}}
      />,
      { wrapper: createWrapper() },
    );

    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("calls onFlagToggle when flag button clicked", async () => {
    const onFlagToggle = vi.fn();
    const user = userEvent.setup();
    render(
      <PlayerDetail
        player={defaultPlayer}
        sessions={[]}
        scoreChanges={[]}
        onFlagToggle={onFlagToggle}
        onScoreAdjust={() => {}}
      />,
      { wrapper: createWrapper() },
    );

    await user.click(screen.getByText("Clear Flag"));
    expect(onFlagToggle).toHaveBeenCalledWith("p1");
  });

  it("calls onScoreAdjust when score buttons clicked", async () => {
    const onScoreAdjust = vi.fn();
    const user = userEvent.setup();
    render(
      <PlayerDetail
        player={defaultPlayer}
        sessions={[]}
        scoreChanges={[]}
        onFlagToggle={() => {}}
        onScoreAdjust={onScoreAdjust}
      />,
      { wrapper: createWrapper() },
    );

    const buttons = screen.getAllByRole("button").filter(
      (b) =>
        b.innerHTML.includes("lucide-minus") ||
        b.innerHTML.includes("lucide-plus"),
    );
    await user.click(buttons[0]);
    await user.click(buttons[1]);
    expect(onScoreAdjust).toHaveBeenCalledTimes(2);
  });

  it("shows empty states when no data", () => {
    // BluffMaster (p2) has no alerts in seed data
    const noAlertPlayer = mockPlayers[1];
    render(
      <PlayerDetail
        player={noAlertPlayer}
        sessions={[]}
        scoreChanges={[]}
        onFlagToggle={() => {}}
        onScoreAdjust={() => {}}
      />,
      { wrapper: createWrapper() },
    );

    expect(screen.getByText("No alerts.")).toBeInTheDocument();
    expect(screen.getByText("No session data.")).toBeInTheDocument();
    expect(screen.getByText("No score changes recorded.")).toBeInTheDocument();
  });
});
