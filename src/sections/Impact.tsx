import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  isDecimal?: boolean;
  isText?: boolean;
  textValue?: string;
};

const stats: Stat[] = [
  { value: 6, suffix: "+", label: "Featured Product Builds" },
  { value: 1, suffix: "", label: "Award-Winning Project" },
  { value: 17, suffix: "", label: "Completed Certificates" },
  { value: 0, suffix: "", label: "Primary Build Focus", isText: true, textValue: "Full-Stack + Mobile" },
];

function AnimatedCounter({
  value,
  suffix,
  isDecimal,
  isText,
  textValue,
  isInView,
}: {
  value: number;
  suffix: string;
  isDecimal?: boolean;
  isText?: boolean;
  textValue?: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (isText) return;

    const duration = 1400;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value, isDecimal, isText]);

  if (isText) {
    return <span>{textValue}</span>;
  }

  return (
    <span>
      {isDecimal ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

export function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#050504] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeader label="/IMPACT" className="mb-10 md:mb-14" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.58, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 className="max-w-4xl text-4xl font-bold leading-tight text-[#f7f3ea] md:text-6xl">
            Small sample, clearer proof.
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.42,
                delay: i * 0.06,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="glass-panel glass-hover group rounded-[8px] p-5 text-center transition-[border-color,background-color] duration-200 md:p-7"
            >
              <div
                className={`mb-3 font-bold leading-tight text-[#f7f3ea] transition-colors duration-200 group-hover:text-[#d7ff62] ${
                  stat.isText
                    ? "text-2xl md:text-3xl"
                    : "text-4xl md:text-5xl lg:text-6xl"
                }`}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                  isText={stat.isText}
                  textValue={stat.textValue}
                  isInView={isInView}
                />
              </div>
              <p className="text-xs text-[#9a9386] md:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
