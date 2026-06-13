import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";

import ImageMouseTrail from "@/components/mousetrail";

const heroEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wordmark = ["RAEF", "LAFFI"];
const trailImages = [
  "/projects/orange-iss.jpg",
  "/projects/fiesta.jpg",
  "/projects/notyourbasicclothes.jpg",
  "/projects/arkan.jpg",
  "/projects/webank.jpg",
  "/projects/tonights-movie.jpg",
];

export function Hero() {
  const reducedMotion = useReducedMotion() ?? false;
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const update = () => setCompact(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const content = useMemo(
    () => (
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1800px] flex-col px-4 pb-8 pt-20 md:px-8 md:pb-10 md:pt-24 lg:px-12">
        <div className="flex flex-1 flex-col justify-between">
          <div className="pt-8 md:pt-14">
            <motion.div
              initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.55, ease: heroEase }}
              className="mb-6 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#c7beb0] md:text-xs"
            >
              <span>Creative Developer / UI UX / Frontend</span>
              <span className="hidden md:inline text-[#9a9386]">Portfolio / 2026</span>
            </motion.div>

            <div className="space-y-[-0.12em]">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: reducedMotion ? 0 : "105%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reducedMotion ? 0.25 : 0.95,
                    delay: 0,
                    ease: heroEase,
                  }}
                  className="text-center text-[4.8rem] font-extrabold uppercase leading-[0.8] tracking-[-0.1em] text-[#f7f3ea] sm:text-[6.5rem] md:text-[9rem] lg:text-[12rem] xl:text-[15rem] 2xl:text-[18rem] [font-family:var(--font-hero-sans)]"
                >
                  {wordmark[0]}
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: reducedMotion ? 0 : "105%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reducedMotion ? 0.25 : 0.95,
                    delay: 0.08,
                    ease: heroEase,
                  }}
                  className="text-center text-[5rem] font-semibold uppercase italic leading-[0.8] tracking-[-0.08em] text-[#d7ff62] sm:text-[6.6rem] md:text-[8.1rem] lg:text-[10.2rem] xl:text-[12rem] [font-family:var(--font-hero-serif)]"
                  style={{
                    textShadow:
                      "0 0 26px rgba(215,255,98,0.08), 0 1px 0 rgba(215,255,98,0.16)",
                  }}
                >
                  {wordmark[1]}
                </motion.h1>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0.2 : 0.5,
                delay: 0.28,
                ease: heroEase,
              }}
              className="mt-4 flex justify-end"
            >
              <div className="max-w-[22rem] text-right">
                <p className="font-sans text-base font-medium tracking-[-0.03em] text-[#f3efe8] sm:text-lg md:text-2xl">
                  Building refined digital experiences.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0.2 : 0.58,
              delay: 0.36,
              ease: heroEase,
            }}
            className="mt-10 grid gap-5 border-t border-white/10 pt-6 md:mt-16 md:grid-cols-[220px_minmax(280px,1fr)_minmax(260px,420px)_minmax(260px,420px)] md:items-end"
          >
            <div className="flex items-start gap-4">
              <span className="mt-1 h-4 w-px bg-[#d7ff62]/40" />
              <div>
                <p className="font-display text-2xl font-bold uppercase leading-none text-[#f7f3ea] md:text-3xl">
                  Scroll
                </p>
                <p className="font-display text-2xl font-bold uppercase leading-none text-[#f7f3ea] md:text-3xl">
                  To Explore
                </p>
              </div>
            </div>

            <p className="max-w-md font-mono text-[11px] uppercase leading-6 tracking-[0.1em] text-[#d7cfbf] md:text-xs">
              A custom portfolio system focused on product surfaces, frontend
              craft, and polished interactive builds.
            </p>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              data-cursor="button"
              className="group flex items-center overflow-hidden border border-[#ff7a3d]/30 bg-[#ff7a3d] text-[#050504] transition-colors duration-200 hover:bg-[#ff9366]"
            >
              <span className="flex h-[62px] w-[62px] items-center justify-center border-r border-black/20">
                <Github className="h-5 w-5" />
              </span>
              <span className="flex-1 px-6 text-center font-mono text-xs font-bold uppercase tracking-[0.14em]">
                Documentation
              </span>
            </a>

            <a
              href="#work"
              data-cursor="button"
              className="group flex items-center overflow-hidden border border-[#d7ff62]/28 bg-[#d7ff62] text-[#050504] transition-colors duration-200 hover:bg-[#e4ff8e]"
            >
              <span className="flex h-[62px] w-[62px] items-center justify-center border-r border-black/20">
                <ArrowRight className="h-5 w-5" />
              </span>
              <span className="flex-1 px-6 text-center font-mono text-xs font-bold uppercase tracking-[0.14em]">
                View Showcase
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    ),
    [reducedMotion]
  );

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#050504] text-[#f7f3ea]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,122,61,0.12),transparent_28%),radial-gradient(circle_at_72%_74%,rgba(215,255,98,0.06),transparent_24%)]" />
        <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_center,rgba(247,243,234,0.95)_0.7px,transparent_1.2px)] [background-size:140px_140px]" />
        <div className="absolute bottom-[-12%] left-[12%] h-[28rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(255,122,61,0.16),rgba(255,122,61,0.03)_42%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-[38vh] bg-[linear-gradient(180deg,rgba(255,122,61,0)_0%,rgba(41,28,16,0.26)_46%,rgba(41,28,16,0.52)_100%)]" />
      </div>

      {compact || reducedMotion ? (
        content
      ) : (
        <ImageMouseTrail
          items={trailImages}
          maxNumberOfImages={5}
          distance={18}
          imgClass="w-24 h-32 sm:w-28 sm:h-36 rounded-[14px] border border-white/10 shadow-[0_14px_30px_rgba(0,0,0,0.16)]"
          fadeAnimation
          className="min-h-[100svh] w-full place-content-stretch overflow-hidden rounded-none bg-transparent"
        >
          {content}
        </ImageMouseTrail>
      )}
    </section>
  );
}
