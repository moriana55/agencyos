'use client';

import React, { useState, useEffect } from 'react';
import { 
  Target, Zap, TrendingUp, BarChart3, 
  Plus, Search, Filter, ArrowUpRight, 
  Camera, Globe, MousePointer2, 
  Briefcase, ShieldCheck, SearchCode, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReklamPage() {
  const [activePlatform, setActivePlatform] = useState<'meta' | 'google' | 'seo'>('meta');
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [clients, setClients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: '', platform: 'Meta', budget: '', clientId: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [campRes, clientRes] = await Promise.all([
        fetch('/api/campaigns'),
        fetch('/api/clients')
      ]);
      
      if (!campRes.ok || !clientRes.ok) throw new Error('Yükleme hatası');

      const campData = await campRes.json();
      const clientData = await clientRes.json();
      
      if (campData.campaigns) setCampaigns(campData.campaigns);
      if (clientData.clients) setClients(clientData.clients);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newCampaign,
          status: 'active'
        }),
      });
      if (res.ok) {
        setShowAddModal(false);
        setNewCampaign({ name: '', platform: 'Meta', budget: '', clientId: '' });
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const metaCampaigns = campaigns.filter((c: any) => c.platform === 'Meta');
  const googleCampaigns = campaigns.filter((c: any) => c.platform === 'Google');

  const totalSpend = campaigns.reduce((acc, c: any) => acc + c.spend, 0);
  const avgRoas = campaigns.length > 0 ? (campaigns.reduce((acc, c: any) => acc + c.roas, 0) / campaigns.length).toFixed(1) : '0';

  return (
    <div className="space-y-7 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-indigo-500/80">Decision Intelligence</p>
          <h1 className="text-[32px] font-black tracking-tight text-slate-900 leading-none">Reklam & Görünürlük</h1>
          <p className="text-[14px] mt-2 text-slate-500 font-medium">Müşteri kampanyalarınızı yapay zeka desteğiyle optimize edin.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[12px] font-bold text-emerald-700">AI OPTIMIZER ACTIVE</span>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary glow-indigo px-6 py-3 rounded-2xl flex items-center gap-2 group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" /> 
            <span className="text-[14px] font-bold">Yeni Kampanya</span>
          </button>
        </div>
      </div>

      {/* AI Intelligence Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="intel-card border-indigo-100 bg-indigo-50/30 overflow-hidden"
      >
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-200">
            <Zap size={24} />
          </div>
          <div className="flex-1">
            <h4 className="text-[15px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
              AI Optimization Insights
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md text-[10px] font-black">2 NEW SIGNALS</span>
            </h4>
            <p className="text-[14px] text-slate-600 mt-1 leading-relaxed">
              Mevcut Meta kampanyalarında <span className="font-bold text-indigo-600">%12.4</span> bütçe verimliliği saptandı. 
              <span className="hidden md:inline"> Google Ads tarafında anahtar kelime rekabeti düşük 3 yeni fırsat alanı mevcut.</span>
            </p>
          </div>
          <button className="px-4 py-2 bg-white border border-indigo-100 rounded-xl text-[12px] font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
            Tümünü Uygula
          </button>
        </div>
      </motion.div>

      {/* Platform Switcher */}
      <div className="flex items-center gap-1.5 bg-slate-100/50 p-1.5 rounded-2xl w-fit border border-slate-200/50">
        {[
          { id: 'meta', label: 'Meta Ads', icon: Camera, color: 'indigo' },
          { id: 'google', label: 'Google Ads', icon: Globe, color: 'blue' },
          { id: 'seo', label: 'SEO Merkezi', icon: SearchCode, color: 'purple' },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePlatform(p.id as any)}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-[13px] font-bold transition-all ${
              activePlatform === p.id 
                ? 'bg-white text-slate-900 shadow-xl shadow-slate-200/50 border border-slate-200' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <p.icon size={16} className={activePlatform === p.id ? `text-${p.color}-600` : ''} />
            {p.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activePlatform === 'meta' && (
          <motion.div key="meta" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Meta Spend', value: `₺${totalSpend.toLocaleString()}`, icon: MousePointer2, color: 'text-indigo-600', bg: 'bg-indigo-50', unit: 'Total' },
                { label: 'Intelligence ROAS', value: `${avgRoas}x`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', unit: 'Weighted Avg' },
                { label: 'Live Campaigns', value: metaCampaigns.length, icon: Target, color: 'text-purple-600', bg: 'bg-purple-50', unit: 'Operational' },
              ].map((s, i) => (
                <div key={i} className="intel-card group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${s.bg} ${s.color}`}>
                    <s.icon size={22} />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                      <p className="text-[28px] font-black text-slate-900 mt-1">{s.value}</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 pb-1">{s.unit}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
            
            <div className="card border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
              {metaCampaigns.length === 0 ? (
                <div className="p-16 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Target size={24} className="text-slate-300" />
                  </div>
                  <p className="text-slate-400 font-medium italic">Henüz Meta kampanyası eklenmemiş.</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-100">
                      <th className="px-8 py-5">Campaign / ID</th>
                      <th className="px-8 py-5">Performance Tier</th>
                      <th className="px-8 py-5">Spend</th>
                      <th className="px-8 py-5">ROAS</th>
                      <th className="px-8 py-5 text-right">Intel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-[14px]">
                    {metaCampaigns.map((c: any) => (
                      <tr key={c.id} className="hover:bg-indigo-50/30 transition-colors group">
                        <td className="px-8 py-5">
                          <p className="font-bold text-slate-900">{c.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">{c.client?.name}</p>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`badge ${c.roas > 4 ? 'badge-green' : 'badge-gray'} uppercase tracking-wider`}>
                            {c.roas > 4 ? 'High Performance' : 'Stable Flow'}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-slate-600 font-bold">₺{c.spend.toLocaleString()}</td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-900 font-black">{c.roas}x</span>
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(c.roas * 15, 100)}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                            <ArrowUpRight size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        )}

        {activePlatform === 'google' && (
          <motion.div key="google" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Google Search Spend', value: `₺${(totalSpend * 0.4).toLocaleString()}`, icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50', unit: 'Estimated' },
                { label: 'Avg. Decision CPC', value: '₺1.42', icon: MousePointer2, color: 'text-amber-600', bg: 'bg-amber-50', unit: 'Network Avg' },
                { label: 'Conversion Intel', value: '1,242', icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-50', unit: 'verified' },
              ].map((s, i) => (
                <div key={i} className="intel-card group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${s.bg} ${s.color}`}>
                    <s.icon size={22} />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                      <p className="text-[28px] font-black text-slate-900 mt-1">{s.value}</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 pb-1">{s.unit}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="card border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
              {googleCampaigns.length === 0 ? (
                <div className="p-16 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Globe size={24} className="text-slate-300" />
                  </div>
                  <p className="text-slate-400 font-medium italic">Henüz Google Ads kampanyası eklenmemiş.</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-100">
                      <th className="px-8 py-5">Campaign / Search Term</th>
                      <th className="px-8 py-5">Network Status</th>
                      <th className="px-8 py-5">Spend</th>
                      <th className="px-8 py-5">Clicks</th>
                      <th className="px-8 py-5 text-right">Intel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-[14px]">
                    {googleCampaigns.map((c: any) => (
                      <tr key={c.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-8 py-5">
                          <p className="font-bold text-slate-900">{c.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">{c.client?.name} Search Network</p>
                        </td>
                        <td className="px-8 py-5">
                          <span className="badge badge-gray uppercase tracking-wider">Active Stream</span>
                        </td>
                        <td className="px-8 py-5 text-slate-600 font-bold">₺{c.spend.toLocaleString()}</td>
                        <td className="px-8 py-5">
                           <span className="text-blue-600 font-black">{c.clicks.toLocaleString()}</span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                            <ArrowUpRight size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        )}

        {activePlatform === 'seo' && (
          <motion.div key="seo" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="intel-card bg-slate-900 text-white border-none overflow-hidden relative group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <SearchCode size={120} />
                 </div>
                 <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-3">SEO Intelligence Score</h4>
                 <div className="text-6xl font-black mb-4 flex items-baseline">84<span className="text-xl text-slate-500 ml-1">/100</span></div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-[11px] font-bold">
                   <TrendingUp size={12} /> +4.2% Growth
                 </div>
                 <p className="text-[13px] text-slate-400 leading-relaxed mt-6">Sistem önerileriyle site hızı ve meta etiketleri %100 optimize edildi.</p>
              </div>

              <div className="intel-card">
                <h4 className="text-[13px] font-black text-indigo-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                   Backlink Intel
                </h4>
                <div className="space-y-5">
                  {[
                    { label: 'Total Backlinks', value: '1,242', change: '+12' },
                    { label: 'Referring Domains', value: '420', change: '+5' },
                    { label: 'Domain Authority', value: '32', change: '+2' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-3">
                      <span className="text-[13px] font-medium text-slate-500">{item.label}</span>
                      <div className="text-right">
                        <p className="text-[15px] font-black text-slate-900">{item.value}</p>
                        <span className="text-[10px] text-emerald-500 font-bold">{item.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="intel-card">
                <h4 className="text-[13px] font-black text-emerald-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                   Keyword Hierarchy
                </h4>
                <div className="space-y-3">
                  {[
                    { kw: 'sosyal medya yönetimi', pos: '3.', ch: '↑1' },
                    { kw: 'dijital pazarlama ajansı', pos: '5.', ch: '→' },
                    { kw: 'reklam optimizasyonu', pos: '12.', ch: '↑4' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                      <span className="text-[12px] font-black text-slate-700">{item.kw}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[14px] font-black text-slate-900">{item.pos}</span>
                        <span className={`text-[11px] font-bold ${item.ch.includes('↑') ? 'text-emerald-500' : 'text-slate-400'}`}>{item.ch}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Campaign Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8" >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-900">Yeni Kampanya</h3>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-all"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleAddCampaign} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Müşteri Seçin</label>
                  <select 
                    required
                    value={newCampaign.clientId}
                    onChange={(e) => setNewCampaign({...newCampaign, clientId: e.target.value})}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none focus:ring-2 ring-indigo-500/10 transition-all appearance-none"
                  >
                    <option value="">Müşteri Seçin...</option>
                    {clients.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Kampanya Adı</label>
                  <input required value={newCampaign.name} onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})} placeholder="Örn: Yaz İndirimi 2024" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none" />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Harcama Bütçesi (₺)</label>
                    <input required type="number" value={newCampaign.budget} onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})} placeholder="Örn: 5000" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Platform</label>
                  <div className="flex gap-2">
                    {['Meta', 'Google'].map(p => (
                      <button 
                        key={p} type="button" 
                        onClick={() => setNewCampaign({...newCampaign, platform: p as any})}
                        className={`flex-1 py-3 rounded-xl text-[13px] font-bold transition-all ${newCampaign.platform === p ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-500'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full py-4 text-[15px] mt-4">Kampanyayı Kaydet</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
