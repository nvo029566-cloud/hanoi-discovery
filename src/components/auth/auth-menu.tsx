import { getCurrentUser } from "@/lib/auth/session";
import { AuthLink } from "./auth-link";

/** Server component: reads the session, then hands the display name to a client link. Render inside <Suspense>. */
export async function AuthMenu() {
  const user = await getCurrentUser();
  return <AuthLink name={user ? user.name : null} />;
}
