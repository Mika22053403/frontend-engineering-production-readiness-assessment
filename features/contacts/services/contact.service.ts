import { api } from "@/lib/api";
import type { Contact } from "../types/contact";

export const contactService = {
  async getContacts() {
    const { data } = await api.get<Contact[]>("/contacts");
    return data;
  },

  async getContact(id: string) {
    const { data } = await api.get<Contact>(
      `/contacts/${id}`
    );
    return data;
  },

  async createContact(
    contact: Omit<Contact, "id">
  ) {
    const { data } = await api.post<Contact>(
      "/contacts",
      contact
    );

    return data;
  },

  async updateContact(
    id: string,
    contact: Partial<Contact>
  ) {
    const { data } = await api.put<Contact>(
      `/contacts/${id}`,
      contact
    );

    return data;
  },

  async deleteContact(id: string) {
    await api.delete(`/contacts/${id}`);
  },
};