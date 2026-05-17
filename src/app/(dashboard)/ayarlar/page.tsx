'use client';

import React, { useState, useEffect } from 'react';
import {
  User, Building2, Bell, Shield,
  Palette, Globe, Mail, Lock,
  Camera, CheckCircle2, Save, Trash2, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsData {
  fullName?: string;
  agencyName?: string;
  website?: string;
  agencyDesc?: string;
  notifications?: Record<string, boolean>;
  brandColor?: string;
}

export default function AyarlarPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({
    fullName: '',
    agencyName: '',
    website: '',
    agencyDesc: '',
    notifications: { n1: true, n2: true, n3: false, n4: true },
    brandColor: '#6366f1',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.settings && Object.keys(data.settings).length > 0) {
        setSettings(prev => ({ ...prev, ...data.settings }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key: keyof SettingsData, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleNotification = (id: string) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [id]: !prev.notifications?.[id] }
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'agency', label: 'Ajans Bilgileri', icon: Building2 },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'branding', label: 'Marka & Görünüm', icon: Palette },
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-7 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-2 text-slate-400">Sistem Yapılandırması</p>
          <h1 className="text-[28px] font-bold tracking-tight text-slate-900">Ayarlar</h1>
          <p className="text-[14px] mt-1 text-slate-500">Hesabınızı, ajans kimliğinizi ve sistem tercihlerini buradan yönetin.</p>
        </div>
        <div className="flex items-center gap-3">
           <AnimatePresence>
             {showSuccess && (
               <motion.div
                 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                 className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-[13px] font-bold border border-emerald-100"
               >
                 <CheckCircle2 size={16} /> Kaydedildi!
               </motion.div>
             )}
           </AnimatePresence>
           <button
             onClick={handleSave}
             disabled={saving}
             className="px-8 py-3 rounded-2xl bg-indigo-600 text-white font-black text-[13px] uppercase tracking-widest hover:bg-indigo-500 transition-all disabled:opacity-50 flex items-center gap-2"
           >
             {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
             {saving ? 'Kaydediliyor...' : 'Kaydet'}
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-3xl border border-slate-200 p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-6">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center text-3xl font-black text-slate-400 border-4 border-white shadow-xl">
                      {(settings.fullName || 'YE').split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Profil</h3>
                    <p className="text-[13px] text-slate-500 mt-1">Kişisel bilgilerinizi düzenleyin.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Tam Adınız</label>
                    <input
                      type="text"
                      value={settings.fullName || ''}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="Adınız Soyadınız"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none focus:bg-white focus:ring-2 ring-indigo-500/10 transition-all"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'agency' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Ajans Adı</label>
                  <input
                    type="text"
                    value={settings.agencyName || ''}
                    onChange={(e) => updateField('agencyName', e.target.value)}
                    placeholder="Ajans adınız"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] font-bold outline-none focus:bg-white focus:ring-2 ring-indigo-500/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Web Sitesi</label>
                  <div className="relative">
                    <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={settings.website || ''}
                      onChange={(e) => updateField('website', e.target.value)}
                      placeholder="https://..."
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none focus:bg-white focus:ring-2 ring-indigo-500/10 transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Ajans Tanımı</label>
                <textarea
                  rows={4}
                  value={settings.agencyDesc || ''}
                  onChange={(e) => updateField('agencyDesc', e.target.value)}
                  placeholder="Ajansınızı kısaca tanımlayın..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none focus:bg-white focus:ring-2 ring-indigo-500/10 transition-all resize-none"
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Bildirim Tercihleri</h3>
                  <p className="text-[13px] text-slate-500">Hangi durumlarda bildirim almak istediğinizi seçin.</p>
               </div>
               <div className="divide-y divide-slate-50">
                  {[
                    { id: 'n1', title: 'AI Strateji Önerileri', desc: 'Strateji Merkezi yeni bir optimizasyon önerdiğinde.' },
                    { id: 'n2', title: 'Kampanya Güncellemeleri', desc: 'Bir kampanya onaylandığında veya durdurulduğunda.' },
                    { id: 'n3', title: 'Müşteri Randevuları', desc: 'Yeni bir randevu oluşturulduğunda veya hatırlatmalarda.' },
                    { id: 'n4', title: 'Aylık Performans Raporu', desc: 'Her ay başında otomatik hazırlanan rapor hazır olduğunda.' },
                  ].map((n) => (
                    <div key={n.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                      <div>
                        <p className="text-[14px] font-bold text-slate-900">{n.title}</p>
                        <p className="text-[13px] text-slate-500">{n.desc}</p>
                      </div>
                      <button
                        onClick={() => toggleNotification(n.id)}
                        className={`w-11 h-6 rounded-full relative transition-colors ${settings.notifications?.[n.id] ? 'bg-indigo-600' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-[2px] w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.notifications?.[n.id] ? 'left-[22px]' : 'left-[2px]'}`} />
                      </button>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

          {activeTab === 'branding' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Marka Rengi</h3>
              <div className="flex items-center gap-4 flex-wrap">
                {['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#1e293b'].map(color => (
                  <button
                    key={color}
                    onClick={() => updateField('brandColor', color)}
                    className={`w-12 h-12 rounded-2xl border-4 transition-all ${settings.brandColor === color ? 'border-slate-900 scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 mt-4">
                <label className="text-[12px] font-bold text-slate-400">Özel:</label>
                <input type="color" value={settings.brandColor || '#6366f1'} onChange={(e) => updateField('brandColor', e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer" />
                <span className="text-xs font-mono text-slate-400">{settings.brandColor}</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
