"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const AccretionDisk = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create 5000 particles for the accretion disk
  const count = 5000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Distribution: closer to the center but with a hole in the middle
      const radius = 1.5 + Math.random() * 2.5; 
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 0.2; // Thin disk
      const z = Math.sin(angle) * radius;
      pos.set([x, y, z], i * 3);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Rotation speed
      pointsRef.current.rotation.y += 0.002;
      // Slight wobble
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group rotation={[Math.PI / 3.5, 0, 0]}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Event Horizon (The Black Core) */}
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Subtle Glow */}
      <mesh scale={1.45}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

export default function Hero() {
  return (
    <section className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#020205]">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <color attach="background" args={["#020205"]} />
          <AccretionDisk />
          <ambientLight intensity={0.2} />
        </Canvas>
      </div>

      <div className="relative z-10 text-center px-6 select-none pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20">
            9TH REALM
          </h1>
          <p className="text-neon-cyan text-[10px] md:text-xs font-mono tracking-[0.8em] uppercase mb-12 opacity-60 hologram-text">
            Institutional Strategic Management
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
}
