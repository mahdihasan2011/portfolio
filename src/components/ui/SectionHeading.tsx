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
      {/* Badge Pill */}
      <div
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 shadow-sm"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-color)",
        }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: "var(--accent-cyan)" }}
        />
        <span
          className="font-mono text-xs uppercase tracking-wider font-semibold"
          style={{ color: "var(--accent-cyan)" }}
        >
          {badge}
        </span>
      </div>

      {/* Main Title */}
      <h2
        className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>

      {/* Optional Subtitle */}
      {subtitle && (
        <p
          className="mt-3 text-base sm:text-lg leading-relaxed font-sans"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
