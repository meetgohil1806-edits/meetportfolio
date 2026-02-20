"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const TESTIMONIALS = [
  {
    quote: "One of the best editors I’ve worked with. Fast delivery, creative ideas, and extremely clean editing. ",
    name: "Swapnil",
    role: "Editor",
    initials: "SW",
  },
  {
    quote: "Never fails to deliver fasinating animations and visuals.",
    name: "Jenil Joshi",
    role: "Freelancer",
    initials: "JJ",
  },
  {
    quote: "Perfect pacing and clean cuts ",
    name: "Ayesha Mehta",
    role: "socail media manager at nykaa",
    initials: "AM",
  },
  {
    quote: "Meet your editing helps in winning our short film festival",
    name: "Driti Shinde",
    role: "Actress-Choreographer",
    initials: "DS",
  },
  {
    quote: "Plays role of Leader doing Team managment and delivering projects on time ",
    name: "Pooja Mishra",
    role: "Joint Secretary- CIIE",
    initials: "PM",
  },
  {
    quote: "What I love most is how you always make the person the main character. Every edit feels personal, like the frame is built around the soul of the moment.",
    name: "Manjit Bag",
    role: "Company Secretary & LLB",
    initials: "MB",
  }
];

export default function Testimonials() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", role: "", quote: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setSubmitStatus("success");
      setFormState({ name: "", role: "", quote: "" });
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus("idle");
      }, 2000);
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative z-20 bg-charcoal-black py-32 overflow-hidden" id="testimonials">
      {/* Background Ambience - Different position for variety */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 mb-16 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Testimonials</span>
        </motion.h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Feedback from clients and collaborators I've had the pleasure of working with.
        </p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all text-sm font-medium backdrop-blur-sm"
        >
          Write a Review
        </motion.button>
      </div>

      <div className="relative w-full overflow-hidden mask-linear-fade">
        {/* Mask gradient for fade effect on edges */}
        <div className="absolute top-0 left-0 w-32 h-full z-20 bg-linear-to-r from-jet-black to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-full z-20 bg-linear-to-l from-jet-black to-transparent" />

        <div className="flex w-max">
          <motion.div
            className="flex gap-8 px-4"
            animate={{ x: "-50%" }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((item, index) => (
              <div
                key={index}
                className="w-[350px] md:w-[450px] p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shrink-0"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{item.name}</h4>
                    <p className="text-sm text-gray-400">{item.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center px-4 h-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-[-50%] left-[-50%] w-full h-full bg-blue-500/10 blur-[100px] pointer-events-none" />
              <div className="absolute bottom-[-50%] right-[-50%] w-full h-full bg-purple-500/10 blur-[100px] pointer-events-none" />

              <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Submit a Testimonial</h3>
              <p className="text-gray-400 mb-6 relative z-10">Your feedback helps me improve and grow. Thank you!</p>

              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Role / Company</label>
                  <input
                    type="text"
                    required
                    value={formState.role}
                    onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Testimonial</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.quote}
                    onChange={(e) => setFormState({ ...formState, quote: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Sending..." : submitStatus === "success" ? "Sent!" : submitStatus === "error" ? "Retry" : "Submit"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
