// Playwright browser test — empty submit must show our custom error, not a native tooltip
import { test, expect } from "@playwright/test";

test("empty submit shows Name is required", async ({ page }) => {
  await page.goto("./signup.html");
  // Click Submit without typing a name
  await page.getByRole("button", { name: "Submit" }).click();
  const error = page.locator("#name-error");
  await expect(error).toBeVisible();
  await expect(error).toHaveText("Name is required");
});
