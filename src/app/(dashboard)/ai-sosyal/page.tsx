'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bot, Sparkles, ShieldAlert, Calendar, 
  TrendingUp, Zap, Database, ArrowUpRight, 
  Briefcase, Plus, Camera, MessageCircle, X,
  ShieldCheck, BrainCircuit, MessageSquareText
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
    alert('AI Bilgi Havuzu Güncellendi! 🧠✨');
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
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-indigo-500/80">Social Command Center</p>
          <h1 className="text-[32px] font-black tracking-tight text-slate-900 leading-none">AI Sosyal Komuta</h1>
          <p className="text-[14px] mt-2 text-slate-500 font-medium">Yapay zeka mesajları yanıtlar, satış fırsatlarını yakalar ve randevuları planlar.</p>
        </div>
        <button 
          onClick={() => setShowAddAptModal(true)} 
          className="btn-primary glow-indigo px-6 py-3 rounded-2xl flex items-center gap-2 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> 
          <span className="text-[14px] font-bold">Yeni Randevu Ekle</span>
        </button>
      </div>

      {/* Tabs / Platform Switcher Style */}
      <div className="flex items-center gap-1.5 bg-slate-100/50 p-1.5 rounded-2xl w-fit border border-slate-200/50">
        {[
          { id: 'leads', label: 'Satış Fırsatları', icon: TrendingUp },
          { id: 'appointments', label: 'Randevular', icon: Calendar },
          { id: 'training', label: 'AI Bilgi Havuzu', icon: Database },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-[13px] font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-slate-900 shadow-xl shadow-slate-200/50 border border-slate-200' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <tab.icon size={16} className={activeTab === tab.id ? 'text-indigo-600' : ''} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-8">
          <AnimatePresence mode="wait">
            {activeTab === 'appointments' && (
              <motion.div key="appointments" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="intel-card p-0 overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                  <h3 className="text-[16px] font-black text-slate-900 uppercase tracking-tight">Yaklaşan Randevular</h3>
                  <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-[10px] font-black">{appointments.length} ACTIVE</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {appointments.length === 0 ? (
                    <div className="p-16 text-center">
                       <Calendar size={48} className="text-slate-100 mx-auto mb-4" />
                       <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Henüz randevu planlanmamış.</p>
                    </div>
                  ) : (
                    appointments.map((apt: any) => (
                      <div key={apt.id} className="px-8 py-5 flex items-center justify-between hover:bg-indigo-50/20 transition-all group">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-indigo-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <Calendar size={22} />
                          </div>
                          <div>
                            <p className="text-[15px] font-black text-slate-900 leading-tight">{apt.clientName}</p>
                            <p className="text-[12px] text-slate-500 font-medium mt-0.5">{apt.service}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[14px] font-black text-slate-900">{new Date(apt.date).toLocaleString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</p>
                          <span className={`inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${apt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${apt.status === 'confirmed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
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
                  { name: 'Merve Hanım', intent: 'High', product: 'Lazer Epilasyon', status: 'Dönüş Bekliyor', source: 'Instagram DM' },
                  { name: 'Burak Bey', intent: 'Medium', product: 'Cilt Bakımı Paketleri', status: 'Bilgi Verildi', source: 'WhatsApp' },
                ].map((lead, i) => (
                  <div key={i} className="intel-card group hover:border-indigo-300 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 border border-slate-100 flex items-center justify-center font-black text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                        {lead.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <h4 className="text-[17px] font-black text-slate-900">{lead.name}</h4>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-slate-50 rounded-md border border-slate-100">{lead.source}</span>
                        </div>
                        <p className="text-[13px] text-slate-500 font-medium mt-0.5">{lead.product}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="hidden md:block text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">AI INTENT SCORE</p>
                        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider ${
                          lead.intent === 'High' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-slate-50 text-slate-500'
                        }`}>
                          {lead.intent === 'High' ? '🔥 High Priority' : '⚖️ Medium'}
                        </span>
                      </div>
                      <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                        <ArrowUpRight size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'training' && (
              <motion.div key="training" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="intel-card p-8 space-y-8">
                <div className="flex items-start gap-6">
                   <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xl shadow-indigo-100">
                      <BrainCircuit size={28} />
                   </div>
                   <div>
                      <h3 className="text-[20px] font-black text-slate-900 tracking-tight">AI Bilgi Havuzu</h3>
                      <p className="text-[14px] text-slate-500 mt-1 leading-relaxed max-w-2xl">
                        Yapay zekayı AgencyOS standartlarına göre eğitin. Fiyat listeleri, kampanya detayları ve müşteri yanıt kuralları tüm otomatik iletişimde bu temel üzerine inşa edilir.
                      </p>
                   </div>
                </div>
                
                <div className="space-y-5">
                  <div className="relative">
                    <textarea 
                      value={knowledge}
                      onChange={(e) => setKnowledge(e.target.value)}
                      className="w-full h-72 p-8 bg-slate-50/50 border border-slate-200 rounded-[32px] text-[14px] font-medium leading-relaxed outline-none focus:ring-4 ring-indigo-500/5 transition-all scrollbar-hide"
                      placeholder="Örn: Hirdavat Pro 2024 Fiyat Listesi: Matkap Seti 2500TL, Kaynak Makinesi 5000TL..."
                    />
                    <div className="absolute bottom-6 right-8 flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-xl text-[10px] font-bold text-slate-400 shadow-sm">
                       <Zap size={12} className="text-amber-500" /> AI AUTO-SAVING ACTIVE
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleSaveKnowledge}
                    disabled={savingKnowledge}
                    className="btn-primary w-full py-5 text-[15px] rounded-2xl flex items-center justify-center gap-3 glow-indigo"
                  >
                    <Sparkles size={22} className={savingKnowledge ? 'animate-spin' : ''} /> 
                    <span className="font-black uppercase tracking-wider">{savingKnowledge ? 'Veriler İşleniyor...' : 'Yapay Zekayı Eğit'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="xl:col-span-4 space-y-8">
          <div className="intel-card bg-slate-900 text-white border-none overflow-hidden group">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Bot size={22} />
               </div>
               <h3 className="text-[15px] font-black uppercase tracking-widest">System Engine</h3>
            </div>
            <div className="space-y-6">
               <div className="p-5 rounded-2xl bg-white/5 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <p className="text-[12px] font-black text-slate-400 uppercase tracking-wider">AI Lead Scanning</p>
                  </div>
                  <p className="text-[13px] text-slate-300 font-medium leading-relaxed">
                    Tüm sosyal kanallar taranıyor. Bekleyen {appointments.length} randevu planı AI tarafından doğrulandı.
                  </p>
               </div>
               
               <div className="p-5 rounded-2xl bg-white/5 border border-white/10 group-hover:border-purple-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                     <span className="w-2 h-2 rounded-full bg-indigo-500" />
                     <p className="text-[12px] font-black text-slate-400 uppercase tracking-wider">Response Accuracy</p>
                  </div>
                  <div className="flex items-end justify-between">
                     <p className="text-3xl font-black">98.4%</p>
                     <p className="text-[11px] font-bold text-emerald-400 pb-1">+1.2% this week</p>
                  </div>
               </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between opacity-50">
               <ShieldCheck size={20} />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure AI Protocol</span>
            </div>
          </div>
          
          <div className="intel-card border-dashed bg-slate-50/50 flex flex-col items-center justify-center p-12 text-center">
             <div className="w-16 h-16 rounded-3xl bg-white border border-slate-100 flex items-center justify-center mb-4 shadow-sm">
                <MessageSquareText className="text-slate-200" size={32} />
             </div>
             <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                Social API is on standby. Connect more platforms in Integrations.
             </p>
          </div>
        </div>
      </div>

      {/* Add Appointment Modal */}
      <AnimatePresence>
        {showAddAptModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowAddAptModal(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl p-10 overflow-hidden" 
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[22px] font-black text-slate-900 tracking-tight">Yeni Randevu</h3>
                <button onClick={() => setShowAddAptModal(false)} className="p-2.5 hover:bg-slate-50 rounded-2xl transition-all text-slate-400"><X size={20} /></button>
              </div>
              <form onSubmit={handleAddApt} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Müşteri Seçin (Opsiyonel)</label>
                  <select value={newApt.clientId} onChange={(e) => setNewApt({...newApt, clientId: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none appearance-none">
                    <option value="">Marka Seçin...</option>
                    {clients.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Kişi Adı</label>
                  <input required value={newApt.clientName} onChange={(e) => setNewApt({...newApt, clientName: e.target.value})} placeholder="Örn: Caner Bey" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Hizmet</label>
                  <input required value={newApt.service} onChange={(e) => setNewApt({...newApt, service: e.target.value})} placeholder="Örn: Lazer Epilasyon" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Tarih & Saat</label>
                  <input required type="datetime-local" value={newApt.date} onChange={(e) => setNewApt({...newApt, date: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none" />
                </div>
                <button type="submit" className="btn-primary w-full py-5 text-[15px] font-black uppercase tracking-widest mt-4 rounded-2xl glow-indigo">Randevuyu Kaydet</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
