import { Contact } from "@/types/contact";

export const contacts: Contact[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "9876543210",
    company: "Google",
    tags: ["Customer", "VIP"],
    status: "Active",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phone: "9876543211",
    company: "Microsoft",
    tags: ["Lead"],
    status: "Inactive",
  },
  {
    id: "3",
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex@example.com",
    phone: "9876543212",
    company: "Amazon",
    tags: ["Enterprise", "Customer"],
    status: "Active",
  },
];