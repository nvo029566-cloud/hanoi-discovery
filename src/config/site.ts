export const siteConfig = {
  name: "HANOI DISCOVERY",
  tagline: "Cảm nhận Hà Nội. Sống cùng câu chuyện.",
  description:
    "Khám phá những con phố trường tồn, hương vị ẩn mình và những trải nghiệm khó quên tại Hà Nội, Việt Nam.",
} as const;

/** Locale-free paths; `key` selects the label from the i18n messages (messages.nav). */
export const mainNav = [
  { href: "/destinations", key: "destinations" },
  { href: "/food", key: "food" },
  { href: "/culture", key: "culture" },
  { href: "/planner", key: "planner" },
  { href: "/guide", key: "guide" },
] as const;

export const footerLinks = {
  explore: [
    { href: "/destinations", key: "destinations" },
    { href: "/food", key: "food" },
    { href: "/map", key: "map" },
    { href: "/planner", key: "planner" },
    { href: "/services", key: "services" },
  ],
  stories: [
    { href: "/culture", key: "culture" },
    { href: "/stories", key: "stories" },
    { href: "/about", key: "about" },
  ],
  essentials: [
    { href: "/guide", key: "guide" },
    { href: "/faq", key: "faq" },
    { href: "/contact", key: "contact" },
  ],
} as const;
