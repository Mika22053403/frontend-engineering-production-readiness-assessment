import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ContactTable } from "@/features/contacts/components/contact-table";
import { columns } from "@/features/contacts/table/columns";

jest.mock("@/lib/export-contacts", () => ({
  exportContacts: jest.fn(),
}));

const queryClient = new QueryClient();

const contacts = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@test.com",
    phone: "9999999999",
    company: "Google",
    status: "Active" as const,
    tags: ["VIP"],
  },
  {
    id: "2",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@test.com",
    phone: "8888888888",
    company: "Microsoft",
    status: "Inactive" as const,
    tags: ["Lead"],
  },
];

describe("Contact Search", () => {
  it("filters contacts by first name", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ContactTable data={contacts} columns={columns} />
      </QueryClientProvider>,
    );

    const input = screen.getByLabelText("Search contacts by first name");

    fireEvent.change(input, {
      target: {
        value: "John",
      },
    });

    expect(screen.getByText("John")).toBeInTheDocument();

    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
  });
});
