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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-indigo-500/80">Client Intelligence</p>
          <h1 className="text-[32px] font-black tracking-tight text-slate-900 leading-none">Müşteri Portföyü</h1>
          <p className="text-[14px] mt-2 text-slate-500 font-medium">Tüm markalarınızı ve bağlantı durumlarını buradan yönetin.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary glow-indigo px-6 py-3 rounded-2xl flex items-center gap-2 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> 
          <span className="text-[14px] font-bold">Yeni Müşteri Ekle</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Müşteri ara..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] outline-none focus:ring-4 ring-indigo-500/5 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-3 rounded-2xl bg-white border border-slate-200 text-[13px] font-bold text-slate-600 flex items-center gap-2 hover:border-indigo-200 transition-all">
            <Filter size={16} /> Filtrele
          </button>
        </div>
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
           <div className="col-span-full py-20 text-center">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Intel Data Fetching...</p>
           </div>
        ) : clients.length === 0 ? (
           <div className="col-span-full py-20 intel-card border-dashed flex flex-col items-center justify-center text-slate-400">
              <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mb-4">
                 <Building2 size={32} className="opacity-20" />
              </div>
              <p className="font-black uppercase tracking-wider text-[13px]">Henüz müşteri eklenmemiş.</p>
              <button onClick={() => setShowAddModal(true)} className="text-indigo-600 font-bold mt-2 hover:underline">İlk müşterinizi ekleyin</button>
           </div>
        ) : (
          clients.map((client: any, i: number) => (
            <motion.div 
              key={client.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => router.push(`/musteriler/${client.id}`)}
              className="intel-card group cursor-pointer hover:border-indigo-300 transition-all relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-900 border border-slate-100 flex items-center justify-center font-black text-2xl group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                  {client.name[0]}
                </div>
                <div className="p-2 bg-slate-50 text-slate-400 rounded-xl opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  <ArrowUpRight size={18} />
                </div>
              </div>
              
              <h3 className="text-[18px] font-black text-slate-900 mb-1 leading-tight">{client.name}</h3>
              <p className="text-[12px] text-slate-400 font-bold uppercase tracking-widest mb-6">{client.sector || 'Sektör Belirtilmedi'}</p>
              
              <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                <div className="flex -space-x-2">
                   {[Globe, Camera, Zap].map((Icon, idx) => (
                     <div key={idx} className="w-8 h-8 rounded-full bg-white border-2 border-slate-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm">
                        <Icon size={12} />
                     </div>
                   ))}
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-black uppercase">Active</span>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))
        )}
      </div>

      {/* Add Client Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl p-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Building2 size={120} />
              </div>
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-[24px] font-black text-slate-900 tracking-tight">Yeni Müşteri</h3>
                <button onClick={() => setShowAddModal(false)} className="p-2.5 hover:bg-slate-50 rounded-2xl transition-all text-slate-400"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleAddClient} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Marka Adı</label>
                  <input 
                    required
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    placeholder="Örn: Bella Fashion"
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none focus:ring-4 ring-indigo-500/5 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Sektör</label>
                  <input 
                    value={newClient.sector}
                    onChange={(e) => setNewClient({...newClient, sector: e.target.value})}
                    placeholder="Örn: E-ticaret / Moda"
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none focus:ring-4 ring-indigo-500/5 transition-all"
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4 text-[15px] rounded-2xl glow-indigo">Müşteriyi Kaydet</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
