import { expect, test } from "@playwright/test";

test("destinations list filters accent-insensitively", async ({ page }) => {
  await page.goto("/destinations?q=ho%20tay");
  await expect(page.getByRole("heading", { name: "Hồ Tây" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Hồ Hoàn Kiếm" })).toHaveCount(0);
});

test("destination detail opens from the list", async ({ page }) => {
  await page.goto("/destinations");
  await page.getByRole("link", { name: /Xem chi tiết Hồ Tây/ }).click();
  await expect(page).toHaveURL(/\/destinations\/west-lake$/);
  await expect(page.getByRole("heading", { level: 1, name: "Hồ Tây" })).toBeVisible();
});

test("unknown destination shows the Vietnamese 404", async ({ page }) => {
  await page.goto("/destinations/khong-ton-tai");
  await expect(page.getByRole("heading", { name: "Trang này chưa có." })).toBeVisible();
});
