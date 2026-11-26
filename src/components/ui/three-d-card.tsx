"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface ThreeDCardProps {
  children: ReactNode;
  className?: string;
  maxRotate?: number;
  scale?: number;
  glare?: boolean;
}

export function ThreeDCard({
  children,
  className,
  maxRotate = 10,
  scale = 1.02,
  glare = true,
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxRotate;
    const rotateY = ((x - centerX) / centerX) * maxRotate;

    setRotate({ x: rotateX, y: rotateY });

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.2,
      });
    }
  };

  const handleMouseEnter = () => {
    if (reduce) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
      className="h-full w-full"
    >
      <div
        style={{
          transform: isHovered && !reduce
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${scale}, ${scale}, ${scale})`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered && !reduce
            ? "transform 0.1s ease-out"
            : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-full w-full rounded-[16px] transition-shadow duration-300",
          isHovered && !reduce ? "shadow-2xl ring-1 ring-primary/20" : "shadow-xs",
          className,
        )}
      >
        {children}

        {/* 3D Specular Glare Reflection */}
        {glare && !reduce && (
          <div
            aria-hidden="true"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.35) 0%, transparent 60%)`,
              opacity: glarePos.opacity,
              transition: "opacity 0.3s ease",
            }}
            className="pointer-events-none absolute inset-0 z-30 rounded-[16px] mix-blend-overlay"
          />
        )}
      </div>
    </div>
  );
}
