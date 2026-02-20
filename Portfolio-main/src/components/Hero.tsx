"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Shuffle from "@/components/Shuffle";

export default function Hero() {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(false);
    }, 4500); // 3 seconds after video/animations start (approx)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden" id="home">
      {/* Autonomous Background Video */}
      <video
        src="/Landing.mp4"
        autoPlay
        loop
        muted
        playsInline
        onEnded={(e) => {
          const video = e.target as HTMLVideoElement;
          video.play().catch(() => { });
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay Content with Shuffle Animations and Fade Out */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showText ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center text-white mix-blend-difference"
      >
        <div className="text-center p-8 flex flex-col items-center gap-4">
          <Shuffle
            text="Meet Gohil."
            className="text-7xl md:text-9xl font-bold tracking-tighter font-playfair"
            duration={0.5}
            shuffleTimes={2}
          />
          <Shuffle
            text="Editor & Photographer"
            className="text-xl md:text-2xl font-light tracking-[0.2em] text-gray-400 font-outfit uppercase"
            duration={0.5}
            stagger={0.02}
            delay={0.5}
          />
        </div>
      </motion.div>
    </div>
  );
}
