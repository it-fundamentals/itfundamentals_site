import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Dictionary, Stage } from '../types';
import Atmosphere from './Atmosphere';

function StageCard({ stage }: { stage: Stage }) {
  return (
    <motion.article
      id={stage.id}
      initial={{ opacity: 0, x: -20, scale: 0.985 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
      className="bg-[#0a0e18]/72 backdrop-blur-2xl border border-white/10 rounded-[32px] p-7 shadow-2xl"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-black tracking-widest text-white/70">
            {stage.chip}
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white/95 mt-4">{stage.title}</h3>
        </div>

        <div className="hidden md:flex items-center gap-2 opacity-90">
          {stage.icons.slice(0, 3).map((ic, i) => (
            <div
              key={i}
              className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl"
            >
              {ic}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {stage.items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
            <div className="mt-[2px] w-6 h-6 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-xs font-black text-white/80">
              {i + 1}
            </div>
            <div className="text-white/78 text-sm leading-relaxed">{item}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {stage.iconLabels.slice(0, 3).map((label, i) => (
          <div
            key={i}
            className="text-xs font-bold tracking-wide text-white/60 bg-black/20 border border-white/10 rounded-full px-4 py-2"
          >
            {label}
          </div>
        ))}
      </div>
    </motion.article>
  );
}

export default function ClimbPreview({ dict, onOpenFull }: { dict: Dictionary; onOpenFull: () => void }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    container: scrollRef,
    target: contentRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  const previewStages = useMemo<Stage[]>(() => {
    const basecamp = dict.stages['stage-basecamp'];
    const discover = dict.stages['stage-discover'];
    return [basecamp, discover].filter(Boolean) as Stage[];
  }, [dict.stages]);

  return (
    <section className="relative" aria-label={dict.landing_climb_title}>
      <div ref={containerRef} className="relative overflow-hidden rounded-[36px] border border-white/10 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/matterhorn.jpg"
            alt="Matterhorn"
            className="w-full h-full object-cover scale-105 opacity-75 saturate-[1.05] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070a12]/55 via-[#070a12]/30 to-[#070a12]/75" />
        </div>

        <Atmosphere progress={smoothProgress} mode="contained" containerRef={containerRef} />

        <div className="relative z-20 p-7 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">{dict.landing_climb_title}</h2>
              <p className="text-white/75 text-base md:text-lg mt-3 max-w-2xl">{dict.landing_climb_body}</p>
            </div>

            <button
              type="button"
              onClick={onOpenFull}
              className="hidden md:inline-flex items-center justify-center px-5 py-3 rounded-2xl font-black text-sm bg-white text-[#0b1020] shadow-xl"
            >
              {dict.landing_climb_cta}
            </button>
          </div>

          <div
            ref={scrollRef}
            className="mt-7 rounded-[28px] bg-black/25 border border-white/10 overflow-y-auto overflow-x-hidden"
            style={{ maxHeight: 520 }}
          >
            <div ref={contentRef} className="p-5 md:p-7 space-y-8">
              {previewStages.map((s) => (
                <StageCard key={s.id} stage={s} />
              ))}

              <div className="md:hidden pb-2">
                <button
                  type="button"
                  onClick={onOpenFull}
                  className="w-full inline-flex items-center justify-center px-5 py-3 rounded-2xl font-black text-sm bg-white text-[#0b1020] shadow-xl"
                >
                  {dict.landing_climb_cta}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-white/55">Scroll inside this panel to move up the climb preview.</div>
        </div>
      </div>
    </section>
  );
}
