import type { Locale } from "@/i18n/locales";

export interface ItineraryStop {
  timeSlot: string; // "Sáng" | "Chiều" | "Tối" hoặc "Morning" | "Afternoon" | "Evening"
  title: string;
  destinationSlug?: string;
  description: string;
  tips?: string;
}

export interface CuratedDay {
  dayNumber: number;
  dayTitle: string;
  stops: ItineraryStop[];
}

export interface CuratedItinerary {
  id: string;
  daysCount: number;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  highlights: string[];
  days: CuratedDay[];
}

export const curatedItinerariesVi: CuratedItinerary[] = [
  {
    id: "hanoi-1-day",
    daysCount: 1,
    slug: "mot-thoang-ha-noi",
    title: "1 Ngày: Một thoáng Hà Nội di sản",
    tagline: "Trọn vẹn tinh hoa ngàn năm trong 24 giờ",
    summary:
      "Lộ trình tối ưu dành cho du khách có ít thời gian nhưng vẫn muốn chạm vào linh hồn Hà Nội: từ hồ Gươm buổi sớm, Văn Miếu cổ kính đến ẩm thực phố cổ về đêm.",
    highlights: ["Dạo quanh Hồ Hoàn Kiếm ngắm tháp Rùa", "Thăm Văn Miếu – Quốc Tử Giám", "Thưởng thức phở truyền thống & cà phê trứng", "Dạo bước ngõ phố cổ khi lên đèn"],
    days: [
      {
        dayNumber: 1,
        dayTitle: "Trái tim Hà Nội & Dấu ấn lịch sử",
        stops: [
          {
            timeSlot: "07:30 - 09:30 (Sáng)",
            title: "Khởi đầu sớm tại Hồ Hoàn Kiếm & Bát phở sáng",
            destinationSlug: "hoan-kiem-lake",
            description: "Thưởng thức một bát phở bò nóng hổi trên phố Bát Đàn hoặc Hàng Trống, sau đó đi bộ quanh bờ hồ ngắm cầu Thê Húc, đền Ngọc Sơn và nhịp sống tập thể dục sớm của người Hà Nội.",
            tips: "Nên đến trước 8:00 sáng để cảm nhận không khí trong lành và thanh bình nhất của bờ hồ.",
          },
          {
            timeSlot: "10:00 - 12:00 (Trưa)",
            title: "Chiêm bái Văn Miếu – Quốc Tử Giám",
            destinationSlug: "temple-of-literature",
            description: "Trường đại học đầu tiên của Việt Nam với vườn bia tiến sĩ, khuê văn các và kiến trúc gỗ truyền thống hàng trăm năm tuổi.",
            tips: "Có dịch vụ thuyết minh tự động (audio guide) rất chi tiết bằng nhiều thứ tiếng.",
          },
          {
            timeSlot: "14:00 - 17:00 (Chiều)",
            title: "Khám phá Hoàng thành Thăng Long & Cà phê trứng",
            destinationSlug: "imperial-citadel-of-thang-long",
            description: "Khám phá tầng tầng lớp lớp di tích hoàng cung qua các triều đại Lý, Trần, Lê. Sau đó ghé một quán cà phê cổ phố Nguyễn Tri Phương hoặc Giảng để nếm thử vị béo ngậy của cà phê trứng.",
            tips: "Hoàng thành rất rộng, nên mang giày đế bệt êm chân.",
          },
          {
            timeSlot: "18:30 - 21:30 (Tối)",
            title: "Ẩm thực Phố Cổ & Xem múa rối nước",
            destinationSlug: "hanoi-old-quarter",
            description: "Xem suất diễn múa rối nước tại Nhà hát Múa rối Thăng Long, sau đó hòa mình vào nhịp sống ẩm thực phố cổ với bún chả, nem rán hoặc bia hơi Tạ Hiện.",
            tips: "Nên đặt vé múa rối nước trước vài tiếng vào các ngày cuối tuần.",
          },
        ],
      },
    ],
  },
  {
    id: "hanoi-2-days",
    daysCount: 2,
    slug: "ha-noi-xua-va-nay",
    title: "2 Ngày: Hà Nội xưa và nay",
    tagline: "Giao thoa giữa nét cổ kính nghìn năm và nhịp sống hiện đại",
    summary:
      "Hành trình 48 giờ lý tưởng để vừa thong dong tìm hiểu chiều sâu văn hóa các dân tộc, vừa thưởng ngoạn vẻ đẹp lãng mạn của Hồ Tây và nghệ thuật đương đại.",
    highlights: ["Toàn bộ điểm nhấn lịch sử phố cổ & hoàng thành", "Bảo tàng Dân tộc học đặc sắc", "Hoàng hôn lãng mạn bên Hồ Tây", "Thưởng thức ẩm thực chả cá Lã Vọng"],
    days: [
      {
        dayNumber: 1,
        dayTitle: "Lịch sử ngàn năm & 36 Phố phường",
        stops: [
          {
            timeSlot: "Sáng",
            title: "Hồ Hoàn Kiếm, Đền Ngọc Sơn & Văn Miếu",
            destinationSlug: "temple-of-literature",
            description: "Dạo bước ven hồ Gươm, viếng Văn Miếu – Quốc Tử Giám và tìm hiểu nền giáo dục Nho học xưa.",
          },
          {
            timeSlot: "Chiều",
            title: "Hoàng thành Thăng Long & Nhà tù Hỏa Lò",
            destinationSlug: "imperial-citadel-of-thang-long",
            description: "Tìm hiểu di sản nghìn năm Thăng Long và những giai đoạn lịch sử hào hùng cận hiện đại.",
          },
          {
            timeSlot: "Tối",
            title: "Khám phá Phố cổ & Ăn chả cá",
            destinationSlug: "hanoi-old-quarter",
            description: "Thưởng thức món chả cá thơm lừng chảo mỡ sôi xèo xèo cùng thì là, bún tươi và mắm tôm đậm đà.",
          },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "Bản sắc văn hóa & Hoàng hôn Hồ Tây",
        stops: [
          {
            timeSlot: "Sáng",
            title: "Bảo tàng Dân tộc học Việt Nam",
            destinationSlug: "vietnam-museum-of-ethnology",
            description: "Chiêm ngưỡng kiến trúc nhà rông, nhà sàn thực tế ở khu trưng bày ngoài trời và hiểu hơn về văn hóa 54 dân tộc anh em.",
            tips: "Khu vực ngoài trời rất râm mát và có nhiều hoạt động trình diễn văn hóa dân gian vào cuối tuần.",
          },
          {
            timeSlot: "Chiều",
            title: "Dạo quanh Hồ Tây, viếng chùa Trấn Quốc & Thưởng thức bánh tôm",
            destinationSlug: "west-lake",
            description: "Ghé thăm ngôi chùa cổ nhất Hà Nội nằm soi bóng trên mặt hồ, ngắm hoàng hôn buông xuống mặt nước mênh mông và thưởng thức bánh tôm giòn rụm.",
          },
          {
            timeSlot: "Tối",
            title: "Thưởng trà sen hoặc cà phê ngắm cảnh hồ",
            destinationSlug: "west-lake",
            description: "Khép lại chuyến đi bằng một ấm trà ướp hoa sen Tây Hồ thanh nhã trong tiếng nhạc dịu êm ven hồ.",
          },
        ],
      },
    ],
  },
  {
    id: "hanoi-3-days",
    daysCount: 3,
    slug: "kham-pha-chieu-sau-va-lang-nghe",
    title: "3 Ngày: Chiều sâu văn hóa & Làng nghề truyền thống",
    tagline: "Trải nghiệm trọn vẹn từ nội đô đến các làng nghề ven đô",
    summary:
      "Chuyến hành trình 3 ngày hoàn hảo kết hợp di sản văn hóa nội đô, ẩm thực phong phú và trải nghiệm tự tay vuốt nặn gốm tại làng gốm Bát Tràng trứ danh.",
    highlights: ["Khám phá trọn vẹn di tích & bảo tàng tiêu biểu", "Trải nghiệm làm gốm thủ công tại Bát Tràng", "Ẩm thực đường phố chuẩn vị bản xứ", "Thời gian thảnh thơi mua sắm quà lưu niệm"],
    days: [
      {
        dayNumber: 1,
        dayTitle: "Khu phố cổ & Trục di sản Thăng Long",
        stops: [
          {
            timeSlot: "Sáng",
            title: "Hồ Hoàn Kiếm – Đền Ngọc Sơn – Phố Cổ",
            destinationSlug: "hoan-kiem-lake",
            description: "Dạo bước qua những con phố mang tên Hàng Bạc, Hàng Mã, Hàng Gai để chiêm ngưỡng kiến trúc nhà ống đặc trưng.",
          },
          {
            timeSlot: "Chiều",
            title: "Hoàng thành Thăng Long & Cột cờ Hà Nội",
            destinationSlug: "imperial-citadel-of-thang-long",
            description: "Thăm khu di tích khảo cổ học 18 Hoàng Diệu và ngắm nhìn kỳ đài lịch sử.",
          },
          {
            timeSlot: "Tối",
            title: "Phố ẩm thực Tống Duy Tân & Nhà hát Múa rối",
            destinationSlug: "hanoi-old-quarter",
            description: "Thưởng thức ẩm thực đêm Hà Nội đa dạng và đặc sắc.",
          },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "Văn hóa dân tộc & Không gian Hồ Tây",
        stops: [
          {
            timeSlot: "Sáng",
            title: "Văn Miếu – Quốc Tử Giám & Bảo tàng Dân tộc học",
            destinationSlug: "temple-of-literature",
            description: "Tìm hiểu tinh thần hiếu học và sự đa dạng sắc tộc của đất nước.",
          },
          {
            timeSlot: "Chiều",
            title: "Hồ Tây – Chùa Trấn Quốc – Phủ Tây Hồ",
            destinationSlug: "west-lake",
            description: "Khám phá không gian tâm linh và nhịp sống thong dong ven hồ nước ngọt lớn nhất thủ đô.",
          },
          {
            timeSlot: "Tối",
            title: "Dạo chợ đêm & Mua quà lưu niệm phố Hàng Đào",
            destinationSlug: "hanoi-old-quarter",
            description: "Mua sắm đồ thủ công, lụa tơ tằm và các món quà lưu niệm nhỏ xinh.",
          },
        ],
      },
      {
        dayNumber: 3,
        dayTitle: "Trải nghiệm Làng gốm Bát Tràng",
        stops: [
          {
            timeSlot: "Sáng & Chiều",
            title: "Khám phá Làng cổ Bát Tràng & Tự tay làm gốm",
            description: "Di chuyển khoảng 30 phút ra ngoại thành để đến làng gốm hơn 700 năm tuổi. Chiêm ngưỡng Bảo tàng Gốm Bát Tràng với kiến trúc 7 bàn xoay độc đáo, tự tay nặn gốm và mua sắm đồ gốm sứ tinh xảo.",
            tips: "Có thể đi xe buýt số 47 từ trung tâm đến thẳng cổng chợ gốm Bát Tràng.",
          },
          {
            timeSlot: "Tối",
            title: "Bữa tiệc chia tay Hà Nội với Bún chả & Trà sen",
            description: "Thưởng thức một bữa tối nhẹ nhàng với bún chả thơm nức và lưu lại những kỷ niệm đẹp về thủ đô nghìn năm văn hiến.",
          },
        ],
      },
    ],
  },
];

export const curatedItinerariesEn: CuratedItinerary[] = [
  {
    id: "hanoi-1-day",
    daysCount: 1,
    slug: "glimpse-of-hanoi",
    title: "1 Day: A Glimpse of Heritage",
    tagline: "The essence of a thousand-year-old capital in 24 hours",
    summary:
      "A curated route designed for travelers with limited time who still want to embrace Hanoi's heart: from peaceful dawn by Hoan Kiem Lake, ancient Temple of Literature, to nocturnal street cuisine.",
    highlights: ["Early morning stroll around Hoan Kiem Lake", "Visit Temple of Literature & First National University", "Taste authentic Pho and Egg Coffee", "Atmospheric walk through the Old Quarter evening alleys"],
    days: [
      {
        dayNumber: 1,
        dayTitle: "Heart of Hanoi & Historical Icons",
        stops: [
          {
            timeSlot: "07:30 - 09:30 (Morning)",
            title: "Early Stroll at Hoan Kiem Lake & Morning Pho",
            destinationSlug: "hoan-kiem-lake",
            description: "Savor a steaming bowl of traditional Pho Bo, then walk along the tree-lined banks of Hoan Kiem Lake, watching morning tai chi practitioners and the red The Huc bridge.",
            tips: "Arrive before 8:00 AM to catch the quietest, most poetic atmosphere.",
          },
          {
            timeSlot: "10:00 - 12:00 (Noon)",
            title: "Temple of Literature – Imperial Academy",
            destinationSlug: "temple-of-literature",
            description: "Vietnam's first university, home to historic stone stelae of doctors, serene courtyards, and ancient wooden architecture.",
            tips: "Audio guides in English and multiple languages are available at the entrance.",
          },
          {
            timeSlot: "14:00 - 17:00 (Afternoon)",
            title: "Imperial Citadel of Thang Long & Egg Coffee",
            destinationSlug: "imperial-citadel-of-thang-long",
            description: "A UNESCO World Heritage site revealing layers of ancient palaces over centuries. Afterward, stop by a heritage cafe for silky, whipped egg coffee.",
            tips: "Wear comfortable walking shoes as the archaeological grounds are extensive.",
          },
          {
            timeSlot: "18:30 - 21:30 (Evening)",
            title: "Old Quarter Flavors & Water Puppet Show",
            destinationSlug: "hanoi-old-quarter",
            description: "Catch a classic water puppetry performance at Thang Long Theatre, followed by street food delights like Bun Cha or fresh beer at Ta Hien corner.",
            tips: "Book water puppet tickets in advance, especially on weekends.",
          },
        ],
      },
    ],
  },
  {
    id: "hanoi-2-days",
    daysCount: 2,
    slug: "hanoi-past-and-present",
    title: "2 Days: Hanoi Past and Present",
    tagline: "Bridging centuries of heritage and contemporary lakeside charm",
    summary:
      "An ideal 48-hour itinerary balancing historic monuments with West Lake's romantic sunset and rich ethnic culture.",
    highlights: ["Essential historic and cultural landmarks", "Renowned Vietnam Museum of Ethnology", "Sunset over the expansive West Lake", "Signature Cha Ca turmeric fish banquet"],
    days: [
      {
        dayNumber: 1,
        dayTitle: "Millennium Heritage & The 36 Guild Streets",
        stops: [
          {
            timeSlot: "Morning",
            title: "Hoan Kiem Lake, Ngoc Son Temple & Temple of Literature",
            destinationSlug: "temple-of-literature",
            description: "Begin with the city's symbolic heart and delve into centuries of Confucian scholarly history.",
          },
          {
            timeSlot: "Afternoon",
            title: "Imperial Citadel & Hoa Lo Prison Relic",
            destinationSlug: "imperial-citadel-of-thang-long",
            description: "Trace Thang Long's royal history and significant contemporary eras.",
          },
          {
            timeSlot: "Evening",
            title: "Explore the Old Quarter & Cha Ca Dinner",
            destinationSlug: "hanoi-old-quarter",
            description: "Delight in sizzling pan-fried fish with dill, scallions, fresh herbs, and vermicelli.",
          },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "Ethnic Culture & West Lake Sunset",
        stops: [
          {
            timeSlot: "Morning",
            title: "Vietnam Museum of Ethnology",
            destinationSlug: "vietnam-museum-of-ethnology",
            description: "Marvel at authentic tribal architecture, communal houses, and diverse traditions of Vietnam's 54 ethnic groups.",
            tips: "The shaded outdoor garden is pleasant and features weekend folk performances.",
          },
          {
            timeSlot: "Afternoon",
            title: "West Lake, Tran Quoc Pagoda & Crispy Shrimp Cakes",
            destinationSlug: "west-lake",
            description: "Visit the city's oldest Buddhist sanctuary perched on an islet, then catch twilight reflections across the water.",
          },
          {
            timeSlot: "Evening",
            title: "Lotus Tea or Lakeside Lounge",
            destinationSlug: "west-lake",
            description: "Wrap up the day with subtle lotus-scented green tea beside the tranquil breeze.",
          },
        ],
      },
    ],
  },
  {
    id: "hanoi-3-days",
    daysCount: 3,
    slug: "deep-culture-and-craft-villages",
    title: "3 Days: Cultural Depths & Craft Traditions",
    tagline: "A comprehensive immersion from the inner city to artisan villages",
    summary:
      "The definitive 3-day exploration uniting urban heritage, rich culinary gems, and hands-on pottery making at the renowned Bat Trang village.",
    highlights: ["All essential cultural monuments and museums", "Hands-on pottery workshop in Bat Trang", "Authentic local street food tours", "Leisurely shopping for bespoke artisanal keepsakes"],
    days: [
      {
        dayNumber: 1,
        dayTitle: "Old Quarter & Royal Thang Long Axis",
        stops: [
          {
            timeSlot: "Morning",
            title: "Hoan Kiem Lake – Ngoc Son Temple – Old Alleys",
            destinationSlug: "hoan-kiem-lake",
            description: "Stroll along streets named after ancient crafts: Silver, Silk, Paper.",
          },
          {
            timeSlot: "Afternoon",
            title: "Imperial Citadel & Flag Tower",
            destinationSlug: "imperial-citadel-of-thang-long",
            description: "Admire archaeological excavation pits and historic military monuments.",
          },
          {
            timeSlot: "Evening",
            title: "Street Food Night & Water Puppet Theatre",
            destinationSlug: "hanoi-old-quarter",
            description: "Sample Hanoi's evening culinary vibrancy.",
          },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "Ethnic Wisdom & West Lake Panorama",
        stops: [
          {
            timeSlot: "Morning",
            title: "Temple of Literature & Museum of Ethnology",
            destinationSlug: "temple-of-literature",
            description: "Celebrate Vietnam's scholarly heritage and vivid folk arts.",
          },
          {
            timeSlot: "Afternoon",
            title: "West Lake – Tran Quoc Pagoda – Tay Ho Temple",
            destinationSlug: "west-lake",
            description: "Unwind along Hanoi's largest freshwater expanse.",
          },
          {
            timeSlot: "Evening",
            title: "Night Market & Hang Dao Souvenir Shopping",
            destinationSlug: "hanoi-old-quarter",
            description: "Browse silk scarves, lacquerware, and handmade souvenirs.",
          },
        ],
      },
      {
        dayNumber: 3,
        dayTitle: "Bat Trang Pottery Village Excursion",
        stops: [
          {
            timeSlot: "Morning & Afternoon",
            title: "Bat Trang Ancient Village & Hands-on Pottery",
            description: "Travel 30 minutes to a 700-year-old pottery haven. Visit the sculptural Bat Trang Ceramic Museum, spin your own clay bowl, and shop delicate porcelain.",
            tips: "Bus #47 from the center drops you right at Bat Trang pottery market.",
          },
          {
            timeSlot: "Evening",
            title: "Farewell Dinner with Bun Cha & Lotus Tea",
            description: "Celebrate your stay with savory grilled pork patties, fresh noodles, and heartfelt memories of Hanoi.",
          },
        ],
      },
    ],
  },
];

export function getCuratedItineraries(locale: Locale = "vi"): CuratedItinerary[] {
  return locale === "en" ? curatedItinerariesEn : curatedItinerariesVi;
}
