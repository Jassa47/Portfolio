"use client";
import SectionReveal from "./SectionReveal";
import ProjectCard from "./ProjectCard";
import { projects as fallbackProjects } from "@/data/portfolio";

export default function Projects({ projects }) {
  const projectList = projects || fallbackProjects;
  const featured = projectList.filter((p) => p.featured);
  const other = projectList.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(74,123,247,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionReveal>
          <span className="section-label mb-4 block">Projects</span>
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--star-white)" }}
          >
            Things I&apos;ve built
          </h2>
          <p
            className="text-base mb-12 max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            From full-stack platforms to deep learning systems — here&apos;s a selection
            of projects I&apos;m proud of.
          </p>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-4">
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} featured />
          ))}
          {other.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i + featured.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}