import { PlatformSelector } from '@/components/ui/platform-selector';
import CtaButton from '@/components/ui/cta-button';

const PlatformsSection = () => {
  return (
    <section
      id="plataformas"
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'hsl(var(--background))',
        padding: '100px max(5vw, 48px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '80px',
          maxWidth: '1200px',
          margin: '0 auto',
          flexWrap: 'wrap',
        }}
      >
        {/* LADO ESQUERDO */}
        <div style={{ flex: '1', minWidth: '280px', maxWidth: '520px' }}>
          <span
            className="section-label"
            style={{
              color: 'hsl(var(--primary))',
              marginBottom: '16px',
              display: 'block',
            }}
          >
            COMO FUNCIONA?
          </span>
          <h2
            className="font-heading"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: '#fff',
              lineHeight: 0.94,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            Plataformas que potencializam seu crescimento
          </h2>
          <p
            className="font-body"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 'clamp(14px, 1.4vw, 16px)',
              lineHeight: 1.72,
              marginBottom: '12px',
            }}
          >
            Especialistas nas principais plataformas de tráfego e performance digital.
          </p>
          <p
            className="font-body"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 'clamp(14px, 1.4vw, 16px)',
              lineHeight: 1.72,
              marginBottom: '36px',
            }}
          >
            Domínio em Meta Ads, Google Ads e LinkedIn Ads para atrair o público certo, reduzir custos e gerar resultados com previsibilidade e escala.
          </p>
          <CtaButton variant="dark" href="#diagnostico">
            QUERO ESCALAR COM PERFORMANCE
          </CtaButton>
        </div>

        {/* LADO DIREITO — Platform Selector com logos + animação */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <PlatformSelector />
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;

