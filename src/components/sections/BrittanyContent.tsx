"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioData, Project } from "@/data/portfolioData";
import ProjectModal from "@/components/ui/ProjectModal";
import { ArrowRight } from "lucide-react";

interface BrittanyContentProps {
  onOpenContactDrawer?: () => void;
}

export default function BrittanyContent({ onOpenContactDrawer }: BrittanyContentProps) {
  const { personal, hero, experience, projects } = portfolioData;

  // Project modal state
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Filter projects
  const projectCategories = [
    "All",
    "Enterprise & POS",
    "Fintech & Trading",
    "E-Commerce",
    "AI & SaaS",
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Filter work experience only (education has its own dedicated section)
  const workExperience = experience.filter((e) => e.type === "Work");

  return (
    <div className="pt-24 lg:py-24 w-full">
      {/* ========================================================
          SECTION: ABOUT
          ======================================================== */}
      <section
        id="about"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24"
        aria-label="About me"
      >
        {/* Mobile Sticky Header */}
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[var(--bg-main)]/90 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 border-b border-[var(--border-color)] lg:border-none">
          <h2 className="text-sm font-bold uppercase tracking-widest font-mono text-[var(--accent-cyan)] lg:sr-only">
            About
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-sans">
          {personal.bio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <p className="pt-2 text-sm leading-relaxed">
            <span className="font-semibold text-[var(--text-primary)]">Engineering Philosophy: </span>
            {personal.approach}
          </p>
        </div>

        {/* Quick Highlights / Metrics Pill Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {portfolioData.metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col"
            >
              <span className="font-display text-2xl font-bold text-[var(--accent-cyan)]">
                {metric.value}
              </span>
              <span className="font-sans text-xs font-semibold text-[var(--text-primary)] mt-0.5">
                {metric.label}
              </span>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">
                {metric.sublabel}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION: EXPERIENCE
          ======================================================== */}
      <section
        id="experience"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24"
        aria-label="Work experience"
      >
        {/* Mobile Sticky Header */}
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[var(--bg-main)]/90 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 border-b border-[var(--border-color)] lg:border-none">
          <h2 className="text-sm font-bold uppercase tracking-widest font-mono text-[var(--accent-cyan)] lg:sr-only">
            Experience
          </h2>
        </div>

        <div>
          <ol className="group/list list-none space-y-12">
            {workExperience.map((item) => (
              <li key={item.id} className="mb-12">
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-40">
                  {/* Hover Highlight Card Overlay */}
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-2xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[var(--bg-card)] lg:group-hover:shadow-md lg:group-hover:border lg:group-hover:border-[var(--border-color)]" />

                  {/* Left Column: Period */}
                  <header
                    className="z-10 mb-2 mt-1 text-xs font-mono font-semibold uppercase tracking-wide text-[var(--text-muted)] sm:col-span-2"
                    aria-label={item.period}
                  >
                    {item.period}
                  </header>

                  {/* Right Column: Role & Content */}
                  <div className="z-10 sm:col-span-6">
                    <h3 className="font-display font-medium leading-snug text-[var(--text-primary)]">
                      <div className="inline-flex items-baseline font-bold leading-tight group/link text-base text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                        <span>
                          {item.role} ·{" "}
                          <span className="inline-block text-[var(--accent-cyan)]">
                            {item.organization}
                            <ArrowRight className="inline-block h-3.5 w-3.5 shrink-0 ml-1.5 transition-transform group-hover/link:translate-x-1 -rotate-45" />
                          </span>
                        </span>
                      </div>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] font-sans">
                      {item.summary}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="mt-2.5 space-y-1 text-xs text-[var(--text-muted)] font-sans">
                        {item.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[var(--accent-cyan)] font-bold">›</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech Badges */}
                    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies used">
                      {item.techStack.map((tech) => (
                        <li key={tech}>
                          <span className="inline-flex items-center rounded-full bg-[var(--accent-cyan)]/10 px-3 py-1 text-xs font-mono font-medium text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20">
                            {tech}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* View Full Resume Link */}
          {personal.resumeUrl && (
            <div className="mt-8">
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 font-mono text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent-cyan)] group transition-colors"
              >
                <span>View Full Résumé</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 -rotate-45" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          SECTION: PROJECTS
          ======================================================== */}
      <section
        id="projects"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24"
        aria-label="Selected projects"
      >
        {/* Mobile Sticky Header */}
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[var(--bg-main)]/90 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 border-b border-[var(--border-color)] lg:border-none">
          <h2 className="text-sm font-bold uppercase tracking-widest font-mono text-[var(--accent-cyan)] lg:sr-only">
            Projects
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1 rounded-full text-xs font-mono font-medium transition-all"
              style={{
                backgroundColor:
                  activeCategory === cat ? "var(--accent-cyan)" : "var(--bg-card)",
                color: activeCategory === cat ? "var(--accent-contrast)" : "var(--text-secondary)",
                border: `1px solid ${
                  activeCategory === cat ? "var(--accent-cyan)" : "var(--border-color)"
                }`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div>
          <ul className="group/list list-none space-y-12">
            {filteredProjects.map((project) => (
              <li key={project.id} className="mb-12">
                <div
                  onClick={() => setActiveModalProject(project)}
                  className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-40 cursor-pointer"
                >
                  {/* Hover Highlight Card Overlay */}
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-2xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[var(--bg-card)] lg:group-hover:shadow-md lg:group-hover:border lg:group-hover:border-[var(--border-color)]" />

                  {/* Left Column: Image Thumbnail */}
                  <div className="z-10 sm:order-1 sm:col-span-2 sm:translate-y-1">
                    <div
                      className="relative rounded-lg overflow-hidden border border-[var(--border-color)] group-hover:border-[var(--accent-cyan)] transition-colors shadow-sm"
                      style={{
                        position: "relative",
                        width: "100%",
                        maxWidth: "200px",
                        aspectRatio: "16 / 10",
                        height: "auto",
                      }}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        width={400}
                        height={250}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Right Column: Project Info */}
                  <div className="z-10 sm:order-2 sm:col-span-6">
                    <h3 className="font-display font-medium leading-snug text-[var(--text-primary)]">
                      <div className="inline-flex items-baseline font-bold leading-tight group/link text-base text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                        <span>
                          {project.title}{" "}
                          <span className="inline-block">
                            <ArrowRight className="inline-block h-3.5 w-3.5 shrink-0 ml-1 transition-transform group-hover/link:translate-x-1 -rotate-45" />
                          </span>
                        </span>
                      </div>
                    </h3>
                    <p className="mt-1 text-xs font-mono font-medium text-[var(--accent-cyan)]">
                      {project.subtitle}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] font-sans">
                      {project.problemSolved}
                    </p>

                    {/* Tech Badges */}
                    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies used:">
                      {project.tags.map((tag) => (
                        <li key={tag}>
                          <span className="inline-flex items-center rounded-full bg-[var(--accent-cyan)]/10 px-3 py-1 text-xs font-mono font-medium text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20">
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Interactive Project Details Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}
