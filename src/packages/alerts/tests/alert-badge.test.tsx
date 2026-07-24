/// <reference types="vitest" />
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AlertBadge } from "../lib/alert-badge";
import type { PlayerAlert } from "../lib/types";

const makeAlert = (
  overrides: Partial<PlayerAlert> = {},
): PlayerAlert => ({
  id: "test-1",
  type: "bot-detected",
  severity: "high",
  description: "Test alert",
  createdAt: "2026-07-22T14:25:00Z",
  ...overrides,
});

describe("AlertBadge", () => {
  it("renders nothing when alerts is empty", () => {
    const { container } = render(<AlertBadge alerts={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders alert count for a single alert", () => {
    render(<AlertBadge alerts={[makeAlert()]} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders alert count for multiple alerts", () => {
    render(
      <AlertBadge
        alerts={[
          makeAlert({ id: "1" }),
          makeAlert({ id: "2" }),
          makeAlert({ id: "3" }),
        ]}
      />,
    );
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("uses destructive styling for critical severity", () => {
    render(<AlertBadge alerts={[makeAlert({ severity: "critical" })]} />);
    const badge = screen.getByText("1");
    expect(badge.className).toContain("destructive");
  });

  it("uses destructive styling for high severity", () => {
    render(<AlertBadge alerts={[makeAlert({ severity: "high" })]} />);
    const badge = screen.getByText("1");
    expect(badge.className).toContain("destructive");
  });

  it("uses secondary styling for medium severity", () => {
    render(<AlertBadge alerts={[makeAlert({ severity: "medium" })]} />);
    const badge = screen.getByText("1");
    expect(badge.className).toContain("secondary");
  });

  it("uses default styling for low severity", () => {
    render(<AlertBadge alerts={[makeAlert({ severity: "low" })]} />);
    const badge = screen.getByText("1");
    // Low severity uses "outline" variant which produces "border-border"
    expect(badge.className).toContain("border-border");
  });
});
