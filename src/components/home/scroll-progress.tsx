"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Thin heritage-gold bar at the top of the viewport showing how far the page has been scrolled. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#B48A35] via-[#E8C77B] to-[#B48A35]"
    />
  );
}
