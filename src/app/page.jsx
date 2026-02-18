"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { motion } from "framer-motion";

// --- 3D Scene: The "Core" of BitLinks ---
function HeroVisual() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) * 0.2;
    meshRef.current.rotation.y = Math.sin(t / 4) * 0.2;
  });

  return (
    <group>
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.4}>
          <MeshDistortMaterial
            color="#3b82f6"
            speed={4}
            distort={0.3}
            radius={1}
          />
        </Sphere>
      </Float>
      {/* Small floating particles around the sphere */}
      {[...Array(20)].map((_, i) => (
        <Float key={i} speed={Math.random() * 10} position={[Math.random() * 8 - 4, Math.random() * 8 - 4, Math.random() * 4 - 2]}>
          <mesh>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#818cf8" emissive="#3b82f6" emissiveIntensity={2} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text stagger reveal
      gsap.from(".reveal", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5,
      });

      // Floating image parallax
      gsap.to(imageRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-white overflow-hidden pt-20">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
          <HeroVisual />
        </Canvas>
      </div>

      <section className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] max-w-7xl mx-auto items-center px-6">
        {/* Left Content */}
        <div className="flex flex-col space-y-8 py-12">
         

          <div className="space-y-4">
            <h1 className="reveal text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Bigger Impact.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
                Smaller Links.
              </span>
            </h1>
            <p className="reveal text-xl text-slate-500 font-medium max-w-lg leading-relaxed">
              Experience the world's most <span className="text-slate-900 underline decoration-blue-500 decoration-2">straightforward</span> link management tool. Designed for speed, built for scale.
            </p>
          </div>

          <div className="reveal flex flex-wrap gap-5 pt-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/generate" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-black transition-all inline-block">
                Start Shortening — Free
              </Link>
            </motion.div>
            
        
          </div>

          {/* Stat Cards */}
          <div className="reveal grid grid-cols-3 gap-8 pt-12 border-t border-slate-100">
            <div>
              <p className="text-3xl font-black text-slate-900">10M+</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Links</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">99.9%</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Uptime</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">24/7</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Support</p>
            </div>
          </div>
        </div>

        {/* Right Content: The Interactive Card */}
        <div className="relative hidden lg:flex justify-center items-center">
          <motion.div 
            initial={{ rotate: -5, y: 20, opacity: 0 }}
            animate={{ rotate: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative z-20 w-[450px] aspect-[4/5] bg-white/40 backdrop-blur-3xl border border-white p-2 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group"
          >
            <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
               <Image
                src="/vector.avif"
                fill
                alt="URL Shortener"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
              
              {/* Floating Tooltip Meta */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                       BIT
                    </div>
                    <div>
                       <p className="text-sm font-black text-slate-900">bitlinks.co/xyz-123</p>
                       <p className="text-xs text-slate-400">Redirecting to destination...</p>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative background circle */}
          <div className="absolute w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-12 bg-slate-900 animate-pulse" />
      </div>
    </main>
  );
}