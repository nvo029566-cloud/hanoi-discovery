"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Check,
  Clock,
  Copy,
  Lightbulb,
  Share2,
} from "lucide-react";
import { localePath, type Locale } from "@/i18n/locales";
import type { TravelGuideArticle } from "@/data/travel-guide-articles";
import { ReadingProgressBar } from "./reading-progress-bar";
import { ArticleTableOfContents } from "./article-table-of-contents";

interface ArticleDetailViewProps {
  article: TravelGuideArticle;
  relatedArticles: TravelGuideArticle[];
  locale?: Locale;
}

export function ArticleDetailView({
  article,
  relatedArticles,
  locale = "vi",
}: ArticleDetailViewProps) {
  const isEn = locale === "en";
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check saved state from localStorage and handle initial anchor hash
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hanoi_saved_guide_articles");
      if (saved) {
        const list: string[] = JSON.parse(saved);
        // localStorage is only readable after hydration, so state is set in the effect.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsSaved(list.includes(article.slug));
      }
    } catch {
      // Storage unavailable or disabled
    }

    // Smooth scroll to anchor if URL hash is present
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const targetId = hash === "nhung-trai-nghiem-thu-khong-the-bo-lo" ? "trai-nghiem" : hash;
      const el = document.getElementById(targetId) || document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 400);
      }
    }
  }, [article.slug]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  const handleToggleSave = () => {
    try {
      const saved = localStorage.getItem("hanoi_saved_guide_articles");
      let list: string[] = saved ? JSON.parse(saved) : [];
      if (list.includes(article.slug)) {
        list = list.filter((s) => s !== article.slug);
        setIsSaved(false);
        showToast(isEn ? "Removed from saved articles" : "Đã bỏ lưu bài viết");
      } else {
        list.push(article.slug);
        setIsSaved(true);
        showToast(
          isEn
            ? "Saved to your reading list (this device)"
            : "Đã lưu vào danh sách đọc (trên thiết bị này)",
        );
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
          title: isEn ? article.titleEn : article.titleVi,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled or unsupported
      }
    }
    handleCopyLink();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast(isEn ? "Link copied to clipboard!" : "Đã sao chép liên kết!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast(isEn ? "Failed to copy link" : "Không thể sao chép liên kết");
    }
  };

  const cycleFontSize = () => {
    setFontSize((current) => {
      if (current === "base") return "lg";
      if (current === "lg") return "sm";
      return "base";
    });
  };

  const fontClass =
    fontSize === "sm"
      ? "text-[15px] sm:text-[16px] leading-[1.8]"
      : fontSize === "lg"
        ? "text-[18px] sm:text-[19px] leading-[1.95]"
        : "text-[16px] sm:text-[17px] leading-[1.85]";

  return (
    <article className="min-h-screen bg-[#FDFCF8] text-[#34443D] selection:bg-[#B09255]/20 selection:text-[#173D33]">
      {/* 1. Thin Reading Progress Bar */}
      <ReadingProgressBar targetId="article-body-content" />

      {/* Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 rounded-[4px] bg-[#173D33] text-[#F8F6F0] px-4 py-2.5 text-[13px] shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200 flex items-center gap-2"
        >
          <span className="size-2 rounded-full bg-[#B09255]" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container - max-w-[1240px] for elegant modern editorial layout */}
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20">
        {/* =========================================================================
            2. TOP NAVIGATION: BREADCRUMB & BACK LINK
        ========================================================================= */}
        <div className="flex items-center justify-between gap-4 mb-6 text-[13px] text-[#65736C]">
          <nav aria-label={isEn ? "Breadcrumb" : "Đường dẫn trang"}>
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link
                  href={localePath(locale, "/")}
                  className="hover:text-[#173D33] transition-colors"
                >
                  {isEn ? "Home" : "Trang chủ"}
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#DED9CC]">/</li>
              <li>
                <Link
                  href={localePath(locale, "/guide")}
                  className="hover:text-[#173D33] transition-colors"
                >
                  {isEn ? "Travel Guide" : "Cẩm nang"}
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#DED9CC]">/</li>
              <li className="text-[#173D33] font-medium truncate max-w-[220px] sm:max-w-none" aria-current="page">
                {isEn ? article.categoryLabelEn : article.categoryLabelVi}
              </li>
            </ol>
          </nav>

          <Link
            href={localePath(locale, "/guide")}
            className="hidden sm:inline-flex items-center gap-1.5 text-[#173D33] hover:text-[#8A6B32] transition-colors group font-medium"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>{isEn ? "Back to Guide" : "Quay lại Cẩm nang"}</span>
          </Link>
        </div>

        {/* =========================================================================
            3. ARTICLE HEADER: CENTERED EDITORIAL HERO
        ========================================================================= */}
        <header className="text-center mb-8">
          {/* Eyebrow / Category */}
          <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#8A6B32] mb-3">
            {isEn ? article.categoryLabelEn : article.categoryLabelVi}
          </span>

          {/* H1 Main Title */}
          <h1 className="font-serif text-[30px] sm:text-[40px] lg:text-[44px] font-bold text-[#173D33] leading-[1.2] tracking-tight max-w-[840px] mx-auto">
            {isEn ? article.titleEn : article.titleVi}
          </h1>

          {/* Lead Summary */}
          <p className="mt-4 text-[16px] sm:text-[17px] text-[#65736C] leading-relaxed font-normal max-w-[720px] mx-auto">
            {isEn ? article.descriptionEn : article.descriptionVi}
          </p>

          {/* Metadata Row */}
          <div className="mt-4 flex items-center justify-center gap-3 text-[13px] text-[#65736C] flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-[#8A6B32]" />
              <span>{isEn ? article.readingTimeEn : article.readingTimeVi}</span>
            </span>
            <span aria-hidden="true" className="text-[#DED9CC]">·</span>
            <span>{isEn ? "Hanoi Travel Guide" : "Cẩm nang Hà Nội"}</span>
          </div>
        </header>

        {/* =========================================================================
            4. COVER IMAGE (Cinematic widescreen aspect ratio, reduced vertical height)
        ========================================================================= */}
        <div className="mb-8">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[380px] sm:max-h-[440px] w-full overflow-hidden rounded-[14px] sm:rounded-[18px] bg-[#FAF8F2] shadow-xs">
            <Image
              src={article.coverImage}
              alt={isEn ? article.coverImageAltEn : article.coverImageAltVi}
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              priority
              quality={95}
              className="object-cover object-[center_58%] rounded-[14px] sm:rounded-[18px]"
            />
          </div>

          {/* Caption & Integrated Actions Row */}
          <div className="mt-2.5 flex items-center justify-between text-[13px] text-[#65736C] px-0.5 gap-4">
            <p className="italic font-normal truncate">
              {isEn ? article.coverImageCaptionEn : article.coverImageCaptionVi}
            </p>

            {/* Actions: Bookmark, Share, Copy Link, Font Size */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleToggleSave}
                className={`p-1.5 rounded-[4px] hover:bg-[#EAE5D9]/60 transition-colors ${isSaved ? "text-[#8A6B32]" : "text-[#65736C] hover:text-[#173D33]"
                  }`}
                title={isSaved ? (isEn ? "Saved" : "Đã lưu") : (isEn ? "Save" : "Lưu bài viết")}
                aria-label={isSaved ? "Bỏ lưu bài viết" : "Lưu bài viết"}
              >
                {isSaved ? (
                  <BookmarkCheck className="size-4 text-[#8A6B32]" />
                ) : (
                  <Bookmark className="size-4" />
                )}
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="p-1.5 rounded-[4px] hover:bg-[#EAE5D9]/60 text-[#65736C] hover:text-[#173D33] transition-colors"
                title={isEn ? "Share" : "Chia sẻ"}
                aria-label="Chia sẻ bài viết"
              >
                <Share2 className="size-4" />
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="p-1.5 rounded-[4px] hover:bg-[#EAE5D9]/60 text-[#65736C] hover:text-[#173D33] transition-colors"
                title={isEn ? "Copy link" : "Sao chép liên kết"}
                aria-label="Sao chép liên kết"
              >
                {copied ? <Check className="size-4 text-[#8A6B32]" /> : <Copy className="size-4" />}
              </button>

              <button
                type="button"
                onClick={cycleFontSize}
                className="px-2 py-1 rounded-[4px] hover:bg-[#EAE5D9]/60 text-[#65736C] hover:text-[#173D33] transition-colors text-[12px] font-mono"
                title={isEn ? "Change font size" : "Đổi cỡ chữ"}
                aria-label="Đổi cỡ chữ"
              >
                T{fontSize === "sm" ? "A" : fontSize === "lg" ? "A++" : "A+"}
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            5. MAIN CONTENT LAYOUT (Desktop 2-Column: Left TOC / Right Body)
        ========================================================================= */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-start lg:gap-10">
          {/* Left Column: Sticky Table of Contents on Desktop, Accordion on Mobile */}
          <ArticleTableOfContents sections={article.sections} isEn={isEn} />

          {/* Right Column: Article Body */}
          <div id="article-body-content" className="flex-1 min-w-0">
            {article.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 mb-12 pb-10 border-b border-[#EAE5D9] last:border-b-0 relative"
              >
                {/* Legacy/friendly anchor support */}
                {section.id === "trai-nghiem" && (
                  <span
                    id="nhung-trai-nghiem-thu-khong-the-bo-lo"
                    className="absolute -top-28 block invisible pointer-events-none"
                    aria-hidden="true"
                  />
                )}
                {/* Section Heading */}
                <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#173D33] mb-5 leading-snug">
                  {isEn ? section.headingEn : section.headingVi}
                </h2>

                {/* Render structured blocks if defined */}
                {section.blocks && section.blocks.length > 0 ? (
                  <div className="space-y-5">
                    {section.blocks.map((block, bIdx) => {
                      if (block.type === "paragraph") {
                        return (
                          <p
                            key={bIdx}
                            className={`font-normal text-[#4F5E57] leading-[1.8] ${fontClass}`}
                          >
                            {isEn ? block.textEn : block.textVi}
                          </p>
                        );
                      }
                      if (block.type === "image") {
                        return (
                          <figure key={bIdx} className="my-6">
                            <div
                              className={`relative ${
                                block.aspectRatio || "aspect-[16/8] sm:aspect-[16/8]"
                              } max-h-[460px] w-full overflow-hidden rounded-[12px] sm:rounded-[14px] bg-[#FAF8F2] shadow-xs`}
                            >
                              <Image
                                src={block.src}
                                alt={isEn ? block.altEn : block.altVi}
                                fill
                                sizes="(max-width: 1024px) 100vw, 1200px"
                                quality={95}
                                className="object-cover object-[center_45%] rounded-[12px] sm:rounded-[14px]"
                              />
                            </div>
                            {block.captionVi && (
                              <figcaption className="mt-2 text-center text-[13px] text-[#65736C] italic font-normal">
                                {isEn ? block.captionEn : block.captionVi}
                              </figcaption>
                            )}
                          </figure>
                        );
                      }
                      if (block.type === "imageGrid") {
                        return (
                          <div
                            key={bIdx}
                            className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                          >
                            {block.images.map((img, i) => (
                              <figure key={i} className="flex flex-col">
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] sm:rounded-[12px] bg-[#FAF8F2] shadow-xs">
                                  <Image
                                    src={img.src}
                                    alt={isEn ? img.altEn : img.altVi}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 600px"
                                    quality={95}
                                    className="object-cover rounded-[10px] sm:rounded-[12px]"
                                  />
                                </div>
                                {img.captionVi && (
                                  <figcaption className="mt-1.5 text-center text-[12px] text-[#65736C] italic">
                                    {isEn ? img.captionEn : img.captionVi}
                                  </figcaption>
                                )}
                              </figure>
                            ))}
                          </div>
                        );
                      }
                      if (block.type === "callout") {
                        return (
                          <div
                            key={bIdx}
                            className="my-6 p-4 sm:p-5 rounded-[6px] bg-[#F7F5EE] border border-[#EBE7DC] flex items-start gap-3.5"
                          >
                            <Lightbulb className="size-5 text-[#8A6B32] shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-[12px] font-semibold text-[#8A6B32] uppercase tracking-wider mb-1">
                                {isEn
                                  ? block.titleEn || "Journey Note"
                                  : block.titleVi || "Ghi chú cho hành trình"}
                              </h4>
                              <p className="text-[14px] text-[#4F5E57] leading-relaxed">
                                {isEn ? block.textEn : block.textVi}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      if (block.type === "quote") {
                        return (
                          <blockquote
                            key={bIdx}
                            className="my-6 pl-5 border-l-2 border-[#8A6B32] italic text-[17px] sm:text-[18px] font-serif text-[#173D33] leading-relaxed bg-[#FAF8F2]/70 py-3 rounded-r-[3px]"
                          >
                            <p className="mb-1.5">
                              “{isEn ? block.textEn || block.textVi : block.textVi}”
                            </p>
                            {(block.authorVi || block.authorEn) && (
                              <cite className="block text-[12px] font-sans not-italic text-[#8A6B32] font-semibold tracking-wide">
                                — {isEn ? block.authorEn || block.authorVi : block.authorVi}
                              </cite>
                            )}
                          </blockquote>
                        );
                      }
                      return null;
                    })}
                  </div>
                ) : (
                  /* Fallback: Interleaved rendering for legacy sections */
                  <div className="space-y-5">
                    {section.paragraphsVi.map((_, pIdx) => {
                      const text = isEn ? section.paragraphsEn[pIdx] : section.paragraphsVi[pIdx];
                      return (
                        <div key={pIdx} className="space-y-5">
                          <p className={`font-normal text-[#4F5E57] leading-[1.8] ${fontClass}`}>
                            {text}
                          </p>

                          {/* Interleaved Callout Tip (if imageGrid also exists, show callout after p0) */}
                          {pIdx === 0 && section.calloutTipVi && section.imageGrid && (
                            <div className="my-6 p-4 sm:p-5 rounded-[6px] bg-[#F7F5EE] border border-[#EBE7DC] flex items-start gap-3.5">
                              <Lightbulb className="size-5 text-[#8A6B32] shrink-0 mt-0.5" />
                              <div>
                                <h4 className="text-[12px] font-semibold text-[#8A6B32] uppercase tracking-wider mb-1">
                                  {isEn ? "Journey Note" : "Ghi chú cho hành trình"}
                                </h4>
                                <p className="text-[14px] text-[#4F5E57] leading-relaxed">
                                  {isEn ? section.calloutTipEn : section.calloutTipVi}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Interleaved Main Image (after p0 if <= 2 paragraphs, or after p1) */}
                          {((section.paragraphsVi.length <= 2 && pIdx === 0) ||
                            (section.paragraphsVi.length > 2 && pIdx === 1)) &&
                            section.image && (
                              <figure className="my-6">
                                <div className="relative aspect-[16/8] sm:aspect-[16/8] max-h-[460px] w-full overflow-hidden rounded-[12px] sm:rounded-[14px] bg-[#FAF8F2] shadow-xs">
                                  <Image
                                    src={section.image.src}
                                    alt={isEn ? section.image.altEn : section.image.altVi}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 1200px"
                                    quality={95}
                                    className="object-cover object-[center_45%] rounded-[12px] sm:rounded-[14px]"
                                  />
                                </div>
                                {section.image.captionVi && (
                                  <figcaption className="mt-2 text-center text-[13px] text-[#65736C] italic font-normal">
                                    {isEn ? section.image.captionEn : section.image.captionVi}
                                  </figcaption>
                                )}
                              </figure>
                            )}

                          {/* Interleaved Image Grid */}
                          {pIdx === 1 && section.imageGrid && section.imageGrid.length > 0 && (
                            <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                              {section.imageGrid.map((img, i) => (
                                <figure key={i} className="flex flex-col">
                                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] sm:rounded-[12px] bg-[#FAF8F2] shadow-xs">
                                    <Image
                                      src={img.src}
                                      alt={isEn ? img.altEn : img.altVi}
                                      fill
                                      sizes="(max-width: 640px) 100vw, 600px"
                                      quality={95}
                                      className="object-cover rounded-[10px] sm:rounded-[12px]"
                                    />
                                  </div>
                                  {img.captionVi && (
                                    <figcaption className="mt-1.5 text-center text-[12px] text-[#65736C] italic">
                                      {isEn ? img.captionEn : img.captionVi}
                                    </figcaption>
                                  )}
                                </figure>
                              ))}
                            </div>
                          )}

                          {/* Interleaved Callout Tip (if no imageGrid) */}
                          {pIdx === 1 && section.calloutTipVi && !section.imageGrid && (
                            <div className="my-6 p-4 sm:p-5 rounded-[6px] bg-[#F7F5EE] border border-[#EBE7DC] flex items-start gap-3.5">
                              <Lightbulb className="size-5 text-[#8A6B32] shrink-0 mt-0.5" />
                              <div>
                                <h4 className="text-[12px] font-semibold text-[#8A6B32] uppercase tracking-wider mb-1">
                                  {isEn ? "Journey Note" : "Ghi chú cho hành trình"}
                                </h4>
                                <p className="text-[14px] text-[#4F5E57] leading-relaxed">
                                  {isEn ? section.calloutTipEn : section.calloutTipVi}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Interleaved Secondary Image */}
                          {pIdx === 2 && section.secondaryImage && (
                            <figure className="my-6">
                              <div className="relative aspect-[16/8] sm:aspect-[16/8] max-h-[460px] w-full overflow-hidden rounded-[12px] sm:rounded-[14px] bg-[#FAF8F2] shadow-xs">
                                <Image
                                  src={section.secondaryImage.src}
                                  alt={isEn ? section.secondaryImage.altEn : section.secondaryImage.altVi}
                                  fill
                                  sizes="(max-width: 1024px) 100vw, 1200px"
                                  quality={95}
                                  className="object-cover object-[center_45%] rounded-[12px] sm:rounded-[14px]"
                                />
                              </div>
                              {section.secondaryImage.captionVi && (
                                <figcaption className="mt-2 text-center text-[13px] text-[#65736C] italic font-normal">
                                  {isEn ? section.secondaryImage.captionEn : section.secondaryImage.captionVi}
                                </figcaption>
                              )}
                            </figure>
                          )}

                          {/* Pull Quote */}
                          {pIdx === Math.min(2, section.paragraphsVi.length - 1) && section.quoteVi && (
                            <blockquote className="my-6 pl-5 border-l-2 border-[#8A6B32] italic text-[17px] sm:text-[18px] font-serif text-[#173D33] leading-relaxed bg-[#FAF8F2]/70 py-3 rounded-r-[3px]">
                              <p className="mb-1.5">
                                “{isEn ? section.quoteEn?.text || section.quoteVi.text : section.quoteVi.text}”
                              </p>
                              {(section.quoteVi.author || section.quoteEn?.author) && (
                                <cite className="block text-[12px] font-sans not-italic text-[#8A6B32] font-semibold tracking-wide">
                                  — {isEn ? section.quoteEn?.author || section.quoteVi.author : section.quoteVi.author}
                                </cite>
                              )}
                            </blockquote>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            ))}

            {/* =========================================================================
                6. MENTIONED PLACES ("Những điểm dừng trong câu chuyện")
            ========================================================================= */}
            {article.mentionedPlaces && article.mentionedPlaces.length > 0 && (
              <section className="pt-6 pb-8 border-t border-[#EAE5D9]">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A6B32] mb-1">
                  {isEn ? "MENTIONED PLACES" : "NHỮNG ĐIỂM DỪNG TRONG CÂU CHUYỆN"}
                </span>
                <h3 className="font-serif text-[22px] font-bold text-[#173D33] mb-5">
                  {isEn ? "Explore mentioned destinations" : "Khám phá những địa điểm trong bài"}
                </h3>

                <div className="divide-y divide-[#EAE5D9] border-y border-[#EAE5D9]">
                  {article.mentionedPlaces.map((place) => (
                    <div
                      key={place.slug}
                      className="py-3.5 flex items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="relative size-[64px] shrink-0 overflow-hidden rounded-[10px] bg-[#FAF8F2]">
                          <Image
                            src={place.image}
                            alt={isEn ? place.nameEn : place.nameVi}
                            fill
                            sizes="64px"
                            quality={95}
                            className="object-cover rounded-[10px] transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-[15px] text-[#173D33] group-hover:text-[#8A6B32] transition-colors leading-snug">
                            <Link href={localePath(locale, place.href)}>
                              {isEn ? place.nameEn : place.nameVi}
                            </Link>
                          </h4>
                          <p className="text-[12px] text-[#65736C] mt-0.5">
                            {isEn ? place.areaEn : place.areaVi}
                          </p>
                          <Link
                            href={localePath(locale, place.href)}
                            className="inline-flex items-center gap-1 text-[12px] font-medium text-[#8A6B32] hover:underline mt-0.5"
                          >
                            <span>{isEn ? "View destination →" : "Xem địa điểm →"}</span>
                          </Link>
                        </div>
                      </div>

                      <Link
                        href={localePath(locale, place.href)}
                        aria-label={isEn ? `View ${place.nameEn}` : `Xem ${place.nameVi}`}
                        className="size-8 rounded-full border border-[#DED9CC] flex items-center justify-center text-[#65736C] group-hover:border-[#8A6B32] group-hover:text-[#8A6B32] transition-colors shrink-0"
                      >
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* =========================================================================
                7. ITINERARY CTA BANNER ("Biến câu chuyện thành chuyến đi của bạn")
            ========================================================================= */}
            <div className="mt-8 mb-12 rounded-[8px] bg-[#173D33] p-6 sm:p-8 text-white relative overflow-hidden">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B09255] mb-2">
                {isEn ? "FROM WORDS TO JOURNEY" : "TỪ TRANG VIẾT ĐẾN HÀNH TRÌNH"}
              </span>
              <h3 className="font-serif text-[22px] sm:text-[24px] font-bold text-white mb-2 leading-tight">
                {isEn ? "Turn this story into your personalized trip" : "Biến câu chuyện thành chuyến đi của bạn"}
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#A3B8B0] leading-relaxed mb-5 max-w-[560px]">
                {isEn
                  ? "Save your favorite spots from this article and automatically generate an optimized Hanoi itinerary based on your schedule."
                  : "Lưu lại những địa điểm yêu thích và tạo hành trình khám phá Hà Nội theo cách của riêng bạn."}
              </p>
              <Link
                href={localePath(locale, "/planner")}
                className="inline-flex items-center gap-2 rounded-[4px] bg-[#FAF8F2] hover:bg-white px-4 py-2.5 text-[13px] font-medium text-[#173D33] transition-all shadow-xs group"
              >
                <span>{isEn ? "Plan your itinerary now" : "Lập lịch trình ngay"}</span>
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================================================
            8. RELATED ARTICLES SECTION ("TIẾP NỐI CÂU CHUYỆN")
        ========================================================================= */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section className="mt-12 pt-10 border-t border-[#EAE5D9]">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A6B32] mb-1">
              {isEn ? "CONTINUE THE JOURNEY" : "TIẾP NỐI CÂU CHUYỆN"}
            </span>
            <h3 className="font-serif text-[22px] font-bold text-[#173D33] mb-6">
              {isEn ? "Discover more about Hanoi" : "Khám phá thêm về Hà Nội"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.slice(0, 3).map((rel) => (
                <article key={rel.id} className="group flex flex-col">
                  <Link
                    href={localePath(locale, `/guide/${rel.slug}`)}
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-[#FAF8F2] shadow-xs"
                  >
                    <Image
                      src={rel.coverImage}
                      alt={isEn ? rel.coverImageAltEn : rel.coverImageAltVi}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                      quality={95}
                      className="object-cover rounded-[12px] transition-transform duration-300 group-hover:scale-103"
                    />
                  </Link>

                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A6B32] mt-3">
                    {isEn ? rel.categoryLabelEn : rel.categoryLabelVi}
                  </span>

                  <h4 className="font-serif text-[16px] font-bold text-[#173D33] leading-snug mt-1 group-hover:text-[#8A6B32] transition-colors">
                    <Link href={localePath(locale, `/guide/${rel.slug}`)}>
                      {isEn ? rel.titleEn : rel.titleVi}
                    </Link>
                  </h4>
                </article>
              ))}
            </div>

            {/* Bottom Back Link */}
            <div className="mt-10 pt-4 border-t border-[#EAE5D9]">
              <Link
                href={localePath(locale, "/guide")}
                className="inline-flex items-center gap-1.5 text-[13px] text-[#65736C] hover:text-[#173D33] transition-colors font-medium group"
              >
                <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                <span>{isEn ? "Back to Travel Guide" : "Quay lại Cẩm nang"}</span>
              </Link>
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
