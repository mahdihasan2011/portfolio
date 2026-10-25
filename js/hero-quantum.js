/**
 * MAHDI HASAN | 3D QUANTUM TECH CORE HERO ENGINE
 * Multi-Mode Centerpiece (Quantum Core, Neural Network, Cyber Matrix)
 * with Smooth Drag Inertia, Particle Shockwaves & PBR Shading
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

  // Lighting
  const ambLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambLight);

  const keyLight = new THREE.PointLight(0x00f0ff, 3, 200);
  keyLight.position.set(50, 50, 60);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0x8b5cf6, 2.5, 200);
  fillLight.position.set(-50, -40, 50);
  scene.add(fillLight);

  // Master Core Group (Drag Rotatable)
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // Subgroups for the 3 modes
  const quantumGroup = new THREE.Group();
  const neuralGroup = new THREE.Group();
  const matrixGroup = new THREE.Group();

  masterGroup.add(quantumGroup);
  masterGroup.add(neuralGroup);
  masterGroup.add(matrixGroup);

  neuralGroup.visible = false;
  matrixGroup.visible = false;

  // =========================================================================
  // 1. QUANTUM CORE MODE ASSETS
  // =========================================================================
  const icoGeo = new THREE.IcosahedronGeometry(14, 2);
  const icoMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    wireframe: true,
    roughness: 0.2,
    metalness: 0.9,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.35
  });
  const icoMesh = new THREE.Mesh(icoGeo, icoMat);
  quantumGroup.add(icoMesh);

  // Glowing Core Sphere
  const innerGeo = new THREE.SphereGeometry(7, 32, 32);
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    roughness: 0.1,
    metalness: 0.8,
    emissive: 0x8b5cf6,
    emissiveIntensity: 0.6,
    transparent: true,
    opacity: 0.85
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  quantumGroup.add(innerMesh);

  // Gimbal Rings
  function createGimbalRing(radius, tube, color, rotX, rotY, rotZ) {
    const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: color,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.9,
      emissive: color,
      emissiveIntensity: 0.3
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.set(rotX, rotY, rotZ);
    return ringMesh;
  }

  const ring1 = createGimbalRing(20, 0.45, 0x00f0ff, Math.PI / 4, 0, 0);
  const ring2 = createGimbalRing(24, 0.45, 0x8b5cf6, 0, Math.PI / 3, Math.PI / 6);
  const ring3 = createGimbalRing(28, 0.45, 0xec4899, Math.PI / 6, Math.PI / 4, Math.PI / 2);

  quantumGroup.add(ring1);
  quantumGroup.add(ring2);
  quantumGroup.add(ring3);

  // Orbiting Satellite Nodes
  const satelliteCount = 14;
  const satelliteMeshes = [];
  const satGeo = new THREE.SphereGeometry(0.85, 16, 16);

  for (let i = 0; i < satelliteCount; i++) {
    const satColor = i % 2 === 0 ? 0x00f0ff : 0x8b5cf6;
    const satMat = new THREE.MeshStandardMaterial({
      color: satColor,
      emissive: satColor,
      emissiveIntensity: 0.5
    });
    const satMesh = new THREE.Mesh(satGeo, satMat);

    const angle = (i / satelliteCount) * Math.PI * 2;
    const radius = 22 + (i % 3) * 3;
    satMesh.position.set(Math.cos(angle) * radius, Math.sin(i) * 6, Math.sin(angle) * radius);
    quantumGroup.add(satMesh);

    satelliteMeshes.push({
      mesh: satMesh,
      angle: angle,
      radius: radius,
      speed: 0.015 + (i % 3) * 0.005,
      yOffset: Math.sin(i) * 6
    });
  }

  // =========================================================================
  // 2. NEURAL NETWORK MODE ASSETS
  // =========================================================================
  const neuralNodeCount = 40;
  const neuralNodes = [];
  const neuralGeo = new THREE.SphereGeometry(1.2, 16, 16);
  const neuralMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x10b981,
    emissiveIntensity: 0.6
  });

  for (let i = 0; i < neuralNodeCount; i++) {
    const node = new THREE.Mesh(neuralGeo, neuralMat);
    const phi = Math.acos(-1 + (2 * i) / neuralNodeCount);
    const theta = Math.sqrt(neuralNodeCount * Math.PI) * phi;
    const r = 20 + Math.random() * 4;
    node.position.set(r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi));
    neuralGroup.add(node);
    neuralNodes.push(node);
  }

  // Connect closest neural nodes with lines
  const neuralLineMat = new THREE.LineBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.4
  });
  const neuralLineGeo = new THREE.BufferGeometry();
  const neuralLinePoints = [];

  for (let i = 0; i < neuralNodes.length; i++) {
    for (let j = i + 1; j < neuralNodes.length; j++) {
      if (neuralNodes[i].position.distanceTo(neuralNodes[j].position) < 14) {
        neuralLinePoints.push(neuralNodes[i].position.x, neuralNodes[i].position.y, neuralNodes[i].position.z);
        neuralLinePoints.push(neuralNodes[j].position.x, neuralNodes[j].position.y, neuralNodes[j].position.z);
      }
    }
  }
  neuralLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(neuralLinePoints, 3));
  const neuralLines = new THREE.LineSegments(neuralLineGeo, neuralLineMat);
  neuralGroup.add(neuralLines);

  // Central Synapse Brain Core
  const neuralCoreGeo = new THREE.DodecahedronGeometry(8, 1);
  const neuralCoreMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    wireframe: true,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.5
  });
  const neuralCoreMesh = new THREE.Mesh(neuralCoreGeo, neuralCoreMat);
  neuralGroup.add(neuralCoreMesh);

  // =========================================================================
  // 3. CYBER MATRIX MODE ASSETS
  // =========================================================================
  const cubeGroup = new THREE.Group();
  matrixGroup.add(cubeGroup);

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const boxGeo = new THREE.BoxGeometry(6, 6, 6);
        const boxMat = new THREE.MeshStandardMaterial({
          color: 0x3b82f6,
          wireframe: true,
          emissive: (x === 0 && y === 0 && z === 0) ? 0x00f0ff : 0x8b5cf6,
          emissiveIntensity: 0.4
        });
        const box = new THREE.Mesh(boxGeo, boxMat);
        box.position.set(x * 9, y * 9, z * 9);
        cubeGroup.add(box);
      }
    }
  }

  // Outer Grid Cage
  const cageGeo = new THREE.BoxGeometry(32, 32, 32);
  const cageMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.2
  });
  const cageMesh = new THREE.Mesh(cageGeo, cageMat);
  matrixGroup.add(cageMesh);

  // =========================================================================
  // MODE SWITCHER ENGINE
  // =========================================================================
  window.setHeroCoreMode = function (mode) {
    quantumGroup.visible = (mode === 'quantum');
    neuralGroup.visible = (mode === 'neural');
    matrixGroup.visible = (mode === 'matrix');

    if (typeof window.playSynthSound === 'function') {
      window.playSynthSound('click');
    }
  };

  const coreModeButtons = document.querySelectorAll('#coreModeSwitcher .core-mode-btn');
  coreModeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      coreModeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-core-mode');
      window.setHeroCoreMode(mode);
    });
  });

  // =========================================================================
  // INTERACTIVE 3D DRAGGING WITH MOMENTUM & INERTIA
  // =========================================================================
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let velocityX = 0;
  let velocityY = 0;

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
    velocityX = 0;
    velocityY = 0;
    canvas.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      canvas.style.cursor = 'grab';
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevMouseX;
    const deltaY = e.clientY - prevMouseY;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;

    velocityX = deltaX * 0.008;
    velocityY = deltaY * 0.008;

    masterGroup.rotation.y += velocityX;
    masterGroup.rotation.x += velocityY;
  });

  // Touch Support
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
      velocityX = 0;
      velocityY = 0;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - prevMouseX;
    const deltaY = e.touches[0].clientY - prevMouseY;
    prevMouseX = e.touches[0].clientX;
    prevMouseY = e.touches[0].clientY;

    velocityX = deltaX * 0.008;
    velocityY = deltaY * 0.008;

    masterGroup.rotation.y += velocityX;
    masterGroup.rotation.x += velocityY;
  }, { passive: true });

  // Interactive Click Pulse / Shockwave
  canvas.addEventListener('click', () => {
    innerMesh.scale.set(1.5, 1.5, 1.5);
    setTimeout(() => {
      innerMesh.scale.set(1, 1, 1);
    }, 250);

    if (typeof window.trigger3DShockwave === 'function') {
      window.trigger3DShockwave(width / 2, height / 2);
    }
    if (typeof window.playSynthSound === 'function') {
      window.playSynthSound('burst');
    }
  });

  // =========================================================================
  // ANIMATION LOOP
  // =========================================================================
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Inertia damping when not actively dragging
    if (!isDragging) {
      velocityX *= 0.95;
      velocityY *= 0.95;
      masterGroup.rotation.y += velocityX + 0.005; // Gentle constant rotation
      masterGroup.rotation.x += velocityY;
    }

    // 1. Quantum mode animation
    if (quantumGroup.visible) {
      icoMesh.rotation.x = elapsedTime * 0.4;
      icoMesh.rotation.y = elapsedTime * 0.6;

      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.08;
      innerMesh.scale.set(pulse, pulse, pulse);

      ring1.rotation.z = elapsedTime * 0.6;
      ring2.rotation.x = elapsedTime * 0.5;
      ring3.rotation.y = elapsedTime * 0.7;

      for (let i = 0; i < satelliteMeshes.length; i++) {
        const sat = satelliteMeshes[i];
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
        sat.mesh.position.y = sat.yOffset + Math.sin(sat.angle * 2) * 2;
      }
    }

    // 2. Neural mode animation
    if (neuralGroup.visible) {
      neuralGroup.rotation.y = elapsedTime * 0.2;
      neuralCoreMesh.rotation.x = elapsedTime * 0.5;
      neuralCoreMesh.rotation.y = elapsedTime * 0.7;
    }

    // 3. Matrix mode animation
    if (matrixGroup.visible) {
      cubeGroup.rotation.x = elapsedTime * 0.3;
      cubeGroup.rotation.y = elapsedTime * 0.4;
      cageMesh.rotation.y = -elapsedTime * 0.15;
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
