'use client';

import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  color: string;
  lightColor: string;
}

export default function MetricCard({ title, value, change, icon: Icon, color, lightColor }: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="card card-hover p-6 cursor-default"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: lightColor }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
          style={isPositive
            ? { background: '#DCFCE7', color: '#166534' }
            : { background: '#FEE2E2', color: '#991B1B' }
          }
        >
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>

      <p className="text-[32px] font-bold tracking-tight leading-none mb-2" style={{ color: '#0F172A' }}>{value}</p>
      <p className="text-[13px] font-medium" style={{ color: '#64748B' }}>{title}</p>
      <p className="text-[11px] mt-1" style={{ color: '#94A3B8' }}>son 30 güne göre</p>
    </motion.div>
  );
}
