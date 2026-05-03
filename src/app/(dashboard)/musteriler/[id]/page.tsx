'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Building2, Calendar, Target, 
  TrendingUp, MessageSquare, Plus, ArrowUpRight,
  ShieldCheck, Clock, Camera, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MusteriDetayPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      const res = await fetch('/api/clients');
      const data = await res.json();
      const found = data.clients?.find((c: any) => c.id === params.id);
      setClient(found);
      setLoading(false);
    };
    fetchClient();
  }, [params.id]);

  if (loading) return <div className="p-20 text-center font-bold text-slate-400">Müşteri dosyası hazırlanıyor...</div>;
  if (!client) return <div className="p-20 text-center font-bold text-rose-500">Müşteri bulunamadı.</div>;

  return (
    <div className="space-y-8 pb-20">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 transition-all">
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest">Müşteri Dosyası</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{client.name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2"><Clock size={16} /> Geçmişi Gör</button>
          <button className="btn-primary flex items-center gap-2"><Plus size={16} /> Yeni Aksiyon</button>
        </div>
      </div>

      {/* Grid Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Stats & Info */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: 'Toplam Harcama', value: '₺42,800', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Aktif Kampanya', value: '4', icon: Target, color: 'text-rose-600', bg: 'bg-rose-50' },
              { label: 'Bekleyen Randevu', value: '2', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((s, i) => (
              <div key={i} className="card p-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.bg} ${s.color}`}>
                  <s.icon size={20} />
                </div>
                <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Active Work Section */}
          <div className="card p-0 overflow-hidden">
             <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-[16px] font-bold text-slate-900">Müşteri Yol Haritası</h3>
                <span className="text-[12px] font-bold text-emerald-500 flex items-center gap-1">
                  <ShieldCheck size={14} /> Tüm Sistemler Aktif
                </span>
             </div>
             <div className="p-6 space-y-6">
                {[
                  { stage: 'Reklam Yönetimi', status: 'Aktif', detail: 'Meta & Google Ads kampanyaları optimize ediliyor.', icon: Target, color: 'text-indigo-600' },
                  { stage: 'İçerik Planlama', status: 'Planlandı', detail: 'Önümüzdeki 7 gün için 4 post hazırlandı.', icon: Camera, color: 'text-rose-600' },
                  { stage: 'AI Yanıt Sistemi', status: 'Çalışıyor', detail: 'Gelen mesajlara anlık yanıt veriliyor.', icon: MessageSquare, color: 'text-emerald-600' },
                ].map((st, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-all cursor-pointer group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm ${st.color}`}>
                       <st.icon size={22} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[14px] font-bold text-slate-900">{st.stage}</h4>
                        <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest">{st.status}</span>
                      </div>
                      <p className="text-[13px] text-slate-500">{st.detail}</p>
                    </div>
                    <ArrowUpRight size={18} className="text-slate-300 group-hover:text-indigo-600 transition-all" />
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right: Profile & Contact */}
        <div className="lg:col-span-4 space-y-8">
           <div className="card p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-slate-100 mx-auto mb-4 flex items-center justify-center text-3xl font-black text-slate-400 border-4 border-white shadow-lg">
                {client.name[0]}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{client.name}</h3>
              <p className="text-[13px] text-slate-500 mb-6">Müşteri No: #{client.id.slice(-4)}</p>
              
              <div className="space-y-3 pt-6 border-t border-slate-50">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-slate-400 font-bold">Kategori</span>
                  <span className="text-slate-900 font-black">E-Ticaret</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-slate-400 font-bold">Başlangıç</span>
                  <span className="text-slate-900 font-black">12 Nisan 2026</span>
                </div>
              </div>

              <button className="btn-primary w-full mt-8 py-4">İletişime Geç</button>
           </div>

           <div className="card p-6 bg-slate-900 text-white border-none">
              <h4 className="text-[14px] font-bold mb-4 flex items-center gap-2">
                <Globe size={18} className="text-indigo-400" /> Platform Bağlantıları
              </h4>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[13px] font-bold">Meta Business</span>
                    <span className="text-[10px] px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-md font-black uppercase">Bağlı</span>
                 </div>
                 <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 opacity-50">
                    <span className="text-[13px] font-bold">Google Ads</span>
                    <span className="text-[10px] px-2 py-1 bg-slate-500/20 text-slate-400 rounded-md font-black uppercase">Bağlı Değil</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
