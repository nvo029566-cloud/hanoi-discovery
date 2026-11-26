import type { Metadata } from "next";
import { ServicesView } from "@/components/services/services-view";
import { customPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = customPageMetadata(
  "vi",
  "/services",
  "Dịch Vụ & Đặt Vé Du Lịch Thủ Đô",
  "Cổng thông tin đặt vé xe buýt 2 tầng Hop-On Hop-Off, vé xem múa rối nước Thăng Long, tour đêm di tích và phương tiện du lịch Hà Nội.",
);

export default function ServicesPage() {
  return <ServicesView locale="vi" />;
}
