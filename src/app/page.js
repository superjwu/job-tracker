'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatsCard from '@/components/StatsCard';
import StatusBadge from '@/components/StatusBadge';

const PIPELINE_STAGES = [
  { key: 'wishlist', label: 'Wishlist', color: 'bg-gray-400' },
  { key: 'applied', label: 'Applied', color: 'bg-blue-500' },
  { key: 'phone-screen', label: 'Phone', color: 'bg-purple-500' },
  { key: 'technical', label: 'Technical', color: 'bg-orange-500' },
  { key: 'onsite', label: 'Onsite', color: 'bg-yellow-500' },
  { key: 'offer', label: 'Offer', color: 'bg-emerald-500' },
  { key: 'accepted', label: 'Accepted', color: 'bg-green-600' },
  { key: 'rejected', label: 'Rejected', color: 'bg-red-500' },
];

export default function Dashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/applications')
      .then((res) => res.json())
      .then((data) => {
        setApps(data);
        setLoading(false);
      });
  }, []);

  const statusCounts = {};
  for (const stage of PIPELINE_STAGES) {
    statusCounts[stage.key] = 0;
  }
  for (const app of apps) {
    statusCounts[app.status] = (statusCounts[app.status] || 0) + 1;
  }

  const activeCount = apps.filter(
    (a) => !['accepted', 'rejected'].includes(a.status)
  ).length;
  const offerCount = statusCounts.offer + statusCounts.accepted;
  const maxCount = Math.max(...Object.values(statusCounts), 1);

  const recentApps = [...apps]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your job search progress</p>
        </div>
        <Link
          href="/applications"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Application
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatsCard label="Total Applications" value={apps.length} color="indigo" />
        <StatsCard label="Active" value={activeCount} color="blue" />
        <StatsCard label="Offers" value={offerCount} color="green" />
        <StatsCard label="Rejected" value={statusCounts.rejected} color="red" />
      </div>

      {/* Pipeline Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">Pipeline</h2>
        <div className="space-y-3">
          {PIPELINE_STAGES.map((stage) => {
            const count = statusCounts[stage.key];
            const width = maxCount > 0 ? (count / maxCount) * 100 : 0;
            return (
              <div key={stage.key} className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-600 w-20 text-right shrink-0">
                  {stage.label}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-7 relative overflow-hidden">
                  <div
                    className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                    style={{ width: `${Math.max(width, count > 0 ? 8 : 0)}%` }}
                  />
                  {count > 0 && (
                    <span className="absolute inset-y-0 left-3 flex items-center text-xs font-bold text-white">
                      {count}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">Recent Activity</h2>
        {recentApps.length === 0 ? (
          <p className="text-sm text-gray-500">No applications yet. Add your first one!</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentApps.map((app) => (
              <Link
                key={app.id}
                href={`/applications/${app.id}`}
                className="flex items-center justify-between py-3 hover:bg-gray-50 -mx-3 px-3 rounded-lg transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {app.company} &mdash; {app.role}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Updated {new Date(app.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={app.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
