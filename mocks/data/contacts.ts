import type { Contact } from "@/types/contact";

export const contacts: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    company: "Google",
    tags: ["VIP", "Lead"],
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "9123456789",
    company: "Microsoft",
    tags: ["Customer"],
    status: "Inactive",
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "9988776655",
    company: "Amazon",
    tags: ["Lead"],
    status: "Active",
  },
];