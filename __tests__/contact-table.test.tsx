import { render, screen } from "@testing-library/react";

import { ContactTable } from "@/features/contacts/components/contact-table";
import { columns } from "@/features/contacts/table/columns";
import { Contact } from "@/types/contact";

// Mock export utility
jest.mock("@/lib/export-contacts", () => ({
  exportContacts: jest.fn(),
}));

// Mock bulk delete mutation
jest.mock("@/features/contacts/mutations/useBulkDeleteContacts", () => ({
  useBulkDeleteContacts: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

// Mock dialogs that internally use React Query
jest.mock("@/features/contacts/components/edit-contact-dialog", () => {
  function MockEditContactDialog() {
    return <button>Edit</button>;
  }

  return MockEditContactDialog;
});

jest.mock("@/features/contacts/components/delete-contact-dialog", () => {
  function MockDeleteContactDialog() {
    return <button>Delete</button>;
  }

  return MockDeleteContactDialog;
});

const contacts: Contact[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "9999999999",
    company: "OpenAI",
    status: "Active",
    tags: ["VIP"],
  },
];

describe("ContactTable", () => {
  it("renders contact data", () => {
    render(<ContactTable columns={[...columns]} data={contacts} />);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });
});
