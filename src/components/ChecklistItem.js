'use client';

import { CHECKLIST_LABELS } from '@/lib/constants';

export default function ChecklistItem({ itemKey, checked, onChange }) {
  const label = CHECKLIST_LABELS[itemKey] || itemKey;

  return (
    <label className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(itemKey, !checked)}
        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <span className={`text-sm ${checked ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
        {label}
      </span>
    </label>
  );
}
