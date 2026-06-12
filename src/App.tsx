import { useState, useEffect, useCallback } from "react";
import Lenis from "lenis";
import { Navbar } from "@/sections/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/sections/Preloader";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { AwardSpotlight } from "@/sections/AwardSpotlight";
import { Work } from "@/sections/Work";
import { HorizontalWork } from "@/sections/HorizontalWork";
import { Capabilities } from "@/sections/Capabilities";
import { TechStack } from "@/sections/TechStack";
import { Process } from "@/sections/Process";
import { Impact } from "@/sections/Impact";
import { Testimonial } from "@/sections/Testimonial";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    if (isLoading) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenisInstance = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 2,
    });

    let rafId = 0;

    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();
      lenisInstance.scrollTo(el as HTMLElement);
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenisInstance.destroy();
    };
  }, [isLoading]);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050504] text-[#f7f3ea]">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      <CustomCursor />

      {/* Preloader */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Navigation */}
      {!isLoading && <Navbar />}

      {/* Main Content */}
      {!isLoading && (
        <>
          <main className="relative z-10">
            <Hero />
            <About />
            <AwardSpotlight />
            <Work />
            <HorizontalWork />
            <Capabilities />
            <TechStack />
            <Process />
            <Impact />
            <Testimonial />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
