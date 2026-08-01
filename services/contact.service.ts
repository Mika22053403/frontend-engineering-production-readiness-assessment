import { api } from "@/lib/api";
import { Contact } from "@/types/contact";

export const contactService = {
  async getContacts(): Promise<Contact[]> {
    const response = await api.get<Contact[]>("/contacts");
    return response.data;
  },

  async createContact(
    data: Pick<Contact, "firstName" | "lastName" | "email">
  ) {
    const response = await api.post("/contacts", data);
    return response.data;
  },

  async updateContact(contact: Contact) {
    const response = await api.put(
      `/contacts/${contact.id}`,
      contact
    );

    return response.data;
  },
};