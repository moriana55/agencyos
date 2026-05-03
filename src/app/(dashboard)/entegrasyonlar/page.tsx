'use client';

import React, { useState, useEffect } from 'react';
import { 
  Camera, Globe, MessageSquare, 
  Share2, ShieldCheck, Zap, 
  ArrowUpRight, CheckCircle2, AlertCircle, X,
  Key, Lock, Server, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EntegrasyonlarPage() {
  const [loading, setLoading] = useState(true);
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const [connecting, setConnecting] = useState(false);
  const [credentials, setCredentials] = useState({ apiKey: '', apiSecret: '' });

  const platforms = [
    { id: 'meta', name: 'Meta Business Ads', icon: Camera, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'google', name: 'Google Ads Manager', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'whatsapp', name: 'WhatsApp Business API', icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'tiktok', name: 'TikTok For Business', icon: Share2, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      const res = await fetch('/api/integrations');
      const data = await res.json();
      if (data.integrations) setIntegrations(data.integrations);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setConnecting(true);
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const res = await fetch('/api/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: selectedPlatform.id,
          apiKey: credentials.apiKey,
          apiSecret: credentials.apiSecret,
          status: 'connected'
        }),
      });

      if (res.ok) {
        setShowConnectModal(false);
        setCredentials({ apiKey: '', apiSecret: '' });
        fetchIntegrations();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setConnecting(false);
    }
  };

  const getStatus = (id: string) => {
    const integration = integrations.find(i => i.platform === id);
    return integration ? integration.status : 'not_connected';
  };

  const getLastSync = (id: string) => {
    const integration = integrations.find(i => i.platform === id);
    if (!integration || !integration.lastSync) return '-';
    return new Date(integration.lastSync).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) + ' önce';
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="pt-2">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-indigo-500/80">Intelligence Hub</p>
        <h1 className="text-[32px] font-black tracking-tight text-slate-900 leading-none">Veri Entegrasyonları</h1>
        <p className="text-[14px] mt-2 text-slate-500 font-medium max-w-2xl">
          Dijital ekosisteminizi tek bir merkezden yönetin. Tüm platformları AgencyOS terminaline bağlayarak AI optimizasyonunu aktif edin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map((item, i) => {
          const status = getStatus(item.id);
          const isConnected = status === 'connected';
          
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="intel-card group hover:border-indigo-200 transition-all cursor-default"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200/50 group-hover:scale-110 transition-transform ${item.bg} ${item.color}`}>
                    <item.icon size={26} />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-black text-slate-900">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                      <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                        {isConnected ? 'Bağlantı Aktif' : 'Bağlantı Yok'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    if (!isConnected) {
                      setSelectedPlatform(item);
                      setShowConnectModal(true);
                    }
                  }}
                  className={`px-5 py-2.5 rounded-xl text-[13px] font-black transition-all ${
                    isConnected 
                      ? 'bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600' 
                      : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700'
                  }`}
                >
                  {isConnected ? 'Bağlantıyı Kes' : 'Hemen Bağla'}
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Son Senkronizasyon</p>
                    <p className="text-[13px] font-bold text-slate-700 mt-0.5">{getLastSync(item.id)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Veri Akışı</p>
                    <p className="text-[13px] font-bold text-slate-700 mt-0.5">{isConnected ? 'Anlık (Real-time)' : 'Beklemede'}</p>
                  </div>
                </div>
                {isConnected && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg">
                    <ShieldCheck size={14} />
                    <span className="text-[11px] font-bold">Encrypted</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Connection Modal */}
      <AnimatePresence>
        {showConnectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
              onClick={() => !connecting && setShowConnectModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-12 overflow-hidden"
            >
              {/* Modal Background Elements */}
              <div className={`absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none`}>
                {selectedPlatform && <selectedPlatform.icon size={240} />}
              </div>

              <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${selectedPlatform?.bg} ${selectedPlatform?.color} flex items-center justify-center shadow-inner`}>
                    {selectedPlatform && <selectedPlatform.icon size={20} />}
                  </div>
                  <div>
                    <h3 className="text-[22px] font-black text-slate-900 tracking-tight">{selectedPlatform?.name}</h3>
                    <p className="text-[12px] text-slate-400 font-bold uppercase tracking-widest">Güvenli API Bağlantısı</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowConnectModal(false)} 
                  disabled={connecting}
                  className="p-3 hover:bg-slate-50 rounded-2xl transition-all text-slate-400 disabled:opacity-50"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleConnect} className="space-y-8 relative z-10">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                      <Lock size={18} />
                   </div>
                   <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                      Verileriniz 256-bit AES protokolü ile şifrelenir. AgencyOS şifrelerinizi asla saklamaz, doğrudan resmi API servisleri ile haberleşir.
                   </p>
                </div>

                <div className="space-y-6">
                   <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">API Key / Client ID</label>
                        <Key size={14} className="text-slate-300" />
                      </div>
                      <input 
                        required
                        type="text"
                        disabled={connecting}
                        value={credentials.apiKey}
                        onChange={(e) => setCredentials({...credentials, apiKey: e.target.value})}
                        placeholder="Uygulama kimliğinizi girin..."
                        className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none focus:ring-4 ring-indigo-500/5 transition-all disabled:opacity-50"
                      />
                   </div>
                   <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">API Secret / Token</label>
                        <Server size={14} className="text-slate-300" />
                      </div>
                      <input 
                        required
                        type="password"
                        disabled={connecting}
                        value={credentials.apiSecret}
                        onChange={(e) => setCredentials({...credentials, apiSecret: e.target.value})}
                        placeholder="••••••••••••••••"
                        className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none focus:ring-4 ring-indigo-500/5 transition-all disabled:opacity-50"
                      />
                   </div>
                </div>

                <button 
                  type="submit" 
                  disabled={connecting}
                  className="btn-primary w-full py-5 text-[15px] rounded-2xl glow-indigo flex items-center justify-center gap-3 disabled:opacity-80"
                >
                  {connecting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Güvenli Bağlantı Kuruluyor...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Bağlantıyı Doğrula ve Kaydet</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Security Info Card */}
      <div className="bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform">
          <ShieldCheck size={180} />
        </div>
        <div className="relative z-10 max-w-xl">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-xl">
            <Zap className="text-indigo-400" size={24} />
          </div>
          <h2 className="text-[24px] font-black leading-tight mb-4">Enterprise Grade Security & Compliance</h2>
          <p className="text-slate-400 text-[15px] leading-relaxed mb-8">
            AgencyOS, veri güvenliğinizi en üst düzeyde tutmak için 256-bit AES şifreleme ve resmi API protokollerini kullanır. 
            Hiçbir şifreniz sistemimizde saklanmaz, tüm bağlantılar OAuth 2.0 üzerinden güvenle gerçekleştirilir.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span className="text-[13px] font-bold text-slate-300">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span className="text-[13px] font-bold text-slate-300">ISO 27001 Standard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
