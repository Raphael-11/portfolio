import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { SectionHeader } from "@/components/SectionHeader";
import TextAnimation from "@/components/ui/scroll-text";
import { projects, type Project } from "@/data/projects";

type GalleryItem = Project & {
  galleryIndex: number;
  year: string;
  tags: string[];
};

function buildGalleryItems(): GalleryItem[] {
  const years = ["2026", "2025", "2024", "2023", "2022", "2021"];

  return Array.from({ length: 24 }, (_, index) => {
    const project = projects[index % projects.length];

    return {
      ...project,
      galleryIndex: index,
      year: years[index % years.length],
      tags: project.stack.slice(0, 3),
    };
  });
}

export function SphereGallery() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayPanelRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<GalleryItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const items = useMemo(() => buildGalleryItems(), []);

  useEffect(() => {
    selectedRef.current = selectedItem;
  }, [selectedItem]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const stack = stackRef.current;
    if (!viewport || !stack) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const position = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    const velocity = new THREE.Vector2(0, 0);
    const pointerDelta = new THREE.Vector2(0, 0);

    const state = {
      dragging: false,
      pointerId: -1,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      maxX: 0,
      maxY: 0,
    };

    const dragFactor = isMobile ? 1 : 0.92;
    const interpolation = prefersReducedMotion ? 0.24 : 0.12;
    const damping = prefersReducedMotion ? 0.76 : 0.88;
    const tiltX = gsap.quickTo(stack, "rotationX", {
      duration: prefersReducedMotion ? 0.1 : 0.35,
      ease: "power3.out",
    });
    const tiltY = gsap.quickTo(stack, "rotationY", {
      duration: prefersReducedMotion ? 0.1 : 0.35,
      ease: "power3.out",
    });
    const xTo = gsap.quickTo(stack, "x", {
      duration: prefersReducedMotion ? 0.08 : 0.45,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(stack, "y", {
      duration: prefersReducedMotion ? 0.08 : 0.45,
      ease: "power3.out",
    });

    const recalculateBounds = () => {
      const viewportRect = viewport.getBoundingClientRect();
      const stackRect = stack.getBoundingClientRect();
      state.maxX = Math.max(0, (stackRect.width - viewportRect.width) / 2 + 36);
      state.maxY = Math.max(0, (stackRect.height - viewportRect.height) / 2 + 24);
      target.x = THREE.MathUtils.clamp(target.x, -state.maxX, state.maxX);
      target.y = THREE.MathUtils.clamp(target.y, -state.maxY, state.maxY);
      position.copy(target);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (selectedRef.current) return;
      state.dragging = true;
      state.pointerId = event.pointerId;
      state.startX = event.clientX;
      state.startY = event.clientY;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      viewport.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!state.dragging || state.pointerId !== event.pointerId) return;

      pointerDelta.set(event.clientX - state.lastX, event.clientY - state.lastY);
      state.lastX = event.clientX;
      state.lastY = event.clientY;

      target.x = THREE.MathUtils.clamp(
        target.x + pointerDelta.x * dragFactor,
        -state.maxX,
        state.maxX
      );
      target.y = THREE.MathUtils.clamp(
        target.y + pointerDelta.y * dragFactor,
        -state.maxY,
        state.maxY
      );

      velocity.set(pointerDelta.x * 0.9, pointerDelta.y * 0.9);

      if (!prefersReducedMotion) {
        tiltX(THREE.MathUtils.clamp(-pointerDelta.y * 0.06, -4, 4));
        tiltY(THREE.MathUtils.clamp(pointerDelta.x * 0.06, -5, 5));
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (state.pointerId === event.pointerId) {
        viewport.releasePointerCapture(event.pointerId);
      }
      state.dragging = false;
      state.pointerId = -1;
      if (!prefersReducedMotion) {
        tiltX(0);
        tiltY(0);
      }
    };

    viewport.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("resize", recalculateBounds);

    recalculateBounds();

    let frameId = 0;
    const animate = () => {
      if (!state.dragging) {
        target.x = THREE.MathUtils.clamp(target.x + velocity.x, -state.maxX, state.maxX);
        target.y = THREE.MathUtils.clamp(target.y + velocity.y, -state.maxY, state.maxY);
        velocity.multiplyScalar(damping);
      }

      position.lerp(target, interpolation);
      xTo(position.x);
      yTo(position.y);

      frameId = requestAnimationFrame(animate);
    };

    animate();

    const introTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    introTimeline
      .fromTo(
        ".sphere-gallery-stage",
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.9 }
      )
      .fromTo(
        ".gallery-card",
        { autoAlpha: 0, y: 28, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: {
            each: 0.025,
            from: "start",
          },
        },
        "-=0.55"
      );

    return () => {
      cancelAnimationFrame(frameId);
      introTimeline.kill();
      viewport.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("resize", recalculateBounds);
    };
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = overlayPanelRef.current;
    if (!overlay || !panel) return;

    if (!selectedItem) {
      gsap.to(panel, {
        y: 40,
        autoAlpha: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
      gsap.to(overlay, {
        autoAlpha: 0,
        duration: 0.28,
        ease: "power2.out",
        pointerEvents: "none",
      });
      return;
    }

    gsap.set(overlay, { pointerEvents: "auto" });
    const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
    timeline
      .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.24 })
      .fromTo(
        panel,
        { autoAlpha: 0, y: 36, clipPath: "inset(14% 0 0 0 round 24px)" },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0% 0 0 0 round 24px)",
          duration: 0.62,
        },
        "-=0.02"
      );

    return () => {
      timeline.kill();
    };
  }, [selectedItem]);

  return (
    <section
      id="sphere-gallery"
      className="relative w-full overflow-hidden border-t border-white/10 bg-[#050504] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(215,255,98,0.05),transparent_28%),radial-gradient(circle_at_80%_78%,rgba(255,122,61,0.05),transparent_26%)]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 md:px-8 lg:px-12">
        <SectionHeader label="/DIMENSION" className="mb-8 md:mb-10" />

        <div className="mb-8 grid gap-6 md:mb-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.45fr)] lg:items-end">
          <div>
            <TextAnimation
              as="p"
              text="Dragged gallery stack / fixed grid / tap to open"
              lineAnime
              classname="mb-4 font-mono text-xs uppercase tracking-[0.02em] text-[#9a9386]"
              variants={{
                hidden: { filter: "blur(6px)", opacity: 0, y: 18 },
                visible: {
                  filter: "blur(0px)",
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.2 },
                },
              }}
            />
            <TextAnimation
              as="h2"
              text="A stacked gallery surface that moves as one organized field."
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
          </div>

          <TextAnimation
            as="p"
            text="The grid stays structured while the whole gallery plane drifts under drag, closer to a physical board than a loose pile of floating cards."
            lineAnime
            classname="max-w-xl text-pretty text-base leading-8 text-[#9a9386]"
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

        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-[0_32px_120px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.2)),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_44%)]" />

          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-6 px-5 py-5 md:px-7 md:py-6">
            <div className="max-w-[16rem]">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#d7ff62]">
                RAEF LAFFI / GALLERY FIELD
              </p>
              <p className="mt-2 text-sm leading-6 text-[#c6bdab]">
                Ordered into a clean matrix and dragged as one shared stack.
              </p>
            </div>

            <div className="hidden items-start gap-8 font-mono text-[10px] uppercase tracking-[0.08em] text-[#9a9386] md:flex">
              <div>
                <p className="text-white">Mode</p>
                <p className="mt-1">Stack / drag</p>
              </div>
              <div>
                <p className="text-white">Selection</p>
                <p className="mt-1">Tap any card</p>
              </div>
            </div>
          </div>

          <div
            ref={viewportRef}
            className="sphere-gallery-stage relative z-[2] h-[72vh] min-h-[620px] cursor-grab overflow-hidden active:cursor-grabbing md:h-[86vh]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:240px_240px] opacity-[0.08]" />

            <div className="absolute inset-0 [perspective:2200px]">
              <div
                ref={stackRef}
                className="absolute left-1/2 top-1/2 grid min-w-[1700px] -translate-x-1/2 -translate-y-1/2 grid-cols-4 gap-x-10 gap-y-12 px-20 py-24 [transform-style:preserve-3d] md:grid-cols-5 lg:min-w-[1950px]"
                style={{ transform: "translate(-50%, -50%) rotateX(0deg) rotateY(0deg)" }}
              >
                {items.map((item) => (
                  <button
                    key={`${item.id}-${item.galleryIndex}`}
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="gallery-card group flex w-full flex-col border border-white/10 bg-black text-left transition-colors duration-200 hover:border-[#d7ff62]/5"
                  >
                    <div className="flex items-center justify-between gap-4 border-b border-white/10 px-2.5 py-2 font-mono text-[8px] uppercase tracking-[0.08em] text-[#9a9386] md:px-3">
                      <span className="truncate">{item.title}</span>
                      <span>{item.year}</span>
                    </div>

                    <div className="aspect-[0.98/0.72] overflow-hidden bg-[#0b0b09]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        draggable={false}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-white/10 px-2.5 py-2 md:px-3">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={`${item.id}-${tag}`}
                            className="rounded-full border border-white/10 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.08em] text-[#9a9386]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-[#6f6a60]">
                        {item.number}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-20 z-[3] flex justify-center">
              <div className="rounded-full border border-[#d7ff62]/25 bg-[#0b0b09]/75 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#d7ff62] backdrop-blur-xl">
                Drag anywhere to move the stack
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 border-t border-white/10 bg-black/40 px-5 py-4 backdrop-blur-xl md:px-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#9a9386]">
              <span className="h-2 w-2 rounded-full bg-[#d7ff62]" />
              Interactive stack
            </div>

            <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#6f6a60] sm:flex">
              <span>Preserved grid</span>
              <span className="text-[#d7ff62]">/</span>
              <span>Shared drag plane</span>
            </div>
          </div>

          <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 z-20 bg-black/70 opacity-0 backdrop-blur-[10px]"
          >
            <div className="flex h-full items-center justify-center p-4 md:p-8">
              <div
                ref={overlayPanelRef}
                className="w-full max-w-5xl overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b09] opacity-0 shadow-[0_36px_160px_rgba(0,0,0,0.55)]"
              >
                {selectedItem && (
                  <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.8fr)]">
                    <div className="relative min-h-[280px] overflow-hidden border-b border-white/10 lg:min-h-[620px] lg:border-b-0 lg:border-r">
                      <img
                        src={selectedItem.image}
                        alt={selectedItem.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.58)_100%)]" />
                      <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#d7ff62] backdrop-blur-xl">
                        Selected project
                      </div>
                    </div>

                    <div className="flex flex-col justify-between p-6 md:p-8">
                      <div>
                        <div className="mb-6 flex items-center justify-between gap-4">
                          <button
                            type="button"
                            onClick={() => setSelectedItem(null)}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-[#f7f3ea] transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06]"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                          </button>

                          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6f6a60]">
                            {selectedItem.year}
                          </span>
                        </div>

                        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#d7ff62]">
                          {selectedItem.type}
                        </p>
                        <h3 className="mt-3 text-3xl font-bold text-[#f7f3ea] md:text-5xl">
                          {selectedItem.title}
                        </h3>
                        <p className="mt-5 text-base leading-8 text-[#c6bdab]">
                          {selectedItem.longDescription}
                        </p>

                        <div className="mt-7 flex flex-wrap gap-2">
                          {selectedItem.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#9a9386]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 border-t border-white/10 pt-6">
                        <div className="mb-4 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-4">
                            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6f6a60]">
                              Problem
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[#c6bdab]">
                              {selectedItem.problem ?? selectedItem.description}
                            </p>
                          </div>
                          <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-4">
                            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6f6a60]">
                              Outcome
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[#c6bdab]">
                              {selectedItem.impact ??
                                selectedItem.solution ??
                                "Structured product delivery with clear engineering execution."}
                            </p>
                          </div>
                        </div>

                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 rounded-full bg-[#f7f3ea] px-5 py-3 text-sm font-bold text-[#050504] transition-colors duration-200 hover:bg-[#d7ff62]"
                        >
                          Continue to contact
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
