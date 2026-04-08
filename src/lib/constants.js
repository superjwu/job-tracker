// Single source of truth for all app constants

export const STATUSES = [
  'wishlist',
  'applied',
  'phone-screen',
  'technical',
  'onsite',
  'offer',
  'accepted',
  'rejected',
];

export const STATUS_LABELS = {
  wishlist: 'Wishlist',
  applied: 'Applied',
  'phone-screen': 'Phone Screen',
  technical: 'Technical',
  onsite: 'Onsite',
  offer: 'Offer',
  accepted: 'Accepted',
  rejected: 'Rejected',
};

export const STATUS_COLORS = {
  wishlist: 'bg-gray-100 text-gray-700',
  applied: 'bg-blue-100 text-blue-700',
  'phone-screen': 'bg-purple-100 text-purple-700',
  technical: 'bg-orange-100 text-orange-700',
  onsite: 'bg-yellow-100 text-yellow-700',
  offer: 'bg-emerald-100 text-emerald-700',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-700',
};

export const PIPELINE_STAGES = [
  { key: 'wishlist', label: 'Wishlist', color: 'bg-gray-400' },
  { key: 'applied', label: 'Applied', color: 'bg-blue-500' },
  { key: 'phone-screen', label: 'Phone', color: 'bg-purple-500' },
  { key: 'technical', label: 'Technical', color: 'bg-orange-500' },
  { key: 'onsite', label: 'Onsite', color: 'bg-yellow-500' },
  { key: 'offer', label: 'Offer', color: 'bg-emerald-500' },
  { key: 'accepted', label: 'Accepted', color: 'bg-green-600' },
  { key: 'rejected', label: 'Rejected', color: 'bg-red-500' },
];

export const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  ...STATUSES.map((s) => ({ value: s, label: STATUS_LABELS[s] })),
];

export const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'behavioral', label: 'Behavioral' },
  { value: 'technical', label: 'Technical' },
  { value: 'system-design', label: 'System Design' },
];

export const CATEGORY_LABELS = {
  behavioral: 'Behavioral',
  technical: 'Technical',
  'system-design': 'System Design',
};

export const DIFFICULTIES = ['easy', 'medium', 'hard'];

export const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
};

export const CHECKLIST_LABELS = {
  resumeTailored: 'Resume tailored for role',
  coverLetter: 'Cover letter written',
  companyResearched: 'Company researched',
  linkedinConnected: 'LinkedIn connection made',
  portfolioUpdated: 'Portfolio updated',
  mockInterview: 'Mock interview completed',
};
