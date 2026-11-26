import { describe, expect, it } from "vitest";
import { safeRedirectPath } from "./redirect";

describe("safeRedirectPath", () => {
  it("keeps same-site relative paths", () => {
    expect(safeRedirectPath("/destinations/temple-of-literature")).toBe("/destinations/temple-of-literature");
    expect(safeRedirectPath("/planner?days=2")).toBe("/planner?days=2");
  });

  it("falls back for external, protocol-relative, or malformed targets", () => {
    for (const bad of ["https://evil.com", "//evil.com", "/\\evil.com", "evil", "", null, undefined, 5, "/a\nb"]) {
      expect(safeRedirectPath(bad)).toBe("/profile");
    }
  });

  it("does not bounce back to the auth pages", () => {
    expect(safeRedirectPath("/login")).toBe("/profile");
    expect(safeRedirectPath("/register?x=1")).toBe("/profile");
  });
});
