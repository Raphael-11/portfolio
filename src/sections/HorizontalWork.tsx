import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/SectionHeader";
import TextAnimation from "@/components/ui/scroll-text";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || window.innerWidth < 768) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const getScrollDistance = () =>
      Math.max(0, container.scrollWidth - section.clientWidth);

    const ctx = gsap.context(() => {
      gsap.to(container, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 0.85,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-cursor="drag"
      className="relative w-full overflow-hidden bg-[#050504]"
    >
      <div className="mx-auto max-w-7xl px-4 pb-4 pt-20 md:px-8 md:pb-6 md:pt-28 lg:px-12">
        <SectionHeader label="/GALLERY" className="mb-8 md:mb-10" />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(320px,0.5fr)] lg:items-end">
          <TextAnimation
            as="h2"
            text="A visual index of shipped thinking."
            lineAnime
            classname="max-w-4xl text-4xl font-bold leading-tight text-[#f7f3ea] md:text-6xl"
            variants={{
              hidden: { filter: "blur(8px)", opacity: 0, y: 24 },
              visible: {
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
                transition: { duration: 0.26 },
              },
            }}
          />
          <TextAnimation
            as="p"
            text="A quick scan of product surfaces, from internship systems to mobile flows and university software builds."
            lineAnime
            classname="text-pretty text-base leading-8 text-[#9a9386]"
            variants={{
              hidden: { filter: "blur(6px)", opacity: 0, y: 20 },
              visible: {
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
                transition: { duration: 0.22 },
              },
            }}
          />
        </div>
      </div>

      <div className="hidden overflow-hidden px-4 pb-12 md:block md:px-8 md:pb-16 lg:px-12" data-cursor="drag">
        <div
          ref={containerRef}
          data-cursor="drag"
          className="flex gap-5 pr-4 md:pr-8 lg:pr-12"
        >
          {projects.map((project) => (
            <article
              key={project.id}
              data-cursor="project"
              className="h-card group w-[min(78vw,520px)] shrink-0 overflow-hidden rounded-[8px] border border-white/10 bg-[#0c0c0a] cursor-project cursor-magnetic lg:w-[min(68vw,520px)]"
            >
              <div className="relative h-[300px] overflow-hidden lg:h-[360px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,4,0.02)_35%,rgba(5,5,4,0.84)_100%)]" />

                <div className="absolute left-4 right-4 top-4 flex items-center justify-between border-b border-white/15 pb-3 font-mono text-xs uppercase text-white/55">
                  <span>/{project.number}</span>
                  <span>{project.type}</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="mb-2 text-xl font-bold text-[#f7f3ea] transition-colors duration-200 group-hover:text-[#d7ff62] lg:text-2xl">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 font-mono text-xs text-[#c6bdab] backdrop-blur-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="space-y-4 px-4 pb-20 md:hidden">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04, duration: 0.36 }}
            className="overflow-hidden rounded-[8px] border border-white/10 bg-[#0c0c0a]"
          >
            <div className="relative h-[230px] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,4,0.03)_34%,rgba(5,5,4,0.84)_100%)]" />
              <span className="absolute left-4 top-4 font-mono text-xs uppercase text-white/55">
                /{project.number}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-[#f7f3ea]">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-[#9a9386]">{project.type}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
