'use client';

import React from 'react';
import { Sparkles, ArrowRight, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const insights = [
  {
    icon: TrendingUp,
    type: 'Optimizasyon',
    text: '"Kış Yeniden Pazarlama" kampanyasında CPA ortalamadan %24 düşük — günlük bütçeyi ₺200 artırın.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    action: 'Uygula',
  },
  {
    icon: AlertTriangle,
    type: 'İçerik Uyarısı',
    text: '"Ürün Lansmanı" videosunda reklam yorgunluğu tespit edildi. Tıklama oranı %0.8 düştü.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    action: 'İncele',
  },
];

export default function AIInsightCard() {
  return (
    <div className="bg-[#0a0a0f]/40 border border-white/5 rounded-[32px] p-8 h-full flex flex-col backdrop-blur-md relative overflow-hidden group">
      {/* Background glow for the card */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-600/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 shadow-lg">
          <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
        </div>
        <div>
          <h3 className="text-[16px] font-black text-white uppercase tracking-tight">AI Strateji Önerileri</h3>
          <p className="text-[11px] font-black text-slate-600 uppercase tracking-widest mt-0.5">Otonom Kampanya Analizi</p>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" />
          Live
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-4 flex-1 relative z-10">
        {insights.map((ins, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className={`p-5 rounded-3xl border ${ins.border} bg-white/[0.01] hover:bg-white/[0.03] cursor-pointer transition-all group/item shadow-xl`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${ins.bg}`}>
                <ins.icon className={`w-4 h-4 ${ins.color}`} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${ins.color}`}>{ins.type}</span>
            </div>
            <p className="text-[13px] leading-relaxed mb-4 text-slate-400 font-medium">{ins.text}</p>
            <button className={`flex items-center gap-2 text-[12px] font-black uppercase tracking-widest transition-all ${ins.color} hover:translate-x-1`}>
              {ins.action} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full mt-8 py-5 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 text-white font-black text-[12px] uppercase tracking-[0.3em] rounded-[22px] transition-all flex items-center justify-center gap-3 active:scale-95 relative z-10 shadow-lg">
        Tam Denetim Başlat <Zap className="w-4 h-4 text-amber-400" />
      </button>
    </div>
  );
}
