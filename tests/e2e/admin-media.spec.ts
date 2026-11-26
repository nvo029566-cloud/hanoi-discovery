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

// A valid 1x1 PNG.
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  "base64",
);

test("admin uploads an image with attribution, it is served, and can be deleted", async ({ page }) => {
  test.setTimeout(60_000);
  const email = `${unique("e2e-admin")}@example.test`;
  // The cleanup helper finds test images by their Vietnamese alt text.
  const alt = unique("e2e-media");
  const row = () => page.getByRole("row").filter({ hasText: alt });

  try {
    await page.goto("/register");
    await page.getByLabel("Họ và tên").fill("Quản Trị Ảnh");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Mật khẩu").fill(PASSWORD);
    await page.getByRole("button", { name: "Tạo tài khoản" }).click();
    await expect(page).toHaveURL(/\/profile$/);
    db("promote", email);

    // A text file is rejected even when it is named like an image, and attribution is required.
    await page.goto("/admin/media/new");
    await page.getByLabel("Tệp ảnh").setInputFiles({
      name: "fake.png",
      mimeType: "image/png",
      buffer: Buffer.from("this is not an image at all"),
    });
    await page.getByRole("button", { name: "Tải ảnh lên" }).click();
    await expect(page.getByText("Tệp không phải ảnh JPEG, PNG hoặc WebP hợp lệ.")).toBeVisible();
    await expect(page.getByText("Mô tả ảnh (alt) cần ít nhất 5 ký tự.")).toBeVisible();
    await expect(page.getByText("Cần ghi tác giả hoặc chủ sở hữu ảnh.")).toBeVisible();

    // A valid upload.
    await page.getByLabel("Tệp ảnh").setInputFiles({ name: "pixel.png", mimeType: "image/png", buffer: PNG });
    await page.getByLabel("Mô tả ảnh (tiếng Việt)").fill(alt);
    await page.getByLabel("Tác giả hoặc chủ sở hữu").fill("Kiểm thử tự động");
    await page.getByLabel("Giấy phép hoặc quyền sử dụng").fill("Tự tạo cho kiểm thử");
    await page.getByRole("button", { name: "Tải ảnh lên" }).click();
    await expect(page).toHaveURL(/\/admin\/media$/);
    await expect(row()).toContainText("Kiểm thử tự động");

    // The image is served with the detected type.
    const src = await row().locator("img").getAttribute("src");
    expect(src).toMatch(/^\/media\/.+/);
    const response = await page.request.get(src!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("image/png");
    expect(response.headers()["x-content-type-options"]).toBe("nosniff");

    // Delete it; the URL then returns 404.
    await row().getByRole("button", { name: "Xóa" }).click();
    await expect(row()).toHaveCount(0);
    expect((await page.request.get(src!)).status()).toBe(404);
  } finally {
    db("cleanup", email, alt);
  }
});
