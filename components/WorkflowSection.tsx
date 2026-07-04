"use client";

import { motion, MotionValue, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Props {
  scrollYProgress: MotionValue<number>;
}

/* ── Canvas-based particle stream ──────────────────────────────────── */
function ParticleCanvas({ active, speedMultiplier }: { active: boolean; speedMultiplier: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];

    const spawnParticle = (): Particle => ({
      x: W * 0.08 + Math.random() * W * 0.04,
      y: H * 0.3 + Math.random() * H * 0.4,
      vx: (1.8 + Math.random() * 1.4) * speedMultiplier,
      vy: (Math.random() - 0.5) * 0.4,
      size: 1.5 + Math.random() * 2.5,
      opacity: 0,
      life: 0,
      maxLife: (90 + Math.random() * 60) / speedMultiplier,
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      if (active && particles.length < 60) {
        if (Math.random() < 0.4) particles.push(spawnParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // fade in/out
        const progress = p.life / p.maxLife;
        p.opacity = progress < 0.15
          ? progress / 0.15
          : progress > 0.75
          ? 1 - (progress - 0.75) / 0.25
          : 1;

        // gradient color: white → cyan
        const t = p.x / W;
        const r = Math.round(248 - t * 40);
        const g = Math.round(248 - t * 10);
        const b = 255;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity * 0.85})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity * 0.12})`;
        ctx.fill();

        if (p.life >= p.maxLife || p.x > W * 0.92) {
          particles.splice(i, 1);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [active, speedMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      width={560}
      height={300}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}

export default function WorkflowSection({ scrollYProgress }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-15%" });
  const [speed, setSpeed] = useState(1); // 1 = 1x, 2 = 2x, 3 = 4x
  const [packetCount, setPacketCount] = useState(1024);

  // Increment mock packet transfer counter
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setPacketCount((prev) => prev + Math.round(Math.random() * 4 * speed));
    }, 150);
    return () => clearInterval(interval);
  }, [isInView, speed]);

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden bg-void-soft"
    >
      {/* Subtle divider gradient top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(248,248,255,0.08), transparent)" }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-grid-dots" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-20 relative z-10"
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
        >
          // Virtualization Pipeline
        </p>
        <h2
          className="text-4xl md:text-6xl font-black tracking-tight mb-6"
          style={{ color: "var(--color-led-white)" }}
        >
          The Workflow.
        </h2>
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: "var(--color-dim)" }}
        >
          It thinks it&apos;s plugged in.{" "}
          <span
            style={{ color: "var(--color-led-white)", fontFamily: "var(--font-jetbrains)", fontSize: "0.9em" }}
          >
            It isn&apos;t.
          </span>{" "}
          Native USB virtualization over Wi-Fi.
        </p>
      </motion.div>

      {/* Interactive Controls Overlay */}
      <div className="mb-10 flex gap-4 px-4 py-2 border border-white/[0.04] bg-white/[0.005] rounded-xl font-mono text-[9px] text-white/30 z-20">
        <div>STREAM_SPEED:</div>
        {[
          { label: "SLOW (1x)", val: 0.5 },
          { label: "NORMAL (2x)", val: 1 },
          { label: "TURBO (4x)", val: 2.2 },
        ].map((s) => (
          <button
            key={s.label}
            onClick={() => setSpeed(s.val)}
            className="hover:text-white transition-colors cursor-pointer"
            style={{ color: speed === s.val ? "var(--color-led-white)" : "rgba(255,255,255,0.3)" }}
          >
            [{s.label}]
          </button>
        ))}
      </div>

      {/* Split layout */}
      <div className="relative w-full max-w-5xl mx-auto">

        {/* Particle stream canvas — spans full width */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-0">
          <ParticleCanvas active={isInView} speedMultiplier={speed} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">

          {/* Left: Scanner + Link Zero */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div
              className="relative p-8 rounded-2xl border w-full"
              style={{
                backgroundColor: "var(--color-acrylic)",
                borderColor: "var(--color-border)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Corner crosshairs */}
              <span className="absolute top-1.5 left-2.5 font-mono text-[7px] text-white/10 select-none pointer-events-none">+</span>
              <span className="absolute top-1.5 right-2.5 font-mono text-[7px] text-white/10 select-none pointer-events-none">+</span>
              
              {/* Device label */}
              <div
                className="mb-4 text-center text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
              >
                Input Device
              </div>

              {/* Barcode scanner + Link Zero SVG */}
              <div className="flex items-end justify-center gap-4">
                <ScannerSVG glowing={isInView} />
              </div>

              {/* Status indicator */}
              <div className="mt-6 flex items-center justify-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-pulse-glow"
                  style={{ backgroundColor: "var(--color-led-white)" }}
                />
                <span
                  style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-dim)", fontSize: "11px" }}
                >
                  USB-HID · Active
                </span>
              </div>
            </div>

            {/* Protocol stack */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-4 w-full glass rounded-xl p-4"
            >
              <p
                className="text-[10px] mb-2"
                style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
              >
                USB Descriptor Chain
              </p>
              {["HID Device → Link Zero Host", "USBip Encapsulation", "Wi-Fi 802.11n Tunnel", "Virtual USB Client"].map((line, i) => (
                <div key={i} className="flex items-center gap-2 py-1">
                  <span style={{ color: "rgba(134,239,172,0.6)", fontFamily: "var(--font-jetbrains)", fontSize: "10px" }}>›</span>
                  <span style={{ color: "var(--color-dim)", fontFamily: "var(--font-jetbrains)", fontSize: "10px" }}>{line}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Laptop, no wires */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col items-center"
          >
            <div
              className="relative p-8 rounded-2xl border w-full"
              style={{
                backgroundColor: "var(--color-acrylic)",
                borderColor: "var(--color-border)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Corner crosshairs */}
              <span className="absolute top-1.5 left-2.5 font-mono text-[7px] text-white/10 select-none pointer-events-none">+</span>
              <span className="absolute top-1.5 right-2.5 font-mono text-[7px] text-white/10 select-none pointer-events-none">+</span>

              <div
                className="mb-4 text-center text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
              >
                Host Machine
              </div>

              <div className="flex items-end justify-center">
                <LaptopSVG />
              </div>

              <div className="mt-6 flex items-center justify-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#86efac", boxShadow: "0 0 8px rgba(134,239,172,0.6)" }}
                />
                <span
                  style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-dim)", fontSize: "11px" }}
                >
                  No Wires · Zero Drivers
                </span>
              </div>
            </div>

            {/* OS integration */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
              className="mt-4 w-full glass rounded-xl p-4"
            >
              <p
                className="text-[10px] mb-2"
                style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
              >
                OS Recognition Log // PACKETS: {packetCount}
              </p>
              {[
                "[USB] New device detected: HID Barcode Scanner",
                "[USBip] client attached /dev/input/event3",
                "[INPUT] Scanner ready — no cable required",
              ].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.3 }}
                  style={{ fontFamily: "var(--font-jetbrains)", color: "rgba(134,239,172,0.65)", fontSize: "9px" }}
                  className="py-0.5"
                >
                  {line}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Technical Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 glass rounded-2xl overflow-hidden p-6 max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-6"
          style={{ borderColor: "var(--color-border)" }}
        >
          {/* Corner crosshairs */}
          <span className="absolute top-1.5 left-2.5 font-mono text-[7px] text-white/10 select-none pointer-events-none">+</span>
          <span className="absolute top-1.5 right-2.5 font-mono text-[7px] text-white/10 select-none pointer-events-none">+</span>

          <div className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden border border-white/5 bg-black/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/image_9964628e.png"
              alt="Link Zero Structural Spec Profile"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-2" style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-led-white)" }}>
              // struct_profile.dxf
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-dim)" }}>
              Standardized shell dimensions engineered for universal USB casing compatibility. Features transparent polymer boundaries and integrated PCBWay anchor slots.
            </p>
            <div className="mt-4 flex gap-4 text-[10px] text-muted font-jetbrains" style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}>
              <div>WIDTH: <span style={{ color: "var(--color-led-white)" }}>30mm</span></div>
              <div>LENGTH: <span style={{ color: "var(--color-led-white)" }}>80mm</span></div>
              <div>DEPTH: <span style={{ color: "var(--color-led-white)" }}>12mm</span></div>
            </div>
          </div>
        </motion.div>

        {/* Center wifi symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center"
        >
          <WiFiIcon />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Scanner SVG ────────────────────────────────────────────────────── */
function ScannerSVG({ glowing }: { glowing: boolean }) {
  return (
    <svg width="200" height="180" viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Barcode scanner plugged into Link Zero">
      {/* Scanner body */}
      <rect x="60" y="20" width="80" height="110" rx="8"
        fill="rgba(248,248,255,0.04)"
        stroke="rgba(248,248,255,0.18)"
        strokeWidth="1"
      />
      {/* Scanner glass */}
      <rect x="68" y="28" width="64" height="50" rx="4"
        fill="rgba(100,150,255,0.06)"
        stroke="rgba(100,150,255,0.15)"
        strokeWidth="1"
      />
      {/* Scan line */}
      <line x1="70" y1="53" x2="130" y2="53"
        stroke={glowing ? "rgba(248,248,255,0.9)" : "rgba(248,248,255,0.3)"}
        strokeWidth="1.5"
        strokeDasharray="4 2"
      >
        {glowing && <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite"/>}
      </line>
      {/* Barcode pattern */}
      {[0,1,2,3,4,5,6,7].map((i) => (
        <rect key={i} x={72 + i * 7} y="34" width={i % 3 === 0 ? 4 : 2} height="12" rx="0.5"
          fill="rgba(248,248,255,0.3)"
        />
      ))}
      {/* Handle */}
      <path d="M85 130 Q85 155 95 160 Q100 162 105 160 Q115 155 115 130 Z"
        fill="rgba(248,248,255,0.04)"
        stroke="rgba(248,248,255,0.12)"
        strokeWidth="1"
      />
      {/* USB cable going down */}
      <path d="M100 160 Q100 172 100 180"
        stroke="rgba(248,248,255,0.22)"
        strokeWidth="1.5"
        strokeDasharray="3 2"
      />
      {/* Link Zero dongle at bottom */}
      <rect x="86" y="168" width="28" height="12" rx="4"
        fill="rgba(248,248,255,0.1)"
        stroke="rgba(248,248,255,0.25)"
        strokeWidth="1"
      />
      {/* LED on dongle */}
      <circle cx="100" cy="174" r="2.5" fill={glowing ? "rgba(248,248,255,0.95)" : "rgba(248,248,255,0.4)"}>
        {glowing && <animate attributeName="opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite"/>}
      </circle>
      {glowing && (
        <circle cx="100" cy="174" r="6" fill="rgba(248,248,255,0.12)">
          <animate attributeName="r" values="4;10;4" dur="2.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2.4s" repeatCount="indefinite"/>
        </circle>
      )}
    </svg>
  );
}

/* ── Laptop SVG ─────────────────────────────────────────────────────── */
function LaptopSVG() {
  return (
    <svg width="220" height="180" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Laptop with no wires connected">
      {/* Screen */}
      <rect x="20" y="10" width="180" height="120" rx="8"
        fill="rgba(248,248,255,0.03)"
        stroke="rgba(248,248,255,0.18)"
        strokeWidth="1"
      />
      {/* Screen inner */}
      <rect x="28" y="18" width="164" height="104" rx="4"
        fill="rgba(248,248,255,0.015)"
      />
      {/* Screen content — terminal-style */}
      <text x="36" y="38" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(134,239,172,0.7)">$ usbip list --remote 192.168.1.42</text>
      <text x="36" y="52" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(248,248,255,0.35)">  Exportable USB devices</text>
      <text x="36" y="64" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(103,232,249,0.55)">  1-1: HID Barcode Scanner</text>
      <text x="36" y="76" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(248,248,255,0.25)">$ usbip attach -r 192.168.1.42 -b 1-1</text>
      <text x="36" y="88" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(134,239,172,0.8)">  ✓ attached</text>
      {/* Cursor blink */}
      <rect x="36" y="98" width="6" height="10" rx="1" fill="rgba(248,248,255,0.7)">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
      </rect>
      {/* Laptop base */}
      <path d="M0 130 L20 130 L200 130 L220 130 L220 138 Q220 145 210 145 L10 145 Q0 145 0 138 Z"
        fill="rgba(248,248,255,0.04)"
        stroke="rgba(248,248,255,0.12)"
        strokeWidth="1"
      />
      {/* Trackpad */}
      <rect x="90" y="133" width="40" height="8" rx="2"
        fill="rgba(248,248,255,0.03)"
        stroke="rgba(248,248,255,0.08)"
        strokeWidth="0.5"
      />
      {/* No wire indicator */}
      <text x="110" y="170" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(134,239,172,0.5)">∅ no cables</text>
    </svg>
  );
}

/* ── Wi-Fi Icon ─────────────────────────────────────────────────────── */
function WiFiIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Wi-Fi wireless connection">
      <circle cx="24" cy="38" r="3.5" fill="rgba(248,248,255,0.9)">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
      </circle>
      <path d="M14 28 Q24 18 34 28" stroke="rgba(248,248,255,0.6)" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M8 22 Q24 8 40 22" stroke="rgba(248,248,255,0.35)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M2 16 Q24 -2 46 16" stroke="rgba(248,248,255,0.18)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
