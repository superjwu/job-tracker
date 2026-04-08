'use client';

import { STATUS_COLORS, STATUS_LABELS } from '@/lib/constants';

export default function StatusBadge({ status, size = 'sm' }) {
  const colors = STATUS_COLORS[status] || 'bg-gray-100 text-gray-700';
  const label = STATUS_LABELS[status] || status;
  const sizeClass = size === 'lg' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs';

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${colors} ${sizeClass}`}>
      {label}
    </span>
  );
}
