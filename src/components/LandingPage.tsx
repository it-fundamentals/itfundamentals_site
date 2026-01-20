import React, { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Dictionary } from '../types';
import ClimbPreview from './ClimbPreview';

type SectionShellProps = {
  children: React.ReactNode;
};

function SectionShell({ children }: SectionShellProps) {
  return <div className="mx-auto w-full max-w-6xl px-6">{children}</div>;
}

type LandingPageProps = {
  dict: Dictionary;
  onOpenClimb: () => void;
};

export default function LandingPage({ dict, onOpenClimb }: LandingPageProps) {
  const servicesRef = useRef<HTMLDivElement | null>(null);

  const scrollToServices = useCallback(() => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="relative">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/matterhorn.jpg"
            alt="Matterhorn"
            className="w-full h-full object-cover opacity-90 saturate-[1.05] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070a12]/60 via-[#070a12]/35 to-[#f6f7fb]" />
        </div>

        <SectionShell>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative z-10"
          >
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-xs font-black tracking-widest text-white/80">
                {dict.top_brand}
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mt-6 leading-[1.05]">
                {dict.landing_hero_title}
              </h1>

              <p className="text-white/80 text-lg md:text-xl mt-6 leading-relaxed">
                {dict.landing_hero_body}
              </p>

              <div className="mt-8 grid gap-3">
                {dict.landing_hero_points.map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-xs font-black text-white/80">
                      {i + 1}
                    </div>
                    <div className="text-white/80 text-base">{p}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-4 rounded-2xl font-black text-sm bg-white text-[#0b1020] shadow-xl"
                >
                  {dict.landing_primary_cta}
                </a>

                <button
                  type="button"
                  onClick={scrollToServices}
                  className="inline-flex items-center justify-center px-6 py-4 rounded-2xl font-black text-sm bg-white/10 text-white border border-white/15 hover:bg-white/15 transition-all"
                >
                  {dict.landing_secondary_cta}
                </button>
              </div>
            </div>
          </motion.div>
        </SectionShell>
      </section>

      <div className="bg-[#f6f7fb] text-[#0b1020]">
        <div ref={servicesRef}>
          <section className="pt-16 pb-10">
            <SectionShell>
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">{dict.landing_services_title}</h2>
                <p className="text-[#0b1020]/70 text-lg mt-4 leading-relaxed">{dict.landing_services_body}</p>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {dict.landing_steps.map((s, idx) => (
                  <div key={idx} className="bg-white border border-black/5 rounded-[28px] p-7 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-[#0b1020] text-white flex items-center justify-center font-black">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-black tracking-tight">{s.title}</h3>
                        <p className="text-[#0b1020]/70 mt-2 leading-relaxed">{s.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionShell>
          </section>
        </div>

        <section className="pt-10 pb-10">
          <SectionShell>
            <div className="bg-white border border-black/5 rounded-[32px] p-8 md:p-10 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">{dict.landing_included_title}</h2>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {dict.landing_included_items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-[#f6f7fb] border border-black/5 rounded-2xl px-5 py-4"
                  >
                    <div className="mt-1 w-6 h-6 rounded-lg bg-[#0b1020] text-white flex items-center justify-center text-xs font-black">
                      {i + 1}
                    </div>
                    <div className="text-[#0b1020]/80">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </SectionShell>
        </section>

        <section className="pt-10 pb-10">
          <SectionShell>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">{dict.landing_pricing_title}</h2>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {dict.landing_plans.map((p, i) => (
                <div key={i} className="bg-white border border-black/5 rounded-[32px] p-8 shadow-sm">
                  <div className="text-sm font-black tracking-widest text-[#0b1020]/60">{p.name}</div>
                  <div className="text-4xl font-black tracking-tight mt-3">{p.price}</div>
                  <div className="text-[#0b1020]/70 mt-3 leading-relaxed">{p.blurb}</div>

                  <div className="mt-6 grid gap-3">
                    {p.items.map((it, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-md bg-[#0b1020]" />
                        <div className="text-[#0b1020]/80">{it}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionShell>
        </section>

        <section className="pt-10 pb-14">
          <SectionShell>
            <div className="bg-white border border-black/5 rounded-[32px] p-8 md:p-10 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">{dict.landing_comparison_title}</h2>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left border-separate" style={{ borderSpacing: 0 }}>
                  <thead>
                    <tr>
                      <th className="py-4 px-4 text-sm font-black text-[#0b1020]/70">Area</th>
                      <th className="py-4 px-4 text-sm font-black text-[#0b1020]/70">Typical setup</th>
                      <th className="py-4 px-4 text-sm font-black text-[#0b1020]/70">With IT Fundamentals</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dict.landing_comparison_rows.map((r, idx) => (
                      <tr key={idx} className="border-t border-black/5">
                        <td className="py-5 px-4 font-black text-[#0b1020]">{r.label}</td>
                        <td className="py-5 px-4 text-[#0b1020]/75">{r.typical}</td>
                        <td className="py-5 px-4 text-[#0b1020]/80">{r.with_itf}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </SectionShell>
        </section>

        <section className="pt-6 pb-16">
          <SectionShell>
            <ClimbPreview dict={dict} onOpenFull={onOpenClimb} />
          </SectionShell>
        </section>

        <section id="contact" className="pb-20">
          <SectionShell>
            <div className="bg-[#0b1020] text-white rounded-[32px] p-8 md:p-10 shadow-sm overflow-hidden relative">
              <div className="absolute inset-0 opacity-20">
                <img src="/assets/matterhorn.jpg" alt="Matterhorn" className="w-full h-full object-cover" />
              </div>

              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">{dict.page_contact_title}</h2>
                <p className="text-white/80 text-lg mt-4 leading-relaxed max-w-3xl">{dict.page_contact_body}</p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:hello@itfundamentals.ch"
                    className="inline-flex items-center justify-center px-6 py-4 rounded-2xl font-black text-sm bg-white text-[#0b1020] shadow-xl"
                  >
                    Email hello@itfundamentals.ch
                  </a>

                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="inline-flex items-center justify-center px-6 py-4 rounded-2xl font-black text-sm bg-white/10 text-white border border-white/15 hover:bg-white/15 transition-all"
                  >
                    Back to top
                  </button>
                </div>
              </div>
            </div>
          </SectionShell>
        </section>

        <footer className="pb-10">
          <SectionShell>
            <div className="text-sm text-[#0b1020]/60">
              © {new Date().getFullYear()} IT Fundamentals. Built for secure Microsoft 365 delivery.
            </div>
          </SectionShell>
        </footer>
      </div>
    </div>
  );
}
