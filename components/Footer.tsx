"use client";

import { motion } from "framer-motion";

const LINKS = [
  {
    category: "Firmware",
    icon: "⌨",
    items: [
      { label: "GitHub Repository", href: "https://github.com/link-zero-hw/firmware", description: "ESP32-S3 USBip firmware — Apache-2.0" },
      { label: "Releases", href: "https://github.com/link-zero-hw/firmware/releases", description: "Stable OTA builds" },
      { label: "Contributing", href: "https://github.com/link-zero-hw/firmware/blob/main/CONTRIBUTING.md", description: "How to submit patches" },
    ],
  },
  {
    category: "Hardware",
    icon: "⬡",
    items: [
      { label: "PCBWay Project", href: "https://www.pcbway.com", description: "Order bare PCBs from source" },
      { label: "JLCPCB PCBA", href: "https://jlcpcb.com", description: "Fully assembled boards" },
      { label: "Schematic PDF", href: "https://github.com/link-zero-hw/hardware", description: "KiCad source files — CERN-OHL-S" },
    ],
  },
  {
    category: "Community",
    icon: "◈",
    items: [
      { label: "Discussions", href: "https://github.com/link-zero-hw/firmware/discussions", description: "Q&A, ideas, builds" },
      { label: "Matrix Chat", href: "https://matrix.to/#/#link-zero:matrix.org", description: "#link-zero:matrix.org" },
      { label: "Open Collective", href: "https://opencollective.com", description: "Fund hardware testing" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative border-t overflow-hidden"
      style={{
        backgroundColor: "var(--color-void)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      {/* Ambient glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(245,245,255,0.3), transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* Brand row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 pb-12 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              {/* LED dot */}
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse-glow"
                style={{ backgroundColor: "var(--color-led-white)" }}
              />
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-inter)", color: "var(--color-led-white)" }}
              >
                Link Zero
              </span>
            </div>
            <p
              className="text-sm"
              style={{ color: "var(--color-muted)", fontFamily: "var(--font-jetbrains)" }}
            >
              Open Hardware · Zero Profit · Factory Direct
            </p>
          </div>

          {/* Certification badges */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "OSHW", sublabel: "Certified" },
              { label: "OSI", sublabel: "Apache-2.0" },
              { label: "CERN", sublabel: "OHL-S v2" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: "var(--color-smoke)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span
                  className="text-xs font-bold"
                  style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-led-white)" }}
                >
                  {badge.label}
                </span>
                <span
                  className="text-[9px]"
                  style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
                >
                  {badge.sublabel}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Link columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {LINKS.map((col, colIdx) => (
            <motion.div
              key={col.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: colIdx * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <span
                  style={{ color: "var(--color-muted)", fontFamily: "var(--font-jetbrains)", fontSize: "14px" }}
                  aria-hidden="true"
                >
                  {col.icon}
                </span>
                <p
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
                >
                  {col.category}
                </p>
              </div>

              <ul className="space-y-4">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block transition-all duration-200"
                    >
                      <span
                        className="text-sm font-medium group-hover:text-white transition-colors"
                        style={{ color: "var(--color-dim)" }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="block text-[11px] mt-0.5"
                        style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
                      >
                        {item.description}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            className="text-xs"
            style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
          >
            © 2024 Link Zero Contributors. No rights reserved.
            <span className="ml-2 opacity-50">Build the future, share the schematics.</span>
          </p>

          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
              style={{ backgroundColor: "var(--color-led-white)" }}
            />
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-muted)" }}
            >
              link-zero.io
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
