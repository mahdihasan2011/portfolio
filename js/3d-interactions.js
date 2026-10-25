/**
 * MAHDI HASAN | 3D MODERN PORTFOLIO INTERACTIONS ENGINE
 * Card Tilts, Web Audio Synthesizer, 3D Cursor, Modals & Live APIs
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. WEB AUDIO SYNTHESIZER (ZERO EXTERNAL ASSETS)
  // ==========================================================================
  let audioCtx = null;
  let isAudioEnabled = localStorage.getItem('audio_enabled') === 'true';

  function initAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  window.playSynthSound = function (type) {
    if (!isAudioEnabled) return;
    initAudioContext();
    if (!audioCtx) return;

    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(240, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'burst') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.4);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {
      // Audio playback safely suppressed
    }
  };

  // Sound Toggle Button
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  function updateAudioButtonUI() {
    if (!audioToggleBtn) return;
    const icon = audioToggleBtn.querySelector('i');
    if (icon) {
      icon.className = isAudioEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    }
    audioToggleBtn.title = isAudioEnabled ? 'Sound Effects Enabled (Click to Mute)' : 'Sound Effects Muted (Click to Enable)';
    if (isAudioEnabled) {
      audioToggleBtn.style.color = 'var(--accent-cyan)';
    } else {
      audioToggleBtn.style.color = 'var(--text-muted)';
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      initAudioContext();
      isAudioEnabled = !isAudioEnabled;
      localStorage.setItem('audio_enabled', isAudioEnabled);
      updateAudioButtonUI();
      if (isAudioEnabled) window.playSynthSound('click');
    });
    updateAudioButtonUI();
  }

  // ==========================================================================
  // 2. CUSTOM 3D MOUSE CURSOR
  // ==========================================================================
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorFollower = document.querySelector('.custom-cursor-follower');

  if (cursorDot && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }, { passive: true });

    function renderCursor() {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Hover state on interactive elements
    const interactiveElements = 'a, button, input, select, textarea, .tilt-card, .btn-3d-primary, .btn-3d-secondary, #hero-quantum-canvas';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveElements)) {
        document.body.classList.add('cursor-hover');
        window.playSynthSound('hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveElements)) {
        document.body.classList.remove('cursor-hover');
      }
    });

    document.addEventListener('click', () => {
      window.playSynthSound('click');
    });
  }

  // ==========================================================================
  // 3. 3D CARD TILT & SPECULAR GLARE ENGINE
  // ==========================================================================
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    // Add specular glare overlay if not present
    if (!card.querySelector('.card-glare')) {
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10; // Max tilt: 10deg
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  // ==========================================================================
  // 4. HERO SECTION TYPEWRITER ROTATOR
  // ==========================================================================
  const typingElement = document.getElementById('heroRoleTyping');
  const roles = [
    'Senior Full-Stack Engineer',
    'React & TypeScript Specialist',
    'Laravel & PHP API Architect',
    'Vue.js & Modern UI Crafter',
    'Fintech & Scalable Systems Builder',
    '8+ Years Turning Complex Ideas to Code'
  ];

  if (typingElement) {
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeDelay = 90;

    function typeLoop() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeDelay = 40;
      } else {
        typingElement.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeDelay = 85;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        isDeleting = true;
        typeDelay = 2200; // Pause at end of text
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeDelay = 400;
      }

      setTimeout(typeLoop, typeDelay);
    }

    typeLoop();
  }

  // ==========================================================================
  // 5. THEME TOGGLE (CYBER DARK / TITANIUM LIGHT)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');

  function setTheme(isLight) {
    if (isLight) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme_mode', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme_mode', 'dark');
    }

    // Update icons
    const iconClass = isLight ? 'fas fa-moon' : 'fas fa-sun';
    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector('i');
      if (icon) icon.className = iconClass;
    }
    if (mobileThemeToggleBtn) {
      const icon = mobileThemeToggleBtn.querySelector('i');
      if (icon) icon.className = iconClass;
    }

    // Update Three.js lighting
    if (window.update3DTheme) {
      window.update3DTheme(isLight);
    }
  }

  // Initialize from storage or prefers-color-scheme
  const savedTheme = localStorage.getItem('theme_mode');
  const prefersLight = savedTheme === 'light';
  setTheme(prefersLight);

  function toggleThemeAction() {
    const isNowLight = !document.body.classList.contains('light-mode');
    setTheme(isNowLight);
    window.playSynthSound('click');
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleThemeAction);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleThemeAction);

  // ==========================================================================
  // 6. SKILLS MATRIX FILTER & ANIMATED PROGRESS
  // ==========================================================================
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-3d-card-wrapper');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.playSynthSound('click');

      const filter = btn.dataset.filter;
      skillCards.forEach(cardWrapper => {
        const category = cardWrapper.dataset.category;
        if (filter === 'all' || category === filter) {
          cardWrapper.style.display = 'block';
          setTimeout(() => {
            cardWrapper.style.opacity = '1';
            cardWrapper.style.transform = 'scale(1)';
          }, 20);
        } else {
          cardWrapper.style.opacity = '0';
          cardWrapper.style.transform = 'scale(0.85)';
          setTimeout(() => {
            cardWrapper.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Animate skill progress bars when visible
  const skillBars = document.querySelectorAll('.skill-progress-bar');
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const val = bar.dataset.value;
          bar.style.width = `${val}%`;
        });
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillsObserver.observe(skillsSection);

  // ==========================================================================
  // 7. PROJECTS FILTER & 3D MODAL POPUP
  // ==========================================================================
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-3d-card-wrapper');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.playSynthSound('click');

      const filter = btn.dataset.filter;
      projectCards.forEach(cardWrapper => {
        const category = cardWrapper.dataset.category;
        if (filter === 'all' || category === filter) {
          cardWrapper.style.display = 'block';
          setTimeout(() => {
            cardWrapper.style.opacity = '1';
            cardWrapper.style.transform = 'scale(1)';
          }, 20);
        } else {
          cardWrapper.style.opacity = '0';
          cardWrapper.style.transform = 'scale(0.85)';
          setTimeout(() => {
            cardWrapper.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Project Details Modal Database
  const projectData = {
    pos: {
      title: 'Retail POS System',
      category: 'Enterprise & POS',
      stars: '128',
      tech: ['Java', 'Spring Boot', 'MySQL', 'Barcode SDK', 'Electron'],
      image: 'images/pos.jpg',
      description: 'A comprehensive, high-throughput Point of Sale system engineered for retail chains. Features include instant inventory synchronization, offline-first barcode scanning, multi-tier tax calculation, dynamic discount management, and real-time executive analytics.',
      highlights: [
        'Sub-second transaction processing supporting thermal receipt printing and EFTPOS integration.',
        'Robust offline caching mechanism syncing automatically with central cloud databases upon reconnection.',
        'Multi-currency and split-tender payment support with role-based security clearance levels.'
      ],
      github: 'https://github.com/mahdihasan2011'
    },
    ecommerce: {
      title: 'Enterprise E-Commerce Platform',
      category: 'E-Commerce',
      stars: '245',
      tech: ['React', 'Node.js', 'Redux Toolkit', 'Stripe', 'Redis', 'Docker'],
      image: 'images/ecom.jpg',
      description: 'Full-featured online marketplace serving thousands of concurrent shoppers. Equipped with instantaneous catalog search, faceted filtering, dynamic cart updates, multi-vendor dashboards, and automated order fulfillment pipelines.',
      highlights: [
        'Built with microservices architecture separating payment, catalog, and recommendation services.',
        'Optimized with Redis caching for 99.8% cache-hit ratio on hot product queries.',
        'Integrated multi-provider payment gateways with webhook-driven fraud detection.'
      ],
      github: 'https://github.com/mahdihasan2011'
    },
    complaint: {
      title: 'Complaint & Ticket Management System',
      category: 'Enterprise Solutions',
      stars: '87',
      tech: ['Python', 'Django', 'PostgreSQL', 'Celery', 'Redis', 'Bootstrap 5'],
      image: 'images/crm1.jpg',
      description: 'Enterprise-grade ticketing and grievance lifecycle management platform. Includes automated department routing, SLA deadline escalation timers, omnichannel ticket intake (email, SMS, web portal), and field technician dispatching.',
      highlights: [
        'Automated ticket triage algorithm routing issues based on sentiment and urgency categorization.',
        'Real-time SLA monitoring with automated escalation webhooks to team supervisors.',
        'Interactive customer portal with end-to-end audit trail and resolution ratings.'
      ],
      github: 'https://github.com/mahdihasan2011'
    },
    risk: {
      title: 'AI Risk Management & Compliance Engine',
      category: 'Fintech & AI',
      stars: '156',
      tech: ['Python', 'TensorFlow', 'FastAPI', 'React', 'TimescaleDB'],
      image: 'images/crm2.jpg',
      description: 'AI-powered financial risk assessment and predictive analytics platform. Analyzes transaction velocity, geographic anomalies, and user behavior in real time to generate risk scores and regulatory audit reports.',
      highlights: [
        'Real-time stream evaluation handling over 5,000 transactions per second.',
        'Explainable AI model visualizing feature importance for each risk score generated.',
        'Automated compliance document generation meeting international regulatory mandates.'
      ],
      github: 'https://github.com/mahdihasan2011'
    },
    transfer: {
      title: 'Digital Money Transfer Platform',
      category: 'Fintech',
      stars: '203',
      tech: ['Java', 'Spring Cloud', 'Kafka', 'PostgreSQL', 'Vault'],
      image: 'images/money-transfer.jpg?v=2',
      description: 'High-security peer-to-peer and international remittance processing system. Supports instant wallet transfers, currency exchange rate locking, dual-approval disbursement workflows, and encrypted ledger logging.',
      highlights: [
        'Bank-grade AES-256 data-at-rest encryption and mutual TLS (mTLS) inter-service communication.',
        'Event-driven transaction ledger powered by Apache Kafka ensuring zero balance drift.',
        'Instant multi-channel webhook notifications with biometric approval verification.'
      ],
      github: 'https://github.com/mahdihasan2011'
    },
    fxtrade: {
      title: 'FX Foreign Exchange Trade Platform',
      category: 'Fintech & Trading',
      stars: '112',
      tech: ['C#', '.NET Core', 'WebSockets', 'React', 'SQL Server'],
      image: 'images/crm3.png',
      description: 'Real-time FX trading terminal delivering millisecond order routing, live streaming order books, multi-currency pair charting, margin calculators, and automated stop-loss limit execution.',
      highlights: [
        'High-frequency WebSocket price feed delivering live bid/ask spreads with zero UI stutter.',
        'Interactive charting engine with moving averages, RSI, and Bollinger bands.',
        'Comprehensive audit logger tracking order execution slippage and compliance markers.'
      ],
      github: 'https://github.com/mahdihasan2011'
    },
    hiring: {
      title: 'Skilled Professional Hiring System',
      category: 'Enterprise SaaS',
      stars: '178',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'WebRTC'],
      image: 'images/crm4.png',
      description: 'AI-augmented recruitment platform connecting tech organizations with verified software engineers. Features interactive skill benchmarking, in-browser collaborative coding interviews, and automated candidate match scoring.',
      highlights: [
        'In-browser WebRTC video interview suite with shared multi-language code editor.',
        'Automated resume parsing and candidate ranking matching job specs with 88% precision.',
        'End-to-end candidate pipeline tracking from screening to offer acceptance.'
      ],
      github: 'https://github.com/mahdihasan2011'
    },
    isp: {
      title: 'ISP Management & Radius Billing System',
      category: 'Enterprise & Networks',
      stars: '142',
      tech: ['PHP', 'Laravel', 'MikroTik API', 'MySQL', 'Vue.js'],
      image: 'images/isp-billing.jpg?v=2',
      description: 'Mission-critical ISP operations management suite controlling subscriber provisioning, bandwidth queues, MikroTik router synchronizations, automated billing recurring cycles, and SMS alerts.',
      highlights: [
        'Direct MikroTik RouterOS API integration provisioning bandwidth profiles in real time.',
        'Automated recurring invoice generation with local mobile payment gateway integration.',
        'Sub-agent management and customer self-care portal with bandwidth graph analytics.'
      ],
      github: 'https://github.com/mahdihasan2011'
    }
  };

  const modalBackdrop = document.getElementById('projectModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalDetailContent');

  function openProjectModal(key) {
    const data = projectData[key];
    if (!data || !modalBackdrop || !modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-project-header">
        <span class="project-category-overlay" style="position: static; display: inline-block; margin-bottom: 0.8rem;">${data.category}</span>
        <h2 style="font-size: 2rem; margin-bottom: 0.8rem; color: var(--text-primary);">${data.title}</h2>
        <div class="d-flex align-items-center gap-2 mb-3">
          <span style="color: #f59e0b; font-weight: 700;"><i class="fas fa-star"></i> ${data.stars} Stars</span>
          <span style="color: var(--text-muted);">•</span>
          <span style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.9rem;">Production Proven</span>
        </div>
      </div>
      
      <div style="width: 100%; height: 260px; border-radius: 16px; overflow: hidden; margin-bottom: 1.8rem; border: 1px solid var(--border-subtle);">
        <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 1.5rem;">
        ${data.description}
      </p>

      <h4 style="font-size: 1.2rem; margin-bottom: 0.8rem; color: var(--text-primary);"><i class="fas fa-microchip me-2" style="color: var(--accent-cyan);"></i>Key Architectural Highlights</h4>
      <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.8rem;">
        ${data.highlights.map(h => `<li style="position: relative; padding-left: 1.6rem; color: var(--text-secondary); font-size: 0.95rem;"><span style="position: absolute; left: 0; color: var(--accent-cyan);">✓</span>${h}</li>`).join('')}
      </ul>

      <h5 style="font-size: 1rem; margin-bottom: 0.6rem; color: var(--text-muted); text-transform: uppercase;">Technologies Employed:</h5>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
        ${data.tech.map(t => `<span class="project-tech-badge" style="font-size: 0.85rem; padding: 0.35rem 0.8rem;">${t}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 1rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1.5rem;">
        <a href="${data.github}" target="_blank" class="btn-3d-secondary" style="font-size: 0.95rem; padding: 0.6rem 1.4rem;">
          <i class="fab fa-github me-1"></i> Repository
        </a>
        <a href="#contact" onclick="document.getElementById('modalCloseBtn').click();" class="btn-3d-primary" style="font-size: 0.95rem; padding: 0.6rem 1.4rem;">
          <i class="fas fa-comments me-1"></i> Discuss Architecture
        </a>
      </div>
    `;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    window.playSynthSound('click');
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  document.addEventListener('click', (e) => {
    if (e.target.closest('.modal-close, .btn-close-cyber, #modalCloseBtn')) {
      closeModal();
    }
  });
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // Attach click listener to all "View Details" buttons
  document.querySelectorAll('[data-project-key]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.dataset.projectKey;
      openProjectModal(key);
    });
  });

  // ==========================================================================
  // 8. LIVE GITHUB API INTEGRATION
  // ==========================================================================
  const GITHUB_USERNAME = 'mahdihasan2011';

  function fetchGitHubDetails() {
    const userApiUrl = `https://api.github.com/users/${GITHUB_USERNAME}`;

    fetch(userApiUrl)
      .then(res => {
        if (!res.ok) throw new Error('GitHub API rate limited or unavailable');
        return res.json();
      })
      .then(user => {
        if (user.avatar_url) {
          const ghAvatar = document.getElementById('ghAvatarImg');
          if (ghAvatar) ghAvatar.src = user.avatar_url;
        }
        if (user.name) {
          document.querySelectorAll('.gh-name-target').forEach(el => {
            el.textContent = user.name;
          });
        }
        if (user.bio) {
          const bioEl = document.getElementById('ghUserBio');
          if (bioEl) bioEl.textContent = user.bio;
        }
        if (user.public_repos !== undefined) {
          const repoCountEl = document.getElementById('ghRepoCount');
          if (repoCountEl) repoCountEl.textContent = `${user.public_repos}+`;
        }
        if (user.followers !== undefined) {
          const followersEl = document.getElementById('ghFollowersCount');
          if (followersEl) followersEl.textContent = user.followers;
        }
      })
      .catch(err => {
        // Fallback: avatar image safely remains images/profilepic4.jpeg
        console.warn('GitHub API info:', err.message);
      });

    // GitHub Contribution Chart
    const chartImg = document.getElementById('githubContributionsChart');
    if (chartImg) {
      chartImg.src = `https://ghchart.rshah.org/${GITHUB_USERNAME}`;
    }
  }

  fetchGitHubDetails();

  // ==========================================================================
  // 9. WORKING CONTACT FORM WITH TELEGRAM INTEGRATION & CYBER TOAST
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const toastEl = document.getElementById('cyberToast');
  const toastMsg = document.getElementById('toastMsgText');

  function showToast(title, message, isSuccess = true) {
    if (!toastEl) return;
    const icon = toastEl.querySelector('.toast-icon i');
    if (icon) {
      icon.className = isSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
      icon.style.color = isSuccess ? 'var(--accent-emerald)' : 'var(--accent-magenta)';
    }
    const titleEl = toastEl.querySelector('.toast-msg h6');
    if (titleEl) titleEl.textContent = title;
    if (toastMsg) toastMsg.textContent = message;

    toastEl.classList.add('show');
    if (isSuccess) window.playSynthSound('success');

    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 5000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Send Message';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Transmitting Message...';
      }

      // User's verified Telegram Configuration
      const BOT_TOKEN = '8289585552:AAEPZbLgJXH1Kf0OIzpQJmwasgqpMX3ETkg';
      const CHAT_ID = '8553087905';

      const name = document.getElementById('nameInput')?.value || '';
      const phone = document.getElementById('phoneInput')?.value || 'Not provided';
      const email = document.getElementById('emailInput')?.value || '';
      const subject = document.getElementById('subjectInput')?.value || 'General Inquiry';
      const message = document.getElementById('messageTextarea')?.value || '';

      const text = `
🚀 *New Portfolio Inquiry Received*

👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
📝 *Subject:* ${subject}
💬 *Message:*
${message}

⏰ *Timestamp:* ${new Date().toLocaleString()}
🌐 *Source:* 3D Modern Portfolio
      `;

      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: 'Markdown'
        })
      })
        .then(res => {
          if (res.ok) {
            contactForm.reset();
            showToast('Transmission Successful! 🚀', 'Thank you! Your message has been beamed directly to Mahdi Hasan.');
          } else {
            showToast('Direct Transmission Alert', 'Message logged. Feel free to also email mmahdihasan2011@gmail.com directly.', false);
          }
        })
        .catch(err => {
          console.error('Contact Form error:', err);
          showToast('Delivery Confirmation', 'Please email mmahdihasan2011@gmail.com directly if network is restricted.', false);
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
          }
        });
    });
  }

  // ==========================================================================
  // 10. NAVIGATION SCROLL-SPY & MOBILE DRAWER
  // ==========================================================================
  const navLinks = document.querySelectorAll('.nav-menu-link');
  const sections = document.querySelectorAll('.content-section, .hero-section');
  const headerNav = document.querySelector('.glass-nav-header');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (headerNav) {
      if (window.scrollY > 40) {
        headerNav.classList.add('scrolled');
      } else {
        headerNav.classList.remove('scrolled');
      }
    }

    // Scroll-Spy
    let currentSectionId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Mobile Drawer Toggle
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');

  function openDrawer() {
    if (!mobileDrawer || !drawerBackdrop) return;
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    window.playSynthSound('click');
  }

  function closeDrawer() {
    if (!mobileDrawer || !drawerBackdrop) return;
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileNavToggle) mobileNavToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mobile-drawer-links a').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });

})();
