import { execFileSync } from "node:child_process";
import { expect, test } from "@playwright/test";
import { KIND_CONFIG, type ContentKind } from "../../src/lib/admin/content-kinds";

// Database access goes through prisma/e2e-helper.ts (tsx child process), like admin.spec.ts.
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

const KINDS: ContentKind[] = ["food", "culture", "story"];

test("admin creates food, culture and story drafts that stay hidden until published", async ({ page }) => {
  test.setTimeout(90_000);
  const email = `${unique("e2e-admin")}@example.test`;
  const slugs: string[] = [];

  try {
    await page.goto("/register");
    await page.getByLabel("Họ và tên").fill("Quản Trị Nội Dung");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Mật khẩu").fill(PASSWORD);
    await page.getByRole("button", { name: "Tạo tài khoản" }).click();
    await expect(page).toHaveURL(/\/profile$/);
    db("promote", email);

    for (const kind of KINDS) {
      const config = KIND_CONFIG[kind];
      const slug = unique("e2e-" + kind);
      slugs.push(slug);
      const name = `Nội dung thử nghiệm ${slug}`;

      await page.goto(`/admin/${config.path}/new`);
      await page.getByLabel("Slug (đường dẫn)").fill(slug);
      await page.getByLabel(`${config.nameLabel} (tiếng Việt)`, { exact: true }).fill(name);
      await page
        .getByLabel(`${config.summaryLabel} (tiếng Việt)`, { exact: true })
        .fill("Nội dung dùng cho kiểm thử tự động, sẽ bị xóa.");
      if (config.hasBody) {
        await page.getByLabel("Nội dung (tiếng Việt)", { exact: true }).fill("Đoạn một.\n\nĐoạn hai.");
      }
      await page.getByRole("button", { name: config.saveLabel }).click();
      await expect(page).toHaveURL(new RegExp(`/admin/${config.path}$`));
      const row = () => page.getByRole("row").filter({ hasText: slug });
      await expect(row()).toContainText("Nháp");

      // A draft is not public.
      await page.goto(`/${config.path}/${slug}`);
      await expect(page.getByRole("heading", { name: "Trang này chưa có." })).toBeVisible();
      await expect(page.getByText(name)).toHaveCount(0);

      // Publish it; the new page may be served stale once, so poll.
      await page.goto(`/admin/${config.path}`);
      await row().getByRole("button", { name: "Xuất bản" }).click();
      await expect(row()).toContainText("Đã xuất bản");
      await expect(async () => {
        const response = await page.goto(`/${config.path}/${slug}`);
        expect(response?.status()).toBe(200);
        await expect(page.getByRole("heading", { name }).first()).toBeVisible({ timeout: 1000 });
      }).toPass({ timeout: 15_000 });
      if (config.hasBody) await expect(page.getByText("Đoạn hai.")).toBeVisible();
    }
  } finally {
    try {
      for (const kind of KINDS) {
        const config = KIND_CONFIG[kind];
        await page.goto(`/admin/${config.path}`);
        for (const slug of slugs) {
          const hide = page.getByRole("row").filter({ hasText: slug }).getByRole("button", { name: "Chuyển về nháp" });
          if (await hide.count()) {
            await hide.click();
            await expect(page.getByRole("row").filter({ hasText: slug })).toContainText("Nháp");
          }
        }
      }
    } finally {
      for (const slug of slugs) db("cleanup", email, slug);
      db("cleanup", email);
    }
  }
});
