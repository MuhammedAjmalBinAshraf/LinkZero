"use client";

import { motion } from "framer-motion";

interface SpecCardProps {
  icon: string;
  label: string;
  value: string;
  description: string;
  accentColor?: string;
  delay?: number;
}

/**
 * SpecCard — Reusable glassmorphism card for technical specifications.
 * Updated with CAD crosshairs, corner indicators, and custom grid borders.
 */
export default function SpecCard({
  icon,
  label,
  value,
  description,
  accentColor = "rgba(248,248,255,0.7)",
  delay = 0,
}: SpecCardProps) {
  // Generate a mock coordinate tag based on the label hash
  const coordX = Math.abs(label.charCodeAt(0) % 100);
  const coordY = Math.abs(label.charCodeAt(label.length - 1) % 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="group relative rounded-xl p-6 cursor-default transition-all duration-300 bg-acrylic border border-white/5 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] hover:border-white/10"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}30`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 36px rgba(0,0,0,0.5), 0 0 20px ${accentColor}0c`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.05)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* CAD corner crosshairs */}
      <span className="absolute top-1.5 left-2.5 font-mono text-[7px] text-white/10 select-none pointer-events-none">+</span>
      <span className="absolute top-1.5 right-2.5 font-mono text-[7px] text-white/10 select-none pointer-events-none">+</span>
      <span className="absolute bottom-1.5 left-2.5 font-mono text-[7px] text-white/10 select-none pointer-events-none">+</span>
      <span className="absolute bottom-1.5 right-2.5 font-mono text-[7px] text-white/10 select-none pointer-events-none">+</span>

      {/* Coordinate index label in bottom right */}
      <span className="absolute bottom-1.5 right-6 font-mono text-[7px] text-white/15 select-none pointer-events-none">
        [{coordX.toString().padStart(2, "0")}:{coordY.toString().padStart(2, "0")}]
      </span>

      {/* Accent glow on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${accentColor}06 0%, transparent 60%)`,
        }}
      />

      {/* Icon */}
      <div className="text-xl mb-4" aria-hidden="true">{icon}</div>

      {/* Label */}
      <p
        className="text-[9px] tracking-[0.25em] uppercase mb-1"
        style={{
          fontFamily: "var(--font-jetbrains)",
          color: "var(--color-muted)",
        }}
      >
        {label}
      </p>

      {/* Value */}
      <p
        className="text-xl font-bold mb-3 tracking-tight"
        style={{
          fontFamily: "var(--font-jetbrains)",
          color: accentColor,
        }}
      >
        {value}
      </p>

      {/* Description */}
      <p
        className="text-xs leading-relaxed"
        style={{
          color: "var(--color-dim)",
          fontFamily: "var(--font-inter)",
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}
