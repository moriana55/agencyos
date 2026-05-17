'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3, TrendingUp, Users,
  Zap, ArrowUpRight, ArrowDownRight,
  Globe, Target, Loader2, DollarSign,
  CalendarDays, MousePointer2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalyticsData {
  overview: {
    totalSpend: number;
    totalBudget: number;
    avgRoas: number;
    totalClicks: number;
    totalClients: number;
    totalCampaigns: number;
    totalPosts: number;
    publishedPosts: number;
    scheduledPosts: number;
  };
  platforms: { name: string; spend: number; avgRoas: number; campaigns: number }[];
  clientPerformance: { id: string; name: string; spend: number; roas: number; campaigns: number; posts: number }[];
}

export default function AnalizlerPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Veriler analiz ediliyor...</p>
      </div>
    );
  }

  if (!data || !data.overview) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <BarChart3 size={48} className="text-slate-200" />
        <p className="text-slate-400 font-bold">Henüz analiz verisi yok. Müşteri ve kampanya ekleyin.</p>
      </div>
    );
  }

  const { overview, platforms, clientPerformance } = data;

  const stats = [
    { label: 'Toplam Harcama', value: `₺${overview.totalSpend.toLocaleString()}`, icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Ortalama ROAS', value: `${overview.avgRoas}x`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Aktif Müşteri', value: overview.totalClients, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Toplam Kampanya', value: overview.totalCampaigns, icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'İçerik (Yayında)', value: `${overview.publishedPosts}/${overview.totalPosts}`, icon: CalendarDays, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Toplam Tıklama', value: overview.totalClicks.toLocaleString(), icon: MousePointer2, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const maxSpend = Math.max(...clientPerformance.map(c => c.spend), 1);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-indigo-500/80">Data Intelligence</p>
          <h1 className="text-[32px] font-black tracking-tight text-slate-900 leading-none">Analiz & Raporlama</h1>
          <p className="text-[14px] mt-2 text-slate-500 font-medium">Gerçek zamanlı ajans performans verileri.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-slate-100 rounded-[32px] p-7 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.bg} ${s.color}`}>
                <s.icon size={22} />
              </div>
            </div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
            <p className="text-[28px] font-black text-slate-900 mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Platform Breakdown */}
        <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
          <h3 className="text-[14px] font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Globe size={18} className="text-indigo-600" />
            Platform Dağılımı
          </h3>
          {platforms.length === 0 ? (
            <p className="text-slate-400 text-sm">Henüz kampanya verisi yok.</p>
          ) : (
            <div className="space-y-5">
              {platforms.map((p, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[13px] font-bold">
                    <span className="text-slate-700">{p.name}</span>
                    <span className="text-slate-500">₺{p.spend.toLocaleString()} · {p.avgRoas}x ROAS · {p.campaigns} kampanya</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(p.spend / (overview.totalSpend || 1)) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full bg-indigo-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Client Performance */}
        <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
          <h3 className="text-[14px] font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Users size={18} className="text-emerald-600" />
            Müşteri Performansı
          </h3>
          {clientPerformance.length === 0 ? (
            <p className="text-slate-400 text-sm">Henüz müşteri verisi yok.</p>
          ) : (
            <div className="space-y-4">
              {clientPerformance.slice(0, 8).map((c, i) => (
                <div key={c.id} className="flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black ${i === 0 ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[13px] font-bold text-slate-800 truncate">{c.name}</p>
                      <span className="text-[12px] font-black text-slate-500">₺{c.spend.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(c.spend / maxSpend) * 100}%` }} />
                    </div>
                  </div>
                  <span className={`text-[11px] font-black px-2 py-0.5 rounded-lg ${c.roas >= 4 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                    {c.roas}x
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Stats */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
        <h3 className="text-[14px] font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
          <CalendarDays size={18} className="text-amber-600" />
          İçerik Durumu
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Toplam İçerik', value: overview.totalPosts, color: 'text-slate-900' },
            { label: 'Yayınlanan', value: overview.publishedPosts, color: 'text-emerald-600' },
            { label: 'Planlanmış', value: overview.scheduledPosts, color: 'text-indigo-600' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 rounded-2xl p-6 text-center">
              <p className={`text-[32px] font-black ${item.color}`}>{item.value}</p>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
