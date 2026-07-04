"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [sectionMousePos, setSectionMousePos] = useState({ x: 50, y: 50 });
  const [imageMousePos, setImageMousePos] = useState({ x: 170, y: 120 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      // 1. Coordinates relative to section for general ambient glow
      const sRect = section.getBoundingClientRect();
      const sx = ((e.clientX - sRect.left) / sRect.width) * 100;
      const sy = ((e.clientY - sRect.top) / sRect.height) * 100;
      setSectionMousePos({ x: sx, y: sy });
      section.style.setProperty("--mouse-x", `${sx}%`);
      section.style.setProperty("--mouse-y", `${sy}%`);

      // 2. Coordinates relative to image container for precise spotlight reveal
      const imgContainer = imageContainerRef.current;
      if (imgContainer) {
        const iRect = imgContainer.getBoundingClientRect();
        const ix = e.clientX - iRect.left;
        const iy = e.clientY - iRect.top;
        setImageMousePos({ x: ix, y: iy });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="spotlight-hero relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-void)" }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(245,245,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Top grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Dynamic spotlight overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(700px circle at ${sectionMousePos.x}% ${sectionMousePos.y}%, rgba(245,245,255,0.09) 0%, rgba(245,245,255,0.03) 35%, transparent 70%)`,
          transition: "background 80ms linear",
        }}
      />

      {/* Center content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

        {/* Product badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10"
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse-glow"
            style={{ backgroundColor: "var(--color-led-white)" }}
          />
          <span
            className="text-xs tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
          >
            Open Hardware · ESP32-S3
          </span>
        </motion.div>

        {/* Device spotlight visual */}
        <motion.div
          ref={imageContainerRef}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-12 w-[340px] h-[240px] rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl"
        >
          {/* Ambient glow behind image container */}
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(245,245,255,0.6) 0%, transparent 70%)",
            }}
          />

          {/* Underlayer: very dark, desaturated (represents unlit/shadow parts) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/image_876a8400.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale brightness-[0.25]"
            aria-hidden="true"
          />

          {/* Overlayer: fully lit, revealed via cursor radial-gradient mask */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              backgroundImage: "url('/assets/image_876a8400.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage: `radial-gradient(circle 130px at ${imageMousePos.x}px ${imageMousePos.y}px, black 30%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle 130px at ${imageMousePos.x}px ${imageMousePos.y}px, black 30%, transparent 100%)`,
            }}
          />

          {/* Micro white-led pulsing dots overlay */}
          <span
            className="absolute top-[48%] left-[45%] w-2 h-2 rounded-full animate-pulse-glow z-20 pointer-events-none"
            style={{ backgroundColor: "var(--color-led-white)" }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-none"
          style={{ fontFamily: "var(--font-inter)", color: "var(--color-led-white)" }}
        >
          Link Zero.
          <br />
          <span
            className="shimmer-text"
            style={{ fontSize: "0.85em" }}
          >
            The Wireless Bridge.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
          style={{ color: "var(--color-dim)" }}
        >
          Turn any wired USB device wireless.{" "}
          <span style={{ color: "var(--color-led-white)" }}>Open Hardware.</span>{" "}
          <span style={{ color: "var(--color-led-white)" }}>Zero Profit.</span>
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#batch"
            id="hero-cta-join"
            className="px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 glow-md hover:glow-lg"
            style={{
              background: "var(--color-led-white)",
              color: "var(--color-void)",
              fontFamily: "var(--font-inter)",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.boxShadow =
                "var(--shadow-glow-lg)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.boxShadow =
                "var(--shadow-glow-md)")
            }
          >
            Join Batch #1 — $13.00
          </a>
          <a
            href="#tech"
            id="hero-cta-learn"
            className="px-8 py-4 rounded-xl font-medium text-sm tracking-wide border transition-all duration-300 hover:border-white/30 hover:bg-white/5"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-dim)",
            }}
          >
            See Inside ↓
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-12 opacity-30"
            style={{ background: "linear-gradient(to bottom, var(--color-led-white), transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Inline SVG device illustration ─────────────────────────────────── */
function DeviceIllustration() {
  return (
    <svg
      width="340"
      height="240"
      viewBox="0 0 340 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-2xl"
      aria-label="Link Zero device and packaging"
    >
      {/* --- Matte white box (packaging) --- */}
      <g>
        {/* Box body */}
        <rect x="160" y="50" width="150" height="170" rx="6" fill="#F0F0F0" opacity="0.95" />
        {/* Box top face */}
        <path d="M160 50 L210 20 L360 20 L310 50 Z" fill="#E8E8E8" opacity="0.95" />
        {/* Box right face */}
        <path d="M310 50 L360 20 L360 190 L310 220 Z" fill="#D8D8D8" opacity="0.9" />
        {/* Box label area */}
        <rect x="170" y="80" width="130" height="60" rx="4" fill="rgba(0,0,0,0.06)" />
        {/* Box brand text marks */}
        <rect x="178" y="92" width="70" height="4" rx="2" fill="rgba(0,0,0,0.2)" />
        <rect x="178" y="102" width="50" height="3" rx="1.5" fill="rgba(0,0,0,0.12)" />
        <rect x="178" y="112" width="90" height="2" rx="1" fill="rgba(0,0,0,0.08)" />
        <rect x="178" y="118" width="60" height="2" rx="1" fill="rgba(0,0,0,0.08)" />
        {/* Logo "LZ" on box */}
        <text x="255" y="145" textAnchor="middle" fontSize="22" fontWeight="700" fill="rgba(0,0,0,0.18)" fontFamily="Inter, sans-serif">LZ</text>
      </g>

      {/* --- Smoked acrylic dongle (leaning against box) --- */}
      <g transform="translate(20, 30) rotate(-8, 80, 120)">
        {/* Dongle body – smoked transparent shell */}
        <rect x="30" y="40" width="90" height="160" rx="12"
          fill="rgba(200,210,230,0.12)"
          stroke="rgba(245,245,255,0.35)"
          strokeWidth="1.5"
        />
        {/* Inner glow from LED */}
        <rect x="38" y="48" width="74" height="144" rx="9"
          fill="rgba(245,245,255,0.04)"
        />
        {/* ESP32-S3 chip silhouette */}
        <rect x="45" y="70" width="60" height="50" rx="4"
          fill="rgba(245,245,255,0.08)"
          stroke="rgba(245,245,255,0.15)"
          strokeWidth="1"
        />
        {/* Chip pins */}
        {[0,1,2,3,4].map((i) => (
          <rect key={`lt${i}`} x="38" y={76 + i * 9} width="7" height="3" rx="1" fill="rgba(245,245,255,0.2)" />
        ))}
        {[0,1,2,3,4].map((i) => (
          <rect key={`rt${i}`} x="105" y={76 + i * 9} width="7" height="3" rx="1" fill="rgba(245,245,255,0.2)" />
        ))}
        {/* PCB traces */}
        <line x1="75" y1="120" x2="75" y2="145" stroke="rgba(245,245,255,0.12)" strokeWidth="2" />
        <line x1="60" y1="130" x2="90" y2="130" stroke="rgba(245,245,255,0.12)" strokeWidth="1.5" />
        {/* LiPo battery */}
        <rect x="45" y="142" width="60" height="30" rx="4"
          fill="rgba(100,180,255,0.08)"
          stroke="rgba(100,180,255,0.18)"
          strokeWidth="1"
        />
        <line x1="70" y1="150" x2="80" y2="150" stroke="rgba(100,200,255,0.3)" strokeWidth="2" />
        <line x1="75" y1="145" x2="75" y2="155" stroke="rgba(100,200,255,0.3)" strokeWidth="2" />
        {/* USB-A port */}
        <rect x="50" y="185" width="50" height="15" rx="3"
          fill="rgba(245,245,255,0.12)"
          stroke="rgba(245,245,255,0.3)"
          strokeWidth="1.5"
        />
        <rect x="58" y="188" width="10" height="9" rx="1" fill="rgba(0,0,0,0.4)" />
        <rect x="82" y="188" width="10" height="9" rx="1" fill="rgba(0,0,0,0.4)" />
        {/* LED indicator — glowing white */}
        <circle cx="75" cy="58" r="4" fill="rgba(245,245,255,0.9)">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2.4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="75" cy="58" r="8" fill="rgba(245,245,255,0.15)">
          <animate attributeName="r" values="6;12;6" dur="2.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2.4s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
  );
}
