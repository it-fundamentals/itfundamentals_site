
import React from 'react';
import { motion } from 'framer-motion';
import { Dictionary } from '../types';

interface PageTemplateProps {
  title: string;
  body: string;
  dict: Dictionary;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ title, body, dict }) => {
  return (
    <div className="min-h-screen pt-40 px-6 pb-20 flex flex-col items-center">
      <div className="w-full max-w-7xl flex gap-12">
        {/* Side Identity */}
        <aside className="w-80 flex-shrink-0 hidden md:block">
           <div className="sticky top-40 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
              <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-3 mb-6">
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  <path d="M 60 8 C 80 8, 96 16, 104 22 L 104 60 C 104 88, 84 104, 60 112 C 36 104, 16 88, 16 60 L 16 22 C 24 16, 40 8, 60 8 Z" fill="#e9eef7" opacity="0.9" />
                  <path d="M 60 16 C 76 16, 90 22, 96 26 L 96 60 C 96 82, 80 94, 60 100 C 40 94, 24 82, 24 60 L 24 26 C 30 22, 44 16, 60 16 Z" fill="#ff3b30" />
                  <path d="M 52 34 L 68 34 L 68 52 L 86 52 L 86 68 L 68 68 L 68 86 L 52 86 L 52 68 L 34 68 L 34 52 L 52 52 Z" fill="white" />
                </svg>
              </div>
              <div className="text-xs font-black tracking-widest text-white/60 mb-2 uppercase">{dict.top_brand}</div>
              <div className="text-sm text-white/80 font-medium leading-relaxed">{dict.top_tagline}</div>
           </div>
        </aside>

        {/* Content */}
        <motion.article 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex-1 bg-[#080c14]/80 backdrop-blur-2xl border border-white/10 p-10 md:p-16 rounded-[48px] shadow-2xl"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-none">{title}</h1>
          <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-3xl italic">
            {body}
          </p>
          
          <div className="mt-20 flex gap-4">
             <div className="flex-1 h-px bg-gradient-to-r from-red-500 to-transparent self-center opacity-30" />
             <div className="text-[10px] font-black tracking-widest text-white/20 uppercase">Building Secure Foundations</div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default PageTemplate;
