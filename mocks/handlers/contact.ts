import { http, HttpResponse } from "msw";

import type { Contact } from "@/types/contact";

import { contacts } from "../data/contacts";

export const contactHandlers = [
  // Get all contacts
  http.get("/api/contacts", () => {
    return HttpResponse.json(contacts);
  }),

  // Create contact
  http.post("/api/contacts", async ({ request }) => {
    const body = (await request.json()) as Pick<
      Contact,
      "firstName" | "lastName" | "email"
    >;

    const newContact: Contact = {
      id: String(contacts.length + 1),
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: "",
      company: "",
      status: "Active",
    };

    contacts.push(newContact);

    return HttpResponse.json(newContact, {
      status: 201,
    });
  }),

  // Update contact
  http.put("/api/contacts/:id", async ({ params, request }) => {
    const { id } = params;

    const body = (await request.json()) as Contact;

    const index = contacts.findIndex((contact) => contact.id === id);

    if (index === -1) {
      return HttpResponse.json(
        {
          message: "Contact not found",
        },
        {
          status: 404,
        },
      );
    }

    contacts[index] = body;

    return HttpResponse.json(body);
  }),
];