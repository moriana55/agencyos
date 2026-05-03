'use client';

import React, { useState, useEffect } from 'react';
import { 
  Check, Zap, Shield, Crown, 
  ArrowUpRight, CreditCard, Sparkles,
  CheckCircle2, Star, X, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AbonelikPage() {
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [upgrading, setUpgrading] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const res = await fetch('/api/subscription');
      const data = await res.json();
      if (data.subscription) setCurrentPlan(data.subscription.plan);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planId: string) => {
    setUpgrading(planId);
    try {
      const res = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planId,
          billingCycle
        }),
      });

      if (res.ok) {
        setSuccessModal(planId);
        fetchSubscription();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpgrading(null);
    }
  };

  const plans = [
    {
      id: 'starter',
      name: 'Starter Plan',
      desc: 'Küçük ajanslar ve freelancerlar için başlangıç.',
      price: billingCycle === 'monthly' ? '₺2,490' : '₺1,990',
      features: ['5 Aktif Müşteri', 'Temel AI Desteği', '10 İçerik Planlama', 'Haftalık Raporlama'],
      icon: Zap,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro Komuta',
      desc: 'Büyüyen ajanslar için tam otomasyon.',
      price: billingCycle === 'monthly' ? '₺5,990' : '₺4,790',
      features: ['25 Aktif Müşteri', 'Gelişmiş AI Analizi', 'Sınırsız İçerik Planlama', 'Günlük Otomatik Rapor', 'n8n Entegrasyonu'],
      icon: Star,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      popular: true
    },
    {
      id: 'agency',
      name: 'Elite Agency',
      desc: 'Kurumsal seviye, sınırsız güç.',
      price: billingCycle === 'monthly' ? '₺12,990' : '₺10,390',
      features: ['Sınırsız Müşteri', 'Özel AI Eğitimi', 'White Label Raporlama', '7/24 Teknik Destek', 'Tüm Entegrasyonlar Açık'],
      icon: Crown,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      popular: false
    }
  ];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Banka Verileri Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="text-center pt-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[12px] font-bold uppercase tracking-widest border border-indigo-100">
          <Sparkles size={14} /> Mevcut Planın: <span className="text-indigo-800 ml-1">{currentPlan.toUpperCase()}</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Ajansınız İçin En Uygun Plan</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-[16px]">
          Farklı ölçekteki ajanslar için tasarlanmış esnek paketler. İstediğiniz zaman iptal edebilirsiniz.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 pt-6">
          <span className={`text-[14px] font-bold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-400'}`}>Aylık</span>
          <button 
            onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-7 rounded-full bg-slate-200 relative p-1 transition-all"
          >
            <motion.div 
              animate={{ x: billingCycle === 'monthly' ? 0 : 28 }}
              className="w-5 h-5 rounded-full bg-white shadow-md"
            />
          </button>
          <span className={`text-[14px] font-bold ${billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-400'}`}>
            Yıllık <span className="text-emerald-500 text-[12px] ml-1">(-%20 İndirim)</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {plans.map((plan, i) => {
          const isCurrent = currentPlan === plan.id;
          
          return (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`card p-8 flex flex-col relative transition-all hover:shadow-2xl ${plan.popular ? 'border-2 border-indigo-600 scale-105 z-10' : ''} ${isCurrent ? 'ring-4 ring-emerald-500/10 border-emerald-200' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-[12px] font-black uppercase tracking-widest shadow-xl">
                  En Popüler
                </div>
              )}
              
              <div className="space-y-6 flex-1">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${plan.bg} ${plan.color}`}>
                    <plan.icon size={24} />
                  </div>
                  {isCurrent && (
                    <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-emerald-100">
                      <CheckCircle2 size={12} /> Mevcut Plan
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                  <p className="text-[13px] text-slate-500 mt-1">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                  <span className="text-slate-400 text-[14px] font-bold">/ay</span>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-50">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                        <Check size={12} className="text-emerald-600" />
                      </div>
                      <span className="text-[14px] text-slate-600 font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => !isCurrent && handleUpgrade(plan.id)}
                disabled={upgrading === plan.id || isCurrent}
                className={`w-full py-4 mt-10 rounded-2xl text-[14px] font-black transition-all flex items-center justify-center gap-2 ${
                  isCurrent 
                    ? 'bg-slate-50 text-slate-400 cursor-default' 
                    : plan.popular 
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-500' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                } disabled:opacity-70`}
              >
                {upgrading === plan.id ? <Loader2 size={18} className="animate-spin" /> : isCurrent ? 'Aktif Kullanılıyor' : 'Planı Yükselt'} 
                {!isCurrent && <ArrowUpRight size={18} />}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {successModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSuccessModal(null)} />
            <motion.div initial={{ scale:0.95, opacity:0, y: 20 }} animate={{ scale:1, opacity:1, y: 0 }} exit={{ scale:0.95, opacity:0, y: 20 }}
              className="bg-white rounded-[40px] shadow-2xl p-10 w-full max-w-lg relative z-10 text-center">
              
              <div className="w-24 h-24 rounded-[32px] bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 mx-auto mb-8 relative">
                 <CheckCircle2 size={48} strokeWidth={1.5} />
                 <motion.div 
                    animate={{ scale: [1, 1.2, 1] }} 
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -right-2 w-10 h-10 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-emerald-50"
                  >
                    <Sparkles size={20} className="text-amber-500" />
                 </motion.div>
              </div>

              <h2 className="text-[28px] font-black text-slate-900 leading-tight mb-3">Yeni Güçlerin Aktif Edildi!</h2>
              <p className="text-slate-500 text-[15px] leading-relaxed mb-10 px-6">
                Tebrikler üstad! {plans.find(p => p.id === successModal)?.name} ile ajansını bir üst seviyeye taşıdın. AI asistanın artık senin için daha fazla çalışmaya hazır.
              </p>

              <button 
                onClick={() => setSuccessModal(null)}
                className="w-full py-5 rounded-3xl bg-slate-900 text-white font-black text-[16px] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20"
              >
                Hadi Başlayalım!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Trust Footer */}
      <div className="card p-8 bg-slate-50 border-none flex flex-col md:flex-row items-center justify-between gap-8 mt-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Shield className="text-indigo-600" size={24} />
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-slate-900">Güvenli Ödeme Alt Yapısı</h4>
            <p className="text-[13px] text-slate-500">Iyzico ve 256-bit SSL korumasıyla ödemeleriniz güvende.</p>
          </div>
        </div>
        <div className="flex items-center gap-6 opacity-50 grayscale">
          <span className="font-bold text-slate-400 text-[20px]">VISA</span>
          <span className="font-bold text-slate-400 text-[20px]">MASTERCARD</span>
          <span className="font-bold text-slate-400 text-[20px]">TROY</span>
        </div>
      </div>
    </div>
  );
}
