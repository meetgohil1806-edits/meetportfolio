"use client";

import { useTransform, motion } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: any }) {
    // Opacity transforms
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);

    // Parallax Y movement
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.8], [50, -50]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center text-white mix-blend-difference">
            {/* Section 1 - Introduction */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex items-center justify-center p-8"
            >
                <div className="text-center">
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-4 font-playfair italic">
                        Meet Gohil.
                    </h1>
                    <p className="text-xl md:text-2xl font-light tracking-[0.2em] text-gray-400 font-outfit uppercase">
                        Editor & Photographer
                    </p>
                </div>
            </motion.div>

            {/* Section 2 - Roles */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex items-center justify-start p-8 md:p-24"
            >
                <div className="max-w-4xl">
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight font-outfit">
                        I am a <br />
                        <span className="text-zinc-500 font-playfair italic whitespace-nowrap">Photographer</span> <br />
                        <span className="text-white">&</span> <span className="text-zinc-500 font-playfair italic whitespace-nowrap">Videographer</span>.
                    </h2>
                </div>
            </motion.div>

            {/* Section 3 - Skills */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute inset-0 flex items-center justify-end p-8 md:p-24 text-right"
            >
                <div className="max-w-4xl">
                    <h2 className="text-6xl md:text-3xl font-bold leading-tight font-outfit">
                        Practised in <br />
                        <span className="text-zinc-500 font-playfair italic whitespace-nowrap">Photoshop</span>, <br />
                        <span className="text-zinc-400 font-playfair italic whitespace-nowrap">Capcut</span> <br />
                        <span className="text-white">&</span> <span className="text-zinc-300 font-playfair italic whitespace-nowrap">Premiere Pro</span>.
                    </h2>
                </div>
            </motion.div>
        </div>
    );
}
