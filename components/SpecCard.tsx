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
 * Used in TechDeepDive and can be imported anywhere on the page.
 */
export default function SpecCard({
  icon,
  label,
  value,
  description,
  accentColor = "rgba(245,245,255,0.7)",
  delay = 0,
}: SpecCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="group relative rounded-2xl p-6 cursor-default transition-all duration-300"
      style={{
        background: "var(--color-acrylic)",
        border: "1px solid var(--color-border)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}40`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${accentColor}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Accent glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${accentColor}08 0%, transparent 60%)`,
        }}
      />

      {/* Icon */}
      <div className="text-2xl mb-4" aria-hidden="true">{icon}</div>

      {/* Label */}
      <p
        className="text-[10px] tracking-[0.2em] uppercase mb-1"
        style={{
          fontFamily: "var(--font-jetbrains)",
          color: "var(--color-muted)",
        }}
      >
        {label}
      </p>

      {/* Value */}
      <p
        className="text-2xl font-bold mb-3"
        style={{
          fontFamily: "var(--font-jetbrains)",
          color: accentColor,
        }}
      >
        {value}
      </p>

      {/* Description */}
      <p
        className="text-sm leading-relaxed"
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
