'use client';

import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, DollarSign, 
  Target, Zap, Calendar, ArrowUpRight, 
  Sparkles, Camera, Music2, Video, 
  Search, Filter, Globe, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalizlerPage() {
  const [activeTab, setActiveTab] = useState('performance'); // performance, trends

  const chartData = [
    { name: 'Pzt', spend: 4000, roas: 4.2 },
    { name: 'Sal', spend: 3000, roas: 3.8 },
    { name: 'Çar', spend: 5000, roas: 5.1 },
    { name: 'Per', spend: 2780, roas: 4.5 },
    { name: 'Cum', spend: 1890, roas: 3.2 },
    { name: 'Cmt', spend: 2390, roas: 4.0 },
    { name: 'Paz', spend: 3490, roas: 4.8 },
  ];

  const trends = [
    { id: 1, sector: 'E-ticaret', sound: 'Unstoppable Remix', style: 'Split Screen Comparison', hook: '"Bunu görmeden sakın almayın..."', platform: 'TikTok' },
    { id: 2, sector: 'Güzellik', sound: 'Lofi Chill Vibes', style: 'Macro Close-up Transitions', hook: '"Sabah rutinimde 3 büyük hata..."', platform: 'Instagram' },
    { id: 3, sector: 'Teknoloji', sound: 'Tech Ambient', style: 'Fast Cut Unboxing', hook: '"Gelecekten gelmiş gibi hissettiren..."', platform: 'TikTok' },
  ];

  return (
    <div className="space-y-7 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-2 text-slate-400">Aşama 1 & 7: Raporlama ve Trendler</p>
          <h1 className="text-[28px] font-bold tracking-tight text-slate-900">Analiz & Trend Merkezi</h1>
          <p className="text-[14px] mt-1 text-slate-500">Performans verilerini inceleyin ve global sosyal medya trendlerini takip edin.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            Raporu İndir <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl w-fit">
        {[
          { id: 'performance', label: 'Performans Raporu', icon: BarChart3 },
          { id: 'trends', label: 'Global Trendler (Aşama 1)', icon: Globe },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
              activeTab === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'performance' && (
          <motion.div key="performance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-7">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {[
                { label: 'Harcanan Bütçe', value: '₺142,890', change: '+14.2%', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Ortalama ROAS', value: '4.82x', change: '+2.1%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Bin Gösterim Maliyeti', value: '₺8.42', change: '-12.8%', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50' },
                { label: 'Toplam Dönüşüm', value: '24.1k', change: '+34.2%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              ].map((s, i) => (
                <div key={i} className="card p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg} ${s.color}`}>
                      <s.icon size={20} />
                    </div>
                    <span className={`text-[11px] font-bold ${s.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{s.change}</span>
                  </div>
                  <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wide">{s.label}</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Performance Charts Placeholder */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-7">
              <div className="xl:col-span-8 card h-96 p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[16px] font-bold text-slate-900">Haftalık Performans Trendi</h3>
                  <div className="flex items-center gap-4 text-[12px] font-bold">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Harcama</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> ROAS</div>
                  </div>
                </div>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="spend" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="xl:col-span-4 space-y-7">
                <div className="card p-6 bg-slate-800 text-white border-none shadow-xl shadow-slate-200">
                  <h3 className="text-[16px] font-bold mb-4 flex items-center gap-2"><Sparkles size={18} /> Strateji Merkezi Raporu</h3>
                  <p className="text-[13px] text-slate-300 leading-relaxed mb-6">"Genel ROAS trendimiz geçen aya göre %15 daha stabil. E-ticaret müşterilerinde akşam 20:00 - 22:00 arası dönüşüm oranları zirve yapıyor."</p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-[11px] font-bold text-indigo-200 uppercase mb-2">Aşama 7 Raporu</p>
                    <p className="text-[13px]">Haftalık etkileşim raporu otomatik olarak hazırlandı.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Forecasting Module (Stage 8) */}
            <div className="card p-8 bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5">
                  <TrendingUp size={160} />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-xl">
                      <Sparkles className="text-indigo-400" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black">AI Gelecek Tahmini (Aşama 8)</h3>
                      <p className="text-slate-400 text-[13px]">Mevcut verilere göre önümüzdeki ay için öngörüler.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { label: 'Öngörülen Harcama', value: '₺168,000', change: '+18%', desc: 'Sezonluk artış bekleniyor.' },
                      { label: 'Beklenen Dönüşüm', value: '2.8k', change: '+12%', desc: 'Optimizasyon etkisi.' },
                      { label: 'Tahmini ROAS', value: '5.1x', change: '+0.4', desc: 'Verimlilik artış trendinde.' },
                    ].map((p, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest mb-1">{p.label}</p>
                        <div className="flex items-baseline gap-2 mb-2">
                           <span className="text-2xl font-black">{p.value}</span>
                           <span className="text-emerald-400 text-[12px] font-bold">{p.change}</span>
                        </div>
                        <p className="text-[12px] text-slate-500 leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-[13px] text-slate-400">
                      <ShieldCheck size={16} className="text-indigo-400" /> Tahminler %85 güven aralığındadır.
                    </div>
                    <button className="px-6 py-3 rounded-xl bg-white text-slate-900 font-black text-[13px] hover:bg-slate-100 transition-all flex items-center gap-2">
                      Detaylı Tahmin Raporu <ArrowUpRight size={16} />
                    </button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'trends' && (
          <motion.div key="trends" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trends.map((trend) => (
                <div key={trend.id} className="card p-6 border-t-4 border-t-indigo-500 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="px-3 py-1 rounded-full bg-slate-100 text-[11px] font-bold text-slate-600 uppercase tracking-widest">{trend.sector}</div>
                    <div className={`flex items-center gap-1.5 text-[12px] font-bold ${trend.platform === 'TikTok' ? 'text-rose-500' : 'text-purple-600'}`}>
                      {trend.platform === 'TikTok' ? <Video size={16} /> : <Camera size={16} />}
                      {trend.platform}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold mb-1"><Music2 size={14} /> TREND MÜZİK</div>
                      <p className="text-[14px] font-bold text-slate-900">{trend.sound}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold mb-1"><Video size={14} /> VİDEO TARZI</div>
                      <p className="text-[14px] font-bold text-slate-900">{trend.style}</p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                      <div className="flex items-center gap-2 text-indigo-400 text-[11px] font-bold mb-1"><Sparkles size={14} /> ÖNERİLEN KANCA (HOOK)</div>
                      <p className="text-[13px] font-medium text-indigo-900 italic">{trend.hook}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Internal Agency Tool Note */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <Globe size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-amber-900">Ajans İçi Bilgi:</p>
                <p className="text-[12px] text-amber-700">Bu veriler global scraper tarafından her 6 saatte bir güncellenir. Müşterilere sunulacak içerik planlarını bu trendler doğrultusunda oluşturmanız önerilir.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
