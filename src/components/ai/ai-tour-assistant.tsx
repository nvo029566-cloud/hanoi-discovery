"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  X,
  Send,
  MapPin,
  Utensils,
  Calendar,
  Ticket,
  ExternalLink,
  RotateCcw,
  Minus,
} from "lucide-react";
import { sampleDestinations, sampleFoods, sampleCulture } from "@/data/sample";
import { getLocalPhoto } from "@/lib/local-photos";
import { localeFromPathname, localePath, type Locale } from "@/i18n/locales";

interface AssistantMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  cards?: {
    slug: string;
    name: string;
    type: "destination" | "food" | "culture";
    typeLabel: string;
    summary: string;
    ticketInfo?: string;
    href: string;
  }[];
  itineraryLink?: boolean;
}

const QUICK_PROMPTS_VI = [
  "🏛️ Gợi ý địa điểm tham quan tiêu biểu",
  "🍜 Gợi ý món ăn truyền thống Hà Nội",
  "🗓️ Lập lịch trình 1 ngày tinh hoa",
  "ℹ️ Giải đáp thông tin giá vé & giờ mở cửa",
  "📸 Góc check-in di sản đẹp nhất",
];

const QUICK_PROMPTS_EN = [
  "🏛️ Recommend top heritage sites to visit",
  "🍜 Top must-try traditional Hanoi dishes",
  "🗓️ Plan a perfect 1-day Hanoi itinerary",
  "ℹ️ Ticket prices & visiting hours info",
  "📸 Most photogenic heritage spots",
];

let msgCounter = 0;
function nextMsgId(): string {
  return `msg-${Date.now()}-${++msgCounter}`;
}

function getInitialWelcome(isEn: boolean): AssistantMessage[] {
  return [
    {
      id: "welcome",
      sender: "assistant",
      text: isEn
        ? "Xin chào! I am your AI Travel Assistant – Hanoi Discovery Concierge. I can assist you with top heritage attractions, culinary specialties, automated day-itineraries, or ticket prices & visiting hours!"
        : "Xin chào! Tôi là AI Travel Assistant – Trợ lý khám phá Hà Nội. Tôi có thể giúp bạn gợi ý địa điểm tham quan, món ngon truyền thống, lập lịch trình khám phá hoặc giải đáp thông tin giá vé và giờ mở cửa!",
      timestamp: "08:00",
    },
  ];
}

export function AITourAssistant({ locale }: { locale?: Locale }) {
  const pathname = usePathname();
  const currentLocale = locale ?? localeFromPathname(pathname);
  const isEn = currentLocale === "en";
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>(() => getInitialWelcome(isEn));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // AI Response Engine
  function generateAIResponse(userQuery: string): AssistantMessage {
    const q = userQuery.toLowerCase();
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // 1. One-day itinerary
    if (q.includes("1 ngày") || q.includes("lịch trình") || q.includes("itinerary") || q.includes("1-day")) {
      const picks = [
        sampleDestinations.find((d) => d.slug === "hoan-kiem-lake")!,
        sampleDestinations.find((d) => d.slug === "temple-of-literature")!,
        sampleDestinations.find((d) => d.slug === "hanoi-old-quarter")!,
      ].filter(Boolean);

      return {
        id: nextMsgId(),
        sender: "assistant",
        text: isEn
          ? "Here is a perfectly curated 1-Day Highlights Itinerary in Hanoi:\n\n• Morning (07:30 - 10:30): Stroll around Hoan Kiem Lake and visit Ngoc Son Temple, then enjoy Pho Bat Dan or Egg Coffee.\n• Afternoon (13:30 - 16:00): Explore the thousand-year Temple of Literature (Van Mieu) and 82 stone doctor steles.\n• Evening (18:00 - 21:30): Walk the 36 Old Quarter streets, watch Thang Long Water Puppet show, and enjoy Bun Cha Huong Lien."
          : "Gợi ý Lộ trình 1 ngày Khám phá Tinh hoa Thủ đô tối ưu nhất:\n\n• Buổi sáng (07:30 - 10:30): Đi dạo quanh Hồ Hoàn Kiếm, ngắm Tháp Rùa trong sương sớm, thăm Đền Ngọc Sơn và thưởng thức Phở Bát Đàn nóng hổi.\n• Buổi chiều (13:30 - 16:30): Tham quan Văn Miếu - Quốc Tử Giám, chiêm ngưỡng 82 Bia Tiến sĩ và Khuê Văn Các.\n• Buổi tối (18:00 - 21:30): Khám phá 36 phố phường, xem Múa rối nước Thăng Long và thưởng thức Cà phê trứng Giảng trứ danh.",
        timestamp: timeStr,
        itineraryLink: true,
        cards: picks.map((p) => ({
          slug: p.slug,
          name: p.name,
          type: "destination",
          typeLabel: isEn ? "Destination" : "Địa danh",
          summary: p.summary,
          ticketInfo: p.ticketInfo ?? undefined,
          href: localePath(currentLocale, `/destinations/${p.slug}`),
        })),
      };
    }

    // 2. Food / Ẩm thực
    if (q.includes("ăn") || q.includes("món") || q.includes("phở") || q.includes("food") || q.includes("dish") || q.includes("eat")) {
      const foods = sampleFoods.slice(0, 3);
      return {
        id: nextMsgId(),
        sender: "assistant",
        text: isEn
          ? "Hanoi's culinary tapestry is celebrated worldwide. Here are 3 quintessentially authentic dishes you must experience:"
          : "Ẩm thực Hà Nội là đỉnh cao của sự thanh tao và tinh tế. Dưới đây là 3 món ăn kinh điển bạn nhất định phải thử:",
        timestamp: timeStr,
        cards: foods.map((f) => ({
          slug: f.slug,
          name: f.name,
          type: "food",
          typeLabel: isEn ? "Food" : "Ẩm thực",
          summary: f.summary,
          href: localePath(currentLocale, `/food/${f.slug}`),
        })),
      };
    }

    // 3. Free attractions / Miễn phí
    if (q.includes("miễn phí") || q.includes("free") || q.includes("0đ") || q.includes("không mất tiền")) {
      const freeSpots = sampleDestinations.filter(
        (d) => d.ticketInfo && d.ticketInfo.toLowerCase().includes("miễn phí"),
      ).slice(0, 3);

      return {
        id: nextMsgId(),
        sender: "assistant",
        text: isEn
          ? "You can immerse yourself in Hanoi's rich heritage without spending on admission. Here are top free-admission landmarks:"
          : "Hà Nội có rất nhiều danh thắng lịch sử tuyệt đẹp hoàn toàn miễn phí vé vào cửa dành cho du khách:",
        timestamp: timeStr,
        cards: freeSpots.map((p) => ({
          slug: p.slug,
          name: p.name,
          type: "destination",
          typeLabel: isEn ? "Free Destination" : "Điểm miễn phí",
          summary: p.summary,
          ticketInfo: p.ticketInfo ?? undefined,
          href: localePath(currentLocale, `/destinations/${p.slug}`),
        })),
      };
    }

    // 4. Night / Buổi tối
    if (q.includes("tối") || q.includes("đêm") || q.includes("night") || q.includes("evening")) {
      const nightPicks = [
        sampleDestinations.find((d) => d.slug === "hoan-kiem-lake")!,
        sampleDestinations.find((d) => d.slug === "hanoi-old-quarter")!,
        sampleDestinations.find((d) => d.slug === "st-joseph-cathedral")!,
      ].filter(Boolean);

      return {
        id: nextMsgId(),
        sender: "assistant",
        text: isEn
          ? "Nightlife in Hanoi revolves around sparkling lakes, night markets, and live traditional street music:\n• Walk the illuminated pedestrian zone around Hoan Kiem Lake.\n• Savor Lemon tea & sunflower seeds in front of St. Joseph's Cathedral.\n• Enjoy craft beer and street bites on Ta Hien Street."
          : "Hà Nội về đêm mang vẻ đẹp lung linh và sôi động rất riêng:\n• Dạo phố đi bộ quanh Hồ Gươm ngắm Tháp Rùa lên đèn.\n• Ngồi trà chanh Nhà Thờ Lớn ngắm kiến trúc Gothic cổ kính.\n• Thưởng thức bia hơi và ẩm thực đường phố Tạ Hiện, Phố Cổ.",
        timestamp: timeStr,
        cards: nightPicks.map((p) => ({
          slug: p.slug,
          name: p.name,
          type: "destination",
          typeLabel: isEn ? "Night Spot" : "Điểm đến tối",
          summary: p.summary,
          ticketInfo: p.ticketInfo ?? undefined,
          href: localePath(currentLocale, `/destinations/${p.slug}`),
        })),
      };
    }

    // 5. Photography / Check-in / Áo dài
    if (q.includes("ảnh") || q.includes("chụp") || q.includes("photo") || q.includes("áo dài")) {
      const photoSpots = [
        sampleDestinations.find((d) => d.slug === "temple-of-literature")!,
        sampleDestinations.find((d) => d.slug === "west-lake")!,
        sampleDestinations.find((d) => d.slug === "long-bien-bridge")!,
      ].filter(Boolean);

      return {
        id: nextMsgId(),
        sender: "assistant",
        text: isEn
          ? "For stunning photography and traditional Ao Dai portraits, these iconic spots offer the most picturesque lighting and timeless backdrops:"
          : "Để có những bức ảnh kỷ niệm tuyệt đẹp với áo dài hoặc góc máy hoài cổ, đây là các tọa độ 'vàng' của Thủ đô:",
        timestamp: timeStr,
        cards: photoSpots.map((p) => ({
          slug: p.slug,
          name: p.name,
          type: "destination",
          typeLabel: isEn ? "Photo Spot" : "Điểm chụp ảnh",
          summary: p.summary,
          ticketInfo: p.ticketInfo ?? undefined,
          href: localePath(currentLocale, `/destinations/${p.slug}`),
        })),
      };
    }

    // 6. Heritage Destinations to Visit / Gợi ý địa điểm tham quan
    if (q.includes("địa điểm") || q.includes("tham quan") || q.includes("attraction") || q.includes("sight") || q.includes("heritage")) {
      const topSpots = [
        sampleDestinations.find((d) => d.slug === "imperial-citadel")!,
        sampleDestinations.find((d) => d.slug === "temple-of-literature")!,
        sampleDestinations.find((d) => d.slug === "hoan-kiem-lake")!,
      ].filter(Boolean);

      return {
        id: nextMsgId(),
        sender: "assistant",
        text: isEn
          ? "Hanoi is home to over 1,000 years of civilization. Here are the top 3 foundational heritage landmarks you must experience:"
          : "Hà Nội tự hào sở hữu nghìn năm văn hiến. Dưới đây là 3 di tích lịch sử - di sản văn hóa tiêu biểu nhất bạn không nên bỏ lỡ:",
        timestamp: timeStr,
        cards: topSpots.map((p) => ({
          slug: p.slug,
          name: p.name,
          type: "destination",
          typeLabel: isEn ? "Must-Visit" : "Điểm tiêu biểu",
          summary: p.summary,
          ticketInfo: p.ticketInfo ?? undefined,
          href: localePath(currentLocale, `/destinations/${p.slug}`),
        })),
      };
    }

    // 7. Ticket & Visiting Hours / Giải đáp thông tin giá vé & giờ mở cửa
    if (q.includes("vé") || q.includes("giờ") || q.includes("thông tin") || q.includes("ticket") || q.includes("price") || q.includes("hour")) {
      const ticketSpots = [
        sampleDestinations.find((d) => d.slug === "temple-of-literature")!,
        sampleDestinations.find((d) => d.slug === "imperial-citadel")!,
        sampleDestinations.find((d) => d.slug === "hoa-lo-prison")!,
      ].filter(Boolean);

      return {
        id: nextMsgId(),
        sender: "assistant",
        text: isEn
          ? "Key admission fees & visiting hours for major heritage sites in Hanoi:\n\n• Temple of Literature: 70,000 VND | Daily 08:00 - 17:00\n• Imperial Citadel of Thang Long: 70,000 VND | Daily 08:00 - 17:00 (Night tours available)\n• Hoa Lo Prison Relic: 50,000 VND | Daily 08:00 - 17:00\n• Ngoc Son Temple (Hoan Kiem Lake): 50,000 VND | Daily 07:00 - 18:00\n• Free admission: Hoan Kiem Lake, St. Joseph Cathedral, Long Bien Bridge, Tran Quoc Pagoda."
          : "Thông tin giá vé & giờ mở cửa tham quan một số di tích trọng điểm Thủ đô:\n\n• Văn Miếu - Quốc Tử Giám: 70.000đ/lượt (Học sinh/sinh viên: 35.000đ) | Mở cửa: 08:00 - 17:00 hàng ngày.\n• Hoàng Thành Thăng Long: 70.000đ/lượt | Mở cửa: 08:00 - 17:00 (Có tour đêm cuối tuần).\n• Di tích Nhà tù Hỏa Lò: 50.000đ/lượt | Mở cửa: 08:00 - 17:00 hàng ngày.\n• Đền Ngọc Sơn (Hồ Gươm): 50.000đ/lượt | Mở cửa: 07:00 - 18:00.\n• Điểm tham quan miễn phí vé: Hồ Hoàn Kiếm, Chùa Trấn Quốc, Cầu Long Biên, Nhà Thờ Lớn.",
        timestamp: timeStr,
        cards: ticketSpots.map((p) => ({
          slug: p.slug,
          name: p.name,
          type: "destination",
          typeLabel: isEn ? "Heritage Site" : "Di tích",
          summary: p.summary,
          ticketInfo: p.ticketInfo ?? undefined,
          href: localePath(currentLocale, `/destinations/${p.slug}`),
        })),
      };
    }

    // General keyword search fallback
    const matched = sampleDestinations.filter(
      (d) => d.name.toLowerCase().includes(q) || d.summary.toLowerCase().includes(q),
    ).slice(0, 2);

    const matchedCulture = sampleCulture.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 1);

    if (matched.length > 0 || matchedCulture.length > 0) {
      return {
        id: nextMsgId(),
        sender: "assistant",
        text: isEn
          ? `I found these destination & heritage matches related to "${userQuery}":`
          : `Tôi đã tìm thấy những thông tin phù hợp với câu hỏi của bạn về "${userQuery}":`,
        timestamp: timeStr,
        cards: [
          ...matched.map((m) => ({
            slug: m.slug,
            name: m.name,
            type: "destination" as const,
            typeLabel: isEn ? "Destination" : "Địa danh",
            summary: m.summary,
            ticketInfo: m.ticketInfo ?? undefined,
            href: localePath(currentLocale, `/destinations/${m.slug}`),
          })),
          ...matchedCulture.map((c) => ({
            slug: c.slug,
            name: c.name,
            type: "culture" as const,
            typeLabel: isEn ? "Culture" : "Di sản",
            summary: c.summary,
            href: localePath(currentLocale, `/culture/${c.slug}`),
          })),
        ],
      };
    }

    // Default polite response
    return {
      id: nextMsgId(),
      sender: "assistant",
      text: isEn
        ? `Thank you for asking about "${userQuery}". You can explore our 18 verified destinations, 12 signature dishes, or use our smart Trip Planner to customize your route.`
        : `Cảm ơn bạn đã hỏi về "${userQuery}". Bạn có thể chọn các gợi ý nhanh bên dưới, hoặc sử dụng công cụ "Lập lịch trình" để tự động tính toán thời gian và quãng đường di chuyển thuận tiện nhất!`,
      timestamp: timeStr,
      itineraryLink: true,
    };
  }

  function handleSend(textToSend?: string) {
    const text = (textToSend ?? input).trim();
    if (!text) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: AssistantMessage = {
      id: nextMsgId(),
      sender: "user",
      text,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateAIResponse(text);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 600);
  }

  const quickPrompts = isEn ? QUICK_PROMPTS_EN : QUICK_PROMPTS_VI;

  return (
    <>
      {/* 1. Minimized Icon Mode: Compact circular button */}
      {isMinimized && !isOpen && (
        <button
          type="button"
          onClick={() => {
            setIsMinimized(false);
            setIsOpen(true);
          }}
          aria-label={isEn ? "Open AI Travel Assistant" : "Mở Trợ lý khám phá Hà Nội"}
          title={isEn ? "AI Travel Assistant - Click to chat" : "AI Travel Assistant - Trợ lý khám phá Hà Nội"}
          className="fixed right-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-40 grid size-11 place-items-center rounded-full border border-amber-400/70 bg-[#0a2e2a] text-amber-300 shadow-lg transition-colors hover:border-amber-300 md:right-6 md:bottom-6"
        >
          <Sparkles className="size-5" aria-hidden="true" />
        </button>
      )}

      {/* 2. Full Floating Trigger Button: Elegant Dark-Glass Capsule */}
      {!isMinimized && !isOpen && (
        <div
          role="region"
          aria-label="AI Travel Assistant"
          className="group fixed right-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-40 inline-flex items-center gap-2.5 rounded-full border border-amber-400/50 bg-[#071f1c]/95 p-1 text-white shadow-lg transition-colors hover:border-amber-400 md:right-6 md:bottom-6 md:p-1.5 md:pr-3"
        >
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 text-left focus:outline-hidden cursor-pointer"
            aria-label={isEn ? "Open AI Travel Assistant" : "Mở Trợ lý khám phá Hà Nội"}
          >
            <span className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 group-hover:bg-amber-400 group-hover:text-stone-950 transition-all duration-300 shadow-inner">
              <Sparkles className="size-4 sm:size-5 transition-transform group-hover:rotate-12" />
            </span>
            <div className="hidden md:block">
              <div className="flex items-center gap-1.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300 leading-tight">
                  AI Travel Assistant
                </p>
              </div>
              <p className="text-xs text-white/90 font-medium leading-tight mt-0.5">
                {isEn ? "Hanoi Discovery Concierge" : "Trợ lý khám phá Hà Nội"}
              </p>
            </div>
          </button>

          {/* Minimize into single icon */}
          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            aria-label={isEn ? "Minimize to icon" : "Thu nhỏ thành biểu tượng"}
            title={isEn ? "Minimize" : "Thu nhỏ"}
            className="hidden size-6 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white md:inline-flex"
          >
            <Minus className="size-3.5" />
          </button>
        </div>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Travel Assistant"
          className="fixed right-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-50 flex h-[580px] max-h-[calc(100dvh-11rem)] w-[min(calc(100vw-2rem),420px)] flex-col overflow-hidden rounded-3xl border border-border bg-surface text-foreground shadow-2xl motion-safe:animate-in motion-safe:slide-in-from-bottom-5 md:bottom-6 md:max-h-[85dvh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-brand-emerald-dark border-b border-amber-500/30 text-brand-cream">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Sparkles className="size-4" />
              </span>
              <div>
                <h3 className="font-serif font-bold text-sm text-white">
                  AI Travel Assistant
                </h3>
                <p className="text-[10px] text-amber-300/90 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {isEn ? "Hanoi Discovery Concierge • Online 24/7" : "Trợ lý khám phá Hà Nội • Sẵn sàng 24/7"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setMessages([
                    {
                      id: "welcome-reset",
                      sender: "assistant",
                      text: isEn
                        ? "Conversation restarted. How can I help your trip today?"
                        : "Đã làm mới cuộc trò chuyện. Bạn muốn tìm hiểu về địa danh hay lịch trình nào?",
                      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    },
                  ]);
                }}
                title={isEn ? "Reset chat" : "Làm mới hội thoại"}
                className="inline-flex size-7 items-center justify-center rounded-full text-brand-cream/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <RotateCcw className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex size-7 items-center justify-center rounded-full text-brand-cream/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-background/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-sm whitespace-pre-line ${
                    m.sender === "user"
                      ? "bg-brand-emerald-dark text-brand-cream rounded-tr-none"
                      : "bg-surface border border-border text-foreground rounded-tl-none"
                  }`}
                >
                  {m.text}
                </div>

                {/* Rich Destination/Food Recommendation Cards */}
                {m.cards && m.cards.length > 0 && (
                  <div className="mt-2 w-full space-y-2">
                    {m.cards.map((card) => {
                      const photo = getLocalPhoto(card.slug);
                      return (
                        <Link
                          key={card.slug}
                          href={card.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-start gap-2.5 rounded-xl border border-border bg-surface p-2.5 hover:border-secondary transition-all"
                        >
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted border border-border">
                            {photo ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={photo.src}
                                alt={card.name}
                                className="size-full object-cover transition-transform group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex size-full items-center justify-center text-muted-foreground">
                                {card.type === "food" ? <Utensils className="size-4" /> : <MapPin className="size-4" />}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-secondary uppercase">
                                {card.typeLabel}
                              </span>
                              {card.ticketInfo && (
                                <span className="inline-flex items-center gap-0.5 rounded bg-secondary/15 px-1 py-0.2 text-[9px] font-medium text-secondary">
                                  <Ticket className="size-2.5" />
                                  {card.ticketInfo}
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs font-bold text-foreground truncate group-hover:text-secondary transition-colors">
                              {card.name}
                            </h4>
                            <p className="line-clamp-1 text-[11px] text-muted-foreground">
                              {card.summary}
                            </p>
                          </div>
                          <ExternalLink className="size-3.5 text-muted-foreground shrink-0 self-center" />
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Itinerary planner direct action */}
                {m.itineraryLink && (
                  <div className="mt-2">
                    <Link
                      href={localePath(currentLocale, "/planner")}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary/20 border border-secondary/40 px-3 py-1 text-xs font-semibold text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors"
                    >
                      <Calendar className="size-3" />
                      <span>{isEn ? "Open Trip Planner v3" : "Tạo & Tối ưu lộ trình trên bản đồ"}</span>
                      &rarr;
                    </Link>
                  </div>
                )}

                <span className="text-[10px] text-muted-foreground/60 px-1 mt-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground p-2">
                <span className="size-2 rounded-full bg-brand-emerald-dark animate-bounce"></span>
                <span className="size-2 rounded-full bg-brand-emerald-dark animate-bounce [animation-delay:0.2s]"></span>
                <span className="size-2 rounded-full bg-brand-emerald-dark animate-bounce [animation-delay:0.4s]"></span>
                <span className="ml-1 text-[11px] italic">
                  {isEn ? "AI Concierge is typing..." : "Trợ lý AI đang soạn câu trả lời..."}
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="border-t border-border bg-surface px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handleSend(p)}
                className="whitespace-nowrap rounded-full border border-border/80 bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-muted hover:border-foreground/30 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-border bg-surface p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isEn ? "Ask anything about Hanoi..." : "Hỏi về lịch trình, món ăn, giá vé..."}
              className="flex-1 bg-muted/50 rounded-xl border border-border px-3 py-2 text-xs md:text-sm outline-none focus:border-brand-emerald-dark"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-emerald-dark text-brand-cream hover:bg-brand-emerald-light transition-colors disabled:opacity-40"
              aria-label="Gửi câu hỏi"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
