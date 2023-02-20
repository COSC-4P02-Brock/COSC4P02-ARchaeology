import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ARchaeology/);
});

test("get heading", async ({ page }) => {
  await page.goto("/");

  const heading = page.locator("h1");
  await expect(heading).toContainText("ARchaeology");
});
