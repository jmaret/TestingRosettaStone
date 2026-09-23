// XSS oracle — a crafted name must render as text, never run
import { test, expect } from "@playwright/test";

const payload = `<img src=x onerror="window.__xss=1">`;

test("script-like name is shown as text and does not run", async ({ page }) => {
  await page.goto("./signup.html");
  await page.getByLabel("Name").fill(payload);
  await page.getByRole("button", { name: "Submit" }).click();
  // Visible copy is the literal payload (textContent)
  await expect(page.locator("#thanks-name")).toHaveText(payload);
  // If the page had used innerHTML, onerror would set this flag
  expect(await page.evaluate(() => window.__xss)).toBeUndefined();
  await expect(page.locator("#success img")).toHaveCount(0);
});
