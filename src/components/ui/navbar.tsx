"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Shield, Menu, X, GitBranch, ExternalLink, FileText, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#education", label: "Education" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* ── scroll shadow & active-section tracking ── */
  useEffect(() => {
    setMounted(true);

    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // find which section is in view
      const ids = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveId(ids[i]);
          return;
        }
      }
      setActiveId("");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── smooth scroll helper ── */
  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* ── lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <>
      {/* ───────────── FIXED NAV BAR ───────────── */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-[9999]
          transition-all duration-300 ease-in-out
          ${scrolled
            ? isDark
              ? "bg-[#080d1a]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_40px_rgba(70,115,235,0.12)]"
              : "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-[0_4px_25px_rgba(0,0,0,0.06)]"
            : "bg-transparent border-b border-transparent"}
        `}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* ── Logo / Brand ── */}
            <button
              onClick={() => scrollTo("#")}
              className="flex items-center gap-2.5 group cursor-none select-none text-left"
              aria-label="Back to top"
            >
              <span className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-500 group-hover:bg-blue-500/20 group-hover:border-blue-400/50 transition-all duration-300">
                <Shield className="w-4 h-4" />
              </span>
              <span className={`font-black tracking-wider text-xl leading-none uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
                MOHAMMAD<span className="text-blue-500"> </span>REHAN
              </span>
            </button>

            {/* ── Desktop Nav Links ── */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const id = href.slice(1);
                const isActive = activeId === id;
                return (
                  <li key={href}>
                    <button
                      onClick={() => scrollTo(href)}
                      className={`
                        relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-none
                        ${isActive
                          ? isDark ? "text-white" : "text-blue-600"
                          : isDark ? "text-[#8a9cc4] hover:text-white" : "text-slate-600 hover:text-slate-950"}
                      `}
                    >
                      {isActive && (
                        <span className={`absolute inset-0 rounded-lg ${isDark ? "bg-blue-500/15 border border-blue-500/30" : "bg-blue-50 border border-blue-200"}`} />
                      )}
                      <span className="relative z-10">{label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* ── Right Controls: Theme Buttons + CTAs ── */}
            <div className="hidden md:flex items-center gap-3">
              {/* 2 Modes Button (Light & Dark) */}
              <div className={`flex items-center p-1 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"}`}>
                <button
                  onClick={() => setTheme("light")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-none ${!isDark
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-400 hover:text-white"
                    }`}
                  title="Light Mode"
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-none ${isDark
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                    }`}
                  title="Dark Mode"
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
              </div>

              {/* GitHub */}
              <a
                href="https://github.com/mohd-rehan13"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 cursor-none ${isDark
                  ? "text-[#8a9cc4] hover:text-white border-white/10 hover:border-blue-400/40 hover:bg-blue-500/10"
                  : "text-slate-600 hover:text-slate-900 border-slate-200 hover:border-blue-400 hover:bg-slate-50"
                  }`}
              >
                <GitBranch className="w-4 h-4 text-blue-500" />
                GitHub
              </a>

              {/* Resume */}
              <a
                href="https://drive.google.com/file/d/15IJakaGjz7NAZ0cXhL4y-lIMiNkvWu2G/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 border border-blue-500/50 hover:shadow-[0_0_20px_rgba(70,115,235,0.4)] transition-all duration-200 cursor-none"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            </div>

            {/* ── Mobile Menu Toggle ── */}
            <div className="flex md:hidden items-center gap-2">
              {/* Quick theme toggle on mobile */}
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={`p-2 rounded-lg border ${isDark ? "border-white/10 text-yellow-400" : "border-slate-200 text-slate-700"}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                className={`p-2 rounded-lg border cursor-none ${isDark
                  ? "border-white/10 text-[#8a9cc4] hover:text-white hover:border-blue-400/40"
                  : "border-slate-200 text-slate-600 hover:text-slate-900"
                  }`}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ───────────── MOBILE DRAWER ───────────── */}
      <div
        className={`
          fixed inset-0 z-[9998] md:hidden
          transition-all duration-300
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 backdrop-blur-sm ${isDark ? "bg-[#080d1a]/80" : "bg-slate-900/40"}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`
            absolute top-0 right-0 h-full w-[75vw] max-w-xs
            border-l shadow-[-20px_0_60px_rgba(0,0,0,0.4)]
            flex flex-col pt-20 pb-10 px-6
            transition-transform duration-300
            ${isDark ? "bg-[#080d1a] border-white/10" : "bg-white border-slate-200"}
            ${menuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Brand in drawer */}
          <div className="flex items-center gap-2.5 mb-6">
            <span className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-500">
              <Shield className="w-4 h-4" />
            </span>
            <span className={`font-black tracking-wider text-lg uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
              MOHAMMAD<span className="text-blue-500"> </span>REHAN
            </span>
          </div>

          {/* Mode Switcher in Drawer */}
          <div className="mb-6">
            <p className={`text-xs font-semibold mb-2 uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Appearance
            </p>
            <div className={`grid grid-cols-2 p-1 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"}`}>
              <button
                onClick={() => setTheme("light")}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${!isDark ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"
                  }`}
              >
                <Sun className="w-3.5 h-3.5" />
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${isDark ? "bg-blue-600 text-white shadow-sm" : "text-slate-600"
                  }`}
              >
                <Moon className="w-3.5 h-3.5" />
                Dark
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1 flex-1">
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.slice(1);
              const isActive = activeId === id;
              return (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-none
                    ${isActive
                      ? isDark
                        ? "text-white bg-blue-500/15 border border-blue-500/30"
                        : "text-blue-600 bg-blue-50 border border-blue-200"
                      : isDark
                        ? "text-[#8a9cc4] hover:text-white hover:bg-white/5 border border-transparent"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"}
                  `}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className={`flex flex-col gap-3 pt-6 border-t ${isDark ? "border-white/10" : "border-slate-200"}`}>
            <a
              href="https://github.com/mohd-rehan13"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-none ${isDark
                ? "text-[#8a9cc4] hover:text-white border-white/10"
                : "text-slate-700 hover:text-slate-950 border-slate-200"
                }`}
            >
              <GitBranch className="w-4 h-4 text-blue-500" />
              GitHub
            </a>
            <a
              href="https://drive.google.com/file/d/15IJakaGjz7NAZ0cXhL4y-lIMiNkvWu2G/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 border border-blue-500/50 transition-all duration-200 cursor-none"
            >
              <FileText className="w-4 h-4" />
              Resume
            </a>
          </div>
        </div>
      </div>

      {/* ── Spacer so content doesn't hide behind fixed nav ── */}
      <div className="h-16 md:h-[4.5rem]" />
    </>
  );
}
