import { useEffect, useRef, useState } from 'react';
import CtaButton from '@/components/ui/cta-button';

const problems = [
  {
    number: '01',
    title: 'FRUSTRAÇÃO COM AGÊNCIAS',
    text: 'Cansado de promessas vazias e relatórios confusos? Entregamos clareza e um plano de ação real.',
  },
  {
    number: '02',
    title: 'FALTA DE LEADS QUALIFICADOS',
    text: 'Seu tráfego não vira venda? Estruturamos o funil completo para atrair e converter o cliente certo.',
  },
  {
    number: '03',
    title: 'ESTAGNAÇÃO E IMPREVISIBILIDADE',
    text: 'Vendas instáveis? Criamos uma máquina de vendas previsível e escalável que funciona no automático.',
  },
];

const DURATION = 3000;
const TICK = 30;

const ProblemsSection = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = (index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    let elapsed = 0;

    progressRef.current = setInterval(() => {
      elapsed += TICK;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
    }, TICK);

    timerRef.current = setTimeout(() => {
      const next = (index + 1) % problems.length;
      setActive(next);
      startCycle(next);
    }, DURATION);
  };

  useEffect(() => {
    startCycle(0);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (index: number) => {
    setActive(index);
    startCycle(index);
  };

  return (
    <section
      id="problemas"
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#080808',
        padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 80px)',
        overflow: 'hidden',
      }}
    >
      {/* Background Chart (very subtle) */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: 0,
        right: 0,
        height: '70%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.06,
      }}>
        <svg preserveAspectRatio="none" style={{ width: '100%', height: '100%' }} viewBox="0 0 1000 400" fill="none">
          <path
            d="M 0,50 L 100,70 L 200,55 L 350,130 L 500,110 L 650,250 L 800,200 L 1000,370"
            stroke="#FF3333"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 0 8px rgba(255,51,51,0.6))' }}
          />
          <path d="M 0,100 L 1000,100 M 0,200 L 1000,200 M 0,300 L 1000,300" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="6,6" />
        </svg>
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'stretch',
        gap: 'clamp(40px, 6vw, 80px)',
        flexWrap: 'wrap',
      }}>

        {/* LEFT SIDE — Title + CTA */}
        <div style={{ flex: '1', minWidth: '280px', maxWidth: '520px' }}>
          <span
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 600,
              fontSize: '11px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#FF3333',
              display: 'block',
              marginBottom: '16px',
              opacity: 0.9,
            }}
          >
            PROBLEMAS QUE VOCÊ ENFRENTA
          </span>

          <h2
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 64px)',
              color: '#fff',
              lineHeight: 0.94,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            CHEGA DE
            INVESTIR SEM
            VER O RETORNO
          </h2>

          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              color: 'rgba(255,255,255,0.5)',
              fontSize: 'clamp(14px, 1.4vw, 16px)',
              lineHeight: 1.72,
              marginBottom: '12px',
            }}
          >
            Se você se identifica com um desses cenários, está perdendo dinheiro agora.
          </p>

          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              color: 'rgba(255,255,255,0.5)',
              fontSize: 'clamp(14px, 1.4vw, 16px)',
              lineHeight: 1.72,
              marginBottom: '36px',
            }}
          >
            A maioria das agências cria ilusões com métricas de vaidade. Nós expomos as falhas do seu processo atual e construímos uma máquina real de vendas.
          </p>

          <CtaButton variant="dark" href="#diagnostico">
            QUERO RESOLVER MEUS PROBLEMAS
          </CtaButton>
        </div>

        {/* RIGHT SIDE — Stacked Vertical Cards (PlatformSelector style) */}
        <div style={{ flex: '1', minWidth: '300px', position: 'relative' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}>
            {/* Vertical Track Line (left edge) */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'rgba(255,255,255,0.08)',
            }} />

            {/* RED progress indicator (glow traveling down the track) */}
            {(() => {
              const segmentHeight = 100 / problems.length;
              const topPos = active * segmentHeight;
              const fillHeight = (progress / 100) * segmentHeight;
              return (
                <div style={{
                  position: 'absolute',
                  left: '-1px',
                  top: `${topPos}%`,
                  width: '4px',
                  height: `${fillHeight}%`,
                  background: 'linear-gradient(to bottom, rgba(255,51,51,0.2), #FF3333, rgba(255,51,51,0.2))',
                  borderRadius: '2px',
                  boxShadow: '0 0 14px 4px rgba(255,51,51,0.5)',
                  transition: progress === 0 ? 'top 0.3s ease' : 'none',
                  zIndex: 2,
                }} />
              );
            })()}

            {/* Cards */}
            {problems.map((p, i) => {
              const isActive = active === i;

              return (
                <button
                  key={p.number}
                  onClick={() => handleClick(i)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(16px, 3vw, 28px)',
                    padding: 'clamp(24px, 3vw, 36px) clamp(24px, 3vw, 48px)',
                    background: isActive ? 'rgba(255,51,51,0.04)' : 'transparent',
                    border: 'none',
                    borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 0,
                    cursor: 'pointer',
                    position: 'relative',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'background 0.4s ease',
                  }}
                >
                  {/* Active highlight glow from left */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '60%',
                      background: 'linear-gradient(to right, rgba(255,51,51,0.06), transparent)',
                      pointerEvents: 'none',
                    }} />
                  )}

                  {/* Large Number */}
                  <span
                    style={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: 900,
                      fontSize: 'clamp(32px, 4vw, 52px)',
                      color: isActive ? '#FF3333' : 'rgba(255,255,255,0.08)',
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      transition: 'color 0.4s ease',
                      position: 'relative',
                      zIndex: 1,
                      flexShrink: 0,
                    }}
                  >
                    {p.number}
                  </span>

                  {/* Text Content */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3
                      style={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: 700,
                        fontSize: 'clamp(14px, 1.6vw, 18px)',
                        color: isActive ? '#ffffff' : 'rgba(255,255,255,0.25)',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                        transition: 'color 0.4s ease',
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: 400,
                        fontSize: 'clamp(12px, 1.2vw, 14px)',
                        color: isActive ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.15)',
                        lineHeight: 1.6,
                        margin: 0,
                        transition: 'color 0.4s ease',
                        maxWidth: '380px',
                      }}
                    >
                      {p.text}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
