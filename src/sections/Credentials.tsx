import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { credentialGroups } from "@/data/cv";

export function Credentials() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="credentials"
      className="relative w-full bg-[#11110f] py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <SectionHeader label="/CREDENTIALS" className="mb-10 md:mb-14" />

        <div className="mb-12 grid gap-5 md:mb-16 lg:grid-cols-[minmax(0,0.78fr)_minmax(320px,0.45fr)] lg:items-end">
          <h2 className="max-w-5xl text-4xl font-bold leading-[0.98] text-[#f7f3ea] md:text-6xl">
            Proof presented as
            <span className="font-display italic text-gradient-lime">
              {" "}
              expandable text,
            </span>{" "}
            not blocks.
          </h2>
          <p className="text-pretty text-base leading-8 text-[#9a9386]">
            Education, recognition, and certifications now read like a strong
            editorial index instead of a set of UI cards.
          </p>
        </div>

        <div className="border-t border-white/10">
          {credentialGroups.map((group, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={group.label} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="grid w-full grid-cols-[72px_minmax(0,1fr)_36px] items-start gap-4 py-6 text-left transition-colors duration-200 hover:text-[#f7f3ea] md:grid-cols-[96px_minmax(0,1fr)_44px] md:py-8"
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-2xl leading-none text-[#f7f3ea] md:text-4xl">
                    /0{index + 1}
                  </span>

                  <div className="pr-2">
                    <h3 className="text-3xl font-bold uppercase leading-none tracking-tight text-[#f7f3ea] md:text-5xl">
                      {group.label}
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-6 pt-5 md:grid-cols-[minmax(220px,0.34fr)_minmax(0,1fr)] md:pt-6">
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9a9386]">
                                Focus
                              </p>
                              <p className="mt-3 text-xl font-semibold leading-tight text-[#f7f3ea] md:text-2xl">
                                {group.title}
                              </p>
                            </div>

                            <div className="space-y-3">
                              {group.items.map((item, itemIndex) => (
                                <div
                                  key={item}
                                  className="grid gap-2 md:grid-cols-[26px_minmax(0,1fr)]"
                                >
                                  <span className="font-mono text-xs text-[#d7ff62]">
                                    0{itemIndex + 1}
                                  </span>
                                  <p className="max-w-3xl text-base leading-8 text-[#d7d0c4]">
                                    {item}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                    className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#f7f3ea] md:h-10 md:w-10"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
