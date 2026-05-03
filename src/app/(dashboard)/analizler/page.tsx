'use client';

import React from 'react';
import { 
  BarChart3, TrendingUp, Users, 
  Zap, ArrowUpRight, ArrowDownRight,
  Globe, Target, PieChart
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalizlerPage() {
  const stats = [
    { label: 'Total Reach', value: '1.2M', change: '+12.4%', trend: 'up', icon: Globe, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Conversion Rate', value: '3.42%', change: '+0.8%', trend: 'up', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Audiences', value: '42', change: '-2', trend: 'down', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'AI Efficiency', value: '94%', change: '+5.2%', trend: 'up', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-indigo-500/80">Data Intelligence</p>
          <h1 className="text-[32px] font-black tracking-tight text-slate-900 leading-none">Analiz & Raporlama</h1>
          <p className="text-[14px] mt-2 text-slate-500 font-medium">Verilerinizi derinlemesine analiz edin ve AI stratejileri geliştirin.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[12px] font-bold shadow-xl shadow-slate-200">
           Last Update: Just Now
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="intel-card group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${s.bg} ${s.color}`}>
                <s.icon size={22} />
              </div>
              <div className={`flex items-center gap-1 text-[12px] font-black ${s.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {s.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {s.change}
              </div>
            </div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
            <p className="text-[28px] font-black text-slate-900 mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Analysis Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart Placeholder */}
        <div className="lg:col-span-2 intel-card h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[16px] font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <BarChart3 size={18} className="text-indigo-600" />
              Performans Projeksiyonu
            </h3>
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
               {['7D', '30D', '90D'].map(t => (
                 <button key={t} className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${t === '30D' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>
                   {t}
                 </button>
               ))}
            </div>
          </div>
          <div className="flex-1 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent" />
             <p className="text-slate-400 text-[13px] font-medium flex items-center gap-2">
                <TrendingUp size={16} /> Data visualization engine loading...
             </p>
          </div>
        </div>

        {/* Audience Intelligence */}
        <div className="intel-card flex flex-col">
          <h3 className="text-[16px] font-black text-slate-900 uppercase tracking-tight mb-8 flex items-center gap-2">
            <PieChart size={18} className="text-emerald-600" />
            Audience Intel
          </h3>
          <div className="space-y-6 flex-1">
             {[
               { label: 'Gen Z Focus', value: 45, color: 'bg-indigo-500' },
               { label: 'Millennials', value: 32, color: 'bg-emerald-500' },
               { label: 'Gen X', value: 18, color: 'bg-blue-500' },
               { label: 'Others', value: 5, color: 'bg-slate-300' },
             ].map((item, i) => (
               <div key={i} className="space-y-2">
                 <div className="flex justify-between text-[12px] font-bold">
                    <span className="text-slate-500 uppercase tracking-wide">{item.label}</span>
                    <span className="text-slate-900">{item.value}%</span>
                 </div>
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${item.color} rounded-full`} 
                    />
                 </div>
               </div>
             ))}
          </div>
          <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
             <p className="text-[11px] font-bold text-emerald-800 leading-relaxed uppercase tracking-tight">
                AI INSIGHT: Gen Z segmentinde etkileşim oranı son 48 saatte %15 arttı. Bütçe kaydırması önerilir.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
