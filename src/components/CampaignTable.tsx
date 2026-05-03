'use client';

import React from 'react';
import { MoreVertical, ExternalLink, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

const platforms: Record<string, { color: string; bg: string }> = {
  Meta:     { color: '#1877F2', bg: '#EFF6FF' },
  Google:   { color: '#F59E0B', bg: '#FFFBEB' },
  LinkedIn: { color: '#0A66C2', bg: '#EFF6FF' },
};

const campaigns = [
  { id: 1, name: 'Marka Bilinirliği - Q4',        platform: 'Meta',     status: 'Aktif',      spend: '₺12,450', roas: '3.2x', budget: 85  },
  { id: 2, name: 'Potansiyel Müşteri | Yüksek İlgi',platform: 'Google',  status: 'Durduruldu', spend: '₺8,120',  roas: '4.8x', budget: 40  },
  { id: 3, name: 'Yeniden Pazarlama - Kış',        platform: 'Meta',     status: 'Aktif',      spend: '₺5,900',  roas: '2.1x', budget: 95  },
  { id: 4, name: 'Ürün Lansmanı 2024',             platform: 'LinkedIn', status: 'Aktif',      spend: '₺15,000', roas: '1.5x', budget: 60  },
];

export default function CampaignTable() {
  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <div>
          <h3 className="text-[15px] font-semibold" style={{ color: '#0F172A' }}>Aktif Kampanyalar</h3>
          <p className="text-[12px] mt-0.5" style={{ color: '#94A3B8' }}>4 kampanya yönetiliyor</p>
        </div>
        <button className="btn-secondary text-[13px]" style={{ padding: '7px 14px' }}>
          Tümünü Gör <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              {['Kampanya', 'Platform', 'Durum', 'Harcama', 'ROAS', 'Bütçe', ''].map(h => (
                <th key={h} className="px-6 py-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => {
              const p = platforms[c.platform];
              return (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="group transition-colors"
                  style={{ borderBottom: '1px solid #F8FAFC' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FAFBFF')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td className="px-6 py-4">
                    <p className="text-[13px] font-semibold" style={{ color: '#0F172A' }}>{c.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: p.bg, color: p.color }}>
                      {c.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={c.status === 'Aktif' ? 'badge badge-green' : 'badge badge-gray'}>
                      {c.status === 'Aktif' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 inline-block" />}
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] font-semibold" style={{ color: '#0F172A' }}>{c.spend}</td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-bold" style={{ color: '#6366F1' }}>{c.roas}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 w-36">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#F1F5F9' }}>
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${c.budget}%`,
                            background: c.budget > 80 ? '#F43F5E' : '#6366F1'
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold w-8" style={{ color: '#64748B' }}>{c.budget}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-[8px] transition-colors" style={{ color: '#94A3B8' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#0F172A'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94A3B8'; }}
                      >
                        {c.status === 'Aktif' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button className="p-1.5 rounded-[8px] transition-colors" style={{ color: '#94A3B8' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#0F172A'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94A3B8'; }}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
