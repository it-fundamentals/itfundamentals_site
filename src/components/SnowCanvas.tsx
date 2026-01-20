import React, { useEffect, useRef } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

type Particle = {
  x: number;
  y: number;
  r: number;
  d: number;
  v: number;
};

export default function SnowCanvas({
  progress,
  mode = 'fixed',
  containerRef
}: {
  progress: MotionValue<number>;
  mode?: 'fixed' | 'contained';
  containerRef?: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(0);

  useMotionValueEvent(progress, 'change', (latest) => {
    progressRef.current = latest;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];

    let width = 0;
    let height = 0;

    const getSize = () => {
      if (mode === 'contained') {
        const el = containerRef?.current;
        if (!el) return { w: 0, h: 0 };
        return { w: el.clientWidth, h: el.clientHeight };
      }
      return { w: window.innerWidth, h: window.innerHeight };
    };

    const resize = () => {
      const { w, h } = getSize();
      width = w;
      height = h;

      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      const count = 240;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 2.6 + 0.8,
          d: Math.random() * count,
          v: Math.random() * 1.6 + 0.6
        });
      }
    };

    const update = (intensity: number) => {
      const wind = intensity * 2.2;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += Math.cos(p.d) + p.v + intensity * 2.4;
        p.x += Math.sin(p.d) + wind;

        if (p.x > width + 10 || p.x < -10 || p.y > height + 10) {
          p.x = Math.random() * width;
          p.y = -10;
        }
      }
    };

    const draw = () => {
      const p = progressRef.current;
      const intensity = Math.max(0, Math.min(1, 1 - p));

      ctx.clearRect(0, 0, width, height);

      if (intensity > 0.03) {
        const visibleCount = Math.max(0, Math.floor(particles.length * intensity));
        ctx.fillStyle = `rgba(255, 255, 255, ${0.75 * intensity})`;
        ctx.beginPath();

        for (let i = 0; i < visibleCount; i++) {
          const pt = particles[i];
          ctx.moveTo(pt.x, pt.y);
          ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        }

        ctx.fill();
        update(intensity);
      }

      raf = window.requestAnimationFrame(draw);
    };

    const onResize = () => {
      resize();
      createParticles();
    };

    let ro: ResizeObserver | null = null;

    if (mode === 'contained') {
      const el = containerRef?.current;
      if (el && 'ResizeObserver' in window) {
        ro = new ResizeObserver(() => onResize());
        ro.observe(el);
      }
    } else {
      window.addEventListener('resize', onResize);
    }

    resize();
    createParticles();
    draw();

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  const positionClass = mode === 'contained' ? 'absolute inset-0' : 'fixed inset-0';

  return (
    <canvas
      ref={canvasRef}
      className={`${positionClass} pointer-events-none z-[15]`}
      style={{ filter: 'blur(0.8px)' }}
      aria-hidden="true"
    />
  );
}
