"use client";

import { useEffect, useState } from "react";

interface ReadingProgressBarProps {
  targetId?: string;
}

export function ReadingProgressBar({ targetId = "article-content" }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const contentEl = document.getElementById(targetId);
          if (!contentEl) {
            setProgress(0);
            ticking = false;
            return;
          }

          const rect = contentEl.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const elementTop = rect.top;
          const elementHeight = rect.height;

          // Start progress when element reaches top of viewport
          const scrollableDistance = elementHeight - windowHeight * 0.5;
          if (scrollableDistance <= 0) {
            setProgress(0);
            ticking = false;
            return;
          }

          const currentScrolled = -elementTop + 100; // 100px offset for sticky header
          const percentage = Math.min(Math.max((currentScrolled / scrollableDistance) * 100, 0), 100);

          setProgress(percentage);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [targetId]);

  return (
    <div
      className="fixed top-[72px] sm:top-[80px] left-0 right-0 z-40 h-[2.5px] bg-transparent pointer-events-none"
    >
      <div
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Tiến trình đọc bài"
        className="h-full bg-[#B09255] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
