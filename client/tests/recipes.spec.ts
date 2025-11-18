import { test, expect } from "@playwright/test";

const APP_URL = "http://localhost:4173/";

test.describe("Recipe Flows", () => {
  test("recipe form requires at least one ingredient", async ({ page }) => {
    await page.goto(`${APP_URL}add-new-recipe`);

    await page.getByLabel(/^name/i).fill("Recipe without ingredients");

    await page.getByRole("button", { name: /submit/i }).click();

    await expect(page.getByText(/at least one ingredient/i)).toBeVisible();

    await expect(page).toHaveURL(/\/add-new-recipe$/);
  });

  test("can delete a recipe and it disappears from the table", async ({
    page,
  }) => {
    await page.goto(APP_URL);

    await page.locator(".p-datatable").waitFor();

    const rows = page.locator(".p-datatable tbody tr");
    const rowCount = await rows.count();
    test.skip(rowCount === 0, "No recipes available to delete");

    const firstRow = rows.first();
    const recipeName = await firstRow.locator("td").first().textContent();

    if (recipeName) {
      await firstRow.locator("#delete-recipe").click();

      await page.waitForTimeout(500);

      if ((await page.locator(".p-datatable tbody tr").count()) > 0) {
        await expect(page.getByText(recipeName)).not.toBeVisible();
      }
    }
  });

  test("back button navigates to previous page", async ({ page }) => {
    await page.goto(APP_URL);

    await page.getByRole("button", { name: /add new recipe/i }).click();
    await expect(page).toHaveURL(/\/add-new-recipe$/);

    await page.getByRole("button", { name: /back|arrow/i }).click();

    await expect(page).toHaveURL(/\/(recipes)?$/);
  });
});
