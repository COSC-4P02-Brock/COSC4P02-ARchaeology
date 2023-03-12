import { test, expect } from "@playwright/test";

test("has link", async({ page }) => {
  await page.goto("/example-model");
  
  const link = await page.getByTestId("ExampleModel.Link");

  await expect(link).toHaveText("View model in AR");
  await expect(link).toHaveAttribute("href", "/ar/toy_drummer_idle.usdz");
});
