import Link from "next/link";
import { redirect } from "next/navigation";
import { DestinationCard } from "@/components/home/destination-card";
import { logoutAction } from "@/lib/auth/actions";
import { getCurrentUser } from "@/lib/auth/session";
import { getCatalog } from "@/lib/catalog";
import { getCategory } from "@/lib/content";
import { prisma } from "@/lib/prisma";

/** Server component: needs a session, so render it inside <Suspense>. */
export async function ProfileContent() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=%2Fprofile");

  const [{ destinations, categories }, favorites] = await Promise.all([
    getCatalog(),
    prisma.favorite.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: { destination: { select: { slug: true } } },
    }),
  ]);
  // Preserve "most recently saved first" order; skip entries that are no longer published.
  const saved = favorites
    .map((f) => destinations.find((d) => d.slug === f.destination.slug))
    .filter((d) => d !== undefined);

  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Hồ sơ</p>
          <h1 className="mt-3 font-serif text-[length:var(--text-hero)] leading-tight">{user.name}</h1>
          <p className="mt-2 text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {user.role === "ADMIN" && (
            <Link
              href="/admin"
              className="inline-flex min-h-11 items-center rounded-[10px] bg-primary px-4 font-medium text-primary-foreground"
            >
              Khu quản trị
            </Link>
          )}
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center rounded-[10px] border border-border bg-surface px-4 font-medium"
            >
              Đăng xuất
            </button>
          </form>
        </div>
      </header>

      <section aria-labelledby="favorites-title" className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="favorites-title" className="font-serif text-2xl font-bold">
            Điểm đến yêu thích ({saved.length})
          </h2>
          {saved.length > 0 && (
            <Link
              href="/planner"
              className="inline-flex min-h-10 items-center gap-2 rounded-[10px] bg-primary/10 px-4 text-xs font-bold text-primary hover:bg-primary/20 transition-colors"
            >
              🗺️ Lập lịch trình từ điểm yêu thích
            </Link>
          )}
        </div>
        {saved.length === 0 ? (
          <p className="mt-4 text-muted-foreground">
            Bạn chưa lưu điểm đến nào.{" "}
            <Link href="/destinations" className="font-medium text-primary underline underline-offset-4">
              Khám phá điểm đến
            </Link>{" "}
            và bấm “Lưu vào yêu thích”.
          </p>
        ) : (
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((d, i) => (
              <li key={d.slug}>
                <DestinationCard destination={d} categoryName={getCategory(categories, d.category)?.name} index={i} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
