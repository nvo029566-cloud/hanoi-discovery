/**
 * Normalizes text for accent-insensitive Vietnamese search.
 * "Hồ Hoàn Kiếm" -> "ho hoan kiem", "Đường" -> "duong".
 * Note: "đ/Đ" has no Unicode decomposition, so it is mapped explicitly.
 */
export function normalizeVietnamese(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** True when every word of the query appears in the (normalized) text. */
export function matchesQuery(text: string, query: string): boolean {
  const haystack = normalizeVietnamese(text);
  const words = normalizeVietnamese(query).split(" ").filter(Boolean);
  return words.every((w) => haystack.includes(w));
}
