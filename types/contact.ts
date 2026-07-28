export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  tags: string[];
  status: "Active" | "Inactive";
}