export interface Project {
  id: string;
  title: string;
  subtitle: string;
  problemSolved: string;
  myContribution: string;
  tags: string[];
  image: string;
  liveUrl?: string; // Only renders link button if provided and non-empty
  sourceUrl?: string; // Only renders link button if provided and non-empty
  details: {
    overview: string;
    keyFeatures: string[];
    architecture: string;
  };
}

export interface SkillCategory {
  category: "Frontend" | "Backend" | "Database" | "Tools";
  skills: {
    name: string;
    description: string;
    icon?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: "Full-Time" | "Contract" | "Education";
  summary: string;
  highlights: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    initials: string;
    title: string;
    specialization: string;
    bio: string[];
    approach: string;
    avatarUrl: string;
    resumeUrl?: string; // Optional: download button only appears when non-empty
    location: string;
    email: string;
    githubUrl: string;
    linkedinUrl: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    primaryCtaText: string;
    primaryCtaHref: string;
    secondaryCtaText: string;
    secondaryCtaHref: string;
  };
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceItem[];
  contact: {
    invitation: string;
    isBackendConfigured: boolean; // false presents form as an interactive demo with mailto fallback
  };
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Mahdi Hasan",
    initials: "MH",
    title: "Senior Full-Stack Engineer",
    specialization: "React, Next.js & Node.js",
    bio: [
      "I am a senior full-stack developer with over 8 years of engineering experience crafting resilient web platforms, reactive user interfaces, and distributed backend systems.",
      "My core focus is delivering fast, accessible, and maintainable software with React, Next.js, TypeScript, and Node.js, backed by scalable database architectures."
    ],
    approach:
      "My engineering approach centers on clarity, maintainability, and user-centric problem solving. I prioritize building robust systems with predictable state, strong type safety, accessible interfaces, and zero architectural bloat. I treat code quality and business impact with equal rigor.",
    avatarUrl: "/images/profilepic4.jpeg",
    resumeUrl: "/Mahdi_Hasan_Resume.pdf", // Configured: renders the download button
    location: "Dhaka, Bangladesh",
    email: "mmahdihasan2011@gmail.com",
    githubUrl: "https://github.com/mahdihasan2011",
    linkedinUrl: "https://bd.linkedin.com/in/mahdihasan2011"
  },
  hero: {
    headline: "I build digital experiences that make a difference.",
    subheadline:
      "Full-stack software engineer specializing in React, Next.js, and Node.js. Translating complex system requirements into accessible, performant, and beautifully engineered applications.",
    primaryCtaText: "Explore My Work",
    primaryCtaHref: "#projects",
    secondaryCtaText: "Get in Touch",
    secondaryCtaHref: "#contact"
  },
  skills: [
    {
      category: "Frontend",
      skills: [
        { name: "React", description: "Hooks, Context, Concurrent Mode, Performance Tuning" },
        { name: "Next.js", description: "App Router, Server Components, SSR, Static Generation" },
        { name: "TypeScript", description: "Strict Type Systems, Generics, Component Contracts" },
        { name: "Tailwind CSS", description: "Utility-first Design Systems, Responsive Layouts, Fluid Typography" }
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", description: "Asynchronous I/O, Event-driven Services, Streams" },
        { name: "Express", description: "RESTful Endpoints, Middleware Pipelines, Route Controllers" },
        { name: "REST APIs", description: "Contract Design, JWT/OAuth Authentication, Rate Limiting" }
      ]
    },
    {
      category: "Database",
      skills: [
        { name: "PostgreSQL", description: "Relational Schemas, Constraints, Indexes, ACID Transactions" },
        { name: "MongoDB", description: "Document Modeling, Aggregation Pipelines, Dynamic Queries" }
      ]
    },
    {
      category: "Tools",
      skills: [
        { name: "Git", description: "Branching Strategies, Semantic Commits, Collaborative Workflows" },
        { name: "Docker", description: "Multi-stage Builds, Containerization, Local Dev Environments" }
      ]
    }
  ],
  projects: [
    {
      id: "project-pos-engine",
      title: "Point-of-Sale Inventory Engine",
      subtitle: "Sample Enterprise Architecture",
      problemSolved:
        "High-volume retail stores frequently experienced checkout slowdowns and inventory drift due to spotty network connectivity.",
      myContribution:
        "Designed an offline-first transaction queue using Node.js and React, enabling sub-second barcode scans with background synchronization.",
      tags: ["React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      image: "/images/pos.jpg",
      liveUrl: undefined, // Real URL placeholder; button will be hidden when undefined
      sourceUrl: "https://github.com/mahdihasan2011",
      details: {
        overview:
          "This sample architecture demonstrates an offline-resilient point-of-sale service built for multi-terminal retail environments. Transactions are queued locally in browser storage and dispatched atomically when online.",
        keyFeatures: [
          "Optimistic UI updates for instantaneous receipt line addition",
          "IndexedDB local ledger synchronization with conflict resolution algorithms",
          "Automated stock level re-ordering threshold alerts and daily reconciliation reports"
        ],
        architecture:
          "Modular client-server setup with a Next.js frontend, an Express/Node.js API gateway, and PostgreSQL with connection pooling."
      }
    },
    {
      id: "project-ecommerce-platform",
      title: "Scalable E-Commerce Marketplace",
      subtitle: "Sample High-Traffic Web Application",
      problemSolved:
        "E-commerce storefronts during flash sales often experience high latency and checkout drop-offs due to un-cached product catalog queries.",
      myContribution:
        "Architected a Next.js server-rendered product catalog with incremental static regeneration and a unified reactive shopping cart.",
      tags: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB"],
      image: "/images/ecom.jpg",
      liveUrl: undefined,
      sourceUrl: "https://github.com/mahdihasan2011",
      details: {
        overview:
          "A production-grade e-commerce application blueprint focusing on Core Web Vitals, instant faceted search, and secure multi-step checkout workflows.",
        keyFeatures: [
          "Sub-100ms product page loads using Next.js Incremental Static Regeneration (ISR)",
          "Accessible checkout flow with real-time field validation and ARIA announcements",
          "Modular cart context state with persistent local persistence"
        ],
        architecture:
          "Full-stack Next.js application using Server Components for SEO-critical catalog rendering and Client Components for dynamic cart interactions."
      }
    },
    {
      id: "project-service-ticketing",
      title: "Enterprise Incident Resolution Portal",
      subtitle: "Sample Customer Operations Platform",
      problemSolved:
        "Support teams struggled to meet SLA commitments due to fragmented email communication and lack of automated escalation tracking.",
      myContribution:
        "Built a central ticket management dashboard with priority sorting, real-time status updates, and automated SLA countdown timers.",
      tags: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
      image: "/images/crm1.jpg",
      liveUrl: undefined,
      sourceUrl: "https://github.com/mahdihasan2011",
      details: {
        overview:
          "An operations portal designed for customer support teams to manage, triage, and resolve technical inquiries with strict audit trails.",
        keyFeatures: [
          "Real-time ticket updates using Server-Sent Events (SSE)",
          "Priority triage matrix categorizing tickets based on business impact and urgency",
          "Comprehensive SLA breach alerting system with visual progress indicators"
        ],
        architecture:
          "React Single Page Application backed by a modular Node.js/Express service communicating with a PostgreSQL relational database."
      }
    },
    {
      id: "project-talent-matching",
      title: "Technical Recruitment & Assessment Hub",
      subtitle: "Sample Hiring Application",
      problemSolved:
        "Hiring managers spent excessive manual hours screening unstructured resumes and coordinating technical assessments.",
      myContribution:
        "Developed a candidate pipeline interface featuring skill tagging, interactive evaluation rubrics, and automated status transition notifications.",
      tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
      image: "/images/crm4.png",
      liveUrl: undefined,
      sourceUrl: "https://github.com/mahdihasan2011",
      details: {
        overview:
          "A specialized candidate workflow application providing collaborative recruitment stages from initial application to offer acceptance.",
        keyFeatures: [
          "Interactive drag-and-drop pipeline board with keyboard navigation accessibility",
          "Structured interview scorecards with standardized criteria evaluation",
          "Secure role-based access control protecting candidate personal information"
        ],
        architecture:
          "Component-driven React architecture with strict TypeScript contracts, styled with Tailwind CSS, and powered by a Node.js REST API."
      }
    }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Senior Software Developer",
      organization: "Vivacom BD",
      period: "Jan 2023 — Present",
      location: "Dhaka, Bangladesh",
      type: "Full-Time",
      summary:
        "Leading full-stack frontend architecture and client-facing web application development across distributed financial dashboard platforms.",
      highlights: [
        "Architected performant React and TypeScript dashboard interfaces serving high-concurrency client requirements.",
        "Established component modularity standards, automated code review linting, and mentored junior engineering team members.",
        "Drove decisions on state management, API contract schemas, and frontend performance optimizations."
      ]
    },
    {
      id: "exp-2",
      role: "Software Developer",
      organization: "Fieldboosters Ltd",
      period: "Jan 2020 — Dec 2022",
      location: "Dhaka, Bangladesh",
      type: "Full-Time",
      summary:
        "Developed core features for an e-commerce platform and collaborative vendor management portals.",
      highlights: [
        "Built reactive frontend interfaces and integrated RESTful backend APIs for merchant checkout flows.",
        "Partnered with cross-functional teams to translate product requirements into clean, testable technical specifications.",
        "Improved database query efficiency and reduced page load times on high-traffic catalog pages."
      ]
    },
    {
      id: "exp-3",
      role: "Junior Software Developer",
      organization: "Creative Software Ltd",
      period: "Aug 2018 — Dec 2019",
      location: "Dhaka, Bangladesh",
      type: "Full-Time",
      summary:
        "Maintained client web systems, designed database schemas, and delivered full-stack web applications.",
      highlights: [
        "Delivered full-stack software features across the complete software development lifecycle.",
        "Engaged directly in client requirement elicitation sessions to shape functional deliverables."
      ]
    },
    {
      id: "exp-4",
      role: "Master of Science in Computer Science & Engineering",
      organization: "Jahangirnagar University",
      period: "2022 — 2023",
      location: "Savar, Dhaka",
      type: "Education",
      summary:
        "Advanced graduate studies with emphasis on Distributed Systems, Advanced Algorithms, and Software Architecture.",
      highlights: [
        "Conducted research on scalable systems and data engineering methodologies."
      ]
    },
    {
      id: "exp-5",
      role: "Bachelor of Science in Computer Science & Engineering",
      organization: "IUBAT",
      period: "2013 — 2017",
      location: "Dhaka, Bangladesh",
      type: "Education",
      summary:
        "Foundational degree covering Data Structures, Algorithms, Software Engineering, and Database Management Systems.",
      highlights: [
        "Graduated with rigorous training in Object-Oriented Programming and Computer Science fundamentals."
      ]
    }
  ],
  contact: {
    invitation:
      "Whether you have a specific role in mind, need architectural consulting for your next web application, or want to collaborate on a challenging project, I would love to hear from you.",
    isBackendConfigured: false // Set to true when an active email/form service endpoint is connected
  }
};
