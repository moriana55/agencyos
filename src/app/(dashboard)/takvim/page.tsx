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

const STATUS_STYLE: Record<string, { bg: string, text: string, label: string, dot: string }> = {
  draft:     { bg: 'bg-slate-100', text: 'text-slate-600', label: 'Taslak', dot: 'bg-slate-400' },
  scheduled: { bg: 'bg-indigo-50', text: 'text-indigo-600', label: 'Planlandı', dot: 'bg-indigo-500' },
  published: { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Yayında', dot: 'bg-emerald-500' },
  failed:    { bg: 'bg-rose-50', text: 'text-rose-600', label: 'Başarısız', dot: 'bg-rose-500' },
}

type Post = {
  id: string; client_id: string; client_name: string; title: string
  caption: string | null; platforms: string[]; scheduled_at: string | null
  status: string; created_at: string
}
type Client = { id: string; name: string }

export default function TakvimPage() {
  const [posts, setPosts]       = useState<Post[]>([])
  const [clients, setClients]   = useState<Client[]>([])
  const [loading, setLoading]   = useState(true)
  const [modal, setModal]       = useState(false)
  const [saving, setSaving]     = useState(false)
  const [publishing, setPublishing] = useState<string|null>(null)
  const [deleting, setDeleting] = useState<string|null>(null)
  const [pubResult, setPubResult] = useState<Record<string, 'ok'|'fail'>>({})
  const [form, setForm] = useState({
    client_id: '', title: '', caption: '', platforms: [] as string[], scheduled_at: ''
  })
  const [drivePicker, setDrivePicker] = useState(false)

  const load = async () => {
    const [pr, cr] = await Promise.all([fetch('/api/posts'), fetch('/api/clients')])
    const pd = await pr.json(); const cd = await cr.json()
    setPosts(pd.posts || []); setClients(cd.clients || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const togglePlatform = (p: string) =>
    setForm(f => ({ ...f, platforms: f.platforms.includes(p) ? f.platforms.filter(x => x !== p) : [...f.platforms, p] }))

  const handleSave = async () => {
    if (!form.client_id || !form.title || !form.platforms.length) return
    setSaving(true)
    await fetch('/api/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    await load(); setSaving(false); setModal(false)
    setForm({ client_id:'', title:'', caption:'', platforms:[], scheduled_at:'' })
  }

  const handlePublish = async (id: string) => {
    setPublishing(id)
    const res = await fetch('/api/ayrshare/publish', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ post_id: id }) })
    setPubResult(prev => ({ ...prev, [id]: res.ok ? 'ok' : 'fail' }))
    if (res.ok) await load()
    setPublishing(null)
  }

  const handleDelete = async (id: string) => {
    setDeleting(id)
    await fetch('/api/posts', { method:'DELETE', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id }) })
    setPosts(prev => prev.filter(p => p.id !== id))
    setDeleting(null)
  }

  const grouped = posts.reduce((acc, p) => {
    const day = p.scheduled_at ? new Date(p.scheduled_at).toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'}) : 'Taslaklar'
    if (!acc[day]) acc[day] = []
    acc[day].push(p)
    return acc
  }, {} as Record<string, Post[]>)

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-indigo-500/80">Content Operations</p>
          <h1 className="text-[32px] font-black tracking-tight text-slate-900 leading-none">İçerik Takvimi</h1>
          <p className="text-[14px] mt-2 text-slate-500 font-medium">Planla, zamanla ve sosyal medyada otomatik yayınla.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setDrivePicker(true)} className="btn-secondary flex items-center gap-2 hover:bg-slate-100 px-5 py-3 rounded-2xl text-[13px] font-bold">
            <Cloud className="w-4 h-4" /> Drive'dan İçerik Çek
          </button>
          <button onClick={() => setModal(true)} className="btn-primary glow-indigo flex items-center gap-2 px-6 py-3 rounded-2xl text-[14px] font-bold">
            <Plus className="w-4 h-4" /> Yeni İçerik
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Toplam İçerik', value: posts.length, icon: CalendarDays, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Planlandı', value: posts.filter(p=>p.status==='scheduled').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Yayında', value: posts.filter(p=>p.status==='published').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Taslak', value: posts.filter(p=>p.status==='draft').length, icon: Sparkles, color: 'text-slate-400', bg: 'bg-slate-50' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="intel-card group">
            <div className="flex items-center gap-4 mb-4">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${s.bg} ${s.color}`}>
                  <s.icon size={18} />
               </div>
               <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
            </div>
            <p className="text-[28px] font-black text-slate-900">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* View Switcher Placeholder */}
      <div className="flex items-center justify-between py-2">
         <div className="flex items-center gap-1.5 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
            <button className="px-4 py-1.5 bg-white shadow-sm border border-slate-200 rounded-lg text-[12px] font-bold text-slate-900 flex items-center gap-2">
               <LayoutGrid size={14} /> Liste Görünümü
            </button>
            <button className="px-4 py-1.5 text-slate-500 hover:text-slate-900 rounded-lg text-[12px] font-bold flex items-center gap-2 transition-all">
               <CalendarIcon size={14} /> Takvim Görünümü
            </button>
         </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="py-24 text-center">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Syncing Content Hub...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="intel-card border-dashed border-2 py-24 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
             <CalendarDays size={32} className="text-slate-200" />
          </div>
          <h3 className="text-[18px] font-black text-slate-900">Takviminiz boş görünüyor</h3>
          <p className="text-[14px] text-slate-500 mt-2 max-w-sm">İlk içeriğinizi oluşturarak sosyal medya planlamasına başlayabilirsiniz.</p>
          <button onClick={() => setModal(true)} className="btn-primary mt-8 px-8 py-4 glow-indigo">Yeni İçerik Oluştur</button>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(grouped).map(([day, dayPosts], index) => (
            <div key={day} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-200">
                  <Clock size={16} className="text-indigo-400" />
                  <span className="text-[12px] font-black uppercase tracking-wider">{day}</span>
                </div>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dayPosts.map((p, i) => {
                  const st = STATUS_STYLE[p.status] || STATUS_STYLE.draft
                  return (
                    <motion.div key={p.id} initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ delay: i*0.05 }}
                      className="intel-card group hover:border-indigo-300 flex flex-col h-full transition-all relative overflow-hidden">
                      <div className="flex items-start justify-between mb-6">
                        <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-slate-50 text-slate-400 border border-slate-100 uppercase tracking-[0.1em]">
                          {p.client_name}
                        </span>
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${st.bg} ${st.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${st.dot}`} />
                          {st.label}
                        </div>
                      </div>
                      
                      <h3 className="text-[17px] font-black text-slate-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">{p.title}</h3>
                      {p.caption && <p className="text-[13px] text-slate-500 line-clamp-3 mb-6 leading-relaxed flex-1 font-medium italic">"{p.caption}"</p>}
                      
                      <div className="pt-5 mt-auto border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {(p.platforms||[]).map(pl => {
                            const plat = PLATFORMS.find(x => x.id === pl)
                            return plat ? (
                              <div key={pl} className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[13px] shadow-sm hover:border-indigo-200 transition-all cursor-help" title={plat.label}>
                                {plat.icon}
                              </div>
                            ) : null
                          })}
                        </div>
                        
                        <div className="flex items-center gap-2">
                           {p.status !== 'published' && (
                            <button onClick={() => handlePublish(p.id)} disabled={!!publishing}
                              className="px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white flex items-center gap-2 transition-all shadow-sm">
                              {publishing===p.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                              Launch
                            </button>
                          )}
                          
                          <button onClick={() => handleDelete(p.id)} disabled={deleting===p.id}
                            className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all">
                            {deleting===p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 size={18} />}
                          </button>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setModal(false)} />
            <motion.div initial={{ scale:0.95, opacity:0, y: 20 }} animate={{ scale:1, opacity:1, y: 0 }} exit={{ scale:0.95, opacity:0, y: 20 }}
              className="bg-white rounded-[32px] shadow-2xl p-10 w-full max-w-2xl relative z-10 max-h-[90vh] flex flex-col overflow-hidden">
              
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-100">
                    <Plus size={24} />
                  </div>
                  <div>
                    <h2 className="text-[22px] font-black text-slate-900 tracking-tight">Yeni İçerik Planla</h2>
                    <p className="text-[13px] text-slate-500 font-medium">Siber-premium içerik yönetimine hoş geldiniz.</p>
                  </div>
                </div>
                <button onClick={() => setModal(false)} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="overflow-y-auto pr-2 custom-scrollbar space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Müşteri Seçimi</label>
                    <select value={form.client_id} onChange={e => setForm(f=>({...f,client_id:e.target.value}))}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none focus:ring-4 ring-indigo-500/5 transition-all">
                      <option value="">Müşteri Seçin...</option>
                      {clients.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Yayın Zamanı</label>
                    <input type="datetime-local" value={form.scheduled_at} onChange={e => setForm(f=>({...f,scheduled_at:e.target.value}))}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none focus:ring-4 ring-indigo-500/5 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">İçerik Başlığı</label>
                  <input value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))}
                    placeholder="Örn: 2024 Yaz Sezonu Tanıtımı" 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none focus:ring-4 ring-indigo-500/5 transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Gönderi Metni (Caption)</label>
                  <textarea value={form.caption} onChange={e => setForm(f=>({...f,caption:e.target.value}))}
                    placeholder="Yapay zeka tarafından optimize edilecek metin..." rows={4}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-bold outline-none focus:ring-4 ring-indigo-500/5 transition-all resize-none" />
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Hedef Platformlar</label>
                  <div className="flex flex-wrap gap-3">
                    {PLATFORMS.map((p: any) => {
                      const isActive = form.platforms.includes(p.id);
                      return (
                        <button key={p.id} onClick={() => togglePlatform(p.id)}
                          className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-[13px] font-black border transition-all ${
                            isActive ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200'
                          }`}>
                          <span>{p.icon}</span> {p.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 mt-10 pt-6 border-t border-slate-50 relative z-10">
                <button onClick={() => setModal(false)}
                  className="px-6 py-4 rounded-2xl text-[14px] font-black text-slate-400 hover:bg-slate-50 transition-all">
                  İptal
                </button>
                <button onClick={handleSave}
                  disabled={saving || !form.client_id || !form.title || !form.platforms.length}
                  className="px-10 py-4 rounded-2xl text-[14px] font-black uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all disabled:opacity-50 flex items-center gap-2">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Saving...' : (form.scheduled_at ? 'Schedule' : 'Save Draft')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Drive Picker Placeholder Style */}
      <AnimatePresence>
        {drivePicker && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setDrivePicker(false)} />
            <motion.div initial={{ scale:0.95, opacity:0, y: 20 }} animate={{ scale:1, opacity:1, y: 0 }} exit={{ scale:0.95, opacity:0, y: 20 }}
              className="bg-white rounded-[40px] shadow-2xl p-10 w-full max-w-4xl relative z-10 max-h-[85vh] flex flex-col overflow-hidden">
              
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-sm">
                      <Cloud size={28} />
                   </div>
                   <div>
                      <h2 className="text-[20px] font-black text-slate-900">AgencyOS Drive</h2>
                      <p className="text-[13px] text-slate-500 font-medium italic">Ajans varlıklarına ve içerik havuzuna anlık erişim.</p>
                   </div>
                </div>
                <button onClick={() => setDrivePicker(false)} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-all">
                   <X size={28} />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 overflow-y-auto pr-2 custom-scrollbar pb-10">
                 {[
                   { name: 'Kampanya Görselleri', type: 'folder', icon: Folder, bg: 'bg-amber-100', text: 'text-amber-600' },
                   { name: 'Video Raw Files', type: 'folder', icon: Folder, bg: 'bg-amber-100', text: 'text-amber-600' },
                   { name: 'Banner_v1.png', type: 'image', icon: Target, bg: 'bg-indigo-50', text: 'text-indigo-600' },
                   { name: 'Product_Intro.mp4', type: 'video', icon: Zap, bg: 'bg-emerald-50', text: 'text-emerald-600' },
                 ].map((item, i) => (
                   <motion.div 
                     key={i}
                     whileHover={{ y: -5 }}
                     className="intel-card group cursor-pointer hover:border-indigo-200 text-center flex flex-col items-center"
                   >
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${item.bg} ${item.text}`}>
                         <item.icon size={28} />
                      </div>
                      <p className="text-[13px] font-black text-slate-900 truncate w-full px-2">{item.name}</p>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{item.type}</span>
                   </motion.div>
                 ))}
              </div>

              <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                 <div className="flex items-center gap-4 text-slate-400">
                    <Cloud size={20} />
                    <span className="text-[11px] font-black uppercase tracking-widest">1.2 GB / 50 GB Cloud Storage</span>
                 </div>
                 <button onClick={() => setDrivePicker(false)} className="btn-primary px-12 py-4 glow-indigo">Kapat</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
