import { execFileSync } from "node:child_process";
import { expect, test } from "@playwright/test";

// The database is touched only through prisma/e2e-helper.ts (run with tsx, from the project root):
// it promotes a throwaway @example.test user to ADMIN and cleans up afterwards.
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

test("guest visiting /admin is sent to the login page", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/login\?next=/);
});

test("signed-in non-admin gets a 404 on /admin", async ({ page }) => {
  const email = `${unique("e2e-user")}@example.test`;
  await page.goto("/register");
  await page.getByLabel("Họ và tên").fill("Người Dùng Thường");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Mật khẩu").fill(PASSWORD);
  await page.getByRole("button", { name: "Tạo tài khoản" }).click();
  await expect(page).toHaveURL(/\/profile$/);
  await expect(page.getByRole("link", { name: "Khu quản trị" })).toHaveCount(0);

  await page.goto("/admin");
  await expect(page.getByText("Lỗi 404")).toBeVisible();

  db("cleanup", email);
});

test("admin creates a draft, it stays hidden until published, then hides again", async ({ page }) => {
  const email = `${unique("e2e-admin")}@example.test`;
  const slug = unique("e2e-diem-den");
  const name = `Điểm đến thử nghiệm ${slug}`;

  try {
    await page.goto("/register");
    await page.getByLabel("Họ và tên").fill("Quản Trị Thử Nghiệm");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Mật khẩu").fill(PASSWORD);
    await page.getByRole("button", { name: "Tạo tài khoản" }).click();
    await expect(page).toHaveURL(/\/profile$/);

    db("promote", email);

    await page.goto("/profile");
    await expect(page.getByRole("link", { name: "Khu quản trị" })).toBeVisible();

    await page.goto("/admin/destinations/new");
    await page.getByLabel("Slug (đường dẫn)").fill(slug);
    await page.getByLabel("Danh mục").selectOption({ index: 1 });
    await page.getByLabel("Tên (tiếng Việt)").fill(name);
    await page.getByLabel("Mô tả ngắn (tiếng Việt)").fill("Điểm đến dùng cho kiểm thử tự động, sẽ bị xóa.");
    await page.getByRole("button", { name: "Lưu điểm đến" }).click();
    await expect(page).toHaveURL(/\/admin\/destinations$/);

    const row = page.getByRole("row").filter({ hasText: slug });
    await expect(row).toContainText("Nháp");

    // A draft is not public.
    // Assert on what the visitor sees (the status code of a streamed notFound() is not part of the contract).
    await page.goto(`/destinations/${slug}`);
    await expect(page.getByRole("heading", { name: "Trang này chưa có." })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name })).toHaveCount(0);
    await expect(page.getByText(name)).toHaveCount(0);

    // Publish it.
    await page.goto("/admin/destinations");
    await page.getByRole("row").filter({ hasText: slug }).getByRole("button", { name: "Xuất bản" }).click();
    await expect(page.getByRole("row").filter({ hasText: slug })).toContainText("Đã xuất bản");

    // The catalog is fresh immediately, but a detail URL that was cached while it was a draft is served
    // stale once while Next.js regenerates it in the background. Poll until the new page is served.
    await expect(async () => {
      const response = await page.goto(`/destinations/${slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1, name })).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 15_000 });
  } finally {
    // Hide it through the UI first so the public cache is invalidated, then remove the rows.
    try {
      await page.goto("/admin/destinations");
      const hide = page.getByRole("row").filter({ hasText: slug }).getByRole("button", { name: "Chuyển về nháp" });
      if (await hide.count()) {
        await hide.click();
        await expect(page.getByRole("row").filter({ hasText: slug })).toContainText("Nháp");
      }
    } finally {
      db("cleanup", email, slug);
    }
  }
});
