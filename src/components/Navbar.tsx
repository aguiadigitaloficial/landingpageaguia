import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import aguiaLogo from "@/assets/aguia-logo-navbar.png";
import CtaButton from "@/components/ui/cta-button";

const navLinks = ["Início", "Diferencial", "Soluções", "Casos de Sucesso", "Nossos Conselheiros", "Diagnóstico"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Início");

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setHidden(y > lastY && y > 200);
      setLastY(y);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, [lastY]);

  const scrollTo = (id: string) => {
    setActive(id);
    setMobileOpen(false);
    const sectionMap: Record<string, string> = {
      "Início": "hero",
      "Diferencial": "diferenca",
      "Soluções": "solucoes",
      "Casos de Sucesso": "depoimentos",
      "Nossos Conselheiros": "conselheiros",
      "Diagnóstico": "diagnostico",
    };
    const targetId = sectionMap[id] || "hero";
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "bg-[rgba(9,9,11,0.8)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.05)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img src={aguiaLogo} alt="Águia Digital" width={120} height={36} className="h-9 w-auto" />
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link}
                {active === link && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
          <div className="hidden lg:flex">
            <CtaButton
              variant="dark"
              onClick={() => scrollTo("Diagnóstico")}
            >
              QUERO SER ÁGUIA
            </CtaButton>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground"
          >
            <div className="space-y-1.5">
              <motion.div animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }} className="w-6 h-0.5 bg-foreground" />
              <motion.div animate={{ opacity: mobileOpen ? 0 : 1 }} className="w-6 h-0.5 bg-foreground" />
              <motion.div animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} className="w-6 h-0.5 bg-foreground" />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => scrollTo(link)}
                className="text-2xl font-bold text-foreground"
              >
                {link}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4"
            >
              <CtaButton variant="dark" onClick={() => scrollTo("Diagnóstico")}>
                QUERO SER ÁGUIA
              </CtaButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
