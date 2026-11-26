export type GuideCategoryKey = "all" | "experience" | "transport" | "cuisine" | "seasons" | "corners";

export interface GuideCategory {
  key: GuideCategoryKey;
  labelVi: string;
  labelEn: string;
}

export const GUIDE_CATEGORIES: GuideCategory[] = [
  { key: "all", labelVi: "Tất cả", labelEn: "All" },
  { key: "experience", labelVi: "Kinh nghiệm", labelEn: "Experience" },
  { key: "transport", labelVi: "Di chuyển", labelEn: "Transit" },
  { key: "cuisine", labelVi: "Ẩm thực", labelEn: "Cuisine" },
  { key: "seasons", labelVi: "Bốn mùa Hà Nội", labelEn: "Four Seasons" },
  { key: "corners", labelVi: "Góc Hà Nội", labelEn: "Hanoi Corners" },
];

export interface ArticleHeading {
  id: string;
  titleVi: string;
  titleEn: string;
  level: 2 | 3;
}

export interface MentionedPlace {
  slug: string;
  nameVi: string;
  nameEn: string;
  areaVi: string;
  areaEn: string;
  summaryVi: string;
  summaryEn: string;
  image: string;
  href: string;
}

export interface TravelTipBlock {
  titleVi: string;
  titleEn: string;
  itemsVi: string[];
  itemsEn: string[];
}

export type ArticleContentBlock =
  | { type: "paragraph"; textVi: string; textEn: string }
  | {
      type: "image";
      src: string;
      altVi: string;
      altEn: string;
      captionVi?: string;
      captionEn?: string;
      badge?: string;
      aspectRatio?: string;
    }
  | {
      type: "imageGrid";
      images: {
        src: string;
        altVi: string;
        altEn: string;
        captionVi?: string;
        captionEn?: string;
      }[];
    }
  | {
      type: "callout";
      titleVi?: string;
      titleEn?: string;
      textVi: string;
      textEn: string;
    }
  | {
      type: "quote";
      textVi: string;
      textEn?: string;
      authorVi?: string;
      authorEn?: string;
    };

export interface ArticleSection {
  id: string;
  headingVi: string;
  headingEn: string;
  shortTitleVi?: string;
  shortTitleEn?: string;
  level: 2 | 3;
  paragraphsVi: string[];
  paragraphsEn: string[];
  blocks?: ArticleContentBlock[];
  quoteVi?: { text: string; author?: string };
  quoteEn?: { text: string; author?: string };
  image?: {
    src: string;
    altVi: string;
    altEn: string;
    captionVi?: string;
    captionEn?: string;
    badge?: string;
  };
  secondaryImage?: {
    src: string;
    altVi: string;
    altEn: string;
    captionVi?: string;
    captionEn?: string;
    badge?: string;
  };
  imageGrid?: {
    src: string;
    altVi: string;
    altEn: string;
    captionVi?: string;
    captionEn?: string;
  }[];
  calloutTipVi?: string;
  calloutTipEn?: string;
}

export interface TravelGuideArticle {
  id: string;
  slug: string;
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  descriptionEn: string;
  categoryKey: GuideCategoryKey;
  categoryLabelVi: string;
  categoryLabelEn: string;
  authorVi: string;
  authorEn: string;
  updatedAtVi: string;
  updatedAtEn: string;
  publishedAtIso: string;
  readingTimeVi: string;
  readingTimeEn: string;
  readingTimeMinutes: number;
  coverImage: string;
  coverImageAltVi: string;
  coverImageAltEn: string;
  coverImageCaptionVi: string;
  coverImageCaptionEn: string;
  coverImageCreditVi: string;
  coverImageCreditEn: string;
  coverImageBadge?: string;
  /** Backward compatibility aliases */
  image?: string;
  imageAltVi?: string;
  imageAltEn?: string;
  isFeaturedDefault?: boolean;
  href: string;
  sections: ArticleSection[];
  tips: TravelTipBlock;
  mentionedPlaces: MentionedPlace[];
  relatedSlugs: string[];
}

export const TRAVEL_GUIDE_ARTICLES: TravelGuideArticle[] = [
  // =================================================================================
  // 1. BÀI VIẾT NỔI BẬT: Hẹn với Hà Nội vào một ngày thu
  // =================================================================================
  {
    id: "hen-voi-ha-noi-vao-mot-ngay-thu",
    slug: "hen-voi-ha-noi-vao-mot-ngay-thu",
    titleVi: "Hẹn với Hà Nội vào một ngày thu",
    titleEn: "A Rendezvous with Hanoi on an Autumn Day",
    descriptionVi:
      "Có một Hà Nội dịu dàng trong những con phố ngập lá vàng, hương hoa sữa và những buổi sáng se lạnh. Cùng khám phá vẻ đẹp đặc biệt của mùa thu Thủ đô.",
    descriptionEn:
      "Hanoi reveals its most poetic charm through golden foliage avenues, sweet milk-flower scents, and crisp mornings. Discover the capital's magical autumn.",
    categoryKey: "seasons",
    categoryLabelVi: "BỐN MÙA HÀ NỘI",
    categoryLabelEn: "FOUR SEASONS",
    authorVi: "Ban Biên Tập Hanoi Discovery",
    authorEn: "Hanoi Discovery Editorial Board",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-01T08:00:00Z",
    readingTimeVi: "12 phút đọc",
    readingTimeEn: "12 min read",
    readingTimeMinutes: 12,
    coverImage: "/images/guide/featured-autumn-phan-dinh-phung.jpg",
    coverImageAltVi: "Một buổi sáng trên phố Phan Đình Phùng",
    coverImageAltEn: "A morning on Phan Dinh Phung street",
    coverImageCaptionVi: "Một buổi sáng trên phố Phan Đình Phùng.",
    coverImageCaptionEn: "A morning on Phan Dinh Phung street.",
    coverImageCreditVi: "Tư liệu Nhiếp ảnh Di sản Hà Nội",
    coverImageCreditEn: "Hanoi Heritage Photography Archives",
    isFeaturedDefault: true,
    href: "/guide/hen-voi-ha-noi-vao-mot-ngay-thu",
    sections: [
      {
        id: "ha-noi-vao-thu",
        headingVi: "Khi Hà Nội bước vào mùa thu",
        headingEn: "When Hanoi Enters Autumn",
        shortTitleVi: "Hà Nội vào thu",
        shortTitleEn: "Hanoi in Autumn",
        level: 2,
        paragraphsVi: [
          "Không phải ngẫu nhiên mà mùa thu Hà Nội luôn đi vào thơ ca, nhạc họa như một biểu tượng đẹp đẽ và sâu lắng nhất của vùng đất kinh kỳ nghìn năm văn hiến. Khi những cơn gió heo may đầu mùa khẽ lướt qua mặt nước Hồ Gươm, cái nắng gay gắt của mùa hè nhiệt đới bỗng nhường chỗ cho sắc trời xanh biếc và bầu không khí mát mẻ, trong trẻo đến nao lòng.",
          "Vào thời khắc ấy, nhịp sống vốn dĩ hối hả của đô thị dường như chùng xuống một nhịp. Buổi sớm mai, những tia nắng vàng óng như mật xuyên qua vòm lá rậm rạp của những rặng xà cừ, hàng sấu cổ thụ hàng trăm năm tuổi, tạo thành những luồng sáng lung linh chiếu rọi xuống mặt đường còn ướt đẫm sương đêm. Không gian bảng lảng hương hoa sữa thoang thoảng từ góc phố Quang Trung hay Nguyễn Du, đưa du khách vào một miền hoài niệm khó tả.",
          "Dọc theo các con phố cổ kính, những chiếc xe đạp chở hoa rực rỡ sắc màu chầm chậm lăn bánh: từ cúc họa mi trắng tinh khôi, hoa thạch thảo tím biếc đến những búp sen hồng cuối mùa từ đầm sen Quảng Bá. Đối với cả người dân địa phương lẫn du khách bốn phương, mùa thu không chỉ là một mùa trong năm, mà là một cảm xúc, một lời hẹn ước ngọt ngào không thể lỡ hẹn với mảnh đất Thăng Long.",
          "Mùa thu Hà Nội không ồn ào phô trương. Nó ẩn hiện trong tiếng rao sớm vọng lại từ những con ngõ nhỏ ngoằn ngoèo, trong làn sương mỏng giăng mắc trên những mái ngói thâm nâu của 36 phố phường, và trong ánh mắt hiền hòa của những cụ già khoan thai dạo bước bên hồ. Đó là vẻ đẹp của sự tĩnh tại, của chiều sâu lắng đọng sau nghìn năm thăng trầm lịch sử.",
        ],
        paragraphsEn: [
          "It is no coincidence that Hanoi's autumn has forever inspired Vietnamese literature, music, and art as the most poetic symbol of this millennial capital. When the first crisp northeasterly breezes caress the waters of Sword Lake, the sweltering tropical summer yields to cerulean skies and refreshing, crystal-clear air that stirs the soul.",
          "At this magical juncture, the bustling urban velocity visibly softens into a gentle rhythm. At dawn, golden shafts of sunlight filter through centenarian mahogany and dracontomelon canopies, casting ethereal beams onto pavements still damp with morning dew. The subtle perfume of milk flowers drifts from corners along Quang Trung and Nguyen Du streets, carrying wanderers into nostalgic reveries.",
          "Along heritage avenues, bicycles laden with blooming bouquets glide languidly past: delicate white winter daisies, purple asters, and the season's last pink lotuses from Quang Ba ponds. For locals and international travelers alike, autumn is far more than a mere season — it is an emotional state, a cherished rendezvous with the soul of Thang Long.",
          "Hanoi's autumn avoids noisy ostentation. It manifests quietly in dawn street cries echoing from winding alleys, in thin veils of mist clinging to weathered terracotta rooftops of the Old Quarter, and in the serene gazes of elders taking contemplative morning strolls. It is the beauty of stillness, distilled through a thousand years of cultural resonance.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Không phải ngẫu nhiên mà mùa thu Hà Nội luôn đi vào thơ ca, nhạc họa như một biểu tượng đẹp đẽ và sâu lắng nhất của vùng đất kinh kỳ nghìn năm văn hiến. Khi những cơn gió heo may đầu mùa khẽ lướt qua mặt nước Hồ Gươm, cái nắng gay gắt của mùa hè nhiệt đới bỗng nhường chỗ cho sắc trời xanh biếc và bầu không khí mát mẻ, trong trẻo đến nao lòng.",
            textEn:
              "It is no coincidence that Hanoi's autumn has forever inspired Vietnamese literature, music, and art as the most poetic symbol of this millennial capital. When the first crisp northeasterly breezes caress the waters of Sword Lake, the sweltering tropical summer yields to cerulean skies and refreshing, crystal-clear air that stirs the soul.",
          },
          {
            type: "paragraph",
            textVi:
              "Vào thời khắc ấy, nhịp sống vốn dĩ hối hả của đô thị dường như chùng xuống một nhịp. Buổi sớm mai, những tia nắng vàng óng như mật xuyên qua vòm lá rậm rạp của những rặng xà cừ, hàng sấu cổ thụ hàng trăm năm tuổi, tạo thành những luồng sáng lung linh chiếu rọi xuống mặt đường còn ướt đẫm sương đêm. Không gian bảng lảng hương hoa sữa thoang thoảng từ góc phố Quang Trung hay Nguyễn Du, đưa du khách vào một miền hoài niệm khó tả.",
            textEn:
              "At this magical juncture, the bustling urban velocity visibly softens into a gentle rhythm. At dawn, golden shafts of sunlight filter through centenarian mahogany and dracontomelon canopies, casting ethereal beams onto pavements still damp with morning dew. The subtle perfume of milk flowers drifts from corners along Quang Trung and Nguyen Du streets, carrying wanderers into nostalgic reveries.",
          },
          {
            type: "image",
            src: "/images/guide/article-autumn-flower-bike.jpg",
            altVi: "Những xe hoa mang theo sắc màu của Hà Nội",
            altEn: "Flower bicycles bearing the vibrant colors of Hanoi",
            captionVi: "Những xe hoa mang theo sắc màu của mùa thu Hà Nội lăn bánh trên phố sớm.",
            captionEn: "Flower bicycles carrying autumn colors across early morning streets.",
          },
          {
            type: "paragraph",
            textVi:
              "Dọc theo các con phố cổ kính, những chiếc xe đạp chở hoa rực rỡ sắc màu chầm chậm lăn bánh: từ cúc họa mi trắng tinh khôi, hoa thạch thảo tím biếc đến những búp sen hồng cuối mùa từ đầm sen Quảng Bá. Đối với cả người dân địa phương lẫn du khách bốn phương, mùa thu không chỉ là một mùa trong năm, mà là một cảm xúc, một lời hẹn ước ngọt ngào không thể lỡ hẹn với mảnh đất Thăng Long.",
            textEn:
              "Along heritage avenues, bicycles laden with blooming bouquets glide languidly past: delicate white winter daisies, purple asters, and the season's last pink lotuses from Quang Ba ponds. For locals and international travelers alike, autumn is far more than a mere season — it is an emotional state, a cherished rendezvous with the soul of Thang Long.",
          },
          {
            type: "paragraph",
            textVi:
              "Mùa thu Hà Nội không ồn ào phô trương. Nó ẩn hiện trong tiếng rao sớm vọng lại từ những con ngõ nhỏ ngoằn ngoèo, trong làn sương mỏng giăng mắc trên những mái ngói thâm nâu của 36 phố phường, và trong ánh mắt hiền hòa của những cụ già khoan thai dạo bước bên hồ. Đó là vẻ đẹp của sự tĩnh tại, của chiều sâu lắng đọng sau nghìn năm thăng trầm lịch sử.",
            textEn:
              "Hanoi's autumn avoids noisy ostentation. It manifests quietly in dawn street cries echoing from winding alleys, in thin veils of mist clinging to weathered terracotta rooftops of the Old Quarter, and in the serene gazes of elders taking contemplative morning strolls. It is the beauty of stillness, distilled through a thousand years of cultural resonance.",
          },
          {
            type: "quote",
            textVi:
              "Hà Nội mùa thu, cây cơm nguội vàng, cây bàng lá đỏ, nằm kề bên nhau, phố xưa nhà cổ, mái ngói thâm nâu...",
            textEn:
              "Autumn in Hanoi, golden foliage embracing scarlet leaves, ancient quarters leaning side-by-side beneath weathered brown tiles...",
            authorVi: "Nhạc sĩ Trịnh Công Sơn",
            authorEn: "Composer Trinh Cong Son",
          },
        ],
      },
      {
        id: "nhung-con-pho-dep",
        headingVi: "Những con phố không thể bỏ lỡ",
        headingEn: "Streets You Cannot Miss",
        shortTitleVi: "Những con phố đẹp",
        shortTitleEn: "Iconic Streets",
        level: 2,
        paragraphsVi: [
          "Nếu muốn bắt trọn khoảnh khắc giao mùa ngoạn mục nhất của Thủ đô, hành trình dạo bộ dưới vòm cây phố Phan Đình Phùng chắc chắn là điểm dừng chân đầu tiên. Được mệnh danh là 'con đường lãng mạn nhất Hà Nội', con phố sở hữu vỉa hè rộng thênh thang rợp bóng hai hàng sấu cổ thụ sum suê. Vào những ngày thu tháng mười, lá sấu vàng trút xuống xào xạc theo từng cơn gió thoảng, phủ kín lối đi như một tấm thảm dệt tự nhiên tuyệt mỹ.",
          "Liền kề đó là đường Hoàng Diệu – con phố thanh bình và trang nghiêm nép mình bên bức tường thành đá ong của Hoàng thành Thăng Long. Những rặng xà cừ khổng lồ xòe tán râm mát, đối diện là những ngôi biệt thự kiến trúc Đông Dương cổ kính nhuốm màu rêu phong. Tản bộ nơi đây vào khoảng 7 giờ sáng, bạn sẽ nghe thấy tiếng chim hót ríu rít giữa tầng cây và bắt gặp hình ảnh những tà áo dài thướt tha lưu giữ nét thanh lịch Tràng An.",
          "Rời khu Ba Đình cổ kính về phía trung tâm, vòng hồ Hoàn Kiếm mở ra bức tranh thơ mộng với rặng liễu rủ ven bờ soi bóng xuống mặt nước xanh ngọc bích. Từ cầu Thê Húc đỏ son dẫn vào Đền Ngọc Sơn đến Tháp Rùa trầm mặc giữa lòng hồ mờ sương, mỗi bước chân đều gắn liền với những truyền tích lịch sử hào hùng. Đừng quên rẽ qua phố Tràng Tiền ngắm nhìn những hiệu sách cổ kính, hay thong thả dạo bước trên phố Đinh Tiên Hoàng để tận hưởng trọn vẹn sự thanh thản giữa lòng đô hội.",
          "Mỗi ngã tư nơi đây đều mang trong mình một câu chuyện. Đứng dưới bóng cây cổ thụ của phố Trần Phú hay rẽ vào ngõ Huyện tĩnh lặng, du khách sẽ cảm nhận được sự đan xen kỳ diệu giữa không gian di sản cổ kính và nhịp đập đương đại thanh lịch.",
        ],
        paragraphsEn: [
          "To capture the capital's seasonal transition at its zenith, a morning stroll beneath the towering canopies of Phan Dinh Phung Street is unmissable. Celebrated as Hanoi's most romantic promenade, it boasts grand pedestrian sidewalks shaded by parallel colonnades of ancient dracontomelon trees. Come October, golden leaves shower down in rustling gusts, blanketing the flagstones in an opulent carpet.",
          "Adjoining is Hoang Dieu Street — a serene, stately avenue running alongside the historic laterite ramparts of the Imperial Citadel. Towering African mahogany trees stretch overhead, facing French Indochinese colonial villas patinated with moss. Strolling here at 7 AM, birdsong resonates through the leaves alongside ladies in flowing traditional Ao Dai, preserving the quintessential elegance of Trang An.",
          "Heading toward the historic center, Hoan Kiem Lake presents a mesmerizing tableau of weeping willows dipping over jade waters. From the scarlet Huc Bridge leading into Ngoc Son Temple to ancient Turtle Tower floating in early mist, every vantage point breathes legends. Take time to branch onto Trang Tien with its historic French bookshops and architecture, savoring deep peace in the city's heart.",
          "Every intersection carries historical memory. Lingering under centenary boughs on Tran Phu or turning into secluded Ngo Huyen alley, travelers feel the magical interplay between monumental heritage and graceful contemporary tempo.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Nếu muốn bắt trọn khoảnh khắc giao mùa ngoạn mục nhất của Thủ đô, hành trình dạo bộ dưới vòm cây phố Phan Đình Phùng chắc chắn là điểm dừng chân đầu tiên. Được mệnh danh là 'con đường lãng mạn nhất Hà Nội', con phố sở hữu vỉa hè rộng thênh thang rợp bóng hai hàng sấu cổ thụ sum suê. Vào những ngày thu tháng mười, lá sấu vàng trút xuống xào xạc theo từng cơn gió thoảng, phủ kín lối đi như một tấm thảm dệt tự nhiên tuyệt mỹ.",
            textEn:
              "To capture the capital's seasonal transition at its zenith, a morning stroll beneath the towering canopies of Phan Dinh Phung Street is unmissable. Celebrated as Hanoi's most romantic promenade, it boasts grand pedestrian sidewalks shaded by parallel colonnades of ancient dracontomelon trees. Come October, golden leaves shower down in rustling gusts, blanketing the flagstones in an opulent carpet.",
          },
          {
            type: "callout",
            titleVi: "Ghi chú cho hành trình",
            titleEn: "Journey Note",
            textVi:
              "Hãy dành thời gian đi bộ vào buổi sáng sớm (06:30 – 08:30) để cảm nhận không khí yên bình, ngắm vệt nắng xuyên qua tán cây và quan sát trọn vẹn nhịp sống địa phương.",
            textEn:
              "Take time for an early morning stroll (06:30 – 08:30 AM) to embrace the tranquil atmosphere, catch ethereal sunbeams, and observe authentic local life.",
          },
          {
            type: "paragraph",
            textVi:
              "Liền kề đó là đường Hoàng Diệu – con phố thanh bình và trang nghiêm nép mình bên bức tường thành đá ong của Hoàng thành Thăng Long. Những rặng xà cừ khổng lồ xòe tán râm mát, đối diện là những ngôi biệt thự kiến trúc Đông Dương cổ kính nhuốm màu rêu phong. Tản bộ nơi đây vào khoảng 7 giờ sáng, bạn sẽ nghe thấy tiếng chim hót ríu rít giữa tầng cây và bắt gặp hình ảnh những tà áo dài thướt tha lưu giữ nét thanh lịch Tràng An.",
            textEn:
              "Adjoining is Hoang Dieu Street — a serene, stately avenue running alongside the historic laterite ramparts of the Imperial Citadel. Towering African mahogany trees stretch overhead, facing French Indochinese colonial villas patinated with moss. Strolling here at 7 AM, birdsong resonates through the leaves alongside ladies in flowing traditional Ao Dai, preserving the quintessential elegance of Trang An.",
          },
          {
            type: "imageGrid",
            images: [
              {
                src: "/images/guide/article-hoan-kiem-bench.jpg",
                altVi: "Hồ Hoàn Kiếm ghế đá mùa thu sương mờ",
                altEn: "Hoan Kiem Lake morning mist and autumn foliage",
                captionVi: "Hồ Hoàn Kiếm – sáng mùa thu sương mờ tĩnh lặng",
                captionEn: "Hoan Kiem Lake morning serenity",
              },
              {
                src: "/images/guide/article-phan-dinh-phung-avenue.jpg",
                altVi: "Con đường Phan Đình Phùng ngập lá vàng",
                altEn: "Phan Dinh Phung avenue carpeted in yellow leaves",
                captionVi: "Phố Phan Đình Phùng rợp bóng sấu cổ thụ",
                captionEn: "Phan Dinh Phung tree-lined avenue",
              },
            ],
          },
          {
            type: "paragraph",
            textVi:
              "Rời khu Ba Đình cổ kính về phía trung tâm, vòng hồ Hoàn Kiếm mở ra bức tranh thơ mộng với rặng liễu rủ ven bờ soi bóng xuống mặt nước xanh ngọc bích. Từ cầu Thê Húc đỏ son dẫn vào Đền Ngọc Sơn đến Tháp Rùa trầm mặc giữa lòng hồ mờ sương, mỗi bước chân đều gắn liền với những truyền tích lịch sử hào hùng. Đừng quên rẽ qua phố Tràng Tiền ngắm nhìn những hiệu sách cổ kính, hay thong thả dạo bước trên phố Đinh Tiên Hoàng để tận hưởng trọn vẹn sự thanh thản giữa lòng đô hội.",
            textEn:
              "Heading toward the historic center, Hoan Kiem Lake presents a mesmerizing tableau of weeping willows dipping over jade waters. From the scarlet Huc Bridge leading into Ngoc Son Temple to ancient Turtle Tower floating in early mist, every vantage point breathes legends. Take time to branch onto Trang Tien with its historic French bookshops and architecture, savoring deep peace in the city's heart.",
          },
          {
            type: "paragraph",
            textVi:
              "Mỗi ngã tư nơi đây đều mang trong mình một câu chuyện. Đứng dưới bóng cây cổ thụ của phố Trần Phú hay rẽ vào ngõ Huyện tĩnh lặng, du khách sẽ cảm nhận được sự đan xen kỳ diệu giữa không gian di sản cổ kính và nhịp đập đương đại thanh lịch.",
            textEn:
              "Every intersection carries historical memory. Lingering under centenary boughs on Tran Phu or turning into secluded Ngo Huyen alley, travelers feel the magical interplay between monumental heritage and graceful contemporary tempo.",
          },
        ],
      },
      {
        id: "huong-vi-mua-thu",
        headingVi: "Hương vị của mùa thu",
        headingEn: "Flavors of Autumn",
        shortTitleVi: "Hương vị mùa thu",
        shortTitleEn: "Autumn Flavors",
        level: 2,
        paragraphsVi: [
          "Mùa thu Hà Nội không chỉ được cảm nhận bằng thị giác mà còn đánh thức mọi giác quan qua nền ẩm thực tinh tế, mang đậm phong vị đồng quê châu thổ sông Hồng. Trong số đó, cốm non làng Vòng chính là 'thức quà thần tiên' tượng trưng cho sự thuần khiết của đất trời chớm thu. Từng hạt nếp non dẻo quánh, xanh mướt như ngọc bích được gói cẩn thận trong hai lớp lá: lớp lá ráy bên trong giữ độ ẩm dẻo, lớp lá sen tươi bên ngoài ướp đượm hương thơm thanh khiết.",
          "Thưởng thức cốm là cả một nghệ thuật đòi hỏi sự chậm rãi: không thể ăn bằng thìa hay đũa, mà phải dùng đầu ngón tay nhón nhẹ từng nhúm nhỏ, nhai thật chậm để cảm nhận vị ngọt bùi béo ngậy của hạt lúa non tan dần trên đầu lưỡi. Ăn cốm mộc kèm một quả chuối tiêu trứng cuốc ngọt lịm, nhấp thêm ngụm trà sen Bách Diệp Tây Hồ nóng hổi, đó chính là đỉnh cao của sự tao nhã kinh kỳ mà bất kỳ du khách sành ăn nào cũng tìm kiếm.",
          "Bên cạnh cốm non, ẩm thực thu Hà Nội còn nức tiếng với chả rươi – món ăn theo mùa độc nhất vô nhị chỉ xuất hiện rộ vào 'tháng chín đôi mươi, tháng mười mùng năm'. Đĩa chả rươi chiên vàng ruộm, thơm nức hương vỏ quýt khô, thì là và ớt cay xè, ăn kèm bún tươi và nước mắm chua ngọt làm xiêu lòng bất cứ ai. Khi đêm về gió se lạnh, bát xôi cốm hạt sen dừa nạo hay bát bánh trôi tàu nóng hổi dậy mùi gừng tươi bên hè phố Hàng Giầy sẽ sưởi ấm lòng người lữ khách.",
          "Vào những đêm thu se lạnh, hương thơm của gừng già và đường mật từ những gánh hàng bánh trôi tàu trên phố Hàng Giầy hay quán xôi cốm nức tiếng chợ Hôm như một liều thuốc ấm áp xoa dịu tâm hồn người lữ thứ giữa trời đêm Thủ đô.",
        ],
        paragraphsEn: [
          "Autumn in Hanoi awakens every sense through refined gastronomy steeped in the agricultural heritage of the Red River delta. Among these delicacies, Vong village green rice flakes (com) reign as the heavenly gift of early autumn. Tender young glutinous grains, emerald green and chewy, are wrapped in two layers of leaves: elephant ear leaves inside to preserve moisture, and fresh lotus leaves outside imparting celestial fragrance.",
          "Savoring com is an art requiring mindfulness: one never uses cutlery, but gently pinches small clusters with fingertips, chewing slowly so the milky sweetness of unripe rice gently unfurls on the palate. Pairing fresh com with ripe spotted bananas and piping-hot West Lake Bach Diep lotus tea embodies the pinnacle of imperial elegance.",
          "Beyond green rice, autumn culinary heritage celebrates sand-worm omelet (cha ruoi) — a rare delicacy harvested strictly during specific lunar tidal cycles in late autumn. Sizzling golden patties perfumed with dried tangerine peel, fresh dill, and chili create an unforgettable feast. As night chills gather, steaming bowls of sweet ginger dumplings (banh troi tau) on Hang Giay street warm every wanderer's soul.",
          "On crisp autumn evenings, the aroma of aged ginger and molasses syrup from street-side dumplings on Hang Giay or warm sweet com sticky rice at Hom Market offers comforting solace to night wanderers.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Mùa thu Hà Nội không chỉ được cảm nhận bằng thị giác mà còn đánh thức mọi giác quan qua nền ẩm thực tinh tế, mang đậm phong vị đồng quê châu thổ sông Hồng. Trong số đó, cốm non làng Vòng chính là 'thức quà thần tiên' tượng trưng cho sự thuần khiết của đất trời chớm thu. Từng hạt nếp non dẻo quánh, xanh mướt như ngọc bích được gói cẩn thận trong hai lớp lá: lớp lá ráy bên trong giữ độ ẩm dẻo, lớp lá sen tươi bên ngoài ướp đượm hương thơm thanh khiết.",
            textEn:
              "Autumn in Hanoi awakens every sense through refined gastronomy steeped in the agricultural heritage of the Red River delta. Among these delicacies, Vong village green rice flakes (com) reign as the heavenly gift of early autumn. Tender young glutinous grains, emerald green and chewy, are wrapped in two layers of leaves: elephant ear leaves inside to preserve moisture, and fresh lotus leaves outside imparting celestial fragrance.",
          },
          {
            type: "paragraph",
            textVi:
              "Thưởng thức cốm là cả một nghệ thuật đòi hỏi sự chậm rãi: không thể ăn bằng thìa hay đũa, mà phải dùng đầu ngón tay nhón nhẹ từng nhúm nhỏ, nhai thật chậm để cảm nhận vị ngọt bùi béo ngậy của hạt lúa non tan dần trên đầu lưỡi. Ăn cốm mộc kèm một quả chuối tiêu trứng cuốc ngọt lịm, nhấp thêm ngụm trà sen Bách Diệp Tây Hồ nóng hổi, đó chính là đỉnh cao của sự tao nhã kinh kỳ mà bất kỳ du khách sành ăn nào cũng tìm kiếm.",
            textEn:
              "Savoring com is an art requiring mindfulness: one never uses cutlery, but gently pinches small clusters with fingertips, chewing slowly so the milky sweetness of unripe rice gently unfurls on the palate. Pairing fresh com with ripe spotted bananas and piping-hot West Lake Bach Diep lotus tea embodies the pinnacle of imperial elegance.",
          },
          {
            type: "image",
            src: "/images/guide/article-autumn-com-tea.jpg",
            altVi: "Mẹt cốm non làng Vòng và chén trà sen mùa thu",
            altEn: "Vong green rice flakes and fragrant lotus tea",
            captionVi: "Cốm làng Vòng và chén trà sen – thức quà tinh hoa của mùa thu Hà thành.",
            captionEn: "Vong green rice flakes and lotus tea – refined autumn essence.",
          },
          {
            type: "paragraph",
            textVi:
              "Bên cạnh cốm non, ẩm thực thu Hà Nội còn nức tiếng với chả rươi – món ăn theo mùa độc nhất vô nhị chỉ xuất hiện rộ vào 'tháng chín đôi mươi, tháng mười mùng năm'. Đĩa chả rươi chiên vàng ruộm, thơm nức hương vỏ quýt khô, thì là và ớt cay xè, ăn kèm bún tươi và nước mắm chua ngọt làm xiêu lòng bất cứ ai. Khi đêm về gió se lạnh, bát xôi cốm hạt sen dừa nạo hay bát bánh trôi tàu nóng hổi dậy mùi gừng tươi bên hè phố Hàng Giầy sẽ sưởi ấm lòng người lữ khách.",
            textEn:
              "Beyond green rice, autumn culinary heritage celebrates sand-worm omelet (cha ruoi) — a rare delicacy harvested strictly during specific lunar tidal cycles in late autumn. Sizzling golden patties perfumed with dried tangerine peel, fresh dill, and chili create an unforgettable feast. As night chills gather, steaming bowls of sweet ginger dumplings (banh troi tau) on Hang Giay street warm every wanderer's soul.",
          },
          {
            type: "image",
            src: "/images/cha-ruoi.jpg",
            altVi: "Đĩa chả rươi thơm lừng vỏ quýt và thì là",
            altEn: "Sizzling sand-worm omelet with tangerine peel",
            captionVi: "Chả rươi nóng hổi – thức quà độc đáo mùa thu lưu giữ tinh hoa ẩm thực đồng bằng Bắc Bộ.",
            captionEn: "Sizzling Cha Ruoi – a unique seasonal autumn delicacy of the Red River Delta.",
          },
          {
            type: "paragraph",
            textVi:
              "Vào những đêm thu se lạnh, hương thơm của gừng già và đường mật từ những gánh hàng bánh trôi tàu trên phố Hàng Giầy hay quán xôi cốm nức tiếng chợ Hôm như một liều thuốc ấm áp xoa dịu tâm hồn người lữ thứ giữa trời đêm Thủ đô.",
            textEn:
              "On crisp autumn evenings, the aroma of aged ginger and molasses syrup from street-side dumplings on Hang Giay or warm sweet com sticky rice at Hom Market offers comforting solace to night wanderers.",
          },
        ],
      },
      {
        id: "trai-nghiem",
        headingVi: "Những trải nghiệm thu khó quên",
        headingEn: "Unforgettable Autumn Experiences",
        shortTitleVi: "Trải nghiệm",
        shortTitleEn: "Experiences",
        level: 2,
        paragraphsVi: [
          "Để gom trọn tinh hoa của mùa thu vào ký ức, hãy bắt đầu ngày mới bằng việc thức dậy lúc 5 giờ 30 sáng. Đi bộ một vòng quanh bờ hồ Hoàn Kiếm khi mặt nước còn bảng lảng hơi sương mỏng, lắng nghe tiếng chổi tre quét lá vàng xào xạc của người công nhân môi trường, và hòa cùng nhịp sống chậm rãi của các cụ già đang khoan thai tập thái cực quyền dưới bóng cây cổ thụ.",
          "Khoảng giữa trưa, hãy ghé thăm một quán cà phê nằm sâu trong con ngõ nhỏ của phố Hàng Gai hay Nguyễn Hữu Huân. Leo lên căn gác hai của ngôi nhà Pháp cổ, chọn một chiếc bàn nhỏ cạnh ô cửa sổ gỗ màu xanh đã tróc sơn, nhâm nhi ly cà phê trứng nóng hổi sánh mịn như nhung. Lớp kem trứng béo ngậy quyện cùng vị cà phê đắng đậm đà, văng vẳng tiếng nhạc Trịnh sâu lắng, khiến mọi âu lo đời thường như tan biến.",
          "Và khi ánh chiều tà dần buông xuống, không có trải nghiệm nào thi vị hơn là đạp xe hoặc tản bộ trên cây cầu Long Biên lịch sử trăm năm tuổi. Đứng trên nhịp cầu thép cổ kính, đón từng luồng gió mát lành từ dòng sông Hồng chở nặng phù sa, phóng tầm mắt ngắm những vạt lau sậy trắng muốt đung đưa trên bãi bồi giữa dòng, và ngắm nhìn ráng hoàng hôn đỏ rực nhuộm thắm đường chân trời Thủ đô.",
          "Những khoảnh khắc giản dị ấy chính là linh hồn của Hà Nội: không hào nhoáng, không ồn ã, mà thấm đượm vào tâm hồn bằng sự thanh tao, ấm áp và hoài niệm khó phai.",
        ],
        paragraphsEn: [
          "To weave autumn memories into your journey, begin dawn at 5:30 AM beside Hoan Kiem Lake. Stroll the shoreline while delicate mist still hovers above the water, listen to the rhythmic sweep of bamboo brooms gathering fallen leaves, and observe elders practicing graceful tai chi under ancient trees.",
          "At midday, seek out a hidden cafe tucked deep inside a historic alley off Hang Gai or Nguyen Huu Huan. Climb up to the second floor of a French colonial villa, claim a wooden window table overlooking tile roofs, and cradle a cup of warm, velvety egg coffee. The rich creaminess mingling with robust dark roast, set to melancholic melodies, dissolves all worldly haste.",
          "And as golden hour descends, nothing rivals cycling or walking along the hundred-year-old Long Bien Bridge. Standing atop rusted cantilever steel spans, feeling the fresh breeze of the Red River, watching white reeds sway in alluvial sandbars, sunset paints the capital's horizon in glorious crimson.",
          "These quiet, unadorned moments constitute the true soul of Hanoi: not flashy or loud, but gently permeating the spirit with warmth, grace, and enduring memories.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Để gom trọn tinh hoa của mùa thu vào ký ức, hãy bắt đầu ngày mới bằng việc thức dậy lúc 5 giờ 30 sáng. Đi bộ một vòng quanh bờ hồ Hoàn Kiếm khi mặt nước còn bảng lảng hơi sương mỏng, lắng nghe tiếng chổi tre quét lá vàng xào xạc của người công nhân môi trường, và hòa cùng nhịp sống chậm rãi của các cụ già đang khoan thai tập thái cực quyền dưới bóng cây cổ thụ.",
            textEn:
              "To weave autumn memories into your journey, begin dawn at 5:30 AM beside Hoan Kiem Lake. Stroll the shoreline while delicate mist still hovers above the water, listen to the rhythmic sweep of bamboo brooms gathering fallen leaves, and observe elders practicing graceful tai chi under ancient trees.",
          },
          {
            type: "image",
            src: "/images/guide/corners-egg-coffee.jpg",
            altVi: "Ly cà phê trứng ấm nóng trong quán nhỏ",
            altEn: "Warm egg coffee in heritage alley cafe",
            captionVi: "Cà phê trứng – khoảng lặng bình yên trong con ngõ nhỏ phố cổ.",
            captionEn: "Egg coffee – a moment of serene contemplation tucked away in an Old Quarter lane.",
          },
          {
            type: "paragraph",
            textVi:
              "Khoảng giữa trưa, hãy ghé thăm một quán cà phê nằm sâu trong con ngõ nhỏ của phố Hàng Gai hay Nguyễn Hữu Huân. Leo lên căn gác hai của ngôi nhà Pháp cổ, chọn một chiếc bàn nhỏ cạnh ô cửa sổ gỗ màu xanh đã tróc sơn, nhâm nhi ly cà phê trứng nóng hổi sánh mịn như nhung. Lớp kem trứng béo ngậy quyện cùng vị cà phê đắng đậm đà, văng vẳng tiếng nhạc Trịnh sâu lắng, khiến mọi âu lo đời thường như tan biến.",
            textEn:
              "At midday, seek out a hidden cafe tucked deep inside a historic alley off Hang Gai or Nguyen Huu Huan. Climb up to the second floor of a French colonial villa, claim a wooden window table overlooking tile roofs, and cradle a cup of warm, velvety egg coffee. The rich creaminess mingling with robust dark roast, set to melancholic melodies, dissolves all worldly haste.",
          },
          {
            type: "paragraph",
            textVi:
              "Và khi ánh chiều tà dần buông xuống, không có trải nghiệm nào thi vị hơn là đạp xe hoặc tản bộ trên cây cầu Long Biên lịch sử trăm năm tuổi. Đứng trên nhịp cầu thép cổ kính, đón từng luồng gió mát lành từ dòng sông Hồng chở nặng phù sa, phóng tầm mắt ngắm những vạt lau sậy trắng muốt đung đưa trên bãi bồi giữa dòng, và ngắm nhìn ráng hoàng hôn đỏ rực nhuộm thắm đường chân trời Thủ đô.",
            textEn:
              "And as golden hour descends, nothing rivals cycling or walking along the hundred-year-old Long Bien Bridge. Standing atop rusted cantilever steel spans, feeling the fresh breeze of the Red River, watching white reeds sway in alluvial sandbars, sunset paints the capital's horizon in glorious crimson.",
          },
          {
            type: "image",
            src: "/images/long-bien-bridge.jpg",
            altVi: "Cầu Long Biên hoàng hôn buông xuống sông Hồng",
            altEn: "Historic Long Bien Bridge sunset over Red River",
            captionVi: "Cầu Long Biên lịch sử – đón ngọn gió thu lộng mát giữa dòng sông Hồng phù sa.",
            captionEn: "Historic Long Bien Bridge – catching refreshing autumn breezes across the Red River.",
          },
          {
            type: "paragraph",
            textVi:
              "Những khoảnh khắc giản dị ấy chính là linh hồn của Hà Nội: không hào nhoáng, không ồn ã, mà thấm đượm vào tâm hồn bằng sự thanh tao, ấm áp và hoài niệm khó phai.",
            textEn:
              "These quiet, unadorned moments constitute the true soul of Hanoi: not flashy or loud, but gently permeating the spirit with warmth, grace, and enduring memories.",
          },
        ],
      },
      {
        id: "lich-trinh-goi-y",
        headingVi: "Lịch trình gợi ý khám phá một ngày thu",
        headingEn: "Suggested Autumn Day Itinerary",
        shortTitleVi: "Lịch trình gợi ý",
        shortTitleEn: "Suggested Itinerary",
        level: 2,
        paragraphsVi: [
          "• Buổi sáng sớm (06:00 – 08:30): Bắt đầu ngày mới bằng chuyến tản bộ đón bình minh quanh Hồ Gươm, viếng thăm Đền Ngọc Sơn và chụp ảnh bên cầu Thê Húc. Ghé một quán phở bò gia truyền trên phố Bát Đàn hoặc Hàng Đồng để nạp năng lượng bằng bát phở nước dùng trong veo, bốc khói nghi ngút.",
          "• Buổi sáng (09:00 – 11:30): Di chuyển sang đường Phan Đình Phùng và Hoàng Diệu. Đây là khung giờ vàng khi những tia nắng thu xuyên qua kẽ lá đẹp nhất. Tham quan di tích Đoan Môn và Hoàng thành Thăng Long, dừng chân bên gánh hoa rong để lưu lại những bức ảnh kỷ niệm đầy chất thơ.",
          "• Buổi trưa & Nghỉ ngơi (12:00 – 14:00): Thưởng thức bún chả que tre nướng than hoa trên phố Hàng Quạt, sau đó tìm đến một quán cà phê ngõ nhỏ tĩnh lặng để thưởng thức cà phê trứng và đọc một cuốn sách hay.",
          "• Buổi chiều (14:30 – 17:30): Viếng thăm không gian tôn nghiêm của Văn Miếu – Quốc Tử Giám. Tiếp tục hành trình dạo quanh đường Thanh Niên – con đường nằm giữa Hồ Tây lộng gió và hồ Trúc Bạch thơ mộng, thưởng thức chén trà sen thơm ngát và ngắm nhìn hoàng hôn thu huyền ảo.",
          "• Buổi tối (18:30 – 21:30): Khép lại hành trình bằng bữa tối ấm cúng với chảo chả cá Lã Vọng thơm lừng, trước khi hòa mình vào không khí nhộn nhịp của phố đi bộ cuối tuần và thưởng thức que kem Tràng Tiền mát lạnh bên bờ hồ.",
        ],
        paragraphsEn: [
          "• Dawn (06:00 – 08:30 AM): Greet sunrise with a stroll around Sword Lake, visit Ngoc Son Temple, and take keepsake photos on The Huc Bridge. Head to a heritage pho eatery on Bat Dan or Hang Dong for a piping-hot, clear-broth beef noodle soup.",
          "• Morning (09:00 – 11:30 AM): Wander along Phan Dinh Phung and Hoang Dieu avenues during golden sunbeam hours. Tour Doan Mon Gate at the Imperial Citadel and stop by street flower vendors for evocative photos.",
          "• Midday & Rest (12:00 – 14:00 PM): Enjoy charcoal-grilled bun cha on Hang Quat, then retreat into a tranquil alley cafe for egg coffee and relaxing reading.",
          "• Afternoon (14:30 – 17:30 PM): Visit the solemn courtyards of the Temple of Literature. Continue toward Thanh Nien causeway separating West Lake and Truc Bach Lake, savor fragrant lotus tea, and witness stunning twilight skies.",
          "• Evening (18:30 – 21:30 PM): Conclude your day with a convivial dinner of sizzling Cha Ca La Vong, before immersing in the lively weekend pedestrian walking streets with a famous Trang Tien ice cream cone.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "• Buổi sáng sớm (06:00 – 08:30): Bắt đầu ngày mới bằng chuyến tản bộ đón bình minh quanh Hồ Gươm, viếng thăm Đền Ngọc Sơn và chụp ảnh bên cầu Thê Húc. Ghé một quán phở bò gia truyền trên phố Bát Đàn hoặc Hàng Đồng để nạp năng lượng bằng bát phở nước dùng trong veo, bốc khói nghi ngút.",
            textEn:
              "• Dawn (06:00 – 08:30 AM): Greet sunrise with a stroll around Sword Lake, visit Ngoc Son Temple, and take keepsake photos on The Huc Bridge. Head to a heritage pho eatery on Bat Dan or Hang Dong for a piping-hot, clear-broth beef noodle soup.",
          },
          {
            type: "paragraph",
            textVi:
              "• Buổi sáng (09:00 – 11:30): Di chuyển sang đường Phan Đình Phùng và Hoàng Diệu. Đây là khung giờ vàng khi những tia nắng thu xuyên qua kẽ lá đẹp nhất. Tham quan di tích Đoan Môn và Hoàng thành Thăng Long, dừng chân bên gánh hoa rong để lưu lại những bức ảnh kỷ niệm đầy chất thơ.",
            textEn:
              "• Morning (09:00 – 11:30 AM): Wander along Phan Dinh Phung and Hoang Dieu avenues during golden sunbeam hours. Tour Doan Mon Gate at the Imperial Citadel and stop by street flower vendors for evocative photos.",
          },
          {
            type: "image",
            src: "/images/guide/article-van-mieu-heritage.jpg",
            altVi: "Khuê Văn Các cổ kính soi bóng bên giếng Thiên Quang trong sớm thu",
            altEn: "Khue Van Cac pavilion reflected on Thien Quang well in autumn light",
            captionVi: "Văn Miếu – Quốc Tử Giám: Không gian di sản nghìn năm tĩnh lặng và thanh bình trong nắng thu.",
            captionEn: "Temple of Literature: Millennial heritage sanctuary serene in the gentle autumn sunshine.",
          },
          {
            type: "paragraph",
            textVi:
              "• Buổi trưa & Nghỉ ngơi (12:00 – 14:00): Thưởng thức bún chả que tre nướng than hoa trên phố Hàng Quạt, sau đó tìm đến một quán cà phê ngõ nhỏ tĩnh lặng để thưởng thức cà phê trứng và đọc một cuốn sách hay.",
            textEn:
              "• Midday & Rest (12:00 – 14:00 PM): Enjoy charcoal-grilled bun cha on Hang Quat, then retreat into a tranquil alley cafe for egg coffee and relaxing reading.",
          },
          {
            type: "paragraph",
            textVi:
              "• Buổi chiều (14:30 – 17:30): Viếng thăm không gian tôn nghiêm của Văn Miếu – Quốc Tử Giám. Tiếp tục hành trình dạo quanh đường Thanh Niên – con đường nằm giữa Hồ Tây lộng gió và hồ Trúc Bạch thơ mộng, thưởng thức chén trà sen thơm ngát và ngắm nhìn hoàng hôn thu huyền ảo.",
            textEn:
              "• Afternoon (14:30 – 17:30 PM): Visit the solemn courtyards of the Temple of Literature. Continue toward Thanh Nien causeway separating West Lake and Truc Bach Lake, savor fragrant lotus tea, and witness stunning twilight skies.",
          },
          {
            type: "image",
            src: "/images/west-lake.jpg",
            altVi: "Hoàng hôn Hồ Tây lộng gió",
            altEn: "Breezy West Lake twilight sunset",
            captionVi: "Hoàng hôn Hồ Tây – bức tranh thủy mặc huyền ảo của chiều thu Hà thành.",
            captionEn: "West Lake sunset – a breathtaking ink-wash painting of Hanoi's autumn dusk.",
          },
          {
            type: "paragraph",
            textVi:
              "• Buổi tối (18:30 – 21:30): Khép lại hành trình bằng bữa tối ấm cúng với chảo chả cá Lã Vọng thơm lừng, trước khi hòa mình vào không khí nhộn nhịp của phố đi bộ cuối tuần và thưởng thức que kem Tràng Tiền mát lạnh bên bờ hồ.",
            textEn:
              "• Evening (18:30 – 21:30 PM): Conclude your day with a convivial dinner of sizzling Cha Ca La Vong, before immersing in the lively weekend pedestrian walking streets with a famous Trang Tien ice cream cone.",
          },
        ],
      },
      {
        id: "nhung-luu-y",
        headingVi: "Những lưu ý hữu ích cho du khách",
        headingEn: "Useful Travel Notes",
        shortTitleVi: "Những lưu ý",
        shortTitleEn: "Important Notes",
        level: 2,
        paragraphsVi: [
          "Thời tiết mùa thu Hà Nội nổi tiếng chiều lòng người với độ ẩm thấp và trời khô ráo, nhưng biên độ nhiệt ngày và đêm có thể chênh lệch từ 6 đến 8 độ C. Buổi sớm mai và tối muộn nhiệt độ thường xuống dưới 21°C se lạnh, trong khi buổi trưa có nắng ấm dễ chịu. Bạn nên mang theo áo khoác len mỏng (cardigan), áo gió nhẹ hoặc khăn choàng lụa để dễ dàng phối đồ và giữ ấm cổ họng.",
          "Khung giờ chụp ảnh đẹp nhất trong ngày là từ 06:30 đến 08:30 sáng trên các tuyến phố có nhiều cây cổ thụ như Phan Đình Phùng, Trần Phú, Điện Biên Phủ; và từ 16:30 đến 17:30 chiều tại bến thuyền Hồ Tây hoặc trên cầu Long Biên khi ráng chiều ngả sang sắc tím vàng rực rỡ.",
          "Khi mua cốm làng Vòng hay các thức quà vặt ven đường, hãy chọn những gánh hàng rong có đậy lá sen tươi cẩn thận và hỏi giá trước một cách lịch thiệp. Với việc di chuyển, việc kết hợp linh hoạt giữa đi bộ, thuê xe đạp công cộng TNGo (có nhiều trạm xung quanh bờ hồ) và đi xe buýt 2 tầng City Tour sẽ mang lại trải nghiệm đa dạng và tiện lợi nhất cho chuyến đi của bạn.",
        ],
        paragraphsEn: [
          "Hanoi's autumn climate is wonderfully pleasant with low humidity, yet diurnal temperature shifts span 6 to 8 degrees Celsius. Mornings and nights dip below 21°C, while afternoons offer warm sun. Packing a lightweight cardigan, windbreaker, or silk scarf guarantees versatile layering and health protection.",
          "Optimal photography windows span 06:30 – 08:30 AM along tree-lined boulevards such as Phan Dinh Phung, Tran Phu, and Dien Bien Phu; and 16:30 – 17:30 PM at West Lake boat docks or Long Bien Bridge when dusk turns brilliant purple and gold.",
          "When purchasing Vong village green rice from street vendors, look for sellers who keep rice carefully shielded under fresh lotus leaves, and inquire about prices courteously. For mobility, combining walking with TNGo public shared bicycles and open-top City Tour buses ensures effortless exploration.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Thời tiết mùa thu Hà Nội nổi tiếng chiều lòng người với độ ẩm thấp và trời khô ráo, nhưng biên độ nhiệt ngày và đêm có thể chênh lệch từ 6 đến 8 độ C. Buổi sớm mai và tối muộn nhiệt độ thường xuống dưới 21°C se lạnh, trong khi buổi trưa có nắng ấm dễ chịu. Bạn nên mang theo áo khoác len mỏng (cardigan), áo gió nhẹ hoặc khăn choàng lụa để dễ dàng phối đồ và giữ ấm cổ họng.",
            textEn:
              "Hanoi's autumn climate is wonderfully pleasant with low humidity, yet diurnal temperature shifts span 6 to 8 degrees Celsius. Mornings and nights dip below 21°C, while afternoons offer warm sun. Packing a lightweight cardigan, windbreaker, or silk scarf guarantees versatile layering and health protection.",
          },
          {
            type: "callout",
            titleVi: "Mẹo trang phục và thời tiết",
            titleEn: "Weather & Attire Tip",
            textVi:
              "Chuẩn bị một chiếc khăn lụa hoặc áo len mỏng nhẹ. Nhiệt độ buổi sớm và đêm muộn có thể hạ xuống 19–21°C, rất lý tưởng để dạo bộ nhưng cần giữ ấm cơ thể.",
            textEn:
              "Pack a silk scarf or lightweight knit cardigan. Early morning and late evening temperatures often dip to 19–21°C, ideal for strolls but requiring light layering.",
          },
          {
            type: "paragraph",
            textVi:
              "Khung giờ chụp ảnh đẹp nhất trong ngày là từ 06:30 đến 08:30 sáng trên các tuyến phố có nhiều cây cổ thụ như Phan Đình Phùng, Trần Phú, Điện Biên Phủ; và từ 16:30 đến 17:30 chiều tại bến thuyền Hồ Tây hoặc trên cầu Long Biên khi ráng chiều ngả sang sắc tím vàng rực rỡ.",
            textEn:
              "Optimal photography windows span 06:30 – 08:30 AM along tree-lined boulevards such as Phan Dinh Phung, Tran Phu, and Dien Bien Phu; and 16:30 – 17:30 PM at West Lake boat docks or Long Bien Bridge when dusk turns brilliant purple and gold.",
          },
          {
            type: "paragraph",
            textVi:
              "Khi mua cốm làng Vòng hay các thức quà vặt ven đường, hãy chọn những gánh hàng rong có đậy lá sen tươi cẩn thận và hỏi giá trước một cách lịch thiệp. Với việc di chuyển, việc kết hợp linh hoạt giữa đi bộ, thuê xe đạp công cộng TNGo (có nhiều trạm xung quanh bờ hồ) và đi xe buýt 2 tầng City Tour sẽ mang lại trải nghiệm đa dạng và tiện lợi nhất cho chuyến đi của bạn.",
            textEn:
              "When purchasing Vong village green rice from street vendors, look for sellers who keep rice carefully shielded under fresh lotus leaves, and inquire about prices courteously. For mobility, combining walking with TNGo public shared bicycles and open-top City Tour buses ensures effortless exploration.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "GHI CHÚ CHO HÀNH TRÌNH MÙA THU",
      titleEn: "NOTES FOR YOUR AUTUMN JOURNEY",
      itemsVi: [
        "Thời điểm lý tưởng: Từ cuối tháng 9 đến giữa tháng 11, nhiệt độ mát mẻ dao động từ 21°C đến 26°C.",
        "Trang phục gợi ý: Áo khoác mỏng, khăn lụa hoặc áo len dệt kim nhẹ nhàng cho buổi sáng sớm và tối muộn.",
        "Khung giờ chụp ảnh đẹp nhất: 06:30 – 08:30 sáng trên đường Phan Đình Phùng và 16:30 – 17:30 chiều ngắm hoàng hôn Hồ Tây.",
        "Ẩm thực mùa thu: Cốm tươi làng Vòng, xôi cốm hạt sen, chả rươi nóng hổi và bánh trôi tàu phố cổ.",
      ],
      itemsEn: [
        "Best timing: Late September to mid-November, with pleasant temperatures ranging from 21°C to 26°C.",
        "Recommended attire: Light windbreaker, silk scarf, or lightweight knitwear for crisp mornings and evenings.",
        "Golden photo hours: 06:30 – 08:30 AM on Phan Dinh Phung street and 16:30 – 17:30 PM for West Lake sunsets.",
        "Seasonal food: Fresh Vong green rice, com sticky rice with lotus seeds, sizzling sand-worm omelet, and warm sweet ginger dumplings.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "phan-dinh-phung-street",
        nameVi: "Phố Phan Đình Phùng",
        nameEn: "Phan Dinh Phung Street",
        areaVi: "Ba Đình, Hà Nội",
        areaEn: "Ba Dinh, Hanoi",
        summaryVi: "Con đường rợp bóng sấu cổ thụ hàng trăm năm tuổi, điểm ngắm lá vàng và chụp ảnh mùa thu đẹp nhất Thủ đô.",
        summaryEn: "A centenarian tree-lined avenue famous for romantic foliage showers and autumn photography.",
        image: "/images/guide/article-phan-dinh-phung-avenue.jpg",
        href: "/destinations",
      },
      {
        slug: "hoan-kiem-lake",
        nameVi: "Hồ Hoàn Kiếm",
        nameEn: "Hoan Kiem Lake",
        areaVi: "Hoàn Kiếm, Hà Nội",
        areaEn: "Hoan Kiem District",
        summaryVi: "Trái tim ngàn năm của thủ đô với Tháp Rùa cổ kính và rặng liễu soi bóng nước xanh ngọc.",
        summaryEn: "The spiritual heart of Hanoi featuring Turtle Tower and willow trees mirrored on jade waters.",
        image: "/images/guide/destination-hoan-kiem-sunset.jpg",
        href: "/destinations/hoan-kiem-lake",
      },
    ],
    relatedSlugs: [
      "kham-pha-ha-noi-bang-cach-nao",
      "mot-ngay-thuong-thuc-am-thuc-ha-thanh",
      "song-cham-giua-long-thu-do",
    ],
  },

  // =================================================================================
  // 2. DI CHUYỂN: Khám phá Hà Nội bằng cách nào?
  // =================================================================================
  {
    id: "kham-pha-ha-noi-bang-cach-nao",
    slug: "kham-pha-ha-noi-bang-cach-nao",
    titleVi: "Khám phá Hà Nội bằng cách nào?",
    titleEn: "How to Explore Hanoi with Ease?",
    descriptionVi:
      "Kinh nghiệm di chuyển toàn diện: từ tuyến tàu điện trên cao Cát Linh, xe buýt 2 tầng ngắm phố đến xe điện và xích lô truyền thống.",
    descriptionEn:
      "Comprehensive transit wisdom: from the elevated metro and double-decker open buses to electric trams and traditional cyclos.",
    categoryKey: "transport",
    categoryLabelVi: "DI CHUYỂN",
    categoryLabelEn: "TRANSIT",
    authorVi: "Chuyên Mục Giao Thông Đô Thị",
    authorEn: "Urban Mobility Desk",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-05T08:00:00Z",
    readingTimeVi: "5 phút đọc",
    readingTimeEn: "5 min read",
    readingTimeMinutes: 5,
    coverImage: "/images/guide/transit-cyclo-tour.jpg",
    coverImageAltVi: "Đoàn xích lô du lịch đưa du khách khám phá phố cổ Hà Nội",
    coverImageAltEn: "Leisurely cyclo tour carrying visitors through Hanoi Old Quarter",
    coverImageCaptionVi: "Xích lô truyền thống – trải nghiệm ngắm nhìn phố phường ở cự ly gần gũi nhất",
    coverImageCaptionEn: "Traditional cyclos offering an intimate street-level perspective of heritage architecture",
    coverImageCreditVi: "Sở Du Lịch Hà Nội",
    coverImageCreditEn: "Hanoi Department of Tourism",
    href: "/guide/kham-pha-ha-noi-bang-cach-nao",
    sections: [
      {
        id: "thong-dong-tan-bo-pho-co",
        headingVi: "Thong dong tản bộ giữa 36 phố phường",
        headingEn: "Leisurely Walking the 36 Guild Streets",
        level: 2,
        paragraphsVi: [
          "Không có cách nào cảm nhận nhịp đập của Hà Nội trọn vẹn hơn là đôi chân của chính bạn. Tản bộ qua những con phố mang tên chữ 'Hàng', du khách có thể tự do dừng lại trước một ngôi đền cổ nép mình kín đáo, ngửi thấy mùi cà phê rang xay thơm nức, hay luồn qua những con ngõ chỉ rộng chừng một sải tay.",
          "Khu vực phố đi bộ quanh Hồ Gươm và chợ đêm mở cửa vào mỗi dịp cuối tuần (từ tối Thứ Sáu đến hết Chủ Nhật) là không gian tuyệt vời để thưởng ngoạn âm nhạc đường phố, trò chơi dân gian và nếp sống cộng đồng thân thiện.",
          "Đi bộ giúp bạn nắm bắt những chi tiết mà bất cứ phương tiện nào cũng sẽ bỏ lỡ: một bức phù điêu chạm khắc thời Pháp thuộc trên phố Hàng Bông, một gánh bún ốc nguội bên hè phố Hàng Chiếu, hay tiếng cười giòn giã của những người thợ rèn phố Lò Rèn.",
        ],
        paragraphsEn: [
          "There is no finer way to embrace Hanoi's heartbeat than on your own two feet. Strolling through streets bearing the prefix 'Hang' (merchandise), visitors can pause before secluded historic temples, smell freshly roasted coffee beans, or venture through alleys barely an arm's width wide.",
          "The pedestrian zone encircling Sword Lake and the night market open every weekend (Friday evening to Sunday midnight), offering a lively festival of acoustic performances, folk games, and warm community warmth.",
          "Walking reveals subtle textures that any vehicle rushes past: an ornate French colonial bas-relief on Hang Bong, a sidewalk snail broth vendor on Hang Chieu, or the rhythmic ring of ironmongery along Lo Ren street.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Không có cách nào cảm nhận nhịp đập của Hà Nội trọn vẹn hơn là đôi chân của chính bạn. Tản bộ qua những con phố mang tên chữ 'Hàng', du khách có thể tự do dừng lại trước một ngôi đền cổ nép mình kín đáo, ngửi thấy mùi cà phê rang xay thơm nức, hay luồn qua những con ngõ chỉ rộng chừng một sải tay.",
            textEn:
              "There is no finer way to embrace Hanoi's heartbeat than on your own two feet. Strolling through streets bearing the prefix 'Hang' (merchandise), visitors can pause before secluded historic temples, smell freshly roasted coffee beans, or venture through alleys barely an arm's width wide.",
          },
          {
            type: "image",
            src: "/images/walking-the-old-quarter.jpg",
            altVi: "Tản bộ khám phá phố cổ Hà Nội",
            altEn: "Walking through Hanoi Old Quarter alleys",
            captionVi: "Tản bộ qua các con phố rợp bóng cây để cảm nhận chân thực nhịp sống Thủ đô.",
            captionEn: "Walking under shaded boughs to absorb authentic local rhythms.",
          },
          {
            type: "callout",
            titleVi: "Mẹo tản bộ đường dài",
            titleEn: "Walking Tip",
            textVi:
              "Hãy chuẩn bị giày thể thao đế mềm, túi đeo chéo gọn nhẹ và nước uống. Buổi sáng sớm (06:30 – 08:30) là thời điểm vỉa hè thông thoáng và không khí trong lành nhất để đi dạo.",
            textEn:
              "Wear cushioned sneakers, carry a light crossbody bag, and keep hydrated. Early mornings (06:30 – 08:30 AM) offer the clearest sidewalks and freshest air.",
          },
          {
            type: "paragraph",
            textVi:
              "Khu vực phố đi bộ quanh Hồ Gươm và chợ đêm mở cửa vào mỗi dịp cuối tuần (từ tối Thứ Sáu đến hết Chủ Nhật) là không gian tuyệt vời để thưởng ngoạn âm nhạc đường phố, trò chơi dân gian và nếp sống cộng đồng thân thiện.",
            textEn:
              "The pedestrian zone encircling Sword Lake and the night market open every weekend (Friday evening to Sunday midnight), offering a lively festival of acoustic performances, folk games, and warm community warmth.",
          },
          {
            type: "paragraph",
            textVi:
              "Đi bộ giúp bạn nắm bắt những chi tiết mà bất cứ phương tiện nào cũng sẽ bỏ lỡ: một bức phù điêu chạm khắc thời Pháp thuộc trên phố Hàng Bông, một gánh bún ốc nguội bên hè phố Hàng Chiếu, hay tiếng cười giòn giã của những người thợ rèn phố Lò Rèn.",
            textEn:
              "Walking reveals subtle textures that any vehicle rushes past: an ornate French colonial bas-relief on Hang Bong, a sidewalk snail broth vendor on Hang Chieu, or the rhythmic ring of ironmongery along Lo Ren street.",
          },
        ],
      },
      {
        id: "tau-dien-cat-linh-goc-nhin-do-thi",
        headingVi: "Tuyến tàu điện trên cao Cát Linh – Hà Đông",
        headingEn: "Cat Linh – Ha Dong Elevated Metro Experience",
        level: 2,
        paragraphsVi: [
          "Tuyến đường sắt đô thị trên cao đầu tiên của Thủ đô dài hơn 13km kết nối trung tâm Ba Đình với quận Hà Đông. Với 12 nhà ga mang gam màu đặc trưng, đi tàu điện là một trải nghiệm hiện đại thú vị giúp du khách ngắm nhìn sự chuyển giao giữa nét cổ kính và diện mạo phát triển năng động của Hà Nội.",
          "Giá vé tàu rất dễ tiếp cận (từ 8.000 đến 15.000 VNĐ một lượt, hoặc 30.000 VNĐ cho vé ngày không giới hạn lượt đi). Ga Cát Linh và Ga La Thành là hai điểm check-in kiến trúc được nhiều bạn trẻ và du khách yêu thích.",
          "Từ trên cao nhìn xuống qua khung cửa sổ toa tàu sạch sẽ và điều hòa mát lạnh, du khách có thể chiêm ngưỡng bức tranh panorama chuyển tiếp ngoạn mục: từ những mái ngói rêu phong của các khu tập thể cũ đến những cây cầu vượt hiện đại và các cao ốc chọc trời vươn lên giữa nền trời xanh.",
        ],
        paragraphsEn: [
          "The capital's first elevated metro line spans over 13km, connecting Ba Dinh district to Ha Dong. With 12 stations sporting distinct color themes, riding the metro offers a scenic panorama capturing the seamless blend between heritage quarters and burgeoning skylines.",
          "Ticket fares are remarkably accessible (from 8,000 to 15,000 VND per single trip, or 30,000 VND for an unlimited day pass). Cat Linh and La Thanh stations serve as favorite architectural photo spots for travelers.",
          "Gliding above roadways in climate-controlled cabins, passengers behold a striking architectural continuum: from weathered Soviet-era residential blocks to modern flyovers and gleaming skyscrapers.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Tuyến đường sắt đô thị trên cao đầu tiên của Thủ đô dài hơn 13km kết nối trung tâm Ba Đình với quận Hà Đông. Với 12 nhà ga mang gam màu đặc trưng, đi tàu điện là một trải nghiệm hiện đại thú vị giúp du khách ngắm nhìn sự chuyển giao giữa nét cổ kính và diện mạo phát triển năng động của Hà Nội.",
            textEn:
              "The capital's first elevated metro line spans over 13km, connecting Ba Dinh district to Ha Dong. With 12 stations sporting distinct color themes, riding the metro offers a scenic panorama capturing the seamless blend between heritage quarters and burgeoning skylines.",
          },
          {
            type: "callout",
            titleVi: "Thông tin thẻ tàu và giá vé",
            titleEn: "Metro Fare Info",
            textVi:
              "Du khách có thể mua vé lượt (8.000 – 15.000 VNĐ) tại quầy tự động bằng tiền mặt hoặc quét mã QR. Nếu có kế hoạch di chuyển nhiều ga trong ngày, hãy chọn vé ngày 30.000 VNĐ không giới hạn lượt đi.",
            textEn:
              "Tickets (8,000 – 15,000 VND) can be purchased at kiosks via cash or banking QR. For unlimited rides throughout the day, the 30,000 VND day pass is the best value.",
          },
          {
            type: "paragraph",
            textVi:
              "Giá vé tàu rất dễ tiếp cận (từ 8.000 đến 15.000 VNĐ một lượt, hoặc 30.000 VNĐ cho vé ngày không giới hạn lượt đi). Ga Cát Linh và Ga La Thành là hai điểm check-in kiến trúc được nhiều bạn trẻ và du khách yêu thích.",
            textEn:
              "Ticket fares are remarkably accessible (from 8,000 to 15,000 VND per single trip, or 30,000 VND for an unlimited day pass). Cat Linh and La Thanh stations serve as favorite architectural photo spots for travelers.",
          },
          {
            type: "paragraph",
            textVi:
              "Từ trên cao nhìn xuống qua khung cửa sổ toa tàu sạch sẽ và điều hòa mát lạnh, du khách có thể chiêm ngưỡng bức tranh panorama chuyển tiếp ngoạn mục: từ những mái ngói rêu phong của các khu tập thể cũ đến những cây cầu vượt hiện đại và các cao ốc chọc trời vươn lên giữa nền trời xanh.",
            textEn:
              "Gliding above roadways in climate-controlled cabins, passengers behold a striking architectural continuum: from weathered Soviet-era residential blocks to modern flyovers and gleaming skyscrapers.",
          },
        ],
      },
      {
        id: "xe-buyt-hai-tang-city-tour",
        headingVi: "Ngắm trọn danh thắng từ xe buýt 2 tầng thoáng nóc",
        headingEn: "Open-Top Double-Decker City Tour Bus",
        level: 2,
        paragraphsVi: [
          "Nếu bạn muốn có cái nhìn bao quát toàn bộ di sản Thủ đô trong thời gian ngắn, xe buýt 2 tầng City Tour là giải pháp số một. Xe đi qua hơn 25 danh lam thắng cảnh tiêu biểu như Nhà hát Lớn, Hoàng thành Thăng Long, Lăng Bác, Chùa Trấn Quốc và Văn Miếu.",
          "Hệ thống tai nghe thuyết minh tự động bằng 9 ngôn ngữ giúp du khách hiểu sâu về lịch sử từng công trình ngay khi xe lướt qua. Tầng 2 thoáng gió mang lại góc chụp ảnh toàn cảnh tuyệt đẹp không bị che khuất.",
          "Đặc biệt, chuyến xe chạy vào lúc hoàng hôn (khoảng 17:00) mang lại trải nghiệm ngắm nhìn Hà Nội lộng lẫy khi các tòa nhà di sản đồng loạt thắp sáng ánh đèn vàng ấm áp.",
        ],
        paragraphsEn: [
          "For travelers seeking an overarching panorama of Hanoi's monuments in comfort, the open-top double-decker City Tour bus is unparalleled. The route loops past over 25 landmark attractions including the Opera House, Imperial Citadel, Ho Chi Minh Mausoleum, Tran Quoc Pagoda, and the Temple of Literature.",
          "An automated multilingual audio guide in 9 languages introduces the history of each monument as the bus glides past. The breezy upper deck offers unimpeded 360-degree photo angles.",
          "Notably, taking the twilight departure around 17:00 PM treats guests to a breathtaking spectacle as heritage facades illuminate in warm amber illumination.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Nếu bạn muốn có cái nhìn bao quát toàn bộ di sản Thủ đô trong thời gian ngắn, xe buýt 2 tầng City Tour là giải pháp số một. Xe đi qua hơn 25 danh lam thắng cảnh tiêu biểu như Nhà hát Lớn, Hoàng thành Thăng Long, Lăng Bác, Chùa Trấn Quốc và Văn Miếu.",
            textEn:
              "For travelers seeking an overarching panorama of Hanoi's monuments in comfort, the open-top double-decker City Tour bus is unparalleled. The route loops past over 25 landmark attractions including the Opera House, Imperial Citadel, Ho Chi Minh Mausoleum, Tran Quoc Pagoda, and the Temple of Literature.",
          },
          {
            type: "image",
            src: "/images/hanoi-opera-house.jpg",
            altVi: "Nhà hát Lớn Hà Nội – điểm khởi hành trung tâm của tuyến City Tour",
            altEn: "Hanoi Opera House – the central departure hub of the double-decker bus",
            captionVi: "Nhà hát Lớn Hà Nội – điểm xuất phát quen thuộc của các chuyến xe buýt hai tầng.",
            captionEn: "Hanoi Opera House – iconic starting point for open-top sightseeing excursions.",
          },
          {
            type: "paragraph",
            textVi:
              "Hệ thống tai nghe thuyết minh tự động bằng 9 ngôn ngữ giúp du khách hiểu sâu về lịch sử từng công trình ngay khi xe lướt qua. Tầng 2 thoáng gió mang lại góc chụp ảnh toàn cảnh tuyệt đẹp không bị che khuất.",
            textEn:
              "An automated multilingual audio guide in 9 languages introduces the history of each monument as the bus glides past. The breezy upper deck offers unimpeded 360-degree photo angles.",
          },
          {
            type: "paragraph",
            textVi:
              "Đặc biệt, chuyến xe chạy vào lúc hoàng hôn (khoảng 17:00) mang lại trải nghiệm ngắm nhìn Hà Nội lộng lẫy khi các tòa nhà di sản đồng loạt thắp sáng ánh đèn vàng ấm áp.",
            textEn:
              "Notably, taking the twilight departure around 17:00 PM treats guests to a breathtaking spectacle as heritage facades illuminate in warm amber illumination.",
          },
        ],
      },
      {
        id: "xich-lo-va-xe-dien-than-thien",
        headingVi: "Xích lô truyền thống & xe buýt điện thân thiện môi trường",
        headingEn: "Traditional Cyclos and Clean Eco-Trams",
        level: 2,
        paragraphsVi: [
          "Xích lô là nét chấm phá văn hóa hoài niệm gắn liền với ký ức đô thị Hà Nội từ thế kỷ 20. Ngồi trên chiếc xích lô di chuyển với tốc độ khoan thai, du khách được tận hưởng trọn vẹn từng luồng gió mát và chụp lại những khoảnh khắc đời thường mộc mạc.",
          "Bên cạnh đó, các tuyến xe điện ngắm cảnh không khói bụi do Công ty Đồng Xuân vận hành cũng là lựa chọn tiện lợi cho gia đình có trẻ nhỏ hoặc người cao tuổi muốn dạo quanh 36 phố phường và khu vực bờ hồ Hoàn Kiếm.",
          "Đây là cách tiếp cận di sản bền vững và chậm rãi, giúp du khách lắng nghe câu chuyện của từng mái đình, ngõ phố từ những người lái xích lô hay thuyết minh viên giàu kinh nghiệm bản địa.",
        ],
        paragraphsEn: [
          "The cyclo is an enduring cultural icon woven into Hanoi's urban memory since the 20th century. Gliding along at a gentle pace, passengers breathe in the city air and capture intimate snapshots of daily pavement life.",
          "Meanwhile, zero-emission tourist eco-trams operated through the Old Quarter provide a breezy, convenient option for families with children or seniors wishing to tour the historic merchant districts comfortably.",
          "This gentle, sustainable transit allows travelers to listen to oral stories about each temple and alley from seasoned local drivers.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Xích lô là nét chấm phá văn hóa hoài niệm gắn liền với ký ức đô thị Hà Nội từ thế kỷ 20. Ngồi trên chiếc xích lô di chuyển với tốc độ khoan thai, du khách được tận hưởng trọn vẹn từng luồng gió mát và chụp lại những khoảnh khắc đời thường mộc mạc.",
            textEn:
              "The cyclo is an enduring cultural icon woven into Hanoi's urban memory since the 20th century. Gliding along at a gentle pace, passengers breathe in the city air and capture intimate snapshots of daily pavement life.",
          },
          {
            type: "image",
            src: "/images/guide/transit-cyclo-tour.jpg",
            altVi: "Đoàn xích lô du lịch đưa du khách khám phá phố cổ Hà Nội",
            altEn: "Leisurely cyclo tour carrying visitors through Hanoi Old Quarter",
            captionVi: "Xích lô truyền thống – trải nghiệm ngắm nhìn phố phường ở cự ly gần gũi nhất.",
            captionEn: "Traditional cyclos offering an intimate street-level perspective of heritage architecture.",
          },
          {
            type: "paragraph",
            textVi:
              "Bên cạnh đó, các tuyến xe điện ngắm cảnh không khói bụi do Công ty Đồng Xuân vận hành cũng là lựa chọn tiện lợi cho gia đình có trẻ nhỏ hoặc người cao tuổi muốn dạo quanh 36 phố phường và khu vực bờ hồ Hoàn Kiếm.",
            textEn:
              "Meanwhile, zero-emission tourist eco-trams operated through the Old Quarter provide a breezy, convenient option for families with children or seniors wishing to tour the historic merchant districts comfortably.",
          },
          {
            type: "paragraph",
            textVi:
              "Đây là cách tiếp cận di sản bền vững và chậm rãi, giúp du khách lắng nghe câu chuyện của từng mái đình, ngõ phố từ những người lái xích lô hay thuyết minh viên giàu kinh nghiệm bản địa.",
            textEn:
              "This gentle, sustainable transit allows travelers to listen to oral stories about each temple and alley from seasoned local drivers.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "GHI CHÚ DI CHUYỂN AN TOÀN & TIẾT KIỆM",
      titleEn: "SMART & SAFE TRANSIT TIPS",
      itemsVi: [
        "Tra cứu lộ trình: Cài đặt ứng dụng BusMap Hà Nội để theo dõi thời gian xe buýt đến trạm theo thời gian thực.",
        "Đi xích lô: Luôn hỏi và thống nhất trước giá tiền cho cả lộ trình hoặc thời gian (thường dao động 150.000 – 200.000 VNĐ / giờ).",
        "Tránh giờ cao điểm: Hạn chế đi taxi hoặc xe ôm công nghệ trong các khung giờ 07:30 – 08:30 và 17:00 – 18:30 tại các nút giao trung tâm.",
        "Bảo vệ đồ dùng: Khi dạo phố đông đúc hoặc ngồi xích lô chụp ảnh, luôn cầm chắc điện thoại và tư trang cá nhân.",
      ],
      itemsEn: [
        "Route navigation: Install the BusMap Hanoi app to track real-time bus arrival schedules across the city.",
        "Cyclo etiquette: Always agree on total fare in advance before boarding (customary rate: 150,000 – 200,000 VND / hour).",
        "Peak traffic hours: Avoid road-bound vehicles during rush hours 07:30 – 08:30 AM and 17:00 – 18:30 PM across central junctions.",
        "Belongings safety: When walking crowded alleys or taking photos from cyclos, maintain a secure grip on cameras and smartphones.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "hanoi-old-quarter",
        nameVi: "Phố cổ Hà Nội",
        nameEn: "Hanoi Old Quarter",
        areaVi: "Quận Hoàn Kiếm",
        areaEn: "Hoan Kiem District",
        summaryVi: "Không gian lý tưởng nhất để tản bộ, trải nghiệm xích lô và xe điện ngắm cảnh.",
        summaryEn: "The primary historical hub ideal for walking trails, cyclos, and electric tram tours.",
        image: "/images/guide/experience-hanoi-heritage.jpg",
        href: "/destinations/hanoi-old-quarter",
      },
      {
        slug: "hanoi-opera-house",
        nameVi: "Nhà hát Lớn Hà Nội",
        nameEn: "Hanoi Opera House",
        areaVi: "Quận Hoàn Kiếm",
        areaEn: "Hoan Kiem District",
        summaryVi: "Kiệt tác kiến trúc Tân cổ điển Pháp, điểm đón trả khách chính của xe buýt hai tầng.",
        summaryEn: "A neoclassical architectural gem and primary hub for double-decker bus tours.",
        image: "/images/hanoi-opera-house.jpg",
        href: "/destinations/hanoi-opera-house",
      },
      {
        slug: "hoan-kiem-lake",
        nameVi: "Hồ Hoàn Kiếm",
        nameEn: "Hoan Kiem Lake",
        areaVi: "Quận Hoàn Kiếm",
        areaEn: "Hoan Kiem District",
        summaryVi: "Không gian phố đi bộ cuối tuần rộng lớn và trung tâm kết nối các tuyến giao thông di sản.",
        summaryEn: "Extensive weekend pedestrian promenade connecting heritage transport routes.",
        image: "/images/hoan-kiem-lake.jpg",
        href: "/destinations/hoan-kiem-lake",
      },
    ],
    relatedSlugs: [
      "hen-voi-ha-noi-vao-mot-ngay-thu",
      "lan-dau-den-ha-noi-can-biet-gi",
      "song-cham-giua-long-thu-do",
    ],
  },

  // =================================================================================
  // 3. ẨM THỰC: Một ngày thưởng thức ẩm thực Hà thành
  // =================================================================================
  {
    id: "mot-ngay-thuong-thuc-am-thuc-ha-thanh",
    slug: "mot-ngay-thuong-thuc-am-thuc-ha-thanh",
    titleVi: "Một ngày thưởng thức ẩm thực Hà thành",
    titleEn: "A Culinary Day in Hanoi: Savoring Heritage",
    descriptionVi:
      "Hành trình vị giác trọn vẹn từ bát phở bò nghi ngút khói sớm mai, bún chả than hoa trưa nồng đến chả cá Lã Vọng thơm lừng ngõ phố.",
    descriptionEn:
      "A complete culinary journey from steaming morning pho to smoky charcoal bun cha and aromatic Cha Ca La Vong in heritage alleys.",
    categoryKey: "cuisine",
    categoryLabelVi: "ẨM THỰC",
    categoryLabelEn: "CUISINE",
    authorVi: "Chuyên Gia Ẩm Thực Hà Nội",
    authorEn: "Hanoi Culinary Arts Specialist",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-08T08:00:00Z",
    readingTimeVi: "7 phút đọc",
    readingTimeEn: "7 min read",
    readingTimeMinutes: 7,
    coverImage: "/images/guide/cuisine-bun-cha.jpg",
    coverImageAltVi: "Bàn ăn bún chả Hà Nội nướng than hoa truyền thống với chả miếng và chả viên",
    coverImageAltEn: "Authentic charcoal-grilled Bun cha Hanoi table with pork patties and fresh herbs",
    coverImageCaptionVi: "Bún chả Hà Nội – nét tinh hoa ẩm thực đường phố vang danh thế giới",
    coverImageCaptionEn: "Hanoi Bun Cha – world-renowned street culinary heritage",
    coverImageCreditVi: "Kho Tư Liệu Ẩm Thực Hanoi Discovery",
    coverImageCreditEn: "Hanoi Discovery Culinary Archives",
    href: "/guide/mot-ngay-thuong-thuc-am-thuc-ha-thanh",
    sections: [
      {
        id: "bua-sang-pho-bo-truyen-thong",
        headingVi: "Khởi đầu ngày mới với bát phở bò bốc khói",
        headingEn: "Starting Dawn with a Steaming Bowl of Beef Pho",
        level: 2,
        paragraphsVi: [
          "Buổi sớm mai ở Hà Nội luôn bắt đầu bằng hương thơm ngạt ngào của những nồi nước dùng phở sôi sùng sục bên góc phố. Nước dùng phở truyền thống được ninh từ xương ống bò trong suốt 12 đến 16 tiếng, chắt lọc vị ngọt tủy tự nhiên mà không cần phụ gia.",
          "Bánh phở tươi mỏng mềm, thịt bò thái lát tái lăn thơm nức mùi gừng tỏi, phủ lên trên là lớp hành hoa, mùi tàu xanh mướt. Thêm một chút giấm tỏi ớt ủ kỹ và vài giọt chanh tươi, vị giác của bạn sẽ bừng tỉnh trọn vẹn giữa sớm mùa thu se lạnh.",
          "Đối với người Hà Nội, ăn phở không chỉ đơn thuần là nạp năng lượng cho ngày mới, mà là một nếp thưởng thức đã thành căn tính. Ngồi trên chiếc ghế nhựa con kê sát hè đường, vừa húp thìa nước dùng thanh trong vừa lắng nghe thanh âm phố thị thức giấc là trải nghiệm không gì so sánh được.",
        ],
        paragraphsEn: [
          "Early mornings in Hanoi unfailingly commence with the heady aroma of simmering pho cauldrons nestled on street corners. Authentic broth is patiently stewed from beef marrow bones for 12 to 16 hours, extracting natural deep umami without synthetic seasonings.",
          "Fresh rice noodles are gossamer-thin yet tender, topped with thinly sliced beef quickly flash-seared with ginger and garlic, crowned with emerald scallions and culantro. A splash of garlic vinegar and fresh lime instantly awakens the palate amidst crisp morning breezes.",
          "For Hanoians, eating pho is far more than physical nourishment; it is an enduring cultural ritual. Perched on small sidewalk stools, sipping piping-hot clear broth while taking in the awakening street symphony is an irreplaceable sensation.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Buổi sớm mai ở Hà Nội luôn bắt đầu bằng hương thơm ngạt ngào của những nồi nước dùng phở sôi sùng sục bên góc phố. Nước dùng phở truyền thống được ninh từ xương ống bò trong suốt 12 đến 16 tiếng, chắt lọc vị ngọt tủy tự nhiên mà không cần phụ gia.",
            textEn:
              "Early mornings in Hanoi unfailingly commence with the heady aroma of simmering pho cauldrons nestled on street corners. Authentic broth is patiently stewed from beef marrow bones for 12 to 16 hours, extracting natural deep umami without synthetic seasonings.",
          },
          {
            type: "image",
            src: "/images/guide/cuisine-pho-bo.jpg",
            altVi: "Bát phở bò truyền thống thơm lừng góc phố Hà Nội",
            altEn: "Steaming bowl of authentic Hanoi beef pho",
            captionVi: "Phở bò Hà Nội – nước dùng trong thanh, dậy mùi thảo quả và gừng nướng.",
            captionEn: "Hanoi Beef Pho – crystal-clear broth perfumed with cardamom and charred ginger.",
          },
          {
            type: "callout",
            titleVi: "Gợi ý quán phở gia truyền",
            titleEn: "Heritage Pho Recommendations",
            textVi:
              "Hãy ghé Phở Bát Đàn (chuyên phở tái nạm gầu giòn), Phở Thìn Lò Đúc (thịt bò tái lăn đậm vị tỏi gừng) hoặc Phở Sướng (ngõ Trung Yên) để cảm nhận trọn vẹn nước dùng gia truyền.",
            textEn:
              "Visit Pho Bat Dan (famous for tender flank and crunchy brisket), Pho Thin Lo Duc (flash-fried garlic beef), or Pho Suong in Trung Yen lane for time-honored recipes.",
          },
          {
            type: "paragraph",
            textVi:
              "Bánh phở tươi mỏng mềm, thịt bò thái lát tái lăn thơm nức mùi gừng tỏi, phủ lên trên là lớp hành hoa, mùi tàu xanh mướt. Thêm một chút giấm tỏi ớt ủ kỹ và vài giọt chanh tươi, vị giác của bạn sẽ bừng tỉnh trọn vẹn giữa sớm mùa thu se lạnh.",
            textEn:
              "Fresh rice noodles are gossamer-thin yet tender, topped with thinly sliced beef quickly flash-seared with ginger and garlic, crowned with emerald scallions and culantro. A splash of garlic vinegar and fresh lime instantly awakens the palate amidst crisp morning breezes.",
          },
          {
            type: "paragraph",
            textVi:
              "Đối với người Hà Nội, ăn phở không chỉ đơn thuần là nạp năng lượng cho ngày mới, mà là một nếp thưởng thức đã thành căn tính. Ngồi trên chiếc ghế nhựa con kê sát hè đường, vừa húp thìa nước dùng thanh trong vừa lắng nghe thanh âm phố thị thức giấc là trải nghiệm không gì so sánh được.",
            textEn:
              "For Hanoians, eating pho is far more than physical nourishment; it is an enduring cultural ritual. Perched on small sidewalk stools, sipping piping-hot clear broth while taking in the awakening street symphony is an irreplaceable sensation.",
          },
        ],
      },
      {
        id: "bua-trua-bun-cha-than-hoa",
        headingVi: "Bữa trưa đậm đà hương khói than hoa bún chả",
        headingEn: "Noontime Smoky Aromas of Charcoal Bun Cha",
        level: 2,
        paragraphsVi: [
          "Khi đồng hồ điểm giữa trưa, hương khói than hoa nướng thịt bắt đầu lan tỏa ngây ngất khắp các ngõ phố Hàng Quạt, Hàng Mành. Bún chả Hà Nội chinh phục thực khách bằng hai loại chả: chả miếng ba chỉ ướp gia vị đậm đà và chả viên băm nhuyễn nướng xém cạnh trên vỉ than hồng rực.",
          "Từng miếng chả nóng hổi được thả ngập vào bát nước mắm pha ấm nóng chua ngọt thanh nhã, điểm xuyết dưa góp đu đủ giòn sần sật. Ăn kèm đĩa bún sợi nhỏ mát lành và rổ rau thơm xanh mướt gồm tía tô, kinh giới, xà lách, tạo nên bản hòa tấu phong vị khó quên.",
          "Khác với bún chả ở những vùng miền khác, chả Hà Nội giữ được độ ẩm mọng bên trong nhờ kỹ thuật ướp kẹp que tre truyền thống, tạo nên vị ngọt đậm đà tự nhiên của thịt tươi hòa quyện cùng mùi thơm khói than củi.",
        ],
        paragraphsEn: [
          "As clocks strike midday, the intoxicating incense of pork grilled over natural charcoal wafts across Hang Quat and Hang Manh lanes. Hanoi bun cha captivates with two textures: marinated pork belly slices and succulent minced pork patties charred on glowing embers.",
          "Sizzling pork patties are immersed directly into warm bowls of balanced sweet-and-sour fish sauce, garnished with crunchy green papaya slices. Accompanied by fine rice vermicelli and fresh herbs like perilla and Vietnamese balm, every mouthful is unforgettable.",
          "Unlike versions elsewhere, authentic Hanoi bun cha retains interior succulence through traditional bamboo clamp grilling over open wood charcoal.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Khi đồng hồ điểm giữa trưa, hương khói than hoa nướng thịt bắt đầu lan tỏa ngây ngất khắp các ngõ phố Hàng Quạt, Hàng Mành. Bún chả Hà Nội chinh phục thực khách bằng hai loại chả: chả miếng ba chỉ ướp gia vị đậm đà và chả viên băm nhuyễn nướng xém cạnh trên vỉ than hồng rực.",
            textEn:
              "As clocks strike midday, the intoxicating incense of pork grilled over natural charcoal wafts across Hang Quat and Hang Manh lanes. Hanoi bun cha captivates with two textures: marinated pork belly slices and succulent minced pork patties charred on glowing embers.",
          },
          {
            type: "image",
            src: "/images/bun-cha.jpg",
            altVi: "Mâm bún chả truyền thống Hà Nội với than hoa nướng thơm lừng",
            altEn: "Traditional Hanoi bun cha served with charcoal grilled pork and herbs",
            captionVi: "Bún chả Hà Nội – nét tinh tế độc đáo trong văn hóa ẩm thực trưa của người Thủ đô.",
            captionEn: "Hanoi Bun Cha – an indispensable culinary delight of local lunchtime traditions.",
          },
          {
            type: "paragraph",
            textVi:
              "Từng miếng chả nóng hổi được thả ngập vào bát nước mắm pha ấm nóng chua ngọt thanh nhã, điểm xuyết dưa góp đu đủ giòn sần sật. Ăn kèm đĩa bún sợi nhỏ mát lành và rổ rau thơm xanh mướt gồm tía tô, kinh giới, xà lách, tạo nên bản hòa tấu phong vị khó quên.",
            textEn:
              "Sizzling pork patties are immersed directly into warm bowls of balanced sweet-and-sour fish sauce, garnished with crunchy green papaya slices. Accompanied by fine rice vermicelli and fresh herbs like perilla and Vietnamese balm, every mouthful is unforgettable.",
          },
          {
            type: "paragraph",
            textVi:
              "Khác với bún chả ở những vùng miền khác, chả Hà Nội giữ được độ ẩm mọng bên trong nhờ kỹ thuật ướp kẹp que tre truyền thống, tạo nên vị ngọt đậm đà tự nhiên của thịt tươi hòa quyện cùng mùi thơm khói than củi.",
            textEn:
              "Unlike versions elsewhere, authentic Hanoi bun cha retains interior succulence through traditional bamboo clamp grilling over open wood charcoal.",
          },
        ],
      },
      {
        id: "thuc-qua-chieu-ca-phe-trung",
        headingVi: "Thức quà chiều: Cà phê trứng & chè sen thanh tao",
        headingEn: "Afternoon Pleasures: Egg Coffee & Delicate Lotus Delights",
        level: 2,
        paragraphsVi: [
          "Buổi chiều là khoảng lặng lý tưởng để thưởng thức cà phê trứng – phát minh ẩm thực trứ danh của cụ Nguyễn Văn Giảng từ thập niên 1940. Lớp lòng đỏ trứng gà tươi được đánh bông mịn như mây cùng mật ong và sữa đặc, bồng bềnh phủ trên nền cà phê phin nguyên chất đắng đậm đà.",
          "Nếu muốn tìm kiếm thức quà nhẹ nhàng thanh mát hơn, bát chè hạt sen long nhãn nấu đường phèn hoặc đĩa bánh cuốn Thanh Trì tráng mỏng tang chấm nước mắm cà cuống sẽ khiến buổi chiều Hà Nội thêm phần hoài niệm.",
          "Vị ngọt thanh dịu dàng của chè sen hạt bở tơi quyện trong hương nhãn lồng cùi dày giòn sần sật như gói trọn sự tao nhã và cầu kỳ của người Tràng An vào trong một chiếc bát sứ nhỏ.",
        ],
        paragraphsEn: [
          "The afternoon invites a pause for egg coffee – the renowned culinary innovation crafted by Mr. Nguyen Van Giang in the 1940s. Fresh egg yolks are whipped with honey and condensed milk into an airy, velvet froth floating gracefully atop bold dark drip coffee.",
          "For a lighter, cooling alternative, a bowl of lotus seeds wrapped in sweet longan fruit or delicate steamed rice rolls (banh cuon Thanh Tri) paired with seasoned dipping sauce lends the afternoon a lingering poetic charm.",
          "The delicate fragrance of soft lotus seeds bundled inside crunchy longan flesh captures the legendary sophistication of Trang An gastronomy.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Buổi chiều là khoảng lặng lý tưởng để thưởng thức cà phê trứng – phát minh ẩm thực trứ danh của cụ Nguyễn Văn Giảng từ thập niên 1940. Lớp lòng đỏ trứng gà tươi được đánh bông mịn như mây cùng mật ong và sữa đặc, bồng bềnh phủ trên nền cà phê phin nguyên chất đắng đậm đà.",
            textEn:
              "The afternoon invites a pause for egg coffee – the renowned culinary innovation crafted by Mr. Nguyen Van Giang in the 1940s. Fresh egg yolks are whipped with honey and condensed milk into an airy, velvet froth floating gracefully atop bold dark drip coffee.",
          },
          {
            type: "image",
            src: "/images/egg-coffee.jpg",
            altVi: "Ly cà phê trứng ấm nóng bồng bềnh kem sữa",
            altEn: "Warm creamy froth egg coffee in heritage bowl",
            captionVi: "Cà phê trứng – tuyệt phẩm thức uống béo bùi sáng tạo từ giữa thế kỷ 20.",
            captionEn: "Egg Coffee – an ingenious 20th-century artisanal coffee creation.",
          },
          {
            type: "paragraph",
            textVi:
              "Nếu muốn tìm kiếm thức quà nhẹ nhàng thanh mát hơn, bát chè hạt sen long nhãn nấu đường phèn hoặc đĩa bánh cuốn Thanh Trì tráng mỏng tang chấm nước mắm cà cuống sẽ khiến buổi chiều Hà Nội thêm phần hoài niệm.",
            textEn:
              "For a lighter, cooling alternative, a bowl of lotus seeds wrapped in sweet longan fruit or delicate steamed rice rolls (banh cuon Thanh Tri) paired with seasoned dipping sauce lends the afternoon a lingering poetic charm.",
          },
          {
            type: "paragraph",
            textVi:
              "Vị ngọt thanh dịu dàng của chè sen hạt bở tơi quyện trong hương nhãn lồng cùi dày giòn sần sật như gói trọn sự tao nhã và cầu kỳ của người Tràng An vào trong một chiếc bát sứ nhỏ.",
            textEn:
              "The delicate fragrance of soft lotus seeds bundled inside crunchy longan flesh captures the legendary sophistication of Trang An gastronomy.",
          },
        ],
      },
      {
        id: "bua-toi-cha-ca-va-am-thuc-dem",
        headingVi: "Bữa tối ấm cúng với chảo Chả cá Lã Vọng xèo xèo",
        headingEn: "Evening Warmth around Sizzling Cha Ca La Vong",
        level: 2,
        paragraphsVi: [
          "Bữa tối là thời khắc sum vầy bên chảo chả cá thơm nức đặt ngay trên bàn ăn. Những miếng cá lăng béo ngậy được tẩm ướp nghệ vàng và mẻ chua, đảo đều trong chảo mỡ sôi cùng thì là, hành hoa cắt khúc dài xanh mướt.",
          "Gắp một miếng cá nóng hổi, thêm chút bún rối, vài hạt lạc rang bùi bùi và chấm ngập vào bát mắm tôm đánh sủi bọt cùng chanh, ớt và rượu trắng. Vị béo, thơm, cay, nồng đan xen tạo nên đỉnh cao của nghệ thuật ẩm thực kinh kỳ.",
          "Món chả cá có lịch sử hơn 130 năm gắn liền với gia tộc họ Đoàn phố Chả Cá. Không gian ấm cúng, tiếng xèo xèo vui tai và làn khói thơm quyện cùng mắm tôm là cái kết hoàn mỹ cho một ngày khám phá trọn vẹn phong vị Hà thành.",
        ],
        paragraphsEn: [
          "Dinner gathers friends around a sizzling tabletop pan of turmeric-infused fish. Chunks of rich catfish marinated in turmeric and fermented rice ferment sizzle over golden oil alongside heaps of fresh dill and scallions.",
          "Served with soft vermicelli, roasted peanuts, and rich fermented shrimp paste froth spiked with lime and chili, this dish represents the pinnacle of ancient imperial gastronomy.",
          "Boasting over 130 years of lineage tied to the Doan family on Cha Ca street, the convivial aroma and tabletop sizzle form the ultimate finale to a day of culinary discovery.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Bữa tối là thời khắc sum vầy bên chảo chả cá thơm nức đặt ngay trên bàn ăn. Những miếng cá lăng béo ngậy được tẩm ướp nghệ vàng và mẻ chua, đảo đều trong chảo mỡ sôi cùng thì là, hành hoa cắt khúc dài xanh mướt.",
            textEn:
              "Dinner gathers friends around a sizzling tabletop pan of turmeric-infused fish. Chunks of rich catfish marinated in turmeric and fermented rice ferment sizzle over golden oil alongside heaps of fresh dill and scallions.",
          },
          {
            type: "image",
            src: "/images/cha-ca.jpg",
            altVi: "Chảo chả cá Lã Vọng xèo xèo thì là và hành hoa",
            altEn: "Sizzling Cha Ca La Vong with fresh dill and scallions",
            captionVi: "Chả cá Lã Vọng – di sản ẩm thực danh tiếng hơn một thế kỷ của đất Hà thành.",
            captionEn: "Cha Ca La Vong – a century-old iconic culinary heritage of the capital.",
          },
          {
            type: "paragraph",
            textVi:
              "Gắp một miếng cá nóng hổi, thêm chút bún rối, vài hạt lạc rang bùi bùi và chấm ngập vào bát mắm tôm đánh sủi bọt cùng chanh, ớt và rượu trắng. Vị béo, thơm, cay, nồng đan xen tạo nên đỉnh cao của nghệ thuật ẩm thực kinh kỳ.",
            textEn:
              "Served with soft vermicelli, roasted peanuts, and rich fermented shrimp paste froth spiked with lime and chili, this dish represents the pinnacle of ancient imperial gastronomy.",
          },
          {
            type: "paragraph",
            textVi:
              "Món chả cá có lịch sử hơn 130 năm gắn liền với gia tộc họ Đoàn phố Chả Cá. Không gian ấm cúng, tiếng xèo xèo vui tai và làn khói thơm quyện cùng mắm tôm là cái kết hoàn mỹ cho một ngày khám phá trọn vẹn phong vị Hà thành.",
            textEn:
              "Boasting over 130 years of lineage tied to the Doan family on Cha Ca street, the convivial aroma and tabletop sizzle form the ultimate finale to a day of culinary discovery.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "CẨM NANG THƯỞNG THỨC ẨM THỰC CHUẨN VỊ",
      titleEn: "CULINARY CONNOISSEUR TIPS",
      itemsVi: [
        "Thưởng thức cà phê trứng: Dùng thìa nhỏ múc từng lớp kem trứng ở trên trước, sau đó khuấy nhẹ để kem quyện dần vào cà phê nóng.",
        "Mắm tôm chuẩn vị: Khi ăn bún đậu hoặc chả cá, hãy vắt một quả quất tươi và đánh bông mắm tôm đến khi sủi bọt trắng mịn.",
        "Thời gian mở cửa: Các quán phở ngon truyền thống thường mở rất sớm từ 06:00 và thường hết hàng trước 10:00 sáng.",
        "Tiền mặt: Phần lớn các quán ăn gia truyền lâu đời trong ngõ phố cổ vẫn ưu tiên thanh toán bằng tiền mặt.",
      ],
      itemsEn: [
        "Savoring egg coffee: Spoon the luscious creamy top foam first, then gently stir to integrate with the piping hot espresso below.",
        "Shrimp paste seasoning: Squeeze fresh calamansi juice and whisk briskly with chopsticks until the paste froths into a fragrant cloud.",
        "Operating hours: Legendary morning pho shops often open at 06:00 AM and sell out completely before 10:00 AM.",
        "Cash on hand: Many revered family-run heritage eateries in Old Quarter alleyways still strongly prefer cash payment.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "hanoi-old-quarter",
        nameVi: "Phố cổ Hà Nội",
        nameEn: "Hanoi Old Quarter",
        areaVi: "Quận Hoàn Kiếm",
        areaEn: "Hoan Kiem District",
        summaryVi: "Thiên đường ẩm thực đường phố hội tụ hàng trăm món ngon gia truyền nức tiếng.",
        summaryEn: "A street food paradise congregating hundreds of celebrated generational recipes.",
        image: "/images/guide/cuisine-pho-bo.jpg",
        href: "/destinations/hanoi-old-quarter",
      },
      {
        slug: "hoan-kiem-lake",
        nameVi: "Hồ Hoàn Kiếm",
        nameEn: "Hoan Kiem Lake",
        areaVi: "Quận Hoàn Kiếm",
        areaEn: "Hoan Kiem District",
        summaryVi: "Xung quanh hồ là nơi tọa lạc của những quán kem Tràng Tề, nộm bò khô và cà phê trứng nức tiếng.",
        summaryEn: "Bordered by iconic culinary institutions: Trang Tien ice cream, beef jerky salad, and egg coffee.",
        image: "/images/hoan-kiem-lake.jpg",
        href: "/destinations/hoan-kiem-lake",
      },
    ],
    relatedSlugs: [
      "hen-voi-ha-noi-vao-mot-ngay-thu",
      "kham-pha-ha-noi-bang-cach-nao",
      "song-cham-giua-long-thu-do",
    ],
  },

  // =================================================================================
  // 4. KINH NGHIỆM: Lần đầu đến Hà Nội cần biết gì?
  // =================================================================================
  {
    id: "lan-dau-den-ha-noi-can-biet-gi",
    slug: "lan-dau-den-ha-noi-can-biet-gi",
    titleVi: "Lần đầu đến Hà Nội cần biết gì?",
    titleEn: "First Time in Hanoi: What You Need to Know",
    descriptionVi:
      "Những điều cần lưu ý cho du khách mới: cách qua đường tự tin, nếp văn hóa ứng xử đền chùa, quy tắc đổi tiền và số điện thoại hỗ trợ 24/7.",
    descriptionEn:
      "Essential local advice for first-timers: crossing streets confidently, sacred temple etiquette, and 24/7 tourist assistance hotlines.",
    categoryKey: "experience",
    categoryLabelVi: "KINH NGHIỆM",
    categoryLabelEn: "EXPERIENCE",
    authorVi: "Bộ Phận Chăm Sóc Du Khách",
    authorEn: "Visitor Care & Support Desk",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-10T08:00:00Z",
    readingTimeVi: "6 phút đọc",
    readingTimeEn: "6 min read",
    readingTimeMinutes: 6,
    coverImage: "/images/guide/experience-hanoi-heritage.jpg",
    coverImageAltVi: "Không gian phố cổ Hà Nội thanh bình với mái ngói cổ kính",
    coverImageAltEn: "Peaceful morning streetscape of Hanoi Old Quarter with heritage buildings",
    coverImageCaptionVi: "Phố cổ Hà Nội – nơi giao thoa giữa nhịp sống đô thị và những giá trị văn hóa ngàn năm",
    coverImageCaptionEn: "Hanoi Old Quarter – an intimate intersection of modern life and millennial heritage",
    coverImageCreditVi: "Trung Tâm Thông Tin Du Khách Hà Nội",
    coverImageCreditEn: "Hanoi Tourist Information Center",
    href: "/guide/lan-dau-den-ha-noi-can-biet-gi",
    sections: [
      {
        id: "thoi-diem-va-chuan-bi-hanh-trang",
        headingVi: "Thời điểm lý tưởng và chuẩn bị hành trang",
        headingEn: "Best Time to Visit & Packing Advice",
        level: 2,
        paragraphsVi: [
          "Hà Nội có 4 mùa rõ rệt, trong đó mùa thu (tháng 9 đến tháng 11) và mùa xuân (tháng 3 đến tháng 4) được đánh giá là thời điểm lý tưởng nhất cho du khách lần đầu đặt chân đến. Vào những tháng này, nhiệt độ dịu mát, nắng chan hòa và không có mưa bão lớn.",
          "Vào mùa hè (tháng 6–8), thời tiết khá nóng và có mưa rào bất chợt; trong khi mùa đông (tháng 12–2) lại có rét buốt hanh khô đòi hỏi bạn phải chuẩn bị áo ấm dày dặn. Hãy luôn mang theo giày thể thao êm chân vì bạn sẽ tản bộ rất nhiều trên các vỉa hè phố cổ.",
          "Đặc biệt, việc mang theo một chiếc áo khoác gió mỏng hoặc khăn quàng nhẹ sẽ giúp bạn thích nghi tốt với sự thay đổi nhiệt độ giữa buổi sáng sớm se lạnh và buổi trưa đầy nắng.",
        ],
        paragraphsEn: [
          "Hanoi experiences four distinct seasons, with autumn (September to November) and spring (March to April) regarded as optimal windows for first-time visitors. These months bring temperate breezes, mild sun, and virtually no severe rains.",
          "Summer (June to August) brings intense tropical heat and sudden showers, whereas winter (December to February) features piercing dry cold requiring warm layering. Always pack comfortable walking shoes, as your journey will involve extensive strolls across heritage pavements.",
          "Carrying a lightweight windbreaker or soft scarf ensures seamless comfort against temperature swings between crisp dawns and sunny afternoons.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Hà Nội có 4 mùa rõ rệt, trong đó mùa thu (tháng 9 đến tháng 11) và mùa xuân (tháng 3 đến tháng 4) được đánh giá là thời điểm lý tưởng nhất cho du khách lần đầu đặt chân đến. Vào những tháng này, nhiệt độ dịu mát, nắng chan hòa và không có mưa bão lớn.",
            textEn:
              "Hanoi experiences four distinct seasons, with autumn (September to November) and spring (March to April) regarded as optimal windows for first-time visitors. These months bring temperate breezes, mild sun, and virtually no severe rains.",
          },
          {
            type: "image",
            src: "/images/hanoi-old-quarter.jpg",
            altVi: "Không gian phố cổ Hà Nội thanh bình sớm mai",
            altEn: "Peaceful morning streetscape of Hanoi Old Quarter",
            captionVi: "Phố cổ Hà Nội – điểm khởi đầu quen thuộc của mọi hành trình khám phá Thủ đô.",
            captionEn: "Hanoi Old Quarter – the customary beginning of every capital expedition.",
          },
          {
            type: "paragraph",
            textVi:
              "Vào mùa hè (tháng 6–8), thời tiết khá nóng và có mưa rào bất chợt; trong khi mùa đông (tháng 12–2) lại có rét buốt hanh khô đòi hỏi bạn phải chuẩn bị áo ấm dày dặn. Hãy luôn mang theo giày thể thao êm chân vì bạn sẽ tản bộ rất nhiều trên các vỉa hè phố cổ.",
            textEn:
              "Summer (June to August) brings intense tropical heat and sudden showers, whereas winter (December to February) features piercing dry cold requiring warm layering. Always pack comfortable walking shoes, as your journey will involve extensive strolls across heritage pavements.",
          },
          {
            type: "paragraph",
            textVi:
              "Đặc biệt, việc mang theo một chiếc áo khoác gió mỏng hoặc khăn quàng nhẹ sẽ giúp bạn thích nghi tốt với sự thay đổi nhiệt độ giữa buổi sáng sớm se lạnh và buổi trưa đầy nắng.",
            textEn:
              "Carrying a lightweight windbreaker or soft scarf ensures seamless comfort against temperature swings between crisp dawns and sunny afternoons.",
          },
        ],
      },
      {
        id: "nghe-thuat-qua-duong-an-toan",
        headingVi: "Nghệ thuật qua đường tự tin giữa dòng xe",
        headingEn: "The Art of Crossing Streets Confidently",
        level: 2,
        paragraphsVi: [
          "Giao thông Hà Nội với hàng nghìn chiếc xe máy đan xen có thể khiến nhiều du khách ngỡ ngàng lúc ban đầu. Tuy nhiên, qua đường ở Hà Nội thực chất tuân theo một quy luật nhịp điệu rất tự nhiên.",
          "Bí quyết quan trọng nhất: Hãy bước đi chậm rãi, giữ tốc độ đều đặn, luôn đưa mắt quan sát các phương tiện đang tới gần và tuyệt đối không lùi bước hoặc dừng lại đột ngột giữa đường. Các tài xế xe máy sẽ tự động tính toán quỹ đạo và lách qua bạn một cách an toàn.",
          "Hãy nhớ rằng xe máy ở Việt Nam di chuyển với tốc độ vừa phải trong khu phố cổ và luôn sẵn sàng nhường đường nếu người đi bộ di chuyển với quỹ đạo dễ đoán định.",
        ],
        paragraphsEn: [
          "Hanoi's bustling symphony of countless motorbikes can appear intimidating to newcomers. However, navigating pedestrian crossings follows a graceful, intuitive rhythm.",
          "The golden rule: Walk slowly at an even, predictable pace, maintain eye contact with approaching motorists, and never hesitate, sprint, or suddenly step backward. Motorcyclists calculate trajectories and glide smoothly around you.",
          "Remember that urban motorbikes navigate at moderate speeds through narrow lanes, naturally predicting and flowing around steady pedestrians.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Giao thông Hà Nội với hàng nghìn chiếc xe máy đan xen có thể khiến nhiều du khách ngỡ ngàng lúc ban đầu. Tuy nhiên, qua đường ở Hà Nội thực chất tuân theo một quy luật nhịp điệu rất tự nhiên.",
            textEn:
              "Hanoi's bustling symphony of countless motorbikes can appear intimidating to newcomers. However, navigating pedestrian crossings follows a graceful, intuitive rhythm.",
          },
          {
            type: "callout",
            titleVi: "Quy tắc vàng khi qua đường",
            titleEn: "Golden Road Crossing Rule",
            textVi:
              "Bước đi với tốc độ ổn định, không dừng lại đột ngột, không bước thụt lùi và nhìn thẳng về hướng xe đang tới. Dòng xe máy sẽ tự động lượn vòng qua bạn một cách nhịp nhàng.",
            textEn:
              "Maintain a steady pace, never halt abruptly or step backwards, and keep your gaze toward oncoming traffic. Motorbikes will smoothly glide past.",
          },
          {
            type: "paragraph",
            textVi:
              "Bí quyết quan trọng nhất: Hãy bước đi chậm rãi, giữ tốc độ đều đặn, luôn đưa mắt quan sát các phương tiện đang tới gần và tuyệt đối không lùi bước hoặc dừng lại đột ngột giữa đường. Các tài xế xe máy sẽ tự động tính toán quỹ đạo và lách qua bạn một cách an toàn.",
            textEn:
              "The golden rule: Walk slowly at an even, predictable pace, maintain eye contact with approaching motorists, and never hesitate, sprint, or suddenly step backward. Motorcyclists calculate trajectories and glide smoothly around you.",
          },
          {
            type: "paragraph",
            textVi:
              "Hãy nhớ rằng xe máy ở Việt Nam di chuyển với tốc độ vừa phải trong khu phố cổ và luôn sẵn sàng nhường đường nếu người đi bộ di chuyển với quỹ đạo dễ đoán định.",
            textEn:
              "Remember that urban motorbikes navigate at moderate speeds through narrow lanes, naturally predicting and flowing around steady pedestrians.",
          },
        ],
      },
      {
        id: "van-hoa-ung-xu-chot-ton-nghiem",
        headingVi: "Quy tắc trang phục & ứng xử tại các chốn tôn nghiêm",
        headingEn: "Sacred Sanctuaries & Cultural Etiquette",
        level: 2,
        paragraphsVi: [
          "Hà Nội sở hữu hàng trăm ngôi đền, chùa, văn miếu linh thiêng nghìn năm tuổi. Khi viếng thăm Văn Miếu – Quốc Tử Giám, Đền Ngọc Sơn hay Chùa Trấn Quốc, du khách cần lưu ý mặc trang phục lịch sự, che kín vai và đầu gối.",
          "Hãy cởi mũ nón, nói năng khẽ khàng và tháo giày dép khi bước vào các gian thờ chính điện. Khi thắp hương, không thắp quá nhiều nén và không chụp ảnh tạo dáng phản cảm trước các pho tượng Phật hay bàn thờ tổ tiên.",
          "Sự thành kính và tôn trọng văn hóa bản địa sẽ giúp bạn nhận lại sự chào đón nồng hậu và cảm nhận được sự an yên thuần khiết tại các chốn tâm linh ngàn đời của Thủ đô.",
        ],
        paragraphsEn: [
          "Hanoi is home to hundreds of sacred temples, shrines, and ancestral pavilions. When paying homage at the Temple of Literature, Ngoc Son Temple, or Tran Quoc Pagoda, modest attire covering shoulders and knees is strictly observed.",
          "Remove hats, lower speaking voices, and slip off shoes when entering inner sanctuaries. Avoid lighting excessive incense and refrain from disrespectful poses before sacred altars.",
          "Reverence and cultural respect reward travelers with warm community hospitality and profound spiritual tranquility.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Hà Nội sở hữu hàng trăm ngôi đền, chùa, văn miếu linh thiêng nghìn năm tuổi. Khi viếng thăm Văn Miếu – Quốc Tử Giám, Đền Ngọc Sơn hay Chùa Trấn Quốc, du khách cần lưu ý mặc trang phục lịch sự, che kín vai và đầu gối.",
            textEn:
              "Hanoi is home to hundreds of sacred temples, shrines, and ancestral pavilions. When paying homage at the Temple of Literature, Ngoc Son Temple, or Tran Quoc Pagoda, modest attire covering shoulders and knees is strictly observed.",
          },
          {
            type: "image",
            src: "/images/guide/article-van-mieu-heritage.jpg",
            altVi: "Khuê Văn Các tại Văn Miếu – Quốc Tử Giám",
            altEn: "Khue Van Cac Pavilion at the Temple of Literature",
            captionVi: "Văn Miếu – Quốc Tử Giám: Ngôi trường đại học đầu tiên với những quy chuẩn tôn nghiêm nghìn năm.",
            captionEn: "Temple of Literature: Vietnam's first national university holding solemn millennial traditions.",
          },
          {
            type: "paragraph",
            textVi:
              "Hãy cởi mũ nón, nói năng khẽ khàng và tháo giày dép khi bước vào các gian thờ chính điện. Khi thắp hương, không thắp quá nhiều nén và không chụp ảnh tạo dáng phản cảm trước các pho tượng Phật hay bàn thờ tổ tiên.",
            textEn:
              "Remove hats, lower speaking voices, and slip off shoes when entering inner sanctuaries. Avoid lighting excessive incense and refrain from disrespectful poses before sacred altars.",
          },
          {
            type: "paragraph",
            textVi:
              "Sự thành kính và tôn trọng văn hóa bản địa sẽ giúp bạn nhận lại sự chào đón nồng hậu và cảm nhận được sự an yên thuần khiết tại các chốn tâm linh ngàn đời của Thủ đô.",
            textEn:
              "Reverence and cultural respect reward travelers with warm community hospitality and profound spiritual tranquility.",
          },
        ],
      },
      {
        id: "duong-day-nong-ho-tro-du-khach",
        headingVi: "Tổng đài hỗ trợ du khách 24/7 & SOS",
        headingEn: "24/7 Official Visitor Support Hotline & SOS",
        level: 2,
        paragraphsVi: [
          "Sở Du lịch Hà Nội vận hành tổng đài hỗ trợ du khách hoàn toàn miễn phí qua đầu số 1800 556 896. Khi cần tra cứu thông tin điểm đến, hỗ trợ giao tiếp ngôn ngữ, phản ánh chất lượng dịch vụ hay tìm đồ thất lạc, du khách đều có thể gọi điện để được hỗ trợ tức thì.",
          "Ngoài ra, Trung tâm Thông tin Du khách tại 28 Hàng Dầu (ngay cạnh Hồ Hoàn Kiếm) là điểm đến tiện ích cung cấp bản đồ giấy miễn phí, phát tài liệu hướng dẫn và hỗ trợ du khách nước ngoài trực tiếp.",
          "Đội ngũ nhân viên thông thạo ngoại ngữ tại trung tâm luôn sẵn sàng tư vấn chi tiết lộ trình tham quan, điểm đổi ngoại tệ uy tín và các tuyến xe buýt công cộng thuận tiện nhất.",
        ],
        paragraphsEn: [
          "The Hanoi Department of Tourism operates a free official traveler hotline at 1800 556 896. Whether you require itinerary guidance, language assistance, service feedback, or lost item tracing, bilingual officers are ready to help.",
          "Furthermore, the Tourist Information Center at 28 Hang Dau (adjacent to Sword Lake) provides complimentary heritage maps, brochures, and in-person assistance for international guests.",
          "Multilingual staff at the center offer personalized itinerary advice, reputable currency exchange suggestions, and optimal public transit connections.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Sở Du lịch Hà Nội vận hành tổng đài hỗ trợ du khách hoàn toàn miễn phí qua đầu số 1800 556 896. Khi cần tra cứu thông tin điểm đến, hỗ trợ giao tiếp ngôn ngữ, phản ánh chất lượng dịch vụ hay tìm đồ thất lạc, du khách đều có thể gọi điện để được hỗ trợ tức thì.",
            textEn:
              "The Hanoi Department of Tourism operates a free official traveler hotline at 1800 556 896. Whether you require itinerary guidance, language assistance, service feedback, or lost item tracing, bilingual officers are ready to help.",
          },
          {
            type: "callout",
            titleVi: "Danh bạ khẩn cấp 24/7",
            titleEn: "24/7 Emergency Directory",
            textVi:
              "Tổng đài Du lịch Hà Nội: 1800 556 896 (Miễn cước, hỗ trợ Anh - Việt) • Cảnh sát 113 • Cấp cứu y tế 115 • Trung tâm Thông tin Du khách: 28 Hàng Dầu, Hoàn Kiếm.",
            textEn:
              "Hanoi Tourist Hotline: 1800 556 896 (Toll-free, EN-VI) • Police: 113 • Ambulance: 115 • Visitor Center: 28 Hang Dau street, Hoan Kiem.",
          },
          {
            type: "paragraph",
            textVi:
              "Ngoài ra, Trung tâm Thông tin Du khách tại 28 Hàng Dầu (ngay cạnh Hồ Hoàn Kiếm) là điểm đến tiện ích cung cấp bản đồ giấy miễn phí, phát tài liệu hướng dẫn và hỗ trợ du khách nước ngoài trực tiếp.",
            textEn:
              "Furthermore, the Tourist Information Center at 28 Hang Dau (adjacent to Sword Lake) provides complimentary heritage maps, brochures, and in-person assistance for international guests.",
          },
          {
            type: "paragraph",
            textVi:
              "Đội ngũ nhân viên thông thạo ngoại ngữ tại trung tâm luôn sẵn sàng tư vấn chi tiết lộ trình tham quan, điểm đổi ngoại tệ uy tín và các tuyến xe buýt công cộng thuận tiện nhất.",
            textEn:
              "Multilingual staff at the center offer personalized itinerary advice, reputable currency exchange suggestions, and optimal public transit connections.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "BÍ KÍP BỎ TÚI CHO DU KHÁCH LẦN ĐẦU",
      titleEn: "ESSENTIAL FIRST-TIME POCKET TIPS",
      itemsVi: [
        "Đổi ngoại tệ: Các hiệu vàng trên phố Hà Trung hoặc các ngân hàng trung tâm quanh bờ hồ là điểm đổi tiền hợp pháp và tỷ giá tốt.",
        "SIM điện thoại: Mua SIM du lịch 4G Viettel hoặc Vinaphone ngay tại sảnh sân bay Nội Bài để đảm bảo mạng internet liên tục.",
        "Mặc cả mua sắm: Tại các chợ truyền thống như Đồng Xuân, bạn có thể trả giá nhẹ nhàng khoảng 15–20% so với giá chào đầu tiên.",
        "Số điện thoại SOS: 1800 556 896 (Tổng đài Du lịch miễn phí), 113 (Công an), 115 (Cấp cứu y tế).",
      ],
      itemsEn: [
        "Currency exchange: Authorized exchange counters on Ha Trung street or central commercial banks around Sword Lake provide reliable rates.",
        "Connectivity: Pick up a Viettel or Vinaphone 4G tourist eSIM/SIM at Noi Bai Airport arrival hall for uninterrupted data.",
        "Bargaining tips: In open markets such as Dong Xuan, courteous negotiation of 15–20% is acceptable with a warm smile.",
        "Emergency Contacts: 1800 556 896 (Free Tourist Hotline), 113 (Police), 115 (Medical Ambulance).",
      ],
    },
    mentionedPlaces: [
      {
        slug: "temple-of-literature",
        nameVi: "Văn Miếu – Quốc Tử Giám",
        nameEn: "Temple of Literature",
        areaVi: "Quận Đống Đa",
        areaEn: "Dong Da District",
        summaryVi: "Trường đại học đầu tiên của Việt Nam với 82 tấm bia tiến sĩ được UNESCO vinh danh.",
        summaryEn: "Vietnam's first national university housing 82 UNESCO-inscribed doctorate stelae.",
        image: "/images/guide/article-van-mieu-heritage.jpg",
        href: "/destinations/temple-of-literature",
      },
      {
        slug: "hoan-kiem-lake",
        nameVi: "Hồ Hoàn Kiếm & Đền Ngọc Sơn",
        nameEn: "Hoan Kiem Lake & Ngoc Son Temple",
        areaVi: "Quận Hoàn Kiếm",
        areaEn: "Hoan Kiem District",
        summaryVi: "Di tích lịch sử văn hóa trọng điểm và trung tâm kết nối các dịch vụ du khách.",
        summaryEn: "A paramount cultural sanctuary and hub connecting all central visitor services.",
        image: "/images/hoan-kiem-lake.jpg",
        href: "/destinations/hoan-kiem-lake",
      },
    ],
    relatedSlugs: [
      "kham-pha-ha-noi-bang-cach-nao",
      "mot-ngay-thuong-thuc-am-thuc-ha-thanh",
      "hen-voi-ha-noi-vao-mot-ngay-thu",
    ],
  },

  // =================================================================================
  // 5. GÓC HÀ NỘI: Sống chậm giữa lòng Thủ đô
  // =================================================================================
  {
    id: "song-cham-giua-long-thu-do",
    slug: "song-cham-giua-long-thu-do",
    titleVi: "Sống chậm giữa lòng Thủ đô",
    titleEn: "Slow Living in the Heart of the Capital",
    descriptionVi:
      "Gợi ý những góc tĩnh lặng: quán cà phê trứng nép mình sâu trong ngõ cổ, ngắm bình minh Hồ Gươm và thưởng trà sen thanh tao bên Hồ Tây.",
    descriptionEn:
      "Uncovering quiet sanctuaries: a hidden egg coffee alley, dawn mist over Sword Lake, and delicate lotus tea by West Lake.",
    categoryKey: "corners",
    categoryLabelVi: "GÓC HÀ NỘI",
    categoryLabelEn: "HANOI CORNERS",
    authorVi: "Biên Niên Ký Văn Hóa Tràng An",
    authorEn: "Trang An Cultural Chronicle",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-12T08:00:00Z",
    readingTimeVi: "4 phút đọc",
    readingTimeEn: "4 min read",
    readingTimeMinutes: 4,
    coverImage: "/images/guide/corners-egg-coffee.jpg",
    coverImageAltVi: "Ly cà phê trứng truyền thống sánh mịn trong không gian quán cà phê ngõ nhỏ Hà Nội",
    coverImageAltEn: "Velvety traditional Hanoi egg coffee in a quiet heritage alleyway cafe",
    coverImageCaptionVi: "Cà phê trứng – khoảnh khắc sống chậm quen thuộc của người Hà thành",
    coverImageCaptionEn: "Egg coffee – an enduring ritual of contemplative slow living in Hanoi",
    coverImageCreditVi: "Ký Ức Phố Cổ Hà Nội",
    coverImageCreditEn: "Hanoi Heritage Memories",
    href: "/guide/song-cham-giua-long-thu-do",
    sections: [
      {
        id: "nhung-con-ngo-sau-cat-giau-thoi-gian",
        headingVi: "Những con ngõ nhỏ cất giấu trầm tích thời gian",
        headingEn: "Deep Alleys Concealing Layers of Time",
        level: 2,
        paragraphsVi: [
          "Giữa sự hối hả của một đô thị gần 10 triệu dân, Hà Nội vẫn cất giữ những khoảng lặng kỳ diệu. Chỉ cần rẽ bước vào một con ngõ sâu hun hút trên phố Hàng Buồm hay Hàng Chỉ, âm thanh xe cộ dường như lùi xa sau cánh cổng vòm rêu phong.",
          "Những bức tường vàng nhuốm màu thời gian, giàn hoa giấy rủ bóng trước hiên nhà gỗ, và tiếng chuyện trò rì rầm của các cụ già bên bàn cờ tướng tạo nên một nhịp thở êm đềm, tách biệt hoàn toàn với phố xá ngoài kia.",
          "Những con ngõ Hà Nội tựa như những mạch ngầm thời gian, nơi quá khứ và hiện tại giao hòa trong từng bậc cầu thang gỗ ọp ẹp và mùi trầm hương thơm ngát từ gian thờ tổ tiên.",
        ],
        paragraphsEn: [
          "Amidst the velocity of a metropolis of nearly 10 million souls, Hanoi harbors quiet sanctuaries of stillness. Step through a narrow alley on Hang Buom or Hang Chi, and street cacophony fades behind mossy archways.",
          "Weathered ochre walls patinated by decades, bougainvillea cascading over wooden balconies, and the soft banter of elders over Chinese chess evoke a gentle, unhurried tempo insulated from modern haste.",
          "Hanoi's labyrinthine alleys resemble subterranean currents of memory, where yesterday and today gently converge across creaking timber stairs and fragrant incense.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Giữa sự hối hả của một đô thị gần 10 triệu dân, Hà Nội vẫn cất giữ những khoảng lặng kỳ diệu. Chỉ cần rẽ bước vào một con ngõ sâu hun hút trên phố Hàng Buồm hay Hàng Chỉ, âm thanh xe cộ dường như lùi xa sau cánh cổng vòm rêu phong.",
            textEn:
              "Amidst the velocity of a metropolis of nearly 10 million souls, Hanoi harbors quiet sanctuaries of stillness. Step through a narrow alley on Hang Buom or Hang Chi, and street cacophony fades behind mossy archways.",
          },
          {
            type: "image",
            src: "/images/walking-the-old-quarter.jpg",
            altVi: "Không gian ngõ nhỏ phố cổ Hà Nội tĩnh lặng",
            altEn: "Quiet historic alleyway in Hanoi Old Quarter",
            captionVi: "Ngõ nhỏ phố cổ – nơi lưu giữ nhịp sống bình yên tách biệt khỏi phố xá ồn ào.",
            captionEn: "Historic alleys – tranquil sanctuaries sheltered from urban clamor.",
          },
          {
            type: "paragraph",
            textVi:
              "Những bức tường vàng nhuốm màu thời gian, giàn hoa giấy rủ bóng trước hiên nhà gỗ, và tiếng chuyện trò rì rầm của các cụ già bên bàn cờ tướng tạo nên một nhịp thở êm đềm, tách biệt hoàn toàn với phố xá ngoài kia.",
            textEn:
              "Weathered ochre walls patinated by decades, bougainvillea cascading over wooden balconies, and the soft banter of elders over Chinese chess evoke a gentle, unhurried tempo insulated from modern haste.",
          },
          {
            type: "paragraph",
            textVi:
              "Những con ngõ Hà Nội tựa như những mạch ngầm thời gian, nơi quá khứ và hiện tại giao hòa trong từng bậc cầu thang gỗ ọp ẹp và mùi trầm hương thơm ngát từ gian thờ tổ tiên.",
            textEn:
              "Hanoi's labyrinthine alleys resemble subterranean currents of memory, where yesterday and today gently converge across creaking timber stairs and fragrant incense.",
          },
        ],
      },
      {
        id: "ca-phe-xua-va-goc-hoai-niem",
        headingVi: "Cà phê trứng và góc hoai niệm bình yên",
        headingEn: "Heritage Cafes and Nostalgic Moments",
        level: 2,
        paragraphsVi: [
          "Người Hà Nội không uống cà phê vội vã. Họ tìm đến những quán cà phê nép mình trên gác hai của căn biệt thự Pháp cổ hay sâu trong ngõ hẻm chỉ vừa một người lách qua.",
          "Ngồi tựa lưng vào tường gạch cũ, nhấp một ngụm cà phê trứng ấm nóng béo bùi, ngắm nhìn giọt cà phê nhỏ chầm chậm qua chiếc phin nhôm. Trong tiếng nhạc Trịnh văng vẳng bên tai, thời gian dường như ngưng đọng lại trong từng khoảnh khắc.",
          "Những chiếc bàn gỗ con mộc mạc, bình hoa loa kèn trắng cắm hờ hững và ánh sáng tự nhiên rọi qua khung cửa chớp là không gian hoàn hảo để đọc một cuốn sách hoặc viết vài dòng nhật ký hành trình.",
        ],
        paragraphsEn: [
          "Hanoians do not drink coffee in haste. They seek out cafes tucked away on the second floor of colonial French villas or secluded deep within passageways scarcely one person wide.",
          "Resting against rustic brick walls, sipping creamy warm egg coffee, watching rhythmic drops seep through tin filters. Accompanied by the nostalgic melodies of Trinh Cong Son, time seems to suspend itself.",
          "Rustic timber tables, white lilies loosely arranged in vintage vases, and soft daylight filtering through wooden shutters offer the ideal haven for contemplative reading or journaling.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Người Hà Nội không uống cà phê vội vã. Họ tìm đến những quán cà phê nép mình trên gác hai của căn biệt thự Pháp cổ hay sâu trong ngõ hẻm chỉ vừa một người lách qua.",
            textEn:
              "Hanoians do not drink coffee in haste. They seek out cafes tucked away on the second floor of colonial French villas or secluded deep within passageways scarcely one person wide.",
          },
          {
            type: "image",
            src: "/images/guide/corners-egg-coffee.jpg",
            altVi: "Ly cà phê trứng sóng sánh trong góc quán nhỏ",
            altEn: "Velvety egg coffee in quiet corner cafe",
            captionVi: "Cà phê trứng – nốt lặng thi vị trong nhịp sống đô thị.",
            captionEn: "Egg coffee – a poetic pause amidst urban tempos.",
          },
          {
            type: "paragraph",
            textVi:
              "Ngồi tựa lưng vào tường gạch cũ, nhấp một ngụm cà phê trứng ấm nóng béo bùi, ngắm nhìn giọt cà phê nhỏ chầm chậm qua chiếc phin nhôm. Trong tiếng nhạc Trịnh văng vẳng bên tai, thời gian dường như ngưng đọng lại trong từng khoảnh khắc.",
            textEn:
              "Resting against rustic brick walls, sipping creamy warm egg coffee, watching rhythmic drops seep through tin filters. Accompanied by the nostalgic melodies of Trinh Cong Son, time seems to suspend itself.",
          },
          {
            type: "paragraph",
            textVi:
              "Những chiếc bàn gỗ con mộc mạc, bình hoa loa kèn trắng cắm hờ hững và ánh sáng tự nhiên rọi qua khung cửa chớp là không gian hoàn hảo để đọc một cuốn sách hoặc viết vài dòng nhật ký hành trình.",
            textEn:
              "Rustic timber tables, white lilies loosely arranged in vintage vases, and soft daylight filtering through wooden shutters offer the ideal haven for contemplative reading or journaling.",
          },
        ],
      },
      {
        id: "binh-minh-va-chieu-buong-long-bien",
        headingVi: "Đón bình minh Hồ Gươm và chiều tà trên cầu Long Biên",
        headingEn: "Dawn Mist on Sword Lake and Long Bien Sunsets",
        level: 2,
        paragraphsVi: [
          "Khoảng thời gian đẹp nhất để thực sự sống chậm là 5 giờ 30 sáng bên bờ Hồ Gươm. Khi cả thành phố còn say ngủ, mặt hồ mờ ảo hơi sương, từng đoàn người tập thái cực quyền khoan thai dưới rặng liễu rủ.",
          "Và khi ngày sắp tàn, hãy lên cầu Long Biên – chứng nhân lịch sử trăm năm tuổi bắc qua sông Hồng. Đón ngọn gió lộng từ bãi bồi phù sa, ngắm đoàn tàu hỏa chạy qua nhịp cầu thép rỉ sét và chiêm ngưỡng ráng chiều đỏ rực buông xuống đường chân trời.",
          "Đứng giữa không gian bao la của sông nước và ngắm nhìn ánh hoàng hôn tắt dần sau những nhịp cầu thép kiên cường, bạn sẽ thấy tâm hồn mình nhẹ bẫng và thêm yêu mảnh đất nghìn năm này.",
        ],
        paragraphsEn: [
          "The most magical window for contemplative presence is 5:30 AM beside Sword Lake. While the capital sleeps, a translucent veil of mist embraces the waters, and elders practice graceful tai chi beneath willows.",
          "And as dusk nears, ascend the hundred-year-old Long Bien Bridge spanning the Red River. Catching river breezes over alluvial banana islands, watching locomotives rumble across cantilever steel spans, sunset bathes the horizon in fire.",
          "Standing amidst the vast river breezes as twilight fades behind resilient steel cantilevers, one feels deeply liberated and intimately connected with this millennial capital.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Khoảng thời gian đẹp nhất để thực sự sống chậm là 5 giờ 30 sáng bên bờ Hồ Gươm. Khi cả thành phố còn say ngủ, mặt hồ mờ ảo hơi sương, từng đoàn người tập thái cực quyền khoan thai dưới rặng liễu rủ.",
            textEn:
              "The most magical window for contemplative presence is 5:30 AM beside Sword Lake. While the capital sleeps, a translucent veil of mist embraces the waters, and elders practice graceful tai chi beneath willows.",
          },
          {
            type: "paragraph",
            textVi:
              "Và khi ngày sắp tàn, hãy lên cầu Long Biên – chứng nhân lịch sử trăm năm tuổi bắc qua sông Hồng. Đón ngọn gió lộng từ bãi bồi phù sa, ngắm đoàn tàu hỏa chạy qua nhịp cầu thép rỉ sét và chiêm ngưỡng ráng chiều đỏ rực buông xuống đường chân trời.",
            textEn:
              "And as dusk nears, ascend the hundred-year-old Long Bien Bridge spanning the Red River. Catching river breezes over alluvial banana islands, watching locomotives rumble across cantilever steel spans, sunset bathes the horizon in fire.",
          },
          {
            type: "image",
            src: "/images/long-bien-bridge.jpg",
            altVi: "Cầu Long Biên cổ kính trầm mặc trong ánh chiều hoàng hôn sông Hồng",
            altEn: "Historic Long Bien Bridge bathed in dramatic sunset over Red River",
            captionVi: "Cầu Long Biên – nơi ngắm ráng chiều buông xuống bãi bồi sông Hồng bình yên.",
            captionEn: "Long Bien Bridge – a timeless vantage point to witness twilight over alluvial islands.",
          },
          {
            type: "paragraph",
            textVi:
              "Đứng giữa không gian bao la của sông nước và ngắm nhìn ánh hoàng hôn tắt dần sau những nhịp cầu thép kiên cường, bạn sẽ thấy tâm hồn mình nhẹ bẫng và thêm yêu mảnh đất nghìn năm này.",
            textEn:
              "Standing amidst the vast river breezes as twilight fades behind resilient steel cantilevers, one feels deeply liberated and intimately connected with this millennial capital.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "BÍ QUYẾT SỐNG CHẬM TẠI HÀ NỘI",
      titleEn: "SECRETS OF SLOW LIVING IN HANOI",
      itemsVi: [
        "Khung giờ yên tĩnh: 05:30 – 07:00 sáng quanh hồ Hoàn Kiếm hoặc 16:30 – 18:00 chiều trên cầu Long Biên.",
        "Trải nghiệm tĩnh lặng: Tắt thông báo điện thoại, mang theo một cuốn sách yêu thích và chọn một quán cà phê ngõ nhỏ.",
        "Dạo bước không vội vã: Thay vì lên lịch trình dày đặc, hãy chọn một góc phố cổ và dành trọn buổi sáng quan sát nhịp sống đời thường.",
      ],
      itemsEn: [
        "Tranquil hours: 05:30 – 07:00 AM around Sword Lake or 16:30 – 18:00 PM along Long Bien Bridge walkway.",
        "Mindful ritual: Mute phone notifications, carry a cherished book, and settle into a quiet alleyway cafe.",
        "Unplanned wandering: Instead of a rigid checklist, pick one heritage street and spend the morning watching authentic local life unfold.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "hoan-kiem-lake",
        nameVi: "Hồ Hoàn Kiếm",
        nameEn: "Hoan Kiem Lake",
        areaVi: "Quận Hoàn Kiếm",
        areaEn: "Hoan Kiem District",
        summaryVi: "Nơi lý tưởng nhất để đón bình minh sớm và ngắm nhìn nhịp sống thư thái của người Hà Nội.",
        summaryEn: "The perfect vantage point to greet morning dawn and observe tranquil local lifestyles.",
        image: "/images/hoan-kiem-lake.jpg",
        href: "/destinations/hoan-kiem-lake",
      },
      {
        slug: "long-bien-bridge",
        nameVi: "Cầu Long Biên",
        nameEn: "Long Bien Bridge",
        areaVi: "Quận Long Biên / Hoàn Kiếm",
        areaEn: "Long Bien / Hoan Kiem District",
        summaryVi: "Cây cầu thép lịch sử trăm tuổi nơi đón gió sông Hồng và ngắm hoàng hôn đẹp nhất Thủ đô.",
        summaryEn: "A historic century-old steel bridge offering refreshing breezes and Hanoi's most iconic sunsets.",
        image: "/images/long-bien-bridge.jpg",
        href: "/destinations/long-bien-bridge",
      },
    ],
    relatedSlugs: [
      "hen-voi-ha-noi-vao-mot-ngay-thu",
      "mot-ngay-thuong-thuc-am-thuc-ha-thanh",
      "lan-dau-den-ha-noi-can-biet-gi",
    ],
  },

  // =================================================================================
  // 6. BỐN MÙA HÀ NỘI (2): Hà Nội mùa đông: Những quán ăn đêm sưởi ấm lòng người
  // =================================================================================
  {
    id: "ha-noi-mua-dong-quan-an-dem",
    slug: "ha-noi-mua-dong-quan-an-dem",
    titleVi: "Hà Nội mùa đông: Những quán ăn đêm sưởi ấm lòng người",
    titleEn: "Winter in Hanoi: Midnight Eateries That Warm the Soul",
    descriptionVi:
      "Khi gió mùa đông bắc tràn về từng góc phố, những quán ăn đêm nghi ngút khói với bát ốc luộc lá bưởi, cháo sườn sụn và bánh trôi tàu nóng hổi sưởi ấm lòng lữ khách.",
    descriptionEn:
      "As northeasterly monsoons sweep through historic lanes, steaming nocturnal stalls serving boiled snails, ribs congee, and ginger dumplings bring soulful warmth.",
    categoryKey: "seasons",
    categoryLabelVi: "BỐN MÙA HÀ NỘI",
    categoryLabelEn: "FOUR SEASONS",
    authorVi: "Biên Niên Ký Văn Hóa Tràng An",
    authorEn: "Trang An Cultural Chronicle",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-15T08:00:00Z",
    readingTimeVi: "7 phút đọc",
    readingTimeEn: "7 min read",
    readingTimeMinutes: 7,
    coverImage: "/images/bun-oc-ha-noi.jpg",
    coverImageAltVi: "Bát bún ốc nóng hổi bốc khói nghi ngút trong đêm đông Hà Nội",
    coverImageAltEn: "Steaming bowl of spicy snail noodle soup on a cold Hanoi winter night",
    coverImageCaptionVi: "Bún ốc nóng hổi – thức quà đêm xua tan giá rét mùa đông Thủ đô.",
    coverImageCaptionEn: "Piping-hot snail noodle soup dispelling winter chill across Hanoi lanes.",
    coverImageCreditVi: "Kho Tư Liệu Ẩm Thực Hanoi Discovery",
    coverImageCreditEn: "Hanoi Discovery Culinary Archives",
    href: "/guide/ha-noi-mua-dong-quan-an-dem",
    sections: [
      {
        id: "gio-mua-va-tieng-dem-pho-co",
        headingVi: "Gió bấc đầu mùa và thanh âm đêm phố cổ",
        headingEn: "First Winter Monsoons and Night Symphonies",
        level: 2,
        paragraphsVi: [
          "Mùa đông Hà Nội mang một phong vị rất riêng, vừa tĩnh lặng, vừa sâu lắng trong cái rét ngọt cắt da thịt. Khi đồng hồ điểm qua 22 giờ, phố phường thưa vắng người qua lại, nhường chỗ cho tiếng gió rít qua những khe cửa sổ gỗ cũ và tiếng còi tàu đêm vọng lại từ ga Hàng Cỏ.",
          "Chính trong không gian se sắt ấy, những ánh đèn dầu và bếp than hồng từ các quán ăn đêm hè phố bỗng trở thành những đốm lửa sưởi ấm tâm hồn. Ngồi nép mình bên chiếc bàn gỗ nhỏ, xuýt xoa đôi bàn tay lạnh cóng trước bát nước dùng bốc khói ngùn ngụt, du khách mới cảm nhận được hết sự nồng hậu và thi vị của ẩm thực đêm Hà thành.",
        ],
        paragraphsEn: [
          "Winter in Hanoi possesses an unmistakable temper: quiet, piercing, yet intimately poetic. Past 10 PM, avenues empty out, leaving only the whistle of chilly monsoons through shuttered windows and distant train whistles echoing from the central station.",
          "Amidst the chill, glowing coals and amber oil lamps from pavement stalls become welcoming beacons. Nestling beside rustic timber tables, warming cold fingers around bowls of steaming broth, one truly discovers the heartfelt intimacy of Hanoi's night gastronomy.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Mùa đông Hà Nội mang một phong vị rất riêng, vừa tĩnh lặng, vừa sâu lắng trong cái rét ngọt cắt da thịt. Khi đồng hồ điểm qua 22 giờ, phố phường thưa vắng người qua lại, nhường chỗ cho tiếng gió rít qua những khe cửa sổ gỗ cũ và tiếng còi tàu đêm vọng lại từ ga Hàng Cỏ.",
            textEn:
              "Winter in Hanoi possesses an unmistakable temper: quiet, piercing, yet intimately poetic. Past 10 PM, avenues empty out, leaving only the whistle of chilly monsoons through shuttered windows and distant train whistles echoing from the central station.",
          },
          {
            type: "image",
            src: "/images/banh-mi-dan-to.jpg",
            altVi: "Quán ăn đêm tấp nập khách bên vỉa hè phố cổ",
            altEn: "Bustling night food stall along Hanoi pavement",
            captionVi: "Những góc phố ẩm thực đêm đỏ lửa sưởi ấm không gian mùa đông giá buốt.",
            captionEn: "Nighttime culinary hubs radiating warmth amidst the winter breeze.",
          },
          {
            type: "paragraph",
            textVi:
              "Chính trong không gian se sắt ấy, những ánh đèn dầu và bếp than hồng từ các quán ăn đêm hè phố bỗng trở thành những đốm lửa sưởi ấm tâm hồn. Ngồi nép mình bên chiếc bàn gỗ nhỏ, xuýt xoa đôi bàn tay lạnh cóng trước bát nước dùng bốc khói ngùn ngụt, du khách mới cảm nhận được hết sự nồng hậu và thi vị của ẩm thực đêm Hà thành.",
            textEn:
              "Amidst the chill, glowing coals and amber oil lamps from pavement stalls become welcoming beacons. Nestling beside rustic timber tables, warming cold fingers around bowls of steaming broth, one truly discovers the heartfelt intimacy of Hanoi's night gastronomy.",
          },
        ],
      },
      {
        id: "mon-ngon-suoi-am",
        headingVi: "Những món nước nóng hổi xua tan giá lạnh",
        headingEn: "Steaming Bowls Dispelling the Frost",
        level: 2,
        paragraphsVi: [
          "Bát bún ốc nóng chua thanh vị giấm bỗng, cay nồng ớt chưng và giòn sần sật từng con ốc nhồi béo múp là lựa chọn hàng đầu của người sành ăn. Nước dùng chua dịu rực màu cà chua xào, điểm xuyết vài cọng tía tô và hành hoa cắt nhỏ, chỉ cần húp một thìa là cảm nhận hơi ấm lan tỏa khắp lồng ngực.",
          "Bên cạnh bún ốc, bát cháo sườn sụn sánh mịn như nhung trên phố Hàng Bồ hay Lý Quốc Sư cũng là món ăn gắn liền với tuổi thơ người Hà Nội. Từng thìa cháo thơm nức mùi gạo mới xay, ăn kèm quẩy giòn tan và ruốc thịt bông mịn, tạo nên sự thỏa nguyện trọn vẹn trong đêm đông.",
        ],
        paragraphsEn: [
          "A bowl of piping-hot snail soup infused with tangy fermented rice vinegar, fiery roasted chili oil, and tender snails stands as a connoisseur favorite. Savoring a spoonful immediately sends radiating warmth through the body.",
          "Alongside snail soup, velvety pork rib cartilage congee on Hang Bo or Ly Quoc Su embodies nostalgic memories. Each spoonful of fragrant milled rice congee, paired with crispy crullers and salted pork floss, provides deep comfort on winter nights.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Bát bún ốc nóng chua thanh vị giấm bỗng, cay nồng ớt chưng và giòn sần sật từng con ốc nhồi béo múp là lựa chọn hàng đầu của người sành ăn. Nước dùng chua dịu rực màu cà chua xào, điểm xuyết vài cọng tía tô và hành hoa cắt nhỏ, chỉ cần húp một thìa là cảm nhận hơi ấm lan tỏa khắp lồng ngực.",
            textEn:
              "A bowl of piping-hot snail soup infused with tangy fermented rice vinegar, fiery roasted chili oil, and tender snails stands as a connoisseur favorite. Savoring a spoonful immediately sends radiating warmth through the body.",
          },
          {
            type: "image",
            src: "/images/bun-oc-ha-noi.jpg",
            altVi: "Bát bún ốc truyền thống đậm đà phong vị",
            altEn: "Traditional Hanoi snail vermicelli soup",
            captionVi: "Bún ốc nóng – sự hòa quyện tuyệt vời giữa vị chua giấm bỗng và cay nồng ớt chưng.",
            captionEn: "Hot snail soup – a harmonious blend of fermented rice tang and chili heat.",
          },
          {
            type: "callout",
            titleVi: "Địa chỉ ăn đêm nức tiếng",
            titleEn: "Night Food Spots",
            textVi:
              "Bún ốc Hàng Chiếu (mở từ 21h đến 2h sáng), Cháo sườn Hàng Bồ (bán đêm), và Bánh trôi tàu Đệ Nhất Quán phố Hàng Giầy là những tọa độ không thể bỏ qua.",
            textEn:
              "Hang Chieu Snail Noodles (9 PM - 2 AM), Hang Bo Rib Congee, and Hang Giay sweet ginger dumplings are iconic late-night destinations.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "MẸO KHÁM PHÁ ĐÊM ĐÔNG HÀ NỘI",
      titleEn: "WINTER NIGHT TIPS",
      itemsVi: [
        "Trang phục: Mặc áo ấm nhiều lớp, chuẩn bị khăn len quàng cổ và găng tay khi dạo phố đêm.",
        "Thời gian: Các quán ăn đêm phố cổ hoạt động nhộn nhịp nhất từ 21:00 đến 01:00 sáng.",
        "Tiền mặt: Hãy chuẩn bị tiền mặt mệnh giá nhỏ để thanh toán tiện lợi tại các gánh hàng vỉa hè.",
      ],
      itemsEn: [
        "Attire: Layer up with a warm wool coat, scarf, and gloves for late-night strolls.",
        "Timing: Old Quarter night eateries are liveliest between 9:00 PM and 1:00 AM.",
        "Cash: Keep small cash notes handy for hassle-free street vendor payments.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "hanoi-old-quarter",
        nameVi: "Phố cổ Hà Nội",
        nameEn: "Hanoi Old Quarter",
        areaVi: "Hoàn Kiếm, Hà Nội",
        areaEn: "Hoan Kiem, Hanoi",
        summaryVi: "Trung tâm ẩm thực đêm rực rỡ với hàng trăm gánh hàng gia truyền sưởi ấm đêm đông.",
        summaryEn: "Vibrant late-night culinary hub with generational recipes warming cold winter nights.",
        image: "/images/guide/experience-hanoi-heritage.jpg",
        href: "/destinations/hanoi-old-quarter",
      },
    ],
    relatedSlugs: ["hen-voi-ha-noi-vao-mot-ngay-thu", "mot-ngay-thuong-thuc-am-thuc-ha-thanh"],
  },

  // =================================================================================
  // 7. BỐN MÙA HÀ NỘI (3): Sắc xuân rực rỡ bên chợ hoa đào Quảng Bá
  // =================================================================================
  {
    id: "sac-xuan-ben-cho-hoa-dao-quang-ba",
    slug: "sac-xuan-ben-cho-hoa-dao-quang-ba",
    titleVi: "Sắc xuân rực rỡ bên chợ hoa đào Quảng Bá",
    titleEn: "Vibrant Springtime at Quang Ba Peach Blossom Market",
    descriptionVi:
      "Hành trình đón Tết cổ truyền qua những chuyến xe hoa bích đào rực rỡ, chợ hoa đêm Quảng Bá lung linh và hương trầm bảng lảng chốn chùa chiền.",
    descriptionEn:
      "Welcoming traditional Lunar New Year through blooming peach blossoms, Quang Ba night flower market, and sacred temple incense.",
    categoryKey: "seasons",
    categoryLabelVi: "BỐN MÙA HÀ NỘI",
    categoryLabelEn: "FOUR SEASONS",
    authorVi: "Ban Biên Tập Hanoi Discovery",
    authorEn: "Hanoi Discovery Editorial Board",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-18T08:00:00Z",
    readingTimeVi: "6 phút đọc",
    readingTimeEn: "6 min read",
    readingTimeMinutes: 6,
    coverImage: "/images/tran-quoc-pagoda.jpg",
    coverImageAltVi: "Sắc xuân rực rỡ bên chùa Trấn Quốc và mặt nước Hồ Tây",
    coverImageAltEn: "Spring atmosphere by Tran Quoc Pagoda and West Lake",
    coverImageCaptionVi: "Xuân về bên Chùa Trấn Quốc cổ kính – khởi đầu năm mới an lành.",
    coverImageCaptionEn: "Spring arrival by historic Tran Quoc Pagoda – blessing a peaceful New Year.",
    coverImageCreditVi: "Tư Liệu Di Sản Hà Nội",
    coverImageCreditEn: "Hanoi Heritage Archives",
    href: "/guide/sac-xuan-ben-cho-hoa-dao-quang-ba",
    sections: [
      {
        id: "cho-hoa-dem-khong-ngu",
        headingVi: "Chợ hoa đêm không ngủ những ngày giáp Tết",
        headingEn: "The Sleepless Night Flower Market Before Tet",
        level: 2,
        paragraphsVi: [
          "Những ngày cuối năm âm lịch, chợ hoa Quảng Bá bên đê sông Hồng trở thành tâm điểm nhộn nhịp nhất của Thủ đô. Từ nửa đêm đến rạng sáng, hàng nghìn cành bích đào Nhật Tân hồng thắm, những chậu quất trĩu quả vàng óng và muôn sắc hoa ly, hoa lan từ khắp các làng hoa đổ về.",
          "Ánh đèn cao áp rọi sáng rực từng lối đi, tiếng trả giá rôm rả hòa cùng mùi thơm thanh khiết của hoa tươi tạo nên bầu không khí Tết rộn ràng khó quên đối với bất kỳ ai từng ghé thăm.",
        ],
        paragraphsEn: [
          "In the final days of the lunar year, Quang Ba flower market beside the Red River dyke turns into the capital's liveliest hub. From midnight to dawn, thousands of pink Nhat Tan peach blossom branches, golden kumquat trees, and fragrant lilies gather.",
          "Floodlights illuminate pathways as cheerful bargaining mingles with floral aromas, creating an unforgettable festive Tet atmosphere.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Những ngày cuối năm âm lịch, chợ hoa Quảng Bá bên đê sông Hồng trở thành tâm điểm nhộn nhịp nhất của Thủ đô. Từ nửa đêm đến rạng sáng, hàng nghìn cành bích đào Nhật Tân hồng thắm, những chậu quất trĩu quả vàng óng và muôn sắc hoa ly, hoa lan từ khắp các làng hoa đổ về.",
            textEn:
              "In the final days of the lunar year, Quang Ba flower market beside the Red River dyke turns into the capital's liveliest hub. From midnight to dawn, thousands of pink Nhat Tan peach blossom branches, golden kumquat trees, and fragrant lilies gather.",
          },
          {
            type: "image",
            src: "/images/tran-quoc-pagoda.jpg",
            altVi: "Chùa Trấn Quốc đón xuân thanh tịnh",
            altEn: "Tran Quoc Pagoda peaceful in spring",
            captionVi: "Chùa Trấn Quốc bên Hồ Tây – điểm viếng thăm cầu an đầu năm của người dân Thủ đô.",
            captionEn: "Tran Quoc Pagoda by West Lake – sacred New Year pilgrimage sanctuary.",
          },
          {
            type: "paragraph",
            textVi:
              "Ánh đèn cao áp rọi sáng rực từng lối đi, tiếng trả giá rôm rả hòa cùng mùi thơm thanh khiết của hoa tươi tạo nên bầu không khí Tết rộn ràng khó quên đối với bất kỳ ai từng ghé thăm.",
            textEn:
              "Floodlights illuminate pathways as cheerful bargaining mingles with floral aromas, creating an unforgettable festive Tet atmosphere.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "LƯU Ý KHI ĐI CHỢ HOA XUÂN",
      titleEn: "SPRING FLOWER MARKET TIPS",
      itemsVi: [
        "Khung giờ đẹp: 01:00 – 04:00 sáng là lúc hoa tươi mới chuyển về chợ nhiều và rực rỡ nhất.",
        "Chọn hoa đào: Tìm cành có dăm nhỏ, nụ mập và phân bố đều để hoa nở đúng dịp đầu năm.",
      ],
      itemsEn: [
        "Optimal hours: 1:00 – 4:00 AM when the freshest blooms arrive at peak vibrancy.",
        "Picking blossoms: Choose branches with dense slender twigs and plump buds.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "tran-quoc-pagoda",
        nameVi: "Chùa Trấn Quốc",
        nameEn: "Tran Quoc Pagoda",
        areaVi: "Tây Hồ, Hà Nội",
        areaEn: "Tay Ho, Hanoi",
        summaryVi: "Ngôi chùa cổ nhất Hà Nội với lịch sử hơn 1500 năm, điểm tựa tâm linh trong tiết xuân.",
        summaryEn: "Hanoi's oldest temple with over 1500 years of history, a sacred spiritual haven.",
        image: "/images/tran-quoc-pagoda.jpg",
        href: "/destinations/tran-quoc-pagoda",
      },
    ],
    relatedSlugs: ["hen-voi-ha-noi-vao-mot-ngay-thu", "ha-noi-mua-dong-quan-an-dem"],
  },

  // =================================================================================
  // 8. DI CHUYỂN (2): Trải nghiệm xe buýt 2 tầng thoáng nóc: Vòng quanh 25 danh thắng
  // =================================================================================
  {
    id: "trai-nghiem-xe-buyt-2-tang-hanoi-city-tour",
    slug: "trai-nghiem-xe-buyt-2-tang-hanoi-city-tour",
    titleVi: "Trải nghiệm xe buýt 2 tầng thoáng nóc: Vòng quanh 25 danh thắng",
    titleEn: "Open-Top Double-Decker Tour: Circling 25 Iconic Monuments",
    descriptionVi:
      "Gợi ý lịch trình và kinh nghiệm ngắm nhìn các công trình di sản từ tầng hai lộng gió: Nhà hát Lớn, Lăng Bác, Hoàng thành Thăng Long và Văn Miếu.",
    descriptionEn:
      "Suggested route and tips to admire monumental heritage from breezy upper decks: Opera House, Mausoleum, Citadel, and Temple of Literature.",
    categoryKey: "transport",
    categoryLabelVi: "DI CHUYỂN",
    categoryLabelEn: "TRANSIT",
    authorVi: "Chuyên Mục Giao Thông Đô Thị",
    authorEn: "Urban Mobility Desk",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-20T08:00:00Z",
    readingTimeVi: "6 phút đọc",
    readingTimeEn: "6 min read",
    readingTimeMinutes: 6,
    coverImage: "/images/hanoi-opera-house.jpg",
    coverImageAltVi: "Nhà hát Lớn Hà Nội – điểm khởi hành của tuyến buýt hai tầng",
    coverImageAltEn: "Hanoi Opera House – departure station for City Tour bus",
    coverImageCaptionVi: "Nhà hát Lớn Hà Nội – điểm xuất phát trung tâm của tuyến City Tour.",
    coverImageCaptionEn: "Hanoi Opera House – the central starting station for the double-decker bus.",
    coverImageCreditVi: "Sở Du Lịch Hà Nội",
    coverImageCreditEn: "Hanoi Department of Tourism",
    href: "/guide/trai-nghiem-xe-buyt-2-tang-hanoi-city-tour",
    sections: [
      {
        id: "goc-nhin-di-san-360-do",
        headingVi: "Góc nhìn di sản 360 độ từ tầng hai thoáng gió",
        headingEn: "360-Degree Heritage Vistas from the Open Deck",
        level: 2,
        paragraphsVi: [
          "Xe buýt 2 tầng City Tour là cách thư thái nhất để chiêm ngưỡng toàn cảnh vẻ đẹp kiến trúc Hà Nội mà không phải lo lắng về khói bụi hay lạc đường. Ngồi trên tầng 2 ở độ cao gần 4 mét, du khách được ngắm nhìn các tán cây cổ thụ sum suê ở cự ly gần và thu trọn vào tầm mắt các biệt thự Pháp cổ kính hai bên đường.",
          "Hệ thống tai nghe thuyết minh tự động 9 ngôn ngữ đồng bộ theo định vị GPS, tự động phát lời giới thiệu lịch sử ngay khi xe lăn bánh qua từng địa danh lịch sử.",
        ],
        paragraphsEn: [
          "The open-top double-decker City Tour bus provides the most serene vantage point to behold Hanoi's architectural majesty. Perched nearly 4 meters high, passengers glide beneath leafy tree canopies, peering directly into historic colonial facades.",
          "The automated 9-language GPS audio guide syncs smoothly with the vehicle's progress, narrating captivating history as each monument approaches.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Xe buýt 2 tầng City Tour là cách thư thái nhất để chiêm ngưỡng toàn cảnh vẻ đẹp kiến trúc Hà Nội mà không phải lo lắng về khói bụi hay lạc đường. Ngồi trên tầng 2 ở độ cao gần 4 mét, du khách được ngắm nhìn các tán cây cổ thụ sum suê ở cự ly gần và thu trọn vào tầm mắt các biệt thự Pháp cổ kính hai bên đường.",
            textEn:
              "The open-top double-decker City Tour bus provides the most serene vantage point to behold Hanoi's architectural majesty. Perched nearly 4 meters high, passengers glide beneath leafy tree canopies, peering directly into historic colonial facades.",
          },
          {
            type: "image",
            src: "/images/feature-doan-mon-citadel.jpg",
            altVi: "Đoan Môn – Hoàng thành Thăng Long trên lộ trình xe buýt 2 tầng",
            altEn: "Doan Mon gate at Imperial Citadel along the bus route",
            captionVi: "Đoan Môn – Hoàng thành Thăng Long: Điểm dừng chân lịch sử tiêu biểu trên hành trình.",
            captionEn: "Doan Mon Gate – an iconic historic stop along the heritage bus loop.",
          },
          {
            type: "callout",
            titleVi: "Mẹo chọn chỗ ngồi",
            titleEn: "Seating Tip",
            textVi:
              "Hàng ghế đầu tầng 2 cho góc nhìn toàn cảnh rộng nhất, trong khi hàng ghế giữa có bóng râm mát mẻ hơn vào những buổi trưa nắng.",
            textEn:
              "Front-row upper seats yield panoramic perspectives, while center rows offer pleasant shade during noon hours.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "BÍ QUYẾT ĐI BUÝT 2 TẦNG TIỆN LỢI",
      titleEn: "DOUBLE-DECKER BUS ESSENTIALS",
      itemsVi: [
        "Vé Hop-on Hop-off: Cho phép lên xuống không giới hạn tại bất kỳ điểm dừng nào trong thời hạn vé (2h, 4h, 24h hoặc 48h).",
        "Khung giờ hoàng hôn: Chuyến xe 16:30 – 17:30 chiều cho ánh sáng chụp ảnh ngoạn mục nhất.",
      ],
      itemsEn: [
        "Hop-on Hop-off tickets: Enjoy unlimited boarding at any stop within validity (2h, 4h, 24h, or 48h).",
        "Golden twilight hour: The 16:30 – 17:30 PM departure offers magical photography light.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "hanoi-opera-house",
        nameVi: "Nhà hát Lớn Hà Nội",
        nameEn: "Hanoi Opera House",
        areaVi: "Hoàn Kiếm, Hà Nội",
        areaEn: "Hoan Kiem, Hanoi",
        summaryVi: "Kiệt tác Tân cổ điển và điểm xuất phát quen thuộc của mọi tour ngắm cảnh Thủ đô.",
        summaryEn: "Neoclassical jewel and primary departure terminal for capital sightseeing tours.",
        image: "/images/hanoi-opera-house.jpg",
        href: "/destinations/hanoi-opera-house",
      },
    ],
    relatedSlugs: ["kham-pha-ha-noi-bang-cach-nao", "hen-voi-ha-noi-vao-mot-ngay-thu"],
  },

  // =================================================================================
  // 9. DI CHUYỂN (3): Tàu điện trên cao Cát Linh: Góc nhìn mới về đô thị Hà Nội
  // =================================================================================
  {
    id: "tau-dien-tren-cao-cat-linh-goc-nhin-do-thi-moi",
    slug: "tau-dien-tren-cao-cat-linh-goc-nhin-do-thi-moi",
    titleVi: "Tàu điện trên cao Cát Linh: Khám phá nhịp sống đô thị mới",
    titleEn: "Cat Linh Elevated Metro: Discovering Hanoi's Modern Pulse",
    descriptionVi:
      "Cẩm nang check-in và khám phá tuyến đường sắt đô thị đầu tiên của Hà Nội, kết nối trung tâm Ba Đình di sản với diện mạo phát triển năng động.",
    descriptionEn:
      "A complete guide to navigating and photographing Hanoi's first elevated metro, bridging ancient Ba Dinh with dynamic modern skylines.",
    categoryKey: "transport",
    categoryLabelVi: "DI CHUYỂN",
    categoryLabelEn: "TRANSIT",
    authorVi: "Chuyên Mục Giao Thông Đô Thị",
    authorEn: "Urban Mobility Desk",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-21T08:00:00Z",
    readingTimeVi: "5 phút đọc",
    readingTimeEn: "5 min read",
    readingTimeMinutes: 5,
    coverImage: "/images/guide/destination-hoan-kiem-sunset.jpg",
    coverImageAltVi: "Tuyến đường sắt đô thị trên cao nhìn về phía hoàng hôn Hà Nội",
    coverImageAltEn: "Elevated metro line overlooking Hanoi sunset",
    coverImageCaptionVi: "Tàu điện trên cao Cát Linh – trải nghiệm hiện đại kết nối các quận trung tâm.",
    coverImageCaptionEn: "Cat Linh elevated metro – modern transit connecting historic districts.",
    coverImageCreditVi: "Hanoi Metro",
    coverImageCreditEn: "Hanoi Metro Archives",
    href: "/guide/tau-dien-tren-cao-cat-linh-goc-nhin-do-thi-moi",
    sections: [
      {
        id: "hanh-trinh-13km-hien-dai",
        headingVi: "Hành trình 13km kết nối di sản và đô thị tương lai",
        headingEn: "A 13km Ride Connecting Heritage and Tomorrow",
        level: 2,
        paragraphsVi: [
          "Vận hành từ cuối năm 2021, tuyến đường sắt đô thị Cát Linh – Hà Đông mang lại làn gió mới cho diện mạo giao thông công cộng của Thủ đô. Với tốc độ di chuyển êm ái khoảng 35km/h trên độ cao từ 8 đến 15m, hành khách có thể thư thả ngắm nhìn thành phố lướt qua dưới chân mình.",
          "Các nhà ga như Cát Linh, La Thành và Hoàng Cầu sở hữu không gian mở đón ánh sáng tự nhiên tuyệt đẹp, trở thành điểm chụp ảnh phong cách tối giản được giới trẻ yêu thích.",
        ],
        paragraphsEn: [
          "Inaugurated in late 2021, the Cat Linh – Ha Dong elevated metro revitalizes the capital's public transit. Gliding quietly at 35km/h on viaducts 8 to 15 meters above traffic, passengers gaze across urban vistas.",
          "Stations such as Cat Linh, La Thanh, and Hoang Cau feature luminous open-air designs that serve as favorite minimalist photo venues.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Vận hành từ cuối năm 2021, tuyến đường sắt đô thị Cát Linh – Hà Đông mang lại làn gió mới cho diện mạo giao thông công cộng của Thủ đô. Với tốc độ di chuyển êm ái khoảng 35km/h trên độ cao từ 8 đến 15m, hành khách có thể thư thả ngắm nhìn thành phố lướt qua dưới chân mình.",
            textEn:
              "Inaugurated in late 2021, the Cat Linh – Ha Dong elevated metro revitalizes the capital's public transit. Gliding quietly at 35km/h on viaducts 8 to 15 meters above traffic, passengers gaze across urban vistas.",
          },
          {
            type: "callout",
            titleVi: "Giá vé & Cách thức mua",
            titleEn: "Fares & Payment",
            textVi:
              "Vé lượt từ 8.000 – 15.000 VNĐ tùy cự ly; vé ngày 30.000 VNĐ cho phép đi không giới hạn lượt. Có thể mua bằng tiền mặt tại máy bán vé tự động hoặc thanh toán mã QR.",
            textEn:
              "Single fares range from 8,000 to 15,000 VND; a 30,000 VND day pass grants unlimited rides. Tickets can be bought via kiosks with cash or banking QR.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "MẸO ĐI TÀU ĐIỆN CHO DU KHÁCH",
      titleEn: "METRO TRAVEL TIPS",
      itemsVi: [
        "Tránh giờ cao điểm: Nên đi vào khung giờ 09:30 – 11:30 hoặc 14:00 – 16:30 để toa tàu thông thoáng và ngắm cảnh trọn vẹn nhất.",
        "Kết nối xe buýt: Từ ga Cát Linh, chỉ mất 10 phút đi taxi hoặc buýt số 18 để về phố cổ Hoàn Kiếm.",
      ],
      itemsEn: [
        "Avoid rush hours: Travel between 09:30 – 11:30 AM or 14:00 – 16:30 PM for airy cabins and optimal sightseeing.",
        "Bus connectivity: From Cat Linh station, a 10-minute taxi or bus 18 connects directly to the Old Quarter.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "hoan-kiem-lake",
        nameVi: "Hồ Hoàn Kiếm",
        nameEn: "Hoan Kiem Lake",
        areaVi: "Hoàn Kiếm, Hà Nội",
        areaEn: "Hoan Kiem, Hanoi",
        summaryVi: "Trung tâm kết nối các tuyến giao thông di sản và phố đi bộ cuối tuần.",
        summaryEn: "The central hub connecting heritage transport routes and weekend pedestrian promenades.",
        image: "/images/hoan-kiem-lake.jpg",
        href: "/destinations/hoan-kiem-lake",
      },
    ],
    relatedSlugs: ["kham-pha-ha-noi-bang-cach-nao", "trai-nghiem-xe-buyt-2-tang-hanoi-city-tour"],
  },

  // =================================================================================
  // 10. ẨM THỰC (2): Bản đồ phở gia truyền nức tiếng phố cổ
  // =================================================================================
  {
    id: "ban-do-pho-gia-truyen-pho-co-ha-noi",
    slug: "ban-do-pho-gia-truyen-pho-co-ha-noi",
    titleVi: "Bản đồ phở gia truyền nức tiếng phố cổ",
    titleEn: "Heritage Pho Trail: Mapping Legendary Bowls",
    descriptionVi:
      "Từ phở Bát Đàn, phở Thìn Lò Đúc đến phở Sướng Trung Yên: Khám phá bí quyết nước dùng trong thanh ninh xương suốt 16 giờ làm say lòng thực khách.",
    descriptionEn:
      "From Bat Dan and Thin Lo Duc to Pho Suong: Discovering the art of crystal-clear broth simmered for 16 hours.",
    categoryKey: "cuisine",
    categoryLabelVi: "ẨM THỰC",
    categoryLabelEn: "CUISINE",
    authorVi: "Chuyên Gia Ẩm Thực Hà Nội",
    authorEn: "Hanoi Culinary Arts Specialist",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-22T08:00:00Z",
    readingTimeVi: "7 phút đọc",
    readingTimeEn: "7 min read",
    readingTimeMinutes: 7,
    coverImage: "/images/guide/cuisine-pho-bo.jpg",
    coverImageAltVi: "Bát phở bò gia truyền với hành hoa xanh mướt",
    coverImageAltEn: "Generational beef pho with fresh scallions",
    coverImageCaptionVi: "Phở bò Hà Nội – biểu tượng ẩm thực vươn tầm di sản văn hóa phi vật thể quốc gia.",
    coverImageCaptionEn: "Hanoi Beef Pho – an immortal culinary symbol inscribed on National Heritage registers.",
    coverImageCreditVi: "Kho Tư Liệu Ẩm Thực Hanoi Discovery",
    coverImageCreditEn: "Hanoi Discovery Culinary Archives",
    href: "/guide/ban-do-pho-gia-truyen-pho-co-ha-noi",
    sections: [
      {
        id: "bi-quyet-nuoc-dung-trong-thanh",
        headingVi: "Nghệ thuật ninh xương 16 giờ làm nên vị ngọt thanh khiết",
        headingEn: "The 16-Hour Simmering Art of Crystal-Clear Umami",
        level: 2,
        paragraphsVi: [
          "Hồn cốt của bát phở Hà Nội nằm trọn vẹn ở nồi nước dùng. Khác với phở miền Nam có vị ngọt đậm từ đường và gia vị thảo mộc nồng nàn, nước dùng phở Bắc truyền thống đòi hỏi sự tinh giản tối đa: chỉ gồm xương ống bò tươi ninh liu riu cùng gừng nướng, hành nướng và chút hoa hồi, quế chi thoang thoảng.",
          "Người nấu phở lâu năm phải liên tục hớt bọt để nước dùng đạt độ trong vắt như hổ phách, ngọt sâu từ tủy xương chứ không gắt vị bột ngọt hay phụ gia.",
        ],
        paragraphsEn: [
          "The soul of Hanoi pho rests entirely within its cauldron of broth. Unlike southern variations sweetened with sugar and heavy spices, northern broth embraces restraint: fresh marrow bones simmered gently with charred ginger, shallots, star anise, and cassia bark.",
          "Generational broth-masters constantly skim foam so the liquid remains translucent as amber, delivering profound marrow sweetness without synthetic additives.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Hồn cốt của bát phở Hà Nội nằm trọn vẹn ở nồi nước dùng. Khác với phở miền Nam có vị ngọt đậm từ đường và gia vị thảo mộc nồng nàn, nước dùng phở Bắc truyền thống đòi hỏi sự tinh giản tối đa: chỉ gồm xương ống bò tươi ninh liu riu cùng gừng nướng, hành nướng và chút hoa hồi, quế chi thoang thoảng.",
            textEn:
              "The soul of Hanoi pho rests entirely within its cauldron of broth. Unlike southern variations sweetened with sugar and heavy spices, northern broth embraces restraint: fresh marrow bones simmered gently with charred ginger, shallots, star anise, and cassia bark.",
          },
          {
            type: "image",
            src: "/images/guide/cuisine-pho-bo.jpg",
            altVi: "Bát phở bò tái chín thơm lừng",
            altEn: "Aromatic rare and well-done beef pho bowl",
            captionVi: "Nước dùng phở trong thanh, ngọt tủy tự nhiên là linh hồn của món ăn quốc hồn quốc túy.",
            captionEn: "Clear, deeply savory marrow broth defines this iconic national culinary treasure.",
          },
          {
            type: "callout",
            titleVi: "Ba quán phở gia truyền phải thử",
            titleEn: "Three Must-Visit Pho Eateries",
            textVi:
              "1. Phở Bát Đàn (49 Bát Đàn): Phở nạm gầu giòn truyền thống • 2. Phở Thìn (13 Lò Đúc): Thịt bò xào tái lăn đậm đà • 3. Phở Sướng (ngõ Trung Yên): Nước dùng thanh tao, ngọt hậu dịu dàng.",
            textEn:
              "1. Pho Bat Dan (49 Bat Dan): Heritage beef brisket • 2. Pho Thin (13 Lo Duc): Sizzling stir-fried garlic beef • 3. Pho Suong (Trung Yen alley): Silky delicate broth.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "CÁCH ĂN PHỞ CHUẨN NGƯỜI HÀ THÀNH",
      titleEn: "EATING PHO LIKE A LOCAL",
      itemsVi: [
        "Nếm thử nước dùng nguyên bản: Trước khi vắt chanh hay thêm ớt, hãy húp một ngụm nước dùng đầu tiên để cảm nhận trọn vẹn vị ngọt xương.",
        "Giấm tỏi thay vì chanh: Nhiều người sành phở thích dùng giấm tỏi ớt ngâm chua dịu hơn chanh để không lấn át hương thơm thảo mộc.",
      ],
      itemsEn: [
        "Savor the virgin broth: Sip the pure broth before adding condiments to appreciate the unadorned marrow essence.",
        "Garlic vinegar vs. lime: Connoisseurs frequently prefer aged garlic vinegar over lime to avoid overpowering subtle spices.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "hanoi-old-quarter",
        nameVi: "Phố cổ Hà Nội",
        nameEn: "Hanoi Old Quarter",
        areaVi: "Hoàn Kiếm, Hà Nội",
        areaEn: "Hoan Kiem, Hanoi",
        summaryVi: "Cái nôi của những quán phở bò gia truyền trứ danh tồn tại qua hơn nửa thế kỷ.",
        summaryEn: "The historic cradle of revered multi-generational pho institutions spanning half a century.",
        image: "/images/guide/cuisine-pho-bo.jpg",
        href: "/destinations/hanoi-old-quarter",
      },
    ],
    relatedSlugs: ["mot-ngay-thuong-thuc-am-thuc-ha-thanh", "huong-com-lang-vong-va-banh-cuon-thanh-tri"],
  },

  // =================================================================================
  // 11. ẨM THỰC (3): Hương cốm làng Vòng và phong vị bánh cuốn Thanh Trì
  // =================================================================================
  {
    id: "huong-com-lang-vong-va-banh-cuon-thanh-tri",
    slug: "huong-com-lang-vong-va-banh-cuon-thanh-tri",
    titleVi: "Hương cốm làng Vòng và phong vị bánh cuốn Thanh Trì",
    titleEn: "Essence of Vong Green Rice & Thanh Tri Rice Rolls",
    descriptionVi:
      "Nghệ thuật làm cốm mộc bọc hai lớp lá sen tươi và những mẻ bánh cuốn mỏng tang chấm nước mắm cà cuống lưu truyền qua nhiều thế hệ.",
    descriptionEn:
      "The delicate craft of fresh young green rice nestled in lotus leaves and paper-thin steamed rice rolls passed down generations.",
    categoryKey: "cuisine",
    categoryLabelVi: "ẨM THỰC",
    categoryLabelEn: "CUISINE",
    authorVi: "Chuyên Gia Ẩm Thực Hà Nội",
    authorEn: "Hanoi Culinary Arts Specialist",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-23T08:00:00Z",
    readingTimeVi: "6 phút đọc",
    readingTimeEn: "6 min read",
    readingTimeMinutes: 6,
    coverImage: "/images/com.jpg",
    coverImageAltVi: "Mẹt cốm non làng Vòng xanh mướt bọc lá sen",
    coverImageAltEn: "Emerald Vong green rice wrapped in lotus leaf",
    coverImageCaptionVi: "Cốm non làng Vòng – hạt ngọc thơm thảo của đồng quê Bắc Bộ.",
    coverImageCaptionEn: "Vong green rice – the fragrant jewel of Northern rural harvests.",
    coverImageCreditVi: "Kho Tư Liệu Ẩm Thực Hanoi Discovery",
    coverImageCreditEn: "Hanoi Discovery Culinary Archives",
    href: "/guide/huong-com-lang-vong-va-banh-cuon-thanh-tri",
    sections: [
      {
        id: "hat-ngoc-dong-que",
        headingVi: "Hạt ngọc đồng nội gói trọn trong hai lớp lá sen",
        headingEn: "Jewels of Rural Fields Wrapped in Lotus Fronds",
        level: 2,
        paragraphsVi: [
          "Cốm làng Vòng từ lâu đã trở thành biểu tượng tinh tế nhất của ẩm thực mùa thu Hà Nội. Từng hạt nếp hoa vàng còn ngậm sữa được rang khéo léo trên chảo gang, giã bằng cối đá qua nhiều lượt sàng sảy để cho ra mẻ cốm xanh mềm dẻo quánh.",
          "Cốm được gói bằng hai lớp lá: lá ráy bên trong giữ ẩm và lớp lá sen tươi bên ngoài ướp hương thơm dịu nhẹ, tạo nên thức quà đồng nội tao nhã bậc nhất.",
        ],
        paragraphsEn: [
          "Vong green rice has long stood as the supreme icon of Hanoi's autumn refinement. Immature golden glutinous grains, still milky, are roasted in cast iron pans and pounded rhythmically in stone mortars.",
          "Shielded in two leaf layers — elephant ear leaf to maintain moisture and lotus leaf to impart heavenly fragrance — it becomes the pinnacle of imperial delicacy.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Cốm làng Vòng từ lâu đã trở thành biểu tượng tinh tế nhất của ẩm thực mùa thu Hà Nội. Từng hạt nếp hoa vàng còn ngậm sữa được rang khéo léo trên chảo gang, giã bằng cối đá qua nhiều lượt sàng sảy để cho ra mẻ cốm xanh mềm dẻo quánh.",
            textEn:
              "Vong green rice has long stood as the supreme icon of Hanoi's autumn refinement. Immature golden glutinous grains, still milky, are roasted in cast iron pans and pounded rhythmically in stone mortars.",
          },
          {
            type: "image",
            src: "/images/banh-cuon-thanh-tri.jpg",
            altVi: "Đĩa bánh cuốn Thanh Trì mỏng tang điểm hành phi",
            altEn: "Plate of gossamer-thin Thanh Tri steamed rice rolls",
            captionVi: "Bánh cuốn Thanh Trì mỏng mướt, rắc hành phi vàng ruộm giòn tan.",
            captionEn: "Silky Thanh Tri steamed rolls topped with fragrant crispy shallots.",
          },
          {
            type: "callout",
            titleVi: "Thưởng cốm đúng điệu",
            titleEn: "How to Savor Com",
            textVi:
              "Dùng các đầu ngón tay nhón từng nhúm cốm nhỏ, nhai thật chậm để cảm nhận vị sữa lúa non, ăn kèm một quả chuối tiêu trứng cuốc chín ngọt.",
            textEn:
              "Pinch small clusters with fingertips and chew mindfully, pairing with ripe speckled bananas for optimal flavor synergy.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "CẨM NANG CHỌN CỐM TƯƠI",
      titleEn: "CHOOSING FRESH COM",
      itemsVi: [
        "Màu sắc: Cốm tự nhiên có màu xanh nhạt hơi ngả vàng của mạ non, không nên chọn loại có màu xanh mướt bất thường do nhuộm màu.",
        "Độ mềm: Cốm ngon hạt mỏng, dẻo dai và thơm mùi lúa mới ngay khi mở lớp lá sen.",
      ],
      itemsEn: [
        "Coloration: Authentic com bears a pale golden-green tint; avoid artificially vivid greens.",
        "Texture: Fresh grains are thin, elastic, and release sweet cereal scents upon opening.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "hanoi-old-quarter",
        nameVi: "Phố cổ Hà Nội",
        nameEn: "Hanoi Old Quarter",
        areaVi: "Hoàn Kiếm, Hà Nội",
        areaEn: "Hoan Kiem, Hanoi",
        summaryVi: "Nơi bày bán những thức quà gia truyền lâu đời của kinh kỳ.",
        summaryEn: "Historic shopping quarters offering authentic seasonal heritage delicacies.",
        image: "/images/guide/article-autumn-com-tea.jpg",
        href: "/destinations/hanoi-old-quarter",
      },
    ],
    relatedSlugs: ["mot-ngay-thuong-thuc-am-thuc-ha-thanh", "ban-do-pho-gia-truyen-pho-co-ha-noi"],
  },

  // =================================================================================
  // 12. KINH NGHIỆM (2): Cẩm nang du lịch Hà Nội tự túc tiết kiệm chi phí
  // =================================================================================
  {
    id: "cam-nang-du-lich-ha-noi-tu-tuc-tiet-kiem",
    slug: "cam-nang-du-lich-ha-noi-tu-tuc-tiet-kiem",
    titleVi: "Cẩm nang du lịch Hà Nội tự túc tiết kiệm chi phí",
    titleEn: "Budget Traveler's Guide to Self-Sufficient Hanoi Exploration",
    descriptionVi:
      "Lộ trình 3 ngày 2 đêm tối ưu chi phí: cách đặt phòng phố cổ, di chuyển xe buýt công cộng và thưởng thức đặc sản đúng giá người bản xứ.",
    descriptionEn:
      "An optimized 3D2N itinerary: boutique hostel tips in Old Quarter, smart public transit, and authentic budget street dining.",
    categoryKey: "experience",
    categoryLabelVi: "KINH NGHIỆM",
    categoryLabelEn: "EXPERIENCE",
    authorVi: "Bộ Phận Chăm Sóc Du Khách",
    authorEn: "Visitor Care & Support Desk",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-23T08:00:00Z",
    readingTimeVi: "7 phút đọc",
    readingTimeEn: "7 min read",
    readingTimeMinutes: 7,
    coverImage: "/images/walking-the-old-quarter.jpg",
    coverImageAltVi: "Du khách tự túc dạo bước khám phá phố cổ Hà Nội",
    coverImageAltEn: "Independent travelers strolling through Hanoi Old Quarter",
    coverImageCaptionVi: "Tự do khám phá 36 phố phường với lộ trình thông minh và tiết kiệm.",
    coverImageCaptionEn: "Exploring the 36 guild streets with an economical, smart plan.",
    coverImageCreditVi: "Cộng Đồng Du Lịch Hanoi Discovery",
    coverImageCreditEn: "Hanoi Discovery Travel Community",
    href: "/guide/cam-nang-du-lich-ha-noi-tu-tuc-tiet-kiem",
    sections: [
      {
        id: "luu-tru-va-di-chuyen-thong-minh",
        headingVi: "Chiến lược lưu trú và di chuyển thông minh",
        headingEn: "Smart Accommodation and Mobility Strategies",
        level: 2,
        paragraphsVi: [
          "Khám phá Hà Nội tự túc không hề tốn kém nếu bạn biết cách sắp xếp lộ trình hợp lý. Thay vì chọn khách sạn đắt đỏ ở mặt tiền, hãy tìm kiếm những homestay hoặc boutique hostel nằm trong các con ngõ yên tĩnh trên phố Hàng Buồm, Chân Cầm hay Hàng Mành với giá chỉ từ 250.000 – 450.000 VNĐ / đêm.",
          "Về di chuyển, mạng lưới xe buýt công cộng giá vé chỉ 7.000 – 9.000 VNĐ / lượt kết hợp dịch vụ xe đạp công cộng TNGo (5.000 VNĐ / 30 phút) sẽ đưa bạn đến hầu hết các điểm du lịch nổi tiếng với chi phí gần như bằng không.",
        ],
        paragraphsEn: [
          "Exploring Hanoi independently is surprisingly affordable with smart scheduling. Instead of pricey main-street hotels, seek hidden boutique homestays in quiet alleys along Hang Buom or Chan Cam for 250,000 – 450,000 VND / night.",
          "For transit, municipal buses (7,000 – 9,000 VND per ride) and TNGo shared bikes (5,000 VND per 30 mins) connect all major cultural landmarks effortlessly.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Khám phá Hà Nội tự túc không hề tốn kém nếu bạn biết cách sắp xếp lộ trình hợp lý. Thay vì chọn khách sạn đắt đỏ ở mặt tiền, hãy tìm kiếm những homestay hoặc boutique hostel nằm trong các con ngõ yên tĩnh trên phố Hàng Buồm, Chân Cầm hay Hàng Mành với giá chỉ từ 250.000 – 450.000 VNĐ / đêm.",
            textEn:
              "Exploring Hanoi independently is surprisingly affordable with smart scheduling. Instead of pricey main-street hotels, seek hidden boutique homestays in quiet alleys along Hang Buom or Chan Cam for 250,000 – 450,000 VND / night.",
          },
          {
            type: "image",
            src: "/images/dong-xuan-market.jpg",
            altVi: "Chợ Đồng Xuân – trung tâm mua sắm và ăn uống bình dân",
            altEn: "Dong Xuan Market – budget shopping and food center",
            captionVi: "Chợ Đồng Xuân – tọa độ ăn vặt và mua sắm quà lưu niệm giá phải chăng.",
            captionEn: "Dong Xuan Market – the premier hub for wallet-friendly snacks and souvenirs.",
          },
          {
            type: "callout",
            titleVi: "Ngân sách gợi ý 3N2Đ",
            titleEn: "Suggested 3D2N Budget",
            textVi:
              "Chỉ khoảng 1.200.000 – 1.800.000 VNĐ / người bao gồm tiền phòng lưu trú, ăn uống đặc sản vỉa hè và vé tham quan các di tích lớn.",
            textEn:
              "Roughly 1,200,000 – 1,800,000 VND per person covering accommodation, local dining, and all monument admission fees.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "MẸO TIẾT KIỆM CHO DU KHÁCH",
      titleEn: "SAVINGS TIPS",
      itemsVi: [
        "Vé tham quan: Mua vé combo tại Văn Miếu và Hoàng thành để tiết kiệm chi phí vào cửa.",
        "Ăn uống: Hãy ghé những quán ăn đông người dân địa phương vào giờ trưa thay vì các nhà hàng chỉ phục vụ khách du lịch.",
      ],
      itemsEn: [
        "Admissions: Combo tickets for monuments yield valuable admission savings.",
        "Dining: Patronize eateries favored by locals during peak lunch hours for authentic prices.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "hanoi-old-quarter",
        nameVi: "Phố cổ Hà Nội",
        nameEn: "Hanoi Old Quarter",
        areaVi: "Hoàn Kiếm, Hà Nội",
        areaEn: "Hoan Kiem, Hanoi",
        summaryVi: "Không gian thuận tiện nhất để lưu trú và trải nghiệm văn hóa địa phương.",
        summaryEn: "The most convenient base for accommodation and genuine street culture.",
        image: "/images/walking-the-old-quarter.jpg",
        href: "/destinations/hanoi-old-quarter",
      },
    ],
    relatedSlugs: ["lan-dau-den-ha-noi-can-biet-gi", "kham-pha-ha-noi-bang-cach-nao"],
  },

  // =================================================================================
  // 13. KINH NGHIỆM (3): Bí kíp săn ảnh đẹp tại các di sản nghìn năm Hà thành
  // =================================================================================
  {
    id: "bi-kip-san-anh-dep-di-san-ha-thanh",
    slug: "bi-kip-san-anh-dep-di-san-ha-thanh",
    titleVi: "Bí kíp săn ảnh đẹp tại các di sản nghìn năm Hà thành",
    titleEn: "Photographer's Guide: Capturing Hanoi's Millennial Heritage",
    descriptionVi:
      "Khung giờ ánh sáng vàng tại Hoàng thành Thăng Long, Văn Miếu, cầu Long Biên và những góc máy ít người biết để có bức ảnh di sản đầy chất thơ.",
    descriptionEn:
      "Golden hour windows at Imperial Citadel, Temple of Literature, Long Bien Bridge, and hidden photogenic angles.",
    categoryKey: "experience",
    categoryLabelVi: "KINH NGHIỆM",
    categoryLabelEn: "EXPERIENCE",
    authorVi: "Nhiếp Ảnh Gia Di Sản Hà Nội",
    authorEn: "Hanoi Heritage Photographer",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-24T08:00:00Z",
    readingTimeVi: "6 phút đọc",
    readingTimeEn: "6 min read",
    readingTimeMinutes: 6,
    coverImage: "/images/feature-van-mieu.jpg",
    coverImageAltVi: "Văn Miếu – Quốc Tử Giám rực rỡ trong nắng vàng",
    coverImageAltEn: "Temple of Literature bathed in golden hour light",
    coverImageCaptionVi: "Khuê Văn Các – biểu tượng văn hiến nghìn năm qua ống kính nhiếp ảnh.",
    coverImageCaptionEn: "Khue Van Cac Pavilion – timeless icon through the lens of heritage artists.",
    coverImageCreditVi: "Tư Liệu Nhiếp Ảnh Di Sản Hà Nội",
    coverImageCreditEn: "Hanoi Heritage Photography Archives",
    href: "/guide/bi-kip-san-anh-dep-di-san-ha-thanh",
    sections: [
      {
        id: "khung-gio-vang-chup-anh",
        headingVi: "Khung giờ vàng và góc máy di sản ấn tượng",
        headingEn: "Golden Hours and Inspiring Heritage Angles",
        level: 2,
        paragraphsVi: [
          "Ánh sáng ở Hà Nội vào buổi sớm mai và hoàng hôn mang một gam màu vàng ấm áp đặc biệt, tôn lên vẻ cổ kính của những bức tường đá ong và mái ngói thâm nâu. Tại Văn Miếu – Quốc Tử Giám, khoảng thời gian từ 08:00 đến 09:30 sáng là lúc những tia nắng rọi xiên qua giếng Thiên Quang và Khuê Văn Các đẹp nhất.",
          "Còn tại cầu Long Biên, hãy có mặt lúc 16:45 chiều để chụp lại khoảnh khắc đoàn tàu hỏa chạy qua nhịp cầu sắt giữa ráng chiều đỏ rực soi bóng xuống sông Hồng.",
        ],
        paragraphsEn: [
          "Early morning and sunset light in Hanoi casts a warm amber tone that accentuates laterite ramparts and terracotta roofs. At the Temple of Literature, 08:00 to 09:30 AM illuminates Khue Van Cac Pavilion and Thien Quang Well majestically.",
          "At Long Bien Bridge, arriving at 16:45 PM captures locomotives rumbling across rusted spans against fiery crimson sunset skies.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Ánh sáng ở Hà Nội vào buổi sớm mai và hoàng hôn mang một gam màu vàng ấm áp đặc biệt, tôn lên vẻ cổ kính của những bức tường đá ong và mái ngói thâm nâu. Tại Văn Miếu – Quốc Tử Giám, khoảng thời gian từ 08:00 đến 09:30 sáng là lúc những tia nắng rọi xiên qua giếng Thiên Quang và Khuê Văn Các đẹp nhất.",
            textEn:
              "Early morning and sunset light in Hanoi casts a warm amber tone that accentuates laterite ramparts and terracotta roofs. At the Temple of Literature, 08:00 to 09:30 AM illuminates Khue Van Cac Pavilion and Thien Quang Well majestically.",
          },
          {
            type: "image",
            src: "/images/feature-van-mieu.jpg",
            altVi: "Khuê Văn Các cổ kính trầm mặc",
            altEn: "Solemn Khue Van Cac Pavilion",
            captionVi: "Văn Miếu – Quốc Tử Giám: Góc máy kinh điển tôn vinh truyền thống hiếu học.",
            captionEn: "Temple of Literature: A timeless angle honoring scholarly traditions.",
          },
          {
            type: "callout",
            titleVi: "Lưu ý nhiếp ảnh văn hóa",
            titleEn: "Cultural Photography Etiquette",
            textVi:
              "Luôn xin phép lịch sự trước khi chụp ảnh chân dung người dân địa phương, và tuyệt đối không tạo dáng phản cảm trước các pho tượng linh thiêng trong đền chùa.",
            textEn:
              "Always request permission before portrait photography of locals, and observe respectful decorum before temple shrines.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "BÍ QUYẾT BẢO QUẢN THIẾT BỊ",
      titleEn: "EQUIPMENT CARE TIPS",
      itemsVi: [
        "Ống kính: Một ống kính tiêu cự 24–70mm và ống kính chân dung 50mm là đủ để bao quát mọi góc máy phố phường.",
        "Độ ẩm: Hà Nội có độ ẩm cao vào mùa xuân, hãy luôn chuẩn bị túi chống ẩm cho máy ảnh và ống kính.",
      ],
      itemsEn: [
        "Lenses: A 24–70mm zoom and a 50mm prime suffice for almost all street and architecture photography.",
        "Humidity: Spring humidity requires silica gel packs in camera bags to safeguard optics.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "temple-of-literature",
        nameVi: "Văn Miếu – Quốc Tử Giám",
        nameEn: "Temple of Literature",
        areaVi: "Đống Đa, Hà Nội",
        areaEn: "Dong Da, Hanoi",
        summaryVi: "Không gian di sản tôn nghiêm với nhiều góc máy kiến trúc cổ kính xuất sắc.",
        summaryEn: "Solemn heritage sanctuary providing exceptional architectural photography angles.",
        image: "/images/feature-van-mieu.jpg",
        href: "/destinations/temple-of-literature",
      },
    ],
    relatedSlugs: ["lan-dau-den-ha-noi-can-biet-gi", "hen-voi-ha-noi-vao-mot-ngay-thu"],
  },

  // =================================================================================
  // 14. GÓC HÀ NỘI (2): Những con ngõ nhỏ cất giấu trầm tích thời gian
  // =================================================================================
  {
    id: "nhung-con-ngo-nho-cat-giau-tram-tich-thoi-gian",
    slug: "nhung-con-ngo-nho-cat-giau-tram-tich-thoi-gian",
    titleVi: "Những con ngõ nhỏ cất giấu trầm tích thời gian",
    titleEn: "Hidden Alleys Concealing Generations of Memory",
    descriptionVi:
      "Lạc bước vào những con ngõ chỉ vừa một người lách qua trên phố Hàng Buồm, Hàng Chỉ để lắng nghe hơi thở xưa cũ giữa lòng đô thị náo nhiệt.",
    descriptionEn:
      "Stepping into narrow passageways scarcely one person wide along Hang Buom and Hang Chi to listen to ancient whispered memories.",
    categoryKey: "corners",
    categoryLabelVi: "GÓC HÀ NỘI",
    categoryLabelEn: "HANOI CORNERS",
    authorVi: "Biên Niên Ký Văn Hóa Tràng An",
    authorEn: "Trang An Cultural Chronicle",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-24T08:00:00Z",
    readingTimeVi: "6 phút đọc",
    readingTimeEn: "6 min read",
    readingTimeMinutes: 6,
    coverImage: "/images/hanoi-old-quarter.jpg",
    coverImageAltVi: "Một con ngõ nhỏ bình yên giữa khu phố cổ Hà Nội",
    coverImageAltEn: "Peaceful narrow alley in Hanoi Old Quarter",
    coverImageCaptionVi: "Ngõ phố cổ – không gian sinh hoạt cộng đồng độc đáo của người Hà Nội.",
    coverImageCaptionEn: "Heritage lanes – a distinctive community microcosm of Old Hanoi.",
    coverImageCreditVi: "Ký Ức Phố Cổ Hà Nội",
    coverImageCreditEn: "Hanoi Heritage Memories",
    href: "/guide/nhung-con-ngo-nho-cat-giau-tram-tich-thoi-gian",
    sections: [
      {
        id: "mach-ngam-thoi-gian",
        headingVi: "Mạch ngầm thời gian sau cánh cổng vòm rêu phong",
        headingEn: "Subterranean Current Behind Mossy Archways",
        level: 2,
        paragraphsVi: [
          "Đằng sau vẻ ồn ã, náo nhiệt của những con phố buôn bán sầm uất là hàng trăm con ngõ nhỏ sâu hun hút. Chỉ cần bước qua cổng vòm rêu phong, tiếng còi xe dường như lùi xa, nhường chỗ cho tiếng nước tí tách chảy vào bể đá, tiếng chim hót trong lồng tre và mùi cơm chiều thơm phức.",
          "Những con ngõ như ngõ Tạm Thương, ngõ Trung Yên hay ngõ Gạch là nơi lưu giữ chân thực nhất nếp sống thân tình của nhiều thế hệ người Hà Nội cùng chung sống dưới một mái nhà chung.",
        ],
        paragraphsEn: [
          "Behind the bustling commercial facades lie hundreds of deep, winding residential alleys. Passing beneath weathered archways, traffic noises fade, replaced by dripping water fountains, caged birdsong, and fragrant family cooking.",
          "Passages such as Tam Thuong, Trung Yen, and Hang Gach lanes preserve the warmest community bonds across generations sharing communal courtyard living.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Đằng sau vẻ ồn ã, náo nhiệt của những con phố buôn bán sầm uất là hàng trăm con ngõ nhỏ sâu hun hút. Chỉ cần bước qua cổng vòm rêu phong, tiếng còi xe dường như lùi xa, nhường chỗ cho tiếng nước tí tách chảy vào bể đá, tiếng chim hót trong lồng tre và mùi cơm chiều thơm phức.",
            textEn:
              "Behind the bustling commercial facades lie hundreds of deep, winding residential alleys. Passing beneath weathered archways, traffic noises fade, replaced by dripping water fountains, caged birdsong, and fragrant family cooking.",
          },
          {
            type: "image",
            src: "/images/hanoi-old-quarter.jpg",
            altVi: "Ngõ nhỏ phố cổ ngập tràn ánh nắng",
            altEn: "Sunlit narrow alley in Old Quarter",
            captionVi: "Mỗi con ngõ phố cổ đều cất giấu những câu chuyện đời thường dung dị.",
            captionEn: "Each narrow lane harbors intimate, unvarnished stories of everyday life.",
          },
          {
            type: "callout",
            titleVi: "Ứng xử văn minh trong ngõ",
            titleEn: "Alleyway Courtesy",
            textVi:
              "Khi tham quan các ngõ sâu, hãy bước đi nhẹ nhàng, nói năng khẽ khàng và tránh nhìn thẳng vào không gian sinh hoạt riêng tư của các gia đình.",
            textEn:
              "When wandering residential alleys, tread softly, keep voices low, and respect the privacy of family courtyards.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "NHỮNG CON NGÕ ĐẸP ĐỂ KHÁM PHÁ",
      titleEn: "SCENIC ALLEYS TO EXPLORE",
      itemsVi: [
        "Ngõ Tạm Thương (Hàng Bông): Nổi tiếng với món nem chua rán và không gian tĩnh mịch.",
        "Ngõ Trung Yên (Đinh Liệt): Thiên đường ẩm thực bún ngan, phở gà và bánh cuốn.",
      ],
      itemsEn: [
        "Tam Thuong Alley (Hang Bong): Renowned for fried fermented pork and quiet courtyards.",
        "Trung Yen Alley (Dinh Liet): Gourmet food hub for duck noodles, chicken pho, and rice rolls.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "hanoi-old-quarter",
        nameVi: "Phố cổ Hà Nội",
        nameEn: "Hanoi Old Quarter",
        areaVi: "Hoàn Kiếm, Hà Nội",
        areaEn: "Hoan Kiem, Hanoi",
        summaryVi: "Không gian di sản kiến trúc nhà ống và hệ thống ngõ hẻm độc đáo bậc nhất Đông Nam Á.",
        summaryEn: "A unique Southeast Asian urban heritage of tube houses and intricate alley networks.",
        image: "/images/walking-the-old-quarter.jpg",
        href: "/destinations/hanoi-old-quarter",
      },
    ],
    relatedSlugs: ["song-cham-giua-long-thu-do", "hen-voi-ha-noi-vao-mot-ngay-thu"],
  },

  // =================================================================================
  // 15. GÓC HÀ NỘI (3): Hoàng hôn Hồ Tây và những góc trà chiều bình yên
  // =================================================================================
  {
    id: "hoang-hon-ho-tay-va-goc-tra-chieu",
    slug: "hoang-hon-ho-tay-va-goc-tra-chieu",
    titleVi: "Hoàng hôn Hồ Tây và những góc trà chiều bình yên",
    titleEn: "West Lake Sunset and Peaceful Afternoon Tea Rituals",
    descriptionVi:
      "Ngắm mặt trời đỏ rực lặn sau mặt nước mênh mông, nhâm nhi tách trà sen bách diệp và thả mình theo từng làn gió mát rượi ven đường Thanh Niên.",
    descriptionEn:
      "Watching the crimson sun sink behind expansive waters, sipping Bach Diep lotus tea, and relaxing with cool causeway breezes.",
    categoryKey: "corners",
    categoryLabelVi: "GÓC HÀ NỘI",
    categoryLabelEn: "HANOI CORNERS",
    authorVi: "Biên Niên Ký Văn Hóa Tràng An",
    authorEn: "Trang An Cultural Chronicle",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-25T08:00:00Z",
    readingTimeVi: "6 phút đọc",
    readingTimeEn: "6 min read",
    readingTimeMinutes: 6,
    coverImage: "/images/west-lake.jpg",
    coverImageAltVi: "Hoàng hôn lộng lẫy buông trên mặt nước Hồ Tây",
    coverImageAltEn: "Spectacular sunset over the vast expanse of West Lake",
    coverImageCaptionVi: "Hoàng hôn Hồ Tây – bức tranh thủy mặc huyền ảo nhất của đất kinh kỳ.",
    coverImageCaptionEn: "West Lake twilight – the most breathtaking ink-wash painting of the capital.",
    coverImageCreditVi: "Tư Liệu Nhiếp Ảnh Hà Nội",
    coverImageCreditEn: "Hanoi Photography Archives",
    href: "/guide/hoang-hon-ho-tay-va-goc-tra-chieu",
    sections: [
      {
        id: "khoanh-khac-hoang-hon-ho-tay",
        headingVi: "Bức tranh thủy mặc lúc chiều tà bên mặt hồ mênh mang",
        headingEn: "An Ink-Wash Tableau as Twilight Envelops the Waters",
        level: 2,
        paragraphsVi: [
          "Hồ Tây với diện tích mặt nước hơn 500 hecta được ví như lá phổi xanh khổng lồ điều hòa không khí cho toàn thành phố. Khi ánh nắng chiều dần nhạt, cả mặt hồ chuyển từ sắc xanh ngọc bích sang dát vàng lấp lánh, trước khi mặt trời đỏ ối như quả cầu lửa chầm chậm chìm xuống phía chân trời Tây Hồ.",
          "Dọc theo đường Thanh Niên, đường Nguyễn Đình Thi hay bến thuyền Nhật Chiêu, người dân và du khách thong thả dừng chân, chọn một góc quán trà sen ven hồ để tận hưởng khoảnh khắc giao thoa kỳ diệu của trời đất.",
        ],
        paragraphsEn: [
          "Spanning over 500 hectares of water, West Lake serves as the capital's vast ecological lung. As daylight wanes, the lake surface transitions from jade to shimmering liquid gold before the sun descends into twilight.",
          "Along Thanh Nien causeway, Nguyen Dinh Thi, or Nhat Chieu boat docks, locals and travelers linger at lakeside tea pavilions to savor this celestial transition.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Hồ Tây với diện tích mặt nước hơn 500 hecta được ví như lá phổi xanh khổng lồ điều hòa không khí cho toàn thành phố. Khi ánh nắng chiều dần nhạt, cả mặt hồ chuyển từ sắc xanh ngọc bích sang dát vàng lấp lánh, trước khi mặt trời đỏ ối như quả cầu lửa chầm chậm chìm xuống phía chân trời Tây Hồ.",
            textEn:
              "Spanning over 500 hectares of water, West Lake serves as the capital's vast ecological lung. As daylight wanes, the lake surface transitions from jade to shimmering liquid gold before the sun descends into twilight.",
          },
          {
            type: "image",
            src: "/images/west-lake.jpg",
            altVi: "Mặt trời lặn nhuộm thắm nền trời Hồ Tây",
            altEn: "Sunset painting the sky across West Lake",
            captionVi: "Hoàng hôn buông rực rỡ bên rặng liễu đường Thanh Niên.",
            captionEn: "Dramatic sunset descending beside willows along Thanh Nien causeway.",
          },
          {
            type: "callout",
            titleVi: "Thưởng trà sen Quảng Bá",
            titleEn: "Quang Ba Lotus Tea",
            textVi:
              "Đừng quên ghé thưởng thức một ấm trà sen Bách Diệp tại làng Quảng Bá. Từng cánh hoa sen bọc ấp búp trà shan tuyết cổ thụ tạo nên phong vị ngọt sâu khó quên.",
            textEn:
              "Pause at Quang Ba lotus tea houses to taste ancient Shan Tuyet tea cured inside fresh Bach Diep lotus blossoms.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "KHUNG GIỜ NGẮM HOÀNG HÔN ĐẸP NHẤT",
      titleEn: "BEST SUNSET TIMING",
      itemsVi: [
        "Mùa hè: 17:30 – 18:30 chiều • Mùa thu - đông: 16:45 – 17:45 chiều.",
        "Điểm ngắm đẹp: Bến đò Nhật Chiêu, Chùa Trấn Quốc và đường Nguyễn Đình Thi ven hồ.",
      ],
      itemsEn: [
        "Summer: 17:30 – 18:30 PM • Autumn/Winter: 16:45 – 17:45 PM.",
        "Prime vantage points: Nhat Chieu dock, Tran Quoc Pagoda, and Nguyen Dinh Thi street.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "west-lake",
        nameVi: "Hồ Tây",
        nameEn: "West Lake",
        areaVi: "Tây Hồ, Hà Nội",
        areaEn: "Tay Ho, Hanoi",
        summaryVi: "Hồ nước ngọt tự nhiên lớn nhất Thủ đô, nơi ngắm hoàng hôn lãng mạn bậc nhất.",
        summaryEn: "The largest natural lake in Hanoi, celebrated for dramatic romantic sunsets.",
        image: "/images/west-lake.jpg",
        href: "/destinations/west-lake",
      },
    ],
    relatedSlugs: ["song-cham-giua-long-thu-do", "nhung-con-ngo-nho-cat-giau-tram-tich-thoi-gian"],
  },

  // =================================================================================
  // 16. BỐN MÙA HÀ NỘI (4): Hạ về trên đầm sen Tây Hồ: Trọn vẹn thức quà thanh tao
  // =================================================================================
  {
    id: "ha-ve-dam-sen-tay-ho-thuc-qua-thanh-tao",
    slug: "ha-ve-dam-sen-tay-ho-thuc-qua-thanh-tao",
    titleVi: "Hạ về trên đầm sen Tây Hồ: Trọn vẹn thức quà thanh tao",
    titleEn: "Summer Whispers at West Lake Lotus Ponds: A Taste of Serenity",
    descriptionVi:
      "Khi cái nắng hè rọi xuống mặt hồ mênh mang, sen Bách Diệp bung nở tỏa hương thơm ngát. Khám phá nghệ thuật ướp trà sen Tây Hồ và nếp thưởng trà tao nhã của người Tràng An.",
    descriptionEn:
      "As summer sun radiates over expansive waters, hundred-petal lotuses bloom with intoxicating fragrance. Discover West Lake's ancient lotus tea-scenting art and elegant savoring rituals.",
    categoryKey: "seasons",
    categoryLabelVi: "BỐN MÙA HÀ NỘI",
    categoryLabelEn: "FOUR SEASONS",
    authorVi: "Hương Sắc Hà Thành",
    authorEn: "Hanoi Heritage Fragrance Desk",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-25T08:00:00Z",
    readingTimeVi: "7 phút đọc",
    readingTimeEn: "7 min read",
    readingTimeMinutes: 7,
    coverImage: "/images/tra-sen-tay-ho.jpg",
    coverImageAltVi: "Đầm sen Tây Hồ buổi sớm mai ngập tràn sắc hồng thanh khiết",
    coverImageAltEn: "West Lake lotus pond at dawn bathed in pure pink hues",
    coverImageCaptionVi: "Sen Bách Diệp Tây Hồ – biểu tượng thanh cao của mùa hạ kinh kỳ.",
    coverImageCaptionEn: "Centenary hundred-petal lotuses – pristine emblems of Hanoi summer.",
    coverImageCreditVi: "Ký Sự Mùa Hoa Hà Nội",
    coverImageCreditEn: "Hanoi Floral Chronicle",
    href: "/guide/ha-ve-dam-sen-tay-ho-thuc-qua-thanh-tao",
    sections: [
      {
        id: "huong-sen-som-mai",
        headingVi: "Hương sen tinh khiết gọi mùa hè thức giấc",
        headingEn: "Pure Lotus Fragrance Wakening the Summer Dawn",
        shortTitleVi: "Hương sen sớm mai",
        shortTitleEn: "Dawn Lotus Fragrance",
        level: 2,
        paragraphsVi: [
          "Mỗi độ tháng Năm âm lịch về, góc hồ Tây quanh bán đảo Quảng An, Nhật Tân lại bừng lên sắc hồng dịu dàng của những đầm sen Bách Diệp. Giống sen này chỉ nở đẹp nhất ở vùng bùn màu mỡ hồ Tây, cánh hoa nhiều lớp ôm ấp lấy gạo sen màu trắng ngà mọng tinh dầu.",
          "Từ lúc 5 giờ sáng, khi mặt hồ còn bảng lảng làn sương mỏng, những người chèo thuyền nan đã khẽ khàng lướt giữa bạt ngàn lá xanh để hái từng búp sen ngậm sương đêm. Đó là khoảnh khắc đất trời giao hòa, khi hương hoa tinh khôi hòa vào gió mát, mang lại cảm giác an yên tuyệt đối cho những ai dậy sớm tìm về.",
        ],
        paragraphsEn: [
          "Every fifth lunar month, corners of West Lake around Quang An and Nhat Tan peninsula burst into delicate shades of pink. The hundred-petal lotus varieties thrive uniquely in the nutrient-dense silt of West Lake, featuring dense petal layers safeguarding ivory stamens packed with fragrant oils.",
          "By 5 AM, while thin mists still hover across the water, wooden skiffs glide noiselessly through emerald pads to harvest dew-kissed buds. It is a moment of profound communion, where pristine floral fragrance fuses with gentle breezes, offering deep solace to early morning wanderers.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Mỗi độ tháng Năm âm lịch về, góc hồ Tây quanh bán đảo Quảng An, Nhật Tân lại bừng lên sắc hồng dịu dàng của những đầm sen Bách Diệp. Giống sen này chỉ nở đẹp nhất ở vùng bùn màu mỡ hồ Tây, cánh hoa nhiều lớp ôm ấp lấy gạo sen màu trắng ngà mọng tinh dầu.",
            textEn:
              "Every fifth lunar month, corners of West Lake around Quang An and Nhat Tan peninsula burst into delicate shades of pink. The hundred-petal lotus varieties thrive uniquely in the nutrient-dense silt of West Lake, featuring dense petal layers safeguarding ivory stamens packed with fragrant oils.",
          },
          {
            type: "image",
            src: "/images/west-lake.jpg",
            altVi: "Không gian khoáng đạt của hồ Tây những sớm đầu hạ",
            altEn: "Expansive panorama of West Lake on early summer mornings",
            captionVi: "Mặt nước hồ Tây sớm mai – nơi đón những tia nắng đầu tiên của mùa hạ.",
            captionEn: "West Lake waters at dawn receiving summer's earliest sunbeams.",
          },
          {
            type: "callout",
            titleVi: "Giờ ngắm hoa đẹp nhất",
            titleEn: "Optimal Blossom Viewing Window",
            textVi:
              "Hãy ghé đầm sen từ 5:30 đến 7:00 sáng. Đây là lúc hoa vừa hé nụ tỏa hương thơm nồng nàn nhất và ánh sáng dịu nhẹ lý tưởng nhất để chụp ảnh kỷ niệm.",
            textEn:
              "Visit the ponds between 5:30 and 7:00 AM when buds first unfurl, exuding their richest aroma under gentle golden morning rays ideal for photography.",
          },
        ],
      },
      {
        id: "nghe-thuat-uop-tra",
        headingVi: "Tuyệt kỹ ướp trà sen – Đỉnh cao phong vị Tràng An",
        headingEn: "Lotus Tea Scenting Artistry: The Pinnacle of Trang An Refinement",
        shortTitleVi: "Tuyệt kỹ ướp trà",
        shortTitleEn: "Tea Scenting Art",
        level: 2,
        paragraphsVi: [
          "Để làm ra một cân trà sen thượng hạng, các nghệ nhân làng Quảng An phải dùng đến hơn một nghìn bông sen Bách Diệp chọn lọc. Trà dùng ướp phải là trà móc câu Tân Cương thượng hạng, sao sấy tỉ mỉ rồi ủ với từng lớp gạo sen qua nhiều lần lặp đi lặp lại suốt cả tháng trời.",
          "Thưởng một chén trà sen hồ Tây bên thềm nhà cổ, nhấp ngụm đầu thấy vị chát dịu thanh tao, để rồi hậu vị ngọt sâu lắng đọng nơi cuống họng cùng hương sen thoang thoảng mãi không tan. Đó là kết tinh của thời gian, sự nhẫn nại và tâm hồn thanh lịch của người Hà Nội.",
        ],
        paragraphsEn: [
          "Crafting a single kilogram of premium lotus tea requires master artisans from Quang An to harvest more than a thousand meticulously chosen lotus blossoms. The base tea must be top-tier Tan Cuong green tea, repeatedly layered with lotus anthers through multiple cycles spanning an entire month.",
          "Savoring a bowl of West Lake lotus tea on the veranda of a heritage courtyard begins with gentle astringency, giving way to a profound, lingering sweetness and fragrant floral notes that linger for hours — a distillation of patience, time, and poetic mindfulness.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Để làm ra một cân trà sen thượng hạng, các nghệ nhân làng Quảng An phải dùng đến hơn một nghìn bông sen Bách Diệp chọn lọc. Trà dùng ướp phải là trà móc câu Tân Cương thượng hạng, sao sấy tỉ mỉ rồi ủ với từng lớp gạo sen qua nhiều lần lặp đi lặp lại suốt cả tháng trời.",
            textEn:
              "Crafting a single kilogram of premium lotus tea requires master artisans from Quang An to harvest more than a thousand meticulously chosen lotus blossoms. The base tea must be top-tier Tan Cuong green tea, repeatedly layered with lotus anthers through multiple cycles spanning an entire month.",
          },
          {
            type: "image",
            src: "/images/che-sen-long-nhan.jpg",
            altVi: "Chè sen long nhãn ngọt thanh giải nhiệt mùa hạ",
            altEn: "Chilled lotus seed and longan sweet soup for summer relief",
            captionVi: "Món chè hạt sen long nhãn ngọt thanh – thức quà giải nhiệt trứ danh xứ kinh kỳ.",
            captionEn: "Chilled lotus seed and longan sweet dessert – renowned capital refreshment.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "Kinh nghiệm thưởng sen Tây Hồ",
      titleEn: "West Lake Lotus Experience Tips",
      itemsVi: [
        "Thời điểm lý tưởng: Mùa sen nở rộ từ cuối tháng 5 đến giữa tháng 7 dương lịch hằng năm.",
        "Khung giờ ngắm hoa đẹp nhất: Ghé đầm sen từ 5:30 đến 7:00 sáng khi hoa vừa hé nụ tỏa hương thơm nồng nàn nhất.",
        "Thưởng thức trà sen tươi: Thưởng thức chén trà sen nguyên bông nóng hổi bên chòi ngắm hoa ven hồ.",
      ],
      itemsEn: [
        "Peak bloom spans from late May through mid-July each year.",
        "Optimal blossom viewing: Visit between 5:30 and 7:00 AM when buds first unfurl with rich fragrance.",
        "Fresh lotus tea: Savor steaming blossom tea pods in rustic lakeside wooden pavilions.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "west-lake",
        nameVi: "Đầm sen Tây Hồ",
        nameEn: "West Lake Lotus Ponds",
        areaVi: "Quảng An, Tây Hồ, Hà Nội",
        areaEn: "Quang An, Tay Ho, Hanoi",
        summaryVi: "Không gian ngắm hoa và thưởng trà sen cổ truyền nổi tiếng bậc nhất Thủ đô.",
        summaryEn: "The capital's most celebrated heritage sanctuary for lotus viewing and artisanal tea.",
        image: "/images/west-lake.jpg",
        href: "/destinations/west-lake",
      },
    ],
    relatedSlugs: ["hen-voi-ha-noi-vao-mot-ngay-thu", "hoang-hon-ho-tay-va-goc-tra-chieu"],
  },

  // =================================================================================
  // 17. BỐN MÙA HÀ NỘI (5): Mùa hoa sấu rải vàng những con đường rợp bóng
  // =================================================================================
  {
    id: "mua-hoa-sau-rai-vang-nhung-con-duong-rop-bong",
    slug: "mua-hoa-sau-rai-vang-nhung-con-duong-rop-bong",
    titleVi: "Mùa hoa sấu rải vàng những con đường rợp bóng",
    titleEn: "Dracontomelon Blossom Season: Golden Petals on Shaded Avenues",
    descriptionVi:
      "Khoảnh khắc giao mùa khi những chùm hoa sấu li ti rơi như mưa hoa vàng trên hè phố Phan Đình Phùng, Hoàng Diệu, gợi nhớ ký ức tuổi thơ êm đềm của bao thế hệ.",
    descriptionEn:
      "When tiny ivory dracontomelon blossoms drift like golden snowfall across Phan Dinh Phung pavements, awakening gentle childhood reminiscences.",
    categoryKey: "seasons",
    categoryLabelVi: "BỐN MÙA HÀ NỘI",
    categoryLabelEn: "FOUR SEASONS",
    authorVi: "Ký Ức Phố Cổ",
    authorEn: "Old Quarter Memories Bureau",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-25T08:00:00Z",
    readingTimeVi: "5 phút đọc",
    readingTimeEn: "5 min read",
    readingTimeMinutes: 5,
    coverImage: "/images/guide/article-phan-dinh-phung-avenue.jpg",
    coverImageAltVi: "Con đường rợp bóng cây sấu cổ thụ trên phố Phan Đình Phùng",
    coverImageAltEn: "Shaded canopy of ancient dracontomelon trees on Phan Dinh Phung avenue",
    coverImageCaptionVi: "Phan Đình Phùng – con đường lãng mạn bậc nhất mùa hoa sấu rơi.",
    coverImageCaptionEn: "Phan Dinh Phung – the most romantic boulevard during blossom fall.",
    coverImageCreditVi: "Tư liệu Di sản Đô thị",
    coverImageCreditEn: "Urban Heritage Archives",
    href: "/guide/mua-hoa-sau-rai-vang-nhung-con-duong-rop-bong",
    sections: [
      {
        id: "mua-hoa-vang-roi",
        headingVi: "Cơn mưa hoa sấu giữa lòng phố cổ",
        headingEn: "A Shower of Blossoms Amid Ancient Streets",
        shortTitleVi: "Cơn mưa hoa sấu",
        shortTitleEn: "Blossom Rain",
        level: 2,
        paragraphsVi: [
          "Cuối tháng Tư sang đầu tháng Năm, khi nắng mới bắt đầu rót mật qua kẽ lá, những hàng cây sấu cổ thụ trên đường Phan Đình Phùng, Trần Phú và Hoàng Diệu bước vào mùa trút lá vàng và trổ hoa. Hoa sấu nhỏ xíu, màu trắng ngà pha vàng nhạt, kết thành từng chùm li ti e ấp dưới vòm lá xum xuê.",
          "Mỗi khi một làn gió nhẹ thoảng qua, hàng triệu cánh hoa bé xíu rụng lả tả xuống vỉa hè gạch đỏ, dệt nên tấm thảm hoa mềm mại. Dạo bước dưới hàng sấu rợp bóng, ngắm những vệt nắng lung linh và hít hà mùi thơm dìu dịu của hoa là trải nghiệm thi vị khó quên.",
        ],
        paragraphsEn: [
          "Late April and early May bring warm sun filtering through towering canopies along Phan Dinh Phung, Tran Phu, and Hoang Dieu avenues as ancient dracontomelon trees shed amber foliage and burst into bloom. Tiny creamy-white blossoms gather in fragile clusters beneath lush branches.",
          "With each gentle breeze, millions of minuscule petals float softly onto brick walkways, weaving a golden floral carpet. Strolling under hundred-year-old arches and taking in the faint honeyed scent remains an enduring poetic ritual for locals.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Cuối tháng Tư sang đầu tháng Năm, khi nắng mới bắt đầu rót mật qua kẽ lá, những hàng cây sấu cổ thụ trên đường Phan Đình Phùng, Trần Phú và Hoàng Diệu bước vào mùa trút lá vàng và trổ hoa. Hoa sấu nhỏ xíu, màu trắng ngà pha vàng nhạt, kết thành từng chùm li ti e ấp dưới vòm lá xum xuê.",
            textEn:
              "Late April and early May bring warm sun filtering through towering canopies along Phan Dinh Phung, Tran Phu, and Hoang Dieu avenues as ancient dracontomelon trees shed amber foliage and burst into bloom. Tiny creamy-white blossoms gather in fragile clusters beneath lush branches.",
          },
          {
            type: "image",
            src: "/images/guide/destination-hoan-kiem-sunset.jpg",
            altVi: "Bóng cây xanh mát rủ bên bờ hồ Hoàn Kiếm",
            altEn: "Green foliage shading Sword Lake promenade",
            captionVi: "Mặt hồ phẳng lặng phản chiếu những rặng cây cổ thụ mùa thay lá.",
            captionEn: "Tranquil lake waters mirroring heritage trees during foliage transitions.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "Gợi ý tản bộ ngắm hoa sấu",
      titleEn: "Dracontomelon Blossom Walk Advice",
      itemsVi: [
        "Thời điểm ngắm hoa: Cuối tháng 4 đến giữa tháng 5 là lúc hoa sấu rụng dày nhất.",
        "Cung đường lãng mạn: Đoạn phố Phan Đình Phùng đối diện Cửa Bắc Hoàng thành Thăng Long và đường Hoàng Diệu.",
      ],
      itemsEn: [
        "Peak bloom season: Late April through mid-May features the densest golden petal carpets.",
        "Romantic avenues: Phan Dinh Phung facing Imperial Citadel North Gate and Hoang Dieu boulevard.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "hoan-kiem-lake",
        nameVi: "Phố Phan Đình Phùng",
        nameEn: "Phan Dinh Phung Avenue",
        areaVi: "Ba Đình, Hà Nội",
        areaEn: "Ba Dinh, Hanoi",
        summaryVi: "Con đường rợp bóng cây cổ thụ đẹp bậc nhất Thủ đô nghìn năm.",
        summaryEn: "The most scenic tree-canopied boulevard in the thousand-year-old capital.",
        image: "/images/guide/article-phan-dinh-phung-avenue.jpg",
        href: "/destinations/hoan-kiem-lake",
      },
    ],
    relatedSlugs: ["hen-voi-ha-noi-vao-mot-ngay-thu", "ha-ve-dam-sen-tay-ho-thuc-qua-thanh-tao"],
  },

  // =================================================================================
  // 18. KINH NGHIỆM (4): Nghệ thuật mặc áo dài chụp ảnh tại các không gian di sản
  // =================================================================================
  {
    id: "nghe-thuat-mac-ao-dai-chup-anh-khong-gian-di-san",
    slug: "nghe-thuat-mac-ao-dai-chup-anh-khong-gian-di-san",
    titleVi: "Nghệ thuật mặc áo dài chụp ảnh tại các không gian di sản",
    titleEn: "The Grace of Ao Dai: Heritage Portraiture in Ancient Spaces",
    descriptionVi:
      "Bí quyết chọn dáng áo dài ngũ thân, chất liệu lụa tơ tằm và phối phụ kiện nón lá, kiềng bạc để có những khung hình trang nhã tại Văn Miếu, Hoàng Thành và Cột Cờ.",
    descriptionEn:
      "Styling guide for traditional five-panel silk tunics, conical hats, and vintage accessories to capture timeless portraits at Temple of Literature and Imperial Citadel.",
    categoryKey: "experience",
    categoryLabelVi: "KINH NGHIỆM",
    categoryLabelEn: "EXPERIENCE",
    authorVi: "Thời Trang & Di Sản",
    authorEn: "Fashion & Heritage Bureau",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-25T08:00:00Z",
    readingTimeVi: "6 phút đọc",
    readingTimeEn: "6 min read",
    readingTimeMinutes: 6,
    coverImage: "/images/feature-van-mieu.jpg",
    coverImageAltVi: "Thiếu nữ mặc áo dài thướt tha dạo bước trong khuôn viên Văn Miếu",
    coverImageAltEn: "Lady in flowing traditional tunic walking through Temple of Literature grounds",
    coverImageCaptionVi: "Văn Miếu – không gian tôn nghiêm lý tưởng để lưu giữ nét đẹp áo dài Việt.",
    coverImageCaptionEn: "Temple of Literature – a sacred sanctuary showcasing the grace of Vietnamese attire.",
    coverImageCreditVi: "Bộ Sưu Tập Di Sản Văn Hóa",
    coverImageCreditEn: "Cultural Heritage Collection",
    href: "/guide/nghe-thuat-mac-ao-dai-chup-anh-khong-gian-di-san",
    sections: [
      {
        id: "chon-trang-phuc-phu-hop",
        headingVi: "Chọn sắc áo tôn vinh màu gạch rêu phong",
        headingEn: "Selecting Colors That Complement Ancient Terracotta",
        shortTitleVi: "Chọn sắc áo",
        shortTitleEn: "Color Harmony",
        level: 2,
        paragraphsVi: [
          "Khi chụp ảnh tại những di tích có tông màu trầm cổ như gạch vồ Văn Miếu hay tường đá Hoàng thành, các gam màu áo dài pastel, trắng kem, vàng mơ hoặc đỏ nhung trầm sẽ tạo nên sự tương phản hài hòa và sang trọng nhất.",
          "Chất liệu lụa tơ tằm Vạn Phúc mềm rủ tự nhiên với độ bóng mờ quý phái sẽ giúp tà áo bay nhẹ theo từng bước chân, tránh cảm giác cứng nhắc của các loại vải công nghiệp thông thường.",
        ],
        paragraphsEn: [
          "Against the weathered earthy tones of Temple of Literature brickwork and Imperial Citadel stone ramparts, soft ivory, pastel sage, champagne, or deep burgundy tunics deliver exquisite contrast and understated elegance.",
          "Natural Van Phuc mulberry silk flows weightlessly with each step, exuding an organic drape and matte sheen superior to stiff synthetic alternatives.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Khi chụp ảnh tại những di tích có tông màu trầm cổ như gạch vồ Văn Miếu hay tường đá Hoàng thành, các gam màu áo dài pastel, trắng kem, vàng mơ hoặc đỏ nhung trầm sẽ tạo nên sự tương phản hài hòa và sang trọng nhất.",
            textEn:
              "Against the weathered earthy tones of Temple of Literature brickwork and Imperial Citadel stone ramparts, soft ivory, pastel sage, champagne, or deep burgundy tunics deliver exquisite contrast and understated elegance.",
          },
          {
            type: "image",
            src: "/images/feature-khue-van-cac-front.jpg",
            altVi: "Khuê Văn Các cổ kính soi bóng bên giếng Thiên Quang",
            altEn: "Khue Van Cac pavilion reflected on Thien Quang well",
            captionVi: "Góc ngắm Khuê Văn Các cổ kính – biểu tượng tri thức của Thủ đô.",
            captionEn: "Khue Van Cac pavilion – timeless symbol of Hanoi erudition.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "Lưu ý trang phục di tích",
      titleEn: "Heritage Dress Etiquette",
      itemsVi: [
        "Tông màu trang nhã: Chọn áo dài màu pastel, trắng kem hoặc đỏ trầm hài hòa với màu gạch rêu phong.",
        "Quy tắc tôn nghiêm: Tránh vải quá mỏng hoặc tà áo xẻ quá cao khi bước vào các gian thờ điện tại Văn Miếu.",
      ],
      itemsEn: [
        "Harmonious palettes: Choose ivory, pastel sage, or burgundy tunics complementing ancient brickwork.",
        "Sanctuary respect: Avoid sheer fabrics or excessively high side slits in inner worship halls.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "van-mieu",
        nameVi: "Văn Miếu - Quốc Tử Giám",
        nameEn: "Temple of Literature",
        areaVi: "Đống Đa, Hà Nội",
        areaEn: "Dong Da, Hanoi",
        summaryVi: "Trường đại học đầu tiên của Việt Nam với kiến trúc gỗ lim và bia tiến sĩ nghìn năm.",
        summaryEn: "Vietnam's premier imperial academy with thousand-year-old doctor steles.",
        image: "/images/feature-van-mieu.jpg",
        href: "/destinations/van-mieu",
      },
    ],
    relatedSlugs: ["bi-kip-san-anh-dep-di-san-ha-thanh", "lan-dau-den-ha-noi-can-biet-gi"],
  },

  // =================================================================================
  // 19. KINH NGHIỆM (5): Bí kíp săn đồ lưu niệm thủ công mỹ nghệ tinh hoa Hà Thành
  // =================================================================================
  {
    id: "bi-kip-san-do-luu-niem-thu-cong-tinh-hoa",
    slug: "bi-kip-san-do-luu-niem-thu-cong-tinh-hoa",
    titleVi: "Bí kíp săn đồ lưu niệm thủ công mỹ nghệ tinh hoa Hà Thành",
    titleEn: "Curator's Guide: Finding Authentic Hanoi Artisanal Souvenirs",
    descriptionVi:
      "Kinh nghiệm chọn gốm men rạn Bát Tràng, lụa Vạn Phúc dệt hoa văn cổ, tranh khắc gỗ Hàng Trống và nghệ thuật mua sắm văn minh trên các con phố nghề.",
    descriptionEn:
      "Insider advice for sourcing crackle-glaze Bat Trang pottery, Van Phuc brocade silks, Hang Trong woodblock prints, and respectful shopping along guild streets.",
    categoryKey: "experience",
    categoryLabelVi: "KINH NGHIỆM",
    categoryLabelEn: "EXPERIENCE",
    authorVi: "Cẩm Nang Lữ Khách",
    authorEn: "Traveler's Handcraft Guide",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-25T08:00:00Z",
    readingTimeVi: "6 phút đọc",
    readingTimeEn: "6 min read",
    readingTimeMinutes: 6,
    coverImage: "/images/bat-trang-pottery-village.jpg",
    coverImageAltVi: "Không gian xưởng làm gốm thủ công truyền thống làng Bát Tràng",
    coverImageAltEn: "Traditional handmade pottery workshop at Bat Trang village",
    coverImageCaptionVi: "Nghề làm gốm Bát Tràng – tinh hoa bàn tay tài hoa của nghệ nhân sông Hồng.",
    coverImageCaptionEn: "Bat Trang ceramic craft – masterworks crafted along the Red River shores.",
    coverImageCreditVi: "Hiệp Hội Làng Nghề Hà Nội",
    coverImageCreditEn: "Hanoi Craft Village Association",
    href: "/guide/bi-kip-san-do-luu-niem-thu-cong-tinh-hoa",
    sections: [
      {
        id: "gom-men-ran-bat-trang",
        headingVi: "Hồn cốt gốm cổ trên từng đường men rạn",
        headingEn: "The Soul of Heritage Ceramics in Crackle Glazes",
        shortTitleVi: "Gốm Bát Tràng",
        shortTitleEn: "Bat Trang Pottery",
        level: 2,
        paragraphsVi: [
          "Nằm bên bờ tả ngạn sông Hồng cách trung tâm chừng 14km, làng gốm Bát Tràng đã lưu giữ nghề chuốt gốm hơn 700 năm. Một món quà lưu niệm bằng gốm men rạn màu chàm cổ kính hay chiếc tách trà nung củi mang nét độc bản là kỷ vật vô giá cho chuyến đi.",
          "Khi chọn mua tại phố cổ (như phố Hàng Khay, Hàng Gai) hay tại chính chợ gốm làng Bát Tràng, hãy gõ nhẹ vào thân gốm để lắng nghe tiếng ngân thanh trong như chuông – dấu hiệu của cốt đất sét trắng tinh mịn nung ở nhiệt độ chuẩn.",
        ],
        paragraphsEn: [
          "Nestled along the Red River 14km from the city core, Bat Trang village has practiced clay sculpting for over seven centuries. A souvenir adorned with indigo crackle glaze or a wood-fired teacup is an irreplaceable memento.",
          "When selecting pieces in the Old Quarter or at the village market, gently tap the porcelain edge to hear a bell-like resonance — the hallmark of pure, high-fired kaolin clay.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Nằm bên bờ tả ngạn sông Hồng cách trung tâm chừng 14km, làng gốm Bát Tràng đã lưu giữ nghề chuốt gốm hơn 700 năm. Một món quà lưu niệm bằng gốm men rạn màu chàm cổ kính hay chiếc tách trà nung củi mang nét độc bản là kỷ vật vô giá cho chuyến đi.",
            textEn:
              "Nestled along the Red River 14km from the city core, Bat Trang village has practiced clay sculpting for over seven centuries. A souvenir adorned with indigo crackle glaze or a wood-fired teacup is an irreplaceable memento.",
          },
          {
            type: "image",
            src: "/images/bat-trang-ceramics.jpg",
            altVi: "Các sản phẩm gốm mộc mạc tinh xảo được bày biện gọn gàng",
            altEn: "Refined rustic ceramic works neatly displayed",
            captionVi: "Gốm sứ thủ công – món quà mang đậm hồn cốt văn hóa đất Tràng An.",
            captionEn: "Artisanal ceramics – gifts carrying the cultural heart of Trang An.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "Bí kíp mua sắm đồ thủ công",
      titleEn: "Artisanal Shopping Wisdom",
      itemsVi: [
        "Nhận biết gốm chuẩn: Gõ nhẹ vào thân gốm lắng nghe tiếng ngân trong như chuông của cốt đất nung chuẩn nhiệt.",
        "Đóng gói an toàn: Các cửa hàng uy tín luôn nhận bọc xốp chống va đập nhiều lớp và đóng thùng carton miễn phí.",
      ],
      itemsEn: [
        "Authenticity test: Gently tap ceramic rims to hear bell-like resonance indicating proper firing.",
        "Complimentary packing: Reputable boutiques provide multi-layer shockproof packing for flights.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "bat-trang-ceramics",
        nameVi: "Làng gốm Bát Tràng",
        nameEn: "Bat Trang Pottery Village",
        areaVi: "Gia Lâm, Hà Nội",
        areaEn: "Gia Lam, Hanoi",
        summaryVi: "Làng nghề gốm sứ truyền thống nghìn năm nổi tiếng bên bờ sông Hồng.",
        summaryEn: "Millennial craft pottery village celebrated along the banks of the Red River.",
        image: "/images/bat-trang-pottery-village.jpg",
        href: "/destinations/bat-trang-ceramics",
      },
    ],
    relatedSlugs: ["cam-nang-du-lich-ha-noi-tu-tuc-tiet-kiem", "nghe-thuat-mac-ao-dai-chup-anh-khong-gian-di-san"],
  },

  // =================================================================================
  // 20. DI CHUYỂN (4): Xe điện phố cổ: Hành trình xanh vi vu khám phá 28 tuyến phố
  // =================================================================================
  {
    id: "xe-dien-pho-co-hanh-trinh-xanh-28-tuyen-pho",
    slug: "xe-dien-pho-co-hanh-trinh-xanh-28-tuyen-pho",
    titleVi: "Xe điện phố cổ: Hành trình xanh vi vu khám phá 28 tuyến phố",
    titleEn: "Old Quarter Electric Tram: A Green 28-Street Cultural Loop",
    descriptionVi:
      "Trải nghiệm phương tiện giao thông xanh êm ái luồn lách qua những con phố nghề sầm uất: từ Đinh Tiên Hoàng quanh bờ hồ Gươm, xuyên qua Hàng Bạc, Hàng Buồm đến chợ Đồng Xuân.",
    descriptionEn:
      "Experience whisper-quiet electric trams navigating storied guild quarters: circling Sword Lake through jewelers' alleys to Dong Xuan Market with multilingual audio guides.",
    categoryKey: "transport",
    categoryLabelVi: "DI CHUYỂN",
    categoryLabelEn: "TRANSIT",
    authorVi: "Hành Trình Xanh",
    authorEn: "Green Mobility Editorial",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-25T08:00:00Z",
    readingTimeVi: "5 phút đọc",
    readingTimeEn: "5 min read",
    readingTimeMinutes: 5,
    coverImage: "/images/dong-xuan-market.jpg",
    coverImageAltVi: "Không gian cổ kính trước chợ Đồng Xuân trên tuyến xe điện phố cổ",
    coverImageAltEn: "Dong Xuan Market facade along the Old Quarter electric tram circuit",
    coverImageCaptionVi: "Tuyến xe điện đưa du khách dừng chân trước ngôi chợ cổ sầm uất nhất Hà thành.",
    coverImageCaptionEn: "Electric trams stopping before Hanoi's most historic trading marketplace.",
    coverImageCreditVi: "Công Ty Du Lịch Xe Điện Hà Nội",
    coverImageCreditEn: "Hanoi Electric Tram Tourism",
    href: "/guide/xe-dien-pho-co-hanh-trinh-xanh-28-tuyen-pho",
    sections: [
      {
        id: "trai-nghiem-xe-dien",
        headingVi: "Khám phá 36 phố phường không khói bụi",
        headingEn: "Exploring 36 Guild Streets Without Smog",
        shortTitleVi: "Lộ trình xe điện",
        shortTitleEn: "Tram Route",
        level: 2,
        paragraphsVi: [
          "Xuất phát từ bến đỗ Đinh Tiên Hoàng ngay bờ hồ Hoàn Kiếm, những chiếc xe điện màu trắng thanh lịch đưa du khách lướt êm qua 28 con phố cổ kính. Không tiếng động cơ ồn ào, xe lướt đi trong làn gió mát lành thổi từ mặt hồ, giúp bạn thảnh thơi ngắm nhìn từng mái ngói thâm nâu và nhịp buôn bán nhộn nhịp hai bên đường.",
          "Hệ thống tai nghe thuyết minh tự động bằng 6 ngôn ngữ sẽ giải thích cặn kẽ nguồn gốc từng con phố nghề: vì sao phố Hàng Bạc chỉ đúc vàng bạc, phố Hàng Gai ngập tràn lụa là và phố Lò Rèn vẫn rực lửa than hồng qua hàng thế kỷ.",
        ],
        paragraphsEn: [
          "Departing from Dinh Tien Hoang terminus by Sword Lake, modern open-air electric cars glide through 28 historic streets. Without engine noise or exhaust, cool lakeside breezes accompany your passage, inviting leisurely contemplation of weathered eaves and lively pavement commerce.",
          "Integrated multilingual headsets in six languages provide rich context on guild history: how Hang Bac concentrated silversmiths, Hang Gai showcased silk masters, and Lo Ren sustained blacksmith embers through ages.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Xuất phát từ bến đỗ Đinh Tiên Hoàng ngay bờ hồ Hoàn Kiếm, những chiếc xe điện màu trắng thanh lịch đưa du khách lướt êm qua 28 con phố cổ kính. Không tiếng động cơ ồn ào, xe lướt đi trong làn gió mát lành thổi từ mặt hồ, giúp bạn thảnh thơi ngắm nhìn từng mái ngói thâm nâu và nhịp buôn bán nhộn nhịp hai bên đường.",
            textEn:
              "Departing from Dinh Tien Hoang terminus by Sword Lake, modern open-air electric cars glide through 28 historic streets. Without engine noise or exhaust, cool lakeside breezes accompany your passage, inviting leisurely contemplation of weathered eaves and lively pavement commerce.",
          },
          {
            type: "image",
            src: "/images/walking-the-old-quarter.jpg",
            altVi: "Cổng Ô Quan Chưởng uy nghiêm trầm mặc",
            altEn: "Majestic O Quan Chuong heritage city gate",
            captionVi: "Ô Quan Chưởng – cửa ô duy nhất còn nguyên vẹn trên tuyến xe điện đi qua.",
            captionEn: "O Quan Chuong – the only preserved ancient city gate along the tram route.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "Thông tin chuyến xe điện",
      titleEn: "Electric Tram Transit Guide",
      itemsVi: [
        "Điểm đón xe: Bến đỗ xe điện Đinh Tiên Hoàng ngay bờ hồ Hoàn Kiếm, hoạt động từ 8:30 đến 22:30 hàng ngày.",
        "Giá vé: 35.000đ/lượt cá nhân hoặc thuê trọn xe 7 chỗ cho gia đình với giá 245.000đ cho lộ trình 35 phút.",
      ],
      itemsEn: [
        "Boarding point: Dinh Tien Hoang terminus beside Sword Lake, operating from 8:30 AM to 10:30 PM daily.",
        "Fares: 35,000 VND per person or 245,000 VND for private 7-passenger charter on a 35-minute loop.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "dong-xuan-market",
        nameVi: "Chợ Đồng Xuân",
        nameEn: "Dong Xuan Market",
        areaVi: "Hoàn Kiếm, Hà Nội",
        areaEn: "Hoan Kiem, Hanoi",
        summaryVi: "Ngôi chợ đầu mối lớn và cổ kính nhất Thủ đô với lịch sử hơn một thế kỷ.",
        summaryEn: "Hanoi's largest and most historic wholesale market spanning over a century.",
        image: "/images/dong-xuan-market.jpg",
        href: "/destinations/dong-xuan-market",
      },
    ],
    relatedSlugs: ["kham-pha-ha-noi-bang-cach-nao", "trai-nghiem-xe-buyt-2-tang-hanoi-city-tour"],
  },

  // =================================================================================
  // 21. DI CHUYỂN (5): Hành trình đạp xe buổi sớm quanh bờ hồ Tây 17km
  // =================================================================================
  {
    id: "hanh-trinh-dap-xe-buoi-som-quanh-ho-tay-17km",
    slug: "hanh-trinh-dap-xe-buoi-som-quanh-ho-tay-17km",
    titleVi: "Hành trình đạp xe buổi sớm quanh bờ hồ Tây 17km",
    titleEn: "Dawn Cycling Circuit: 17 Kilometers Around West Lake",
    descriptionVi:
      "Thức dậy cùng bình minh thuê xe đạp thể thao tại phố Trích Sài, hít căng lồng ngực bầu không khí trong lành, ngắm chùa Trấn Quốc trong sương sớm và nạp năng lượng bằng bát bún ốc nóng hổi.",
    descriptionEn:
      "Awaken at sunrise to pedal along Trich Sai avenue, filling your lungs with crisp lake air, admiring Tran Quoc pagoda in morning mist, and savoring hot snail noodle soup.",
    categoryKey: "transport",
    categoryLabelVi: "DI CHUYỂN",
    categoryLabelEn: "TRANSIT",
    authorVi: "Thong Dong Phố Phường",
    authorEn: "Leisurely City Cyclist Desk",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-25T08:00:00Z",
    readingTimeVi: "6 phút đọc",
    readingTimeEn: "6 min read",
    readingTimeMinutes: 6,
    coverImage: "/images/tran-quoc-pagoda.jpg",
    coverImageAltVi: "Bảo tháp chùa Trấn Quốc cổ kính soi bóng trên mặt hồ Tây sớm mai",
    coverImageAltEn: "Historic stupa of Tran Quoc Pagoda reflected on misty West Lake waters",
    coverImageCaptionVi: "Chùa Trấn Quốc – điểm dừng chân linh thiêng tuyệt đẹp trên cung đường ven hồ.",
    coverImageCaptionEn: "Tran Quoc Pagoda – a sacred scenic stop on the tranquil lakeside circuit.",
    coverImageCreditVi: "CLB Xe Đạp Hà Nội",
    coverImageCreditEn: "Hanoi Cycling Enthusiasts Club",
    href: "/guide/hanh-trinh-dap-xe-buoi-som-quanh-ho-tay-17km",
    sections: [
      {
        id: "cung-duong-17km",
        headingVi: "Cung đường lãng mạn bậc nhất Thủ đô",
        headingEn: "The Capital's Most Scenic Circuit",
        shortTitleVi: "Cung đường 17km",
        shortTitleEn: "17km Loop",
        level: 2,
        paragraphsVi: [
          "Với chu vi bờ hồ dài gần 17km, cung đường ven hồ Tây (qua các phố Nguyễn Đình Thi, Trích Sài, Nhật Chiêu, Quảng An, Yên Phụ) là thiên đường cho những người yêu thích xe đạp. Đoạn đường được trải nhựa phẳng phiu, rợp bóng râm của hàng liễu rủ và luôn tràn ngập luồng gió mát lành từ lòng hồ rộng hơn 500 hecta.",
          "Đạp xe vào lúc 5:30 sáng, bạn sẽ cảm nhận được nhịp thở khoan thai của Hà Nội: những cụ già tập dưỡng sinh bên bờ nước, tiếng chuông chùa Trấn Quốc trầm ấm ngân vang và mặt hồ chuyển màu từ tím sẫm sang vàng cam rực rỡ khi vầng dương ló rạng.",
        ],
        paragraphsEn: [
          "With a perimeter nearing 17 kilometers, the West Lake ring road (weaving through Nguyen Dinh Thi, Trich Sai, Nhat Chieu, and Quang An) is a cyclist's paradise. Well-paved lanes flanked by weeping willows catch refreshing breezes from over 500 hectares of natural open water.",
          "Pedaling at 5:30 AM reveals the unhurried heartbeat of the capital: elders practicing tai chi along promenade steps, Tran Quoc Pagoda bells resonating through morning air, and the lake shifting from deep violet to blazing amber as sunrise unfolds.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Với chu vi bờ hồ dài gần 17km, cung đường ven hồ Tây (qua các phố Nguyễn Đình Thi, Trích Sài, Nhật Chiêu, Quảng An, Yên Phụ) là thiên đường cho những người yêu thích xe đạp. Đoạn đường được trải nhựa phẳng phiu, rợp bóng râm của hàng liễu rủ và luôn tràn ngập luồng gió mát lành từ lòng hồ rộng hơn 500 hecta.",
            textEn:
              "With a perimeter nearing 17 kilometers, the West Lake ring road (weaving through Nguyen Dinh Thi, Trich Sai, Nhat Chieu, and Quang An) is a cyclist's paradise. Well-paved lanes flanked by weeping willows catch refreshing breezes from over 500 hectares of natural open water.",
          },
          {
            type: "image",
            src: "/images/quan-thanh-temple.jpg",
            altVi: "Đền Quán Thánh cổ kính nép mình bên ngã tư đường Thanh Niên",
            altEn: "Historic Quan Thanh Temple nestled by Thanh Nien crossroads",
            captionVi: "Đền Quán Thánh – một trong Tứ Trấn Thăng Long tọa lạc ngay cửa ngõ hồ Tây.",
            captionEn: "Quan Thanh Temple – one of the Four Sacred Protectors guarding West Lake's threshold.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "Kinh nghiệm đạp xe hồ Tây",
      titleEn: "West Lake Cycling Advice",
      itemsVi: [
        "Thời gian xuất phát: Bắt đầu lúc 5:30 sáng để đón bình minh và tránh nắng gắt buổi trưa.",
        "Thuê xe đạp: Dọc phố Trích Sài và Nhật Chiêu có nhiều điểm cho thuê xe thể thao giá 40.000 – 50.000đ/giờ.",
      ],
      itemsEn: [
        "Departure window: Start by 5:30 AM to catch tranquil sunrise and avoid mid-day tropical heat.",
        "Bike hire: Numerous shops along Trich Sai and Nhat Chieu streets offer road bikes for 40,000–50,000 VND/hr.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "west-lake",
        nameVi: "Chùa Trấn Quốc",
        nameEn: "Tran Quoc Pagoda",
        areaVi: "Tây Hồ, Hà Nội",
        areaEn: "Tay Ho, Hanoi",
        summaryVi: "Ngôi chùa cổ nhất Hà Nội với lịch sử hơn 1.500 năm nằm trên hòn đảo xinh đẹp ven hồ.",
        summaryEn: "Hanoi's oldest pagoda with over 1,500 years of Buddhist history on an idyllic islet.",
        image: "/images/tran-quoc-pagoda.jpg",
        href: "/destinations/west-lake",
      },
    ],
    relatedSlugs: ["kham-pha-ha-noi-bang-cach-nao", "hoang-hon-ho-tay-va-goc-tra-chieu"],
  },

  // =================================================================================
  // 22. ẨM THỰC (4): Chả cá Lã Vọng: Tinh hoa ẩm thực chảo gang hơn một thế kỷ
  // =================================================================================
  {
    id: "cha-ca-la-vong-tinh-hoa-chao-gang-tram-nam",
    slug: "cha-ca-la-vong-tinh-hoa-chao-gang-tram-nam",
    titleVi: "Chả cá Lã Vọng: Tinh hoa ẩm thực chảo gang hơn một thế kỷ",
    titleEn: "Cha Ca La Vong: Sizzling Cast-Iron Fish Heritage Spanning a Century",
    descriptionVi:
      "Miếng cá lăng vàng ruộm xèo xèo trên chảo mỡ sôi, quyện cùng thì là xanh mướt, hành hoa và bát mắm tôm đánh bông rưới chút tinh dầu cà cuống thơm lừng ngõ phố.",
    descriptionEn:
      "Golden catfish nuggets sizzling in cast-iron pans with fragrant dill and scallions, paired with whipped shrimp paste and rare heritage essence.",
    categoryKey: "cuisine",
    categoryLabelVi: "ẨM THỰC",
    categoryLabelEn: "CUISINE",
    authorVi: "Hương Vị Tràng An",
    authorEn: "Trang An Gourmet Column",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-25T08:00:00Z",
    readingTimeVi: "7 phút đọc",
    readingTimeEn: "7 min read",
    readingTimeMinutes: 7,
    coverImage: "/images/cha-ca.jpg",
    coverImageAltVi: "Chảo chả cá Lã Vọng nghi ngút khói thơm phức cùng thì là và hành hoa",
    coverImageAltEn: "Sizzling cast-iron skillet of turmeric fish fillets with dill and scallions",
    coverImageCaptionVi: "Chả cá Lã Vọng – món ngon di sản trứ danh làm say lòng biết bao thế hệ thực khách.",
    coverImageCaptionEn: "Cha Ca La Vong – legendary culinary heritage enchanting food connoisseurs across generations.",
    coverImageCreditVi: "Hội Đầu Bếp Hoàng Gia Hà Nội",
    coverImageCreditEn: "Hanoi Heritage Gastronomy Society",
    href: "/guide/cha-ca-la-vong-tinh-hoa-chao-gang-tram-nam",
    sections: [
      {
        id: "chuyen-nghe-tram-nam",
        headingVi: "Câu chuyện ngôi nhà số 14 phố Chả Cá",
        headingEn: "The Tale of House No. 14 on Cha Ca Street",
        shortTitleVi: "Câu chuyện trăm năm",
        shortTitleEn: "Century Heritage",
        level: 2,
        paragraphsVi: [
          "Ra đời từ những năm cuối thế kỷ 19 tại ngôi nhà số 14 phố Hàng Sơn (nay đổi tên thành phố Chả Cá), món chả cá của gia đình họ Đoàn đã trở thành biểu tượng ẩm thực độc nhất vô nhị: một món ăn làm nên cả tên gọi của một con phố cổ Hà thành.",
          "Cá lăng tươi được lọc lấy phần nạc dày dặn, tẩm ướp cùng nghệ tươi, mẻ chua, mắm tôm ngon và nước cốt riềng già, sau đó kẹp vào thanh tre nướng trên than hoa đỏ rực cho se mặt trước khi trút vào chảo gang ăn nóng tại bàn.",
        ],
        paragraphsEn: [
          "Originating in the late 19th century at 14 Hang Son street (subsequently renamed Cha Ca street), the Doan family's grilled fish creation became a cultural anomaly: a single dish bestowing its name upon an entire Old Quarter street.",
          "Fresh freshwater catfish fillets are marinated with fresh turmeric, fermented rice, shrimp paste, and galangal extract, then pre-grilled over glowing coals between bamboo tongs before final sizzling in cast-iron skillets right at the table.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Ra đời từ những năm cuối thế kỷ 19 tại ngôi nhà số 14 phố Hàng Sơn (nay đổi tên thành phố Chả Cá), món chả cá của gia đình họ Đoàn đã trở thành biểu tượng ẩm thực độc nhất vô nhị: một món ăn làm nên cả tên gọi của một con phố cổ Hà thành.",
            textEn:
              "Originating in the late 19th century at 14 Hang Son street (subsequently renamed Cha Ca street), the Doan family's grilled fish creation became a cultural anomaly: a single dish bestowing its name upon an entire Old Quarter street.",
          },
          {
            type: "image",
            src: "/images/bun-dau-mam-tom.jpg",
            altVi: "Bát mắm tôm đánh sủi bọt trắng bông rưới nước cốt chanh tươi",
            altEn: "Frothy whisked shrimp paste bowl infused with fresh lime",
            captionVi: "Mắm tôm đánh bông – linh hồn quyết định độ bùng nổ hương vị của món ăn.",
            captionEn: "Whipped shrimp paste – the vibrant soul unlocking the dish's flavor explosion.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "Cách thưởng thức chả cá chuẩn vị",
      titleEn: "Tasting Cha Ca Like a Connoisseur",
      itemsVi: [
        "Ăn nóng tại bàn: Gắp cá trực tiếp từ chảo mỡ đang sôi cùng thì là và hành hoa chần chín tới.",
        "Kết hợp tinh tế: Thêm bún sợi nhỏ, lạc rang giã dập và thìa mắm tôm đánh sủi bọt rưới chút cà cuống.",
      ],
      itemsEn: [
        "Savor sizzling hot: Enjoy fish nuggets straight from bubbling pans with freshly wilted dill.",
        "Layer flavors: Combine delicate rice noodles, crushed peanuts, and frothy lime-whipped dip.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "cha-ca",
        nameVi: "Phố Chả Cá",
        nameEn: "Cha Ca Street",
        areaVi: "Hoàn Kiếm, Hà Nội",
        areaEn: "Hoan Kiem, Hanoi",
        summaryVi: "Con phố nhỏ cổ kính mang tên món ăn di sản lừng danh của đất kinh kỳ.",
        summaryEn: "An intimate historic street named after the capital's iconic grilled fish dish.",
        image: "/images/cha-ca.jpg",
        href: "/destinations/cha-ca",
      },
    ],
    relatedSlugs: ["mot-ngay-thuong-thuc-am-thuc-ha-thanh", "ban-do-pho-gia-truyen-pho-co-ha-noi"],
  },

  // =================================================================================
  // 23. ẨM THỰC (5): Bún thang Hà Nội: Bức tranh thủy mặc cầu kỳ trong bát ngọc
  // =================================================================================
  {
    id: "bun-thang-ha-noi-buc-tranh-thuy-mac-cau-ky",
    slug: "bun-thang-ha-noi-buc-tranh-thuy-mac-cau-ky",
    titleVi: "Bún thang Hà Nội: Bức tranh thủy mặc cầu kỳ trong bát ngọc",
    titleEn: "Hanoi Bun Thang: An Intricate Gastronomic Watercolor in a Bowl",
    descriptionVi:
      "Món bún thanh nhã bậc nhất xứ kinh kỳ với gần hai mươi nguyên liệu thái chỉ tăm: giò lụa, lườn gà xé, trứng tráng mỏng tang, củ cải dầm và chút tinh dầu cà cuống thơm ngát.",
    descriptionEn:
      "The capital's most refined noodle soup assembled with twenty julienned ingredients: silky pork sausage, poached chicken, paper-thin egg shreds, and aromatic essences.",
    categoryKey: "cuisine",
    categoryLabelVi: "ẨM THỰC",
    categoryLabelEn: "CUISINE",
    authorVi: "Nghệ Thuật Ẩm Thực Hà Thành",
    authorEn: "Hanoi Gastronomy Arts Bureau",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-25T08:00:00Z",
    readingTimeVi: "6 phút đọc",
    readingTimeEn: "6 min read",
    readingTimeMinutes: 6,
    coverImage: "/images/bun-thang.jpg",
    coverImageAltVi: "Bát bún thang Hà Nội trình bày tỉ mỉ như một tác phẩm nghệ thuật",
    coverImageAltEn: "Meticulously arranged bowl of Hanoi Bun Thang like a culinary artwork",
    coverImageCaptionVi: "Bún thang – đỉnh cao của sự tỉ mỉ và khéo léo trong văn hóa ẩm thực người Tràng An.",
    coverImageCaptionEn: "Bun Thang – the zenith of meticulous culinary artistry in Trang An culture.",
    coverImageCreditVi: "Di Sản Văn Hóa Ẩm Thực",
    coverImageCreditEn: "Culinary Heritage Archives",
    href: "/guide/bun-thang-ha-noi-buc-tranh-thuy-mac-cau-ky",
    sections: [
      {
        id: "dinh-cao-cau-ky",
        headingVi: "Nghệ thuật thái chỉ và nước dùng trong như gương",
        headingEn: "The Art of Julienne & Mirror-Clear Broth",
        shortTitleVi: "Nghệ thuật thái chỉ",
        shortTitleEn: "Julienne Mastery",
        level: 2,
        paragraphsVi: [
          "Người Hà Nội xưa thường nấu bún thang vào dịp hóa vàng mùng 4 Tết để tận dụng các thức cỗ thừa thành một món ăn mới mẻ và thanh nhẹ. Nhưng qua bàn tay đảm đang của người phụ nữ Tràng An, nó đã vươn tầm thành đỉnh cao của nghệ thuật ẩm thực.",
          "Mỗi bát bún thang như một bông hoa nhiều cánh: màu trắng của thịt gà xé và bún tươi, màu vàng óng của trứng tráng mỏng tang thái chỉ, màu hồng phớt của giò lụa, màu nâu trầm của nấm hương và màu xanh mát của rau răm, hành hoa. Nước dùng ninh từ xương gà, tôm he khô và sá sùng trong vắt, ngọt đậm đà mà không ngậy mỡ.",
        ],
        paragraphsEn: [
          "Ancient Hanoians customarily prepared Bun Thang on the fourth day of Lunar New Year to transform holiday feasts into a refreshing, delicate broth bowl. In the hands of Trang An homemakers, it evolved into an apex of culinary finesse.",
          "Each bowl resembles a multi-petaled bloom: ivory shredded capon, sunny strips of gossamer-thin fried egg, blush-pink pork mortadella, deep-brown shiitake mushrooms, and fresh emerald herbs. The broth, simmered with chicken bones, dried marine prawns, and peanut worms, is crystal-clear and profoundly sweet without oiliness.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Người Hà Nội xưa thường nấu bún thang vào dịp hóa vàng mùng 4 Tết để tận dụng các thức cỗ thừa thành một món ăn mới mẻ và thanh nhẹ. Nhưng qua bàn tay đảm đang của người phụ nữ Tràng An, nó đã vươn tầm thành đỉnh cao của nghệ thuật ẩm thực.",
            textEn:
              "Ancient Hanoians customarily prepared Bun Thang on the fourth day of Lunar New Year to transform holiday feasts into a refreshing, delicate broth bowl. In the hands of Trang An homemakers, it evolved into an apex of culinary finesse.",
          },
          {
            type: "image",
            src: "/images/bun-cha.jpg",
            altVi: "Mâm bún truyền thống với gia vị ớt chanh chuẩn phong vị phố cổ",
            altEn: "Traditional noodle table with lime and chili condiments",
            captionVi: "Gia vị đi kèm – giấm tỏi, ớt tươi và chút mắm tôm tinh tế đánh thức mọi giác quan.",
            captionEn: "Traditional accompaniments – garlic vinegar, fresh chili, and subtle shrimp paste.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "Gợi ý thưởng thức bún thang",
      titleEn: "Bun Thang Gastronomy Advice",
      itemsVi: [
        "Gia vị truyền thống: Thêm chút giấm tỏi ớt cay dịu và đầu tăm tinh dầu cà cuống để dậy mùi thơm nức.",
        "Địa chỉ nức tiếng: Bún thang Bà Đức 48 Cầu Gỗ hoặc bún thang Thuận Lý 33 Hàng Hòm giữ trọn vị truyền thống.",
      ],
      itemsEn: [
        "Heritage condiments: Add subtle garlic vinegar, chili, and a toothpick touch of aromatic essence.",
        "Renowned stalls: Ba Duc at 48 Cau Go and Thuan Ly at 33 Hang Hom preserve ancestral broth recipes.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "pho",
        nameVi: "Phố Cầu Gỗ",
        nameEn: "Cau Go Street",
        areaVi: "Hoàn Kiếm, Hà Nội",
        areaEn: "Hoan Kiem, Hanoi",
        summaryVi: "Con phố ẩm thực lâu đời nép mình bên hồ Hoàn Kiếm với nhiều món ngon nức tiếng.",
        summaryEn: "Historic culinary thoroughfare bordering Sword Lake renowned for legendary recipes.",
        image: "/images/bun-thang.jpg",
        href: "/destinations/pho",
      },
    ],
    relatedSlugs: ["mot-ngay-thuong-thuc-am-thuc-ha-thanh", "ban-do-pho-gia-truyen-pho-co-ha-noi"],
  },

  // =================================================================================
  // 24. GÓC HÀ NỘI (4): Cầu Long Biên: Chứng nhân lịch sử bắc qua ba thế kỷ
  // =================================================================================
  {
    id: "cau-long-bien-chung-nhan-lich-su-ba-the-ky",
    slug: "cau-long-bien-chung-nhan-lich-su-ba-the-ky",
    titleVi: "Cầu Long Biên: Chứng nhân lịch sử bắc qua ba thế kỷ",
    titleEn: "Long Bien Bridge: A Living Iron Witness Spanning Three Centuries",
    descriptionVi:
      "Chiếc cầu thép rỉ sét vắt ngang dòng sông Hồng đỏ nặng phù sa. Buổi chiều ngắm hoàng hôn buông xuống bãi giữa chuối xanh, lắng nghe tiếng còi tàu và thưởng thức ngô nướng than hoa mùa gió bấc.",
    descriptionEn:
      "A weathered steel span arching across the Red River silt. Savor sunset over banana groves, listen to roaring locomotives, and enjoy charcoal-roasted corn in winter winds.",
    categoryKey: "corners",
    categoryLabelVi: "GÓC HÀ NỘI",
    categoryLabelEn: "HANOI CORNERS",
    authorVi: "Hà Nội Trầm Tích",
    authorEn: "Hanoi Heritage Sediments",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-25T08:00:00Z",
    readingTimeVi: "6 phút đọc",
    readingTimeEn: "6 min read",
    readingTimeMinutes: 6,
    coverImage: "/images/long-bien-bridge.jpg",
    coverImageAltVi: "Cầu Long Biên cổ kính bắc qua dòng sông Hồng trong ánh hoàng hôn rực rỡ",
    coverImageAltEn: "Long Bien Bridge spanning the Red River under a golden sunset glow",
    coverImageCaptionVi: "Cầu Long Biên – dải lụa thép kiên cường gắn liền với bao thăng trầm của Thủ đô.",
    coverImageCaptionEn: "Long Bien Bridge – an enduring steel ribbon witnessing Hanoi's triumphs and trials.",
    coverImageCreditVi: "Lưu Trữ Nhiếp Ảnh Di Sản",
    coverImageCreditEn: "Heritage Photography Archives",
    href: "/guide/cau-long-bien-chung-nhan-lich-su-ba-the-ky",
    sections: [
      {
        id: "chung-nhan-the-ky",
        headingVi: "Dấu ấn Eiffel bên dòng sông mẹ",
        headingEn: "Eiffel's Imprint Beside the Mother River",
        shortTitleVi: "Dấu ấn Eiffel",
        shortTitleEn: "Eiffel Imprint",
        level: 2,
        paragraphsVi: [
          "Khánh thành vào năm 1902 dưới thời Toàn quyền Paul Doumer, cầu Long Biên từng là một trong bốn cây cầu thép dài và hiện đại nhất thế giới lúc bấy giờ. Trải qua hơn 120 năm với bao bom đạn chiến tranh khốc liệt, cây cầu vẫn sừng sững vươn mình như một biểu tượng bất khuất của lòng kiên trinh người Hà Nội.",
          "Những nhịp cầu gỉ sét cong vút hình lưng rồng in bóng xuống dòng sông Hồng đỏ nặng phù sa. Đứng trên cầu lúc hoàng hôn, ngắm nhìn bãi giữa ngút ngàn màu xanh của lau sậy và chuối, hít hà làn gió sông lồng lộng thổi là một trong những trải nghiệm xúc động nhất.",
        ],
        paragraphsEn: [
          "Inaugurated in 1902 during the tenure of Paul Doumer, Long Bien Bridge stood as one of the world's longest and most ambitious steel engineering feats of its era. Enduring over 120 years of turbulent warfare, it remains an indomitable monument to Hanoian resilience.",
          "Its dragon-spine steel cantilever spans cast rhythmic silhouettes onto silt-laden Red River waters. Standing on the walkway at dusk, gazing across lush alluvial banana groves as river winds whip past, delivers one of the city's most stirring experiences.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Khánh thành vào năm 1902 dưới thời Toàn quyền Paul Doumer, cầu Long Biên từng là một trong bốn cây cầu thép dài và hiện đại nhất thế giới lúc bấy giờ. Trải qua hơn 120 năm với bao bom đạn chiến tranh khốc liệt, cây cầu vẫn sừng sững vươn mình như một biểu tượng bất khuất của lòng kiên trinh người Hà Nội.",
            textEn:
              "Inaugurated in 1902 during the tenure of Paul Doumer, Long Bien Bridge stood as one of the world's longest and most ambitious steel engineering feats of its era. Enduring over 120 years of turbulent warfare, it remains an indomitable monument to Hanoian resilience.",
          },
          {
            type: "image",
            src: "/images/thang-long-imperial-water-tower.jpg",
            altVi: "Tháp nước Hàng Đậu cổ kính gần đầu cầu Long Biên",
            altEn: "Hang Dau Water Tower near the gateway to Long Bien Bridge",
            captionVi: "Tháp nước Hàng Đậu – công trình kiến trúc thời Pháp cổ kính gần chân cầu.",
            captionEn: "Hang Dau Water Tower – French colonial brick monument near the bridgehead.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "Trải nghiệm trên cầu Long Biên",
      titleEn: "Long Bien Bridge Moments",
      itemsVi: [
        "Khung giờ hoàng hôn: Từ 16:30 đến 17:30 chiều ngắm mặt trời lặn sau dải thép uốn lượn hình rồng.",
        "Ẩm thực mùa đông: Thưởng thức bắp ngô nướng than hoa, khoai nướng nóng hổi trong làn gió bấc sông Hồng.",
      ],
      itemsEn: [
        "Sunset window: Between 4:30 and 5:30 PM to watch golden light cascade across dragon-spine steel.",
        "Winter treat: Savor sweet charcoal-roasted corn and baked sweet potatoes against brisk river breezes.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "long-bien-bridge",
        nameVi: "Cầu Long Biên",
        nameEn: "Long Bien Bridge",
        areaVi: "Hoàn Kiếm - Long Biên, Hà Nội",
        areaEn: "Hoan Kiem - Long Bien, Hanoi",
        summaryVi: "Cây cầu thép lịch sử vắt qua dòng sông Hồng biểu tượng cho sự kiên cường của Hà Nội.",
        summaryEn: "Historic steel bridge spanning the Red River symbolizing Hanoi's enduring courage.",
        image: "/images/long-bien-bridge.jpg",
        href: "/destinations/long-bien-bridge",
      },
    ],
    relatedSlugs: ["song-cham-giua-long-thu-do", "nhung-con-ngo-nho-cat-giau-tram-tich-thoi-gian"],
  },

  // =================================================================================
  // 25. GÓC HÀ NỘI (5): Phố sách 19/12 và những góc đọc yên bình giữa phố thị
  // =================================================================================
  {
    id: "pho-sach-19-12-nhung-goc-doc-yen-binh",
    slug: "pho-sach-19-12-nhung-goc-doc-yen-binh",
    titleVi: "Phố sách 19/12 và những góc đọc yên bình giữa phố thị",
    titleEn: "19/12 Book Street: Quiet Reading Havens in the City Heart",
    descriptionVi:
      "Con phố đi bộ rợp bóng cây xanh với những gian nhà gỗ kiểu Pháp cổ kính là thiên đường cho những ai muốn tìm một góc lặng để đọc sách, thưởng cà phê và lắng nghe tiếng chim hót.",
    descriptionEn:
      "A tree-shaded pedestrian sanctuary featuring French-inspired wooden book pavilions, offering a serene haven for reading, fine coffee, and birdsong.",
    categoryKey: "corners",
    categoryLabelVi: "GÓC HÀ NỘI",
    categoryLabelEn: "HANOI CORNERS",
    authorVi: "Góc Nhìn Thủ Đô",
    authorEn: "Capital Perspectives Desk",
    updatedAtVi: "Tháng 11, 2026",
    updatedAtEn: "November 2026",
    publishedAtIso: "2026-11-25T08:00:00Z",
    readingTimeVi: "5 phút đọc",
    readingTimeEn: "5 min read",
    readingTimeMinutes: 5,
    coverImage: "/images/st-josephs-cathedral.jpg",
    coverImageAltVi: "Không gian cổ kính thanh bình tại khu vực trung tâm quận Hoàn Kiếm",
    coverImageAltEn: "Peaceful heritage atmosphere in central Hoan Kiem district",
    coverImageCaptionVi: "Những góc phố cổ kính – chốn dừng chân bình yên giữa lòng Thủ đô tấp nập.",
    coverImageCaptionEn: "Historic street corners – tranquil sanctuaries amidst the urban rush.",
    coverImageCreditVi: "Hà Nội Những Góc Tĩnh Lặng",
    coverImageCreditEn: "Quiet Hanoi Chronicles",
    href: "/guide/pho-sach-19-12-nhung-goc-doc-yen-binh",
    sections: [
      {
        id: "khong-gian-tri-thuc",
        headingVi: "Nốt trầm tao nhã giữa trung tâm đô thị",
        headingEn: "An Elegant Interlude Amid Urban Vibrancy",
        shortTitleVi: "Phố sách rợp bóng",
        shortTitleEn: "Shaded Book Street",
        level: 2,
        paragraphsVi: [
          "Dài chừng 200 mét nối liền phố Lý Thường Kiệt và Hai Bà Trưng, phố sách 19/12 là không gian văn hóa đặc sắc được thiết kế hoàn toàn cho người đi bộ. Những gian hàng sách bằng gỗ màu nâu ấm áp, các băng ghế nghỉ chân dưới tán cây lộc vừng và giàn hoa giấy rực rỡ tạo nên một ốc đảo tri thức tĩnh lặng.",
          "Tại đây, bạn có thể dễ dàng tìm thấy những ấn phẩm văn học quý về Hà Nội của các tác giả Nguyễn Tuân, Thạch Lam, Tô Hoài; hoặc chọn cho mình một góc cà phê nhỏ để vừa lật giở từng trang sách vừa tận hưởng buổi chiều thư thái.",
        ],
        paragraphsEn: [
          "Stretching 200 meters between Ly Thuong Kiet and Hai Ba Trung streets, 19/12 Book Street is a cultural pedestrian avenue crafted with warm timber pavilions, shaded stone benches under Barringtonia trees, and blooming bougainvillea trellises.",
          "Here, travelers can discover literary treasures celebrating Hanoi by masters like Nguyen Tuan, Thach Lam, and To Hoai, or settle into a corner café to flip through crisp pages while soaking in relaxed afternoon stillness.",
        ],
        blocks: [
          {
            type: "paragraph",
            textVi:
              "Dài chừng 200 mét nối liền phố Lý Thường Kiệt và Hai Bà Trưng, phố sách 19/12 là không gian văn hóa đặc sắc được thiết kế hoàn toàn cho người đi bộ. Những gian hàng sách bằng gỗ màu nâu ấm áp, các băng ghế nghỉ chân dưới tán cây lộc vừng và giàn hoa giấy rực rỡ tạo nên một ốc đảo tri thức tĩnh lặng.",
            textEn:
              "Stretching 200 meters between Ly Thuong Kiet and Hai Ba Trung streets, 19/12 Book Street is a cultural pedestrian avenue crafted with warm timber pavilions, shaded stone benches under Barringtonia trees, and blooming bougainvillea trellises.",
          },
          {
            type: "image",
            src: "/images/giang-cafe.jpg",
            altVi: "Tách cà phê thơm ngon bên trang sách mở rộng",
            altEn: "Rich coffee beside an open book",
            captionVi: "Một ly cà phê ấm nóng cùng cuốn sách hay – công thức hoàn hảo cho một buổi chiều thảnh thơi.",
            captionEn: "A warm artisanal coffee and a good book – the timeless formula for a reflective afternoon.",
          },
        ],
      },
    ],
    tips: {
      titleVi: "Ghé thăm phố sách 19/12",
      titleEn: "Visiting 19/12 Book Street",
      itemsVi: [
        "Thời gian mở cửa: 08:00 – 22:00 hàng ngày, mở cửa tự do hoàn toàn cho người đi bộ.",
        "Không gian yên tĩnh: Buổi sáng trong tuần là thời điểm thanh bình nhất để đọc sách và thư giãn.",
      ],
      itemsEn: [
        "Opening hours: 8:00 AM to 10:00 PM daily with free pedestrian admission.",
        "Peaceful hours: Weekday mornings offer the quietest ambiance for reading and unwinding.",
      ],
    },
    mentionedPlaces: [
      {
        slug: "st-josephs-cathedral",
        nameVi: "Phố sách Hà Nội",
        nameEn: "Hanoi Book Street",
        areaVi: "Hoàn Kiếm, Hà Nội",
        areaEn: "Hoan Kiem, Hanoi",
        summaryVi: "Không gian đi bộ văn hóa tri thức với nhiều hiệu sách và quán cà phê thanh bình.",
        summaryEn: "A dedicated cultural pedestrian avenue boasting tranquil book pavilions and garden cafes.",
        image: "/images/st-josephs-cathedral.jpg",
        href: "/destinations/st-josephs-cathedral",
      },
    ],
    relatedSlugs: ["song-cham-giua-long-thu-do", "nhung-con-ngo-nho-cat-giau-tram-tich-thoi-gian"],
  },

];

export function getGuideArticleBySlug(slug: string): TravelGuideArticle | undefined {
  return TRAVEL_GUIDE_ARTICLES.find((article) => article.slug === slug);
}

export function getAllGuideArticles(): TravelGuideArticle[] {
  return TRAVEL_GUIDE_ARTICLES;
}

export function getRelatedGuideArticles(currentSlug: string, limit = 3): TravelGuideArticle[] {
  const current = getGuideArticleBySlug(currentSlug);
  if (!current) return TRAVEL_GUIDE_ARTICLES.slice(0, limit);

  // First pick from explicit relatedSlugs
  const explicit = current.relatedSlugs
    .map((s) => getGuideArticleBySlug(s))
    .filter((a): a is TravelGuideArticle => a !== undefined && a.slug !== currentSlug);

  if (explicit.length >= limit) return explicit.slice(0, limit);

  // Fill up with any other article not current
  const others = TRAVEL_GUIDE_ARTICLES.filter(
    (a) => a.slug !== currentSlug && !explicit.some((e) => e.slug === a.slug),
  );

  return [...explicit, ...others].slice(0, limit);
}
