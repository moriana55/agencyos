'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bot, Sparkles, ShieldAlert, Calendar, 
  TrendingUp, Zap, Database, ArrowUpRight, 
  Briefcase, Plus, Camera, MessageCircle, X,
  ShieldCheck, BrainCircuit, MessageSquareText, Send, User, Loader2, Target, MessageSquare
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

  // AI Simulator State
  const [testMessage, setTestMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', content: 'Selam! Bilgi havuzuna eklediğin verilere göre nasıl cevap vereceğimi burada test edebilirsin. Bir soru sor bakalım.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    fetchData();
    fetchKnowledge();
  }, []);

  const fetchKnowledge = async () => {
    try {
      const res = await fetch('/api/knowledge');
      const data = await res.json();
      if (data?.content) setKnowledge(data.content);
    } catch (e) {
      console.error('Bilgi havuzu yüklenemedi');
    }
  };

  const handleSaveKnowledge = async () => {
    setSavingKnowledge(true);
    try {
      await fetch('/api/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: knowledge }),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSavingKnowledge(false);
    }
  };

  const handleTestAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testMessage.trim()) return;

    const userMsg = testMessage;
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setTestMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let response = "Bu konuda bilgi havuzunda bir veri bulamadım. Lütfen 'AI Bilgi Havuzu' sekmesinden ilgili verileri ekle.";
      const k = (knowledge || '').toLowerCase();
      const m = userMsg.toLowerCase();
      if (k.includes('fiyat') && m.includes('fiyat')) {
        response = "Bilgi havuzuna göre fiyat bilgilerini kontrol ettim. Marka kurallarına uygun şekilde iletiyorum.";
      } else if (m.includes('selam') || m.includes('merhaba')) {
        response = "Merhaba! Size nasıl yardımcı olabilirim? Marka tonuna uygun şekilde sohbete hazırım.";
      }
      setChatHistory(prev => [...prev, { role: 'ai', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const fetchData = async () => {
    try {
      const [aptRes, clientRes] = await Promise.all([
        fetch('/api/appointments'),
        fetch('/api/clients')
      ]);
      const aptData = aptRes.ok ? await aptRes.json() : { appointments: [] };
      const clientData = clientRes.ok ? await clientRes.json() : { clients: [] };
      setAppointments(aptData?.appointments || []);
      setClients(clientData?.clients || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 text-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-indigo-600">Social Intelligence Center</p>
          <h1 className="text-[36px] font-black tracking-tighter text-slate-900 leading-none italic">AI Sosyal Komuta</h1>
          <p className="text-[15px] mt-3 text-slate-500 font-medium tracking-tight">Yapay zeka mesajları yanıtlar, satış fırsatlarını yakalar.</p>
        </div>
        <button onClick={() => setShowAddAptModal(true)} className="px-8 py-4 rounded-[20px] bg-indigo-600 text-white font-black text-[14px] uppercase tracking-widest hover:bg-indigo-500 transition-all flex items-center gap-3 shadow-lg active:scale-95 group">
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Yeni Randevu
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-[24px] w-fit border border-slate-100 shadow-sm">
        {[
          { id: 'leads', label: 'Satış Fırsatları', icon: TrendingUp },
          { id: 'appointments', label: 'Randevular', icon: Calendar },
          { id: 'training', label: 'Bilgi Havuzu', icon: Database },
          { id: 'simulator', label: 'AI Simülatör', icon: Sparkles },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-8 py-3.5 rounded-[18px] text-[13px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id ? 'bg-white text-slate-900 shadow-md border border-slate-100' : 'text-slate-400 hover:text-slate-900'
            }`}
          >
            <tab.icon size={16} className={activeTab === tab.id ? 'text-indigo-600' : ''} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8">
          <AnimatePresence mode="wait">
            {activeTab === 'appointments' && (
              <motion.div key="appointments" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden">
                <div className="px-10 py-7 border-b border-slate-50 flex items-center justify-between">
                  <h3 className="text-[14px] font-black text-slate-900 uppercase tracking-widest">Randevular</h3>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black border border-indigo-100">{appointments?.length || 0} ACTIVE</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {!appointments || appointments.length === 0 ? (
                    <div className="p-20 text-center text-slate-300">
                       <Calendar size={60} className="mx-auto mb-6 opacity-20" />
                       <p className="text-[11px] font-black uppercase tracking-[0.2em]">Randevu bulunamadı.</p>
                    </div>
                  ) : (
                    appointments.map((apt: any) => (
                      <div key={apt.id} className="px-10 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <Calendar size={20} />
                          </div>
                          <div>
                            <p className="text-[17px] font-black text-slate-900">{apt.clientName}</p>
                            <p className="text-[12px] text-slate-400 font-bold uppercase">{apt.service}</p>
                          </div>
                        </div>
                        <div className="text-right text-[14px] font-black text-slate-900">
                          {new Date(apt.date).toLocaleString('tr-TR')}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'leads' && (
              <motion.div key="leads" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-100 p-24 rounded-[40px] text-center shadow-sm">
                 <Target size={60} className="mx-auto mb-6 text-slate-100" />
                 <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[11px]">Satış fırsatı bekleniyor.</p>
              </motion.div>
            )}

            {activeTab === 'training' && (
              <motion.div key="training" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-100 p-10 rounded-[40px] shadow-sm space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">
                    <BrainCircuit size={28} />
                  </div>
                  <div>
                    <h3 className="text-[22px] font-black text-slate-900 tracking-tight">AI Bilgi Havuzu</h3>
                    <p className="text-[14px] text-slate-500 font-medium">Yapay zekayı markanızın fiyatları ve kurallarıyla eğitin.</p>
                  </div>
                </div>
                <textarea 
                  value={knowledge}
                  onChange={(e) => setKnowledge(e.target.value)}
                  className="w-full h-80 p-8 bg-slate-50 border border-slate-100 rounded-[32px] text-[15px] font-medium outline-none focus:bg-white focus:border-indigo-200 transition-all"
                  placeholder="Fiyat listeleri, kurallar..."
                />
                <button onClick={handleSaveKnowledge} disabled={savingKnowledge} className="w-full py-5 bg-indigo-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:bg-indigo-500 transition-all">
                  {savingKnowledge ? 'Eğitiliyor...' : 'Yapay Zekayı Eğit'}
                </button>
              </motion.div>
            )}

            {activeTab === 'simulator' && (
              <motion.div key="simulator" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-100 rounded-[40px] flex flex-col h-[600px] shadow-sm overflow-hidden">
                <div className="px-10 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                  <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                    <Sparkles size={16} className="text-indigo-600" /> AI Simülatörü
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[80%] p-4 rounded-[20px] text-[14px] font-medium leading-relaxed ${msg.role === 'ai' ? 'bg-slate-100 text-slate-900' : 'bg-indigo-600 text-white shadow-lg'}`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest animate-pulse">AI Düşünüyor...</div>}
                </div>
                <form onSubmit={handleTestAI} className="p-8 border-t border-slate-50 bg-slate-50/30 flex gap-4">
                  <input value={testMessage} onChange={(e) => setTestMessage(e.target.value)} placeholder="Bir soru sorun..." className="flex-1 p-4 bg-white border border-slate-100 rounded-2xl outline-none focus:border-indigo-200 shadow-sm" />
                  <button type="submit" className="p-4 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-500 transition-all"><Send size={20} /></button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="xl:col-span-4">
           <div className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm">
              <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                 <Bot size={16} className="text-indigo-600" /> Neural Status
              </h3>
              <div className="space-y-4">
                 <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                    <p className="text-[13px] font-bold text-slate-600">Sistem Aktif & İzleniyor</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
