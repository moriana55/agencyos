'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Target, BarChart3, Users, CalendarDays,
  MessageSquare, Settings, LogOut, Zap, ChevronRight, CreditCard,
  Link2
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Panel',             href: '/panel'      },
  { icon: Target,          label: 'Reklam Yöneticisi', href: '/reklam'     },
  { icon: CalendarDays,    label: 'İçerik Takvimi',    href: '/takvim'     },
  { icon: BarChart3,       label: 'Analizler',          href: '/analizler'  },
  { icon: Users,           label: 'Müşteriler',         href: '/musteriler' },
  { icon: MessageSquare,   label: 'AI Sosyal',          href: '/ai-sosyal', badge: 'Yeni' },
]

interface Profile {
  fullName: string
  agencyName: string
  initials: string
}

export default function Sidebar({ profile }: { profile: Profile }) {
  const pathname = usePathname()
  const router   = useRouter()
  const { signOut } = useClerk()

  const handleLogout = () => signOut(() => router.push('/login'))

  return (
    <aside className="w-full h-full flex flex-col bg-[#0C1220] border-r border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-[72px] border-b border-white/[0.06]">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-indigo-600 shadow-lg shadow-indigo-500/20">
          <Zap className="w-5 h-5 text-white fill-white animate-pulse" />
        </div>
        <div>
          <p className="text-white font-black text-[15px] tracking-tight leading-none uppercase">Agency<span className="text-indigo-400">OS</span></p>
          <p className="text-[10px] mt-1 truncate max-w-[140px] text-white/30 font-bold uppercase tracking-wider">
            {profile.agencyName}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] px-4 mb-4 text-white/20">
          Intelligence Hub
        </p>

        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all relative group ${
                isActive 
                  ? 'bg-indigo-600/10 text-indigo-300 border border-indigo-500/20 shadow-lg shadow-indigo-500/5' 
                  : 'text-white/40 hover:text-white/80 hover:bg-white/[0.03]'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                />
              )}
              <item.icon className={`w-[18px] h-[18px] flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-indigo-400' : ''}`} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 uppercase tracking-tighter">
                  {item.badge}
                </span>
              )}
              {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-20" />}
            </Link>
          )
        })}

        <div className="pt-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] px-4 mb-4 text-white/20">
            Control Center
          </p>
          <Link href="/abonelik"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all ${pathname === '/abonelik' ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'text-white/40 hover:text-white/80 hover:bg-white/[0.03]'}`}
          >
            <CreditCard className="w-[18px] h-[18px] opacity-50" />
            <span>Abonelik</span>
          </Link>
          <Link href="/ayarlar"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all mt-1 ${pathname === '/ayarlar' ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'text-white/40 hover:text-white/80 hover:bg-white/[0.03]'}`}
          >
            <Settings className="w-[18px] h-[18px] opacity-50" />
            <span>Ayarlar</span>
          </Link>
          <Link href="/entegrasyonlar"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all mt-1 ${pathname === '/entegrasyonlar' ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'text-white/40 hover:text-white/80 hover:bg-white/[0.03]'}`}
          >
            <Link2 className="w-[18px] h-[18px] opacity-50" />
            <span>Entegrasyonlar</span>
          </Link>
        </div>
      </nav>

      {/* System Health & User */}
      <div className="px-4 pb-6 space-y-4">
        <div className="rounded-2xl p-4 bg-indigo-500/[0.03] border border-white/5">
          <div className="flex items-center justify-between mb-2">
             <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">System Health</p>
             <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
          </div>
          <p className="text-[10px] text-white/30 font-medium leading-relaxed">AI Decision Engine Nominal. Latency: 12ms</p>
        </div>

        <div className="flex items-center gap-3 px-3 py-3 rounded-xl border border-white/5 bg-white/[0.02]">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-black text-white flex-shrink-0 bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/20">
            {profile.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-black text-white truncate leading-tight">{profile.fullName}</p>
            <p className="text-[10px] truncate text-white/30 font-bold uppercase tracking-wider">{profile.agencyName}</p>
          </div>
          <button onClick={handleLogout} title="Çıkış Yap" className="transition-all hover:text-rose-500 text-white/20">
            <LogOut className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
