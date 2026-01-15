import React from 'react';
import { motion } from 'framer-motion';

export default function PageTemplate({ title, body }: { title: string; body: string }) {
  return (
    <div className="min-h-screen px-4 sm:px-6 pb-24 pt-28 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="max-w-4xl mx-auto bg-[#0a0e18]/70 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 sm:p-10 shadow-2xl"
      >
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white/95">{title}</h1>
        <p className="text-white/75 text-base sm:text-lg leading-relaxed mt-6">{body}</p>
      </motion.div>
    </div>
  );
}
