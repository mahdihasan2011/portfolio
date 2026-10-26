import type { Metadata } from "next";
import { Space_Grotesk, Outfit, Fira_Code } from "next/font/google";
import { portfolioData } from "@/data/portfolioData";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahdihasan.dev"),
  title: `${portfolioData.personal.name} | ${portfolioData.personal.title} — ${portfolioData.personal.specialization}`,
  description: `${portfolioData.personal.name} is a Software Engineer with 8+ years of production experience specializing in React, Next.js, Node.js, and Laravel. Explore featured engineering projects, scalable systems, and direct contact channels.`,
  keywords: [
    "Mahdi Hasan",
    "Software Engineer",
    "Senior Software Engineer",
    "Full-Stack Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Laravel Developer",
    "TypeScript",
    "Web Application Development",
  ],
  authors: [{ name: portfolioData.personal.name }],
  openGraph: {
    title: `${portfolioData.personal.name} | ${portfolioData.personal.title}`,
    description: portfolioData.hero.subheadline,
    url: "https://github.com/mahdihasan2011",
    siteName: `${portfolioData.personal.name} Portfolio`,
    images: [
      {
        url: portfolioData.personal.avatarUrl,
        width: 800,
        height: 800,
        alt: `${portfolioData.personal.name} Portrait`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/images/profilepic4.jpeg",
    shortcut: "/images/profilepic4.jpeg",
    apple: "/images/profilepic4.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${firaCode.variable} font-sans min-h-screen selection:bg-cyan/30 selection:text-white transition-colors duration-300`}
        style={{ backgroundColor: "var(--bg-main)", color: "var(--text-primary)" }}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {/* Accessible Skip Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-cyan text-charcoal-950 font-bold rounded-lg shadow-lg"
          >
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
