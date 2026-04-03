"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import SectionReveal from "./SectionReveal";
import { personalInfo } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

function MailIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="white">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="white">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ContactAnchor({ href, children, onMouseMove, onMouseLeave, style }) {
  const props = {
    href: href,
    target: "_blank",
    rel: "noopener noreferrer",
  };
  return <a {...props}>{children}</a>;
}

function MagneticLink({ href, icon, label, color }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const displayHref = href.replace("mailto:", "").replace("https://", "");

  return (
    <motion.div
      ref={ref}
      className="group glass-card gradient-border flex items-center gap-4 p-5 md:p-6 cursor-pointer"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={() => window.open(href, "_blank")}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: color }}
      >
        {icon}
      </div>
      <div className="flex-grow min-w-0">
        <p
          className="font-display font-semibold text-base"
          style={{ color: "var(--star-white)" }}
        >
          {label}
        </p>
        <p
          className="text-sm font-mono truncate"
          style={{ color: "var(--text-muted)" }}
        >
          {displayHref}
        </p>
      </div>
      <ArrowUpRight
        size={20}
        className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        style={{ color: "var(--text-muted)" }}
      />
    </motion.div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div
        className="absolute top-20 -left-20 w-[600px] h-[2px] rotate-[25deg] pointer-events-none animate-comet opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--nebula-purple), var(--star-warm), transparent)",
        }}
      />

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(123,94,167,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <SectionReveal>
          <span className="section-label mb-4 block">Contact</span>
          <h2
            className="font-display text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--star-white)" }}
          >
            Let&apos;s build something.
          </h2>
          <p
            className="text-base mb-12"
            style={{ color: "var(--text-secondary)" }}
          >
            I&apos;m always open to new opportunities, collaborations, or just a
            good conversation about tech.
          </p>
        </SectionReveal>

        <div className="grid gap-4">
          <SectionReveal delay={0.1}>
            <MagneticLink
              href={"mailto:" + personalInfo.email}
              icon={<MailIcon />}
              label="Email me"
              color="rgba(123, 94, 167, 0.2)"
            />
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <MagneticLink
              href={personalInfo.linkedin}
              icon={<LinkedinIcon />}
              label="LinkedIn"
              color="rgba(74, 123, 247, 0.2)"
            />
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <MagneticLink
              href={personalInfo.github}
              icon={<GithubIcon />}
              label="GitHub"
              color="rgba(56, 189, 248, 0.2)"
            />
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}