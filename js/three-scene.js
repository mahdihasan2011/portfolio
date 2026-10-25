/**
 * MAHDI HASAN | 3D WEBGL UNIVERSE & CAMERA CHOREOGRAPHER
 * Powered by Three.js
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
  const ambientLight = new THREE.AmbientLight(0x0c162d, 1.5);
  scene.add(ambientLight);

  const cyanPoint = new THREE.PointLight(0x00f0ff, 3, 400);
  cyanPoint.position.set(80, 100, 100);
  scene.add(cyanPoint);

  const purplePoint = new THREE.PointLight(0x8b5cf6, 2.5, 400);
  purplePoint.position.set(-100, -80, 50);
  scene.add(purplePoint);

  const magentaPoint = new THREE.PointLight(0xec4899, 2, 350);
  magentaPoint.position.set(0, -120, -50);
  scene.add(magentaPoint);

  // --- 3D PARTICLE CONSTELLATION & CONNECTING MESH ---
  const particleCount = window.innerWidth < 768 ? 450 : 900;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color(0x00f0ff);
  const color2 = new THREE.Color(0x8b5cf6);
  const color3 = new THREE.Color(0x3b82f6);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 500;
    positions[i3 + 1] = (Math.random() - 0.5) * 500;
    positions[i3 + 2] = (Math.random() - 0.5) * 500;

    velocities[i3] = (Math.random() - 0.5) * 0.25;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.25;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.25;

    const mixedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Particle Point Material
  const pMaterial = new THREE.PointsMaterial({
    size: 2.6,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, pMaterial);
  scene.add(particleSystem);

  // Floating Cyber Geometric Shapes in Space
  const shapesGroup = new THREE.Group();
  scene.add(shapesGroup);

  // 1. Floating Torus Knot
  const knotGeo = new THREE.TorusKnotGeometry(16, 3, 90, 16);
  const wireMat1 = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.2
  });
  const knotMesh = new THREE.Mesh(knotGeo, wireMat1);
  knotMesh.position.set(-140, 60, -120);
  shapesGroup.add(knotMesh);

  // 2. Floating Octahedron
  const octGeo = new THREE.OctahedronGeometry(22, 1);
  const wireMat2 = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const octMesh = new THREE.Mesh(octGeo, wireMat2);
  octMesh.position.set(160, -90, -80);
  shapesGroup.add(octMesh);

  // 3. Floating Icosahedron
  const icoGeo = new THREE.IcosahedronGeometry(28, 1);
  const wireMat3 = new THREE.MeshBasicMaterial({
    color: 0xec4899,
    wireframe: true,
    transparent: true,
    opacity: 0.18
  });
  const icoMesh = new THREE.Mesh(icoGeo, wireMat3);
  icoMesh.position.set(100, 120, -160);
  shapesGroup.add(icoMesh);

  // 4. Floating Concentric Rings
  const ringGeo = new THREE.RingGeometry(35, 36, 64);
  const wireMat4 = new THREE.MeshBasicMaterial({
    color: 0x3b82f6,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide
  });
  const ringMesh = new THREE.Mesh(ringGeo, wireMat4);
  ringMesh.position.set(-120, -140, -100);
  ringMesh.rotation.x = Math.PI / 3;
  shapesGroup.add(ringMesh);

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
  }, { passive: true });

  // --- SCROLL-DRIVEN CAMERA CHOREOGRAPHY ---
  // Camera waypoints along the page scroll
  const waypoints = [
    { scrollPct: 0.0, camX: 0, camY: 0, camZ: 120, rotX: 0, rotY: 0 },       // Hero
    { scrollPct: 0.2, camX: -30, camY: -15, camZ: 140, rotX: 0.05, rotY: -0.15 }, // About
    { scrollPct: 0.4, camX: 35, camY: 20, camZ: 130, rotX: -0.05, rotY: 0.2 },   // Skills
    { scrollPct: 0.65, camX: 0, camY: -40, camZ: 150, rotX: 0.1, rotY: 0 },      // Experience
    { scrollPct: 0.85, camX: -25, camY: 30, camZ: 135, rotX: -0.08, rotY: -0.1 },// Projects
    { scrollPct: 1.0, camX: 0, camY: -10, camZ: 110, rotX: 0, rotY: 0 }         // Contact
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

  // --- THEME COLOR REACTIVITY ---
  window.update3DTheme = function (isLight) {
    if (isLight) {
      ambientLight.color.setHex(0xe2e8f0);
      ambientLight.intensity = 2.0;
      cyanPoint.color.setHex(0x0284c7);
      purplePoint.color.setHex(0x7c3aed);
      pMaterial.opacity = 0.55;
      wireMat1.opacity = 0.12;
      wireMat2.opacity = 0.15;
    } else {
      ambientLight.color.setHex(0x0c162d);
      ambientLight.intensity = 1.5;
      cyanPoint.color.setHex(0x00f0ff);
      purplePoint.color.setHex(0x8b5cf6);
      pMaterial.opacity = 0.85;
      wireMat1.opacity = 0.2;
      wireMat2.opacity = 0.25;
    }
  };

  // --- ANIMATION LOOP ---
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Smooth mouse parallax
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Smooth camera choreography from scroll
    const wp = getInterpolatedWaypoint(currentScrollProgress);
    camera.position.x += (wp.camX + mouseX - camera.position.x) * 0.05;
    camera.position.y += (wp.camY - mouseY - camera.position.y) * 0.05;
    camera.position.z += (wp.camZ - camera.position.z) * 0.05;
    camera.rotation.x += (wp.rotX - camera.rotation.x) * 0.05;
    camera.rotation.y += (wp.rotY - camera.rotation.y) * 0.05;

    // Rotate and animate geometric shapes
    knotMesh.rotation.x = elapsedTime * 0.35;
    knotMesh.rotation.y = elapsedTime * 0.25;
    knotMesh.position.y = 60 + Math.sin(elapsedTime * 0.8) * 8;

    octMesh.rotation.x = elapsedTime * 0.2;
    octMesh.rotation.z = elapsedTime * 0.3;
    octMesh.position.y = -90 + Math.cos(elapsedTime * 0.7) * 10;

    icoMesh.rotation.y = elapsedTime * 0.25;
    icoMesh.position.y = 120 + Math.sin(elapsedTime * 0.6) * 12;

    ringMesh.rotation.z = elapsedTime * 0.15;

    // Animate individual particles
    const pos = geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      pos[i3] += velocities[i3];
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];

      // Boundary check & wrap around
      if (pos[i3] < -250 || pos[i3] > 250) velocities[i3] *= -1;
      if (pos[i3 + 1] < -250 || pos[i3 + 1] > 250) velocities[i3 + 1] *= -1;
      if (pos[i3 + 2] < -250 || pos[i3 + 2] > 250) velocities[i3 + 2] *= -1;
    }
    geometry.attributes.position.needsUpdate = true;

    // Slow global particle system rotation
    particleSystem.rotation.y = elapsedTime * 0.02;

    renderer.render(scene, camera);
  }

  animate();

  // --- WINDOW RESIZE HANDLER ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
})();
