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
  tags: [],
  status: "Active",
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

    contacts[index] = body;

    return HttpResponse.json(body);
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