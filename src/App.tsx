import React, { useMemo, useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Language } from './types';
import { I18N } from './constants';
import MountainClimb from './components/MountainClimb';
import PageTemplate from './components/PageTemplate';
import SiteHeader from './components/SiteHeader';
import LandingPage from './components/LandingPage';

const isLanguage = (value: string | null): value is Language => value === 'en' || value === 'de' || value === 'fr';

function AppInner() {
  const navigate = useNavigate();

  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('itf_lang');
    return isLanguage(saved) ? saved : 'en';
  });

  const changeLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('itf_lang', newLang);
  };

  const dict = useMemo(() => I18N[lang], [lang]);

  return (
    <div className="min-h-screen">
      <SiteHeader dict={dict} lang={lang} onChangeLang={changeLang} />

      <main className="pt-0">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage dict={dict} onOpenClimb={() => navigate('/climb')} />} />

            <Route
              path="/climb"
              element={
                <div className="relative min-h-screen bg-[#070a12] text-white selection:bg-red-500/30">
                  <div className="fixed inset-0 z-0">
                    <img
                      src="/assets/matterhorn.jpg"
                      alt="Matterhorn"
                      className="w-full h-full object-cover scale-105 opacity-80 saturate-[1.1] contrast-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#070a12]/40 via-transparent to-[#070a12]/85" />
                  </div>

                  <div className="relative z-10">
                    <MountainClimb dict={dict} />
                  </div>
                </div>
              }
            />

            <Route path="/about" element={<PageTemplate title={dict.page_about_title} body={dict.page_about_body} />} />
            <Route path="/contact" element={<PageTemplate title={dict.page_contact_title} body={dict.page_contact_body} />} />
            <Route path="/portal" element={<PageTemplate title={dict.page_portal_title} body={dict.page_portal_body} />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppInner />
    </HashRouter>
  );
}
