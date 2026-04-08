'use client';

import { useState } from 'react';

const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
};

const CATEGORY_LABELS = {
  behavioral: 'Behavioral',
  technical: 'Technical',
  'system-design': 'System Design',
};

export default function QuestionCard({ question, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="font-medium text-gray-900 text-sm leading-relaxed">
            {question.question}
          </p>
          <svg
            className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
            {CATEGORY_LABELS[question.category] || question.category}
          </span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${DIFFICULTY_COLORS[question.difficulty] || ''}`}>
            {question.difficulty}
          </span>
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="pt-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Answer / Notes</p>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {question.answer || 'No answer yet.'}
            </p>
          </div>
          {onDelete && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(question.id);
                }}
                className="text-xs text-red-600 hover:text-red-700 font-medium"
              >
                Delete question
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { CATEGORY_LABELS, DIFFICULTY_COLORS };
