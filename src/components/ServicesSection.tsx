import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { ease } from "@/lib/animations";

const tabs = [
  { label: "Estratégia", title: "Estratégia e Posicionamento", desc: "Definimos sua rota de crescimento com base em diagnóstico, dados e diferenciação.", checks: ["Planejamento estratégico baseado em dados", "Posicionamento com clareza e propósito", "Direcionamento de metas e indicadores"] },
  { label: "Mídia", title: "Mídia de Performance", desc: "Campanhas otimizadas para gerar leads qualificados e maximizar seu ROI.", checks: ["Google Ads, Meta Ads e LinkedIn Ads", "Otimização contínua de campanhas", "Segmentação avançada de público"] },
  { label: "Criativos", title: "Criativos de Alta Conversão", desc: "Peças visuais e copies que capturam atenção e geram ação.", checks: ["Design orientado à conversão", "Testes A/B contínuos", "Copies persuasivas e estratégicas"] },
  { label: "Páginas", title: "Landing Pages & Sites", desc: "Páginas otimizadas que transformam visitantes em leads e clientes.", checks: ["Design responsivo e moderno", "Otimização para velocidade", "Formulários inteligentes"] },
  { label: "Dados", title: "Analytics & Business Intelligence", desc: "Dashboards e análises para tomada de decisão inteligente.", checks: ["Dashboards personalizados", "Tracking avançado de conversões", "Relatórios semanais claros"] },
  { label: "Relacionamento", title: "CRM & Automação", desc: "Fluxos automatizados que nutrem leads e aceleram o ciclo de vendas.", checks: ["Automação de e-mail marketing", "Fluxos de nutrição inteligentes", "Integração com CRM"] },
  { label: "Vendas", title: "Estruturação Comercial", desc: "Processos de vendas otimizados para fechar mais negócios.", checks: ["Scripts e cadências de vendas", "Treinamento da equipe comercial", "Pipeline estruturado e previsível"] },
];

const ServicesSection = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const tab = tabs[active];

  return (
    <section id="servicos" className="py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }} className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-4">Conheça as soluções que fazem sua empresa decolar</motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Da estratégia à performance, cada etapa do nosso método é feita para gerar resultados reais e previsíveis.</motion.p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-1 mb-12 border-b border-border/30">
          {tabs.map((t, i) => (
            <button key={t.label} onClick={() => setActive(i)} className={`relative px-4 py-3 text-sm font-medium transition-colors ${active === i ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {t.label}
              {active === i && <motion.div layoutId="serviceTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease }} className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">{tab.title}</h3>
              <p className="text-muted-foreground mb-6">{tab.desc}</p>
              <ul className="space-y-3 mb-8">
                {tab.checks.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-primary flex-shrink-0" />{c}</li>
                ))}
              </ul>
              <a href="#diagnostico" className="inline-block bg-primary text-primary-foreground font-bold rounded-lg px-6 py-3 text-sm shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_35px_rgba(0,230,118,0.5)] hover:scale-105 transition-all">Saiba mais sobre esse serviço</a>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-muted border border-primary/10 shadow-[0_0_40px_rgba(0,230,118,0.05)] aspect-video flex items-center justify-center">
              <div className="text-muted-foreground text-sm">Dashboard Preview</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesSection;
