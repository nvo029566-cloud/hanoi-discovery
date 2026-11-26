/**
 * Only allow same-site relative paths as post-login redirect targets
 * (blocks open redirects such as "//evil.com" or "https://evil.com").
 */
export function safeRedirectPath(value: unknown, fallback = "/profile"): string {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return fallback;
  if (/[\u0000-\u001f]/.test(value)) return fallback;
  if (value === "/login" || value.startsWith("/login?") || value === "/register" || value.startsWith("/register?")) {
    return fallback;
  }
  return value;
}
