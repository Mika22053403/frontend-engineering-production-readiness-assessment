import { test, expect } from "@playwright/test";

test("user can login", async ({ page }) => {
  await page.goto("/login");

  await page.getByRole("button", {
    name: /login/i,
  }).click();

  // User should be redirected to Contacts
  await expect(page).toHaveURL("/contacts");

  // Verify Contacts page loaded
  await expect(
    page.getByRole("button", {
      name: /create contact/i,
    }),
  ).toBeVisible();
});