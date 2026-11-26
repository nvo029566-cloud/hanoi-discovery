import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";

describe("PWA Web App Manifest", () => {
  it("returns a valid PWA manifest configuration for Hanoi Discovery", () => {
    const data = manifest();
    expect(data.name).toContain("Hanoi Discovery");
    expect(data.short_name).toBe("Hanoi Discovery");
    expect(data.start_url).toBe("/");
    expect(data.display).toBe("standalone");
    expect(data.theme_color).toBe("#0c2825");
    expect(data.background_color).toBe("#0c2825");
    expect(Array.isArray(data.icons)).toBe(true);
    expect(data.icons && data.icons.length).toBeGreaterThan(0);
    expect(data.icons?.[0]?.src).toBe("/icon.svg");
  });
});
