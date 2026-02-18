"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import gsap from "gsap";

// --- 3D Background Component ---
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1.5, 100, 100]} scale={1.8}>
            <MeshDistortMaterial
              color="#3b82f6"
              speed={3}
              distort={0.4}
              radius={1}
              opacity={0.1}
              transparent
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}

export default function Shorten() {
  const [url, setUrl] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Refs for GSAP
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      const tl = gsap.timeline();
      tl.from(headerRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power4.out",
      }).from(
        cardRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
        },
        "-=0.4",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    gsap.to(".copy-btn", { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1 });
    setTimeout(() => setCopied(false), 2000);
  };

  function generate() {
    if (!url) return;
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ url: url, shortUrl: shortURL });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then(() => {
        setShortURL("");
        setUrl("");
        setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shortURL}`);
        setLoading(false);
      })
      .catch((error) => console.error(error));

    // API Call Mock (Replace with your actual fetch)

    // Animate result entrance
    gsap.fromTo(
      ".result-box",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
    );
  }

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen  pt-32 bg-slate-50 flex items-center justify-center px-4 overflow-hidden"
    >
      {/* Three.js Background */}
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-xl">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100">
            Next Gen Shortener
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">
            Shrink <span className="text-blue-600">Links.</span>
            <br />
            Expand <span className="text-indigo-500">Reach.</span>
          </h1>
          <p className="text-slate-500 text-lg">
            The ultra-minimalist way to share the web.
          </p>
        </div>

        {/* Form Card */}
        <div
          ref={cardRef}
          className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[32px] p-8 md:p-10"
        >
          <div className="space-y-5">
            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                Target Destination
              </label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                placeholder="https://your-long-link.com"
                className="w-full bg-slate-100/50 border border-transparent focus:border-blue-500/20 focus:bg-white text-slate-800 px-6 py-4 rounded-2xl outline-none transition-all placeholder:text-slate-400 shadow-inner"
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                Branded Alias
              </label>
              <div className="flex items-center gap-0">
                <div className="bg-slate-200/50 text-slate-500 px-5 py-4 rounded-l-2xl text-sm font-semibold border-r border-slate-200">
                  bit.ly/
                </div>
                <input
                  value={shortURL}
                  onChange={(e) => setShortURL(e.target.value)}
                  type="text"
                  placeholder="custom-name"
                  className="w-full bg-slate-100/50 border border-transparent focus:border-blue-500/20 focus:bg-white text-slate-800 px-6 py-4 rounded-r-2xl outline-none transition-all placeholder:text-slate-400 shadow-inner"
                />
              </div>
            </div>

            <button
              onClick={generate}
              disabled={loading}
              className="w-full relative py-5 bg-slate-900 text-white rounded-2xl font-bold overflow-hidden transition-all hover:bg-black active:scale-[0.98] shadow-2xl shadow-slate-300"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </span>
              ) : (
                "Generate Magic Link"
              )}
            </button>
          </div>

          {/* Result Box */}
          {generated && (
            <div className="result-box mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 overflow-hidden text-center md:text-left">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                    Success! Your link is ready
                  </p>
                  <Link
                    href={generated}
                    target="_blank"
                    className="text-blue-700 font-bold text-xl truncate block"
                  >
                    {generated}
                  </Link>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="copy-btn whitespace-nowrap bg-white text-blue-600 border border-blue-200 px-8 py-3 rounded-xl font-bold shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  {copied ? "Copied! ✨" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex justify-center items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.3H3.73L12 5.45z" />
            </svg>
            SECURE
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            FAST
          </div>
        </div>
      </div>
    </main>
  );
}
