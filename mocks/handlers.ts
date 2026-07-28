import { http, HttpResponse } from "msw";


import { contacts } from "./data/contacts";

export const handlers = [
  http.get("/api/contacts", () => {
    return HttpResponse.json(contacts);
  }),

  http.get("/api/contacts/:id", ({ params }) => {
    const contact = contacts.find((c) => c.id === params.id);

    if (!contact) {
      return new HttpResponse("Contact not found", {
        status: 404,
      });
    }

    return HttpResponse.json(contact);
  }),
];