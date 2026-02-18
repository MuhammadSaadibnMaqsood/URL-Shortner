"use client";
import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, TorusKnot } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// --- 3D Background: The "Connected Knot" ---
function AboutVisual() {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.z += 0.005;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <TorusKnot ref={meshRef} args={[10, 3, 200, 32]} scale={0.15}>
        <MeshDistortMaterial
          color="#6366f1"
          speed={2}
          distort={0.3}
          radius={1}
          opacity={0.15}
          transparent
        />
      </TorusKnot>
    </Float>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.from(".about-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });

      // Scroll Animation for Feature Cards
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".feature-grid",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "Ultra Speed",
      desc: "Our globally distributed edge network ensures redirects happen in milliseconds.",
      icon: "⚡",
    },
    {
      title: "Privacy First",
      desc: "We don't sell your data. We provide clean, safe, and anonymous link tracking.",
      icon: "🛡️",
    },
    {
      title: "Smart Insights",
      desc: "Get real-time analytics on who is clicking your links and from where.",
      icon: "📊",
    },
  ];

  return (
    <main ref={containerRef} className="relative min-h-screen bg-white pt-32 pb-20 overflow-hidden">
      
      {/* 3D Visual Background */}
      <div className="absolute top-0 right-0 w-full h-screen z-0 opacity-50 pointer-events-none">
        <Canvas>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          <AboutVisual />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section 1: Hero Header */}
        <div className="max-w-3xl mb-24">
          <span className="about-reveal inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Our Mission
          </span>
          <h1 className="about-reveal text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-8">
            Making the web <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              smaller, better, faster.
            </span>
          </h1>
          <p className="about-reveal text-xl text-slate-500 leading-relaxed font-medium">
            BitLinks was founded on a simple premise: a link should be more than just a destination. 
            It should be an experience. We build tools for creators, developers, and brands 
            to share their world with elegance.
          </p>
        </div>

        {/* Section 2: Feature Grid */}
        <div className="feature-grid grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="feature-card group bg-white p-10 rounded-[40px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{f.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Section 3: The "Big Quote" */}
        <div className="relative p-12 md:p-24 rounded-[60px] bg-slate-900 overflow-hidden text-center">
          <div className="absolute inset-0 opacity-20">
             {/* Subtle noise or texture could go here */}
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 leading-tight">
               "We believe that simplicity is the ultimate sophistication in the digital age."
             </h2>
             <Link 
               href="/generate" 
               className="inline-block px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-colors"
             >
               Start Your Journey
             </Link>
          </div>
        </div>

        {/* Floating Numbers Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-32 text-center border-t border-slate-100 pt-20">
          {[
            { label: "Links Created", value: "250M+" },
            { label: "Happy Users", value: "1.2M" },
            { label: "Daily Clicks", value: "15M" },
            { label: "Countries", value: "190+" },
          ].map((stat, i) => (
            <div key={i} className="about-reveal">
              <p className="text-4xl font-black text-slate-900 mb-2">{stat.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decorative Blob */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] -z-10" />
    </main>
  );
}