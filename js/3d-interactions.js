/**
 * MAHDI HASAN | 3D MODERN PORTFOLIO INTERACTIONS ENGINE
 * Card Tilts, Web Audio Synthesizer, 3D Cursor, Interactive 3D Model Inspector & Cyber CLI
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. WEB AUDIO SYNTHESIZER & EQUALIZER VISUALIZER
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

    // Animate HUD equalizer waves
    const eq = document.getElementById('hudAudioVisualizer');
    if (eq) {
      eq.classList.add('playing');
      setTimeout(() => eq.classList.remove('playing'), 350);
    }

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
      } else if (type === 'warp') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.35);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'key') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(800 + Math.random() * 200, now);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      } else if (type === 'hologram') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.25);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
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

  // Sound Toggle Button & Mobile Drawer Audio Sync
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const mobileDrawerAudioBtn = document.getElementById('mobileDrawerAudioBtn');
  const mobileDrawerAudioIcon = document.getElementById('mobileDrawerAudioIcon');
  const mobileDrawerAudioLabel = document.getElementById('mobileDrawerAudioLabel');

  function updateAudioButtonUI() {
    if (audioToggleBtn) {
      const icon = audioToggleBtn.querySelector('i');
      if (isAudioEnabled) {
        if (icon) icon.className = 'fas fa-volume-up';
        audioToggleBtn.classList.add('active');
        audioToggleBtn.title = 'Sound Effects: Enabled';
      } else {
        if (icon) icon.className = 'fas fa-volume-mute';
        audioToggleBtn.classList.remove('active');
        audioToggleBtn.title = 'Sound Effects: Muted';
      }
    }
    if (mobileDrawerAudioIcon && mobileDrawerAudioLabel) {
      if (isAudioEnabled) {
        mobileDrawerAudioIcon.className = 'fas fa-volume-up';
        mobileDrawerAudioLabel.textContent = 'Audio: Active';
      } else {
        mobileDrawerAudioIcon.className = 'fas fa-volume-mute';
        mobileDrawerAudioLabel.textContent = 'Audio: Muted';
      }
    }
  }

  function toggleAudio() {
    isAudioEnabled = !isAudioEnabled;
    localStorage.setItem('audio_enabled', isAudioEnabled ? 'true' : 'false');
    updateAudioButtonUI();
    if (isAudioEnabled) {
      initAudioContext();
      window.playSynthSound('success');
    }
  }

  if (audioToggleBtn) audioToggleBtn.addEventListener('click', toggleAudio);
  if (mobileDrawerAudioBtn) mobileDrawerAudioBtn.addEventListener('click', toggleAudio);
  updateAudioButtonUI();

  // ==========================================================================
  // 2. THEME SWITCHER (DARK CYBER vs TITANIUM CLEAN)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  let currentTheme = localStorage.getItem('site_theme') || 'dark';

  function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('site_theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-mode');
      if (themeToggleBtn) themeToggleBtn.querySelector('i').className = 'fas fa-moon';
      if (mobileThemeToggleBtn) mobileThemeToggleBtn.querySelector('i').className = 'fas fa-moon me-1';
    } else {
      document.body.classList.remove('light-mode');
      if (themeToggleBtn) themeToggleBtn.querySelector('i').className = 'fas fa-sun';
      if (mobileThemeToggleBtn) mobileThemeToggleBtn.querySelector('i').className = 'fas fa-sun me-1';
    }

    if (typeof window.update3DTheme === 'function') {
      window.update3DTheme(theme === 'light');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
      window.playSynthSound('click');
    });
  }
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', () => {
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
      window.playSynthSound('click');
    });
  }
  applyTheme(currentTheme);

  // ==========================================================================
  // 3. 3D GYROSCOPIC CARD TILT & HOLOGRAPHIC GLARE ENGINE
  // ==========================================================================
  const tiltCards = document.querySelectorAll('.tilt-card, .project-card-3d, .stat-card-3d, .about-fact-card, .feature-box-3d');
  const maxTilt = 10;

  tiltCards.forEach(card => {
    let bounds;

    function onMouseEnter(e) {
      bounds = card.getBoundingClientRect();
      window.playSynthSound('hover');
    }

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      const xPct = mouseX / bounds.width - 0.5;
      const yPct = mouseY / bounds.height - 0.5;

      const rotX = -yPct * maxTilt;
      const rotY = xPct * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.setProperty('--mouse-x', `${mouseX}px`);
      card.style.setProperty('--mouse-y', `${mouseY}px`);
    }

    function onMouseLeave() {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      bounds = null;
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });

  // ==========================================================================
  // 4. CUSTOM 3D CURSOR ENGINE
  // ==========================================================================
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorFollower = document.querySelector('.custom-cursor-follower');

  if (cursorDot && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
    let mousePos = { x: -100, y: -100 };
    let followerPos = { x: -100, y: -100 };

    window.addEventListener('mousemove', (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      cursorDot.style.transform = `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`;
    });

    function loopFollower() {
      followerPos.x += (mousePos.x - followerPos.x) * 0.15;
      followerPos.y += (mousePos.y - followerPos.y) * 0.15;
      cursorFollower.style.transform = `translate3d(${followerPos.x}px, ${followerPos.y}px, 0)`;
      requestAnimationFrame(loopFollower);
    }
    loopFollower();

    const interactables = document.querySelectorAll('a, button, input, textarea, .tilt-card, .term-chip, .hud-mode-btn');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => cursorFollower.classList.add('active'));
      el.addEventListener('mouseleave', () => cursorFollower.classList.remove('active'));
    });
  }

  // ==========================================================================
  // 5. ROLE TYPING ANIMATION (HERO SECTION)
  // ==========================================================================
  const typingTarget = document.getElementById('heroRoleTyping');
  const roles = [
    'Senior Full-Stack Developer',
    'Laravel & Cloud Architect',
    'Vue.js & React Specialist',
    'High-Throughput API Engineer',
    'Distributed Systems Craftsman'
  ];

  if (typingTarget) {
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        typingTarget.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typingTarget.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIdx === currentRole.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        speed = 400;
      }

      setTimeout(typeLoop, speed);
    }
    typeLoop();
  }

  // ==========================================================================
  // 6. PROJECT DATA REPOSITORY
  // ==========================================================================
  const projectData = {
    pos: {
      title: 'Enterprise Retail POS & Inventory Platform',
      category: 'Enterprise & POS',
      stars: '128',
      archetype: 'pos',
      tech: ['Java', 'Spring Boot', 'MySQL', 'Hardware SDK', 'Stripe', 'Docker'],
      image: 'images/pos.jpg',
      description: 'Enterprise point of sale architecture serving supermarket and multi-branch retail chains. Handles hardware barcode scanner peripherals, receipt printers, customer-facing touchscreens, automated inventory sync, and multi-currency registers.',
      highlights: [
        'Hardware peripheral abstraction layer integrating barcode scanners, scale sensors, and cash drawers.',
        'Offline-first synchronization reconciling transactional ledgers automatically upon reconnect.',
        'High-speed batch inventory updates processing 10,000+ SKU movements per second.'
      ],
      github: 'https://github.com/mahdihasan2011'
    },
    ecommerce: {
      title: 'Enterprise E-Commerce Platform',
      category: 'E-Commerce',
      stars: '245',
      archetype: 'ecommerce',
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
      archetype: 'complaint',
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
      archetype: 'risk',
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
      archetype: 'transfer',
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
      archetype: 'fxtrade',
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
      archetype: 'hiring',
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
      archetype: 'isp',
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

  // ==========================================================================
  // 7. INTERACTIVE 3D PROJECT INSPECTOR ENGINE (MODAL VIEWER)
  // ==========================================================================
  let modalRenderer = null;
  let modalScene = null;
  let modalCamera = null;
  let modalControls = null;
  let modalAnimFrame = null;

  function buildProject3DModel(archetype) {
    const group = new THREE.Group();

    if (archetype === 'pos' || archetype === 'ecommerce') {
      // 3D POS Terminal & Floating Commerce Grid
      const baseGeo = new THREE.BoxGeometry(10, 2, 8);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
      const base = new THREE.Mesh(baseGeo, baseMat);
      group.add(base);

      const screenGeo = new THREE.BoxGeometry(9, 6, 0.5);
      const screenMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 0.4 });
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.set(0, 4, -1);
      screen.rotation.x = -0.2;
      group.add(screen);

      // Rotating Golden Coin/Chip
      const coinGeo = new THREE.CylinderGeometry(2, 2, 0.4, 32);
      const coinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.1 });
      const coin = new THREE.Mesh(coinGeo, coinMat);
      coin.position.set(0, 9, 0);
      group.add(coin);
      group.userData.anim = (t) => {
        coin.rotation.y = t * 2;
        coin.position.y = 9 + Math.sin(t * 3) * 0.5;
        group.rotation.y = t * 0.4;
      };
    } else if (archetype === 'transfer' || archetype === 'risk') {
      // 3D Cryptographic Vault & Laser Anomaly Rings
      const vaultGeo = new THREE.CylinderGeometry(6, 6, 4, 32);
      const vaultMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.95, roughness: 0.1 });
      const vault = new THREE.Mesh(vaultGeo, vaultMat);
      group.add(vault);

      const ring1Geo = new THREE.TorusGeometry(8, 0.3, 16, 64);
      const ring1Mat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 0.5 });
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      group.add(ring1);

      const ring2Geo = new THREE.TorusGeometry(10, 0.3, 16, 64);
      const ring2Mat = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.5 });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.x = Math.PI / 2;
      group.add(ring2);

      group.userData.anim = (t) => {
        ring1.rotation.z = t * 1.5;
        ring2.rotation.y = t * 1.2;
        group.rotation.y = t * 0.3;
      };
    } else if (archetype === 'fxtrade') {
      // 3D Candlestick & Trading Terminal Cylinder
      for (let i = -3; i <= 3; i++) {
        const isUp = i % 2 === 0;
        const barHeight = 4 + Math.abs(i) * 2;
        const barGeo = new THREE.BoxGeometry(1.2, barHeight, 1.2);
        const barMat = new THREE.MeshStandardMaterial({
          color: isUp ? 0x10b981 : 0xef4444,
          emissive: isUp ? 0x10b981 : 0xef4444,
          emissiveIntensity: 0.5
        });
        const bar = new THREE.Mesh(barGeo, barMat);
        bar.position.set(i * 2.2, barHeight / 2 - 2, 0);
        group.add(bar);
      }
      group.userData.anim = (t) => {
        group.rotation.y = t * 0.5;
      };
    } else if (archetype === 'isp') {
      // 3D High-Density 19" Server Rack & Blinking LEDs
      const rackGeo = new THREE.BoxGeometry(8, 14, 8);
      const rackMat = new THREE.MeshStandardMaterial({ color: 0x0b1120, metalness: 0.8, roughness: 0.2 });
      const rack = new THREE.Mesh(rackGeo, rackMat);
      group.add(rack);

      for (let y = -5; y <= 5; y += 2.2) {
        const slotGeo = new THREE.BoxGeometry(7.2, 1.5, 0.4);
        const slotMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.3 });
        const slot = new THREE.Mesh(slotGeo, slotMat);
        slot.position.set(0, y, 4.1);
        group.add(slot);

        // Green/cyan status led
        const ledGeo = new THREE.SphereGeometry(0.3, 16, 16);
        const ledMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 0.9 });
        const led = new THREE.Mesh(ledGeo, ledMat);
        led.position.set(-2.8, y, 4.4);
        group.add(led);
      }
      group.userData.anim = (t) => {
        group.rotation.y = t * 0.4;
      };
    } else {
      // Default: 3D Quantum Spec Star
      const starGeo = new THREE.OctahedronGeometry(6, 1);
      const starMat = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.6
      });
      const star = new THREE.Mesh(starGeo, starMat);
      group.add(star);
      group.userData.anim = (t) => {
        star.rotation.x = t * 0.5;
        star.rotation.y = t * 0.7;
      };
    }

    return group;
  }

  function initModal3DScene(archetype) {
    const modalCanvas = document.getElementById('modal3dCanvas');
    if (!modalCanvas || typeof THREE === 'undefined') return;

    if (modalAnimFrame) cancelAnimationFrame(modalAnimFrame);

    const w = modalCanvas.parentElement.clientWidth || 600;
    const h = modalCanvas.parentElement.clientHeight || 290;

    modalScene = new THREE.Scene();
    modalCamera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    modalCamera.position.set(0, 6, 22);

    modalRenderer = new THREE.WebGLRenderer({
      canvas: modalCanvas,
      alpha: true,
      antialias: true
    });
    modalRenderer.setSize(w, h);
    modalRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    modalScene.add(amb);
    const pLight = new THREE.PointLight(0x00f0ff, 2.5, 50);
    pLight.position.set(10, 15, 15);
    modalScene.add(pLight);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(30, 20, 0x00f0ff, 0x1e293b);
    gridHelper.position.y = -6;
    modalScene.add(gridHelper);

    // Specialized Project Artifact
    const model = buildProject3DModel(archetype);
    modalScene.add(model);

    // OrbitControls if available
    if (typeof THREE.OrbitControls !== 'undefined') {
      modalControls = new THREE.OrbitControls(modalCamera, modalCanvas);
      modalControls.enableDamping = true;
      modalControls.dampingFactor = 0.05;
      modalControls.autoRotate = false;
    }

    let clock = new THREE.Clock();

    function renderModal() {
      modalAnimFrame = requestAnimationFrame(renderModal);
      const t = clock.getElapsedTime();
      if (model.userData.anim) model.userData.anim(t);
      if (modalControls) modalControls.update();
      modalRenderer.render(modalScene, modalCamera);
    }
    renderModal();
  }

  function cleanupModal3D() {
    if (modalAnimFrame) cancelAnimationFrame(modalAnimFrame);
    if (modalControls) modalControls.dispose();
    if (modalRenderer) modalRenderer.dispose();
    modalControls = null;
    modalRenderer = null;
    modalScene = null;
    modalCamera = null;
  }

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

      <!-- Segmented View Tabs (3D Hologram vs UI Screenshot) -->
      <div class="modal-3d-inspector-tabs">
        <button class="modal-tab-btn active" id="modalTab3dBtn"><i class="fas fa-cube"></i> Interactive 3D Model</button>
        <button class="modal-tab-btn" id="modalTabImgBtn"><i class="fas fa-image"></i> Interface Screenshot</button>
      </div>

      <!-- Interactive 3D Viewport Box -->
      <div class="modal-3d-viewport-box" id="modal3dViewport">
        <canvas id="modal3dCanvas"></canvas>
        <div class="modal-3d-badge-status">
          <span>LIVE ARCHITECTURAL TWIN</span>
        </div>
        <div class="modal-3d-hint-pill">
          <i class="fas fa-hand-pointer"></i> Drag to inspect in 360° • Scroll to zoom
        </div>
      </div>

      <!-- Static Screenshot Fallback Viewport -->
      <div id="modalImgViewport" style="display: none; width: 100%; height: 290px; border-radius: 16px; overflow: hidden; margin-bottom: 1.8rem; border: 1px solid var(--border-subtle);">
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
    window.playSynthSound('hologram');

    // Mount 3D Scene
    setTimeout(() => {
      initModal3DScene(data.archetype || 'star');
    }, 50);

    // Tab switcher wiring
    const tab3dBtn = document.getElementById('modalTab3dBtn');
    const tabImgBtn = document.getElementById('modalTabImgBtn');
    const v3d = document.getElementById('modal3dViewport');
    const vImg = document.getElementById('modalImgViewport');

    if (tab3dBtn && tabImgBtn && v3d && vImg) {
      tab3dBtn.addEventListener('click', () => {
        tab3dBtn.classList.add('active');
        tabImgBtn.classList.remove('active');
        v3d.style.display = 'block';
        vImg.style.display = 'none';
        window.playSynthSound('click');
      });
      tabImgBtn.addEventListener('click', () => {
        tabImgBtn.classList.add('active');
        tab3dBtn.classList.remove('active');
        v3d.style.display = 'none';
        vImg.style.display = 'block';
        window.playSynthSound('click');
      });
    }
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    cleanupModal3D();
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
  const detailButtons = document.querySelectorAll('.btn-project-details');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project-key');
      if (key) openProjectModal(key);
    });
  });

  // ==========================================================================
  // 8. CYBER CLI TERMINAL ENGINE (HOTKEY '~' OR BUTTON TRIGGER)
  // ==========================================================================
  const terminalBackdrop = document.getElementById('terminalModalBackdrop');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalCloseBtn = document.getElementById('terminalCloseBtn');
  const terminalCloseDot = document.getElementById('terminalCloseDot');
  const terminalToggleBtn = document.getElementById('terminalToggleBtn');
  const hudOpenTerminalBtn = document.getElementById('hudOpenTerminalBtn');

  let commandHistory = [];
  let historyIndex = -1;

  function openTerminal() {
    if (!terminalBackdrop) return;
    terminalBackdrop.classList.add('active');
    window.playSynthSound('warp');
    if (terminalInput) {
      setTimeout(() => terminalInput.focus(), 150);
    }
  }

  function closeTerminal() {
    if (!terminalBackdrop) return;
    terminalBackdrop.classList.remove('active');
    window.playSynthSound('click');
  }

  const mobileDrawerCliBtn = document.getElementById('mobileDrawerCliBtn');
  if (terminalToggleBtn) terminalToggleBtn.addEventListener('click', openTerminal);
  if (hudOpenTerminalBtn) hudOpenTerminalBtn.addEventListener('click', openTerminal);
  if (mobileDrawerCliBtn) {
    mobileDrawerCliBtn.addEventListener('click', () => {
      if (typeof closeDrawer === 'function') closeDrawer();
      openTerminal();
    });
  }
  if (terminalCloseBtn) terminalCloseBtn.addEventListener('click', closeTerminal);
  if (terminalCloseDot) terminalCloseDot.addEventListener('click', closeTerminal);

  if (terminalBackdrop) {
    terminalBackdrop.addEventListener('click', (e) => {
      if (e.target === terminalBackdrop) closeTerminal();
    });
  }

  // Hotkey ~ / ` (Backquote) listener
  document.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
      if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        if (terminalBackdrop && terminalBackdrop.classList.contains('active')) {
          closeTerminal();
        } else {
          openTerminal();
        }
      }
    } else if (e.key === 'Escape' && terminalBackdrop && terminalBackdrop.classList.contains('active')) {
      closeTerminal();
    }
  });

  function appendTerminalOutput(cmd, response) {
    if (!terminalOutput) return;

    const entry = document.createElement('div');
    entry.className = 'term-history-entry';
    entry.innerHTML = `
      <div class="term-history-cmd">guest@mahdi-system:~$ ${cmd}</div>
      <div class="term-history-result">${response}</div>
    `;
    terminalOutput.appendChild(entry);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function executeTerminalCommand(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    let output = '';

    switch (cmd) {
      case 'help':
        output = `AVAILABLE SYSTEM COMMANDS:
  about           - Engineering background, philosophy & bio
  skills          - Full-stack technical stack & tools
  projects        - List of 8 flagship production platforms
  stats           - Engineering telemetry, metrics & GitHub stats
  camera <mode>   - Change 3D camera vantage point (cinematic | matrix | quantum | warp)
  matrix          - Trigger light-speed warp particle acceleration
  sound <on/off>  - Control Web Audio spatial synthesizer
  theme <dark/light> - Toggle Dark Cyber or Titanium Clean theme
  contact         - Transmission terminals (Email, LinkedIn, GitHub)
  clear           - Clear terminal buffer`;
        break;

      case 'about':
        output = `MAHDI HASAN | Senior Full-Stack Software Engineer
8+ years crafting mission-critical distributed architectures, reactive web applications,
and fault-tolerant systems in Laravel, PHP, React, Vue.js, and cloud backends.`;
        break;

      case 'skills':
        output = `CORE COMPETENCY MATRIX:
├── BACKEND: Laravel 11, PHP 8.3, Spring Boot, Python FastAPI, REST/GraphQL
├── FRONTEND: React 19, Vue.js 3, Next.js, TypeScript, TailwindCSS, Three.js WebGL
├── DATA & CACHE: PostgreSQL, MySQL, Redis, Kafka, MongoDB
└── INFRA & DEVOPS: Docker, Linux, CI/CD pipelines, MikroTik RouterOS API`;
        break;

      case 'projects':
        output = `FLAGSHIP ARCHITECTURAL CASE STUDIES:
[1] Retail POS System - Enterprise Hardware Point of Sale & Barcode Sync
[2] Enterprise E-Commerce - Scalable Marketplace with Redis Caching
[3] Complaint & SLA Management - Grievance Triage with Sentiment Scoring
[4] AI Risk Engine - High-Throughput Transaction Risk Evaluation
[5] Digital Money Transfer - Instant Remittance & Encrypted Vault Ledgers
[6] FX Trade Platform - High-Frequency WebSocket Trading Terminal
[7] Skilled Professional Hiring - In-Browser Collaborative WebRTC Suite
[8] ISP & Radius Billing - MikroTik API Automated Provisioning Engine`;
        break;

      case 'stats':
        output = `SYSTEM TELEMETRY:
├── Years of Experience: 8+
├── Production Projects Delivered: 50+
├── System Uptime SLA: 99.9%
├── Active Subscribers Powered: 50,000+
├── GitHub: @mahdihasan2011 (Verified Developer)
└── WebGL Runtime: Three.js r128 (60 FPS High-Performance)`;
        break;

      case 'camera':
        if (['cinematic', 'matrix', 'quantum', 'warp'].includes(arg)) {
          if (typeof window.set3DCameraMode === 'function') {
            window.set3DCameraMode(arg);
            output = `Camera vantage point successfully shifted to: [${arg.toUpperCase()}].`;
          }
        } else {
          output = `Usage: camera <cinematic | matrix | quantum | warp>`;
        }
        break;

      case 'matrix':
        if (typeof window.set3DCameraMode === 'function') {
          window.set3DCameraMode('warp');
          output = `WARP PROTOCOL ENGAGED: Particle velocities multiplied by 6x.`;
        }
        break;

      case 'sound':
        if (arg === 'on') {
          isAudioEnabled = true;
          localStorage.setItem('audio_enabled', 'true');
          updateAudioButtonUI();
          output = `Web Audio Synthesizer: [ENABLED].`;
        } else if (arg === 'off') {
          isAudioEnabled = false;
          localStorage.setItem('audio_enabled', 'false');
          updateAudioButtonUI();
          output = `Web Audio Synthesizer: [MUTED].`;
        } else {
          isAudioEnabled = !isAudioEnabled;
          localStorage.setItem('audio_enabled', isAudioEnabled ? 'true' : 'false');
          updateAudioButtonUI();
          output = `Web Audio Synthesizer toggled: [${isAudioEnabled ? 'ENABLED' : 'MUTED'}].`;
        }
        break;

      case 'theme':
        const nextTheme = arg === 'light' || arg === 'dark' ? arg : (currentTheme === 'dark' ? 'light' : 'dark');
        applyTheme(nextTheme);
        output = `Theme switched to: [${nextTheme.toUpperCase()}].`;
        break;

      case 'contact':
        output = `TRANSMISSION TERMINALS:
├── Email: mmahdihasan2011@gmail.com
├── LinkedIn: https://bd.linkedin.com/in/mahdihasan2011
├── GitHub: https://github.com/mahdihasan2011
└── Status: Open for Senior Full-Stack & Architecture Roles.`;
        break;

      case 'clear':
        if (terminalOutput) {
          terminalOutput.innerHTML = '';
        }
        return;

      default:
        output = `Command not recognized: '${trimmed}'. Type 'help' for available system commands.`;
    }

    appendTerminalOutput(trimmed, output);
    window.playSynthSound('key');
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      window.playSynthSound('key');

      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        executeTerminalCommand(val);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0 && historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          terminalInput.value = '';
        }
      }
    });
  }

  // Quick suggestion chips inside terminal
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.term-chip');
    if (chip) {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeTerminalCommand(cmd);
        if (terminalInput) terminalInput.focus();
      }
    }
  });

  // ==========================================================================
  // 9. CONTACT FORM INTERACTION
  // ==========================================================================
  const contactForm = document.getElementById('cyberContactForm');
  const toast = document.getElementById('cyberToast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Encrypting & Transmitting...';
      window.playSynthSound('click');

      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            contactForm.reset();
            window.playSynthSound('success');
            if (toast) {
              toast.classList.add('active');
              setTimeout(() => toast.classList.remove('active'), 5000);
            }
          } else {
            alert('Transmission error. Please email directly at mmahdihasan2011@gmail.com');
          }
        })
        .catch(() => {
          contactForm.reset();
          window.playSynthSound('success');
          if (toast) {
            toast.classList.add('active');
            setTimeout(() => toast.classList.remove('active'), 5000);
          }
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
  // 10. MAGNETIC FLOATING NAV INDICATOR & SCROLL-SPY
  // ==========================================================================
  const navMenuLinks = document.getElementById('navMenuLinks');
  const navIndicatorPill = document.getElementById('navIndicatorPill');
  const navLinks = document.querySelectorAll('.nav-menu-link');
  const sections = document.querySelectorAll('.content-section, .hero-section');
  const headerNav = document.querySelector('.glass-nav-header');

  function updateNavIndicator(targetLink) {
    if (!navIndicatorPill || !targetLink || !navMenuLinks) return;
    const parentRect = navMenuLinks.getBoundingClientRect();
    const targetRect = targetLink.getBoundingClientRect();

    navIndicatorPill.style.width = `${targetRect.width}px`;
    navIndicatorPill.style.left = `${targetRect.left - parentRect.left}px`;
    navIndicatorPill.classList.add('active');
  }

  const initialActiveLink = document.querySelector('.nav-menu-link.active');
  if (initialActiveLink) {
    setTimeout(() => updateNavIndicator(initialActiveLink), 150);
  }

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => updateNavIndicator(link));
  });

  if (navMenuLinks) {
    navMenuLinks.addEventListener('mouseleave', () => {
      const activeLink = document.querySelector('.nav-menu-link.active');
      if (activeLink) updateNavIndicator(activeLink);
      else if (navIndicatorPill) navIndicatorPill.classList.remove('active');
    });
  }

  window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.nav-menu-link.active');
    if (activeLink) updateNavIndicator(activeLink);
  });

  const headerScrollProgressFill = document.getElementById('headerScrollProgressFill');

  window.addEventListener('scroll', () => {
    // Header shadow & shrink on scroll
    if (headerNav) {
      if (window.scrollY > 30) {
        headerNav.classList.add('scrolled');
      } else {
        headerNav.classList.remove('scrolled');
      }
    }

    // Dynamic Header Scroll Reading Progress Bar Fill
    if (headerScrollProgressFill) {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
      headerScrollProgressFill.style.width = `${Math.min(Math.max(scrollPct, 0), 100)}%`;
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
        updateNavIndicator(link);
      }
    });
  }, { passive: true });

  // Mobile Drawer Toggle with 3D Morph Hamburger
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');

  function openDrawer() {
    if (!mobileDrawer || !drawerBackdrop) return;
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    if (mobileNavToggle) mobileNavToggle.classList.add('open');
    document.body.style.overflow = 'hidden';
    window.playSynthSound('click');
  }

  function closeDrawer() {
    if (!mobileDrawer || !drawerBackdrop) return;
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    if (mobileNavToggle) mobileNavToggle.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileNavToggle) mobileNavToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mobile-drawer-links a').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1040) {
      closeDrawer();
    }
  });

  // Mobile HUD Telemetry Collapse / Expand Handler
  const hud3dTelemetry = document.getElementById('hud3dTelemetry');
  const hudHeaderTrigger = document.getElementById('hudHeaderTrigger');
  const hudChevronIcon = document.getElementById('hudChevronIcon');

  if (hud3dTelemetry && hudHeaderTrigger) {
    function toggleHudMobile() {
      if (window.innerWidth <= 768) {
        hud3dTelemetry.classList.toggle('expanded');
        const isExp = hud3dTelemetry.classList.contains('expanded');
        if (hudChevronIcon) {
          hudChevronIcon.className = isExp ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        }
        window.playSynthSound('click');
      }
    }

    hudHeaderTrigger.addEventListener('click', toggleHudMobile);

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && hud3dTelemetry.classList.contains('expanded')) {
        if (!hud3dTelemetry.contains(e.target)) {
          hud3dTelemetry.classList.remove('expanded');
          if (hudChevronIcon) hudChevronIcon.className = 'fas fa-chevron-up';
        }
      }
    });
  }

  // Ensure drawer is closed on load
  closeDrawer();

})();
