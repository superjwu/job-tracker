'use client';

import { useState, useEffect } from 'react';
import QuestionCard from '@/components/QuestionCard';

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'behavioral', label: 'Behavioral' },
  { value: 'technical', label: 'Technical' },
  { value: 'system-design', label: 'System Design' },
];

const DIFFICULTIES = ['easy', 'medium', 'hard'];

export default function PracticePage() {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    category: 'behavioral',
    question: '',
    answer: '',
    difficulty: 'medium',
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  function loadQuestions() {
    fetch('/api/questions')
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ category: 'behavioral', question: '', answer: '', difficulty: 'medium' });
      setShowForm(false);
      loadQuestions();
    }
  }

  async function handleDelete(qId) {
    const res = await fetch(`/api/questions?id=${qId}`, { method: 'DELETE' });
    if (res.ok) {
      loadQuestions();
    }
  }

  const filtered = filter === 'all' ? questions : questions.filter((q) => q.category === filter);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Practice Questions</h1>
          <p className="text-gray-600 mt-1">{questions.length} questions in your bank</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          {showForm ? (
            'Cancel'
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Question
            </>
          )}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">New Question</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {CATEGORIES.filter((c) => c.value !== 'all').map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={form.difficulty}
                  onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question *</label>
              <input
                required
                type="text"
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g. What is the difference between TCP and UDP?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Answer / Notes</label>
              <textarea
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
                placeholder="Your answer or key talking points..."
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Save Question
            </button>
          </div>
        </form>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setFilter(c.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === c.value
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {c.label}
            {c.value !== 'all' && (
              <span className="ml-1 opacity-75">
                ({questions.filter((q) => q.category === c.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Question Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No questions found. Add your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => (
            <QuestionCard key={q.id} question={q} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
