import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Circle } from "lucide-react";

const techTags = [
  "React",
  "NestJS",
  "MongoDB",
  "React Native",
  "Product UI",
  "AI Features",
];

const proofPoints = [
  { label: "Award", value: "Best ISS Project" },
  { label: "Built", value: "6 product systems" },
  { label: "Focus", value: "Web, mobile, backend" },
];

function PrecisionField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, time: number, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);

      const grid = w < 700 ? 42 : 56;
      const drift = (time * 0.012) % grid;

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(247, 243, 234, 0.035)";

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

      const sweep = ((time * 0.04) % (w + h)) - h;
      const sweepGradient = ctx.createLinearGradient(sweep, 0, sweep + h, h);
      sweepGradient.addColorStop(0, "rgba(215, 255, 98, 0)");
      sweepGradient.addColorStop(0.5, "rgba(215, 255, 98, 0.16)");
      sweepGradient.addColorStop(1, "rgba(255, 122, 61, 0)");

      ctx.strokeStyle = sweepGradient;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(sweep, 0);
      ctx.lineTo(sweep + h, h);
      ctx.stroke();

      const mouse = mouseRef.current;
      ctx.strokeStyle = "rgba(215, 255, 98, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(mouse.x, Math.max(0, mouse.y - 72));
      ctx.lineTo(mouse.x, Math.min(h, mouse.y + 72));
      ctx.moveTo(Math.max(0, mouse.x - 72), mouse.y);
      ctx.lineTo(Math.min(w, mouse.x + 72), mouse.y);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 122, 61, 0.22)";
      for (let i = 0; i < 18; i += 1) {
        const x = ((i * 137 + time * 0.018) % (w + 120)) - 60;
        const y = (Math.sin(i * 1.7 + time * 0.001) * 0.28 + 0.5) * h;
        ctx.fillRect(x, y, i % 3 === 0 ? 28 : 12, 1);
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
      mouseRef.current = { x: e.clientX, y: e.clientY };
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

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#050504]">
      <PrecisionField />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,4,0.18)_0%,rgba(5,5,4,0.72)_78%,rgba(5,5,4,0.96)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d7ff62]/50 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col px-4 pb-8 pt-28 md:px-8 md:pt-32 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col gap-3 border-b border-white/10 pb-4 text-xs text-[#9a9386] md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-2">
            <Circle className="h-2 w-2 fill-[#d7ff62] text-[#d7ff62]" />
            <span className="font-mono uppercase">Available for internships, freelance, collaboration</span>
          </div>
          <span className="font-mono uppercase text-[#6f6a60]">
            Portfolio / 2026
          </span>
        </motion.div>

        <div className="grid flex-1 content-center gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="mb-6 max-w-xl font-mono text-xs uppercase text-[#9a9386]"
            >
              Full-stack developer / creative software engineer
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                className="text-7xl font-extrabold leading-[0.86] text-[#f7f3ea] sm:text-8xl md:text-9xl lg:text-[9rem] xl:text-[10rem]"
              >
                Raef
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.24, ease: [0.23, 1, 0.32, 1] }}
                className="font-display text-7xl italic leading-[0.86] text-gradient-lime sm:text-8xl md:text-9xl lg:text-[9rem] xl:text-[10rem]"
              >
                Laffi
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.42, ease: [0.23, 1, 0.32, 1] }}
              className="mt-8 max-w-2xl text-pretty text-base leading-8 text-[#c6bdab] md:text-xl md:leading-9"
            >
              I build clean product systems with the discipline of backend
              engineering and the judgement of interface design: dashboards,
              mobile apps, AI-assisted workflows, and polished web experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.52, ease: [0.23, 1, 0.32, 1] }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#work"
                data-cursor="button"
                className="cursor-magnetic inline-flex items-center justify-center gap-2 rounded-full bg-[#f7f3ea] px-6 py-3 text-sm font-bold text-[#050504] transition-[background-color,transform] duration-200 ease-out hover:bg-[#d7ff62] active:scale-[0.98]"
              >
                View Work
                <ArrowUpRight className="cursor-button-arrow h-4 w-4" />
              </a>
              <a
                href="#contact"
                data-cursor="button"
                className="cursor-magnetic inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-bold text-[#f7f3ea] transition-[border-color,background-color,transform] duration-200 ease-out hover:border-[#d7ff62]/50 hover:bg-white/[0.07] active:scale-[0.98]"
              >
                Contact Raef
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.62, ease: [0.23, 1, 0.32, 1] }}
              className="mt-8 flex max-w-2xl flex-wrap gap-2"
            >
              {techTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-xs text-[#9a9386]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.54, ease: [0.23, 1, 0.32, 1] }}
            className="hidden border-l border-white/10 pl-8 lg:block"
          >
            <p className="mb-8 font-mono text-xs uppercase text-[#6f6a60]">
              Evidence
            </p>
            <div className="space-y-7">
              {proofPoints.map((point, index) => (
                <div key={point.label} className="group">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="font-mono text-xs text-[#d7ff62]">
                      0{index + 1}
                    </span>
                    <span className="h-px flex-1 bg-white/10 transition-colors duration-200 group-hover:bg-[#d7ff62]/40" />
                  </div>
                  <p className="text-sm text-[#9a9386]">{point.label}</p>
                  <p className="mt-1 text-xl font-semibold text-[#f7f3ea]">
                    {point.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.82 }}
          className="flex items-center justify-between border-t border-white/10 pt-5 text-xs text-[#6f6a60]"
        >
          <span className="font-mono uppercase">Selected projects below</span>
          <ArrowDown className="h-4 w-4 text-[#d7ff62]" />
        </motion.div>
      </div>
    </section>
  );
}
