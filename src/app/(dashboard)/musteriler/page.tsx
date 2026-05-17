'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, Search, Filter, 
  Globe, Camera, MessageCircle, 
  ArrowUpRight, Building2, Trash2, X,
  ShieldCheck, Zap, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusterilerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', sector: '' });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients');
      const data = await res.json();
      if (data.clients) setClients(data.clients);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient),
      });
      if (res.ok) {
        setShowAddModal(false);
        setNewClient({ name: '', sector: '' });
        fetchClients();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-indigo-400">Client Intelligence</p>
          <h1 className="text-[36px] font-black tracking-tighter text-white leading-none">Müşteri Portföyü</h1>
          <p className="text-[15px] mt-3 text-slate-500 font-medium tracking-tight">Tüm markalarınızı ve bağlantı durumlarını buradan yönetin.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-8 py-4 rounded-[20px] bg-indigo-600 text-white font-black text-[14px] uppercase tracking-widest hover:bg-indigo-500 transition-all flex items-center gap-3 shadow-[0_15px_35px_rgba(79,70,229,0.3)] active:scale-95 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> 
          Yeni Müşteri Ekle
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
        <div className="relative flex-1 max-w-sm group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Müşteri ara..." 
            className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/5 rounded-[22px] text-[14px] font-medium text-white outline-none focus:bg-white/[0.08] focus:border-indigo-500/30 transition-all placeholder:text-white/20"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-4 rounded-[22px] bg-white/[0.03] border border-white/5 text-[13px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 hover:bg-white/5 hover:border-white/10 transition-all active:scale-95">
            <Filter size={16} /> Filtrele
          </button>
        </div>
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
           <div className="col-span-full py-20 text-center">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-[0_0_20px_rgba(79,70,229,0.3)]" />
              <p className="text-slate-600 font-black uppercase tracking-[0.2em] text-[10px]">Intel Data Fetching...</p>
           </div>
        ) : clients.length === 0 ? (
           <div className="col-span-full py-24 bg-white/[0.01] border border-dashed border-white/10 rounded-[48px] flex flex-col items-center justify-center text-center backdrop-blur-sm">
              <div className="w-20 h-20 bg-white/[0.02] border border-white/5 rounded-[32px] flex items-center justify-center mb-6 shadow-2xl">
                 <Building2 size={36} className="text-slate-800" />
              </div>
              <p className="font-black uppercase tracking-[0.2em] text-[12px] text-slate-600">Henüz müşteri eklenmemiş.</p>
              <button onClick={() => setShowAddModal(true)} className="text-indigo-400 font-black mt-3 hover:text-indigo-300 transition-colors uppercase tracking-widest text-[11px]">İlk müşterinizi ekleyin</button>
           </div>
        ) : (
          clients.map((client: any, i: number) => (
            <motion.div 
              key={client.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => router.push(`/musteriler/${client.id}`)}
              className="bg-[#0a0a0f]/40 border border-white/5 p-8 rounded-[40px] group cursor-pointer hover:border-indigo-500/30 transition-all relative overflow-hidden backdrop-blur-md"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-[24px] bg-white/[0.03] text-slate-500 border border-white/10 flex items-center justify-center font-black text-2xl group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all shadow-xl">
                  {client.name[0]}
                </div>
                <div className="p-3 bg-white/[0.02] text-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 border border-white/5 group-hover:text-indigo-400">
                  <ArrowUpRight size={20} />
                </div>
              </div>
              
              <h3 className="text-[20px] font-black text-white mb-1.5 tracking-tight group-hover:text-indigo-400 transition-colors">{client.name}</h3>
              <p className="text-[12px] text-slate-500 font-black uppercase tracking-[0.15em] mb-8">{client.sector || 'Sektör Belirtilmedi'}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/[0.03]">
                <div className="flex -space-x-2">
                   {[Globe, Camera, Zap].map((Icon, idx) => (
                     <div key={idx} className="w-9 h-9 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/10 group-hover:text-indigo-500 transition-colors shadow-lg">
                        <Icon size={14} />
                     </div>
                   ))}
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))
        )}
      </div>

      {/* Add Client Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0a0f] border border-white/10 rounded-[48px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] p-12 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.02]">
                 <Building2 size={200} />
              </div>
              
              <div className="flex items-center justify-between mb-10 relative z-10">
                <h3 className="text-[26px] font-black text-white tracking-tighter uppercase">Yeni Müşteri</h3>
                <button onClick={() => setShowAddModal(false)} className="p-3 hover:bg-white/5 rounded-2xl transition-all text-slate-500"><X size={24} /></button>
              </div>
              
              <form onSubmit={handleAddClient} className="space-y-6 relative z-10">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Marka Adı</label>
                  <input 
                    required
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    placeholder="Örn: Bella Fashion"
                    className="w-full p-5 bg-white/5 border border-white/5 rounded-[24px] text-[15px] font-black text-white outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-700"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Sektör</label>
                  <input 
                    value={newClient.sector}
                    onChange={(e) => setNewClient({...newClient, sector: e.target.value})}
                    placeholder="Örn: E-ticaret / Moda"
                    className="w-full p-5 bg-white/5 border border-white/5 rounded-[24px] text-[15px] font-black text-white outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-700"
                  />
                </div>
                <button type="submit" className="w-full py-6 bg-indigo-600 text-white text-[16px] font-black uppercase tracking-[0.3em] mt-6 rounded-[28px] shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:bg-indigo-500 transition-all active:scale-95">Müşteriyi Kaydet</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
