"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LightRays from "./LightRays";

export default function Hero() {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(false);
    }, 2500); // Faster trigger (2.5 seconds)

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

      {/* Light Rays Overlay */}
      <div className="absolute inset-0 z-5 pointer-events-none opacity-40">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.5}
          lightSpread={0.8}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.05}
          className="custom-rays"
        />
      </div>

      {/* Overlay Content with Fade Out */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showText ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }} // Much faster fade (0.3s)
        className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center text-white mix-blend-difference"
      >
        <div className="text-center p-8 flex flex-col items-center gap-4">
          <h1 className="text-7xl md:text-[12rem] font-bold tracking-tighter font-bebas leading-[0.8]">
            Meet Gohil.
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-[0.3em] text-gray-400 font-outfit uppercase">
            Editor & Photographer
          </p>
        </div>
      </motion.div>
    </div>
  );
}
