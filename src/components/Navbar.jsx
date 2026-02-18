"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    // GSAP Entrance Animation
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      });

      gsap.from(linksRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SHORTEN", href: "/generate" },
    { name: "ABOUT", href: "/about" },
  ];

  return (
    <div className="fixed top-0 w-full z-[100] px-4 py-4" ref={navRef}>
      <nav className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-[24px]">
        <div className="px-6 sm:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Area */}
            <div className="flex-shrink-0 group">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                    />
                  </svg>
                </div>
                <h1 className="text-slate-900 text-xl font-black tracking-tighter">
                  BIT<span className="text-blue-600">LINKS</span>
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    ref={(el) => (linksRef.current[idx] = el)}
                    className="relative px-5 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors duration-300 group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="https://github.com/MuhammadSaadibnMaqsood/URL-Shortner"
                className="p-2.5 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="/generate"
                className="bg-slate-900 text-white hover:bg-black px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-slate-200 active:scale-95"
              >
                TRY NOW
              </Link>
            </div>

            {/* Mobile Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-4 pt-2 pb-6 space-y-2 border-t border-slate-100 mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-base font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/generate"
              className="block w-full text-center bg-blue-600 text-white px-4 py-4 rounded-2xl font-bold shadow-lg shadow-blue-100"
              onClick={() => setIsOpen(false)}
            >
              TRY NOW
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
