import { expect, test } from "@playwright/test";

// Each run creates a user with a unique @example.test email in the local dev database.
function uniqueEmail() {
  return `e2e-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.test`;
}
const PASSWORD = "matkhau-thu-nghiem-123";

test("register, save a favorite, sign out, sign in again", async ({ page }) => {
  const email = uniqueEmail();

  await page.goto("/register");
  await page.getByLabel("Họ và tên").fill("Người Thử Nghiệm");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Mật khẩu").fill(PASSWORD);
  await page.getByRole("button", { name: "Tạo tài khoản" }).click();
  await expect(page).toHaveURL(/\/profile$/);
  await expect(page.getByRole("heading", { level: 1, name: "Người Thử Nghiệm" })).toBeVisible();
  await expect(page.getByText("Bạn chưa lưu điểm đến nào.")).toBeVisible();

  await page.goto("/destinations/temple-of-literature");
  await page.getByRole("button", { name: "Lưu vào yêu thích" }).click();
  await expect(page.getByRole("button", { name: "Đã lưu vào yêu thích" })).toBeVisible();

  await page.goto("/profile");
  await expect(page.locator('a[href="/destinations/temple-of-literature"]').first()).toBeVisible();

  await page.getByRole("button", { name: "Đăng xuất" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("link", { name: "Đăng nhập" })).toBeVisible();

  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Mật khẩu").fill(PASSWORD);
  await page.getByRole("button", { name: "Đăng nhập" }).click();
  await expect(page).toHaveURL(/\/profile$/);
  await expect(page.locator('a[href="/destinations/temple-of-literature"]').first()).toBeVisible();
});

test("wrong password shows a generic error", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill(uniqueEmail());
  await page.getByLabel("Mật khẩu").fill("sai-mat-khau-123");
  await page.getByRole("button", { name: "Đăng nhập" }).click();
  // Scope to the form: Next.js also renders its own role="alert" route announcer.
  await expect(page.locator('form [role="alert"]')).toHaveText("Email hoặc mật khẩu không đúng.");
});

test("register validates fields", async ({ page }) => {
  await page.goto("/register");
  await page.getByLabel("Họ và tên").fill("A");
  await page.getByLabel("Email").fill("khong-hop-le");
  await page.getByLabel("Mật khẩu").fill("123");
  await page.getByRole("button", { name: "Tạo tài khoản" }).click();
  await expect(page.getByText("Họ tên cần ít nhất 2 ký tự.")).toBeVisible();
  await expect(page.getByText("Email không hợp lệ.")).toBeVisible();
  await expect(page.getByText("Mật khẩu cần ít nhất 8 ký tự.")).toBeVisible();
});

test("guest is sent to login and returns to the profile after signing in", async ({ page }) => {
  const email = uniqueEmail();
  // Create the account without touching the browser session.
  const ctx = await page.context().browser()!.newContext();
  const other = await ctx.newPage();
  await other.goto("http://localhost:3001/register");
  await other.getByLabel("Họ và tên").fill("Khách Quay Lại");
  await other.getByLabel("Email").fill(email);
  await other.getByLabel("Mật khẩu").fill(PASSWORD);
  await other.getByRole("button", { name: "Tạo tài khoản" }).click();
  await expect(other).toHaveURL(/\/profile$/);
  await ctx.close();

  await page.goto("/profile");
  await expect(page).toHaveURL(/\/login\?next=/);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Mật khẩu").fill(PASSWORD);
  await page.getByRole("button", { name: "Đăng nhập" }).click();
  await expect(page).toHaveURL(/\/profile$/);
});

test("guest sees a sign-in prompt instead of the favorite button", async ({ page }) => {
  await page.goto("/destinations/temple-of-literature");
  await expect(page.getByRole("link", { name: "Đăng nhập để lưu vào yêu thích" })).toBeVisible();
  await expect(page.getByRole("button", { name: /yêu thích/ })).toHaveCount(0);
});
