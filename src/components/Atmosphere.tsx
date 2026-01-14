import React, { useMemo } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface AtmosphereProps {
  progress: MotionValue<number>;
}

type SnowParticle = {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  blur: number;
  opacity: number;
};

function makeParticles(count: number, seedOffset: number): SnowParticle[] {
  const rand = (n: number) => {
    const x = Math.sin(n) * 10000;
    return x - Math.floor(x);
  };

  return Array.from({ length: count }).map((_, i) => {
    const s = i + seedOffset;
    const r1 = rand(s * 3.1);
    const r2 = rand(s * 7.7);
    const r3 = rand(s * 11.9);
    const r4 = rand(s * 19.3);
    const r5 = rand(s * 29.7);

    return {
      id: i + seedOffset,
      x: r1 * 100,
      size: r2 * 3.2 + 1.2,
      duration: r3 * 9 + 8,
      delay: r4 * 18,
      drift: (r5 - 0.5) * 26,
      blur: r2 * 1.4 + 0.6,
      opacity: r3 * 0.55 + 0.25
    };
  });
}

function SnowLayer({
  progress,
  count,
  fadeStart,
  fadeEnd,
  seedOffset,
  speedBoost
}: {
  progress: MotionValue<number>;
  count: number;
  fadeStart: number;
  fadeEnd: number;
  seedOffset: number;
  speedBoost: number;
}) {
  const layerOpacity = useTransform(progress, [fadeStart, fadeEnd], [1, 0]);
  const particles = useMemo(() => makeParticles(count, seedOffset), [count, seedOffset]);

  return (
    <motion.div className="fixed inset-0 pointer-events-none z-20" style={{ opacity: layerOpacity }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${p.x}%`,
            top: `-8%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: `blur(${p.blur}px)`
          }}
          animate={{
            y: ['0vh', '112vh'],
            x: [`${p.x}%`, `${p.x + p.drift}%`]
          }}
          transition={{
            duration: Math.max(3, p.duration - speedBoost),
            repeat: Infinity,
            ease: 'linear',
            delay: -p.delay
          }}
        />
      ))}
    </motion.div>
  );
}

function FloatingClouds({ progress }: { progress: MotionValue<number> }) {
  const cloudsOpacity = useTransform(progress, [0.55, 0.95], [0, 0.65]);
  const cloudsY = useTransform(progress, [0.55, 1], [120, 0]);

  return (
    <motion.div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" style={{ opacity: cloudsOpacity, y: cloudsY }}>
      <div className="absolute top-0 left-0 w-full h-[62vh] bg-gradient-to-b from-white/20 to-transparent blur-[90px]" />
      <motion.div
        className="absolute -top-24 -left-24 w-[620px] h-[420px] bg-white/10 rounded-full blur-[110px]"
        animate={{ x: [0, 60, 0], y: [0, 32, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -top-44 -right-24 w-[820px] h-[520px] bg-white/14 rounded-full blur-[130px]"
        animate={{ x: [0, -80, 0], y: [0, 44, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </motion.div>
  );
}

export default function Atmosphere({ progress }: AtmosphereProps) {
  const darkOverlay = useTransform(progress, [0, 0.85], [0.88, 0]);
  const vignette = useTransform(progress, [0, 1], [0.55, 0.18]);
  const sunGlow = useTransform(progress, [0.55, 1], [0, 0.85]);

  return (
    <>
      <motion.div className="fixed inset-0 bg-[#05070f] pointer-events-none z-[5]" style={{ opacity: darkOverlay }} />
      <motion.div
        className="fixed inset-0 pointer-events-none z-[6]"
        style={{
          opacity: vignette,
          background:
            'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.75) 100%)'
        }}
      />
      <motion.div
        className="fixed inset-0 pointer-events-none z-[7]"
        style={{
          opacity: sunGlow,
          background: 'radial-gradient(circle at 55% 20%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.06) 28%, rgba(255,255,255,0) 60%)'
        }}
      />

      {/* Heavy snow at the start, fades out fairly early */}
      <SnowLayer progress={progress} count={140} fadeStart={0} fadeEnd={0.38} seedOffset={1000} speedBoost={2.2} />

      {/* Light snow continues for longer but tapers to almost nothing */}
      <SnowLayer progress={progress} count={70} fadeStart={0.05} fadeEnd={1} seedOffset={3000} speedBoost={0.8} />

      <FloatingClouds progress={progress} />
    </>
  );
}
