import Link from "next/link";
import { ArrowRight, Utensils, Award } from "lucide-react";
import { CoverImage } from "@/components/ui/cover-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import type { Food } from "@/types/content";

export function TasteOfHanoi({ foods, locale = "vi" }: { foods: Food[]; locale?: Locale }) {
  const m = getMessages(locale).home;
  const isEn = locale === "en";

  // Spotlight: 4 signature dishes for home landing page
  const spotlightFoods = foods.slice(0, 4);

  return (
    <section aria-labelledby="taste-title" className="mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24">
      {/* Featured Header & Story Banner */}
      <div className="grid items-center gap-10 lg:grid-cols-12 mb-12">
        <div className="lg:col-span-7">
          <SectionHeading
            id="taste-title"
            eyebrow={m.tasteEyebrow}
            title={m.tasteTitle}
            description={
              isEn
                ? "Hanoi's culinary tapestry is an art of delicate balance: bone-broth simmered through the night, fresh herbs from Me Tri, and the world-famous egg coffee born in 1946."
                : "Ẩm thực Hà Nội là nghệ thuật của sự thanh tao và tinh tế: nước dùng phở ninh truyền đời qua đêm, hương cốm Mễ Trì mùa thu và tách cà phê trứng béo ngậy ra đời từ năm 1946."
            }
          />
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={localePath(locale, "/food")}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-xs md:text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary-light hover:shadow-lg"
            >
              <span>
                {isEn
                  ? `Explore all ${foods.length} dishes`
                  : `Khám phá trọn bộ ${foods.length} món ăn`}
              </span>
              <ArrowRight className="size-4" />
            </Link>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Award className="size-4 text-amber-500" />
              <span>{isEn ? "Top 10 Global Food Destination" : "Bình chọn Top 10 ẩm thực toàn cầu"}</span>
            </span>
          </div>
        </div>

        {/* Right Highlight Photo Card */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-[24px] border border-border shadow-xl aspect-[4/3] group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pho.jpg"
              alt="Phở Bát Đàn - Tinh hoa ẩm thực Hà Nội"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/30 backdrop-blur border border-amber-400/40 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-2">
                <Utensils className="size-3" />
                {isEn ? "Culinary Legend" : "Di sản ẩm thực"}
              </span>
              <h3 className="font-serif text-xl font-bold text-white drop-shadow">
                {isEn ? "Phở Bát Đàn & Hanoi Culinary Rituals" : "Phở Bát Đàn & Văn Hóa Ẩm Thực Kẻ Chợ"}
              </h3>
              <p className="text-xs text-white/80 mt-1 line-clamp-2">
                {isEn
                  ? "Steaming beef noodle soup served since early dawn in the heart of Hanoi Old Quarter."
                  : "Hương vị phở bò gia truyền trứ danh níu chân hàng triệu thực khách mỗi sớm mai."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Food Grid */}
      <ul
        aria-label={m.tasteList}
        tabIndex={0}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {spotlightFoods.map((f, i) => (
          <li key={f.slug}>
            <Link
              href={localePath(locale, `/food/${f.slug}`)}
              className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-surface shadow-sm transition-all duration-300 hover:border-secondary hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <CoverImage
                  image={f.image}
                  slug={f.slug}
                  label={f.name}
                  index={i}
                  locale={locale}
                  className="size-full transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 left-3 text-[11px] font-semibold text-amber-300 drop-shadow">
                  #{i + 1} {isEn ? "Specialty" : "Món ngon"}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {f.name}
                    {f.englishName && (
                      <span className="block text-xs font-normal text-muted-foreground mt-0.5">
                        {f.englishName}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground font-light line-clamp-2">
                    {f.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between text-xs">
                  <span className="font-bold text-primary group-hover:text-secondary transition-colors inline-flex items-center gap-1">
                    <span>{isEn ? "View dish" : "Xem chi tiết"}</span>
                    <ArrowRight className="size-3" />
                  </span>
                  <span className="text-[11px] text-muted-foreground/80">
                    {isEn ? "Authentic" : "Chính gốc"}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
