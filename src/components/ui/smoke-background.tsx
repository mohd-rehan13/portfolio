"use client";

import { useEffect, useRef } from "react";

export function SmokeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let mouseX = W / 2;
    let mouseY = H / 2;
    let targetMouseX = W / 2;
    let targetMouseY = H / 2;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    // ── Richer, Volumetric Smoke & Nebula Orbs ──
    const smokeOrbs = [
      { x: W * 0.15, y: H * 0.15, r: 520, vx: 0.28, vy: 0.18, hue: 220, alpha: 0.14, phase: 0 },
      { x: W * 0.85, y: H * 0.25, r: 600, vx: -0.22, vy: 0.14, hue: 245, alpha: 0.13, phase: 1.1 },
      { x: W * 0.5, y: H * 0.5, r: 580, vx: 0.18, vy: -0.2, hue: 210, alpha: 0.15, phase: 2.3 },
      { x: W * 0.1, y: H * 0.8, r: 480, vx: 0.25, vy: -0.16, hue: 260, alpha: 0.12, phase: 3.5 },
      { x: W * 0.88, y: H * 0.85, r: 560, vx: -0.2, vy: -0.24, hue: 200, alpha: 0.14, phase: 4.7 },
      { x: W * 0.35, y: H * 0.95, r: 450, vx: 0.15, vy: 0.22, hue: 230, alpha: 0.13, phase: 5.2 },
      { x: W * 0.7, y: H * 0.08, r: 420, vx: -0.3, vy: 0.15, hue: 195, alpha: 0.12, phase: 5.9 },
      { x: W * 0.05, y: H * 0.45, r: 500, vx: 0.16, vy: 0.25, hue: 215, alpha: 0.14, phase: 0.6 },
    ];

    // ── Cyber Floating Dust & Connected Nodes ──
    const count = Math.min(85, Math.floor((W * H) / 14000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2.2 + 1,
      alpha: Math.random() * 0.6 + 0.25,
      pulseSpeed: Math.random() * 0.025 + 0.015,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    let raf: number;

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;

      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // ── 1. Draw Volumetric Moving Smoke Clouds ──
      smokeOrbs.forEach((orb) => {
        orb.x += orb.vx + Math.sin(frame * 0.002 + orb.phase) * 0.45;
        orb.y += orb.vy + Math.cos(frame * 0.003 + orb.phase) * 0.4;

        // Mouse displacement wave
        const dx = orb.x - mouseX;
        const dy = orb.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 450 && dist > 0) {
          orb.x += (dx / dist) * 0.5;
          orb.y += (dy / dist) * 0.5;
        }

        // Seamless screen wrap
        if (orb.x < -orb.r) orb.x = W + orb.r;
        if (orb.x > W + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = H + orb.r;
        if (orb.y > H + orb.r) orb.y = -orb.r;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, `hsla(${orb.hue}, 90%, 65%, ${orb.alpha})`);
        grad.addColorStop(0.4, `hsla(${orb.hue + 15}, 80%, 50%, ${orb.alpha * 0.65})`);
        grad.addColorStop(0.75, `hsla(${orb.hue - 15}, 70%, 35%, ${orb.alpha * 0.25})`);
        grad.addColorStop(1, `hsla(${orb.hue}, 60%, 20%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── 2. Draw Floating Connected Cyber Particles ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        const pulse = (Math.sin(frame * p.pulseSpeed + p.pulsePhase) + 1) / 2;
        const curAlpha = p.alpha * (0.65 + 0.35 * pulse);

        // Particle with glowing halo
        ctx.fillStyle = `rgba(130, 190, 255, ${curAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Node network interconnects
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxDist = 140;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.22 * pulse;
            ctx.strokeStyle = `rgba(90, 160, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Magnetic laser tether to cursor
        const mouseDist = Math.hypot(p.x - mouseX, p.y - mouseY);
        if (mouseDist < 180) {
          const tetherAlpha = (1 - mouseDist / 180) * 0.45;
          ctx.strokeStyle = `rgba(160, 215, 255, ${tetherAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1, mixBlendMode: "screen", opacity: 0.95 }}
    />
  );
}
