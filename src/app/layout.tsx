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
  metadataBase: new URL("https://mahdihasan2011.github.io"),
  title: `${portfolioData.personal.name} | ${portfolioData.personal.title} — ${portfolioData.personal.specialization}`,
  description: `${portfolioData.personal.name} is a Software Engineer with ${portfolioData.personal.experienceYears}+ years of production experience specializing in React, Next.js, Node.js, and Laravel. Explore featured engineering projects, scalable systems, and direct contact channels.`,
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
  authors: [{ name: portfolioData.personal.name, url: "https://mahdihasan2011.github.io/portfolio/" }],
  alternates: {
    canonical: "https://mahdihasan2011.github.io/portfolio/",
  },
  openGraph: {
    title: `${portfolioData.personal.name} | ${portfolioData.personal.title} — ${portfolioData.personal.specialization}`,
    description: `${portfolioData.personal.name} is a Software Engineer with ${portfolioData.personal.experienceYears}+ years of production experience specializing in React, Next.js, Node.js, and Laravel.`,
    url: "https://mahdihasan2011.github.io/portfolio/",
    siteName: `${portfolioData.personal.name} Portfolio`,
    images: [
      {
        url: "https://mahdihasan2011.github.io/portfolio/images/profilepic4.jpeg",
        secureUrl: "https://mahdihasan2011.github.io/portfolio/images/profilepic4.jpeg",
        width: 800,
        height: 800,
        type: "image/jpeg",
        alt: `${portfolioData.personal.name} — ${portfolioData.personal.title}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${portfolioData.personal.name} | ${portfolioData.personal.title}`,
    description: `${portfolioData.personal.name} is a Software Engineer with ${portfolioData.personal.experienceYears}+ years of production experience specializing in React, Next.js, Node.js, and Laravel.`,
    images: ["https://mahdihasan2011.github.io/portfolio/images/profilepic4.jpeg"],
  },
  icons: {
    icon: portfolioData.personal.avatarUrl,
    shortcut: portfolioData.personal.avatarUrl,
    apple: portfolioData.personal.avatarUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme_mode');
                  var theme = saved === 'light' ? 'light' : 'dark';
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
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
