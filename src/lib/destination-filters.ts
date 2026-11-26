import type { Destination } from "@/types/content";

export interface DistrictInfo {
  slug: string;
  nameVi: string;
  nameEn: string;
}

export const HANOI_DISTRICTS: DistrictInfo[] = [
  { slug: "hoan-kiem", nameVi: "Quận Hoàn Kiếm", nameEn: "Hoan Kiem District" },
  { slug: "ba-dinh", nameVi: "Quận Ba Đình", nameEn: "Ba Dinh District" },
  { slug: "tay-ho", nameVi: "Quận Tây Hồ", nameEn: "Tay Ho District" },
  { slug: "dong-da", nameVi: "Quận Đống Đa", nameEn: "Dong Da District" },
  { slug: "cau-giay", nameVi: "Quận Cầu Giấy", nameEn: "Cau Giay District" },
  { slug: "ha-dong", nameVi: "Quận Hà Đông", nameEn: "Ha Dong District" },
  { slug: "ngoai-thanh", nameVi: "Khu vực Ngoại thành", nameEn: "Suburbs & Outskirts" },
];

export const DESTINATION_DISTRICTS: Record<string, string> = {
  "hoan-kiem-lake": "hoan-kiem",
  "hanoi-old-quarter": "hoan-kiem",
  "st-josephs-cathedral": "hoan-kiem",
  "hanoi-opera-house": "hoan-kiem",
  "hoa-lo-prison": "hoan-kiem",
  "vietnam-national-museum-of-history": "hoan-kiem",
  "long-bien-bridge": "hoan-kiem",
  "thang-long-water-puppet-theatre": "hoan-kiem",
  "dong-xuan-market": "hoan-kiem",
  "ho-chi-minh-mausoleum": "ba-dinh",
  "one-pillar-pagoda": "ba-dinh",
  "imperial-citadel-of-thang-long": "ba-dinh",
  "quan-thanh-temple": "ba-dinh",
  "vietnam-fine-arts-museum": "ba-dinh",
  "thang-long-imperial-water-tower": "ba-dinh",
  "west-lake": "tay-ho",
  "tran-quoc-pagoda": "tay-ho",
  "temple-of-literature": "dong-da",
  "vietnam-museum-of-ethnology": "cau-giay",
  "van-phuc-silk-village": "ha-dong",
  "quang-phu-cau-incense-village": "ngoai-thanh",
  "duong-lam-ancient-village": "ngoai-thanh",
  "bat-trang-pottery-village": "ngoai-thanh",
  "ba-vi-national-park": "ngoai-thanh",
  "huong-pagoda": "ngoai-thanh",
  "co-loa-citadel": "ngoai-thanh",
};

export function getDestinationDistrict(slug: string): string | undefined {
  return DESTINATION_DISTRICTS[slug];
}

export function isFreeAdmission(destination: Destination): boolean {
  if (!destination.ticketInfo) return true;
  const text = destination.ticketInfo.toLowerCase();
  return text.includes("miễn phí") || text.includes("free");
}

export function filterDestinationsAdvanced(
  destinations: Destination[],
  options: {
    district?: string;
    fee?: "free" | "paid" | "";
  },
): Destination[] {
  return destinations.filter((d) => {
    if (options.district) {
      const dist = getDestinationDistrict(d.slug);
      if (dist !== options.district) return false;
    }
    if (options.fee === "free") {
      if (!isFreeAdmission(d)) return false;
    } else if (options.fee === "paid") {
      if (isFreeAdmission(d)) return false;
    }
    return true;
  });
}
