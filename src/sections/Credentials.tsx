import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, GraduationCap, ScrollText } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { credentialGroups } from "@/data/cv";

const icons = [GraduationCap, Award, ScrollText];

export function Credentials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.18 });

  return (
    <section
      id="credentials"
      ref={sectionRef}
      className="relative w-full bg-[#11110f] py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <SectionHeader label="/CREDENTIALS" className="mb-10 md:mb-14" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.56, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 grid gap-5 md:mb-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(320px,0.48fr)] lg:items-end"
        >
          <h2 className="max-w-4xl text-4xl font-bold leading-tight text-[#f7f3ea] md:text-6xl">
            Education status, recognition, and certifications in one place.
          </h2>
          <p className="text-pretty text-base leading-8 text-[#9a9386]">
            This turns the portfolio into a more complete CV view without
            inventing missing facts that were not provided in the original text.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {credentialGroups.map((group, index) => {
            const Icon = icons[index] ?? ScrollText;

            return (
              <motion.article
                key={group.label}
                initial={{ opacity: 0, y: 26 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.42,
                  delay: index * 0.06,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="rounded-[8px] border border-white/10 bg-white/[0.035] p-6 md:p-7"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.03]">
                  <Icon className="h-5 w-5 text-[#d7ff62]" />
                </div>
                <p className="font-mono text-xs uppercase text-[#d7ff62]">
                  {group.label}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-[#f7f3ea]">
                  {group.title}
                </h3>
                <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
                  {group.items.map((item) => (
                    <p key={item} className="text-sm leading-7 text-[#c6bdab]">
                      {item}
                    </p>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
