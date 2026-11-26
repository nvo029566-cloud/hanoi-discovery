/** The three simple content types managed by the generic admin screens (destinations have their own). */
export const CONTENT_KINDS = ["food", "culture", "story"] as const;
export type ContentKind = (typeof CONTENT_KINDS)[number];

export function isContentKind(value: string): value is ContentKind {
  return (CONTENT_KINDS as readonly string[]).includes(value);
}

export interface KindConfig {
  /** Admin URL segment: /admin/<path>. The public site uses the same segment. */
  path: string;
  listTitle: string;
  addLabel: string;
  newTitle: string;
  editTitle: string;
  empty: string;
  nameLabel: string;
  summaryLabel: string;
  hasBody: boolean;
  saveLabel: string;
}

export const KIND_CONFIG: Record<ContentKind, KindConfig> = {
  food: {
    path: "food",
    listTitle: "Ẩm thực",
    addLabel: "Thêm món ăn",
    newTitle: "Thêm món ăn",
    editTitle: "Sửa món ăn",
    empty: "Chưa có món ăn nào.",
    nameLabel: "Tên món",
    summaryLabel: "Mô tả ngắn",
    hasBody: false,
    saveLabel: "Lưu món ăn",
  },
  culture: {
    path: "culture",
    listTitle: "Văn hóa",
    addLabel: "Thêm mục văn hóa",
    newTitle: "Thêm mục văn hóa",
    editTitle: "Sửa mục văn hóa",
    empty: "Chưa có mục văn hóa nào.",
    nameLabel: "Tên mục",
    summaryLabel: "Mô tả ngắn",
    hasBody: false,
    saveLabel: "Lưu mục văn hóa",
  },
  story: {
    path: "stories",
    listTitle: "Câu chuyện",
    addLabel: "Thêm câu chuyện",
    newTitle: "Thêm câu chuyện",
    editTitle: "Sửa câu chuyện",
    empty: "Chưa có câu chuyện nào.",
    nameLabel: "Tiêu đề",
    summaryLabel: "Đoạn trích",
    hasBody: true,
    saveLabel: "Lưu câu chuyện",
  },
};
