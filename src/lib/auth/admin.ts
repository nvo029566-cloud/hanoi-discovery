import { notFound, redirect } from "next/navigation";
import { getCurrentUser, type CurrentUser } from "./session";

// Server-only module. Two guards with different failure modes:
// - requireAdmin(): for pages. Guests go to login, signed-in non-admins get a 404 (the area is not advertised).
// - assertAdmin(): for server actions. Throws, so a forged request can never write anything.

export async function requireAdmin(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=%2Fadmin");
  if (user.role !== "ADMIN") notFound();
  return user;
}

export async function assertAdmin(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") throw new Error("Forbidden");
  return user;
}
