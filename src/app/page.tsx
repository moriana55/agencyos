'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Zap, Target, Bot, BarChart3, 
  Check, ArrowRight, Sparkles, Globe, 
  ShieldCheck, MessageCircle, Play, Layers
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-xl font-black tracking-tight">AgencyOS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[14px] font-bold text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Özellikler</a>
            <a href="#pricing" className="hover:text-white transition-colors">Fiyatlandırma</a>
            <a href="#about" className="hover:text-white transition-colors">Hakkımızda</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[14px] font-bold hover:text-indigo-400 transition-colors">
              Giriş Yap
            </Link>
            <Link href="/signup" className="px-6 py-2.5 rounded-xl bg-white text-slate-950 text-[14px] font-black hover:bg-indigo-50 transition-all shadow-lg shadow-white/5">
              Hemen Başla
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[12px] font-bold uppercase tracking-widest"
          >
            <Sparkles size={14} /> Sosyal Medya Ajansları İçin Yeni Nesil İşletim Sistemi
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50"
          >
            Ajansınızı Yapay Zeka <br /> İle Ölçeklendirin.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed font-medium"
          >
            AgencyOS; reklam yönetimini, AI otomasyonunu ve müşteri ilişkilerini tek bir premium platformda birleştirir. Büşra AI asistanınızla operasyonel yükü %80 azaltın.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/signup" className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-indigo-600 text-white font-black text-lg hover:bg-indigo-500 shadow-2xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 group">
              Hemen Ücretsiz Dene <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white/5 text-white font-black text-lg hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2">
              <Play size={18} fill="currentColor" /> Demoyu İzle
            </button>
          </motion.div>
        </div>

        {/* Dashboard Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24 max-w-6xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-indigo-600/20 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative rounded-[32px] border border-white/10 bg-slate-900/50 backdrop-blur-sm p-4 shadow-2xl overflow-hidden aspect-[16/10] md:aspect-auto">
            <div className="w-full h-full bg-slate-950 rounded-2xl border border-white/5 overflow-hidden flex flex-col">
              <div className="h-8 border-b border-white/5 flex items-center px-4 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20 border border-rose-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
              </div>
              <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-900/20 to-transparent">
                 {/* Decorative mock UI elements */}
                 <div className="w-[80%] h-[70%] bg-slate-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden flex">
                    <div className="w-16 border-r border-white/5 p-3 flex flex-col gap-4">
                      {[1,2,3,4].map(i => <div key={i} className="w-full aspect-square rounded-lg bg-white/5" />)}
                    </div>
                    <div className="flex-1 p-6 space-y-6">
                      <div className="h-10 w-48 bg-white/10 rounded-lg" />
                      <div className="grid grid-cols-3 gap-4">
                        {[1,2,3].map(i => <div key={i} className="h-24 bg-white/5 rounded-xl border border-white/5" />)}
                      </div>
                      <div className="h-40 bg-white/5 rounded-xl border border-white/5" />
                    </div>
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                 <p className="absolute bottom-12 text-slate-500 font-bold tracking-widest text-[11px] uppercase">AgencyOS Pro Dashboard Preview</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Aktif Ajans', value: '120+' },
              { label: 'Yönetilen Bütçe', value: '₺50M+' },
              { label: 'AI Yanıtı', value: '2.4M+' },
              { label: 'Verimlilik Artışı', value: '%85' },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="text-3xl md:text-5xl font-black text-white">{stat.value}</p>
                <p className="text-[12px] md:text-[14px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-24">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Tek Platform. Sınırsız Güç.</h2>
            <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto">Ajans operasyonlarınızı kaostan kurtarıp sisteme bağlıyoruz.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Smart Ads Manager', 
                desc: 'Meta, Google ve TikTok reklamlarınızı tek bir şık panelden yönetin. Büşra AI bütçenizi her gün optimize etsin.',
                icon: Target,
                color: 'text-rose-500'
              },
              { 
                title: 'AI Sosyal Otomasyon', 
                desc: 'DM ve yorumlara anında, markanızın tonunda yanıt verin. Manychat entegrasyonu ile 7/24 satış yapın.',
                icon: Bot,
                color: 'text-indigo-500'
              },
              { 
                title: 'Müşteri CRM', 
                desc: 'Tüm müşteri portföyünüzü, raporlarını ve geçmiş verilerini organize edin. Manuel raporlama devrini kapatın.',
                icon: Layers,
                color: 'text-amber-500'
              },
              { 
                title: 'İçerik Takvimi', 
                desc: 'Ayrshare ile planlayın, tek tıkla tüm platformlarda yayınlayın. Onay süreçlerini hızlandırın.',
                icon: Calendar,
                color: 'text-emerald-500'
              },
              { 
                title: 'Gelişmiş Analitik', 
                desc: 'Karmaşık verileri anlaşılır görsel raporlara dönüştürün. Müşterilerinize değerinizi kanıtlayın.',
                icon: BarChart3,
                color: 'text-blue-500'
              },
              { 
                title: 'Kurumsal Güvenlik', 
                desc: 'Clerk altyapısı ile güvenli giriş ve yetkilendirme. Verileriniz Neon DB ile her zaman yedekli.',
                icon: ShieldCheck,
                color: 'text-purple-500'
              },
            ].map((f, i) => (
              <div key={i} className="card p-8 bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group cursor-default">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${f.color}`}>
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-500 text-[14px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Simpler version for Landing */}
      <section id="pricing" className="py-32 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
           <div className="text-center space-y-4 mb-24">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Şeffaf Fiyatlandırma</h2>
            <p className="text-slate-400 text-lg font-medium">Ajansınızın ölçeğine göre paketimizi seçin.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {['Starter', 'Pro', 'Enterprise'].map((p, i) => (
               <div key={i} className={`card p-10 bg-slate-900 border-white/5 flex flex-col ${i === 1 ? 'border-indigo-500 ring-1 ring-indigo-500' : ''}`}>
                  <h4 className="text-lg font-bold text-slate-400 mb-2">{p}</h4>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-black text-white">{i === 0 ? '₺990' : i === 1 ? '₺2,490' : 'Özel'}</span>
                    {i !== 2 && <span className="text-slate-500 text-[14px]">/ay</span>}
                  </div>
                  <div className="space-y-4 mb-12 flex-1">
                    {[1,2,3,4].map(f => (
                      <div key={f} className="flex items-center gap-3 text-[14px] text-slate-300">
                        <Check size={16} className="text-indigo-500" /> Özellik {f}
                      </div>
                    ))}
                  </div>
                  <Link href="/signup" className={`w-full py-4 rounded-2xl text-[14px] font-black transition-all flex items-center justify-center ${i === 1 ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                    {i === 2 ? 'Satışla Konuş' : 'Hemen Başla'}
                  </Link>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto rounded-[48px] bg-gradient-to-br from-indigo-600 to-purple-800 p-12 md:p-24 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Zap size={200} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Geleceğin Ajansını <br /> Bugün İnşa Edin.
          </h2>
          <p className="text-indigo-100 text-lg md:text-xl font-medium max-w-xl mx-auto">
            Hemen kaydolun ve ilk 14 gün boyunca AgencyOS'un tüm özelliklerini ücretsiz deneyin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/signup" className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-white text-indigo-700 font-black text-xl hover:bg-indigo-50 transition-all shadow-xl">
              Ücretsiz Denemeyi Başlat
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4 text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-lg font-black tracking-tight">AgencyOS</span>
            </div>
            <p className="text-slate-500 text-[14px] max-w-xs">
              Sosyal medya ajansları için yapay zeka destekli yönetim platformu.
            </p>
          </div>
          <div className="flex gap-12 text-[14px] font-bold text-slate-500">
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">Instagram</a>
          </div>
          <p className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">
            © 2024 AgencyOS Inc. Tüm Hakları Saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Calendar({ size, className }: { size: number, className: string }) {
  return <CalendarDays className={className} size={size} />;
}

import { CalendarDays } from 'lucide-react';
