import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hanoi Discovery - Cổng Thông Tin Du Lịch Thủ Đô",
    short_name: "Hanoi Discovery",
    description:
      "Cổng thông tin và cẩm nang du lịch thủ đô Hà Nội đa ngôn ngữ, định vị bản đồ và trải nghiệm di sản văn hóa.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c2825",
    theme_color: "#0c2825",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    categories: ["travel", "tourism", "culture", "navigation"],
    lang: "vi",
  };
}
