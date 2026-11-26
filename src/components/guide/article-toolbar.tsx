"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, Share2, Copy, Check, Type } from "lucide-react";

interface ArticleToolbarProps {
  slug: string;
  title: string;
  isEn?: boolean;
  onFontSizeChange?: (size: "sm" | "base" | "lg") => void;
}

export function ArticleToolbar({
  slug,
  title,
  isEn = false,
  onFontSizeChange,
}: ArticleToolbarProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check saved state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hanoi_saved_guide_articles");
      if (saved) {
        const list: string[] = JSON.parse(saved);
        // localStorage is only readable after hydration, so state is set in the effect.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsSaved(list.includes(slug));
      }
    } catch {
      // Storage unavailable or disabled
    }
  }, [slug]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleSave = () => {
    try {
      const saved = localStorage.getItem("hanoi_saved_guide_articles");
      let list: string[] = saved ? JSON.parse(saved) : [];
      if (list.includes(slug)) {
        list = list.filter((s) => s !== slug);
        setIsSaved(false);
        showToast(isEn ? "Removed from saved articles" : "Đã bỏ lưu bài viết");
      } else {
        list.push(slug);
        setIsSaved(true);
        showToast(isEn ? "Saved to your reading list (this device)" : "Đã lưu vào danh sách đọc (trên thiết bị này)");
      }
      localStorage.setItem("hanoi_saved_guide_articles", JSON.stringify(list));
    } catch {
      showToast(isEn ? "Unable to access local storage" : "Không thể truy cập bộ nhớ thiết bị");
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled or unsupported
      }
    }
    // Fallback: copy link
    handleCopyLink();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast(isEn ? "Link copied to clipboard!" : "Đã sao chép liên kết vào bộ nhớ tạm!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast(isEn ? "Failed to copy link" : "Không thể sao chép liên kết");
    }
  };

  const cycleFontSize = () => {
    const nextSize = fontSize === "sm" ? "base" : fontSize === "base" ? "lg" : "sm";
    setFontSize(nextSize);
    onFontSizeChange?.(nextSize);
    showToast(
      isEn
        ? `Font size: ${nextSize === "sm" ? "Standard" : nextSize === "base" ? "Medium" : "Large"}`
        : `Cỡ chữ: ${nextSize === "sm" ? "Tiêu chuẩn" : nextSize === "base" ? "Vừa" : "Lớn"}`,
    );
  };

  return (
    <div className="relative my-6 py-3 border-y border-[#DED9CC]/80 flex items-center justify-between text-[#65736C]">
      {/* Left: Quick Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Bookmark */}
        <button
          type="button"
          onClick={handleToggleSave}
          aria-label={isSaved ? (isEn ? "Remove bookmark" : "Bỏ lưu bài viết") : (isEn ? "Bookmark article" : "Lưu bài viết")}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33] ${
            isSaved
              ? "bg-[#173D33] text-[#FAF8F2]"
              : "bg-[#FAF8F2] hover:bg-[#F3F0E7] text-[#173D33]"
          }`}
        >
          {isSaved ? <BookmarkCheck className="size-3.5 text-[#B09255]" /> : <Bookmark className="size-3.5" />}
          <span>{isSaved ? (isEn ? "Saved" : "Đã lưu") : (isEn ? "Save" : "Lưu bài")}</span>
        </button>

        {/* Share */}
        <button
          type="button"
          onClick={handleShare}
          aria-label={isEn ? "Share this article" : "Chia sẻ bài viết"}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-[13px] font-medium bg-[#FAF8F2] hover:bg-[#F3F0E7] text-[#173D33] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33]"
        >
          <Share2 className="size-3.5" />
          <span>{isEn ? "Share" : "Chia sẻ"}</span>
        </button>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          aria-label={isEn ? "Copy article URL" : "Sao chép liên kết"}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-[13px] font-medium bg-[#FAF8F2] hover:bg-[#F3F0E7] text-[#173D33] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33]"
        >
          {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
          <span>{copied ? (isEn ? "Copied" : "Đã chép") : (isEn ? "Copy link" : "Sao chép")}</span>
        </button>
      </div>

      {/* Right: Text Size Adjuster */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={cycleFontSize}
          aria-label={isEn ? "Adjust reading font size" : "Điều chỉnh kích thước chữ đọc"}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[4px] text-[13px] font-medium hover:text-[#173D33] hover:bg-[#FAF8F2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33]"
        >
          <Type className="size-3.5 text-[#8A6B32]" />
          <span className="uppercase text-[11px] font-mono tracking-wider">
            {fontSize === "sm" ? "A" : fontSize === "base" ? "A+" : "A++"}
          </span>
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-[#173D33] px-3.5 py-1.5 text-[12px] font-medium text-[#FAF8F2] shadow-md transition-all duration-200 z-30"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
