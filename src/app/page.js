'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatsCard from '@/components/StatsCard';
import StatusBadge from '@/components/StatusBadge';
import { useToast } from '@/components/Toast';
import { PIPELINE_STAGES } from '@/lib/constants';

export default function Dashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/applications');
        if (!res.ok) throw new Error('Failed to load');
        setApps(await res.json());
      } catch {
        toast.error('Failed to load applications');
      } finally {
        setLoading(false);
      }
    }
    load();
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
  const offerCount = (statusCounts.offer || 0) + (statusCounts.accepted || 0);
  const maxCount = Math.max(...Object.values(statusCounts), 1);

  const recentApps = [...apps]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded-lg w-48" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 bg-gray-200/60 rounded-2xl" />
            ))}
          </div>
          <div className="h-64 bg-gray-200/60 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 animate-fade-up">
        <div>
          <h1 className="text-3xl font-extrabold text-gradient">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your job search progress</p>
        </div>
        <Link
          href="/applications"
          className="btn-shine inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Application
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 stagger">
        <StatsCard label="Total Applications" value={apps.length} color="indigo" />
        <StatsCard label="Active" value={activeCount} color="blue" />
        <StatsCard label="Offers" value={offerCount} color="green" />
        <StatsCard label="Rejected" value={statusCounts.rejected || 0} color="red" />
      </div>

      {/* Pipeline Visualization */}
      <div className="animate-fade-up bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6 mb-10 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Pipeline
        </h2>
        <div className="space-y-3">
          {PIPELINE_STAGES.map((stage, i) => {
            const count = statusCounts[stage.key] || 0;
            const width = maxCount > 0 ? (count / maxCount) * 100 : 0;
            return (
              <div key={stage.key} className="flex items-center gap-3 group">
                <span className="text-xs font-medium text-gray-500 w-20 text-right shrink-0 group-hover:text-gray-900 transition-colors">
                  {stage.label}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                  <div
                    className={`h-full rounded-full ${stage.color} animate-bar opacity-90 hover:opacity-100 transition-opacity`}
                    style={{
                      width: `${Math.max(width, count > 0 ? 8 : 0)}%`,
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                  {count > 0 && (
                    <span className="absolute inset-y-0 left-3 flex items-center text-xs font-bold text-white drop-shadow-sm">
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
      <div className="animate-fade-up bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-6 shadow-sm" style={{ animationDelay: '200ms' }}>
        <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Recent Activity
        </h2>
        {recentApps.length === 0 ? (
          <p className="text-sm text-gray-400">No applications yet. Add your first one!</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentApps.map((app) => (
              <Link
                key={app.id}
                href={`/applications/${app.id}`}
                className="flex items-center justify-between py-3.5 hover:bg-indigo-50/50 -mx-3 px-3 rounded-xl transition-all duration-200 group"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                    {app.company} &mdash; {app.role}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Updated {new Date(app.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={app.status} />
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
