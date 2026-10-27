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
      className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 lg:bottom-6 lg:right-6 z-40 group flex items-center gap-2.5 pl-2.5 pr-4 sm:pl-3 sm:pr-5 py-2.5 rounded-full bg-[var(--accent-cyan)] text-charcoal-950 font-sans font-bold text-xs sm:text-sm tracking-wide shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(0,240,255,0.65)] cursor-pointer"
    >
      {/* Modern Circular Icon Disc with Embedded Live Beacon */}
      <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-charcoal-950/15 group-hover:bg-charcoal-950 group-hover:text-[var(--accent-cyan)] transition-all duration-300 shrink-0">
        <svg
          className="w-3.5 h-3.5 fill-current transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          viewBox="0 0 24 24"
        >
          <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.674c.458 0 .66-.21.916-.457l2.199-2.138 4.574 3.379c.843.464 1.45.225 1.66-.782l2.998-14.127c.307-1.23-.468-1.787-1.51-.516z" />
        </svg>

        {/* Live Active Status Pip */}
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-xs" />
        </span>
      </div>

      <span className="font-semibold text-charcoal-950">Contact Now</span>
    </button>
  );
}
