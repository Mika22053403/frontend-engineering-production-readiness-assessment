import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CreateContactDialog from "../components/CreateContactDialog";

describe("CreateContactDialog", () => {
  it("renders Add Contact button", () => {
    render(<CreateContactDialog onCreate={vi.fn()} />);

    expect(
      screen.getByRole("button", {
        name: /add contact/i,
      }),
    ).toBeInTheDocument();
  });

  it("opens dialog when button is clicked", async () => {
    const user = userEvent.setup();

    render(<CreateContactDialog onCreate={vi.fn()} />);

    await user.click(
      screen.getByRole("button", {
        name: /add contact/i,
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: /create contact/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders all form inputs", async () => {
    const user = userEvent.setup();

    render(<CreateContactDialog onCreate={vi.fn()} />);

    await user.click(
      screen.getByRole("button", {
        name: /add contact/i,
      }),
    );

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/phone/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/company/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /save contact/i,
      }),
    ).toBeInTheDocument();
  });

  it("submits the form", async () => {
    const user = userEvent.setup();

    const onCreate = vi.fn();

    render(<CreateContactDialog onCreate={onCreate} />);

    await user.click(
      screen.getByRole("button", {
        name: /add contact/i,
      }),
    );

    await user.type(screen.getByPlaceholderText(/name/i), "John Doe");

    await user.type(screen.getByPlaceholderText(/email/i), "john@test.com");

    await user.type(screen.getByPlaceholderText(/phone/i), "9999999999");

    await user.type(screen.getByPlaceholderText(/company/i), "Google");

    await user.click(
      screen.getByRole("button", {
        name: /save contact/i,
      }),
    );

    expect(onCreate).toHaveBeenCalledTimes(1);
  });
});
