'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Map, ArrowLeft, Zap, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-5">
         <Zap size={600} className="text-indigo-600 rotate-12" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 space-y-8"
      >
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-[40px] bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-2xl shadow-indigo-500/10 mb-4">
             <Map size={64} strokeWidth={1.5} />
          </div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-slate-100"
          >
             <Sparkles size={24} className="text-amber-500" />
          </motion.div>
        </div>

        <div className="space-y-3">
          <h1 className="text-8xl font-black text-slate-900 tracking-tighter">404</h1>
          <h2 className="text-2xl font-bold text-slate-700">Yolunu mu Kaybettin?</h2>
          <p className="text-slate-500 max-w-md mx-auto text-[15px] leading-relaxed">
            Görünüşe göre aradığın sayfa ajansın dışına kaçmış. Endişelenme, Büşra AI her zaman doğru yolu gösterir!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="/panel" 
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-indigo-600 text-white font-black text-[15px] hover:bg-indigo-500 shadow-2xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Panele Geri Dön
          </Link>
          <Link 
            href="/" 
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-slate-100 text-slate-600 font-black text-[15px] hover:bg-slate-200 transition-all"
          >
            Ana Sayfaya Git
          </Link>
        </div>
      </motion.div>

      {/* Decorative Floating Dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, Math.random() * 40 - 20, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-2 h-2 rounded-full bg-indigo-500/20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
