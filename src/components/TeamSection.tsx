import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    id: 'rafael',
    photo: '/team/rafael.webp',
    name: 'Rafael Bretas',
    role: 'Diretor de Marketing e Comunicação Estratégica',
    bio: 'Especialista em marketing digital e copywriting de alta conversão. Lidera comunicação, branding e campanhas de performance, garantindo alinhamento entre identidade, mensagem e resultado comercial.',
    tag: 'ESTRATÉGIA',
    tagColor: '#00FF7F',
  },
  {
    id: 'larissa',
    photo: '/team/larissa.webp',
    name: 'Larissa Bramente',
    role: 'Coordenadora de Planejamento e Conteúdo Estratégico',
    bio: 'Responsável por planejamento comercial e roteirização de conteúdo. Alinha comunicação aos objetivos de expansão e captação, organiza fluxos e conduz campanhas que fortalecem a jornada de vendas.',
    tag: 'CONTEÚDO',
    tagColor: '#00FF7F',
  },
  {
    id: 'joao',
    photo: '/team/joao.webp',
    name: 'João Andrade',
    role: 'Head de Tecnologia e Estratégia Digital',
    bio: 'Lidera o desenvolvimento e a integração de sistemas, CRM, gestão de tráfego e automações. Implementa soluções digitais que otimizam o desempenho comercial e potencializam a presença da marca.',
    tag: 'TECNOLOGIA',
    tagColor: '#00FF7F',
  },
];

const TeamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardRefs = [card0Ref.current, card1Ref.current, card2Ref.current];

      gsap.fromTo(titleRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      cardRefs.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0, scale: 0.92, rotateY: i % 2 === 0 ? -8 : 8 },
          {
            y: 0, opacity: 1, scale: 1, rotateY: 0,
            duration: 0.85, delay: i * 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      if (window.matchMedia('(hover: hover)').matches) {
        cardRefs.forEach((card) => {
          if (!card) return;
          const handleMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
              rotateX: -y * 8, rotateY: x * 8, scale: 1.02,
              duration: 0.4, ease: 'power2.out', transformPerspective: 800,
            });
          };
          const handleLeave = () => {
            gsap.to(card, {
              rotateX: 0, rotateY: 0, scale: 1,
              duration: 0.5, ease: 'power2.out',
            });
          };
          card.addEventListener('mousemove', handleMove);
          card.addEventListener('mouseleave', handleLeave);
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cardRefs = [card0Ref, card1Ref, card2Ref];

  return (
    <section
      ref={sectionRef}
      id="conselheiros"
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#080808',
        padding: 'clamp(80px, 10vh, 140px) clamp(20px, 5vw, 80px)',
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute',
        bottom: '10%', left: '50%',
        transform: 'translateX(-50%)',
        width: '50vw', height: '30vh',
        background: 'radial-gradient(ellipse, rgba(0,255,127,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 'clamp(48px, 8vh, 80px)', opacity: 0 }}>
        <span style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600, fontSize: '11px',
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: '#00FF7F', display: 'block', marginBottom: '16px',
        }}>
          NOSSO TIME
        </span>
        <h2 style={{
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(32px, 5.5vw, 72px)',
          color: '#ffffff',
          letterSpacing: '-0.025em',
          lineHeight: 0.94,
          textTransform: 'uppercase',
          margin: '0 0 20px',
        }}>
          NOSSOS<br />
          <span style={{ color: '#00FF7F' }}>CONSELHEIROS</span>
        </h2>
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 400,
          fontSize: 'clamp(14px, 1.5vw, 17px)',
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.65,
          maxWidth: '480px',
          margin: '0 auto',
        }}>
          Liderança estratégica que guia nosso padrão de excelência.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="team-cards-grid" style={{
        display: 'grid',
        gap: 'clamp(16px, 2.5vw, 28px)',
        maxWidth: '1160px',
        margin: '0 auto',
      }}>
        {cardRefs.map((ref, i) => {
          const member = team[i];
          return (
            <div
              key={member.id}
              ref={ref}
              style={{
                backgroundColor: '#111111',
                borderRadius: 'clamp(16px, 2vw, 24px)',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                opacity: 0,
                transformStyle: 'preserve-3d',
                cursor: 'default',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,255,127,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              }}
            >
              {/* Photo */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '115%',
                overflow: 'hidden',
                backgroundColor: '#1a1a1a',
              }}>
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLImageElement).style.transform = 'scale(1.04)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLImageElement).style.transform = 'scale(1)';
                  }}
                />

                {/* Tag badge */}
                <div style={{
                  position: 'absolute',
                  top: '14px', left: '14px',
                  backgroundColor: 'rgba(0,0,0,0.65)',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${member.tagColor}30`,
                  borderRadius: '100px',
                  padding: '5px 12px',
                }}>
                  <span style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 600, fontSize: '10px',
                    letterSpacing: '0.2em',
                    color: member.tagColor,
                    textTransform: 'uppercase',
                  }}>
                    {member.tag}
                  </span>
                </div>

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(17,17,17,0.9) 0%, transparent 100%)',
                }} />
              </div>

              {/* Text content */}
              <div style={{ padding: 'clamp(20px, 2.5vw, 28px)' }}>
                <h3 style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(17px, 2vw, 22px)',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  margin: '0 0 6px',
                }}>
                  {member.name}
                </h3>
                <p style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(12px, 1.2vw, 14px)',
                  color: '#00FF7F',
                  lineHeight: 1.4,
                  margin: '0 0 16px',
                }}>
                  {member.role}
                </p>
                <div style={{
                  width: '32px', height: '2px',
                  backgroundColor: '#00FF7F',
                  borderRadius: '1px',
                  marginBottom: '16px',
                  opacity: 0.4,
                }} />
                <p style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(12px, 1.2vw, 14px)',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {member.bio}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TeamSection;
