export interface ReviewItem {
  id: string;
  slug: string;
  author: string;
  avatar?: string;
  country?: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  content: string;
  helpfulCount: number;
}

export const sampleReviews: Record<string, ReviewItem[]> = {
  "temple-of-literature": [
    {
      id: "rev-tol-1",
      slug: "temple-of-literature",
      author: "Nguyễn Minh Tuấn",
      country: "Việt Nam",
      rating: 5,
      date: "14/11/2026",
      title: "Không gian lịch sử linh thiêng và thanh bình",
      content:
        "Văn Miếu giữ được vẻ trầm mặc, cổ kính hiếm có giữa lòng thành phố. 82 tấm bia tiến sĩ trên lưng rùa đá khiến mình vô cùng tự hào về truyền thống hiếu học của cha ông. Khuyên mọi người nên thuê audio guide thuyết minh rất chi tiết.",
      helpfulCount: 24,
    },
    {
      id: "rev-tol-2",
      slug: "temple-of-literature",
      author: "Sarah Jenkins",
      country: "Australia",
      rating: 5,
      date: "08/11/2026",
      title: "An unforgettable cultural highlight of Hanoi",
      content:
        "The architecture is stunning and the courtyards are remarkably well preserved. We spent nearly two hours walking through the gardens and learning about Vietnam's first national university. Highly recommended!",
      helpfulCount: 19,
    },
    {
      id: "rev-tol-3",
      slug: "temple-of-literature",
      author: "Trần Thu Hà",
      country: "Việt Nam",
      rating: 5,
      date: "02/11/2026",
      title: "Tour đêm Văn Miếu công nghệ 3D Mapping quá xuất sắc",
      content:
        "Gia đình mình trải nghiệm tour đêm Tinh hoa Đạo học vào tối thứ Bảy. Trình chiếu ánh sáng 3D mapping lên Khuê Văn Các và giếng Thiên Quang rất hoành tráng, các con mê mẩn.",
      helpfulCount: 31,
    },
  ],
  "hoan-kiem-lake": [
    {
      id: "rev-hkl-1",
      slug: "hoan-kiem-lake",
      author: "Lê Hoàng Nam",
      country: "Việt Nam",
      rating: 5,
      date: "17/11/2026",
      title: "Trái tim của Hà Nội, đi dạo sáng sớm là tuyệt nhất",
      content:
        "Khoảng 6h sáng đi bộ quanh hồ cảm nhận không khí trong lành, ngắm các cụ già tập dưỡng sinh và tháp Rùa mờ ảo trong sương sớm. Cuối tuần có phố đi bộ rất nhộn nhịp.",
      helpfulCount: 42,
    },
    {
      id: "rev-hkl-2",
      slug: "hoan-kiem-lake",
      author: "Marc Dupont",
      country: "France",
      rating: 5,
      date: "10/11/2026",
      title: "The poetic soul of the capital",
      content:
        "The contrast between the calm lake and the bustling Old Quarter streets just steps away is magical. Crossing the red Huc Bridge to Ngoc Son Temple is a must.",
      helpfulCount: 15,
    },
  ],
  "hanoi-old-quarter": [
    {
      id: "rev-hoq-1",
      slug: "hanoi-old-quarter",
      author: "Phạm Quốc Bảo",
      country: "Việt Nam",
      rating: 5,
      date: "15/11/2026",
      title: "Mê cung ẩm thực và kiến trúc nhà ống độc đáo",
      content:
        "Cứ rẽ vào bất kỳ ngõ nhỏ nào cũng tìm thấy một quán ăn ngon nức nở. Từ Hàng Buồm, Hàng Bạc đến Tạ Hiện, mỗi góc phố đều mang đậm chất kinh kỳ xưa.",
      helpfulCount: 38,
    },
    {
      id: "rev-hoq-2",
      slug: "hanoi-old-quarter",
      author: "Emily Watson",
      country: "United Kingdom",
      rating: 5,
      date: "12/11/2026",
      title: "Vibrant energy and best street food in Asia",
      content:
        "Getting lost in the 36 streets was the highlight of our Vietnam trip. Egg coffee on Nguyen Huu Huan and bun cha in the alleys are utterly sensational.",
      helpfulCount: 29,
    },
  ],
  "hoa-lo-prison": [
    {
      id: "rev-hlp-1",
      slug: "hoa-lo-prison",
      author: "Vũ Đức Thắng",
      country: "Việt Nam",
      rating: 5,
      date: "16/11/2026",
      title: "Tour đêm 'Đêm thiêng liêng' xúc động đến rơi nước mắt",
      content:
        "Công tác trưng bày và tái hiện lịch sử của ban quản lý Hỏa Lò cực kỳ chuyên nghiệp. Xem lại những hiện vật và câu chuyện kiên trung của các chiến sĩ mà lòng nghẹn ngào tự hào.",
      helpfulCount: 56,
    },
  ],
};

export function getReviewsForSlug(slug: string): ReviewItem[] {
  return (
    sampleReviews[slug] ?? [
      {
        id: `rev-${slug}-default-1`,
        slug,
        author: "Khách du lịch Hà Nội",
        country: "Việt Nam",
        rating: 5,
        date: "10/11/2026",
        title: "Điểm đến tuyệt vời đáng ghé thăm khi tới Hà Nội",
        content:
          "Cảnh quan và nét văn hóa đặc sắc mang đậm dấu ấn Tràng An. Không khí dễ chịu, người dân địa phương thân thiện và hiếu khách.",
        helpfulCount: 12,
      },
      {
        id: `rev-${slug}-default-2`,
        slug,
        author: "Alex Morgan",
        country: "USA",
        rating: 5,
        date: "05/11/2026",
        title: "A wonderful cultural journey",
        content:
          "Rich history and captivating atmosphere. A very authentic experience that shows the real beauty of Hanoi.",
        helpfulCount: 8,
      },
    ]
  );
}
