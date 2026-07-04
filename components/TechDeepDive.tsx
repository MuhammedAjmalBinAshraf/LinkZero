"use client";

import { motion, useTransform, MotionValue, useInView } from "framer-motion";
import { useRef, useState } from "react";
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
    details: "Runs custom virtualized host firmware. Emulates full USB packet encapsulation over IP interfaces with latency under 3ms. Features native hardware cryptography.",
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
    details: "Lithium-Polymer 3.7V battery managed by a dedicated TP4056 charge chip. Low-dropout regulation preserves battery life and safeguards components during spikes.",
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
    details: "High-retention female socket wired directly to the ESP32 hardware OTG pins. Emulates keyboard, mouse, gaming inputs, serial consoles, and custom bulk data pipes.",
    x1: "52%", y1: "81%",
    x2: "22%", y2: "90%",
    dotX: "52%", dotY: "81%",
    delay: 0.5,
  },
];

export default function TechDeepDive({ scrollYProgress }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });
  const [activeCallout, setActiveCallout] = useState("esp32");

  // Scale device image as user scrolls into this section
  const scale = useTransform(scrollYProgress, [0.12, 0.42], [1, 1.35]);
  const opacity = useTransform(scrollYProgress, [0.06, 0.22], [0, 1]);

  const activeDetail = CALLOUTS.find((c) => c.id === activeCallout);

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden bg-void"
    >
      {/* Background CAD grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-grid-lines" />

      {/* Dotted mesh grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-grid-dots" />

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
          // Hardware blueprint
        </p>
        <h2
          className="text-4xl md:text-6xl font-black tracking-tight"
          style={{ color: "var(--color-led-white)" }}
        >
          The Transparency.
        </h2>
        <p
          className="mt-4 text-md max-w-lg mx-auto leading-relaxed"
          style={{ color: "var(--color-dim)" }}
        >
          Every component and PCB trace route is visible through the custom smoked acrylic casing. Trace the physical mechanics of virtualization.
        </p>
      </motion.div>

      {/* Main Diagram Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl mx-auto z-10">
        
        {/* Left column: Hotspot detailed specs panel */}
        <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
          <div
            className="glass-card rounded-2xl p-6 border w-full flex flex-col gap-4 relative overflow-hidden"
            style={{ borderColor: "var(--color-border)" }}
          >
            {/* Technical frame border highlights */}
            <div className="absolute top-2 right-3 font-mono text-[8px] opacity-25 select-none">HOTSPOT_INT_3.0</div>
            
            <span
              className="text-[9px] font-mono tracking-widest uppercase"
              style={{ color: activeDetail?.color }}
            >
              // ACTIVE_COMPONENT //
            </span>
            <h3
              className="text-xl font-bold tracking-tight"
              style={{ color: "var(--color-led-white)" }}
            >
              {activeDetail?.label}
            </h3>
            <p
              className="text-[10px] font-mono"
              style={{ color: "var(--color-muted)" }}
            >
              {activeDetail?.sublabel}
            </p>
            <p
              className="text-xs leading-relaxed mt-2"
              style={{ color: "var(--color-dim)" }}
            >
              {activeDetail?.details}
            </p>

            {/* Click to inspect instructions */}
            <div
              className="mt-4 p-2.5 rounded-lg border text-[9px] text-center"
              style={{
                backgroundColor: "var(--color-smoke)",
                borderColor: "var(--color-border)",
                color: "var(--color-muted)",
                fontFamily: "var(--font-jetbrains)",
              }}
            >
              * Click the visual hotspots on the right diagram to switch component metrics.
            </div>
          </div>

          {/* Quick switcher buttons list */}
          <div className="flex flex-col gap-2">
            {CALLOUTS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCallout(c.id)}
                className="w-full px-4 py-3 rounded-xl border flex items-center gap-3 transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: activeCallout === c.id ? `${c.color}08` : "var(--color-acrylic)",
                  borderColor: activeCallout === c.id ? `${c.color}40` : "var(--color-border)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: c.color,
                    boxShadow: activeCallout === c.id ? `0 0 8px ${c.color}` : "none",
                  }}
                />
                <span
                  className="text-xs font-semibold text-left"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: activeCallout === c.id ? "var(--color-led-white)" : "var(--color-dim)",
                  }}
                >
                  {c.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right column: Interactive SVG device diagram */}
        <div className="lg:col-span-8 flex items-center justify-center order-1 lg:order-2">
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
                fill="rgba(200,210,230,0.02)"
                stroke="rgba(248,248,255,0.18)"
                strokeWidth="1.2"
              />

              {/* Status LED at top */}
              <circle cx="210" cy="68" r="6" fill="rgba(248,248,255,0.9)">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite"/>
              </circle>
              <circle cx="210" cy="68" r="14" fill="rgba(248,248,255,0.06)">
                <animate attributeName="r" values="10;20;10" dur="2.4s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2.4s" repeatCount="indefinite"/>
              </circle>

              {/* Callout lines (animated on inView) */}
              {isInView && CALLOUTS.map((c, i) => {
                const isActive = activeCallout === c.id;
                return (
                  <g key={c.id} className="cursor-pointer" onClick={() => setActiveCallout(c.id)}>
                    {/* Leader line */}
                    <line
                      x1={c.dotX} y1={c.dotY}
                      x2={c.x2} y2={c.y2}
                      stroke={c.color}
                      strokeWidth={isActive ? "1.5" : "0.75"}
                      strokeOpacity={isActive ? "0.9" : "0.35"}
                      strokeDasharray="200"
                      strokeDashoffset="200"
                      style={{
                        animation: `draw-line 0.8s ease-out ${c.delay}s forwards`,
                        transition: "stroke-width 0.3s, stroke-opacity 0.3s",
                      }}
                    />
                    
                    {/* Hotspot anchor dot on component */}
                    <circle cx={c.dotX} cy={c.dotY} r="6"
                      fill={c.color}
                      fillOpacity={isActive ? "1" : "0.6"}
                      style={{
                        animation: `fade-up 0.4s ease-out ${c.delay}s both`,
                        transition: "fill-opacity 0.3s",
                      }}
                    />
                    <circle cx={c.dotX} cy={c.dotY} r={isActive ? "16" : "10"}
                      fill={c.color}
                      fillOpacity={isActive ? "0.2" : "0.08"}
                      style={{ transition: "r 0.3s, fill-opacity 0.3s" }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Floating callout labels (Linked with active selector state) */}
            {CALLOUTS.map((c, i) => {
              const isActive = activeCallout === c.id;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: isActive ? 1 : 0.45 } : { opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute cursor-pointer"
                  onClick={() => setActiveCallout(c.id)}
                  style={{
                    left: i % 2 === 0 ? "-180px" : "440px",
                    top: i === 0 ? "14%" : i === 1 ? "50%" : "82%",
                    transform: "translateY(-50%)",
                    width: "180px",
                  }}
                >
                  <div
                    className="glass rounded-xl px-3 py-2.5 border transition-all duration-300"
                    style={{
                      borderColor: isActive ? c.color : "var(--color-border)",
                      backgroundColor: isActive ? `${c.color}05` : "var(--color-acrylic)",
                      boxShadow: isActive ? `0 0 12px ${c.color}15` : "none",
                    }}
                  >
                    <p
                      className="text-[10px] font-bold mb-1"
                      style={{ color: c.color, fontFamily: "var(--font-jetbrains)" }}
                    >
                      {c.label}
                    </p>
                    <p
                      className="text-[9px] leading-relaxed"
                      style={{ color: "var(--color-dim)" }}
                    >
                      {c.sublabel}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>

      {/* Spec cards row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-28 w-full max-w-4xl relative z-10">
        <SpecCard
          icon="⚡"
          label="Core IC Module"
          value="ESP32-S3"
          description="Dual-core 240MHz Tensilica core. Built-in Wi-Fi, hardware encryption accelerators, and dedicated hardware USB endpoints."
          accentColor="#a5b4fc"
          delay={0}
        />
        <SpecCard
          icon="🔋"
          label="Power Circuitry"
          value="1200mAh"
          description="LiPo cell paired with integrated TP4056 charge/discharge monitoring logic and LDO safety limits."
          accentColor="#67e8f9"
          delay={0.1}
        />
        <SpecCard
          icon="🔌"
          label="Universal Link"
          value="USB 2.0 Port"
          description="Direct OTG USB-A interface translating physical descriptors into virtualized USBip TCP/IP network frames."
          accentColor="#86efac"
          delay={0.2}
        />
      </div>
    </section>
  );
}
