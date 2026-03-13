import { useEffect, useRef, useState } from 'react';
import { MountainSurface } from '@/components/ui/mountain-surface';
import { CometField } from '@/components/ui/comet-field';
import CtaButton from '@/components/ui/cta-button';

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance animations after a short delay (intro just finished)
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden bg-background"
      style={{ minHeight: '100svh' }}
    >
      {/* ── Layer 0: Montanhas 3D ── */}
      <MountainSurface className="absolute inset-0 z-0" />
      <CometField />

      {/* ── Layer 1: Gradiente de profundidade ── */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(8,8,8,0.2) 0%,
              rgba(8,8,8,0.0) 25%,
              rgba(8,8,8,0.55) 72%,
              rgba(8,8,8,0.95) 100%
            )
          `,
        }}
      />

      {/* ── Layer 2: Conteúdo centralizado ── */}
      <div
        className="relative z-20 flex w-full flex-col items-center justify-center px-6 text-center"
        style={{ minHeight: '100svh', paddingTop: '80px', paddingBottom: '80px' }}
      >
        {/* ── BADGE ── */}
        <div
          className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2"
          style={{
            ...(!visible ? { opacity: 0, transform: 'translateY(20px)' } : { opacity: 1, transform: 'translateY(0)' }),
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            transitionDelay: '0.1s',
            borderColor: 'rgba(0,255,127,0.3)',
            backgroundColor: 'rgba(0,255,127,0.06)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: 'hsl(var(--primary))', boxShadow: '0 0 6px hsl(var(--primary))' }}
          />
          <span
            className="font-body"
            style={{
              fontWeight: 500,
              fontSize: '13px',
              letterSpacing: '0.02em',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            Marketing bom é o que vende.
          </span>
        </div>

        {/* ── TÍTULO PRINCIPAL ── */}
        <h1
          className="font-heading"
          style={{
            fontWeight: 900,
            fontSize: 'clamp(24px, 3vw, 40px)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textWrap: 'balance',
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            ...(!visible ? { opacity: 0, transform: 'translateY(30px)' } : { opacity: 1, transform: 'translateY(0)' }),
            transition: 'opacity 0.9s ease, transform 0.9s ease',
            transitionDelay: '0.3s',
          }}
        >
          Agência especializada em{' '}
          <span style={{ color: 'hsl(var(--primary))', fontWeight: 900 }}>
            empresas de serviços
          </span>
        </h1>

        {/* Espaçamento */}
        <div className="my-8" />

        {/* ── SUBTÍTULO ── */}
        <p
          className="font-body"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(15px, 1.8vw, 19px)',
            lineHeight: 1.75,
            letterSpacing: '0.01em',
            color: '#ffffff',
            maxWidth: '48ch',
            margin: '0 auto',
            textAlign: 'center',
            textWrap: 'pretty',
            ...(!visible ? { opacity: 0, transform: 'translateY(20px)' } : { opacity: 1, transform: 'translateY(0)' }),
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            transitionDelay: '0.5s',
          }}
        >
          De empresário para empresário, vamos entender suas dores que
          te impedem de escalar e desenvolver uma estrutura profissional,
          previsível e escalável.
        </p>

        {/* ── CTAs ── */}
        <div className="cta-group mt-10 flex flex-wrap items-center justify-center gap-4" style={{
          ...(!visible ? { opacity: 0, transform: 'translateY(20px)' } : { opacity: 1, transform: 'translateY(0)' }),
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          transitionDelay: '0.7s',
        }}>
          <CtaButton variant="dark" href="#diagnostico">
            Quero Ser Águia
          </CtaButton>

          {/* Divisor vertical */}
          <div className="cta-divider" style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

          {/* Link secundário */}
          <a
            href="#logos"
            className="font-body"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(13px, 1.1vw, 15px)',
              letterSpacing: '0.01em',
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = 'hsl(145, 100%, 45%)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
            }}
          >
            Ver como funciona
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </a>
        </div>

      </div>

    </section>
  );
};

export default Hero;
