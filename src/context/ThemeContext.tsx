"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  isDark: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem("theme_mode") as Theme | null;
    const initialTheme: Theme = saved === "light" ? "light" : "dark";
    setTheme(initialTheme);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    document.documentElement.style.colorScheme = initialTheme;

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    try {
      localStorage.setItem("theme_mode", nextTheme);
    } catch {}

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
