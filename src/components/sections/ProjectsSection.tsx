"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioData, Project } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import ProjectModal from "@/components/ui/ProjectModal";
import { ExternalLink, Github, ArrowRight, Star, Layers, Sparkles } from "lucide-react";

export default function ProjectsSection() {
  const { projects } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>("All Solutions");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    "All Solutions",
    "Enterprise & POS",
    "Fintech & Trading",
    "E-Commerce",
    "AI & SaaS",
  ];

  const filteredProjects =
    activeCategory === "All Solutions"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="py-20 border-t"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-surface)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Featured Engineering"
          title="Engineered for Performance & Scale"
          subtitle="Explore flagship architectures built with React, Next.js, Node.js, and Laravel. Real-world solutions designed for high availability."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full font-mono text-xs font-semibold transition-all hover:scale-105 shadow-sm"
              style={{
                backgroundColor:
                  activeCategory === cat ? "var(--accent-cyan)" : "var(--bg-card)",
                color: activeCategory === cat ? "#07090e" : "var(--text-secondary)",
                border: `1px solid ${
                  activeCategory === cat ? "var(--accent-cyan)" : "var(--border-color)"
                }`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid of Flagship Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <TiltCard key={project.id} className="flex flex-col justify-between p-0">
              {/* Image Header with Category & Star Rating */}
              <div
                className="relative w-full h-52 sm:h-60 overflow-hidden border-b"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-color)",
                }}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 540px"
                />

                {/* Category Pill */}
                <div
                  className="absolute top-3 left-3 backdrop-blur-md px-2.5 py-1 rounded-md border font-mono text-[11px] font-semibold flex items-center gap-1.5 shadow-sm"
                  style={{
                    backgroundColor: "var(--bg-glass)",
                    borderColor: "var(--border-color)",
                    color: "var(--accent-cyan)",
                  }}
                >
                  <Layers className="w-3 h-3 text-cyan" />
                  <span>{project.category}</span>
                </div>

                {/* Stars Badge if available */}
                {project.stars && (
                  <div
                    className="absolute top-3 right-3 backdrop-blur-md px-2.5 py-1 rounded-md border font-mono text-[11px] font-bold flex items-center gap-1 text-amber-400 shadow-sm"
                    style={{
                      backgroundColor: "var(--bg-glass)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{project.stars}</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <h3
                    className="font-display text-xl font-bold transition-colors group-hover:text-[var(--accent-cyan)]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                  </h3>

                  {/* Problem Solved */}
                  <div className="mt-3.5">
                    <p
                      className="text-xs font-semibold uppercase tracking-wider font-mono"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Problem Solved:
                    </p>
                    <p
                      className="mt-1 text-sm font-sans leading-relaxed line-clamp-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.problemSolved}
                    </p>
                  </div>

                  {/* My Contribution */}
                  <div className="mt-3">
                    <p
                      className="text-xs font-semibold uppercase tracking-wider font-mono"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Engineering Contribution:
                    </p>
                    <p
                      className="mt-1 text-sm font-sans leading-relaxed line-clamp-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.myContribution}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-xs font-mono rounded-lg border font-medium"
                        style={{
                          backgroundColor: "var(--bg-surface)",
                          borderColor: "var(--border-color)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div
                  className="mt-6 pt-5 border-t flex items-center justify-between gap-3"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:scale-105"
                    style={{ color: "var(--accent-cyan)" }}
                  >
                    <span>View Architecture Specs</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl border transition-colors hover:border-cyan"
                        style={{
                          backgroundColor: "var(--bg-surface)",
                          borderColor: "var(--border-color)",
                          color: "var(--text-secondary)",
                        }}
                        aria-label={`View ${project.title} source code on GitHub`}
                        title="GitHub Source"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl border transition-colors hover:border-cyan"
                        style={{
                          backgroundColor: "var(--bg-surface)",
                          borderColor: "var(--border-color)",
                          color: "var(--accent-cyan)",
                        }}
                        aria-label={`Open ${project.title} live demo`}
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Accessible Details Modal */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
}
