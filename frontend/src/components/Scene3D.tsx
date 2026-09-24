"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Scene3DProps {
  currentSection?: string;
}

export default function Scene3D({ currentSection = "hero" }: Scene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const currentSectionRef = useRef<string>(currentSection);

  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    // --- 2. Master 3D Group ---
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // --- 3. Cybernetic Neural AI Core (Procedural 3D Sculpture) ---
    // Outer Shell: Dual-layer wireframe + metallic faceted icosahedron
    const coreGroup = new THREE.Group();
    rootGroup.add(coreGroup);

    // A. Faceted Metallic Core Mesh
    const coreGeo = new THREE.IcosahedronGeometry(2.4, 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c0818,
      metalness: 0.95,
      roughness: 0.16,
      reflectivity: 0.95,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // B. Glowing Wireframe Cage (Electric Violet)
    const wireGeo = new THREE.IcosahedronGeometry(2.42, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // C. Inner Luminous Energy Sphere (Neon Violet & Indigo)
    const innerGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.8,
      roughness: 0.25,
      metalness: 0.8,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // --- 4. Gyroscopic Orbital Tech Rings (Electric Violet Aesthetic) ---
    const ringGroup = new THREE.Group();
    rootGroup.add(ringGroup);

    // Ring 1: Primary Equatorial Torus (Cyber Indigo)
    const ring1Geo = new THREE.TorusGeometry(3.6, 0.04, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.5,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.45;
    ringGroup.add(ring1);

    // Ring 2: Polar Tech Orbit (Electric Violet)
    const ring2Geo = new THREE.TorusGeometry(4.2, 0.03, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.4,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI * 0.35;
    ringGroup.add(ring2);

    // Ring 3: Tilted Outer Halo Ring (Neon Fuchsia)
    const ring3Geo = new THREE.TorusGeometry(4.8, 0.02, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      transparent: true,
      opacity: 0.45,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = -Math.PI * 0.25;
    ring3.rotation.z = Math.PI * 0.15;
    ringGroup.add(ring3);

    // Satellite Data Beads on Ring 1 (Cyber Amber Gold)
    const satelliteGroup = new THREE.Group();
    const beadGeo = new THREE.BoxGeometry(0.12, 0.24, 0.12);
    const beadMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.5,
    });
    const numBeads = 8;
    for (let i = 0; i < numBeads; i++) {
      const angle = (i / numBeads) * Math.PI * 2;
      const bead = new THREE.Mesh(beadGeo, beadMat);
      bead.position.set(Math.cos(angle) * 3.6, Math.sin(angle) * 3.6, 0);
      satelliteGroup.add(bead);
    }
    ring1.add(satelliteGroup);

    // --- 5. Swirling Neural Synapse Particle Field ---
    const particleCount = 1400;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const violetColor = new THREE.Color(0xa855f7);
    const fuchsiaColor = new THREE.Color(0xec4899);
    const amberColor = new THREE.Color(0xf59e0b);

    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution with dispersion
      const radius = 2.8 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      // Color gradient between violet, fuchsia, and amber
      const mixedColor = violetColor.clone();
      const rand = Math.random();
      if (rand < 0.45) {
        mixedColor.lerp(fuchsiaColor, Math.random());
      } else if (rand < 0.75) {
        mixedColor.lerp(amberColor, Math.random() * 0.7);
      }
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particlePoints);

    // --- 6. Lighting (Cinematic Multi-Angle Studio Setup) ---
    const ambientLight = new THREE.AmbientLight(0x0e0920, 1.8);
    scene.add(ambientLight);

    // Cursor Following Point Light (Electric Violet)
    const cursorPointLight = new THREE.PointLight(0xa855f7, 5, 25);
    cursorPointLight.position.set(2, 2, 6);
    scene.add(cursorPointLight);

    // Counter Accent Rim Light (Cyber Amber)
    const rimLight = new THREE.PointLight(0xf59e0b, 4, 30);
    rimLight.position.set(-6, -4, 4);
    scene.add(rimLight);

    // Top Key Light
    const topKeyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    topKeyLight.position.set(5, 10, 7);
    scene.add(topKeyLight);

    // --- 7. Mouse & Scroll Interaction State ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const scrollState = { progress: 0, targetProgress: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY || window.pageYOffset || 0;
      scrollState.targetProgress = maxScroll > 0 ? current / maxScroll : 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // Initial trigger
    handleScroll();

    // --- 8. Animation & Render Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    // Section 3D Transform Coordinates (Responsive for Kitanga-style staging)
    const getTargetTransform = (progress: number) => {
      const isMobile = window.innerWidth < 768;

      if (progress < 0.2) {
        // Hero: Prominent center-right (Kitanga split text staging)
        return {
          posX: isMobile ? 0 : 2.6,
          posY: isMobile ? 0.8 : 0,
          posZ: isMobile ? -2 : 0,
          rotX: 0.1,
          rotY: 0.2,
          scale: isMobile ? 0.75 : 1.0,
        };
      } else if (progress < 0.45) {
        // Work / Projects: Glides to the left side so project cards take center stage
        return {
          posX: isMobile ? 0 : -3.6,
          posY: isMobile ? -0.5 : 0.2,
          posZ: -1.2,
          rotX: 0.4,
          rotY: -0.6,
          scale: isMobile ? 0.7 : 0.9,
        };
      } else if (progress < 0.75) {
        // Experience & Skills: Moves to right side, tilts dynamically
        return {
          posX: isMobile ? 0 : 3.4,
          posY: -0.2,
          posZ: -0.8,
          rotX: -0.2,
          rotY: 0.8,
          scale: isMobile ? 0.75 : 1.05,
        };
      } else {
        // Contact: Centers and approaches camera
        return {
          posX: 0,
          posY: 0.8,
          posZ: isMobile ? -1 : 1.2,
          rotX: 0.15,
          rotY: 0,
          scale: isMobile ? 0.8 : 1.15,
        };
      }
    };

    const currentPos = new THREE.Vector3(2.6, 0, 0);
    const currentRot = new THREE.Vector2(0, 0);
    let currentScale = 1.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp for Mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Smooth Lerp for Scroll Progress
      scrollState.progress +=
        (scrollState.targetProgress - scrollState.progress) * 0.08;

      // Target transforms according to scroll
      const target = getTargetTransform(scrollState.progress);

      currentPos.x += (target.posX - currentPos.x) * 0.05;
      currentPos.y += (target.posY - currentPos.y) * 0.05;
      currentPos.z += (target.posZ - currentPos.z) * 0.05;
      currentScale += (target.scale - currentScale) * 0.05;

      // Apply transforms to master group
      rootGroup.position.copy(currentPos);
      rootGroup.scale.set(currentScale, currentScale, currentScale);

      // Mouse-reactive Rotation + Continuous ambient spin
      const targetRotY = elapsedTime * 0.25 + mouse.x * 0.85 + target.rotY;
      const targetRotX = mouse.y * 0.65 + target.rotX;

      currentRot.x += (targetRotX - currentRot.x) * 0.08;
      currentRot.y += (targetRotY - currentRot.y) * 0.08;

      rootGroup.rotation.y = currentRot.y;
      rootGroup.rotation.x = currentRot.x;

      // Inner Core Counter-Rotation & Pulse
      coreMesh.rotation.y = -elapsedTime * 0.3;
      coreMesh.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2;
      wireMesh.rotation.copy(coreMesh.rotation);

      // Subtle breathing scale on inner energy sphere
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
      innerMesh.scale.set(pulse, pulse, pulse);

      // Asynchronous Orbital Rings Spin
      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.x = elapsedTime * 0.35;
      ring3.rotation.y = -elapsedTime * 0.25;

      // Swirl Particle Field
      particlePoints.rotation.y = elapsedTime * 0.08;
      particlePoints.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;

      // Move Cursor Point Light in 3D Space
      cursorPointLight.position.x = mouse.x * 10 + currentPos.x;
      cursorPointLight.position.y = mouse.y * 8 + currentPos.y;
      cursorPointLight.position.z = 5;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      // Dispose geometries & materials
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      beadGeo.dispose();
      beadMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
