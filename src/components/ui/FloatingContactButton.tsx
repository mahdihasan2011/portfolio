"use client";

import React from "react";
import { MessageSquare, Sparkles } from "lucide-react";

interface FloatingContactButtonProps {
  onClick: () => void;
}

export default function FloatingContactButton({ onClick }: FloatingContactButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Open direct contact form"
      className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 lg:bottom-6 lg:right-6 z-40 group flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-cyan text-charcoal-950 font-sans font-bold text-xs sm:text-sm tracking-wide shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(0,240,255,0.55)] cursor-pointer"
    >
      {/* Online Beacon Indicator */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-charcoal-950 opacity-60" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-charcoal-950" />
      </span>

      <MessageSquare className="w-4 h-4 transition-transform group-hover:-rotate-12" />
      <span className="font-semibold">Contact Now</span>

      {/* Subtle Telegram pill badge */}
      <span className="hidden sm:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-charcoal-950/20 text-charcoal-950 font-bold uppercase tracking-wider">
        Telegram
      </span>
    </button>
  );
}
