import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/ARchaeology/);
});

test("get heading", async ({ page }) => {
  await page.goto("/");

  const heading = page.locator("li");
  await expect(heading).toHaveText("Musket");
});
