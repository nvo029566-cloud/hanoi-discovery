// @vitest-environment node
import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";

describe("password hashing", () => {
  it("verifies the correct password and rejects a wrong one", async () => {
    const hash = await hashPassword("matkhau-dung-123");
    expect(await verifyPassword("matkhau-dung-123", hash)).toBe(true);
    expect(await verifyPassword("matkhau-sai-123", hash)).toBe(false);
  });

  it("never stores the plain password and salts each hash", async () => {
    const a = await hashPassword("cung-mot-mat-khau");
    const b = await hashPassword("cung-mot-mat-khau");
    expect(a).not.toContain("cung-mot-mat-khau");
    expect(a).not.toBe(b);
    expect(a.startsWith("scrypt$")).toBe(true);
  });

  it("returns false for malformed stored values instead of throwing", async () => {
    expect(await verifyPassword("x", "")).toBe(false);
    expect(await verifyPassword("x", "bcrypt$1$2$3$4$5")).toBe(false);
    expect(await verifyPassword("x", "scrypt$a$b$c$d$e")).toBe(false);
  });
});
