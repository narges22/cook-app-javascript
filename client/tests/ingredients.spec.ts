import { test, expect } from "@playwright/test";

const APP_URL = "http://localhost:4173/";

test.describe("Ingredient Flows", () => {
  test("can add a new ingredient and it appears in the table", async ({
    page,
  }) => {
    await page.goto(`${APP_URL}ingredients`);

    await page.getByRole("button", { name: /add new ingredient/i }).click();
    await expect(page).toHaveURL(/\/add-new-ingredient$/);

    const ingredientName = `Test Ingredient ${Date.now()}`;
    await page.getByLabel(/^name/i).fill(ingredientName);
    await page.locator("#category").click();
    await page.getByRole("option", { name: "Baking" }).click();
    await page.locator("#unit").click();
    await page.getByRole("option", { name: "grams" }).click();

    await page.getByRole("button", { name: /submit/i }).click();

    await expect(page).toHaveURL(/\/ingredients$/);

    await expect(page.getByText(ingredientName)).toBeVisible();
  });

  test("ingredient form validation prevents submission with invalid data", async ({
    page,
  }) => {
    await page.goto(`${APP_URL}add-new-ingredient`);

    await page.getByRole("button", { name: /submit/i }).click();

    await expect(page.getByLabel(/^name/i)).toHaveClass(/p-invalid/);

    await expect(page).toHaveURL(/\/add-new-ingredient$/);
  });

  test("can delete an ingredient and it disappears from the table", async ({
    page,
  }) => {
    await page.goto(`${APP_URL}ingredients`);

    await page.locator(".p-datatable").waitFor();

    const rows = page.locator(".p-datatable tbody tr");
    const rowCount = await rows.count();
    test.skip(rowCount === 0, "No ingredients available to delete");

    const firstRow = rows.first();
    const ingredientName = await firstRow.locator("td").first().textContent();

    if (ingredientName) {
      await firstRow.locator("#delete-ingredient").click();

      await page.waitForTimeout(500);

      if ((await page.locator(".p-datatable tbody tr").count()) > 0) {
        await expect(page.getByText(ingredientName)).not.toBeVisible();
      }
    }
  });
});
