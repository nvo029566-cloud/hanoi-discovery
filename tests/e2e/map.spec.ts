import { expect, test } from "@playwright/test";

test("map page shows the map and locations with coordinates", async ({ page }) => {
  await page.goto("/map");
  await expect(page.getByRole("heading", { level: 2, name: "Bản đồ Hà Nội" })).toBeVisible();
  await expect(page.locator(".leaflet-container")).toBeVisible();
  await expect(page.getByRole("link", { name: /Văn Miếu.*Quốc Tử Giám/ })).toBeVisible();
});

test("the heritage route shows the three numbered stops in sequence", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Xem hành trình trên bản đồ" }).click();
  await expect(page.getByRole("heading", { name: "Các điểm dừng của hành trình" })).toBeVisible();
  await expect(page.getByRole("link", { name: /^1\. Hồ Hoàn Kiếm/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /^2\. Phố cổ Hà Nội/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /^3\. Văn Miếu/ })).toBeVisible();
  await expect(page.locator(".leaflet-marker-pane .map-route-pin")).toHaveText(["1", "2", "3"]);
});
