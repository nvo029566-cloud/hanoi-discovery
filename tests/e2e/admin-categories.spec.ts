import { execFileSync } from "node:child_process";
import { expect, test } from "@playwright/test";

// Database access goes through prisma/e2e-helper.ts (tsx child process), like the other admin specs.
function db(...args: string[]) {
  execFileSync(process.execPath, ["--import", "tsx", "prisma/e2e-helper.ts", ...args], {
    cwd: process.cwd(),
    stdio: "pipe",
  });
}

function unique(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
const PASSWORD = "matkhau-thu-nghiem-123";

test("admin creates, edits and deletes a category", async ({ page }) => {
  test.setTimeout(60_000);
  const email = `${unique("e2e-admin")}@example.test`;
  const slug = unique("e2e-cat");
  const name = `Danh mục thử nghiệm ${slug}`;
  const renamed = `${name} (đã sửa)`;
  const row = () => page.getByRole("row").filter({ hasText: slug });

  try {
    await page.goto("/register");
    await page.getByLabel("Họ và tên").fill("Quản Trị Danh Mục");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Mật khẩu").fill(PASSWORD);
    await page.getByRole("button", { name: "Tạo tài khoản" }).click();
    await expect(page).toHaveURL(/\/profile$/);
    db("promote", email);

    // Validation: English needs name and description together.
    await page.goto("/admin/categories/new");
    await page.getByLabel("Slug (đường dẫn)").fill(slug);
    await page.getByLabel("Tên danh mục (tiếng Việt)", { exact: true }).fill(name);
    await page.getByLabel("Mô tả (tiếng Việt)", { exact: true }).fill("Danh mục dùng cho kiểm thử tự động.");
    await page.getByLabel("Tên danh mục (tiếng Anh)", { exact: true }).fill("Test category");
    await page.getByRole("button", { name: "Lưu danh mục" }).click();
    await expect(page.getByText("Bản tiếng Anh cần đầy đủ tên và mô tả")).toBeVisible();

    // Complete the English version and save.
    await page.getByLabel("Mô tả (tiếng Anh)", { exact: true }).fill("A category used by automated tests.");
    await page.getByRole("button", { name: "Lưu danh mục" }).click();
    await expect(page).toHaveURL(/\/admin\/categories$/);
    await expect(row()).toContainText(name);
    await expect(row()).toContainText("0");

    // A duplicate slug is rejected.
    await page.goto("/admin/categories/new");
    await page.getByLabel("Slug (đường dẫn)").fill(slug);
    await page.getByLabel("Tên danh mục (tiếng Việt)", { exact: true }).fill("Bản trùng");
    await page.getByLabel("Mô tả (tiếng Việt)", { exact: true }).fill("Danh mục trùng slug để kiểm thử.");
    await page.getByRole("button", { name: "Lưu danh mục" }).click();
    await expect(page.getByText("Slug này đã được dùng.")).toBeVisible();

    // Edit the name.
    await page.goto("/admin/categories");
    await row().getByRole("link", { name: "Sửa" }).click();
    await page.getByLabel("Tên danh mục (tiếng Việt)", { exact: true }).fill(renamed);
    await page.getByRole("button", { name: "Lưu danh mục" }).click();
    await expect(page).toHaveURL(/\/admin\/categories$/);
    await expect(row()).toContainText(renamed);

    // Delete it (no destination uses it).
    await row().getByRole("button", { name: "Xóa" }).click();
    await expect(row()).toHaveCount(0);
  } finally {
    db("cleanup", email, slug);
  }
});
