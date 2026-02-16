"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const LiquidSphere = () => {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial
          color="#1a1a1a"
          distort={0.4}
          speed={3}
          roughness={0.1}
          metalness={1}
        />
      </Sphere>
    </Float>
  );
};

export default function Hero() {
  return (
    <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <LiquidSphere />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 text-center px-6 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-liquid-silver to-white/20">
            9TH REALM
          </h1>
          <p className="text-neon-cyan text-sm md:text-base font-mono tracking-[0.4em] uppercase mb-12 opacity-80 hologram-text">
            Strategic Apex / Market Synergy
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
}
