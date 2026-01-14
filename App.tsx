
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from './types';
import { I18N, LANGUAGES } from './constants';
import MountainClimb from './components/MountainClimb';
import PageTemplate from './components/PageTemplate';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('itf_lang');
    return (saved === 'en' || saved === 'de' || saved === 'fr') ? saved : 'en';
  });

  const changeLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('itf_lang', newLang);
  };

  const dict = useMemo(() => I18N[lang], [lang]);

  return (
    <HashRouter>
      <div className="relative min-h-screen bg-[#070a12] text-white selection:bg-red-500/30">
        {/* Persistent Background */}
        <div className="fixed inset-0 z-0">
          <img 
            src="./assets/matterhorn.jpg" 
            alt="Matterhorn"
            className="w-full h-full object-cover scale-105 opacity-80 filter saturate-[1.1] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070a12]/30 via-transparent to-[#070a12]/80" />
        </div>

        {/* Global Navigation */}
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-5xl px-4 pointer-events-none">
          <div className="pointer-events-auto bg-[#0a0e18]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center justify-between shadow-2xl">
            <nav className="flex items-center gap-2">
              <Link to="/portal" className="px-4 py-2 rounded-xl text-sm font-bold bg-white/5 hover:bg-white/10 border border-white/5 transition-all">{dict.menu_portal}</Link>
              <Link to="/about" className="px-4 py-2 rounded-xl text-sm font-bold bg-white/5 hover:bg-white/10 border border-white/5 transition-all">{dict.menu_about}</Link>
              <Link to="/contact" className="px-4 py-2 rounded-xl text-sm font-bold bg-white/5 hover:bg-white/10 border border-white/5 transition-all">{dict.menu_contact}</Link>
              <Link to="/" className="px-4 py-2 rounded-xl text-sm font-bold bg-white/5 hover:bg-white/10 border border-white/5 transition-all">{dict.menu_climb}</Link>
            </nav>
            <div className="flex items-center gap-2 border-l border-white/10 pl-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => changeLang(l.code)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                    lang === l.code ? 'bg-white text-[#0b1020]' : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-base">{l.flag}</span>
                  <span className="text-xs font-black tracking-widest">{l.name}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<MountainClimb dict={dict} />} />
              <Route path="/about" element={<PageTemplate title={dict.page_about_title} body={dict.page_about_body} dict={dict} />} />
              <Route path="/contact" element={<PageTemplate title={dict.page_contact_title} body={dict.page_contact_body} dict={dict} />} />
              <Route path="/portal" element={<PageTemplate title={dict.page_portal_title} body={dict.page_portal_body} dict={dict} />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
