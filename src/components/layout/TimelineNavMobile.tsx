"use client";

import React from "react";
import { Send } from "lucide-react";

export interface TimelineNavMobileProps {
  activeSection: string;
  onOpenContactDrawer?: () => void;
}

const MOBILE_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Exp" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact", isDrawer: true },
];

export default function TimelineNavMobile({
  activeSection,
  onOpenContactDrawer,
}: TimelineNavMobileProps) {
  const handleClick = (e: React.MouseEvent, item: typeof MOBILE_ITEMS[number]) => {
    if (item.isDrawer) {
      e.preventDefault();
      onOpenContactDrawer?.();
      return;
    }

    const targetEl = document.getElementById(item.id);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="sticky top-3 z-30 mx-auto max-w-fit px-3 py-1.5 rounded-full bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border-color)] shadow-xl flex items-center gap-1 sm:gap-2 my-4"
      aria-label="Mobile timeline navigation"
    >
      {MOBILE_ITEMS.map((item, index) => {
        const isActive = activeSection === item.id;

        return (
          <React.Fragment key={item.id}>
            {index > 0 && (
              <span
                className={`w-2.5 h-[1.5px] transition-colors ${
                  isActive ? "bg-[var(--accent-cyan)]" : "bg-slate-700"
                }`}
              />
            )}
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item)}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-mono font-medium transition-all ${
                isActive
                  ? "bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30 font-bold scale-105"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive
                    ? "bg-[var(--accent-cyan)] shadow-[0_0_6px_rgba(0,240,255,0.8)]"
                    : "bg-slate-600"
                }`}
              />
              <span>{item.label}</span>
              {item.isDrawer && <Send className="w-2.5 h-2.5 text-cyan ml-0.5" />}
            </a>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
