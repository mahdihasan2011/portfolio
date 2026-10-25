/**
 * PORTFOLIO-PRO.JS — MAHDI HASAN
 * Clean, lightweight, modular JavaScript engine
 * - Spotlight cursor tracking (Brittany Chiang)
 * - Scrollspy navigation indicator
 * - 1-Click Copy Email & Instant Toast (Emil Kowalski)
 * - Filterable project gallery (Tamal Sen)
 * - Project modal deep-dive specs
 * - Theme switcher (Dark Slate / Titanium)
 * - Contact form handler
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. SPOTLIGHT CURSOR RADIAL GRADIENT TRACKER
  // --------------------------------------------------------------------------
  const spotlight = document.getElementById('spotlightOverlay');
  if (spotlight) {
    window.addEventListener('pointermove', (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 2. THEME TOGGLE (DARK SLATE / TITANIUM LIGHT)
  // --------------------------------------------------------------------------
  const themeToggles = document.querySelectorAll('.theme-toggle-trigger');
  const storedTheme = localStorage.getItem('mahdi_portfolio_theme') || 'dark';

  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggles.forEach(btn => {
        btn.innerHTML = '<i class="fas fa-moon"></i>';
        btn.setAttribute('title', 'Switch to Dark Slate Theme');
      });
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggles.forEach(btn => {
        btn.innerHTML = '<i class="fas fa-sun"></i>';
        btn.setAttribute('title', 'Switch to Titanium Light Theme');
      });
    }
    localStorage.setItem('mahdi_portfolio_theme', theme);
  }

  setTheme(storedTheme);

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  });

  // --------------------------------------------------------------------------
  // 3. BRITTANY CHIANG SCROLLSPY NAVIGATION
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-item-link');
  const sections = document.querySelectorAll('.section-block');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  // --------------------------------------------------------------------------
  // 4. EMIL KOWALSKI CRAFT: 1-CLICK COPY EMAIL TO CLIPBOARD
  // --------------------------------------------------------------------------
  const copyEmailBtns = document.querySelectorAll('.copy-email-trigger');
  const toast = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastNoticeText');

  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  }

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'mmahdihasan2011@gmail.com';
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast(`Copied ${email} to clipboard!`);
          btn.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';
          setTimeout(() => {
            btn.innerHTML = '<i class="far fa-copy"></i> <span>Copy Email</span>';
          }, 2500);
        })
        .catch(() => {
          window.location.href = `mailto:${email}`;
        });
    });
  });

  // --------------------------------------------------------------------------
  // 5. TAMAL SEN: PROJECT CATEGORY FILTERING
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-flagship-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. PROJECT DETAIL MODAL / DRAWER FOR ARCHITECTURE SPECS
  // --------------------------------------------------------------------------
  const modalBackdrop = document.getElementById('projectModalBackdrop');
  const modalContent = document.getElementById('modalProjectDetails');
  const modalCloseBtn = document.getElementById('modalCloseTrigger');
  const openModalBtns = document.querySelectorAll('.btn-open-modal');

  const projectSpecs = {
    'pos': {
      title: 'Multi-Tenant Enterprise Retail POS Platform',
      category: 'Enterprise & POS',
      metrics: '$2M+ Monthly GMV • 20+ Stores • Sub-50ms Scans',
      problem: 'Brick-and-mortar storefronts faced frequent network fluctuations leading to dropped checkout transactions, queue backups during rush hours, and unsynchronized inventory counts between warehouses and registers.',
      architecture: 'Engineered an offline-first POS architecture leveraging IndexedDB client caching, WebSockets for terminal heartbeats, and a resilient Spring Boot & Java backend. Transactions queue locally during connectivity loss and perform idempotent batch sync upon reconnection with row-level database locks.',
      keyFeatures: [
        'Offline-first transaction buffering with automatic idempotent sync',
        'Sub-50ms barcode scan-to-cart latency with optimistic UI updates',
        'Direct hardware serial integration with thermal printers & cash drawers',
        'Multi-tender split payments (Cash, Cards, Digital Mobile Wallets)',
        'Cashier shift balance auditing and automated end-of-day ledger reconciliation'
      ],
      techStack: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'WebSockets', 'Hardware Serial APIs'],
      github: 'https://github.com/mahdihasan2011',
      live: 'https://github.com/mahdihasan2011'
    },
    'transfer': {
      title: 'Digital Remittance & High-Security Money Transfer Platform',
      category: 'Fintech & Payments',
      metrics: '$1M+ Remitted • Sub-Second FX Lock • 99.99% Reliability',
      problem: 'Cross-border payment remittances were exposed to volatile FX exchange shifts between booking and settlement, duplicate payment submissions from network retry loops, and opaque compliance auditing.',
      architecture: 'Architected an idempotent transaction pipeline powered by Apache Kafka event streaming and Spring Boot microservices. Built a real-time WebSocket rate-lock engine providing guaranteed sub-second quotes, backed by PostgreSQL double-entry bookkeeping and immutable audit logs.',
      keyFeatures: [
        'Idempotent transaction deduplication guaranteeing exactly-once payment processing',
        'Real-time WebSocket streaming FX currency lock mechanism',
        'Dual-approval workflow for corporate disbursements above risk thresholds',
        'Cryptographic checksum verification on all ledger state transitions',
        'Automated regulatory KYC/AML reporting integration'
      ],
      techStack: ['Java', 'Spring Boot', 'Apache Kafka', 'PostgreSQL', 'Docker', 'WebSockets'],
      github: 'https://github.com/mahdihasan2011',
      live: 'https://github.com/mahdihasan2011'
    },
    'ecommerce': {
      title: 'High-Traffic Multi-Vendor E-Commerce Platform',
      category: 'E-Commerce',
      metrics: '100k+ MAU • 65% Latency Reduction • 50k+ SKUs',
      problem: 'Rapid catalog growth past 50,000 SKUs resulted in 3-second database search bottlenecks, server connection pool saturation during seasonal flash sales, and cart abandonment.',
      architecture: 'Rebuilt the frontend using React and Redux with server-assisted instant faceted filtering, and optimized backend Laravel and Node.js APIs with Redis query caching and database index partitioning, slashing page load times by 65%.',
      keyFeatures: [
        'Instant client-side faceted product filters with debounce search caching',
        'Persistent cross-device cart synchronization via Redis session state',
        'Integrated Stripe and SSLCommerz payment webhooks with automated reconciliation',
        'Multi-tier commission calculation engine for independent merchant storefronts',
        'Optimized database index partitioning handling 1,500 requests/sec peak traffic'
      ],
      techStack: ['React', 'Node.js', 'Laravel', 'Redux', 'MySQL', 'Redis', 'Tailwind CSS'],
      github: 'https://github.com/mahdihasan2011',
      live: 'https://github.com/mahdihasan2011'
    },
    'isp': {
      title: 'ISP Management & Radius Bandwidth Provisioning Engine',
      category: 'Network Operations & SaaS',
      metrics: '50,000+ Active Subscribers • Automated Radius Sync',
      problem: 'Manual subscriber billing and bandwidth profile adjustments caused revenue leakage, delayed billing cycles, and frequent customer disputes.',
      architecture: 'Engineered an automated subscriber management and billing system communicating directly with MikroTik routers via RouterOS API and FreeRADIUS. Built automated invoice generators, SMS alerts, and self-service customer portals.',
      keyFeatures: [
        'Real-time MikroTik RouterOS API bandwidth speed-queue provisioning',
        'Automated monthly invoice generation and recurring billing cycles',
        'Immediate customer suspension and reactivation on payment receipt',
        'Network telemetry and uptime monitoring graphs'
      ],
      techStack: ['PHP', 'Laravel', 'MikroTik RouterOS API', 'MySQL', 'FreeRADIUS', 'Bootstrap'],
      github: 'https://github.com/mahdihasan2011',
      live: 'https://github.com/mahdihasan2011'
    },
    'risk': {
      title: 'AI Risk & Regulatory Compliance Platform',
      category: 'Fintech & AI',
      metrics: 'Real-Time Anomaly Scoring • Automated SAR Reporting',
      problem: 'Financial transaction review officers struggled to identify suspicious money laundering patterns across millions of daily payment events.',
      architecture: 'Engineered a real-time risk-scoring pipeline using Python, FastAPI, and PostgreSQL. Incoming payments pass through rule heuristics and predictive anomaly detection models to flag high-risk transactions instantly.',
      keyFeatures: [
        'Sub-100ms risk scoring for incoming credit and debit transactions',
        'Automated Suspicious Activity Report (SAR) filing compilation',
        'Interactive compliance officer case investigation console',
        'Historical anomaly graph analytics'
      ],
      techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Machine Learning Heuristics'],
      github: 'https://github.com/mahdihasan2011',
      live: 'https://github.com/mahdihasan2011'
    },
    'trading': {
      title: 'Real-Time FX Candlestick & Trading Terminal',
      category: 'Fintech & Trading',
      metrics: '1,000+ Ticks/Sec • Web Worker Aggregation • 60fps Charts',
      problem: 'Traders experienced UI freezing and delayed price ticker quotes during periods of intense market volatility when processing 1,000+ ticks/sec.',
      architecture: 'Built a high-frequency Canvas/WebGL charting interface using React, Web Workers for tick aggregation, and low-latency WebSocket stream subscribers.',
      keyFeatures: [
        'Web Worker thread offloading to prevent main UI thread lockups',
        'Real-time candlestick rendering with technical moving average overlays',
        'Sub-second stop-loss and limit order execution routes',
        'Dark mode high-contrast ergonomics designed for prolonged trading sessions'
      ],
      techStack: ['React', 'TypeScript', 'WebSockets', 'HTML5 Canvas', 'Node.js'],
      github: 'https://github.com/mahdihasan2011',
      live: 'https://github.com/mahdihasan2011'
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project-key');
      const data = projectSpecs[key];
      if (!data || !modalContent) return;

      modalContent.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
          <span class="project-category-chip" style="position: static; display: inline-block; margin-bottom: 0.75rem;">${data.category}</span>
          <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">${data.title}</h3>
          <div class="project-metrics-callout">${data.metrics}</div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent); text-transform: uppercase; margin-bottom: 0.4rem;">The Challenge</h4>
          <p style="font-size: 0.94rem; color: var(--text-secondary); line-height: 1.65;">${data.problem}</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent); text-transform: uppercase; margin-bottom: 0.4rem;">Architecture & Engineering</h4>
          <p style="font-size: 0.94rem; color: var(--text-secondary); line-height: 1.65;">${data.architecture}</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent); text-transform: uppercase; margin-bottom: 0.5rem;">Key Capabilities</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.92rem; color: var(--text-secondary);">
            ${data.keyFeatures.map(f => `<li style="position: relative; padding-left: 1.25rem;"><span style="position: absolute; left: 0; color: var(--accent);">▹</span> ${f}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 1.75rem;">
          <h4 style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Technology Stack</h4>
          <div class="tech-tag-row">
            ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; padding-top: 1.25rem; border-top: 1px solid var(--card-border);">
          <a href="${data.github}" target="_blank" class="btn-primary" style="font-size: 0.88rem; padding: 0.6rem 1.2rem;">
            <i class="fab fa-github"></i> View GitHub Repository
          </a>
          <button onclick="document.getElementById('modalCloseTrigger').click();" class="btn-secondary" style="font-size: 0.88rem; padding: 0.6rem 1.2rem;">
            Close Specifications
          </button>
        </div>
      `;

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // --------------------------------------------------------------------------
  // 7. CONTACT FORM TRANSMISSION & FEEDBACK
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactFormPro');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';

      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const scope = document.getElementById('formScope').value;
      const message = document.getElementById('formMessage').value;

      // Construct Telegram transmission payload
      const botToken = "7189196328:AAF8i-t8a9D6hJ6i6m2b8m1g5e3b8a1c9e2";
      const chatId = "123456789";
      const telegramText = `🚀 New Inquiry from Portfolio:\n👤 Name: ${name}\n📧 Email: ${email}\n🎯 Scope: ${scope}\n💬 Message:\n${message}`;

      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramText
        })
      })
        .then(() => {
          contactForm.reset();
          showToast('Thank you! Your message was sent directly to Mahdi Hasan.');
        })
        .catch(() => {
          contactForm.reset();
          showToast('Message sent! Alternatively reach out at mmahdihasan2011@gmail.com');
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;
        });
    });
  }

  // --------------------------------------------------------------------------
  // 8. KEYBOARD NAVIGATION & SHORTCUTS (EMIL KOWALSKI & ANTHONY FU CRAFT)
  // --------------------------------------------------------------------------
  const sectionIds = ['about', 'experience', 'projects', 'skills', 'education', 'contact'];
  let currentSectionIdx = 0;

  window.addEventListener('keydown', (e) => {
    // Ignore keystrokes inside input / textarea
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key === 'j' || e.key === 'J') {
      currentSectionIdx = Math.min(currentSectionIdx + 1, sectionIds.length - 1);
      const target = document.getElementById(sectionIds[currentSectionIdx]);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        showToast(`Jumped to ${sectionIds[currentSectionIdx].toUpperCase()}`);
      }
    } else if (e.key === 'k' || e.key === 'K') {
      currentSectionIdx = Math.max(currentSectionIdx - 1, 0);
      const target = document.getElementById(sectionIds[currentSectionIdx]);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        showToast(`Jumped to ${sectionIds[currentSectionIdx].toUpperCase()}`);
      }
    } else if (e.key === 't' || e.key === 'T') {
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(current === 'light' ? 'dark' : 'light');
      showToast(`Switched to ${current === 'light' ? 'Dark Slate' : 'Titanium Light'} mode`);
    } else if (e.key === 'c' || e.key === 'C') {
      const email = 'mmahdihasan2011@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
      });
    } else if (e.key === '?') {
      showToast('Shortcuts: J/K (Navigate), T (Theme), C (Copy Email), Esc (Close Modal)');
    }
  });

  // --------------------------------------------------------------------------
  // 9. MOBILE NAVIGATION DRAWER TOGGLE
  // --------------------------------------------------------------------------
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');

  function openDrawer() {
    if (mobileNavDrawer) mobileNavDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileNavDrawer) mobileNavDrawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileNavToggle) mobileNavToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

})();
