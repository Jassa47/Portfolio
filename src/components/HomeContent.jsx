"use client";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const StarField = dynamic(() => import("@/components/StarField"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function HomeContent({ githubStats, projects }) {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Loader onComplete={handleLoaded} />

      <StarField />
      <CustomCursor />

      <div className="nebula-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div
        className="relative z-10"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <About githubStats={githubStats} />
          <Projects projects={projects} />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}