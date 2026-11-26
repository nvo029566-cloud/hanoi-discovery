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

test("a cover image is shown on the public page with its attribution, and cannot be deleted while in use", async ({ page }) => {
  test.setTimeout(180_000);
  const email = `${unique("e2e-admin")}@example.test`;
  // The same value is the food slug and the image alt text, so one cleanup call removes both.
  const slug = unique("e2e-cover");
  const mediaRow = () => page.getByRole("row").filter({ hasText: slug });

  try {
    await page.goto("/register");
    await page.getByLabel("Họ và tên").fill("Quản Trị Thử Nghiệm");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Mật khẩu").fill(PASSWORD);
    await page.getByRole("button", { name: "Tạo tài khoản" }).click();
    await expect(page).toHaveURL(/\/profile$/);
    db("promote", email);

    // Upload an image.
    await page.goto("/admin/media/new");
    await page.getByLabel("Tệp ảnh").setInputFiles({ name: "pixel.png", mimeType: "image/png", buffer: PNG });
    await page.getByLabel("Mô tả ảnh (tiếng Việt)").fill(slug);
    await page.getByLabel("Tác giả hoặc chủ sở hữu").fill("Kiểm thử tự động");
    await page.getByLabel("Giấy phép hoặc quyền sử dụng").fill("Tự tạo cho kiểm thử");
    await page.getByRole("button", { name: "Tải ảnh lên" }).click();
    await expect(page).toHaveURL(/\/admin\/media$/);
    await expect(mediaRow().getByRole("button", { name: "Xóa" })).toBeVisible();

    // Create a food draft that uses it as the cover image.
    await page.goto("/admin/food/new");
    await page.getByLabel("Slug (đường dẫn)").fill(slug);
    await page.getByLabel("Ảnh bìa", { exact: true }).selectOption({ label: `${slug} (Kiểm thử tự động)` });
    await page.getByLabel("Tên món (tiếng Việt)", { exact: true }).fill(`Món có ảnh ${slug}`);
    await page.getByRole("button", { name: "Lưu món ăn" }).click();
    await expect(page).toHaveURL(/\/admin\/food$/);
    const foodRow = () => page.getByRole("row").filter({ hasText: slug });
    await foodRow().getByRole("button", { name: "Xuất bản" }).click();
    await expect(foodRow()).toContainText("Đã xuất bản");

    const t0 = Date.now();
    // The public detail page shows the image, its alt text, credit and license.
    const history: string[] = [];
    try {
      await expect(async () => {
        const response = await page.goto(`/food/${slug}`);
        history.push(`${Math.round((Date.now() - t0) / 1000)}s:${response?.status()}`);
        expect(response?.status()).toBe(200);
        await expect(page.getByRole("img", { name: slug })).toBeVisible({ timeout: 1000 });
      }).toPass({ timeout: 15_000 });
    } catch (error) {
      // Diagnostics: which layer is stale? Same page with another cache key, the English page,
      // the list page, and how long it takes the plain URL to recover.
      const h1 = async (url: string) => {
        await page.goto(url);
        return JSON.stringify(await page.getByRole("heading", { level: 1 }).allInnerTexts());
      };
      console.log("DIAG poll history (time:status):", history.join(" "));
      // Raw responses without the browser cache: status plus the Next cache headers.
      for (const url of [`/food/${slug}`, `/food/${slug}?probe=2`, `/en/food/${slug}`]) {
        const res = await page.request.get(url);
        const hd = res.headers();
        console.log(
          "DIAG raw",
          url,
          res.status(),
          JSON.stringify({
            cache: hd["x-nextjs-cache"],
            prerender: hd["x-nextjs-prerender"],
            stale: hd["x-nextjs-stale-time"],
            control: hd["cache-control"],
            age: hd["age"],
          }),
        );
      }
      console.log("DIAG plain url:", await h1(`/food/${slug}`));
      console.log("DIAG other query string:", await h1(`/food/${slug}?probe=1`));
      console.log("DIAG english page:", await h1(`/en/food/${slug}`));
      await page.goto("/food");
      console.log("DIAG list page shows the food:", await page.getByText(`Món có ảnh ${slug}`).count());
      const started = Date.now();
      let recovered = "NEVER within 60s";
      while (Date.now() - started < 60_000) {
        await page.waitForTimeout(3000);
        await page.goto(`/food/${slug}`);
        if ((await page.getByRole("img", { name: slug }).count()) > 0) {
          recovered = `${Math.round((Date.now() - started) / 1000)}s`;
          break;
        }
      }
      console.log("DIAG plain url recovered after:", recovered);
      throw error;
    }
    await expect(page.locator("figcaption")).toContainText("Ảnh: Kiểm thử tự động");
    await expect(page.locator("figcaption")).toContainText("Tự tạo cho kiểm thử");

    // While it is a cover image, it cannot be deleted from the library.
    await page.goto("/admin/media");
    await expect(mediaRow()).toContainText("không thể xóa");
    await expect(mediaRow().getByRole("button", { name: "Xóa" })).toHaveCount(0);
  } finally {
    try {
      // Hide the food so the catalog cache no longer holds it, then remove the test data.
      await page.goto("/admin/food");
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
