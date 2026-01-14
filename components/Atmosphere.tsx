
import React, { useMemo } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface AtmosphereProps {
  progress: MotionValue<number>;
}

const Snowfall: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  // Snow is heavy (opacity 0.8) at the bottom (progress 0) and clears (opacity 0.1) at the peak (progress 1)
  const snowOpacity = useTransform(progress, [0, 1], [0.8, 0.05]);
  const snowScale = useTransform(progress, [0, 1], [1, 1.5]);

  // Generate a set of snow particles
  const particles = useMemo(() => {
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
    <motion.div 
      className="fixed inset-0 pointer-events-none z-20"
      style={{ opacity: snowOpacity, scale: snowScale }}
    >
      {particles.map((p) => (
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
            ease: "linear",
            delay: -p.delay,
          }}
        />
      ))}
    </motion.div>
  );
};

const FloatingClouds: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  // Clouds appear as we reach the peak (progress > 0.7)
  const cloudsOpacity = useTransform(progress, [0.6, 0.9], [0, 0.6]);
  const cloudsY = useTransform(progress, [0.6, 1], [100, 0]);

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      style={{ opacity: cloudsOpacity, y: cloudsY }}
    >
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-white/20 to-transparent blur-[80px]" />
      <motion.div 
        className="absolute -top-20 -left-20 w-[600px] h-[400px] bg-white/10 rounded-full blur-[100px]"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -top-40 -right-20 w-[800px] h-[500px] bg-white/15 rounded-full blur-[120px]"
        animate={{ x: [0, -70, 0], y: [0, 40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </motion.div>
  );
};

const Atmosphere: React.FC<AtmosphereProps> = ({ progress }) => {
  // The page starts dark (opacity 0.7) and gets bright (opacity 0) as we climb
  const brightnessOverlay = useTransform(progress, [0, 0.8], [0.75, 0]);
  
  return (
    <>
      {/* Brightness / Darkness Overlay */}
      <motion.div 
        className="fixed inset-0 bg-[#070a12] pointer-events-none z-[5]"
        style={{ opacity: brightnessOverlay }}
      />
      
      {/* Snowfall layer */}
      <Snowfall progress={progress} />
      
      {/* Peak clouds layer */}
      <FloatingClouds progress={progress} />
    </>
  );
};

export default Atmosphere;
