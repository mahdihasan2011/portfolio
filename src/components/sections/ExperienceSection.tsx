"use client";

import React, { useState } from "react";
import { portfolioData, ExperienceItem } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function ExperienceSection() {
  const { experience } = portfolioData;
  const [filter, setFilter] = useState<"All" | "Work" | "Education">("All");

  const filteredItems =
    filter === "All"
      ? experience
      : experience.filter((item) => item.type === filter);

  return (
    <section
      id="experience"
      className="py-20 border-t"
      style={{ borderColor: "var(--border-color)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Track Record"
          title="Career Journey & Academic Grounding"
          subtitle="A complete chronological record of production software engineering roles, enterprise leadership, and computer science degrees."
        />

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {(["All", "Work", "Education"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className="px-4 py-2 rounded-full font-mono text-xs font-semibold transition-all hover:scale-105 shadow-sm"
              style={{
                backgroundColor:
                  filter === tab ? "var(--accent-cyan)" : "var(--bg-card)",
                color: filter === tab ? "#07090e" : "var(--text-secondary)",
                border: `1px solid ${
                  filter === tab ? "var(--accent-cyan)" : "var(--border-color)"
                }`,
              }}
            >
              {tab === "All" ? "All Milestones" : tab === "Work" ? "Work Experience" : "Education & Degrees"}
            </button>
          ))}
        </div>

        {/* Timeline Line & Items */}
        <div
          className="relative pl-6 sm:pl-8 border-l space-y-10"
          style={{ borderColor: "var(--border-color)" }}
        >
          {filteredItems.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Node Icon */}
              <div
                className="absolute -left-[35px] sm:-left-[43px] top-1 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all group-hover:scale-110 shadow-sm"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor:
                    item.type === "Education"
                      ? "var(--accent-violet)"
                      : "var(--accent-cyan)",
                }}
              >
                {item.type === "Education" ? (
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet" />
                ) : (
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan" />
                )}
              </div>

              {/* Card Container */}
              <div
                className="p-6 sm:p-7 rounded-2xl border transition-all hover:border-[var(--border-hover)] shadow-sm"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Header with Title and Period */}
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <div>
                    <span
                      className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border inline-block mb-1.5"
                      style={{
                        backgroundColor: "var(--bg-surface)",
                        borderColor: "var(--border-color)",
                        color:
                          item.type === "Education"
                            ? "var(--accent-violet)"
                            : "var(--accent-cyan)",
                      }}
                    >
                      {item.type === "Education" ? "Academic Grounding" : "Professional Role"}
                    </span>
                    <h3
                      className="font-display font-bold text-lg sm:text-xl tracking-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.role}
                    </h3>
                    <p
                      className="font-semibold text-sm mt-0.5"
                      style={{ color: "var(--accent-cyan)" }}
                    >
                      {item.organization}
                    </p>
                  </div>

                  <div
                    className="flex flex-col sm:items-end gap-1 font-mono text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span
                      className="flex items-center gap-1.5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <Calendar className="w-3.5 h-3.5 text-cyan" />
                      <span>{item.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-violet" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p
                  className="text-sm sm:text-base font-sans leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.summary}
                </p>

                {/* Highlights List */}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2 text-xs sm:text-sm font-sans">
                    {item.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span
                          className="font-bold leading-none mt-1"
                          style={{ color: "var(--accent-cyan)" }}
                        >
                          ▹
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Stack Pills */}
                {item.techStack && item.techStack.length > 0 && (
                  <div className="mt-5 pt-4 border-t flex flex-wrap gap-1.5" style={{ borderColor: "var(--border-color)" }}>
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-xs font-mono rounded-md border font-medium"
                        style={{
                          backgroundColor: "var(--bg-surface)",
                          borderColor: "var(--border-color)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
