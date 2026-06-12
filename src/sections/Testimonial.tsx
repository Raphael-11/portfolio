import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#11110f] py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <SectionHeader label="/FEEDBACK" className="mb-10 md:mb-14" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.58, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 className="max-w-4xl text-4xl font-bold leading-tight text-[#f7f3ea] md:text-6xl">
            Feedback focused on execution, thinking, and finish.
          </h2>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.58, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          className="border-y border-white/10 py-8 md:py-12"
        >
          <Quote className="mb-6 h-9 w-9 text-[#d7ff62]/45" />

          <blockquote className="max-w-5xl text-pretty text-2xl font-semibold leading-snug text-[#f7f3ea] md:text-4xl md:leading-tight">
            "Strong technical execution, clear product thinking, and a polished
            final presentation."
          </blockquote>

          <figcaption className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-semibold text-[#c6bdab]">
              Academic project feedback
            </span>
            <span className="font-mono text-xs uppercase text-[#6f6a60]">
              ISS project context
            </span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
