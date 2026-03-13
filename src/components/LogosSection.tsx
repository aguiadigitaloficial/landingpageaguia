import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ease } from "@/lib/animations";

const clientNames1 = ["Microlins JM", "Minas Prime", "Momentum", "Sartori", "Seed", "SF Energis", "Solar Energy", "Varandinha", "Versus", "Vivare", "Emec", "Familha", "Flow Minas", "Fort Seguros"];
const clientNames2 = ["Master Clinic", "G+", "Gaigher", "Koruz", "Living São Francisco", "Mais Empreendimentos", "Microlins Itabira", "ABC Telecom", "Automatize", "Bicalho Advogados", "Biotecna", "Brunauer Transportes", "Eletro Duarte", "Elite Barber"];

const LogoItem = ({ name }: { name: string }) => (
  <div className="flex-shrink-0 px-8 py-4 text-muted-foreground/40 hover:text-foreground/80 transition-opacity duration-300 text-sm font-medium tracking-wide whitespace-nowrap">
    {name}
  </div>
);

const LogosSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="logos" className="py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight mb-4 leading-tight">
          {"CONHEÇA NOSSO MÉTODO EXCLUSIVO E SE TORNE UM DOS NOSSOS CASES DE SUCESSO".split(" ").map((word, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.05, duration: 0.5, ease }} className="inline-block mr-[0.3em]">{word}</motion.span>
          ))}
        </h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 0.6 }} className="text-muted-foreground text-sm md:text-base max-w-3xl mx-auto mb-12">
          Empresas de diferentes segmentos confiam no nosso método para escalar com previsibilidade, lucratividade e domínio de mercado.
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3, duration: 0.6, ease }} className="border border-primary/10 rounded-2xl p-6 md:p-10 overflow-hidden">
          <div className="overflow-hidden mb-4">
            <div className="marquee-left flex" style={{ width: "200%" }}>
              {[...clientNames1, ...clientNames1].map((n, i) => <LogoItem key={i} name={n} />)}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="marquee-right flex" style={{ width: "200%" }}>
              {[...clientNames2, ...clientNames2].map((n, i) => <LogoItem key={i} name={n} />)}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LogosSection;
