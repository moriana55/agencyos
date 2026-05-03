'use client';

import React, { useState } from 'react';
import { 
  Camera, Globe, MessageSquare, 
  Share2, ShieldCheck, Zap, 
  ArrowUpRight, CheckCircle2, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function EntegrasyonlarPage() {
  const [integrations, setIntegrations] = useState([
    { id: 'meta', name: 'Meta Business Ads', icon: Camera, status: 'connected', color: 'text-indigo-600', bg: 'bg-indigo-50', lastSync: '2 dakika önce' },
    { id: 'google', name: 'Google Ads Manager', icon: Globe, status: 'not_connected', color: 'text-blue-600', bg: 'bg-blue-50', lastSync: '-' },
    { id: 'whatsapp', name: 'WhatsApp Business API', icon: MessageSquare, status: 'not_connected', color: 'text-emerald-600', bg: 'bg-emerald-50', lastSync: '-' },
    { id: 'tiktok', name: 'TikTok For Business', icon: Share2, status: 'not_connected', color: 'text-rose-600', bg: 'bg-rose-50', lastSync: '-' },
  ]);

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="pt-2">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-indigo-500/80">Intelligence Hub</p>
        <h1 className="text-[32px] font-black tracking-tight text-slate-900 leading-none">Veri Entegrasyonları</h1>
        <p className="text-[14px] mt-2 text-slate-500 font-medium max-w-2xl">
          Dijital ekosisteminizi tek bir merkezden yönetin. Tüm platformları AgencyOS terminaline bağlayarak AI optimizasyonunu aktif edin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="intel-card group hover:border-indigo-200 transition-all cursor-default"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200/50 group-hover:scale-110 transition-transform ${item.bg} ${item.color}`}>
                  <item.icon size={26} />
                </div>
                <div>
                  <h3 className="text-[17px] font-black text-slate-900">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-2 h-2 rounded-full ${item.status === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                    <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                      {item.status === 'connected' ? 'Bağlantı Aktif' : 'Bağlantı Yok'}
                    </span>
                  </div>
                </div>
              </div>
              
              <button className={`px-5 py-2.5 rounded-xl text-[13px] font-black transition-all ${
                item.status === 'connected' 
                  ? 'bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600' 
                  : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700'
              }`}>
                {item.status === 'connected' ? 'Bağlantıyı Kes' : 'Hemen Bağla'}
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Son Senkronizasyon</p>
                  <p className="text-[13px] font-bold text-slate-700 mt-0.5">{item.lastSync}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Veri Akışı</p>
                  <p className="text-[13px] font-bold text-slate-700 mt-0.5">{item.status === 'connected' ? 'Anlık (Real-time)' : 'Beklemede'}</p>
                </div>
              </div>
              {item.status === 'connected' && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg">
                  <ShieldCheck size={14} />
                  <span className="text-[11px] font-bold">Encrypted</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Security Info Card */}
      <div className="bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform">
          <ShieldCheck size={180} />
        </div>
        <div className="relative z-10 max-w-xl">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-xl">
            <Zap className="text-indigo-400" size={24} />
          </div>
          <h2 className="text-[24px] font-black leading-tight mb-4">Enterprise Grade Security & Compliance</h2>
          <p className="text-slate-400 text-[15px] leading-relaxed mb-8">
            AgencyOS, veri güvenliğinizi en üst düzeyde tutmak için 256-bit AES şifreleme ve resmi API protokollerini kullanır. 
            Hiçbir şifreniz sistemimizde saklanmaz, tüm bağlantılar OAuth 2.0 üzerinden güvenle gerçekleştirilir.
          </p>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span className="text-[13px] font-bold text-slate-300">GDPR Compliant</span>
             </div>
             <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span className="text-[13px] font-bold text-slate-300">ISO 27001 Standard</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
