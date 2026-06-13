import { useRef, useEffect, useCallback, type PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Circle } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";

const techTags = [
  "React",
  "NestJS",
  "MongoDB",
  "React Native",
  "FiveM / CFX",
  "Product UI",
];

const proofPoints = [
  { label: "Award", value: "Best ISS Project" },
  { label: "Freelance", value: "7+ public scripts" },
  { label: "Certified", value: "17 completed certificates" },
];

const heroEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

function PrecisionField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, time: number, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);

      const grid = w < 700 ? 42 : 56;
      const drift = (time * 0.008) % grid;

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(247, 243, 234, 0.03)";

      for (let x = -grid + drift; x < w + grid; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = -grid + drift; y < h + grid; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const sweep = ((time * 0.028) % (w + h)) - h;
      const sweepGradient = ctx.createLinearGradient(sweep, 0, sweep + h, h);
      sweepGradient.addColorStop(0, "rgba(215, 255, 98, 0)");
      sweepGradient.addColorStop(0.5, "rgba(215, 255, 98, 0.08)");
      sweepGradient.addColorStop(1, "rgba(255, 122, 61, 0)");

      ctx.strokeStyle = sweepGradient;
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(sweep, 0);
      ctx.lineTo(sweep + h, h);
      ctx.stroke();

      const mouse = mouseRef.current;
      ctx.strokeStyle = "rgba(215, 255, 98, 0.045)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(mouse.x, Math.max(0, mouse.y - 54));
      ctx.lineTo(mouse.x, Math.min(h, mouse.y + 54));
      ctx.moveTo(Math.max(0, mouse.x - 54), mouse.y);
      ctx.lineTo(Math.min(w, mouse.x + 54), mouse.y);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 122, 61, 0.16)";
      for (let i = 0; i < 12; i += 1) {
        const x = ((i * 137 + time * 0.012) % (w + 120)) - 60;
        const y = (Math.sin(i * 1.7 + time * 0.0008) * 0.22 + 0.5) * h;
        ctx.fillRect(x, y, i % 3 === 0 ? 24 : 10, 1);
      }
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouseRef.current = { x: width * 0.72, y: height * 0.38 };
      draw(ctx, 0, width, height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: Math.max(0, Math.min(rect.width, e.clientX - rect.left)),
        y: Math.max(0, Math.min(rect.height, e.clientY - rect.top)),
      };
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    if (!prefersReducedMotion) {
      const animate = (time: number) => {
        draw(ctx, time, canvas.offsetWidth, canvas.offsetHeight);
        rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

function MaskRevealTitle({
  children,
  className,
  delay,
  reducedMotion,
}: {
  children: string;
  className: string;
  delay: number;
  reducedMotion: boolean;
}) {
  return (
    <div className="overflow-hidden">
      <motion.h1
        initial={reducedMotion ? { opacity: 0 } : { y: "100%", opacity: 0.4 }}
        animate={reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.35 : 0.9, delay, ease: heroEase }}
        className={className}
      >
        {children}
      </motion.h1>
    </div>
  );
}

export function Hero() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion() ?? false;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springX = useSpring(pointerX, { stiffness: 80, damping: 18, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 80, damping: 18, mass: 0.4 });

  const visualX = useTransform(springX, [-0.5, 0.5], reducedMotion || isMobile ? [0, 0] : [-12, 12]);
  const visualY = useTransform(springY, [-0.5, 0.5], reducedMotion || isMobile ? [0, 0] : [-10, 10]);
  const glowX = useTransform(springX, [-0.5, 0.5], ["44%", "56%"]);
  const glowY = useTransform(springY, [-0.5, 0.5], ["42%", "58%"]);
  const parallaxGlow = useMotionTemplate`radial-gradient(520px circle at ${glowX} ${glowY}, rgba(215,255,98,0.16), rgba(215,255,98,0.04) 34%, transparent 72%)`;

  const handleVisualPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reducedMotion || isMobile) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = (event.clientX - rect.left) / rect.width - 0.5;
    const nextY = (event.clientY - rect.top) / rect.height - 0.5;

    pointerX.set(nextX);
    pointerY.set(nextY);
  };

  const handleVisualPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const fadeUp = (delay: number, distance = 18): Variants => ({
    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.32 : 0.7,
        delay,
        ease: heroEase,
      },
    },
  });

  const chipVariants: Variants = {
    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 },
    show: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.25 : 0.55,
        delay: 0.72 + index * (reducedMotion ? 0.03 : 0.05),
        ease: heroEase,
      },
    }),
  };

  const cardVariants: Variants = {
    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.98 },
    show: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0.3 : 0.7,
        delay: 1 + index * 0.08,
        ease: heroEase,
      },
    }),
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#050504]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.3 : 1.1, ease: heroEase }}
        className="absolute inset-0"
      >
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  x: ["-4%", "4%", "-4%"],
                  y: ["-3%", "2%", "-3%"],
                }
          }
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-8%] top-[-12%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(215,255,98,0.12),rgba(215,255,98,0.03)_38%,transparent_72%)] blur-3xl"
        />
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  x: ["3%", "-3%", "3%"],
                  y: ["2%", "-4%", "2%"],
                }
          }
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-18%] right-[-10%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,122,61,0.1),rgba(255,122,61,0.025)_42%,transparent_72%)] blur-3xl"
        />
        <PrecisionField />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,4,0.18)_0%,rgba(5,5,4,0.72)_78%,rgba(5,5,4,0.96)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d7ff62]/50 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col px-4 pb-8 pt-28 md:px-8 md:pt-32 lg:px-12">
        <motion.div
          variants={fadeUp(0.18, 14)}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-3 border-b border-white/10 pb-4 text-xs text-[#9a9386] md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-2">
            <Circle className="h-2 w-2 fill-[#d7ff62] text-[#d7ff62]" />
            <span className="font-mono uppercase">
              Available for internships, freelance, collaboration
            </span>
          </div>
          <span className="font-mono uppercase text-[#6f6a60]">
            Portfolio / 2026
          </span>
        </motion.div>

        <div className="grid flex-1 content-center gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <MaskRevealTitle
              delay={0.28}
              reducedMotion={reducedMotion}
              className="text-7xl font-extrabold uppercase leading-[0.86] text-[#f7f3ea] sm:text-8xl md:text-9xl lg:text-[9rem] xl:text-[10rem]"
            >
              Raef
            </MaskRevealTitle>

            <MaskRevealTitle
              delay={0.4}
              reducedMotion={reducedMotion}
              className="font-display text-7xl italic uppercase leading-[0.86] text-gradient-lime sm:text-8xl md:text-9xl lg:text-[9rem] xl:text-[10rem]"
            >
              Laffi
            </MaskRevealTitle>

            <motion.p
              variants={fadeUp(0.54)}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-xl font-mono text-xs uppercase text-[#9a9386]"
            >
              Full-stack developer / creative software engineer
            </motion.p>

            <motion.p
              variants={fadeUp(0.64)}
              initial="hidden"
              animate="show"
              className="mt-8 max-w-2xl text-pretty text-base leading-8 text-[#c6bdab] md:text-xl md:leading-9"
            >
              Senior software engineering student building full-stack products,
              mobile apps, backend systems, FiveM resources, and polished web
              interfaces with a strong bias for usable workflows.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              className="mt-8 flex max-w-2xl flex-wrap gap-2"
            >
              {techTags.map((tag, index) => (
                <motion.span
                  key={tag}
                  custom={index}
                  variants={chipVariants}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          borderColor: "rgba(215, 255, 98, 0.52)",
                          backgroundColor: "rgba(215, 255, 98, 0.09)",
                          color: "#d7ff62",
                        }
                  }
                  transition={{ duration: 0.22, ease: heroEase }}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-xs text-[#9a9386]"
                >
                  <motion.span
                    whileHover={reducedMotion ? undefined : { x: 2 }}
                    transition={{ duration: 0.22, ease: heroEase }}
                    className="inline-flex"
                  >
                    {tag}
                  </motion.span>
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp(0.9)}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <motion.a
                href="#work"
                data-cursor="button"
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        scale: 1.03,
                        backgroundColor: "#d7ff62",
                        boxShadow: "0 0 0 1px rgba(215,255,98,0.16), 0 18px 44px rgba(215,255,98,0.18)",
                      }
                }
                whileTap={reducedMotion ? undefined : { scale: 0.985 }}
                className="cursor-magnetic inline-flex items-center justify-center gap-2 rounded-full bg-[#f7f3ea] px-6 py-3 text-sm font-bold text-[#050504] transition-[background-color,transform,box-shadow] duration-200 ease-out active:scale-[0.98]"
              >
                View Work
                <motion.span
                  animate={reducedMotion ? undefined : { x: 0 }}
                  whileHover={reducedMotion ? undefined : { x: 4 }}
                  transition={{ duration: 0.2, ease: heroEase }}
                  className="inline-flex"
                >
                  <ArrowUpRight className="cursor-button-arrow h-4 w-4" />
                </motion.span>
              </motion.a>

              <motion.a
                href="#contact"
                data-cursor="button"
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        borderColor: "rgba(215, 255, 98, 0.5)",
                        color: "#d7ff62",
                        backgroundColor: "rgba(255,255,255,0.05)",
                      }
                }
                whileTap={reducedMotion ? undefined : { scale: 0.985 }}
                className="cursor-magnetic inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-bold text-[#f7f3ea] transition-[border-color,background-color,color,transform] duration-200 ease-out active:scale-[0.98]"
              >
                Contact Raef
              </motion.a>
            </motion.div>
          </div>

          <motion.aside
            initial="hidden"
            animate="show"
            onPointerMove={handleVisualPointerMove}
            onPointerLeave={handleVisualPointerLeave}
            style={{
              x: visualX,
              y: visualY,
            }}
            className="relative hidden border-l border-white/10 pl-8 lg:block"
          >
            <motion.div
              style={{ background: reducedMotion || isMobile ? undefined : parallaxGlow }}
              className="pointer-events-none absolute inset-0 -left-8 rounded-[28px] opacity-80"
            />

            <motion.p
              variants={fadeUp(0.98, 12)}
              className="relative mb-8 font-mono text-xs uppercase text-[#6f6a60]"
            >
              Evidence
            </motion.p>

            <div className="relative space-y-5">
              {proofPoints.map((point, index) => (
                <motion.div
                  key={point.label}
                  custom={index}
                  variants={cardVariants}
                >
                  <motion.div
                    animate={
                      reducedMotion
                        ? undefined
                        : {
                            y: [0, index % 2 === 0 ? -10 : -8, 0],
                          }
                    }
                    transition={
                      reducedMotion
                        ? undefined
                        : {
                            duration: 6 + index,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                            delay: 1.2 + index * 0.2,
                          }
                    }
                    whileHover={
                      reducedMotion
                        ? undefined
                        : {
                            rotateX: index % 2 === 0 ? 3 : -3,
                            rotateY: index % 2 === 0 ? -4 : 4,
                            scale: 1.015,
                            boxShadow: "0 20px 60px rgba(0,0,0,0.32), 0 0 0 1px rgba(215,255,98,0.16)",
                            borderColor: "rgba(215,255,98,0.24)",
                          }
                    }
                    className="glass-strong rounded-[8px] px-5 py-5 [transform-style:preserve-3d]"
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <span className="font-mono text-xs text-[#d7ff62]">
                        0{index + 1}
                      </span>
                      <span className="h-px flex-1 bg-white/10 transition-colors duration-200" />
                    </div>
                    <p className="text-sm text-[#9a9386]">{point.label}</p>
                    <p className="mt-1 text-xl font-semibold text-[#f7f3ea]">
                      {point.value}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.div
          variants={fadeUp(1.14, 10)}
          initial="hidden"
          animate="show"
          className="flex items-center justify-between border-t border-white/10 pt-5 text-xs text-[#6f6a60]"
        >
          <span className="font-mono uppercase">Selected projects below</span>
          <ArrowDown className="h-4 w-4 text-[#d7ff62]" />
        </motion.div>
      </div>
    </section>
  );
}
