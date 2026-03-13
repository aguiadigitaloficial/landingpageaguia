import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QuoteSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const aspasEsqRef = useRef<HTMLSpanElement>(null);
  const aspasDirRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(aspasEsqRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(aspasDirRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, delay: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(quoteRef.current,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(sectionRef.current?.querySelector('.quote-card'),
        { borderColor: 'rgba(0,255,127,0)', scale: 0.97 },
        { borderColor: 'rgba(0,255,127,0.2)', scale: 1, duration: 0.9, delay: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 md:py-32 px-6" ref={sectionRef}>
      <div className="quote-card max-w-3xl mx-auto text-center relative rounded-2xl border border-primary/10 bg-primary/[0.02] p-12 md:p-16 breathing-glow">
        <span ref={aspasEsqRef} className="absolute top-6 left-8 text-6xl text-primary/20 font-serif">"</span>
        <span ref={aspasDirRef} className="absolute bottom-6 right-8 text-6xl text-primary/20 font-serif">"</span>
        <p ref={quoteRef} className="text-lg md:text-xl italic leading-relaxed relative z-10">
          O empresário é o <span className="font-bold text-primary">herói da vida real</span>, quanto mais honrarmos e impulsionarmos os negócios <span className="font-bold text-primary">mais prosperidade</span> o Brasil vai ter.
        </p>
      </div>
    </section>
  );
};

export default QuoteSection;
