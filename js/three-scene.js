/**
 * MAHDI HASAN | 3D WEBGL UNIVERSE & CAMERA CHOREOGRAPHER
 * Advanced Three.js Spatial Engine with Dynamic Point Lighting,
 * Real-Time Telemetry HUD, Shockwave Physics & Multi-Camera Modes
 */

(function () {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // --- SCENE SETUP ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(0, 0, 120);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // --- LIGHTING ---
  const ambientLight = new THREE.AmbientLight(0x0c162d, 1.6);
  scene.add(ambientLight);

  const cyanPoint = new THREE.PointLight(0x00f0ff, 3.5, 450);
  cyanPoint.position.set(80, 100, 100);
  scene.add(cyanPoint);

  const purplePoint = new THREE.PointLight(0x8b5cf6, 3.0, 450);
  purplePoint.position.set(-100, -80, 50);
  scene.add(purplePoint);

  const magentaPoint = new THREE.PointLight(0xec4899, 2.2, 350);
  magentaPoint.position.set(0, -120, -50);
  scene.add(magentaPoint);

  // Dynamic Cursor Interactive Light
  const cursorLight = new THREE.PointLight(0x00f0ff, 2.5, 200);
  cursorLight.position.set(0, 0, 80);
  scene.add(cursorLight);

  // --- 3D PARTICLE CONSTELLATION & CONNECTING MESH ---
  const particleCount = window.innerWidth < 768 ? 600 : 1200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const originalPositions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color(0x00f0ff);
  const color2 = new THREE.Color(0x8b5cf6);
  const color3 = new THREE.Color(0x3b82f6);
  const colorEmerald = new THREE.Color(0x10b981);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const px = (Math.random() - 0.5) * 600;
    const py = (Math.random() - 0.5) * 600;
    const pz = (Math.random() - 0.5) * 600;

    positions[i3] = px;
    positions[i3 + 1] = py;
    positions[i3 + 2] = pz;

    originalPositions[i3] = px;
    originalPositions[i3 + 1] = py;
    originalPositions[i3 + 2] = pz;

    velocities[i3] = (Math.random() - 0.5) * 0.35;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.35;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.35;

    const mixedColor = i % 4 === 0 ? color1 : i % 4 === 1 ? color2 : i % 4 === 2 ? color3 : colorEmerald;
    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Particle Point Material
  const pMaterial = new THREE.PointsMaterial({
    size: 2.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.88,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, pMaterial);
  scene.add(particleSystem);

  // Floating Cyber Geometric Shapes in Space
  const shapesGroup = new THREE.Group();
  scene.add(shapesGroup);

  // 1. Floating Torus Knot
  const knotGeo = new THREE.TorusKnotGeometry(18, 3.5, 100, 16);
  const wireMat1 = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
    roughness: 0.2,
    metalness: 0.9,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.2
  });
  const knotMesh = new THREE.Mesh(knotGeo, wireMat1);
  knotMesh.position.set(-140, 60, -120);
  shapesGroup.add(knotMesh);

  // 2. Floating Octahedron
  const octGeo = new THREE.OctahedronGeometry(24, 1);
  const wireMat2 = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    roughness: 0.3,
    metalness: 0.8,
    emissive: 0x8b5cf6,
    emissiveIntensity: 0.25
  });
  const octMesh = new THREE.Mesh(octGeo, wireMat2);
  octMesh.position.set(160, -90, -80);
  shapesGroup.add(octMesh);

  // 3. Floating Icosahedron
  const icoGeo = new THREE.IcosahedronGeometry(30, 1);
  const wireMat3 = new THREE.MeshStandardMaterial({
    color: 0xec4899,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
    roughness: 0.4,
    metalness: 0.7,
    emissive: 0xec4899,
    emissiveIntensity: 0.2
  });
  const icoMesh = new THREE.Mesh(icoGeo, wireMat3);
  icoMesh.position.set(100, 130, -160);
  shapesGroup.add(icoMesh);

  // 4. Floating Concentric Rings
  const ringGeo = new THREE.RingGeometry(38, 40, 64);
  const wireMat4 = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
    emissive: 0x3b82f6,
    emissiveIntensity: 0.25
  });
  const ringMesh = new THREE.Mesh(ringGeo, wireMat4);
  ringMesh.position.set(-120, -140, -100);
  ringMesh.rotation.x = Math.PI / 3;
  shapesGroup.add(ringMesh);

  // 5. Gravitational Shockwave Ring (Dynamic Pulse)
  const shockwaveGeo = new THREE.RingGeometry(1, 4, 64);
  const shockwaveMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
  shockwaveMesh.position.set(0, 0, 0);
  scene.add(shockwaveMesh);

  let shockwaveActive = false;
  let shockwaveScale = 1;

  // --- MOUSE & PARALLAX TRACKING ---
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX - windowHalfX) * 0.08;
    targetMouseY = (e.clientY - windowHalfY) * 0.08;

    // Track dynamic point light in 3D world space
    const vector = new THREE.Vector3(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
      0.5
    );
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = 80;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));
    cursorLight.position.copy(pos);
  }, { passive: true });

  // Interactive Gravitational Shockwave trigger
  window.trigger3DShockwave = function (x, y) {
    shockwaveMesh.position.set(targetMouseX, -targetMouseY, 20);
    shockwaveScale = 1;
    shockwaveMat.opacity = 0.85;
    shockwaveActive = true;
    if (typeof window.playSynthSound === 'function') {
      window.playSynthSound('burst');
    }
  };

  window.addEventListener('click', (e) => {
    // Avoid triggering if clicking on UI interactive controls
    if (e.target.closest('button, a, input, select, textarea, .nav-actions, .mobile-drawer, .hud-3d-telemetry, .terminal-cyber-window, .modal-cyber-dialog')) {
      return;
    }
    window.trigger3DShockwave(e.clientX, e.clientY);
  });

  // --- SCROLL-DRIVEN CAMERA CHOREOGRAPHY ---
  const waypoints = [
    { scrollPct: 0.0, camX: 0, camY: 0, camZ: 120, rotX: 0, rotY: 0 },         // Hero
    { scrollPct: 0.2, camX: -30, camY: -15, camZ: 140, rotX: 0.05, rotY: -0.15 }, // About
    { scrollPct: 0.4, camX: 35, camY: 20, camZ: 130, rotX: -0.05, rotY: 0.2 },     // Skills
    { scrollPct: 0.65, camX: 0, camY: -40, camZ: 150, rotX: 0.1, rotY: 0 },        // Experience
    { scrollPct: 0.85, camX: -25, camY: 30, camZ: 135, rotX: -0.08, rotY: -0.1 },  // Projects
    { scrollPct: 1.0, camX: 0, camY: -10, camZ: 110, rotX: 0, rotY: 0 }           // Contact
  ];

  let currentScrollProgress = 0;

  function updateScrollProgress() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    currentScrollProgress = totalHeight > 0 ? Math.min(Math.max(window.scrollY / totalHeight, 0), 1) : 0;
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  function getInterpolatedWaypoint(progress) {
    if (progress <= waypoints[0].scrollPct) return waypoints[0];
    if (progress >= waypoints[waypoints.length - 1].scrollPct) return waypoints[waypoints.length - 1];

    for (let i = 0; i < waypoints.length - 1; i++) {
      const p1 = waypoints[i];
      const p2 = waypoints[i + 1];
      if (progress >= p1.scrollPct && progress <= p2.scrollPct) {
        const factor = (progress - p1.scrollPct) / (p2.scrollPct - p1.scrollPct);
        const smoothFactor = factor * factor * (3 - 2 * factor); // smoothstep
        return {
          camX: p1.camX + (p2.camX - p1.camX) * smoothFactor,
          camY: p1.camY + (p2.camY - p1.camY) * smoothFactor,
          camZ: p1.camZ + (p2.camZ - p1.camZ) * smoothFactor,
          rotX: p1.rotX + (p2.rotX - p1.rotX) * smoothFactor,
          rotY: p1.rotY + (p2.rotY - p1.rotY) * smoothFactor
        };
      }
    }
    return waypoints[0];
  }

  // --- CAMERA SPATIAL MODES (HUD CONTROLLED) ---
  let activeCameraMode = 'cinematic'; // 'cinematic', 'matrix', 'quantum', 'warp'
  let warpSpeedMultiplier = 1;

  window.set3DCameraMode = function (mode) {
    activeCameraMode = mode;
    if (mode === 'warp') {
      warpSpeedMultiplier = 6;
      pMaterial.size = 3.6;
    } else {
      warpSpeedMultiplier = 1;
      pMaterial.size = 2.8;
    }
    if (typeof window.playSynthSound === 'function') {
      window.playSynthSound('hover');
    }
  };

  // Wire mode buttons from DOM HUD
  const modeButtons = document.querySelectorAll('#hudCameraModes .hud-mode-btn');
  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-cam-mode');
      window.set3DCameraMode(mode);
    });
  });

  const resetCamBtn = document.getElementById('hudResetCamBtn');
  if (resetCamBtn) {
    resetCamBtn.addEventListener('click', () => {
      window.set3DCameraMode('cinematic');
      modeButtons.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-cam-mode') === 'cinematic');
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- THEME COLOR REACTIVITY ---
  window.update3DTheme = function (isLight) {
    if (isLight) {
      ambientLight.color.setHex(0xe2e8f0);
      ambientLight.intensity = 2.2;
      cyanPoint.color.setHex(0x0284c7);
      purplePoint.color.setHex(0x7c3aed);
      cursorLight.color.setHex(0x0284c7);
      pMaterial.opacity = 0.55;
      wireMat1.opacity = 0.15;
      wireMat2.opacity = 0.18;
    } else {
      ambientLight.color.setHex(0x0c162d);
      ambientLight.intensity = 1.6;
      cyanPoint.color.setHex(0x00f0ff);
      purplePoint.color.setHex(0x8b5cf6);
      cursorLight.color.setHex(0x00f0ff);
      pMaterial.opacity = 0.88;
      wireMat1.opacity = 0.3;
      wireMat2.opacity = 0.35;
    }
  };

  // --- REAL-TIME TELEMETRY HUD UPDATER ---
  const hudFpsVal = document.getElementById('hudFpsVal');
  const hudVerticesVal = document.getElementById('hudVerticesVal');
  let frameCount = 0;
  let lastTime = performance.now();

  function updateTelemetry(time) {
    frameCount++;
    if (time >= lastTime + 500) {
      const fps = Math.round((frameCount * 1000) / (time - lastTime));
      if (hudFpsVal) hudFpsVal.textContent = Math.min(fps, 60);
      frameCount = 0;
      lastTime = time;
    }
  }

  if (hudVerticesVal) {
    const totalVertices = particleCount + 100 * 16 + 24 + 30 + 64;
    hudVerticesVal.textContent = (totalVertices / 1000).toFixed(1) + 'k';
  }

  // --- ANIMATION LOOP ---
  let clock = new THREE.Clock();

  function animate(now) {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    updateTelemetry(now);

    // Smooth mouse parallax
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Apply Camera Flight Mode Transitions
    if (activeCameraMode === 'cinematic') {
      const wp = getInterpolatedWaypoint(currentScrollProgress);
      camera.position.x += (wp.camX + mouseX - camera.position.x) * 0.05;
      camera.position.y += (wp.camY - mouseY - camera.position.y) * 0.05;
      camera.position.z += (wp.camZ - camera.position.z) * 0.05;
      camera.rotation.x += (wp.rotX - camera.rotation.x) * 0.05;
      camera.rotation.y += (wp.rotY - camera.rotation.y) * 0.05;
    } else if (activeCameraMode === 'matrix') {
      // Top-Down Tactical Matrix Grid View
      camera.position.x += (0 + mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (180 - camera.position.y) * 0.05;
      camera.position.z += (70 - camera.position.z) * 0.05;
      camera.rotation.x += (-Math.PI / 3.5 - camera.rotation.x) * 0.05;
      camera.rotation.y += (0 - camera.rotation.y) * 0.05;
    } else if (activeCameraMode === 'quantum') {
      // Deep Cosmic Dust Perspective
      camera.position.x += (Math.sin(elapsedTime * 0.3) * 60 + mouseX - camera.position.x) * 0.04;
      camera.position.y += (Math.cos(elapsedTime * 0.25) * 40 - mouseY - camera.position.y) * 0.04;
      camera.position.z += (90 - camera.position.z) * 0.05;
      camera.rotation.x += (Math.sin(elapsedTime * 0.2) * 0.08 - camera.rotation.x) * 0.05;
      camera.rotation.y += (Math.cos(elapsedTime * 0.2) * 0.08 - camera.rotation.y) * 0.05;
    } else if (activeCameraMode === 'warp') {
      // Light-Speed Warp Flight
      camera.position.x += (mouseX * 0.2 - camera.position.x) * 0.1;
      camera.position.y += (-mouseY * 0.2 - camera.position.y) * 0.1;
      camera.position.z += (70 - camera.position.z) * 0.05;
      camera.rotation.x += (0 - camera.rotation.x) * 0.1;
      camera.rotation.y += (0 - camera.rotation.y) * 0.1;
    }

    // Rotate and animate geometric shapes
    knotMesh.rotation.x = elapsedTime * 0.35;
    knotMesh.rotation.y = elapsedTime * 0.25;
    knotMesh.position.y = 60 + Math.sin(elapsedTime * 0.8) * 10;

    octMesh.rotation.x = elapsedTime * 0.25;
    octMesh.rotation.z = elapsedTime * 0.35;
    octMesh.position.y = -90 + Math.cos(elapsedTime * 0.7) * 12;

    icoMesh.rotation.y = elapsedTime * 0.28;
    icoMesh.position.y = 130 + Math.sin(elapsedTime * 0.6) * 14;

    ringMesh.rotation.z = elapsedTime * 0.18;

    // Shockwave animation
    if (shockwaveActive) {
      shockwaveScale += 8;
      shockwaveMesh.scale.set(shockwaveScale, shockwaveScale, shockwaveScale);
      shockwaveMat.opacity -= 0.025;
      if (shockwaveMat.opacity <= 0) {
        shockwaveActive = false;
        shockwaveMat.opacity = 0;
      }
    }

    // Animate individual particles with warp speed multiplier
    const pos = geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      pos[i3] += velocities[i3] * warpSpeedMultiplier;
      pos[i3 + 1] += velocities[i3 + 1] * warpSpeedMultiplier;
      pos[i3 + 2] += (velocities[i3 + 2] + (activeCameraMode === 'warp' ? 2.5 : 0)) * warpSpeedMultiplier;

      // Boundary check & wrap around
      if (pos[i3] < -300) pos[i3] = 300;
      if (pos[i3] > 300) pos[i3] = -300;
      if (pos[i3 + 1] < -300) pos[i3 + 1] = 300;
      if (pos[i3 + 1] > 300) pos[i3 + 1] = -300;
      if (pos[i3 + 2] < -300) pos[i3 + 2] = 300;
      if (pos[i3 + 2] > 300) pos[i3 + 2] = -300;
    }
    geometry.attributes.position.needsUpdate = true;

    // Slow global particle system rotation
    particleSystem.rotation.y = elapsedTime * (activeCameraMode === 'warp' ? 0.08 : 0.02);

    renderer.render(scene, camera);
  }

  animate(performance.now());

  // --- WINDOW RESIZE HANDLER ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
})();
