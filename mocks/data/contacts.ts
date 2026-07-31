export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  tags: string[];
  status: "Active" | "Inactive";
}

export const contacts: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    company: "Google",
    tags: ["VIP"],
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "9123456789",
    company: "Microsoft",
    tags: ["Lead"],
    status: "Inactive",
  },
];