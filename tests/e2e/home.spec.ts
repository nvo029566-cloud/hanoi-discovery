import { expect, test } from "@playwright/test";

test("homepage shows the hero heading", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: /Cảm nhận Hà Nội/ }),
  ).toBeVisible();
});

test("search submits to the destinations page with the query", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Tên địa danh", { exact: true }).fill("cơm");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/destinations\?q=c%C6%A1m/);
});

test("home section navigation jumps to the selected chapter", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const chapters = page.getByRole("navigation", { name: "Các phần trang chủ" });
  const handbook = chapters.getByRole("link", { name: "Cẩm nang" });
  await handbook.click();
  await expect(page).toHaveURL(/#handbook$/);
  await expect(handbook).toHaveAttribute("aria-current", "location");
  await expect(page.locator("#handbook").getByRole("heading", { level: 2 })).toBeInViewport();
});

test("mobile menu opens and closes with Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "this case exercises the menu on a mobile device");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Mở menu" });
  await toggle.click();
  await expect(page.getByRole("navigation", { name: "Menu di động" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Menu di động" })).toBeHidden();
});
