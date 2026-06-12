import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  size?: "large" | "medium" | "small";
}

export function ProjectCard({
  project,
  index,
  size = "medium",
}: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });
  const [isHovered, setIsHovered] = useState(false);
  const isLarge = size === "large";
  const storyItems = [
    { label: "Problem", value: project.problem },
    { label: "Solution", value: project.solution },
    { label: "Impact", value: project.impact },
  ].filter((item): item is { label: string; value: string } =>
    Boolean(item.value)
  );

  const sizeClasses = {
    large: "md:col-span-12",
    medium: "md:col-span-6",
    small: "md:col-span-4",
  };

  const imageHeight = {
    large: "min-h-[310px] md:min-h-[560px]",
    medium: "h-[280px] md:h-[340px]",
    small: "h-[250px] md:h-[290px]",
  };

  return (
    <motion.article
      ref={ref}
      data-cursor="project"
      initial={{ opacity: 0, y: 34 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
      transition={{
        duration: 0.52,
        delay: index * 0.06,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{ y: -4 }}
      className={`${sizeClasses[size]} group cursor-magnetic cursor-project`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`h-full overflow-hidden rounded-[8px] border border-white/10 bg-[#0c0c0a] transition-[border-color,background-color,box-shadow] duration-200 group-hover:border-white/20 group-hover:bg-[#11110f] ${
          isLarge
            ? "md:grid md:grid-cols-[minmax(0,1.12fr)_minmax(340px,0.88fr)]"
            : "flex flex-col"
        }`}
      >
        <div className={`relative overflow-hidden ${imageHeight[size]}`}>
          <motion.img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
            animate={{ scale: isHovered ? 1.035 : 1 }}
            transition={{ duration: 0.48, ease: [0.23, 1, 0.32, 1] }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,4,0)_38%,rgba(5,5,4,0.82)_100%)]" />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1.5 font-mono text-xs uppercase text-[#f7f3ea] backdrop-blur-md">
              Case {project.number}
            </span>
            {project.highlight && (
              <span className="max-w-[54vw] truncate rounded-full bg-[#d7ff62] px-3 py-1.5 text-xs font-bold text-[#050504] md:max-w-[260px]">
                {project.highlight}
              </span>
            )}
          </div>
        </div>

        <div
          className={`flex flex-1 flex-col ${
            isLarge ? "p-6 md:p-8 lg:p-10" : "p-5 md:p-6"
          }`}
        >
          <div className="mb-5 flex items-start justify-between gap-5">
            <div>
              <span className="mb-2 block font-mono text-xs uppercase text-[#9a9386]">
                {project.type}
              </span>
              <h3
                className={`font-bold leading-tight text-[#f7f3ea] transition-colors duration-200 group-hover:text-[#d7ff62] ${
                  isLarge ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"
                }`}
              >
                {project.title}
              </h3>
            </div>
            <motion.div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.035]"
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            >
              <ArrowUpRight className="cursor-button-arrow h-4 w-4 text-[#f7f3ea]" />
            </motion.div>
          </div>

          <p
            className={`text-pretty leading-7 text-[#9a9386] ${
              isLarge ? "mb-7 max-w-xl text-base" : "mb-5 text-sm"
            }`}
          >
            {project.description}
          </p>

          {isLarge && (
            <div className="mb-8 divide-y divide-white/10 border-y border-white/10">
              {storyItems.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-2 py-4 md:grid-cols-[90px_minmax(0,1fr)]"
                >
                  <span className="font-mono text-xs uppercase text-[#d7ff62]">
                    {item.label}
                  </span>
                  <p className="text-sm leading-7 text-[#c6bdab]">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto flex flex-wrap gap-2">
            {project.stack.slice(0, isLarge ? 6 : 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-xs text-[#9a9386]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
