"use client";

import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const BATCH_CURRENT = 42;
const BATCH_TARGET = 100;
const BATCH_PRICE = "13.00";
const BATCH_NUM = 1;

export default function BatchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const [displayCount, setDisplayCount] = useState(0);
  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const value = Math.round(eased * BATCH_CURRENT);
      setDisplayCount(value);
      setDisplayPct(Math.round((value / BATCH_TARGET) * 100));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView]);

  const pctFilled = (BATCH_CURRENT / BATCH_TARGET) * 100;

  const DATA_ROWS = [
    { key: "Batch", value: `#${BATCH_NUM}` },
    { key: "Unit_Cost", value: `$${BATCH_PRICE} USD` },
    { key: "MOQ", value: "100 units" },
    { key: "Launch_Threshold", value: "100 orders" },
    { key: "Current_Orders", value: `${BATCH_CURRENT} / ${BATCH_TARGET}` },
    { key: "Margin", value: "$0.00 (factory direct)" },
    { key: "Firmware", value: "Apache-2.0" },
    { key: "Hardware", value: "CERN-OHL-S v2" },
    { key: "Manufacturer", value: "PCBWay / JLCPCB" },
    { key: "Ship_From", value: "Shenzhen, China" },
  ];

  return (
    <section
      id="batch"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden"
      style={{ backgroundColor: "var(--color-void)" }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(245,245,255,0.15), transparent)" }}
      />

      {/* Noise grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
          >
            // Production Model
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-2xl"
            style={{ color: "var(--color-led-white)" }}
          >
            We Don&apos;t Sell Products.
            <br />
            <span style={{ color: "var(--color-muted)" }}>We Trigger Batches.</span>
          </h2>
          <p
            className="text-lg max-w-xl"
            style={{ color: "var(--color-dim)" }}
          >
            No stock. No markup. When 100 people commit, we place a single factory order.
            You pay exactly what the factory charges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left: Counter + progress */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Big counter */}
            <div
              className="glass rounded-2xl p-8 mb-6 border"
              style={{ borderColor: "var(--color-border)" }}
            >
              <p
                className="text-xs tracking-[0.25em] uppercase mb-6"
                style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
              >
                Batch #{BATCH_NUM} — Current Status
              </p>

              {/* Animated counter */}
              <div className="flex items-end gap-3 mb-2">
                <span
                  className="text-8xl font-bold tabular-nums leading-none glow-text"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: "var(--color-led-white)",
                  }}
                >
                  {displayCount}
                </span>
                <span
                  className="text-4xl font-light mb-3"
                  style={{ color: "var(--color-muted)", fontFamily: "var(--font-jetbrains)" }}
                >
                  / {BATCH_TARGET}
                </span>
              </div>
              <p
                className="text-sm mb-8"
                style={{ color: "var(--color-dim)" }}
              >
                Orders to trigger factory launch
              </p>

              {/* Progress bar */}
              <div className="relative">
                <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--color-smoke)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${pctFilled}%` } : { width: 0 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full glow"
                    style={{
                      background: "linear-gradient(90deg, rgba(245,245,255,0.7), rgba(245,245,255,1))",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span
                    style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10px", color: "var(--color-dim)" }}
                  >
                    {displayPct}% filled
                  </span>
                  <span
                    style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10px", color: "var(--color-muted)" }}
                  >
                    {BATCH_TARGET - displayCount} remaining
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href="https://github.com/link-zero-hw"
              id="batch-cta-button"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 w-full py-5 px-8 rounded-xl font-bold text-base tracking-wide transition-all duration-300 glow-lg"
              style={{
                background: "var(--color-led-white)",
                color: "var(--color-void)",
                fontFamily: "var(--font-inter)",
              }}
            >
              <span className="text-xl">⚡</span>
              Join Batch #{BATCH_NUM} — ${BATCH_PRICE} Factory Cost
            </motion.a>

            <p
              className="text-center mt-3 text-xs"
              style={{ color: "var(--color-muted)", fontFamily: "var(--font-jetbrains)" }}
            >
              Charged only when batch reaches 100 orders · Full refund if cancelled
            </p>
          </motion.div>

          {/* Right: Raw data grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div
              className="glass rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--color-border)" }}
            >
              {/* Header bar */}
              <div
                className="px-6 py-4 border-b flex items-center gap-3"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-smoke)" }}
              >
                <span
                  style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px", color: "var(--color-muted)" }}
                >
                  batch.json
                </span>
                <span
                  className="ml-auto text-xs px-2 py-0.5 rounded"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    backgroundColor: "rgba(134,239,172,0.1)",
                    color: "rgba(134,239,172,0.8)",
                    border: "1px solid rgba(134,239,172,0.2)",
                  }}
                >
                  OPEN
                </span>
              </div>

              {/* Data rows */}
              <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
                {DATA_ROWS.map((row, i) => (
                  <motion.div
                    key={row.key}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center px-6 py-3"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <span
                      className="w-44 text-[11px] shrink-0"
                      style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
                    >
                      {row.key}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        color: row.key === "Margin"
                          ? "rgba(134,239,172,0.8)"
                          : row.key === "Current_Orders"
                          ? "var(--color-led-white)"
                          : "var(--color-dim)",
                      }}
                    >
                      {row.key === "Current_Orders"
                        ? `${displayCount} / ${BATCH_TARGET}`
                        : row.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* License badges */}
            <div className="flex gap-3 mt-4 flex-wrap">
              {[
                { label: "Firmware", badge: "Apache-2.0", color: "#a5b4fc" },
                { label: "Hardware", badge: "CERN-OHL-S", color: "#67e8f9" },
                { label: "CAD Files", badge: "CC BY-SA 4.0", color: "#86efac" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px]"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    backgroundColor: `${b.color}10`,
                    border: `1px solid ${b.color}25`,
                    color: b.color,
                  }}
                >
                  <span style={{ opacity: 0.6 }}>{b.label}:</span>
                  <span>{b.badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
