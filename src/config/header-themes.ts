export type HeaderThemeKey =
  | "hero"
  | "destinations"
  | "cuisine"
  | "culture"
  | "itinerary"
  | "handbook"
  | "about";

export interface HeaderThemeConfig {
  key: HeaderThemeKey;
  label: string;
  isDark: boolean;
  navHref: string;
  // Background colors
  bgTop: string;
  bgScrolled: string;
  borderColor: string;
  // Text & Content colors
  textPrimary: string;
  textMuted: string;
  // Menu item active state
  activePillBg: string;
  activePillText: string;
  activePillBorder: string;
  activeUnderline: string;
  // Menu item hover state
  hoverBg: string;
  hoverText: string;
  // Controls (Search, Weather, Language, Mobile)
  controlBg: string;
  controlBorder: string;
  controlText: string;
  controlHoverBg: string;
  controlHoverBorder: string;
  controlHoverText: string;
  // Gold accent for theme
  goldAccent: string;
}

export const headerThemes: Record<HeaderThemeKey, HeaderThemeConfig> = {
  hero: {
    key: "hero",
    label: "Dark Green",
    isDark: true,
    navHref: "/",
    bgTop: "rgba(16, 60, 52, 0.78)", // #103C34
    bgScrolled: "rgba(16, 60, 52, 0.96)",
    borderColor: "rgba(245, 232, 184, 0.22)",
    textPrimary: "text-white",
    textMuted: "text-white/80",
    activePillBg: "bg-white/18",
    activePillText: "text-white",
    activePillBorder: "border-white/25",
    activeUnderline: "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
    hoverBg: "hover:bg-white/10",
    hoverText: "hover:text-amber-200",
    controlBg: "bg-white/10",
    controlBorder: "border-white/25",
    controlText: "text-white/90",
    controlHoverBg: "hover:bg-white/20",
    controlHoverBorder: "hover:border-amber-400/60",
    controlHoverText: "hover:text-amber-200",
    goldAccent: "#D4AF37",
  },
  destinations: {
    key: "destinations",
    label: "Ivory",
    isDark: false,
    navHref: "/destinations",
    bgTop: "rgba(243, 239, 228, 0.90)", // #F3EFE4
    bgScrolled: "rgba(243, 239, 228, 0.97)",
    borderColor: "rgba(16, 60, 52, 0.16)",
    textPrimary: "text-[#103C34]",
    textMuted: "text-[#103C34]/80",
    activePillBg: "bg-[#103C34]/12",
    activePillText: "text-[#103C34]",
    activePillBorder: "border-[#103C34]/25",
    activeUnderline: "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.5)]",
    hoverBg: "hover:bg-[#103C34]/8",
    hoverText: "hover:text-amber-700",
    controlBg: "bg-[#103C34]/8",
    controlBorder: "border-[#103C34]/20",
    controlText: "text-[#103C34]",
    controlHoverBg: "hover:bg-[#103C34]/15",
    controlHoverBorder: "hover:border-amber-600/60",
    controlHoverText: "hover:text-amber-700",
    goldAccent: "#C69214",
  },
  cuisine: {
    key: "cuisine",
    label: "Brown",
    isDark: true,
    navHref: "/food",
    bgTop: "rgba(90, 48, 34, 0.82)", // #5A3022
    bgScrolled: "rgba(90, 48, 34, 0.96)",
    borderColor: "rgba(253, 248, 236, 0.22)",
    textPrimary: "text-[#FDF8EC]", // Kem
    textMuted: "text-[#FDF8EC]/80",
    activePillBg: "bg-white/18",
    activePillText: "text-[#FDF8EC]",
    activePillBorder: "border-[#FDF8EC]/30",
    activeUnderline: "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
    hoverBg: "hover:bg-white/10",
    hoverText: "hover:text-[#F5E8B8]",
    controlBg: "bg-white/10",
    controlBorder: "border-white/25",
    controlText: "text-[#FDF8EC]",
    controlHoverBg: "hover:bg-white/20",
    controlHoverBorder: "hover:border-amber-400/60",
    controlHoverText: "hover:text-amber-200",
    goldAccent: "#D4AF37",
  },
  culture: {
    key: "culture",
    label: "Navy",
    isDark: true,
    navHref: "/culture",
    bgTop: "rgba(38, 63, 85, 0.82)", // #263F55
    bgScrolled: "rgba(38, 63, 85, 0.96)",
    borderColor: "rgba(245, 232, 184, 0.22)",
    textPrimary: "text-white",
    textMuted: "text-white/80",
    activePillBg: "bg-white/18",
    activePillText: "text-white",
    activePillBorder: "border-white/25",
    activeUnderline: "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
    hoverBg: "hover:bg-white/10",
    hoverText: "hover:text-amber-200",
    controlBg: "bg-white/10",
    controlBorder: "border-white/25",
    controlText: "text-white",
    controlHoverBg: "hover:bg-white/20",
    controlHoverBorder: "hover:border-amber-400/60",
    controlHoverText: "hover:text-amber-200",
    goldAccent: "#D4AF37",
  },
  itinerary: {
    key: "itinerary",
    label: "Light Green",
    isDark: false,
    navHref: "/planner",
    bgTop: "rgba(232, 237, 230, 0.90)", // #E8EDE6
    bgScrolled: "rgba(232, 237, 230, 0.97)",
    borderColor: "rgba(16, 60, 52, 0.16)",
    textPrimary: "text-[#103C34]",
    textMuted: "text-[#103C34]/80",
    activePillBg: "bg-[#103C34]/12",
    activePillText: "text-[#103C34]",
    activePillBorder: "border-[#103C34]/25",
    activeUnderline: "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.5)]",
    hoverBg: "hover:bg-[#103C34]/8",
    hoverText: "hover:text-amber-700",
    controlBg: "bg-[#103C34]/8",
    controlBorder: "border-[#103C34]/20",
    controlText: "text-[#103C34]",
    controlHoverBg: "hover:bg-[#103C34]/15",
    controlHoverBorder: "hover:border-amber-600/60",
    controlHoverText: "hover:text-amber-700",
    goldAccent: "#C69214",
  },
  handbook: {
    key: "handbook",
    label: "Dark Green",
    isDark: true,
    navHref: "/guide",
    bgTop: "rgba(38, 60, 50, 0.82)", // #263C32
    bgScrolled: "rgba(38, 60, 50, 0.96)",
    borderColor: "rgba(245, 232, 184, 0.22)",
    textPrimary: "text-white",
    textMuted: "text-white/80",
    activePillBg: "bg-white/18",
    activePillText: "text-white",
    activePillBorder: "border-white/25",
    activeUnderline: "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
    hoverBg: "hover:bg-white/10",
    hoverText: "hover:text-amber-200",
    controlBg: "bg-white/10",
    controlBorder: "border-white/25",
    controlText: "text-white",
    controlHoverBg: "hover:bg-white/20",
    controlHoverBorder: "hover:border-amber-400/60",
    controlHoverText: "hover:text-amber-200",
    goldAccent: "#D4AF37",
  },
  about: {
    key: "about",
    label: "Ivory",
    isDark: false,
    navHref: "/about",
    bgTop: "rgba(243, 239, 228, 0.90)", // #F3EFE4
    bgScrolled: "rgba(243, 239, 228, 0.97)",
    borderColor: "rgba(16, 60, 52, 0.16)",
    textPrimary: "text-[#103C34]",
    textMuted: "text-[#103C34]/80",
    activePillBg: "bg-[#103C34]/12",
    activePillText: "text-[#103C34]",
    activePillBorder: "border-[#103C34]/25",
    activeUnderline: "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.5)]",
    hoverBg: "hover:bg-[#103C34]/8",
    hoverText: "hover:text-amber-700",
    controlBg: "bg-[#103C34]/8",
    controlBorder: "border-[#103C34]/20",
    controlText: "text-[#103C34]",
    controlHoverBg: "hover:bg-[#103C34]/15",
    controlHoverBorder: "hover:border-amber-600/60",
    controlHoverText: "hover:text-amber-700",
    goldAccent: "#C69214",
  },
};

/** Determine fallback theme based on route pathname when not on homepage */
export function getRouteDefaultTheme(basePath: string): HeaderThemeKey {
  if (basePath.startsWith("/destinations")) return "destinations";
  if (basePath.startsWith("/food")) return "cuisine";
  if (basePath.startsWith("/culture")) return "culture";
  if (basePath.startsWith("/planner") || basePath.startsWith("/map")) return "itinerary";
  if (basePath.startsWith("/guide") || basePath.startsWith("/faq")) return "handbook";
  if (basePath.startsWith("/about") || basePath.startsWith("/stories")) return "about";
  return "hero";
}
