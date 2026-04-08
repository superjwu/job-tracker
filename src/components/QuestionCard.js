'use client';

import { useState } from 'react';
import { CATEGORY_LABELS, DIFFICULTY_COLORS, DIFFICULTIES, CATEGORIES } from '@/lib/constants';

export default function QuestionCard({ question, onDelete, onEdit }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    question: question.question,
    answer: question.answer,
    category: question.category,
    difficulty: question.difficulty,
  });

  function handleEditSave() {
    onEdit(question.id, editForm);
    setEditing(false);
  }

  return (
    <div className="animate-fade-up bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 overflow-hidden card-hover">
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
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
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100">
          {editing ? (
            <div className="pt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {CATEGORIES.filter((c) => c.value !== 'all').map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Difficulty</label>
                  <select
                    value={editForm.difficulty}
                    onChange={(e) => setEditForm({ ...editForm, difficulty: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {DIFFICULTIES.map((d) => (
                      <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Question</label>
                <input
                  type="text"
                  value={editForm.question}
                  onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Answer / Notes</label>
                <textarea
                  value={editForm.answer}
                  onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleEditSave}
                  className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setEditForm({
                      question: question.question,
                      answer: question.answer,
                      category: question.category,
                      difficulty: question.difficulty,
                    });
                  }}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Answer / Notes</p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {question.answer || 'No answer yet.'}
              </p>
            </div>
          )}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-4">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditing(true);
                }}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Edit question
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(question.id);
                }}
                className="text-xs text-red-600 hover:text-red-700 font-medium"
              >
                Delete question
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
