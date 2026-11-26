import { expect, test } from "@playwright/test";

test("food search is accent-insensitive and detail opens", async ({ page }) => {
  await page.goto("/food?q=ca%20phe%20trung");
  await expect(page.getByRole("heading", { name: "Cà phê trứng" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Phở" })).toHaveCount(0);
  await page.getByRole("link", { name: /Xem chi tiết Cà phê trứng/ }).click();
  await expect(page).toHaveURL(/\/food\/egg-coffee$/);
  await expect(page.getByRole("heading", { level: 1, name: "Cà phê trứng" })).toBeVisible();
});

test("culture list opens a detail page", async ({ page }) => {
  await page.goto("/culture");
  await page.getByRole("link", { name: /Xem chi tiết Ca trù/ }).click();
  await expect(page).toHaveURL(/\/culture\/ca-tru$/);
  await expect(page.getByRole("heading", { level: 1, name: "Ca trù" })).toBeVisible();
});

test("stories list opens a story", async ({ page }) => {
  await page.goto("/stories");
  await page.getByRole("link", { name: /Đọc bài Dạo bước qua phố cổ/ }).click();
  await expect(page).toHaveURL(/\/stories\/walking-the-old-quarter$/);
  await expect(page.getByRole("heading", { level: 1, name: "Dạo bước qua phố cổ" })).toBeVisible();
});

test("about page renders", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { name: "Về HANOI DISCOVERY" })).toBeVisible();
});

test("planner builds a plan from the homepage query", async ({ page }) => {
  await page.goto("/planner?days=2&interests=history-heritage");
  await expect(page.getByRole("heading", { name: "Lịch trình gợi ý 2 ngày" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Hoàng thành Thăng Long" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Hồ Tây" })).toHaveCount(0);
});

test("homepage planner promo leads to the planner", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "3 ngày" }).click();
  await page.getByRole("link", { name: "Tạo lịch trình" }).click();
  await expect(page).toHaveURL(/\/planner\?days=3/);
  await expect(page.getByRole("heading", { name: "Lịch trình gợi ý 3 ngày" })).toBeVisible();
});
