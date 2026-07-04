"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import HeroSection from "./HeroSection";
import TechDeepDive from "./TechDeepDive";
import WorkflowSection from "./WorkflowSection";
import BatchSection from "./BatchSection";
import Footer from "./Footer";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative" style={{ fontFamily: "var(--font-inter)" }}>
      <HeroSection />
      <TechDeepDive scrollYProgress={scrollYProgress} />
      <WorkflowSection scrollYProgress={scrollYProgress} />
      <BatchSection />
      <Footer />
    </div>
  );
}
