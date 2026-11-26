import { describe, expect, it } from "vitest";
import { localeFromPathname, localePath, stripLocale, switchLocalePath } from "./locales";

describe("locale paths", () => {
  it("detects the locale from the pathname", () => {
    expect(localeFromPathname("/")).toBe("vi");
    expect(localeFromPathname("/food")).toBe("vi");
    expect(localeFromPathname("/en")).toBe("en");
    expect(localeFromPathname("/en/food/pho")).toBe("en");
    expect(localeFromPathname("/english")).toBe("vi");
  });

  it("builds localized paths", () => {
    expect(localePath("vi", "/food")).toBe("/food");
    expect(localePath("en", "/")).toBe("/en");
    expect(localePath("en", "/destinations?q=lake")).toBe("/en/destinations?q=lake");
  });

  it("strips the prefix", () => {
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/en/map")).toBe("/map");
    expect(stripLocale("/map")).toBe("/map");
  });

  it("switches between languages", () => {
    expect(switchLocalePath("/destinations/west-lake", "en")).toBe("/en/destinations/west-lake");
    expect(switchLocalePath("/en/destinations/west-lake", "vi")).toBe("/destinations/west-lake");
    expect(switchLocalePath("/", "en")).toBe("/en");
    expect(switchLocalePath("/en", "vi")).toBe("/");
  });
});
