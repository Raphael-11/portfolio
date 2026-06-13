import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { experiences } from "@/data/cv";

const cardStyles = [
  "rotate-[6deg] border border-[#d7ff62]/18 bg-[linear-gradient(145deg,rgba(215,255,98,0.12),rgba(17,17,15,0.97)_70%)] text-[#f7f3ea]",
  "rotate-0 border border-white/10 bg-[linear-gradient(145deg,rgba(247,243,234,0.07),rgba(17,17,15,0.97)_70%)] text-[#f7f3ea]",
  "-rotate-[6deg] border border-[#ff7a3d]/18 bg-[linear-gradient(145deg,rgba(255,122,61,0.12),rgba(17,17,15,0.97)_70%)] text-[#f7f3ea]",
];

export function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full border-t border-white/10 bg-[#020202] py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <SectionHeader label="/EXPERIENCE" className="mb-10 md:mb-14" />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.46fr)] lg:gap-12">
          <div className="grid gap-2">
            {experiences.map((item, index) => (
              <figure
                key={`${item.role}-${item.company}`}
                className="sticky top-0 h-screen grid place-content-center"
              >
                <article
                  className={`${
                    cardStyles[index % cardStyles.length]
                  } w-full max-w-[44rem] rounded-[24px] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-[18px] md:p-8`}
                >
                  <div className="grid gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-65">
                          {item.period}
                        </p>
                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] opacity-80">
                          {item.company}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur-md">
                        0{index + 1}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    <div>
                      <h3 className="max-w-[18ch] text-2xl font-semibold leading-[1.05] md:text-4xl">
                        {item.role}
                      </h3>
                      <p className="mt-4 max-w-[56ch] text-sm leading-7 opacity-80 md:text-base">
                        {item.summary}
                      </p>
                    </div>

                    <div className="grid gap-3 border-t border-white/10 pt-5">
                      {item.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="grid gap-2 md:grid-cols-[18px_minmax(0,1fr)]"
                        >
                          <span className="font-mono text-xs text-[#d7ff62]">+</span>
                          <p className="text-sm leading-7 md:text-base">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </figure>
            ))}
          </div>

          <div className="lg:sticky lg:top-0 lg:h-screen lg:grid lg:place-content-center">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[#9a9386]">
                What We Have Now
              </p>
              <h2 className="max-w-md text-4xl font-medium leading-[1.15] tracking-tight text-center text-[#f7f3ea] md:px-8 md:text-5xl lg:text-left">
                Experience across freelance delivery, internship execution, and
                real community operations.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
