'use client';

import React, { useState, useEffect } from 'react';
import { 
  Target, Zap, TrendingUp, BarChart3, 
  Plus, Search, Filter, ArrowUpRight, 
  Camera, Globe, MousePointer2, 
  Briefcase, ShieldCheck, SearchCode, X, Loader2, ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReklamPage() {
  const [activePlatform, setActivePlatform] = useState<'meta' | 'google' | 'seo'>('meta');
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [clients, setClients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: '', platform: 'Meta', budget: '', clientId: '', spend: '', roas: '' });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [campRes, clientRes] = await Promise.all([
        fetch('/api/campaigns'),
        fetch('/api/clients')
      ]);
      
      const campData = campRes.ok ? await campRes.json() : { campaigns: [] };
      const clientData = clientRes.ok ? await clientRes.json() : { clients: [] };
      
      setCampaigns(campData?.campaigns || []);
      setClients(clientData?.clients || []);
    } catch (e) {
      console.error('Veri yükleme hatası:', e);
      setError('Veriler yüklenirken bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const metaCampaigns = (campaigns || []).filter((c: any) => c.platform === 'Meta');
  const totalSpend = (campaigns || []).reduce((acc, c: any) => acc + (c.spend || 0), 0);
  const avgRoas = (campaigns || []).length > 0 ? ((campaigns || []).reduce((acc, c: any) => acc + (c.roas || 0), 0) / (campaigns || []).length).toFixed(1) : '0';

  const [optimizing, setOptimizing] = useState(false);

  const handleSubmitCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const method = editingId ? 'PATCH' : 'POST';
      const res = await fetch('/api/campaigns', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingId,
          name: newCampaign.name,
          platform: newCampaign.platform,
          budget: newCampaign.budget,
          spend: newCampaign.spend || '0',
          roas: newCampaign.roas || '0',
          clientId: newCampaign.clientId,
        }),
      });
      if (res.ok) {
        setShowAddModal(false);
        setEditingId(null);
        setNewCampaign({ name: '', platform: 'Meta', budget: '', clientId: '', spend: '', roas: '' });
        fetchData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditCampaign = (c: any) => {
    setNewCampaign({ name: c.name, platform: c.platform, budget: String(c.budget || ''), clientId: c.clientId, spend: String(c.spend || ''), roas: String(c.roas || '') });
    setEditingId(c.id);
    setShowAddModal(true);
  };

  const handleDeleteCampaign = async (id: string) => {
    if (!confirm('Bu kampanyayı silmek istediğinize emin misiniz?')) return;
    try {
      await fetch('/api/campaigns', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      fetchData();
    } catch (e) {
      console.error(e);
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
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-indigo-600 italic">Decision Intelligence</p>
          <h1 className="text-[36px] font-black tracking-tighter text-slate-900 leading-none italic">Reklam Karargahı</h1>
          <p className="text-[15px] mt-3 text-slate-500 font-medium tracking-tight">AI desteğiyle müşteri kampanyalarınızı siber seviyeye taşıyın.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="px-8 py-4 rounded-[20px] bg-indigo-600 text-white font-black text-[14px] uppercase tracking-widest hover:bg-indigo-500 shadow-lg active:scale-95 flex items-center gap-3 group">
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Yeni Kampanya
        </button>
      </div>

      {/* AI Intelligence Panel - THE PRIDE OF AGENCY OS */}
      <div className="relative overflow-hidden rounded-[40px] p-10 bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20 group">
        <div className="absolute top-0 right-0 p-10 opacity-10 -rotate-12 translate-x-4 group-hover:scale-110 transition-transform duration-700">
           <Zap size={200} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-20 h-20 rounded-[30px] bg-white text-indigo-600 flex items-center justify-center shadow-2xl">
            <Zap size={40} />
          </div>
          <div className="flex-1">
            <h4 className="text-[18px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
              Neural Optimization Insights
              <span className="px-3 py-1 bg-white/20 rounded-lg text-[10px] font-black border border-white/20">LIVE SCANNER</span>
            </h4>
            <p className="text-[16px] text-indigo-50 mt-2 leading-relaxed font-medium">
              Müşterilerinizin reklam bütçeleri şu an <span className="text-white font-black">AI Optimizer</span> tarafından taranıyor. Potansiyel ROAS artışı: <span className="text-emerald-300 font-black">+%18.4</span>.
            </p>
          </div>
          <button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl text-[14px] font-black uppercase tracking-widest shadow-xl hover:bg-indigo-50 transition-all active:scale-95">Optimizasyonu Başlat</button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Toplam Harcama', value: `₺${totalSpend.toLocaleString()}`, icon: MousePointer2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Ortalama ROAS', value: `${avgRoas}x`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Aktif Kampanyalar', value: metaCampaigns.length, icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm hover:shadow-md transition-all">
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${s.bg} ${s.color}`}>
                <s.icon size={24} />
             </div>
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
             <p className="text-[32px] font-black text-slate-900 mt-1 tracking-tighter">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Platform Switcher */}
      <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-[24px] w-fit border border-slate-100 shadow-sm">
        {['meta', 'google', 'seo'].map((p) => (
          <button
            key={p} onClick={() => setActivePlatform(p as any)}
            className={`px-8 py-3.5 rounded-[18px] text-[13px] font-black uppercase tracking-widest transition-all ${activePlatform === p ? 'bg-white text-slate-900 shadow-md border border-slate-100' : 'text-slate-400 hover:text-slate-900'}`}
          >
            {p.toUpperCase()} Ads
          </button>
        ))}
      </div>

      {/* Main Table Area */}
      <div className="bg-white border border-slate-100 rounded-[48px] overflow-hidden shadow-sm">
         {metaCampaigns.length === 0 ? (
           <div className="p-32 text-center">
              <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-sm">
                 <Target size={40} className="text-slate-200" />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[11px]">Henüz kampanya verisi girilmemiş.</p>
           </div>
         ) : (
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-slate-50/50 text-[11px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                    <th className="px-10 py-6">Kampanya / Marka</th>
                    <th className="px-10 py-6">Performans Skoru</th>
                    <th className="px-10 py-6">Harcama</th>
                    <th className="px-10 py-6">ROAS</th>
                    <th className="px-10 py-6 text-right">Detay</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {metaCampaigns.map((c: any) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors group">
                       <td className="px-10 py-8">
                          <p className="font-black text-[17px] text-slate-900 group-hover:text-indigo-600 transition-colors">{c.name}</p>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">{c.client?.name}</p>
                       </td>
                       <td className="px-10 py-8">
                          <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${c.roas > 4 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                             {c.roas > 4 ? 'Elite Performance' : 'Stable'}
                          </span>
                       </td>
                       <td className="px-10 py-8 text-[15px] font-black">₺{(c.spend || 0).toLocaleString()}</td>
                       <td className="px-10 py-8 font-black text-indigo-600">{c.roas || 0}x</td>
                       <td className="px-10 py-8 text-right flex items-center justify-end gap-2">
                          <button onClick={() => handleEditCampaign(c)} className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all" title="Düzenle"><ArrowUpRight size={18} /></button>
                          <button onClick={() => handleDeleteCampaign(c.id)} className="p-3 rounded-2xl bg-slate-50 text-slate-300 hover:bg-rose-500 hover:text-white transition-all" title="Sil"><X size={18} /></button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
         )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-white/80 backdrop-blur-md" onClick={() => setShowAddModal(false)} />
             <div className="relative bg-white p-12 rounded-[48px] border border-slate-100 w-full max-w-lg shadow-2xl">
                <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase italic">
                  {editingId ? 'Kampanya Düzenle' : 'Yeni Kampanya Ekle'}
                </h3>
                <button onClick={() => { setShowAddModal(false); setEditingId(null); }} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900"><X size={24} /></button>
                <form onSubmit={handleSubmitCampaign} className="space-y-6">
                   <div>
                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">Kampanya Adı</label>
                     <input required value={newCampaign.name} onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})} placeholder="Kampanya adı..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none focus:border-indigo-200" />
                   </div>
                   <div>
                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">Müşteri</label>
                     <select required value={newCampaign.clientId} onChange={(e) => setNewCampaign({...newCampaign, clientId: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none focus:border-indigo-200">
                       <option value="">Müşteri seç...</option>
                       {clients.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                     </select>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">Platform</label>
                       <select value={newCampaign.platform} onChange={(e) => setNewCampaign({...newCampaign, platform: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none focus:border-indigo-200">
                         <option value="Meta">Meta Ads</option>
                         <option value="Google">Google Ads</option>
                         <option value="TikTok">TikTok Ads</option>
                       </select>
                     </div>
                     <div>
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">Bütçe (₺)</label>
                       <input type="number" required value={newCampaign.budget} onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})} placeholder="0" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none focus:border-indigo-200" />
                     </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">Harcama (₺)</label>
                       <input type="number" value={newCampaign.spend} onChange={(e) => setNewCampaign({...newCampaign, spend: e.target.value})} placeholder="0" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none focus:border-indigo-200" />
                     </div>
                     <div>
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">ROAS</label>
                       <input type="number" step="0.1" value={newCampaign.roas} onChange={(e) => setNewCampaign({...newCampaign, roas: e.target.value})} placeholder="0" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none focus:border-indigo-200" />
                     </div>
                   </div>
                   <button type="submit" disabled={submitting} className="w-full py-5 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                     {submitting ? <Loader2 size={18} className="animate-spin" /> : null}
                     {editingId ? 'Güncelle' : 'Kampanya Oluştur'}
                   </button>
                </form>
             </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
