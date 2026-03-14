import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GreenColor = '#00FF7F';

export function BeforeAfterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  const loseRef = useRef<HTMLDivElement>(null);
  const vsRef = useRef<HTMLDivElement>(null);
  
  // Refs for list items to animate them
  const winListRef = useRef<HTMLUListElement>(null);
  const loseListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Arena Elements (Cards + VS)
      gsap.fromTo([winRef.current, vsRef.current, loseRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate Win List Items
      if (winListRef.current) {
        gsap.fromTo(winListRef.current.children,
          { x: -15, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.4,
            scrollTrigger: {
              trigger: winRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // Animate Lose List Items
      if (loseListRef.current) {
        gsap.fromTo(loseListRef.current.children,
          { x: -15, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.6,
            scrollTrigger: {
              trigger: loseRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="diferenca"
      className="pwd-section relative overflow-hidden"
    >
      <style>{`
        .pwd-section {
          background-color: #080808;
          padding: 140px 80px;
          font-family: 'DM Sans', sans-serif;
        }
        
        @media (max-width: 900px) {
          .pwd-section { padding: 72px 28px; }
        }
        @media (max-width: 600px) {
          .pwd-section { padding: 64px 20px 0; }
        }

        .pwd-header {
          text-align: center;
          margin-bottom: 72px;
          opacity: 0;
        }

        .pwd-arena {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          gap: 24px;
          max-width: 820px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* CARD BASE STYLES */
        .pwd-card {
           border-radius: 12px;
           padding: 44px 36px;
           position: relative;
           overflow: hidden;
           backdrop-filter: blur(10px);
        }

        /* WRAPPERS p/ Icones Flutuantes */
        .col-win-wrapper {
          flex: 1.15;
          position: relative;
        }
        .col-lose-wrapper {
          flex: 1;
          margin-top: 80px;
          position: relative;
        }

        /* COL-WIN (Águia Digital) - Sóbrio e Corporativo */
        .col-win {
          height: 100%;
          min-height: 480px;
          background: linear-gradient(180deg, rgba(5, 20, 10, 0.6) 0%, rgba(5, 12, 8, 0.4) 100%);
          border: 1px solid rgba(0, 255, 127, 0.15); /* Borda refinada e apagada */
          box-shadow: inset 0 1px 0 rgba(0, 255, 127, 0.05);
        }

        /* Efeito de luz sutil no topo do card campeão */
        .col-win::before {
          content: "";
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 127, 0.3), transparent);
        }

        /* VS-COL */
        .vs-col {
          width: 24px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          writing-mode: vertical-lr;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 800;
          color: rgba(255,255,255,0.08); /* Quase invisível */
          padding-bottom: 60px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        /* COL-LOSE (Agência Genérica) - Sóbrio */
        .col-lose {
          height: 100%;
          min-height: 320px;
          background: linear-gradient(180deg, rgba(20, 20, 20, 0.4) 0%, rgba(12, 12, 12, 0.4) 100%);
          border: 1px solid rgba(255, 255, 255, 0.04);
          filter: saturate(0.2) brightness(0.6);
          transition: filter 0.5s ease, border-color 0.5s ease, transform 0.3s ease;
        }

        .col-lose-wrapper:hover .col-lose,
        .col-lose-wrapper.active .col-lose {
          filter: saturate(1) brightness(1);
          border-color: rgba(239, 68, 68, 0.15); /* Vermelho muito sutil */
        }

        /* Ícone flutuante acima dos cards */
        .card-icon {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 10;
        }

        .col-win-wrapper:hover .card-icon,
        .col-win-wrapper.active .card-icon,
        .col-lose-wrapper:hover .card-icon,
        .col-lose-wrapper.active .card-icon {
          opacity: 1;
          transform: translateX(-50%) translateY(-76px);  /* sobe e aparece distante do top card */
        }

        /* Typography & Badges refinados */
        .pwd-badge {
          display: inline-flex;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 4px;
          margin-bottom: 28px;
          transition: all 0.4s ease;
        }
        
        .badge-win {
          background-color: rgba(0, 255, 127, 0.06);
          border: 1px solid rgba(0, 255, 127, 0.12);
          color: ${GreenColor};
        }

        .badge-lose {
          background-color: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.4);
        }
        .col-lose-wrapper:hover .badge-lose,
        .col-lose-wrapper.active .badge-lose {
          background-color: rgba(239, 68, 68, 0.05);
          border-color: rgba(239, 68, 68, 0.2);
          color: #EF4444;
        }

        .pwd-h3 {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          line-height: 1.25;
          text-transform: uppercase;
          margin-bottom: 8px;
          transition: color 0.4s ease;
          letter-spacing: -0.01em;
        }
        .h3-win { font-size: 22px; color: #ffffff; }
        .h3-lose { font-size: 17px; color: rgba(255,255,255,0.5); }
        .col-lose-wrapper:hover .h3-lose,
        .col-lose-wrapper.active .h3-lose { color: rgba(255,255,255,0.85); }

        .pwd-p {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.6;
          margin-bottom: 36px;
          transition: color 0.4s ease;
        }
        .p-win { color: rgba(255, 255, 255, 0.5); }
        .p-lose { color: rgba(255, 255, 255, 0.25); }
        .col-lose-wrapper:hover .p-lose,
        .col-lose-wrapper.active .p-lose { color: rgba(255, 255, 255, 0.4); }

        .pwd-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        /* List Items mais limpos */
        .pwd-list-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 13.5px;
          line-height: 1.5;
          letter-spacing: 0.01em;
          transition: color 0.4s ease;
          opacity: 0; /* Começa invisível para animação GSAP */
        }
        .li-win { color: rgba(255,255,255,0.75); }
        .li-lose { color: rgba(255,255,255,0.35); }
        .col-lose-wrapper:hover .li-lose,
        .col-lose-wrapper.active .li-lose { color: rgba(255,255,255,0.6); }

        /* Icon containers */
        .ico-container {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          transition: all 0.4s ease;
        }
        
        .ico-container-win {
          background: rgba(0, 255, 127, 0.1);
          border: 1px solid rgba(0, 255, 127, 0.2);
        }

        .ico-container-lose {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .col-lose-wrapper:hover .ico-container-lose,
        .col-lose-wrapper.active .ico-container-lose {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.25);
        }

        /* SVG ICONS */
        .svg-c { width: 9px; height: 9px; stroke: ${GreenColor}; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; fill: none; }
        .svg-x { width: 8px; height: 8px; stroke: rgba(255,255,255,0.3); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; fill: none; transition: stroke 0.4s; }
        .col-lose-wrapper:hover .svg-x,
        .col-lose-wrapper.active .svg-x { stroke: #EF4444; }

        /* Base do palco MUITO sutil */
        .arena-base {
          height: 1px;
          max-width: 820px;
          margin: 0 auto;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
          position: relative;
          z-index: 1;
        }

        /* TABLET RESPONSIVE */
        @media (min-width: 601px) and (max-width: 900px) {
          .col-win { min-height: 400px; padding: 32px 28px; }
          .col-lose { min-height: 240px; padding: 28px 24px; }
          .col-lose-wrapper { margin-top: 64px; }
          .pwd-header { margin-bottom: 56px; }
          .pwd-h3.h3-win { font-size: 19px; }
          .pwd-h3.h3-lose { font-size: 15px; }
        }

        /* MOBILE RESPONSIVE */
        @media (max-width: 600px) {
          .pwd-arena {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
          }
          .pwd-card {
            border-radius: 12px !important;
            padding: 32px 24px;
            min-height: auto;
          }
          .col-lose-wrapper { margin-top: 0; }
          .col-lose { filter: none; } /* No desaturation on mobile */
          .vs-col { display: none; } /* Oculta o "VS" no mobile pra ficar mais limpo */
          .arena-base { display: none; }
          .pwd-header { margin-bottom: 40px; }
        }
      `}</style>

      {/* Glow de ambientação no fundo (sutil) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" style={{ opacity: 0.5 }} />

      {/* HEADER */}
      <div className="pwd-header relative z-10" ref={titleRef}>
        <span style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600,
          fontSize: '11px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: GreenColor,
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
          <span style={{ color: GreenColor }}>NA ESPECIALIZAÇÃO</span>
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
          Nós somos focados em estruturar operações que trazem retorno. Veja o contraste.
        </p>
      </div>

      {/* ARENA */}
      <div className="pwd-arena">
        
        {/* WRAPPER ÁGUIA DIGITAL (WIN) */}
        <div 
          className="col-win-wrapper"
          onTouchStart={(e) => e.currentTarget.classList.add('active')}
          onTouchEnd={(e) => {
            const t = e.currentTarget;
            setTimeout(() => t.classList.remove('active'), 1200);
          }}
        >
          <div className="card-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="shineGreen" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={GreenColor} />
                  <stop offset="40%" stopColor={GreenColor} />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor={GreenColor} />
                  <stop offset="100%" stopColor={GreenColor} />
                  <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="2s" repeatCount="indefinite" />
                </linearGradient>
              </defs>
              <path d="M4 21h16v-2H4v2zm2-3h12l1.6-11-4.8 3.5-2.8-5-2.8 5L4.4 7 6 18z" fill="url(#shineGreen)"/>
            </svg>
          </div>

          <div className="pwd-card col-win" ref={winRef}>
            <div className="pwd-badge badge-win">ÁGUIA DIGITAL</div>
            <h3 className="pwd-h3 h3-win">OPERAÇÃO ESTRUTURADA E ESCALÁVEL</h3>
            <p className="pwd-p p-win">Dados reais, estratégia clara e crescimento consistente.</p>
            
            <ul className="pwd-list" ref={winListRef}>
              {[
                'Dashboard automatizado com métricas em tempo real',
                'Investimento com ROI previsível e meta de escala',
                'Máquina de vendas ativa atraindo o cliente ideal 24/7',
                'Sua equipe comercial alinhada as campanhas de marketing',
                'Acompanhamento do funil completo, de ponta a ponta'
              ].map((text, i) => (
                <li key={i} className="pwd-list-item li-win">
                  {/* Ícone da Águia Maior e sem borda/fundo (Esfera removida) */}
                  <div style={{ flexShrink: 0, marginTop: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src="/logos/aguia-verde.png" 
                      alt="Águia Digital" 
                      style={{ width: '18px', height: '18px', objectFit: 'contain' }} 
                    />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEPARADOR VS */}
        <div className="vs-col" ref={vsRef}>
          vs
        </div>

        {/* WRAPPER GENÉRICA (LOSE) */}
        <div 
          className="col-lose-wrapper"
          onTouchStart={(e) => e.currentTarget.classList.add('active')}
          onTouchEnd={(e) => {
            const t = e.currentTarget;
            setTimeout(() => t.classList.remove('active'), 1200);
          }}
        >
          <div className="card-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="shineRed" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="40%" stopColor="#EF4444" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#EF4444" />
                  <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="2s" repeatCount="indefinite" />
                </linearGradient>
              </defs>
              <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z" fill="url(#shineRed)"/>
            </svg>
          </div>

          <div className="pwd-card col-lose" ref={loseRef}>
            <div className="pwd-badge badge-lose">AGÊNCIA GENÉRICA</div>
            <h3 className="pwd-h3 h3-lose">OPERAÇÃO DESORGANIZADA E SEM DIREÇÃO</h3>
            <p className="pwd-p p-lose">Sem estrutura, relatórios confusos e estagnação crônica.</p>
            
            <ul className="pwd-list" ref={loseListRef}>
              {[
                'Não existe clareza sobre de onde as vendas estão vindo',
                'Investimento vira custo sem retorno previsível na ponta',
                'Refém total de indicações para fechar novos negócios',
                'Equipes desalinhadas (Marketing jogando contra Vendas)',
                'Não há funil, processos quebraveis e perdas nos contatos'
              ].map((text, i) => (
                <li key={i} className="pwd-list-item li-lose">
                  <div className="ico-container ico-container-lose">
                    <svg className="svg-x" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      <div className="arena-base" />

    </section>
  );
}

export default BeforeAfterSection;
