"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [sectionMousePos, setSectionMousePos] = useState({ x: 50, y: 50 });
  const [imageMousePos, setImageMousePos] = useState({ x: 170, y: 120 });
  const [telemetry, setTelemetry] = useState({ x: 0, y: 0, amp: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      // 1. Coordinates relative to section for ambient glow and telemetry
      const sRect = section.getBoundingClientRect();
      const sx = ((e.clientX - sRect.left) / sRect.width) * 100;
      const sy = ((e.clientY - sRect.top) / sRect.height) * 100;
      setSectionMousePos({ x: sx, y: sy });
      section.style.setProperty("--mouse-x", `${sx}%`);
      section.style.setProperty("--mouse-y", `${sy}%`);

      // Update real-time mock coordinate telemetry
      setTelemetry({
        x: parseFloat(sx.toFixed(2)),
        y: parseFloat(sy.toFixed(2)),
        amp: Math.round(Math.sqrt(sx * sx + sy * sy) * 2),
      });

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
      className="spotlight-hero relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-grid-dots bg-void"
    >
      {/* Volumetric background beam */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: `radial-gradient(ellipse 60% 40% at ${sectionMousePos.x}% ${sectionMousePos.y}%, rgba(248,248,255,0.06) 0%, transparent 60%)`,
          transition: "background 100ms ease-out",
        }}
      />

      {/* Grid Scan Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-grid-lines animate-grid-scan" />

      {/* HUD borders & CAD crosshairs */}
      <div className="absolute inset-x-8 inset-y-8 border border-white/[0.02] pointer-events-none z-10">
        {/* Corner coordinates tags */}
        <div className="absolute top-2 left-3 font-mono text-[8px] text-white/20 select-none">SYS_INIT // LINK_ZERO_CORE</div>
        <div className="absolute top-2 right-3 font-mono text-[8px] text-white/20 select-none">SYS_STATUS: ONLINE</div>
        <div className="absolute bottom-2 left-3 font-mono text-[8px] text-white/20 select-none">LATITUDE: 22°N / LONGITUDE: 114°E</div>
        <div className="absolute bottom-2 right-3 font-mono text-[8px] text-white/20 select-none">REF: CERN_OHL_V2</div>
        
        {/* Crosshair indicators */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-white/30 font-mono text-[10px] select-none">+</div>
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-white/30 font-mono text-[10px] select-none">+</div>
        <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 text-white/30 font-mono text-[10px] select-none">+</div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 text-white/30 font-mono text-[10px] select-none">+</div>
      </div>

      {/* Center content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl mx-auto pt-12 pb-16">

        {/* Product badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.01] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]"
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
            style={{ backgroundColor: "var(--color-led-white)" }}
          />
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-dim)" }}
          >
            Open Hardware · ESP32-S3
          </span>
        </motion.div>

        {/* Interactive Spotlight Image Frame */}
        <motion.div
          ref={imageContainerRef}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-14 w-[360px] h-[250px] rounded-2xl overflow-hidden border border-white/[0.08] bg-black/60 shadow-[0_32px_64px_rgba(0,0,0,0.8)] group cursor-crosshair"
        >
          {/* Inner glass overlay border */}
          <div className="absolute inset-0 border border-white/5 rounded-2xl z-20 pointer-events-none" />

          {/* HUD alignment guides overlay */}
          <div className="absolute inset-4 border border-dashed border-white/[0.03] z-10 pointer-events-none flex items-center justify-center">
            <div className="w-4 h-4 border border-white/[0.1] rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white/20 rounded-full" />
            </div>
          </div>

          {/* Underlayer: dark, desaturated photograph representing shadows */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/image_876a8400.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.08] filter grayscale brightness-[0.2]"
            aria-hidden="true"
          />

          {/* Overlayer: illuminated image revealed by cursor position mask */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              backgroundImage: "url('/assets/image_876a8400.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage: `radial-gradient(circle 120px at ${imageMousePos.x}px ${imageMousePos.y}px, black 30%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle 120px at ${imageMousePos.x}px ${imageMousePos.y}px, black 30%, transparent 100%)`,
            }}
          />

          {/* Digital telemetry floating tags on the image */}
          <div className="absolute bottom-2 left-3 z-20 pointer-events-none font-mono text-[7px] text-white/30 flex flex-col gap-0.5 select-none text-left">
            <div>IMG_SOURCE: render_isometric_0.png</div>
            <div>X_COORD: {imageMousePos.x.toFixed(0)}px / Y_COORD: {imageMousePos.y.toFixed(0)}px</div>
          </div>

          <div className="absolute top-2 right-3 z-20 pointer-events-none font-mono text-[7px] text-white/30 select-none">
            REVEAL_RAD: 120px
          </div>

          {/* Glowing pulse LED overlay */}
          <span
            className="absolute top-[52%] left-[44%] w-1.5 h-1.5 rounded-full animate-pulse-glow z-20 pointer-events-none"
            style={{ backgroundColor: "var(--color-led-white)" }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-none"
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-md md:text-lg max-w-xl leading-relaxed mb-12"
          style={{ color: "var(--color-dim)" }}
        >
          Turn any wired USB device wireless.{" "}
          <span style={{ color: "var(--color-led-white)" }}>Open Hardware.</span>{" "}
          <span style={{ color: "var(--color-led-white)" }}>Zero Profit.</span>
        </motion.p>

        {/* Real-time telemetry coordinates display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-8 flex gap-6 px-4 py-2 border border-white/[0.04] bg-white/[0.005] rounded-xl font-mono text-[9px] text-white/30"
        >
          <div>BEAM_X: <span className="text-white/60">{telemetry.x}%</span></div>
          <div>BEAM_Y: <span className="text-white/60">{telemetry.y}%</span></div>
          <div>AMPLITUDE: <span className="text-white/60">{telemetry.amp}dBm</span></div>
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="flex flex-col sm:flex-row items-center gap-4 relative z-30"
        >
          <a
            href="#batch"
            id="hero-cta-join"
            className="px-8 py-4.5 rounded-xl font-bold text-xs tracking-[0.1em] uppercase transition-all duration-300 shadow-[0_0_24px_rgba(248,248,255,0.25)] hover:shadow-[0_0_36px_rgba(248,248,255,0.45)] hover:scale-[1.02] border border-white/10"
            style={{
              background: "var(--color-led-white)",
              color: "var(--color-void)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Join Batch #1 — $13.00
          </a>
          <a
            href="#showcase"
            id="hero-cta-learn"
            className="px-8 py-4.5 rounded-xl font-semibold text-xs tracking-[0.1em] uppercase border transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-dim)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Inspect device ↓
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-none"
        >
          <span
            className="text-[9px] tracking-[0.35em] uppercase opacity-40"
            style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
          >
            SYS_SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-10 opacity-20"
            style={{ background: "linear-gradient(to bottom, var(--color-led-white), transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
