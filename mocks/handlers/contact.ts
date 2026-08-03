import { http, HttpResponse } from "msw";

import type { Contact } from "@/types/contact";

import { contacts } from "../data/contacts";

export const contactHandlers = [
  // GET all contacts
  http.get("/api/contacts", () => {
    return HttpResponse.json(contacts);
  }),

  // CREATE contact
  http.post("/api/contacts", async ({ request }) => {
    const body = (await request.json()) as Omit<Contact, "id">;

    const newContact: Contact = {
      id: crypto.randomUUID(),

      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      company: body.company,
      tags: body.tags,
      status: body.status,
    };

    contacts.push(newContact);

    return HttpResponse.json(newContact, {
      status: 201,
    });
  }),

  // UPDATE contact
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

    contacts[index] = {
      ...contacts[index],
      ...body,
      id: contacts[index].id,
    };

    return HttpResponse.json(contacts[index]);
  }),

  // DELETE contact
  http.delete("/api/contacts/:id", ({ params }) => {
    const { id } = params;

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

    contacts.splice(index, 1);

    return new HttpResponse(null, {
      status: 204,
    });
  }),
];