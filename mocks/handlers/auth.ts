import { http, HttpResponse } from "msw";

export const authHandlers = [
  http.post("/api/login", async () => {
    return HttpResponse.json({
      token: "campaignhq-token",
      user: {
        id: "1",
        name: "Admin User",
        email: "admin@campaignhq.com",
      },
    });
  }),
];