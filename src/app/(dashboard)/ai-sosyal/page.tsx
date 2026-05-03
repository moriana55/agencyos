'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bot, Sparkles, ShieldAlert, Calendar, 
  TrendingUp, Zap, Database, ArrowUpRight, 
  Briefcase, Plus, Camera, MessageCircle, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AISosyalPage() {
  const [activeTab, setActiveTab] = useState('leads');
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [showAddAptModal, setShowAddAptModal] = useState(false);
  const [newApt, setNewApt] = useState({ clientName: '', service: '', date: '', clientId: '' });

  const [knowledge, setKnowledge] = useState('');
  const [savingKnowledge, setSavingKnowledge] = useState(false);

  useEffect(() => {
    fetchData();
    fetchKnowledge();
  }, []);

  const fetchKnowledge = async () => {
    const res = await fetch('/api/knowledge');
    const data = await res.json();
    if (data.content) setKnowledge(data.content);
  };

  const handleSaveKnowledge = async () => {
    setSavingKnowledge(true);
    await fetch('/api/knowledge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: knowledge }),
    });
    setSavingKnowledge(false);
  };

  const fetchData = async () => {
    try {
      const [aptRes, clientRes] = await Promise.all([
        fetch('/api/appointments'),
        fetch('/api/clients')
      ]);
      const aptData = await aptRes.json();
      const clientData = await clientRes.json();
      
      if (aptData.appointments) setAppointments(aptData.appointments);
      if (clientData.clients) setClients(clientData.clients);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddApt = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApt),
      });
      if (res.ok) {
        setShowAddAptModal(false);
        setNewApt({ clientName: '', service: '', date: '', clientId: '' });
        fetchData();
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
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-2 text-slate-400">Aşama 5: Etkileşim & Satış</p>
          <h1 className="text-[28px] font-bold tracking-tight text-slate-900">AI Sosyal Komuta Merkezi</h1>
          <p className="text-[14px] mt-1 text-slate-500">Yapay zeka mesajları yanıtlar, satış fırsatlarını yakalar ve randevuları planlar.</p>
        </div>
        <button onClick={() => setShowAddAptModal(true)} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Yeni Randevu Ekle
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl w-fit">
        {[
          { id: 'leads', label: 'Satış Fırsatları', icon: TrendingUp },
          { id: 'appointments', label: 'Randevular', icon: Calendar },
          { id: 'training', label: 'AI Bilgi Havuzu', icon: Database },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
              activeTab === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-7">
        <div className="xl:col-span-8 space-y-7">
          <AnimatePresence mode="wait">
            {activeTab === 'appointments' && (
              <motion.div key="appointments" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="card p-0 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-[16px] font-bold text-slate-900">Yaklaşan Randevular</h3>
                </div>
                <div className="divide-y divide-slate-50">
                  {appointments.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 italic">Henüz randevu planlanmamış.</div>
                  ) : (
                    appointments.map((apt: any) => (
                      <div key={apt.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <Calendar size={20} />
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-slate-900">{apt.clientName}</p>
                            <p className="text-[12px] text-slate-500">{apt.service}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[13px] font-bold text-slate-900">{new Date(apt.date).toLocaleString('tr-TR')}</p>
                          <span className={`text-[11px] font-bold uppercase ${apt.status === 'confirmed' ? 'text-emerald-500' : 'text-amber-500'}`}>
                            {apt.status === 'confirmed' ? 'Onaylandı' : 'Beklemede'}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
            {activeTab === 'leads' && (
              <motion.div key="leads" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                {[
                  { name: 'Merve Hanım', intent: 'High', product: 'Lazer Epilasyon', status: 'Dönüş Bekliyor' },
                  { name: 'Burak Bey', intent: 'Medium', product: 'Cilt Bakımı Paketleri', status: 'Bilgi Verildi' },
                ].map((lead, i) => (
                  <div key={i} className="card p-6 flex items-center justify-between group hover:border-indigo-100 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                        {lead.name[0]}
                      </div>
                      <div>
                        <h4 className="text-[15px] font-black text-slate-900">{lead.name}</h4>
                        <p className="text-[12px] text-slate-500">{lead.product}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-6">
                      <div>
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          lead.intent === 'High' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'
                        }`}>
                          {lead.intent} Niyet
                        </span>
                      </div>
                      <button className="btn-secondary py-2 px-4 text-[12px]">Detaylar</button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'training' && (
              <motion.div key="training" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="card p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">AI Bilgi Havuzu</h3>
                  <p className="text-[14px] text-slate-500 leading-relaxed">
                    Yapay zekayı ajansınızın çalışma prensipleri, fiyat listeleri ve özel kuralları hakkında eğitin. Bu bilgiler tüm otomatik yanıtlarda temel alınacaktır.
                  </p>
                </div>
                <div className="space-y-4">
                  <textarea 
                    value={knowledge}
                    onChange={(e) => setKnowledge(e.target.value)}
                    className="w-full h-64 p-6 bg-slate-50 border border-slate-200 rounded-3xl text-[14px] outline-none focus:ring-2 ring-indigo-500/10 transition-all font-mono"
                    placeholder="Örn: 2024 Fiyat Listemiz: Logo Tasarım 5000TL, Sosyal Medya Yönetimi 10000TL/Ay..."
                  />
                  <button 
                    onClick={handleSaveKnowledge}
                    disabled={savingKnowledge}
                    className="btn-primary w-full py-4 text-[15px] flex items-center justify-center gap-3"
                  >
                    <Sparkles size={20} /> {savingKnowledge ? 'Kaydediliyor...' : 'Yapay Zekayı Eğit'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="xl:col-span-4 space-y-7">
          <div className="card p-6">
            <h3 className="text-[15px] font-bold text-slate-900 mb-6">Sistem Analizi</h3>
            <div className="space-y-4">
               <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <p className="text-[12px] text-emerald-700 leading-relaxed font-medium">
                    Sistem şu an tüm kanalları tarıyor. Bekleyen {appointments.length} randevu planı mevcut.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Appointment Modal */}
      <AnimatePresence>
        {showAddAptModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowAddAptModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8" >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-900">Yeni Randevu</h3>
                <button onClick={() => setShowAddAptModal(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-all"><X size={20} /></button>
              </div>
              <form onSubmit={handleAddApt} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Müşteri Seçin (Opsiyonel)</label>
                  <select value={newApt.clientId} onChange={(e) => setNewApt({...newApt, clientId: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none">
                    <option value="">Marka Seçin...</option>
                    {clients.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Kişi Adı</label>
                  <input required value={newApt.clientName} onChange={(e) => setNewApt({...newApt, clientName: e.target.value})} placeholder="Örn: Caner Bey" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Hizmet</label>
                  <input required value={newApt.service} onChange={(e) => setNewApt({...newApt, service: e.target.value})} placeholder="Örn: Lazer Epilasyon" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tarih & Saat</label>
                  <input required type="datetime-local" value={newApt.date} onChange={(e) => setNewApt({...newApt, date: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none" />
                </div>
                <button type="submit" className="btn-primary w-full py-4 text-[15px] mt-4">Randevuyu Kaydet</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
