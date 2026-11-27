"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface WhyChooseUsBackgroundProps {
  isEn?: boolean;
}

export function WhyChooseUsBackground({ isEn = false }: WhyChooseUsBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax subtle shifts during continuous scrolling
  const lotusRotate = useTransform(scrollYProgress, [0, 1], [-12, 18]);
  const starShift = useTransform(scrollYProgress, [0, 1], [-15, 20]);
  const soundWaveShift = useTransform(scrollYProgress, [0, 1], [18, -14]);
  const constellationShift = useTransform(scrollYProgress, [0, 1], [-10, 15]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
    >
      {/* 1. Base Rich Emerald Forest Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A221C] via-[#102C25] via-50% to-[#0C241E]" />

      {/* 2. Atmospheric Ambient Light Radiance */}
      {/* Top Center Amber Aura illuminating the section title */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 0.85, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[min(940px,100vw)] h-[440px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(232, 199, 123, 0.25) 0%, rgba(200, 155, 65, 0.09) 50%, transparent 75%)",
        }}
      />
      {/* Upper Left Deep Forest-Cyan Aura */}
      <div
        className="absolute top-[18%] -left-28 w-[560px] h-[560px] rounded-full blur-3xl opacity-75"
        style={{
          background:
            "radial-gradient(circle, rgba(46, 92, 78, 0.28) 0%, rgba(29, 60, 52, 0.08) 55%, transparent 72%)",
        }}
      />
      {/* Lower Right Heritage Gold Aura */}
      <div
        className="absolute top-[45%] -right-24 w-[620px] h-[620px] rounded-full blur-3xl opacity-75"
        style={{
          background:
            "radial-gradient(circle, rgba(232, 199, 123, 0.16) 0%, rgba(184, 138, 53, 0.06) 55%, transparent 72%)",
        }}
      />
      {/* Center Soft Depth behind cards */}
      <div
        className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[min(1100px,100vw)] h-[480px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 77, 65, 0.45) 0%, transparent 70%)",
        }}
      />

      {/* 3. Subtle Handcrafted Fiber/Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='forestGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23forestGrain)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 4. Fine Golden Celestial Grid */}
      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#E8C77B_1px,transparent_1px),linear-gradient(to_bottom,#E8C77B_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* 5. Celestial Waypoint & Constellation Flow across background */}
      <motion.div
        className="absolute inset-0 w-full h-full opacity-45"
        style={reduce ? undefined : { y: constellationShift }}
      >
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 1200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Constellation Trajectory Curves with progressive draw-in */}
          <motion.path
            d="M -100 240 C 260 160, 560 360, 920 220 C 1220 110, 1380 280, 1560 220"
            stroke="#E8C77B"
            strokeWidth="1.2"
            strokeDasharray="8 8"
            strokeOpacity="0.6"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          <motion.path
            d="M -80 620 C 240 720, 520 540, 880 660 C 1180 760, 1380 580, 1560 680"
            stroke="#E8C77B"
            strokeWidth="1"
            strokeDasharray="4 6"
            strokeOpacity="0.4"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}
          />
          <motion.path
            d="M -60 980 C 320 880, 680 1060, 1080 940 C 1320 860, 1460 960, 1560 920"
            stroke="#E8C77B"
            strokeWidth="1.2"
            strokeOpacity="0.35"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.35, ease: "easeInOut" }}
          />

          {/* Golden Waypoint Star Nodes */}
          <circle cx="260" cy="160" r="3.5" fill="#E8C77B" fillOpacity="0.75" />
          <circle cx="260" cy="160" r="7" stroke="#E8C77B" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="2 2" />
          <circle cx="920" cy="220" r="4" fill="#F7D78A" fillOpacity="0.85" />
          <circle cx="920" cy="220" r="8" stroke="#F7D78A" strokeWidth="0.8" strokeOpacity="0.4" />
          <circle cx="520" cy="540" r="3" fill="#E8C77B" fillOpacity="0.6" />
          <circle cx="880" cy="660" r="3.5" fill="#E8C77B" fillOpacity="0.7" />
          <circle cx="1080" cy="940" r="4" fill="#F7D78A" fillOpacity="0.8" />
        </svg>
      </motion.div>

      {/* 6. Sao Khuê Constellation & Celestial Astrolabe (Chòm Sao Khuê · Thăng Long - Upper Left Gutter) */}
      <motion.div
        className="hidden xl:block absolute top-10 left-4 2xl:left-12 w-72 h-72 text-[#E8C77B]"
        initial={reduce ? false : { opacity: 0, scale: 0.8, x: -20 }}
        whileInView={{ opacity: 0.85, scale: 1, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={reduce ? undefined : { y: starShift }}
      >
        <svg viewBox="0 0 260 260" fill="none" className="w-full h-full drop-shadow-sm">
          {/* Celestial Coordinate Rings */}
          <circle cx="130" cy="130" r="118" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 6" strokeOpacity="0.6" />
          <circle cx="130" cy="130" r="102" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="130" cy="130" r="74" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" strokeOpacity="0.4" />

          {/* Coordinate Crosshairs */}
          <line x1="130" y1="8" x2="130" y2="252" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" strokeOpacity="0.4" />
          <line x1="8" y1="130" x2="252" y2="130" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" strokeOpacity="0.4" />

          {/* Chòm Sao Khuê (The 4 bright diamond stars of Sao Khuê asterism) */}
          <motion.polygon
            points="70,90 145,55 195,115 130,175"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            fill="currentColor"
            fillOpacity="0.08"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: 0.25, ease: "easeOut" }}
          />
          <line x1="70" y1="90" x2="195" y2="115" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 3" strokeOpacity="0.3" />
          <line x1="145" y1="55" x2="130" y2="175" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 3" strokeOpacity="0.3" />

          {/* Star 1: Alpha Khuê */}
          <motion.circle
            cx="70"
            cy="90"
            r="4.5"
            fill="#FFF2D1"
            initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 350, damping: 20, delay: 0.3 }}
          />
          <circle cx="70" cy="90" r="9" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />

          {/* Star 2: Beta Khuê */}
          <motion.circle
            cx="145"
            cy="55"
            r="5"
            fill="#FFF2D1"
            initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 350, damping: 20, delay: 0.4 }}
          />
          <circle cx="145" cy="55" r="11" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7" />

          {/* Star 3: Gamma Khuê */}
          <motion.circle
            cx="195"
            cy="115"
            r="4"
            fill="#FFF2D1"
            initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 350, damping: 20, delay: 0.5 }}
          />
          <circle cx="195" cy="115" r="8" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />

          {/* Star 4: Delta Khuê */}
          <motion.circle
            cx="130"
            cy="175"
            r="4.5"
            fill="#FFF2D1"
            initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 350, damping: 20, delay: 0.6 }}
          />
          <circle cx="130" cy="175" r="9" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />

          {/* Central Polaris Star Symbol */}
          <path d="M 130 115 L 132 128 L 145 130 L 132 132 L 130 145 L 128 132 L 115 130 L 128 128 Z" fill="#FFE8A3" />
        </svg>

        {/* Constellation Label (Displayed when gutter has ample space) */}
        <div className="mt-2 text-center hidden 2xl:block">
          <p className="text-[11px] uppercase font-mono tracking-widest text-[#E8C77B] font-bold">
            SAO KHUÊ · TRI THỨC THĂNG LONG
          </p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#E8C77B]/75 font-serif font-semibold mt-0.5">
            {isEn ? "CELESTIAL GUIDANCE" : "ĐỊNH VỊ HÀNH TRÌNH"}
          </p>
        </div>
      </motion.div>

      {/* 7. Imperial Thăng Long Lotus Mandala (Hoa Sen Bách Diệp Hoàng Thành - Upper Right Gutter) */}
      <motion.div
        className="hidden lg:block absolute top-[12%] -right-16 xl:-right-10 w-96 xl:w-[420px] h-96 xl:h-[420px] text-[#E8C77B]"
        initial={reduce ? false : { opacity: 0, scale: 0.65, rotate: -30 }}
        whileInView={{ opacity: 0.75, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        style={reduce ? undefined : { rotateZ: lotusRotate }}
      >
        <svg viewBox="0 0 360 360" fill="none" className="w-full h-full drop-shadow-md">
          {/* Outer Concentric Rings */}
          <circle cx="180" cy="180" r="170" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" strokeOpacity="0.7" />
          <circle cx="180" cy="180" r="156" stroke="currentColor" strokeWidth="1.8" strokeOpacity="0.6" />
          <circle cx="180" cy="180" r="138" stroke="currentColor" strokeWidth="1" strokeDasharray="5 3" strokeOpacity="0.5" />
          <circle cx="180" cy="180" r="116" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
          <circle cx="180" cy="180" r="82" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
          <circle cx="180" cy="180" r="50" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />

          {/* 16 Imperial Lotus Petals (Hoa Sen Cung Đình thời Lý - Trần) */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <g key={`petal-${i}`} transform={`rotate(${angle} 180 180)`}>
                {/* Outer Petal Arch */}
                <path
                  d="M 180 64 C 170 95, 172 116, 180 116 C 188 116, 190 95, 180 64 Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="currentColor"
                  fillOpacity="0.12"
                />
                {/* Petal Inner Vein */}
                <line x1="180" y1="70" x2="180" y2="114" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
                {/* Small Pearl Tip */}
                <circle cx="180" cy="62" r="2" fill="currentColor" fillOpacity="0.9" />
              </g>
            );
          })}

          {/* 8 Inner Seedpod Petals */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8 + 22.5;
            return (
              <g key={`inner-petal-${i}`} transform={`rotate(${angle} 180 180)`}>
                <path
                  d="M 180 100 C 174 120, 175 130, 180 130 C 185 130, 186 120, 180 100 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="currentColor"
                  fillOpacity="0.18"
                />
              </g>
            );
          })}

          {/* Central Lotus Seedpod (Gương Sen) */}
          <circle cx="180" cy="180" r="32" fill="#0E2822" stroke="currentColor" strokeWidth="2" />
          {/* 8 Sacred Jewels in Seedpod */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            const rad = (angle * Math.PI) / 180;
            const x = Number((180 + Math.cos(rad) * 18).toFixed(2));
            const y = Number((180 + Math.sin(rad) * 18).toFixed(2));
            return (
              <circle
                key={`seed-${i}`}
                cx={x}
                cy={y}
                r="3.5"
                fill="#F7D78A"
              />
            );
          })}
          <circle cx="180" cy="180" r="5" fill="#FFE8A3" />
        </svg>
      </motion.div>

      {/* 8. Acoustic Resonance Waves & Audio Storytelling Emblem (Lower Left Gutter) */}
      <motion.div
        className="hidden xl:flex absolute bottom-12 left-6 2xl:left-14 flex-col items-center text-[#E8C77B]"
        initial={reduce ? false : { opacity: 0, scale: 0.75, y: 30 }}
        whileInView={{ opacity: 0.8, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={reduce ? undefined : { y: soundWaveShift }}
      >
        <div className="w-64 h-56 relative flex items-center justify-center">
          <svg viewBox="0 0 240 200" fill="none" className="w-full h-full">
            {/* Concentric Expanding Audio Soundwaves */}
            <circle cx="120" cy="100" r="88" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.5" />
            <circle cx="120" cy="100" r="72" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
            <circle cx="120" cy="100" r="56" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" strokeOpacity="0.7" />
            <circle cx="120" cy="100" r="40" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
            <circle cx="120" cy="100" r="24" stroke="currentColor" strokeWidth="1.8" />

            {/* Sound Wave Pulses (Left and Right Arcs) */}
            <path d="M 68 84 Q 58 100 68 116" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 52 74 Q 38 100 52 126" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />
            <path d="M 172 84 Q 182 100 172 116" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 188 74 Q 202 100 188 126" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />

            {/* Central Audio Story Badge */}
            <circle cx="120" cy="100" r="16" fill="#0C241E" stroke="currentColor" strokeWidth="2" />
            {/* Animated Audio Waveform Bars in center */}
            <motion.line
              x1="112"
              y1="104"
              x2="112"
              y2="96"
              stroke="#F7D78A"
              strokeWidth="2"
              strokeLinecap="round"
              animate={reduce ? undefined : { y1: [104, 102, 104], y2: [96, 98, 96] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            />
            <motion.line
              x1="116"
              y1="108"
              x2="116"
              y2="92"
              stroke="#F7D78A"
              strokeWidth="2"
              strokeLinecap="round"
              animate={reduce ? undefined : { y1: [108, 105, 108], y2: [92, 95, 92] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.line
              x1="120"
              y1="111"
              x2="120"
              y2="89"
              stroke="#FFE8A3"
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={reduce ? undefined : { y1: [111, 107, 111], y2: [89, 93, 89] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: 0.1 }}
            />
            <motion.line
              x1="124"
              y1="108"
              x2="124"
              y2="92"
              stroke="#F7D78A"
              strokeWidth="2"
              strokeLinecap="round"
              animate={reduce ? undefined : { y1: [108, 105, 108], y2: [92, 95, 92] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.35 }}
            />
            <motion.line
              x1="128"
              y1="104"
              x2="128"
              y2="96"
              stroke="#F7D78A"
              strokeWidth="2"
              strokeLinecap="round"
              animate={reduce ? undefined : { y1: [104, 102, 104], y2: [96, 98, 96] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.15 }}
            />
          </svg>
        </div>

        {/* Audio storytelling caption (Displayed when gutter has ample space) */}
        <div className="-mt-3 text-center hidden 2xl:block">
          <p className="text-[11px] uppercase font-mono tracking-widest text-[#E8C77B] font-bold">
            ÂM VANG DI SẢN · 360° AUDIO
          </p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#E8C77B]/75 font-serif font-semibold mt-0.5">
            {isEn ? "LIVING STORYTELLING" : "CHẠM VÀO TỪNG CÂU CHUYỆN"}
          </p>
        </div>
      </motion.div>

      {/* 9. Traditional Vietnamese Court Cloud Ribbons (Vân Mây Cung Đình - Center Background) */}
      <div className="hidden md:block absolute top-[14%] right-[16%] w-52 h-24 text-[#E8C77B]/25">
        <svg viewBox="0 0 160 80" fill="none" className="w-full h-full">
          <path
            d="M 20 48 Q 28 30 46 34 Q 56 16 80 22 Q 100 8 124 20 Q 146 14 156 32 Q 172 44 156 60 Q 124 66 90 58 Q 56 66 20 48 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            fill="currentColor"
            fillOpacity="0.04"
          />
          <path
            d="M 38 46 Q 56 34 84 40 Q 106 28 134 38"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </div>
      <div className="hidden md:block absolute top-[68%] right-[12%] w-56 h-28 text-[#E8C77B]/20">
        <svg viewBox="0 0 160 80" fill="none" className="w-full h-full">
          <path
            d="M 20 48 Q 28 30 46 34 Q 56 16 80 22 Q 100 8 124 20 Q 146 14 156 32 Q 172 44 156 60 Q 124 66 90 58 Q 56 66 20 48 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            fill="currentColor"
            fillOpacity="0.03"
          />
          <path
            d="M 38 46 Q 56 34 84 40 Q 106 28 134 38"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* 10. Imperial Vietnamese Architectural Corner Brackets (Hồi văn Cung đình góc chạm) */}
      <div className="hidden sm:block absolute top-6 left-6 w-20 h-20 text-[#E8C77B]/45">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <path d="M 4 32 L 4 4 L 32 4 M 12 24 L 12 12 L 24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="4" cy="4" r="2.5" fill="currentColor" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <div className="hidden sm:block absolute top-6 right-6 w-20 h-20 text-[#E8C77B]/45">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <path d="M 60 32 L 60 4 L 32 4 M 52 24 L 52 12 L 40 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="60" cy="4" r="2.5" fill="currentColor" />
          <circle cx="52" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <div className="hidden sm:block absolute bottom-8 left-6 w-20 h-20 text-[#E8C77B]/45">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <path d="M 4 32 L 4 60 L 32 60 M 12 40 L 12 52 L 24 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="4" cy="60" r="2.5" fill="currentColor" />
          <circle cx="12" cy="52" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <div className="hidden sm:block absolute bottom-8 right-6 w-20 h-20 text-[#E8C77B]/45">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <path d="M 60 32 L 60 60 L 32 60 M 52 40 L 52 52 L 40 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="60" cy="60" r="2.5" fill="currentColor" />
          <circle cx="52" cy="52" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* 11. Thăng Long Imperial Citadel & Flag Tower Silhouette Outline at Bottom */}
      <motion.div
        className="absolute bottom-0 inset-x-0 h-32 overflow-hidden flex items-end"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.25, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      >
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full text-[#E8C77B]"
        >
          {/* Ground Baseline */}
          <line x1="0" y1="114" x2="1200" y2="114" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="117" x2="1200" y2="117" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />

          {/* Hanoi Flag Tower (Cột Cờ Hà Nội - Left 120 - 240) */}
          <rect x="150" y="88" width="80" height="26" stroke="currentColor" strokeWidth="1.2" />
          <rect x="165" y="70" width="50" height="18" stroke="currentColor" strokeWidth="1.2" />
          <rect x="175" y="56" width="30" height="14" stroke="currentColor" strokeWidth="1.2" />
          <line x1="190" y1="20" x2="190" y2="56" stroke="currentColor" strokeWidth="2.5" />
          {/* Flying flag */}
          <path d="M 190 20 L 214 26 L 190 32 Z" fill="currentColor" fillOpacity="0.75" />

          {/* Đoan Môn Imperial Gate Wall (Center 440 - 760) */}
          <rect x="460" y="74" width="280" height="40" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 500 114 L 500 88 Q 515 80 530 88 L 530 114" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 575 114 L 575 82 Q 600 72 625 82 L 625 114" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 670 114 L 670 88 Q 685 80 700 88 L 700 114" stroke="currentColor" strokeWidth="1.2" />
          <rect x="520" y="52" width="160" height="22" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 510 52 Q 600 40 690 52" stroke="currentColor" strokeWidth="1.5" />
          <rect x="548" y="32" width="104" height="20" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 538 32 Q 600 22 662 32" stroke="currentColor" strokeWidth="1.5" />

          {/* West Lake Water Ripples & Tran Quoc Pagoda (Right 920 - 1080) */}
          <line x1="940" y1="68" x2="940" y2="114" stroke="currentColor" strokeWidth="1.5" />
          <line x1="1020" y1="68" x2="1020" y2="114" stroke="currentColor" strokeWidth="1.5" />
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={`stupa-${i}`}
              d={`M ${970 - (8 - i) * 2} ${114 - i * 10} L ${990 + (8 - i) * 2} ${114 - i * 10}`}
              stroke="currentColor"
              strokeWidth="1.5"
            />
          ))}
        </svg>
      </motion.div>

      {/* Top and Bottom Section Seam Transition Blends */}
      <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-[#0A221C] to-transparent opacity-90" />
      <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#0A201A] to-transparent opacity-90" />
    </div>
  );
}
