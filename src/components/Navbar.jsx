"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function NavLink({ href, className, style, children, onClick, target }) {
  return (
    <a href={href} className={className} style={style} onClick={onClick} target={target}>
      {children}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: scrolled ? "rgba(3, 1, 8, 0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          className="font-mono text-lg font-semibold tracking-tight"
          whileHover={{ scale: 1.05 }}
          style={{
            background: "linear-gradient(135deg, var(--nebula-purple), var(--nebula-blue))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {personalInfo.initials}
        </motion.a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm transition-colors duration-300"
              style={{
                color:
                  activeSection === link.href.replace("#", "")
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
              }}
            >
              {link.label}
              {activeSection === link.href.replace("#", "") && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-4 right-4 h-px"
                  style={{ background: "var(--nebula-purple)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </NavLink>
          ))}

          <NavLink
            href="/Akaaljot_Resume.pdf"
            target="_blank"
            className="ml-4 px-4 py-1.5 text-sm rounded-lg border transition-all duration-300 hover:bg-white/5"
            style={{
              borderColor: "rgba(123,94,167,0.3)",
              color: "var(--nebula-purple)",
            }}
          >
            Resume
          </NavLink>
        </div>

        <button
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-5 h-px bg-current"
            animate={{
              rotate: mobileOpen ? 45 : 0,
              y: mobileOpen ? 3.5 : 0,
            }}
            style={{ color: "var(--text-primary)" }}
          />
          <motion.span
            className="block w-5 h-px bg-current"
            animate={{
              rotate: mobileOpen ? -45 : 0,
              y: mobileOpen ? -3.5 : 0,
            }}
            style={{ color: "var(--text-primary)" }}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(3, 1, 8, 0.95)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
