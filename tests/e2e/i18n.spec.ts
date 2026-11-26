import { expect, test } from "@playwright/test";

// Needs the English sample translations: run `npx prisma db seed` once after pulling this change.

test("English homepage renders in English and sets the document language", async ({ page }) => {
  await page.goto("/en");
  await expect(page.getByRole("heading", { level: 1, name: "Hanoi is waiting for you." })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("banner").getByRole("link", { name: "HANOI DISCOVERY, home" })).toBeVisible();
});

test("language switch keeps the current page", async ({ page, isMobile }) => {
  await page.goto("/en/food");
  await expect(page.getByRole("heading", { level: 2, name: "Taste Hanoi" })).toBeVisible();

  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("link", { name: "Switch to Vietnamese" }).click();
  await expect(page).toHaveURL(/\/food$/);
  await expect(page.getByRole("heading", { level: 2, name: "Nếm trải Hà Nội" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "vi");
});

test("English destination list and detail use English content", async ({ page }) => {
  await page.goto("/en/destinations");
  await expect(page.getByRole("heading", { name: "Hoan Kiem Lake" }).first()).toBeVisible();

  await page.goto("/en/destinations/hoan-kiem-lake");
  await expect(page.getByRole("heading", { level: 1, name: "Hoan Kiem Lake" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Practical information" })).toBeVisible();
});

test("English food search works and links stay in English", async ({ page }) => {
  await page.goto("/en/food");
  await page.getByRole("searchbox").fill("egg coffee");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/food\?q=/);
  await expect(page.getByText(/1 dish/)).toBeVisible();
  await page.getByRole("link", { name: /View details Egg Coffee/ }).click();
  await expect(page).toHaveURL(/\/en\/food\/egg-coffee$/);
  await expect(page.getByRole("heading", { level: 1, name: "Egg Coffee" })).toBeVisible();
});

test("unknown English page shows the English 404", async ({ page }) => {
  await page.goto("/en/destinations/does-not-exist");
  await expect(page.getByRole("heading", { name: "This page does not exist yet." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/en");
});
