'use client'

import React, { useState, useEffect } from 'react'
import { Search, Bell, Calendar, X, Sparkles, Target, MessageSquare, ArrowUpRight, User, Briefcase, Loader2, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

interface Profile {
  fullName: string
  agencyName: string
  initials: string
  email: string
}

const notifications = [
  { id: 1, type: 'ai', title: 'Strateji Merkezi Fırsatı', desc: 'Müşteri ROAS değeri 6.2x\'e yükseldi. Bütçe artırımı öneriliyor.', time: '5 dk önce', icon: Sparkles, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 2, type: 'ads', title: 'Kampanya Onayı', desc: 'Yeni kampanya Meta tarafından onaylandı.', time: '1 saat önce', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 3, type: 'social', title: 'Yeni AI Yanıtı', desc: 'Aura Estetik için 12 yeni DM otomatik olarak yanıtlandı.', time: '3 saat önce', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
]

export default function TopNav({ profile }: { profile: Profile }) {
  const router = useRouter()
  const pathname = usePathname()
  const [showNotifs, setShowNotifs] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    setShowMobileMenu(false)
  }, [pathname])

  const today = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <header className="h-[72px] bg-white/70 backdrop-blur-xl flex items-center px-4 md:px-8 gap-4 md:gap-6 flex-shrink-0 border-b border-slate-100 relative z-50">
      {/* Mobile Toggle */}
      <button 
        onClick={() => setShowMobileMenu(true)}
        className="lg:hidden p-2 rounded-xl text-slate-400 hover:bg-slate-50 transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Search Bar */}
      <div className="relative flex-1 max-w-md hidden md:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Hızlı arama: Kampanya veya müşteri..."
          className="w-full pl-11 pr-4 py-2.5 rounded-[16px] text-[13px] bg-slate-50 border border-slate-100 outline-none focus:bg-white focus:ring-4 ring-indigo-500/5 focus:border-indigo-500/20 transition-all text-slate-900 font-medium placeholder:text-slate-400"
        />
      </div>

      <div className="flex-1" />

      {/* Date */}
      <div className="hidden xl:flex items-center gap-2 text-slate-400 text-[12px] font-black uppercase tracking-widest">
        <Calendar className="w-4 h-4" />
        <span>{today}</span>
      </div>

      <div className="w-px h-6 bg-slate-100 hidden md:block" />

      {/* Notifications */}
      <div className="relative">
        <button 
          onClick={() => setShowNotifs(!showNotifs)}
          className={`relative p-2.5 rounded-xl transition-all border ${
            showNotifs 
              ? 'bg-indigo-50 text-indigo-600 border-indigo-100' 
              : 'text-slate-400 hover:bg-slate-50 border-transparent'
          }`}
        >
          <Bell className="w-[20px] h-[20px]" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.4)]" />
        </button>

        <AnimatePresence>
          {showNotifs && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)} />
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute right-0 mt-4 w-80 md:w-[400px] bg-white rounded-[28px] shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-slate-100 z-50 overflow-hidden"
              >
                <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                  <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Bildirimler</h3>
                  <button onClick={() => setShowNotifs(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-300 transition-colors">
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar divide-y divide-slate-50">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-6 flex items-start gap-4 hover:bg-slate-50/50 cursor-pointer transition-all group">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${n.bg} ${n.color}`}>
                        <n.icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[14px] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{n.title}</p>
                          <span className="text-[9px] text-slate-300 font-black uppercase">{n.time}</span>
                        </div>
                        <p className="text-[12px] text-slate-500 leading-relaxed font-medium line-clamp-2">{n.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3.5 pl-4 cursor-pointer group border-l border-slate-100">
        <div className="hidden sm:block text-right">
          <p className="text-[13px] font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase italic tracking-tight">{profile.fullName}</p>
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.15em] mt-0.5">Yönetici</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-[14px] font-black shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-all">
          {profile.initials}
        </div>
      </div>
    </header>
  )
}
