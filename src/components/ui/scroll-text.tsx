import { motion, useInView, type Variants } from "framer-motion";
import { useMemo, useRef } from "react";

import { cn } from "@/lib/utils";

type TextAnimationProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  classname?: string;
  direction?: "up" | "down" | "left" | "right";
  letterAnime?: boolean;
  lineAnime?: boolean;
  variants?: Variants;
};

const defaultVariants: Variants = {
  hidden: { filter: "blur(10px)", opacity: 0, y: 24 },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

function getDirectionalHidden(direction: NonNullable<TextAnimationProps["direction"]>) {
  switch (direction) {
    case "down":
      return { y: -20, opacity: 0, filter: "blur(8px)" };
    case "left":
      return { x: 20, opacity: 0, filter: "blur(8px)" };
    case "right":
      return { x: -20, opacity: 0, filter: "blur(8px)" };
    case "up":
    default:
      return { y: 20, opacity: 0, filter: "blur(8px)" };
  }
}

export default function TextAnimation({
  text,
  as = "h2",
  classname,
  direction = "up",
  letterAnime = false,
  lineAnime = false,
  variants = defaultVariants,
}: TextAnimationProps) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });

  const content = useMemo(() => {
    if (lineAnime) {
      return text.split(/(?<=\s)/);
    }
    if (letterAnime) {
      return text.split("");
    }
    return [text];
  }, [letterAnime, lineAnime, text]);

  const Tag = as;
  const baseHidden = getDirectionalHidden(direction);
  const mergedVariants: Variants = {
    hidden: {
      ...baseHidden,
      ...(variants.hidden ?? {}),
    },
    visible: {
      x: 0,
      y: 0,
      filter: "blur(0px)",
      opacity: 1,
      ...(variants.visible ?? {}),
    },
  };

  return (
    <Tag ref={ref as never} className={cn(classname)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap">
        {content.map((part, index) => (
          <motion.span
            key={`${part}-${index}`}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={mergedVariants}
            transition={{
              duration: 0.24,
              ease: "easeOut",
              delay: index * (letterAnime ? 0.025 : lineAnime ? 0.08 : 0),
              ...(typeof mergedVariants.visible === "object" &&
              mergedVariants.visible &&
              "transition" in mergedVariants.visible
                ? (mergedVariants.visible.transition as object)
                : {}),
            }}
            className={cn(
              "inline-block will-change-transform",
              lineAnime ? "pr-2" : "",
              letterAnime && part === " " ? "w-[0.35em]" : ""
            )}
          >
            {part === " " ? "\u00A0" : part}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
