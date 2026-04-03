"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const colorMap = {
  purple: {
    accent: "rgba(123, 94, 167, 0.15)",
    border: "rgba(123, 94, 167, 0.3)",
    text: "#7B5EA7",
    glow: "rgba(123, 94, 167, 0.4)",
  },
  blue: {
    accent: "rgba(74, 123, 247, 0.15)",
    border: "rgba(74, 123, 247, 0.3)",
    text: "#4A7BF7",
    glow: "rgba(74, 123, 247, 0.4)",
  },
  teal: {
    accent: "rgba(56, 189, 248, 0.15)",
    border: "rgba(56, 189, 248, 0.3)",
    text: "#38BDF8",
    glow: "rgba(56, 189, 248, 0.4)",
  },
  coral: {
    accent: "rgba(239, 68, 68, 0.12)",
    border: "rgba(239, 68, 68, 0.3)",
    text: "#EF4444",
    glow: "rgba(239, 68, 68, 0.3)",
  },
};

function ExternalAnchor({ href, className, children }) {
  const props = {
    href: href,
    target: "_blank",
    rel: "noopener noreferrer",
    className: className,
  };
  return <a {...props}>{children}</a>;
}

export default function ProjectCard({ project, index, featured = false }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const colors = colorMap[project.color] || colorMap.purple;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotateX((y - 0.5) * -10);
    setRotateY((x - 0.5) * 10);
    setSpotlightPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative group ${featured ? "md:col-span-2 md:row-span-2" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        className="glass-card gradient-border h-full p-6 md:p-8 flex flex-col cursor-default"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${colors.accent}, transparent 60%)`,
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: colors.text }}
              >
                {project.subtitle}
              </span>
              <h3
                className="font-display text-xl md:text-2xl font-bold mt-1"
                style={{ color: "var(--star-white)" }}
              >
                {project.title}
              </h3>
            </div>
            <div className="flex gap-2">
              {project.github && (
                <ExternalAnchor
                  href={project.github}
                  className="p-2 rounded-lg transition-colors duration-300 hover:bg-white/5"
                >
                 <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text-muted)" }}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </ExternalAnchor>
              )}
              {project.live && (
                <ExternalAnchor
                  href={project.live}
                  className="p-2 rounded-lg transition-colors duration-300 hover:bg-white/5"
                >
                  <ExternalLink size={18} style={{ color: "var(--text-muted)" }} />
                </ExternalAnchor>
              )}
            </div>
          </div>

          <p
            className="text-sm leading-relaxed mb-6 flex-grow"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.description}
          </p>

          {featured && project.stats && (
            <div
              className="flex gap-6 mb-6 py-4 border-y"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              {Object.entries(project.stats).map(([key, val]) => (
                <div key={key}>
                  <div className="font-mono text-lg font-bold" style={{ color: colors.text }}>
                    {val}
                  </div>
                  <div
                    className="text-xs font-mono capitalize"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {key}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((t) => (
              <span key={t} className="tech-pill" style={{ fontSize: "11px" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
