"use client";

import { type Locale } from "@/i18n/locales";

interface StrategicPartnersProps {
  locale?: Locale;
}

export function StrategicPartners({ locale = "vi" }: StrategicPartnersProps) {
  const isEn = locale === "en";

  const partners = [
    { name: "UNESCO Vietnam", type: "Tổ chức Di sản Thế giới" },
    { name: "Sở Du Lịch Hà Nội", type: "Cơ quan Quản lý" },
    { name: "Trung Tâm Bảo Tồn Di Sản", type: "Đối tác Văn hóa" },
    { name: "Vietnam Airlines", type: "Hàng không Quốc gia" },
    { name: "TripAdvisor", type: "Cộng đồng Du lịch Toàn cầu" },
    { name: "Agoda", type: "Nền tảng Lưu trú" },
  ];

  return (
    <section className="bg-stone-50/80 py-10 sm:py-12 border-y border-stone-200/80 text-[#1c2421]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#526159] mb-6">
          {isEn
            ? "Strategic Partners & Cultural Heritage Affiliates"
            : "Đồng hành cùng những đơn vị di sản & du lịch hàng đầu"}
        </p>

        {/* Partner Logos/Chips Strip matching 00:16 */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-2 rounded-xl bg-white border border-stone-200 px-4 py-2.5 shadow-2xs hover:border-emerald-600/40 hover:shadow-sm transition-all"
            >
              <span className="flex size-2 rounded-full bg-emerald-600" />
              <span className="font-serif text-xs sm:text-sm font-bold text-[#103C34]">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
