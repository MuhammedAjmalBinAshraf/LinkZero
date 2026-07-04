"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollTrigger from "./ScrollTrigger";

const ASSETS = [
  {
    type: "video",
    src: "/assets/Hailuo_Video_A macro product photograph of _529817388989313025.mp4",
    title: "Macro Scan",
    description: "Close-up capture of the smoked transparent shell and internal LED behavior.",
    meta: { format: "MP4 / H.264", size: "704 KB", label: "stream_0" },
  },
  {
    type: "image",
    src: "/assets/image_876a8400.png",
    title: "Isometric View",
    description: "Link Zero dongle resting alongside the custom matte white container.",
    meta: { format: "PNG / 24-bit", size: "1.04 MB", label: "render_1" },
  },
  {
    type: "image",
    src: "/assets/image_9113a7cd.png",
    title: "PCB Layer",
    description: "High-definition alignment of the ESP32-S3 trace routes and power cell placement.",
    meta: { format: "PNG / 24-bit", size: "1.69 MB", label: "render_2" },
  },
  {
    type: "image",
    src: "/assets/image_9964628e.png",
    title: "Product Profiling",
    description: "Casing measurements and structural layout of the universal HID bridge.",
    meta: { format: "PNG / 24-bit", size: "1.83 MB", label: "render_3" },
  },
];

export default function CinematicShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeAsset = ASSETS[activeIdx];

  return (
    <section
      id="showcase"
      className="relative py-24 px-6 overflow-hidden border-t border-b"
      style={{
        backgroundColor: "var(--color-void-soft)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      {/* Ambient backgrounds */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[140px] opacity-10 pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(245,245,255,0.8), transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <ScrollTrigger preset="fade-up" duration={0.6}>
          <div className="text-center mb-16">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
            >
              // Cinematic Showcase
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ color: "var(--color-led-white)" }}
            >
              Visual Profiling.
            </h2>
            <p
              className="text-md max-w-xl mx-auto"
              style={{ color: "var(--color-dim)" }}
            >
              Examine the smoked transparency and matte structural design from every angle.
            </p>
          </div>
        </ScrollTrigger>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Showcase Media Screen */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div
              className="relative aspect-video rounded-2xl border overflow-hidden bg-black/40 shadow-2xl"
              style={{ borderColor: "var(--color-border)" }}
            >
              {/* Media viewer */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAsset.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  {activeAsset.type === "video" ? (
                    <video
                      src={activeAsset.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={activeAsset.src}
                      alt={activeAsset.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Top overlay metadata bar */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between pointer-events-none">
                <span
                  style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10px", color: "var(--color-muted)" }}
                >
                  system_monitor // {activeAsset.meta.label}
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[9px]"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    backgroundColor: "rgba(245,245,255,0.1)",
                    color: "var(--color-led-white)",
                  }}
                >
                  {activeAsset.meta.format}
                </span>
              </div>

              {/* Bottom overlay title bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                <p
                  className="text-lg font-bold"
                  style={{ color: "var(--color-led-white)" }}
                >
                  {activeAsset.title}
                </p>
                <p
                  className="text-xs max-w-md mt-1"
                  style={{ color: "var(--color-dim)" }}
                >
                  {activeAsset.description}
                </p>
              </div>
            </div>

            {/* Selector list (thumbnails) */}
            <div className="grid grid-cols-4 gap-3">
              {ASSETS.map((asset, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={asset.src}
                    onClick={() => setActiveIdx(idx)}
                    className="relative aspect-video rounded-lg border overflow-hidden bg-black/60 transition-all duration-300 hover:border-white/30 text-left"
                    style={{
                      borderColor: isActive ? "var(--color-border-bright)" : "var(--color-border)",
                      boxShadow: isActive ? "var(--shadow-glow-xs)" : "none",
                    }}
                  >
                    {asset.type === "video" ? (
                      <div className="w-full h-full relative">
                        <video
                          src={asset.src}
                          muted
                          playsInline
                          className="w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <span className="text-sm">▶</span>
                        </div>
                      </div>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={asset.src}
                        alt=""
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          isActive ? "opacity-90" : "opacity-40"
                        }`}
                      />
                    )}
                    {/* Small tag */}
                    <div className="absolute bottom-1 right-1 px-1 rounded text-[7px] bg-black/80" style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}>
                      {asset.meta.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Technical diagnostics telemetry */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div
              className="glass rounded-2xl p-6 border w-full flex flex-col gap-4"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div
                className="flex items-center gap-2 pb-3 border-b"
                style={{ borderColor: "var(--color-border)" }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse-glow"
                  style={{ backgroundColor: "var(--color-led-white)" }}
                />
                <span
                  style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px", color: "var(--color-led-white)" }}
                >
                  telemetry_status.log
                </span>
              </div>

              {/* Metric stats */}
              <div className="flex flex-col gap-3">
                {[
                  { name: "file_size", val: activeAsset.meta.size },
                  { name: "aspect_ratio", val: "16 : 9" },
                  { name: "render_engine", val: "Hardware Camera" },
                  { name: "shutter_speed", val: "1/100s" },
                  { name: "iso_rating", val: "ISO 200" },
                  { name: "optics_focus", val: "50mm F/1.8" },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span
                      style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
                    >
                      {stat.name}
                    </span>
                    <span
                      style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-dim)" }}
                    >
                      {stat.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Text note */}
              <div
                className="mt-2 p-3 rounded-lg border text-[11px] leading-relaxed"
                style={{
                  backgroundColor: "var(--color-smoke)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-muted)",
                  fontFamily: "var(--font-jetbrains)",
                }}
              >
                * Telemetry records confirm transparent acrylic structure retains fully open design configuration standards without visual obstructions.
              </div>
            </div>

            {/* Spec download cards link */}
            <div
              className="glass rounded-2xl p-5 border flex items-center justify-between group cursor-pointer hover:border-white/30 transition-all duration-300"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div>
                <p className="text-xs font-semibold" style={{ color: "var(--color-led-white)" }}>
                  Download Assets
                </p>
                <p className="text-[10px]" style={{ color: "var(--color-muted)" }}>
                  High-res production files
                </p>
              </div>
              <a
                href={activeAsset.src}
                download
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs group-hover:bg-white/10 transition-colors"
                aria-label="Download selected asset file"
              >
                ↓
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
