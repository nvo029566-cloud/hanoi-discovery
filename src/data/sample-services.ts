export interface TourismService {
  id: string;
  slug: string;
  nameVi: string;
  nameEn: string;
  categoryVi: string;
  categoryEn: string;
  providerVi: string;
  providerEn: string;
  priceVi: string;
  priceEn: string;
  scheduleVi: string;
  scheduleEn: string;
  departureVi: string;
  departureEn: string;
  durationVi: string;
  durationEn: string;
  highlightsVi: string[];
  highlightsEn: string[];
  bookingUrl: string;
  badgeVi: string;
  badgeEn: string;
  iconName: "bus" | "theater" | "moon" | "ship" | "plane";
}

export const sampleServices: TourismService[] = [
  {
    id: "hanoi-city-tour-bus",
    slug: "hanoi-city-tour-bus",
    nameVi: "Xe buýt 2 tầng Hanoi City Tour (Hop-On Hop-Off)",
    nameEn: "Hanoi City Tour Double-Decker Bus (Hop-On Hop-Off)",
    categoryVi: "Phương tiện tham quan",
    categoryEn: "Sightseeing Transport",
    providerVi: "Hanoi Transerco & Vietnam Sightseeing",
    providerEn: "Hanoi Transerco & Vietnam Sightseeing",
    priceVi: "Từ 150.000 VNĐ / vé (2h, 4h, 24h hoặc 48h)",
    priceEn: "From 150,000 VND / ticket (2h, 4h, 24h or 48h)",
    scheduleVi: "Hàng ngày: 09:00 - 17:30 (30 phút / chuyến)",
    scheduleEn: "Daily: 09:00 - 17:30 (every 30 mins)",
    departureVi: "Quảng trường Đông Kinh Nghĩa Thục (Hồ Gươm)",
    departureEn: "Dong Kinh Nghia Thuc Square (Hoan Kiem Lake)",
    durationVi: "Linh hoạt theo vé (Hop-on Hop-off tại 15 trạm)",
    durationEn: "Flexible Hop-on Hop-off across 15 stations",
    highlightsVi: [
      "Thuyết minh tự động Audio Guide 9 thứ tiếng",
      "Wifi miễn phí tốc độ cao & cổng sạc USB trên xe",
      "Tầng 2 thoáng nóc ngắm trọn vẹn phố phường Hà Nội",
      "Dừng tại 15 di tích lớn (Văn Miếu, Hoàng Thành, Chùa Trấn Quốc)",
    ],
    highlightsEn: [
      "Automated multilingual audio guide in 9 languages",
      "Complimentary high-speed Wi-Fi and USB onboard chargers",
      "Open-top second deck offering panoramic 360° capital views",
      "Stops at 15 iconic landmarks (Temple of Literature, Citadel, West Lake)",
    ],
    bookingUrl: "https://hanoicitytour.com.vn",
    badgeVi: "Bán chạy nhất",
    badgeEn: "Top Rated",
    iconName: "bus",
  },
  {
    id: "thang-long-water-puppet",
    slug: "thang-long-water-puppet",
    nameVi: "Vé Xem Múa Rối Nước Thăng Long Truyền Thống",
    nameEn: "Thang Long Traditional Water Puppet Theatre Show",
    categoryVi: "Nghệ thuật biểu diễn",
    categoryEn: "Performing Arts",
    providerVi: "Nhà hát Múa rối Thăng Long Hà Nội",
    providerEn: "Thang Long Puppet Theatre Hanoi",
    priceVi: "100.000 - 200.000 VNĐ / vé (tùy hạng ghế)",
    priceEn: "100,000 - 200,000 VND / seat",
    scheduleVi: "Các suất diễn: 15:00, 16:10, 17:20, 18:30, 20:00 hàng ngày",
    scheduleEn: "Daily shows: 15:00, 16:10, 17:20, 18:30, 20:00",
    departureVi: "57B Đinh Tiên Hoàng, Quận Hoàn Kiếm",
    departureEn: "57B Dinh Tien Hoang St., Hoan Kiem Dist.",
    durationVi: "50 phút / suất diễn",
    durationEn: "50 minutes per show",
    highlightsVi: [
      "Nghệ thuật sân khấu nước độc nhất vô nhị của nền văn minh lúa nước",
      "Dàn nhạc dân tộc đàn bầu, sáo trúc, trống chèo biểu diễn trực tiếp",
      "Tích trò Chú Tễu, Lê Lợi trả gươm, Tứ linh múa lượn",
    ],
    highlightsEn: [
      "Unique thousand-year-old aquatic folk art born in the Red River Delta",
      "Live traditional orchestra featuring Dan Bau, bamboo flutes, and bronze bells",
      "Classic legends: Uncle Teu narrator, King Le Loi sword return, Sacred Dragon dance",
    ],
    bookingUrl: "http://thanglongwaterpuppet.com",
    badgeVi: "Di sản phi vật thể",
    badgeEn: "UNESCO Heritage",
    iconName: "theater",
  },
  {
    id: "hoang-thanh-night-tour",
    slug: "hoang-thanh-night-tour",
    nameVi: "Tour Đêm Hoàng Thành Thăng Long 'Giải Mã Hoàng Thành'",
    nameEn: "Imperial Citadel Night Tour 'Deciphering Thang Long'",
    categoryVi: "Tour đêm di tích",
    categoryEn: "Night Heritage Tour",
    providerVi: "Trung tâm Bảo tồn Di sản Thăng Long - Hà Nội",
    providerEn: "Thang Long Heritage Conservation Center",
    priceVi: "300.000 VNĐ / du khách (200.000 VNĐ trẻ em)",
    priceEn: "300,000 VND / guest (200,000 VND child)",
    scheduleVi: "Thứ 6, Thứ 7 & Chủ nhật hàng tuần (Khởi hành 19:00)",
    scheduleEn: "Every Friday, Saturday & Sunday (Starts 19:00)",
    departureVi: "Cổng Đoan Môn, 19C Hoàng Diệu, Ba Đình",
    departureEn: "Doan Mon Gate, 19C Hoang Dieu St., Ba Dinh Dist.",
    durationVi: "90 phút trải nghiệm",
    durationEn: "90 minutes guided journey",
    highlightsVi: [
      "Không gian hoàng cung huyền ảo lung linh ánh đèn đêm",
      "Nghi thức tế lễ và dâng hương tại Điện Kính Thiên thời Lê",
      "Giải mã các hiện vật khảo cổ học rồng phượng bằng tia laser",
      "Lấy nước từ Giếng thần hoàng cung ngàn năm",
    ],
    highlightsEn: [
      "Spellbinding royal palace courtyard illuminated in evening lights",
      "Ancient incense tribute ritual at Kinh Thien Palace terrace",
      "Interactive laser deciphering of imperial dragon artifacts",
      "Draw fresh sacred water from the thousand-year royal dragon well",
    ],
    bookingUrl: "https://hoangthanhthanglong.com",
    badgeVi: "Trải nghiệm đặc sắc",
    badgeEn: "Special Experience",
    iconName: "moon",
  },
  {
    id: "hoa-lo-prison-night-tour",
    slug: "hoa-lo-prison-night-tour",
    nameVi: "Tour Đêm Di Tích Nhà Tù Hỏa Lò 'Đêm Thiêng Liêng'",
    nameEn: "Hoa Lo Prison Sacred Night Tour",
    categoryVi: "Tour đêm lịch sử",
    categoryEn: "Historical Night Tour",
    providerVi: "Ban Quản lý Di tích Nhà tù Hỏa Lò",
    providerEn: "Hoa Lo Prison Memorial Board",
    priceVi: "399.000 VNĐ / vé (cần đặt trước sớm)",
    priceEn: "399,000 VND / ticket (advance booking required)",
    scheduleVi: "Thứ 6, Thứ 7 & Chủ Nhật (19:00 - 21:00)",
    scheduleEn: "Friday, Saturday & Sunday (19:00 - 21:00)",
    departureVi: "Số 1 phố Hỏa Lò, Phường Trần Hưng Đạo, Hoàn Kiếm",
    departureEn: "No. 1 Hoa Lo St., Hoan Kiem Dist.",
    durationVi: "120 phút hành trình",
    durationEn: "120 minutes immersive tour",
    highlightsVi: [
      "Kịch bản âm thanh, ánh sáng chân thực gây xúc động sâu sắc",
      "Nhập vai trải nghiệm cuộc sống trong ngục tối thực dân",
      "Thưởng thức thạch trà bàng và bánh bàng đặc sản Hỏa Lò",
    ],
    highlightsEn: [
      "Profoundly moving theatrical sound and light reenactment",
      "Immersive walk through dark solitary cells and historic guillotine",
      "Sample signature almond-tree herbal tea and delicacies",
    ],
    bookingUrl: "http://hoalo.vn",
    badgeVi: "Hot nhất Hà Nội",
    badgeEn: "Must Experience",
    iconName: "moon",
  },
  {
    id: "bat-trang-river-tour",
    slug: "bat-trang-river-tour",
    nameVi: "Du Thuyền Sông Hồng & Trải Nghiệm Làng Gốm Bát Tràng",
    nameEn: "Red River Cruise & Bat Trang Ancient Pottery Village",
    categoryVi: "Trải nghiệm làng nghề",
    categoryEn: "Craft Village Cruise",
    providerVi: "Công ty Cổ phần Thăng Long GTC",
    providerEn: "Thang Long GTC Cruise Lines",
    priceVi: "450.000 VNĐ / khách (bao gồm ăn trưa trên tàu)",
    priceEn: "450,000 VND / passenger (includes lunch onboard)",
    scheduleVi: "Khởi hành 07:30 hàng ngày",
    scheduleEn: "Departs 07:30 daily",
    departureVi: "Bến tàu du lịch 46 Chương Dương Độ, Hoàn Kiếm",
    departureEn: "Pier 46 Chuong Duong Do St., Hoan Kiem Dist.",
    durationVi: "7 tiếng (07:30 - 15:30)",
    durationEn: "7 hours (07:30 - 15:30)",
    highlightsVi: [
      "Thưởng ngoạn phong cảnh sông Hồng và các làng quê trù phú",
      "Tự tay chuốt gốm và tạo hình đất sét tại xưởng nghệ nhân Bát Tràng",
      "Thăm bảo tàng gốm sứ độc đáo 'Bàn xoay khổng lồ'",
    ],
    highlightsEn: [
      "Scenic cruise along the Red River passing lush riverside orchards",
      "Hands-on pottery spinning on artisan wheels to take home",
      "Visit the architectural masterpiece 'Giant Pottery Kiln Museum'",
    ],
    bookingUrl: "https://battrangtour.vn",
    badgeVi: "Du lịch sinh thái",
    badgeEn: "Eco & Craft",
    iconName: "ship",
  },
  {
    id: "bus-86-airport-express",
    slug: "bus-86-airport-express",
    nameVi: "Xe Buýt Chất Lượng Cao Sân Bay Nội Bài - Phố Cổ (Tuyến 86)",
    nameEn: "Noi Bai Airport Express Bus Line 86 (Airport - Old Quarter)",
    categoryVi: "Trung chuyển sân bay",
    categoryEn: "Airport Transfer",
    providerVi: "Tổng công ty Vận tải Hà Nội (Transerco)",
    providerEn: "Hanoi Transportation Corporation (Transerco)",
    priceVi: "45.000 VNĐ / lượt",
    priceEn: "45,000 VND / one-way ticket",
    scheduleVi: "05:30 - 22:00 hàng ngày (45 phút / lượt)",
    scheduleEn: "05:30 - 22:00 daily (every 45 mins)",
    departureVi: "Ga Quốc tế T2 / Ga Quốc nội T1 Nội Bài <-> Ga Hà Nội & Hồ Gươm",
    departureEn: "Noi Bai Terminals T1/T2 <-> Hanoi Railway Station & Lake",
    durationVi: "50 - 60 phút di chuyển",
    durationEn: "50 - 60 minutes travel time",
    highlightsVi: [
      "Wifi miễn phí tốc độ cao và khoang để hành lý rộng rãi",
      "Nhân viên phục vụ song ngữ Việt - Anh văn minh, lịch thiệp",
      "Đón/trả ngay sát khu vực Phố Cổ và trung tâm Hoàn Kiếm",
    ],
    highlightsEn: [
      "High-speed Wi-Fi and dedicated spacious luggage racks",
      "Courteous bilingual Vietnamese-English cabin crew",
      "Direct drop-off at Hanoi Old Quarter and Hoan Kiem central hub",
    ],
    bookingUrl: "https://timbus.vn",
    badgeVi: "Tiện lợi & Tiết kiệm",
    badgeEn: "Fast & Convenient",
    iconName: "plane",
  },
];
