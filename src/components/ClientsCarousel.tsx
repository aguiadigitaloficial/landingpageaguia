export function ClientsCarousel() {
  const logosRow1 = [
    { name: 'BENVIX', src: '/logos/BENVIX - logo horizontal branco 1.png' },
    { name: 'Bordas', src: '/logos/Bordas (Sem Fundo) 1.png' },
    { name: 'Branco', src: '/logos/Branco 1.png' },
    { name: 'CLUBMED', src: '/logos/CLUBMED 2.png' },
    { name: 'Design 19', src: '/logos/Design sem nome (19) 1.png' },
    { name: 'Design 22', src: '/logos/Design sem nome (22) 1.png' },
    { name: 'Design 23', src: '/logos/Design sem nome (23) 1.png' },
    { name: 'Design 3', src: '/logos/Design sem nome (3) (1) 1.png' },
    { name: 'KORUZ', src: '/logos/KORUZ_5 (1) 1.png' },
  ];

  const logosRow2 = [
    { name: 'LOGO GUIAR', src: '/logos/LOGO GUIAR 2 1.png' },
    { name: 'LOGO INET', src: '/logos/LOGO INET - BRANCA 1.png' },
    { name: 'Prancheta', src: '/logos/Prancheta 46 1.png' },
    { name: 'VIVARE', src: '/logos/VIVARE - logo horizontal branco 1.png' },
    { name: 'Bhering', src: '/logos/bhering 1.png' },
    { name: 'Contecnica', src: '/logos/contecnica 1.png' },
    { name: 'MasterClinic', src: '/logos/logomasterclinic 1.png' },
    { name: 'NorteLife', src: '/logos/nortelife 1.png' },
    { name: 'SF Solar', src: '/logos/sfsolar 1.png' },
  ];

  const row1 = [...logosRow1, ...logosRow1];
  const row2 = [...logosRow2, ...logosRow2];

  return (
    <section
      id="clientes"
      style={{
        backgroundColor: 'transparent',
        padding: '0 0 40px',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
        marginTop: '-60px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '60px 0 52px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ textAlign: 'center', padding: '0 40px 44px' }}>
          <h2
            className="font-heading"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(22px, 2.8vw, 36px)',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '14px',
              textTransform: 'uppercase',
            }}
          >
            Conheça nosso método exclusivo e se torne
            <br />um dos nossos cases de sucesso
          </h2>
          <p
            className="font-body"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(13px, 1.3vw, 15px)',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7,
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            Empresas de diferentes segmentos confiam no nosso método para escalar com
            previsibilidade, lucratividade e domínio de mercado. Agora, você pode ser
            o próximo case de sucesso.
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px',
            background: 'linear-gradient(to right, rgba(10,10,14,0.95), transparent)',
            zIndex: 10, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px',
            background: 'linear-gradient(to left, rgba(10,10,14,0.95), transparent)',
            zIndex: 10, pointerEvents: 'none',
          }} />

          <div style={{ overflow: 'hidden', marginBottom: '24px' }}>
            <div
              className="marquee-track-ltr"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0',
                width: 'max-content',
                animation: 'marquee-ltr 28s linear infinite',
              }}
            >
              {row1.map((logo, i) => (
                <LogoItem key={`r1-${i}`} logo={logo} />
              ))}
            </div>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <div
              className="marquee-track-rtl"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0',
                width: 'max-content',
                animation: 'marquee-rtl 34s linear infinite',
              }}
            >
              {row2.map((logo, i) => (
                <LogoItem key={`r2-${i}`} logo={logo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type LogoData = {
  name: string;
  src?: string;
};

function LogoItem({ logo }: { logo: LogoData }) {
  if (!logo.src) return null; // Apenas imagens
  
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 36px',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        height: '52px',
        flexShrink: 0,
      }}
    >
      <img
        src={encodeURI(logo.src)}
        alt={logo.name}
        style={{
          maxHeight: '36px',
          maxWidth: '160px',
          objectFit: 'contain',
          opacity: 0.7,
          transition: 'all 0.3s ease',
          filter: 'brightness(1) invert(0)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.7';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      />
    </div>
  );
}

export default ClientsCarousel;
