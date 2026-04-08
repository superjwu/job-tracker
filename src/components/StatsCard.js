'use client';

import { useEffect, useState } from 'react';

const colorMap = {
  indigo: {
    bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100/50',
    text: 'text-indigo-700',
    border: 'border-indigo-200/60',
    glow: 'shadow-indigo-100',
    icon: 'bg-indigo-500',
  },
  green: {
    bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50',
    text: 'text-emerald-700',
    border: 'border-emerald-200/60',
    glow: 'shadow-emerald-100',
    icon: 'bg-emerald-500',
  },
  blue: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50',
    text: 'text-blue-700',
    border: 'border-blue-200/60',
    glow: 'shadow-blue-100',
    icon: 'bg-blue-500',
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-50 to-orange-100/50',
    text: 'text-orange-700',
    border: 'border-orange-200/60',
    glow: 'shadow-orange-100',
    icon: 'bg-orange-500',
  },
  red: {
    bg: 'bg-gradient-to-br from-red-50 to-red-100/50',
    text: 'text-red-700',
    border: 'border-red-200/60',
    glow: 'shadow-red-100',
    icon: 'bg-red-500',
  },
};

export default function StatsCard({ label, value, color = 'indigo' }) {
  const c = colorMap[color] || colorMap.indigo;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (typeof value !== 'number' || value === 0) {
      setDisplay(value);
      return;
    }
    let start = 0;
    const duration = 600;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className={`animate-fade-up rounded-2xl border p-5 ${c.bg} ${c.border} ${c.text} shadow-lg ${c.glow} card-hover`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium opacity-70">{label}</p>
        <div className={`w-8 h-8 rounded-lg ${c.icon} opacity-20 flex items-center justify-center`}>
          <span className="text-white text-xs font-bold">#</span>
        </div>
      </div>
      <p className="text-4xl font-extrabold mt-2 tracking-tight animate-count">{display}</p>
    </div>
  );
}
