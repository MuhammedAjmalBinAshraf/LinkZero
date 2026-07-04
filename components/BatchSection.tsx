"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const BATCH_TARGET = 100;
const BATCH_NUM = 1;

export default function BatchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  
  // Interactive pricing calculator states
  const [qty, setQty] = useState(1);
  const [currentOrders, setCurrentOrders] = useState(38);
  const [displayCount, setDisplayCount] = useState(0);
  
  // Rolling mock commits log
  const [commits, setCommits] = useState([
    { user: "ajmal_dev", units: 1, time: "4s ago" },
    { user: "circuit_bender", units: 2, time: "1m ago" },
    { user: "0x_esp32", units: 1, time: "3m ago" },
    { user: "macro_lens", units: 5, time: "8m ago" },
  ]);

  // Pricing formula: base component cost + proportional shipping cost
  const baseCost = 9.80;
  const shippingShare = 3.20;
  const unitPrice = parseFloat((baseCost + shippingShare / qty).toFixed(2));
  const totalPrice = parseFloat((unitPrice * qty).toFixed(2));

  // Count up animation
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const value = Math.round(eased * currentOrders);
      setDisplayCount(value);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, currentOrders]);

  // Periodic random commits simulator
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      const users = ["hardware_hacker", "embed_wizard", "lz_enthusiast", "pcb_tester", "diy_creator"];
      const randUser = users[Math.floor(Math.random() * users.length)];
      const randUnits = Math.random() < 0.85 ? 1 : Math.floor(Math.random() * 3) + 2;
      
      setCurrentOrders((prev) => {
        const next = Math.min(prev + randUnits, BATCH_TARGET);
        return next;
      });

      setCommits((prev) => [
        { user: randUser, units: randUnits, time: "Just now" },
        ...prev.slice(0, 3).map((c) => ({
          ...c,
          time: c.time === "Just now" ? "1m ago" : c.time.includes("m") ? `${parseInt(c.time) + 1}m ago` : c.time,
        })),
      ]);
    }, 12000); // add commit every 12s

    return () => clearInterval(interval);
  }, [isInView]);

  const pctFilled = (displayCount / BATCH_TARGET) * 100;

  const DATA_ROWS = [
    { key: "Batch_ID", value: `#00${BATCH_NUM}` },
    { key: "Base_IC_Cost", value: "$9.80 USD" },
    { key: "Fabrication_Qty", value: "100 units (MOQ)" },
    { key: "Total_Required", value: "100 orders" },
    { key: "Launch_Status", value: `${displayCount}% compiled` },
    { key: "Factory_Margin", value: "$0.00 (direct source)" },
    { key: "Design_Standard", value: "CERN-OHL-S v2" },
  ];

  return (
    <section
      id="batch"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden bg-void"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(248,248,255,0.08), transparent)" }}
      />

      {/* Background CAD grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-grid-lines" />

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
            // Factory Production
          </p>
          <h2
            className="text-4xl md:text-6xl font-black tracking-tight mb-6 max-w-2xl"
            style={{ color: "var(--color-led-white)" }}
          >
            We Don&apos;t Sell Products.
            <br />
            <span style={{ color: "var(--color-muted)" }}>We Trigger Batches.</span>
          </h2>
          <p
            className="text-md max-w-xl leading-relaxed"
            style={{ color: "var(--color-dim)" }}
          >
            No middleman markups. Once 100 orders are committed, we place the single fabrication line order with PCBWay. You pay exactly manufacturing costs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left: Counter, progress, and interactive pricing calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            {/* Big counter */}
            <div
              className="glass-card rounded-2xl p-8 border"
              style={{ borderColor: "var(--color-border)" }}
            >
              {/* Corner crosshairs */}
              <span className="absolute top-1.5 left-2.5 font-mono text-[7px] text-white/10 select-none pointer-events-none">+</span>
              <span className="absolute top-1.5 right-2.5 font-mono text-[7px] text-white/10 select-none pointer-events-none">+</span>
              
              <p
                className="text-xs tracking-[0.25em] uppercase mb-6"
                style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
              >
                Batch #{BATCH_NUM} — status_metrics
              </p>

              {/* Animated counter */}
              <div className="flex items-end gap-3 mb-2">
                <span
                  className="text-8xl font-black tabular-nums leading-none glow-text"
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
                className="text-xs mb-8"
                style={{ color: "var(--color-dim)" }}
              >
                Orders compiled to trigger production line
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
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full glow"
                    style={{
                      background: "linear-gradient(90deg, rgba(248,248,255,0.6), rgba(248,248,255,1))",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 font-mono text-[8px] text-white/40">
                  <span>{pctFilled.toFixed(1)}% FILLED</span>
                  <span>{BATCH_TARGET - displayCount} UNITS REMAINING</span>
                </div>
              </div>
            </div>

            {/* Interactive pricing calculator */}
            <div
              className="glass-card rounded-2xl p-6 border flex flex-col gap-4"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="flex justify-between items-center font-mono text-[9px] text-white/30">
                <span>BATCH_PRICE_CALCULATOR</span>
                <span>VER_1.0</span>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span>Quantity: {qty} {qty === 1 ? "unit" : "units"}</span>
                  <span>Unit cost: ${unitPrice.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={qty}
                  onChange={(e) => setQty(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>

              <div className="flex justify-between items-end border-t pt-3" style={{ borderColor: "var(--color-border)" }}>
                <div>
                  <p className="text-[9px] text-muted tracking-wider uppercase font-jetbrains">EST_TOTAL_FACTORY_COST</p>
                  <p className="text-xl font-bold font-jetbrains" style={{ color: "var(--color-led-white)" }}>
                    ${totalPrice.toFixed(2)} USD
                  </p>
                </div>
                <span className="text-[8px] font-mono text-muted text-right max-w-[140px]">
                  * Combined batch shipping reduces unit cost.
                </span>
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href="https://github.com/link-zero-hw"
              id="batch-cta-button"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="flex items-center justify-center gap-3 w-full py-5 px-8 rounded-xl font-bold text-xs tracking-[0.1em] uppercase transition-all duration-300 shadow-[0_0_32px_rgba(248,248,255,0.2)] hover:shadow-[0_0_48px_rgba(248,248,255,0.35)]"
              style={{
                background: "var(--color-led-white)",
                color: "var(--color-void)",
                fontFamily: "var(--font-inter)",
              }}
            >
              ⚡ Commit Batch #{BATCH_NUM} — ${unitPrice.toFixed(2)}/unit
            </motion.a>
          </motion.div>

          {/* Right: Raw data grid & live commits log */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Raw JSON Data Grid */}
            <div
              className="glass-card rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--color-border)" }}
            >
              {/* Header bar */}
              <div
                className="px-6 py-4 border-b flex items-center gap-3"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-smoke)" }}
              >
                <span
                  style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10px", color: "var(--color-muted)" }}
                >
                  production_spec.json
                </span>
                <span
                  className="ml-auto text-[9px] px-2 py-0.5 rounded font-mono border"
                  style={{
                    backgroundColor: "rgba(134,239,172,0.06)",
                    color: "#86efac",
                    borderColor: "rgba(134,239,172,0.15)",
                  }}
                >
                  ACTIVE
                </span>
              </div>

              {/* Data rows */}
              <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
                {DATA_ROWS.map((row, i) => (
                  <div
                    key={row.key}
                    className="flex items-center px-6 py-3"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <span
                      className="w-40 text-[10px] shrink-0"
                      style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
                    >
                      {row.key}
                    </span>
                    <span
                      className="text-[10px]"
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        color: row.key === "Factory_Margin"
                          ? "#86efac"
                          : row.key === "Launch_Status"
                          ? "var(--color-led-white)"
                          : "var(--color-dim)",
                      }}
                    >
                      {row.key === "Launch_Status"
                        ? `${pctFilled.toFixed(0)}% compiled`
                        : row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Commit Ledger Log */}
            <div
              className="glass-card rounded-2xl p-6 border flex flex-col gap-4"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="flex justify-between items-center font-mono text-[9px] text-white/30">
                <span>LIVE_COMMIT_LEDGER</span>
                <span>REFRESH: AUTO</span>
              </div>

              <div className="flex flex-col gap-2.5">
                {commits.map((c, i) => (
                  <div key={i} className="flex justify-between items-center font-mono text-[10px] py-1 border-b border-white/[0.02] last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white/20">›</span>
                      <span className="text-white/70">{c.user}</span>
                      <span className="text-white/30">committed</span>
                      <span className="px-1.5 py-0.2 rounded bg-white/5 border border-white/5 text-[8px] text-white/60">
                        {c.units} {c.units === 1 ? "unit" : "units"}
                      </span>
                    </div>
                    <span className="text-white/25 text-[9px]">{c.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
