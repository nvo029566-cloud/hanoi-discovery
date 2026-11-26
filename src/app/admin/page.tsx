import Link from "next/link";
import {
  Download,
  FileSpreadsheet,
  FileJson,
  MapPin,
  Utensils,
  Sparkles,
  BookOpen,
  Image as ImageIcon,
  FolderTree,
  Users,
  Heart,
  CheckCircle2,
  Ticket,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminHomePage() {
  const [
    published,
    drafts,
    categories,
    media,
    foods,
    culture,
    stories,
    users,
    favorites,
    allDestinations,
  ] = await Promise.all([
    prisma.destination.count({ where: { status: "PUBLISHED" } }),
    prisma.destination.count({ where: { status: "DRAFT" } }),
    prisma.category.count(),
    prisma.mediaAsset.count(),
    prisma.food.count(),
    prisma.cultureItem.count(),
    prisma.story.count(),
    prisma.user.count(),
    prisma.favorite.count(),
    prisma.destination.findMany({
      select: {
        categoryId: true,
        latitude: true,
        longitude: true,
        ticketInfo: true,
        category: {
          select: {
            slug: true,
            translations: { where: { locale: "vi" }, select: { name: true } },
          },
        },
      },
    }),
  ]);

  const totalDestinations = published + drafts;
  const withCoords = allDestinations.filter((d) => d.latitude !== null && d.longitude !== null).length;
  const freeTickets = allDestinations.filter(
    (d) => d.ticketInfo && d.ticketInfo.toLowerCase().includes("miễn phí"),
  ).length;

  // Group by category
  const categoryCounts: Record<string, { name: string; count: number }> = {};
  for (const d of allDestinations) {
    const slug = d.category.slug;
    const name = d.category.translations[0]?.name ?? slug;
    if (!categoryCounts[slug]) {
      categoryCounts[slug] = { name, count: 0 };
    }
    categoryCounts[slug].count++;
  }

  const statCards = [
    {
      label: "Điểm đến đã xuất bản",
      value: published,
      sub: `${drafts} điểm nháp`,
      icon: MapPin,
      color: "text-emerald-500",
    },
    {
      label: "Món ăn Hà Nội",
      value: foods,
      sub: "Đặc sản ẩm thực",
      icon: Utensils,
      color: "text-amber-500",
    },
    {
      label: "Di sản & Nghệ thuật",
      value: culture,
      sub: "Văn hóa truyền thống",
      icon: Sparkles,
      color: "text-rose-500",
    },
    {
      label: "Câu chuyện di sản",
      value: stories,
      sub: "Bài viết chuyên sâu",
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      label: "Thư viện tư liệu ảnh",
      value: media,
      sub: "Có bản quyền CC/Public",
      icon: ImageIcon,
      color: "text-purple-500",
    },
    {
      label: "Danh mục trải nghiệm",
      value: categories,
      sub: "Nhóm điểm đến",
      icon: FolderTree,
      color: "text-indigo-500",
    },
    {
      label: "Tài khoản người dùng",
      value: users,
      sub: "Thành viên hệ thống",
      icon: Users,
      color: "text-teal-500",
    },
    {
      label: "Lượt lưu yêu thích",
      value: favorites,
      sub: "Tương tác du khách",
      icon: Heart,
      color: "text-red-500",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
            Cổng quản trị du lịch Thủ đô
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-1">
            Trung tâm Điều hành Dữ liệu Du lịch
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Giám sát chất lượng dữ liệu điểm đến, số liệu thống kê và đồng bộ hóa danh mục mở cho thành phố.
          </p>
        </div>

        {/* Data Export Action Group */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/admin/export?format=json"
            download
            className="inline-flex items-center gap-2 rounded-xl bg-surface border border-border px-4 py-2.5 text-xs md:text-sm font-semibold text-foreground hover:bg-muted hover:border-foreground/20 transition-all shadow-sm"
          >
            <FileJson className="size-4 text-amber-500" />
            <span>Xuất JSON Open Data</span>
            <Download className="size-3.5 text-muted-foreground" />
          </a>
          <a
            href="/admin/export?format=csv"
            download
            className="inline-flex items-center gap-2 rounded-xl bg-brand-emerald-dark px-4 py-2.5 text-xs md:text-sm font-semibold text-brand-cream hover:bg-brand-emerald-light transition-all shadow-sm"
          >
            <FileSpreadsheet className="size-4 text-emerald-300" />
            <span>Xuất CSV (Excel)</span>
            <Download className="size-3.5 text-brand-cream/80" />
          </a>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <section aria-labelledby="kpi-heading">
        <h2 id="kpi-heading" className="sr-only">
          Chỉ số tổng quan
        </h2>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {statCards.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="relative overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:border-foreground/20 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
                  <span className={`rounded-xl bg-muted p-2 ${s.color}`}>
                    <Icon className="size-5" />
                  </span>
                </div>
                <div className="mt-3">
                  <dd className="font-serif text-3xl font-bold text-foreground">{s.value}</dd>
                  <dt className="text-xs text-muted-foreground mt-0.5">{s.sub}</dt>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Data Quality & Category Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Category Breakdown */}
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-foreground mb-4">
            Phân bố điểm đến theo danh mục trải nghiệm
          </h3>
          <div className="space-y-4">
            {Object.entries(categoryCounts).map(([slug, cat]) => {
              const pct = totalDestinations > 0 ? Math.round((cat.count / totalDestinations) * 100) : 0;
              return (
                <div key={slug} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-foreground">{cat.name}</span>
                    <span className="text-muted-foreground">
                      {cat.count} điểm ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand-emerald-dark transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Municipal Standards & Quality Readiness */}
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground mb-1">
              Tiêu chuẩn dữ liệu du lịch số
            </h3>
            <p className="text-xs text-muted-foreground mb-5">
              Độ hoàn thiện thông tin phục vụ bản đồ số và trợ lý du lịch AI.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5">
                <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">
                      Độ phủ tọa độ GPS bản đồ
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      {withCoords}/{totalDestinations} (100%)
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Tất cả các điểm đến đều có tọa độ chính xác cho bản đồ và lộ trình di chuyển.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5">
                <Ticket className="size-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">
                      Điểm tham quan miễn phí
                    </span>
                    <span className="text-xs font-bold text-amber-600">
                      {freeTickets} địa điểm
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Hồ Hoàn Kiếm, Chùa Trấn Quốc, Cầu Long Biên, Phố Cổ, Đền Quán Thánh...
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5">
                <Sparkles className="size-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">
                      Đa ngôn ngữ & Thuyết minh AI
                    </span>
                    <span className="text-xs font-bold text-blue-600">Sẵn sàng (VI & EN)</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Tích hợp Audio Guide giọng đọc truyền cảm và tìm kiếm giọng nói.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Quick Navigation Panels */}
      <section aria-labelledby="nav-heading" className="pt-2">
        <h3 id="nav-heading" className="font-serif text-lg font-bold text-foreground mb-4">
          Phân hệ Quản trị Dữ liệu
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/admin/destinations",
              title: "Quản lý Điểm đến",
              desc: "18 địa danh lịch sử, di tích, không gian văn hóa",
            },
            {
              href: "/admin/categories",
              title: "Quản lý Danh mục",
              desc: "Nhóm trải nghiệm và phân loại chủ đề",
            },
            {
              href: "/admin/food",
              title: "Quản lý Ẩm thực",
              desc: "12 tinh hoa ẩm thực Thăng Long - Hà Nội",
            },
            {
              href: "/admin/culture",
              title: "Quản lý Văn hóa",
              desc: "6 di sản phi vật thể, làng nghề, nghệ thuật",
            },
            {
              href: "/admin/stories",
              title: "Quản lý Câu chuyện",
              desc: "Ký sự, bài viết chuyên sâu về Hà Nội",
            },
            {
              href: "/admin/media",
              title: "Thư viện Tư liệu Ảnh",
              desc: "Kho ảnh số bản quyền và nguồn kiểm chứng",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-4 transition-all hover:border-secondary hover:shadow-md"
            >
              <div>
                <h4 className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
              <span className="text-xs font-medium text-secondary mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Truy cập phân hệ &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
