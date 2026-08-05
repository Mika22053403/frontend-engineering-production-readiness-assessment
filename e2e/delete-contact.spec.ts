import { test, expect } from "@playwright/test";

test("user can delete a contact", async ({ page }) => {
  // Login
  await page.goto("/login");
  await page.getByRole("button", { name: "Login" }).click();

  // Go to contacts
  await page.goto("/contacts");

  // Wait for table to load
  await expect(page.locator("tbody tr").first()).toBeVisible();

  // Count rows before deleting
  const rowsBefore = await page.locator("tbody tr").count();

  // Open delete dialog for first contact
  await page.getByRole("button", { name: "Delete" }).first().click();

  // Wait for confirmation dialog
  await expect(
    page.getByRole("heading", { name: "Delete Contact?" })
  ).toBeVisible();

  // Confirm deletion
  await page.getByRole("button", { name: /^Delete$/ }).last().click();

  // Wait for dialog to close
  await expect(
    page.getByRole("heading", { name: "Delete Contact?" })
  ).not.toBeVisible();

  // Wait for table to refresh
  await page.waitForTimeout(1000);

  // Verify one row has been removed
  await expect(page.locator("tbody tr")).toHaveCount(rowsBefore - 1);
});