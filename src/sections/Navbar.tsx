import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          y: scrolled || mobileOpen ? 0 : -28,
          opacity: scrolled || mobileOpen ? 1 : 0,
          pointerEvents: scrolled || mobileOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
        className="fixed left-0 right-0 top-3 z-40 px-3 transition-[top] duration-200 md:top-5 md:px-6"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-[background-color,border-color,box-shadow] duration-200 md:px-4 ${
            scrolled
              ? "border-white/12 bg-white/[0.07] shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur-[42px]"
              : "border-white/10 bg-white/[0.045] shadow-[0_14px_42px_rgba(0,0,0,0.12)] backdrop-blur-[36px]"
          }`}
          style={{
            boxShadow: scrolled
              ? "inset 0 1px 0 rgba(255,255,255,0.1), 0 18px 60px rgba(0,0,0,0.16)"
              : "inset 0 1px 0 rgba(255,255,255,0.08), 0 14px 42px rgba(0,0,0,0.12)",
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            data-cursor="link"
            className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-extrabold text-[#f7f3ea] transition-colors duration-200 hover:text-[#d7ff62]"
          >
            <span>Raef Laffi</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff7a3d]" />
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                data-cursor="link"
                className="rounded-full px-4 py-2 text-xs font-semibold uppercase text-[#b8b0a1] transition-[background-color,color,transform,box-shadow,border-color] duration-200 hover:bg-white/[0.05] hover:text-[#f7f3ea] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] active:scale-[0.98]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="mailto:raef.lafi@gmail.com"
            data-cursor="copy"
            className="cursor-magnetic hidden rounded-full bg-[#d7ff62] px-4 py-2 text-xs font-bold text-[#050504] shadow-[0_10px_30px_rgba(215,255,98,0.22)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-[#f7f3ea] hover:shadow-[0_14px_34px_rgba(247,243,234,0.16)] active:scale-[0.98] md:inline-flex"
          >
            Email
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="glass-chip inline-flex h-9 w-9 items-center justify-center rounded-full text-[#f7f3ea] transition-[background-color,transform] duration-200 active:scale-[0.96] md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-30 bg-[#050504]/34 px-4 pt-28 backdrop-blur-[34px] md:hidden"
          >
            <div className="mx-auto max-w-sm border-t border-white/10">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.22 }}
                  data-cursor="link"
                  className="flex items-center justify-between border-b border-white/10 py-5 text-2xl font-bold text-[#f7f3ea]"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-[#d7ff62]">
                    0{index + 1}
                  </span>
                </motion.a>
              ))}
              <a
                href="mailto:raef.lafi@gmail.com"
                data-cursor="copy"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#d7ff62] px-5 py-3 text-sm font-bold text-[#050504]"
              >
                Email Raef
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
