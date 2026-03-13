import { useState, useEffect, useRef } from 'react';

const platforms = [
  { id: 'google', logo: '/logos/LOGO-ADS-4.png', alt: 'Google Ads' },
  { id: 'meta', logo: '/logos/META-LOGO-1.png', alt: 'Meta' },
  { id: 'linkedin', logo: '/logos/LINKEDIN-LOGO-3.png', alt: 'LinkedIn Ads' },
];

const DURATION = 2000;
const TICK = 30;

export function PlatformSelector() {
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
      const next = (index + 1) % platforms.length;
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      position: 'relative',
    }}>
      {/* Vertical track line on left */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '2px',
        background: 'rgba(255,255,255,0.08)',
      }} />

      {/* Green progress indicator on the track */}
      {(() => {
        const segmentHeight = 100 / platforms.length;
        const topPos = active * segmentHeight;
        const fillHeight = (progress / 100) * segmentHeight;
        return (
          <div style={{
            position: 'absolute',
            left: '-1px',
            top: `${topPos}%`,
            width: '4px',
            height: `${fillHeight}%`,
            background: 'linear-gradient(to bottom, rgba(0,255,127,0.2), #00FF7F, rgba(0,255,127,0.2))',
            borderRadius: '2px',
            boxShadow: '0 0 12px 3px rgba(0,255,127,0.4)',
            transition: progress === 0 ? 'top 0.3s ease' : 'none',
            zIndex: 2,
          }} />
        );
      })()}

      {platforms.map((p, i) => {
        const isActive = active === i;
        return (
          <button
            key={p.id}
            onClick={() => handleClick(i)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px 48px',
              background: isActive
                ? 'rgba(0,255,127,0.04)'
                : 'transparent',
              border: 'none',
              borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)',
              borderRadius: 0,
              cursor: 'pointer',
              position: 'relative',
              width: '100%',
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
                background: 'linear-gradient(to right, rgba(0,255,127,0.06), transparent)',
                pointerEvents: 'none',
              }} />
            )}

            <img
              src={p.logo}
              alt={p.alt}
              style={{
                height: '80px',
                width: 'auto',
                objectFit: 'contain',
                filter: isActive ? 'none' : 'grayscale(100%) brightness(1.8)',
                opacity: isActive ? 1 : 0.25,
                transition: 'filter 0.4s ease, opacity 0.4s ease',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
