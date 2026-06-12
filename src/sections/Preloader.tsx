import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [displayText, setDisplayText] = useState("RAEF");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]";
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 850;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 460);
        }, 180);
      }
    };

    intervalRef.current = setInterval(updateProgress, 16);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  // Text scramble effect
  useEffect(() => {
    if (isComplete) return;

    const finalText = "RAEF";
    let iteration = 0;

    const scrambleInterval = setInterval(() => {
      setDisplayText(
        finalText
          .split("")
          .map((char, index) => {
            if (index < iteration) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1 / 2;

      if (iteration >= finalText.length) {
        clearInterval(scrambleInterval);
        setDisplayText(finalText);
      }
    }, 40);

    return () => clearInterval(scrambleInterval);
  }, [isComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[50] bg-black flex flex-col items-center justify-center"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.46, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* CRT scanline effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)"
            }}
          />

          <div className="flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              className="text-6xl font-extrabold leading-none text-[#f7f3ea] md:text-8xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {displayText}
              <span className="font-display italic text-[#d7ff62]">.</span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="font-mono text-xs uppercase text-[#6f6a60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Raef Laffi portfolio
            </motion.p>

            {/* Progress bar */}
            <div className="mt-4 h-[2px] w-48 overflow-hidden rounded-full bg-white/10 md:w-64">
              <motion.div
                className="h-full rounded-full bg-[#d7ff62]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Percentage */}
            <span className="font-mono text-xs text-[#6f6a60]">
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
