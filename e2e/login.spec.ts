import { test, expect } from "@playwright/test";

test("user can login", async ({ page }) => {
  await page.goto("/login");

  await page.getByRole("button", {
    name: /login/i,
  }).click();

  // User should be redirected to the home page
  await expect(page).toHaveURL("/");

  // Home page heading should be visible
  await expect(
    page.getByRole("heading", {
      name: "CampaignHQ",
    }),
  ).toBeVisible();
});