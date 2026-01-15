// src/App.tsx
import React, { useMemo, useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Dictionary, Language } from './types';
import { I18N, LANGUAGES } from './constants';
import MountainClimb from './components/MountainClimb';
import PageTemplate from './components/PageTemplate';

const isLanguage = (value: string | null): value is Language => value === 'en' || value === 'de' || value === 'fr';

function Header({
  dict,
  lang,
  changeLang
}: {
  dict: Dictionary;
  lang: Language;
  changeLang: (l: Language) => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-6xl px-3 sm:px-4 pointer-events-none">
      <div className="pointer-events-auto bg-[#0a0e18]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hidden sm:inline-flex px-4 py-2 rounded-xl text-sm font-black bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
            >
              {dict.menu_climb}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="sm:hidden inline-flex items-center justify-center px-3 py-2 rounded-xl text-sm font-black bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              Menu
            </button>
          </div>

          <div className="flex items-center gap-2 border-l border-white/10 pl-2">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLang(l.code)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                  lang === l.code ? 'bg-white text-[#0b1020]' : 'bg-white/5 text-white hover:bg-white/10'
                }`}
                type="button"
                aria-label={`Switch language to ${l.name}`}
              >
                <span className="text-base">{l.flag}</span>
                <span className="hidden sm:inline text-xs font-black tracking-widest">{l.name}</span>
              </button>
            ))}
          </div>
        </div>

        <nav
          id="mobile-nav"
          className={`sm:hidden mt-2 grid gap-2 transition-all ${
            mobileMenuOpen ? 'max-h-[260px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <Link
            to="/portal"
            className="px-4 py-3 rounded-xl text-sm font-black bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            {dict.menu_portal}
          </Link>
          <Link
            to="/about"
            className="px-4 py-3 rounded-xl text-sm font-black bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            {dict.menu_about}
          </Link>
          <Link
            to="/contact"
            className="px-4 py-3 rounded-xl text-sm font-black bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            {dict.menu_contact}
          </Link>
          <Link
            to="/"
            className="px-4 py-3 rounded-xl text-sm font-black bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            {dict.menu_climb}
          </Link>
        </nav>

        <nav className="hidden sm:flex items-center gap-2 mt-0">
          <Link
            to="/portal"
            className="px-4 py-2 rounded-xl text-sm font-bold bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            {dict.menu_portal}
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 rounded-xl text-sm font-bold bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            {dict.menu_about}
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 rounded-xl text-sm font-bold bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            {dict.menu_contact}
          </Link>
          <Link
            to="/"
            className="px-4 py-2 rounded-xl text-sm font-bold bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            {dict.menu_climb}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('itf_lang');
    return isLanguage(saved) ? saved : 'en';
  });

  const changeLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('itf_lang', newLang);
  };

  const dict = useMemo<Dictionary>(() => I18N[lang], [lang]);

  return (
    <HashRouter>
      <div className="relative min-h-screen bg-[#070a12] text-white selection:bg-red-500/30">
        <div className="fixed inset-0 z-0">
          <img
            src="/assets/matterhorn.jpg"
            alt="Matterhorn"
            className="w-full h-full object-cover scale-105 opacity-80 saturate-[1.1] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070a12]/40 via-transparent to-[#070a12]/85" />
        </div>

        <Header dict={dict} lang={lang} changeLang={changeLang} />

        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<MountainClimb dict={dict} />} />
              <Route path="/about" element={<PageTemplate title={dict.page_about_title} body={dict.page_about_body} />} />
              <Route path="/contact" element={<PageTemplate title={dict.page_contact_title} body={dict.page_contact_body} />} />
              <Route path="/portal" element={<PageTemplate title={dict.page_portal_title} body={dict.page_portal_body} />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </HashRouter>
  );
}
