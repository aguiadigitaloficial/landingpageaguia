export function ClientsCarousel() {
  const logosRow1 = [
    'Sartori', 'R4Seed', 'iST', 'Solar Energia', 'VentoMa',
    'Moruz.AI', 'Living', 'MAIS', 'Microlins', 'ABaste',
  ];

  const logosRow2 = [
    'Dagher', 'Grupo Orion', 'Nova Sistemas', 'TechServ', 'MaxLead',
    'ProSales', 'AlphaGrow', 'NexGen', 'CoreBiz', 'ScaleUp',
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
                <LogoItem key={`r1-${i}`} name={logo} />
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
                <LogoItem key={`r2-${i}`} name={logo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoItem({ name }: { name: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0 36px',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        height: '52px',
        flexShrink: 0,
      }}
    >
      <span
        className="font-heading"
        style={{
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          whiteSpace: 'nowrap',
          transition: 'color 0.2s',
        }}
      >
        {name}
      </span>
    </div>
  );
}

export default ClientsCarousel;
