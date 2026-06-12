import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const caseNotes = [
  {
    label: "Problem",
    text: "Internship and PFE workflows were split across people, documents, and disconnected communication.",
  },
  {
    label: "System",
    text: "Role-based dashboards, document flows, supervisor coordination, and AI-assisted features.",
  },
  {
    label: "Result",
    text: "Recognized as Best ISS Project of the Year.",
  },
];

export function AwardSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.18 });
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [28, -28]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#050504] py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <SectionHeader label="/AWARD" className="mb-10 md:mb-14" />

        <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.55fr)] lg:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.58, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-4xl text-4xl font-bold leading-tight text-[#f7f3ea] md:text-6xl"
          >
            A serious product build with award-level proof.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="text-pretty text-base leading-8 text-[#9a9386]"
          >
            Orange ISS Portal is the anchor case study: a complete workflow
            platform for academic internship and PFE management.
          </motion.p>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 38 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.68, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
          className="grid overflow-hidden border-y border-white/10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
        >
          <div className="order-2 flex flex-col justify-center py-8 lg:order-1 lg:pr-12">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#d7ff62]/25 bg-[#d7ff62]/10 px-4 py-2">
              <Award className="h-4 w-4 text-[#d7ff62]" />
              <span className="font-mono text-xs font-semibold uppercase text-[#d7ff62]">
                Best ISS Project of the Year
              </span>
            </div>

            <h3 className="mb-4 text-3xl font-bold leading-tight text-[#f7f3ea] md:text-5xl">
              Orange ISS Portal
            </h3>
            <p className="mb-8 max-w-xl text-lg leading-8 text-[#c6bdab]">
              An AI-powered internship and PFE management system for students,
              supervisors, companies, and administrators.
            </p>

            <div className="mb-8 divide-y divide-white/10 border-y border-white/10">
              {caseNotes.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.22 + index * 0.06, duration: 0.36 }}
                  className="grid gap-2 py-4 md:grid-cols-[110px_minmax(0,1fr)]"
                >
                  <span className="font-mono text-xs uppercase text-[#d7ff62]">
                    {item.label}
                  </span>
                  <p className="text-sm leading-7 text-[#9a9386]">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {["React", "NestJS", "MongoDB", "AI features", "Dashboards", "Role-based access"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-xs text-[#9a9386]"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            <a
              href="#work"
              className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#d7ff62] transition-[color,transform] duration-200 hover:text-[#f7f3ea] active:scale-[0.98]"
            >
              See the full project set
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div
            ref={imageRef}
            className="relative order-1 min-h-[310px] overflow-hidden border-b border-white/10 lg:order-2 lg:min-h-[620px] lg:border-b-0 lg:border-l"
          >
            <motion.img
              style={{ y: shouldReduceMotion ? 0 : imageY }}
              src="/projects/orange-iss.jpg"
              alt="Orange ISS Portal dashboard"
              className="absolute inset-0 h-[112%] w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,4,0.04),rgba(5,5,4,0.72))] lg:bg-[linear-gradient(90deg,rgba(5,5,4,0.28),rgba(5,5,4,0.04))]" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border-t border-white/15 pt-3 font-mono text-xs uppercase text-white/55">
              <span>Case 01</span>
              <span>ISS Portal</span>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
