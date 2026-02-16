"use client";

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const AccretionDisk = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();
  
  const count = 6000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.4 + Math.random() * 2.8; 
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 0.15;
      const z = Math.sin(angle) * radius;
      pos.set([x, y, z], i * 3);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0015;
    }
    
    if (groupRef.current) {
      // Subtle lean towards mouse
      const targetX = (mouse.x * viewport.width) / 15;
      const targetY = (mouse.y * viewport.height) / 15;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.PI / 3.5 - targetY * 0.2, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX * 0.2, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.012}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Event Horizon */}
      <mesh>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Distortion Glow */}
      <mesh scale={1.4}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.05} side={THREE.BackSide} />
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
