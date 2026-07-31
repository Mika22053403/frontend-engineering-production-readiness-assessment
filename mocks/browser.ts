import { setupWorker } from "msw/browser";
import { authHandlers } from "./handlers/auth";
import { contactHandlers } from "./handlers/contact";

export const worker = setupWorker(
  ...authHandlers,
  ...contactHandlers,
);