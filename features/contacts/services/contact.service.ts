import { api } from "@/lib/api";
import { Contact } from "@/types/contact";

export interface CreateContactInput {
  firstName: string;
  lastName: string;
  email: string;
}

export const contactService = {
  async getContacts(): Promise<Contact[]> {
    const response = await api.get<Contact[]>("/contacts");
    return response.data;
  },

  async createContact(data: CreateContactInput) {
    const response = await api.post("/contacts", data);
    return response.data;
  },
};