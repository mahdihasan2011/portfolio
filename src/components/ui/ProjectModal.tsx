"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Project } from "@/data/portfolioData";
import { X, ExternalLink, Github, CheckCircle2, Layers } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    // Focus close button on open
    closeButtonRef.current?.focus();

    // Prevent background scroll
    document.body.style.overflow = "hidden";

    // Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-charcoal-900 border border-charcoal-700 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-charcoal-800 text-slate-300 hover:text-white hover:bg-charcoal-700 transition-colors focus-visible:ring-2 focus-visible:ring-cyan"
          aria-label="Close project details dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tag & Title */}
        <div className="pr-10">
          <span className="font-mono text-xs uppercase tracking-wider text-cyan bg-cyan/10 px-2.5 py-1 rounded-md border border-cyan/20">
            {project.subtitle}
          </span>
          <h3
            id="modal-project-title"
            className="mt-3 font-display text-2xl sm:text-3xl font-bold text-slate-100"
          >
            {project.title}
          </h3>
        </div>

        {/* Project Preview Image */}
        <div className="mt-5 relative w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-charcoal-750 bg-charcoal-950">
          <Image
            src={project.image}
            alt={`${project.title} preview illustration`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>

        {/* Detailed Content */}
        <div className="mt-6 space-y-6 text-slate-300">
          {/* Problem & Contribution */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-display">
              Problem Solved
            </h4>
            <p className="mt-1 text-sm sm:text-base leading-relaxed text-slate-300">
              {project.problemSolved}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-display">
              Engineering Contribution
            </h4>
            <p className="mt-1 text-sm sm:text-base leading-relaxed text-slate-300">
              {project.myContribution}
            </p>
          </div>

          {/* Overview */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-display">
              Architectural Overview
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              {project.details.overview}
            </p>
          </div>

          {/* Key Features Checklist */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-display flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan" /> Key Technical Capabilities
            </h4>
            <ul className="mt-2 space-y-2 text-sm text-slate-300">
              {project.details.keyFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Badges */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-display mb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-charcoal-800 text-cyan border border-charcoal-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="mt-8 pt-5 border-t border-charcoal-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-cyan text-charcoal-950 font-sans hover:bg-cyan/90 transition-colors focus-visible:ring-2 focus-visible:ring-cyan"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}

            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-charcoal-800 text-slate-200 border border-charcoal-700 hover:border-slate-500 transition-colors focus-visible:ring-2 focus-visible:ring-cyan"
              >
                <Github className="w-4 h-4" /> Source Code
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
