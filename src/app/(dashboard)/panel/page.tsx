'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, CalendarDays, Bot, 
  TrendingUp, TrendingDown, ArrowUpRight, 
  Sparkles, CheckCircle2, MessageSquare, Target, ShieldCheck, Zap, Globe,
  DollarSign, Activity, Eye, ShieldAlert, BrainCircuit, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';

const performanceData = [
  { name: 'Pzt', budget: 4000, spend: 2400 },
  { name: 'Sal', budget: 3000, spend: 1398 },
  { name: 'Çar', budget: 2000, spend: 9800 },
  { name: 'Per', budget: 2780, spend: 3908 },
  { name: 'Cum', budget: 1890, spend: 4800 },
  { name: 'Cmt', budget: 2390, spend: 3800 },
  { name: 'Paz', budget: 3490, spend: 4300 },
];

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    clients: 0,
    activeCampaigns: 0,
    scheduledPosts: 0,
    integrations: 0,
  });

  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    if (!confirm('Demo verileri yüklensin mi? Mevcut veriler silinip yeniden oluşturulacak.')) return;
    setSeeding(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSeeding(false);
    }
  };

  const [feed, setFeed] = useState([
    { id: 1, type: 'ai', action: 'Mesaj Yanıtlandı', client: 'Aura Güzellik', time: '1dk önce', icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 2, type: 'ads', action: 'Bütçe Optimize Edildi', client: 'Bella Moda', time: '5dk önce', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 3, type: 'lead', action: 'Yeni Satış Fırsatı', client: 'Hırdavat Pro', time: '12dk önce', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        if (data?.stats) setStats(data.stats);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const metrics = [
    { title: 'Aktif Müşteriler', value: stats?.clients || 0, change: '+'+(stats?.clients || 0), up: true, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Aktif Kampanyalar', value: stats?.activeCampaigns || 0, change: '+'+(stats?.activeCampaigns || 0), up: true, icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Ajans Aylık Gelir', value: '₺' + ((stats?.clients || 0) * 7500).toLocaleString(), change: 'Gross', up: true, icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Planlanmış İçerik', value: stats?.scheduledPosts || 0, change: 'Sync', up: true, icon: CalendarDays, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Neural Interface Loading...</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20 text-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm">
              Intelligence Active
            </span>
          </div>
          <h1 className="text-[36px] font-black tracking-tighter text-slate-900 leading-none italic">
            Ajans Komuta Merkezi
          </h1>
          <p className="text-[15px] mt-3 text-slate-500 font-medium tracking-tight">
            İşte bugün ajansında gerçekleşen tüm dijital hareketlilik.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSeed} disabled={seeding} className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 active:scale-95 disabled:opacity-50">
            {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {seeding ? 'Yükleniyor...' : 'Demo Veri Yükle'}
          </button>
          <button onClick={() => router.push('/analizler')} className="px-6 py-3.5 rounded-2xl bg-white border border-slate-100 hover:bg-slate-50 text-slate-900 font-black text-xs uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 active:scale-95">
            Global Rapor <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all">
            <div className="flex items-start justify-between mb-8">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${m.bg} ${m.color} shadow-sm`}>
                <m.icon size={24} />
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 text-[10px] font-black uppercase tracking-widest ${m.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                {m.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {m.change}
              </div>
            </div>
            <p className="text-[34px] font-black text-slate-900 leading-none mb-1 tracking-tighter">{m.value}</p>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{m.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Chart */}
        <div className="xl:col-span-8 bg-white border border-slate-100 rounded-[48px] p-10 shadow-sm flex flex-col min-h-[480px]">
          <h3 className="text-[16px] font-black text-slate-900 uppercase tracking-widest mb-10">Performans Analitiği</h3>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 900 }} dy={10}/>
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 900 }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9' }}/>
                <Area type="monotone" dataKey="spend" stroke="#6366f1" strokeWidth={4} fillOpacity={0.1} fill="#6366f1" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Neural Feed */}
        <div className="xl:col-span-4 bg-white border border-slate-100 rounded-[48px] p-10 shadow-sm flex flex-col">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-[14px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
                 <Activity size={18} className="text-indigo-600" /> Canlı Akış
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           </div>
           <div className="flex-1 space-y-6">
              {feed.map((item, i) => (
                 <div key={i} className="p-5 rounded-[28px] bg-slate-50 border border-slate-100 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.bg} ${item.color} shadow-sm`}>
                       <item.icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex items-center justify-between gap-2">
                          <p className="text-[13px] font-black text-slate-900 truncate tracking-tight">{item.action}</p>
                          <span className="text-[9px] font-black text-slate-300 uppercase shrink-0">{item.time}</span>
                       </div>
                       <p className="text-[11px] text-slate-400 font-bold mt-1 uppercase tracking-widest">{item.client}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* Strategic Insight Box */}
      <div className="bg-indigo-600 rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-600/20 group">
         <div className="absolute top-0 right-0 p-12 opacity-10 -rotate-12 translate-x-4">
            <BrainCircuit size={180} />
         </div>
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="w-24 h-24 rounded-[36px] bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-md">
               <Zap size={48} className="text-white" />
            </div>
            <div className="flex-1 space-y-4">
               <h4 className="text-[20px] font-black uppercase tracking-widest leading-none">Neural Strateji Tavsiyesi</h4>
               <p className="text-[16px] text-indigo-50 leading-relaxed font-medium">
                  "Mevcut verilerine göre <span className="text-white font-black">Meta Ads</span> harcamalarını %15 artırmak, ajans karlılığını önümüzdeki ay <span className="text-emerald-300 font-black">₺12.500</span> seviyesine çıkarabilir. Yeni lead'ler kapıda!"
               </p>
            </div>
            <button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl text-[14px] font-black uppercase tracking-widest shadow-xl hover:bg-indigo-50 transition-all active:scale-95">Stratejiyi Onayla</button>
         </div>
      </div>
    </motion.div>
  );
}
