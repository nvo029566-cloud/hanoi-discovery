"use client";

import { useSyncExternalStore } from "react";
import { WifiOff, Wifi } from "lucide-react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function getServerSnapshot() {
  return true;
}

export function OfflineIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (isOnline) {
    return null;
  }

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full bg-brand-emerald-dark/95 border border-amber-500/40 px-4 py-2.5 text-xs md:text-sm text-brand-cream shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
        <WifiOff className="size-4" aria-hidden="true" />
      </span>
      <span>
        <strong>Chế độ ngoại tuyến:</strong> Dữ liệu đã lưu vẫn sẵn sàng cho hành trình của bạn.
      </span>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium hover:bg-white/20 transition-colors"
      >
        <Wifi className="size-3" aria-hidden="true" />
        Thử lại
      </button>
    </aside>
  );
}
