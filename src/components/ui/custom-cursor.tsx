"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "link" | "button" | "text" | "card";

export function CustomCursor() {
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobX = mouseX;
    let blobY = mouseY;
    let velX = 0;
    let velY = 0;
    let prevX = mouseX;
    let prevY = mouseY;
    let raf: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const tick = () => {
      // Calculate velocity
      velX = mouseX - prevX;
      velY = mouseY - prevY;
      prevX = mouseX;
      prevY = mouseY;

      const speed = Math.sqrt(velX * velX + velY * velY);
      const angle = Math.atan2(velY, velX) * (180 / Math.PI);

      // Smooth lag follower
      blobX += (mouseX - blobX) * 0.16;
      blobY += (mouseY - blobY) * 0.16;

      // Morphing squash & stretch based on velocity
      const stretch = Math.min(1 + speed * 0.025, 1.8);
      const squash = Math.max(1 - speed * 0.012, 0.65);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${blobX}px, ${blobY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${stretch}, ${squash})`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest("a") || target.tagName === "A") {
        setMode("link");
        setLabel("View ↗");
      } else if (target.closest("button") || target.tagName === "BUTTON") {
        setMode("button");
        setLabel("Select");
      } else if (target.closest("[data-tilt]") || target.closest(".glass")) {
        setMode("card");
        setLabel("");
      } else if (["H1", "H2", "H3", "P", "SPAN"].includes(target.tagName)) {
        setMode("text");
        setLabel("");
      } else {
        setMode("default");
        setLabel("");
      }
    };

    const handleMouseOut = () => {
      setMode("default");
      setLabel("");
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  // Morphing styling
  const getMorphStyles = () => {
    if (isClicking) {
      return "w-8 h-8 rounded-full bg-blue-500/40 border border-blue-400 scale-90";
    }
    switch (mode) {
      case "link":
        return "w-16 h-16 rounded-3xl bg-blue-500/20 border border-blue-400 backdrop-blur-sm shadow-[0_0_25px_rgba(59,130,246,0.6)]";
      case "button":
        return "w-14 h-14 rounded-2xl bg-cyan-400/20 border border-cyan-300 backdrop-blur-sm shadow-[0_0_25px_rgba(34,211,238,0.6)]";
      case "text":
        return "w-20 h-20 rounded-full border border-white/30 bg-white/5 backdrop-blur-[2px]";
      case "card":
        return "w-12 h-12 rounded-2xl border border-blue-400/50 bg-blue-500/10";
      default:
        return "w-9 h-9 rounded-full border border-blue-400/60 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]";
    }
  };

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[10001] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] transition-opacity"
        style={{ willChange: "transform" }}
      />

      {/* Fluid Morphing Outer Shell */}
      <div
        ref={blobRef}
        className={`pointer-events-none fixed top-0 left-0 z-[10000] flex items-center justify-center transition-all duration-300 ease-out ${getMorphStyles()}`}
        style={{ willChange: "transform" }}
      >
        {label && (
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-200 pointer-events-none select-none">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
