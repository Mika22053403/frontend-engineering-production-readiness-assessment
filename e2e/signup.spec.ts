import { test, expect } from "@playwright/test";

test("user can sign up", async ({ page }) => {
  await page.goto("/signup");

  await page.getByLabel(/work email/i).fill("jordan.lee@acme.com");
  await page.getByLabel(/^password$/i).fill("password123");
  await page.getByLabel(/company \/ workspace name/i).fill("Acme Inc");

  await page.getByRole("button", { name: /start free trial/i }).click();

  // User should be redirected to Contacts
  await expect(page).toHaveURL("/contacts");

  // Verify Contacts page loaded
  await expect(
    page.getByRole("button", {
      name: /create contact/i,
    }),
  ).toBeVisible();
});

test("signup page links back to login", async ({ page }) => {
  await page.goto("/signup");

  await page.getByRole("link", { name: /log in/i }).click();

  await expect(page).toHaveURL("/login");
});