import { Landmark, Utensils, Sparkles, ShieldCheck, Clock } from "lucide-react";
import type { Locale } from "@/i18n/locales";

export function TrustStatsSection({ locale = "vi" }: { locale?: Locale }) {
  const isEn = locale === "en";

  const STATS = [
    {
      icon: Clock,
      value: "1.014+",
      unitVi: "Năm Văn Hiến",
      unitEn: "Years of History",
      descVi: "Kể từ Chiếu dời đô của vua Lý Thái Tổ năm 1010",
      descEn: "Since King Ly Thai To moved the royal capital in 1010",
    },
    {
      icon: Landmark,
      value: "26",
      unitVi: "Danh Thắng & Di Tích",
      unitEn: "Heritage Landmarks",
      descVi: "Di sản Thế giới UNESCO, Di tích Quốc gia đặc biệt",
      descEn: "UNESCO World Heritage, National special relics",
    },
    {
      icon: Utensils,
      value: "20",
      unitVi: "Món Ăn Đặc Sản",
      unitEn: "Iconic Dishes",
      descVi: "Tinh hoa ẩm thực Tràng An được thế giới vinh danh",
      descEn: "Celebrated internationally by global food critics",
    },
    {
      icon: Sparkles,
      value: "12",
      unitVi: "Làng Nghề & Di Sản",
      unitEn: "Craft Guilds & Arts",
      descVi: "Phường nghề thủ công & nghệ thuật diễn xướng",
      descEn: "Master artisan villages & living folk traditions",
    },
    {
      icon: ShieldCheck,
      value: "100%",
      unitVi: "Chính Thống & Kiểm Chứng",
      unitEn: "Verified Open Data",
      descVi: "Dữ liệu chuẩn hóa phục vụ cộng đồng & du khách",
      descEn: "Standardized civic tourism knowledge base",
    },
  ];

  return (
    <section aria-label={isEn ? "Hanoi Tourism in Numbers" : "Hà Nội qua những con số ấn tượng"} className="border-y border-amber-400/20 bg-[#062220] py-14 text-white">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-amber-300">
            {isEn ? "HANOI AT A GLANCE" : "DẤU ẤN KINH KỲ"}
          </p>
          <h2 className="mt-2 font-serif text-2xl md:text-3xl font-bold text-white">
            {isEn ? "Thang Long – Hanoi in Numbers" : "Thủ Đô Nghìn Năm Qua Những Con Số"}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-amber-400/40 hover:bg-white/10 group"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300 mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="size-5" />
                </div>
                <span className="font-serif text-3xl md:text-4xl font-extrabold text-amber-300 tracking-tight">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs md:text-sm font-bold text-white">
                  {isEn ? stat.unitEn : stat.unitVi}
                </span>
                <span className="mt-1 text-[11px] text-white/70 leading-relaxed font-light">
                  {isEn ? stat.descEn : stat.descVi}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
