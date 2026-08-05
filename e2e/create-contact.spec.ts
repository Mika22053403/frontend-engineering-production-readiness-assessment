import { test, expect } from "@playwright/test";

test("user can create a contact", async ({ page }) => {
  // Login
  await page.goto("/login");

  await page.getByRole("button", {
    name: /login/i,
  }).click();

  // Wait for login redirect
  await page.waitForURL("**/");

  // Go to Contacts page
  await page.goto("/contacts");

  // Wait for contacts page to finish loading
  await page.waitForLoadState("networkidle");

  // Open Create Contact dialog
  await page.getByRole("button", { name: "Create Contact" }).first().click();

  const dialog = page.getByRole("dialog");

  await dialog.getByLabel("First Name").fill("Playwright");
  await dialog.getByLabel("Last Name").fill("Tester");
  await dialog.getByLabel("Email").fill("playwright@test.com");
  await dialog.getByLabel("Phone").fill("9876543210");
  await dialog.getByLabel("Company").fill("OpenAI");
  await dialog.getByLabel("Tags").fill("VIP, Lead");

  await dialog
    .getByRole("button", { name: /^Create Contact$/ })
    .click();

  await expect(dialog).toBeHidden();

  await expect(
    page.getByRole("link", { name: "Playwright" }),
  ).toBeVisible();

  await expect(
    page.getByText("playwright@test.com"),
  ).toBeVisible();

  await expect(
    page.getByText("OpenAI"),
  ).toBeVisible();
});