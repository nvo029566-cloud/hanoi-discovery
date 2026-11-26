"use client";

import { useState, useRef } from "react";
import { Download, Share2, Sparkles, X, Check } from "lucide-react";
import type { Locale } from "@/i18n/locales";

export function TouristCardModal({
  title,
  subtitle,
  imageSrc,
  locale = "vi",
}: {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  locale?: Locale;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [shared, setShared] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Use Canvas to render the postcard image
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 800;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Background
      ctx.fillStyle = "#0c2825";
      ctx.fillRect(0, 0, 600, 800);

      // Gold border
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, 560, 760);

      // Image if available
      if (imageSrc) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        await new Promise((res) => {
          img.onload = res;
          img.onerror = res;
          img.src = imageSrc;
        });
        if (img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, 36, 36, 528, 440);
        }
      }

      // Card Header & Stamp
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px 'Playfair Display', serif";
      ctx.fillText(title, 40, 530);

      if (subtitle) {
        ctx.fillStyle = "#cbd5e1";
        ctx.font = "16px sans-serif";
        ctx.fillText(subtitle.slice(0, 60) + "...", 40, 565);
      }

      // Decorative divider
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(40, 600);
      ctx.lineTo(560, 600);
      ctx.stroke();

      // Stamp & Seal
      ctx.fillStyle = "#d4af37";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("★ HANOI DISCOVERY • MEMORIES OF THANG LONG ★", 40, 640);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "13px sans-serif";
      ctx.fillText(
        locale === "vi"
          ? `Ghi nhận khám phá ngày ${new Date().toLocaleDateString("vi-VN")}`
          : `Traveler Certificate • ${new Date().toLocaleDateString("en-US")}`,
        40,
        670
      );

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 13px sans-serif";
      ctx.fillText("hanoidiscovery.vn", 40, 740);

      // Trigger download
      const link = document.createElement("a");
      link.download = `hanoi-postcard-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // fallback
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: `${title} - Hà Nội, Việt Nam trên Hanoi Discovery`,
          url: window.location.href,
        });
        return;
      } catch {
        // user cancelled or fallback
      }
    }

    if (typeof window !== "undefined") {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex min-h-10 items-center gap-2 rounded-[10px] border border-border bg-surface px-4 text-xs font-semibold hover:border-primary/40 hover:text-primary transition"
      >
        <Sparkles className="size-4 text-amber-500" />
        <span>{locale === "vi" ? "Tạo bưu thiếp kỷ niệm" : "Create Travel Postcard"}</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[24px] border border-white/20 bg-gradient-to-b from-[#0c2825] to-[#061715] p-6 text-white shadow-2xl">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-secondary font-bold">
                {locale === "vi" ? "Bưu thiếp Kỹ thuật số" : "Digital Travel Postcard"}
              </span>
              <h3 className="mt-1 font-serif text-xl font-bold">{title}</h3>
            </div>

            {/* Postcard Preview */}
            <div
              ref={cardRef}
              className="mt-5 rounded-[16px] border-2 border-secondary/60 bg-[#081e1c] p-4 shadow-inner"
            >
              {imageSrc && (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageSrc} alt={title} className="h-full w-full object-cover" />
                  <div className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-secondary backdrop-blur-xs">
                    ★ HANOI
                  </div>
                </div>
              )}

              <div className="mt-4">
                <h4 className="font-serif text-lg font-bold text-white">{title}</h4>
                {subtitle && <p className="mt-1 text-xs text-white/70 line-clamp-2">{subtitle}</p>}
              </div>

              <div className="mt-4 border-t border-secondary/30 pt-3 flex items-center justify-between text-[11px] text-white/60">
                <span>{new Date().toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US")}</span>
                <span className="font-semibold text-secondary">HANOI DISCOVERY</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] bg-secondary px-4 text-xs font-bold text-[#0c2825] shadow-sm hover:opacity-90 disabled:opacity-50"
              >
                <Download className="size-4" />
                <span>
                  {downloading
                    ? locale === "vi" ? "Đang tạo ảnh..." : "Generating..."
                    : locale === "vi" ? "Tải ảnh về máy" : "Save Image"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-white/10 px-4 text-xs font-bold text-white hover:bg-white/20"
              >
                {shared ? <Check className="size-4 text-emerald-400" /> : <Share2 className="size-4" />}
                <span>
                  {shared
                    ? locale === "vi" ? "Đã copy link!" : "Copied!"
                    : locale === "vi" ? "Chia sẻ" : "Share"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
