import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ease } from "@/lib/animations";

const cases = [
  { name: "João Martins", role: "CEO da AlfaTech", quote: "A Águia Digital transformou nossa operação. Hoje temos previsibilidade real e resultados constantes todos os meses.", before: { leads: "30", roi: "1.1x", conversao: "2.5%", faturamento: "R$80mil" }, after: { leads: "180", roi: "4.5x", conversao: "12%", faturamento: "R$280mil" } },
  { name: "Maria Santos", role: "Diretora, Grupo Orion", quote: "Em 6 meses, triplicamos nosso faturamento com a estratégia da Águia. Profissionalismo e resultado real.", before: { leads: "45", roi: "0.8x", conversao: "3%", faturamento: "R$120mil" }, after: { leads: "250", roi: "5.2x", conversao: "15%", faturamento: "R$450mil" } },
  { name: "Pedro Alves", role: "Fundador, Nova Sistemas", quote: "Nunca tivemos tanta clareza sobre nossos números. A Águia trouxe previsibilidade que nunca tivemos.", before: { leads: "20", roi: "0.9x", conversao: "2%", faturamento: "R$60mil" }, after: { leads: "150", roi: "3.8x", conversao: "10%", faturamento: "R$220mil" } },
];

const metrics = ["leads", "roi", "conversao", "faturamento"] as const;
const metricLabels: Record<string, string> = { leads: "Leads/mês", roi: "ROI", conversao: "Conversão", faturamento: "Faturamento" };

const ResultsSection = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const c = cases[active];

  return (
    <section id="resultados" className="py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }} className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-center mb-4">RESULTADOS QUE TRANSFORMAM NEGÓCIOS DE SERVIÇOS</motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Veja a transformação real de empresas que confiaram no nosso método.</motion.p>
        <div className="flex justify-center gap-3 mb-12">
          {cases.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`relative w-3 h-3 rounded-full transition-colors ${active === i ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5, ease }} className="grid lg:grid-cols-2 gap-10">
            <div className="flex flex-col justify-center">
              <div className="text-4xl text-primary/30 font-serif mb-4">"</div>
              <p className="text-lg text-foreground/90 italic mb-6 leading-relaxed">{c.quote}</p>
              <div><p className="font-bold">{c.name}</p><p className="text-primary text-sm">{c.role}</p></div>
            </div>
            <div className="rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] p-6">
              <div className="grid grid-cols-3 gap-4 text-sm font-bold mb-4 text-muted-foreground"><div>Métrica</div><div>Antes</div><div className="text-primary">Com a Águia</div></div>
              {metrics.map((m) => (
                <div key={m} className="grid grid-cols-3 gap-4 py-3 border-t border-border/30 text-sm">
                  <div className="text-muted-foreground">{metricLabels[m]}</div>
                  <div className="text-muted-foreground">{c.before[m]}</div>
                  <div className="text-primary font-bold">{c.after[m]}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ResultsSection;
