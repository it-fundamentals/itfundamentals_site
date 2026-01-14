import React, { useEffect, useRef } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

type Particle = {
  x: number;
  y: number;
  r: number;
  d: number;
  v: number;
};

export default function SnowCanvas({ progress }: { progress: MotionValue<number> }) {
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

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      const count = 240;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
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

        if (p.x > window.innerWidth + 10 || p.x < -10 || p.y > window.innerHeight + 10) {
          p.x = Math.random() * window.innerWidth;
          p.y = -10;
        }
      }
    };

    const draw = () => {
      const p = progressRef.current;

      // Heavy at start (near 0), fades out as progress approaches 1
      const intensity = Math.max(0, Math.min(1, 1 - p));

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

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

    window.addEventListener('resize', onResize);
    resize();
    createParticles();
    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[15]"
      style={{ filter: 'blur(0.8px)' }}
      aria-hidden="true"
    />
  );
}
