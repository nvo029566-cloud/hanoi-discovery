import { describe, expect, it } from "vitest";
import { checkImageFile, detectImageType, MAX_IMAGE_BYTES, parseMediaForm } from "./media-validation";

const png = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]);
const jpeg = Uint8Array.from([0xff, 0xd8, 0xff, 0xe0, 0, 0]);
const webp = Uint8Array.from([0x52, 0x49, 0x46, 0x46, 1, 2, 3, 4, 0x57, 0x45, 0x42, 0x50]);

describe("detectImageType", () => {
  it("recognises PNG, JPEG and WebP from their bytes", () => {
    expect(detectImageType(png)).toBe("image/png");
    expect(detectImageType(jpeg)).toBe("image/jpeg");
    expect(detectImageType(webp)).toBe("image/webp");
  });

  it("rejects SVG, text and other content", () => {
    expect(detectImageType(new TextEncoder().encode("<svg xmlns='http://www.w3.org/2000/svg'></svg>"))).toBeNull();
    expect(detectImageType(new TextEncoder().encode("not an image"))).toBeNull();
    expect(detectImageType(new Uint8Array(0))).toBeNull();
  });
});

describe("checkImageFile", () => {
  it("accepts a small valid image", () => {
    expect(checkImageFile(png)).toEqual({ ok: true, mime: "image/png" });
  });

  it("rejects empty, oversized and non-image files", () => {
    expect(checkImageFile(new Uint8Array(0)).ok).toBe(false);
    const big = new Uint8Array(MAX_IMAGE_BYTES + 1);
    big.set(png);
    expect(checkImageFile(big).ok).toBe(false);
    expect(checkImageFile(new TextEncoder().encode("hello world, not an image")).ok).toBe(false);
  });
});

describe("parseMediaForm", () => {
  const base = { altVi: "Hồ Hoàn Kiếm lúc bình minh", altEn: "", credit: "Nguyễn Văn A", license: "CC BY 4.0", sourceUrl: "" };

  it("accepts complete metadata and normalizes blanks to null", () => {
    const r = parseMediaForm(base);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.altEn).toBeNull();
      expect(r.data.sourceUrl).toBeNull();
    }
  });

  it("requires alt text, credit and license", () => {
    const r = parseMediaForm({ ...base, altVi: "", credit: "", license: "" });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.fieldErrors.altVi).toBeDefined();
      expect(r.fieldErrors.credit).toBeDefined();
      expect(r.fieldErrors.license).toBeDefined();
    }
  });

  it("only accepts http(s) source URLs", () => {
    expect(parseMediaForm({ ...base, sourceUrl: "javascript:alert(1)" }).success).toBe(false);
    expect(parseMediaForm({ ...base, sourceUrl: "https://example.org/photo" }).success).toBe(true);
  });
});
