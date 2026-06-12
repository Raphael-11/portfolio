import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { capabilities } from "@/data/capabilities";

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardsRef, { once: true, amount: 0.15 });

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative w-full bg-[#11110f] py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeader label="/CAPABILITIES" className="mb-10 md:mb-14" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.58, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 grid gap-5 md:mb-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(320px,0.5fr)] lg:items-end"
        >
          <h2 className="max-w-4xl text-4xl font-bold leading-tight text-[#f7f3ea] md:text-6xl">
            Capabilities that map to real product work.
          </h2>
          <p className="text-pretty text-base leading-8 text-[#9a9386]">
            Raef's toolkit is strongest when interface, backend, and workflow
            logic need to meet in one coherent product.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.42,
                delay: i * 0.06,
                ease: [0.23, 1, 0.32, 1],
              }}
              whileHover={{ y: -4 }}
              className={`glass glow-border group cursor-default rounded-[8px] p-6 transition-[border-color,background-color,transform] duration-200 md:p-7 ${
                i === 0 ? "lg:col-span-2" : ""
              }`}
            >
              {/* Icon */}
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.035] transition-colors duration-200 group-hover:bg-[#d7ff62]/10">
                <cap.icon className="h-5 w-5 text-[#d7ff62]" />
              </div>

              {/* Title */}
              <h3 className="mb-3 text-lg font-bold text-[#f7f3ea] md:text-xl">
                {cap.title}
              </h3>

              {/* Description */}
              <p className="mb-5 text-sm leading-7 text-[#9a9386]">
                {cap.description}
              </p>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-2">
                {cap.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-xs text-[#6f6a60] transition-colors duration-200 group-hover:text-[#c6bdab]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
