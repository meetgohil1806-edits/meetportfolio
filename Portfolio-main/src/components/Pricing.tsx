"use client";

import { motion } from "framer-motion";

const PACKAGES = [
    {
        title: "Photography",
        description: "Professional coverage for events, portraits, and brands.",
        price: "Starting at ₹4,000",
        features: [
            "High-Res Edited Images",
            "Portrait & Candid Shots",
            "Color Correction & Retouching",
            "Online Gallery Delivery",
        ],
        gradient: "from-blue-500/20 to-cyan-500/20",
        border: "group-hover:border-blue-500/50",
    },
    {
        title: "Videography",
        description: "Cinematic storytelling for reels, events, and shorts.",
        price: "Starting at ₹6,000",
        features: [
            "4K Video Recording",
            "Cinematic Angles & Movement",
            "Raw Footage Available",
        ],
        gradient: "from-purple-500/20 to-pink-500/20",
        border: "group-hover:border-purple-500/50",
    },
    {
        title: "Video Editing",
        description: "Turning raw footage into engaging, polished content.",
        price: "Starting at ₹3,500",
        features: [
            "Reels ",
            "Color Grading & Sound Design",
            "Motion Graphics & Titles",
            "Fast Turnaround Time",

        ],
        gradient: "from-orange-500/20 to-red-500/20",
        border: "group-hover:border-orange-500/50",
    },
];

export default function Pricing() {
    return (
        <section className="relative z-20 bg-[#0a0a0a] py-32 px-4 md:px-12 overflow-hidden" id="pricing">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/05 rounded-full blur-[120px]" />
                <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-600/05 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Services & <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Pricing</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Transparent pricing for high-quality creative services. tailored to your needs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PACKAGES.map((pkg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 ${pkg.border}`}
                        >
                            {/* Subtle Gradient Background */}
                            <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${pkg.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-2xl font-bold text-white mb-2">{pkg.title}</h3>
                                <p className="text-gray-400 text-sm mb-6 min-h-[40px]">{pkg.description}</p>

                                <div className="text-3xl font-bold text-white mb-8">
                                    {pkg.price}
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-gray-300 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-3" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/5 text-white font-medium transition-colors">
                                    Book Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
