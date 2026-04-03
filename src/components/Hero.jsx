"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { ChevronDown } from "lucide-react";

function Typewriter({ text, delay = 0, speed = 50 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [started, displayed, text, speed]);

  return (
    <span>
      {displayed}
      <span
        className="inline-block w-[2px] h-[1em] ml-1 align-middle"
        style={{
          background: "var(--nebula-purple)",
          animation: "blink 1s step-end infinite",
        }}
      />
    </span>
  );
}

function HeroLink({ href, className, style, children }) {
  return (
    <a href={href} className={className} style={style}>
      {children}
    </a>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(123,94,167,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="section-label justify-center">Portfolio</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display font-bold tracking-tight mb-6 text-glow"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            lineHeight: 1.1,
            color: "var(--star-white)",
          }}
        >
          {personalInfo.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mb-8 font-mono text-lg md:text-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          <Typewriter text={personalInfo.tagline} delay={1200} speed={40} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-sm mb-10 font-mono"
          style={{ color: "var(--text-muted)" }}
        >
          📍 {personalInfo.location}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <HeroLink href="#projects" className="magnetic-btn">
            View my work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </HeroLink>
          <HeroLink
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/5"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--text-secondary)",
            }}
          >
            Get in touch
          </HeroLink>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown
            size={24}
            style={{ color: "var(--text-muted)", opacity: 0.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}