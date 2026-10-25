"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import { Layout, Server, Database, Wrench, Cpu, CheckCircle } from "lucide-react";

export default function SkillsSection() {
  const { skills } = portfolioData;
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categoryIcons: Record<string, React.ReactNode> = {
    "Frontend & UI": <Layout className="w-5 h-5 text-cyan" />,
    "Backend & APIs": <Server className="w-5 h-5 text-violet" />,
    "Database & Storage": <Database className="w-5 h-5 text-emerald-400" />,
    "DevOps & Cloud": <Wrench className="w-5 h-5 text-amber-400" />,
  };

  const filteredCategories =
    activeFilter === "All"
      ? skills
      : skills.filter((c) => c.category === activeFilter);

  return (
    <section id="skills" className="py-20 border-t" style={{ borderColor: "var(--border-color)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Technical Skills"
          title="Skills & Engineering Capabilities"
          subtitle="Refined across 8+ years of production deployments, high-concurrency systems, and modern web application development."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {["All", "Frontend & UI", "Backend & APIs", "Database & Storage", "DevOps & Cloud"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className="px-4 py-2 rounded-full font-mono text-xs font-semibold transition-all hover:scale-105 shadow-sm"
                style={{
                  backgroundColor:
                    activeFilter === tab ? "var(--accent-cyan)" : "var(--bg-surface)",
                  color: activeFilter === tab ? "#07090e" : "var(--text-secondary)",
                  border: `1px solid ${
                    activeFilter === tab ? "var(--accent-cyan)" : "var(--border-color)"
                  }`,
                }}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.category}
              className="flex flex-col border rounded-2xl p-6 shadow-sm transition-all hover:border-[var(--border-hover)]"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* Category Header */}
              <div
                className="flex items-center gap-3 pb-4 mb-4 border-b"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div
                  className="p-2.5 rounded-xl border flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  {categoryIcons[cat.category] || <Cpu className="w-5 h-5 text-cyan" />}
                </div>
                <h3
                  className="font-display font-bold text-base tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {cat.category}
                </h3>
              </div>

              {/* Skills List without arbitrary percentages */}
              <ul className="space-y-3.5">
                {cat.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="group p-3 rounded-xl border transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="font-display font-semibold text-sm transition-colors group-hover:text-[var(--accent-cyan)]"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {skill.name}
                      </span>
                      <span
                        className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0"
                        style={{
                          backgroundColor: "var(--bg-card)",
                          borderColor: "var(--border-color)",
                          color: "var(--accent-cyan)",
                        }}
                      >
                        {skill.level}
                      </span>
                    </div>
                    <p
                      className="mt-1 text-xs font-sans leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {skill.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
