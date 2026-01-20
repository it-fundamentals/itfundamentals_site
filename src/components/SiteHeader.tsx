import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dictionary, Language } from '../types';
import { LANGUAGES } from '../constants';

export default function SiteHeader({
  dict,
  lang,
  onChangeLang
}: {
  dict: Dictionary;
  lang: Language;
  onChangeLang: (l: Language) => void;
}) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const linkClass = (active: boolean) => {
    return `px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
      active ? 'bg-white text-[#0b1020] border-white' : 'bg-white/5 hover:bg-white/10 border-white/5'
    }`;
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-6xl px-4">
      <div className="bg-[#0a0e18]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-3 py-2">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
              <img src="/assets/logo.png" alt="IT Fundamentals" className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="text-[10px] font-black tracking-widest text-white/50">{dict.top_brand}</div>
              <div className="text-xs font-medium text-white/90 max-w-[240px]">{dict.top_tagline}</div>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Link to="/" className={linkClass(isActive('/'))}>
              {dict.menu_home}
            </Link>
            <Link to="/portal" className={linkClass(isActive('/portal'))}>
              {dict.menu_portal}
            </Link>
            <Link to="/about" className={linkClass(isActive('/about'))}>
              {dict.menu_about}
            </Link>
            <Link to="/contact" className={linkClass(isActive('/contact'))}>
              {dict.menu_contact}
            </Link>
            <Link to="/climb" className={linkClass(isActive('/climb'))}>
              {dict.menu_climb}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 border-l border-white/10 pl-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => onChangeLang(l.code)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                lang === l.code ? 'bg-white text-[#0b1020]' : 'bg-white/5 text-white hover:bg-white/10'
              }`}
              type="button"
            >
              <span className="text-base">{l.flag}</span>
              <span className="text-xs font-black tracking-widest">{l.name}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
