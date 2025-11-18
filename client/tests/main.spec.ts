import { test, expect } from "@playwright/test";

const APP_URL = "http://localhost:4173/";

test.describe("Critical User Flows", () => {
  test("can navigate between main pages via menu", async ({ page }) => {
    await page.goto(APP_URL);

    await page.getByRole("menuitem", { name: /ingredients/i }).click();
    await expect(page).toHaveURL(/\/ingredients$/);
    await expect(page.locator(".p-datatable")).toBeVisible();

    await page.getByRole("menuitem", { name: /recipes/i }).click();
    await expect(page).toHaveURL(/\/(recipes)?$/);
    await expect(page.locator(".p-datatable")).toBeVisible();
  });
});
