"use client";

import { motion } from "framer-motion";

const words = [
  { text: "MOHAMMAD", letters: "MOHAMMAD".split("") },
  { text: "REHAN", letters: "REHAN".split("") },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const letterAnim = {
  hidden: { y: 60, opacity: 0, rotateX: -90, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function AnimatedHeroName() {
  return (
    <div className="select-none py-1 font-sans" style={{ perspective: "800px" }}>
      <motion.div
        className="flex flex-wrap items-center gap-x-4 gap-y-1"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, wIdx) => (
          <span key={wIdx} className="inline-flex whitespace-nowrap">
            {word.letters.map((char, lIdx) => (
              <motion.span
                key={lIdx}
                variants={letterAnim}
                whileHover={{ y: -8, scale: 1.15, filter: "drop-shadow(0 0 25px rgba(147,197,253,0.9))" }}
                className="inline-block font-black tracking-tighter bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent cursor-default transition-all duration-300"
                style={{
                  fontSize: "clamp(2.6rem, 4.8vw, 4.6rem)",
                  lineHeight: 1.02,
                  transformOrigin: "bottom center",
                  filter: "drop-shadow(0px 0px 20px rgba(255,255,255,0.25)) drop-shadow(0px 0px 40px rgba(70,115,235,0.3))",
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.div>

      {/* Subtitle line */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-3 mt-4 flex-wrap"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,1)] animate-pulse" />
        <p className="text-blue-400 text-xs md:text-sm font-bold tracking-[0.25em] uppercase">
          Network Security · SOC Analyst
        </p>
      </motion.div>

      {/* Animated underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
        className="h-[2.5px] w-full max-w-md bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent mt-5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"
      />
    </div>
  );
}
