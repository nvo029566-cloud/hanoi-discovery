"use client";

import { useState } from "react";
import { Star, ThumbsUp, MessageSquarePlus, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import { getReviewsForSlug, type ReviewItem } from "@/data/sample-reviews";

export function DestinationReviews({
  slug,
  title,
  locale = "vi",
}: {
  slug: string;
  title: string;
  locale?: Locale;
}) {
  const [userReviews, setUserReviews] = useState<ReviewItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});

  const reviews = [...userReviews, ...getReviewsForSlug(slug)];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const newRev: ReviewItem = {
      id: `custom-rev-${Date.now()}`,
      slug,
      author: author.trim(),
      country: locale === "vi" ? "Việt Nam" : "Visitor",
      rating,
      date: new Date().toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US"),
      title: reviewTitle.trim() || (locale === "vi" ? "Trải nghiệm tuyệt vời" : "Great experience"),
      content: content.trim(),
      helpfulCount: 0,
    };

    setUserReviews((prev) => [newRev, ...prev]);

    try {
      const stored = localStorage.getItem(`hanoi_reviews_${slug}`);
      const list: ReviewItem[] = stored ? JSON.parse(stored) : [];
      localStorage.setItem(`hanoi_reviews_${slug}`, JSON.stringify([newRev, ...list]));
    } catch {
      // ignore storage error
    }

    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setAuthor("");
      setReviewTitle("");
      setContent("");
    }, 2000);
  };

  const toggleHelpful = (id: string, currentCount: number) => {
    const isLiked = helpfulLiked[id];
    setHelpfulLiked((prev) => ({ ...prev, [id]: !isLiked }));
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] ?? currentCount) + (isLiked ? -1 : 1),
    }));
  };

  const avgRating = (
    reviews.reduce((acc, cur) => acc + cur.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <section
      aria-labelledby="reviews-section-title"
      className="mt-12 rounded-[20px] border border-border bg-surface p-6 shadow-sm md:p-8"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
        <div>
          <h3 id="reviews-section-title" className="font-serif text-2xl font-bold">
            {locale === "vi" ? "Đánh giá từ du khách" : "Traveler Reviews & Experiences"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {locale === "vi"
              ? `Đánh giá mẫu về ${title}. Đánh giá bạn viết được lưu trên thiết bị này.`
              : `Sample reviews for ${title}. Reviews you write are saved on this device.`}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity self-start sm:self-auto"
        >
          <MessageSquarePlus className="size-4" />
          <span>{locale === "vi" ? "Viết đánh giá" : "Write a Review"}</span>
        </button>
      </div>

      {/* Summary Score & Distribution */}
      <div className="mt-6 grid gap-6 sm:grid-cols-[12rem_1fr] items-center border-b border-border pb-8">
        <div className="flex flex-col items-center justify-center rounded-[16px] bg-background p-6 border border-border text-center">
          <span className="font-serif text-4xl font-extrabold text-foreground">{avgRating}</span>
          <div className="mt-1.5 flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-4 ${
                  i < Math.round(Number(avgRating)) ? "fill-amber-500 text-amber-500" : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className="mt-2 text-xs font-medium text-muted-foreground">
            {reviews.length} {locale === "vi" ? "lượt đánh giá" : "total reviews"}
          </span>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = reviews.filter((r) => r.rating === stars).length;
            const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
            return (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-semibold text-muted-foreground flex items-center gap-1">
                  {stars} <Star className="size-3 fill-amber-500 text-amber-500 inline" />
                </span>
                <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-muted-foreground">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inline Review Submission Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-[16px] border border-primary/30 bg-primary/5 p-6 space-y-4"
        >
          <h4 className="font-serif text-lg font-bold text-foreground">
            {locale === "vi" ? "Gửi cảm nhận chuyến đi của bạn" : "Share your experience"}
          </h4>

          {/* Star selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              {locale === "vi" ? "Điểm số bạn chọn:" : "Your rating:"}
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(s)}
                  className="p-1 text-amber-500 transition-transform hover:scale-110"
                >
                  <Star
                    className={`size-6 ${
                      (hoverRating || rating) >= s
                        ? "fill-amber-500 text-amber-500"
                        : "text-muted"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-primary">
                {rating === 5
                  ? locale === "vi" ? "Tuyệt vời!" : "Excellent!"
                  : rating === 4
                  ? locale === "vi" ? "Rất tốt" : "Very Good"
                  : rating === 3
                  ? locale === "vi" ? "Bình thường" : "Average"
                  : locale === "vi" ? "Tạm được" : "Fair"}
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                {locale === "vi" ? "Họ và tên của bạn *" : "Your Name *"}
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder={locale === "vi" ? "Ví dụ: Nguyễn Văn A" : "e.g. John Smith"}
                className="min-h-11 w-full rounded-[10px] border border-border bg-background px-3.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                {locale === "vi" ? "Tiêu đề cảm nhận" : "Review Title"}
              </label>
              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder={locale === "vi" ? "Tóm tắt ấn tượng ngắn gọn" : "Brief headline of your visit"}
                className="min-h-11 w-full rounded-[10px] border border-border bg-background px-3.5 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              {locale === "vi" ? "Chi tiết đánh giá & Lời khuyên cho du khách *" : "Your Review & Travel Tips *"}
            </label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                locale === "vi"
                  ? "Chia sẻ trải nghiệm thực tế, thời điểm ghé thăm đẹp nhất, góc chụp ảnh đẹp..."
                  : "Share your genuine experience, best time to visit, photography spots..."
              }
              className="w-full rounded-[10px] border border-border bg-background p-3.5 text-sm"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              {locale === "vi" ? "Hủy bỏ" : "Cancel"}
            </button>

            <button
              type="submit"
              disabled={submitted}
              className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 disabled:opacity-50"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="size-4" />
                  <span>{locale === "vi" ? "Đã gửi thành công!" : "Submitted!"}</span>
                </>
              ) : (
                <span>{locale === "vi" ? "Đăng nhận xét" : "Post Review"}</span>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="mt-8 space-y-6">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="rounded-[16px] border border-border/80 bg-background p-5 shadow-xs transition hover:border-primary/30"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 font-bold text-xs text-primary">
                  {r.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">{r.author}</span>
                    {r.country && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {r.country}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-muted-foreground">{r.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3.5 ${
                      i < r.rating ? "fill-amber-500 text-amber-500" : "text-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3">
              <h5 className="font-serif text-base font-bold text-foreground">{r.title}</h5>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{r.content}</p>
            </div>

            <div className="mt-4 flex items-center justify-end">
              <button
                type="button"
                onClick={() => toggleHelpful(r.id, r.helpfulCount)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                  helpfulLiked[r.id]
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-surface border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <ThumbsUp className="size-3" />
                <span>
                  {locale === "vi" ? "Hữu ích" : "Helpful"} ({helpfulCounts[r.id] ?? r.helpfulCount})
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
