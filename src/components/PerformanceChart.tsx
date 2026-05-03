'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { name: '01 Eki', spend: 400,  conversions: 240  },
  { name: '05 Eki', spend: 750,  conversions: 350  },
  { name: '10 Eki', spend: 600,  conversions: 500  },
  { name: '15 Eki', spend: 1300, conversions: 850  },
  { name: '20 Eki', spend: 950,  conversions: 600  },
  { name: '25 Eki', spend: 1550, conversions: 1150 },
  { name: '30 Eki', spend: 1800, conversions: 1300 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="card p-4 shadow-lg" style={{ minWidth: '180px' }}>
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>{label}</p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: '#6366F1' }} />
              <span className="text-[12px]" style={{ color: '#64748B' }}>Harcama</span>
            </div>
            <span className="text-[13px] font-bold" style={{ color: '#0F172A' }}>₺{payload[0]?.value}</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
              <span className="text-[12px]" style={{ color: '#64748B' }}>Dönüşüm</span>
            </div>
            <span className="text-[13px] font-bold" style={{ color: '#0F172A' }}>{payload[1]?.value}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function PerformanceChart() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[16px] font-semibold" style={{ color: '#0F172A' }}>Performans Analitiği</h3>
          <p className="text-[13px] mt-0.5" style={{ color: '#64748B' }}>Harcama ve dönüşüm korelasyonu — Ekim 2024</p>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#6366F1' }} />
            <span className="text-[12px] font-medium" style={{ color: '#64748B' }}>Harcama</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#10B981' }} />
            <span className="text-[12px] font-medium" style={{ color: '#64748B' }}>Dönüşüm</span>
          </div>
        </div>
      </div>

      <div style={{ height: '280px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
              tickFormatter={(v) => `₺${v}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E2E8F0', strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="spend"
              stroke="#6366F1"
              strokeWidth={2.5}
              strokeLinecap="round"
              fill="url(#spendGrad)"
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="conversions"
              stroke="#10B981"
              strokeWidth={2.5}
              strokeLinecap="round"
              fill="url(#convGrad)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
