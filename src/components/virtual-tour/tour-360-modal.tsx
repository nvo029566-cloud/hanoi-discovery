"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  X,
  Compass,
  Maximize2,
  Minimize2,
  RotateCw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Info,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { localePath, type Locale } from "@/i18n/locales";

export interface Tour360Scene {
  id: string;
  nameVi: string;
  nameEn: string;
  locationVi: string;
  locationEn: string;
  imageSrc: string;
  destinationSlug: string;
  hotspots: {
    id: string;
    yaw: number; // -180 to 180 degrees
    pitch: number; // -45 to 45 degrees
    titleVi: string;
    titleEn: string;
    descVi: string;
    descEn: string;
  }[];
}

export const TOUR_360_SCENES: Tour360Scene[] = [
  {
    id: "van-mieu",
    nameVi: "Khuê Văn Các & Thiên Quang Tỉnh",
    nameEn: "Khue Van Pavilion & Well of Heavenly Clarity",
    locationVi: "Văn Miếu - Quốc Tử Giám",
    locationEn: "Temple of Literature",
    imageSrc: "/images/van-mieu.jpg",
    destinationSlug: "temple-of-literature",
    hotspots: [
      {
        id: "khue-van-cac",
        yaw: 0,
        pitch: 5,
        titleVi: "Khuê Văn Các (Gác Sao Khuê)",
        titleEn: "Khue Van Pavilion",
        descVi: "Xây dựng năm 1805, biểu tượng đỉnh cao của nền văn hiến và học vấn Thăng Long - Hà Nội.",
        descEn: "Built in 1805, the architectural emblem of Hanoi representing the star of literature and wisdom.",
      },
      {
        id: "thien-quang",
        yaw: 45,
        pitch: -15,
        titleVi: "Thiên Quang Tỉnh (Giếng Ánh Sáng Trời)",
        titleEn: "Well of Heavenly Clarity",
        descVi: "Hồ nước hình vuông tượng trưng cho đất, soi bóng Khuê Văn Các với cửa sổ tròn tượng trưng cho trời.",
        descEn: "Square pond reflecting the circular windows of Khue Van Pavilion, embodying harmony of Earth and Heaven.",
      },
      {
        id: "bia-tien-si",
        yaw: -60,
        pitch: -10,
        titleVi: "82 Bia Tiến sĩ Triều Lê - Mạc",
        titleEn: "82 Doctor Steles",
        descVi: "Di sản tư liệu thế giới UNESCO, khắc tên 1.304 vị đỗ đại khoa qua các kỳ thi đình từ năm 1442.",
        descEn: "UNESCO Memory of the World heritage steles honoring 1,304 doctoral laureates.",
      },
    ],
  },
  {
    id: "ho-hoan-kiem",
    nameVi: "Hồ Hoàn Kiếm & Cầu Thê Húc",
    nameEn: "Hoan Kiem Lake & The Huc Bridge",
    locationVi: "Quận Hoàn Kiếm, Trung tâm Hà Nội",
    locationEn: "Hoan Kiem District, City Center",
    imageSrc: "/images/hoan-kiem-lake.jpg",
    destinationSlug: "hoan-kiem-lake",
    hotspots: [
      {
        id: "the-huc",
        yaw: -10,
        pitch: 0,
        titleVi: "Cầu Thê Húc (Nơi Đón Ánh Sáng Ban Mai)",
        titleEn: "The Huc Bridge (Sunlight Bridge)",
        descVi: "Cây cầu gỗ cong màu đỏ son dẫn vào Đền Ngọc Sơn trên đảo Ngọc giữa hồ.",
        descEn: "Scarlet wooden bridge shaped like a rising sun leading to Ngoc Son Temple.",
      },
      {
        id: "thap-rua",
        yaw: 90,
        pitch: -5,
        titleVi: "Tháp Rùa Cổ Kính",
        titleEn: "Tortoise Tower",
        descVi: "Ngọn tháp soi bóng mặt nước gắn với truyền thuyết vua Lê Lợi hoàn trả gươm thần Thuận Thiên.",
        descEn: "Iconic tower in the lake center steeped in the legend of King Le Loi returning the magical sword.",
      },
    ],
  },
  {
    id: "hoang-thanh",
    nameVi: "Đoan Môn & Kỳ Đài Hà Nội",
    nameEn: "Doan Mon Gate & Hanoi Flag Tower",
    locationVi: "Hoàng Thành Thăng Long",
    locationEn: "Imperial Citadel of Thang Long",
    imageSrc: "/images/hoang-thanh.jpg",
    destinationSlug: "imperial-citadel-of-thang-long",
    hotspots: [
      {
        id: "doan-mon",
        yaw: 0,
        pitch: 2,
        titleVi: "Cổng Đoan Môn",
        titleEn: "Doan Mon Gate",
        descVi: "Cổng chính phía Nam dẫn vào Cấm thành Thăng Long thời Lê sơ, được bảo tồn nguyên vẹn.",
        descEn: "Main southern portal leading into the Forbidden City during the early Le dynasty.",
      },
      {
        id: "cot-co",
        yaw: -80,
        pitch: 15,
        titleVi: "Kỳ Đài Hà Nội (Cột Cờ)",
        titleEn: "Hanoi Flag Tower",
        descVi: "Công trình quân sự cao 33m xây dựng năm 1812, đứng vững qua các biến thiên lịch sử.",
        descEn: "Historic 33-meter military tower constructed in 1812, surviving colonial conflicts intact.",
      },
    ],
  },
  {
    id: "chua-tran-quoc",
    nameVi: "Chùa Trấn Quốc & Hồ Tây",
    nameEn: "Tran Quoc Pagoda & West Lake",
    locationVi: "Đường Thanh Niên, Quận Tây Hồ",
    locationEn: "Thanh Nien Boulevard, Tay Ho District",
    imageSrc: "/images/chua-tran-quoc.jpg",
    destinationSlug: "tran-quoc-pagoda",
    hotspots: [
      {
        id: "bao-thap",
        yaw: 0,
        pitch: 10,
        titleVi: "Bảo tháp Lục Độ Đài Sen",
        titleEn: "Six-Petal Lotus Stupa",
        descVi: "Tòa bảo tháp 11 tầng cao 15m với 66 pho tượng phật A Di Đà bằng đá quý.",
        descEn: "11-tier 15-meter stupa housing 66 gemstone Buddha statues overlooking the lake waters.",
      },
      {
        id: "cay-bo-de",
        yaw: 40,
        pitch: -5,
        titleVi: "Cây Bồ Đề Ấn Độ",
        titleEn: "Sacred Bodhi Tree",
        descVi: "Món quà Tổng thống Ấn Độ Prasat tặng Chủ tịch Hồ Chí Minh năm 1959, chiết từ cây mẹ tại Bồ Đề Đạo Tràng.",
        descEn: "Presented by Indian President Prasat to President Ho Chi Minh in 1959, grafted from Bodh Gaya.",
      },
    ],
  },
];

export function VirtualTour360Modal({
  isOpen,
  onClose,
  initialSceneId = "van-mieu",
  locale = "vi",
}: {
  isOpen: boolean;
  onClose: () => void;
  initialSceneId?: string;
  locale?: Locale;
}) {
  const isEn = locale === "en";
  const [currentSceneId, setCurrentSceneId] = useState(initialSceneId);
  const [yaw, setYaw] = useState(0); // Horizontal angle in degrees (-180 to 180)
  const [pitch, setPitch] = useState(0); // Vertical angle in degrees (-30 to 30)
  const [zoom, setZoom] = useState(1); // 1 to 2.5
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const imageObjRef = useRef<HTMLImageElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const currentScene =
    TOUR_360_SCENES.find((s) => s.id === currentSceneId) ?? TOUR_360_SCENES[0];

  // Load scene image
  useEffect(() => {
    if (!isOpen) return;
    const img = new Image();
    img.src = currentScene.imageSrc;
    img.onload = () => {
      imageObjRef.current = img;
    };
  }, [currentScene, isOpen]);

  // Handle Dragging
  const handlePointerDown = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: clientX, y: clientY };
    setIsAutoRotating(false);
  };

  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDraggingRef.current) return;
      const dx = clientX - lastMousePosRef.current.x;
      const dy = clientY - lastMousePosRef.current.y;
      lastMousePosRef.current = { x: clientX, y: clientY };

      setYaw((prev) => {
        let next = prev - dx * 0.25;
        if (next > 180) next -= 360;
        if (next < -180) next += 360;
        return next;
      });

      setPitch((prev) => {
        const next = prev + dy * 0.15;
        return Math.max(-30, Math.min(30, next));
      });
    },
    [],
  );

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localYaw = yaw;

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      // Auto rotation
      if (isAutoRotating && !isDraggingRef.current) {
        localYaw += 0.08;
        if (localYaw > 180) localYaw -= 360;
        setYaw(localYaw);
      } else {
        localYaw = yaw;
      }

      const img = imageObjRef.current;
      if (img && img.complete) {
        // Equirectangular / cylindrical mapping simulation
        const imgAspect = img.width / img.height;
        const targetHeight = height * zoom;
        const targetWidth = targetHeight * imgAspect * 1.5;

        // Yaw maps to X offset
        const normalizedYaw = ((localYaw + 180) % 360) / 360;
        const offsetX = -normalizedYaw * targetWidth + width / 2;
        const offsetY = height / 2 - targetHeight / 2 + pitch * 8;

        // Draw seamlessly with tiling
        ctx.save();
        ctx.drawImage(img, offsetX, offsetY, targetWidth, targetHeight);
        ctx.drawImage(img, offsetX - targetWidth, offsetY, targetWidth, targetHeight);
        ctx.drawImage(img, offsetX + targetWidth, offsetY, targetWidth, targetHeight);

        // Vignette & atmospheric shading
        const gradient = ctx.createRadialGradient(
          width / 2,
          height / 2,
          width * 0.2,
          width / 2,
          height / 2,
          width * 0.7,
        );
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(1, "rgba(0,0,0,0.5)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      } else {
        // Loading placeholder
        ctx.fillStyle = "#0c2825";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#d4af37";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
          isEn ? "Loading 360° Panorama..." : "Đang tải không gian toàn cảnh 360°...",
          width / 2,
          height / 2,
        );
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isOpen, isAutoRotating, yaw, pitch, zoom, isEn]);

  // Fullscreen toggle
  function toggleFullscreen() {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }

  // Calculate Screen Percentage of Hotspots
  const getHotspotPercent = (hYaw: number, hPitch: number) => {
    // Relative angle difference
    let diffYaw = hYaw - yaw;
    while (diffYaw < -180) diffYaw += 360;
    while (diffYaw > 180) diffYaw -= 360;

    // Field of view ~ 90 deg
    if (Math.abs(diffYaw) > 50) return null; // Outside viewport

    const leftPercent = 50 + (diffYaw / 45) * 50 * zoom;
    const topPercent = 50 - ((hPitch - pitch) / 30) * 50 * zoom;

    return { left: `${leftPercent}%`, top: `${topPercent}%` };
  };

  // Compass direction label
  const getCompassHeading = (deg: number) => {
    const d = (deg + 360) % 360;
    if (d >= 337.5 || d < 22.5) return "Bắc (N)";
    if (d >= 22.5 && d < 67.5) return "Đông Bắc (NE)";
    if (d >= 67.5 && d < 112.5) return "Đông (E)";
    if (d >= 112.5 && d < 157.5) return "Đông Nam (SE)";
    if (d >= 157.5 && d < 202.5) return "Nam (S)";
    if (d >= 202.5 && d < 247.5) return "Tây Nam (SW)";
    if (d >= 247.5 && d < 292.5) return "Tây (W)";
    return "Tây Bắc (NW)";
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="360 Virtual Tour"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 md:p-6 animate-in fade-in duration-300"
    >
      <div
        ref={containerRef}
        className="relative flex flex-col size-full max-w-6xl max-h-[92vh] rounded-3xl overflow-hidden bg-brand-emerald-dark border border-amber-500/30 shadow-2xl"
      >
        {/* Top Header Bar */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 md:px-6 py-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Compass className="size-5 animate-spin-slow" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-amber-500/40">
                  Virtual Tour 360°
                </span>
                <span className="text-xs text-white/70">
                  {isEn ? currentScene.locationEn : currentScene.locationVi}
                </span>
              </div>
              <h2 className="font-serif text-lg md:text-xl font-bold text-white drop-shadow">
                {isEn ? currentScene.nameEn : currentScene.nameVi}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Compass badge */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur border border-white/10 px-3 py-1 text-xs text-amber-300">
              <Compass className="size-3.5" />
              <span>{getCompassHeading(yaw)}</span>
            </div>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              title="Toàn màn hình"
            >
              {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-red-500 transition-colors"
              title="Đóng"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* 360 View Canvas */}
        <div
          className="relative flex-1 size-full cursor-grab active:cursor-grabbing select-none"
          onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
          onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
          onMouseUp={handlePointerUp}
          onTouchStart={(e) => {
            if (e.touches[0]) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchMove={(e) => {
            if (e.touches[0]) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchEnd={handlePointerUp}
        >
          <canvas ref={canvasRef} className="size-full block" />

          {/* Interactive POI Hotspots */}
          {currentScene.hotspots.map((h) => {
            const pos = getHotspotPercent(h.yaw, h.pitch);
            if (!pos) return null;
            const isSelected = activeHotspotId === h.id;

            return (
              <div
                key={h.id}
                style={{
                  position: "absolute",
                  left: pos.left,
                  top: pos.top,
                  transform: "translate(-50%, -50%)",
                }}
                className="z-10"
              >
                {/* Pulsing Hotspot Pin */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspotId(isSelected ? null : h.id);
                  }}
                  className="group relative flex size-9 items-center justify-center"
                >
                  <span className="animate-ping absolute inline-flex size-8 rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative flex size-7 items-center justify-center rounded-full bg-amber-500 text-brand-emerald-dark font-bold shadow-lg transition-transform group-hover:scale-125 border-2 border-white">
                    <Info className="size-3.5" />
                  </span>
                </button>

                {/* Hotspot Info Popup Card */}
                {isSelected && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-11 left-1/2 -translate-x-1/2 w-64 md:w-80 rounded-2xl bg-black/90 border border-amber-500/40 p-4 text-white shadow-2xl backdrop-blur-md animate-in zoom-in-95 duration-200 z-30"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold">
                        <MapPin className="size-3.5" />
                        <span>{isEn ? "Point of Interest" : "Điểm nhấn di sản"}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveHotspotId(null)}
                        className="text-white/60 hover:text-white"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>

                    <h4 className="font-serif font-bold text-sm md:text-base text-amber-200 mt-1">
                      {isEn ? h.titleEn : h.titleVi}
                    </h4>

                    <p className="text-xs text-white/80 mt-1.5 leading-relaxed">
                      {isEn ? h.descEn : h.descVi}
                    </p>

                    <div className="mt-3 pt-2 border-t border-white/10 flex justify-end">
                      <Link
                        href={localePath(locale, `/destinations/${currentScene.destinationSlug}`)}
                        onClick={onClose}
                        className="inline-flex items-center gap-1 text-xs font-medium text-amber-300 hover:text-white transition-colors"
                      >
                        <span>{isEn ? "Explore full story" : "Xem câu chuyện địa danh"}</span>
                        <ExternalLink className="size-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Floating Controls Bar */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 md:px-6 py-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          {/* Scene Switcher Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 no-scrollbar">
            {TOUR_360_SCENES.map((scene) => {
              const active = scene.id === currentSceneId;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => {
                    setCurrentSceneId(scene.id);
                    setYaw(0);
                    setPitch(0);
                    setActiveHotspotId(null);
                  }}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                    active
                      ? "bg-amber-500 text-brand-emerald-dark font-bold shadow-lg"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                  }`}
                >
                  <MapPin className="size-3" />
                  <span>{isEn ? scene.nameEn : scene.nameVi}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Tool Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Auto-rotation toggle */}
            <button
              type="button"
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                isAutoRotating
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {isAutoRotating ? <Pause className="size-3" /> : <Play className="size-3" />}
              <span className="hidden sm:inline">
                {isAutoRotating
                  ? isEn
                    ? "Pause Spin"
                    : "Tạm dừng"
                  : isEn
                    ? "Auto Spin"
                    : "Tự động quay"}
              </span>
            </button>

            {/* Zoom Controls */}
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(2, z + 0.2))}
              className="inline-flex size-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              title="Phóng to"
            >
              <ZoomIn className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
              className="inline-flex size-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              title="Thu nhỏ"
            >
              <ZoomOut className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setYaw(0);
                setPitch(0);
                setZoom(1);
              }}
              className="inline-flex size-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              title="Đặt lại góc nhìn"
            >
              <RotateCw className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
