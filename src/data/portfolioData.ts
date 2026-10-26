export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Enterprise & POS" | "Fintech & Trading" | "E-Commerce" | "AI & SaaS";
  problemSolved: string;
  myContribution: string;
  tags: string[];
  image: string;
  stars?: number;
  liveUrl?: string;
  sourceUrl?: string;
  details: {
    overview: string;
    keyFeatures: string[];
    architecture: string;
  };
}

export interface SkillCategory {
  category: "Frontend & UI" | "Backend & APIs" | "Database & Storage" | "DevOps & Cloud";
  skills: {
    name: string;
    description: string;
    level: string;
    icon?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: "Work" | "Education";
  summary: string;
  highlights: string[];
  techStack: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    altName: string;
    initials: string;
    title: string;
    specialization: string;
    experienceYears: number;
    bio: string[];
    approach: string;
    avatarUrl: string;
    resumeUrl: string;
    location: string;
    fullAddress: string;
    phone: string;
    phoneFormatted: string;
    whatsappUrl: string;
    email: string;
    secondaryEmail: string;
    githubUrl: string;
    githubUsername: string;
    linkedinUrl: string;
    linkedinAltUrl: string;
  };
  metrics: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  hero: {
    headlinePrefix: string;
    headlineHighlight: string;
    subheadline: string;
    rotatingRoles: string[];
    primaryCtaText: string;
    primaryCtaHref: string;
    secondaryCtaText: string;
    secondaryCtaHref: string;
  };
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceItem[];
  contact: {
    invitation: string;
    telegram: {
      botToken: string;
      chatId: string;
    };
  };
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Mahdi Hasan",
    altName: "Mahdi Saikat",
    initials: "MH",
    title: "Software Engineer",
    specialization: "Full-Stack Development • React, Next.js, Node.js & Laravel",
    experienceYears: 8,
    bio: [
      "I am a Software Engineer with over 8 years of production experience designing, building, and deploying scalable web applications and high-performance backend systems.",
      "From responsive client applications built with React and Next.js to robust backend APIs engineered in Node.js, Express, and Laravel, I take full end-to-end ownership of the software engineering lifecycle — from database modeling to production cloud deployment.",
      "I have built and delivered mission-critical software solutions including retail point-of-sale engines, real-time trading terminals, multi-vendor e-commerce marketplaces, and automated billing gateways that process millions of transactions with high reliability."
    ],
    approach:
      "My software engineering philosophy is grounded in First-Principles: writing clean, modular code, enforcing strict type-safety, designing efficient database schemas, and eliminating unnecessary abstractions. I focus on building reliable software engineered to scale seamlessly under demanding production workloads.",
    avatarUrl: "/images/profilepic4.jpeg",
    resumeUrl: "/Mahdi_Hasan_Resume.pdf",
    location: "Dhaka, Bangladesh",
    fullAddress: "Asiatic Shopping Mall, Konapara, Jatrabari, Dhaka-1362, Bangladesh",
    phone: "+8801307607635",
    phoneFormatted: "+880 13 076 076 35",
    whatsappUrl: "https://wa.me/8801307607635",
    email: "mmahdihasan2011@gmail.com",
    secondaryEmail: "mahdi.saikat@gmail.com",
    githubUrl: "https://github.com/mahdihasan2011",
    githubUsername: "mahdihasan2011",
    linkedinUrl: "https://bd.linkedin.com/in/mahdihasan2011",
    linkedinAltUrl: "https://www.linkedin.com/in/mahdisaikat/",
  },
  metrics: [
    { label: "Experience", value: "8+", sublabel: "Years in Production" },
    { label: "Shipped Projects", value: "50+", sublabel: "Enterprise & Client Apps" },
    { label: "System Uptime", value: "99.9%", sublabel: "Production SLA" },
    { label: "Active Users", value: "100k+", sublabel: "Served Worldwide" },
  ],
  hero: {
    headlinePrefix: "Building High-Performance",
    headlineHighlight: "Software & Scalable Systems",
    subheadline:
      "Software Engineer with 8+ years of experience engineering production software. Specializing in high-performance web applications with React & Next.js, robust backend services in Node.js & Laravel, and distributed data systems.",
    rotatingRoles: [
      "Software Engineer",
      "Senior Full-Stack Engineer",
      "React & Next.js Developer",
      "Node.js & Laravel Backend Engineer",
      "Distributed Systems & Cloud APIs"
    ],
    primaryCtaText: "Explore Projects",
    primaryCtaHref: "#projects",
    secondaryCtaText: "Get in Touch",
    secondaryCtaHref: "#contact",
  },
  services: [
    {
      title: "Frontend Engineering",
      description: "High-performance, responsive web applications built with React, Next.js, TypeScript, and modern UI architectures with optimal UX and sub-second load times.",
      icon: "Layout",
    },
    {
      title: "Backend Systems & APIs",
      description: "Robust, scalable RESTful & WebSocket APIs built with Node.js, Express, and Laravel, optimized for concurrency, data integrity, and low latency.",
      icon: "Server",
    },
    {
      title: "Database Design & Optimization",
      description: "ACID-compliant relational schemas in MySQL & PostgreSQL with Redis caching layers, indexing optimization, and high query efficiency.",
      icon: "Database",
    },
    {
      title: "Cloud & DevOps Engineering",
      description: "End-to-end containerization with Docker, automated CI/CD pipelines, Linux server administration, and reliable cloud deployments maintaining 99.9% uptime.",
      icon: "Cpu",
    },
  ],
  skills: [
    {
      category: "Frontend & UI",
      skills: [
        { name: "React 19 / 18", description: "Hooks, Context, Concurrent Mode, Performance Optimization", level: "Senior / Lead" },
        { name: "Next.js (App Router)", description: "Server Components, ISR, SSR, Streaming, Metadata API", level: "Advanced" },
        { name: "TypeScript", description: "Strict Typing, Generic Contracts, Architecture Abstractions", level: "Advanced" },
        { name: "Vue.js 3", description: "Composition API, Pinia, Reactivity System, Nuxt", level: "Senior" },
        { name: "Tailwind CSS & Modern UI", description: "Design Systems, Component Architecture, CSS3, Responsive Layouts", level: "Senior" },
      ],
    },
    {
      category: "Backend & APIs",
      skills: [
        { name: "Node.js & Express", description: "Asynchronous Pipelines, Middleware, REST APIs, Microservices", level: "Senior" },
        { name: "PHP & Laravel", description: "Eloquent ORM, Queues, Service Providers, Authentication", level: "Senior / Lead" },
        { name: "RESTful & WebSockets", description: "Real-time feeds, contract schemas, JWT/OAuth, rate limiting", level: "Advanced" },
        { name: "API Gateways", description: "Load balancing, request routing, caching & proxying", level: "Senior" },
        { name: "Python Scripting", description: "Automation scripts, data processing, auxiliary utilities", level: "Competent" },
      ],
    },
    {
      category: "Database & Storage",
      skills: [
        { name: "MySQL & MariaDB", description: "Indexing, query optimization, triggers, transactions", level: "Senior / Lead" },
        { name: "PostgreSQL", description: "Complex joins, full-text search, JSONB, schema migrations", level: "Advanced" },
        { name: "Redis Caching", description: "In-memory caching, pub/sub, rate limiting, session storage", level: "Advanced" },
        { name: "MongoDB & NoSQL", description: "Document modeling, aggregation pipelines, flexible schemas", level: "Competent" },
      ],
    },
    {
      category: "DevOps & Cloud",
      skills: [
        { name: "Docker & Compose", description: "Multi-stage builds, container orchestration, dev parity", level: "Advanced" },
        { name: "Git & GitHub Actions", description: "Automated linting, CI/CD workflows, release pipelines", level: "Senior" },
        { name: "Linux & Nginx", description: "Server provisioning, SSL/TLS, reverse proxies, performance tuning", level: "Senior" },
        { name: "Vercel & Cloudflare", description: "Edge routing, DNS, CDN caching, serverless functions", level: "Advanced" },
      ],
    },
  ],
  projects: [
    {
      id: "retail-pos-engine",
      title: "Retail Point-of-Sale Engine",
      subtitle: "Enterprise High-Volume POS & Offline-Sync Engine",
      category: "Enterprise & POS",
      problemSolved:
        "High-volume retail store locations suffered from checkout delays and inventory sync failure whenever internet connections fluctuated, causing customer churn.",
      myContribution:
        "Architected an offline-first POS client using IndexedDB and WebSocket sync with a high-concurrency Node.js and Laravel backend, delivering instant sub-50ms barcode scanning.",
      tags: ["React", "TypeScript", "Node.js", "Laravel", "MySQL", "WebSockets"],
      image: "/images/pos.jpg",
      stars: 128,
      sourceUrl: "https://github.com/mahdihasan2011",
      details: {
        overview:
          "Mission-critical retail point-of-sale platform running across multiple brick-and-mortar storefronts, supporting barcode scanning, receipt printing, inventory locks, and multi-tender payments.",
        keyFeatures: [
          "Offline-first transaction buffering with automatic idempotent sync on reconnection",
          "Sub-50ms barcode scan-to-cart latency with optimistic UI updates",
          "Split tender checkout supporting cash, credit card, and digital mobile wallets",
          "Role-based cashier permissions, register shift management, and cash drawer auditing"
        ],
        architecture:
          "React frontend with optimistic client state; Node.js WebSocket microservice for terminal heartbeats; Laravel REST backend for billing transactions backed by MySQL with row-level locks."
      }
    },
    {
      id: "enterprise-ecommerce-platform",
      title: "Enterprise E-Commerce Platform",
      subtitle: "High-Traffic Multi-Tenant Storefront & Inventory Hub",
      category: "E-Commerce",
      problemSolved:
        "E-commerce retail storefront encountered checkout drop-offs and slow page loads during sudden traffic spikes and flash promotion campaigns.",
      myContribution:
        "Refactored the frontend into Next.js App Router with Incremental Static Regeneration (ISR) and Redis distributed caching, cutting Page Load Time by 65%.",
      tags: ["Next.js", "React", "Laravel", "Redis", "Tailwind CSS", "MySQL"],
      image: "/images/ecommerce.jpg",
      stars: 245,
      sourceUrl: "https://github.com/mahdihasan2011",
      details: {
        overview:
          "High-performance direct-to-consumer commerce storefront handling tens of thousands of daily catalog views with real-time stock reservations and automated fulfillment webhooks.",
        keyFeatures: [
          "ISR-powered dynamic product catalog with instant category filtering and search",
          "Cart drawer with persistent session sync and multi-currency exchange conversion",
          "Stripe and SSLCommerz payment gateway integrations with automated webhook reconciliation",
          "Integrated admin dashboard with inventory forecasting and sales analytics"
        ],
        architecture:
          "Next.js App Router for frontend SSR/ISR, communicating via typed OpenAPI contracts to a Laravel API service with Redis session caches and MariaDB database."
      }
    },
    {
      id: "multivendor-marketplace-core",
      title: "Multi-Vendor Marketplace Core",
      subtitle: "Multi-Merchant Portal with Split Payments & Commission Engine",
      category: "E-Commerce",
      problemSolved:
        "Fragmented vendor onboarding, manual commission payouts, and uncoordinated inventory tracking made scaling past 20 merchants impossible.",
      myContribution:
        "Engineered an automated vendor lifecycle portal with custom commission calculations, escrow ledgering, and merchant self-service dashboards.",
      tags: ["Vue.js 3", "Laravel", "PHP 8", "MySQL", "Docker", "REST API"],
      image: "/images/ecom3.jpg",
      stars: 89,
      sourceUrl: "https://github.com/mahdihasan2011",
      details: {
        overview:
          "Enterprise marketplace backbone powering hundreds of independent merchants with individual storefronts, automated shipping manifests, and consolidated checkout.",
        keyFeatures: [
          "Merchant portal with catalog upload, order fulfillment workflows, and dispute handling",
          "Automated ledger split-payment calculations deducting platform commissions",
          "Comprehensive audit logging for all balance adjustments and payout transfers",
          "Granular customer review verification tied to confirmed transaction IDs"
        ],
        architecture:
          "Vue.js 3 reactive frontend backed by Laravel Queue workers handling asynchronous payout calculations and automated email notifications."
      }
    },
    {
      id: "crypto-trading-terminal",
      title: "Real-Time Trading & Crypto Terminal",
      subtitle: "Sub-Second Market Data Visualizer & Order Execution Dashboard",
      category: "Fintech & Trading",
      problemSolved:
        "Traders experienced UI freezing and delayed price ticker quotes during periods of intense market volatility when processing 1,000+ ticks/sec.",
      myContribution:
        "Built a high-frequency Canvas/WebGL charting interface using React, Web Workers for tick aggregation, and low-latency WebSocket stream subscribers.",
      tags: ["React", "TypeScript", "Three.js", "WebSockets", "Node.js", "Tailwind CSS"],
      image: "/images/money-transfer.jpg",
      stars: 312,
      sourceUrl: "https://github.com/mahdihasan2011",
      details: {
        overview:
          "Institutional-grade digital asset terminal featuring real-time order books, dynamic depth charts, interactive indicators, and simulated paper execution.",
        keyFeatures: [
          "60fps WebGL candlestick and depth chart rendering handling continuous market feeds",
          "Off-main-thread orderbook processing in dedicated Web Workers preventing UI jank",
          "Interactive stop-loss and take-profit visual order placement overlay",
          "Dark/Light custom trading themes with high-contrast indicator palettes"
        ],
        architecture:
          "Next.js/React frontend with Three.js rendering overlays; Node.js stream broker subscribing to market feeds and broadcasting delta diffs via binary WebSockets."
      }
    },
    {
      id: "crm-ticketing-suite",
      title: "Multi-Tenant CRM & Ticketing Suite",
      subtitle: "Customer Success & Automated SLA Resolution Platform",
      category: "AI & SaaS",
      problemSolved:
        "Support teams struggled with duplicate ticket handling, lost customer context, and SLA breaches due to disconnected email threads.",
      myContribution:
        "Engineered an omnichannel ticket management system with real-time agent collision detection, automated triage rules, and customer timeline unification.",
      tags: ["React", "Next.js", "Laravel", "PostgreSQL", "WebSockets", "Redis"],
      image: "/images/crm1.jpg",
      stars: 174,
      sourceUrl: "https://github.com/mahdihasan2011",
      details: {
        overview:
          "Comprehensive customer relationship and operational helpdesk platform enabling enterprise support teams to resolve inquiries within strict SLA parameters.",
        keyFeatures: [
          "Agent collision detection showing when another staff member is typing or viewing a ticket",
          "Configurable SLA escalation matrices with automated alert triggers to Slack and Telegram",
          "Full-text search over millions of customer interactions powered by PostgreSQL indexes",
          "Canned response macros, keyboard shortcuts, and automated customer sentiment scoring"
        ],
        architecture:
          "React single-page frontend connecting to a Laravel backend with Redis Pub/Sub broadcasting presence and ticket status events."
      }
    },
    {
      id: "financial-analytics-ledger",
      title: "Financial Analytics & Ledger Engine",
      subtitle: "Double-Entry Accounting & Financial Compliance Reporting",
      category: "Fintech & Trading",
      problemSolved:
        "Manual reconciliation between banking statements and internal business records required hundreds of employee hours each month and was prone to accounting anomalies.",
      myContribution:
        "Built a double-entry financial ledger service guaranteeing immutable journal entries with automated bank feed reconciliation and audit trails.",
      tags: ["TypeScript", "Node.js", "React", "PostgreSQL", "Docker", "Jest"],
      image: "/images/money-transfer.jpg",
      stars: 142,
      sourceUrl: "https://github.com/mahdihasan2011",
      details: {
        overview:
          "Strict double-entry accounting engine handling credit/debit validation, multi-currency valuation, automated fiscal period closures, and executive balance sheets.",
        keyFeatures: [
          "Immutable journal entry architecture preventing retroactive record alteration",
          "Automated rule-based transaction categorization matching bank feeds with 98% accuracy",
          "Interactive financial breakdown charts with drill-down capabilities into underlying receipts",
          "Exportable PDF/Excel balance sheets, profit & loss, and trial balance summaries"
        ],
        architecture:
          "Node.js TypeScript API with strict schema validation; PostgreSQL transactional guarantees ensuring debits strictly equal credits on every write."
      }
    },
    {
      id: "ai-document-intelligence",
      title: "AI Document Intelligence & OCR Pipeline",
      subtitle: "Automated Document Parsing & Semantic Entity Extraction",
      category: "AI & SaaS",
      problemSolved:
        "Enterprise staff spent hours manually retyping data from PDF invoices, contracts, and receipts into legacy database tables.",
      myContribution:
        "Designed an asynchronous OCR and semantic extraction pipeline that parses unstructured PDF files into clean, typed JSON data structures.",
      tags: ["Next.js", "React", "Node.js", "Python", "Docker", "Tailwind CSS"],
      image: "/images/crm2.jpg",
      stars: 96,
      sourceUrl: "https://github.com/mahdihasan2011",
      details: {
        overview:
          "End-to-end document intake workflow that ingests scanned documents, executes OCR, normalizes tabular data, and exports directly to ERP databases.",
        keyFeatures: [
          "Drag-and-drop document upload with real-time processing progress bars",
          "Interactive side-by-side verification interface highlighting extracted bounding boxes",
          "Confidence scoring per extracted field with manual review flag triggers",
          "Webhook notifications when batch document jobs complete successfully"
        ],
        architecture:
          "Next.js frontend with drag-and-drop file upload; Node.js API orchestrating Python OCR workers containerized via Docker with asynchronous job queues."
      }
    },
    {
      id: "isp-radius-billing",
      title: "Automated ISP Radius & Billing Gateway",
      subtitle: "High-Throughput Subscriber Management & Router Sync",
      category: "Enterprise & POS",
      problemSolved:
        "ISP operators struggled to synchronize user bandwidth quotas and automated disconnection of overdue accounts across distributed MikroTik routers.",
      myContribution:
        "Architected an automated MikroTik RouterOS API socket integration that updates queues in real time and cuts overdue connection lines automatically.",
      tags: ["Laravel", "PHP 8", "MySQL", "MikroTik API", "Linux", "Bootstrap"],
      image: "/images/isp-billing.jpg",
      stars: 78,
      sourceUrl: "https://github.com/mahdihasan2011",
      details: {
        overview:
          "Network operations management system controlling subscriber provisioning, bandwidth queues, router synchronizations, and automated recurring billing cycles.",
        keyFeatures: [
          "Direct MikroTik RouterOS API integration provisioning queues in real time",
          "Automated recurring invoice generation with local mobile payment integration",
          "Sub-agent quota management and customer self-care portal",
          "Real-time bandwidth graph monitoring and network outage alerting"
        ],
        architecture:
          "Laravel / PHP core communicating over router sockets with a high-throughput MySQL database serving 50,000+ active subscribers."
      }
    }
  ],
  experience: [
    // Work Experience
    {
      id: "exp-vivacom",
      role: "Senior Software Developer",
      organization: "Vivacom BD",
      period: "Jan 2023 — Present",
      location: "Dhaka, Bangladesh",
      type: "Work",
      summary:
        "Leading client-facing frontend architecture and full-stack system scalability for enterprise financial dashboard applications.",
      highlights: [
        "Architected and led development of an enterprise client financial dashboard using React, TypeScript, and stateful caching, reducing latency by 45%.",
        "Established code review practices, automated CI/CD linting, and mentored junior developers to boost sprint delivery velocity by 30%.",
        "Drove technical decision-making on component architecture, state management patterns, and system resilience."
      ],
      techStack: ["React 18", "TypeScript", "Laravel", "Financial APIs", "Docker", "Redis"]
    },
    {
      id: "exp-tiyasha",
      role: "Web Developer (Remote)",
      organization: "Tiyasha Software",
      period: "Feb 2021 — Dec 2022",
      location: "Bengaluru, India (Remote)",
      type: "Work",
      summary:
        "Worked remotely with an international engineering team on distributed web technologies, microservices, and client portal applications.",
      highlights: [
        "Engineered RESTful backend endpoints and dynamic frontend views for diverse international client requirements.",
        "Collaborated across time zones using Git workflows, agile sprints, and daily asynchronous standups.",
        "Delivered production features with strict testing and cross-browser responsiveness."
      ],
      techStack: ["PHP", "Laravel", "JavaScript", "REST APIs", "MySQL", "Bootstrap"]
    },
    {
      id: "exp-fieldboosters",
      role: "Software Developer",
      organization: "Field Booster Limited",
      period: "Jun 2020 — Dec 2022",
      location: "Bashundhara R/A, Dhaka, Bangladesh",
      type: "Work",
      summary:
        "Built and maintained core full-stack features for a high-traffic e-commerce platform and merchant vendor management systems.",
      highlights: [
        "Engineered core merchant features for high-traffic product flows, improving reliability and checkout conversion.",
        "Partnered with product managers and designers to break down requirements into clear, testable technical specifications.",
        "Contributed to full-stack delivery using Vue.js frontend and Laravel backend, ensuring consistent API contracts."
      ],
      techStack: ["Vue.js", "Laravel", "MySQL", "Payment Gateways", "REST APIs"]
    },
    {
      id: "exp-creative",
      role: "Junior Laravel Developer",
      organization: "Creative Software Limited",
      period: "Aug 2018 — May 2020",
      location: "Elephant Road, Dhaka, Bangladesh",
      type: "Work",
      summary:
        "Developed full-stack web application modules in PHP and Laravel, gaining end-to-end software lifecycle experience.",
      highlights: [
        "Developed and maintained client-facing software features in PHP and Laravel across multiple business verticals.",
        "Participated in client requirements elicitation workshops, converting functional requests into maintainable codebase deliverables."
      ],
      techStack: ["PHP", "Laravel", "JavaScript", "Bootstrap", "MySQL", "jQuery"]
    },
    {
      id: "exp-freelance",
      role: "Freelance Software Developer & Consultant",
      organization: "Independent Practice",
      period: "2018 — Continuing",
      location: "Dhaka, Bangladesh & Worldwide",
      type: "Work",
      summary:
        "Consulted and built custom software, ERP modules, POS engines, and client web applications for global businesses.",
      highlights: [
        "Delivered 50+ custom web applications, SaaS dashboards, and database integrations.",
        "Maintained 100% on-time project delivery record with long-term retainer clients."
      ],
      techStack: ["React", "Next.js", "Node.js", "Laravel", "MySQL", "Tailwind CSS"]
    },
    {
      id: "exp-dhakacenter",
      role: "Intern Software Developer",
      organization: "Dhaka Center NIC Limited",
      period: "Oct 2017 — Jan 2018",
      location: "Dhaka, Bangladesh",
      type: "Work",
      summary:
        "Foundational internship focusing on core software engineering practices, database queries, and web application lifecycle.",
      highlights: [
        "Assisted senior engineers in testing, debugging, and documenting internal tools.",
        "Gained hands-on experience with production MySQL schemas and Linux deployment."
      ],
      techStack: ["PHP", "HTML5", "CSS3", "JavaScript", "MySQL"]
    },

    // Education & Degrees
    {
      id: "edu-ju",
      role: "Master of Science in Computer Science & Engineering (M.Sc. CSE)",
      organization: "Jahangirnagar University",
      period: "2022 — 2023",
      location: "Savar, Dhaka, Bangladesh",
      type: "Education",
      summary:
        "Graduate specialization in Advanced Distributed Systems, Algorithmic Analysis, and Scalable Cloud Architectures.",
      highlights: [
        "Completed thesis research on high-throughput distributed architectures and cloud scalability."
      ],
      techStack: ["Distributed Systems", "Advanced Algorithms", "Cloud Architecture"]
    },
    {
      id: "edu-iubat",
      role: "Bachelor of Science in Computer Science & Engineering (B.Sc. CSE)",
      organization: "IUBAT — International University of Business Agriculture and Technology",
      period: "2013 — 2017",
      location: "4 Embankment Drive Road, Sector-10, Uttara, Dhaka-1230",
      type: "Education",
      summary:
        "Comprehensive 4-year undergraduate engineering degree covering Computer Science fundamentals and software engineering.",
      highlights: [
        "Rigorous training in Object-Oriented Programming, Relational Database Theory, Data Structures, and System Design."
      ],
      techStack: ["OOP", "Data Structures", "Database Theory", "Operating Systems", "Networking"]
    }
  ],
  contact: {
    invitation:
      "Whether you are considering me for a Software Engineering role, need technical consulting for your Next.js/Node.js/Laravel stack, or want to discuss a challenging project, my inbox is always open.",
    telegram: {
      botToken: "8289585552:AAEPZbLgJXH1Kf0OIzpQJmwasgqpMX3ETkg",
      chatId: "8553087905",
    }
  }
};
