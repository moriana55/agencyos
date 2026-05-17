'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Zap, Target, BarChart3, 
  Calendar, Globe, ShieldCheck, ArrowUpRight,
  MessageSquare, Users, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// Mock data for the client report
const reportData = [
  { name: 'Pzt', roas: 4.2, spend: 1200 },
  { name: 'Sal', roas: 3.8, spend: 1100 },
  { name: 'Çar', roas: 5.1, spend: 1500 },
  { name: 'Per', roas: 4.9, spend: 1400 },
  { name: 'Cum', roas: 6.2, spend: 2100 },
  { name: 'Cmt', roas: 5.8, spend: 1900 },
  { name: 'Paz', roas: 6.5, spend: 2300 },
];

const channelData = [
  { name: 'Instagram', value: 45, color: '#6366f1' },
  { name: 'Google Ads', value: 35, color: '#a855f7' },
  { name: 'TikTok', value: 20, color: '#ec4899' },
];

export default function ClientReportPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching client data
    setTimeout(() => {
      setClient({
        name: 'Bella Fashion',
        sector: 'E-Ticaret / Moda',
        status: 'Active',
        totalSpend: '₺12,500',
        avgRoas: '5.2x',
        conversions: '342'
      });
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090F] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Rapor Hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090F] text-white selection:bg-indigo-500/30 overflow-x-hidden font-sans pb-32">
      {/* Navbar / Logo Area */}
      <nav className="h-24 border-b border-white/5 flex items-center justify-between px-6 md:px-12 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <span className="text-xl font-black tracking-tight uppercase">Agency<span className="text-indigo-400">OS</span></span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Canlı Veri Yayını</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-4">Haftalık Performans Raporu</p>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">{client?.name}</h1>
              <div className="flex flex-wrap gap-4">
                 <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest text-slate-400">{client?.sector}</span>
                 <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-black uppercase tracking-widest text-indigo-400">12 - 18 Mayıs 2026</span>
              </div>
           </motion.div>
           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 border border-white/10 p-6 rounded-[32px] backdrop-blur-md">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Genel Durum</p>
              <div className="flex items-center gap-4">
                 <p className="text-3xl font-black text-emerald-400">Mükemmel</p>
                 <TrendingUp className="text-emerald-400" size={32} />
              </div>
           </motion.div>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
           {[
             { label: 'Harcama', value: client.totalSpend, icon: Target, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
             { label: 'Ort. ROAS', value: client.avgRoas, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
             { label: 'Dönüşüm', value: client.conversions, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
           ].map((m, i) => (
             <motion.div 
               key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
               className="bg-[#0a0a0f]/40 border border-white/5 p-8 rounded-[40px] flex flex-col justify-between min-h-[160px] backdrop-blur-md"
             >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${m.bg} ${m.color} mb-4 shadow-xl`}>
                   <m.icon size={24} />
                </div>
                <div>
                   <p className="text-4xl font-black tracking-tighter mb-1">{m.value}</p>
                   <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{m.label}</p>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-8">
           {/* ROAS & Spend Chart */}
           <div className="xl:col-span-8 bg-[#0a0a0f]/40 border border-white/5 rounded-[48px] p-10 backdrop-blur-md min-h-[450px] flex flex-col">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-xl font-black uppercase tracking-tight">Performans Zaman Çizelgesi</h3>
                 <div className="flex gap-4">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500" /><span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Spend</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500" /><span className="text-[10px] font-black uppercase tracking-widest text-slate-500">ROAS</span></div>
                 </div>
              </div>
              <div className="flex-1 w-full min-h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={reportData}>
                       <defs>
                          <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient>
                          <linearGradient id="colorRoas" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/><stop offset="95%" stopColor="#a855f7" stopOpacity={0}/></linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 900 }} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 900 }} />
                       <Tooltip contentStyle={{ backgroundColor: '#0a0a0f', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }} />
                       <Area type="monotone" dataKey="spend" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorSpend)" />
                       <Area type="monotone" dataKey="roas" stroke="#a855f7" strokeWidth={4} fillOpacity={1} fill="url(#colorRoas)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Channel Mix */}
           <div className="xl:col-span-4 bg-[#0a0a0f]/40 border border-white/5 rounded-[48px] p-10 backdrop-blur-md flex flex-col items-center justify-center">
              <h3 className="text-lg font-black uppercase tracking-tight mb-8 w-full text-left">Mecra Dağılımı</h3>
              <div className="w-full h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie data={channelData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                          {channelData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Pie>
                       <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
              <div className="w-full space-y-4 mt-8">
                 {channelData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                       <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-[13px] font-black uppercase tracking-tight">{item.name}</span>
                       </div>
                       <span className="text-[13px] font-black text-slate-400">%{item.value}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* AI Insight Section for Client */}
        <div className="mt-8 bg-gradient-to-br from-indigo-600/20 to-purple-800/20 border border-white/10 rounded-[48px] p-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
              <Sparkles size={200} />
           </div>
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl">
                 <Sparkles className="text-white" size={40} />
              </div>
              <div className="flex-1 space-y-4 text-center md:text-left">
                 <h3 className="text-3xl font-black tracking-tight uppercase">Yapay Zeka Analiz Raporu</h3>
                 <p className="text-lg text-slate-300 font-medium leading-relaxed italic">
                    "Bu hafta Instagram kampanyalarınızda yakaladığımız %24'lük verimlilik artışı sayesinde ROAS değerinizi 5.2x seviyesine çıkardık. Gelecek hafta için video içeriklerin yoğunluğunu %15 artırmayı planlıyoruz."
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 py-20 border-t border-white/5 text-center">
         <p className="text-[11px] font-black text-slate-700 uppercase tracking-[0.5em]">Powered by AgencyOS Intelligence Hub</p>
      </footer>
    </div>
  );
}
