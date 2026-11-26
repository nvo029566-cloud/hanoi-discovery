"use client";

import { Star } from "lucide-react";
import { type Locale } from "@/i18n/locales";

interface VisitorReviewsProps {
  locale?: Locale;
}

export function VisitorReviews({ locale = "vi" }: VisitorReviewsProps) {
  const isEn = locale === "en";

  const reviews = [
    {
      id: "rev-1",
      name: "Jean-Pierre Dupont",
      role: isEn ? "Culture Enthusiast · France" : "Du khách văn hóa · Pháp",
      avatar: "J",
      rating: 5,
      tag: "VĂN MIẾU – QUỐC TỬ GIÁM",
      commentVi:
        "“Một trải nghiệm tuyệt vời! Lịch trình 1 ngày đưa tôi qua Văn Miếu và Hoàng Thành rất khoa học. Audio guide thuyết minh tự động từng góc nhỏ giúp tôi cảm nhận trọn vẹn bề dày ngàn năm của Hà Nội.”",
      commentEn:
        "“An outstanding experience! The 1-day itinerary through the Temple of Literature and Citadel was so thoughtfully curated. The automatic audio guide helped me feel the millennial depth of Hanoi.”",
    },
    {
      id: "rev-2",
      name: "Nguyễn Hoàng Bảo Long",
      role: isEn ? "Photographer · Vietnam" : "Nhiếp ảnh gia · TP. Hồ Chí Minh",
      avatar: "B",
      rating: 5,
      tag: "36 PHỐ PHƯỜNG HÀ NỘI",
      commentVi:
        "“Bản đồ tương tác và các gợi ý ẩm thực phố cổ cực kỳ chuẩn xác. Tôi đã tìm được quán phở và cà phê trứng gia truyền đúng vị nguyên bản mà không bị lẫn vào bẫy du lịch.”",
      commentEn:
        "“The interactive map and Old Quarter culinary tips are exceptionally accurate. I found authentic generational pho and egg coffee spots without falling into tourist traps.”",
    },
    {
      id: "rev-3",
      name: "Sarah Jenkins",
      role: isEn ? "Travel Blogger · Australia" : "Travel Blogger · Úc",
      avatar: "S",
      rating: 5,
      tag: "TOUR ĐÊM HỎA LÒ",
      commentVi:
        "“Tour đêm Hỏa Lò và trải nghiệm 360° VR đưa lại cảm xúc rung động sâu sắc. Hanoi Discovery không chỉ là cổng thông tin mà là cẩm nang dẫn lối văn hóa đích thực.”",
      commentEn:
        "“The Hoa Lo night tour and 360° VR experience were deeply moving. Hanoi Discovery is truly an authentic cultural compass, not just another tourism directory.”",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 text-[#1c2421]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Section Header matching 00:13 */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-2">
            {isEn ? "TESTIMONIALS & STORIES" : "GÓC NHÌN DU KHÁCH"}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#103C34]">
            {isEn ? "What Visitors Say" : "Du khách nói gì?"}
          </h2>
          <p className="text-xs sm:text-sm text-[#526159] mt-2 font-light">
            {isEn
              ? "Thousands of memorable journeys have been shaped across our millennial capital."
              : "Hàng ngàn chuyến đi đáng nhớ đã được đồng hành và kết nối trọn vẹn tại Thủ đô."}
          </p>
        </div>

        {/* 3 Review Cards Grid matching 00:13 - 00:14 */}
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-[#FAF8F3] p-6 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-emerald-600/40 hover:-translate-y-1"
            >
              <div>
                {/* Tag & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                    {rev.tag}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm leading-relaxed text-[#233B32] font-normal italic mb-6">
                  {isEn ? rev.commentEn : rev.commentVi}
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-stone-200/80 flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#103C34] text-white font-bold text-sm shadow-sm">
                  {rev.avatar}
                </span>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#103C34] truncate">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-[#526159] truncate">
                    {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
