import { useState, useEffect, useRef } from 'react';

const platforms = [
  { id: 'google', logo: '/logos/LOGO-ADS-4.png', alt: 'Google Ads', scale: 1 },
  { id: 'meta', logo: '/logos/META-LOGO-1.png', alt: 'Meta', scale: 1 },
  { id: 'linkedin', logo: '/logos/LINKEDIN-LOGO-3.png', alt: 'LinkedIn Ads', scale: 1 },
  { id: 'tiktok', logo: '/logos/tiktok-logo.png', alt: 'TikTok Ads', scale: 0.55 },
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
            className={`
              relative flex flex-1 items-center justify-center
              w-full border-none rounded-none cursor-pointer
              transition-background duration-400 ease-in
              px-4 py-8 sm:px-8 sm:py-8 md:px-[48px] md:py-[32px]
              ${isActive ? 'bg-[rgba(0,255,127,0.04)]' : 'bg-transparent'}
              ${i !== 0 ? 'border-t border-t-[rgba(255,255,255,0.06)]' : ''}
            `}
            style={{
              borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)',
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
              loading="lazy"
              className={`
                h-16 sm:h-24 md:h-[140px]
                w-auto max-w-[85%] object-contain relative z-10
                transition-all duration-400 ease-in-out
                ${isActive ? 'filter-none opacity-100' : 'grayscale brightness-150 opacity-45'}
              `}
              style={{
                filter: isActive ? 'none' : 'grayscale(100%) brightness(1.8)',
                opacity: isActive ? 1 : 0.45,
                transform: `scale(${p.scale})`,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
