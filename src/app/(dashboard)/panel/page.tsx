'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, CalendarDays, Bot, 
  TrendingUp, TrendingDown, ArrowUpRight, 
  Sparkles, CheckCircle2, MessageSquare, Target, ShieldCheck, Zap, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    clients: 0,
    activeCampaigns: 0,
    scheduledPosts: 0,
    integrations: 0,
    plan: 'free'
  });

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        if (data.stats) setStats(data.stats);
      } catch (e) {
        console.error('Veri çekme hatası:', e);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const metrics = [
    { title: 'Aktif Müşteriler', value: stats.clients, change: '+'+stats.clients, up: true, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Aktif Kampanyalar', value: stats.activeCampaigns, change: '+'+stats.activeCampaigns, up: true, icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Planlanmış İçerik', value: stats.scheduledPosts, change: 'Aktif', up: true, icon: CalendarDays, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Bağlı Platformlar', value: stats.integrations, change: 'Sync', up: true, icon: Globe, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px]">Sistem Verileri Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-7 pb-16"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600">
              Sistem Aktif
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600">
              Plan: {stats.plan.toUpperCase()}
            </span>
          </div>
          <h1 className="text-[28px] font-bold tracking-tight text-slate-900">
            Ajans Komuta Merkezi
          </h1>
          <p className="text-[14px] mt-1 text-slate-500 font-medium">
            Müşterileriniz, reklamlarınız ve stratejik analizleriniz tek ekranda.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/analizler')} className="btn-secondary flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[13px]">
            Hızlı Rapor <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Onboarding / Quick Setup Section */}
      {stats.clients === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-8 bg-gradient-to-br from-white to-indigo-50/30 border-indigo-100 shadow-xl shadow-indigo-100/20"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles size={14} /> İlk Adımlar
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">AgencyOS Dünyasına Hoş Geldiniz!</h2>
              <p className="text-slate-500 text-[15px] leading-relaxed max-w-xl font-medium">
                Ajansınızı büyütmek için gereken her şey hazır. Hemen ilk müşterinizi ekleyerek reklam yönetimini ve otomasyonu aktif edebilirsiniz.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { label: 'Müşteri Ekle', icon: Users, path: '/musteriler', done: stats.clients > 0 },
                  { label: 'Entegrasyonlar', icon: Globe, path: '/entegrasyonlar', done: stats.integrations > 0 },
                  { label: 'Sistem Ayarları', icon: ShieldCheck, path: '/ayarlar', done: false },
                ].map((step, i) => (
                  <button 
                    key={i} 
                    onClick={() => router.push(step.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all active:scale-95 shadow-sm ${
                      step.done 
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                        : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/30'
                    }`}
                  >
                    {step.done ? <CheckCircle2 size={16} /> : <step.icon size={16} className="text-indigo-500" />}
                    <span className="text-[13px] font-bold">{step.label}</span>
                    {step.done && <span className="text-[10px] font-black uppercase ml-1 opacity-70">Aktif</span>}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full md:w-auto flex flex-col gap-3">
              <button 
                onClick={() => router.push('/musteriler')}
                className="w-full md:w-auto px-10 py-5 rounded-2xl bg-indigo-600 text-white font-black text-lg hover:bg-indigo-500 shadow-2xl shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Hadi Başlayalım <ArrowUpRight size={24} />
              </button>
              <button 
                onClick={async () => {
                  const res = await fetch('/api/seed', { method: 'POST' });
                  if (res.ok) window.location.reload();
                }}
                className="w-full md:w-auto px-10 py-3 rounded-2xl bg-slate-900 text-white font-bold text-[13px] hover:bg-slate-800 transition-all flex items-center justify-center gap-2 border border-white/10"
              >
                <Zap size={16} className="text-amber-400" /> Sistemi Demo Verilerle Canlandır
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, i) => (
          <motion.div 
            key={m.title} 
            initial={{ opacity: 0, y: 16 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.07 }} 
            onClick={() => {
              if (m.title.includes('Müşteri')) router.push('/musteriler');
              if (m.title.includes('Kampanya')) router.push('/reklam');
              if (m.title.includes('İçerik')) router.push('/takvim');
              if (m.title.includes('Platform')) router.push('/entegrasyonlar');
            }}
            className="card p-6 flex flex-col justify-between min-h-[140px] group hover:border-indigo-200 transition-all cursor-pointer active:scale-95"
          >
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.bg} ${m.color} group-hover:scale-110 transition-transform`}>
                <m.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-[12px] font-bold ${m.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                {m.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {m.change}
              </div>
            </div>
            <div>
              <p className="text-[32px] font-black text-slate-900 leading-none mb-1">{m.value}</p>
              <p className="text-[13px] font-bold text-slate-400 uppercase tracking-wide">{m.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Column - System Overview */}
        <div className="xl:col-span-8 space-y-6">
          <div className="card p-0 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-[16px] font-bold text-slate-900">Günlük Özeti</h3>
                <p className="text-[13px] text-slate-500">Son 24 saatteki ajans aktiviteleri</p>
              </div>
              <button 
                onClick={() => router.push('/analizler')}
                className="text-[13px] font-bold text-indigo-600 hover:text-indigo-700"
              >
                Tümünü Gör
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { type: 'ai', icon: MessageSquare, title: 'Otomatik Yanıt', desc: '"Fiyat nedir?" sorusuna AI tarafından yanıt verildi.', time: 'Canlı', color: 'text-purple-600', bg: 'bg-purple-50', path: '/ai-sosyal' },
                { type: 'ads', icon: Target, title: 'Kampanya Analizi', desc: 'Reklam kampanyalarınız anlık olarak izleniyor.', time: 'Aktif', color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/reklam' },
                { type: 'post', icon: CalendarDays, title: 'İçerik Planlama', desc: 'Haftalık içerik takviminiz hazır.', time: 'Güncel', color: 'text-indigo-600', bg: 'bg-indigo-50', path: '/takvim' },
              ].map((log, i) => (
                <div 
                  key={i} 
                  onClick={() => router.push(log.path)}
                  className="px-6 py-4 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${log.bg} ${log.color}`}>
                    <log.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-slate-900">{log.title}</p>
                    <p className="text-[13px] text-slate-500 truncate">{log.desc}</p>
                  </div>
                  <span className="text-[12px] font-bold text-slate-400 shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Strateji Merkezi */}
        <div className="xl:col-span-4 space-y-6">
          <div className="card p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white border-none shadow-xl shadow-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold">Strateji Merkezi</h3>
                  <p className="text-[12px] text-slate-400">Admin Önerileri</p>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Aktif</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-[13px] leading-relaxed text-slate-300 italic font-medium">
                  {stats.clients === 0 
                    ? '"Sistem analizi için lütfen en az bir müşteri ekleyin."'
                    : stats.integrations === 0 
                      ? '"Veri akışı için lütfen reklam platformlarınızı bağlayın."'
                      : '"Mevcut kampanyalarınızın performansı optimize ediliyor. AI motoru aktif."'
                  }
                </p>
              </div>
              <button 
                disabled={stats.clients === 0}
                onClick={() => router.push('/analizler')}
                className="w-full py-3 bg-white text-slate-900 rounded-xl text-[13px] font-black hover:bg-slate-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                Aksiyon Al <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          <div className="card p-6">
             <h3 className="text-[15px] font-bold text-slate-900 mb-4">Hızlı Erişim</h3>
             <div className="grid grid-cols-2 gap-3">
               {[
                 { label: 'Müşteri Ekle', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', path: '/musteriler' },
                 { label: 'Post Planla', icon: CalendarDays, color: 'text-amber-600', bg: 'bg-amber-50', path: '/takvim' },
                 { label: 'Entegrasyon', icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/entegrasyonlar' },
                 { label: 'Abonelik', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50', path: '/abonelik' },
               ].map((action, i) => (
                 <button 
                    key={i} 
                    onClick={() => router.push(action.path)}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all group active:scale-95 border border-transparent hover:border-slate-200"
                 >
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                     <action.icon size={18} />
                   </div>
                   <span className="text-[11px] font-bold text-slate-600">{action.label}</span>
                 </button>
               ))}
             </div>
          </div>

          {/* System Status - VPS Special */}
          <div className="card p-6 bg-slate-900 text-white border-none relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
               <Globe size={80} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="text-[12px] font-black uppercase tracking-widest text-slate-400">Sistem Durumu</h4>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-slate-400 font-medium">Sunucu</span>
                  <span className="text-[13px] font-bold text-emerald-400">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-slate-400 font-medium">Veri Tabanı</span>
                  <span className="text-[13px] font-bold text-indigo-400">Neon Postgres</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-slate-400 font-medium">Platform</span>
                  <span className="text-[13px] font-bold text-amber-400">AgencyOS v1.0</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Uptime %99.9</span>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-3 bg-emerald-500/40 rounded-full" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
