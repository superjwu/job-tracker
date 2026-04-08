'use client';

const STATUS_COLORS = {
  wishlist: 'bg-gray-100 text-gray-700',
  applied: 'bg-blue-100 text-blue-700',
  'phone-screen': 'bg-purple-100 text-purple-700',
  technical: 'bg-orange-100 text-orange-700',
  onsite: 'bg-yellow-100 text-yellow-700',
  offer: 'bg-emerald-100 text-emerald-700',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-700',
};

const STATUS_LABELS = {
  wishlist: 'Wishlist',
  applied: 'Applied',
  'phone-screen': 'Phone Screen',
  technical: 'Technical',
  onsite: 'Onsite',
  offer: 'Offer',
  accepted: 'Accepted',
  rejected: 'Rejected',
};

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

export { STATUS_COLORS, STATUS_LABELS };
