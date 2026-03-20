import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import aguiaLogoFooter from '@/assets/aguia-logo-footer.png';
import CtaButton from '@/components/ui/cta-button';


gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Resultados', href: '#depoimentos' },
  { label: 'Conselheiros', href: '#conselheiros' },
  { label: 'Diagnóstico', href: '#diagnostico' },
];

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/aguiadigital.oficial/',
    icon: Instagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/aguia-digital-oficial/',
    icon: Linkedin,
  },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-divider-top',
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
        }
      );

      [col1Ref, col2Ref, col3Ref].forEach((ref, i) => {
        gsap.fromTo(ref.current,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: topRef.current, start: 'top 88%' },
          }
        );
      });

      gsap.fromTo(bottomRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, delay: 0.4, ease: 'power2.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 80%' },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="footer"
      ref={footerRef}
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'hsl(var(--background))',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Green light line */}
      <div
        className="footer-divider-top"
        style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(0,255,127,0.5), transparent)',
        }}
      />

      {/* BODY */}
      <div
        ref={topRef}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(56px, 8vh, 96px) clamp(20px, 5vw, 80px) clamp(40px, 6vh, 64px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: 'clamp(40px, 5vw, 64px)',
          alignItems: 'start',
        }}
      >
        {/* COL 1 — Brand + socials */}
        <div ref={col1Ref} style={{ opacity: 0 }}>
          <img
            src={aguiaLogoFooter}
            alt="Águia Digital"
            loading="lazy"
            width={132}
            height={44}
            style={{ height: 'clamp(32px, 4vw, 44px)', width: 'auto', objectFit: 'contain' }}
          />

          <p className="font-body" style={{
            fontWeight: 400,
            fontSize: 'clamp(13px, 1.2vw, 15px)',
            color: 'hsl(var(--muted-foreground))',
            lineHeight: 1.72,
            marginBottom: 28,
            maxWidth: 280,
          }}>
            Transformamos investimento em crescimento previsível e escalável.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 10 }}>
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 38, height: 38,
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.45)',
                    transition: 'all 0.25s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'rgba(0,255,127,0.1)';
                    el.style.borderColor = 'rgba(0,255,127,0.4)';
                    el.style.color = '#00FF7F';
                    el.style.boxShadow = '0 0 14px rgba(0,255,127,0.2)';
                    el.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'rgba(255,255,255,0.04)';
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                    el.style.color = 'rgba(255,255,255,0.45)';
                    el.style.boxShadow = 'none';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* COL 2 — Quick links */}
        <div ref={col2Ref} style={{ opacity: 0 }}>
          <h4 className="font-heading" style={{
            fontWeight: 800,
            fontSize: 'clamp(11px, 1vw, 12px)',
            color: 'hsl(var(--foreground))',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            Links Rápidos
          </h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body"
                style={{
                  fontWeight: 400,
                  fontSize: 'clamp(13px, 1.2vw, 15px)',
                  color: 'hsl(var(--muted-foreground))',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'color 0.2s, gap 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'hsl(var(--foreground))';
                  e.currentTarget.style.gap = '10px';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
                  e.currentTarget.style.gap = '6px';
                }}
              >
                <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'hsl(var(--primary))', flexShrink: 0, opacity: 0.5 }} />
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* COL 3 — Contact + WhatsApp CTA */}
        <div ref={col3Ref} style={{ opacity: 0 }}>
          <h4 className="font-heading" style={{
            fontWeight: 800,
            fontSize: 'clamp(11px, 1vw, 12px)',
            color: 'hsl(var(--foreground))',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            Dados da Empresa
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
            <a
              href="tel:+5531999910784"
              style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}
            >
              <Phone size={15} color="rgba(0,255,127,0.7)" style={{ flexShrink: 0 }} />
              <span className="font-body" style={{ fontSize: 'clamp(13px, 1.2vw, 14px)', color: 'rgba(255,255,255,0.5)', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                (31) 99991-0784
              </span>
            </a>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <MapPin size={15} color="rgba(0,255,127,0.7)" style={{ marginTop: 1, flexShrink: 0 }} />
              <span className="font-body" style={{ fontSize: 'clamp(13px, 1.2vw, 14px)', color: 'rgba(255,255,255,0.38)', lineHeight: 1.5 }}>
                João Monlevade, MG
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(0,255,127,0.7)', border: '1px solid rgba(0,255,127,0.3)', borderRadius: '4px', padding: '2px 4px', flexShrink: 0 }}>CNPJ</div>
              <span className="font-body" style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', color: 'rgba(255,255,255,0.38)' }}>
                40.897.694/0001-26
              </span>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <CtaButton
            variant="dark"
            href="https://api.whatsapp.com/send?phone=5531999910784&text=Ol%C3%A1,%20vim%20pelo%20site%20da%20%C3%81guia%20Digital,%20tudo%20bem?"
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              {/* Logo oficial do WhatsApp em SVG */}
              <svg
                width="18" height="18" viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Tire dúvidas no WhatsApp
            </span>
          </CtaButton>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        ref={bottomRef}
        style={{
          opacity: 0,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(20px, 3vh, 28px) clamp(20px, 5vw, 80px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <span className="font-body" style={{
          fontSize: 'clamp(11px, 1vw, 13px)',
          color: 'rgba(255,255,255,0.22)',
        }}>
          © 2026 Águia Digital. Todos os direitos reservados.
        </span>

        <div style={{ display: 'flex', gap: 'clamp(16px, 2vw, 28px)', flexWrap: 'wrap' }}>
          {['Política de Privacidade', 'Termos de Uso'].map(label => (
            <a
              key={label}
              href="#"
              className="font-body"
              style={{
                fontSize: 'clamp(11px, 1vw, 12px)',
                color: 'rgba(255,255,255,0.22)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
