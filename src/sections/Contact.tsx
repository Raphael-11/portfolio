import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Briefcase, Clock, Layers, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const contactDetails = [
  {
    label: "Email",
    value: "raef.lafi@gmail.com",
    href: "mailto:raef.lafi@gmail.com",
    icon: Mail,
  },
  {
    label: "Open To",
    value: "Internships, junior roles, freelance, collaboration",
    icon: Briefcase,
  },
  {
    label: "Best Fit",
    value: "Web apps, mobile flows, dashboards, APIs, FiveM systems",
    icon: Layers,
  },
  {
    label: "Working Style",
    value: "Fast prototypes, clean systems, careful polish",
    icon: Clock,
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#050504] py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <SectionHeader label="/CONTACT" className="mb-10 md:mb-14" />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.55fr)] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.64, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="max-w-5xl text-5xl font-extrabold leading-[0.98] text-[#f7f3ea] md:text-7xl lg:text-8xl">
              Let's build something{" "}
              <span className="font-display italic text-gradient-lime">
                finished.
              </span>
            </h2>

            <p className="mt-8 max-w-2xl text-pretty text-base leading-8 text-[#9a9386] md:text-lg md:leading-9">
              I’m open to opportunities where I can take responsibility for the
              interface, the implementation, and the final product feel across
              internships, entry-level software roles, and focused freelance
              work.
            </p>

            <a
              href="mailto:raef.lafi@gmail.com"
              data-cursor="copy"
              className="cursor-magnetic mt-8 inline-flex items-center gap-3 rounded-full bg-[#d7ff62] px-7 py-4 text-base font-bold text-[#050504] transition-[background-color,transform] duration-200 hover:bg-[#f7f3ea] active:scale-[0.98]"
            >
              Start a conversation
              <ArrowUpRight className="cursor-button-arrow h-5 w-5" />
            </a>
          </motion.div>

          <div className="grid gap-3">
            {contactDetails.map((detail, i) => {
              const Icon = detail.icon;
              const content = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div className="glass-chip flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] transition-colors duration-200 group-hover:bg-[#d7ff62]/10">
                      <Icon className="h-5 w-5 text-[#d7ff62]" />
                    </div>
                    {detail.href && (
                      <ArrowUpRight className="cursor-button-arrow h-4 w-4 text-[#6f6a60] transition-colors duration-200 group-hover:text-[#f7f3ea]" />
                    )}
                  </div>
                  <span className="mt-5 block font-mono text-xs uppercase text-[#6f6a60]">
                    {detail.label}
                  </span>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#f7f3ea]">
                    {detail.value}
                  </p>
                </>
              );

              const className =
                "glass-panel glass-hover group rounded-[8px] p-5 transition-[border-color,background-color,transform] duration-200";

              return detail.href ? (
                <motion.a
                  key={detail.label}
                  href={detail.href}
                  data-cursor="copy"
                  initial={{ opacity: 0, y: 22 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.38, delay: 0.14 + i * 0.05 }}
                  className={`${className} cursor-magnetic`}
                >
                  {content}
                </motion.a>
              ) : (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 22 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.38, delay: 0.14 + i * 0.05 }}
                  className={className}
                >
                  {content}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
