import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Search, PenTool, Code, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the user, goal, and product flow.",
    icon: Search,
  },
  {
    number: "02",
    title: "Design",
    description:
      "Create clean UI structure, responsive layouts, and interaction logic.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Build",
    description:
      "Develop frontend, backend, database, APIs, and integrations.",
    icon: Code,
  },
  {
    number: "04",
    title: "Polish",
    description:
      "Improve motion, performance, accessibility, and final user experience.",
    icon: Sparkles,
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#11110f] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeader label="/PROCESS" className="mb-10 md:mb-14" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.58, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 grid gap-5 md:mb-16 lg:grid-cols-[minmax(0,0.75fr)_minmax(320px,0.55fr)] lg:items-end"
        >
          <h2 className="max-w-4xl text-4xl font-bold leading-tight text-[#f7f3ea] md:text-6xl">
            A workflow built around clarity before polish.
          </h2>
          <p className="text-pretty text-base leading-8 text-[#9a9386]">
            The process stays practical: understand the workflow, shape the
            interface, build the system, then refine the details users feel.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Progress line - desktop */}
          <div className="absolute bottom-0 left-[50%] top-0 hidden w-px -translate-x-1/2 bg-white/10 md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-[#d7ff62] to-[#ff7a3d]/40"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.number}
                step={step}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
  isInView,
}: {
  step: (typeof steps)[0];
  index: number;
  isInView: boolean;
}) {
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`relative md:grid md:grid-cols-2 md:gap-16 ${
        index > 0 ? "md:mt-16" : ""
      }`}
    >
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.48,
          delay: index * 0.08,
          ease: [0.23, 1, 0.32, 1],
        }}
        className={`${isLeft ? "md:pr-16" : "md:col-start-2 md:pl-16"}`}
      >
        <div className="group rounded-[8px] border border-white/10 bg-white/[0.035] p-6 transition-[border-color,background-color] duration-200 hover:border-white/18 hover:bg-white/[0.055] md:p-7">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-3xl font-bold text-[#d7ff62]/35 md:text-4xl">
              {step.number}
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.035] transition-colors duration-200 group-hover:bg-[#d7ff62]/10">
              <step.icon className="h-5 w-5 text-[#d7ff62]" />
            </div>
          </div>
          <h3 className="mb-2 text-xl font-bold text-[#f7f3ea] md:text-2xl">
            {step.title}
          </h3>
          <p className="text-sm leading-7 text-[#9a9386] md:text-base">
            {step.description}
          </p>
        </div>
      </motion.div>

      {/* Center dot - desktop */}
      <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.08 + 0.18, duration: 0.22 }}
          className="h-4 w-4 rounded-full border-4 border-[#11110f] bg-[#d7ff62]"
        />
      </div>
    </div>
  );
}
