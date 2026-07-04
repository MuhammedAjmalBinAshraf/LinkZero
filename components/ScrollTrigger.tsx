"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ScrollTriggerProps {
  children: ReactNode;
  /** Framer Motion animation variant preset */
  preset?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in";
  delay?: number;
  duration?: number;
  margin?: string;
  once?: boolean;
  className?: string;
}

const PRESETS = {
  "fade-up":    { initial: { opacity: 0, y: 32 },  animate: { opacity: 1, y: 0 } },
  "fade-in":    { initial: { opacity: 0 },           animate: { opacity: 1 } },
  "slide-left": { initial: { opacity: 0, x: -40 },  animate: { opacity: 1, x: 0 } },
  "slide-right":{ initial: { opacity: 0, x: 40 },   animate: { opacity: 1, x: 0 } },
  "scale-in":   { initial: { opacity: 0, scale: 0.88 }, animate: { opacity: 1, scale: 1 } },
};

/**
 * ScrollTrigger — A reusable scroll-activated animation wrapper.
 * Wraps children in a motion.div and fires the chosen animation preset
 * when the element enters the viewport.
 *
 * @example
 * <ScrollTrigger preset="fade-up" delay={0.2}>
 *   <MyComponent />
 * </ScrollTrigger>
 */
export default function ScrollTrigger({
  children,
  preset = "fade-up",
  delay = 0,
  duration = 0.7,
  margin = "-100px",
  once = true,
  className,
}: ScrollTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as `${number}px` });

  const { initial, animate } = PRESETS[preset];

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
