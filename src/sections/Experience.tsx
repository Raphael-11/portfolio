import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { experiences } from "@/data/cv";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.18 });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full border-t border-white/10 bg-[#11110f] py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <SectionHeader label="/EXPERIENCE" className="mb-10 md:mb-14" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.56, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 grid gap-5 md:mb-16 lg:grid-cols-[minmax(0,0.78fr)_minmax(320px,0.5fr)] lg:items-end"
        >
          <h2 className="max-w-4xl text-4xl font-bold leading-tight text-[#f7f3ea] md:text-6xl">
            Experience that already crosses clients, products, and live systems.
          </h2>
          <p className="text-pretty text-base leading-8 text-[#9a9386]">
            Internship work, freelance delivery, and university projects all
            point to the same profile: product-minded engineering with hands-on
            implementation across web, mobile, backend, and community systems.
          </p>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((item, index) => (
            <motion.article
              key={`${item.role}-${item.company}`}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.44,
                delay: index * 0.07,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="grid gap-6 rounded-[8px] border border-white/10 bg-white/[0.035] p-6 md:p-7 lg:grid-cols-[220px_minmax(0,1fr)]"
            >
              <div className="flex flex-col justify-between gap-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.03]">
                  <Briefcase className="h-5 w-5 text-[#d7ff62]" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase text-[#d7ff62]">
                    {item.period}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#c6bdab]">
                    {item.company}
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold leading-tight text-[#f7f3ea] md:text-3xl">
                      {item.role}
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[#9a9386] md:text-base">
                      {item.summary}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#6f6a60]" />
                </div>

                <div className="grid gap-3 border-t border-white/10 pt-5">
                  {item.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="grid gap-2 md:grid-cols-[18px_minmax(0,1fr)]"
                    >
                      <span className="font-mono text-xs text-[#d7ff62]">+</span>
                      <p className="text-sm leading-7 text-[#c6bdab]">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
