'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, Plus, X, Loader2, Send, Clock, CheckCircle2, AlertCircle, Trash2, LayoutGrid, Calendar as CalendarIcon, Sparkles, Cloud, Folder } from 'lucide-react'

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
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  const driveItems = [
    { id: 'f1', name: 'Kampanya Görselleri', type: 'folder' },
    { id: 'f2', name: 'Video Raw Files', type: 'folder' },
    { id: 'i1', name: 'Banner_v1.png', type: 'image', preview: '📸' },
    { id: 'i2', name: 'Social_Post.jpg', type: 'image', preview: '🖼️' },
    { id: 'v1', name: 'Product_Intro.mp4', type: 'video', preview: '🎬' },
  ]

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
    <div className="space-y-7 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-2 text-slate-400">İçerik Yönetimi</p>
          <h1 className="text-[28px] font-bold tracking-tight text-slate-900">İçerik Takvimi</h1>
          <p className="text-[14px] mt-1 text-slate-500">Planla, zamanla ve sosyal medyada otomatik yayınla.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center p-1 bg-white border border-slate-200 rounded-[12px]">
            <button className="px-4 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[13px] font-bold flex items-center gap-2">
              <LayoutGrid size={16} /> Liste
            </button>
            <button className="px-4 py-1.5 text-slate-400 hover:text-slate-600 rounded-lg text-[13px] font-bold flex items-center gap-2 transition-colors">
              <CalendarIcon size={16} /> Takvim
            </button>
          </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2 hover:bg-slate-100">
            <Cloud className="w-4 h-4" /> Drive'dan İçerik Çek
          </button>
          <button onClick={() => setModal(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Yeni İçerik
          </button>
        </div>
      </div>
    </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Toplam İçerik', value: posts.length, icon: CalendarDays, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Planlandı', value: posts.filter(p=>p.status==='scheduled').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Yayında', value: posts.filter(p=>p.status==='published').length, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Taslak', value: posts.filter(p=>p.status==='draft').length, icon: Sparkles, color: 'text-slate-500', bg: 'bg-slate-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.bg} ${s.color}`}>
                <s.icon size={16} />
              </div>
              <p className="text-[12px] font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
            </div>
            <p className="text-[28px] font-black text-slate-900 pl-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Posts */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        </div>
      ) : posts.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-24 gap-3 border-dashed border-2 border-slate-200 bg-slate-50/50">
          <div className="w-16 h-16 rounded-[20px] flex items-center justify-center bg-white shadow-sm border border-slate-100">
            <CalendarDays className="w-8 h-8 text-indigo-500" />
          </div>
          <h3 className="text-[18px] font-bold text-slate-900 mt-2">Takviminiz boş görünüyor</h3>
          <p className="text-[14px] text-slate-500 max-w-sm text-center">İlk içeriğinizi oluşturarak sosyal medya planlamasına başlayabilirsiniz.</p>
          <button onClick={() => setModal(true)} className="btn-primary mt-4 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Yeni İçerik Oluştur
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([day, dayPosts], index) => (
            <div key={day}>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-[13px] font-bold tracking-wide">{day}</span>
                </div>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {dayPosts.map((p, i) => {
                  const st = STATUS_STYLE[p.status] || STATUS_STYLE.draft
                  return (
                    <motion.div key={p.id} initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ delay: i*0.05 }}
                      className="card p-5 hover:border-indigo-200 transition-all flex flex-col group h-full">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 uppercase tracking-wider">
                          {p.client_name}
                        </span>
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${st.bg} ${st.text}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                          {st.label}
                        </div>
                      </div>
                      
                      <h3 className="text-[15px] font-bold text-slate-900 mb-2 leading-snug group-hover:text-indigo-600 transition-colors">{p.title}</h3>
                      {p.caption && <p className="text-[13px] text-slate-500 line-clamp-3 mb-4 leading-relaxed flex-1">{p.caption}</p>}
                      
                      <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {(p.platforms||[]).map(pl => {
                            const plat = PLATFORMS.find(x => x.id === pl)
                            return plat ? (
                              <span key={pl} className="w-7 h-7 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-[12px]" title={plat.label}>
                                {plat.icon}
                              </span>
                            ) : null
                          })}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {pubResult[p.id] === 'ok'   && <div className="p-1.5 bg-emerald-50 rounded-md"><CheckCircle2 className="w-4 h-4 text-emerald-500" /></div>}
                          {pubResult[p.id] === 'fail'  && <div className="p-1.5 bg-rose-50 rounded-md"><AlertCircle className="w-4 h-4 text-rose-500" /></div>}
                          
                          {p.status !== 'published' && (
                            <button onClick={() => handlePublish(p.id)} disabled={!!publishing}
                              className="px-3 py-1.5 rounded-lg text-[12px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 flex items-center gap-1.5 transition-colors">
                              {publishing===p.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                              Yayınla
                            </button>
                          )}
                          
                          <button onClick={() => handleDelete(p.id)} disabled={deleting===p.id}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors">
                            {deleting===p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setModal(false)} />
            <motion.div initial={{ scale:0.95, opacity:0, y: 20 }} animate={{ scale:1, opacity:1, y: 0 }} exit={{ scale:0.95, opacity:0, y: 20 }}
              className="bg-white rounded-[24px] shadow-2xl p-6 sm:p-8 w-full max-w-2xl relative z-10 max-h-[90vh] flex flex-col">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Plus size={20} />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-bold text-slate-900">Yeni İçerik Planla</h2>
                    <p className="text-[13px] text-slate-500">Müşteriniz için sosyal medya gönderisi hazırlayın.</p>
                  </div>
                </div>
                <button onClick={() => setModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto pr-2 space-y-5 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">Müşteri Seçimi *</label>
                    <select value={form.client_id} onChange={e => setForm(f=>({...f,client_id:e.target.value}))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[12px] text-[14px] font-medium outline-none focus:bg-white focus:ring-2 ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer">
                      <option value="">Lütfen müşteri seçin</option>
                      {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">Yayın Zamanı</label>
                    <input type="datetime-local" value={form.scheduled_at} onChange={e => setForm(f=>({...f,scheduled_at:e.target.value}))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[12px] text-[14px] outline-none focus:bg-white focus:ring-2 ring-indigo-500/10 focus:border-indigo-500 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">İçerik Başlığı (İç Kullanım) *</label>
                  <input value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))}
                    placeholder="Örn: 23 Nisan İndirim Gönderisi" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[12px] text-[14px] outline-none focus:bg-white focus:ring-2 ring-indigo-500/10 focus:border-indigo-500 transition-all" />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Gönderi Metni (Caption)</label>
                  <textarea value={form.caption} onChange={e => setForm(f=>({...f,caption:e.target.value}))}
                    placeholder="Sosyal medyada paylaşılacak metin..." rows={5}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[12px] text-[14px] outline-none focus:bg-white focus:ring-2 ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none" />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-3">Paylaşılacak Platformlar *</label>
                  <div className="flex flex-wrap gap-3">
                    {PLATFORMS.map(p => {
                      const isActive = form.platforms.includes(p.id);
                      return (
                        <button key={p.id} onClick={() => togglePlatform(p.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold border transition-all ${
                            isActive ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}>
                          <span>{p.icon}</span> {p.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t border-slate-100">
                <button onClick={() => setModal(false)}
                  className="px-6 py-2.5 rounded-[12px] text-[14px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                  İptal
                </button>
                <button onClick={handleSave}
                  disabled={saving || !form.client_id || !form.title || !form.platforms.length}
                  className="px-8 py-2.5 rounded-[12px] text-[14px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Kaydediliyor...' : (form.scheduled_at ? 'Planla' : 'Taslak Olarak Kaydet')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Drive Picker Modal */}
      <AnimatePresence>
        {drivePicker && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setDrivePicker(false)} />
            <motion.div initial={{ scale:0.95, opacity:0, y: 20 }} animate={{ scale:1, opacity:1, y: 0 }} exit={{ scale:0.95, opacity:0, y: 20 }}
              className="bg-white rounded-[32px] shadow-2xl p-8 w-full max-w-3xl relative z-10 max-h-[85vh] flex flex-col">
              
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                    <Cloud size={24} />
                  </div>
                  <div>
                    <h2 className="text-[20px] font-black text-slate-900">Google Drive</h2>
                    <p className="text-[13px] text-slate-500">Ajans varlıklarını ve içerikleri seçin.</p>
                  </div>
                </div>
                <button onClick={() => setDrivePicker(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-6">
                  {driveItems.map((item) => (
                    <motion.div 
                      key={item.id} 
                      whileHover={{ y: -4 }}
                      onClick={() => {
                        if (item.type === 'folder') {
                          setSelectedFolder(item.name)
                        } else {
                          setDrivePicker(false)
                        }
                      }}
                      className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer group text-center"
                    >
                      <div className={`w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl ${item.type === 'folder' ? 'bg-amber-100 text-amber-600' : 'bg-white shadow-sm'}`}>
                         {item.type === 'folder' ? <Folder size={28} /> : <span>{item.preview}</span>}
                      </div>
                      <p className="text-[13px] font-bold text-slate-900 truncate group-hover:text-indigo-600">{item.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.type}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <p className="text-[12px] text-slate-400 font-medium italic">Toplam 1.2 GB depolama kullanılıyor.</p>
                <button onClick={() => setDrivePicker(false)} className="btn-primary px-10">Kapat</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
