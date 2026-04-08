'use client';

import Link from 'next/link';
import StatusBadge from './StatusBadge';

export default function ApplicationCard({ app }) {
  return (
    <Link
      href={`/applications/${app.id}`}
      className="animate-fade-up block bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-5 card-hover group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
            {app.company}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">{app.role}</p>
        </div>
        <StatusBadge status={app.status} />
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
        {app.location && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {app.location}
          </span>
        )}
        {app.dateApplied && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {app.dateApplied}
          </span>
        )}
        {app.salary && (
          <span className="hidden sm:flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            {app.salary}
          </span>
        )}
      </div>
      <div className="mt-3 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" />
    </Link>
  );
}
