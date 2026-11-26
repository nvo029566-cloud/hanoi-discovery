"use client";

import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Mic,
  MicOff,
  X,
  Compass,
  Utensils,
  BookOpen,
  Sparkles,
  Ticket,
  Clock,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";
import { sampleDestinations, sampleFoods, sampleCulture, sampleStories } from "@/data/sample";
import {
  sampleDestinationsEn,
  sampleFoodsEn,
  sampleCultureEn,
  sampleStoriesEn,
} from "@/data/sample-en";
import { getLocalPhoto } from "@/lib/local-photos";
import { matchesQuery } from "@/lib/search";
import { localePath, type Locale } from "@/i18n/locales";

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

function subscribeSpeech() {
  return () => {};
}

function getSpeechSnapshot() {
  return typeof window !== "undefined" && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

function getSpeechServerSnapshot() {
  return false;
}

type SearchCategory = "all" | "destinations" | "food" | "culture" | "stories";

interface SearchResultItem {
  id: string;
  type: "destination" | "food" | "culture" | "story";
  typeLabelVi: string;
  typeLabelEn: string;
  title: string;
  subtitle?: string;
  summary: string;
  href: string;
  slug: string;
  ticketInfo?: string;
  openingHours?: string;
  icon: typeof Compass;
}

export function CommandPalette({
  isOpen,
  onClose,
  locale = "vi",
}: {
  isOpen: boolean;
  onClose: () => void;
  locale?: Locale;
}) {
  const router = useRouter();
  const searchInputId = useId();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<SearchCategory>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const speechSupported = useSyncExternalStore(
    subscribeSpeech,
    getSpeechSnapshot,
    getSpeechServerSnapshot,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Keyboard shortcut listener (Ctrl+K / Cmd+K)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          window.dispatchEvent(new CustomEvent("open-command-palette"));
        }
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  }, [isOpen, isListening]);

  // Build searchable index based on current locale
  const allItems: SearchResultItem[] = useMemo(() => {
    const isEn = locale === "en";

    const items: SearchResultItem[] = [];

    // Destinations
    for (const d of sampleDestinations) {
      const en = sampleDestinationsEn[d.slug];
      const title = isEn && en?.name ? en.name : d.name;
      const summary = isEn && en?.summary ? en.summary : d.summary;

      items.push({
        id: `dest-${d.slug}`,
        type: "destination",
        typeLabelVi: "Địa danh",
        typeLabelEn: "Destination",
        title,
        subtitle: d.category,
        summary,
        href: localePath(locale, `/destinations/${d.slug}`),
        slug: d.slug,
        ticketInfo: d.ticketInfo ?? undefined,
        openingHours: d.openingHours ?? undefined,
        icon: Compass,
      });
    }

    // Foods
    for (const f of sampleFoods) {
      const enSummary = sampleFoodsEn[f.slug];
      const summary = isEn && enSummary ? enSummary : f.summary;

      items.push({
        id: `food-${f.slug}`,
        type: "food",
        typeLabelVi: "Ẩm thực",
        typeLabelEn: "Food",
        title: f.name,
        subtitle: f.englishName,
        summary,
        href: localePath(locale, `/food/${f.slug}`),
        slug: f.slug,
        icon: Utensils,
      });
    }

    // Culture
    for (const c of sampleCulture) {
      const en = sampleCultureEn[c.slug];
      const title = isEn && en?.name ? en.name : c.name;
      const summary = isEn && en?.summary ? en.summary : c.summary;

      items.push({
        id: `culture-${c.slug}`,
        type: "culture",
        typeLabelVi: "Di sản văn hóa",
        typeLabelEn: "Culture",
        title,
        summary,
        href: localePath(locale, `/culture/${c.slug}`),
        slug: c.slug,
        icon: Sparkles,
      });
    }

    // Stories
    for (const s of sampleStories) {
      const en = sampleStoriesEn[s.slug];
      const title = isEn && en?.title ? en.title : s.title;
      const summary = isEn && en?.excerpt ? en.excerpt : s.excerpt;

      items.push({
        id: `story-${s.slug}`,
        type: "story",
        typeLabelVi: "Câu chuyện",
        typeLabelEn: "Story",
        title,
        summary,
        href: localePath(locale, `/stories/${s.slug}`),
        slug: s.slug,
        icon: BookOpen,
      });
    }

    return items;
  }, [locale]);

  // Filter items based on active query & category
  const filteredResults = useMemo(() => {
    const q = query.trim();
    return allItems.filter((item) => {
      // Category filter
      if (activeCategory === "destinations" && item.type !== "destination") return false;
      if (activeCategory === "food" && item.type !== "food") return false;
      if (activeCategory === "culture" && item.type !== "culture") return false;
      if (activeCategory === "stories" && item.type !== "story") return false;

      // Query filter
      if (!q) return true;
      const haystack = `${item.title} ${item.subtitle ?? ""} ${item.summary}`;
      return matchesQuery(haystack, q);
    });
  }, [allItems, query, activeCategory]);

  // Toggle Voice Search
  function toggleVoiceSearch() {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return;

    try {
      const recognition = new SpeechRec();
      recognition.lang = locale === "vi" ? "vi-VN" : "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (e: SpeechRecognitionEvent) => {
        const transcript = e.results[0]?.[0]?.transcript;
        if (transcript) {
          setQuery(transcript);
          setSelectedIndex(0);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  }

  // Handle keyboard navigation inside results
  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredResults.length ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
      e.preventDefault();
      const target = filteredResults[selectedIndex];
      router.push(target.href);
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={searchInputId}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-surface border border-border shadow-2xl animate-in zoom-in-95 duration-200 text-foreground">
        {/* Search Header Input */}
        <div className="flex items-center border-b border-border px-4 py-3 gap-3">
          <Search className="size-5 text-muted-foreground shrink-0" aria-hidden="true" />
          <input
            id={searchInputId}
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder={
              isListening
                ? locale === "vi"
                  ? "Đang lắng nghe giọng nói của bạn..."
                  : "Listening to your voice..."
                : locale === "vi"
                  ? "Tìm kiếm địa danh, món ăn, di sản hoặc câu chuyện..."
                  : "Search destinations, dishes, heritage or stories..."
            }
            className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground placeholder:italic"
          />

          {/* Voice Search Button */}
          {speechSupported && (
            <button
              type="button"
              onClick={toggleVoiceSearch}
              title={
                isListening
                  ? locale === "vi"
                    ? "Dừng tìm kiếm bằng giọng nói"
                    : "Stop voice search"
                  : locale === "vi"
                    ? "Tìm kiếm bằng giọng nói"
                    : "Voice search"
              }
              aria-label={
                isListening
                  ? locale === "vi"
                    ? "Dừng tìm kiếm bằng giọng nói"
                    : "Stop voice search"
                  : locale === "vi"
                    ? "Tìm kiếm bằng giọng nói"
                    : "Voice search"
              }
              className={`relative inline-flex size-9 items-center justify-center rounded-full transition-colors ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="size-4" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                </>
              ) : (
                <Mic className="size-4" />
              )}
            </button>
          )}

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedIndex(0);
              }}
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
              aria-label="Xóa nội dung tìm kiếm"
            >
              <X className="size-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-muted"
          >
            Esc
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/30 px-4 py-2 text-xs overflow-x-auto no-scrollbar">
          <span className="text-muted-foreground mr-1 hidden sm:inline">
            {locale === "vi" ? "Lọc:" : "Filter:"}
          </span>
          {(
            [
              { key: "all", vi: "Tất cả", en: "All" },
              { key: "destinations", vi: "Địa danh", en: "Destinations" },
              { key: "food", vi: "Ẩm thực", en: "Food" },
              { key: "culture", vi: "Di sản", en: "Culture" },
              { key: "stories", vi: "Câu chuyện", en: "Stories" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActiveCategory(tab.key);
                setSelectedIndex(0);
              }}
              className={`rounded-full px-3 py-1 font-medium transition-colors ${
                activeCategory === tab.key
                  ? "bg-brand-emerald-dark text-brand-cream"
                  : "bg-surface border border-border/80 text-muted-foreground hover:text-foreground"
              }`}
            >
              {locale === "vi" ? tab.vi : tab.en}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <Search className="mx-auto size-10 stroke-[1.5] text-muted-foreground/60 mb-2" />
              <p className="text-sm font-medium">
                {locale === "vi"
                  ? "Không tìm thấy kết quả phù hợp"
                  : "No matching results found"}
              </p>
              <p className="text-xs text-muted-foreground/80 mt-1">
                {locale === "vi"
                  ? "Hãy thử tìm: 'Hồ Hoàn Kiếm', 'Phở', 'Văn Miếu', 'Cà phê trứng'..."
                  : "Try searching: 'Hoan Kiem', 'Pho', 'Temple of Literature'..."}
              </p>
            </div>
          ) : (
            <ul className="space-y-1">
              {filteredResults.map((item, idx) => {
                const photo = getLocalPhoto(item.slug);
                const isSelected = idx === selectedIndex;
                const Icon = item.icon;

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`group flex items-start gap-3 rounded-xl p-3 transition-colors ${
                        isSelected ? "bg-muted text-foreground" : "hover:bg-muted/50"
                      }`}
                    >
                      {/* Thumbnail or Icon */}
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted border border-border">
                        {photo ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={photo.src}
                            alt={item.title}
                            className="size-full object-cover transition-transform group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center text-muted-foreground">
                            <Icon className="size-6" />
                          </div>
                        )}
                      </div>

                      {/* Content details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
                            {locale === "vi" ? item.typeLabelVi : item.typeLabelEn}
                          </span>
                          {item.ticketInfo && (
                            <span className="inline-flex items-center gap-1 rounded bg-secondary/15 px-1.5 py-0.5 text-[10px] font-medium text-secondary">
                              <Ticket className="size-2.5" />
                              {item.ticketInfo}
                            </span>
                          )}
                          {item.openingHours && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                              <Clock className="size-2.5" />
                              {item.openingHours}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-semibold truncate text-foreground group-hover:text-secondary transition-colors">
                          {item.title}
                          {item.subtitle && (
                            <span className="ml-1.5 font-normal text-xs text-muted-foreground">
                              ({item.subtitle})
                            </span>
                          )}
                        </h4>

                        <p className="line-clamp-1 text-xs text-muted-foreground mt-0.5">
                          {item.summary}
                        </p>
                      </div>

                      <div className="hidden sm:flex shrink-0 items-center self-center text-muted-foreground/60 group-hover:text-foreground">
                        <ArrowRight className="size-4" />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono">↑</kbd>
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono">↓</kbd>
              <span>{locale === "vi" ? "Di chuyển" : "Navigate"}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="inline-flex items-center rounded border border-border bg-surface px-1.5 py-0.5 font-mono">
                <CornerDownLeft className="size-2.5 mr-0.5" /> Enter
              </kbd>
              <span>{locale === "vi" ? "Chọn" : "Select"}</span>
            </span>
          </div>
          <div>
            <span>
              {filteredResults.length} {locale === "vi" ? "kết quả" : "results"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
