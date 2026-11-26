import { expect, test } from "@playwright/test";

test("homepage shows the hero heading", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Hà Nội đang chờ bạn." }),
  ).toBeVisible();
});

test("search submits to the destinations page with the query", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Mở tìm kiếm" }).click();
  await page.getByLabel("Tìm điểm đến", { exact: true }).fill("cơm");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/destinations\?q=c%C6%A1m/);
});

test("mobile menu opens and closes with Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile menu only exists below the lg breakpoint");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Mở menu" });
  await toggle.click();
  await expect(page.getByRole("navigation", { name: "Menu di động" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Menu di động" })).toBeHidden();
});
