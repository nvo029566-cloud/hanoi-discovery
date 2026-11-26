import Link from "next/link";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { FavoriteButton } from "./favorite-button";

/** Server component: favorite button for signed-in users, sign-in prompt for guests. Render inside <Suspense>. */
export async function FavoriteToggle({ slug, locale = "vi" }: { slug: string; locale?: Locale }) {
  const m = getMessages(locale).auth;
  const user = await getCurrentUser();
  if (!user) {
    const next = encodeURIComponent(localePath(locale, `/destinations/${slug}`));
    return (
      <Link href={`/login?next=${next}`} className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4">
        {m.signInToFavorite}
      </Link>
    );
  }
  const existing = await prisma.favorite.findFirst({
    where: { userId: user.id, destination: { slug } },
    select: { userId: true },
  });
  return <FavoriteButton slug={slug} initialFavorited={existing !== null} locale={locale} />;
}
