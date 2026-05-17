'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CalendarDays, Plus, X, Loader2, Send, 
  Clock, CheckCircle2, AlertCircle, Trash2, 
  LayoutGrid, Calendar as CalendarIcon, Sparkles, 
  Cloud, Folder, Target, Zap, ArrowUpRight
} from 'lucide-react'

const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', icon: '📸' },
  { id: 'facebook',  label: 'Facebook',  icon: '📘' },
  { id: 'tiktok',    label: 'TikTok',    icon: '🎵' },
  { id: 'twitter',   label: 'Twitter/X', icon: '🐦' },
  { id: 'linkedin',  label: 'LinkedIn',  icon: '💼' },
]

const STATUS_STYLE: Record<string, { bg: string, text: string, label: string, dot: string, border: string }> = {
  draft:     { bg: 'bg-slate-50', text: 'text-slate-500', label: 'Taslak', dot: 'bg-slate-400', border: 'border-slate-100' },
  scheduled: { bg: 'bg-indigo-50', text: 'text-indigo-600', label: 'Planlandı', dot: 'bg-indigo-500', border: 'border-indigo-100' },
  published: { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Yayında', dot: 'bg-emerald-500', border: 'border-emerald-100' },
  failed:    { bg: 'bg-rose-50', text: 'text-rose-600', label: 'Başarısız', dot: 'bg-rose-500', border: 'border-rose-100' },
}

export default function TakvimPage() {
  const [posts, setPosts] = useState([])
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ client_id: '', title: '', caption: '', platforms: [], scheduled_at: '' })

  const load = async () => {
    try {
      const [pr, cr] = await Promise.all([fetch('/api/posts'), fetch('/api/clients')])
      const pd = await pr.json(); const cd = await cr.json()
      setPosts(pd?.posts || []); setClients(cd?.clients || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const grouped = (posts || []).reduce((acc, p: any) => {
    const day = p.scheduled_at ? new Date(p.scheduled_at).toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'}) : 'Taslaklar'
    if (!acc[day]) acc[day] = []
    acc[day].push(p)
    return acc
  }, {} as Record<string, any[]>)

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 text-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-indigo-600">Content Engine</p>
          <h1 className="text-[36px] font-black tracking-tighter text-slate-900 leading-none italic">İçerik Takvimi</h1>
          <p className="text-[15px] mt-3 text-slate-500 font-medium tracking-tight">Sosyal medya akışınızı planlayın ve otomatik yayınlayın.</p>
        </div>
        <button onClick={() => setModal(true)} className="px-8 py-4 rounded-[20px] bg-indigo-600 text-white font-black text-[14px] uppercase tracking-widest hover:bg-indigo-500 shadow-lg active:scale-95 flex items-center gap-3 group">
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Yeni İçerik
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 py-32 rounded-[48px] text-center shadow-sm">
           <CalendarIcon size={60} className="mx-auto mb-6 text-slate-100" />
           <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[11px]">Takvimde henüz içerik yok.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {Object.entries(grouped).map(([day, dayPosts]) => (
            <div key={day} className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-widest italic">{day}</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dayPosts.map((p, i) => {
                  const st = STATUS_STYLE[p.status] || STATUS_STYLE.draft
                  return (
                    <div key={p.id} className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group flex flex-col h-full">
                       <div className="flex items-center justify-between mb-6">
                          <span className="text-[9px] font-black px-2 py-1 bg-slate-50 text-slate-400 rounded-md border border-slate-100 uppercase tracking-widest">{p.client_name}</span>
                          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${st.bg} ${st.text} ${st.border}`}>
                             <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} /> {st.label}
                          </div>
                       </div>
                       <h3 className="text-[18px] font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">{p.title}</h3>
                       <p className="text-[14px] text-slate-500 font-medium italic line-clamp-2 mb-8">{p.caption || 'Açıklama yok...'}</p>
                       <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                          <div className="flex gap-2">
                             {(p.platforms || []).map((pl: string) => (
                               <div key={pl} className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[14px]">{PLATFORMS.find(x=>x.id===pl)?.icon || '📱'}</div>
                             ))}
                          </div>
                          <button className="p-2.5 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={18} /></button>
                       </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Placeholder */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-white/80 backdrop-blur-md" onClick={() => setModal(false)} />
             <div className="relative bg-white p-12 rounded-[48px] border border-slate-100 w-full max-w-lg shadow-[0_50px_100px_rgba(0,0,0,0.05)]">
                <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase italic">Planlama Motoru</h3>
                <button onClick={() => setModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900"><X size={24} /></button>
                <p className="text-slate-500 font-medium">İçerik planlama modülü aktif ediliyor...</p>
             </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
