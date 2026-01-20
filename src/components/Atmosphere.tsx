import React, { useMemo } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import SnowCanvas from './SnowCanvas';

interface AtmosphereProps {
  progress: MotionValue<number>;
  mode?: 'fixed' | 'contained';
  containerRef?: React.RefObject<HTMLElement | null>;
}

type SnowParticle = {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

function Snowfall({ progress, mode }: { progress: MotionValue<number>; mode: 'fixed' | 'contained' }) {
  const snowOpacity = useTransform(progress, [0, 1], [0.55, 0.02]);
  const snowScale = useTransform(progress, [0, 1], [1, 1.35]);

  const particles = useMemo<SnowParticle[]>(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 1.6 + Math.random() * 3.2,
      duration: 7 + Math.random() * 10,
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 34
    }));
  }, []);

  const positionClass = mode === 'contained' ? 'absolute inset-0' : 'fixed inset-0';

  return (
    <motion.div
      className={`${positionClass} pointer-events-none z-[18]`}
      style={{ opacity: snowOpacity, scale: snowScale }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/80"
          style={{
            left: `${p.x}%`,
            top: `-10%`,
            width: `${p.size}px`,
            height: `${p.size}px`
          }}
          animate={{
            y: ['-10%', '112%'],
            x: ['0%', `${p.drift}px`]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: -p.delay
          }}
        />
      ))}
    </motion.div>
  );
}

function FloatingClouds({ progress, mode }: { progress: MotionValue<number>; mode: 'fixed' | 'contained' }) {
  const cloudsOpacity = useTransform(progress, [0.6, 0.9], [0, 0.6]);
  const cloudsY = useTransform(progress, [0.6, 1], [100, 0]);

  const positionClass = mode === 'contained' ? 'absolute inset-0' : 'fixed inset-0';

  return (
    <motion.div
      className={`${positionClass} pointer-events-none z-[25] overflow-hidden`}
      style={{ opacity: cloudsOpacity, y: cloudsY }}
      aria-hidden="true"
    >
      <div className="absolute top-0 left-0 h-[60vh] w-full bg-gradient-to-b from-white/20 to-transparent blur-[80px]" />

      <motion.div
        className="absolute -top-20 -left-20 h-[400px] w-[600px] rounded-full bg-white/10 blur-[100px]"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -top-40 -right-20 h-[500px] w-[800px] rounded-full bg-white/15 blur-[120px]"
        animate={{ x: [0, -70, 0], y: [0, 40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </motion.div>
  );
}

export default function Atmosphere({ progress, mode = 'fixed', containerRef }: AtmosphereProps) {
  const brightnessOverlay = useTransform(progress, [0, 0.8], [0.75, 0]);
  const positionClass = mode === 'contained' ? 'absolute inset-0' : 'fixed inset-0';

  return (
    <>
      <motion.div
        className={`${positionClass} pointer-events-none z-[5] bg-[#070a12]`}
        style={{ opacity: brightnessOverlay }}
        aria-hidden="true"
      />

      <SnowCanvas progress={progress} mode={mode} containerRef={containerRef} />
      <Snowfall progress={progress} mode={mode} />
      <FloatingClouds progress={progress} mode={mode} />
    </>
  );
}
