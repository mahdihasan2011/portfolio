"use client";

import React from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import { useTheme } from "@/context/ThemeContext";
import { Github, GitPullRequest, Star, ExternalLink, CheckCircle } from "lucide-react";

export default function GitHubSection() {
  const { personal } = portfolioData;
  const { isDark } = useTheme();

  return (
    <section id="github" className="py-20 border-t" style={{ borderColor: "var(--border-color)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Open Source & Activity"
          title="GitHub Contributions & Coding Cadence"
          subtitle="A consistent track record of commit activity, architecture experiments, and production codebases."
        />

        <div className="max-w-4xl mx-auto">
          <TiltCard className="p-6 sm:p-8">
            {/* Header with Avatar & Details */}
            <div
              className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--accent-cyan)] shadow-sm">
                  <Image
                    src={personal.avatarUrl}
                    alt={personal.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3
                      className="font-display font-bold text-lg"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {personal.name}
                    </h3>
                    <CheckCircle className="w-4 h-4 text-cyan" />
                  </div>
                  <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                    @{personal.githubUsername}
                  </span>
                </div>
              </div>

              {/* GitHub Stat Chips */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span
                  className="px-3 py-1.5 rounded-xl border flex items-center gap-1.5"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  <GitPullRequest className="w-3.5 h-3.5 text-cyan" />
                  <span>50+ Shipped Repos</span>
                </span>
                <span
                  className="px-3 py-1.5 rounded-xl border flex items-center gap-1.5"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  <span>500+ Community Stars</span>
                </span>
              </div>
            </div>

            {/* Live Contribution Graph */}
            <p className="text-xs font-mono mb-3" style={{ color: "var(--text-muted)" }}>
              Yearly Git Commit Activity Stream:
            </p>
            <div
              className="p-4 sm:p-6 rounded-xl border overflow-x-auto shadow-inner"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-color)",
              }}
            >
              <img
                src={`https://ghchart.rshah.org/${isDark ? "00f0ff" : "0284c7"}/${personal.githubUsername}`}
                alt={`${personal.name} GitHub Contribution Graph`}
                className="w-full min-w-[650px] rounded"
              />
            </div>

            {/* View Full Profile CTA */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-sans" style={{ color: "var(--text-muted)" }}>
                Verified repository cadence updated daily via GitHub API.
              </span>

              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border font-mono text-xs font-semibold transition-all hover:scale-105"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-color)",
                  color: "var(--accent-cyan)",
                }}
              >
                <Github className="w-4 h-4" />
                <span>Follow @{personal.githubUsername}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
