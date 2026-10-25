"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioData, Project } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import ProjectModal from "@/components/ui/ProjectModal";
import { ExternalLink, Github, ArrowRight, Info } from "lucide-react";

export default function ProjectsSection() {
  const { projects } = portfolioData;
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 border-t border-charcoal-800/80 bg-charcoal-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Featured Projects"
          title="Engineered for Performance & Scale"
          subtitle="Explore selected architectures built with React, Next.js, TypeScript, and Node.js. Clearly labeled sample projects."
        />

        {/* Responsive Grid of 4 Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <TiltCard key={project.id} className="flex flex-col justify-between p-0">
              {/* Image Header with Sample Content Badge */}
              <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-charcoal-950 border-b border-charcoal-800">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 540px"
                />
                
                {/* Sample Content Label */}
                <div className="absolute top-3 left-3 bg-charcoal-950/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-charcoal-700 font-mono text-[11px] text-cyan flex items-center gap-1.5">
                  <Info className="w-3 h-3 text-cyan" />
                  <span>{project.subtitle}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-100 group-hover:text-cyan transition-colors">
                    {project.title}
                  </h3>

                  {/* Problem Solved */}
                  <div className="mt-3.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-400 font-mono">
                      Challenge & Objective:
                    </p>
                    <p className="mt-1 text-sm text-slate-300 font-sans leading-relaxed line-clamp-2">
                      {project.problemSolved}
                    </p>
                  </div>

                  {/* Contribution */}
                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-400 font-mono">
                      My Contribution:
                    </p>
                    <p className="mt-1 text-sm text-slate-400 font-sans leading-relaxed line-clamp-2">
                      {project.myContribution}
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-xs font-mono rounded bg-charcoal-800 text-slate-300 border border-charcoal-700/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="mt-6 pt-5 border-t border-charcoal-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded"
                  >
                    <span>View Architecture Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-charcoal-800 text-slate-400 hover:text-white border border-charcoal-700 hover:border-slate-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                        aria-label={`View ${project.title} source code on GitHub`}
                        title="Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-charcoal-800 text-cyan hover:text-white border border-charcoal-700 hover:border-cyan/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
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
