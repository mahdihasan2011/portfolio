"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

export default function ExperienceSection() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 border-t border-charcoal-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Experience & Education"
          title="Career Journey & Academic Grounding"
          subtitle="A chronological timeline of production engineering roles, technical responsibilities, and computer science degrees."
        />

        <div className="relative pl-6 sm:pl-8 border-l border-charcoal-750 space-y-12">
          {experience.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-charcoal-900 border-2 border-charcoal-600 group-hover:border-cyan transition-colors">
                {item.type === "Education" ? (
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet" />
                ) : (
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan" />
                )}
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-7 rounded-2xl bg-charcoal-850 border border-charcoal-750/80 hover:border-charcoal-600 transition-colors shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-charcoal-800">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-slate-100">
                      {item.role}
                    </h3>
                    <p className="font-medium text-sm text-cyan mt-0.5">
                      {item.organization}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-charcoal-500">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-charcoal-500" />
                      <span>{item.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                  {item.summary}
                </p>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-400 font-sans">
                    {item.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <span className="text-cyan font-bold leading-none mt-1">▹</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
