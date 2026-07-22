/// <reference types="vitest" />
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DashboardShell } from "../index";

describe("DashboardShell", () => {
  it("renders the sidebar with navigation links", () => {
    render(
      <DashboardShell user={{ name: "Yuri" }} onLogout={async () => {}}>
        <div>content</div>
      </DashboardShell>,
    );

    expect(screen.getByRole("link", { name: /tables/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /players/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /alerts/i })).toBeInTheDocument();
  });

  it("shows the user name in the header", () => {
    render(
      <DashboardShell user={{ name: "Yuri" }} onLogout={async () => {}}>
        <div>content</div>
      </DashboardShell>,
    );

    expect(screen.getByText("Yuri")).toBeInTheDocument();
  });

  it("renders children in the content area", () => {
    render(
      <DashboardShell user={{ name: "Yuri" }} onLogout={async () => {}}>
        <div>Welcome to the dashboard</div>
      </DashboardShell>,
    );

    expect(screen.getByText("Welcome to the dashboard")).toBeInTheDocument();
  });

  it("calls onLogout when logout button is clicked", async () => {
    const user = userEvent.setup();
    const onLogout = vi.fn(async () => {});

    render(
      <DashboardShell user={{ name: "Yuri" }} onLogout={onLogout}>
        <div>content</div>
      </DashboardShell>,
    );

    await user.click(screen.getByRole("button", { name: /log out/i }));
    expect(onLogout).toHaveBeenCalledOnce();
  });

  it("applies active state to the current nav link", () => {
    render(
      <DashboardShell
        user={{ name: "Yuri" }}
        onLogout={async () => {}}
        currentPath="/players"
      >
        <div>content</div>
      </DashboardShell>,
    );

    const playersLink = screen.getByRole("link", { name: /players/i });
    expect(playersLink).toHaveAttribute("data-active", "true");
  });
});
