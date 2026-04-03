"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionReveal from "./SectionReveal";
import { about, techStack, stats } from "@/data/portfolio";
import { useCounter } from "@/hooks/useCounter";

function StatCard({ label, value, suffix, decimals = 0, delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const { count, start } = useCounter(value, 2000, decimals);

  useEffect(() => {
    if (inView) start();
  }, [inView, start]);

  return (
    <motion.div
      ref={ref}
      className="glass-card gradient-border p-5 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <div
        className="font-mono text-3xl font-bold mb-1"
        style={{
          background: "linear-gradient(135deg, var(--nebula-purple), var(--nebula-blue))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
        {suffix}
      </div>
      <div className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
    </motion.div>
  );
}

function TechCategory({ title, items, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <h4
        className="font-mono text-xs uppercase tracking-widest mb-3"
        style={{ color: "var(--text-muted)" }}
      >
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <motion.span
            key={item.name}
            className="tech-pill"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-xs">{item.icon}</span>
            {item.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <span className="section-label mb-4 block">About</span>
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-12"
            style={{ color: "var(--star-white)" }}
          >
            A bit about me
          </h2>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <SectionReveal delay={0.1}>
            <div className="space-y-5">
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {p}
                </p>
              ))}
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                {...stat}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>

        <SectionReveal delay={0.2}>
          <h3
            className="font-display text-xl font-semibold mb-8"
            style={{ color: "var(--star-white)" }}
          >
            Tech stack
          </h3>
        </SectionReveal>

        <div className="grid md:grid-cols-3 gap-8">
          <TechCategory title="Languages" items={techStack.languages} delay={0.1} />
          <TechCategory title="Frameworks" items={techStack.frameworks} delay={0.2} />
          <TechCategory title="Tools & Infra" items={techStack.tools} delay={0.3} />
        </div>
      </div>
    </section>
  );
}