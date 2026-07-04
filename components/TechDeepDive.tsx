"use client";

import { motion, useTransform, MotionValue, useInView } from "framer-motion";
import { useRef } from "react";
import SpecCard from "./SpecCard";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const CALLOUTS = [
  {
    id: "esp32",
    label: "ESP32-S3 Host Core",
    sublabel: "Wi-Fi 802.11n / USB-OTG / USBip Stack",
    color: "#a5b4fc",
    x1: "52%", y1: "33%",
    x2: "22%", y2: "18%",
    dotX: "52%", dotY: "33%",
    delay: 0,
  },
  {
    id: "lipo",
    label: "LiPo Power Cell",
    sublabel: "12hr Mobile Runtime · USB-C Charge",
    color: "#67e8f9",
    x1: "52%", y1: "58%",
    x2: "78%", y2: "72%",
    dotX: "52%", dotY: "58%",
    delay: 0.25,
  },
  {
    id: "usba",
    label: "USB-A Female Port",
    sublabel: "Universal HID / Mass Storage",
    color: "#86efac",
    x1: "52%", y1: "81%",
    x2: "22%", y2: "90%",
    dotX: "52%", dotY: "81%",
    delay: 0.5,
  },
];

export default function TechDeepDive({ scrollYProgress }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });

  // Scale device image as user scrolls into this section
  const scale = useTransform(scrollYProgress, [0.1, 0.35], [1, 1.35]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden"
      style={{ backgroundColor: "var(--color-void)" }}
    >
      {/* Background noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16 relative z-10"
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
        >
          // Internal Architecture
        </p>
        <h2
          className="text-4xl md:text-6xl font-bold tracking-tight"
          style={{ color: "var(--color-led-white)" }}
        >
          The Transparency.
        </h2>
        <p
          className="mt-4 text-lg max-w-xl mx-auto"
          style={{ color: "var(--color-dim)" }}
        >
          The smoked acrylic shell is not cosmetic. It&apos;s intentional.
          You should see what you&apos;re buying.
        </p>
      </motion.div>

      {/* Device + SVG callout diagram */}
      <div className="relative flex items-center justify-center w-full max-w-4xl mx-auto">
        <motion.div
          style={{ scale, opacity }}
          className="relative w-[420px] h-[520px]"
        >
          {/* Background photograph of the internal board of the device */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/image_9113a7cd.png"
            alt="Link Zero Internal PCB layout"
            className="absolute w-[180px] h-[460px] top-[30px] left-[120px] object-cover rounded-[22px] opacity-40 pointer-events-none z-0 mix-blend-screen"
          />

          {/* Device diagram SVG */}
          <svg
            width="420"
            height="520"
            viewBox="0 0 420 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full z-10 svg-callout"
            aria-label="Link Zero internal component diagram"
          >
            {/* Dongle shell outline */}
            <rect
              x="120" y="30" width="180" height="460" rx="22"
              fill="rgba(200,210,230,0.06)"
              stroke="rgba(245,245,255,0.25)"
              strokeWidth="1.5"
            />
            <rect
              x="130" y="40" width="160" height="440" rx="18"
              fill="rgba(245,245,255,0.025)"
            />

            {/* LED at top */}
            <circle cx="210" cy="68" r="8" fill="rgba(245,245,255,0.9)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="210" cy="68" r="18" fill="rgba(245,245,255,0.06)">
              <animate attributeName="r" values="12;24;12" dur="2.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0;0.3" dur="2.4s" repeatCount="indefinite"/>
            </circle>

            {/* ESP32-S3 chip — top 1/3 */}
            <rect x="150" y="100" width="120" height="90" rx="6"
              fill="rgba(165,180,252,0.08)"
              stroke="rgba(165,180,252,0.25)"
              strokeWidth="1.2"
            />
            {/* Chip grid */}
            {[0,1,2,3,4,5].map((i) => (
              <rect key={`cl${i}`} x="142" y={108 + i * 13} width="8" height="5" rx="1.5" fill="rgba(165,180,252,0.25)" />
            ))}
            {[0,1,2,3,4,5].map((i) => (
              <rect key={`cr${i}`} x="270" y={108 + i * 13} width="8" height="5" rx="1.5" fill="rgba(165,180,252,0.25)" />
            ))}
            <text x="210" y="148" textAnchor="middle" fontSize="9" fill="rgba(165,180,252,0.6)" fontFamily="JetBrains Mono, monospace">ESP32-S3</text>
            <text x="210" y="162" textAnchor="middle" fontSize="7" fill="rgba(165,180,252,0.4)" fontFamily="JetBrains Mono, monospace">WROOM-1</text>

            {/* Antenna traces */}
            <path d="M150 145 Q140 145 140 135 Q140 125 155 125" stroke="rgba(165,180,252,0.2)" strokeWidth="1" fill="none"/>

            {/* LiPo battery — middle */}
            <rect x="150" y="220" width="120" height="80" rx="6"
              fill="rgba(103,232,249,0.06)"
              stroke="rgba(103,232,249,0.22)"
              strokeWidth="1.2"
            />
            <text x="210" y="262" textAnchor="middle" fontSize="9" fill="rgba(103,232,249,0.5)" fontFamily="JetBrains Mono, monospace">LiPo 1200mAh</text>
            <text x="210" y="276" textAnchor="middle" fontSize="7" fill="rgba(103,232,249,0.35)" fontFamily="JetBrains Mono, monospace">3.7V / 4.44Wh</text>
            {/* Battery fill indicator */}
            <rect x="158" y="288" width="80" height="4" rx="2" fill="rgba(103,232,249,0.08)" />
            <rect x="158" y="288" width="58" height="4" rx="2" fill="rgba(103,232,249,0.3)" />

            {/* USB-A port — bottom */}
            <rect x="160" y="410" width="100" height="40" rx="6"
              fill="rgba(134,239,172,0.06)"
              stroke="rgba(134,239,172,0.22)"
              strokeWidth="1.2"
            />
            <rect x="175" y="418" width="26" height="24" rx="2" fill="rgba(0,0,0,0.5)" stroke="rgba(134,239,172,0.2)" strokeWidth="1"/>
            <rect x="219" y="418" width="26" height="24" rx="2" fill="rgba(0,0,0,0.5)" stroke="rgba(134,239,172,0.2)" strokeWidth="1"/>
            <text x="210" y="462" textAnchor="middle" fontSize="8" fill="rgba(134,239,172,0.45)" fontFamily="JetBrains Mono, monospace">USB-A FEMALE</text>

            {/* PCB traces between components */}
            <line x1="210" y1="190" x2="210" y2="220" stroke="rgba(165,180,252,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>
            <line x1="210" y1="300" x2="210" y2="380" stroke="rgba(103,232,249,0.15)" strokeWidth="1.5" strokeDasharray="4 3"/>

            {/* Callout lines (animated on inView) */}
            {isInView && CALLOUTS.map((c, i) => (
              <g key={c.id}>
                {/* Leader line */}
                <line
                  x1={c.dotX} y1={c.dotY}
                  x2={c.x2} y2={c.y2}
                  stroke={c.color}
                  strokeWidth="1"
                  strokeOpacity="0.6"
                  strokeDasharray="200"
                  strokeDashoffset="200"
                  style={{
                    animation: `draw-line 0.8s ease-out ${c.delay}s forwards`,
                  }}
                />
                {/* Dot on component */}
                <circle cx={c.dotX} cy={c.dotY} r="4"
                  fill={c.color}
                  fillOpacity="0.9"
                  style={{ animation: `fade-up 0.4s ease-out ${c.delay}s both` }}
                />
                <circle cx={c.dotX} cy={c.dotY} r="8"
                  fill={c.color}
                  fillOpacity="0.15"
                />
              </g>
            ))}
          </svg>

          {/* Floating callout labels */}
          {CALLOUTS.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: c.delay + 0.4 }}
              className="absolute"
              style={{
                left: i % 2 === 0 ? "-180px" : "440px",
                top: i === 0 ? "14%" : i === 1 ? "50%" : "82%",
                transform: "translateY(-50%)",
                width: "180px",
              }}
            >
              <div
                className="glass rounded-lg px-3 py-2 border"
                style={{ borderColor: `${c.color}30` }}
              >
                <p
                  className="text-[10px] font-semibold mb-1"
                  style={{ color: c.color, fontFamily: "var(--font-jetbrains)" }}
                >
                  {c.label}
                </p>
                <p
                  className="text-[9px] leading-relaxed"
                  style={{ color: "var(--color-muted)" }}
                >
                  {c.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Spec cards row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-24 w-full max-w-4xl relative z-10">
        <SpecCard
          icon="⚡"
          label="Host Core"
          value="ESP32-S3"
          description="Dual-core 240MHz Xtensa LX7. Native USB-OTG. 512KB SRAM. Wi-Fi 802.11n."
          accentColor="#a5b4fc"
          delay={0}
        />
        <SpecCard
          icon="🔋"
          label="Battery"
          value="1200mAh"
          description="LiPo 3.7V. 12hr runtime. USB-C charging. 2hr full charge."
          accentColor="#67e8f9"
          delay={0.1}
        />
        <SpecCard
          icon="🔌"
          label="USB Port"
          value="USB 2.0"
          description="Full-speed USB-A female. HID, Mass Storage, CDC class support via USBip."
          accentColor="#86efac"
          delay={0.2}
        />
      </div>
    </section>
  );
}
