import { describe, expect, it } from "vitest";
import { parseLogin, parseRegister } from "./validation";

describe("parseRegister", () => {
  it("accepts valid input and normalizes email and name", () => {
    const r = parseRegister({ name: "  Mai Anh ", email: "  Mai.Anh@Example.COM ", password: "12345678" });
    expect(r).toEqual({ success: true, data: { name: "Mai Anh", email: "mai.anh@example.com", password: "12345678" } });
  });

  it("reports a message per invalid field", () => {
    const r = parseRegister({ name: "A", email: "khong-phai-email", password: "123" });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.fieldErrors.name).toBeTruthy();
      expect(r.fieldErrors.email).toBeTruthy();
      expect(r.fieldErrors.password).toBeTruthy();
    }
  });

  it("rejects non-string values", () => {
    expect(parseRegister({ name: 1, email: null, password: {} }).success).toBe(false);
  });
});

describe("parseLogin", () => {
  it("requires a password but does not enforce the registration length rule", () => {
    expect(parseLogin({ email: "a@b.co", password: "" }).success).toBe(false);
    expect(parseLogin({ email: "a@b.co", password: "x" }).success).toBe(true);
  });
});
