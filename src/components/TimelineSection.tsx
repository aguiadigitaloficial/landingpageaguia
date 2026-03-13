import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const months = [
  { month: "Mês 1-2", title: "Diagnóstico e Setup", desc: "Análise completa do negócio, configuração de ferramentas e definição de estratégia inicial." },
  { month: "Mês 3-4", title: "Primeiras Campanhas", desc: "Lançamento de campanhas piloto, testes de público e otimização de criativos." },
  { month: "Mês 5-6", title: "Escala Inicial", desc: "Aumento de investimento nas campanhas vencedoras e expansão de canais." },
  { month: "Mês 7-8", title: "Automação & CRM", desc: "Implementação de fluxos automatizados e integração com processo comercial." },
  { month: "Mês 9-10", title: "Otimização Avançada", desc: "Refinamento contínuo baseado em dados, novos criativos e segmentações." },
  { month: "Mês 11-12", title: "Máquina de Vendas", desc: "Operação completa rodando com previsibilidade e escalabilidade." },
];

const TimelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 82%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 1.4, ease: 'power2.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', end: 'bottom 30%', scrub: 1 } }
      );

      gsap.utils.toArray<HTMLElement>('.timeline-dot').forEach((dot) => {
        gsap.fromTo(dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)',
            scrollTrigger: { trigger: dot, start: 'top 75%', toggleActions: 'play none none reverse' } }
        );
      });

      gsap.utils.toArray<HTMLElement>('.timeline-item-left').forEach((item) => {
        gsap.fromTo(item,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      });

      gsap.utils.toArray<HTMLElement>('.timeline-item-right').forEach((item) => {
        gsap.fromTo(item,
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 md:py-32 px-6" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-primary" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight">IMPLEMENTAÇÃO EM 12 MESES!</h2>
            <div className="w-12 h-0.5 bg-primary" />
          </div>
        </div>

        <div className="relative">
          {/* Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/30">
            <div ref={lineRef} className="w-full h-full bg-primary origin-top" style={{ transformOrigin: 'top center' }} />
          </div>

          <div className="space-y-12">
            {months.map((m, i) => (
              <div
                key={m.month}
                className={`relative grid grid-cols-[1fr_auto_1fr] gap-6 items-center`}
              >
                <div className={`${i % 2 === 0 ? 'timeline-item-left text-right pr-6' : 'timeline-item-right order-3 text-left pl-6'}`}>
                  <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">{m.month}</p>
                  <h3 className="font-bold text-sm md:text-base mb-1">{m.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">{m.desc}</p>
                </div>
                <div
                  className="timeline-dot relative z-10 w-4 h-4 rounded-full bg-primary border-2 border-primary/40"
                  style={{ boxShadow: '0 0 12px rgba(0,255,127,0.5)' }}
                />
                <div className={`${i % 2 === 0 ? 'order-3' : ''}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
