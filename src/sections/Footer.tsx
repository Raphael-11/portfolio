import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-white/10 bg-[#050504] py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <span className="text-lg font-extrabold text-[#f7f3ea]">
              Raef Laffi<span className="font-display italic text-[#d7ff62]">.</span>
            </span>
            <span className="mt-1 font-mono text-xs uppercase text-[#6f6a60]">
              Full-Stack Developer
            </span>
          </motion.div>

          {/* Center - Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-[#6f6a60]"
          >
            &copy; 2026 All rights reserved.
          </motion.p>

          {/* Back to top */}
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={scrollToTop}
            data-cursor="button"
            className="cursor-magnetic group flex items-center gap-2 font-mono text-xs text-[#9a9386] transition-colors duration-200 hover:text-[#d7ff62] active:scale-[0.98]"
          >
            <span>Back to top</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] transition-colors duration-200 group-hover:bg-[#d7ff62]/10">
              <ArrowUp className="cursor-button-arrow h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
