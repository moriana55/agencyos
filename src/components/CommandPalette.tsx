'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, Users, Target, Calendar, 
  MessageSquare, Zap, Settings, ArrowRight,
  Plus, ExternalLink, Command as CommandIcon, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggle]);

  const items = [
    { label: 'Yeni Müşteri Ekle', icon: Plus, path: '/musteriler', shortcut: 'M' },
    { label: 'Kampanya Başlat', icon: Target, path: '/reklam', shortcut: 'R' },
    { label: 'İçerik Planla', icon: Calendar, path: '/takvim', shortcut: 'T' },
    { label: 'AI Simülatörüne Git', icon: MessageSquare, path: '/ai-sosyal', shortcut: 'A' },
    { label: 'Ajans Ayarları', icon: Settings, path: '/ayarlar', shortcut: 'S' },
  ];

  const filteredItems = items.filter(i => 
    i.label.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = (path: string) => {
    router.push(path);
    setOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl" 
            onClick={() => setOpen(false)} 
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-[32px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Search Header */}
            <div className="p-6 border-b border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                 <CommandIcon size={20} />
              </div>
              <input 
                autoFocus
                placeholder="Komuta Merkezi: Bir eylem yazın veya Cmd+K..." 
                className="flex-1 bg-transparent border-none outline-none text-white font-medium text-lg placeholder:text-white/10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                   if (e.key === 'Enter' && filteredItems.length > 0) {
                      navigate(filteredItems[0].path);
                   }
                }}
              />
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-black text-white/30">
                 ESC
              </div>
            </div>

            {/* Content Area */}
            <div className="max-h-[400px] overflow-y-auto p-4 custom-scrollbar">
               {filteredItems.length === 0 ? (
                  <div className="py-12 text-center">
                     <div className="w-16 h-16 bg-white/5 rounded-[24px] flex items-center justify-center mx-auto mb-4 border border-white/5">
                        <Zap size={24} className="text-slate-800" />
                     </div>
                     <p className="text-[12px] font-black text-slate-700 uppercase tracking-widest">Eylem Bulunamadı</p>
                  </div>
               ) : (
                  <div className="space-y-2">
                     <p className="px-4 py-2 text-[10px] font-black text-indigo-400/50 uppercase tracking-[0.2em]">Hızlı Aksiyonlar</p>
                     {filteredItems.map((item, i) => (
                        <button 
                          key={i}
                          onClick={() => navigate(item.path)}
                          className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all group"
                        >
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white/[0.02] text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all flex items-center justify-center">
                                 <item.icon size={20} />
                              </div>
                              <span className="text-[15px] font-bold text-white tracking-tight">{item.label}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-black text-slate-500 group-hover:text-white transition-colors uppercase">
                                 {item.shortcut}
                              </span>
                              <ArrowRight size={16} className="text-white/10 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                           </div>
                        </button>
                     ))}
                  </div>
               )}
            </div>

            {/* Footer Intel */}
            <div className="p-5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" />
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Neural Command Engine Active</span>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-[10px] font-black text-slate-700 uppercase">
                     <span className="px-1.5 py-0.5 rounded bg-white/5">↑</span>
                     <span className="px-1.5 py-0.5 rounded bg-white/5">↓</span>
                     <span className="ml-1">Gezin</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-black text-slate-700 uppercase">
                     <span className="px-1.5 py-0.5 rounded bg-white/5">ENTER</span>
                     <span className="ml-1">Onayla</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
