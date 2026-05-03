'use client';

import React from 'react';
import { Sparkles, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const insights = [
  {
    icon: TrendingUp,
    type: 'Optimizasyon',
    text: '"Kış Yeniden Pazarlama" kampanyasında CPA ortalamadan %24 düşük — günlük bütçeyi ₺200 artırın.',
    color: '#10B981',
    bg: '#DCFCE7',
    action: 'Uygula',
  },
  {
    icon: AlertTriangle,
    type: 'İçerik Uyarısı',
    text: '"Ürün Lansmanı" videosunda reklam yorgunluğu tespit edildi. Tıklama oranı %0.8 düştü.',
    color: '#F59E0B',
    bg: '#FFFBEB',
    action: 'İncele',
  },
];

export default function AIInsightCard() {
  return (
    <div className="card p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: '#EEF2FF' }}>
          <Sparkles className="w-4.5 h-4.5" style={{ color: '#6366F1' }} />
        </div>
        <div>
          <h3 className="text-[15px] font-semibold" style={{ color: '#0F172A' }}>AI Önerileri</h3>
          <p className="text-[12px]" style={{ color: '#94A3B8' }}>Otonom kampanya analizi</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold" style={{ background: '#DCFCE7', color: '#166534' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          Aktif
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-3 flex-1">
        {insights.map((ins, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="p-4 rounded-[12px] cursor-pointer transition-all"
            style={{ border: '1px solid #F1F5F9', background: '#FAFBFF' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#C7D2FE'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#F1F5F9'; }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: ins.bg }}>
                <ins.icon className="w-3 h-3" style={{ color: ins.color }} />
              </div>
              <span className="text-[11px] font-semibold" style={{ color: ins.color }}>{ins.type}</span>
            </div>
            <p className="text-[12px] leading-relaxed mb-3" style={{ color: '#475569' }}>{ins.text}</p>
            <button className="flex items-center gap-1.5 text-[12px] font-semibold transition-colors" style={{ color: '#6366F1' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#4F46E5'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6366F1'; }}
            >
              {ins.action} <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <button className="btn-primary w-full mt-5 justify-center" style={{ borderRadius: '10px' }}>
        Tam Denetim Başlat <Sparkles className="w-4 h-4" />
      </button>
    </div>
  );
}
