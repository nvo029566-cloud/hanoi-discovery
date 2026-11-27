"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface HeritageTrailBackgroundProps {
  isEn?: boolean;
}

export function HeritageTrailBackground({ isEn = false }: HeritageTrailBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax subtle shifts
  const compassRotate = useTransform(scrollYProgress, [0, 1], [-6, 10]);
  const drumRotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const waveShift = useTransform(scrollYProgress, [0, 1], [-18, 22]);
  const sealShift = useTransform(scrollYProgress, [0, 1], [20, -15]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
    >
      {/* 1. Base Heritage Parchment Gradient (Warm, Rich Antique Paper) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F6F1E5] via-[#EFE7D5] via-50% to-[#F3ECE0]" />

      {/* 2. Soft Ambient Lighting Auras */}
      {/* Top Center Amber Aura behind the section header */}
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[min(960px,100vw)] h-[440px] rounded-full blur-3xl opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(232, 190, 105, 0.28) 0%, rgba(200, 150, 60, 0.12) 50%, transparent 75%)",
        }}
      />
      {/* Left Gutter Emerald-Forest Depth */}
      <div
        className="absolute top-[22%] -left-20 w-[540px] h-[540px] rounded-full blur-3xl opacity-75"
        style={{
          background:
            "radial-gradient(circle, rgba(29, 60, 52, 0.12) 0%, rgba(29, 60, 52, 0.04) 50%, transparent 70%)",
        }}
      />
      {/* Right Gutter Warm Heritage Gold Glow */}
      <div
        className="absolute top-[48%] -right-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-85"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 163, 68, 0.22) 0%, rgba(180, 130, 45, 0.08) 55%, transparent 70%)",
        }}
      />
      {/* Lower Left Antique Ochre Aura */}
      <div
        className="absolute top-[75%] -left-24 w-[500px] h-[500px] rounded-full blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(184, 134, 43, 0.16) 0%, transparent 68%)",
        }}
      />

      {/* 3. Handcrafted Dó Paper Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.32] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='dopaper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23dopaper)' opacity='0.42'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 4. Heritage Cartographic Coordinate Grid */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#8C6B2E_1px,transparent_1px),linear-gradient(to_bottom,#8C6B2E_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* 5. Topographic Contour Lines of the Red River (Sông Hồng uốn lượn) */}
      <motion.div
        className="absolute inset-0 w-full h-full opacity-65"
        style={reduce ? undefined : { y: waveShift }}
      >
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 2000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* River Loop 1: Upper section winding from West to East */}
          <path
            d="M -120 260 C 240 180, 520 380, 860 280 C 1180 180, 1380 340, 1580 290"
            stroke="#A37E33"
            strokeWidth="1.75"
            strokeDasharray="10 8"
            strokeOpacity="0.65"
          />
          <path
            d="M -120 285 C 250 200, 530 400, 875 300 C 1195 200, 1390 360, 1580 310"
            stroke="#8C6826"
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />

          {/* Topographic Contour Wave 2: Middle Section (Phố Cổ) */}
          <path
            d="M -80 780 C 220 680, 380 920, 720 840 C 1040 760, 1260 960, 1560 870"
            stroke="#9C772F"
            strokeWidth="2"
            strokeOpacity="0.6"
          />
          <path
            d="M -60 815 C 235 715, 395 955, 740 875 C 1060 795, 1275 995, 1560 905"
            stroke="#A88339"
            strokeWidth="1.25"
            strokeDasharray="6 6"
            strokeOpacity="0.5"
          />
          <path
            d="M -40 845 C 250 745, 410 985, 760 905 C 1080 825, 1290 1025, 1560 935"
            stroke="#8C6826"
            strokeWidth="0.8"
            strokeOpacity="0.35"
          />

          {/* Topographic Contour Wave 3: Lower Section (Văn Miếu) */}
          <path
            d="M -100 1380 C 280 1480, 580 1280, 920 1380 C 1220 1470, 1380 1320, 1580 1400"
            stroke="#9C772F"
            strokeWidth="2"
            strokeOpacity="0.55"
          />
          <path
            d="M -80 1410 C 295 1510, 595 1310, 940 1410 C 1240 1500, 1395 1350, 1580 1430"
            stroke="#A88339"
            strokeWidth="1.2"
            strokeDasharray="8 6"
            strokeOpacity="0.45"
          />

          {/* Bottom Trail Outro */}
          <path
            d="M -60 1820 C 320 1720, 680 1880, 1080 1790 C 1320 1730, 1460 1810, 1560 1780"
            stroke="#8C6826"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />
        </svg>
      </motion.div>

      {/* 6. Antique Hanoi Compass Rose (Hoa tiêu cổ Thăng Long - Upper Left Gutter) */}
      <motion.div
        className="hidden xl:block absolute top-12 left-4 2xl:left-12 w-72 h-72 text-[#8C6826]"
        style={reduce ? undefined : { rotateZ: compassRotate }}
      >
        <svg viewBox="0 0 260 260" fill="none" className="w-full h-full drop-shadow-sm">
          {/* Degree Ring Ticks */}
          <circle cx="130" cy="130" r="118" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 5" strokeOpacity="0.7" />
          <circle cx="130" cy="130" r="106" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
          <circle cx="130" cy="130" r="82" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.5" />

          {/* Axis Guidelines */}
          <line x1="130" y1="6" x2="130" y2="254" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.5" />
          <line x1="6" y1="130" x2="254" y2="130" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.5" />
          <line x1="42" y1="42" x2="218" y2="218" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 5" strokeOpacity="0.35" />
          <line x1="218" y1="42" x2="42" y2="218" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 5" strokeOpacity="0.35" />

          {/* 8-Point Compass Star with Antique Gold Gradient Fill */}
          {/* North Point */}
          <polygon points="130,20 137,123 130,130" fill="currentColor" fillOpacity="0.65" />
          <polygon points="130,20 123,123 130,130" fill="currentColor" fillOpacity="0.35" />
          {/* South Point */}
          <polygon points="130,240 123,137 130,130" fill="currentColor" fillOpacity="0.65" />
          <polygon points="130,240 137,137 130,130" fill="currentColor" fillOpacity="0.35" />
          {/* East Point */}
          <polygon points="240,130 137,137 130,130" fill="currentColor" fillOpacity="0.65" />
          <polygon points="240,130 137,123 130,130" fill="currentColor" fillOpacity="0.35" />
          {/* West Point */}
          <polygon points="20,130 123,123 130,130" fill="currentColor" fillOpacity="0.65" />
          <polygon points="20,130 123,137 130,130" fill="currentColor" fillOpacity="0.35" />

          {/* Diagonal Points (NE, NW, SE, SW) */}
          <polygon points="208,52 134,126 130,130" fill="currentColor" fillOpacity="0.45" />
          <polygon points="208,52 126,134 130,130" fill="currentColor" fillOpacity="0.22" />
          <polygon points="52,52 126,126 130,130" fill="currentColor" fillOpacity="0.45" />
          <polygon points="52,52 134,134 130,130" fill="currentColor" fillOpacity="0.22" />
          <polygon points="208,208 134,134 130,130" fill="currentColor" fillOpacity="0.45" />
          <polygon points="208,208 126,126 130,130" fill="currentColor" fillOpacity="0.22" />
          <polygon points="52,208 126,134 130,130" fill="currentColor" fillOpacity="0.45" />
          <polygon points="52,208 134,126 130,130" fill="currentColor" fillOpacity="0.22" />

          {/* Central Brass Hub */}
          <circle cx="130" cy="130" r="10" fill="#EFE7D5" stroke="currentColor" strokeWidth="2" />
          <circle cx="130" cy="130" r="4" fill="currentColor" />

          {/* Direction Letters */}
          <text x="130" y="14" textAnchor="middle" fontSize="12" fontFamily="serif" fontWeight="bold" fill="currentColor">B</text>
          <text x="252" y="134" textAnchor="middle" fontSize="12" fontFamily="serif" fontWeight="bold" fill="currentColor">Đ</text>
          <text x="130" y="254" textAnchor="middle" fontSize="12" fontFamily="serif" fontWeight="bold" fill="currentColor">N</text>
          <text x="8" y="134" textAnchor="middle" fontSize="12" fontFamily="serif" fontWeight="bold" fill="currentColor">T</text>
        </svg>

        {/* Vintage Coordinates Badge */}
        <div className="mt-3 text-center">
          <p className="text-[11px] uppercase font-mono tracking-widest text-[#8C6826] font-bold">
            21°01&apos;40&quot;N · 105°51&apos;08&quot;E
          </p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#8C6826]/80 font-serif font-semibold mt-0.5">
            {isEn ? "HANOI HERITAGE TRAIL" : "THĂNG LONG KINH KỲ"}
          </p>
        </div>
      </motion.div>

      {/* 7. Concentric Đông Sơn Bronze Drum Sunburst (Mid-Right Gutter) */}
      <motion.div
        className="hidden lg:block absolute top-[28%] -right-16 xl:-right-10 w-96 xl:w-[440px] h-96 xl:h-[440px] text-[#A68038]"
        style={reduce ? undefined : { rotateZ: drumRotate }}
      >
        <svg viewBox="0 0 360 360" fill="none" className="w-full h-full drop-shadow-sm opacity-60">
          {/* Concentric Decorative Rings */}
          <circle cx="180" cy="180" r="172" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" />
          <circle cx="180" cy="180" r="158" stroke="currentColor" strokeWidth="2" />
          <circle cx="180" cy="180" r="142" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 4" />
          <circle cx="180" cy="180" r="122" stroke="currentColor" strokeWidth="2" />
          <circle cx="180" cy="180" r="102" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="180" cy="180" r="80" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="180" cy="180" r="54" stroke="currentColor" strokeWidth="1" />

          {/* 14-Ray Central Starburst (Mặt trời 14 tia Trống đồng) */}
          {Array.from({ length: 14 }).map((_, i) => {
            const angle = (i * 360) / 14;
            const rad = (angle * Math.PI) / 180;
            const x2 = Number((180 + Math.cos(rad) * 50).toFixed(2));
            const y2 = Number((180 + Math.sin(rad) * 50).toFixed(2));
            return (
              <line
                key={`drum-ray-${i}`}
                x1="180"
                y1="180"
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            );
          })}

          {/* Traditional Geometric Pattern Ring (Circle at r=132) */}
          {Array.from({ length: 28 }).map((_, i) => {
            const angle = (i * 360) / 28;
            const rad = (angle * Math.PI) / 180;
            const x = Number((180 + Math.cos(rad) * 132).toFixed(2));
            const y = Number((180 + Math.sin(rad) * 132).toFixed(2));
            return (
              <circle
                key={`drum-dot-${i}`}
                cx={x}
                cy={y}
                r="1.75"
                fill="currentColor"
              />
            );
          })}

          {/* Outer Sun Rays at r=165 */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 360) / 36;
            const rad = (angle * Math.PI) / 180;
            const x1 = Number((180 + Math.cos(rad) * 160).toFixed(2));
            const y1 = Number((180 + Math.sin(rad) * 160).toFixed(2));
            const x2 = Number((180 + Math.cos(rad) * 170).toFixed(2));
            const y2 = Number((180 + Math.sin(rad) * 170).toFixed(2));
            return (
              <line
                key={`drum-outer-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="1.2"
              />
            );
          })}
        </svg>
      </motion.div>

      {/* 8. Antique Imperial Seal Stamp (Dấu triện Thăng Long Cổ - Lower Left Gutter) */}
      <motion.div
        className="hidden xl:flex absolute top-[62%] left-6 2xl:left-14 flex-col items-center text-[#8C6826] opacity-75"
        style={reduce ? undefined : { y: sealShift }}
      >
        <div className="w-32 h-32 border-[2.5px] border-currentColor rounded-2xl p-2 flex items-center justify-center relative bg-[#EFE7D5]/70 shadow-sm backdrop-blur-xs">
          {/* Inner frame */}
          <div className="w-full h-full border border-dashed border-currentColor rounded-xl flex flex-col items-center justify-center text-center p-1.5">
            <span className="text-[12px] font-serif font-black tracking-widest uppercase leading-none text-[#73541B]">
              THĂNG
            </span>
            <span className="text-[12px] font-serif font-black tracking-widest uppercase leading-none text-[#73541B] mt-1">
              LONG
            </span>
            <div className="my-1 h-[1.5px] w-12 bg-current opacity-70" />
            <span className="text-[9px] font-sans font-bold tracking-[0.25em] uppercase text-[#8C6826]">
              KINH KỲ
            </span>
            <span className="text-[8px] font-mono tracking-wider font-semibold opacity-85 mt-0.5">
              1010 — 2026
            </span>
          </div>

          {/* Corner decorative crosses */}
          <span className="absolute -top-1.5 -left-1 text-[10px] font-bold">+</span>
          <span className="absolute -top-1.5 -right-1 text-[10px] font-bold">+</span>
          <span className="absolute -bottom-1.5 -left-1 text-[10px] font-bold">+</span>
          <span className="absolute -bottom-1.5 -right-1 text-[10px] font-bold">+</span>
        </div>
        <span className="mt-2.5 text-[10px] uppercase tracking-[0.25em] font-serif font-bold text-[#8C6826]">
          {isEn ? "HISTORIC EMBLEM" : "DẤU ẤN VĂN HIẾN"}
        </span>
      </motion.div>

      {/* 9. Traditional Vietnamese Cloud Scroll Watermark (Vân Mây Cung Đình - Center Background) */}
      <div className="hidden md:block absolute top-[16%] right-[14%] w-48 h-24 text-[#8C6826]/35">
        <svg viewBox="0 0 160 80" fill="none" className="w-full h-full">
          <path
            d="M 20 50 Q 25 35 40 38 Q 48 20 70 26 Q 88 12 110 24 Q 130 18 140 35 Q 155 45 140 60 Q 110 65 80 58 Q 50 65 20 50 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="currentColor"
            fillOpacity="0.05"
          />
          <path
            d="M 35 48 Q 50 38 75 44 Q 95 32 120 42"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </div>
      <div className="hidden md:block absolute top-[52%] left-[12%] w-52 h-28 text-[#8C6826]/30">
        <svg viewBox="0 0 160 80" fill="none" className="w-full h-full">
          <path
            d="M 20 50 Q 25 35 40 38 Q 48 20 70 26 Q 88 12 110 24 Q 130 18 140 35 Q 155 45 140 60 Q 110 65 80 58 Q 50 65 20 50 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="currentColor"
            fillOpacity="0.04"
          />
          <path
            d="M 35 48 Q 50 38 75 44 Q 95 32 120 42"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* 10. Traditional Vietnamese Architectural Corner Brackets (Hồi văn góc chạm) */}
      <div className="hidden sm:block absolute top-6 left-6 w-20 h-20 text-[#8C6826]/50">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <path d="M 4 32 L 4 4 L 32 4 M 12 24 L 12 12 L 24 12" stroke="currentColor" strokeWidth="2" />
          <circle cx="4" cy="4" r="2.5" fill="currentColor" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <div className="hidden sm:block absolute top-6 right-6 w-20 h-20 text-[#8C6826]/50">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <path d="M 60 32 L 60 4 L 32 4 M 52 24 L 52 12 L 40 12" stroke="currentColor" strokeWidth="2" />
          <circle cx="60" cy="4" r="2.5" fill="currentColor" />
          <circle cx="52" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <div className="hidden sm:block absolute bottom-8 left-6 w-20 h-20 text-[#8C6826]/50">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <path d="M 4 32 L 4 60 L 32 60 M 12 40 L 12 52 L 24 52" stroke="currentColor" strokeWidth="2" />
          <circle cx="4" cy="60" r="2.5" fill="currentColor" />
          <circle cx="12" cy="52" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <div className="hidden sm:block absolute bottom-8 right-6 w-20 h-20 text-[#8C6826]/50">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <path d="M 60 32 L 60 60 L 32 60 M 52 40 L 52 52 L 40 52" stroke="currentColor" strokeWidth="2" />
          <circle cx="60" cy="60" r="2.5" fill="currentColor" />
          <circle cx="52" cy="52" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* 11. Architectural Landmark Skyline Outline at Bottom (Tháp Rùa · Chùa Một Cột · Khuê Văn Các · Cầu Long Biên) */}
      <div className="absolute bottom-0 inset-x-0 h-32 opacity-25 overflow-hidden flex items-end">
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full text-[#1D3C34]"
        >
          {/* Base Water Level */}
          <line x1="0" y1="114" x2="1200" y2="114" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="117" x2="1200" y2="117" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />

          {/* Long Bien Bridge Arch Trusses (Left 60 - 320) */}
          <path
            d="M 60 114 L 90 88 L 120 114 L 150 82 L 180 114 L 210 78 L 240 114 L 270 82 L 300 114"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M 60 88 L 300 82"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Turtle Tower Silhouette (Center-Left 420 - 520) */}
          <rect x="440" y="72" width="60" height="42" stroke="currentColor" strokeWidth="1.2" />
          <rect x="450" y="48" width="40" height="24" stroke="currentColor" strokeWidth="1.2" />
          <rect x="460" y="32" width="20" height="16" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 436 72 L 504 72 M 446 48 L 494 48 M 456 32 L 484 32" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 454 114 L 454 90 Q 460 84 466 90 L 466 114" stroke="currentColor" strokeWidth="1" />
          <path d="M 474 114 L 474 90 Q 480 84 486 90 L 486 114" stroke="currentColor" strokeWidth="1" />

          {/* One Pillar Pagoda Silhouette (Center 680 - 750) */}
          <line x1="715" y1="65" x2="715" y2="114" stroke="currentColor" strokeWidth="3.5" />
          <polygon points="692,65 738,65 744,48 686,48" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 680 48 Q 715 32 750 48" stroke="currentColor" strokeWidth="1.5" />

          {/* Khue Van Cac Pavilion Silhouette (Right segment 860 - 980) */}
          <line x1="890" y1="62" x2="890" y2="114" stroke="currentColor" strokeWidth="2" />
          <line x1="910" y1="62" x2="910" y2="114" stroke="currentColor" strokeWidth="2" />
          <line x1="930" y1="62" x2="930" y2="114" stroke="currentColor" strokeWidth="2" />
          <line x1="950" y1="62" x2="950" y2="114" stroke="currentColor" strokeWidth="2" />
          <rect x="880" y="40" width="80" height="22" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="920" cy="51" r="7.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 870 40 Q 920 26 970 40" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 884 26 Q 920 16 956 26" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Top and Bottom Section Boundary Blends */}
      <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#F9F7F1]/90 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#F3ECE0] to-transparent" />
    </div>
  );
}
