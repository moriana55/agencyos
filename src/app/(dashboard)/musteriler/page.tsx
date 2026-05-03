'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, Search, Filter, 
  Globe, Camera, MessageCircle, 
  ArrowUpRight, Building2, Trash2, X
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
    <div className="space-y-7 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-2 text-slate-400">Yönetim</p>
          <h1 className="text-[28px] font-bold tracking-tight text-slate-900">Müşteri Portföyü</h1>
          <p className="text-[14px] mt-1 text-slate-500">Tüm markalarınızı ve bağlantı durumlarını buradan yönetin.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Yeni Müşteri Ekle
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Müşteri ara..." 
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] outline-none focus:ring-2 ring-indigo-500/10 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[13px] font-bold text-slate-600 flex items-center gap-2">
            <Filter size={16} /> Filtrele
          </button>
        </div>
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
           <div className="col-span-full py-20 text-center text-slate-400 font-bold">Müşteriler Yükleniyor...</div>
        ) : clients.length === 0 ? (
           <div className="col-span-full py-20 card border-dashed flex flex-col items-center justify-center text-slate-400">
              <Building2 size={48} className="mb-4 opacity-20" />
              <p className="font-bold">Henüz müşteri eklenmemiş.</p>
              <button onClick={() => setShowAddModal(true)} className="text-indigo-600 hover:underline mt-2">İlk müşterinizi ekleyin</button>
           </div>
        ) : (
          clients.map((client: any) => (
            <motion.div 
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => router.push(`/musteriler/${client.id}`)}
              className="card p-5 group hover:border-indigo-200 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
                  {client.name[0]}
                </div>
                <div className="flex gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-slate-400 hover:text-indigo-600"><ArrowUpRight size={18} /></button>
                </div>
              </div>
              
              <h3 className="text-[16px] font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{client.name}</h3>
              <p className="text-[13px] text-slate-400 font-medium mb-4">{client.sector || 'Sektör Belirtilmedi'}</p>
              
              <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-rose-500"><Camera size={12} /></div>
                  <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-emerald-500"><MessageCircle size={12} /></div>
                </div>
                <span className="text-[11px] font-bold text-slate-400 ml-auto uppercase tracking-wider">Aktif Dosya</span>
              </div>
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
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-900">Yeni Müşteri</h3>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-all"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleAddClient} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Marka Adı</label>
                  <input 
                    required
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    placeholder="Örn: Bella Fashion"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none focus:ring-2 ring-indigo-500/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Sektör</label>
                  <input 
                    value={newClient.sector}
                    onChange={(e) => setNewClient({...newClient, sector: e.target.value})}
                    placeholder="Örn: E-ticaret / Moda"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none focus:ring-2 ring-indigo-500/10 transition-all"
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4 text-[15px]">Müşteriyi Kaydet</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
