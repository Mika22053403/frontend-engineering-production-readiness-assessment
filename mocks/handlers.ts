import { http, HttpResponse } from "msw";
import { contacts } from "./data/contacts";

export const handlers = [
  // Get all contacts
  http.get("/api/contacts", () => {
    return HttpResponse.json(contacts);
  }),

  // Get one contact
  http.get("/api/contacts/:id", ({ params }) => {
    const contact = contacts.find((c) => c.id === params.id);

    if (!contact) {
      return HttpResponse.json(
        { message: "Contact not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json(contact);
  }),

  // Create contact
  http.post("/api/contacts", async ({ request }) => {
    const body = (await request.json()) as Omit<
      (typeof contacts)[number],
      "id"
    >;

    const newContact = {
      ...body,
      id: crypto.randomUUID(),
    };

    contacts.push(newContact);

    return HttpResponse.json(newContact, {
      status: 201,
    });
  }),

  // Update contact
  http.put("/api/contacts/:id", async ({ params, request }) => {
    const updated = await request.json();

    const index = contacts.findIndex(
      (c) => c.id === params.id
    );

    if (index === -1) {
      return HttpResponse.json(
        { message: "Contact not found" },
        { status: 404 }
      );
    }

    contacts[index] = {
      ...contacts[index],
      ...(updated as object),
    };

    return HttpResponse.json(contacts[index]);
  }),

  // Delete contact
  http.delete("/api/contacts/:id", ({ params }) => {
    const index = contacts.findIndex(
      (c) => c.id === params.id
    );

    if (index === -1) {
      return HttpResponse.json(
        { message: "Contact not found" },
        { status: 404 }
      );
    }

    contacts.splice(index, 1);

    return new HttpResponse(null, {
      status: 204,
    });
  }),
];