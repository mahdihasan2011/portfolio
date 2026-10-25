import React from "react";

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-2xl mb-12 sm:mb-16 ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-850 border border-charcoal-700/80 mb-4 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
        <span className="font-mono text-xs uppercase tracking-wider text-cyan">
          {badge}
        </span>
      </div>

      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
}
