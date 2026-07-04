"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollTrigger from "./ScrollTrigger";

const ASSETS = [
  {
    type: "video",
    src: "/assets/Hailuo_Video_A macro product photograph of _529817388989313025.mp4",
    title: "Macro Camera Scan",
    description: "Close-up capture of the smoked transparent shell and internal LED behavior.",
    meta: { format: "MP4 / H.264", size: "704 KB", label: "feed_raw" },
  },
  {
    type: "image",
    src: "/assets/image_876a8400.png",
    title: "Isometric Alignment",
    description: "Link Zero dongle resting alongside the custom matte white container.",
    meta: { format: "PNG / 24-bit", size: "1.04 MB", label: "fig_1.1" },
  },
  {
    type: "image",
    src: "/assets/image_9113a7cd.png",
    title: "PCB Layer Profile",
    description: "High-definition alignment of the ESP32-S3 trace routes and power cell placement.",
    meta: { format: "PNG / 24-bit", size: "1.69 MB", label: "fig_1.2" },
  },
  {
    type: "image",
    src: "/assets/image_9964628e.png",
    title: "Structural Measurement",
    description: "Casing measurements and structural layout of the universal HID bridge.",
    meta: { format: "PNG / 24-bit", size: "1.83 MB", label: "fig_1.3" },
  },
];

/* ── Interactive Signal Scope ────────────────────────────────────────── */
function SignalScope({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1;
      
      // Draw grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 15) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      // Draw signal wave
      ctx.beginPath();
      ctx.strokeStyle = "rgba(248, 248, 255, 0.4)";
      ctx.lineWidth = 1.2;

      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin(x * 0.05 + offset) * 12 * Math.cos(x * 0.01 + offset * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      offset += active ? 0.06 : 0.02;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={45}
      className="w-full h-[45px] rounded opacity-65"
      aria-hidden="true"
    />
  );
}

export default function CinematicShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeAsset = ASSETS[activeIdx];
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="showcase"
      className="relative py-28 px-6 bg-grid-dots border-t border-b overflow-hidden"
      style={{
        backgroundColor: "var(--color-void-soft)",
        borderColor: "rgba(255,255,255,0.03)",
      }}
    >
      {/* Volumetric backdrop */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] blur-[150px] opacity-10 pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(248,248,255,0.8), transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <ScrollTrigger preset="fade-up" duration={0.6}>
          <div className="text-center mb-20">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
            >
              // 3D Telemetry Diagnostics
            </p>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight mb-5"
              style={{ color: "var(--color-led-white)" }}
            >
              Optical Profiling.
            </h2>
            <p
              className="text-md max-w-xl mx-auto leading-relaxed"
              style={{ color: "var(--color-dim)" }}
            >
              Inspect transparent hardware parameters and structural dimensions via static and cinematic capture channels.
            </p>
          </div>
        </ScrollTrigger>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Showcase Media Screen with CAD borders */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <div
              ref={containerRef}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative aspect-video rounded-2xl border bg-black/60 shadow-[0_24px_50px_rgba(0,0,0,0.7)] group overflow-hidden"
              style={{ borderColor: "var(--color-border)" }}
            >
              {/* CAD Crosshairs inside viewer */}
              <div className="absolute top-3 left-4 font-mono text-[9px] text-white/20 select-none pointer-events-none z-20">LZ_CAM_VIEW [CH_1]</div>
              <div className="absolute top-3 right-4 font-mono text-[9px] text-white/20 select-none pointer-events-none z-20">MODE: DIAGNOSTIC</div>
              
              {/* Corner crosshairs */}
              <div className="absolute top-0 left-0 text-white/30 font-mono text-[10px] pointer-events-none z-20 select-none px-2 py-1">+</div>
              <div className="absolute top-0 right-0 text-white/30 font-mono text-[10px] pointer-events-none z-20 select-none px-2 py-1">+</div>
              <div className="absolute bottom-0 left-0 text-white/30 font-mono text-[10px] pointer-events-none z-20 select-none px-2 py-1">+</div>
              <div className="absolute bottom-0 right-0 text-white/30 font-mono text-[10px] pointer-events-none z-20 select-none px-2 py-1">+</div>

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

              {/* Top gradient masking */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none z-10" />

              {/* Top overlay metadata bar */}
              <div className="absolute top-0 left-0 right-0 p-4 pt-10 flex items-center justify-between pointer-events-none z-20">
                <span
                  style={{ fontFamily: "var(--font-jetbrains)", fontSize: "9px", color: "var(--color-muted)" }}
                >
                  SYS_DEV_LINK // {activeAsset.meta.label}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded text-[8px] border border-white/5 font-mono"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: "var(--color-led-white)",
                  }}
                >
                  {activeAsset.meta.format}
                </span>
              </div>

              {/* Bottom overlay title bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none z-20">
                <p
                  className="text-lg font-bold tracking-tight"
                  style={{ color: "var(--color-led-white)" }}
                >
                  {activeAsset.title}
                </p>
                <p
                  className="text-xs max-w-lg mt-1.5 leading-relaxed"
                  style={{ color: "var(--color-dim)" }}
                >
                  {activeAsset.description}
                </p>
              </div>
            </div>

            {/* Selector list (thumbnails) */}
            <div className="grid grid-cols-4 gap-4">
              {ASSETS.map((asset, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={asset.src}
                    onClick={() => setActiveIdx(idx)}
                    className="relative aspect-video rounded-xl border overflow-hidden bg-black/60 transition-all duration-300 hover:border-white/20 text-left cursor-pointer"
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
                          className="w-full h-full object-cover opacity-40"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <span className="text-[10px] text-white/50">▶</span>
                        </div>
                      </div>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={asset.src}
                        alt=""
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          isActive ? "opacity-90" : "opacity-30"
                        }`}
                      />
                    )}
                    {/* Small tag */}
                    <div className="absolute bottom-1 right-1 px-1 rounded text-[7px] bg-black/80 font-mono" style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}>
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
              className="glass-card rounded-2xl p-6 border w-full flex flex-col gap-5"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div
                className="flex items-center gap-2.5 pb-4 border-b"
                style={{ borderColor: "var(--color-border)" }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse-glow"
                  style={{ backgroundColor: "var(--color-led-white)" }}
                />
                <span
                  style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px", color: "var(--color-led-white)" }}
                >
                  system_scope.log
                </span>
              </div>

              {/* Metric stats */}
              <div className="flex flex-col gap-3.5">
                {[
                  { name: "FILE_SIZE", val: activeAsset.meta.size },
                  { name: "ASPECT_RATIO", val: "16:9 [Widescreen]" },
                  { name: "RENDER_TYPE", val: activeAsset.type === "video" ? "MP4 Loop" : "Raw PNG Image" },
                  { name: "EXPOSURE", val: "Volumetric Spotlight" },
                  { name: "CONTRAST", val: "Smoked Transparency" },
                  { name: "DIAGNOSTIC", val: "CALIBRATED // OK" },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center text-[10px]">
                    <span
                      style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
                    >
                      {stat.name}
                    </span>
                    <span
                      className="font-medium"
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        color: stat.name === "DIAGNOSTIC" ? "#86efac" : "var(--color-dim)",
                      }}
                    >
                      {stat.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Interactive signal scope graph */}
              <div
                className="p-3 rounded-xl border bg-black/40 flex flex-col gap-2"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex justify-between items-center font-mono text-[7px] text-white/30">
                  <span>RF_SIGNAL_AMP // INTERACTIVE</span>
                  <span>433.92 MHz</span>
                </div>
                <SignalScope active={hovered} />
              </div>

              {/* Text note */}
              <div
                className="p-3.5 rounded-xl border text-[10px] leading-relaxed"
                style={{
                  backgroundColor: "var(--color-smoke)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-muted)",
                  fontFamily: "var(--font-jetbrains)",
                }}
              >
                * Diagnostic signals verify that high frequency 2.4GHz Wi-Fi routing traces align with minimal attenuation thresholds under continuous operation.
              </div>
            </div>

            {/* Spec download cards link */}
            <a
              href={activeAsset.src}
              download
              className="glass-card rounded-2xl p-5 border flex items-center justify-between group cursor-pointer"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div>
                <p className="text-xs font-bold" style={{ color: "var(--color-led-white)" }}>
                  Download Diagnostics
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "var(--color-muted)" }}>
                  High-fidelity schematic assets
                </p>
              </div>
              <div
                className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-xs group-hover:bg-white/[0.08] transition-colors"
              >
                ↓
              </div>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
