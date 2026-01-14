// components/Atmosphere.tsx
import React, { useMemo } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface AtmosphereProps {
  progress: MotionValue<number>;
}

type SnowParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

function Snowfall({ progress }: { progress: MotionValue<number> }) {
  const snowOpacity = useTransform(progress, [0, 1], [0.8, 0.05]);
  const snowScale = useTransform(progress, [0, 1], [1, 1.5]);

  const particles: SnowParticle[] = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 20,
      drift: (Math.random() - 0.5) * 20,
    }));
  }, []);

  return (
    <motion.div className="fixed inset-0 pointer-events-none z-20" style={{ opacity: snowOpacity, scale: snowScale }}>
      {particles.map((p: SnowParticle) => (
        <motion.div
          key={p.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${p.x}%`,
            top: `-5%`,
            width: p.size,
            height: p.size,
            filter: 'blur(1px)',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [`${p.x}%`, `${p.x + p.drift}%`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: -p.delay,
          }}
        />
      ))}
    </motion.div>
  );
}

function FloatingClouds({ progress }: { progress: MotionValue<number> }) {
  const cloudsOpacity = useTransform(progress, [0.6, 0.9], [0, 0.6]);
  const cloudsY = useTransform(progress, [0.6, 1], [100, 0]);

  return (
    <motion.div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" style={{ opacity: cloudsOpacity, y: cloudsY }}>
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-white/20 to-transparent blur-[80px]" />
      <motion.div
        className="absolute -top-20 -left-20 w-[600px] h-[400px] bg-white/10 rounded-full blur-[100px]"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -top-40 -right-20 w-[800px] h-[500px] bg-white/15 rounded-full blur-[120px]"
        animate={{ x: [0, -70, 0], y: [0, 40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </motion.div>
  );
}

export default function Atmosphere({ progress }: AtmosphereProps) {
  const brightnessOverlay = useTransform(progress, [0, 0.8], [0.75, 0]);

  return (
    <>
      <motion.div className="fixed inset-0 bg-[#070a12] pointer-events-none z-[5]" style={{ opacity: brightnessOverlay }} />

      <Snowfall progress={progress} />

      <FloatingClouds progress={progress} />
    </>
  );
}
