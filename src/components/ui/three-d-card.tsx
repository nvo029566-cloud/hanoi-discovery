"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface ThreeDCardProps {
  children: ReactNode;
  className?: string;
  maxRotate?: number;
  scale?: number;
  glare?: boolean;
  glareTint?: string;
}

export function ThreeDCard({
  children,
  className,
  maxRotate = 10,
  scale = 1.02,
  glare = true,
  glareTint,
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse" || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const rotateX = (1 - y * 2) * maxRotate;
    const rotateY = (x * 2 - 1) * maxRotate;

    setRotate({ x: rotateX, y: rotateY });

    if (glare) {
      setGlarePos({
        x: x * 100,
        y: y * 100,
        opacity: glareTint ? 0.9 : 0.2,
      });
    }
  };

  const handlePointerEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    setIsHovered(true);
    handlePointerMove(e);
  };

  const resetTilt = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };
  const tilted = isHovered && !reduce;

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      style={{ perspective: "1000px" }}
      className="h-full w-full"
    >
      <div
        data-tilted={tilted ? "true" : undefined}
        style={{
          transform: tilted
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${scale}, ${scale}, ${scale})`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: tilted
            ? "transform 0.1s ease-out"
            : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-full w-full rounded-[16px] transition-shadow duration-300",
          tilted ? "shadow-2xl ring-1 ring-primary/20" : "shadow-xs",
          className,
        )}
      >
        {children}

        {/* 3D Specular Glare Reflection */}
        {glare && !reduce && (
          <div
            aria-hidden="true"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glareTint ?? "rgba(255, 255, 255, 0.35)"} 0%, transparent 60%)`,
              opacity: glarePos.opacity,
              transition: "opacity 0.3s ease",
            }}
            className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", glareTint ? "[transform:translateZ(1px)]" : "z-30 mix-blend-overlay")}
          />
        )}
      </div>
    </div>
  );
}
