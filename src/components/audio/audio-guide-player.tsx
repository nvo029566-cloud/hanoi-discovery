"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Play, Pause, Square, Volume2, VolumeX, Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/locales";

function subscribe() {
  return () => {};
}

function getSpeechSupport() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function AudioGuidePlayer({
  title,
  narrative,
  locale = "vi",
}: {
  title: string;
  narrative: string;
  locale?: Locale;
}) {
  const supported = useSyncExternalStore(subscribe, getSpeechSupport, () => false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rate, setRate] = useState<number>(1);
  const [progress, setProgress] = useState(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlay = () => {
    if (!supported || typeof window === "undefined") return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare full text to speak
    const speechText = `${title}. ${narrative}`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utteranceRef.current = utterance;

    utterance.lang = locale === "vi" ? "vi-VN" : "en-US";
    utterance.rate = rate;
    utterance.volume = isMuted ? 0 : 1;

    // Pick best voice if available
    const voices = window.speechSynthesis.getVoices();
    const targetLang = locale === "vi" ? "vi" : "en";
    const voice = voices.find((v) => v.lang.startsWith(targetLang));
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onboundary = (e) => {
      if (speechText.length > 0) {
        const pct = Math.min(Math.round((e.charIndex / speechText.length) * 100), 100);
        setProgress(pct);
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 1500);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (utteranceRef.current && typeof window !== "undefined") {
      utteranceRef.current.volume = next ? 0 : 1;
    }
  };

  const handleRateChange = () => {
    const nextRate = rate === 1 ? 1.25 : rate === 1.25 ? 0.8 : 1;
    setRate(nextRate);
    if (isPlaying && typeof window !== "undefined") {
      // Re-trigger with new rate
      handleStop();
      setTimeout(handlePlay, 100);
    }
  };

  if (!supported) return null;

  return (
    <div className="rounded-[16px] border border-primary/20 bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5 p-4 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Title & Status */}
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
            <Volume2 className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {locale === "vi" ? "Thuyết minh Audio Guide" : "Audio Guide Tour"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary/30 px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground">
                <Sparkles className="size-2.5" />
                {locale === "vi" ? "Giọng đọc AI" : "AI Voice"}
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground line-clamp-1">{title}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Equalizer animation when playing */}
          {isPlaying && (
            <div className="mr-2 flex items-center gap-1" aria-hidden="true">
              <span className="h-3 w-1 animate-pulse rounded-full bg-primary" />
              <span className="h-5 w-1 animate-pulse rounded-full bg-primary delay-75" />
              <span className="h-2 w-1 animate-pulse rounded-full bg-primary delay-150" />
              <span className="h-4 w-1 animate-pulse rounded-full bg-primary delay-100" />
            </div>
          )}

          {/* Speed Button */}
          <button
            type="button"
            onClick={handleRateChange}
            className="rounded-[8px] border border-border bg-surface px-2.5 py-1.5 text-xs font-bold text-foreground hover:border-primary/40"
            title={locale === "vi" ? "Tốc độ đọc" : "Playback speed"}
          >
            {rate}x
          </button>

          {/* Mute Button */}
          <button
            type="button"
            onClick={handleToggleMute}
            className="rounded-[8px] border border-border bg-surface p-2 text-muted-foreground hover:text-foreground"
            title={isMuted ? (locale === "vi" ? "Bật âm" : "Unmute") : locale === "vi" ? "Tắt âm" : "Mute"}
          >
            {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>

          {/* Play / Pause Button */}
          {isPlaying ? (
            <button
              type="button"
              onClick={handlePause}
              className="inline-flex items-center gap-1.5 rounded-[10px] bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90"
            >
              <Pause className="size-3.5" />
              <span>{locale === "vi" ? "Tạm dừng" : "Pause"}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePlay}
              className="inline-flex items-center gap-1.5 rounded-[10px] bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90"
            >
              <Play className="size-3.5 fill-current" />
              <span>{isPaused ? (locale === "vi" ? "Tiếp tục" : "Resume") : locale === "vi" ? "Nghe thuyết minh" : "Play Audio"}</span>
            </button>
          )}

          {/* Stop Button */}
          {(isPlaying || isPaused) && (
            <button
              type="button"
              onClick={handleStop}
              className="rounded-[8px] border border-border bg-surface p-2 text-muted-foreground hover:text-foreground"
              title={locale === "vi" ? "Dừng" : "Stop"}
            >
              <Square className="size-3.5 fill-current" />
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {progress > 0 && (
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-primary/10">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
