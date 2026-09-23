// Playwright browser test — real Chromium, not APIRequest
import { test, expect } from "@playwright/test";

test("clicking About shows the about heading", async ({ page }) => {
  // Load the home page served by samples/js-ui
  await page.goto("./index.html");
  // Click the same nav control a user would
  await page.getByRole("link", { name: "About" }).click();
  // URL and heading are the observable UX contract
  await expect(page).toHaveURL(/about\.html/);
  await expect(page.getByRole("heading", { name: "About this counter" })).toBeVisible();
});
