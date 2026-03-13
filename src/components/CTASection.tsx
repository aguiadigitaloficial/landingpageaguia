import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CtaButton from "@/components/ui/cta-button";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(preRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(titleRef.current,
        { y: 56, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.95, delay: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(descRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, delay: 0.24, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(ctaRef.current,
        { y: 24, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, delay: 0.38, ease: 'back.out(1.8)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo('.manifest-glow',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.2, delay: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-background to-[rgba(0,0,0,0.3)]" ref={sectionRef}>
      <div
        className="manifest-glow"
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw', height: '60%',
          background: 'radial-gradient(ellipse, rgba(0,255,127,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p ref={preRef} className="text-lg text-foreground/80 mb-4">
          O jogo não é mais "aparecer para a pessoa certa"...
        </p>
        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-primary mb-6 leading-tight"
        >
          ...E SIM, O PORQUÊ AS PESSOAS DEVEM COMPRAR DE VOCÊ.
        </h2>
        <p ref={descRef} className="text-muted-foreground max-w-2xl mx-auto mb-10">
          Pare de competir por atenção. Comece a construir autoridade, confiança e uma máquina de vendas que trabalha por você todos os dias.
        </p>
        <div ref={ctaRef}>
          <CtaButton variant="dark" href="#diagnostico">
            AGENDAR MINHA ANÁLISE ESTRATÉGICA
          </CtaButton>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

