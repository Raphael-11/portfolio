import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { stackGroups, type StackItem } from "@/data/stack";

function MatrixItem({ item, index }: { item: StackItem; index: number }) {
  const [displayText, setDisplayText] = useState(item.name);
  const hasAnimatedRef = useRef(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.5 });
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        item.name
          .split("")
          .map((_char, i) => {
            if (i < iteration) return item.name[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 0.5;

      if (iteration >= item.name.length) {
        clearInterval(interval);
        setDisplayText(item.name);
      }
    }, 34);

    return () => clearInterval(interval);
  }, [isInView, item.name]);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -14 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.035, duration: 0.32 }}
      className="group flex cursor-default items-center justify-between gap-4 border-b border-white/5 py-3 transition-colors duration-200 hover:border-white/12 md:py-4"
    >
      <span className="font-mono text-sm text-[#e7dfcf] transition-colors duration-200 group-hover:text-[#d7ff62] md:text-base">
        {displayText}
      </span>
      <span className="hidden max-w-[42%] truncate text-right text-xs text-[#6f6a60] transition-colors duration-200 group-hover:text-[#9a9386] sm:inline">
        {item.description}
      </span>
    </motion.div>
  );
}

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  // Marquee items - all tools
  const marqueeItems = stackGroups.flatMap((g) => g.items.map((i) => i.name));

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative w-full bg-[#050504] py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeader label="/STACK" className="mb-10 md:mb-14" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.58, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 grid gap-5 md:mb-16 lg:grid-cols-[minmax(0,0.75fr)_minmax(320px,0.55fr)] lg:items-end"
        >
          <h2 className="max-w-4xl text-4xl font-bold leading-tight text-[#f7f3ea] md:text-6xl">
            Tools selected for speed, clarity, and product fit.
          </h2>
          <p className="text-pretty text-base leading-8 text-[#9a9386]">
            The stack is broad enough to ship complete systems and focused
            enough to stay practical.
          </p>
        </motion.div>

        {/* Infinite Marquee */}
        <div className="relative mb-12 overflow-clip border-y border-white/10 py-6 md:mb-16">
          <div className="absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-[#050504] to-transparent" />
          <div className="absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-[#050504] to-transparent" />

          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={shouldReduceMotion ? { x: 0 } : { x: [0, -50 * marqueeItems.length] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 26,
                ease: "linear",
              },
            }}
          >
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
              (item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="select-none text-4xl font-bold text-white/[0.045] md:text-6xl"
                >
                  {item}
                </span>
              )
            )}
          </motion.div>
        </div>

        {/* Stack Groups */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {stackGroups.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.42,
                delay: groupIndex * 0.06,
              }}
            >
              <h3 className="mb-4 font-mono text-xs uppercase text-[#d7ff62]">
                {group.label}
              </h3>
              <div>
                {group.items.map((item, i) => (
                  <MatrixItem key={item.name} item={item} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
