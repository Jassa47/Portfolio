"use client";
import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import { experience, education, certifications } from "@/data/portfolio";

function TimelineIcon({ type }) {
  if (type === "work") {
    return (
      <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--nebula-purple)" }}>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 3h-8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
      </svg>
    );
  }
  if (type === "education") {
    return (
      <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--nebula-purple)" }}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
      </svg>
    );
  }
  return (
    <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--nebula-purple)" }}>
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function TimelineCard({ item, index, type }) {
  return (
    <motion.div
      className="relative pl-10 md:pl-14 pb-12 last:pb-0"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <div
        className="absolute left-[18px] md:left-[26px] top-0 bottom-0 w-px"
        style={{
          background:
            "linear-gradient(to bottom, var(--nebula-purple), rgba(123,94,167,0.1))",
        }}
      />

      <div
        className="absolute left-[10px] md:left-[18px] top-1 w-[18px] h-[18px] rounded-full flex items-center justify-center"
        style={{
          background: "var(--void-deep)",
          border: "2px solid var(--nebula-purple)",
          boxShadow: "0 0 12px rgba(123,94,167,0.5)",
        }}
      >
        <TimelineIcon type={type} />
      </div>

      <div className="glass-card gradient-border p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-1">
          <div>
            <h3
              className="font-display text-lg font-semibold"
              style={{ color: "var(--star-white)" }}
            >
              {item.role || item.degree || item.title}
            </h3>
            <p
              className="text-sm font-mono"
              style={{ color: "var(--nebula-purple)" }}
            >
              {item.company || item.school || item.issuer}
            </p>
          </div>
          <span
            className="text-xs font-mono whitespace-nowrap"
            style={{ color: "var(--text-muted)" }}
          >
            {item.period || item.expectedGrad || item.year}
          </span>
        </div>

        {item.location && (
          <p
            className="text-xs font-mono mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            📍 {item.location}
          </p>
        )}

        {item.bullets && (
          <ul className="space-y-2">
            {item.bullets.map((bullet, i) => (
              <li
                key={i}
                className="text-sm leading-relaxed flex gap-2"
                style={{ color: "var(--text-secondary)" }}
              >
                <span style={{ color: "var(--nebula-purple)", flexShrink: 0 }}>›</span>
                {bullet}
              </li>
            ))}
          </ul>
        )}

        {item.honors && (
          <div className="mt-3 flex flex-wrap gap-3 items-center">
            <span className="tech-pill" style={{ borderColor: "rgba(253,230,138,0.3)", color: "#FDE68A" }}>
              ⭐ {item.honors}
            </span>
            <span className="tech-pill">GPA: {item.gpa}</span>
          </div>
        )}

        {item.coursework && (
          <div className="mt-4">
            <p className="text-xs font-mono mb-2" style={{ color: "var(--text-muted)" }}>
              Relevant coursework
            </p>
            <div className="flex flex-wrap gap-2">
              {item.coursework.map((c) => (
                <span key={c} className="tech-pill" style={{ fontSize: "11px" }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {item.description && !item.bullets && (
          <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionReveal>
          <span className="section-label mb-4 block">Experience</span>
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-12"
            style={{ color: "var(--star-white)" }}
          >
            Where I&apos;ve worked
          </h2>
        </SectionReveal>

        <div className="mb-20">
          {experience.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} type="work" />
          ))}
        </div>

        <SectionReveal>
          <span className="section-label mb-4 block">Education</span>
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-12"
            style={{ color: "var(--star-white)" }}
          >
            Where I study
          </h2>
        </SectionReveal>

        <div className="mb-20">
          <TimelineCard item={education} index={0} type="education" />
        </div>

        <SectionReveal>
          <span className="section-label mb-4 block">Certifications</span>
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-12"
            style={{ color: "var(--star-white)" }}
          >
            Continuous learning
          </h2>
        </SectionReveal>

        <div>
          {certifications.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} type="cert" />
          ))}
        </div>
      </div>
    </section>
  );
}