import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BGPattern } from '@/components/ui/bg-pattern';
import CtaButton from '@/components/ui/cta-button';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    quote: 'É extraordinário ver o quão qualificada é esta equipe e o quão focada ela está nos resultados da empresa. Estou impressionado com a forma como trabalham! A previsibilidade das vendas é fantástica. Obrigado, equipe da Águia Digital, vocês estão nos surpreendendo cada vez mais de forma positiva.',
    name: 'Christian Marques',
    role: '16 avaliações · 1 foto',
    initials: 'C',
    color: '#8B5CF6',
    stars: 5,
  },
  {
    id: 2,
    quote: 'Depois de várias decepções com agências desonestas, finalmente encontrei a Aguia! Estou com eles há mais de 2 anos. Eles são muito comprometidos, honestos e entregam resultados!',
    name: 'Matheus Montebelo',
    role: '1 avaliação',
    initials: 'M',
    color: '#3B82F6',
    stars: 5,
  },
  {
    id: 3,
    quote: 'As estratégias de marketing digital são muito bem estruturadas. A Águia Digital compreende profundamente os negócios de seus clientes e desenvolve um plano que gera leads de alta qualidade. Parabéns à equipe!',
    name: 'Alexandre Ribeiro',
    role: 'Guia Local · 50 avaliações · 25 fotos',
    initials: 'A',
    color: '#EF4444',
    stars: 5,
  },
  {
    id: 4,
    quote: 'A família Vidal é cliente da agência Águia e recomendamos os seus serviços. Quem procura uma empresa parceira e amigável, com um serviço excelente, encontrou a melhor da cidade!',
    name: 'Agência faMilha Vidal',
    role: '1 avaliação',
    initials: 'A',
    color: '#F59E0B',
    stars: 5,
  },
  {
    id: 5,
    quote: 'Se tem alguém que sabe como entregar resultados, são eles 👊🚀',
    name: 'Dias de Lincoln',
    role: '12 avaliações · 3 fotos',
    initials: 'L',
    color: '#10B981',
    stars: 5,
  },
  {
    id: 6,
    quote: 'Eles sabem o que estão fazendo. Se você precisa aprimorar seu marketing digital, este é o lugar certo!',
    name: 'ohjao',
    role: 'Guia Local · 12 avaliações · 10 fotos',
    initials: 'O',
    color: '#6366F1',
    stars: 5,
  },
  {
    id: 7,
    quote: '🚀🚀🚀',
    name: 'Pedro Trindade',
    role: '2 avaliações',
    initials: 'P',
    color: '#EC4899',
    stars: 5,
  },
  {
    id: 8,
    quote: '⭐⭐⭐⭐⭐',
    name: 'Eliezer Reis',
    role: '1 avaliação',
    initials: 'E',
    color: '#64748B',
    stars: 5,
  },
  {
    id: 9,
    quote: 'A Águia Digital transforma sua operação. Previsibilidade real e resultados constantes todos os meses. Recomendo sem hesitar.',
    name: 'João Martins',
    role: '3 avaliações',
    initials: 'J',
    color: '#0EA5E9',
    stars: 5,
  },
  {
    id: 10,
    quote: 'Equipe extremamente profissional. Resultados acima do esperado desde o primeiro mês. Parceria que pretendo manter por muitos anos.',
    name: 'Maria Santos',
    role: '5 avaliações',
    initials: 'M',
    color: '#14B8A6',
    stars: 5,
  },
];

const col1 = testimonials.slice(0, 4);
const col2 = testimonials.slice(4, 7);
const col3 = testimonials.slice(7, 10);

function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#FBBC05">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

function TestimonialCard({ quote, name, role, initials, color, stars }: {
  quote: string; name: string; role: string; initials: string; color: string; stars: number;
}) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: 'clamp(10px, 1.2vw, 14px)',
      padding: 'clamp(14px, 2vw, 18px)',
      flexShrink: 0,
      cursor: 'default',
      boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
        <div style={{
          width: 'clamp(28px, 3vw, 34px)',
          height: 'clamp(28px, 3vw, 34px)',
          borderRadius: '50%',
          backgroundColor: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: 'Arial, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(11px, 1.2vw, 14px)',
            color: '#ffffff',
          }}>{initials}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(11px, 1.1vw, 13px)',
            color: '#202124',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>{name}</div>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(9px, 0.9vw, 11px)',
            color: '#70757A',
            marginTop: '1px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>{role}</div>
        </div>
        <GoogleIcon />
      </div>

      <div style={{ display: 'flex', gap: '2px', marginBottom: '10px' }}>
        {Array.from({ length: stars }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>

      <p style={{
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 400,
        fontSize: 'clamp(11px, 1.1vw, 13px)',
        color: '#3C4043',
        lineHeight: 1.65,
        margin: 0,
      }}>{quote}</p>

      <div style={{
        marginTop: '14px',
        paddingTop: '12px',
        borderTop: '1px solid #F1F3F4',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#4285F4"/>
        </svg>
        <span style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 400,
          fontSize: '11px',
          color: '#70757A',
        }}>Google Maps · João Monlevade, MG</span>
      </div>
    </div>
  );
}

function MarqueeColumn({ cards, direction, speed, hideOnMobile = false }: {
  cards: typeof testimonials;
  direction: 'up' | 'down';
  speed: number;
  hideOnMobile?: boolean;
}) {
  const doubled = [...cards, ...cards];
  return (
    <div
      className={hideOnMobile ? 'testimonials-col3' : ''}
      style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(12px, 1.5vw, 16px)',
          animationDuration: `${speed}s`,
        }}
        className={direction === 'down' ? 'animate-marquee-down' : 'animate-marquee-up'}
      >
        {doubled.map((card, i) => (
          <TestimonialCard
            key={`${card.id}-${i}`}
            quote={card.quote}
            name={card.name}
            role={card.role}
            initials={card.initials}
            color={card.color}
            stars={card.stars}
          />
        ))}
      </div>
    </div>
  );
}

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [titleRef.current, subtitleRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo(
        gridRef.current,
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#ffffff',
        padding: 'clamp(80px, 10vh, 140px) clamp(20px, 5vw, 80px)',
        overflow: 'hidden',
      }}
    >
      {/* Dots pattern */}
      <BGPattern
        variant="dots"
        mask="fade-center"
        size={28}
        fill="#e0e0e0"
        style={{ zIndex: 0 }}
      />

      {/* Glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: '60vw', height: '40vh',
        background: 'radial-gradient(ellipse, rgba(0,255,127,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vh, 80px)' }}>
        <div ref={titleRef} style={{ opacity: 0 }}>
          {/* Badge Google */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(0,0,0,0.04)',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '100px',
            padding: '8px 18px',
            marginBottom: '24px',
          }}>
            <GoogleIcon size={18} />
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              color: 'rgba(0,0,0,0.6)',
              letterSpacing: '0.02em',
            }}>Google Reviews</span>
          </div>

          {/* Nota 5.0 com estrelas */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}>
            <span style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(40px, 6vw, 72px)',
              color: '#111111',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}>5.0</span>
            <div>
              <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} width="22" height="22" viewBox="0 0 24 24" fill="#FBBC05">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span style={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                fontSize: '13px',
                color: 'rgba(0,0,0,0.45)',
              }}></span>
            </div>
          </div>

          <h2 style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 4.5vw, 60px)',
            color: '#111111',
            letterSpacing: '-0.025em',
            lineHeight: 0.95,
            textTransform: 'uppercase',
            margin: 0,
          }}>
            O QUE NOSSOS<br />
            <span style={{ color: '#00FF7F' }}>CLIENTES DIZEM</span>
          </h2>
        </div>

        <div ref={subtitleRef} style={{ opacity: 0 }}>
          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.5vw, 17px)',
            color: 'rgba(0,0,0,0.45)',
            lineHeight: 1.65,
            maxWidth: '480px',
            margin: '20px auto 0',
          }}>
            Avaliações reais de clientes reais. Veja o que dizem sobre trabalhar com a Águia Digital.
          </p>
        </div>
      </div>

      {/* Grid 3D com marquee vertical */}
      <div ref={gridRef} style={{ opacity: 0 }}>
        <div style={{ perspective: '400px', perspectiveOrigin: '50% 50%', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            gap: 'clamp(12px, 2vw, 20px)',
            height: 'clamp(500px, 65vh, 750px)',
            overflow: 'hidden',
            transform: 'rotateX(12deg) rotateY(0deg)',
            transformStyle: 'preserve-3d',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}>
            <MarqueeColumn cards={col1} direction="down" speed={28} />
            <MarqueeColumn cards={col2} direction="up" speed={34} />
            <MarqueeColumn cards={col3} direction="down" speed={30} hideOnMobile />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 'clamp(40px, 6vh, 64px)' }}>
        <CtaButton variant="on-white" href="#diagnostico">
          QUERO SER O PRÓXIMO CASE
        </CtaButton>
      </div>
    </section>
  );
};

export default TestimonialsSection;
