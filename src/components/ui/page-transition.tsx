"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ReactNode, useRef, useState, MouseEvent } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade" | "scale";
}

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 origin-left z-[10000] shadow-[0_0_12px_rgba(56,189,248,0.8)]"
      style={{ scaleX }}
    />
  );
}

export function PageTransition({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: PageTransitionProps) {
  const variants = {
    up: {
      hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
    left: {
      hidden: { opacity: 0, x: -60, filter: "blur(6px)" },
      visible: { opacity: 1, x: 0, filter: "blur(0px)" },
    },
    right: {
      hidden: { opacity: 0, x: 60, filter: "blur(6px)" },
      visible: { opacity: 1, x: 0, filter: "blur(0px)" },
    },
    fade: {
      hidden: { opacity: 0, scale: 0.95, filter: "blur(6px)" },
      visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9, y: 30 },
      visible: { opacity: 1, scale: 1, y: 0 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      variants={variants[direction]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function InteractiveCard({
  children,
  className = "",
  glowColor = "rgba(70, 140, 245, 0.15)",
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -7;
    const rY = ((x - centerX) / centerX) * 7;
    setRotateX(rX);
    setRotateY(rY);
    setSpotlightPos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{ perspective: "1000px" }}
      className="h-full w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
        className={`relative overflow-hidden transition-shadow duration-300 ${className}`}
      >
        {/* Cursor tracking spotlight highlight */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${glowColor}, transparent 70%)`,
            }}
          />
        )}
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  );
}
