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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border rounded-2xl p-6 sm:p-8 shadow-2xl focus:outline-none"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-color)",
          color: "var(--text-primary)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full border transition-all hover:scale-105"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-color)",
            color: "var(--text-secondary)",
          }}
          aria-label="Close project details dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tag & Title */}
        <div className="pr-12">
          <span
            className="font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded-md border"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--accent-cyan)",
              color: "var(--accent-cyan)",
            }}
          >
            {project.subtitle}
          </span>
          <h3
            id="modal-project-title"
            className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {project.title}
          </h3>
        </div>

        {/* Project Preview Image */}
        <div
          className="mt-5 relative w-full h-56 sm:h-72 rounded-xl overflow-hidden border"
          style={{
            position: "relative",
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-color)",
          }}
        >
          <Image
            src={project.image}
            alt={`${project.title} preview illustration`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>

        {/* Detailed Content */}
        <div className="mt-6 space-y-6">
          {/* Problem & Contribution */}
          <div>
            <h4
              className="text-xs font-mono font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Problem Solved
            </h4>
            <p
              className="mt-1 text-sm sm:text-base leading-relaxed font-sans"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.problemSolved}
            </p>
          </div>

          <div>
            <h4
              className="text-xs font-mono font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Engineering Contribution
            </h4>
            <p
              className="mt-1 text-sm sm:text-base leading-relaxed font-sans"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.myContribution}
            </p>
          </div>

          {/* Key Features Bullet List */}
          {project.details.keyFeatures && (
            <div>
              <h4
                className="text-xs font-mono font-semibold uppercase tracking-wider mb-2.5"
                style={{ color: "var(--text-muted)" }}
              >
                Key Architecture Deliverables
              </h4>
              <ul className="space-y-2">
                {project.details.keyFeatures.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm font-sans"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* System Architecture Overview */}
          {project.details.architecture && (
            <div
              className="p-4 rounded-xl border"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-color)",
              }}
            >
              <h4
                className="text-xs font-mono font-semibold uppercase tracking-wider mb-1"
                style={{ color: "var(--accent-cyan)" }}
              >
                Architecture & Infrastructure
              </h4>
              <p
                className="text-xs sm:text-sm leading-relaxed font-sans"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.details.architecture}
              </p>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div>
            <h4
              className="text-xs font-mono font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono rounded-lg border font-medium"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div
            className="pt-4 border-t flex items-center gap-3 justify-end"
            style={{ borderColor: "var(--border-color)" }}
          >
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-xs font-semibold transition-colors hover:border-cyan"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-sans font-bold text-xs text-charcoal-950 transition-all hover:scale-105"
                style={{
                  backgroundColor: "var(--accent-cyan)",
                }}
              >
                <span>Live Deployment</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
