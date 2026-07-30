import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import ContactTable from "../components/ContactTable";
import type { Contact } from "../types/contact";

// -----------------------------
// Mock hooks
// -----------------------------
vi.mock("../hooks/useCreateContact", () => ({
  useCreateContact: () => ({
    mutate: vi.fn(),
  }),
}));

vi.mock("../hooks/useUpdateContact", () => ({
  useUpdateContact: () => ({
    mutate: vi.fn(),
  }),
}));

vi.mock("../hooks/useDeleteContact", () => ({
  useDeleteContact: () => ({
    mutate: vi.fn(),
  }),
}));

// -----------------------------
// Mock dialogs
// -----------------------------
vi.mock("../components/CreateContactDialog", () => ({
  default: () => <button>Create Contact</button>,
}));

vi.mock("../components/EditContactDialog", () => ({
  default: () => null,
}));

const contacts: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "9999999999",
    company: "Google",
    status: "Active",
    tags: [],
  },
];

describe("ContactTable", () => {
  it("renders contact information", () => {
    render(<ContactTable data={contacts} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<ContactTable data={contacts} />);

    expect(
      screen.getByRole("button", { name: /create contact/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /export/i })).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /columns/i }),
    ).toBeInTheDocument();
  });

  it("shows empty state when no contacts exist", () => {
    render(<ContactTable data={[]} />);

    expect(screen.getByText(/no contacts found/i)).toBeInTheDocument();
  });
});
