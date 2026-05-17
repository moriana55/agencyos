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

export default function Sidebar({ profile }: { profile: any }) {
  const pathname = usePathname()
  const router   = useRouter()
  const { signOut } = useClerk()

  const handleLogout = () => signOut(() => router.push('/login'))

  return (
    <aside className="w-full h-full flex flex-col bg-white border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-[72px] border-b border-slate-50">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-indigo-600 shadow-lg shadow-indigo-600/20">
          <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <div className="flex-shrink-0">
          <p className="text-slate-900 font-black text-[15px] tracking-tight leading-none uppercase italic">Agency<span className="text-indigo-600">OS</span></p>
          <p className="text-[9px] mt-1 truncate max-w-[140px] text-slate-400 font-black uppercase tracking-widest">
            {profile?.agencyName || 'Agency Intelligence'}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] px-4 mb-4 text-slate-300">
          Intelligence Hub
        </p>

        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all relative group ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <item.icon className={`w-[18px] h-[18px] flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-600 border border-indigo-200 uppercase tracking-tighter">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}

        <div className="pt-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] px-4 mb-4 text-slate-300">
            Control Center
          </p>
          <Link href="/abonelik"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all ${pathname === '/abonelik' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            <CreditCard className="w-[18px] h-[18px] text-slate-400" />
            <span>Abonelik</span>
          </Link>
          <Link href="/ayarlar"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all mt-1 ${pathname === '/ayarlar' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            <Settings className="w-[18px] h-[18px] text-slate-400" />
            <span>Ayarlar</span>
          </Link>
        </div>
      </nav>

      {/* User Section */}
      <div className="px-4 pb-6 mt-auto">
        <div className="flex items-center gap-3 px-3 py-3 rounded-2xl border border-slate-100 bg-slate-50/50">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-black text-white flex-shrink-0 bg-indigo-600 shadow-md uppercase">
            {profile?.initials || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-black text-slate-900 truncate leading-tight">{profile?.fullName || 'Admin User'}</p>
            <p className="text-[9px] truncate text-slate-400 font-black uppercase tracking-wider">Dashboard Active</p>
          </div>
          <button onClick={handleLogout} className="text-slate-300 hover:text-rose-500 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}
