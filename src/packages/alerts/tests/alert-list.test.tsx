/// <reference types="vitest" />
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AlertList } from "../lib/alert-list";
import type { PlayerAlert } from "../lib/types";

const makeAlert = (
  overrides: Partial<PlayerAlert> = {},
): PlayerAlert => ({
  id: "test-1",
  type: "bot-detected",
  severity: "high",
  description: "Suspicious betting pattern detected across 47 hands",
  createdAt: "2026-07-22T14:25:00Z",
  ...overrides,
});

describe("AlertList", () => {
  it("renders nothing when alerts is empty", () => {
    const { container } = render(<AlertList alerts={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders alert type label", () => {
    render(<AlertList alerts={[makeAlert({ type: "collusion" })]} />);
    expect(screen.getByText("Collusion")).toBeInTheDocument();
  });

  it("renders alert description", () => {
    render(
      <AlertList
        alerts={[
          makeAlert({ description: "Unusual check-raise pattern with player p6" }),
        ]}
      />,
    );
    expect(
      screen.getByText("Unusual check-raise pattern with player p6"),
    ).toBeInTheDocument();
  });

  it("renders severity labels for different severities", () => {
    render(
      <div>
        <AlertList
          alerts={[makeAlert({ id: "a", severity: "critical" })]}
        />
        <AlertList
          alerts={[makeAlert({ id: "b", severity: "high" })]}
        />
        <AlertList
          alerts={[makeAlert({ id: "c", severity: "medium" })]}
        />
        <AlertList
          alerts={[makeAlert({ id: "d", severity: "low" })]}
        />
      </div>,
    );
    expect(screen.getByText("Critical")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
  });

  it("limits visible alerts to max prop", () => {
    const alerts = [
      makeAlert({ id: "1", description: "Alert one" }),
      makeAlert({ id: "2", description: "Alert two" }),
      makeAlert({ id: "3", description: "Alert three" }),
    ];
    render(<AlertList alerts={alerts} max={2} />);
    expect(screen.getByText("Alert one")).toBeInTheDocument();
    expect(screen.getByText("Alert two")).toBeInTheDocument();
    expect(screen.queryByText("Alert three")).not.toBeInTheDocument();
  });

  it("renders all alerts when max is not set", () => {
    const alerts = [
      makeAlert({ id: "1", description: "Alert one" }),
      makeAlert({ id: "2", description: "Alert two" }),
    ];
    render(<AlertList alerts={alerts} />);
    expect(screen.getByText("Alert one")).toBeInTheDocument();
    expect(screen.getByText("Alert two")).toBeInTheDocument();
  });

  it("renders date in readable format", () => {
    render(
      <AlertList alerts={[makeAlert({ createdAt: "2026-07-22T14:25:00Z" })]} />,
    );
    // Should contain "Jul" and "22" in the formatted date
    expect(screen.getByText(/Jul/i)).toBeInTheDocument();
  });

  it("renders all alert type labels", () => {
    render(
      <div>
        <AlertList
          alerts={[
            makeAlert({ id: "1", type: "bot-detected" }),
            makeAlert({ id: "2", type: "multi-accounting" }),
            makeAlert({ id: "3", type: "collusion" }),
            makeAlert({ id: "4", type: "pattern-deviance" }),
            makeAlert({ id: "5", type: "manual" }),
          ]}
        />
      </div>,
    );
    expect(screen.getByText("Bot Detected")).toBeInTheDocument();
    expect(screen.getByText("Multi-Accounting")).toBeInTheDocument();
    expect(screen.getByText("Collusion")).toBeInTheDocument();
    expect(screen.getByText("Pattern Deviance")).toBeInTheDocument();
    expect(screen.getByText("Manual Report")).toBeInTheDocument();
  });
});
