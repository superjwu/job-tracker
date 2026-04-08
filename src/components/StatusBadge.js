'use client';

import { STATUS_LABELS } from '@/lib/constants';

const STATUS_STYLES = {
  wishlist: 'bg-gray-100 text-gray-600 ring-gray-200',
  applied: 'bg-blue-50 text-blue-600 ring-blue-200',
  'phone-screen': 'bg-purple-50 text-purple-600 ring-purple-200',
  technical: 'bg-orange-50 text-orange-600 ring-orange-200',
  onsite: 'bg-amber-50 text-amber-600 ring-amber-200',
  offer: 'bg-emerald-50 text-emerald-600 ring-emerald-200',
  accepted: 'bg-green-50 text-green-700 ring-green-300',
  rejected: 'bg-red-50 text-red-600 ring-red-200',
};

const STATUS_DOTS = {
  wishlist: 'bg-gray-400',
  applied: 'bg-blue-500',
  'phone-screen': 'bg-purple-500',
  technical: 'bg-orange-500',
  onsite: 'bg-amber-500',
  offer: 'bg-emerald-500',
  accepted: 'bg-green-600',
  rejected: 'bg-red-500',
};

export default function StatusBadge({ status, size = 'sm' }) {
  const style = STATUS_STYLES[status] || 'bg-gray-100 text-gray-600 ring-gray-200';
  const dot = STATUS_DOTS[status] || 'bg-gray-400';
  const label = STATUS_LABELS[status] || status;
  const sizeClass = size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ring-1 ring-inset ${style} ${sizeClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot} ${
        ['applied', 'phone-screen', 'technical', 'onsite'].includes(status) ? 'animate-pulse' : ''
      }`} />
      {label}
    </span>
  );
}
