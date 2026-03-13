import { useEffect, useRef, useState } from 'react';
import { TrendingDown, Users, BarChart3, type LucideIcon } from 'lucide-react';
import CtaButton from '@/components/ui/cta-button';

const cards: { number: string; Icon: LucideIcon; title: string; text: string }[] = [
  {
    number: '01',
    Icon: TrendingDown,
    title: 'FRUSTRAÇÃO COM AGÊNCIAS',
    text: 'Cansado de promessas vazias e relatórios confusos? Nós entregamos clareza e um plano de ação real.',
  },
  {
    number: '02',
    Icon: Users,
    title: 'FALTA DE LEADS QUALIFICADOS',
    text: 'Seu tráfego não vira venda? Nós estruturamos seu funil completo para atrair e converter o cliente certo.',
  },
  {
    number: '03',
    Icon: BarChart3,
    title: 'ESTAGNAÇÃO / FALTA DE PREVISIBILIDADE',
    text: 'Suas vendas são instáveis? Criamos uma máquina de vendas previsível e escalável.',
  },
];

// Offset for the "deck" cards behind the active one
const deckOffsets = [
  { rotate: '0deg',    translateX: '0px',  translateY: '0px',  scale: 1 },      // active (top)
  { rotate: '2.5deg',  translateX: '6px',  translateY: '-8px', scale: 0.97 },   // behind 1
  { rotate: '-2deg',   translateX: '-5px', translateY: '-16px', scale: 0.94 },  // behind 2
];

const ProblemsSection = () => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const btnRef      = useRef<HTMLDivElement>(null);
  const dotsRef     = useRef<HTMLDivElement>(null);

  const [active, setActive]     = useState(0);
  const [visible, setVisible]   = useState(false);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Entrance animation on scroll into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Auto-advance once section is visible
  useEffect(() => {
    if (!visible) return;
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setActive(prev => (prev + 1) % cards.length);
      }, 3500);
    };
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [visible]);

  const goTo = (index: number) => {
    if (index === active || animating) return;
    // Reset auto-advance timer on manual interaction
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % cards.length);
    }, 3500);
    setAnimating(true);
    setActive(index);
    setTimeout(() => setAnimating(false), 500);
  };

  // For each card, compute its position in the deck relative to the active index
  const getDeckPosition = (cardIndex: number) => {
    const diff = (cardIndex - active + cards.length) % cards.length;
    return deckOffsets[diff] ?? deckOffsets[2];
  };

  const fadeStyle = (delay = 0): React.CSSProperties => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <div
      ref={sectionRef}
      id="problemas"
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#00FF7F',
        padding: 'clamp(64px, 10vh, 120px) clamp(20px, 5vw, 80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Title */}
      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 'clamp(6px, 1.5vw, 12px)', ...fadeStyle(0) }}>
        <h2
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(26px, 6.5vw, 72px)',
            color: '#0a0a0a',
            letterSpacing: '-0.025em',
            lineHeight: 0.95,
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          CHEGA DE INVESTIR<br />SEM VER O RETORNO
        </h2>
      </div>

      {/* Subtitle */}
      <div ref={subtitleRef} style={{ textAlign: 'center', marginBottom: 'clamp(48px, 8vh, 96px)', ...fadeStyle(150) }}>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(13px, 1.5vw, 17px)',
            color: 'rgba(0,0,0,0.5)',
            lineHeight: 1.6,
            maxWidth: 'clamp(280px, 50vw, 520px)',
            margin: '10px auto 0',
          }}
        >
          Identifique os problemas que impedem seu crescimento e descubra como transformá-los em oportunidades.
        </p>
      </div>

      {/* Card stack */}
      <div
        style={{
          ...fadeStyle(300),
          position: 'relative',
          width: 'clamp(280px, 85vw, 520px)',
          height: 'clamp(300px, 44vh, 400px)',
          marginBottom: 'clamp(52px, 7vh, 72px)',
        }}
      >
        {cards.map((card, i) => {
          const { Icon } = card;
          const { rotate, translateX, translateY, scale } = getDeckPosition(i);
          const isActive = i === active;

          return (
            <div
              key={card.number}
              onClick={() => !isActive && goTo(i)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                background: '#0a0a0a',
                borderRadius: 'clamp(14px, 2vw, 22px)',
                padding: 'clamp(24px, 4vw, 48px)',
                boxShadow: isActive
                  ? '0 32px 70px rgba(0,0,0,0.35)'
                  : '0 16px 40px rgba(0,0,0,0.2)',
                willChange: 'transform, opacity',
                zIndex: isActive ? 3 : (i === (active + 1) % cards.length ? 2 : 1),
                transform: `translateY(${translateY}) translateX(${translateX}) rotate(${rotate}) scale(${scale})`,
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                cursor: isActive ? 'default' : 'pointer',
              }}
            >
              <span
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(10px, 1vw, 12px)',
                  letterSpacing: '0.2em',
                  color: '#00FF7F',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: 'clamp(14px, 2vh, 20px)',
                }}
              >
                {card.number} / 03
              </span>

              <div
                style={{
                  width: 'clamp(36px, 5vw, 48px)',
                  height: 'clamp(36px, 5vw, 48px)',
                  borderRadius: '10px',
                  background: 'rgba(0,255,127,0.08)',
                  border: '1px solid rgba(0,255,127,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'clamp(14px, 2.5vh, 24px)',
                }}
              >
                <Icon size={22} color="#00FF7F" strokeWidth={1.8} />
              </div>

              <h3
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(16px, 2.2vw, 24px)',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                  marginBottom: 'clamp(10px, 1.5vh, 16px)',
                }}
              >
                {card.title}
              </h3>

              <p
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(12px, 1.3vw, 15px)',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {card.text}
              </p>
            </div>
          );
        })}
      </div>

      {/* Dot navigation */}
      <div
        ref={dotsRef}
        style={{
          ...fadeStyle(450),
          display: 'flex',
          gap: '10px',
          marginBottom: 'clamp(40px, 6vh, 64px)',
        }}
      >
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ver card ${i + 1}`}
            style={{
              width:  i === active ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: i === active ? '#0a0a0a' : 'rgba(0,0,0,0.25)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* CTA Button */}
      <div ref={btnRef} style={fadeStyle(550)}>
        <CtaButton variant="on-green" href="#diagnostico">
          QUERO RESOLVER MEU PROBLEMA
        </CtaButton>
      </div>
    </div>
  );
};

export default ProblemsSection;
