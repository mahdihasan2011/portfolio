"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Procedural Screen Texture displaying realistic code syntax
function useCodeScreenTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Charcoal editor background
    ctx.fillStyle = "#0c1017";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Editor Header / Tabs bar
    ctx.fillStyle = "#161b24";
    ctx.fillRect(0, 0, canvas.width, 48);

    // Window controls
    ctx.fillStyle = "#ff5f56";
    ctx.beginPath();
    ctx.arc(28, 24, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffbd2e";
    ctx.beginPath();
    ctx.arc(52, 24, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#27c93f";
    ctx.beginPath();
    ctx.arc(76, 24, 7, 0, Math.PI * 2);
    ctx.fill();

    // Tab title
    ctx.fillStyle = "#00f0ff";
    ctx.font = "bold 18px monospace";
    ctx.fillText("Portfolio.tsx", 110, 30);

    // Code lines with syntax highlighting
    const codeLines = [
      { text: "import { NextPage } from 'next';", color: "#8b5cf6" },
      { text: "import { ReactThreeFiber } from '@react-three/fiber';", color: "#8b5cf6" },
      { text: "", color: "" },
      { text: "interface EngineerProfile {", color: "#00f0ff" },
      { text: "  name: string;", color: "#e2e8f0" },
      { text: "  specialization: 'React' | 'Next.js' | 'Node.js';", color: "#a5b4fc" },
      { text: "  experienceYears: number;", color: "#e2e8f0" },
      { text: "  scalableSolutions: boolean;", color: "#e2e8f0" },
      { text: "}", color: "#00f0ff" },
      { text: "", color: "" },
      { text: "export const MahdiHasan: EngineerProfile = {", color: "#38bdf8" },
      { text: "  name: 'Mahdi Hasan',", color: "#34d399" },
      { text: "  specialization: 'Next.js',", color: "#34d399" },
      { text: "  experienceYears: 8,", color: "#f59e0b" },
      { text: "  scalableSolutions: true", color: "#f43f5e" },
      { text: "};", color: "#38bdf8" },
      { text: "", color: "" },
      { text: "// Compiling high-throughput digital experiences...", color: "#64748b" },
      { text: "buildOptimalApplication({ speed: 'instant', ux: 'flawless' });", color: "#00f0ff" },
    ];

    ctx.font = "20px 'Fira Code', 'Courier New', monospace";
    let y = 85;
    codeLines.forEach((line, index) => {
      // Line numbers
      ctx.fillStyle = "#334155";
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
  }, []);
}

// Procedural Laptop 3D Mesh
function ProceduralLaptop({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const screenTexture = useCodeScreenTexture();

  // Gentle float & pointer tracking
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!prefersReducedMotion) {
      // Floating bobbing motion
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.15;

      // Subtle pointer tracking with damping
      const targetRotY = (state.pointer.x * 0.35) - 0.25;
      const targetRotX = (-state.pointer.y * 0.2) + 0.1;

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
    <group ref={groupRef} position={[0, -0.4, 0]} rotation={[0.1, -0.25, 0]}>
      {/* 1. Laptop Base / Chassis */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[3.4, 0.14, 2.3]} />
        <meshStandardMaterial
          color="#161b22"
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Keyboard Area Indentation */}
      <mesh position={[0, 0.08, -0.2]}>
        <boxGeometry args={[3.0, 0.02, 1.4]} />
        <meshStandardMaterial
          color="#0d1117"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.08, 0.72]}>
        <boxGeometry args={[1.1, 0.02, 0.65]} />
        <meshStandardMaterial
          color="#1f242c"
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* Laptop Screen Hinge */}
      <group position={[0, 0.08, -1.15]} rotation={[-Math.PI / 8, 0, 0]}>
        {/* Screen Lid Backing */}
        <mesh position={[0, 1.15, 0]} castShadow>
          <boxGeometry args={[3.4, 2.3, 0.08]} />
          <meshStandardMaterial
            color="#0d1117"
            roughness={0.3}
            metalness={0.85}
          />
        </mesh>

        {/* Screen Display Bezel */}
        <mesh position={[0, 1.15, 0.045]}>
          <boxGeometry args={[3.24, 2.14, 0.01]} />
          <meshBasicMaterial color="#05070a" />
        </mesh>

        {/* Emissive Code Display Canvas */}
        <mesh position={[0, 1.15, 0.052]}>
          <planeGeometry args={[3.08, 1.98]} />
          {screenTexture ? (
            <meshBasicMaterial map={screenTexture} toneMapped={false} />
          ) : (
            <meshBasicMaterial color="#0c1017" />
          )}
        </mesh>

        {/* Screen Ambient Light Bleed */}
        <pointLight position={[0, 1.15, 0.8]} color="#00f0ff" intensity={0.4} distance={3} />
      </group>
    </group>
  );
}

// Surrounding Abstract Geometric Elements
function AbstractGeometries({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const shapesRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (shapesRef.current && !prefersReducedMotion) {
      const t = state.clock.getElapsedTime();
      shapesRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={shapesRef}>
      {/* Cyan Wireframe Icosahedron */}
      <mesh position={[-2.4, 1.4, -0.8]} rotation={[0.4, 0.2, 0]}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.45}
          roughness={0.2}
          emissive="#00f0ff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Violet Torus Ring */}
      <mesh position={[2.5, 1.1, -0.5]} rotation={[Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[0.7, 0.08, 16, 48]} />
        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.3}
          metalness={0.7}
          emissive="#8b5cf6"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Floating Emerald Octahedron */}
      <mesh position={[2.2, -1.2, 0.6]} rotation={[0.2, 0.5, 0]}>
        <octahedronGeometry args={[0.45]} />
        <meshStandardMaterial
          color="#10b981"
          wireframe
          transparent
          opacity={0.35}
          roughness={0.2}
        />
      </mesh>

      {/* Subtle Floating Orbiting Data Spheres */}
      <mesh position={[-1.9, -1.1, 0.8]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color="#00f0ff"
          roughness={0.2}
          metalness={0.8}
          emissive="#00f0ff"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh position={[0.2, 2.1, -1.2]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial
          color="#a78bfa"
          roughness={0.2}
          metalness={0.8}
          emissive="#a78bfa"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

// Scene Root with Lightings & Camera
export default function HeroLaptopScene() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] lg:h-[540px]">
      <Canvas
        camera={{ position: [0, 0.3, 5.2], fov: 45 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        {/* Soft Ambient Light */}
        <ambientLight intensity={0.8} color="#cbd5e1" />

        {/* Key Light */}
        <directionalLight
          position={[4, 5, 4]}
          intensity={1.2}
          color="#f8fafc"
        />

        {/* Cyan Accent Fill Light */}
        <pointLight position={[-4, 2, 2]} color="#00f0ff" intensity={1.4} distance={10} />

        {/* Violet Accent Rim Light */}
        <pointLight position={[3, -2, -2]} color="#8b5cf6" intensity={1.6} distance={10} />

        {/* Procedural Laptop & Geometric Companions */}
        <ProceduralLaptop prefersReducedMotion={prefersReducedMotion} />
        <AbstractGeometries prefersReducedMotion={prefersReducedMotion} />
      </Canvas>
    </div>
  );
}
