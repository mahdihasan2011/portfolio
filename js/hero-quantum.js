/**
 * MAHDI HASAN | 3D QUANTUM TECH CORE HERO ENGINE
 * Interactive Three.js centerpiece with physics, gyroscopes & particle shockwaves
 */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-quantum-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const width = canvas.clientWidth || 500;
  const height = canvas.clientHeight || 500;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 75);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Core Group
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  // 1. Central Wireframe Icosahedron
  const icoGeo = new THREE.IcosahedronGeometry(14, 2);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.75
  });
  const icoMesh = new THREE.Mesh(icoGeo, icoMat);
  coreGroup.add(icoMesh);

  // 2. Inner Glowing Core Sphere
  const innerGeo = new THREE.SphereGeometry(7, 32, 32);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.65
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  coreGroup.add(innerMesh);

  // 3. Triple Concentric Gimbal Rings
  function createGimbalRing(radius, tube, color, rotX, rotY, rotZ) {
    const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.set(rotX, rotY, rotZ);
    return ringMesh;
  }

  const ring1 = createGimbalRing(20, 0.4, 0x00f0ff, Math.PI / 4, 0, 0);
  const ring2 = createGimbalRing(24, 0.4, 0x8b5cf6, 0, Math.PI / 3, Math.PI / 6);
  const ring3 = createGimbalRing(28, 0.4, 0xec4899, Math.PI / 6, Math.PI / 4, Math.PI / 2);

  coreGroup.add(ring1);
  coreGroup.add(ring2);
  coreGroup.add(ring3);

  // 4. Orbiting Satellite Nodes (Tech Data Nodes)
  const satellitesGroup = new THREE.Group();
  coreGroup.add(satellitesGroup);

  const satelliteCount = 12;
  const satelliteMeshes = [];
  const satGeo = new THREE.SphereGeometry(0.8, 16, 16);

  for (let i = 0; i < satelliteCount; i++) {
    const satColor = i % 2 === 0 ? 0x00f0ff : 0x8b5cf6;
    const satMat = new THREE.MeshBasicMaterial({ color: satColor });
    const satMesh = new THREE.Mesh(satGeo, satMat);

    const angle = (i / satelliteCount) * Math.PI * 2;
    const radius = 22 + (i % 3) * 3;
    satMesh.position.set(Math.cos(angle) * radius, (Math.sin(i) * 6), Math.sin(angle) * radius);
    satellitesGroup.add(satMesh);

    satelliteMeshes.push({
      mesh: satMesh,
      angle: angle,
      radius: radius,
      speed: 0.015 + (i % 3) * 0.005,
      yOffset: (Math.sin(i) * 6)
    });
  }

  // 5. Burst Particle Shockwave System
  const shockwaveCount = 300;
  const shockGeo = new THREE.BufferGeometry();
  const shockPositions = new Float32Array(shockwaveCount * 3);
  const shockVelocities = [];

  for (let i = 0; i < shockwaveCount; i++) {
    shockPositions[i * 3] = 0;
    shockPositions[i * 3 + 1] = 0;
    shockPositions[i * 3 + 2] = 0;

    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random());
    const sinPhi = Math.sin(phi);

    shockVelocities.push(new THREE.Vector3(
      r * sinPhi * Math.cos(theta),
      r * sinPhi * Math.sin(theta),
      r * Math.cos(phi)
    ));
  }

  shockGeo.setAttribute('position', new THREE.BufferAttribute(shockPositions, 3));
  const shockMat = new THREE.PointsMaterial({
    size: 2.2,
    color: 0x00f0ff,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
  });

  const shockwavePoints = new THREE.Points(shockGeo, shockMat);
  coreGroup.add(shockwavePoints);

  let isExploding = false;
  let explosionProgress = 0;

  // Trigger Shockwave Burst
  window.triggerQuantumBurst = function () {
    if (isExploding) return;
    isExploding = true;
    explosionProgress = 0;
    shockMat.opacity = 1;

    // Reset shock positions
    const pos = shockGeo.attributes.position.array;
    for (let i = 0; i < shockwaveCount; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
    }
    shockGeo.attributes.position.needsUpdate = true;

    // Play cyber chime sound if available
    if (window.playSynthSound) {
      window.playSynthSound('burst');
    }
  };

  // --- INTERACTION: DRAG & ROTATION PHYSICS ---
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let rotationVelocity = { x: 0.003, y: 0.005 };

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotationVelocity.y = deltaX * 0.005;
      rotationVelocity.x = deltaY * 0.005;

      coreGroup.rotation.y += rotationVelocity.y;
      coreGroup.rotation.x += rotationVelocity.x;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  });

  // Touch Support
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  canvas.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      rotationVelocity.y = deltaX * 0.006;
      rotationVelocity.x = deltaY * 0.006;

      coreGroup.rotation.y += rotationVelocity.y;
      coreGroup.rotation.x += rotationVelocity.x;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  // Click on canvas triggers burst
  canvas.addEventListener('click', (e) => {
    window.triggerQuantumBurst();
  });

  // --- ANIMATION LOOP ---
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Natural rotation with inertia damping
    if (!isDragging) {
      rotationVelocity.x *= 0.95;
      rotationVelocity.y *= 0.95;

      coreGroup.rotation.x += rotationVelocity.x + 0.003;
      coreGroup.rotation.y += rotationVelocity.y + 0.006;
    }

    // Gimbal Ring Differential Rotations
    ring1.rotation.z = elapsedTime * 0.8;
    ring2.rotation.x = elapsedTime * 0.6;
    ring3.rotation.y = elapsedTime * 0.7;

    // Inner Pulsing Core
    const pulseScale = 1 + Math.sin(elapsedTime * 3) * 0.15;
    innerMesh.scale.set(pulseScale, pulseScale, pulseScale);

    // Orbiting Satellite Nodes
    satelliteMeshes.forEach(sat => {
      sat.angle += sat.speed;
      sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
      sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
      sat.mesh.position.y = sat.yOffset + Math.sin(sat.angle * 2) * 2;
    });

    // Particle Shockwave Animation
    if (isExploding) {
      explosionProgress += delta * 1.5;
      const pos = shockGeo.attributes.position.array;
      const burstSpeed = 50 * (1 - explosionProgress * 0.5);

      for (let i = 0; i < shockwaveCount; i++) {
        const i3 = i * 3;
        pos[i3] += shockVelocities[i].x * burstSpeed * delta;
        pos[i3 + 1] += shockVelocities[i].y * burstSpeed * delta;
        pos[i3 + 2] += shockVelocities[i].z * burstSpeed * delta;
      }
      shockGeo.attributes.position.needsUpdate = true;

      // Temporary scale bump for core rings
      ring1.scale.setScalar(1 + Math.sin(explosionProgress * Math.PI) * 0.4);
      ring2.scale.setScalar(1 + Math.sin(explosionProgress * Math.PI) * 0.4);
      ring3.scale.setScalar(1 + Math.sin(explosionProgress * Math.PI) * 0.4);

      shockMat.opacity = Math.max(1 - explosionProgress, 0);

      if (explosionProgress >= 1.0) {
        isExploding = false;
        ring1.scale.setScalar(1);
        ring2.scale.setScalar(1);
        ring3.scale.setScalar(1);
      }
    }

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    const newWidth = canvas.clientWidth || 500;
    const newHeight = canvas.clientHeight || 500;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
})();
