import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { Dictionary, Stage } from '../types';
import Atmosphere from './Atmosphere';

interface MountainClimbProps {
  dict: Dictionary;
}

type Point = { x: number; y: number };

export default function MountainClimb({ dict }: MountainClimbProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  const [activeStageId, setActiveStageId] = useState('stage-basecamp');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  const [pathPoint, setPathPoint] = useState<Point>({ x: 120, y: 830 });
  const [milestones, setMilestones] = useState<Point[]>([]);

  const pathData =
    'M 120 30 C 175 75, 205 135, 150 200 C 100 260, 45 315, 92 385 C 135 450, 200 500, 155 575 C 118 635, 52 680, 95 745 C 130 805, 165 830, 120 830';

  useEffect(() => {
    if (!pathRef.current) return;

    const totalLength = pathRef.current.getTotalLength();

    const unsubscribe = smoothProgress.on('change', (latest: number) => {
      if (!pathRef.current) return;
      const point = pathRef.current.getPointAtLength(totalLength * (1 - latest));
      setPathPoint({ x: point.x, y: point.y });
    });

    const stageKeys = Object.keys(dict.stages);
    const stagesCount = stageKeys.length;

    const dots: Point[] = [];
    for (let i = 0; i < stagesCount; i++) {
      const t = stagesCount === 1 ? 0 : i / (stagesCount - 1);
      const pt = pathRef.current.getPointAtLength(totalLength * t);
      dots.push({ x: pt.x, y: pt.y });
    }
    setMilestones(dots);

    return () => unsubscribe();
  }, [smoothProgress, dict.stages]);

  const stages = useMemo(() => Object.values(dict.stages) as Stage[], [dict.stages]);

  return (
    <div ref={containerRef} className="relative flex min-h-[700vh] pt-32 px-6 gap-8 overflow-visible">
      <Atmosphere progress={smoothProgress} />

      {/* Left menu stays sticky */}
      <aside className="sticky top-32 left-0 h-[calc(100vh-160px)] w-80 flex-shrink-0 z-[60] hidden xl:block">
        <div className="h-full bg-[#0a0e18]/40 backdrop-blur-2xl border border-white/10 rounded-[32px] p-4 flex flex-col relative overflow-hidden shadow-2xl">
          <div className="bg-[#0a0e18]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center p-2">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <path
                  d="M 60 8 C 80 8, 96 16, 104 22 L 104 60 C 104 88, 84 104, 60 112 C 36 104, 16 88, 16 60 L 16 22 C 24 16, 40 8, 60 8 Z"
                  fill="#e9eef7"
                  opacity="0.9"
                />
                <path
                  d="M 60 16 C 76 16, 90 22, 96 26 L 96 60 C 96 82, 80 94, 60 100 C 40 94, 24 82, 24 60 L 24 26 C 30 22, 44 16, 60 16 Z"
                  fill="#ff3b30"
                />
                <path
                  d="M 52 34 L 68 34 L 68 52 L 86 52 L 86 68 L 68 68 L 68 86 L 52 86 L 52 68 L 34 68 L 34 52 L 52 52 Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <div className="text-[10px] font-black tracking-widest text-white/50">{dict.top_brand}</div>
              <div className="text-xs font-medium leading-tight text-white/90 max-w-[160px] mt-1">{dict.top_tagline}</div>
            </div>
          </div>

          <nav className="flex flex-col-reverse gap-3 overflow-y-auto pr-1">
            {stages.map((stage, idx) => {
              const isActive = activeStageId === stage.id;

              return (
                <button
                  key={stage.id}
                  onClick={() => document.getElementById(stage.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className={`w-full flex flex-col gap-3 p-4 rounded-2xl transition-all border ${
                    isActive
                      ? 'bg-white text-[#0b1020] border-white shadow-xl translate-x-1 scale-[1.02]'
                      : 'bg-[#0a0e18]/40 text-white/70 border-white/5 hover:border-white/20 hover:bg-white/5'
                  }`}
                  type="button"
                >
                  <div className="w-full flex items-center gap-4">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-sm ${
                        isActive ? 'bg-black/5' : 'bg-white/5'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-bold text-sm tracking-tight">{stage.chip}</span>
                  </div>

                  {isActive ? (
                    <div className="w-full">
                      <div className="h-[3px] w-full rounded-full bg-[#D52B1E]" />
                    </div>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <h1 className="text-4xl font-black italic tracking-tighter leading-none text-white/90">{dict.top_title}</h1>
          </div>
        </div>
      </aside>

      {/* Content scrolls */}
      <section className="flex-1 space-y-[60vh] pb-[60vh] relative z-20">
        {stages.map((stage) => (
          <StageCard key={stage.id} stage={stage} onInView={() => setActiveStageId(stage.id)} />
        ))}
      </section>

      {/* Right path stays sticky */}
      <aside className="sticky top-32 right-0 h-[calc(100vh-160px)] w-80 flex-shrink-0 hidden lg:block z-[60]">
        <div className="h-full bg-[#0a0e18]/40 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-4 right-4 text-3xl opacity-40">🏔️</div>

          <svg className="w-full h-full" viewBox="0 0 240 860" preserveAspectRatio="none">
            <path ref={pathRef} d={pathData} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="120" strokeLinecap="round" />
            <path d={pathData} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="4" strokeDasharray="2 12" strokeLinecap="round" />

            {milestones.map((m, i) => (
              <circle key={i} cx={m.x} cy={m.y} r={i === 0 || i === milestones.length - 1 ? 10 : 8} fill="rgba(255,255,255,0.42)" />
            ))}

            <motion.g animate={{ transform: `translate(${pathPoint.x}px, ${pathPoint.y}px)` }} transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
              <circle r="22" fill="rgba(255,255,255,0.16)" className="blur-sm" />
              <circle r="12" fill="white" />
            </motion.g>
          </svg>
        </div>
      </aside>
    </div>
  );
}

function StageCard({ stage, onInView }: { stage: Stage; onInView: () => void }) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) onInView();
  }, [isInView, onInView]);

  return (
    <motion.article
      id={stage.id}
      ref={ref}
      initial={{ opacity: 0, x: -40, scale: 0.97 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.95, ease: [0.2, 0.8, 0.2, 1] }}
      className="max-w-4xl bg-[#0a0e18]/78 backdrop-blur-3xl border border-white/10 p-10 rounded-[48px] shadow-2xl hover:border-white/20 transition-all duration-700"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-black tracking-widest text-white/70">
            {stage.chip}
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white/95 mt-5">{stage.title}</h2>
        </div>

        <div className="hidden sm:flex items-center gap-2 opacity-90">
          {stage.icons.slice(0, 3).map((ic, i) => (
            <div key={i} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
              {ic}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-3">
        {stage.items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
            <div className="mt-[2px] w-6 h-6 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-xs font-black text-white/80">
              {i + 1}
            </div>
            <div className="text-white/78 text-base leading-relaxed">{item}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {stage.iconLabels.slice(0, 3).map((label, i) => (
          <div key={i} className="text-xs font-bold tracking-wide text-white/60 bg-black/20 border border-white/10 rounded-full px-4 py-2">
            {label}
          </div>
        ))}
      </div>
    </motion.article>
  );
}
