import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full border-t border-white/10 bg-[#11110f] py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <SectionHeader label="/WORK" className="mb-10 md:mb-14" />

        <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(300px,0.45fr)] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.58, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="mb-4 font-mono text-xs uppercase text-[#9a9386]">
              Selected systems / 01-06
            </p>
            <h2 className="max-w-4xl text-4xl font-bold leading-tight text-[#f7f3ea] md:text-6xl">
              Projects ordered by proof, complexity, and finish.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="text-pretty text-base leading-8 text-[#9a9386]"
          >
            Web platforms, mobile apps, backend systems, and university builds
            that show Raef's range across product thinking and implementation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {featured && (
            <ProjectCard project={featured} index={0} size="large" />
          )}

          {others.slice(0, 2).map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i + 1}
              size="medium"
            />
          ))}

          {others.slice(2).map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i + 3}
              size="small"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
