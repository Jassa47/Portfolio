"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => {
        setPhase(4);
        if (onComplete) onComplete();
      }, 2800),
    ];
  return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ background: "var(--void-deep)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: "var(--star-white)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, Math.random() * 0.6 + 0.2, 0] }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 1.5,
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={
                phase >= 1
                  ? { scale: 1, rotate: 0 }
                  : { scale: 0, rotate: -180 }
              }
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-mono text-2xl font-bold"
              style={{
                background: "linear-gradient(135deg, var(--nebula-purple), var(--nebula-blue))",
                color: "var(--star-white)",
                boxShadow: "0 0 40px rgba(123,94,167,0.4)",
              }}
            >
              {personalInfo.initials}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={
                phase >= 2
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.5 }}
              className="font-display text-lg font-medium"
              style={{ color: "var(--star-white)" }}
            >
              {personalInfo.name}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
              className="w-48 h-[2px] rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, var(--nebula-purple), var(--nebula-blue), var(--nebula-teal))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: phase >= 3 ? "100%" : phase >= 2 ? "60%" : "20%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 0.4 } : { opacity: 0 }}
              className="font-mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {phase < 3 ? "Initializing starfield..." : "Ready for launch"}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}