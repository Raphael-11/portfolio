import { useRef } from "react";
import {
  motion,
  useInView,
} from "framer-motion";
import { Lightbulb, Layers, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import TextAnimation from "@/components/ui/scroll-text";

const cards = [
  {
    title: "Product Thinking",
    description:
      "I design around real user flows: operations, handoffs, dashboard clarity, and practical product value.",
    icon: Lightbulb,
  },
  {
    title: "Clean Systems",
    description:
      "I build APIs, dashboards, databases, seller tools, and structured backend logic that stays readable.",
    icon: Layers,
  },
  {
    title: "Range With Focus",
    description:
      "My work spans web, mobile, university systems, live game-server tooling, and local AI experiments without losing product discipline.",
    icon: Sparkles,
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardsRef, { once: true, amount: 0.2 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#11110f] py-20 md:py-32 lg:py-36"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <SectionHeader label="/ABOUT" className="mb-10 md:mb-16" />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left Column - Label */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 max-w-sm">
              <TextAnimation
                as="h2"
                text="Product instincts, engineered clearly."
                lineAnime
                classname="text-4xl font-bold leading-tight text-[#f7f3ea] md:text-5xl lg:text-6xl"
                variants={{
                  hidden: { filter: "blur(10px)", opacity: 0, y: 28 },
                  visible: {
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.42, ease: "easeOut" },
                  },
                }}
              />
            </div>
          </div>

          {/* Right Column - Body */}
          <div className="space-y-7 lg:col-span-8">
            <TextAnimation
              as="p"
              text="I'm a senior software engineering student and full-stack developer who likes the full product loop: shaping the flow, designing the UI, building the API, connecting the database, and tightening the final interaction details."
              lineAnime
              classname="text-pretty text-lg leading-8 text-[#e7dfcf] md:text-2xl md:leading-10 lg:text-[1.9rem] lg:leading-[1.45]"
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
            <TextAnimation
              as="p"
              text="My strongest work sits where structure meets polish: admin dashboards that stay readable, mobile flows that move quickly, and systems that feel considered from the first click to the last edge case."
              lineAnime
              classname="text-pretty text-lg leading-8 text-[#e7dfcf] md:text-2xl md:leading-10 lg:text-[1.9rem] lg:leading-[1.45]"
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
        </div>

        {/* Glass Cards */}
        <div
          ref={cardsRef}
          className="mt-16 grid grid-cols-1 gap-4 md:mt-24 md:grid-cols-3 md:gap-5"
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.52, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -4 }}
              className="glass glow-border glass-hover group cursor-default rounded-[8px] p-6 transition-[border-color,background-color,transform] duration-200 md:p-7"
            >
              <div className="glass-chip mb-5 flex h-10 w-10 items-center justify-center rounded-[8px] transition-colors duration-200 group-hover:bg-[#d7ff62]/10">
                <card.icon className="h-5 w-5 text-[#d7ff62]" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-[#f7f3ea]">
                {card.title}
              </h3>
              <p className="text-sm leading-7 text-[#9a9386]">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
