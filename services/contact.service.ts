import { api } from "@/lib/api";
import { Contact } from "@/types/contact";

export const contactService = {
  async getContacts(): Promise<Contact[]> {
    const response = await api.get<Contact[]>("/contacts");
    return response.data;
  },
};