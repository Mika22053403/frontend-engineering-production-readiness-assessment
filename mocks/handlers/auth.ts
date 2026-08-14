import { http, HttpResponse } from "msw";

interface SignupRequestBody {
  workEmail?: string;
  password?: string;
  companyName?: string;
}

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

  http.post("/api/signup", async ({ request }) => {
    const body = (await request.json()) as SignupRequestBody;

    return HttpResponse.json({
      token: "campaignhq-token",
      user: {
        id: "2",
        name: body.companyName ?? "New Workspace",
        email: body.workEmail ?? "new.user@campaignhq.com",
      },
    });
  }),
];
