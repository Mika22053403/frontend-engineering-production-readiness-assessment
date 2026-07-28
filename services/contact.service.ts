import { api } from "@/lib/api";
import type { Contact } from "@/types/contact";

export const contactService = {
  async getContacts(): Promise<Contact[]> {
    const response = await api.get("/contacts");
    return response.data;
  },

  async getContact(id: string): Promise<Contact> {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },
};