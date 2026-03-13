import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const HeroIntro = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (removed) return;

    document.body.style.overflow = 'hidden';
    const releaseTimer = setTimeout(() => {
      document.body.style.overflow = '';
    }, 800);

    let hintDir = 1;
    let hintY = 0;
    let hintAF: number;
    const animateHint = () => {
      hintY += hintDir * 0.08;
      if (hintY >= 6) hintDir = -1;
      if (hintY <= 0) hintDir = 1;
      if (hintRef.current) {
        hintRef.current.style.transform = `translateX(-50%) translateY(${hintY}px)`;
      }
      hintAF = requestAnimationFrame(animateHint);
    };
    hintAF = requestAnimationFrame(animateHint);

    const getProgress = () => Math.min(window.scrollY / (window.innerHeight * 1.8), 1);
    const getMaskSizePx = (progress: number) => {
      const viewportMax = Math.max(window.innerWidth, window.innerHeight);
      const initialSize = viewportMax * 0.18;
      const finalSize = viewportMax * 8;
      return initialSize + progress * progress * (finalSize - initialSize);
    };

    const updateMaskSize = (progress: number) => {
      if (!overlayRef.current) return;
      overlayRef.current.style.setProperty('--mask-size', `${getMaskSizePx(progress)}px`);
    };

    const handleScroll = () => {
      const progress = getProgress();

      if (!overlayRef.current) return;

      // Eagle cutout grows with fixed aspect ratio (px), preventing stretch bugs
      updateMaskSize(progress);

      if (hintRef.current) {
        hintRef.current.style.opacity = String(Math.max(0, 1 - progress * 5));
      }

      if (progress >= 0.95 && !overlayRef.current.dataset.done) {
        overlayRef.current.dataset.done = '1';
        overlayRef.current.style.opacity = '0';
        overlayRef.current.style.transition = 'opacity 0.35s ease';

        // Scroll-lock breakpoint: trava na Hero por 1.2s
        window.scrollTo({ top: 0, behavior: 'auto' });
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
          document.body.style.overflow = '';
          setRemoved(true);
          // Refresh all ScrollTriggers after layout shift from spacer removal
          requestAnimationFrame(() => {
            ScrollTrigger.refresh(true);
          });
        }, 1200);
      }
    };

    const handleResize = () => {
      updateMaskSize(getProgress());
    };

    updateMaskSize(getProgress());
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(releaseTimer);
      cancelAnimationFrame(hintAF);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [removed]);

  if (removed) return null;

  return (
    <>
      {/* Green overlay with eagle cutout */}
      <div
        ref={overlayRef}
        className="hero-intro-overlay"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 9999,
          backgroundColor: 'hsl(145, 100%, 45%)',
          willChange: 'opacity',
          pointerEvents: 'auto',
          // @ts-ignore
          '--mask-size': '220px',
        } as React.CSSProperties}
      >
        {/* Scroll hint */}
        <div
          ref={hintRef}
          style={{
            position: 'absolute',
            bottom: 'clamp(24px, 5vh, 44px)',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            opacity: 0.7,
            willChange: 'transform, opacity',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <div style={{
            width: 26, height: 40,
            border: '1.5px solid rgba(0,0,0,0.4)',
            borderRadius: 13,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: 6,
          }}>
            <div style={{
              width: 4, height: 8,
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: 2,
              animation: 'mouseScroll 1.5s ease-in-out infinite',
            }}/>
          </div>
          <span style={{
            fontWeight: 600,
            fontSize: '9px',
            color: 'rgba(0,0,0,0.5)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>
            role para entrar
          </span>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: '280vh', width: '100%', pointerEvents: 'none', position: 'relative', zIndex: 1 }} aria-hidden="true" />

      <style>{`
        .hero-intro-overlay {
          -webkit-mask-image: url('/logos/aguia-simbolo.png'), linear-gradient(#fff, #fff);
          -webkit-mask-size: var(--mask-size) auto, 100% 100%;
          -webkit-mask-position: center center, center center;
          -webkit-mask-repeat: no-repeat, no-repeat;
          -webkit-mask-composite: xor;
          mask-image: url('/logos/aguia-simbolo.png'), linear-gradient(#fff, #fff);
          mask-size: var(--mask-size) auto, 100% 100%;
          mask-position: center center, center center;
          mask-repeat: no-repeat, no-repeat;
          mask-composite: exclude;
        }
        @keyframes mouseScroll {
          0%   { transform: translateY(0);    opacity: 1; }
          60%  { transform: translateY(10px); opacity: 0; }
          61%  { transform: translateY(0);    opacity: 0; }
          100% { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default HeroIntro;
