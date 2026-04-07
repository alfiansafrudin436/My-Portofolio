"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center items-start py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-muted-foreground mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Available for new opportunities
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-balance max-w-5xl leading-tight">
          Crafting <span className="text-muted-foreground">digital</span>{" "}
          experiences that inspire.
        </h1>

        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          I'm a Senior Frontend Engineer with over 5 years of experience,
          focused on creating elegant, highly functional, and scalable web
          experiences.
        </p>

        <div className="mt-12 flex items-center gap-6">
          <a
            href="#work"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-black bg-white rounded-full overflow-hidden transition-transform active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
          >
            Contact me
          </a>
        </div>
      </motion.div>
    </section>
  );
}
