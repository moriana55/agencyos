'use client';

import React, { useState } from 'react';
import { 
  User, Building2, Bell, Shield, 
  Palette, Globe, Mail, Lock, 
  Camera, CheckCircle2, Save, Trash2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AyarlarPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'agency', label: 'Ajans Bilgileri', icon: Building2 },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'security', label: 'Güvenlik', icon: Shield },
    { id: 'branding', label: 'Marka & Görünüm', icon: Palette },
  ];

  return (
    <div className="space-y-7 pb-20">
      {/* Header */}
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
                 <CheckCircle2 size={16} /> Değişiklikler Kaydedildi
               </motion.div>
             )}
           </AnimatePresence>
           <button 
             onClick={handleSave}
             disabled={saving}
             className="btn-primary flex items-center gap-2 px-8 py-3"
           >
             {saving ? 'Kaydediliyor...' : <><Save size={18} /> Kaydet</>}
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
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

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="card p-8">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center text-3xl font-black text-slate-400 border-4 border-white shadow-xl overflow-hidden">
                      YE
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                      <Camera size={16} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Profil Fotoğrafı</h3>
                    <p className="text-[13px] text-slate-500 mt-1">Önerilen boyut: 400x400px. Maksimum: 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Tam Adınız</label>
                    <input 
                      type="text" 
                      defaultValue="Yiğit Ertürk"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none focus:bg-white focus:ring-2 ring-indigo-500/10 transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">E-posta Adresi</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="email" 
                        defaultValue="yigit@agencyos.com"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none opacity-60 cursor-not-allowed" 
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-8 bg-rose-50 border-rose-100">
                <h3 className="text-lg font-bold text-rose-900 mb-2">Tehlikeli Alan</h3>
                <p className="text-[13px] text-rose-700 mb-6">Hesabınızı silmek tüm verilerinizin kalıcı olarak kaybolmasına neden olur. Bu işlem geri alınamaz.</p>
                <button className="px-6 py-3 bg-white text-rose-600 border border-rose-200 rounded-xl text-[13px] font-black hover:bg-rose-100 transition-all flex items-center gap-2">
                  <Trash2 size={16} /> Hesabı Kalıcı Olarak Sil
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'agency' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Ajans Adı</label>
                  <input 
                    type="text" 
                    defaultValue="Livora AI Agency"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] font-bold outline-none focus:bg-white focus:ring-2 ring-indigo-500/10 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Web Sitesi</label>
                  <div className="relative">
                    <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      defaultValue="https://livora.ai"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none focus:bg-white focus:ring-2 ring-indigo-500/10 transition-all" 
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Ajans Tanımı</label>
                <textarea 
                  rows={4}
                  defaultValue="Yapay zeka destekli dijital pazarlama ve sosyal medya yönetimi ajansı."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] outline-none focus:bg-white focus:ring-2 ring-indigo-500/10 transition-all resize-none"
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-0 overflow-hidden">
               <div className="p-8 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Bildirim Tercihleri</h3>
                  <p className="text-[13px] text-slate-500">Hangi durumlarda bildirim almak istediğinizi seçin.</p>
               </div>
               <div className="divide-y divide-slate-50">
                  {[
                    { id: 'n1', title: 'AI Strateji Önerileri', desc: 'Strateji Merkezi yeni bir optimizasyon önerdiğinde.', checked: true },
                    { id: 'n2', title: 'Kampanya Güncellemeleri', desc: 'Bir kampanya onaylandığında veya durdurulduğunda.', checked: true },
                    { id: 'n3', title: 'Müşteri Randevuları', desc: 'Yeni bir randevu oluşturulduğunda veya hatırlatmalarda.', checked: false },
                    { id: 'n4', title: 'Aylık Performans Raporu', desc: 'Her ay başında otomatik hazırlanan rapor hazır olduğunda.', checked: true },
                  ].map((n) => (
                    <div key={n.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                      <div>
                        <p className="text-[14px] font-bold text-slate-900">{n.title}</p>
                        <p className="text-[13px] text-slate-500">{n.desc}</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={n.checked} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
