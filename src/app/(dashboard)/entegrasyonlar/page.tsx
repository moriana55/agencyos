'use client';

import React, { useState } from 'react';
import { 
  Link2, Instagram, Globe, Database, 
  Cloud, CreditCard, Share2, ShieldCheck,
  CheckCircle2, AlertCircle, ArrowUpRight, Camera
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function EntegrasyonlarPage() {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [integrations, setIntegrations] = useState([
    { id: 'meta', name: 'Meta (Instagram & Facebook)', desc: 'Reklam yönetimi ve içerik paylaşımı için.', status: 'connected', icon: Camera, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'google_ads', name: 'Google Ads', desc: 'Arama ağı ve Youtube reklamlarını yönetin.', status: 'not_connected', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'drive', name: 'Google Drive', desc: 'İçerikleri otomatik çekmek ve depolamak için.', status: 'not_connected', icon: Cloud, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'n8n', name: 'n8n Automation', desc: 'Karmaşık iş akışlarını ve otomasyonları bağlayın.', status: 'connected', icon: Database, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'iyzico', name: 'Iyzico', desc: 'Müşteri aboneliklerini ve ödemeleri yönetin.', status: 'not_connected', icon: CreditCard, color: 'text-rose-600', bg: 'bg-rose-50' },
  ]);

  const handleConnect = (id: string) => {
    setConnecting(id);
    setTimeout(() => {
      setIntegrations(prev => prev.map(item => 
        item.id === id ? { ...item, status: 'connected' } : item
      ));
      setConnecting(null);
    }, 2000);
  };

  return (
    <div className="space-y-7 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-2 text-slate-400">Bağlantı Merkezi</p>
          <h1 className="text-[28px] font-bold tracking-tight text-slate-900">Entegrasyonlar</h1>
          <p className="text-[14px] mt-1 text-slate-500">AgencyOS'u diğer platformlara bağlayarak tam otomasyona geçin.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 text-[13px] font-bold">
          <ShieldCheck size={16} /> Tüm Bağlantılar Şifrelendi
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card p-6 flex flex-col justify-between group hover:border-indigo-200 transition-all"
          >
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-110 transition-transform relative`}>
                  {connecting === item.id && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-indigo-600 border-t-transparent animate-spin" />
                  )}
                  <item.icon size={28} />
                </div>
                {item.status === 'connected' ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 uppercase tracking-wider">
                    <CheckCircle2 size={14} /> Bağlı
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <AlertCircle size={14} /> Bağlı Değil
                  </span>
                )}
              </div>
              
              <h3 className="text-[17px] font-black text-slate-900 mb-2">{item.name}</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
                {item.desc}
              </p>
            </div>

            <button 
              onClick={() => item.status === 'not_connected' && handleConnect(item.id)}
              disabled={connecting === item.id}
              className={`w-full py-3.5 rounded-xl text-[13px] font-black transition-all flex items-center justify-center gap-2 ${
                item.status === 'connected' 
                  ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                  : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-500 disabled:opacity-70'
              }`}
            >
              {connecting === item.id ? 'Bağlanıyor...' : (item.status === 'connected' ? 'Bağlantıyı Yönet' : 'Şimdi Bağla')} 
              <ArrowUpRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Pro Tip Card */}
      <div className="card p-8 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Share2 size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
            <Link2 size={32} className="text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Özel Webhook & API</h3>
            <p className="text-slate-400 text-[14px] leading-relaxed max-w-2xl">
              Listede olmayan bir platformu mu bağlamak istiyorsunuz? Özel webhook desteğimizle n8n veya Zapier üzerinden her türlü servisi AgencyOS'a entegre edebilirsiniz.
            </p>
          </div>
          <button className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-black text-[14px] hover:bg-slate-100 transition-all">
            Dokümantasyona Bak
          </button>
        </div>
      </div>
    </div>
  );
}
