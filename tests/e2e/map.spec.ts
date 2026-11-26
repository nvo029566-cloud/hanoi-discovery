import { expect, test } from "@playwright/test";

test("map page shows the map and marks places without verified coordinates", async ({ page }) => {
  await page.goto("/map");
  await expect(page.getByRole("heading", { level: 2, name: "Bản đồ Hà Nội" })).toBeVisible();
  await expect(page.locator(".leaflet-container")).toBeVisible();
  await expect(page.getByRole("link", { name: "Văn Miếu – Quốc Tử Giám" })).toBeVisible();
  await expect(page.getByText("Chưa có tọa độ đã xác thực").first()).toBeVisible();
});
