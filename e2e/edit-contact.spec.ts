import { test, expect } from "@playwright/test";

test("user can edit a contact", async ({ page }) => {
  // Login
  await page.goto("http://localhost:3000/login");

  await page.getByRole("button", { name: /login/i }).click();

  await page.waitForURL("http://localhost:3000/");

  // Open Contacts page
  await page.goto("http://localhost:3000/contacts");

  // Open Edit dialog for first contact
  await page.getByRole("button", { name: "Edit" }).first().click();

  // Wait for dialog
  await expect(
    page.getByRole("heading", { name: "Edit Contact" }),
  ).toBeVisible();

  // Update fields
  await page.locator("#edit-firstName").fill("Updated");

  await page.locator("#edit-lastName").fill("User");

  await page.locator("#edit-email").fill("updated@test.com");

  await page.locator("#edit-phone").fill("9876543210");

  await page.locator("#edit-company").fill("OpenAI");

  await page.locator("#edit-tags").fill("VIP, Customer");

  // Change status
await page.locator("#edit-status").click();

await page.getByRole("option", { name: "Inactive" }).click();

  // Save
  await page.getByRole("button", { name: /save changes/i }).click();

  // Dialog closes
  await expect(
    page.getByRole("heading", { name: "Edit Contact" }),
  ).not.toBeVisible();

  // Verify updated values appear
  await expect(page.getByRole("link", { name: "Updated" })).toBeVisible();

  await expect(page.getByText("User")).toBeVisible();

  await expect(page.getByText("updated@test.com")).toBeVisible();

  await expect(page.getByText("OpenAI")).toBeVisible();
});