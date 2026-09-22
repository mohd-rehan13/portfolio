"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedHero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="z-10 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto text-center"
      >
        <motion.div variants={item} className="mb-6 inline-flex items-center rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 text-sm font-medium text-slate-300 backdrop-blur-3xl">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
          Available for new opportunities
        </motion.div>

        <motion.h1 
          variants={item}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
        >
          Crafting Digital <br className="hidden md:block" />
          <span className="text-blue-500 bg-none bg-clip-border">Experiences.</span>
        </motion.h1>

        <motion.p 
          variants={item}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12"
        >
          I am a developer and designer passionate about building scalable, beautiful, and highly functional web applications.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            View My Work
          </button>
          <button className="px-8 py-3 rounded-full font-medium bg-white text-black hover:bg-slate-200 transition">
            Contact Me
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
