import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, FileText, Zap } from "lucide-react";
import CtaButton from "@/components/ui/cta-button";


gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: Target, title: "Mapeamento de oportunidades", desc: "Identificamos pontos de melhoria no seu funil de vendas" },
  { icon: FileText, title: "Plano de ação inicial", desc: "Estratégias práticas para começar a escalar com previsibilidade" },
  { icon: Zap, title: "Prioridades para 30 dias", desc: "Roadmap claro de ações para gerar resultados rápidos" },
];

const DiagnosticForm = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    empresa: '',
    cargo: '',
    tamanho: '',
    desafio: '',
    orcamento: '',
    preferencia: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar apenas se nome e telefone estão preenchidos para liberar o enviar
    if (!formData.nome || !formData.telefone) {
      alert("Por favor, preencha pelo menos seu nome e telefone para podermos contatá-lo.");
      return;
    }

    const message = `*Nova solicitação de Diagnóstico através do site*

*Nome:* ${formData.nome}
*Telefone:* ${formData.telefone}
*E-mail:* ${formData.email}
*Empresa:* ${formData.empresa}
*Cargo:* ${formData.cargo}
*Tamanho da equipe:* ${formData.tamanho}
*Orçamento mensal:* ${formData.orcamento}
*Decisão de contato:* ${formData.preferencia}

*Principal desafio de negócio:*
${formData.desafio}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=5531999910784&text=${encodedMessage}`, '_blank');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(descRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, delay: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
      );

      gsap.utils.toArray<HTMLElement>('.form-benefit').forEach((item, i) => {
        gsap.fromTo(item,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.65, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: benefitsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      });

      gsap.fromTo(formRef.current,
        { x: 50, opacity: 0, scale: 0.97 },
        { x: 0, opacity: 1, scale: 1, duration: 0.9, delay: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );

      gsap.utils.toArray<HTMLElement>('.form-field').forEach((field, i) => {
        gsap.fromTo(field,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, delay: 0.2 + i * 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
        );
      });

      gsap.fromTo('.form-submit-btn',
        { y: 16, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, delay: 0.7, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: formRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="diagnostico" className="py-24 md:py-32 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">Diagnóstico gratuito para o seu crescimento</h2>
          <p ref={descRef} className="text-muted-foreground mb-10">Receba uma análise objetiva do seu funil e descubra como gerar mais resultados com menos investimento.</p>
          <div ref={benefitsRef} className="space-y-6">
            {benefits.map((b) => (
              <div key={b.title} className="form-benefit flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><b.icon className="w-5 h-5 text-primary" /></div>
                <div><h3 className="font-bold text-sm mb-1">{b.title}</h3><p className="text-muted-foreground text-sm">{b.desc}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div ref={formRef} className="rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] p-6 md:p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome completo *" required className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-foreground placeholder:text-muted-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
              <input name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone com DDD *" required className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-foreground placeholder:text-muted-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div className="form-field">
              <input name="email" value={formData.email} onChange={handleChange} placeholder="E-mail profissional *" required type="email" className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-foreground placeholder:text-muted-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="empresa" value={formData.empresa} onChange={handleChange} placeholder="Empresa *" required className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-foreground placeholder:text-muted-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
              <input name="cargo" value={formData.cargo} onChange={handleChange} placeholder="Cargo/Função" className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-foreground placeholder:text-muted-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>
            <div className="form-field">
              <select name="tamanho" value={formData.tamanho} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-muted-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                <option value="">Tamanho da empresa</option>
                <option value="1-10">1-10 funcionários</option>
                <option value="11-50">11-50 funcionários</option>
                <option value="51-200">51-200 funcionários</option>
                <option value="200+">200+ funcionários</option>
              </select>
            </div>
            <div className="form-field">
              <textarea name="desafio" value={formData.desafio} onChange={handleChange} placeholder="Principal desafio hoje" rows={3} className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-foreground placeholder:text-muted-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" />
            </div>
            <div className="form-field">
              <select name="orcamento" value={formData.orcamento} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-muted-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                <option value="">Orçamento mensal em marketing</option>
                <option value="ate5k">Até R$5.000</option>
                <option value="5k-15k">R$5.000 - R$15.000</option>
                <option value="15k-50k">R$15.000 - R$50.000</option>
                <option value="50k+">Acima de R$50.000</option>
              </select>
            </div>
            <div className="form-field">
              <select name="preferencia" value={formData.preferencia} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-muted-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                <option value="">Preferência de contato</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">E-mail</option>
                <option value="telefone">Telefone</option>
              </select>
            </div>
            <div className="form-field">
              <label className="flex items-start gap-3 text-xs text-muted-foreground">
                <input type="checkbox" className="mt-0.5 accent-primary" />
                Concordo em receber comunicações da Águia Digital.
              </label>
            </div>
            <CtaButton variant="dark" type="submit" className="w-full form-submit-btn">
              QUERO MEU DIAGNÓSTICO GRATUITO
            </CtaButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticForm;
