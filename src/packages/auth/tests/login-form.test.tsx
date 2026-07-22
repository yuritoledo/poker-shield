/// <reference types="vitest" />
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../index";

describe("LoginForm", () => {
  it("renders email and password fields", () => {
    render(<LoginForm onLogin={async () => {}} error={null} isLoading={false} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows error message when error is set", () => {
    render(
      <LoginForm
        onLogin={async () => {}}
        error="Invalid credentials"
        isLoading={false}
      />,
    );

    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it("does not show error when error is null", () => {
    render(<LoginForm onLogin={async () => {}} error={null} isLoading={false} />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("calls onLogin with email and password", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn(async () => {});

    render(<LoginForm onLogin={onLogin} error={null} isLoading={false} />);

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "secret123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(onLogin).toHaveBeenCalledWith("test@example.com", "secret123");
  });

  it("disables the button while loading", () => {
    render(<LoginForm onLogin={async () => {}} error={null} isLoading={true} />);

    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled();
  });

  it("does not call onLogin when already loading", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn(async () => {});

    render(<LoginForm onLogin={onLogin} error={null} isLoading={true} />);

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "secret123");
    await user.click(screen.getByRole("button", { name: /signing in/i }));

    expect(onLogin).not.toHaveBeenCalled();
  });
});
