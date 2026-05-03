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

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.length < 2) {
      setSearchResults([])
      return
    }
    setIsSearching(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setSearchResults(data.results || [])
    } catch (e) {} finally {
      setIsSearching(false)
    }
  }

  const today = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <header className="h-[72px] bg-white flex items-center px-4 md:px-8 gap-4 md:gap-6 flex-shrink-0 border-b border-slate-200 relative z-50">
      {/* Mobile Toggle */}
      <button 
        onClick={() => setShowMobileMenu(true)}
        className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Search Bar */}
      <div className="relative flex-1 max-w-md hidden md:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Intelligence Search: Kampanya veya müşteri..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl text-[13px] bg-slate-100/50 border border-slate-200/50 outline-none focus:bg-white focus:ring-4 ring-indigo-500/5 focus:border-indigo-500/50 transition-all text-slate-900 font-medium placeholder:text-slate-400"
        />

        <AnimatePresence>
          {searchQuery.length >= 2 && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="absolute left-0 right-0 mt-3 glass-card rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden z-[100]"
            >
              <div className="p-2.5 space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-3 py-2">Search Results</p>
                {isSearching ? (
                  <div className="p-6 text-center text-slate-400 flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin text-indigo-500" /> 
                    <span className="text-[12px] font-bold">Scanning Data Nodes...</span>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-[13px] font-medium">No results found in mainnet.</div>
                ) : (
                  searchResults.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        router.push(r.path)
                        setSearchQuery('')
                      }}
                      className="w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-indigo-50/50 transition-all text-left group border border-transparent hover:border-indigo-100"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm ${r.type === 'Müşteri' ? 'bg-blue-100 text-blue-600' : 'bg-indigo-100 text-indigo-600'}`}>
                        {r.type === 'Müşteri' ? <User size={18} /> : <Briefcase size={18} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                           <p className="text-[14px] font-black text-slate-900 truncate">{r.name}</p>
                           {i === 0 && <span className="px-1.5 py-0.5 bg-indigo-600 text-white text-[8px] font-black rounded uppercase">AI Top Match</span>}
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{r.type} Intelligence</p>
                      </div>
                      <ArrowUpRight size={16} className="text-slate-300 group-hover:text-indigo-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1" />

      {/* Date */}
      <div className="hidden xl:flex items-center gap-2 text-slate-500 text-[13px] font-bold">
        <Calendar className="w-4 h-4 text-slate-400" />
        <span>{today}</span>
      </div>

      <div className="w-px h-6 bg-slate-200 hidden md:block" />

      {/* Notifications */}
      <div className="relative">
        <button 
          onClick={() => setShowNotifs(!showNotifs)}
          className={`relative p-3 rounded-2xl transition-all border ${
            showNotifs 
              ? 'bg-indigo-50 text-indigo-600 border-indigo-200 shadow-lg shadow-indigo-100/50' 
              : 'text-slate-500 hover:bg-slate-100 border-transparent'
          }`}
        >
          <Bell className="w-[20px] h-[20px]" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-indigo-600 border-2 border-white shadow-[0_0_8px_rgba(79,70,229,0.6)] animate-pulse" />
        </button>

        <AnimatePresence>
          {showNotifs && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)} />
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute right-0 mt-4 w-80 md:w-[400px] glass-card rounded-[24px] shadow-2xl border border-slate-200/50 z-50 overflow-hidden"
              >
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                     <h3 className="text-[15px] font-black text-slate-900 uppercase tracking-tight">Intelligence Feed</h3>
                     <span className="px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-black rounded-full">3 NEW</span>
                  </div>
                  <button onClick={() => setShowNotifs(false)} className="p-1.5 hover:bg-slate-200 rounded-xl text-slate-400 transition-colors">
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-5 flex items-start gap-4 hover:bg-indigo-50/30 cursor-pointer transition-all border-b border-slate-50 last:border-0 group">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110 ${n.bg} ${n.color}`}>
                        <n.icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[14px] font-black text-slate-900">{n.title}</p>
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{n.time}</span>
                        </div>
                        <p className="text-[12px] text-slate-500 leading-relaxed font-medium line-clamp-2">{n.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-4 bg-slate-50 text-[12px] font-black text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-widest border-t border-slate-100">
                  Open Command Center
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3.5 pl-4 cursor-pointer group border-l border-slate-200">
        <div className="hidden sm:block text-right">
          <p className="text-[13px] font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{profile.fullName}</p>
          <p className="text-[10px] font-black text-indigo-500/70 uppercase tracking-[0.15em] mt-0.5">{profile.agencyName}</p>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center text-[15px] font-black shadow-lg shadow-indigo-500/20 group-hover:scale-105 group-hover:rotate-3 transition-all">
          {profile.initials}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white z-[101] lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                      <Sparkles size={18} />
                    </div>
                    <span className="font-black text-slate-900 tracking-tight">AgencyOS</span>
                  </div>
                  <button onClick={() => setShowMobileMenu(false)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                   <Sidebar profile={profile} isMobile />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
