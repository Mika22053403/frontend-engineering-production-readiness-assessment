import { http, HttpResponse } from "msw";
import { contacts } from "../data/contacts";

export const contactHandlers = [
  http.get("/api/contacts", () => {
    return HttpResponse.json(contacts);
  }),
];