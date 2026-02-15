"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const skills = [
  { category: "Photography", items: ["DSLR", "Mirrorless", "Portrait", "Landscape", "Product", "Street"] },
  { category: "Editing", items: ["Adobe Photoshop", "Adobe Lightroom", "Adobe Premiere Pro", "Adobe AfterEffects", "DaVinci Resolve", "3D Blender", "Alight Motion"] },
  { category: "Videography", items: ["DSLR", "Mirrorless", "Drone", "Action Camera", "360 Camera", "Gimbal"] },
];

export default function Skills() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const lightX = useSpring(mouseX, springConfig);
  const lightY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX;
      const moveY = clientY;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-12 overflow-hidden" id="skills">
      {/* Background Ambience - Increased Opacity and Adjusted Positions */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[800px] h-[800px] bg-purple-600/25 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[800px] h-[800px] bg-blue-600/25 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-900/15 rounded-full blur-[180px]" />
      </div>

      {/* Interactive Cursor Light */}
      <motion.div
        style={{
          left: lightX,
          top: lightY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[100px] pointer-events-none z-10"
      />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Software <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            I have a strong command of various software tools and technologies, enabling me to handle diverse creative and technical tasks with precision and efficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{
                y: -15,
                scale: 1.03,
                boxShadow: "0 30px 60px rgba(0,0,0,0.6), 0 0 20px rgba(59,130,246,0.1)",
                borderColor: "rgba(255,255,255,0.3)"
              }}
              className="group relative p-8 rounded-[40px] bg-white/[0.05] border border-white/10 backdrop-blur-2xl transition-all duration-500 shadow-2xl overflow-hidden"
            >
              {/* Glossy Overlay Highlight */}
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-linear-to-br from-white/10 to-transparent rotate-45 pointer-events-none group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-1000" />

              <h3 className="text-2xl font-bold text-blue-300 mb-6 uppercase tracking-widest relative z-10">{group.category}</h3>
              <div className="flex flex-wrap gap-3 relative z-10">
                {group.items.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.3)" }}
                    className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 border border-white/10 transition-all cursor-default backdrop-blur-md shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
