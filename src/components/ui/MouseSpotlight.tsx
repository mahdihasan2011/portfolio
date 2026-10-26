"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function MouseSpotlight() {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!coords) return null;

  const glowColor = isDark
    ? "rgba(0, 240, 255, 0.08)"
    : "rgba(2, 132, 199, 0.07)";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300"
      style={{
        background: `radial-gradient(650px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
      }}
      aria-hidden="true"
    />
  );
}
