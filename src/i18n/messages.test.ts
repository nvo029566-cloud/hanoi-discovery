import { describe, expect, it } from "vitest";
import { getMessages } from "./messages";

function keys(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) return [prefix];
  return Object.entries(value).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
}

describe("messages", () => {
  it("has the same keys in Vietnamese and English", () => {
    expect(keys(getMessages("en")).sort()).toEqual(keys(getMessages("vi")).sort());
  });

  it("formats plurals and counts", () => {
    const en = getMessages("en");
    expect(en.explorer.destCount(1)).toBe("1 destination");
    expect(en.explorer.destCount(3)).toBe("3 destinations");
    expect(getMessages("vi").explorer.destCount(3)).toBe("3 điểm đến");
  });
});
