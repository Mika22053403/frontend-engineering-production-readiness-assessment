import { setupServer } from "msw/node";
import { authHandlers } from "./handlers/auth";
import { contactHandlers } from "./handlers/contact";

export const server = setupServer(
  ...authHandlers,
  ...contactHandlers,
);