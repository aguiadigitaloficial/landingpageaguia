import { useEffect, useRef } from 'react';

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  maxOpacity: number;
  size: number;
  life: number;
  lifeSpeed: number;
}

export function CometField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const comets: Comet[] = [];

    const spawnComet = (): Comet => {
      const h = canvas.height;
      return {
        x: -150,
        y: Math.random() * h * 0.45,
        vx: 3 + Math.random() * 4,
        vy: (Math.random() - 0.3) * 0.8,
        length: 60 + Math.random() * 80,
        opacity: 0,
        maxOpacity: 0.1 + Math.random() * 0.15,
        size: 0.8 + Math.random() * 1.2,
        life: 0,
        lifeSpeed: 0.005 + Math.random() * 0.005,
      };
    };

    let frameCount = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frameCount++;

      if (comets.length < 3 && frameCount % 90 === 0 && Math.random() < 0.4) {
        comets.push(spawnComet());
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];

        c.x += c.vx;
        c.y += c.vy;
        c.life += c.lifeSpeed;

        if (c.life < 0.2) {
          c.opacity = (c.life / 0.2) * c.maxOpacity;
        } else if (c.life > 0.7) {
          c.opacity = ((1 - c.life) / 0.3) * c.maxOpacity;
        } else {
          c.opacity = c.maxOpacity;
        }

        if (c.x > canvas.width + 200 || c.life >= 1) {
          comets.splice(i, 1);
          continue;
        }

        const tailX = c.x - c.length;
        const tailY = c.y - (c.vy / c.vx) * c.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, c.x, c.y);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(0.4, `rgba(200, 255, 220, ${c.opacity * 0.3})`);
        gradient.addColorStop(0.8, `rgba(220, 255, 235, ${c.opacity * 0.7})`);
        gradient.addColorStop(1, `rgba(240, 255, 245, ${c.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(c.x, c.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = c.size * 0.6;
        ctx.lineCap = 'round';
        ctx.stroke();

        const glowGrad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.size * 4);
        glowGrad.addColorStop(0, `rgba(200, 255, 220, ${c.opacity * 0.8})`);
        glowGrad.addColorStop(0.5, `rgba(180, 255, 210, ${c.opacity * 0.3})`);
        glowGrad.addColorStop(1, `rgba(150, 255, 200, 0)`);

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${c.opacity * 1.2})`;
        ctx.fill();
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
