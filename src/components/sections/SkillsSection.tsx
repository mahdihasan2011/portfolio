"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import { Layout, Server, Database, Wrench } from "lucide-react";

export default function SkillsSection() {
  const { skills } = portfolioData;

  const categoryIcons: Record<string, React.ReactNode> = {
    Frontend: <Layout className="w-5 h-5 text-cyan" />,
    Backend: <Server className="w-5 h-5 text-violet" />,
    Database: <Database className="w-5 h-5 text-emerald-400" />,
    Tools: <Wrench className="w-5 h-5 text-amber-400" />,
  };

  return (
    <section id="skills" className="py-20 border-t border-charcoal-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Technical Skills"
          title="Skills & Technologies"
          subtitle="A focused toolkit centered on modern JavaScript/TypeScript, scalable web architectures, and rock-solid databases."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((cat) => (
            <div
              key={cat.category}
              className="flex flex-col bg-charcoal-850 border border-charcoal-700/70 rounded-2xl p-6 shadow-sm hover:border-charcoal-600 transition-colors"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-charcoal-800">
                <div className="p-2 rounded-lg bg-charcoal-900 border border-charcoal-750">
                  {categoryIcons[cat.category] || <Wrench className="w-5 h-5 text-cyan" />}
                </div>
                <h3 className="font-display font-semibold text-lg text-slate-100">
                  {cat.category}
                </h3>
              </div>

              {/* Skills List without arbitrary percentage ratings */}
              <ul className="space-y-3.5">
                {cat.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="group p-3 rounded-xl bg-charcoal-900/60 border border-charcoal-800 hover:border-cyan/40 hover:bg-charcoal-800/80 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-medium text-sm text-slate-200 group-hover:text-cyan transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-charcoal-500 font-sans leading-relaxed">
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
