"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "@/context/ThemeContext";
import * as THREE from "three";

// Procedural Screen Texture displaying realistic code syntax & blinking cursor
function useCodeScreenTexture(isDark: boolean) {
  return useMemo(() => {
    if (typeof document === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Background
    ctx.fillStyle = isDark ? "#090d14" : "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Editor Header / Tabs bar
    ctx.fillStyle = isDark ? "#131924" : "#1e293b";
    ctx.fillRect(0, 0, canvas.width, 50);

    // Window controls (macOS style dots)
    ctx.fillStyle = "#ff5f56";
    ctx.beginPath();
    ctx.arc(28, 25, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffbd2e";
    ctx.beginPath();
    ctx.arc(52, 25, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#27c93f";
    ctx.beginPath();
    ctx.arc(76, 25, 7, 0, Math.PI * 2);
    ctx.fill();

    // Tab title
    ctx.fillStyle = isDark ? "#00f0ff" : "#38bdf8";
    ctx.font = "bold 18px 'Fira Code', monospace";
    ctx.fillText("MahdiHasan.tsx", 110, 31);

    // Subtle line below tab
    ctx.strokeStyle = isDark ? "rgba(0, 240, 255, 0.2)" : "rgba(56, 189, 248, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(canvas.width, 50);
    ctx.stroke();

    // Code lines with rich syntax highlighting
    const codeLines = [
      { text: "import { SeniorEngineer } from '@mahdi/core';", color: "#c084fc" },
      { text: "import { React19, NextAppRouter, NodeAPI } from '@cloud/stack';", color: "#c084fc" },
      { text: "", color: "" },
      { text: "export const MahdiProfile = {", color: isDark ? "#00f0ff" : "#38bdf8" },
      { text: "  name: 'Mahdi Hasan',", color: "#34d399" },
      { text: "  role: 'Senior Full-Stack Engineer & Solutions Architect',", color: "#fbbf24" },
      { text: "  experience: '8+ Years Production Scalability',", color: "#facc15" },
      { text: "  coreStack: ['React', 'Next.js', 'Node.js', 'Laravel', 'TypeScript'],", color: "#38bdf8" },
      { text: "  database: ['MySQL', 'PostgreSQL', 'Redis Distributed Cache'],", color: "#a78bfa" },
      { text: "  architecture: ['Microservices', 'High-Concurrency POS', 'FinTech'],", color: "#ec4899" },
      { text: "  productionSLA: '99.9%',", color: "#f43f5e" },
      { text: "  openToOpportunities: true,", color: "#22c55e" },
      { text: "};", color: isDark ? "#00f0ff" : "#38bdf8" },
      { text: "", color: "" },
      { text: "// Deploying high-availability digital solutions...", color: "#64748b" },
      { text: "export default async function renderProductionSystem() {", color: "#c084fc" },
      { text: "  return await MahdiProfile.deploy({ latency: '<50ms', security: 'hardened' });", color: "#38bdf8" },
      { text: "}", color: "#c084fc" },
    ];

    ctx.font = "18px 'Fira Code', 'Courier New', monospace";
    let y = 84;
    codeLines.forEach((line, index) => {
      // Line numbers
      ctx.fillStyle = isDark ? "#334155" : "#475569";
      ctx.fillText(`${(index + 1).toString().padStart(2, "0")}`, 24, y);

      // Line text
      if (line.text) {
        ctx.fillStyle = line.color || "#e2e8f0";
        ctx.fillText(line.text, 68, y);
      }
      y += 28;
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    return texture;
  }, [isDark]);
}

// Floating Orbiting Starfield / Dust Particles
function ParticleField({ isDark, count = 120 }: { isDark: boolean; count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.05;
    pointsRef.current.rotation.x = Math.sin(t * 0.03) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={isDark ? "#00f0ff" : "#0284c7"}
        transparent
        opacity={isDark ? 0.75 : 0.45}
        sizeAttenuation
      />
    </points>
  );
}

// Procedural Laptop 3D Mesh
function ProceduralLaptop({
  isDark,
  prefersReducedMotion,
}: {
  isDark: boolean;
  prefersReducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const screenTexture = useCodeScreenTexture(isDark);

  // Gentle float & pointer tracking
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!prefersReducedMotion) {
      // Floating bobbing motion
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.12 - 0.35;

      // Subtle pointer tracking with damping
      const targetRotY = state.pointer.x * 0.35 - 0.22;
      const targetRotX = -state.pointer.y * 0.2 + 0.08;

      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        3.5,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        3.5,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.35, 0]} rotation={[0.08, -0.22, 0]}>
      {/* 1. Laptop Base / Chassis (Titanium in light mode, Space Obsidian in dark mode) */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[3.4, 0.12, 2.3]} />
        <meshStandardMaterial
          color={isDark ? "#121722" : "#e2e8f0"}
          roughness={isDark ? 0.35 : 0.2}
          metalness={isDark ? 0.85 : 0.95}
        />
      </mesh>

      {/* Keyboard Area Recess */}
      <mesh position={[0, 0.065, -0.22]}>
        <boxGeometry args={[2.95, 0.02, 1.35]} />
        <meshStandardMaterial
          color={isDark ? "#090d14" : "#1e293b"}
          roughness={0.65}
          metalness={0.2}
        />
      </mesh>

      {/* Backlit Trackpad */}
      <mesh position={[0, 0.065, 0.72]}>
        <boxGeometry args={[1.15, 0.02, 0.65]} />
        <meshStandardMaterial
          color={isDark ? "#1b2332" : "#cbd5e1"}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Laptop Screen Hinge */}
      <group position={[0, 0.06, -1.14]} rotation={[-Math.PI / 8.2, 0, 0]}>
        {/* Screen Lid Backing */}
        <mesh position={[0, 1.15, 0]} castShadow>
          <boxGeometry args={[3.4, 2.3, 0.07]} />
          <meshStandardMaterial
            color={isDark ? "#0d111a" : "#cbd5e1"}
            roughness={0.25}
            metalness={isDark ? 0.9 : 0.95}
          />
        </mesh>

        {/* Screen Display Bezel */}
        <mesh position={[0, 1.15, 0.04]}>
          <boxGeometry args={[3.25, 2.15, 0.01]} />
          <meshBasicMaterial color="#05070a" />
        </mesh>

        {/* Emissive Code Display Canvas */}
        <mesh position={[0, 1.15, 0.048]}>
          <planeGeometry args={[3.12, 2.02]} />
          {screenTexture ? (
            <meshBasicMaterial map={screenTexture} toneMapped={false} />
          ) : (
            <meshBasicMaterial color="#090d14" />
          )}
        </mesh>

        {/* Screen Ambient Light Bleed */}
        <pointLight
          position={[0, 1.15, 0.7]}
          color={isDark ? "#00f0ff" : "#0284c7"}
          intensity={isDark ? 0.8 : 1.2}
          distance={3.5}
        />
      </group>
    </group>
  );
}

// Surrounding Abstract Geometric Elements
function AbstractGeometries({
  isDark,
  prefersReducedMotion,
}: {
  isDark: boolean;
  prefersReducedMotion: boolean;
}) {
  const shapesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (shapesRef.current && !prefersReducedMotion) {
      const t = state.clock.getElapsedTime();
      shapesRef.current.rotation.y = t * 0.12;
    }
  });

  const cyanColor = isDark ? "#00f0ff" : "#0284c7";
  const violetColor = isDark ? "#8b5cf6" : "#7c3aed";

  return (
    <group ref={shapesRef}>
      {/* Cyan Wireframe Icosahedron */}
      <mesh position={[-2.5, 1.3, -0.8]} rotation={[0.4, 0.2, 0]}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color={cyanColor}
          wireframe
          transparent
          opacity={isDark ? 0.5 : 0.7}
          roughness={0.2}
          emissive={cyanColor}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Violet Torus Ring */}
      <mesh position={[2.6, 1.0, -0.5]} rotation={[Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[0.72, 0.08, 16, 48]} />
        <meshStandardMaterial
          color={violetColor}
          roughness={0.25}
          metalness={0.8}
          emissive={violetColor}
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Floating Emerald Octahedron */}
      <mesh position={[2.3, -1.3, 0.6]} rotation={[0.2, 0.5, 0]}>
        <octahedronGeometry args={[0.45]} />
        <meshStandardMaterial
          color={isDark ? "#10b981" : "#059669"}
          roughness={0.2}
          metalness={0.8}
          wireframe
          transparent
          opacity={isDark ? 0.6 : 0.8}
        />
      </mesh>
    </group>
  );
}

// Main 3D Composition
export default function HeroLaptopScene() {
  const { isDark } = useTheme();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      className="relative w-full h-[400px] sm:h-[460px] md:h-[520px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D Laptop with live syntax editor and floating geometries"
      role="img"
    >
      <Canvas
        camera={{ position: [0, 0.2, 4.4], fov: 45 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        {/* Responsive Lighting */}
        <ambientLight intensity={isDark ? 0.65 : 1.1} />

        <directionalLight
          position={[5, 6, 4]}
          intensity={isDark ? 1.2 : 1.8}
          color={isDark ? "#ffffff" : "#f8fafc"}
          castShadow
        />

        <pointLight
          position={[-4, 3, -2]}
          color={isDark ? "#00f0ff" : "#0284c7"}
          intensity={isDark ? 1.5 : 2.0}
        />

        <pointLight
          position={[4, -2, 2]}
          color={isDark ? "#8b5cf6" : "#7c3aed"}
          intensity={isDark ? 1.2 : 1.6}
        />

        {/* 3D Floating Dust Particles */}
        <ParticleField isDark={isDark} count={140} />

        {/* 3D Laptop with Code Screen */}
        <ProceduralLaptop isDark={isDark} prefersReducedMotion={prefersReducedMotion} />

        {/* Surrounding Abstract Shapes */}
        <AbstractGeometries isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
      </Canvas>
    </div>
  );
}
