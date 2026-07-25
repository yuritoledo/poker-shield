/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useAuthStore } from "@/packages/auth";
import type { Session } from "@/packages/auth";
import { fromPartial } from "@total-typescript/shoehorn";

const { mockReplace, mockPush } = vi.hoisted(() => ({
  mockReplace: vi.fn(),
  mockPush: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace, push: mockPush }),
  usePathname: () => "/tables",
}));

import DashboardLayout from "../layout";

describe("DashboardLayout auth guard", () => {
  beforeEach(() => {
    useAuthStore.setState({
      session: null,
      isLoading: false,
      error: null,
    });
    mockReplace.mockReset();
    mockPush.mockReset();
  });

  it("redirects to login when no session exists", () => {
    render(
      <DashboardLayout>
        <div>dashboard content</div>
      </DashboardLayout>,
    );

    expect(mockReplace).toHaveBeenCalledWith("/");
    expect(screen.queryByText("dashboard content")).not.toBeInTheDocument();
  });

  it("shows skeleton while auth is loading", () => {
    useAuthStore.setState({ session: null, isLoading: true });

    render(
      <DashboardLayout>
        <div>dashboard content</div>
      </DashboardLayout>,
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();
    expect(screen.queryByText("dashboard content")).not.toBeInTheDocument();
  });

  it("renders children when session exists", () => {
    const session = fromPartial<Session>({
      user: { name: "Yuri" },
    });
    useAuthStore.setState({ session, isLoading: false });

    render(
      <DashboardLayout>
        <div>dashboard content</div>
      </DashboardLayout>,
    );

    expect(screen.getByText("dashboard content")).toBeInTheDocument();
  });
});
