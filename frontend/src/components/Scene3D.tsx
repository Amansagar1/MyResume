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
    const coreGeo = new THREE.TetrahedronGeometry(3.2, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x002266, emissive: 0x000511, metalness: 0.9, roughness: 0.3, iridescence: 0.5, iridescenceIOR: 1.5, clearcoat: 0.5, flatShading: true, opacity: 0.85, transparent: true });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // B. Glowing Wireframe Cage (Electric red)
    const wireGeo = new THREE.TetrahedronGeometry(3.3, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff, wireframe: true, transparent: true, opacity: 0.8,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // C. Inner Luminous Energy Sphere (Neon red & red)
    const innerGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0044ff, emissive: 0x0022cc,
      emissiveIntensity: 0.8,
      roughness: 0.25,
      metalness: 0.8,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // --- 4. Gyroscopic Orbital Tech Rings (Electric red Aesthetic) ---
    const ringGroup = new THREE.Group();
    rootGroup.add(ringGroup);

    // Ring 1: Primary Equatorial Torus (Cyber red)
    const ring1Geo = new THREE.TorusGeometry(3.6, 0.02, 4, 4);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xffffff, metalness: 1.0, roughness: 0.2, emissive: 0x001133,
      emissiveIntensity: 0.5,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.45;
    // ringGroup.add(ring1);

    // Ring 2: Polar Tech Orbit (Electric red)
    const ring2Geo = new THREE.TorusGeometry(4.2, 0.02, 4, 4);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xcccccc, metalness: 1.0, roughness: 0.3, emissive: 0x001133,
      emissiveIntensity: 0.4,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI * 0.35;
    // ringGroup.add(ring2);

    // Ring 3: Tilted Outer Halo Ring (Neon red)
    
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
    });
    
    
    
    

    // Satellite Data Beads on Ring 1 (Cyber Amber Gold)
    const satelliteGroup = new THREE.Group();
    const beadGeo = new THREE.BoxGeometry(0.12, 0.24, 0.12);
    const beadMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
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

    const redColor = new THREE.Color(0xffffff);
    const redColor2 = new THREE.Color(0xcccccc);
    const amberColor = new THREE.Color(0x888888);

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

      // Color gradient between red, red2, and amber
      const mixedColor = redColor.clone();
      const rand = Math.random();
      if (rand < 0.45) {
        mixedColor.lerp(redColor2, Math.random());
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

    
    // --- Floating Shards Array ---
    const shardGroup = new THREE.Group();
    const shards = [];
    const shardGeo = new THREE.TetrahedronGeometry(0.15, 0);
    const shardMat = new THREE.MeshPhysicalMaterial({
      color: 0x0033aa,
      emissive: 0x001144,
      metalness: 0.9,
      roughness: 0.2,
      iridescence: 0.8,
      iridescenceIOR: 1.5,
      transmission: 0.2,
      opacity: 0.8,
      transparent: true
    });

    for (let i = 0; i < 25; i++) {
      const shard = new THREE.Mesh(shardGeo, shardMat);
      // Random position in a sphere radius 6 to 12
      const radius = 5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      shard.position.x = radius * Math.sin(phi) * Math.cos(theta);
      shard.position.y = radius * Math.sin(phi) * Math.sin(theta);
      shard.position.z = radius * Math.cos(phi);
      
      shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      
      // Store random spin speeds
      shard.userData = {
        spinX: (Math.random() - 0.5) * 2.0,
        spinY: (Math.random() - 0.5) * 2.0,
        spinZ: (Math.random() - 0.5) * 2.0,
      };
      
      shardGroup.add(shard);
      shards.push(shard);
    }
    // rootGroup.add(shardGroup);

    
    // --- Massive Background Torus Knot ---
    const knotGeo = new THREE.TorusKnotGeometry(8, 0.2, 128, 16);
    const knotMat = new THREE.MeshBasicMaterial({
      color: 0x0044ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const backgroundKnot = new THREE.Mesh(knotGeo, knotMat);
    backgroundKnot.position.set(0, 0, -15); // Deep in the background
    scene.add(backgroundKnot);

    // --- 6. Lighting (Cinematic Multi-Angle Studio Setup) ---
    const ambientLight = new THREE.AmbientLight(0x002266, 2.0);
    scene.add(ambientLight);

    // Cursor Following Point Light (Electric red)
    const cursorPointLight = new THREE.PointLight(0x00aaff, 3.0, 25);
    cursorPointLight.position.set(2, 2, 6);
    scene.add(cursorPointLight);

    // Counter Accent Rim Light (Cyber Amber)
    const rimLight = new THREE.PointLight(0x0044ff, 3.5, 30);
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
    const startTime = performance.now();

    // Section 3D Transform Coordinates (Responsive for Kitanga-style staging)
    const getTargetTransform = (progress: number) => {
      const isMobile = window.innerWidth < 768;

      if (progress < 0.2) {
        // Hero: Prominent center-right (Kitanga split text staging)
        return {
          posX: 0,
          posY: 0,
          posZ: isMobile ? -3 : 2,
          rotX: 0.1,
          rotY: 0.2,
          scale: isMobile ? 0.8 : 1.3,
        };
      } else if (progress < 0.45) {
        // Work / Projects: Glides to the left side so project cards take center stage
        return {
          posX: isMobile ? 0 : -4.0,
          posY: isMobile ? -0.5 : 0.5,
          posZ: -1.0,
          rotX: 1.2,
          rotY: -1.5,
          scale: isMobile ? 0.9 : 1.6,
        };
      } else if (progress < 0.75) {
        // Experience & Skills: Moves to right side, tilts dynamically
        return {
          posX: isMobile ? 0 : 4.0,
          posY: -0.2,
          posZ: 0.5,
          rotX: -0.8,
          rotY: 2.2,
          scale: isMobile ? 0.9 : 1.7,
        };
      } else {
        // Contact: Centers and approaches camera
        return {
          posX: 0,
          posY: 0,
          posZ: isMobile ? -1 : 3.5,
          rotX: 3.14,
          rotY: 0,
          scale: isMobile ? 1.0 : 2.0,
        };
      }
    };

    const currentPos = new THREE.Vector3(2.6, 0, 0);
    const currentRot = new THREE.Vector2(0, 0);
    let currentScale = 1.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) / 1000;

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

      // --- GLITCH EFFECT ---
      if (Math.random() > 0.98) {
        currentScale *= (1 + (Math.random() - 0.5) * 0.1);
        wireMesh.visible = Math.random() > 0.5;
        currentPos.x += (Math.random() - 0.5) * 0.2;
      } else {
        wireMesh.visible = true;
      }
      
      // Apply transforms to master group
      rootGroup.position.copy(currentPos);
      rootGroup.scale.set(currentScale, currentScale, currentScale);

      // Mouse-reactive Rotation + Continuous ambient spin
      const targetRotY = elapsedTime * 0.5 + mouse.x * 0.85 + target.rotY;
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
      const pulse = 1 + Math.sin(elapsedTime * 2.0) * 0.15;
      innerMesh.scale.set(pulse, pulse, pulse);

      // Asynchronous Orbital Rings Spin
      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.x = elapsedTime * 0.35;
      

      
      // Animate Shards
      shardGroup.rotation.y = elapsedTime * 0.1;
      shardGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.2;
      
      shards.forEach((shard, i) => {
        shard.rotation.x += shard.userData.spinX * 0.02;
        shard.rotation.y += shard.userData.spinY * 0.02;
        shard.rotation.z += shard.userData.spinZ * 0.02;
        
        // Glitch some shards
        if (Math.random() > 0.995) {
            shard.scale.setScalar(Math.random() * 2 + 0.1);
            shard.material.wireframe = Math.random() > 0.5;
        } else {
            shard.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
      });

      
      // Animate Background Knot
      backgroundKnot.rotation.z = elapsedTime * 0.05;
      backgroundKnot.rotation.y = elapsedTime * 0.1;
      backgroundKnot.rotation.x = Math.sin(elapsedTime * 0.05) * 0.2;

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
      knotGeo.dispose();
      knotMat.dispose();
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
