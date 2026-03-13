import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const beforeItems = [
  'Sem clareza sobre métricas e resultados',
  'Investimento sem retorno previsível',
  'Dependência de indicações para vender',
  'Equipe de marketing sem direcionamento',
  'Funil de vendas inexistente ou quebrado',
];

const afterItems = [
  'Dashboard com métricas em tempo real',
  'ROI previsível e escalável mês a mês',
  'Máquina de leads qualificados ativa 24/7',
  'Equipe alinhada com metas claras',
  'Funil completo: atração → conversão → retenção',
];

export function BeforeAfterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const beforeRef  = useRef<HTMLDivElement>(null);
  const afterRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Título
      gsap.fromTo(titleRef.current,
        { y: 44, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Card ANTES — entra da esquerda
      gsap.fromTo(beforeRef.current,
        { x: -60, opacity: 0, scale: 0.96 },
        {
          x: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Card DEPOIS — entra da direita com delay
      gsap.fromTo(afterRef.current,
        { x: 60, opacity: 0, scale: 0.96 },
        {
          x: 0, opacity: 1, scale: 1, duration: 0.9, delay: 0.18, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Itens da lista entram em stagger após os cards
      gsap.fromTo('.before-item',
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: {
            trigger: beforeRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo('.after-item',
        { x: 20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.2, ease: 'power2.out',
          scrollTrigger: {
            trigger: afterRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="diferenca"
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#080808',
        padding: 'clamp(80px, 10vh, 140px) clamp(20px, 5vw, 80px)',
        overflow: 'hidden',
      }}
    >
      {/* Glow verde sutil de fundo, lado direito */}
      <div style={{
        position: 'absolute',
        top: '30%', right: '-5%',
        width: '40vw', height: '60%',
        background: 'radial-gradient(ellipse, rgba(0,255,127,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* HEADER */}
      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vh, 72px)', opacity: 0 }}>
        <span style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600,
          fontSize: '11px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#00FF7F',
          display: 'block',
          marginBottom: '16px',
        }}>
          COMPARATIVO
        </span>
        <h2 style={{
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(28px, 5vw, 68px)',
          color: '#ffffff',
          letterSpacing: '-0.025em',
          lineHeight: 0.94,
          textTransform: 'uppercase',
          margin: '0 0 20px',
        }}>
          A DIFERENÇA ESTÁ<br />
          <span style={{ color: '#00FF7F' }}>NA ESPECIALIZAÇÃO</span>
        </h2>
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 400,
          fontSize: 'clamp(14px, 1.5vw, 17px)',
          color: 'rgba(255,255,255,0.45)',
          maxWidth: '520px',
          margin: '0 auto',
          lineHeight: 1.65,
        }}>
          A Águia Digital é especializada em empresas que querem crescer de verdade.
        </p>
      </div>

      {/* GRID DOS CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        gap: 'clamp(16px, 2.5vw, 28px)',
        maxWidth: '1100px',
        margin: '0 auto',
        alignItems: 'stretch',
      }}>

        {/* ── CARD ANTES ── */}
        <div
          ref={beforeRef}
          style={{
            backgroundColor: '#0e0e0e',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 'clamp(16px, 2vw, 24px)',
            padding: 'clamp(28px, 4vw, 44px)',
            opacity: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Tag ANTES */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: 'rgba(239,68,68,0.12)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: '100px',
            padding: '5px 14px',
            marginBottom: 'clamp(20px, 3vh, 28px)',
          }}>
            <span style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.18em',
              color: '#EF4444',
              textTransform: 'uppercase',
            }}>
              ANTES
            </span>
          </div>

          <h3 style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(18px, 2.2vw, 26px)',
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            marginBottom: 'clamp(24px, 3.5vh, 36px)',
          }}>
            OPERAÇÃO DESORGANIZADA<br />E SEM RESULTADOS
          </h3>

          {/* Lista de problemas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 1.8vh, 18px)' }}>
            {beforeItems.map((item, i) => (
              <div
                key={i}
                className="before-item"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  opacity: 0,
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(239,68,68,0.12)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}>
                  <X size={10} color="#EF4444" strokeWidth={2.5} />
                </div>
                <span style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(13px, 1.3vw, 15px)',
                  color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.55,
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Overlay sutil de ruído no card antes */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
            pointerEvents: 'none',
            borderRadius: 'inherit',
          }} />
        </div>

        {/* ── CARD DEPOIS — pulsante ── */}
        <div
          ref={afterRef}
          className="card-pulse"
          style={{
            backgroundColor: '#0a1a10',
            border: '1px solid rgba(0,255,127,0.2)',
            borderRadius: 'clamp(16px, 2vw, 24px)',
            padding: 'clamp(28px, 4vw, 44px)',
            opacity: 0,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 0 0 1px rgba(0,255,127,0.08), 0 0 40px rgba(0,255,127,0.06), inset 0 1px 0 rgba(0,255,127,0.12)',
          }}
        >
          {/* Glow interno no topo */}
          <div style={{
            position: 'absolute',
            top: '-30%', left: '50%',
            transform: 'translateX(-50%)',
            width: '80%', height: '60%',
            background: 'radial-gradient(ellipse, rgba(0,255,127,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Tag DEPOIS */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: 'rgba(0,255,127,0.1)',
            border: '1px solid rgba(0,255,127,0.3)',
            borderRadius: '100px',
            padding: '5px 14px',
            marginBottom: 'clamp(20px, 3vh, 28px)',
          }}>
            <span style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.18em',
              color: '#00FF7F',
              textTransform: 'uppercase',
            }}>
              DEPOIS
            </span>
          </div>

          <h3 style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(18px, 2.2vw, 26px)',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            marginBottom: 'clamp(24px, 3.5vh, 36px)',
          }}>
            OPERAÇÃO ESTRUTURADA<br />E ESCALÁVEL
          </h3>

          {/* Lista de benefícios */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 1.8vh, 18px)' }}>
            {afterItems.map((item, i) => (
              <div
                key={i}
                className="after-item"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  opacity: 0,
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,255,127,0.1)',
                  border: '1px solid rgba(0,255,127,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                  boxShadow: '0 0 8px rgba(0,255,127,0.2)',
                }}>
                  <Check size={10} color="#00FF7F" strokeWidth={2.5} />
                </div>
                <span style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(13px, 1.3vw, 15px)',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.55,
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Linha de luz verde no rodapé do card */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: '10%', right: '10%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(0,255,127,0.5), transparent)',
          }} />
        </div>

      </div>
    </section>
  );
}

export default BeforeAfterSection;
